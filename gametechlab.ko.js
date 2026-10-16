/**
 * Korean narrative overrides for labWeeks[0..6] (Week01..Week07).
 *
 * Integration contract:
 * - Deep-merge objects and merge arrays by index.
 * - Omitted fields intentionally retain the English source value.
 * - Project names, technologies, file/function identifiers, code snippets,
 *   commit hashes, and URLs are not overridden.
 * - Numeric/technical fact values repeated for merge coverage are unchanged.
 */
window.GAME_TECH_LAB_KO_PART_01_07 = {
    '01': {
        title: 'Jungle Brick Break',
        summary: '첫 번째 게임잼 프로젝트에서 수명 주기와 충돌 문제를 해결하며 벽돌, 스테이지, 입력, 이펙트, 점수, 렌더링의 핵심 시스템을 구축했습니다.',
        role: '게임플레이 및 시스템 프로그래머',
        objective: '게임 오브젝트와 스테이지 진행, 입력, 충돌, 피드백, 점수 저장을 연결해 플레이 가능한 게임을 완성하는 것이 목표였습니다.',
        contributions: [
            '블록을 UGameObject 중심으로 리팩터링하고 사각형 렌더링을 추가했으며, 스테이지, 블록 로직과 충돌 처리를 개선했습니다.',
            'Windows Runtime 게임패드 지원을 추가하고 게임패드, 입력 처리를 캡슐화했습니다.',
            '파티클, 최고 점수 흐름, 플래시, 조명 피드백, 공 렌더링 갱신을 구현하고 double-free 및 메모리 문제를 수정했습니다.'
        ],
        implementation: [
            'UGameObject/UBlock 구조, 스테이지 데이터, 블록 피해, 충돌 응답',
            'Windows.Gaming.Input 게임패드 관리자와 입력 수명 주기',
            '파티클 이펙트, 점수, 최고 점수 갱신, 플래시 타이머, 공, 사각형 렌더링'
        ],
        flow: '게임패드 / 키보드 입력 → 스테이지와 오브젝트 갱신 → 충돌 / 피해 → 이펙트, 점수, 프레임 렌더링',
        results: [
            '첫 게임잼에서 플레이 가능한 벽돌 깨기 게임을 완성했습니다.',
            '이후 3D 엔진 개발에 활용할 오브젝트와 입력 처리 구조를 마련했습니다.'
        ],
        evidenceStatus: '구현 내용',
        evidenceNote: '게임잼에서 UGameObject/UBlock 구조, 스테이지, 충돌 루프, 게임패드 수명 주기, 파티클, 점수 피드백을 구현했습니다.',
        troubleshootingEvidence: [
            {
                title: '색상 규칙에서 시작해 완성된 플레이 루프까지 발전시켰습니다.',
                summary: '벽돌 색상과 점수 규칙을 정한 뒤 첫 플레이 화면을 구성하고, 충돌 파티클과 공 궤적을 추가해 스테이지 패턴, 점수, 최고 점수, 피드백이 함께 동작하는 게임 화면으로 완성했습니다.',
                figures: [
                    {
                        stage: '통합 결과',
                        alt: '여러 벽돌 패턴, 점수, 최고 점수, 충돌 파티클, 공 궤적이 함께 표시되는 Jungle Brick Break 완성 화면',
                        caption: '네 가지 벽돌 패턴과 현재 점수, 최고 점수, 충돌 파티클, 공 궤적을 하나의 플레이 루프로 통합했습니다.'
                    },
                    {
                        stage: '색상과 점수 규칙',
                        alt: '각 벽돌 색상에 점수 값을 연결한 Jungle Brick Break 초기 색상표',
                        caption: '벽돌 색상에 점수 값을 연결해 스테이지 데이터와 화면 피드백이 같은 규칙을 사용하도록 구성했습니다.'
                    },
                    {
                        stage: '첫 플레이 화면',
                        alt: '계단형 벽돌, 공, 패들, 점수, 남은 목숨이 표시된 Jungle Brick Break 초기 플레이 화면',
                        caption: '공, 패들, 벽돌 충돌, 점수, 남은 목숨을 연결해 첫 플레이 루프를 만들었습니다.'
                    },
                    {
                        stage: '벽돌 충돌 피드백',
                        alt: '공이 자홍색 벽돌에 충돌하며 사각 파티클이 생성되는 근접 화면',
                        caption: '벽돌 색상과 맞춘 파티클로 충돌과 파괴 시점을 더 분명하게 표현했습니다.'
                    },
                    {
                        stage: '공 궤적과 파티클',
                        alt: '잔상이 남는 공과 녹색 충돌 파티클이 표시된 근접 화면',
                        caption: '잔상으로 공의 진행 방향을 보여 주고 파티클로 충돌 지점을 강조했습니다.'
                    }
                ]
            }
        ],
        troubleshooting: [
            {
                title: '씬 해제 중 double free 발생',
                symptom: '게임 씬을 해제하거나 재시작할 때 블록 오브젝트가 두 번 해제되어 heap 오류로 종료될 수 있었습니다.',
                cause: '같은 블록 포인터를 UGameObjectList와 별도의 stageblocks 컬렉션이 모두 소유하는 것으로 취급했습니다. UGameObjectList가 이미 블록을 소멸시킨 뒤 UGameScene::Release()가 stageblocks를 순회하며 다시 delete했습니다.',
                fix: 'UGameObjectList를 단일 소유자로 유지했습니다. 씬 해제 시 stageblocks는 비소유 조회 컬렉션으로서 clear만 수행하고 내부 포인터를 delete하지 않도록 변경했습니다.',
                result: '블록 해제를 UGameObjectList에서만 처리해 중복 해제를 막았습니다.',
                code: { context: 'UGameScene::Release()' }
            },
            {
                title: '마지막 목숨을 잃기 전에 최고 점수가 저장됨',
                symptom: '목숨이 두 개 남은 상태에서 하나를 잃으면 아직 한 번의 기회가 남았는데도 최고 점수 파일이 갱신될 수 있었습니다.',
                cause: 'SubHealth()가 체력을 감소시킨 뒤 감소량과 감소 후 체력 값을 비교했습니다. 목숨이 두 개에서 하나로 바뀌는 순간에도 조건을 충족해 점수가 너무 일찍 저장됐습니다.',
                fix: '일반 체력 감소 함수에서 점수 저장을 제거하고, 게임 오버 분기에서만 HightScoreUpdate()를 호출했습니다.',
                result: '목숨이 남아 있을 때는 체력만 변경하고, 게임 오버가 되면 점수 파일을 갱신합니다.',
                code: { context: 'UGameScene::Update() game-over 분기' }
            },
            {
                title: '발사체 열 조회가 스테이지 범위를 벗어남',
                symptom: '발사체가 스테이지의 가로 범위를 벗어나면 위쪽 또는 아래쪽 순회 중 잘못된 stageblocks 인덱스가 계산될 수 있었습니다.',
                cause: 'CurCol을 월드 X 좌표로 계산한 뒤 유효성을 먼저 확인하지 않고 CurRow × CurrentStageCol + CurCol 식에 사용했습니다.',
                fix: '그리드 좌표의 오프셋을 수정하고, 계산된 열이 0보다 작거나 CurrentStageCol 이상이면 블록 배열에 접근하기 전에 제외했습니다.',
                result: '스테이지 밖 발사체는 블록 컬렉션 범위를 넘어 읽지 않고 순회를 건너뜁니다.',
                code: { context: '위쪽/아래쪽 발사체 블록 순회' }
            }
        ],
        commitRefs: [
            { label: '스테이지, 블록, 충돌 로직' },
            { label: 'Windows Runtime 게임패드 지원' },
            { label: '파티클 시스템' },
            { label: '최고 점수 시스템' }
        ]
    },
    '02': {
        title: '3D 엔진 기반 구축',
        summary: 'D3D11 렌더링과 CPU 측 MVP 변환을 구현하고, 에디터 UI와 입력, 카메라 제어, SkySphere를 연결했습니다.',
        role: '렌더링 및 입력 시스템 프로그래머',
        objective: '1주차 게임 루프에 그래픽 리소스 관리와 카메라 변환, 입력 액션을 추가해 3D 장면을 그릴 수 있는 렌더러와 에디터를 만드는 것이 목표였습니다.',
        contributions: [
            'D3D11 디바이스와 Flip-discard 스왑 체인, 렌더 타깃, 깊이 뷰를 초기화했습니다. 프레임 Clear/Present, 셰이더, 파이프라인 상수 설정도 구현했습니다.',
            'CPU에서 MVP 변환과 역행렬, 화면 비율을 처리하고, ImGui 콘솔, 속성, 통계 패널을 구현했습니다. 창 크기가 바뀌어도 투영 비율을 유지하도록 했습니다.',
            'Enhanced Input의 Action, Modifier, Trigger를 구현하고 에디터 카메라의 Pawn과 Controller를 분리했습니다. SkySphere 렌더링과 깊이 상태도 구현했습니다.'
        ],
        implementation: [
            'D3D11 디바이스와 스왑 체인, RTV/DSV, 셰이더 바인딩, 프레임 시작, 종료, MVP 파이프라인',
            'ImGui 에디터 배치, 뷰포트, 창 크기 보정, 역행렬, 원근 나눗셈, 화면 비율 유지',
            'Enhanced Input의 Action, Modifier, Trigger, 에디터 카메라 컨트롤러, SkySphere 셰이더, 깊이 상태'
        ],
        flow: '입력 Action → 에디터 카메라 → World/View/Projection 상수 → D3D11 렌더링 → SkySphere와 에디터 뷰포트',
        results: [
            '엔진의 초기 3D 렌더링 경로를 구축했습니다.',
            'SkySphere 구현 코드를 프로젝트 저장소에 공개했습니다.'
        ],
        evidenceStatus: '구현 내용',
        evidenceNote: 'Week02에서 D3D11 렌더러 기반, 입력과 에디터 카메라 흐름, SkySphere 렌더링 경로를 구현했습니다.',
        sourceLabel: 'Week02 작성 커밋 열기',
        troubleshooting: [
            {
                title: '창 크기를 바꾸면 3D 화면이 늘어나는 문제',
                symptom: '창 크기를 변경해도 투영 행렬이 이전 화면 비율을 사용해 3D 장면이 늘어나 보였습니다.',
                cause: '창 크기가 바뀔 때 렌더링 리소스는 다시 생성했지만 카메라의 가로, 세로 비율은 갱신하지 않았습니다. 창을 최소화해 높이가 0이 되면 비율 계산에도 문제가 생길 수 있었습니다.',
                fix: '창 크기 변경 콜백을 렌더러와 연결하고, 높이가 양수일 때만 가로 / 세로 비율을 계산해 카메라 투영 행렬에 반영했습니다.',
                result: '창 크기에 맞는 투영 비율을 유지하고, 최소화 시 0으로 나누는 문제도 막았습니다.',
                code: { context: 'CEditorUI::SetupWindow() resize callback' }
            },
            {
                title: 'SkySphere와 불투명 오브젝트의 렌더링 순서 충돌',
                symptom: 'SkySphere가 일반 불투명 오브젝트와 함께 정렬돼 배경으로 처리되지 않을 수 있었습니다.',
                cause: '하늘은 먼 깊이에 배치해 전경 오브젝트 뒤에 그려야 했지만, 일반 불투명 오브젝트와 같은 정렬 규칙을 사용했습니다.',
                fix: '하늘의 클립 공간 깊이를 z = w × 0.9999로 설정해 원거리 평면 가까이에 고정했습니다. 깊이 쓰기를 끄고 일반 불투명 오브젝트 뒤에 그리도록 정렬했습니다.',
                result: '하늘을 전경 뒤에 그리면서 정점을 클립 공간의 먼 쪽에 유지하도록 했습니다.'
            },
            {
                title: '하늘의 깊이 쓰기를 끄면 깊이 검사도 꺼지는 문제',
                symptom: '하늘을 불투명 오브젝트 뒤에 그려도 기존 깊이 버퍼를 검사하지 않아 전경을 덮을 수 있었습니다.',
                cause: 'bDisableDepthTest와 bDisableDepthWrite가 모두 OverlayDepthState를 선택했습니다. 이 상태는 DepthEnable = FALSE와 ALWAYS 비교를 사용해 깊이 검사를 수행하지 않았습니다.',
                fix: '오버레이용 OverlayDepthState는 유지하고, 깊이 검사는 켜되 쓰기는 끄는 SkyDepthState를 추가해 LESS 비교를 적용했습니다.',
                result: '하늘이 깊이 값을 바꾸거나 전경을 덮지 않고, 비어 있는 배경 영역에만 그려집니다.',
                code: { context: 'CRenderer::ExecuteCommands()' }
            },
            {
                title: '하늘 그라데이션에 잘못된 노멀을 사용한 문제',
                symptom: '하늘과 지면 색상이 뒤바뀌거나 그라데이션 보간 계수가 의도한 범위를 벗어날 수 있었습니다.',
                cause: '픽셀 셰이더가 Input.Normal.z를 그대로 사용했습니다. 하지만 보간된 노멀은 구체의 스케일 영향을 받았고 안쪽을 향하고 있었습니다.',
                fix: '보간된 노멀을 정규화하고 Z 성분의 부호를 반전한 뒤 하늘, 지면 그라데이션을 선택했습니다.',
                result: '정규화한 노멀로 보간 계수를 구하고, 구체의 상반구에 하늘 색상을 적용했습니다.',
                code: { context: 'main()' }
            }
        ],
        commitRefs: [
            { label: 'D3D11 renderer와 swap chain' },
            { label: 'CPU 측 MVP pipeline' },
            { label: 'Enhanced Input Modifier 구현' },
            { label: 'SkySphere 렌더링' }
        ]
    },
    '03': {
        title: '에디터와 Scene 관리',
        summary: 'FName과 Outliner를 구현하고, Show Flag, 가시성 제어와 UUID 기반 피킹을 추가했습니다. Scene 직렬화, World, Level 소유권, 카메라 관리 구조도 정리했습니다.',
        role: '엔진 및 에디터 프로그래머',
        objective: '오브젝트의 이름, 식별자, 소유권을 관리하고, 에디터에서 선택, 표시, 저장할 수 있도록 공통 구조를 마련하는 것이 목표였습니다.',
        contributions: [
            'FName/FNameTable과 Outliner를 구현하고, Show Flag와 Actor, Billboard 표시 제어, 선택, 하이라이트 시 유효성 검사를 추가했습니다.',
            'UUID 관리와 피킹을 수정하고, 픽셀 중심에 맞춘 NDC 보정과 Scene 재로딩 후 Billboard 복원을 처리했습니다.',
            'JSON을 직접 다루던 Actor 직렬화를 FArchive로 교체하고, Scene을 World/PersistentLevel/StreamingLevel 구조로 정리했습니다. 카메라 관리도 Scene에서 분리했습니다.'
        ],
        implementation: [
            'FName pool/table과 범용 UUID 관리',
            'Outliner, show flag, Actor, Billboard 가시성, 하이라이트, 피킹',
            'FArchive 객체 직렬화, World, Level 소유권, Renderer 컬렉션, 카메라 분리'
        ],
        flow: 'World, Level 오브젝트 → FName, UUID 식별 → Outliner 표시, 피킹 → Scene 직렬화와 렌더링 목록',
        results: [
            '여러 Scene에서 재사용할 수 있는 렌더링 유틸리티를 구현했습니다.',
            'Scene과 렌더링 상태를 에디터에서 확인할 수 있도록 했습니다.'
        ],
        evidenceStatus: '구현 내용',
        evidenceNote: 'Week03에서 Atlas, Billboard, Batch Line, Bounds, 이름, 타입, Gizmo Guide, MetaObject 기능을 구현했습니다.',
        sourceLabel: 'Week03 작성 커밋 열기',
        troubleshooting: [
            {
                title: 'Scene 재로딩 후 Billboard가 사라지는 문제',
                symptom: '저장 전에는 표시되던 Actor의 Billboard가 Scene을 불러온 뒤 소유자를 찾지 못해 에디터 표시와 선택이 어긋났습니다.',
                cause: 'TObjectPtr가 로딩 전 Actor의 UUID를 캐시하고 있었습니다. 저장된 UUID를 복원한 뒤에도 컴포넌트의 소유자 참조는 이전 UUID를 가리켰습니다.',
                fix: '컴포넌트의 UUID를 저장, 복원하고, 복원 후 소유자를 다시 할당했습니다. 삭제 대기 중인 UUID 맵 항목을 제거하고 발급 UUID가 이전 값보다 커지도록 관리했습니다.',
                result: '저장, 로딩 후에도 Actor와 컴포넌트의 식별자가 유지되고, Billboard가 올바른 소유자에 연결됩니다.',
                code: { context: 'UScene::LoadSceneFromFile()' },
                commit: { label: '근거 연결' }
            },
            {
                title: '콘솔 변수 목록을 읽는 중 힙 손상',
                symptom: '등록된 이름을 임시 배열에 모아 읽는 과정에서 잘못된 할당자 헤더에 접근해 힙이 손상될 수 있었습니다.',
                cause: '값을 중간 TArray로 복사하는 과정에서 문제가 발생했고, 메모리를 해제하기 전에 잘못됐거나 이미 해제된 헤더를 걸러내지 못했습니다.',
                fix: '먼저 1d8996d에서 오류가 발생한 GetAllNames 호출을 비활성화했습니다. 이후 631198a에서 배열 반환 방식을 콜백 순회로 교체하고 할당자 헤더 검사를 추가했습니다.',
                result: '임시 배열로 소유권을 넘기는 과정을 없애고, 메모리 해제 정보를 갱신하기 전에 잘못된 헤더를 걸러내도록 했습니다.',
                commit: { label: '수정 순서' }
            },
            {
                title: 'Actor 대신 에디터 Billboard가 선택되는 문제',
                symptom: 'Actor를 클릭했을 때 해당 Actor 대신 표시용 UUID Billboard가 선택될 수 있었습니다.',
                cause: '피킹 과정에서 UUUIDBillboardComponent를 일반 Scene 오브젝트처럼 선택 대상으로 처리했습니다.',
                fix: '에디터 표시는 유지하면서 UUID Billboard 컴포넌트를 피킹 후보에서 제외했습니다.',
                result: 'Billboard는 화면에 유지되고, 클릭 시 의도한 Actor가 선택됩니다.'
            },
            {
                title: '미리보기 뷰포트가 조건 없이 선택되는 문제',
                symptom: '일반 Scene World에도 미리보기 뷰포트 클라이언트가 할당됐으며, 이 값이 null일 수도 있었습니다.',
                cause: 'if 문 뒤에 잘못 넣은 세미콜론 때문에 미리보기 World인지 확인하는 조건과 관계없이 다음 블록이 실행됐습니다.',
                fix: '세미콜론을 제거하고 World 타입과 클라이언트 유효성을 확인한 뒤에만 값을 할당했습니다.',
                result: '미리보기 Scene이고 유효한 뷰포트 클라이언트가 있을 때만 연결하도록 수정했습니다.',
                code: { context: 'SyncViewportClient()' }
            },
            {
                title: '피킹 광선이 픽셀 중심을 벗어나는 문제',
                symptom: '피킹 광선이 반 픽셀씩 어긋나 정밀하게 선택할 때 클릭한 위치와 결과가 달랐습니다.',
                cause: '정수 화면 좌표를 변환할 때 픽셀 중심이 아닌 경계를 기준으로 정규화했습니다.',
                fix: '화면 좌표를 NDC로 변환하기 전에 X, Y축에 각각 0.5픽셀 오프셋을 추가했습니다.',
                result: '선택한 픽셀의 중심을 지나는 피킹 광선을 생성하도록 했습니다.',
                code: { context: 'CPicker::ScreenToRay()' }
            },
            {
                title: 'Gizmo와 깊이가 같은 하이라이트가 사라지는 문제',
                symptom: '마우스 오버, 하이라이트를 원본 Gizmo와 같은 깊이에 그리면 표시되지 않을 수 있었습니다.',
                cause: '깊이 상태를 생성할 때 Material의 비교 설정을 무시하고 LESS로 고정했습니다.',
                fix: '렌더 상태 옵션과 JSON 파싱에 DepthFunc를 추가하고, Gizmo Material이 LessEqual을 사용하도록 설정했습니다.',
                result: '깊이 검사를 유지하면서도 Gizmo와 깊이가 같은 하이라이트를 표시할 수 있게 됐습니다.',
                code: { context: 'Render-state JSON parsing' }
            }
        ],
        commitRefs: [
            { label: 'FName과 FNameTable' },
            { label: 'Outliner 창 구현' },
            { label: 'FArchive 객체 직렬화' },
            { label: 'UUID 피킹' }
        ]
    },
    '04': {
        title: 'OBJ Asset 로딩과 Binary Cooking',
        summary: 'OBJ/MTL 파일을 UStaticMesh Asset으로 가져오고, Registry 조회와 에디터 사용, .dasset Binary 저장, 로딩을 연결했습니다.',
        role: 'Asset Pipeline 및 Engine 프로그래머',
        objective: '외부 OBJ 파일을 엔진 Asset으로 관리하고, 파일이 바뀌지 않았다면 Binary Cache를 재사용해 텍스트를 다시 파싱하지 않도록 하는 것이 목표였습니다.',
        contributions: [
            'OBJ/MTL 파싱을 FObjImporter로 분리하고, 가져온 메시 데이터를 FObjInfo, FStaticMeshRenderData, UStaticMesh로 구성했습니다.',
            'TObjectIterator, FObjManager, FAssetManager/FAssetRegistry 연동과 Material Section 구성을 구현하고, 텍스처 경로를 처리했습니다.',
            '원본 수정 시각과 FNV-1a 해시, 포맷 버전을 확인하는 .dasset 저장, 로딩을 구현했습니다. 컴포넌트와 Material, Texture, UV 상태의 직렬화도 연결했습니다.',
            '팀 구현: ObjViewerPanel과 다중 뷰포트용 SWindow 기반, 개인 구현: OBJ/MTL Importer, UStaticMesh 연동, Binary Cooking, 직렬화'
        ],
        implementation: [
            'OBJ/MTL 토큰 파싱, Material Section 분리, 인덱스 정점 구성, Static Mesh 경계 계산',
            'UStaticMesh 객체 소유권, TObjectIterator 순회, Asset Registry 조회, 런타임 Mesh, Texture 캐시',
            'FAssetCooker 바이너리 헤더, 버전 관리, 원본 검증, .dasset 저장, 로드, 오래된 캐시 재생성',
            'Static Mesh 피킹, 메시, Material, Texture와 슬롯별 UV 스크롤 상태의 Scene 직렬화'
        ],
        flow: 'OBJ + MTL → FObjInfo → 인덱스 메시 생성 → UStaticMesh, Asset Registry → .dasset 저장 → 유효성 확인 후 바이너리 로딩',
        results: [
            '외부 Geometry를 엔진에서 관리하고 재사용할 수 있는 Static Mesh Asset으로 전환했습니다.',
            '유효한 Cook 데이터를 재사용하고, 원본이나 포맷 버전이 바뀌면 다시 Cook하도록 했습니다.',
        ],
        evidenceStatus: 'OBJ Importer와 Binary Asset',
        evidenceNote: 'OBJ/MTL Importer, UStaticMesh 통합, 버전형 .dasset Cook, 직렬화를 구현했습니다.',
        sourceLabel: 'Week04 소스 코드, 변경 이력',
        troubleshooting: [
            {
                title: '한글이 포함된 자산 경로를 열지 못하는 문제',
                symptom: '프로젝트나 자산 경로에 한글이 포함되면 OBJ, MTL, 텍스처, Cook 파일을 열지 못할 수 있었습니다.',
                cause: '파일을 열 때 UTF-8 문자열, std::filesystem의 좁은 문자열 변환, .string() 재구성을 혼용해 Windows 경로 인코딩이 어긋났습니다.',
                fix: 'Importer, Cooker, 속성, Primitive의 파일 접근에 FPaths::ToWide를 사용해 UTF-8을 UTF-16으로 변환했습니다. OBJ/MTL 상대 경로는 좁은 문자열로 다시 변환하지 않도록 했습니다.',
                result: '엔진 내부 경로 형식은 유지하면서, Import, Cook, 속성 비교, Primitive 로딩 시 Windows 파일 API에 와이드 문자열 경로를 전달하도록 했습니다.',
                code: { context: 'FObjImporter::ParseObj()' }
            },
            {
                title: '캐시에 없는 메시를 매번 OBJ에서 다시 읽는 문제',
                symptom: '런타임 캐시에 없는 메시는 매번 원본 OBJ를 읽어야 했습니다. 바이너리 저장 형식과 원본 변경 여부를 확인하는 절차가 없었습니다.',
                cause: '정점, 인덱스, Section 데이터와 원본 정보를 포맷 버전이 있는 바이너리 자산으로 저장하지 않았습니다.',
                fix: 'FAssetCooker와 .dasset 헤더를 추가했습니다. 헤더에는 매직 값, 포맷 버전, 원본 수정 시각과 FNV-1a 해시를 저장해 원본이 같으면 바이너리를 읽고, 유효하지 않으면 다시 Cook합니다.',
                result: '잘못됐거나 오래된 바이너리는 거르고, 유효한 최신 Cook 파일이 있으면 OBJ 파싱을 건너뛰도록 했습니다.',
                code: { context: 'FAssetCooker::SaveCookedStaticMesh()' }
            },
            {
                title: 'OBJ 변환 시 정점 생성과 Material 검색이 중복되는 문제',
                symptom: '위치, 노멀, UV가 같아도 면의 각 꼭짓점마다 렌더링 정점을 새로 생성했습니다. Material 검색에도 중복된 중첩 반복문이 있었습니다.',
                cause: '기존 정점을 식별할 키 없이 정점을 계속 추가했고, Section마다 같은 Material 목록을 두 번 검색했습니다.',
                fix: '위치, 노멀, UV의 해시와 동등성 비교로 기존 정점 인덱스를 재사용했습니다. Material 검색은 일치하는 항목을 찾으면 종료하는 단일 반복문으로 줄였습니다.',
                result: '같은 위치, 노멀, UV를 가진 정점은 인덱스를 공유하고, Section별 Material 검색은 한 번의 순회로 처리합니다.',
                code: { context: 'FObjImporter::Cook()' }
            },
            {
                title: '가져온 UStaticMesh Actor가 선택되지 않는 문제',
                symptom: '삼각형 피킹은 기존 Primitive 컴포넌트에서만 동작하고, 새 Mesh 컴포넌트에 저장된 Static Mesh는 건너뛰었습니다.',
                cause: '피커가 UPrimitiveComponent::GetPrimitive()에서 CPrimitiveBase 인스턴스를 얻은 경우에만 검사를 진행했습니다.',
                fix: '기존 경로를 유지하면서 UMeshComponent에서 FMeshData를 직접 가져오는 처리를 추가하고, 삼각형 교차 검사에 전달했습니다.',
                result: '기존 Primitive와 가져온 UStaticMesh 모두 같은 삼각형 피킹 과정에서 선택할 수 있게 됐습니다.',
                code: { context: 'FPicker::PickActor()' }
            },
            {
                title: 'Scene 재로딩 후 메시 자산 연결과 UV 설정이 사라지는 문제',
                symptom: 'Scene을 다시 불러오면 컴포넌트 플래그, Material, Texture 연결, 슬롯별 UV 스크롤 설정이 복원되지 않을 수 있었습니다.',
                cause: '초기 FArchive가 필요한 문자열 배열과 실수, 상태 값을 지원하지 않았고, 컴포넌트도 연결된 자산의 속성을 모두 직렬화하지 않았습니다.',
                fix: 'FArchive와 컴포넌트의 Serialize를 확장했습니다. 메시, Material 생성 후 텍스처를 복원하고, 슬롯별 UVEnabled와 UVSpeed 값도 저장했습니다.',
                result: '저장된 Scene에서 Static Mesh의 자산 연결을 복원하고, 의존 순서에 맞춰 Material, Texture, UV 스크롤 설정을 다시 적용합니다.',
                code: { context: 'UStaticMeshComponent::Serialize()' },
                commit: { label: 'serialization 순서' }
            },
            {
                title: '종료 후에도 텍스처 SRV와 자산 캐시가 남는 문제',
                symptom: 'Static Mesh에 텍스처를 할당할 때 COM 참조가 중복 증가했고, 렌더러 종료 시 캐시된 SRV와 메시를 정리하는 코드가 없었습니다.',
                cause: 'Asset Manager가 텍스처를 넘길 때와 컴포넌트가 받을 때 모두 참조 수를 늘렸습니다. 렌더러도 엔진 캐시를 비우기 전에 D3D11 디바이스를 해제했습니다.',
                fix: '컴포넌트의 중복 AddRef를 제거했습니다. FAssetManager::ClearCache에서 SRV를 해제하고 메시, 텍스처 맵을 비우도록 한 뒤, Context, Device 해제 전에 Primitive, Asset 캐시를 정리했습니다.',
                result: 'COM 참조의 소유권을 정리하고, 렌더러 종료 전에 GPU 리소스를 가진 캐시를 해제하도록 했습니다.',
                code: { context: 'FAssetManager::ClearCache()' }
            }
        ],
        commitRefs: [
            { label: 'OBJ/MTL Importer와 FObjInfo, TObjectIterator 구현' },
            { label: 'FObjManager와 UStaticMesh 기반' },
            { label: 'versioned .dasset cooking과 loading' },
            { label: 'Unicode asset-path 처리' },
            { label: 'indexed-vertex 및 material-loop 수정' },
            { label: 'static-mesh picking 통합' },
            { label: 'Mesh, Material, Texture, UV 직렬화' },
            { label: 'GPU 및 asset-cache 정리' }
        ]
    },
    '05': {
        theme: "2차 게임잼, It's Pie Time",
        title: 'Octahedral Impostor 최적화',
        summary: '오브젝트 5만 개를 렌더링하는 최적화 과제에서 Octahedral Impostor를 제안하고 팀 엔진에 통합했습니다.',
        role: '렌더링 최적화 프로그래머',
        objective: '고밀도 장면에서 동일한 메시를 반복 제출하는 대신, 카메라 방향에 맞는 이미지 프록시를 재구성해 CPU, GPU 렌더링 비용을 줄이는 것이 목표였습니다.',
        contributions: [
            '오브젝트 5만 개 비교용 장면의 최적화 전략으로 Octahedral Impostor를 제안했습니다.',
            '임포스터를 적용하기 전에 렌더 상태 캐시, 정렬, 프록시 충돌 피킹, sub-mesh BVH, StructuredBuffer 기반 인스턴싱 경로를 구현했습니다.',
            'dirty flag 기반의 계층형 FSceneComponent transform과 AABB 갱신을 정리한 뒤, 방향별 atlas baking, billboard 재구성, parallax, 실행 시 프록시 렌더링을 연결했습니다.'
        ],
        implementation: [
            '렌더 상태 캐시, 정렬, Proxy 충돌, Sub-mesh BVH, 데이터 지향 Structured Buffer 조회',
            '계층형 Transform, Dirty Flag, AABB 갱신, Column-major GPU 데이터, DirectXMath SIMD Helper',
            '방향별 Atlas Baking, Octahedral 방향 매핑, Parallax, Billboard 복원, Proxy Shading'
        ],
        flow: '고밀도 메시 장면 → transform, culling 최적화 → Octahedral Atlas bake → 카메라 방향별 프록시 렌더링',
        results: [
            '팀 엔진에서 반복 오브젝트를 Impostor로 렌더링할 수 있도록 했습니다.',
            '반복 측정에 사용할 5만 개, 6만 4천 개 오브젝트 장면을 구성했습니다.'
        ],
        evidenceStatus: '구현 내용',
        evidenceNote: '서브메시 BVH, StructuredBuffer 인스턴싱, 계층 변환, Atlas Baker, 런타임 Impostor 경로를 구현하고 팀 게임잼 엔진에 통합했습니다.',
        sourceLabel: '통합된 게임잼 저장소 열기',
        troubleshootingEvidence: [
            {
                kicker: 'Atlas 생성 오류 수정',
                title: '256개 방향에서 메시 전체가 보이도록 수정',
                summary: '초기 Atlas는 256개 칸 중 149개에서 메시가 잘렸습니다. 정점 기준으로 경계 상자를 다시 계산하고 카메라 여유 범위, 극점 기준축, 행렬 업로드를 수정해 모든 방향에서 메시 전체가 나오도록 했습니다.',
                figures: [
                    {
                        stage: '수정 전, 잘린 방향 캡처',
                        alt: '방향별 칸 대부분에 사과의 가느다란 일부만 담긴 Octahedral Impostor atlas',
                        caption: '대부분의 방향 칸에 원본 메시의 가늘거나 잘린 일부만 기록되었습니다.'
                    },
                    {
                        stage: '수정 후, 완성된 방향별 Bake',
                        alt: '16 × 16 방향 격자 전반에 사과 전체 실루엣이 담긴 Octahedral Impostor atlas',
                        caption: '방향 격자 전반에 사과 전체 실루엣이 안정적으로 기록되었습니다.'
                    }
                ],
                facts: [
                    { label: '유효 화면 비율 5% 미만', value: '149 / 256 → 0 / 256', detail: '수정 전 → 수정 후' }
                ],
                method: '2048 × 2048 Atlas를 256개 방향 Cell로 나누고, 각 Cell에서 검은색이 아닌 Pixel의 비율이 5% 미만이면 잘린 출력으로 분류했습니다.'
            },
            {
                kicker: '오브젝트 5만 개 렌더링 비교',
                title: 'Full Mesh와 Impostor 성능 비교',
                summary: '같은 PC의 5만 개 오브젝트 장면에서 HUD 값을 비교했습니다. Impostor 평균 프레임 시간은 별도 로그로 측정했습니다.',
                tags: null,
                figures: [
                    {
                        stage: '전체 Mesh 캡처',
                        alt: '실행 HUD와 함께 사과 메시 5만 개를 렌더링하는 PerformanceEngine',
                        caption: '오브젝트 5만 개 장면을 Full Mesh 경로로 렌더링한 화면입니다.'
                    },
                    {
                        stage: 'Impostor 캡처',
                        alt: '실행 HUD와 함께 사과 Impostor 5만 개를 렌더링하는 PerformanceEngine',
                        caption: '같은 장면을 Impostor 경로로 렌더링한 화면입니다.'
                    }
                ],
                facts: [
                    { label: '작업 부하', value: '오브젝트 50,000개', detail: '일반 사과 25,000개 + 한입 베어 문 사과 25,000개' },
                    { label: 'Frame Time', value: '6.62 → 3.21 ms', detail: 'Full Mesh HUD → Impostor HUD' },
                    { label: 'Draw Call', value: '10,725 → 2', detail: 'Full Mesh → Impostor' }
                ],
                trace: { label: 'Impostor 경로 프레임 로그' },
                method: 'Release x64, 1280 × 720, VSync 비활성화, Main Thread Affinity Bit 2 고정 조건으로 측정했습니다. Impostor 평균은 별도 로그의 4,481프레임을 기준으로 계산했습니다.',
                hardwareLabel: '측정 PC'
            }
        ],
        troubleshooting: [
            {
                title: '오브젝트가 많을 때 증가하는 피킹, 렌더링 제출 비용',
                symptom: '오브젝트 50,000개 장면에서 메시 삼각형 검사와 오브젝트별 렌더링 데이터 갱신에 드는 CPU 작업이 크게 늘었습니다.',
                cause: '피킹 시 서브메시의 모든 삼각형을 순회했습니다. 같은 형태의 오브젝트도 상수 데이터를 각각 제출해 오브젝트 수에 따라 CPU 작업이 늘었습니다.',
                fix: '교차하지 않는 가지를 건너뛰도록 서브메시 BVH를 구축했습니다. 월드 변환, 색상 데이터는 인스턴스 인덱스로 조회하는 StructuredBuffer로 옮겼습니다.',
                result: 'BVH로 피킹 후보를 좁히고, 인스턴스 데이터를 묶어 처리하도록 했습니다.'
            },
            {
                title: '변환 갱신 중 재귀 호출로 스택 오버플로 발생',
                symptom: '변경된 FSceneComponent의 월드 변환을 갱신할 때 같은 함수가 반복 호출돼 스택 오버플로가 발생할 수 있었습니다.',
                cause: 'UpdateComponentToWorld()가 같은 dirty 상태를 다시 확인하는 경로에 진입할 때까지 dirty flag가 남아 있어, 갱신 함수가 자기 자신을 다시 호출했습니다.',
                fix: 'UpdateComponentToWorld() 진입 전에 bIsWorldTransformDirty를 먼저 해제하고, 연관된 AABB 갱신은 OnUpdateWorldTransform()에서 처리하도록 정리했습니다.',
                result: '변경된 변환을 한 번 계산한 뒤 그 값으로 경계 상자를 갱신해, 갱신 함수의 재진입을 막았습니다.',
                code: { context: 'FSceneComponent::GetComponentToWorld()' }
            },
            {
                title: '베이킹 카메라와 경계 상자 오류로 Atlas가 잘리는 문제',
                symptom: 'ec931251의 albedo atlas는 256개 칸 중 149개에서 검은색이 아닌 픽셀의 비율이 5% 미만이었고, 사과 전체가 아니라 가느다란 일부만 담겼습니다.',
                cause: '메시의 경계 상자, 자체 FMatrix::MakeLookAt, 직교 투영 행렬을 조합한 초기 베이킹에서는 일부 방향에서 오브젝트 전체를 화면에 담지 못했습니다.',
                fix: 'b3f0a6c에서 메시 정점을 순회해 최소, 최대 경계를 다시 계산하고, 가장 큰 반길이에 20% 여유를 더했습니다. 극점에서도 사용할 수 있는 상향 기준축을 구성하고 DirectXMath로 왼손 좌표계 뷰, 직교 투영 행렬을 만들었습니다.',
                result: '수정된 Bake는 모든 방향 칸에 사과 전체 실루엣을 유지하며, 완성된 Atlas를 Runtime Impostor 경로에서 사용합니다.',
                code: { context: 'Bake()의 vertex bounds 계산 및 CalculateCameraTransform()' }
            },
            {
                title: 'SceneGraph의 최대 깊이에서 오브젝트가 누락되는 문제',
                symptom: '같은 옥탄트에 모인 오브젝트가 깊이 8에 도달하면 피킹 후보에서 빠질 수 있었습니다.',
                cause: '마지막 리프가 PrimitiveIndex 하나만 저장해, 최대 깊이에 여러 인덱스가 남으면 일부를 누락했습니다.',
                fix: '리프에 남은 Primitive 인덱스를 모두 저장하고, 순회할 때 전체 목록을 반환하도록 수정했습니다.',
                result: '최대 깊이의 리프에 들어간 Primitive도 모두 피킹 후보에 포함됩니다.',
                code: { context: 'terminal leaf 생성 및 traversal' }
            },
            {
                title: 'GPU 컬링이 오브젝트 50,000개로 제한되는 문제',
                symptom: 'Primitive가 50,000개를 넘으면 인스턴스, 가시성 버퍼 용량을 초과할 수 있었고, Compute Shader는 그 이상의 인덱스를 무시했습니다.',
                cause: 'CPU 버퍼, SRV/UAV 요소 수, Staging 저장 공간, HLSL 범위 검사가 모두 50000으로 고정돼 있었습니다.',
                fix: '필요한 수에 맞춰 컬링 리소스를 확장하고, 실제 Primitive 수를 Compute Shader에 전달했습니다.',
                result: '오브젝트 수에 맞춰 리소스를 확보하고, 실제 Primitive 수를 기준으로 셰이더 작업 범위를 제한합니다.',
                code: { context: 'EnsureCullingBufferCapacity()' }
            },
            {
                title: '레이어별 인스턴스 캐시가 공유 버퍼를 덮어씀',
                symptom: '한 렌더 레이어의 캐시 오브젝트가 다른 레이어의 변환이나 오브젝트 ID를 사용할 수 있었습니다.',
                cause: '각 레이어가 같은 인스턴스 버퍼를 WRITE_DISCARD로 매핑하고 오프셋 0부터 기록했습니다. 다음 레이어가 버퍼를 덮어써도 기존 배치의 오프셋은 그대로였습니다.',
                fix: '버퍼를 한 번 매핑해 모든 레이어를 순서대로 기록하고, 배치마다 겹치지 않는 전역 오프셋을 할당했습니다.',
                result: '각 배치가 공유 버퍼에서 자신에게 할당된 범위만 참조하도록 했습니다.',
                code: { context: 'RebuildAllLayerInstanceBuffers()' }
            }
        ],
        commitRefs: [
            { label: '렌더 상태 캐싱 및 드로 정렬' },
            { label: 'sub-mesh BVH 및 데이터 지향 렌더링' },
            { label: 'scene component 및 렌더링 구조 개편' },
            { label: 'vertex bounds 기반 bake camera 보정' },
            { label: '로컬 방향 billboard 및 4개 칸 샘플링' },
            { label: '행 우선 행렬 업로드, 가중치 샘플링, atlas 재생성' },
            { label: 'Octahedral Impostor 경로 통합' }
        ]
    },
    '06': {
        title: 'Height Fog 및 Decal 렌더링',
        summary: 'Height, Linear Fog와 깊이 기반 Spotlight 투영을 구현했습니다. RGB를 혼합하면서도 뷰포트 Render Target의 Alpha는 보존하도록 처리했습니다.',
        role: '대기 및 Decal 렌더링 프로그래머',
        objective: '기존 렌더링 순서와 뷰포트 Alpha를 유지하면서, 조절 가능한 Fog와 투영 조명을 추가하는 것이 목표였습니다.',
        contributions: [
            'Fog 셰이더와 렌더 상태, 이동 가능한 FogActor를 구현했습니다. 안개 적용 거리와 색상, 카메라 Near/Far 값을 조절하고 Billboard로 위치를 표시하도록 했습니다.',
            'Scene 깊이 생성을 Fog 렌더러에서 분리하고, 역방향 깊이 복원을 사용하는 FScene 수집 과정에 연결했습니다.',
            '가까운 오브젝트가 ImGui 뷰포트에서 투명해지는 원인을 Alpha 혼합식에서 찾고, Linear Fog 렌더링을 수정했습니다.',
            'Alpha를 보존하는 Blend State와 SpotLightDecal의 Additive 처리를 구현했습니다. 출력 채널을 나눠 확인하며 Decal의 표시 오류를 추적했습니다.'
        ],
        implementation: [
            'Height/Linear Fog 방정식, Cutoff 거리, 안개 색상, 카메라 Near/Far 파라미터',
            'FogActor, Scene 컬렉션, Billboard, 색상 선택기, 에디터 속성',
            'Scene 깊이 분리, 역 View-Projection을 이용한 위치 복원, 역방향 깊이, 렌더링 순서, Alpha 혼합',
            '깊이로 복원한 위치에 Spotlight 투영, RGB Additive 혼합, 기존 Alpha 보존'
        ],
        flow: 'Scene 깊이, 카메라, Fog/Decal 설정 → 월드 위치 복원 → 안개, 투영 조명 적용 → Alpha를 유지한 뷰포트 합성',
        results: [
            '기존 렌더러에 Fog와 Spotlight 투영 기능을 추가했습니다.',
            'Fog와 Decal의 색상 혼합이 ImGui에서 사용하는 뷰포트 Alpha를 덮어쓰지 않도록 했습니다.',
            'Fog 구현 코드를 프로젝트 브랜치에 공개했습니다.'
        ],
        evidenceStatus: '구현 내용',
        evidenceNote: '깊이 복원, 알파를 보존하는 Fog Blending, Spotlight Decal, 렌더 채널 수정을 구현해 Fog와 Decal Artifact를 해결했습니다.',
        sourceLabel: 'Fog 구현 브랜치',
        troubleshootingEvidence: [
            {
                kicker: '초기 Fog 렌더링 문제',
                title: '첫 Fog Pass에서 오브젝트는 Fog 색상으로 물들고 뷰포트 대부분은 검게 표시됐습니다.',
                summary: 'Geometry에는 Fog 색상이 반영됐지만 에디터 뷰포트가 검게 표시됐습니다. Alpha Blending이 Render Target의 Alpha를 Fog Opacity로 덮어써 ImGui 배경이 드러난 것이 원인이었습니다. 기존 Scene Alpha를 보존하도록 Blend State를 수정하고, 원거리와 Sky 계산에서 비정상적인 수치가 나오지 않도록 처리했습니다.',
                tags: ['Fog 렌더링 문제', '초기 fog pass', 'Viewport Alpha 문제', 'Far-depth 방어'],
                figures: [
                    {
                        stage: '원거리 뷰포트가 검게 표시된 화면',
                        alt: '에디터 격자는 보이지만 먼 장면과 하늘이 검게 표시된 초기 Fog 화면',
                        caption: '지평선과 하늘이 검게 표시됐습니다. 나중에 그리는 에디터 격자는 그대로 보입니다.'
                    },
                    {
                        stage: 'Geometry 반영 확인',
                        alt: '주변 뷰포트는 검고 큐브에만 청회색 안개가 적용된 초기 Fog 화면',
                        caption: '큐브에는 안개 색상이 적용됐지만 주변 장면은 여전히 검게 표시됐습니다.'
                    }
                ],
                facts: [
                    { label: '관찰된 실패', value: '화면의 89.870%가 검게 출력', detail: '#0F0F0F와 정상 #404040 Clear 비교' },
                    { label: 'FogColor 전달', value: '#8098B1 ≈ #8099B3', detail: '렌더링된 Cube와 기본 FogColor 비교' },
                    { label: 'Alpha 수정', value: '3f5241e', detail: 'Destination Alpha를 보존하는 Fog RGB Blend' }
                ],
                trace: { label: 'Alpha 혼합식 수정' },
                method: 'Fog Pass에서 RGB를 혼합하되 Destination Alpha는 보존하고, 원거리와 Sky 계산에는 유한값 검사를 추가했습니다.'
            },
            {
                kicker: 'Fog 적용에 따른 가시성 변화',
                title: 'Fog가 적용된 장면에서 메시가 가려지고 FogActor 아이콘만 남는 현상이 있었습니다.',
                summary: 'Exponential Fog를 개발하는 과정에서 Scene Mesh가 가려지고 에디터의 FogActor Billboard만 남는 현상이 있었습니다. 두 화면은 Fog가 적용된 상태에서 메시의 가시성이 달라지는 모습을 보여 줍니다.',
                tags: ['에디터 화면', 'Height Fog 적용', '가시성 변화', 'Week06'],
                figures: [
                    {
                        stage: 'Fog 적용, mesh 보임',
                        alt: 'blue height fog가 적용된 상태에서 큰 cube와 sphere가 보이는 Week06 editor viewport',
                        caption: '안개로 장면의 색상과 대비가 약해졌지만 큐브와 구체는 보입니다.'
                    },
                    {
                        stage: 'Fog 활성, mesh 보이지 않음',
                        alt: 'scene mesh는 보이지 않고 fog actor icon만 남은 blue height fog 상태의 Week06 editor viewport',
                        caption: '장면의 메시는 가려지고 에디터 표시용 FogActor Billboard만 남아 있습니다.'
                    }
                ],
                trace: { label: 'HeightFog의 가시성, 불투명도 계산' },
                method: 'HeightFog는 거리에 따른 가시성을 불투명도로 변환하고, FogMaxOpacity로 최대값을 제한합니다.'
            },
            {
                kicker: '지평선 Fog 경계 보정',
                title: '하늘과 Geometry의 Fog 계산 방식이 달라 지평선에 뚜렷한 경계가 생겼습니다.',
                summary: '파란 Fog Layer 위로 어두운 하늘이 남아 지평선 경계가 뚜렷하게 보였습니다. Sky에서 상수 색상을 반환하던 코드를 바꾸고, 복원한 Sky Ray에도 Geometry와 같은 Fog 함수를 적용했습니다. 이미지는 조정 과정에서 하늘의 Fog 반응이 달라지는 모습입니다.',
                tags: ['에디터 화면', '지평선 경계', 'Sky Ray 보정', '5ccad72'],
                figures: [
                    {
                        stage: '진단 01',
                        alt: 'horizon에서 dark sky와 blue fog layer가 뚜렷하게 갈리는 Week06 height fog 진단',
                        caption: '어두운 하늘과 파란 안개가 적용된 장면 사이에 수평 경계가 생겼습니다.'
                    },
                    {
                        stage: '진단 02',
                        alt: '조금 다른 시점에서도 dark sky와 blue fog layer의 단단한 경계가 나타나는 두 번째 Week06 height fog 화면',
                        caption: '카메라 위치와 화면 범위를 바꿔도 같은 경계가 보입니다.'
                    },
                    {
                        stage: 'Sky 반응 조정 과정',
                        alt: 'Grid 지평선 위 하늘까지 파란 Fog가 적용된 Week06 조정 화면',
                        caption: '하늘에도 Fog를 적용해 위쪽의 검은 영역을 없앴습니다.'
                    }
                ],
                facts: [
                    { label: '수정 커밋', value: '5ccad72', detail: 'Sky 경로 수정' },
                    { label: '기존 sky 경로', value: '상수 반환', detail: 'Depth = 1이면 월드 공간의 Fog 적분을 건너뜀' },
                    { label: '수정된 sky 경로', value: '방향 적분', detail: 'InvViewProj로 복원한 광선에 선택한 Fog 함수를 적용' }
                ],
                trace: { label: '5ccad72 전후의 sky 경로' },
                method: 'InvViewProj로 Sky Ray를 복원하고, 선택된 Linear 또는 Exponential Fog 함수에 전달합니다.'
            },
            {
                kicker: 'Decal Alpha 디버깅',
                title: '색상 채널을 나눠 확인하며 Decal 주변이 검게 보이는 원인을 Render Target의 Alpha에서 찾았습니다.',
                summary: 'Decal 주변이 검게 표시되는 문제를 R, G, B, A 채널별로 확인했습니다. 두 번째 화면은 RGB 출력을 확인하기 위해 적색을 더한 상태입니다. 기존 Alpha가 바뀌는 것을 확인하고 Blend State를 수정했습니다.',
                tags: ['에디터 화면', 'Alpha 오염', 'Blend State 수정', 'SpotLightDecal'],
                figures: [
                    {
                        stage: '검은 바깥 영역 증상',
                        alt: 'test surface에서 흰 projected response 주변에 dark ring이 보이는 Week06 spotlight decal 진단',
                        caption: 'Decal 주변의 검은 영역을 확인하고 렌더 타깃의 색상과 Alpha를 나눠 검사했습니다.'
                    },
                    {
                        stage: 'Additive 색상 범위 확인',
                        alt: 'floor 전반의 넓은 red additive contribution과 포화된 white cube가 보이는 Week06 spotlight decal 진단',
                        caption: '적색으로 표시해 바닥과 큐브 표면에 투영되는 RGB 범위를 확인했습니다.'
                    }
                ],
                facts: [
                    { label: '우세한 적색 프레임', value: '#BF4040, 64.619%', detail: '#404040 위의 red additive contribution과 일치' },
                    { label: '저장된 PNG alpha', value: '전체 255', detail: 'Render-target alpha는 대응 코드 diff와 채널 진단으로 확인' },
                    { label: '기록된 Git 상태', value: 'decfa685 이후', detail: '이 capture 사이와 이후에 추가 commit 없음' }
                ],
                trace: { label: 'RGB blending과 destination-alpha 보존 분리' },
                method: 'Alpha를 보존하는 Blend State와 SpotLightDecal의 Additive 경로를 구현했습니다. Projection Decal에 해당 Blend State를 연결하는 작업은 팀원이 담당했습니다.'
            }
        ],
        troubleshooting: [
            {
                title: 'constant sky-fog 분기가 단단한 horizon seam을 만듦',
                symptom: 'fog가 적용된 ground와 background sky가 연속된 atmospheric response를 공유하지 않고 뚜렷한 수평 경계에서 만났습니다.',
                cause: 'depth-buffer sky pixel(depth ≥ 1)은 즉시 FogMaxOpacity의 FogInscatteringColor를 반환한 반면 geometry pixel은 world position을 재구성하고 exponential height fog를 적분했습니다. 따라서 horizon 양쪽의 인접 pixel이 서로 다른 equation을 사용했습니다.',
                fix: 'InvViewProj를 통해 sky pixel의 world-space direction을 재구성하고 geometry와 동일하게 선택된 linear 또는 exponential fog function으로 먼 가상 지점을 평가했습니다. component와 constant-buffer 경로를 통해 bUseLinearFog를 노출했습니다.',
                result: 'sky와 geometry가 distance, height, direction을 반영하는 fog evaluation을 공유해 horizon의 code-path 불연속을 제거합니다.',
                code: { context: 'PS(), depth >= 1.0 sky 경로' }
            },
            {
                title: 'decal RGB는 유효하지만 blend 경로가 viewport alpha를 오염시킴',
                symptom: 'projected response는 보였지만 viewport texture를 합성할 때 바깥 영역이 검게 변했습니다. output channel을 하나씩 확인한 결과 RGB lighting calculation이 아닌 alpha가 원인으로 격리됐습니다.',
                cause: '일반 alpha blend equation이 destination alpha를 1 × SrcAlpha + 0 × DstAlpha로 기록했습니다. 따라서 fog 또는 decal pass가 RGB result는 올바르더라도 scene render target의 alpha를 교체할 수 있었고, 이후 ImGui가 손상된 alpha를 viewport composition에 사용했습니다.',
                fix: '일반 translucent color용 AlphaBlendKeepAlpha state와 spotlight contribution용 Additive state를 만들었습니다. 둘 다 0 × SrcAlpha + 1 × DstAlpha로 destination alpha를 유지합니다. projection decal pass는 팀원이 재사용 state에 연결했으며 SpotLightDecal 경로에는 개인 additive integration을 사용했습니다.',
                result: 'fog와 spotlight color가 viewport alpha를 보존하면서 RGB를 변경합니다. 개인 작업은 재사용 가능한 keep-alpha state와 SpotLightDecal additive 경로이며, 팀원 commit 2a066ce가 Projection Decal binding을 제공합니다.',
                code: { context: 'FBlendStateManager::Create(), alpha-preserving state' }
            },
            {
                title: 'spotlight cone 조건식이 거의 모든 차이를 true로 처리함',
                symptom: 'projected cone 내부의 유효한 pixel도 cosine이 outer-cone threshold와 정확히 같지 않으면 discard될 수 있었습니다.',
                cause: 'shader가 `if (cosAngle - OuterConeAngleCos)`를 사용해 pixel이 cone 밖인지 검사하는 대신 0이 아닌 모든 차이를 true로 변환했습니다.',
                fix: '의도한 순서 비교로 조건을 변경해 angle이 outer cone 밖인 pixel만 discard했습니다.',
                result: 'interior spotlight pixel은 falloff, normal, luminance evaluation으로 진행하고 exterior pixel만 제거됩니다.',
                code: { context: 'PS(), cone-angle rejection' }
            },
            {
                title: 'Fog 컴포넌트를 삭제하면 다른 메시도 사라지는 문제',
                symptom: 'Height Fog 컴포넌트를 제거하면 관계없는 Scene 메시도 함께 사라질 수 있었습니다.',
                cause: 'FScene::RemoveFog()가 Fog를 지운 뒤 전체 렌더 프록시 목록인 SelectedProxies, NeverCullProxies, FreeSlots, VisibleProxies까지 비웠습니다.',
                fix: 'RemoveFog()에서 해당 UHeightFogComponent만 제거하고, 전체 프록시 관리 배열은 유지하도록 수정했습니다.',
                result: 'Fog를 제거해도 나머지 메시를 렌더링하는 데 필요한 가시성 정보가 유지됩니다.',
                code: { context: 'FScene::RemoveFog()' }
            },
            {
                title: 'fog pass가 가까운 geometry를 editor에서 투명하게 만듦',
                symptom: 'fog pass 이후 camera 가까이의 pixel이 RGB lighting result는 유효한데도 검은 editor background로 보였습니다.',
                cause: '기존 alpha blend state가 target alpha를 1 × SrcAlpha + 0 × DstAlpha로 계산했습니다. 따라서 fog가 render-target alpha를 fogOpacity로 교체했고, fogOpacity가 0에 가까운 near pixel을 ImGui가 투명하게 합성했습니다.',
                fix: 'fog color는 blend하면서 destination alpha를 보존하는 fog 전용 blend state를 추가하고 fog pass에만 연결했습니다.',
                result: 'fog가 viewport opacity를 지우지 않고 scene color를 변경하므로 ImGui가 render target을 표시할 때 가까운 geometry가 계속 보입니다.',
                code: { context: 'FBlendStateManager::Create()' }
            },
            {
                title: 'scene-depth debug mode가 fog renderer에 결합됨',
                symptom: 'depth visualization이 fog collection과 공유 fog constant에 의존해 fog가 없거나 꺼진 경우 debug view가 독립적으로 동작하지 못했습니다.',
                cause: 'HeightFog.hlsl이 atmospheric blending과 depth-visualization branch를 모두 포함했고, collector가 SceneDepth mode를 활성화하려고 임의의 fog parameter를 생성했습니다.',
                fix: '전용 SceneDepth shader와 renderer 경로를 만들고 fog component를 FScene에 등록했으며, 같은 depth resource를 SRV로 bind하기 전에 DSV를 명시적으로 unbind했습니다.',
                result: 'scene-depth 검사가 독립적으로 동작하고 fog pass는 fog 책임만 가지며 DSV/SRV binding hazard도 사라집니다.'
            },
            {
                title: '제거된 fog가 재사용된 render bus에 남음',
                symptom: 'scene이나 frame이 fog collection을 멈춘 뒤에도 renderer가 fog가 있다고 보고 이전 parameter를 재사용할 수 있었습니다.',
                cause: 'FRenderBus::Clear()가 proxy, entry, resource collection은 reset했지만 bHasFog와 FogParams는 reset하지 않았습니다.',
                fix: 'render-bus를 clear할 때마다 presence flag와 fog parameter structure를 모두 reset했습니다.',
                result: 'SetFogParams() 호출이 없는 frame은 HasFog = false로 시작하며 이전 fog pass를 이어받지 않습니다.',
                code: { context: 'FRenderBus::Clear()' }
            },
            {
                title: 'fog와 decal buffer가 inverse view-projection을 중복 선언함',
                symptom: '공유 constant-buffer file을 include하는 shader에 InvViewProj symbol이 중복됐고, fog와 decal이 frame-global camera matrix의 별도 copy를 유지했습니다.',
                cause: 'DecalBuffer와 HeightFogCB가 같은 HLSL include에 각각 InvViewProj를 선언했습니다.',
                fix: 'ViewProjection과 InvViewProj를 frame buffer로 옮겨 UpdateFrameBuffer()에서 한 번만 채우고 pass별 copy를 제거했습니다.',
                result: '공유 include에는 inverse view-projection 선언이 하나만 남고 두 pass가 같은 frame matrix를 사용합니다.',
                code: { context: 'FRenderer::UpdateFrameBuffer()' }
            },
            {
                title: 'far-depth reconstruction이 fog blending에 non-finite 값을 전달할 수 있음',
                symptom: '최초 full-screen fog prototype을 안정화하는 동안 depth-boundary code path가 sky 또는 far pixel에 정의되지 않은 world position과 opacity input을 만들 수 있었습니다.',
                cause: 'ReconstructWorldPos가 near-zero 값을 guard하지 않고 homogeneous worldH.w로 나눴습니다. 이후 ray length, normalized direction, height exponent, accumulated density가 blend stage에 도달하기 전에 zero-length, infinite, NaN, negative, overflowed 값이 될 수 있었습니다.',
                fix: 'homogeneous W와 유효하지 않은 ray length를 guard하고 exponential input을 clamp했습니다. fog integral을 0 이상이며 제한된 값으로 만들고 opacity를 saturate했으며, 최종 component에 NaN 또는 infinite가 남으면 discard했습니다.',
                result: '잘못된 far/sky reconstruction이 non-finite opacity 또는 color를 fog pass로 전달하지 않습니다.',
                code: { context: 'ReconstructWorldPos() + GetExponentialHeightFog()' }
            }
        ],
        commitRefs: [
            { label: '초기 full-screen fog WIP' },
            { label: 'Height Fog 구현' },
            { label: 'far-depth 및 수치 fog guard' },
            { label: '재사용 가능한 alpha-preserving blend state' },
            { label: '개인 branch: SpotLightDecal additive state 통합' },
            { label: '개인 branch: spotlight cone 조건 및 additive-state binding' },
            { label: '팀 통합: Projection Decal keep-alpha binding' },
            { label: 'scene-depth 분리' },
            { label: 'fog 제거 시 mesh proxy list 유지' },
            { label: '최종 linear fog 및 spotlight projection 경로' }
        ]
    },
    '07': {
        title: 'Lighting 파이프라인',
        summary: 'Light Component와 Scene Proxy를 Forward Renderer의 조명 버퍼에 연결했습니다. 에디터용 Light Actor, Shader Hot Reload, 시간에 따른 주광 변화도 구현했습니다.',
        role: '렌더링 프로그래머',
        objective: '조명, Material, Scene 데이터를 실시간 렌더링에 연결하고, 에디터에서 조명과 Shader를 수정할 수 있도록 하는 것이 목표였습니다.',
        contributions: [
            'LightComponentBase와 LightSceneProxy를 Forward Renderer의 상수 버퍼에 연결했습니다. Light Actor, Billboard, 주변광과 디버그 표시도 구현했습니다.',
            '공유 조명 함수와 Toon 셰이더의 Hot Reload를 추가하고, 렌더 상태와 GPU 리소스 누수를 수정했습니다.',
            '태양 궤도와 24시간 주광 변화, 고도에 따른 주변광, 하늘 색상을 구현했습니다. 캐시된 조명을 삭제할 때 남는 참조도 정리했습니다.'
        ],
        implementation: [
            'Light Component, Scene Proxy, Forward Renderer 버퍼 아키텍처',
            '에디터 Light 배치, Billboard, Cone, Debug 시각화, Shader Hot Reload',
            'Daylight 궤도, 태양 방향, 고도, 시간 변환, Ambient 색상, Sky Clear Color'
        ],
        flow: '에디터 Light Actor → Component, Scene Proxy → Forward Light Buffer → Material Lighting, Daylight 갱신',
        results: [
            '다음 그림자 과제에서 사용할 조명 시스템을 구현했습니다.',
            '조명 기능을 엔진의 Scene과 렌더링 경로에 통합했습니다.'
        ],
        evidenceStatus: '구현 내용',
        evidenceNote: 'Light Component/Proxy 경계, Forward Buffer Binding, Shader Hot Reload, 주광 제어, Light Resource 정리를 구현했습니다.',
        troubleshooting: [
            {
                title: 'shader hot reload가 dependency를 누락하고 cached data를 무효화함',
                symptom: '공유 lighting 또는 toon function 수정이 안정적으로 반영되지 않았고, reload 실패 시 shader state가 불안정해지거나 cache된 GPU resource가 leak될 수 있었습니다.',
                cause: 'hot-reload dependency 경로가 모든 공유 lighting function을 포함하지 않았습니다. recompile 중 macro pointer가 CachedDefines 내부 string을 참조했지만 Create()가 해당 cache를 clear했고, renderer shutdown 시 UberShaderCache도 clear되지 않았습니다.',
                fix: '공유 function/lighting dependency를 포함하고, recompile 전에 cache된 path, entry point, define string을 로컬 owned storage로 복사했습니다. 실패 시 이전 shader를 유지하고 shutdown 순서에서 uber-shader cache를 release했습니다.',
                result: 'lighting variant가 유효한 input으로 reload되고 compile 실패가 working shader를 버리지 않은 채 보고되며 shader cache resource가 회수됩니다.',
                code: { context: 'FShader::Recompile()' }
            },
            {
                title: 'Daylight, Light Actor 삭제 후 렌더 상태가 남는 문제',
                symptom: 'Daylight Actor를 삭제해도 마지막 하늘 색상이 남았습니다. 캐시된 방향광, 주변광을 삭제하면 다음 갱신에서 해제된 컴포넌트를 참조할 위험도 있었습니다.',
                cause: 'Daylight가 바꾼 Scene 색상을 소멸자에서 복원하지 않았습니다. Actor를 World에서 제거한 뒤에도 캐시된 컴포넌트 포인터를 그대로 사용했습니다.',
                fix: 'Daylight 소멸자에서 하늘 색상 재정의를 해제했습니다. Tick, 속성 변경으로 갱신하기 전에 캐시된 태양광, 주변광 참조를 비우고 다시 연결했습니다.',
                result: '조명 Actor를 제거하면 기본 Scene 상태로 돌아가고, Daylight가 소멸한 컴포넌트를 참조하지 않도록 했습니다.'
            },
            {
                title: '0인 light attenuation input이 shader에서 non-finite 값을 만듦',
                symptom: 'AttenuationRadius 또는 LightFalloffExponent가 0이면 point/spot lighting이 잘못된 값을 만들 수 있었습니다.',
                cause: 'Lambert, Gouraud, Blinn–Phong 경로가 raw attenuation radius로 나누고 raw exponent를 pow()에 전달했습니다.',
                fix: '모든 lighting model에서 divisor와 exponent를 작은 양수 값으로 clamp했습니다.',
                result: '수정된 attenuation 경로는 0인 edge case를 division 또는 exponentiation에 전달하지 않습니다.',
                code: { context: 'CalculatePointLight() / CalculateSpotLight()' }
            },
            {
                title: 'renderer shutdown이 소유 resource를 해제하지 않고 cache entry만 제거함',
                symptom: 'shutdown 또는 reinitialization 후 cache된 material, mesh, texture, constant buffer, shader-reflection allocation이 남았습니다.',
                cause: '여러 cache map이 cache된 UObject를 파괴하지 않고 clear됐으며 UStaticMesh, constant-buffer pool, FShader도 자신이 소유한 heap 또는 GPU resource 일부를 해제하지 않았습니다.',
                fix: 'UObjectManager를 통해 cache된 object를 파괴하고 mesh asset과 shader layout record를 delete했으며 두 constant-buffer container를 모두 release했습니다.',
                result: '영향받은 owner가 lookup entry만 버리는 대신 Release() 또는 destruction 중 resource를 회수합니다.',
                code: { context: 'FShader::Release()' }
            }
        ],
        commitRefs: [
            { label: 'light component 기반' },
            { label: 'Forward Light Buffer 바인딩' },
            { label: 'Shader Hot Reload' },
            { label: '24시간 태양광 시스템' }
        ]
    }
};

