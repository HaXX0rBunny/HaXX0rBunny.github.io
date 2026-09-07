// Korean narrative overrides. English project data remains canonical in app.js.
window.PORTFOLIO_PROJECT_KO = {
    "1": {
        "team_label": "최종 3인 팀",
        "scope_label": "게임플레이",
        "my_role": "팀장 · 스테이지·캐릭터·시간 제어",
        "description": "팀장을 맡아 스테이지와 플레이어 캐릭터, 시간 제어를 구현했습니다. Blueprint로 Motion Matching 기반 이동과 전투 동작을 연결하고, 시간 배율에 맞춰 비 파티클의 스케일을 조절했습니다.",
        "collaboration_details": {
            "team_size": "4명으로 시작, 최종 3명",
            "my_role": "팀장 · 스테이지·캐릭터·시간 제어",
            "team_roles": [
                "본인: 팀장, 스테이지, 플레이어 캐릭터 전체, Time Dilation과 비 파티클 조절",
                "팀원: VFX, SFX, UI",
                "팀원: Enemy AI"
            ],
            "collaboration_tools": [
                "Git",
                "GitHub",
                "Google Drive"
            ],
            "team_dynamics": "4명으로 시작한 프로젝트에서 한 명이 빠진 뒤 3명이 작업했습니다. 담당 기능을 구현하면서 작업 우선순위와 진행 상황을 조율했습니다. 프로젝트 파일명 변경으로 패키징이 중단됐을 때는 로그와 참조 경로를 추적해 복구했고, 이후 프로젝트 설정 파일의 Git 관리 규칙을 팀에 제안했습니다."
        },
        "technical_challenges": [
            "스테이지를 제작하고, Blueprint로 Motion Matching 기반 플레이어 캐릭터의 이동과 전투 동작을 구현했습니다.",
            "TimeManipulater_BP에서 SetGlobalTimeDilation을 이용한 시간 제어를 만들고, Tick에 의존하던 시간 진행 로직을 분리했습니다.",
            "시간 제어를 Rain_BP의 Rain_Delation과 연결했습니다. VInterpTo로 보간한 값을 Niagara의 Max Scale Factor에 전달해 비 파티클의 스케일을 조절했습니다.",
            "패키징 로그와 프로젝트 참조 경로를 추적해 팀 공용 빌드를 복구했습니다."
        ],
        "troubleshooting": {
            "packaging_references": {
                "title": "프로젝트 파일명 변경으로 중단된 패키징 복구",
                "problem": "패키징이 실패해 팀이 함께 확인할 실행 빌드를 만들 수 없었습니다.",
                "root_cause": "에디터 밖에서 .uproject 파일명을 바꾸면서 프로젝트 참조가 일치하지 않게 됐습니다.",
                "solution": "빌드 로그와 참조 경로를 역추적해 파일명을 복구하고 영향을 받은 참조를 수정했습니다.",
                "result": "패키징을 다시 진행할 수 있게 됐습니다. 같은 문제가 반복되지 않도록 프로젝트 설정 파일의 Git 관리 규칙을 팀에 제안했습니다."
            }
        },
        "development_timeline": null,
        "subtitle": "3D 액션 게임 · 캐릭터 이동과 시간 제어",
        "source_note": "GitHub의 main 브랜치에는 설정과 기본 모듈이, Sanghyeon 브랜치에는 일부 캐릭터·입력 에셋이 있습니다. 시간 제어와 비 파티클 Blueprint는 로컬 프로젝트에서 확인한 함수 호출을 구현 기록에 정리했습니다.",
        "highlights": [
            {
                "label": "Blueprint 구현 기록",
            "href": "https://github.com/HaXX0rBunny/HaXX0rBunny.github.io/blob/main/docs/edgedrive-blueprint.md"
            },
            {
                "label": "공개 캐릭터·입력 에셋",
            "href": "https://github.com/Team-Illegal-Design-Club/EdgeDrive/tree/Sanghyeon/Content"
            }
        ]
    },
    "2": {
        "team_label": "팀 프로젝트 · 2명",
        "scope_label": "게임 프로젝트",
        "my_role": "게임플레이 & 시스템 프로그래머",
        "description": "풀 기반 발사체와 데이터 기반 레벨 설계, 3개 보스 상태기계, 상태 기반 게임 자원 수명 관리를 중심으로 구성한 C 기반 2D 액션 프로토타입입니다. 공개 저장소는 원래의 APETI 이름을 유지하지만 배포 메뉴에서는 게임명이 MEGA ROGUE로 표시됩니다.",
        "collaboration_details": {
            "team_size": 2,
            "my_role": "게임플레이 & 시스템 프로그래머",
            "team_roles": [
                "게임플레이 & 시스템 프로그래머 (본인)",
                "게임플레이 & 콘텐츠 프로그래머"
            ],
            "collaboration_tools": [
                "Git",
                "Visual Studio"
            ],
            "team_dynamics": "공유 C 코드베이스에서 feature branch 기반으로 게임플레이, 보스, 에디터 통합, 상태 연결 파이프라인을 분리해 개발했습니다."
        },
        "technical_challenges": [
            "프레임레이트 변화에 따른 발사체 이동의 결정성 유지",
            "고정 용량 투사체 및 함정 풀의 재사용 구조 설계",
            "메뉴/게임/보스/클리어/게임 오버 상태 동기화",
            "텍스트 기반 .lvl 레벨 데이터의 직렬화 처리",
            "각 게임 상태의 초기화·종료 구간에 맞춘 사운드 핸들 수명 관리"
        ],
        "troubleshooting": {
            "projectile_timestep": {
                "problem": "60Hz에서 발사체가 느려지거나, 프레임 간격이 0.01초 미만이면 업데이트가 멈추는 현상",
                "root_cause": "프레임 통합 횟수를 `floor(dt / 0.01)`으로 계산해 나머지 시간을 버려 120Hz에서 0 step이 발생",
                "solution": "프레임 델타를 3분할 서브스텝으로 나눠 이동/충돌을 분할 처리",
                "result": "매 프레임의 전체 dt를 세 번의 서브스텝에 반영해 고주사율에서도 0-step 업데이트가 발생하지 않도록 보정",
                "title": "프레임레이트에 따른 발사체 이동 오차"
            },
            "enemy_patrol_collision": {
                "problem": "순찰 적이 벽이나 플랫폼 가장자리에 먼저 스며든 후 방향 전환하는 버그",
                "root_cause": "임시 이동 후 복구 없이 속도를 반전해 다음 프레임의 시작점이 충돌 지점이 됨",
                "solution": "이동 전 위치를 저장했다가 충돌/낙하 조건에서 복구 후 방향 전환",
                "result": "거부된 이동 값이 누적되어 다음 프레임을 오차시키던 문제가 제거됨",
                "title": "순찰 적의 충돌 위치 누적"
            },
            "sound_lifetime": {
                "problem": "상태 전환 시 플레이어/메뉴 오디오 핸들의 정리 경로가 중복되거나 누락됨",
                "root_cause": "버튼 콜백, GameOver_exit, 상태 종료 함수로 정리 로직이 분산",
                "solution": "게임/메뉴 종료 경로로 소유권을 통합하고 중복 콜백 정리를 제거",
                "result": "자원 수명 주기가 상태 라이프사이클과 정렬되어 추적성이 개선됨",
                "title": "게임 상태 전환 시 사운드 수명 불일치"
            }
        },
        "development_timeline": {
            "duration": "2024년 6월 19일 ~ 25일",
            "phases": [
                {
                    "phase": "핵심 플레이어 로직",
                    "duration": "6/19–6/21",
                    "focus": "플레이어·발사체 풀·적·충돌 처리 구성"
                },
                {
                    "phase": "보스 및 레벨 시스템",
                    "duration": "6/22–6/24",
                    "focus": "보스 상태기계, 에디터 연동, 레벨 파일 구성"
                },
                {
                    "phase": "통합",
                    "duration": "6/25",
                    "focus": "게임 상태 연동, 자원 정리, 릴리즈 빌드 준비"
                }
            ]
        },
        "downloadLabel": "Windows 실행 파일",
        "subtitle": "2D 액션 플랫포머 · 보스 러시 프로토타입"
    },
    "3": {
        "team_label": "팀 프로젝트 · 4명",
        "scope_label": "게임 프로젝트",
        "my_role": "UI 시스템 & 게임플레이 연동 프로그래머",
        "description": "상점/업그레이드 루프와 바람과 중력의 영향을 받는 포격 전투를 결합한 4인 C++ 팀 프로젝트입니다. 저는 메뉴, 상점, 전투 HUD, 버튼 및 호버 상호작용, 아이템 툴팁, UI-전투 입력 경로를 구축하고 통합했습니다.",
        "collaboration_details": {
            "team_size": 4,
            "my_role": "UI 시스템 & 게임플레이 연동 프로그래머",
            "team_roles": [
                "UI 시스템 & 게임플레이 연동 (본인)",
                "전투 & 게임플레이",
                "레벨 & 콘텐츠",
                "애니메이션 & 이펙트"
            ],
            "collaboration_tools": [
                "Git 브랜치",
                "Visual Studio 2022"
            ],
            "team_dynamics": "공유 Alpha Engine 코드베이스에서 기능 브랜치로 협업하며 UI 아키텍처·게임플레이 연동·입력 라우팅을 담당했습니다."
        },
        "technical_challenges": [
            "월드/인터페이스/텍스트 렌더링 순서 분리",
            "조준 상태를 바꾸지 않으면서 화면 좌표 기반 UI 입력 전달",
            "상점, 인벤토리, 전투, HUD 상태 동기화",
            "툴팁 및 인터페이스 오브젝트 수명 관리",
            "호버 가시성과 클릭 판정 일관성 유지"
        ],
        "troubleshooting": {},
        "development_timeline": {
            "duration": "2024년 8월 27일 ~ 10월 9일",
            "phases": [
                {
                    "phase": "UI 기반 구축",
                    "duration": "8/27–9/6",
                    "focus": "메뉴, 상점, 전투 HUD, 버튼 관리, UI 컴포넌트 구성"
                },
                {
                    "phase": "시스템 통합",
                    "duration": "9/24–30",
                    "focus": "렌더 순서 정렬, 상점/전투 동기화, 아이템 입력, 수명 정리 보정"
                },
                {
                    "phase": "최종 UI 정제",
                    "duration": "10/8–9",
                    "focus": "호버 동작, 툴팁, 레이아웃 정제, 최종 통합"
                }
            ]
        },
        "downloadLabel": "Windows 실행 파일",
        "subtitle": "2D 턴 기반 포병 전략 게임"
    },
    "4": {
        "team_label": "팀 프로젝트 · 3~4명",
        "scope_label": "렌더링 · 독립 실행 빌드",
        "my_role": "렌더링 & 엔진 프로그래머",
        "description": "C++과 DirectX 11로 개발한 자체 엔진입니다. 오브젝트 5만 개 장면의 임포스터 렌더링과 에디터 밖에서 게임을 실행하는 Build–Cook–Stage 파이프라인을 구현했습니다. 주차별로 비교 화면, 측정 조건, 구현 이력을 정리했습니다.",
        "coverAlt": "Game Tech Lab 과정에서 개발한 커스텀 C++ 엔진 파티클 에디터",
        "coverLabel": "C++ 자체 엔진",
        "collaboration_details": {
            "team_size": "주차별 3~4명",
            "my_role": "렌더링 & 엔진 프로그래머",
            "team_roles": [
                "렌더링/엔진 프로그래밍 (본인)",
                "매주 바뀌는 그래픽스·엔진·게임플레이·툴 개발 파트"
            ],
            "collaboration_tools": [
                "Git",
                "GitHub",
                "Visual Studio",
                "Discord"
            ],
            "team_dynamics": "매주 바뀌는 팀 구성에 맞춰 렌더링/엔진 기능을 통합했고, Week01~Week14의 검증 가능한 스냅샷을 보존했습니다."
        },
        "technical_challenges": [
            "기본 3D 렌더링 기반 엔진을 에디터/런타임 시스템으로 확장",
            "OBJ/FBX 에셋을 조명·그림자·물리·애니메이션·파티클 파이프라인과 통합",
            "옥타헤드럴 임포스터를 활용해 대규모 오브젝트 장면 성능 최적화",
            "주차별 코드베이스 변경과 외부 SDK 의존성 변화에도 빌드 가능한 구조 유지"
        ],
        "troubleshooting": {
            "large_scene_rendering": {
                "problem": "동일 메시를 대량 배치한 장면에서 전체 메시 렌더링을 계속 사용해 성능 병목이 급격히 증가",
                "root_cause": "오브젝트 수 증가에 따라 객체별 지오메트리/드로우 오버헤드가 선형 이상으로 증가",
                "solution": "방향 정보를 아틀라스로 베이크한 옥타헤드럴 임포스터 파이프라인을 도입해 원거리 오브젝트는 경량 프록시로 대체 렌더",
                "result": "메쉬 렌더링 대비 임포스터 렌더링 비교 기반의 최적화 경로를 정립",
                "title": "대규모 반복 오브젝트 렌더링 병목"
            },
            "engine_integration": {
                "problem": "주차별 엔진 브랜치가 렌더링 기능, 에셋 형식, 외부 런타임 의존성이 다르게 누적됨",
                "root_cause": "각 과제가 서로 다른 서브시스템을 확장하면서 공유 기반 엔진이 동시에 분기됨",
                "solution": "검증된 주차 스냅샷을 정렬해 구성하고 FBX SDK/ FMOD 등 필수 라이브러리 링크를 과제별로 정비",
                "result": "14주 전개 과정이 한 허브에서 이어지는 검토 가능한 아카이브로 재구성됨",
                "title": "주차별 엔진 의존성 통합"
            }
        },
        "development_timeline": {
            "duration": "전체 과정",
            "phases": [
                {
                    "phase": "1주차: 게임잼",
                    "duration": "Week 01",
                    "focus": "Jungle Brick Break 게임 루프, 입력, 충돌 기초"
                },
                {
                    "phase": "2주차: 3D 진입",
                    "duration": "Week 02",
                    "focus": "3D 기본 도형, 씬 컴포넌트, 카메라 변환, 스카이 구 구축"
                },
                {
                    "phase": "3주차: Atlas · Billboard · Batch Line · Bounding Box",
                    "duration": "Week 03",
                    "focus": "재사용 가능한 렌더링 유틸과 엔진 디버깅 기능"
                },
                {
                    "phase": "4주차: OBJ Import",
                    "duration": "Week 04",
                    "focus": "OBJ/MTL 임포트, UStaticMesh 자산, 레지스트리 조회, 버전형 .dasset 생성"
                },
                {
                    "phase": "5주차: 두 번째 게임잼",
                    "duration": "Week 05",
                    "focus": "옥타헤드럴 임포스터 베이킹과 대규모 장면 최적화"
                },
                {
                    "phase": "6주차: 데칼 · 안개 정리",
                    "duration": "Week 06",
                    "focus": "디컬·표면 데칼, 볼류메트릭 안개, 환경 렌더링"
                },
                {
                    "phase": "7주차: Let There Be Light",
                    "duration": "Week 07",
                    "focus": "실시간 조명과 머티리얼 통합"
                },
                {
                    "phase": "8주차: Light & Shadow",
                    "duration": "Week 08",
                    "focus": "라이트 스페이스 렌더링과 실시간 그림자 평가"
                },
                {
                    "phase": "9주차: 세 번째 게임잼",
                    "duration": "Week 09",
                    "focus": "독립 실행형 빌드, 쿠킹/패키징, 런타임 로드 및 검증"
                },
                {
                    "phase": "10주차: More Than Just Weight",
                    "duration": "Week 10",
                    "focus": "질량·힘·충돌·반응 시스템"
                },
                {
                    "phase": "11주차: Let's Go, Move!",
                    "duration": "Week 11",
                    "focus": "이동, 입력, 액터 상태, 애니메이션 갱신"
                },
                {
                    "phase": "12주차: Dance of the Dust",
                    "duration": "Week 12",
                    "focus": "파티클 편집기, 모듈, 커브, 런타임 효과"
                },
                {
                    "phase": "13주차: Focus and Force",
                    "duration": "Week 13",
                    "focus": "깊이 기반 2종류 뎁스오브필드와 카메라 포커스 제어"
                },
                {
                    "phase": "14주차: Final Game Jam",
                    "duration": "Week 14",
                    "focus": "렌더링, FBX, 스켈레탈 애니메이션, 물리, 오디오, 툴, 게임플레이 통합"
                }
            ]
        },
        "subtitle": "C++ 렌더링 및 엔진 개발",
        "highlights": [
            {
                "label": "임포스터 비교 보기",
                "href": "gametechlab.html#week05/evidence"
            },
            {
                "label": "독립 실행 빌드 보기",
                "href": "gametechlab.html#week09/evidence"
            }
        ]
    },
    "5": {
        "team_label": "3인 팀",
        "scope_label": "Fab 출시",
        "my_role": "팀장 · 동작 분석 · GPU 변형 · 편집 도구",
        "subtitle": "애니메이션 과장 변형 플러그인",
        "description": "기존 애니메이션에 과장된 움직임을 더하는 Unreal Engine 플러그인입니다. 팀장으로 동작 분석, 신호 안정화, GPU 변형, 편집 도구를 구현하고 팀원의 작업을 통합해 Fab에 출시했습니다.",
        "coverAlt": "스타일화된 GPU 메시 변형 효과를 보여 주는 Dynamic OverAnimation 제품 이미지",
        "coverLabel": "Dynamic OverAnimation",
        "collaboration_details": {
            "team_size": "DynaMax · 3인 팀",
            "my_role": "팀장 · Motion Phase · 런타임 시스템 · GPU 변형 프로그래머",
            "team_roles": [
                "제품 방향, 시스템 설계, Motion Phase 분석, 런타임 응답, GPU 변형 파이프라인, 에디터 저작 도구 (팀장 · 본인)",
                "런타임, 에디터, 콘텐츠, 제품 출시 전반의 DynaMax 팀 기여"
            ],
            "collaboration_tools": [
                "Perforce",
                "Unreal Engine 5.8",
                "Visual Studio",
                "Fab"
            ],
            "team_dynamics": "DynaMax 3인 제품 팀의 팀장을 맡아 제품·시스템 방향을 정하고, 출시된 팀 플러그인에서 Motion Phase Analyzer, Runtime Response, Render/GPU, Editor 시스템을 구현했습니다."
        },
        "technical_challenges": [
            "포즈 기반 자동 분석과 AnimNotify·Gameplay Event의 저작 의도를 분리한 뒤 결정적으로 중재",
            "Region·Chain 변형 범위를 선택적으로 유지하면서 카메라 대응 실루엣 Guard 적용",
            "애니메이션 Phase 전환 전 노이즈가 섞인 움직임 측정값과 Region Owner 경쟁을 안정화",
            "Game Thread의 변형 상태를 불변 snapshot으로 Render Thread에 전달",
            "RDG에서 module pass와 vertex-factory 출력을 합성"
        ],
        "troubleshooting": {
            "phase_stability": {
                "title": "모션 노이즈로 잘못된 phase 전이가 발생",
                "problem": "한 프레임의 급격한 값 변화만으로 움직임 추세가 형성되기 전에 Phase가 뒤집히거나 Anticipation이 시작될 수 있었습니다.",
                "root_cause": "단순 에너지 임계값에는 추세 이력, 확인 시간, 취소 상태가 포함되지 않았습니다.",
                "solution": "Adaptive Trend Smoothing, 확인 시간, Phase별 Guard, Cycle History를 함께 적용했습니다.",
                "result": "결정적 테스트에서 16ms 고에너지 샘플은 강도 0의 Anticipation 경계에 유지되고, 32ms 확인 샘플에서 Action으로 전환됩니다."
            },
            "region_ownership": {
                "title": "점수가 비슷한 Region 사이에서 owner가 흔들림",
                "problem": "거의 같은 점수의 두 Region이 인접 프레임마다 owner를 교체할 수 있었습니다.",
                "root_cause": "현재 최고점만 고르는 방식에는 hysteresis와 challenger 확인 과정이 없었습니다.",
                "solution": "상대 15% 또는 절대 0.02의 우위를 요구하고 challenger가 안정될 때까지 기존 owner를 유지했습니다.",
                "result": "작은 점수 변동만으로는 현재 Region owner가 바뀌지 않습니다."
            },
            "render_handoff": {
                "title": "변경 가능한 gameplay state와 render 소비 시점이 어긋날 위험",
                "problem": "변형 요청 생성 후 상태가 바뀌면 renderer가 다른 값을 읽을 가능성이 있었습니다.",
                "root_cause": "Analyzer가 소유한 변경 가능한 상태와 비동기 render work의 수명이 달랐습니다.",
                "solution": "value-copy snapshot을 scene 및 execution group 단위 work item으로 이동하고 MeshDeformer stage fence 이후 제출했습니다.",
                "result": "Render work는 안정된 snapshot을 소비하고 다른 scene/group의 작업은 queue에 유지됩니다."
            },
            "visual_attachments": {
                "title": "socket 부착 visual이 변형된 endpoint에서 분리됨",
                "problem": "메시가 변형되어도 부착 visual은 변형 전 socket transform을 따라갔습니다.",
                "root_cause": "skeletal socket transform에 변형으로 생긴 종속 visual offset이 포함되지 않았습니다.",
                "solution": "변형 offset을 별도로 전달해 등록된 visual에 적용하고 누적 오차 없이 복원하며 physics 대상은 제외했습니다.",
                "result": "부착 visual이 변형된 endpoint를 따라가면서 transform 오차가 누적되지 않습니다."
            }
        },
        "development_timeline": {
            "duration": "Epic Project · 2026",
            "phases": [
                {
                    "phase": "Native 계약",
                    "duration": "Bone Group 계약",
                    "focus": "Bone Group, hierarchy 확장, LOD falloff, data-driven response"
                },
                {
                    "phase": "런타임 및 GPU 합성",
                    "duration": "Snapshot·RDG 합성",
                    "focus": "Response arbitration, Squash & Stretch, snapshot, RDG pass, normal/tangent"
                },
                {
                    "phase": "자동 Motion Phase",
                    "duration": "Phase·Region 상태 기계",
                    "focus": "Phase 안정화, Region owner, cycle timing, animation routing, 저작 UX"
                },
                {
                    "phase": "제품 통합",
                    "duration": "Socket Follower 통합",
                    "focus": "변형 socket follower와 showcase asset 복구"
                }
            ]
        }
    }
};
