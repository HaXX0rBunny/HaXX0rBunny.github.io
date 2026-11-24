#if WITH_DEV_AUTOMATION_TESTS && WITH_EDITOR

#include "Defense/RecycleMenuController.h"
#include "Defense/RecycleDefenseMode.h"
#include "Defense/RecycleDefensePlayer.h"
#include "Defense/MobileConvoy.h"
#include "Defense/Locomotion/FortressAnimInstance.h"
#include "Defense/UI/RecycleInterfaceSubsystem.h"
#include "Defense/UI/RecycleSettingsWidget.h"
#include "Defense/UI/RecycleMenuWidget.h"
#include "Blueprint/WidgetBlueprintLibrary.h"
#include "Components/ComboBoxString.h"
#include "Components/CheckBox.h"
#include "Components/InputComponent.h"
#include "Components/TextBlock.h"
#include "Components/SkeletalMeshComponent.h"
#include "Editor.h"
#include "Engine/World.h"
#include "Framework/Application/SlateApplication.h"
#include "HAL/PlatformTime.h"
#include "Internationalization/Internationalization.h"
#include "Kismet/KismetInternationalizationLibrary.h"
#include "Misc/AutomationTest.h"
#include "Misc/ConfigCacheIni.h"
#include "Tests/AutomationCommon.h"
#include "Tests/AutomationEditorCommon.h"

