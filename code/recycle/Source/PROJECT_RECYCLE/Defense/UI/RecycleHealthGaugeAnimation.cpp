#include "RecycleHealthGaugeAnimation.h"

namespace
{
    float Phase(double Elapsed, float Duration)
    {
        return Duration > 0.f ? FMath::Clamp(static_cast<float>(Elapsed / Duration), 0.f, 1.f) : 1.f;
    }
}

bool FRecycleHealthGaugeAnimation::Update(float HealthFraction, double Now,
    const FRecycleHealthGaugeAnimationSettings& Settings)
{
    const float Health = FMath::Clamp(HealthFraction, 0.f, 1.f);
    if (!bInitialized || Health > Target)
    {
        bInitialized = true;
        bAnimating = false;
        Target = Fill = DamageTrail = Health;
        HitFlash = 0.f;
        return true;
    }

    const float PreviousFill = Fill;
    const float PreviousTrail = DamageTrail;
    const float PreviousFlash = HitFlash;
    if (Health < Target)
    {
        FillStart = Fill;
        TrailStart = FMath::Max(DamageTrail, Fill);
        Target = Health;
        DamageTime = Now;
        bAnimating = true;
    }
    if (bAnimating)
    {
        const double Elapsed = FMath::Max(0.0, Now - DamageTime);
        const float FillPhase = Phase(Elapsed, Settings.FillDuration);
        const double DrainElapsed = Elapsed - FMath::Max(0.f, Settings.DamageHoldDuration);
        const float TrailPhase = DrainElapsed < 0.0 ? 0.f : Phase(DrainElapsed, Settings.DamageDrainDuration);
        Fill = FMath::InterpEaseOut(FillStart, Target, FillPhase, 3.f);
        DamageTrail = FMath::Max(Fill, FMath::Lerp(TrailStart, Target, FMath::SmoothStep(0.f, 1.f, TrailPhase)));
        HitFlash = 1.f - Phase(Elapsed, Settings.HitFlashDuration);
        bAnimating = FillPhase < 1.f || TrailPhase < 1.f || HitFlash > 0.f;
    }
    return Fill != PreviousFill || DamageTrail != PreviousTrail || HitFlash != PreviousFlash;
}
