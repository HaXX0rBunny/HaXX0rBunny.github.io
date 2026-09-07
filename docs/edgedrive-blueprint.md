# Edge Drive 시간 제어와 비 파티클 구현

Edge Drive에서 팀장을 맡아 스테이지와 플레이어 캐릭터, 시간 제어를 구현했습니다. 팀은 4명으로 시작했고 한 명이 빠진 뒤 3명이 작업했습니다. 다른 두 팀원은 각각 VFX·SFX·UI와 Enemy AI를 담당했습니다.

캐릭터의 이동과 전투는 Unreal Engine 5.4의 Motion Matching을 사용해 Blueprint로 구성했습니다. 시간 배율이 바뀔 때 비 연출도 이에 맞춰 변하도록 시간 제어 Blueprint와 Niagara 파라미터를 연결했습니다.

[플레이 영상](https://www.youtube.com/watch?v=264Wfi25UOU) · [포트폴리오](https://haxx0rbunny.github.io/index.html#project-1)

## 시간 제어

`Content/TimeManipulate/TimeManipulater_BP.uasset`에 시간 제어를 모았습니다. `ClockUp`, `Clock Over`에서 `SetGlobalTimeDilation`을 호출하고, 비 액터의 `Rain_Delation`을 호출하도록 연결했습니다.

시간 진행을 계산하는 `PlayTimeLineFunction`에는 `GetRealTimeSeconds`와 타이머 정리 로직이 있습니다. `CalculateAlphaUpdate`는 진행 시간과 지속 시간의 비율을 0~1로 제한한 뒤 커브 값을 읽습니다. `Timeline` 함수에서는 이 값을 사용해 보간합니다.

| Blueprint 함수 | 확인한 호출과 값 |
|---|---|
| `ClockUp`, `Clock Over` | `SetGlobalTimeDilation`, `Rain_Delation` |
| `PlayTimeLineFunction` | `GetRealTimeSeconds`, `K2_ClearAndInvalidateTimerHandle` |
| `CalculateAlphaUpdate` | `TLCurrentTime / Duration`, `FClamp`, `GetFloatValue` |
| `Timeline` | `Lerp(A, B, Alpha)` |

## 비 파티클 조절

`Content/Rain/Rain_BP.uasset`의 `Rain_Delation`에서 시간 조작 상태에 따라 비 연출을 조절했습니다. `VInterpTo`의 보간 결과를 Niagara 컴포넌트의 `SetVariableVec3`에 전달하고, `Max Scale Factor`를 갱신하는 구조입니다. 비 파티클의 스케일을 바꿔 시간 변화가 화면에서도 드러나도록 했습니다.

## 확인 범위와 공개 소스

위 내용은 로컬 프로젝트의 `.uasset`을 UAssetAPI 1.1.0으로 읽어 함수 참조와 컴파일된 Kismet 호출을 확인한 기록입니다. 아래 추출 파일에는 원본 에셋의 상대 경로와 SHA-256, 확인한 함수 호출이 들어 있습니다. 함수 목록은 실행 순서도나 Unreal Editor 캡처를 대신하지 않으며, 이 분석에서는 게임을 실행해 검증하지 않았습니다.

- [Blueprint에서 추출한 함수 호출](edgedrive-blueprint-calls.json)
- [UAssetAPI](https://github.com/atenfyr/UAssetAPI)
- [공개 Sanghyeon 브랜치의 Content](https://github.com/Team-Illegal-Design-Club/EdgeDrive/tree/Sanghyeon/Content)

GitHub의 `main`에는 프로젝트 설정과 기본 모듈이 있습니다. `Sanghyeon`에는 일부 캐릭터·입력 에셋이 있지만, 이 문서에서 설명한 시간 제어와 비 파티클 Blueprint는 현재 해당 브랜치에 포함돼 있지 않습니다. 플레이 결과는 영상과 포트폴리오의 배포 빌드에서 확인할 수 있습니다.
