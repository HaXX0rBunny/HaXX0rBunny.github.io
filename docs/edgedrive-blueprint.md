# Edge Drive 시간 제어와 비 파티클 구현

Edge Drive에서 팀장을 맡아 스테이지와 플레이어 캐릭터, 시간 제어를 구현했습니다. 팀은 4명으로 시작했고 한 명이 빠진 뒤 3명이 작업했습니다. 다른 두 팀원은 각각 VFX, SFX, UI와 Enemy AI를 담당했습니다.

Unreal Engine 5.4에서 플레이어의 이동과 전투를 Blueprint로 구현하고, 이동 애니메이션에는 Motion Matching을 적용했습니다. 시간 배율이 바뀔 때 비 연출도 함께 변하도록 시간 제어 Blueprint와 Niagara 파라미터를 연결했습니다.

[플레이 영상](https://www.youtube.com/watch?v=264Wfi25UOU), [포트폴리오](https://haxx0rbunny.github.io/index.html#project-1)

## 시간 제어

`Content/TimeManipulate/TimeManipulater_BP.uasset`에 시간 제어를 모았습니다. `ClockUp`, `Clock Over`에서 `SetGlobalTimeDilation`을 호출하고, 비 액터의 `Rain_Delation`을 호출하도록 연결했습니다.

시간 진행은 `PlayTimeLineFunction`의 `GetRealTimeSeconds`를 기준으로 계산하고, 타이머는 `K2_ClearAndInvalidateTimerHandle`로 정리합니다. `CalculateAlphaUpdate`에서 진행 시간을 지속 시간으로 나눈 값을 0~1로 제한한 뒤 커브를 읽고, `Timeline`에서 `Lerp(A, B, Alpha)`로 보간합니다.

## 비 파티클 조절

`Content/Rain/Rain_BP.uasset`의 `Rain_Delation`에서 시간 조작 상태에 따라 비 연출을 조절했습니다. `VInterpTo`의 보간 결과를 Niagara 컴포넌트의 `SetVariableVec3`에 전달하고, `Max Scale Factor`를 갱신하는 구조입니다. 비 파티클의 스케일을 바꿔 시간 변화가 화면에서도 드러나도록 했습니다.

## 공개 자료

[공개 저장소](https://github.com/Team-Illegal-Design-Club/EdgeDrive/tree/Sanghyeon/Content)에는 일부 캐릭터, 입력 에셋이 포함되어 있습니다. 시간 제어와 비 파티클 Blueprint는 공개 범위에 포함되어 있지 않습니다. 플레이 영상과 포트폴리오에 연결된 빌드에서 시간 제어와 비 연출을 볼 수 있습니다.
