// Korean narrative overrides. English project data remains canonical in app.js.
window.PORTFOLIO_PROJECT_KO = {
    "1": {
        "team_label": "최종 3인 팀",
        "scope_label": "게임플레이",
        "my_role": "팀장, 스테이지, 캐릭터, 시간 제어",
        "description": "팀장을 맡아 스테이지와 플레이어 캐릭터, 시간 제어를 구현했습니다. 이동과 전투는 Blueprint로 구현하고, 이동 애니메이션에 Motion Matching을 적용했습니다. 시간 배율에 맞춰 비 파티클의 크기도 조절했습니다.",
        "collaboration_details": {
            "team_size": "4명으로 시작, 최종 3명",
            "my_role": "팀장, 스테이지, 캐릭터, 시간 제어",
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
            "스테이지와 플레이어의 이동, 전투를 Blueprint로 구현하고, 이동 애니메이션에 Motion Matching을 적용했습니다.",
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
        "subtitle": "3D 액션 게임, 캐릭터 이동과 시간 제어",
        "source_note": "공개 저장소에는 일부 에셋만 포함됩니다. 시간 제어와 비 파티클 소스는 미공개이며, 동작은 영상과 배포 빌드에서 볼 수 있습니다.",
        "highlights": [
            {
                "label": "시간 제어와 비 연출 구현",
            "href": "https://github.com/HaXX0rBunny/HaXX0rBunny.github.io/blob/main/docs/edgedrive-blueprint.md"
            },
            {
                "label": "공개 캐릭터, 입력 에셋",
            "href": "https://github.com/Team-Illegal-Design-Club/EdgeDrive/tree/Sanghyeon/Content"
            }
        ]
    },
    "2": {
        "team_label": "팀 프로젝트, 2명",
        "scope_label": "게임 프로젝트",
        "my_role": "게임플레이 & 시스템 프로그래머",
        "description": "C와 CProcessing으로 만든 2D 액션 게임입니다. 보스의 공격과 피격, 사망 처리, 충돌 판정, 발사체 풀을 담당했습니다. 소스 저장소는 APETI라는 이름으로 공개되어 있습니다.",
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
            "team_dynamics": "기능별 Git 브랜치에서 게임플레이와 보스, 에디터를 나누어 작업하고 각 게임 상태에서 함께 동작하도록 연결했습니다."
        },
        "technical_challenges": [
            "프레임레이트에 따른 발사체 이동 오차 수정",
            "고정 용량 투사체 및 함정 풀의 재사용 구조 설계",
            "메뉴/게임/보스/클리어/게임 오버 상태 동기화",
            "텍스트 기반 .lvl 레벨 데이터의 직렬화 처리",
            "각 게임 상태의 초기화, 종료 구간에 맞춘 사운드 핸들 수명 관리"
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
                "result": "충돌한 위치가 다음 프레임의 이동 기준으로 남지 않도록 수정",
                "title": "순찰 적의 충돌 위치 누적"
            },
            "sound_lifetime": {
                "problem": "상태 전환 시 플레이어/메뉴 오디오 핸들의 정리 경로가 중복되거나 누락됨",
                "root_cause": "버튼 콜백, GameOver_exit, 상태 종료 함수로 정리 로직이 분산",
                "solution": "게임/메뉴 종료 경로로 소유권을 통합하고 중복 콜백 정리를 제거",
                "result": "게임 상태가 끝날 때 해당 사운드 자원을 한 곳에서 해제하도록 정리",
                "title": "게임 상태 전환 시 사운드 수명 불일치"
            }
        },
        "development_timeline": {
            "duration": "2024년 6월 19일 ~ 25일",
            "phases": [
                {
                    "phase": "핵심 플레이어 로직",
                    "duration": "6/19–6/21",
                    "focus": "플레이어, 발사체 풀, 적, 충돌 처리 구성"
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
        "subtitle": "2D 액션 플랫포머, 보스 러시 프로토타입"
    },
    "3": {
        "team_label": "팀 프로젝트, 4명",
        "scope_label": "게임 프로젝트",
        "my_role": "UI 시스템 & 게임플레이 연동 프로그래머",
        "description": "상점에서 장비를 준비하고 바람과 중력을 고려해 포격하는 4인 팀의 C++ 게임입니다. 메뉴와 상점, 전투 HUD를 구현하고 버튼, 툴팁과 게임 상태를 연결했습니다. UI를 클릭할 때 전투 조작이 함께 실행되는 입력 충돌도 수정했습니다.",
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
            "team_dynamics": "공유 Alpha Engine 코드베이스에서 기능 브랜치로 협업하며 UI 아키텍처, 게임플레이 연동, 입력 라우팅을 담당했습니다."
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
        "subtitle": "2D 턴제 포격 게임"
    },
    "4": {
        "team_label": "팀 프로젝트, 3~4명",
        "scope_label": "렌더링, 독립 실행 빌드",
        "my_role": "렌더링 & 엔진 프로그래머",
        "description": "C++과 DirectX 11로 자체 엔진을 개발했습니다. 오브젝트 5만 개 장면에 임포스터 렌더링을 적용하고, 에디터에서 만든 게임을 독립 실행 파일로 만드는 Build, Cook, Stage 과정을 구현했습니다.",
        "coverAlt": "Game Tech Lab 과정에서 개발한 커스텀 C++ 엔진 파티클 에디터",
        "coverLabel": "C++ 자체 엔진",
        "collaboration_details": {
            "team_size": "주차별 3~4명",
            "my_role": "렌더링 & 엔진 프로그래머",
            "team_roles": [
                "렌더링/엔진 프로그래밍 (본인)",
                "매주 바뀌는 그래픽스, 엔진, 게임플레이, 툴 개발 파트"
            ],
            "collaboration_tools": [
                "Git",
                "GitHub",
                "Visual Studio",
                "Discord"
            ],
            "team_dynamics": "매주 팀 구성이 바뀌는 환경에서 담당한 렌더링, 엔진 기능을 팀 공용 코드에 통합했습니다."
        },
        "technical_challenges": [
            "기본 3D 렌더링 기반 엔진을 에디터/런타임 시스템으로 확장",
            "OBJ/FBX 에셋을 조명, 그림자, 물리, 애니메이션, 파티클 파이프라인과 통합",
            "옥타헤드럴 임포스터를 활용해 대규모 오브젝트 장면 성능 최적화",
            "주차별 코드베이스 변경과 외부 SDK 의존성 변화에도 빌드 가능한 구조 유지"
        ],
        "troubleshooting": {
            "large_scene_rendering": {
                "problem": "동일 메시를 대량 배치한 장면에서 전체 메시 렌더링을 계속 사용해 성능 병목이 급격히 증가",
                "root_cause": "오브젝트가 늘어날수록 정점 처리량과 개별 드로우 호출이 증가",
                "solution": "메시를 방향별로 촬영해 Atlas를 만들고, 반복 오브젝트를 임포스터로 묶어 렌더링",
                "result": "오브젝트 5만 개의 테스트 장면에서 Draw Call을 10,725회에서 2회로, 프레임 시간을 6.62ms에서 3.21ms로 단축",
                "title": "대규모 반복 오브젝트 렌더링 병목"
            }
        },
        "development_timeline": {
            "duration": "엔진 제작 과정, 1~14주",
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
                    "phase": "3주차: Atlas, Billboard, Batch Line, Bounding Box",
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
                    "phase": "6주차: 데칼, 안개 정리",
                    "duration": "Week 06",
                    "focus": "Height Fog와 Spotlight Decal, 뷰포트 Alpha 혼합"
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
                    "focus": "스켈레탈 메시 임포트, 스키닝, Bone 피킹"
                },
                {
                    "phase": "11주차: Let's Go, Move!",
                    "duration": "Week 11",
                    "focus": "FBX 애니메이션 임포트, Skeleton 매칭, 캐시와 재생"
                },
                {
                    "phase": "12주차: Dance of the Dust",
                    "duration": "Week 12",
                    "focus": "파티클 편집기, 모듈, 커브, 런타임 효과"
                },
                {
                    "phase": "13주차: Focus and Force",
                    "duration": "Week 13",
                    "focus": "Physics Asset Editor, 충돌 도형 편집, 피킹과 Gizmo"
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
        "my_role": "팀장, 동작 분석, GPU 변형, 편집 도구",
        "subtitle": "애니메이션 과장 변형 플러그인",
        "description": "기존 애니메이션에 과장된 움직임을 더하는 Unreal Engine 플러그인입니다. 팀장으로 동작 분석, 신호 안정화, GPU 변형, 편집 도구를 구현하고 팀원의 작업을 통합해 Fab에 출시했습니다.",
        "coverAlt": "스타일화된 GPU 메시 변형 효과를 보여 주는 Dynamic OverAnimation 제품 이미지",
        "coverLabel": "Dynamic OverAnimation",
        "collaboration_details": {
            "team_size": "DynaMax, 3인 팀",
            "my_role": "팀장, Motion Phase, 런타임 시스템, GPU 변형 프로그래머",
            "team_roles": [
                "시스템 설계와 통합, 동작 분석, 런타임 응답, GPU 변형, 편집 도구 (팀장, 본인)",
                "Proxy, Vertex Factory 기반과 연계 모듈, 데모 콘텐츠 (팀원)"
            ],
            "collaboration_tools": [
                "Perforce",
                "Unreal Engine 5.8",
                "Visual Studio",
                "Fab"
            ],
            "team_dynamics": "DynaMax 3인 팀의 팀장으로 분석기와 렌더러 사이에 전달할 데이터, 갱신 시점과 통합 순서를 조율했습니다. Perforce로 변경 사항을 공유하고 자동화 테스트와 에디터 미리보기로 기능을 확인하며 출시를 준비했습니다."
        },
        "technical_challenges": [
            "포즈 분석 결과와 AnimNotify, Gameplay Event로 지정한 동작 사이의 우선순위 정의",
            "Region, Chain별 변형 범위를 지정하고 카메라 방향에 따라 실루엣이 무너지지 않도록 제한",
            "움직임 노이즈를 보정하고 비슷한 점수의 신체 영역 사이에서 판정이 반복적으로 바뀌는 문제 완화",
            "Game Thread에서 확정한 변형 상태를 Snapshot에 복사해 Render Thread로 전달",
            "RDG에서 module pass와 vertex-factory 출력을 합성"
        ],
        "troubleshooting": {
            "phase_stability": {
                "title": "모션 노이즈로 잘못된 phase 전이가 발생",
                "problem": "한 프레임의 급격한 값 변화만으로 움직임 추세가 형성되기 전에 Phase가 뒤집히거나 Anticipation이 시작될 수 있었습니다.",
                "root_cause": "단순 에너지 임계값에는 추세 이력, 확인 시간, 취소 상태가 포함되지 않았습니다.",
                "solution": "Adaptive Trend Smoothing, 확인 시간, Phase별 Guard, Cycle History를 함께 적용했습니다.",
                "result": "자동화 테스트에서 16ms의 고에너지 샘플은 강도 0인 Anticipation 상태를 유지하고, 32ms 확인 샘플에서는 Action으로 전환했습니다."
            },
            "region_ownership": {
                "title": "비슷한 점수의 Region 사이에서 판정이 반복적으로 바뀌는 문제",
                "problem": "거의 같은 점수의 두 Region이 인접 프레임마다 owner를 교체할 수 있었습니다.",
                "root_cause": "현재 최고점만 고르는 방식에는 hysteresis와 challenger 확인 과정이 없었습니다.",
                "solution": "상대 15% 또는 절대 0.02의 우위를 요구하고 challenger가 안정될 때까지 기존 owner를 유지했습니다.",
                "result": "작은 점수 변동만으로는 현재 Region owner가 바뀌지 않습니다."
            },
            "render_handoff": {
                "title": "게임 상태 변경과 렌더링 시점의 불일치",
                "problem": "변형 요청 생성 후 상태가 바뀌면 renderer가 다른 값을 읽을 가능성이 있었습니다.",
                "root_cause": "Analyzer가 소유한 변경 가능한 상태와 비동기 render work의 수명이 달랐습니다.",
                "solution": "분석 결과를 Snapshot에 복사해 전달하고, 렌더링 코드가 분석기의 가변 상태를 직접 참조하지 않도록 했습니다.",
                "result": "분석기가 다음 값을 계산하더라도 각 렌더링 작업은 전달받은 값을 사용합니다."
            },
            "visual_attachments": {
                "title": "소켓에 부착한 시각 효과가 변형된 메시를 따라가지 못하는 문제",
                "problem": "메시가 변형되어도 소켓에 부착한 시각 효과는 변형 전 위치를 따라갔습니다.",
                "root_cause": "스켈레탈 소켓의 Transform에 메시 변형으로 생긴 위치 차이가 반영되지 않았습니다.",
                "solution": "변형으로 생긴 위치 차이를 별도로 전달해 등록된 시각 효과에 적용하고, 복원 시 오차가 누적되지 않도록 했습니다. 물리로 제어하는 대상은 제외했습니다.",
                "result": "부착한 시각 효과가 메시의 변형을 따라가며 Transform 오차가 누적되지 않습니다."
            }
        },
        "development_timeline": {
            "duration": "Epic Project, 2026",
            "phases": [
                {
                    "phase": "Bone Group 구성",
                    "duration": "Bone Group 데이터 구조",
                    "focus": "Bone Group, hierarchy 확장, LOD falloff, data-driven response"
                },
                {
                    "phase": "런타임 및 GPU 합성",
                    "duration": "Snapshot, RDG 합성",
                    "focus": "Response arbitration, Squash & Stretch, snapshot, RDG pass, normal/tangent"
                },
                {
                    "phase": "자동 Motion Phase",
                    "duration": "Phase, Region 상태 기계",
                    "focus": "Phase 판정 안정화, Region 선택, 동작 타이밍과 편집 UI"
                },
                {
                    "phase": "플러그인 통합",
                    "duration": "Socket Follower 통합",
                    "focus": "Socket Follower와 데모 에셋 통합"
                }
            ]
        }
    }
};
