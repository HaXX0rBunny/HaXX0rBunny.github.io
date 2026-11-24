#if WITH_DEV_AUTOMATION_TESTS
#include "Misc/AutomationTest.h"
#include "Defense/UI/RecycleMinimapProjection.h"
IMPLEMENT_SIMPLE_AUTOMATION_TEST(FRecycleMinimapTest, "Recycle.UI.MinimapProjection",
    EAutomationTestFlags::EditorContext | EAutomationTestFlags::EngineFilter)
bool FRecycleMinimapTest::RunTest(const FString& Parameters)
{
    TestTrue(TEXT("Forward appears above player"), RecycleMinimap::Project(FVector(100,0,500),0,100).Equals(FVector2D(0,-1)));
    TestTrue(TEXT("Right appears right"), RecycleMinimap::Project(FVector(0,50,0),0,100).Equals(FVector2D(.5,0)));
    TestTrue(TEXT("Radar rotates with view"), RecycleMinimap::Project(FVector(0,100,0),90,100).Equals(FVector2D(0,-1),.001));
    const FVector2D Edge = RecycleMinimap::ClampToEdge(FVector2D(3,-4));
    TestTrue(TEXT("Distant HQ stays on circumference"), FMath::IsNearlyEqual(Edge.Size(),1.0));
    TestTrue(TEXT("HQ bearing is preserved"), Edge.Equals(FVector2D(.6,-.8)));
    TestTrue(TEXT("Nearby HQ keeps true distance"), RecycleMinimap::ClampToEdge(FVector2D(.2,0)).Equals(FVector2D(.2,0)));
    TestTrue(TEXT("Coincident HQ is safe"), RecycleMinimap::ClampToEdge(FVector2D::ZeroVector).IsZero());
    FVector2D Start(-2, .6);
    FVector2D End(2, .6);
    TestTrue(TEXT("A route crossing the map remains visible even when both endpoints are outside"),
        RecycleMinimap::ClipRouteSegment(Start, End));
    TestTrue(TEXT("Route enters at the circular boundary"), Start.Equals(FVector2D(-.8, .6)));
    TestTrue(TEXT("Route leaves at the circular boundary"), End.Equals(FVector2D(.8, .6)));
    Start = FVector2D(-2, 1.1);
    End = FVector2D(2, 1.1);
    TestFalse(TEXT("An offscreen route is not drawn along the rim"), RecycleMinimap::ClipRouteSegment(Start, End));
    return true;
}
#endif
