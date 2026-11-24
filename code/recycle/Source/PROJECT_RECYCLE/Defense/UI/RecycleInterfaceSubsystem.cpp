#include "RecycleInterfaceSubsystem.h"

#include "Engine/LocalPlayer.h"
#include "Framework/Application/IInputProcessor.h"
#include "Framework/Application/SlateApplication.h"
#include "GameFramework/PlayerController.h"
#include "GameFramework/PlayerInput.h"
#include "Internationalization/Internationalization.h"
#include "Internationalization/TextLocalizationManager.h"
#include "Kismet/KismetInternationalizationLibrary.h"
#include "Misc/ConfigCacheIni.h"

namespace
{
    class FRecycleInputObserver final : public IInputProcessor
    {
    public:
        explicit FRecycleInputObserver(URecycleInterfaceSubsystem& InOwner) : Owner(&InOwner) {}
        virtual void Tick(float, FSlateApplication&, TSharedRef<ICursor>) override {}
        virtual bool HandleKeyDownEvent(FSlateApplication&, const FKeyEvent& Event) override
        {
            if (Owner.IsValid()) Owner->SetUsingGamepad(Event.GetKey().IsGamepadKey());
            return false;
        }
        virtual bool HandleAnalogInputEvent(FSlateApplication&, const FAnalogInputEvent& Event) override
        {
            if (Owner.IsValid() && Event.GetKey().IsGamepadKey() && FMath::Abs(Event.GetAnalogValue()) > .3f)
                Owner->SetUsingGamepad(true);
            return false;
        }
        virtual bool HandleMouseMoveEvent(FSlateApplication&, const FPointerEvent& Event) override
        {
            if (Owner.IsValid() && Event.GetCursorDelta().SizeSquared() > 4.f) Owner->SetUsingGamepad(false);
            return false;
        }
        virtual bool HandleMouseButtonDownEvent(FSlateApplication&, const FPointerEvent&) override
        {
            if (Owner.IsValid()) Owner->SetUsingGamepad(false);
            return false;
        }
        virtual bool HandleMouseWheelOrGestureEvent(FSlateApplication&, const FPointerEvent&, const FPointerEvent*) override
        {
            if (Owner.IsValid()) Owner->SetUsingGamepad(false);
            return false;
        }
    private:
        TWeakObjectPtr<URecycleInterfaceSubsystem> Owner;
    };

    FText KeyLabel(const FKey& Key)
    {
        const FString Name = Key.ToString();
        if (Key.IsGamepadKey() || Key == EKeys::LeftMouseButton || Key == EKeys::RightMouseButton ||
            Key == EKeys::Escape || Key == EKeys::Enter || Key == EKeys::MouseScrollUp)
            return URecycleInterfaceSubsystem::Text(TEXT("Key_") + Name);
        return Key.GetDisplayName();
    }
}

void URecycleInterfaceSubsystem::Initialize(FSubsystemCollectionBase& Collection)
{
    Super::Initialize(Collection);
    FString Culture = TEXT("en");
    GConfig->GetString(TEXT("Internationalization"), TEXT("Culture"), Culture, GGameUserSettingsIni);
    UKismetInternationalizationLibrary::SetCurrentCulture(Culture, false);
#if WITH_EDITOR
    if (GIsEditor) FTextLocalizationManager::Get().EnableGameLocalizationPreview(Culture);
#endif
    GConfig->GetBool(TEXT("Recycle.Interface"), TEXT("Vibration"), bVibrationEnabled, GGameUserSettingsIni);
    FTextLocalizationManager::Get().OnTextRevisionChangedEvent.AddUObject(this, &ThisClass::CultureChanged);
    if (FSlateApplication::IsInitialized())
    {
        InputObserver = MakeShared<FRecycleInputObserver>(*this);
        FSlateApplication::Get().RegisterInputPreProcessor(InputObserver);
    }
}

void URecycleInterfaceSubsystem::Deinitialize()
{
    if (InputObserver && FSlateApplication::IsInitialized())
        FSlateApplication::Get().UnregisterInputPreProcessor(InputObserver);
    InputObserver.Reset();
    FTextLocalizationManager::Get().OnTextRevisionChangedEvent.RemoveAll(this);
    Super::Deinitialize();
}

void URecycleInterfaceSubsystem::SetUsingGamepad(bool bGamepad)
{
    if (bUsingGamepad == bGamepad) return;
    bUsingGamepad = bGamepad;
    OnChanged.Broadcast();
}