// Korean content overrides for gametechlab.js.
// Source array mapping: Week08..Week14 === indices 7..13.
// Merge nested arrays by index so URLs, hashes, file paths, snippets, and technology names
// continue to fall back to the untouched English source data.
window.GAME_TECH_LAB_KO_PART_08_14 = {
    '08': {
        sourceIndex: 7,
        week: '08',
        theme: 'Where There Is Light, There Is Also Shadow',
        title: '그림자 렌더링',
        summary: '방향광, 스포트라이트, 포인트 라이트의 그림자를 구현했습니다. 그림자 깊이 버퍼와 Cube Map, PCF/VSM 필터링을 연결하고, 컬링과 조명 이동에 따른 캐시 갱신을 처리했습니다.',
        role: '렌더링 프로그래머',
        objective: 'Week07 조명 경로를 확장해 장면 지오메트리가 실시간 그림자를 만들고 받을 수 있도록 하는 것이 목표였습니다.',
        contributions: [
            '스포트라이트, 방향광의 그림자 깊이 렌더링을 구현했습니다. D3D11 리소스 상태와 상수 버퍼, Shadow Map 누수를 수정하고 그림자가 물체에서 떨어져 보이는 Peter-panning을 보정했습니다.',
            '포인트 라이트의 Cube Shadow Map과 셰이더, VSM/PCF 필터를 구현했습니다. Cube Map 생성 설정과 샘플링 왜곡도 수정했습니다.',
            '그림자 후보의 우선순위와 컬링을 적용하고, 조명의 Mobility, Dirty Flag로 이동 시 캐시를 갱신하도록 했습니다. 에디터에서 이를 조절하는 기능도 추가했습니다.'
        ],
        implementation: [
            '방향광, 스포트라이트 shadow depth pass와 rasterizer bias 제어',
            '포인트 라이트 cube map, PCF/VSM 필터링, cube direction 보정',
            '우선순위 수집, 그림자 컬링, mobility, dirty cache, 에디터 제어'
        ],
        flow: '라이트별 후보 수집 → depth / cube shadow pass → PCF 또는 VSM 샘플링 → 캐시된 조명 결과',
        results: [
            'Week07 조명 파이프라인에 실시간 그림자를 추가했습니다.',
            '통합 프로젝트를 저장소에 공개했습니다.'
        ],
        evidenceStatus: '구현 내용',
        evidenceNote: '방향광, Spotlight, Point Light Shadow Pass와 Cube Map, PCF/VSM Filtering, Culling, Cache 제어를 구현했습니다.',
        sourceLabel: 'Week08 작성 커밋 열기',
        troubleshooting: [
            {
                title: '포인트 라이트 그림자용 Cube SRV 설정 오류',
                symptom: '포인트 라이트의 그림자가 잘못 샘플링됐고, D3D11 뷰 설정도 유효하지 않을 수 있었습니다.',
                cause: '텍스처 생성 시 D3D11_RESOURCE_MISC_TEXTURECUBE가 빠졌고, SRV 설정에서 2D Array와 Cube Array의 공용체 필드를 혼용했습니다. 셰이더도 잘못된 파라미터 위치에서 Cube 인덱스를 읽었습니다.',
                fix: '텍스처에 Cube 플래그를 지정하고 Texture2DArray, TextureCubeArray SRV를 각 필드에 맞춰 구성했습니다. Cube 인덱스는 Params0.w에 저장하고 셰이더도 같은 위치에서 읽도록 수정했습니다.',
                result: 'Cube 각 면의 렌더링과 샘플링에 맞는 리소스를 생성하고, 포인트 라이트마다 올바른 Cube Slice를 참조하도록 했습니다.',
                code: { context: 'FShadowRenderFeature::EnsureShadowDepthArray()의 cube SRV 구성' }
            },
            {
                title: 'Shadow bias로 인한 눈에 띄는 peter-panning',
                symptom: '그림자가 캐스터의 발과 접촉 경계에서 떨어져 보였습니다.',
                cause: 'CPU/rasterizer depth bias와 큰 0.05 normal offset이 함께 적용되어, 샘플링할 receiver 위치가 표면에서 지나치게 밀려났습니다.',
                fix: '중복 depth bias를 제거하고 shadow cull mode를 back face로 변경했으며, normal offset을 0.02로 낮추고 수정하지 않은 receiver depth와 비교했습니다.',
                result: 'self-shadow artifact를 제한할 최소 offset은 유지하면서 contact shadow가 캐스터에 더 가까이 붙었습니다.'
            },
            {
                title: '포인트 라이트가 요청한 PCF 경로를 우회함',
                symptom: '포인트 라이트에서 PCF를 선택해도 필터링되지 않은 기본 그림자가 출력되었고, 캐시된 그림자에는 명시적인 무효화 규약이 없었습니다.',
                cause: 'point-shadow 평가는 VSM과 fallback mode만 분기하고 filter mode 1을 cube-map PCF 구현으로 전달하지 않았습니다.',
                fix: '전용 3 × 3 point-cube PCF sampler를 추가하고 filter-mode 분기를 올바르게 연결했으며, light mobility와 shadow-cache dirty state를 도입했습니다.',
                result: '포인트 라이트가 선택한 PCF filter를 사용하며, 이동하거나 편집한 라이트가 캐시된 shadow data를 명시적으로 무효화할 수 있게 되었습니다.'
            },
            {
                title: '그림자 후보를 정렬하기 전에 Cube를 중복 할당하는 문제',
                symptom: '그림자를 만드는 포인트 라이트가 수집 단계와 정렬 후에 각각 그림자 정보, 뷰를 할당해, 제한된 Cube 용량을 중복 사용했습니다.',
                cause: '처음 후보를 수집할 때 그림자를 등록했고, 후보 정렬 후 같은 라이트에 다시 할당했습니다.',
                fix: '먼저 후보만 수집해 카메라 거리순으로 정렬하고, MaxPointShadowCubes 범위 안에서 한 번만 할당하도록 수정했습니다.',
                result: '우선순위에 따라 선택한 라이트에만 그림자 정보와 Cube 뷰를 한 번씩 생성합니다.',
                code: { context: 'Point-light 후보 수집' }
            },
            {
                title: 'merge 이후 방향광 그림자 입력은 만들어졌지만 렌더링되지 않음',
                symptom: 'frame data에 방향광 shadow light와 view가 존재했지만 방향광 그림자가 나타나지 않았습니다.',
                cause: 'RenderShadows()가 일반 shadow-view 경로를 호출했지만 merge 과정에서 RenderDirectionalShadows() 호출이 누락되었습니다.',
                fix: 'preview 생성, buffer upload, resource binding보다 먼저 방향광 depth rendering을 복원했습니다.',
                result: '방향광 shadow map이 해당 데이터를 소비하기 전에 같은 shadow frame에서 렌더링됩니다.',
                code: { context: 'RenderShadows()의 방향광 그림자 호출 경로' }
            },
            {
                title: 'Point-cube PCF의 basis가 cube-face 경계에서 바뀜',
                symptom: 'soft-shadow kernel의 방향이 dominant-axis 및 cube-face 경계 주변에서 바뀌거나 왜곡되었습니다.',
                cause: '3 × 3 offset이 dominant-component 조건에 따라 고정 axis basis를 선택했고, offset을 적용하지 않은 receiver 위치를 샘플링했습니다.',
                fix: 'slope-scaled normal offset을 적용하고 light-to-surface 방향에서 tangent와 bitangent를 만든 뒤, 연속적인 local plane에서 8-tap Poisson disk를 회전시켰습니다.',
                result: 'PCF offset 생성이 더 이상 세 개의 고정 cube-face basis 사이에서 전환되지 않습니다.',
                code: { context: 'SampleShadowViewPointPCF()의 연속 tangent basis 구성' }
            }
        ],
        commitRefs: [
            { label: '방향광 그림자 경로' },
            { label: '포인트 라이트 그림자 경로' },
            { label: 'VSM 포인트 라이트 필터링' },
            { label: 'PCF, Mobility, Dirty Cache 처리' }
        ]
    },

    '09': {
        sourceIndex: 8,
        week: '09',
        theme: '3rd Game Jam, Light, Camera, Action!',
        title: 'Standalone Shipping 빌드',
        summary: 'Shipping, Cooking 파이프라인을 구현하고, 게임 프레임워크와 World 직렬화, PIE 렌더링, 카메라 효과, Lua 연동, Gamma 보정을 연결했습니다.',
        role: '빌드, 런타임 통합 프로그래머',
        objective: '실행에 필요한 Asset을 패키지에 포함하고, 팀 게임이 에디터 밖에서도 시작되도록 만드는 것이 목표였습니다.',
        contributions: [
            'GameModeBase/GameInstance와 World 바이너리 직렬화, Enhanced Input 전환을 구현했습니다. 프로젝트 생성부터 Shipping 빌드, Cooking까지 연결하고, 에디터 UI 없이 실행하는 파서, 빌더도 만들었습니다.',
            'PIE의 오프스크린 렌더링과 입력을 분리하고 PlayerCameraManager를 구현했습니다. 카메라 흔들림, 효과, Lua 카메라 Modifier와 Actor의 카메라 계산을 연결했습니다.',
            '감마 보정 제어를 추가하고 후처리 순서와 ABI 불일치를 수정했습니다. 런타임 자산 경로, 크래시, 해제된 객체 참조, 패키징 스크립트 문제도 해결했습니다.'
        ],
        implementation: [
            'Shipping Target, 프로젝트 생성, Cook, Stage, Headless Builder, 배치 패키징, 자산 복사',
            'GameMode, GameInstance, World 바이너리 직렬화, PIE, Offscreen Buffer, Enhanced Input',
            '카메라 처리, Lua Modifier, 피격, 비네트 효과, 감마 보정, 렌더 패스 순서'
        ],
        flow: '에디터 World → 바이너리 직렬화, Cook → 자산 복사, Stage → Shipping 실행 파일 → 런타임 카메라, 후처리',
        results: [
            'Windows에서 패키징 실행 파일을 직접 실행하고 START에서 Story Scene으로 진입했습니다.',
            'Cook된 Gameplay Level에서 Score, Distance, Log, Trace, Dump, Stability UI가 함께 동작했습니다.'
        ],
        evidenceStatus: '구현 내용',
        evidenceNote: 'Shipping/Cook/Stage 도구, 런타임 Camera, Post Process 연결, START에서 StoryScene으로 이어지는 실행 경로를 구현했습니다.',
        sourceLabel: 'Week09 작성 커밋 열기',
        troubleshootingEvidence: [
            {
                kicker: 'Shipping 빌드 실행',
                title: '패키징 실행 파일이 Main Menu에서 Story와 Gameplay까지 이어집니다.',
                summary: 'Stage된 Build를 Visual Studio 없이 실행하고 START에서 Story Scene을 거쳐 Cook된 Runner Level을 로드했습니다. Gameplay HUD와 Crash Dump 저장 경로도 같은 실행 흐름 안에서 동작합니다.',
                tags: ['실제 runtime 캡처', 'Shipping x64 빌드', 'Runtime 로그'],
                figures: [
                    {
                        stage: 'Checkpoint 01, 직접 실행',
                        alt: 'LunaticEngine standalone Shipping executable에서 Engine Dive main menu를 표시한 화면',
                        caption: '패키징한 실행 파일을 Visual Studio 밖에서 실행해 렌더러 초기화와 메인 메뉴 표시를 확인했습니다.'
                    },
                    {
                        stage: 'Checkpoint 02, START 전환',
                        alt: 'START 선택 후 loading 전환을 표시하는 LunaticEngine standalone executable',
                        caption: 'START를 선택하면 로딩 화면으로 전환합니다.'
                    },
                    {
                        stage: 'Checkpoint 03, Story Scene',
                        alt: '대화와 진단 패널이 표시되는 패키징된 Engine Dive Story Scene',
                        caption: 'START 경로가 Cook된 Story Scene으로 진입하고 Lua 기반 대화 흐름을 실행합니다.'
                    },
                    {
                        stage: 'Checkpoint 04, Cooked Gameplay',
                        alt: 'Player Ship, 장애물 코스, 대화, 점수 Telemetry가 표시되는 Engine Dive 패키징 Runner Level',
                        caption: 'Player 조작, 장애물, 수집물, 대화와 Score, Distance, Log, Trace, Dump, Stability HUD가 함께 동작합니다.'
                    },
                    {
                        stage: 'Checkpoint 05, Crash Dump',
                        alt: 'Crash Dump 파일 저장을 알리는 Windows Dialog와 Engine Dive Gameplay 화면',
                        caption: '게임 실행 중 패키징 빌드의 Saves/Dump 폴더에 .dmp 파일을 저장합니다.'
                    }
                ],
                facts: [
                    { label: '실행 흐름', value: 'Menu → Story → Gameplay', detail: '하나의 Stage 실행 파일' },
                    { label: 'Crash 출력', value: 'Saves/Dump/*.dmp', detail: 'Runtime 진단 경로' }
                ],
                trace: { label: 'Shipping 실행 로그' },
                method: '패키징한 Engine Dive에서 메뉴의 START를 거쳐 StoryScene으로 진입하며, Scene 로딩과 초기화 과정은 Shipping Log에 기록합니다.'
            }
        ],
        troubleshooting: [
            {
                title: '증분 빌드에서 구조체 레이아웃이 달라지는 문제',
                symptom: '후처리 설정을 추가한 뒤 렌더링 코드가 FFrameContext 필드를 잘못된 오프셋에서 읽었습니다. 이전 빌드의 오브젝트 파일이 섞이면 참조 주소가 어긋났습니다.',
                cause: 'FFrameContext 중간에 큰 FPostProcessSettings 멤버를 추가해 뒤쪽 멤버의 위치가 모두 바뀌었습니다. 이전 구조체 레이아웃으로 컴파일된 파일은 변경된 위치를 반영하지 못했습니다.',
                fix: '새 후처리 설정 멤버를 FFrameContext 끝으로 옮기고, Material 파라미터를 공통 카메라, 후처리 구조를 통해 전달했습니다.',
                result: '기존 앞쪽 필드의 오프셋을 유지하면서, Draw Command 생성에 새 후처리 데이터를 전달하도록 수정했습니다.'
            },
            {
                title: 'Screen text가 사라지고 vignette가 검은 gamma 결과를 만듦',
                symptom: 'ScreenText가 gamma correction보다 앞에 정렬될 수 있었고, 강한 vignette blending이 보정된 frame을 검게 만들 수 있었습니다.',
                cause: 'draw SortKey가 ERenderPass에 4 bit만 할당해 pass ID 16 이상을 잘랐습니다. 별도로 1을 넘는 vignette blend weight가 lerp를 음수 color로 외삽한 뒤 gamma correction에 전달했습니다.',
                fix: 'SortKey의 render-pass field를 4 bit에서 8 bit로 확장하고 vignette blend weight를 saturate()로 제한했습니다.',
                result: 'ScreenText가 gamma correction 뒤에 유지되고 vignette effect가 최종 변환에 음수 color 값을 전달하지 않습니다.',
                code: { context: 'FDrawCommand::ComputeSortKey()의 render-pass bit packing' }
            },
            {
                title: '패키징 시 자산이 누락되거나 경로가 달라지는 문제',
                symptom: '독립 실행 파일은 시작돼도 패키징 폴더에 Scene, 대화, 시나리오, 메시 원본 또는 캐시가 없어 이후 로딩이 실패할 수 있었습니다.',
                cause: '배치 스크립트는 선택한 원본 폴더를 ShippingBuild로 복사했지만, Cook된 Scene은 다른 폴더에 있어 자산의 디렉터리 구조가 맞지 않았습니다.',
                fix: 'Saved/Cooked/Shipping에 원본 자산 복사본과 Cook된 Scene을 모아 패키징했습니다. 실행 파일 이름은 프로젝트에서 읽고, 필수 파일과 메시의 원본, 캐시 존재 여부도 검사했습니다.',
                result: '필수 자산이 없으면 패키징 단계에서 오류를 알리고, 런타임의 경로 탐색 규칙에 맞는 폴더 구조로 결과물을 생성합니다.',
                code: { context: 'cooked asset root 생성 및 검증' }
            },
            {
                title: '파괴된 collision component가 overlap 상대에 남음',
                symptom: 'overlap 한쪽을 파괴한 뒤에도 surviving component에 그 주소가 남아 다음 overlap pass가 해제된 메모리를 검사할 수 있었습니다.',
                cause: 'UPrimitiveComponent 소멸 시 world pending set에서는 component를 제거했지만 상대의 OverlapInfo array에서는 제거하지 않았습니다.',
                fix: '소멸 과정에서 현재 overlap을 순회해 모든 상대에서 이 component를 조용히 제거하고, teardown event를 방송하지 않은 채 local overlap list를 비웠습니다.',
                result: '남아 있는 overlap 상대가 파괴된 component pointer를 보유하지 않습니다.',
                code: { context: 'UPrimitiveComponent destructor의 overlap 상대 정리' }
            },
            {
                title: 'Tick queue가 frame 도중 소멸할 수 있는 object의 raw member를 보유함',
                symptom: '앞선 tick에서 actor나 component를 파괴하면 뒤에 대기 중인 FTickFunction pointer가 해제되거나 재사용된 object storage를 가리킬 수 있었습니다.',
                cause: 'GatherTickFunctions()가 PrimaryActorTick과 PrimaryComponentTick의 주소를 넣고, 이후 owner를 다시 검증하지 않은 채 역참조했습니다.',
                fix: 'target UObject와 UUID를 대신 대기열에 넣고 실행 직전에 tick member를 해석했으며, 소멸했거나 UUID가 재사용된 target을 거부하고 teardown 시 tick/world state를 초기화했습니다.',
                result: '대기 중인 항목은 원래 target과 identity가 살아 있을 때만 실행됩니다.',
                code: { context: 'FTickManager::ResolveTickFunction()의 수명 재검증' }
            },
            {
                title: '후처리 복사 대상이 셰이더 입력에도 남아 있는 문제',
                symptom: '복사 대상 텍스처가 이전 패스의 셰이더 입력에 바인딩된 채 남아 감마, FXAA 등 후처리 결과가 잘못 나올 수 있었습니다.',
                cause: 'BeginPass()가 시스템 SRV 슬롯을 비우기 전에 Scene Color, Depth 복사를 위해 CopyResource()를 호출했습니다.',
                fix: '복사 전에 시스템 텍스처 바인딩을 해제하고, 새 패스에는 최신 Scene Color, Stencil 리소스를 연결했습니다.',
                result: '복사 대상 텍스처를 파이프라인 입력으로 동시에 사용하는 충돌을 막았습니다.',
                code: { context: 'BeginPass()의 scene-color copy 전 SRV 해제' }
            }
        ],
        commitRefs: [
            { label: 'Shipping 빌드' },
            { label: 'Headless Parsing Builder 구현' },
            { label: 'Actor Camera 파이프라인' },
            { label: 'Gamma 및 render-order 수정' }
        ]
    },

    '10': {
        sourceIndex: 9,
        week: '10',
        theme: 'More Than Just Weight',
        title: 'Skeletal Mesh, Skinning 파이프라인',
        summary: 'Skeletal Mesh Component와 Scene Proxy, CPU Skinning을 구현했습니다. FBX Bind Pose를 보정하고 Bone 시각화, 피킹과 Morph Target 갱신을 추가했습니다.',
        role: 'Skeletal Rendering 프로그래머',
        objective: '뷰어의 Skeletal 데이터를 엔진 Component로 옮겨 렌더링하고, Bone 선택과 동적 갱신까지 지원하는 것이 목표였습니다.',
        contributions: [
            'USkeletalMeshComponent와 Scene Proxy, FSkeletalMesh 래퍼를 만들고 CPU Skinning을 연결했습니다.',
            'Rigid Bind와 비계층 Bone 처리, 동적 메시, 경계 상자 갱신, Show Flag와 경계 상자 피킹을 추가했습니다.',
            'FBX Cluster의 Bind Pose 정렬을 보정했습니다. Bone 래스터화, 피킹과 Morph Target, 텍스처 SRV 복구도 구현했습니다.'
        ],
        implementation: [
            'Skeletal Mesh Component, Scene Proxy, FSkeletalMesh 리소스, CPU Skinning',
            'FBX cluster Transform / TransformLink bind source와 rigid-bind fallback',
            '동적 Skinned Mesh 갱신, Bounds 계산, Bone Rasterization, Picking, Morph Target'
        ],
        flow: 'FBX Skeletal 데이터 → Bind Pose, Skin Weight 구성 → Component, Scene Proxy 전달 → Skinned Vertex, Bone Tool 갱신',
        results: [
            '가져온 Skeletal Asset을 컴포넌트와 렌더러에 연결했습니다.',
            'Blender/FBX의 Bind 데이터 불일치로 자세가 90도 돌아가는 문제를 해결했습니다.'
        ],
        evidenceStatus: '구현 내용',
        evidenceNote: 'Week09 엔진에 Skeletal Import와 Rendering을 추가하고, Bind Pose 보정, Bone Picking, Morph Target을 구현했습니다.',
        sourceLabel: 'Week10 작성 커밋 열기',
        troubleshooting: [
            {
                title: 'Blender FBX의 Skeleton이 90도 돌아가는 문제',
                symptom: '일부 Blender/FBX 6.x Skeletal Mesh에서 Bone과 스키닝 정점이 메시 기준으로 약 90도 돌아가 표시됐습니다.',
                cause: 'Importer가 Skin Cluster의 Transform, TransformLink 행렬과 값이 달라도 Scene의 BindPose 데이터를 사용했습니다. 실제 스키닝에 필요한 메시, Bone의 바인드 변환은 두 Cluster 행렬을 기준으로 해야 했습니다.',
                fix: '메시의 바인드 행렬을 구할 때 Cluster의 Transform/TransformLink를 우선했습니다. Blender Armature Root 제거를 처리하고, 기존 .skm 캐시가 재생성되도록 Skeletal Bake 버전을 올렸습니다.',
                result: '가져온 Reference Skeleton과 스키닝 행렬이 원본 메시의 바인드 자세에 맞도록 수정했습니다.',
                code: { context: 'FFbxSkeletonImporter::TryGetFirstMeshBindMatrix()의 cluster bind transform 해석' }
            },
            {
                title: 'Bone 피킹과 화면에 그린 Armature가 어긋나는 문제',
                symptom: '가느다란 부분과 관절을 선택하기 어려웠고, 미리보기 Gizmo의 회전이 선택한 Bone의 월드 방향과 달라질 수 있었습니다.',
                cause: '피킹에 실제 Armature 삼각형 대신 선분 거리, 반지름 근사를 사용했습니다. 회전 합성도 엔진의 행벡터 규약인 BoneComponent × MeshWorld와 달랐습니다.',
                fix: 'Armature에 그린 몸체, 관절 삼각형으로 광선 검사를 수행했습니다. BoneComponentTransform.ToMatrix() × MeshWorldMatrix에서 스케일을 제외한 월드 쿼터니언을 구했습니다.',
                result: '화면에 보이는 Bone과 관절을 클릭으로 선택하고, Gizmo도 선택한 Bone의 월드 변환을 따르도록 했습니다.'
            },
            {
                title: '로드된 material에 texture SRV가 누락된 상태로 남음',
                symptom: 'cache되거나 reload된 skeletal material이 존재해도 texture object 또는 SRV가 복원되지 않아 일부 texture 없이 렌더링될 수 있었습니다.',
                cause: 'material-cache hit가 asset texture assignment를 다시 읽거나 resource 재생성 뒤 cached SRV array를 재구축하지 않고 기존 material을 반환했습니다.',
                fix: 'JSON에 선언된 texture 누락을 감지해 material asset에서 다시 적용하고 cached SRV를 재구성했으며, cache 동기화가 항상 실행되도록 preview texture에도 load 경로를 사용했습니다.',
                result: 'reload 또는 device-resource 재구축 뒤에도 material이 부분 초기화된 cache entry를 유지하지 않고 texture binding을 복구합니다.'
            },
            {
                title: 'CPU Skinning이 정점마다 메시를 업로드하는 문제',
                symptom: '한 번의 Skeletal 갱신에서 정점 계산이 끝나기 전에 Immediate Context를 반복해서 얻고 GPU 버퍼를 생성, 갱신했습니다.',
                cause: '정점 버퍼 갱신과 MeshBuffer 생성 코드가 LOD 정점 반복문 안에 있었습니다.',
                fix: '스키닝 정점을 모두 계산한 뒤 Context를 한 번만 얻고, 반복문 밖에서 GPU 버퍼를 한 번 생성, 갱신하도록 옮겼습니다.',
                result: 'FSkeletalMeshObjectCPU::Update() 호출당 완성된 정점 배열을 한 번만 업로드합니다.',
                code: { context: 'FSkeletalMeshObjectCPU::Update()의 loop 이후 GPU upload' }
            },
            {
                title: 'Morph 가중치 변경이 반영되지 않고 중간 Shape가 생략되는 문제',
                symptom: 'Morph 가중치를 바꿔도 CPU 버퍼가 바로 갱신되지 않았습니다. 중간 가중치에서도 단계별 Shape 기준을 무시하고 마지막 FBX Shape만 스케일했습니다.',
                cause: 'SetMorphTarget()과 ClearMorphTargets()는 변경 표시만 남겼습니다. ApplyMorphTargets()는 FullWeight를 무시하고 항상 Shapes.back()을 선택했습니다.',
                fix: '가중치를 바꿀 때 UpdateSkinnedMeshObject()를 호출하고, FullWeight 범위에 맞는 인접 Shape의 변형량을 보간했습니다.',
                result: '가중치 변경이 CPU Skinning 결과에 반영되고, FBX에 정의된 단계별 Morph Shape를 사용하도록 했습니다.',
                code: { context: 'ApplyMorphLODByWeight()의 progressive shape 보간' }
            },
            {
                title: '복제한 skeletal component가 runtime render state를 잃음',
                symptom: '복제한 component가 serialized path와 array는 보유했지만 mesh asset, material override, pose, CPU mesh object, render state를 재구축하지 못했습니다.',
                cause: 'USkinnedMeshComponent::PostDuplicate()가 base implementation만 호출했고 derived component는 skinned object 재구축 없이 transform만 갱신했습니다.',
                fix: 'SkeletalMeshPath를 reload하고 material slot과 호환 가능한 bone transform을 복원한 뒤 mesh object를 재구축하고 bounds와 proxy state를 dirty로 표시했습니다.',
                result: 'duplicate가 복사된 serialized state에서 runtime asset과 rendering data를 재구성합니다.',
                code: { context: 'PostDuplicate()의 skeletal runtime state 재구축' }
            }
        ],
        commitRefs: [
            { label: 'Component 및 CPU skinning' },
            { label: 'FBX bind-pose 정렬' },
            { label: 'Bone Rasterization 렌더링' },
            { label: 'Bone 피킹' }
        ]
    },

    '11': {
        sourceIndex: 10,
        week: '11',
        theme: "Let's Go, Move!",
        title: 'FBX Animation 파이프라인',
        summary: 'FBX Animation Sequence를 Asset으로 가져와 에디터와 Lua에서 사용할 수 있도록 했습니다. Reference Skeleton 대응, Binary Cache 검증, Bone Palette 처리를 구현했습니다.',
        role: 'Animation Pipeline 프로그래머',
        objective: '애니메이션을 Skeletal Mesh와 별도로 가져오고 대상 Skeleton과의 호환성을 검사해, 에디터와 런타임에서 재사용하는 것이 목표였습니다.',
        contributions: [
            '메시의 Bone을 Reference Skeleton으로 분리하고, 변환 유틸리티와 바이너리 직렬화를 포함한 FBX Animation Sequence 로딩을 구현했습니다.',
            '캐시의 원본, Skeleton, 버전을 검사하고 Bone 대응 결과를 기록했습니다. 원본에 작성된 채널의 샘플링과 리소스 해제도 추가했습니다.',
            'Section별 Bone Palette와 Animation Sequence Asset을 도입했습니다. 뷰어 저장, 에디터 표시, 컴포넌트 참조, 패키징, Lua 호출을 같은 Asset에 연결했습니다.'
        ],
        implementation: [
            'Reference skeleton과 FFbxAnimSequenceImporter',
            'FBX 채널 샘플링, 캐시 식별 정보, 버전 검사, 대상 Skeleton 연결',
            'Section별 Bone Palette, Animation Asset Descriptor, 에디터 Viewer, Component 참조, 패키징, Lua API'
        ],
        flow: 'FBX Animation Stack → Skeleton에 맞는 트랙 → 바이너리 캐시 검사 → Animation Asset → 컴포넌트, GPU Bone Palette',
        results: [
            'Animation Asset을 Skeletal Mesh Import에서 분리하고 대상 Skeleton과의 호환성 검사를 추가했습니다.',
            '하나의 Asset을 Import, 캐시, 에디터 확인, 패키징과 Lua, 컴포넌트 재생에 사용하도록 연결했습니다.'
        ],
        evidenceStatus: '구현 내용',
        evidenceNote: 'Reference Skeleton 처리, Animation Import와 Cache Validation, Editor, Package, Lua 통합을 구현했습니다.',
        sourceLabel: 'Week11 작성 커밋 열기',
        troubleshooting: [
            {
                title: '중복된 Bone 이름 때문에 애니메이션이 다른 노드에 연결되는 문제',
                symptom: 'FBX에 같은 Bone 이름을 가진 노드가 여러 개 있으면 애니메이션 트랙이 다른 노드에 연결될 수 있었습니다.',
                cause: 'Importer가 이름당 노드 하나만 저장해 중복 이름이 앞의 항목을 덮어썼습니다. 이름만으로 검색해 대상 Skeleton의 부모 계층도 고려하지 못했습니다.',
                fix: '이름별 후보를 모두 저장하고 대상 Bone의 부모부터 재귀적으로 찾았습니다. 해당 부모의 하위 노드를 우선 선택하고, 중복 경로와 계층 불일치는 로그에 남겼습니다.',
                result: 'Reference Skeleton의 계층에 맞춰 트랙을 연결하고, 후보가 모호한 경우에는 로그로 확인할 수 있도록 했습니다.',
                code: { context: 'ResolveBoneNodeForSkeleton()의 hierarchy 기반 candidate 선택' }
            },
            {
                title: 'Animation cache가 다른 FBX stack을 나타낼 수 있음',
                symptom: 'source FBX 또는 선택한 animation stack이 바뀐 뒤에도 cache file을 받아들여 stale animation data를 반환할 수 있었습니다.',
                cause: '유효성 검사가 source modification time만 확인해 file size나 cache 생성에 사용한 animation stack을 식별하지 못했습니다.',
                fix: 'binary format을 version 3으로 올리고 source write time, source byte size, animation-stack name의 stable hash를 header에 기록했습니다.',
                result: 'source 또는 stack identity가 다르면 cache를 거부하고 새 import를 수행합니다.'
            },
            {
                title: '유효한 source cache도 잘못된 skeleton을 대상으로 할 수 있음',
                symptom: '같은 animation source와 stack이 다른 또는 수정된 reference skeleton에 요청되어도 cache에서 load될 수 있었습니다.',
                cause: 'source identity에는 target bone count, parent hierarchy, name, local bind transform이 포함되지 않았습니다.',
                fix: 'binary format을 version 4로 올리고 target bone count와 모든 bone name, parent index, local bind matrix를 포함한 stable hash를 추가했습니다.',
                result: 'loader는 source animation과 target reference skeleton이 모두 일치할 때만 cached track을 받습니다.'
            },
            {
                title: '반전된 FBX 변환에서 삼각형의 앞뒤가 바뀌는 문제',
                symptom: '노드, 바인드 변환의 행렬식이 음수인 메시는 뒤집혀 보이거나 뒷면 컬링으로 면이 사라질 수 있었습니다.',
                cause: 'Control Point에 Global, Geometric 변환을 적용하면서도, 좌표계 방향이 바뀌는 경우에 삼각형 인덱스를 I0, I1, I2 순서로 유지했습니다.',
                fix: '행렬의 상단 3 × 3 행렬식이 음수면 I1과 I2를 교환했습니다. 이전 캐시를 사용하지 않도록 Static, Skeletal 바이너리 버전도 올렸습니다.',
                result: 'Static, Skinned, Rigid-attached Mesh가 변환된 좌표계에 맞는 삼각형 정점 순서를 사용하도록 했습니다.',
                code: { context: 'AppendTriangleIndices() / ProcessSkeletalMesh()의 handedness 보정' }
            },
            {
                title: 'FBX local transform이 runtime과 다른 parent basis를 사용함',
                symptom: 'helper 또는 armature node가 FBX bone 사이에 있을 때 import한 animation track이 runtime reference skeleton과 다른 local basis를 사용할 수 있었습니다.',
                cause: 'EvaluateLocalTransform()은 직접 FBX parent를 기준으로 했지만 runtime 합성은 reference skeleton의 Bone.ParentIndex를 기준으로 했습니다.',
                fix: '각 bone global transform과 reference-parent global transform을 샘플링한 뒤 BoneGlobal × inverse(ParentGlobal)을 계산하고 animation cache version을 올렸습니다.',
                result: 'imported track이 runtime pose composition과 같은 parent basis를 사용하며 이전 basis cache는 거부됩니다.',
                code: { context: 'EvaluateEngineLocalBoneMatrix()의 reference-parent 기준 변환' }
            },
            {
                title: 'Scale curve가 없는 bone에 인위적인 scale animation이 생김',
                symptom: 'LclScaling curve가 작성되지 않은 bone에도 모든 sampled frame마다 scale key가 생길 수 있었습니다.',
                cause: 'importer가 authored channel과 inherited/constant evaluation을 구분하지 않고 매 frame의 evaluated scale을 기록했습니다.',
                fix: '모든 animation layer의 X/Y/Z scale key를 확인해 scale curve가 없으면 bind-scale key 하나만 만들고, 작성되었지만 constant인 curve도 key 하나로 축약했습니다.',
                result: 'curve가 없는 bone은 constant bind scale을 유지하고 실제로 작성된 scale variation만 track에 남습니다.',
                code: { context: 'LoadAnimSequence()의 authored scale-curve 판별' }
            }
        ],
        commitRefs: [
            { label: 'FBX Animation Sequence 로딩' },
            { label: 'Importer 및 binary serialization' },
            { label: 'Section별 Bone Palette' },
            { label: 'Animation Asset Descriptor 구현' }
        ]
    },

    '12': {
        sourceIndex: 11,
        week: '12',
        theme: 'Dance of the Dust',
        title: 'Particle Runtime, Editor 시스템',
        summary: '파티클의 에디터, 런타임 구조를 설계하고 Emitter API, Asset 편집, LOD 컴파일, Renderer 설정, 이벤트 전달을 구현했습니다.',
        role: 'Particle System, Tool 프로그래머',
        objective: '파티클을 Asset으로 편집하고 런타임용으로 컴파일해 전용 Pass에서 그리는 구조가 목표였습니다. Emitter 내부 상태는 API를 통해 다루도록 했습니다.',
        contributions: [
            '파티클 시스템과 Module, Emitter Instance, Event를 구현해 컴포넌트에 연결하고, Module 실행 순서를 문서로 정리했습니다.',
            'Emitter 내부 상태는 런타임 API로 접근하도록 캡슐화했습니다. 자산 저장, 깊은 복사와 소유권 처리, 캐시 관리, Actor 배치도 추가했습니다.',
            '컴파일된 LOD 데이터와 Renderer Property를 도입하고, 에디터 검사와 렌더링 동작 테스트, 런타임 이벤트 전달을 연결했습니다.'
        ],
        implementation: [
            'ParticleSystem, ParticleEmitterInstance, Module, Component, Event 구조, Dynamic Render Data',
            '에디터 Asset 작업 흐름, Emitter, LOD 제어, 유효성 검증, 복제, 직렬화, Cache 소유권',
            'Compiled LOD 바인딩, Renderer Property, Particle Render Pass, Runtime Listener, Event Dispatch 정책'
        ],
        flow: 'Particle Asset → Compiled LOD, Renderer Property 구성 → Emitter 시뮬레이션 → Render Pass, Runtime Event 처리',
        results: [
            '파티클의 실행 구조와 편집, 배치, 검사, 렌더링을 연결했습니다.',
            '에디터 데이터와 컴파일된 런타임 데이터를 분리하고, 기존 TypeData 소유권 구조를 정리했습니다.'
        ],
        evidenceStatus: '구현 내용',
        evidenceNote: 'Particle Runtime, Editor Architecture, Compile된 LOD Binding, Deep Copy와 Cache Ownership, Event Dispatch를 구현했습니다.',
        sourceLabel: 'Week12 작성 커밋 열기',
        troubleshooting: [
            {
                title: 'Particle asset의 editor/cache ownership이 모호함',
                symptom: 'document를 닫거나 undo snapshot을 복원하거나 editor를 종료할 때 temporary particle asset이 누수되거나 resource cache가 아직 소유한 instance가 파괴될 수 있었습니다.',
                cause: 'loaded asset, preview-only asset, document snapshot이 cached ownership과 temporary editor ownership을 구분하는 단일 규칙 없이 raw UParticleSystem pointer를 공유했습니다.',
                fix: 'normalized ParticleSystemMap cache를 추가해 reload 시 기존 cached asset을 반환하고 uncached document/preview instance만 파괴했으며, cached asset은 다른 resource-manager GPU resource와 함께 중앙에서 해제했습니다.',
                result: '각 particle asset이 resource-cache lifetime 또는 명시적인 temporary-editor lifetime 중 하나를 따라 duplicate object와 shared asset 오파괴를 모두 방지합니다.'
            },
            {
                title: '편집 후 Emitter가 이전 LOD 데이터를 참조하는 문제',
                symptom: '파티클 에디터에서 Module, 렌더러 타입, LOD를 바꿔도 미리보기와 배치된 컴포넌트에 반영되지 않았습니다. 기존 Emitter가 이전 컴파일 데이터를 참조할 수도 있었습니다.',
                cause: 'CacheEmitterModuleInfo가 CompiledLODData를 다시 만들었지만, 런타임 Emitter는 이전 포인터와 Payload 구조를 사용했습니다.',
                fix: 'CompiledRevision으로 변경을 구분하고 Payload 크기, Stride, 렌더 모드의 호환성을 검사했습니다. RefreshTemplateRuntime에서 호환되는 LOD를 다시 연결하거나 Emitter를 재생성하도록 했습니다.',
                result: '에디터 변경을 미리보기와 World 컴포넌트에 반영하고, 런타임 인스턴스가 유효한 컴파일 데이터를 참조하도록 했습니다.',
                code: { context: 'UParticleSystemComponent::RefreshTemplateRuntime()의 rebind/recreate 판정' }
            },
            {
                title: 'Serialized event-dispatcher reference가 asset을 runtime actor에 결합함',
                symptom: 'particle component와 asset이 숨은 dispatcher dependency를 유지해 재사용과 save/load 동작이 특정 gameplay actor에 의존할 수 있었습니다.',
                cause: 'UParticleSystemComponent가 component 경계에서 event를 노출하는 대신 AParticleEventManager pointer를 직접 저장했습니다.',
                fix: 'component delegate를 공식 event surface로 만들고 binding을 runtime-only listener인 AParticleEventManager로 옮겼으며, serialized dispatcher ownership을 제거하고 소멸 시 delegate ID를 명시적으로 unbind했습니다.',
                result: 'particle asset은 재사용 가능하게 유지되고 gameplay listener는 serialized simulation data의 back-reference 없이 runtime component별로 구독할 수 있습니다.'
            },
            {
                title: '복제한 particle asset이 소유한 child graph를 공유함',
                symptom: '복제한 emitter, LOD, module을 편집하거나 파괴할 때 같은 child pointer를 통해 원본 asset에 영향을 줄 수 있었습니다.',
                cause: '기본 duplication이 particle hierarchy가 소유한 object를 재귀적으로 복제하지 않고 raw child array를 복사했습니다.',
                fix: 'ParticleSystem → Emitter → LOD → Module 경로에 PostDuplicate()를 구현해 각 child를 복제하고 cached module list를 재구축했으며, destructor가 소유 child를 정리하도록 했습니다.',
                result: '원본과 복제 particle asset이 서로 분리된 편집 가능 object graph를 보유합니다.',
                code: { context: 'UParticleLODLevel::PostDuplicate()의 child module deep copy' }
            },
            {
                title: '저장 후 파티클 Template을 복원하지 못하는 문제',
                symptom: '컴포넌트를 다시 불러오면 경로로 UParticleSystem Template을 찾지 못하거나, Template 포인터가 있어도 런타임 Emitter는 생성되지 않을 수 있었습니다.',
                cause: '파티클 자산에 정규화된 AssetPath와 경로 해석 기능이 없었고, Template도 자산 참조로 지정되지 않았습니다. SetTemplate()은 인스턴스가 없어도 기존 포인터가 같으면 반환했습니다.',
                fix: '자산 경로를 저장하고 ResourceManager에서 파티클 참조를 복원했습니다. Template을 자산 참조로 지정하고, Emitter 인스턴스가 없으면 다시 생성했습니다.',
                result: '저장된 컴포넌트가 파티클 자산을 다시 찾고 런타임 Emitter를 생성하도록 했습니다.',
                code: { context: 'SetTemplate()의 누락된 emitter instance 재생성' }
            },
            {
                title: '이벤트 생성 전에 전달 과정이 실행되는 문제',
                symptom: 'EventGenerator가 충돌, 갱신 Module보다 먼저 배치되면, 해당 프레임의 이벤트를 생성하기 전에 큐를 비울 수 있었습니다.',
                cause: 'CacheModuleLists()가 작성한 Module 순서를 그대로 사용했습니다. 이벤트를 전달하는 EventGenerator는 생성 Module 뒤에서 실행해야 했습니다.',
                fix: 'EventGenerator Module을 따로 모아 다른 갱신 Module 뒤에 배치했습니다.',
                result: '모든 컴파일된 LOD에서 이벤트를 생성한 뒤 전달하도록 실행 순서를 맞췄습니다.',
                code: { context: 'UParticleLODLevel::CacheModuleLists()의 event module 후순위 배치' }
            }
        ],
        commitRefs: [
            { label: 'Particle 기반 시스템' },
            { label: 'Particle 에디터 Asset 작업 흐름' },
            { label: 'Compiled LOD 데이터' },
            { label: 'Runtime Event Dispatcher 구현' }
        ]
    },

    '13': {
        sourceIndex: 12,
        week: '13',
        theme: 'Understanding Focus and Force in 3D World, Two DOF Techniques',
        title: 'Physics Asset Editor',
        summary: 'Skeletal Mesh의 Collision Body를 생성하고, 뷰포트에서 선택, 수정하는 Physics Asset 편집 도구를 구현했습니다.',
        role: 'Physics Tool 프로그래머',
        objective: '생성된 Collision Body를 뷰포트와 Gizmo로 편집하고, 노드 관계, 충돌 규칙, Material Profile까지 설정할 수 있도록 만드는 것이 목표였습니다.',
        contributions: [
            'Physics Asset 편집 API와 뷰포트 기반을 만들고, 피킹, Body 생성 제어, 휴머노이드 필터링을 추가했습니다.',
            '뷰포트 Gizmo 편집과 시점 프리셋, 노드 그래프 조회, 충돌 규칙 편집을 구현했습니다.',
            'Physical Material 기반 Body Profile을 추가했습니다. 축 마스크와 Alpha, Gizmo, 충돌체 형상 편집 동작도 수정했습니다.'
        ],
        implementation: [
            'Physics body 생성과 skeletal-bone filtering',
            'Viewport 피킹, Transform Gizmo, View Preset, Shape 편집',
            'Node Graph, Collision 규칙, Physical Material 기반 Body Profile'
        ],
        flow: 'Skeletal Mesh → Physics Body 생성 → 뷰포트 선택, Gizmo 편집 → Physics Asset 저장',
        results: [
            'Physics Asset을 생성하고 편집하는 기능을 하나의 도구로 구현했습니다.',
            'Body 생성부터 Transform 편집, 충돌 동작과 Physical Material 설정까지 연결했습니다.'
        ],
        evidenceStatus: '구현 내용',
        evidenceNote: 'Physics Body 생성, Viewport Picking, Gizmo, Node, Collision, Material Profile 편집 흐름을 구현했습니다.',
        sourceLabel: 'Week13 작성 커밋 열기',
        troubleshootingEvidence: [
            {
                kicker: 'Physics Preview 실행 데이터',
                title: 'Physics Preview의 Body 크기와 Bone Scale을 로그로 확인할 수 있도록 했습니다.',
                summary: 'Physics Preview에서 생성된 Sphyl Body 6개를 반지름, 길이, Bone Scale에 맞춰 그립니다. 크기 문제를 추적할 수 있도록 해당 값을 로그에도 남겼습니다.',
                tags: ['실행 로그', 'Physics Body 구성', '사례 01'],
                facts: [
                    { label: '기록된 body', value: '6개', detail: 'Pelvis 및 좌우 leg chain' },
                    { label: 'Shape 유형', value: 'Sphyl', detail: '저장된 radius와 length' },
                    { label: 'Bone Scale', value: '1.0000', detail: 'Uniform Scale' }
                ],
                trace: { label: 'Physics Preview 출력 로그' },
                method: '저장된 Sphyl 치수와 Bone Matrix Scale을 적용해 Preview의 Body 크기를 계산합니다.'
            }
        ],
        troubleshooting: [
            {
                title: 'Body 생성 시 좌표계가 어긋나고 작은 Bone의 정점이 누락되는 문제',
                symptom: 'Physics Body의 크기가 맞지 않거나 늘어났습니다. 작은 Bone을 제외하면 그 Bone에 연결된 정점도 부모 Body에 반영되지 않았습니다.',
                cause: 'Body를 생성할 때 Skeleton 전체 좌표와 Bone별 정점군의 좌표를 혼용했습니다. 작은 후보를 부모에 합치기 전에 휴머노이드 필터로 제외하기도 했습니다.',
                fix: '후보 정점을 Bone의 로컬 공간에서 관리했습니다. 작은 정점군은 부모의 로컬 공간으로 변환해 합친 뒤 크기를 계산하고, 구조상 필요한 부모 Body는 생성하도록 했습니다.',
                result: '충돌체가 스키닝 메시의 부피에 더 가깝게 생성됩니다. Helper나 작은 Bone의 정점도 부모 Body에 포함됩니다.'
            },
            {
                title: '충돌체 형상에 맞지 않는 Gizmo 축이 표시되는 문제',
                symptom: '구의 반지름에 독립된 축 세 개를 표시하거나 캡슐의 반지름 축이 중복되는 등, 형상에 필요 없는 스케일 핸들이 나타났습니다.',
                cause: '선택한 충돌체에서 편집할 수 있는 값을 고려하지 않고 공통 Gizmo 축 마스크를 사용했습니다.',
                fix: '형상에 따라 축 마스크를 계산했습니다. 구는 축 하나, 캡슐은 반지름용 X와 길이용 Z를 사용하고, 직교 뷰에서 축이 가려지면 대체 축을 선택했습니다. 편집 표시의 Alpha도 수정했습니다.',
                result: '선택한 충돌체에서 수정할 수 있는 값만 핸들로 표시하고, 제한된 시점에서도 조작할 수 있도록 했습니다.',
                code: { context: 'FPhysicsAssetEditorViewportClient::ComputeGizmoAxisMask()의 shape별 axis 제한' }
            },
            {
                title: 'Physics gizmo 표시와 shape conversion이 불완전함',
                symptom: 'transform gizmo가 preview draw에 묻혀 사라질 수 있었고 body를 box, sphere, capsule 사이에서 바꾸는 완전한 editor operation이 없었습니다.',
                cause: 'gizmo가 일반 debug draw 경로를 사용했고 widget에는 shape-type replacement를 일관되게 처리하는 흐름이 없었습니다.',
                fix: 'additive gizmo drawing을 추가하고, physics-asset edit workflow를 유지하면서 aggregate geometry를 선택한 shape type으로 교체하는 editor control을 구현했습니다.',
                result: '활성 조작 control이 시각적으로 구분되며 같은 physics-asset editor에서 body shape conversion을 수행할 수 있습니다.'
            }
        ],
        commitRefs: [
            { label: 'Physics Asset Editor 작업 흐름' },
            { label: 'Viewport Gizmo 편집' },
            { label: 'Node graph 및 collision editing' },
            { label: 'Physical Material 기반 Body Profile' }
        ]
    },

    '14': {
        sourceIndex: 13,
        week: '14',
        theme: 'Final Game Jam, The Stage Is Set. Let the Game Begin!',
        title: '최종 게임 통합과 제작 도구',
        summary: 'Unreal에서 제작한 Scene과 Decal을 자체 엔진으로 가져왔습니다. 보스, 점수 UI와 Scene 전환, 로딩, Cutscene, Audio를 연결해 최종 게임을 완성했습니다.',
        role: 'Game Flow, Integration 프로그래머',
        objective: '그동안 개발한 엔진과 콘텐츠를 연결해 Scene 로딩과 Countdown에서 전투, 점수 집계, Cutscene, 엔딩까지 이어지는 게임을 완성하는 것이 목표였습니다.',
        contributions: [
            '보스전 UI를 연결하고 Unreal에서 제작한 Tokyo Scene을 가져왔습니다. 자체 엔진용 Decal Export/Import도 구현했습니다.',
            '카운트다운과 점수판, 기록 저장, 콤보 UI, 보스, 일반 적 HP 바, 로딩 화면과 엔딩 크레딧을 연결했습니다.',
            '2페이지, 5컷으로 구성한 전환 연출을 구현하고 비동기 Scene 로딩과 시점을 맞췄습니다. 재시작 시 연출 건너뛰기와 전환별 오디오 타이밍, 음량도 조정했습니다.'
        ],
        implementation: [
            'Unreal Scene, Decal Exporter/Importer 파이프라인',
            'Lua/RmlUi 기반 게임 흐름, 점수판, 콤보, Boss, Mob HP, 카운트다운, 로딩, 크레딧',
            '5컷 Page/Reveal 상태, 비동기 Load Barrier, Retry 상태 영속화, FMOD Audio Cue'
        ],
        flow: 'Unreal Scene, UI 자산 → 자체 Import, 런타임 연결 → 게임 진행, 점수 집계 → Cutscene, Audio, 엔딩',
        results: [
            '에디터에서 제작한 콘텐츠와 엔진 시스템을 연결해 플레이 가능한 게임으로 완성했습니다.',
            '전투, 점수, Scene 전환, 재시작, Cutscene에 필요한 UI와 피드백을 구현했습니다.'
        ],
        evidenceStatus: '구현 내용',
        evidenceNote: 'Scene, Decal Import, Countdown, Scoreboard, 비동기 Load Barrier, Retry, Cutscene, Audio 흐름을 구현했습니다.',
        sourceLabel: 'Week14 작성 커밋 열기',
        troubleshootingEvidence: [
            {
                title: 'Final Game Jam에서 메뉴부터 보스전과 엔딩 크레딧까지 완성했습니다.',
                summary: 'Cyber Runner는 자체 엔진으로 제작한 게임입니다. 모드 선택과 필름 카운트다운에서 Tokyo 레벨의 Ascendant 보스전, HP, Core, Chain, Burst 표시, 4인 팀의 엔딩 크레딧까지 이어집니다.',
                figures: [
                    {
                        stage: 'Main Menu',
                        alt: 'Start Game, Training Map, Credits, Exit 항목이 있는 Cyber Runner Main Menu',
                        caption: '최종 RmlUi 흐름에서 본 게임, Training Map, Credits, Exit 경로를 선택할 수 있습니다.'
                    },
                    {
                        stage: 'Film Countdown',
                        alt: 'Gameplay 진입 전 숫자 2를 표시하는 Cyber Runner Film Countdown',
                        caption: 'Film Leader 전환이 비동기 Scene 준비 구간을 덮은 뒤 Gameplay로 제어권을 넘깁니다.'
                    },
                    {
                        stage: 'Boss Encounter',
                        alt: '완성된 Tokyo Level에서 Ascendant Boss와 마주한 Cyber Runner Player Character',
                        caption: '전투 시작 화면에 가져온 도시 배경과 보스, 플레이어 HP, Boss Core, Chain, Burst UI를 함께 표시합니다.'
                    },
                    {
                        stage: 'Combat Feedback',
                        alt: 'Attack Telegraph, Enemy, Chain Counter, HP, Core, Burst UI가 표시되는 Cyber Runner Boss Combat',
                        caption: '전투 중 공격 예고와 피해, 적 무리, Chain, Boss Core, 플레이어 HP, Burst Charge 표시를 갱신합니다.'
                    },
                    {
                        stage: '4인 팀 Ending Credits',
                        alt: 'Team Member 04 조상현을 포함한 Cyber Runner Ending Credits',
                        caption: '엔딩에서 4인 팀의 크레딧을 표시하며, 조상현은 Team Member 04로 기재돼 있습니다.'
                    }
                ]
            },
            {
                kicker: '필름 카운트다운 UI',
                title: '게임 흐름에 맞는 다층 전환 화면으로 카운트다운을 완성했습니다.',
                summary: 'RmlUi와 Lua로 필름 영사기 형태의 카운트다운을 만들었습니다. 숫자와 회전 부채꼴, 필름 구멍, 그레인, 비네트 효과를 조합했습니다. 아래는 초기 구현부터 배치 조정을 거친 최종 화면입니다.',
                tags: ['RmlUi + Lua', '필름 카운트다운', '런타임 UI'],
                figures: [
                    {
                        stage: '초기 Countdown 구현',
                        alt: 'sepia film strip, sprocket hole, ring, crosshair, single sweep line, Picture Start label, 숫자 3이 표시된 Week14 초기 in-engine film countdown prototype',
                        caption: '첫 3→2→1 구현은 회전 Sweep Line과 초기 Film Frame 처리를 사용했습니다.'
                    },
                    {
                        stage: 'Layout 분리 진단',
                        alt: 'responsive outer circle, inner circle, crosshair guide만 표시한 Week14 film countdown UI layout 진단 화면',
                        caption: '중심점과 안쪽, 바깥쪽 원, 십자선을 따로 표시하며 화면 크기에 따른 배치를 조정했습니다.'
                    },
                    {
                        stage: '최종 Runtime 상태',
                        alt: 'sepia film gate, sprocket hole, grain, sweep arm, Picture Start label, 숫자 5가 표시된 Week14 완성 film countdown UI',
                        caption: '숫자 5부터 시작하는 최종 화면에 부채꼴 회전과 움직이는 필름 구멍, 그레인, 비네트 효과를 적용했습니다.'
                    }
                ],
                facts: [
                    { label: '카운트다운 타이밍', value: '3.35 → 5.35 sec', detail: '초기 구현에서 a3006a9까지' },
                    { label: 'Sweep 우회 구현', value: '33 frames', detail: 'fdaa6f7의 raster sector sequence' }
                ],
                trace: { label: 'RmlUi sector-animation 우회 구현' },
                method: '세 화면은 초기 Countdown, 반응형 Guide Layout, 최종 Layered Runtime 상태를 순서대로 보여 줍니다.'
            },
            {
                kicker: 'Week14 씬 배치 완료',
                title: 'Tokyo 레벨의 씬 배치를 완료했습니다.',
                summary: '건물과 교통 구조물을 하나의 Scene에 배치해 Tokyo 레벨을 구성했습니다. 아래 트러블슈팅에는 Import 과정에서 배치와 방향을 바로잡은 내용을 정리했습니다.',
                figures: [
                    {
                        stage: '씬 배치 완료',
                        alt: '건물과 교통 구조물, 거리 규모 구조가 정렬된 Week14 Tokyo 최종 씬 배치',
                        caption: '건물 볼륨, 교통 구조물, 거리 규모 구조가 최종 배치된 상태입니다.'
                    }
                ]
            },
            {
                kicker: '사례 02 첨부, Import 과정과 결과',
                title: 'Import 배치와 방향을 점검한 과정과 정상 결과입니다.',
                summary: '흩어진 Import를 하나의 Level로 조립하고 구조물 배치와 방향을 점검했습니다. 마지막 Unreal Editor 화면은 Tokyo 레벨이 정상 배치되고 선택한 Static Mesh의 Rotation 0°, Scale 1.0이 유지된 결과입니다.',
                tags: ['작업 과정', 'Scene Import', 'Transform 검증'],
                figures: [
                    {
                        stage: '과정 01, 흩어진 초기 배치',
                        alt: '배치 완료 전 scene mesh가 에디터 화면 전체에 흩어져 있는 Week14 Tokyo import 과정',
                        caption: 'Import된 건물 모듈과 표면을 하나의 레벨로 조립하는 중인 상태입니다.'
                    },
                    {
                        stage: '과정 02, 구조물 배치 점검',
                        alt: 'Tokyo 씬 조립 중 교통 구조물과 건물 표면의 배치 및 방향을 확인한 Week14 에디터 화면',
                        caption: '교통 모듈과 건물 표면을 가까이 확인하며 배치 위치와 방향을 점검한 상태입니다.'
                    },
                    {
                        stage: '과정 03, 방향 문제 진단',
                        alt: 'transform 검사 중 import된 Tokyo scene이 옆으로 기울어진 모습을 보여 주는 custom engine editor',
                        caption: '기울어진 Tokyo_Current viewport에서 import 방향 문제를 확인했습니다.'
                    },
                    {
                        stage: '과정 04, 방향 검증',
                        alt: 'Tokyo Verify Train scene에서 바로 선 Tokyo 거리를 보여 주는 custom engine editor',
                        caption: '전용 Tokyo_Verify_Train scene에서 import된 거리 구조가 바로 서는지 확인했습니다.'
                    },
                    {
                        stage: '정상 Import 결과, Unreal Editor',
                        alt: '건물과 도로, 식생이 올바른 방향으로 배치되고 Static Mesh가 선택된 Tokyo 레벨의 Unreal Editor 화면',
                        caption: 'Tokyo 레벨의 건물, 도로, 식생이 올바른 방향으로 배치되고, 선택한 Static Mesh의 Rotation 0°, Scale 1.0을 확인했습니다.'
                    }
                ]
            },
            {
                kicker: 'Decal, Foliage 렌더링 수정',
                title: 'Mask Sampling과 Pre-depth Routing을 고쳐 Decal과 나뭇잎 주변의 사각형 배경을 제거했습니다.',
                summary: 'Masked Foliage는 투명도를 반영하지 않는 Pre-depth Pass에 들어가 있었고, Grayscale Decal Texture는 항상 불투명한 합성 Alpha를 읽고 있었습니다. Masked Foliage를 해당 Pass에서 제외하고 Decal Coverage를 실제 Grayscale Channel에서 계산하도록 수정했습니다.',
                tags: ['Alpha Mask', 'Pre-depth', 'Decal Coverage'],
                figures: [
                    {
                        stage: 'Foliage 결함',
                        alt: 'green leaf 주변에 옅은 card 배경이 보이는 masked foliage 수정 전 import된 Tokyo tree',
                        caption: '서로 교차하는 leaf card의 투명 부분이 깨끗한 foliage cutout으로 처리되지 않고 그대로 보입니다.'
                    },
                    {
                        stage: 'Decal 결함',
                        alt: 'pink marking 주변에 사각형 배경이 보이는 grayscale coverage 수정 전 선택된 Tokyo ground decal',
                        caption: '분홍색 사각형 배경이 렌더링 결함이며 흰 Outline은 Editor Selection 표시입니다.'
                    }
                ],
                trace: { label: '수정 후 Coverage, Depth Routing' }
            },
            {
                kicker: 'Blocking Volume 단위 보정',
                title: '충돌 볼륨의 Scale Field와 World Matrix가 같은 Meter 단위를 사용하도록 수정했습니다.',
                summary: 'Exporter가 Centimeter 기반 Bounds와 Meter 기반 배치 데이터를 섞어 사용해 충돌 볼륨이 100배 커졌습니다. Matrix Override에도 Meter로 변환한 Scale을 전달해 크기를 바로잡았습니다.',
                tags: ['Scene Import', '단위 변환', 'World Matrix'],
                facts: [
                    { label: '단위 보정', value: 'cm → m', detail: 'World Matrix Scale을 100분의 1로 변환' }
                ],
                trace: { label: 'Exporter 수정 코드' }
            },
            {
                kicker: '비동기 Scene 전환',
                title: 'Cutscene 이후 로딩을 기다린 뒤 Tokyo_Current로 전환합니다.',
                summary: 'Cutscene이 끝나도 Scene 로딩이 완료될 때까지 기다린 뒤 전환합니다. Tokyo_Current가 준비되기 전에 플레이가 시작되는 것을 막았습니다.',
                tags: ['패키징 빌드', '비동기 로딩', '사례 01'],
                facts: [
                    { label: 'Transition 순서', value: 'Wait → Ready → Commit', detail: 'Tokyo_Current Packaged 실행' }
                ],
                trace: { label: '수정 후 transition sequence' },
                method: 'Wait → Ready → Commit 순서로 전환하며, 각 상태 변경을 패키징 빌드의 로그에 기록합니다.'
            },
            {
                kicker: 'Clear Time 저장',
                title: '플레이 완료 시간을 Clear Score와 Scoreboard에 함께 저장했습니다.',
                summary: '완료한 플레이의 85.688초 기록을 Clear Score 파일과 Scoreboard에 각각 저장했습니다. Scene이 전환된 뒤에도 같은 기록을 사용할 수 있습니다.',
                tags: ['Clear Time 저장', '점수 저장', '사례 01'],
                facts: [
                    { label: '저장된 값', value: '85.688 sec', detail: 'LastClearScore.txt = GameFlowScoreboard.tsv' }
                ],
                trace: { label: '저장된 Clear Time' },
                method: '이번 플레이의 85.688초 기록이 LastClearScore.txt와 GameFlowScoreboard.tsv에 각각 저장됐습니다.'
            },
        ],
        troubleshooting: [
            {
                title: '비동기 scene flow에서 clear score가 사라짐',
                symptom: 'scene transition이 in-memory timer state를 초기화한 뒤 clear 또는 credit 화면에서 방금 완료한 combat time을 복구하지 못할 수 있었습니다.',
                cause: 'score 표시는 combatElapsedTime과 local Lua state가 multithreaded scene transition 뒤에도 유지된다는 가정에 의존했습니다.',
                fix: 'clear time을 한 번 capture해 LastClearScore.txt에 저장하고 combat timer를 사용할 수 없으면 저장 값을 다시 읽었으며, recordClearScore의 중복 삽입을 막았습니다.',
                result: 'scene state가 재구축된 뒤에도 clear, credit UI가 완료된 run time을 일관되게 표시합니다.'
            },
            {
                title: 'Countdown/cutscene이 async scene loading보다 먼저 끝남',
                symptom: 'destination scene이 아직 loading 중인데 visual transition이 끝나 안전하게 scene을 commit할 시점이 없어질 수 있었습니다.',
                cause: 'film-countdown 완료와 asynchronous scene readiness가 서로 독립적인 timeline에서 진행되었습니다.',
                fix: '명시적인 waiting-to-commit state를 추가하고 transition widget을 LOADING SCENE 상태로 계속 표시했으며, readiness를 polling해 IsAsyncOpenSceneReady가 true일 때만 commit했습니다.',
                result: 'UI가 loading gap을 가리고 asynchronous load가 준비된 뒤에만 scene을 활성화합니다.'
            },
            {
                title: 'Retry에서 최초 진입용 countdown과 cutscene이 다시 재생됨',
                symptom: 'pause 또는 game-over에서 재시작할 때 최초 level 진입용 presentation이 반복되어 retry가 지연되었습니다.',
                cause: 'fresh start와 retry가 사용자 의도를 구분하는 state 없이 같은 transition function을 사용했습니다.',
                fix: 'isRetryTransition flag를 도입하고 countdown layer를 숨겼으며 film audio/cutscene timing을 건너뛰고 retry scene을 commit할 수 있을 때까지 loading state를 표시했습니다.',
                result: '최초 진입은 전체 presentation을 유지하고 retry는 더 짧은 복귀 경로를 사용합니다.',
                code: { context: 'triggerTransitionWithCountdown()의 retry 전용 분기' }
            },
            {
                title: 'Blocking-volume scale이 centimeter와 meter를 혼용함',
                symptom: 'Unreal BlockingVolume의 world-matrix scale이 별도로 export한 scale field보다 약 100배 크게 import될 수 있었습니다.',
                cause: 'scalar scale은 local_extent_cm을 meter로 변환했지만 world_matrix_rows()의 override scale에는 원래 centimeter extent를 전달했습니다.',
                fix: 'cube와 bounds fallback 경로 모두에서 meter로 변환한 scale vector를 matrix override에 전달했습니다.',
                result: 'export된 scalar와 world-matrix scale이 같은 meter 단위를 사용합니다.',
                code: { context: 'BlockingVolume export의 meter-scale matrix override' }
            },
            {
                title: 'Environment와 light transform이 Unreal orientation을 잃음',
                symptom: 'import된 environment actor와 light가 다른 방향을 가리켜 scene orientation과 shadow orientation이 Unreal 제작 원본과 불일치할 수 있었습니다.',
                cause: 'environment record에 worldMatrix가 없었고 fallback Euler swizzle은 전체 transform 합성을 버리면서 필요한 sign conversion도 누락했습니다.',
                fix: 'worldMatrix를 export하고 translation unit을 올바르게 scale해 decomposition했으며, matrix가 없을 때만 쓰는 Euler mapping도 수정했습니다.',
                result: 'environment actor가 작성된 world transform을 사용하고 legacy record는 수정된 fallback orientation을 사용합니다.',
                code: { context: 'ApplyEnvironmentTransform()의 world-matrix decomposition' }
            },
            {
                title: 'Alpha가 없는 흑백 Decal 텍스처의 사각형 배경이 표시되는 문제',
                symptom: '가져온 Tokyo Decal에서 도로, 지면 표시 주변의 사각형 배경이 보였습니다. 텍스처를 직접 지정하지 않은 Decal은 부모 머티리얼의 텍스처를 누락하기도 했습니다.',
                cause: 'Exporter가 부모 머티리얼과 Material Function 안의 텍스처를 놓쳤습니다. 이 경로를 수정한 뒤에도 Gray8 이미지를 RGBA로 변환하면 모든 Alpha가 255가 되어 배경까지 불투명하게 표시됐습니다.',
                fix: '부모 머티리얼과 Material Function의 텍스처를 가져오도록 수정했습니다. Decal의 불투명도는 saturate(R+G+B), 별도 흑백 마스크는 .r에서 읽고 투영 UV를 Decal의 Y/Z 평면에 맞췄습니다.',
                result: '검은 배경 픽셀은 제거하고, 원래의 지면 표시와 흑백 마스크 값을 유지합니다.',
                code: { context: '0c5ae28^ → 0c5ae28에서 생성된 decal opacity 출력' }
            },
            {
                title: '나뭇잎의 투명 영역까지 깊이에 기록되는 문제',
                symptom: '가져온 나무의 잎 주변에 사각형 배경이 보였고, 일부 방향에서는 양면 재질의 그림자가 사라질 수 있었습니다.',
                cause: '표면 셰이더는 나뭇잎의 Alpha를 처리했지만, 앞선 Pre-depth Pass는 마스크 없이 카드 전체를 깊이에 기록했습니다. 그림자 컬링에서도 양면 재질 설정이 빠져 있었습니다.',
                fix: '마스크 재질은 일반 Pre-depth Pass에서 제외하고 Alpha Test를 수행하는 표면 Pass에서 처리했습니다. 양면 재질의 그림자에는 SolidNoCull을 적용하고 방향광 그림자 제출 과정의 컬링도 수정했습니다.',
                result: '나뭇잎 카드의 투명 영역이 깊이를 가리지 않으며, 그림자에도 재질의 양면 설정이 반영됩니다.',
                code: { context: 'FDrawCommandBuilder::BuildCommandForProxy()의 opacity-mask pre-depth 제외' }
            },
            {
                title: 'RmlUi에서 원형 카운트다운을 표현하기 어려웠던 문제',
                symptom: '초기에는 사각형 요소 24개를 회전시켜 원형 카운트다운을 근사했지만, 부채꼴의 곡선을 표현하기 어려웠습니다.',
                cause: '사용 중인 RmlUi 기능으로는 사각형과 이미지의 배치, 회전은 가능했지만, 채워진 부채꼴을 직접 그리기 어려웠습니다.',
                fix: '투명 배경의 부채꼴 이미지 33장을 만들고, 진행률에 맞는 한 장만 표시했습니다. 숫자와 필름 구멍, 그레인, 섬광 효과의 타이밍은 Lua로 제어했습니다.',
                result: '화면 크기에 맞춰 부채꼴 애니메이션의 크기와 위치를 조절하고, 진행률에 따라 표시할 프레임을 정했습니다.',
                code: { context: 'updateSweepSector()의 raster sector frame 선택' }
            }
        ],
        commitRefs: [
            { label: 'Boss UI flow 및 UE scene import' },
            { label: 'Tokyo import 및 material output-pin swizzle' },
            { label: '필름 카운트다운 및 Masked Foliage Depth 수정' },
            { label: '5초 countdown timing 수정' },
            { label: '5-cut reveal flow 및 asynchronous load barrier' },
            { label: 'Decal Exporter/Importer 구현' },
            { label: 'Countdown sweep frame, decal dependency, scene-shadow 수정' },
            { label: '최종 grayscale decal coverage 수정' },
            { label: 'Tokyo 게임 흐름, Scoreboard' },
            { label: '커스텀 Cutscene Reveal 전환' }
        ]
    },
};

