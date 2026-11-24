#pragma once

#include "CoreMinimal.h"

namespace RecycleAimAssist
{
    // Input is signed in the direction it rotates the camera, after axis inversion.
    inline FVector2D ApplyAxis(float Input, float ErrorDegrees, float Strength, float DeltaSeconds,
        float MinimumScale, float MaximumDegreesPerSecond)
    {
        if (Strength <= 0.f || DeltaSeconds <= 0.f || FMath::IsNearlyZero(Input)) return FVector2D(1.f, 0.f);
        const bool bAway = Input * ErrorDegrees < 0.f && FMath::Abs(ErrorDegrees) > .35f;
        const float Weight = FMath::Clamp(Strength, 0.f, 1.f);
        const float Friction = FMath::Lerp(1.f, FMath::Clamp(MinimumScale, .3f, 1.f), Weight * (bAway ? .5f : 1.f));
        if (bAway || FMath::Abs(Input) <= .25f || FMath::Abs(ErrorDegrees) <= .35f) return FVector2D(Friction, 0.f);
        const float InputWeight = FMath::Clamp((FMath::Abs(Input)-.25f)/.75f, 0.f, 1.f);
        const float Limit = FMath::Max(0.f, MaximumDegreesPerSecond) * DeltaSeconds;
        const float Correction = ErrorDegrees * (1.f-FMath::Exp(-5.f*DeltaSeconds)) * Weight * InputWeight;
        return FVector2D(Friction, FMath::Clamp(Correction,-Limit,Limit));
    }
}