namespace
{
class FCheckRecycleInterface final : public IAutomationLatentCommand
{
public:
    FCheckRecycleInterface(FAutomationTestBase& InTest, bool bInStandalone)
        : Test(InTest), bStandalone(bInStandalone), Started(FPlatformTime::Seconds()) {}
    bool Update() override
    {
        if (FPlatformTime::Seconds()-Started>45.)
        {
            Test.AddError(TEXT("Interface/spawn smoke test timed out"));
            Restore();
            return true;
        }
        UWorld* World = nullptr;
        if (bStandalone)
            for (const auto& Context : GEngine->GetWorldContexts())
                if (Context.WorldType == EWorldType::Game) World = Context.World();
        if (!bStandalone) World = GEditor ? GEditor->PlayWorld : nullptr;
        if (!World) return false;
        auto* PC = Cast<ARecycleMenuController>(World->GetFirstPlayerController());
        if (!PC || !PC->GetInterface()) return false;
        auto* Interface = PC->GetInterface();
        if (Stage == 0)
        {
            OriginalCulture = UKismetInternationalizationLibrary::GetCurrentCulture();
            bOriginalVibration = Interface->IsVibrationEnabled();
            InterfacePtr = Interface;
            Interface->ApplyPreferences(TEXT("en"),true);
            PC->OpenSettings();
            TArray<UUserWidget*> Widgets;
            UWidgetBlueprintLibrary::GetAllWidgetsOfClass(World,Widgets,URecycleSettingsWidget::StaticClass(),true);
            if (!Test.TestEqual(TEXT("Existing options widget opens"),Widgets.Num(),1)) { Restore(); return true; }
            auto* Settings = Widgets[0];
            SettingsPtr = Settings;
            Test.TestNotNull(TEXT("Language is bound in the saved UMG"),Cast<UComboBoxString>(Settings->GetWidgetFromName(TEXT("Language"))));
            Test.TestNotNull(TEXT("Vibration is bound in the saved UMG"),Cast<UCheckBox>(Settings->GetWidgetFromName(TEXT("Vibration"))));
            FSlateApplication::Get().ProcessKeyDownEvent(FKeyEvent(EKeys::Gamepad_FaceButton_Top,FModifierKeysState(),0,false,0,0));
            Test.TestTrue(TEXT("UIOnly receives real Slate gamepad input"),Interface->IsUsingGamepad());
            auto* Hint = Cast<UTextBlock>(Settings->GetWidgetFromName(TEXT("InputHint")));
            Test.TestTrue(TEXT("UIOnly hint changes to the gamepad"),Hint && Hint->GetText().ToString().Contains(TEXT("D-pad")));
            Test.TestTrue(TEXT("Fire prompt follows RT mapping"),Interface->GetPrompt(TEXT("RecycleFire"),TEXT("Action.Fire")).ToString().StartsWith(TEXT("RT")));
            FSlateApplication::Get().ProcessKeyDownEvent(FKeyEvent(EKeys::F12,FModifierKeysState(),0,false,0,0));
            Test.TestFalse(TEXT("Keyboard switches hints back"),Interface->IsUsingGamepad());
            FSlateApplication::Get().ProcessAnalogInputEvent(FAnalogInputEvent(EKeys::Gamepad_LeftX,FModifierKeysState(),0,false,0,0,.1f));
            Test.TestFalse(TEXT("Stick drift does not switch the device"),Interface->IsUsingGamepad());
            FSlateApplication::Get().ProcessAnalogInputEvent(FAnalogInputEvent(EKeys::Gamepad_LeftX,FModifierKeysState(),0,false,0,0,.7f));
            Test.TestTrue(TEXT("Intentional stick input switches to gamepad"),Interface->IsUsingGamepad());
            Test.TestEqual(TEXT("Default English resources are readable"),URecycleInterfaceSubsystem::Text(TEXT("Settings")).ToString(),FString(TEXT("Options")));
            Interface->ApplyPreferences(TEXT("ko"),false);
            Stage = 1;
            return false;
        }
        if (Stage == 1)
        {
            if (URecycleInterfaceSubsystem::Text(TEXT("Settings")).ToString()!=TEXT("설정")) return false;
            Test.TestFalse(TEXT("Vibration can be disabled"),Interface->IsVibrationEnabled());
            FString SavedCulture;
            GConfig->GetString(TEXT("Internationalization"),TEXT("Culture"),SavedCulture,GGameUserSettingsIni);
            Test.TestEqual(TEXT("Language persists in user config"),SavedCulture,FString(TEXT("ko")));
            Test.TestTrue(TEXT("Translated action prompts are live"),Interface->GetPrompt(TEXT("RecycleFire"),TEXT("Action.Fire")).ToString().Contains(TEXT("발사")));
            auto* Label = SettingsPtr.IsValid() ? Cast<UTextBlock>(SettingsPtr->GetWidgetFromName(TEXT("DisplayLabel"))) : nullptr;
            Test.TestTrue(TEXT("Saved UMG label switches language"),Label && Label->GetText().ToString()==TEXT("화면 모드"));
            auto* Display = SettingsPtr.IsValid() ? Cast<UComboBoxString>(SettingsPtr->GetWidgetFromName(TEXT("DisplayMode"))) : nullptr;
            // Localization may finish on a worker before its UI notification reaches the game thread.
            if (Display && Display->GetOptionAtIndex(0)!=TEXT("전체 화면")) return false;
            Test.TestTrue(TEXT("String combo options refresh after translation loads"),Display && Display->GetOptionAtIndex(0)==TEXT("전체 화면"));
            if (bStandalone) Restore();
            else Interface->ApplyPreferences(TEXT("en"),true);
            PC->CloseSettings();
            if (bStandalone) return true;
            TArray<UUserWidget*> Menus;
            UWidgetBlueprintLibrary::GetAllWidgetsOfClass(World,Menus,URecycleMenuWidget::StaticClass(),true);
            Interface->SetUsingGamepad(false);
            Interface->SetUsingGamepad(true);
            auto* MenuHint = Menus.Num()==1 ? Cast<UTextBlock>(Menus[0]->GetWidgetFromName(TEXT("InputHint"))) : nullptr;
            Test.TestTrue(TEXT("Reopened menu remains subscribed to input changes"),MenuHint && !MenuHint->GetText().ToString().Contains(TEXT("Enter")));
            PC->ActivatePrimaryMenuAction();
            Stage = 2;
            return false;
        }
        auto* Player = PC->GetPawn<ARecycleDefensePlayer>();
        auto* Mode = World->GetAuthGameMode<ARecycleDefenseMode>();
        if (Stage == 3 && Player)
        {
            if (!Player->IsChoosingLanding()) return false;
            Interface->SetUsingGamepad(true);
            FVector Before;
            const bool bHadTarget = Player->GetRespawnTarget(Before);
            for (auto& Binding : Player->InputComponent->AxisBindings)
                if (Binding.AxisName == TEXT("RecycleForward")) Binding.AxisDelegate.Execute(1.f);
            FVector After;
            if (!Player->GetRespawnTarget(After)) return false;
            if (bHadTarget) Test.TestTrue(TEXT("Left stick moves the landing target"),FVector::Dist2D(Before,After)>1.);
            Test.TestTrue(TEXT("Gamepad landing selection works without a mouse ray"),Player->LaunchRespawn(After));
            Restore();
            return true;
        }
        if (!Player || !Mode || !Mode->GetConvoy() || PC->IsShowingTitle() || !Player->IsAlive() || Player->IsInFlight() || Player->IsRecoveringFromLanding()) return false;
        auto* Convoy = Mode->GetConvoy();
        const double Distance = FVector::Dist2D(Player->GetActorLocation(),Convoy->GetActorLocation());
        Test.AddInfo(FString::Printf(TEXT("PostApo opening spawn distance: %.1f cm"),Distance));
        Test.TestTrue(TEXT("Actual opening spawns within sixty meters of the Fortress"),Distance<6000.);
        auto* Mesh = Convoy->FindComponentByClass<USkeletalMeshComponent>();
        auto* Anim = Mesh ? Cast<UFortressAnimInstance>(Mesh->GetAnimInstance()) : nullptr;
        Test.TestNotNull(TEXT("Fortress ABP has the rebuilt native instance"),Anim);
        if (Anim)
        {
            Test.TestEqual(TEXT("Fortress saved gait samples are intact"),Anim->FallbackWalkAnkleSamples.Num(),1086);
            Test.TestTrue(TEXT("IK snapshot is finite at runtime"),!Anim->FallbackWalkIK.LF.AnkleCS.ContainsNaN() && FMath::IsFinite(Anim->FallbackWalkTime));
        }
        for (int32 Index = 0; Index < Player->InputComponent->GetNumActionBindings(); ++Index)
        {
            auto& Binding = Player->InputComponent->GetActionBinding(Index);
            if (Binding.GetActionName() == TEXT("RecycleForceRespawn")) Binding.ActionDelegate.Execute(EKeys::R);
        }
        Stage = 3;
        return false;
    }
private:
    void Restore()
    {
        if (InterfacePtr.IsValid()) InterfacePtr->ApplyPreferences(OriginalCulture,bOriginalVibration);
    }
    FAutomationTestBase& Test;
    bool bStandalone;
    double Started;
    int32 Stage = 0;
    FString OriginalCulture;
    bool bOriginalVibration = true;
    TWeakObjectPtr<URecycleInterfaceSubsystem> InterfacePtr;
    TWeakObjectPtr<UUserWidget> SettingsPtr;
};
}

IMPLEMENT_SIMPLE_AUTOMATION_TEST(FRecycleInterfacePIE,"Recycle.Interface.PostApoPIE",EAutomationTestFlags::EditorContext|EAutomationTestFlags::EngineFilter)
bool FRecycleInterfacePIE::RunTest(const FString&)
{
    FAutomationEditorCommonUtils::LoadMap(TEXT("/Game/Defense/Lvl_RecycleDefense_PostApo"));
    ADD_LATENT_AUTOMATION_COMMAND(FStartPIECommand(false));
    FAutomationTestFramework::Get().EnqueueLatentCommand(MakeShared<FCheckRecycleInterface>(*this,false));
    ADD_LATENT_AUTOMATION_COMMAND(FEndPlayMapCommand());
    return true;
}

IMPLEMENT_SIMPLE_AUTOMATION_TEST(FRecycleInterfaceStandalone,"Recycle.Interface.Standalone",EAutomationTestFlags::ClientContext|EAutomationTestFlags::EngineFilter)
bool FRecycleInterfaceStandalone::RunTest(const FString&)
{
    FAutomationTestFramework::Get().EnqueueLatentCommand(MakeShared<FCheckRecycleInterface>(*this,true));
    return true;
}
#endif