window.GAME_TECH_LAB_KO = {
    ...window.GAME_TECH_LAB_KO_PART_01_07,
    ...window.GAME_TECH_LAB_KO_PART_08_14
};

// 영문 원본에서 여러 관련 항목을 하나의 원인 분석으로 합친 사례만
// 별도로 번역한다. 단일 사례는 위의 주차별 번역을 그대로 사용한다.
window.GAME_TECH_LAB_TROUBLESHOOTING_KO = {
    '02': {
        0: {
            title: 'SkySphere의 렌더링 순서와 깊이, 노멀 처리 오류',
            symptom: 'SkySphere가 장면을 가리거나 깊이 쓰기를 끄면 사라졌고, 크기에 따라 그라데이션이 일그러졌습니다.',
            cause: '일반 불투명 메시와 같은 순서로 정렬했고, 깊이 쓰기 옵션이 깊이 검사까지 껐습니다. 셰이더에는 크기 변환이 적용된 안쪽 방향 노멀이 전달됐습니다.',
            fix: '깊이 검사는 유지하고 쓰기만 끈 배경용 메시로 분리했습니다. 그라데이션은 정규화된 월드 방향으로 계산하도록 바꿨습니다.',
            result: 'SkySphere가 장면 뒤에 그려지고, 크기와 카메라가 바뀌어도 그라데이션을 유지합니다.'
        }
    },
    '03': {
        1: {
            title: '피킹 좌표와 선택 하이라이트의 깊이 비교 오류',
            symptom: '커서가 얇은 메시를 선택하지 못하고, Gizmo가 Base Pass와 같은 깊이에 있을 때 하이라이트가 사라졌습니다.',
            cause: '피킹 Ray가 픽셀 모서리에서 시작했고, 하이라이트 Pass의 깊이 비교가 같은 깊이를 허용하지 않았습니다.',
            fix: 'Half-pixel Offset으로 픽셀 중심을 사용하고, 하이라이트 Pass가 같은 깊이도 허용하도록 변경했습니다.',
            result: '화면에 보이는 위치에서 메시를 선택하고 하이라이트를 표시합니다.'
        }
    },
    '04': {
        1: {
            title: 'OBJ 반복 파싱과 중복 정점, Material 탐색',
            symptom: '처음 로드할 때마다 OBJ 텍스트를 다시 파싱했고, 면의 꼭짓점을 확장하면서 정점과 Material 탐색이 중복됐습니다.',
            cause: '유효성을 검사할 Binary 포맷이 없었고, Importer가 모든 꼭짓점을 다시 만들면서 Material을 선형 탐색했습니다.',
            fix: '버전 정보가 있는 .dasset 헤더와 바이너리 읽기, 쓰기를 추가했습니다. 같은 정점은 인덱스를 공유하고, Material 검색은 한 번의 순회로 줄였습니다.',
            result: '저장된 Binary Asset은 텍스트 파싱을 건너뛰고, 메시 생성 과정의 중복 작업도 줄였습니다.'
        },
        2: {
            title: 'Scene 재로드 후 메시 상태 손실과 GPU 리소스 누수',
            symptom: 'Scene을 다시 불러오면 메시와 UV Scroll 상태가 사라질 수 있었고, 종료 후에도 SRV와 캐시된 Asset이 남았습니다.',
            cause: '직렬화된 Component가 필요한 Asset을 모두 복원하지 않았고, 캐시 항목을 지우기 전에 GPU 참조를 해제하지 않았습니다.',
            fix: '로드할 때 메시 의존성과 UV 상태를 복원하고, 종료 과정에서 SRV와 Asset Cache를 정리했습니다.',
            result: 'Scene을 다시 불러와도 Static Mesh 상태를 유지하며, 종료 시 그래픽 리소스를 해제합니다.'
        }
    },
    '05': {
        0: {
            title: '고밀도 장면 검색의 확장성과 말단 노드 데이터 유실',
            symptom: '오브젝트 5만 개 배치에서 피킹 비용이 커졌고, SceneGraph가 최대 깊이에 도달하면 일부 오브젝트가 검색 결과에서 빠질 수 있었습니다.',
            cause: '삼각형과 오브젝트를 전수 검사하는 검색 경로가 있었고, 말단 노드가 남은 오브젝트를 모두 보관하지 않았습니다.',
            fix: '공간 분할의 Broad Phase로 검색 범위를 먼저 줄이고, 말단 노드에 남은 오브젝트를 모두 저장했습니다.',
            result: 'SceneGraph의 깊이 제한에서 오브젝트를 누락하지 않으면서 고밀도 장면의 상호작용 검색 비용을 줄였습니다.'
        }
    },
    '06': {
        0: {
            title: '하늘과 Geometry 사이의 Fog 경계 및 원거리 수치 오류',
            symptom: '하늘과 Geometry 사이에 수평 경계가 생겼고, 원거리 픽셀이 불안정하게 표시되거나 검게 변했습니다.',
            cause: '하늘에는 상수 Fog 값을 사용했습니다. 동차 좌표 복원 과정에서는 유효하지 않은 W로 나누거나 무한대, NaN을 전달할 수 있었습니다.',
            fix: 'InvViewProj로 Sky Ray를 복원해 Geometry와 같은 Fog 함수를 적용했습니다. W와 Ray, 지수 계산, 최종 출력의 유효성도 검사했습니다.',
            result: '하늘과 Geometry에 Fog가 연속적으로 적용되고, 원거리 계산의 비정상 값이 화면으로 전달되지 않습니다.'
        },
        1: {
            title: 'Fog, Decal의 Alpha 혼합으로 메시가 투명해지는 문제',
            symptom: '투영된 색상은 정상이지만, 공유 Render Target의 Alpha가 바뀌어 가까운 메시가 에디터에서 투명해졌습니다.',
            cause: 'Blend State가 기존 Scene Alpha를 입력 불투명도로 덮어썼습니다.',
            fix: 'Fog, Decal의 RGB만 혼합하고 Destination Alpha는 유지하도록 변경했습니다.',
            result: '에디터 화면 합성과 메시의 불투명도를 유지하면서 Fog와 Decal을 표시합니다.'
        }
    },
    '07': {
        0: {
            title: 'Shader 변경 누락과 캐시 해제 시 GPU 리소스 누수',
            symptom: 'Include Shader의 변경이 반영되지 않거나, 캐시 항목만 지우고 GPU 리소스가 남는 문제가 있었습니다.',
            cause: '의존성 변경을 캐시에 충분히 반영하지 못했고, 항목 삭제와 리소스 해제가 연결되지 않았습니다.',
            fix: 'Include 의존성을 추적해 영향받은 Shader Variant를 다시 빌드하고, 캐시 항목 삭제 전에 소유한 GPU 리소스를 해제했습니다.',
            result: 'Hot Reload에 의존성 변경이 반영되며, 종료할 때 Shader 리소스를 정리합니다.'
        }
    },
    '08': {
        2: {
            title: 'Point Shadow PCF 우회와 Cube Face 경계 불연속',
            symptom: 'Point Light가 지정한 필터를 건너뛰었고, Cube Map 면 경계에서 그림자가 끊겼습니다.',
            cause: '조명 경로가 PCF를 건너뛰었고, 필터 기준축이 Cube 면 경계에서 바뀌어 샘플 방향도 급격히 달라졌습니다.',
            fix: 'Point Shadow를 PCF 경로에 연결했습니다. 빛에서 표면으로 향하는 방향을 기준으로 접선, 종법선을 구하고, 그 평면에서 8-tap Poisson 샘플을 배치했습니다.',
            result: 'Cube Map 면 경계에서도 그림자 필터링이 이어집니다.'
        }
    },
    '09': {
        2: {
            title: '파괴된 Component가 Overlap, Tick Queue에 남는 문제',
            symptom: '프레임 도중 파괴된 Component를 Overlap 상대나 대기 중인 Tick이 다시 참조할 수 있었습니다.',
            cause: '포인터 목록이 소유 객체보다 오래 남았고, 해제 과정에서 양방향 참조를 모두 정리하지 않았습니다.',
            fix: '해제 시 Overlap 양쪽의 참조를 정리하고, 대기 중인 Tick을 실행하기 전에 소유 객체의 수명을 검사했습니다.',
            result: '파괴된 객체를 대상으로 Overlap이나 Tick Callback이 실행되지 않습니다.'
        }
    },
    '11': {
        1: {
            title: 'Animation Cache에서 Stack과 Skeleton을 구분하지 못하는 문제',
            symptom: '포맷이 유효한 캐시라도 다른 Animation Stack이나 Skeleton의 데이터를 반환할 수 있었습니다.',
            cause: '캐시를 식별하는 정보에 Stack과 대상 Skeleton이 포함되지 않았습니다.',
            fix: '원본 Stack, Importer 버전, Skeleton 식별자를 검증 정보에 포함하고 일치하지 않는 캐시는 거부했습니다.',
            result: 'Clip과 대상 Skeleton이 모두 일치할 때만 캐시된 애니메이션을 재사용합니다.'
        },
        3: {
            title: 'FBX 좌표계 변환과 Scale Channel 처리 오류',
            symptom: '가져온 Bone이 원본 Pose에서 벗어나고, Scale Curve가 없는 Bone에도 크기 변화가 생겼습니다.',
            cause: 'Local Transform이 서로 다른 부모 좌표계를 사용했고, 누락된 Scale Key를 애니메이션 값처럼 처리했습니다.',
            fix: '부모와 자식 Transform을 같은 런타임 좌표계로 변환하고, Scale Channel이 없으면 바인드 자세의 Scale을 유지했습니다.',
            result: '원본 Transform 계층을 유지하며, 의도하지 않은 크기 변화가 생기지 않습니다.'
        }
    },
    '12': {
        0: {
            title: 'Particle Asset 편집, 복제 시 소유권이 겹치는 문제',
            symptom: 'Asset을 편집하거나 복제하면 오래된 컴파일 데이터의 포인터가 남거나, 공유한 자식 객체를 통해 다른 Asset까지 바뀔 수 있었습니다.',
            cause: 'Asset 구조와 에디터 캐시, 런타임 데이터의 소유권이 겹쳤고 Module을 얕은 복사했습니다.',
            fix: 'Asset이 깊은 복사한 자식 구조를 소유하도록 하고, 런타임 Component는 별도로 컴파일된 LOD 데이터를 사용하도록 분리했습니다.',
            result: '복제한 Asset이 독립적으로 동작하고, 편집 후 런타임 포인터를 갱신할 수 있습니다.'
        }
    },
    '14': {
        0: {
            title: '비동기 Scene 전환에서 점수 저장과 재시작 처리가 섞이는 문제',
            symptom: '완료 점수가 사라지거나, 다음 Scene이 준비되기 전에 Cutscene이 끝났습니다. 재시작할 때 첫 진입 연출이 반복되는 문제도 있었습니다.',
            cause: 'Scene 전환과 점수 저장, 로딩 대기, 첫 진입, 재시작을 한 흐름에서 처리했습니다.',
            fix: '전환 전에 점수를 저장하고 Wait → Ready → Commit 상태를 도입했습니다. 첫 진입과 재시작은 별도로 분기했습니다.',
            result: 'Scene 전환 후에도 점수를 유지하며, 로딩이 완료된 뒤에만 전환합니다. 재시작할 때는 처음의 도입 연출을 건너뜁니다.'
        },
        1: {
            title: 'Unreal Scene을 가져올 때 크기 단위와 방향을 혼용한 문제',
            symptom: 'Blocking Volume의 행렬 Scale이 100배로 내보내졌고, 환경, 조명 Actor가 잘못된 방향으로 배치됐습니다.',
            cause: 'Scale 값은 미터인데 World Matrix는 센티미터 단위를 유지했습니다. Actor를 가져올 때 Unreal 좌표계 변환도 일부 빠져 있었습니다.',
            fix: '내보내는 행렬을 미터 단위로 통일하고, 환경, 조명 Transform에 좌표계와 회전 변환을 적용했습니다.',
            result: 'Blocking Volume 11개의 행렬과 Scale 값이 일치하고, 환경 Actor가 의도한 방향으로 배치됩니다.'
        }
    }
};
