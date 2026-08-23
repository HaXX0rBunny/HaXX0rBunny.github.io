// Korean narrative overrides. English project data remains canonical in app.js.
window.PORTFOLIO_PROJECT_KO = {
    "1": {
        "team_label": "팀 프로젝트 · 4명",
        "scope_label": "게임 프로젝트",
        "my_role": "게임 디렉터 & 게임플레이 프로그래머",
        "description": "베이오네타, 다크 소울, 페이퍼 마리오에서 영감을 받은 하이브리드 3D 액션 게임입니다. 디지펜 부산 아카데미 게임 졸업 프로젝트로, 언리얼 엔진 5의 최신 기능과 복합적인 게임플레이 시스템 구현 역량을 키운 프로젝트입니다.",
        "collaboration_details": {
            "team_size": 4,
            "my_role": "게임 디렉터 & 게임플레이 프로그래머",
            "team_roles": [
                "게임 디렉터 & 게임플레이 프로그래머 (본인)",
                "3D 아티스트 & 애니메이터",
                "UI/UX 디자이너",
                "사운드 디자이너 & 음악 편곡"
            ],
            "collaboration_tools": [
                "Git",
                "GitHub",
                "Google Drive",
                "Discord"
            ],
            "team_dynamics": "아티스트·디자이너와 협업해 기술 구현과 게임 디자인 결정을 주도하고 일정 관리와 기능 우선순위를 조정했습니다."
        },
        "technical_challenges": [
            "복잡한 전투 상황에서의 프레임 드랍",
            "다중 무기 시스템의 메모리 관리",
            "모션 매칭 시스템에서 상태 동기화",
            "50~60 FPS 목표를 위한 성능 최적화"
        ],
        "troubleshooting": {
            "performance_issues": {
                "problem": "다수의 적과 이펙트가 동시에 발생하는 복잡한 전투 구간에서 프레임이 급격히 저하됨",
                "root_cause": "메인 스레드에서 드로우 호출량이 과다하고 전투 계산이 동기식으로 처리됨",
                "solution": "이벤트 기반 전투 구조와 VFX 오브젝트 풀링을 적용",
                "result": "CPU 사용량이 약 30% 감소하고 50~60 FPS가 안정적으로 확보됨",
                "title": "복합 전투 구간의 성능 저하"
            },
            "memory_optimization": {
                "problem": "무기 전환 시 메모리 누수 발생",
                "root_cause": "무기 컴포넌트와 애니메이션 블루프린트 정리가 불완전했음",
                "solution": "무기 컴포넌트 생명주기 관리 구조를 새로 설계",
                "result": "Unreal Insights 기준 메모리 사용량이 28% 감소함",
                "title": "무기 전환 과정의 메모리 누수"
            }
        },
        "development_timeline": {
            "duration": "2개월",
            "phases": [
                {
                    "phase": "기획 준비",
                    "duration": "2주",
                    "focus": "컨셉 설계와 기술 기획"
                },
                {
                    "phase": "핵심 개발",
                    "duration": "1개월",
                    "focus": "전투 시스템 및 핵심 메커니즘 구현"
                },
                {
                    "phase": "폴리싱 & 최적화",
                    "duration": "2주",
                    "focus": "성능 튜닝과 버그 수정"
                }
            ]
        },
        "subtitle": "하이브리드 3D 액션 게임"
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
        "description": "상점/업그레이드 루프와 바람 및 중력 기반의 탄환 투사 탄막 전투를 결합한 4인 C++ 팀 프로젝트입니다. 저는 메뉴, 상점, 전투 HUD, 버튼 및 호버 상호작용, 아이템 툴팁, UI-전투 입력 경로를 구축하고 통합했습니다.",
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
        "scope_label": "주차별 과제",
        "my_role": "렌더링 & 엔진 프로그래머",
        "description": "KRAFTON Jungle Game Tech Lab 3rd 동안 기여한 프로젝트를 통합 정리한 기록입니다. 주차별 스냅샷은 3D 기초부터 에셋 임포트, 조명, 그림자, 물리, 애니메이션, 파티클, 최종 게임 통합까지의 커스텀 엔진 개발 흐름을 보여줍니다.",
        "coverAlt": "Game Tech Lab 과정에서 개발한 커스텀 C++ 엔진 파티클 에디터",
        "coverLabel": "엔진 개발 아카이브",
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
        "subtitle": "C++ 렌더링 및 엔진 개발"
    },
    "5": {
        "team_label": "팀 제품 · 3인 팀",
        "scope_label": "Epic Project · Fab 제품",
        "my_role": "팀장 · Motion Phase · 런타임 시스템 · GPU 변형 프로그래머",
        "subtitle": "실시간 애니메이션 과장 · GPU Mesh Deformer 플러그인",
        "description": "기존 애니메이션에 재사용 가능한 카메라 대응 과장을 더하는 UE 5.8 플러그인입니다. 6단계 Motion Phase Analyzer가 최종 포즈의 Region 움직임을 안정된 타이밍·방향·강도 Signal로 변환하고, Response Rule이 선택적인 GPU 메시 변형을 실행합니다.",
        "coverAlt": "스타일화된 GPU 메시 변형 효과를 보여 주는 Dynamic OverAnimation 제품 이미지",
        "coverLabel": "Fab 제품 · Epic Project",
        "collaboration_details": {
            "team_size": "DynaMax · 3인 팀",
            "my_role": "팀장 · Motion Phase · 런타임 시스템 · GPU 변형 프로그래머",
            "team_roles": [
                "제품 방향, 시스템 설계, Motion Phase 분석, 런타임 응답, GPU 변형 파이프라인, 에디터 저작 도구 (팀장 · 본인)",
                "런타임, 에디터, 콘텐츠, 제품 출시 전반의 DynaMax 팀 기여"
            ],
            "collaboration_tools": ["Perforce", "Unreal Engine 5.8", "Visual Studio", "Fab"],
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
                { "phase": "Native 계약", "duration": "Bone Group 계약", "focus": "Bone Group, hierarchy 확장, LOD falloff, data-driven response" },
                { "phase": "런타임 및 GPU 합성", "duration": "Snapshot·RDG 합성", "focus": "Response arbitration, Squash & Stretch, snapshot, RDG pass, normal/tangent" },
                { "phase": "자동 Motion Phase", "duration": "Phase·Region 상태 기계", "focus": "Phase 안정화, Region owner, cycle timing, animation routing, 저작 UX" },
                { "phase": "제품 통합", "duration": "Socket Follower 통합", "focus": "변형 socket follower와 showcase asset 복구" }
            ]
        }
    }
};