void URecycleInterfaceSubsystem::CultureChanged()
{
    OnChanged.Broadcast();
}

FText URecycleInterfaceSubsystem::Text(const FString& Key)
{
    return FText::FromStringTable(TEXT("/Game/Defense/UI/Localization/ST_RecycleUI.ST_RecycleUI"), Key);
}

FText URecycleInterfaceSubsystem::GetPrompt(FName Action, const FString& LabelKey) const
{
    const FText KeyText = GetActionKeyLabel(Action);
    return KeyText.IsEmpty() ? FText::GetEmpty() : FText::Format(Text(TEXT("Prompt")), KeyText, Text(LabelKey));
}

FText URecycleInterfaceSubsystem::GetActionKeyLabel(FName Action) const
{
    // Preferences break ties only; removed bindings must never leave a stale hint.
    FKey Preferred;
    if (Action == TEXT("RecycleCycleWeapon")) Preferred = EKeys::Gamepad_FaceButton_Top;
    else if (Action == TEXT("RecyclePreviousWeapon")) Preferred = EKeys::Gamepad_LeftShoulder;
    else if (Action == TEXT("RecycleEquipRecovery")) Preferred = EKeys::Gamepad_RightShoulder;
    const FInputActionKeyMapping* Selected = nullptr;
    const APlayerController* PC = GetLocalPlayer()->GetPlayerController(GetWorld());
    if (PC && PC->PlayerInput)
    {
        const FName EffectiveAction = bUsingGamepad && Action == TEXT("RecycleReady")
            ? FName(TEXT("RecycleGamepadPrimary")) : Action;
        for (const FInputActionKeyMapping& Mapping : PC->PlayerInput->GetKeysForAction(EffectiveAction))
        {
            if (Mapping.Key.IsGamepadKey() != bUsingGamepad) continue;
            if (!Selected) Selected = &Mapping;
            if (Mapping.Key == Preferred) { Selected = &Mapping; break; }
        }
    }
    if (!Selected) return FText::GetEmpty();
    FText Label = KeyLabel(Selected->Key);
    const FText ComboFormat = FText::AsCultureInvariant(TEXT("{0}+{1}"));
    if (Selected->bShift) Label = FText::Format(ComboFormat, EKeys::LeftShift.GetDisplayName(), Label);
    if (Selected->bAlt) Label = FText::Format(ComboFormat, EKeys::LeftAlt.GetDisplayName(), Label);
    if (Selected->bCtrl) Label = FText::Format(ComboFormat, EKeys::LeftControl.GetDisplayName(), Label);
    if (Selected->bCmd) Label = FText::Format(ComboFormat, EKeys::LeftCommand.GetDisplayName(), Label);
    return Label;
}

FText URecycleInterfaceSubsystem::GetMenuHint() const
{
    return FText::Format(Text(bUsingGamepad ? TEXT("MenuHint.Gamepad") : TEXT("MenuHint.Keyboard")),
        KeyLabel(bUsingGamepad ? EKeys::Gamepad_FaceButton_Bottom : EKeys::Enter),
        KeyLabel(bUsingGamepad ? EKeys::Gamepad_FaceButton_Right : EKeys::Escape));
}

void URecycleInterfaceSubsystem::ApplyPreferences(const FString& Culture, bool bVibration)
{
    if (Culture != TEXT("en") && Culture != TEXT("ko")) return;
    UKismetInternationalizationLibrary::SetCurrentCulture(Culture, true);
#if WITH_EDITOR
    if (GIsEditor)
    {
        // The engine skips SaveToConfig in PIE; persist the same game preference explicitly.
        GConfig->SetString(TEXT("Internationalization"), TEXT("Culture"), *Culture, GGameUserSettingsIni);
        FTextLocalizationManager::Get().EnableGameLocalizationPreview(Culture);
    }
#endif
    bVibrationEnabled = bVibration;
    GConfig->SetBool(TEXT("Recycle.Interface"), TEXT("Vibration"), bVibration, GGameUserSettingsIni);
    GConfig->Flush(false, GGameUserSettingsIni);
    if (!bVibration)
        if (APlayerController* PC = GetLocalPlayer()->GetPlayerController(GetWorld()))
            PC->ClientStopForceFeedback(nullptr, NAME_None);
    OnChanged.Broadcast();
}
