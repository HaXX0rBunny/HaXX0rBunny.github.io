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
        objective: '게임 오브젝트, 스테이지 진행, 입력, 충돌, 피드백, 점수 영속화를 하나의 안정적인 루프로 구성해 플레이 가능한 게임을 완성하는 것이 목표였습니다.',
        contributions: [
            '블록을 UGameObject 중심으로 리팩터링하고 사각형 렌더링을 추가했으며, 스테이지·블록 로직과 충돌 처리를 개선했습니다.',
            'Windows Runtime 게임패드 지원을 추가하고 게임패드·입력 처리를 캡슐화했습니다.',
            '파티클, 최고 점수 흐름, 플래시·조명 피드백, 공 렌더링 갱신을 구현하고 double-free 및 메모리 문제를 수정했습니다.'
        ],
        implementation: [
            'UGameObject/UBlock 구조, 스테이지 데이터, 블록 피해, 충돌 응답',
            'Windows.Gaming.Input 게임패드 관리자와 입력 수명 주기',
            '파티클 이펙트, 점수·최고 점수 갱신, 플래시 타이머, 공·사각형 렌더링'
        ],
        flow: '게임패드 / 키보드 입력 → 스테이지와 오브젝트 갱신 → 충돌 / 피해 → 이펙트, 점수, 프레임 렌더링',
        results: [
            '첫 번째 플레이 가능 게임잼 마일스톤을 완성했습니다.',
            '이후 3D 엔진 작업을 위한 실용적인 기반을 마련했습니다.'
        ],
        evidenceStatus: '작성자 커밋 확인됨',
        evidenceNote: '로컬 이력에서 2026년 3월 9~12일 HaXX0rBunny 명의 커밋 55건을 확인했으며, 이 중 45건은 non-merge 커밋입니다. 원본 저장소는 공개적으로 접근할 수 없습니다.',
        troubleshooting: [
            {
                title: '씬 해제 중 double free 발생',
                symptom: '게임 씬을 해제하거나 재시작할 때 블록 오브젝트가 두 번 해제되어 heap 오류로 종료될 수 있었습니다.',
                cause: '같은 블록 포인터를 UGameObjectList와 별도의 stageblocks 컬렉션이 모두 소유하는 것으로 취급했습니다. UGameObjectList가 이미 블록을 소멸시킨 뒤 UGameScene::Release()가 stageblocks를 순회하며 다시 delete했습니다.',
                fix: 'UGameObjectList를 단일 소유자로 유지했습니다. 씬 해제 시 stageblocks는 비소유 조회 컬렉션으로서 clear만 수행하고 내부 포인터를 delete하지 않도록 변경했습니다.',
                result: '씬 종료가 하나의 명시적인 소유권 경로를 따르며 중복 delete 연산을 피하게 됐습니다.',
                code: { context: 'UGameScene::Release()' }
            },
            {
                title: '마지막 목숨을 잃기 전에 최고 점수가 저장됨',
                symptom: '목숨이 두 개 남은 상태에서 하나를 잃으면 아직 한 번의 기회가 남았는데도 최고 점수 파일이 갱신될 수 있었습니다.',
                cause: 'SubHealth()가 체력을 감소시킨 뒤 감소량과 감소 후 체력 값을 비교했습니다. 목숨이 두 개에서 하나로 바뀌는 순간에도 조건이 충족되어 영속화가 너무 일찍 실행됐습니다.',
                fix: '일반 체력 감소 함수에서 점수 영속화를 제거하고, 최종 game-over 분기에서만 HightScoreUpdate()를 호출했습니다.',
                result: '일반적인 목숨 손실은 체력만 변경하고, 실제 game over에 도달했을 때 점수 파일을 갱신합니다.',
                code: { context: 'UGameScene::Update() game-over 분기' }
            },
            {
                title: '발사체 열 조회가 스테이지 범위를 벗어남',
                symptom: '발사체가 스테이지의 가로 범위를 벗어나면 위쪽 또는 아래쪽 순회 중 잘못된 stageblocks 인덱스가 계산될 수 있었습니다.',
                cause: 'CurCol을 월드 X 좌표로 계산한 뒤 유효성을 먼저 확인하지 않고 CurRow × CurrentStageCol + CurCol 식에 사용했습니다.',
                fix: '그리드 공간 offset을 수정하고, 계산된 열이 0보다 작거나 CurrentStageCol 이상이면 블록 배열을 인덱싱하기 전에 제외했습니다.',
                result: '스테이지 밖 발사체는 블록 컬렉션 범위를 넘어 읽지 않고 순회를 건너뜁니다.',
                code: { context: '위쪽/아래쪽 발사체 블록 순회' }
            }
        ],
        commitRefs: [
            { label: '스테이지·블록·충돌 로직' },
            { label: 'Windows Runtime 게임패드 지원' },
            { label: '파티클 시스템' },
            { label: '최고 점수 시스템' }
        ]
    },
    '02': {
        title: '3D 엔진 기반 구축',
        summary: 'D3D11 프레임 파이프라인, CPU 측 MVP 변환, 에디터 UI, 향상된 입력·카메라 제어, SkySphere 렌더링 경로를 구축했습니다.',
        role: '렌더링 및 입력 시스템 프로그래머',
        objective: 'Week01의 게임 루프에서 나아가 명시적인 그래픽 리소스, 카메라 수학, 입력 액션, 가시적인 3D 환경을 갖춘 재사용 가능한 3D 렌더러와 에디터를 만드는 것이 목표였습니다.',
        contributions: [
            'D3D11 device, flip-discard swap chain, render-target/depth view, 프레임 clear/present 경로, shader, pipeline constant를 초기화했습니다.',
            'CPU 측 MVP 수학, inverse/aspect 처리, ImGui console/property/stat 패널, 크기 변경에 안전한 perspective 동작을 구현했습니다.',
            'Enhanced Input action/modifier/trigger와 분리된 editor camera pawn/controller를 구축하고, SkySphere 렌더링과 depth state를 구현했습니다.'
        ],
        implementation: [
            'D3D11 디바이스와 스왑 체인, RTV/DSV, 셰이더 바인딩, 프레임 시작·종료, MVP 파이프라인',
            'ImGui editor layout, viewport/client-size 보정, inverse matrix, perspective divide, aspect-ratio 유지',
            'Enhanced Input의 Action·Modifier·Trigger, 에디터 카메라 컨트롤러, SkySphere 셰이더·깊이 상태'
        ],
        flow: 'Input action → editor camera → world/view/projection constant → D3D11 draw → SkySphere와 editor viewport',
        results: [
            '엔진의 초기 3D 렌더링 경로를 구축했습니다.',
            'SkySphere 구현을 공개적으로 접근 가능한 branch에 보존했습니다.'
        ],
        evidenceStatus: '작성자 커밋 확인됨',
        evidenceNote: 'Week02 저장소 이력에서 HaXX0rBunny 명의 renderer, input, editor-camera, SkySphere 커밋을 확인했습니다.',
        sourceLabel: 'Week02 작성 커밋 열기',
        troubleshooting: [
            {
                title: '에디터 창 크기 변경 후 projection 왜곡',
                symptom: '창 크기를 변경한 뒤 projection이 이전 client 크기를 계속 사용해 3D view가 늘어나 보였습니다.',
                cause: 'resize 경로가 renderer resource는 다시 만들었지만 새로운 width-to-height ratio를 camera에 일관되게 전달하지 않았습니다. 최소화되거나 높이가 0인 client area에서는 잘못된 나눗셈이 발생할 위험도 있었습니다.',
                fix: 'window resize callback을 renderer resizing에 연결하고, height가 양수일 때만 width / height로 aspect를 다시 계산해 새 client size를 camera projection state에 반영했습니다.',
                result: '최소화된 창을 방어하는 경우를 포함해 resize event 전반에서 perspective 비율이 안정적으로 유지됩니다.',
                code: { context: 'CEditorUI::SetupWindow() resize callback' }
            },
            {
                title: 'SkySphere가 일반 opaque geometry와 함께 정렬됨',
                symptom: 'SkySphere가 전경 draw와 경쟁하는 opaque 순서로 제출되어 전용 background pass처럼 동작하지 않을 수 있었습니다.',
                cause: 'sphere는 far depth에 배치되고 전경 geometry 뒤에 제출되어야 하는데도 sky draw가 일반 opaque sort 경로를 공유했습니다.',
                fix: 'z = w × 0.9999로 sky clip-space depth를 far plane 가까이에 고정하고 depth-write-disabled로 표시한 뒤, 해당 상태가 일반 opaque draw 뒤에 정렬되도록 했습니다.',
                result: 'sky draw가 background 작업으로 정렬되고 vertex가 clip space의 먼 쪽 끝에 유지됩니다.'
            },
            {
                title: 'sky depth write를 끄자 depth test도 함께 꺼짐',
                symptom: 'opaque geometry 뒤에 정렬해도 sky가 기존 depth buffer를 검사하지 않아 전경 pixel 위를 덮을 수 있었습니다.',
                cause: 'bDisableDepthTest와 bDisableDepthWrite가 모두 OverlayDepthState를 선택했고, 이 상태는 DepthEnable = FALSE 및 ALWAYS comparison을 사용했습니다.',
                fix: '실제 overlay용 OverlayDepthState는 유지하면서, test 활성화·write 비활성화·LESS comparison을 사용하는 별도의 SkyDepthState를 추가했습니다.',
                result: 'sky가 depth를 변경하거나 전경 geometry를 덮지 않으면서 아직 그려지지 않은 background pixel을 채울 수 있습니다.',
                code: { context: 'CRenderer::ExecuteCommands()' }
            },
            {
                title: 'sky gradient가 scale된 안쪽 방향 normal을 사용함',
                symptom: 'sky와 ground 색상이 뒤바뀌어 보일 수 있었고 gradient interpolation factor가 의도한 범위를 벗어날 수 있었습니다.',
                cause: 'pixel shader가 Input.Normal.z를 그대로 사용했지만, 보간된 normal은 sphere scale의 영향을 받고 안쪽을 향했습니다.',
                fix: '보간된 normal을 normalize하고 Z component의 부호를 반전한 뒤 sky 또는 ground gradient branch를 선택했습니다.',
                result: 'gradient가 unit-length factor를 사용하며, 안쪽을 향하는 상반구를 의도한 sky color에 매핑합니다.',
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
        title: '에디터 및 Scene 인프라',
        summary: 'FName, Outliner, show flag, visibility, UUID picking, scene serialization, world/level ownership, camera separation을 중심으로 엔진 기반 구조를 구축했습니다.',
        role: '엔진 및 에디터 프로그래머',
        objective: '안정적인 naming, object visibility, selection, serialization, scene ownership, editor camera architecture를 마련해 주차별 렌더링 유틸리티를 지원하는 것이 목표였습니다.',
        contributions: [
            'FName/FNameTable과 Outliner를 구현하고 show flag, actor visibility, billboard visibility, selection/highlight 안전장치를 추가했습니다.',
            'half-pixel NDC 보정과 scene reload 이후 billboard 동작을 포함한 UUID 관리 및 picking 수정을 적용했습니다.',
            '직접적인 JSON actor serialization을 FArchive로 교체하고 scene을 World/PersistentLevel/StreamingLevel로 감쌌으며, camera 관리를 scene dependency에서 분리했습니다.'
        ],
        implementation: [
            'FName pool/table과 범용 UUID 관리',
            'Outliner, show flag, Actor·Billboard 가시성, 하이라이트, 피킹',
            'FArchive 객체 직렬화, World·Level 소유권, Renderer 컬렉션, 카메라 분리'
        ],
        flow: 'World / level object → FName + UUID identity → Outliner visibility / picking → serialized scene과 renderer collection',
        results: [
            '일회성 visual test가 아닌 재사용 가능한 renderer utility를 구축했습니다.',
            '이후 scene과 rendering system을 검사할 수 있는 역량을 개선했습니다.'
        ],
        evidenceStatus: '작성자 커밋 확인됨',
        evidenceNote: '공개 저장소에 Week03 작성자 이력이 보존되어 있습니다. 이후 Week03 작업을 해석할 때 Week02 조상 커밋은 제외했습니다.',
        sourceLabel: 'Week03 작성 커밋 열기',
        troubleshooting: [
            {
                title: 'scene reload 후 billboard component가 사라짐',
                symptom: '저장 전에는 동작하던 actor billboard가 scene load 후 owner를 찾지 못해 editor visualization과 selection이 일관되지 않았습니다.',
                cause: 'TObjectPtr가 actor의 load 이전 UUID를 cache했습니다. loader가 다른 serialized UUID를 복원하면서 component owner reference가 더 이상 존재하지 않는 identity를 가리키게 됐습니다.',
                fix: 'component UUID를 저장·복원하고 UUID 복원 후 component owner를 다시 할당했습니다. pending kill 중 오래된 UUID-map entry를 제거하고 마지막 발급 UUID가 단조 증가하도록 했습니다.',
                result: 'save/load 전반에서 actor/component identity가 일관되게 유지되고 editor billboard가 올바른 owner와 함께 다시 나타납니다.',
                code: { context: 'UScene::LoadSceneFromFile()' },
                commit: { label: '근거 연결' }
            },
            {
                title: 'console-variable 열거 중 heap corruption',
                symptom: '임시 aggregate array를 통해 등록된 이름을 열거할 때 잘못된 allocator header에 도달해 heap이 손상될 수 있었습니다.',
                cause: '동작 중인 실패 경로가 allocator에 민감한 코드 사이에서 값을 중간 TArray로 복사했고, 해제됐거나 잘못된 header를 충분히 일찍 거르지 못했습니다.',
                fix: '먼저 1d8996d에서 실패하는 GetAllNames 호출을 비활성화한 뒤, 631198a에서 aggregate-return 열거를 callback으로 교체하고 allocator-header guard를 추가했습니다.',
                result: '두 커밋에 걸친 수정으로 위험한 임시 ownership transfer를 제거하고 deallocation bookkeeping 전에 잘못된 header를 거릅니다.',
                commit: { label: '수정 순서' }
            },
            {
                title: 'editor billboard가 actor picking을 가로챔',
                symptom: 'actor를 클릭하면 helper가 나타내는 actor 대신 UUID billboard helper가 선택될 수 있었습니다.',
                cause: 'picking pass가 UUUIDBillboardComponent를 일반적인 선택 가능 scene geometry로 취급했습니다.',
                fix: 'editor visualization은 유지하면서 UUID billboard component를 picking candidate 경로에서 제외했습니다.',
                result: 'visual helper는 보이지만 selection은 의도한 scene actor로 결정됩니다.'
            },
            {
                title: 'preview viewport가 조건 없이 선택됨',
                symptom: '일반 scene world가 null일 수도 있는 preview viewport client를 전달받을 수 있었습니다.',
                cause: '잘못 들어간 semicolon이 preview-world if 문을 종료해 뒤따르는 block이 조건과 관계없이 실행됐습니다.',
                fix: 'semicolon을 제거하고 world type 및 client validity guard 안에서만 값을 할당했습니다.',
                result: 'preview scene이고 사용 가능한 preview viewport client가 있을 때만 preview routing이 수행됩니다.',
                code: { context: 'SyncViewportClient()' }
            },
            {
                title: 'picking ray가 pixel center를 빗나감',
                symptom: 'picking ray에 일정한 half-pixel displacement가 생겨 세밀한 선택이 사용자가 클릭한 pixel과 어긋났습니다.',
                cause: 'integer screen coordinate를 대응하는 pixel의 center가 아니라 pixel boundary로 정규화했습니다.',
                fix: 'screen coordinate를 normalized device coordinate로 변환하기 전에 두 축 모두에 0.5-pixel offset을 추가했습니다.',
                result: '각 integer screen position에서 선택한 pixel의 중앙을 지나는 ray를 생성합니다.',
                code: { context: 'CPicker::ScreenToRay()' }
            },
            {
                title: '같은 depth의 gizmo highlight가 거부됨',
                symptom: 'hover 또는 highlight pass가 원본 gizmo와 정확히 같은 depth에 그려질 때 사라질 수 있었습니다.',
                cause: 'depth-state 생성이 material이 요청한 comparison을 무시하고 LESS를 hardcode했습니다.',
                fix: 'render-state option과 JSON parsing에 설정 가능한 DepthFunc를 추가하고 gizmo material이 LessEqual을 사용하도록 구성했습니다.',
                result: 'depth test를 끄지 않아도 원본 gizmo depth와 같은 highlight fragment가 통과할 수 있습니다.',
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
        title: 'OBJ Asset Pipeline 및 Binary Cooking',
        summary: 'OBJ/MTL parsing에서 UStaticMesh asset, registry 기반 lookup, editor 사용, versioned .dasset binary reload까지 이어지는 엔진 경로를 구축했습니다.',
        role: 'Asset Pipeline 및 Engine 프로그래머',
        objective: '외부 OBJ 파일을 재사용 가능한 engine asset으로 전환하고, 변경되지 않은 text geometry를 매번 다시 parsing하지 않도록 하는 것이 목표였습니다.',
        contributions: [
            'OBJ/MTL parsing을 FObjImporter로 분리하고 imported geometry를 FObjInfo, FStaticMeshRenderData, UStaticMesh로 표현했습니다.',
            'TObjectIterator, FObjManager, FAssetManager/FAssetRegistry 연동, material section, texture-path resolution을 구현했습니다.',
            'source timestamp 및 FNV-1a hash validation을 포함한 versioned .dasset cook/load를 구현하고 component, material, texture, UV-state serialization을 연결했습니다.',
            'ObjViewerPanel과 multi-viewport SWindow 기반은 팀원이 작성한 영역이며 개인 구현으로 제시하지 않습니다.'
        ],
        implementation: [
            'OBJ/MTL 토큰 파싱, Material Section 분리, 인덱스 정점 구성, Static Mesh 경계 계산',
            'UStaticMesh 객체 소유권, TObjectIterator 순회, Asset Registry 조회, 런타임 Mesh·Texture 캐시',
            'FAssetCooker 바이너리 헤더·버전 관리·원본 검증, .dasset 저장·로드, 오래된 캐시 재생성',
            'static-mesh picking과 mesh, material, texture, slot별 UV-scroll state의 scene serialization'
        ],
        flow: 'OBJ + MTL → FObjInfo → indexed mesh build → UStaticMesh / asset registry → .dasset cook → 검증된 binary reload',
        results: [
            '외부 geometry를 일회성 text input에서 engine이 관리하는 static-mesh asset workflow로 전환했습니다.',
            '유효한 cooked data를 재사용하고 source content 또는 format version이 변경되면 recook하는 결정론적 binary reload 경로를 추가했습니다.',
            'commit hash를 다시 쓰지 않고 원본 Week04 commit graph와 upstream branch 16개를 모두 보존했습니다. 검증되지 않은 속도 향상 수치는 주장하지 않습니다.'
        ],
        evidenceStatus: '원본 Week04 작성자 커밋 확인됨',
        evidenceNote: 'Week03 snapshot c7e30e4e와 Week04 main 1d193e53 사이의 보존된 graph에서 HaXX0rBunny 명의 커밋 60건을 확인했으며, 이 중 44건은 non-merge 커밋입니다. 이 구간에는 작성자 세 명이 참여했습니다. 아래 개인 범위는 모든 팀 기능을 한 사람의 작업으로 배정하지 않고 author, diff, blame 근거를 따릅니다.',
        sourceLabel: '보존된 Week04 source와 history 열기',
        troubleshooting: [
            {
                title: '한글 등 non-ASCII asset path를 안정적으로 열지 못함',
                symptom: 'project 또는 asset path에 한글이 포함되면 OBJ, MTL, texture, cooked-asset path를 열지 못할 수 있었습니다.',
                cause: 'file access에서 UTF-8 string, std::filesystem narrow conversion, .string() 재구성을 혼용해 Windows path encoding을 일관되게 처리하지 못했습니다.',
                fix: 'importer, cooker, property, primitive의 file-access 호출부를 기존 FPaths::ToWide UTF-8/UTF-16 helper로 이전하고, relative OBJ/MTL path를 narrow filesystem string으로 다시 변환하지 않고 구성했습니다.',
                result: 'importer, cooker, property comparison, primitive loading이 normalized engine path를 유지하면서 Windows-native wide path를 file API에 전달합니다.',
                code: { context: 'FObjImporter::ParseObj()' }
            },
            {
                title: 'cold load에 검증된 OBJ parsing 대체 binary 경로가 없음',
                symptom: 'runtime cache에 없는 mesh는 raw OBJ import를 거쳐야 했고, cooked representation이나 신뢰할 수 있는 stale-data check가 없었습니다.',
                cause: 'raw vertex/index/section data와 source identity를 versioned binary asset format에 함께 저장하지 않았습니다.',
                fix: 'FAssetCooker와 magic, format version, source timestamp, FNV-1a source hash를 담는 .dasset header를 추가했습니다. 변경되지 않은 source는 binary load를 사용하고 invalid data는 recook합니다.',
                result: 'loader가 잘못됐거나 오래된 binary data를 거부하고, 검증된 cooked asset이 최신이면 OBJ parsing을 건너뜁니다. timing benchmark는 보존되지 않았습니다.',
                code: { context: 'FAssetCooker::SaveCookedStaticMesh()' }
            },
            {
                title: 'OBJ cooking이 face-corner vertex와 material search를 중복 수행함',
                symptom: 'position, normal, UV가 같아도 parsing된 face corner마다 새 render vertex가 생성됐고, material lookup에 중복 nested loop가 있었습니다.',
                cause: 'cooker가 indexed-vertex key 없이 vertex를 선형으로 추가하고 section마다 같은 material collection을 두 번 검색했습니다.',
                fix: 'position, normal, UV에 대한 hash/equality key를 도입해 기존 index를 재사용하고, material resolution을 early exit가 있는 단일 loop로 줄였습니다.',
                result: '동등한 face corner가 index를 공유하고 각 section은 material을 한 번만 검색합니다. 이 커밋은 구조적 감소를 검증하지만 측정된 frame-time 향상을 의미하지 않습니다.',
                code: { context: 'FObjImporter::Cook()' }
            },
            {
                title: 'import된 UStaticMesh actor를 선택할 수 없음',
                symptom: 'triangle picking은 legacy primitive 기반 component에서는 동작했지만 새 mesh-component 경로에 저장된 static mesh를 건너뛰었습니다.',
                cause: 'picker가 UPrimitiveComponent::GetPrimitive()에서 legacy CPrimitiveBase instance를 얻은 경우에만 계속 진행했습니다.',
                fix: 'legacy 경로를 유지하면서 component에서 직접 FMeshData를 가져오는 UMeshComponent fallback을 추가해 triangle intersection 전에 사용했습니다.',
                result: 'legacy primitive와 imported UStaticMesh component가 같은 triangle-picking pass에 참여합니다.',
                code: { context: 'FPicker::PickActor()' }
            },
            {
                title: 'reload된 scene에서 mesh-component dependency와 UV state가 사라짐',
                symptom: 'scene reload 시 actor가 component flag, material/texture dependency, slot별 UV-scroll 설정 없이 재구성될 수 있었습니다.',
                cause: '초기 FArchive에 필요한 string-array 및 float/state 지원이 없었고, component class가 dependent asset property를 끝까지 serialize하지 않았습니다.',
                fix: 'FArchive와 component Serialize 함수를 확장하고 mesh/material 생성 후 texture를 복원했으며, 각 slot의 UVEnabled와 UVSpeed 값을 저장했습니다.',
                result: '저장된 scene이 static-mesh asset 관계를 재구성하고 dependency 순서에 따라 material, texture, UV-scroll state를 다시 적용합니다.',
                code: { context: 'UStaticMeshComponent::Serialize()' },
                commit: { label: 'serialization 순서' }
            },
            {
                title: 'texture SRV와 asset cache가 shutdown 후에도 GPU ownership을 유지함',
                symptom: 'static-mesh texture 할당이 추가 COM reference를 만들었고, cache된 SRV와 mesh에는 명시적인 renderer-shutdown cleanup 경로가 없었습니다.',
                cause: 'asset manager handoff와 component가 모두 texture ownership을 증가시켰으며, renderer teardown이 D3D11 device를 해제하기 전에 engine cache를 비우지 않았습니다.',
                fix: '중복 component AddRef를 제거하고 cache된 SRV를 release하며 mesh/texture map을 비우는 FAssetManager::ClearCache를 추가했습니다. context와 device를 해제하기 전에 primitive/asset cache cleanup을 호출했습니다.',
                result: 'COM reference ownership과 cache teardown이 명시적으로 관리됩니다. 코드로 확인된 변경이며 측정된 GPU-memory 감소는 주장하지 않습니다.',
                code: { context: 'FAssetManager::ClearCache()' }
            }
        ],
        commitRefs: [
            { label: 'OBJ/MTL Importer와 FObjInfo·TObjectIterator 구현' },
            { label: 'FObjManager와 UStaticMesh 기반' },
            { label: 'versioned .dasset cooking과 loading' },
            { label: 'Unicode asset-path 처리' },
            { label: 'indexed-vertex 및 material-loop 수정' },
            { label: 'static-mesh picking 통합' },
            { label: 'Mesh·Material·Texture·UV 직렬화' },
            { label: 'GPU 및 asset-cache 정리' }
        ]
    },
    '05': {
        theme: "2차 게임잼 · It's Pie Time",
        title: 'Octahedral Impostor 최적화',
        summary: '오브젝트 5만 개를 배치한 최적화 경합에서, 반복되는 메시 렌더링 비용을 줄이기 위해 Octahedral Impostor를 제안하고 팀 엔진에 통합했습니다.',
        role: '렌더링 최적화 프로그래머',
        objective: '고밀도 장면에서 동일한 메시를 반복 제출하는 대신, 카메라 방향에 맞는 이미지 프록시를 재구성해 CPU·GPU 렌더링 비용을 줄이는 것이 목표였습니다.',
        contributions: [
            '오브젝트 5만 개 비교용 장면의 최적화 전략으로 Octahedral Impostor를 제안했습니다.',
            '임포스터를 적용하기 전에 렌더 상태 캐시·정렬, 프록시 충돌 피킹, sub-mesh BVH, StructuredBuffer 기반 인스턴싱 경로를 구현했습니다.',
            'dirty flag 기반의 계층형 FSceneComponent transform과 AABB 갱신을 정리한 뒤, 방향별 atlas baking, billboard 재구성, parallax, 실행 시 프록시 렌더링을 연결했습니다.'
        ],
        implementation: [
            '렌더 상태 캐시·정렬, Proxy 충돌, Sub-mesh BVH, 데이터 지향 Structured Buffer 조회',
            '계층형 Transform, Dirty Flag, AABB 갱신, Column-major GPU 데이터, DirectXMath SIMD Helper',
            '방향별 Atlas Baking, Octahedral 방향 매핑, Parallax, Billboard 복원, Proxy Shading'
        ],
        flow: '고밀도 메시 장면 → transform·culling 최적화 → Octahedral Atlas bake → 카메라 방향별 프록시 렌더링',
        results: [
            '고밀도 오브젝트 장면에 적용할 수 있는 렌더러 수준의 최적화 경로를 구축했습니다.',
            '동일한 배치를 다시 재현할 수 있도록 오브젝트 5만 개와 6만 4천 개 장면을 보존했습니다. 다만 당시의 적용 전·후 반복 벤치마크 원본은 남아 있지 않습니다.'
        ],
        evidenceStatus: '작성자 커밋 확인됨',
        evidenceNote: '로컬 W5_Team4 이력에서 2026년 4월 4~7일 HaXX0rBunny 명의 커밋 46건을 확인했으며, 이 중 36건은 병합 커밋이 아닙니다. 원본 저장소는 비공개이며, 공개 게임잼 저장소에는 이후 통합된 엔진 상태가 보존되어 있습니다.',
        sourceLabel: '통합된 게임잼 저장소 열기',
        troubleshootingEvidence: [
            {
                kicker: '방향별 atlas bake 검증',
                title: 'vertex 기반 bounds와 camera basis를 보정한 뒤 256개 방향 칸에 사과 전체가 기록되었습니다.',
                summary: '실패 상태인 ec931251에서는 256개 칸 중 149개의 유효 화면 비율이 5% 미만이었습니다. 이후 camera 위치(ee8d71a), bake 상태(5dd2281), 직교 투영 범위(d1b7e7a), vertex 기반 bounds와 극지점에서도 안정적인 camera basis(b3f0a6c), row-major matrix upload(2960b5b)을 순서대로 정리했습니다. 아래 두 이미지는 이 누적 수정 과정의 실패 시점과 최종 후속 출력을 비교합니다.',
                figures: [
                    {
                        stage: '수정 전 출력 · ec931251',
                        alt: '방향별 칸 대부분에 사과의 가느다란 일부만 담긴 Octahedral Impostor atlas',
                        caption: '256개 칸 중 149개에서 검은색이 아닌 픽셀의 비율이 5% 미만이며, 칸별 중앙값은 3.85%입니다.'
                    },
                    {
                        stage: '최종 후속 출력 · 2960b5b',
                        alt: '16 × 16 방향 격자 전반에 사과 전체 실루엣이 담긴 Octahedral Impostor atlas',
                        caption: '256개 칸 모두에서 검은색이 아닌 픽셀의 비율이 50% 이상이며, 칸별 중앙값은 66.46%입니다.'
                    }
                ],
                facts: [
                    { label: '유효 화면 비율 5% 미만', value: '149 / 256 → 0 / 256', detail: '수정 전 출력 → 최종 후속 출력' }
                ],
                method: '화면의 두 PNG는 각각 ec931251의 Git blob 6c8769c0과 2960b5b의 Git blob a6c40959와 파일 내용이 완전히 일치합니다. 2048 × 2048 RGB 이미지를 128 × 128 크기의 256개 칸으로 나눈 뒤, RGB가 (0, 0, 0)이 아닌 픽셀을 세어 각 칸의 유효 화면 비율을 계산했습니다. 또한 b3f0a6c의 baker diff와 b3f0a6c가 2960b5b의 조상 커밋임을 별도로 확인했습니다.',
                limitations: [
                    '두 이미지는 인접한 커밋의 통제된 A/B 결과가 아니라 여러 수정이 누적된 과정의 양 끝입니다. 아틀라스에 담긴 실루엣 범위는 확인할 수 있지만, 실행 시 프록시 화질이나 성능을 이 두 장만으로 입증할 수는 없습니다.'
                ]
            },
            {
                kicker: '로컬 실행 기록',
                title: '같은 PC에서 보존한 오브젝트 5만 개 HUD 화면에는 Draw Call 10,725 → 2회, Frame Time 6.62 → 3.21ms가 기록되어 있습니다.',
                summary: 'Full Mesh와 Impostor 이미지는 동일한 PC에서 촬영한 실제 실행 화면입니다. 다만 반복 프레임 로그는 Impostor 경로에만 남아 있으므로, HUD 두 장은 통제된 속도 향상률이 아니라 보존된 두 렌더링 방식의 관측값으로 제시합니다.',
                tags: null,
                figures: [
                    {
                        stage: '전체 Mesh 캡처',
                        alt: '실행 HUD와 함께 사과 메시 5만 개를 렌더링하는 PerformanceEngine',
                        caption: 'HUD 측정값: 151.15 FPS · 6.62 ms · Draw Call 10,725회 · Primitive 50,000개.'
                    },
                    {
                        stage: 'Impostor 캡처',
                        alt: '실행 HUD와 함께 사과 Impostor 5만 개를 렌더링하는 PerformanceEngine',
                        caption: 'HUD 측정값: 311.16 FPS · 3.21 ms · Draw Call 2회 · Primitive 50,000개.'
                    }
                ],
                facts: [
                    { label: '작업 부하', value: '오브젝트 50,000개', detail: '일반 사과 25,000개 + 한입 베어 문 사과 25,000개' },
                    { label: 'Frame Time', value: '6.62 → 3.21 ms', detail: 'Full Mesh HUD → Impostor HUD' },
                    { label: 'Draw Call', value: '10,725 → 2', detail: 'Full Mesh → Impostor' }
                ],
                trace: { label: 'Impostor 경로 프레임 로그' },
                method: '로컬 Release x64, 1280 × 720 해상도에서 확보한 자료입니다. 소스 설정상 VSync는 비활성화되어 있고 메인 스레드는 affinity bit 2에 고정됩니다. Impostor 경로의 CSV는 2026-08-21, 두 HUD 화면은 2026-08-22에 보존했습니다.',
                hardwareLabel: '측정 PC',
                limitations: [
                    '두 화면은 특정 커밋에 고정한 통제 벤치마크가 아니며, 표시한 값은 보존된 HUD에서 읽은 관측값입니다.',
                    '반복 프레임 로그가 남은 경로는 Impostor뿐입니다. Full Mesh 반복 CSV, GPU counter, VRAM 추적 자료가 없으므로 통계적인 속도 향상률을 주장하지 않습니다.',
                    '순간 FPS의 산술평균은 제외하고, 반복 로그에서 직접 계산된 평균 Frame Time만 기록했습니다.'
                ]
            }
        ],
        troubleshooting: [
            {
                title: '고밀도 scene의 picking 및 object별 submission 비용',
                symptom: '오브젝트 50,000개 경합에서 mesh triangle 검사와 object별 draw data 갱신에 드는 CPU 작업이 크게 늘었습니다.',
                cause: 'picking이 sub-mesh의 모든 triangle을 순회했고, 반복되는 object constant가 고밀도 scene에 확장되지 않는 object별 경로로 제출됐습니다.',
                fix: '교차하지 않는 branch를 거르는 sub-mesh BVH를 구축하고, world/tint instance data를 instance index로 접근하는 StructuredBuffer로 이동했습니다.',
                result: 'renderer가 계층적으로 candidate를 거르고 반복 instance data를 batch 처리해 object마다 전체 경로를 반복하지 않습니다.'
            },
            {
                title: 'dirty transform 갱신 중 재귀 호출로 스택 오버플로 발생',
                symptom: 'dirty 상태의 FSceneComponent 월드 transform을 갱신하는 과정에서 같은 함수가 반복 호출되어 스택 오버플로로 이어질 수 있었습니다.',
                cause: 'UpdateComponentToWorld()가 같은 dirty 상태를 다시 확인하는 경로에 진입할 때까지 dirty flag가 남아 있어, 갱신 함수가 자기 자신을 다시 호출했습니다.',
                fix: 'UpdateComponentToWorld() 진입 전에 bIsWorldTransformDirty를 먼저 해제하고, 연관된 AABB 갱신은 OnUpdateWorldTransform()에서 처리하도록 정리했습니다.',
                result: 'transform 변경을 한 번만 계산한 뒤 완성된 월드 transform으로 bounds를 갱신하며, 갱신 경로에 재진입하지 않습니다.',
                code: { context: 'FSceneComponent::GetComponentToWorld()' }
            },
            {
                title: 'bake camera와 bounds 오류로 방향별 atlas가 잘림',
                symptom: 'ec931251의 albedo atlas는 256개 칸 중 149개에서 검은색이 아닌 픽셀의 비율이 5% 미만이었고, 사과 전체가 아니라 가느다란 일부만 담겼습니다.',
                cause: '초기 bake 경로는 메시가 제공한 bounds, custom FMatrix::MakeLookAt, 직교 투영 행렬을 조합했으며, Octahedral 방향 전반에서 오브젝트 전체를 안정적으로 화면에 담지 못했습니다.',
                fix: 'b3f0a6c에서 메시 vertex를 순회해 min/max bounds를 다시 계산하고, 가장 큰 half-extent에 20% 여유 범위를 적용했습니다. 극지점에서도 안정적인 up basis를 구성한 뒤 DirectXMath로 left-handed view와 직교 투영 행렬을 만들었습니다.',
                result: '모든 방향에서 사과 전체가 처음 확인되는 커밋은 b3f0a6c입니다. 후속 2960b5b atlas도 256개 칸 모두에서 검은색이 아닌 픽셀 비율이 50% 이상이며, 실행 시 프록시 화질과 성능은 별도 근거로 구분했습니다.',
                code: { context: 'Bake()의 vertex bounds 계산 및 CalculateCameraTransform()' }
            },
            {
                title: 'SceneGraph가 maximum depth에서 object를 누락함',
                symptom: '같은 octant에 있는 고밀도 object가 depth 8에 도달하면 picking candidate list에서 사라질 수 있었습니다.',
                cause: 'terminal leaf가 PrimitiveIndex 하나만 저장했습니다. maximum depth에서 여러 index가 남아도 leaf가 전체 집합을 보존하지 못했습니다.',
                fix: 'leaf가 남은 모든 primitive index를 저장하고 traversal 중 전체 collection을 방출하도록 변경했습니다.',
                result: 'maximum-depth leaf에 배정된 모든 primitive가 picking pass에서 계속 사용됩니다.',
                code: { context: 'terminal leaf 생성 및 traversal' }
            },
            {
                title: 'GPU culling이 오브젝트 50,000개로 고정됨',
                symptom: 'primitive가 50,000개를 넘는 scene은 고정된 instance 및 visibility resource capacity를 초과할 수 있었고 compute shader는 그보다 큰 index를 무시했습니다.',
                cause: 'CPU buffer, SRV/UAV element count, staging storage, HLSL boundary check가 모두 literal 50000을 사용했습니다.',
                fix: '확장 가능한 culling resource를 추가하고 고정된 scene limit 대신 실제 primitive count를 compute shader에 전달했습니다.',
                result: 'culling resource가 필요한 object 수까지 확장되고 shader dispatch가 실제 scene primitive count에서 종료됩니다.',
                code: { context: 'EnsureCullingBufferCapacity()' }
            },
            {
                title: '레이어별 인스턴스 캐시가 공유 버퍼를 덮어씀',
                symptom: '한 렌더 레이어의 캐시 오브젝트가 다른 레이어에 속한 transform이나 오브젝트 ID를 사용할 수 있었습니다.',
                cause: '각 레이어가 같은 인스턴스 버퍼를 WRITE_DISCARD로 map한 뒤 offset 0부터 기록했습니다. 다음 레이어가 버퍼 내용을 교체해도 기존 batch offset은 그대로 남았습니다.',
                fix: '한 번 map한 버퍼에 모든 레이어를 순서대로 재구성하고, 각 batch에 겹치지 않는 전역 offset을 할당했습니다.',
                result: '각 batch가 공유 인스턴스 버퍼에서 자신에게 할당된 범위만 참조하게 되었습니다.',
                code: { context: 'RebuildAllLayerInstanceBuffers()' }
            }
        ],
        commitRefs: [
            { label: '렌더 상태 캐싱 및 드로 정렬' },
            { label: 'sub-mesh BVH 및 데이터 지향 렌더링' },
            { label: 'scene component 및 렌더링 구조 개편' },
            { label: 'vertex bounds 기반 bake camera 보정' },
            { label: '로컬 방향 billboard 및 4개 칸 샘플링' },
            { label: '행 우선 행렬 업로드·가중치 샘플링·atlas 재생성' },
            { label: 'Octahedral Impostor 경로 통합' }
        ]
    },
    '06': {
        title: 'Height Fog 및 Decal 렌더링',
        summary: 'height/linear fog와 depth-reconstructed spotlight projection을 구현하면서 RGB contribution과 viewport render target의 alpha channel을 분리했습니다.',
        role: '대기 및 Decal 렌더링 프로그래머',
        objective: 'viewport alpha, depth reconstruction, 주변 render sequence를 손상시키지 않으면서 공유 renderer에 제어 가능한 fog와 projected lighting을 추가하는 것이 목표였습니다.',
        contributions: [
            'fog shader/state 경로, 이동 가능한 FogActor, cutoff parameter, near/far 접근, color control, billboard representation을 구축했습니다.',
            'scene-depth 생성을 fog renderer에서 분리하고 reverse-depth reconstruction을 사용하는 FScene collection과 연결했습니다.',
            '가까운 fog pixel을 ImGui viewport에서 투명하게 만들던 alpha-blend equation을 진단하고 최종 linear-fog 경로를 복원했습니다.',
            'alpha를 보존하는 blend state와 SpotLightDecal additive 경로를 구축하고, render output을 channel별로 확인해 decal artifact를 격리했습니다.'
        ],
        implementation: [
            'Height/Linear Fog 방정식, Cutoff 거리, 안개 색상, 카메라 Near/Far 파라미터',
            'FogActor, Scene 컬렉션, Billboard, 색상 선택기, 에디터 속성',
            'scene-depth 분리, inverse view-projection reconstruction, reverse depth, render order, alpha blending',
            'depth-reconstructed spotlight projection, additive RGB contribution, destination-alpha 보존'
        ],
        flow: 'Scene depth + camera + fog/decal parameter → world reconstruction → atmospheric 또는 additive contribution → alpha-safe editor viewport',
        results: [
            'renderer의 범위를 opaque object drawing 너머로 확장했습니다.',
            'fog와 decal color contribution이 ImGui가 사용하는 viewport alpha를 덮어쓰지 않도록 했습니다.',
            'fog 중심 branch를 공개 구현 참고 자료로 보존했습니다.'
        ],
        evidenceStatus: '작성자 커밋 확인됨',
        evidenceNote: '저장소에서 2026년 4월 12~16일 HaXX0rBunny 명의 커밋 34건을 확인했으며, 이 중 28건은 non-merge 커밋입니다.',
        sourceLabel: 'fog feature branch 열기',
        troubleshootingEvidence: [
            {
                kicker: '최초 fog 실패 · commit 이전 capture',
                title: '첫 fog pass에서 geometry는 fog color로 포화됐지만 editor viewport 대부분은 검게 남았습니다.',
                summary: '두 capture는 12.65초 간격으로 기록됐고, WIP full-screen fog 경로가 894b180에 처음 commit되기 32분 전입니다. cube color #8098B1은 설정된 default fog color 약 #8099B3와 거의 같지만, 주변 viewport는 #0F0F0F가 지배적입니다. 이후 commit 3f5241e는 직접적인 composition fault를 확인합니다. 일반 alpha blending이 render-target alpha를 fogOpacity로 교체해 ImGui의 검은 background가 드러났습니다. 초기 far/sky math에는 ed1d815에서 추가된 수치 guard도 없었지만, screenshot만으로 camera distance가 검은 pixel의 원인이라고 입증할 수는 없습니다.',
                tags: ['실제 defect capture', '초기 fog pass', 'Viewport Alpha 문제', 'Far-depth 방어'],
                figures: [
                    {
                        stage: '멀리서 검은 viewport 상태 · 2026-04-12 00:53:07 KST',
                        alt: 'editor grid는 보이지만 먼 viewport와 sky가 검게 나타나는 Week06 초기 fog 구현',
                        caption: 'full-screen scene 영역이 horizon과 sky 방향으로 검고, grid는 이후 editor overlay로 계속 그려집니다.'
                    },
                    {
                        stage: 'Geometry 반영 확인 · 2026-04-12 00:53:20 KST',
                        alt: '주변 viewport는 검은 상태로 남고 cube만 blue-gray로 물든 Week06 초기 fog 구현',
                        caption: 'cube를 통해 fog color가 geometry에 도달했음을 알 수 있지만, 주변 scene에는 여전히 검은 failure state가 드러납니다.'
                    }
                ],
                facts: [
                    { label: '관찰된 실패', value: '화면의 89.870%가 검게 출력', detail: '#0F0F0F와 정상 #404040 Clear 비교' },
                    { label: 'FogColor 전달', value: '#8098B1 ≈ #8099B3', detail: '렌더링된 Cube와 기본 FogColor 비교' },
                    { label: 'Alpha 수정', value: '3f5241e', detail: 'Destination Alpha를 보존하는 Fog RGB Blend' }
                ],
                trace: { label: '직접적인 alpha-composition 결함과 수정' },
                method: '검게 출력된 실패 상태와 Geometry에 FogColor가 반영된 상태를 첫 Fog 구현과 대조하고, 이후 작성된 수치 안정성 및 Alpha Blend 수정 diff를 추적했습니다.',
                limitations: [
                    '이미지는 첫 fog commit보다 앞서므로 정확한 uncommitted shader text, fog parameter, camera transform, executable build가 보존되지 않았습니다.',
                    'opaque desktop screenshot에서는 원본 render-target alpha가 드러나지 않으며 non-finite shader value를 직접 식별할 수 없습니다. 해당 원인은 이후 code diff로 확인됩니다.',
                    '검은 output은 문서화된 ImGui alpha-composition 결함과 가장 직접적으로 일치합니다. 이 이미지로 distance, far-plane clipping, non-finite sky reconstruction을 분리해 확인할 수는 없습니다.',
                    '같은 camera의 post-fix capture나 frame-time benchmark는 보존되지 않았습니다.'
                ]
            },
            {
                kicker: '실제 fog-visibility 비교 · 로컬 capture',
                title: '한 fog-active view에는 mesh가 남아 있지만 이후 cropped view에는 FogActor billboard만 보입니다.',
                summary: '두 capture의 dominant fog color는 같습니다. 첫 화면에는 cube와 sphere가 보이지만 7분 39초 뒤의 cropped viewport에는 editor FogActor billboard만 있습니다. 요청된 mesh-visible / mesh-not-visible 상태를 그대로 기록하지만, 파일만으로 fog attenuation과 camera movement 또는 far-plane clipping을 분리할 수 없어 commit에 고정된 bug-fix 전후 비교로 제시하지 않습니다.',
                tags: ['실제 editor capture', 'Height Fog 적용', '가시성 변화', 'Week06'],
                figures: [
                    {
                        stage: 'Fog 적용 · mesh 보임 · 2026-04-15 20:35 KST',
                        alt: 'blue height fog가 적용된 상태에서 큰 cube와 sphere가 보이는 Week06 editor viewport',
                        caption: 'fog가 scene color와 contrast를 약화하지만 cube와 sphere는 여전히 rendered viewport에 기여합니다.'
                    },
                    {
                        stage: 'Fog 활성 · mesh 보이지 않음 · 2026-04-15 20:43 KST',
                        alt: 'scene mesh는 보이지 않고 fog actor icon만 남은 blue height fog 상태의 Week06 editor viewport',
                        caption: 'cropped frame에서 scene mesh는 보이지 않고 FogActor billboard만 남습니다. billboard는 editor overlay로 렌더링됩니다. 이 capture만으로 fog, camera distance, clipping 중 무엇이 mesh를 제거했는지는 알 수 없습니다.'
                    }
                ],
                trace: { label: '가장 가까운 기존 visibility-to-opacity 구현' },
                method: 'Mesh가 보이는 상태와 사라진 상태를 인접한 HeightFog Shader 이력 및 visibility-to-opacity 구현과 대조했습니다. 캡처는 관찰된 상태를 기록하는 자료로만 사용하며 원인을 단정하지 않습니다.',
                limitations: [
                    'capture의 viewport crop과 해상도가 달라 pixel-matched visual regression test가 아닙니다.',
                    '어느 이미지에도 property panel, 정확한 camera transform, fog parameter value, executable hash, working-tree revision이 없어 두 화면 사이의 정확한 input change를 복원할 수 없습니다.',
                    '다음 fog commit에 저장된 camera configuration도 100-unit far clip을 사용했으므로 두 번째 이미지를 fog만으로 geometry가 가려졌다는 증거로 사용할 수 없습니다.',
                    '두 이미지는 초기 a5ddaeb height-fog 구현 이후, 최종 5ccad72 linear-fog 경로 이전에 만들어졌으므로 중간 exponential-fog 동작만 확인합니다.',
                    'visual attenuation을 보여줄 뿐 performance improvement는 입증하지 않으며 frame-time benchmark는 기록되지 않았습니다.'
                ]
            },
            {
                kicker: '실제 horizon-seam 진단 → Git 근거가 있는 수정',
                title: 'sky와 scene geometry가 서로 다른 fog evaluation을 따라 단단한 horizon 경계가 생겼습니다.',
                summary: '세 editor capture는 최종 fog commit 직전에 height-fog profile을 조정한 과정을 기록합니다. 첫 두 화면은 파란 fog layer 위에 어두운 upper sky가 남아 뚜렷한 경계를 보입니다. 세 번째 화면에서는 working-tree 반복 작업 중 검은 영역이 fog color의 sky response로 바뀝니다. 이 순서는 깨끗한 commit 전후 비교가 아니라 commit 이전 진단으로 취급합니다.',
                tags: ['실제 editor capture', '지평선 경계', 'Sky Ray 보정', '5ccad72'],
                figures: [
                    {
                        stage: '진단 01 · 2026-04-16 00:53:39 KST',
                        alt: 'horizon에서 dark sky와 blue fog layer가 뚜렷하게 갈리는 Week06 height fog 진단',
                        caption: '어두운 upper sky와 파란 fog가 적용된 scene·grid 사이에 선명한 수평 경계가 생겼습니다.'
                    },
                    {
                        stage: '진단 02 · 2026-04-16 00:53:54 KST',
                        alt: '조금 다른 시점에서도 dark sky와 blue fog layer의 단단한 경계가 나타나는 두 번째 Week06 height fog 화면',
                        caption: '약간 다른 crop과 camera position에서도 같은 불연속이 남아 있습니다.'
                    },
                    {
                        stage: '수정 후 후보 · working tree · 2026-04-16 00:54:19 KST',
                        alt: 'grid horizon 위 sky까지 blue fog response가 확장된 Week06 working-tree fog 반복 작업',
                        caption: '대체 response가 sky까지 도달해 검은 upper region을 제거하지만 property panel이 없어 정확한 mode와 parameter change는 복원할 수 없습니다.'
                    }
                ],
                facts: [
                    { label: '최종 작성자 Commit', value: '5ccad72', detail: 'Sky 경로 수정' },
                    { label: '기존 sky 경로', value: '상수 반환', detail: 'Depth = 1이면 world-space fog integration을 우회' },
                    { label: '수정된 sky 경로', value: '방향 적분', detail: 'InvViewProj ray를 선택된 fog function으로 평가' }
                ],
                trace: { label: '5ccad72 전후의 sky 경로' },
                method: '세 진단 캡처에서 Sky와 Fog 영역의 차이를 확인하고, 상수 반환 경로와 방향 적분 경로를 5ccad72의 Parent 및 Result Blob에 대조했습니다.',
                limitations: [
                    '세 이미지 모두 작성자 commit 전에 capture되어 uncommitted working-tree change를 포함할 수 있으므로 정확한 Git blob에 배정할 수 없습니다.',
                    'property panel이 없어 각 frame의 linear/exponential toggle, density, height, falloff, maximum opacity, camera value를 알 수 없습니다.',
                    '일치하는 post-commit horizon screenshot은 보존되지 않았습니다. 수정은 shader diff로 입증되지만 최종 visual result는 독립적으로 capture되지 않았습니다.',
                    'visual correctness 조사이며 frame-time 또는 GPU-pass benchmark는 기록되지 않았습니다.'
                ]
            },
            {
                kicker: '사용자가 설명한 RGBA 분리 확인 · 실제 진단 capture',
                title: 'channel별 검사로 검은 decal 바깥 영역의 원인을 render-target alpha로 격리했습니다.',
                summary: '첫 capture에는 projected response 주변의 검은 바깥 영역이, 두 번째에는 같은 debugging session의 넓은 red additive contribution이 보존돼 있습니다. 개발자는 R, G, B, A를 각각 검사해 alpha로 결함을 격리했다고 설명했습니다. 임시 channel-isolation shader는 commit되지 않았으므로 두 full-color PNG 중 어느 하나가 특정 channel만 나타낸다고 주장하지 않습니다.',
                tags: ['실제 editor capture', 'Alpha 오염', 'Blend State 수정', 'SpotLightDecal'],
                figures: [
                    {
                        stage: '검은 바깥 영역 증상 · 2026-04-16 02:40:47 KST',
                        alt: 'test surface에서 흰 projected response 주변에 dark ring이 보이는 Week06 spotlight decal 진단',
                        caption: 'projected response 주변의 어두운 영역을 계기로 render target의 color와 alpha channel을 분리해 검사했습니다.'
                    },
                    {
                        stage: 'additive footprint 진단 · 2026-04-16 02:53:01 KST',
                        alt: 'floor 전반의 넓은 red additive contribution과 포화된 white cube가 보이는 Week06 spotlight decal 진단',
                        caption: '지배적인 red footprint가 재구성된 plane과 cube surface에 걸친 projected RGB contribution을 드러냅니다. commit된 R-only view라고 표시하지 않습니다.'
                    }
                ],
                facts: [
                    { label: '우세한 적색 프레임', value: '#BF4040 · 64.619%', detail: '#404040 위의 red additive contribution과 일치' },
                    { label: '저장된 PNG alpha', value: '전체 255', detail: 'screenshot에는 source render-target alpha value가 보존되지 않음' },
                    { label: '기록된 Git 상태', value: 'decfa685 이후', detail: '이 capture 사이와 이후에 추가 commit 없음' }
                ],
                trace: { label: 'RGB blending과 destination-alpha 보존 분리' },
                method: 'Channel 분리 캡처를 작성한 Blend State 이력과 Renderer 코드에 대조해 RGB 기여와 Destination Alpha 보존 문제를 구분했습니다. 임시 진단 Shader는 Commit되지 않아 작업 맥락으로만 다룹니다.',
                limitations: [
                    'commit된 editor에는 독립적인 R/G/B/A view mode가 없어 정확한 임시 diagnostic shader와 이미지별 channel selection을 재구성할 수 없습니다.',
                    '두 PNG는 opaque full-color screenshot입니다. 조사 과정은 보여주지만 기반 render-target alpha channel을 수치로 드러내지는 않습니다.',
                    '두 capture는 마지막으로 기록된 branch merge 이후이며 중간 commit이 없어 commit 수준 전후 근거가 아닙니다.',
                    '2a066ce의 직접 Projection Decal binding은 팀원이 작성했습니다. 개인 기여는 재사용 가능한 alpha-preserving state와 SpotLightDecal additive integration입니다.',
                    'visual correctness 수정이며 frame-time 또는 GPU benchmark는 기록되지 않았습니다.'
                ]
            }
        ],
        troubleshooting: [
            {
                title: 'constant sky-fog 분기가 단단한 horizon seam을 만듦',
                symptom: 'fog가 적용된 ground와 background sky가 연속된 atmospheric response를 공유하지 않고 뚜렷한 수평 경계에서 만났습니다.',
                cause: 'depth-buffer sky pixel(depth ≥ 1)은 즉시 FogMaxOpacity의 FogInscatteringColor를 반환한 반면 geometry pixel은 world position을 재구성하고 exponential height fog를 적분했습니다. 따라서 horizon 양쪽의 인접 pixel이 서로 다른 equation을 사용했습니다.',
                fix: 'InvViewProj를 통해 sky pixel의 world-space direction을 재구성하고 geometry와 동일하게 선택된 linear 또는 exponential fog function으로 먼 가상 지점을 평가했습니다. component와 constant-buffer 경로를 통해 bUseLinearFog를 노출했습니다.',
                result: 'sky와 geometry가 distance, height, direction을 반영하는 fog evaluation을 공유합니다. code-path 불연속은 제거됐지만 깨끗한 post-commit 비교 frame은 보존되지 않았습니다.',
                code: { context: 'PS() · depth >= 1.0 sky 경로' }
            },
            {
                title: 'decal RGB는 유효하지만 blend 경로가 viewport alpha를 오염시킴',
                symptom: 'projected response는 보였지만 viewport texture를 합성할 때 바깥 영역이 검게 변했습니다. output channel을 하나씩 확인한 결과 RGB lighting calculation이 아닌 alpha가 원인으로 격리됐습니다.',
                cause: '일반 alpha blend equation이 destination alpha를 1 × SrcAlpha + 0 × DstAlpha로 기록했습니다. 따라서 fog 또는 decal pass가 RGB result는 올바르더라도 scene render target의 alpha를 교체할 수 있었고, 이후 ImGui가 손상된 alpha를 viewport composition에 사용했습니다.',
                fix: '일반 translucent color용 AlphaBlendKeepAlpha state와 spotlight contribution용 Additive state를 만들었습니다. 둘 다 0 × SrcAlpha + 1 × DstAlpha로 destination alpha를 유지합니다. projection decal pass는 팀원이 재사용 state에 연결했으며 SpotLightDecal 경로에는 개인 additive integration을 사용했습니다.',
                result: 'fog와 spotlight color가 viewport alpha를 수정하지 않고 RGB를 변경할 수 있습니다. 개인 작업은 재사용 가능한 keep-alpha state와 SpotLightDecal additive 경로이며, 팀원 commit 2a066ce가 Projection Decal binding을 제공합니다. 제공된 이미지는 merge 이후 진단 capture이지 commit A/B가 아닙니다.',
                code: { context: 'FBlendStateManager::Create() · alpha-preserving state' }
            },
            {
                title: 'spotlight cone 조건식이 거의 모든 차이를 true로 처리함',
                symptom: 'projected cone 내부의 유효한 pixel도 cosine이 outer-cone threshold와 정확히 같지 않으면 discard될 수 있었습니다.',
                cause: 'shader가 `if (cosAngle - OuterConeAngleCos)`를 사용해 pixel이 cone 밖인지 검사하는 대신 0이 아닌 모든 차이를 true로 변환했습니다.',
                fix: '의도한 순서 비교로 조건을 변경해 angle이 outer cone 밖인 pixel만 discard했습니다.',
                result: 'interior spotlight pixel은 falloff, normal, luminance evaluation으로 진행하고 exterior pixel만 제거됩니다. 일치하는 runtime A/B capture는 보존되지 않았습니다.',
                code: { context: 'PS() · cone-angle rejection' }
            },
            {
                title: 'fog component 제거가 mesh visibility list까지 지움',
                symptom: 'height-fog component를 삭제하거나 제거하면 관계없는 scene mesh도 함께 사라질 수 있었습니다.',
                cause: 'FScene::RemoveFog()가 fog component를 지운 뒤 모든 render proxy에 속하는 scene-wide container인 SelectedProxies, NeverCullProxies, FreeSlots, VisibleProxies까지 clear했습니다.',
                fix: 'RemoveFog()가 일치하는 UHeightFogComponent만 제거하도록 제한하고 global proxy bookkeeping array를 clear하지 않도록 했습니다.',
                result: 'fog 제거가 scene의 나머지 부분을 렌더링하는 visibility record를 더 이상 무효화하지 않습니다. 제공된 screenshot은 이 수정 이후에 capture되어 이 commit의 전후 근거가 아닌 fog test의 맥락 자료입니다.',
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
                symptom: '최초 full-screen fog prototype을 안정화하는 동안 depth-boundary code path가 sky 또는 far pixel에 정의되지 않은 world position과 opacity input을 만들 수 있었습니다. 제공된 black-viewport capture는 맥락 근거이며 이 상태의 직접적인 numerical trace는 아닙니다.',
                cause: 'ReconstructWorldPos가 near-zero 값을 guard하지 않고 homogeneous worldH.w로 나눴습니다. 이후 ray length, normalized direction, height exponent, accumulated density가 blend stage에 도달하기 전에 zero-length, infinite, NaN, negative, overflowed 값이 될 수 있었습니다.',
                fix: 'homogeneous W와 유효하지 않은 ray length를 guard하고 exponential input을 clamp했습니다. fog integral을 0 이상이며 제한된 값으로 만들고 opacity를 saturate했으며, 최종 component에 NaN 또는 infinite가 남으면 discard했습니다.',
                result: '잘못된 far/sky reconstruction이 non-finite opacity 또는 color를 fog pass로 전달하지 않습니다. 제공된 capture는 이전 failure를 기록하지만 일치하는 post-fix frame은 보존되지 않았습니다.',
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
        summary: 'light component와 scene proxy 경로, forward-renderer light buffer, editor light actor, shader hot reload, 시간 기반 daylight system을 구축했습니다.',
        role: '렌더링 프로그래머',
        objective: 'light, material, scene data가 하나의 유지보수 가능한 real-time rendering 경로로 동작하도록 만드는 것이 목표였습니다.',
        contributions: [
            'LightComponentBase, LightSceneProxy, forward-renderer constant-buffer binding, light actor, billboard, ambient light, debug drawing을 구현했습니다.',
            '공유 lighting function과 toon-lit 경로를 포함하는 shader hot reload를 추가하면서 render-state 및 GPU resource leak을 수정했습니다.',
            'daylight orbit, 24-hour sunlight, altitude 기반 ambient color, sky clear color, 안전한 cached-light cleanup을 구축했습니다.'
        ],
        implementation: [
            'Light Component·Scene Proxy·Forward Renderer 버퍼 아키텍처',
            '에디터 Light 배치, Billboard, Cone·Debug 시각화, Shader Hot Reload',
            'Daylight 궤도, 태양 방향, 고도·시간 변환, Ambient 색상, Sky Clear Color'
        ],
        flow: '에디터 Light Actor → Component·Scene Proxy → Forward Light Buffer → Material Lighting·Daylight 갱신',
        results: [
            '다음 shadow 과제에 필요한 lighting layer를 구축했습니다.',
            'lighting 동작을 독립적인 sample이 아닌 engine에 통합했습니다.'
        ],
        evidenceStatus: '로컬 작성자 커밋 확인됨',
        evidenceNote: '로컬 이력에서 2026년 4월 17~23일 HaXX0rBunny 명의 커밋 44건을 확인했으며, 이 중 31건은 non-merge 커밋입니다. 원본 public remote는 더 이상 사용할 수 없습니다.',
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
                title: 'daylight 또는 light actor 삭제 후 오래된 render state가 남음',
                symptom: 'Daylight actor를 삭제해도 마지막 sky clear color가 남을 수 있었고, cache된 directional 또는 ambient light를 삭제하면 다음 update에서 오래된 component pointer를 역참조할 위험이 있었습니다.',
                cause: 'Daylight가 global scene color를 기록했지만 destructor에서 복원하지 않았고, actor가 world에서 제거된 뒤에도 raw cached component pointer가 유효하다고 가정했습니다.',
                fix: 'Daylight destructor에서 scene sky-color override를 clear하고 tick 및 property 기반 update 전에 cache된 sun·ambient component pointer를 무효화한 뒤 다시 구축했습니다.',
                result: 'lighting actor를 제거하면 중립 scene state가 복원되고 daylight system이 소멸된 component를 가리키지 않습니다.'
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
        summary: '방향광·스포트라이트·포인트 라이트용 그림자 경로를 구현하고, shadow-depth 리소스, cube map, PCF/VSM 필터링, 컬링, mobility, cache-dirty 제어를 통합했습니다.',
        role: '렌더링 프로그래머',
        objective: 'Week07 조명 경로를 확장해 장면 지오메트리가 실시간 그림자를 만들고 받을 수 있도록 하는 것이 목표였습니다.',
        contributions: [
            '스포트라이트·방향광의 shadow depth 렌더링을 구성하고 D3D11 리소스 상태와 constant buffer 문제를 수정했으며, shadow-map 누수와 peter-panning을 해결했습니다.',
            '포인트 라이트 cube shadow map, point-light shader, VSM/PCF 평가, cube-map descriptor 수정과 왜곡 보정을 구현했습니다.',
            '그림자 후보 우선순위·컬링, mobility와 dirty flag, movable light 동작, 에디터 제어 기능을 구현했습니다.'
        ],
        implementation: [
            '방향광·스포트라이트 shadow depth pass와 rasterizer bias 제어',
            '포인트 라이트 cube map, PCF/VSM 필터링, cube direction 보정',
            '우선순위 수집, 그림자 컬링, mobility, dirty cache, 에디터 제어'
        ],
        flow: '라이트별 후보 수집 → depth / cube shadow pass → PCF 또는 VSM 샘플링 → 캐시된 조명 결과',
        results: [
            'Week07 조명 파이프라인에 공간적 접지감이 드러나는 그림자를 추가했습니다.',
            '통합 프로젝트를 공개 저장소에 보존했습니다.'
        ],
        evidenceStatus: '작성자 커밋 검증 완료',
        evidenceNote: '저장소에서 HaXX0rBunny 작성 커밋 37건을 확인했으며, 이 가운데 29건은 2026년 4월 25~29일의 non-merge 커밋입니다.',
        sourceLabel: 'Week08 작성 커밋 열기',
        troubleshooting: [
            {
                title: 'Point-shadow cube SRV descriptor 손상',
                symptom: '포인트 라이트 그림자 샘플링 결과가 유효하지 않거나 손상되었고, 잘못된 D3D11 view description이 만들어질 수 있었습니다.',
                cause: 'texture가 D3D11_RESOURCE_MISC_TEXTURECUBE 없이 생성되었고, SRV 경로가 2D-array와 cube-array union field를 혼용했습니다. shader도 잘못 패킹된 parameter에서 cube index를 읽었습니다.',
                fix: 'texture를 cube flag와 함께 만들고 Texture2DArray와 TextureCubeArray SRV를 각 descriptor field로 분리해 구성했으며, cube index를 Params0.w에 저장하고 같은 위치에서 읽도록 수정했습니다.',
                result: 'face rendering과 cube sampling 모두에 유효한 리소스가 되었고, 각 포인트 라이트가 의도한 cube slice를 참조하게 되었습니다.',
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
                title: 'Point-shadow 후보가 우선순위 정렬 전에 할당을 소비함',
                symptom: '그림자를 만드는 포인트 라이트가 수집 단계와 정렬 단계에서 shadow record와 view를 각각 할당해 cube 예산을 잠식할 수 있었습니다.',
                cause: '첫 pass가 각 shadow를 등록하면서 같은 라이트를 후보로도 넣었고, 두 번째 pass가 정렬 후 할당을 반복했습니다.',
                fix: '수집 단계에서는 후보만 모으고 카메라 거리순으로 정렬한 뒤, 우선순위 pass에서 MaxPointShadowCubes 이내로 한 번만 할당하도록 변경했습니다.',
                result: '우선순위가 결정된 뒤에만 shadow metadata와 cube view가 생성되며, 선택된 라이트는 한 번만 출력됩니다.',
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
            { label: 'PCF·Mobility·Dirty Cache 처리' }
        ]
    },

    '09': {
        sourceIndex: 8,
        week: '09',
        theme: '3rd Game Jam · Light, Camera, Action!',
        title: 'Standalone Shipping 빌드',
        summary: 'shipping/cooking 파이프라인을 구현하고 game framework, binary world serialization, PIE/offscreen rendering, camera effect, Lua routing, gamma correction을 연결했습니다.',
        role: '빌드·런타임 통합 프로그래머',
        objective: '패키징된 애플리케이션에 필요한 runtime asset을 포함해 팀 프로젝트가 에디터 밖에서 시작되도록 만드는 것이 목표였습니다.',
        contributions: [
            'GameModeBase/GameInstance, binary world serialization, enhanced-input 전환, project generation, shipping build, cooking, headless parser/builder를 구현했습니다.',
            'PIE용 offscreen rendering과 input을 분리한 뒤 PlayerCameraManager, camera shake/effect, Lua camera modifier, actor camera calculation을 구현했습니다.',
            'gamma correction 제어를 추가하고 post-process 순서, ABI 불일치, runtime asset root, crash/dangling reference, packaging script 문제를 수정했습니다.'
        ],
        implementation: [
            'Shipping target, 생성 프로젝트, cook/stage 구조, headless builder, batch packaging, mirrored asset',
            'GameMode·GameInstance, World 바이너리 직렬화, PIE·Offscreen Buffer, Enhanced Input',
            'Camera pipeline, Lua modifier, hit/vignette effect, gamma correction, render-pass 순서'
        ],
        flow: 'Editor world → binary serialize / cook → mirrored asset stage → shipping executable → runtime camera 및 post-process 흐름',
        results: [
            'standalone menu 경로까지의 직접 실행을 검증했습니다.',
            'START/loading 전환과 runtime log의 StoryScene BeginPlay를 검증했습니다. 렌더링된 gameplay viewport frame까지 확인했다는 주장은 하지 않습니다.'
        ],
        evidenceStatus: '작성자 커밋 검증 완료',
        evidenceNote: 'Week09 저장소에서 HaXX0rBunny 작성 커밋 95건을 확인했으며, 이 가운데 74건은 2026년 5월 1~9일의 non-merge 커밋입니다. runtime 관련 주장은 직접 검증한 standalone 경로로 한정합니다.',
        sourceLabel: 'Week09 작성 커밋 열기',
        troubleshootingEvidence: [
            {
                kicker: '실제 Shipping runtime checkpoint',
                title: '패키징된 EXE가 메뉴에 도달하고 START loading 전환에 진입했습니다.',
                summary: '캡처와 보존된 Engine.log는 결과를 과장하지 않고 standalone 경로를 검증합니다. log에는 game/story.scene load와 StoryScene Lua BeginPlay가 기록되어 있지만, 렌더링된 gameplay frame은 보존되지 않았습니다.',
                tags: ['실제 runtime 캡처', 'Shipping x64 빌드', 'Runtime 로그'],
                figures: [
                    {
                        stage: 'Checkpoint 01 · 직접 실행',
                        alt: 'LunaticEngine standalone Shipping executable에서 Engine Dive main menu를 표시한 화면',
                        caption: 'stage된 executable이 Visual Studio 외부에서 render path를 초기화하고 main menu를 표시했습니다.'
                    },
                    {
                        stage: 'Checkpoint 02 · START 전환',
                        alt: 'START 선택 후 loading 전환을 표시하는 LunaticEngine standalone executable',
                        caption: 'START가 runtime을 loading 전환으로 이동시켰습니다. 이 화면을 gameplay viewport 캡처라고 표시하지 않습니다.'
                    }
                ],
                facts: [
                    { label: 'Standalone 실행', value: '검증 완료', detail: 'Menu 렌더링 · StoryScene BeginPlay 확인' },
                    { label: '패키징 결과', value: 'Map 16개 · 파일 429개', detail: 'Cook/Stage 완료 · Source .Scene 파일 0개' },
                    { label: '검증 단계', value: 'Exit 1', detail: '필수 Cube Source/Cache 누락' }
                ],
                trace: { label: '보존된 Shipping runtime log' },
                method: '2026-08-22에 Shipping x64 package와 새 Build → Cook → Stage → Verify 실행을 캡처했습니다. 시작 시간은 보존된 Shipping Engine.log의 단일 실행에서 옮겼습니다.',
                hardwareLabel: '캡처 PC',
                limitations: [
                    '새 실행은 Build, Cook, Stage를 완료했지만 BasicShape/cube.obj와 Cache/cube.bin이 없어 Verify 단계에서 정상적으로 실패했습니다.',
                    'START 전환과 StoryScene BeginPlay는 각각 검증했지만, 렌더링된 gameplay viewport frame은 보존되지 않았습니다.',
                    'clean PC 실행과 bundled VC++ redistributable 포함 여부는 검증하지 않았습니다. 시작 시간은 반복 benchmark가 아닌 단일 실행 값입니다.'
                ]
            }
        ],
        troubleshooting: [
            {
                title: 'Incremental-build ABI 불일치로 frame data 위치가 어긋남',
                symptom: 'post-process setting을 추가한 뒤 render code가 FFrameContext field를 잘못된 offset에서 읽어, object file에 따라 주소 의존적인 오류가 발생했습니다.',
                cause: '큰 FPostProcessSettings member를 FFrameContext 중간에 삽입했습니다. 이전 C++ struct layout으로 incremental compile된 translation unit에서는 뒤의 모든 member offset이 달라졌습니다.',
                fix: '새 post-process settings member를 FFrameContext 끝으로 옮기고, material parameter를 중앙 camera/post-process 구조를 통해 전달했습니다.',
                result: '새 post-process data를 draw-command 생성에 제공하면서도 기존 앞쪽 field offset은 incremental object 사이에서 안정적으로 유지됩니다.'
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
                title: 'Shipping stage가 runtime asset을 누락하고 서로 다른 root를 사용함',
                symptom: 'standalone executable이 실행되더라도 scene, dialogue/scenario data 또는 mesh source/cache 파일이 stage directory에 없어 이후 단계에서 실패할 수 있었습니다.',
                cause: 'batch pipeline은 선택한 root를 ShippingBuild에 직접 복사했지만 cooked scene은 별도 directory에 있어 source와 cooked asset hierarchy가 서로 달랐습니다.',
                fix: 'mirrored source asset과 cooked scene을 포함한 하나의 Saved/Cooked/Shipping asset root를 만들고 이를 stage했습니다. project에서 executable 이름을 가져오고 required-file 및 source-or-cache mesh 검사도 추가했습니다.',
                result: 'runtime dependency가 누락되면 packaging이 조기에 실패하며, runtime lookup rule과 같은 asset hierarchy를 가진 stage를 생성합니다.',
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
                title: 'Post-process copy가 shader resource로 아직 바인딩된 texture를 재사용함',
                symptom: 'copy destination이 이전 pass의 shader read에 남아 있을 때 gamma, FXAA 또는 후속 post-process 출력이 유효하지 않을 수 있었습니다.',
                cause: 'BeginPass()가 system SRV slot을 비우기 전에 scene-color 또는 depth copy에 CopyResource()를 호출했습니다.',
                fix: '각 copy 전에 system texture binding을 해제하고 새 pass에 최신 scene-color 또는 stencil resource를 바인딩했습니다.',
                result: '수정된 pass는 copy destination을 pipeline input으로 동시에 유지하지 않습니다.',
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
        title: 'Skeletal Mesh·Skinning 파이프라인',
        summary: 'skeletal-mesh component와 scene proxy, CPU skinning, FBX bind-pose 보정, bone 시각화·picking, morph-target update를 구현했습니다.',
        role: 'Skeletal Rendering 프로그래머',
        objective: 'viewer에 머물던 skeletal data를 렌더링·선택·동적 업데이트가 가능한 engine component로 전환하는 것이 목표였습니다.',
        contributions: [
            'USkeletalMeshComponent와 scene proxy, FSkeletalMesh wrapper, 초기 object CPU-skinning 경로를 만들었습니다.',
            'rigid-bind와 비계층 bone 처리, dynamic mesh update, bounds, show flag, bounding-box picking을 추가했습니다.',
            'FBX cluster bind-pose 정렬을 보정하고 rasterized bone drawing, bone picking, morph target, texture-SRV 복구를 추가했습니다.'
        ],
        implementation: [
            'Skeletal Mesh Component, Scene Proxy, FSkeletalMesh 리소스, CPU Skinning',
            'FBX cluster Transform / TransformLink bind source와 rigid-bind fallback',
            '동적 Skinned Mesh 갱신, Bounds 계산, Bone Rasterization, Picking, Morph Target'
        ],
        flow: 'FBX Skeletal 데이터 → Bind Pose·Skin Weight 구성 → Component·Scene Proxy 전달 → Skinned Vertex·Bone Tool 갱신',
        results: [
            'import된 skeletal asset에 필요한 component와 renderer 경로를 구축했습니다.',
            'Blender/FBX bind data가 일치하지 않을 때 발생하던 90도 bind-pose offset을 해결했습니다.'
        ],
        evidenceStatus: '작성자 커밋 검증 완료',
        evidenceNote: '2026년 5월 9~13일의 skeletal import·rendering 커밋 구간을 기준으로, 상속된 Week09 이력과 Week10 고유 작업을 분리했습니다.',
        sourceLabel: 'Week10 작성 커밋 열기',
        troubleshooting: [
            {
                title: 'Blender FBX skeleton이 90도 bind offset으로 import됨',
                symptom: '일부 Blender/FBX 6.x skeletal mesh에서 bone과 skinned vertex가 mesh 기준으로 약 90도 회전해 렌더링되었습니다.',
                cause: 'importer가 skin cluster의 Transform 및 TransformLink matrix와 불일치하는 경우에도 scene BindPose mesh data를 신뢰했습니다. 두 cluster matrix가 skin deformation의 mesh와 연결 bone bind transform을 나타내는 기준입니다.',
                fix: 'reference mesh bind matrix를 구할 때 cluster Transform/TransformLink를 우선하고 Blender armature-root 제거를 처리했으며, stale .skm cache가 다시 생성되도록 skeletal bake version을 올렸습니다.',
                result: 'import된 reference skeleton과 skinning matrix가 불일치한 scene bind pose를 따르지 않고 source mesh와 정렬됩니다.',
                code: { context: 'FFbxSkeletonImporter::TryGetFirstMeshBindMatrix()의 cluster bind transform 해석' }
            },
            {
                title: 'Bone picking이 화면에 그린 armature와 일치하지 않음',
                symptom: '가느다란 부분이나 joint를 선택하기 어려웠고, preview gizmo rotation이 선택한 bone의 렌더링된 world orientation과 다를 수 있었습니다.',
                cause: 'picking이 실제 solid armature triangle 대신 distance-to-segment/radius 근사를 사용했고, rotation 합성도 engine의 row-vector BoneComponent × MeshWorld 규약을 따르지 않았습니다.',
                fix: 'armature rendering에 사용한 동일한 body·joint triangle을 ray test하고 BoneComponentTransform.ToMatrix() × MeshWorldMatrix에서 no-scale world quaternion을 추출했습니다.',
                result: 'joint를 포함한 보이는 bone geometry에 대해 클릭이 해석되며, gizmo가 선택 bone의 화면상 world transform을 따릅니다.'
            },
            {
                title: '로드된 material에 texture SRV가 누락된 상태로 남음',
                symptom: 'cache되거나 reload된 skeletal material이 존재해도 texture object 또는 SRV가 복원되지 않아 일부 texture 없이 렌더링될 수 있었습니다.',
                cause: 'material-cache hit가 asset texture assignment를 다시 읽거나 resource 재생성 뒤 cached SRV array를 재구축하지 않고 기존 material을 반환했습니다.',
                fix: 'JSON에 선언된 texture 누락을 감지해 material asset에서 다시 적용하고 cached SRV를 재구성했으며, cache 동기화가 항상 실행되도록 preview texture에도 load 경로를 사용했습니다.',
                result: 'reload 또는 device-resource 재구축 뒤에도 material이 부분 초기화된 cache entry를 유지하지 않고 texture binding을 복구합니다.'
            },
            {
                title: 'CPU skinning이 vertex loop 안에서 mesh를 upload함',
                symptom: '한 번의 skeletal update가 CPU vertex 계산이 끝나기도 전에 immediate context를 반복 획득하고 GPU buffer를 생성하거나 갱신했습니다.',
                cause: 'vertex-buffer update와 MeshBuffer 생성 block이 LOD vertex loop 내부에 있었습니다.',
                fix: '전체 skinned vertex array 계산을 먼저 마친 뒤 context를 한 번만 얻고, loop 밖에서 GPU buffer를 한 번 생성하거나 갱신했습니다.',
                result: 'FSkeletalMeshObjectCPU::Update()가 호출당 한 번의 upload 경로로 완성된 CPU 결과를 전송합니다.',
                code: { context: 'FSkeletalMeshObjectCPU::Update()의 loop 이후 GPU upload' }
            },
            {
                title: 'Morph 변경 시 CPU skinning이 갱신되지 않고 progressive shape를 무시함',
                symptom: 'morph weight를 바꿔도 CPU buffer가 즉시 재구축되지 않았고, 중간 weight가 progressive shape threshold를 따르지 않고 항상 마지막 FBX shape를 스케일했습니다.',
                cause: 'SetMorphTarget()과 ClearMorphTargets()는 data를 dirty로만 표시했고, ApplyMorphTargets()는 FullWeight를 무시한 채 항상 Shapes.back()을 선택했습니다.',
                fix: 'weight setter에서 UpdateSkinnedMeshObject()를 호출하고, 선언된 FullWeight 범위에 따라 인접한 shape-delta set을 보간했습니다.',
                result: 'weight 변경이 렌더링된 CPU-skinned mesh에 반영되고 progressive FBX morph가 작성된 threshold를 따릅니다.',
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
        summary: 'reference skeleton, FBX channel, binary cache validation, bone palette, editor tool, Lua 연동을 중심으로 animation-sequence import·asset pipeline을 구축했습니다.',
        role: 'Animation Pipeline 프로그래머',
        objective: 'skeletal mesh와 독립적으로 animation을 import하고 target skeleton 호환성을 검증하며, 안전하게 cache한 뒤 editor와 runtime system에 제공하는 것이 목표였습니다.',
        contributions: [
            'mesh bone을 reference skeleton으로 refactor하고 transform utility와 binary serialization을 포함한 FBX animation sequence loading을 구현했습니다.',
            'cache source/skeleton/version 검증, bone-match 진단, authored channel sampling, resource 정리를 추가했습니다.',
            'viewer에서 저장하고 editor에 표시하며 component에서 참조·package하고 Lua에 노출할 수 있는 section bone palette와 animation-sequence asset을 도입했습니다.'
        ],
        implementation: [
            'Reference skeleton과 FFbxAnimSequenceImporter',
            'FBX channel sampling, cache identity/version 검증, target-skeleton binding',
            'Section별 Bone Palette, Animation Asset Descriptor, 에디터 Viewer, Component 참조, 패키징, Lua API'
        ],
        flow: 'FBX animation stack → skeleton-matched track → 검증된 binary cache → animation asset → component / GPU bone palette',
        results: [
            '재사용 가능한 animation asset을 skeletal-mesh import에서 분리하고 명시적인 호환성 검사를 추가했습니다.',
            'import와 cache부터 editor inspection, packaging, Lua, component playback까지 같은 asset을 연결했습니다.'
        ],
        evidenceStatus: '작성자 커밋 검증 완료',
        evidenceNote: '저장소 이력에서 HaXX0rBunny 작성 커밋 59건을 확인했으며, 이 가운데 54건은 2026년 5월 16~20일의 non-merge 커밋입니다. 공개 remote 접근도 origin/main을 기준으로 다시 검증했습니다.',
        sourceLabel: 'Week11 작성 커밋 열기',
        troubleshooting: [
            {
                title: '중복된 FBX bone name이 animation을 잘못된 node에 bind함',
                symptom: 'FBX에 같은 bone name을 가진 node가 여러 개 있으면 animation track이 관계없는 node에 bind될 수 있었습니다.',
                cause: 'importer가 name당 node 하나만 저장해 뒤의 duplicate가 앞의 entry를 덮어썼고, name-only lookup은 target skeleton의 parent hierarchy를 고려하지 않았습니다.',
                fix: 'name별 모든 candidate node를 저장하고 target bone의 parent부터 재귀적으로 해석한 뒤 해당 parent의 descendant 후보를 우선했습니다. duplicate path와 hierarchy mismatch도 log에 남겼습니다.',
                result: 'track binding이 reference-skeleton hierarchy를 따르며, 모호한 파일은 마지막 duplicate를 조용히 고르는 대신 진단 가능한 정보를 제공합니다.',
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
                title: 'Mirrored FBX transform이 triangle winding을 뒤집음',
                symptom: 'negative-determinant node 또는 bind transform을 가진 mesh가 뒤집혀 보이거나 back-face culling에서 face가 사라질 수 있었습니다.',
                cause: 'control point에는 global·geometric transform을 적용했지만, transform이 handedness를 바꾸는 경우에도 triangle index를 항상 I0, I1, I2로 저장했습니다.',
                fix: 'upper 3 × 3 determinant가 음수인지 감지해 I1과 I2를 교환하고 stale cache 무효화를 위해 static·skeletal binary version을 올렸습니다.',
                result: 'static, skinned, rigid-attached mesh가 변환된 coordinate system과 일치하는 winding을 저장합니다.',
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
        title: 'Particle Runtime·Editor 시스템',
        summary: 'editor와 render pass에서 사용하는 particle 기반 구조, runtime emitter API, asset workflow, LOD compilation, renderer property, event dispatch를 구축했습니다.',
        role: 'Particle System·Tool 프로그래머',
        objective: 'asset으로 작성하고 runtime용으로 compile하며 전용 pass에서 렌더링할 수 있고, emitter 내부 상태를 노출하지 않고 확장 가능한 particle architecture를 만드는 것이 목표였습니다.',
        contributions: [
            'base particle system, module, emitter instance, component integration, event를 구현하고 module 실행 순서를 문서화했습니다.',
            'emitter state를 runtime access API 뒤로 캡슐화하고 asset persistence, deep-copy ownership, cache 관리, actor 배치를 추가했습니다.',
            'compiled LOD data와 renderer-property abstraction을 도입하고 editor validation, smoke-test rendering, runtime event dispatch를 연결했습니다.'
        ],
        implementation: [
            'ParticleSystem·ParticleEmitterInstance, Module·Component·Event 구조, Dynamic Render Data',
            '에디터 Asset 작업 흐름, Emitter·LOD 제어, 유효성 검증, 복제, 직렬화, Cache 소유권',
            'Compiled LOD 바인딩, Renderer Property, Particle Render Pass, Runtime Listener, Event Dispatch 정책'
        ],
        flow: 'Particle Asset → Compiled LOD·Renderer Property 구성 → Emitter 시뮬레이션 → Render Pass·Runtime Event 처리',
        results: [
            'base runtime부터 authoring, placement, validation, rendering까지 이어지는 particle system을 구축했습니다.',
            'editor-facing data와 compiled runtime binding을 분리하고 legacy TypeData ownership을 제거했습니다.'
        ],
        evidenceStatus: '작성자 커밋 검증 완료',
        evidenceNote: '저장소 이력에서 HaXX0rBunny 작성 커밋 30건을 확인했으며, 이 가운데 23건은 2026년 5월 23~27일의 non-merge 커밋입니다. 공개 remote 접근도 origin/main을 기준으로 다시 검증했습니다.',
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
                title: '편집 후 runtime emitter가 stale compiled LOD pointer를 유지함',
                symptom: 'particle editor에서 module, renderer type, LOD data를 바꿔도 preview와 배치된 component에 안정적으로 반영되지 않았고, 기존 emitter instance가 이전 compiled data를 참조할 수 있었습니다.',
                cause: 'CacheEmitterModuleInfo가 CompiledLODData를 재구축했지만 runtime emitter instance는 이전 compilation의 pointer와 payload 가정을 유지했습니다.',
                fix: 'CompiledRevision을 추가하고 payload size/stride/render mode 호환성을 검증했으며, contract가 바뀌면 호환 LOD를 다시 bind하거나 emitter instance를 재생성하도록 RefreshTemplateRuntime을 구현했습니다.',
                result: 'runtime instance가 유효하지 않은 compiled binding에 남지 않으면서 editor 변경이 preview와 world component에 전달됩니다.',
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
                title: 'Particle template reference가 저장 가능한 asset reference가 아님',
                symptom: '저장 후 load한 component가 path로 UParticleSystem template을 복원하지 못하거나, 같은 template pointer를 보유하면서 runtime emitter는 0개일 수 있었습니다.',
                cause: 'particle asset에 normalized AssetPath와 resolver 지원이 없었고 Template이 asset reference로 표시되지 않았으며, instance가 비어도 SetTemplate()이 조기 반환했습니다.',
                fix: 'asset path를 저장하고 ResourceManager로 particle reference를 해석하며 Template을 asset reference로 표시하고 emitter instance가 없으면 재구축했습니다.',
                result: '저장된 component reference가 particle asset으로 해석되고 runtime emitter instance를 재구성합니다.',
                code: { context: 'SetTemplate()의 누락된 emitter instance 재생성' }
            },
            {
                title: 'Event dispatch가 event-producing module보다 먼저 실행될 수 있음',
                symptom: '작성 순서에서 EventGenerator가 collision 또는 update module보다 앞서면 같은 frame의 event가 만들어지기 전에 queue를 비울 수 있었습니다.',
                cause: 'CacheModuleLists()가 임의의 module order를 유지했지만 dispatcher인 EventGenerator는 producer 뒤에 실행되어야 합니다.',
                fix: 'event-generator module을 별도로 수집해 다른 모든 update module 뒤에 추가했습니다.',
                result: '모든 compiled LOD에서 event-producing update가 dispatch보다 먼저 완료됩니다.',
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
        theme: 'Understanding Focus and Force in 3D World · Two DOF Techniques',
        title: 'Physics Asset Editor',
        summary: 'skeletal mesh 주변 collision body를 생성·선택·검사·수정하는 physics-asset 편집 workflow를 구현했습니다.',
        role: 'Physics Tool 프로그래머',
        objective: '생성된 skeletal collision body를 viewport selection, transform gizmo, node 관계, collision control, material profile을 갖춘 편집 가능한 asset으로 전환하는 것이 목표였습니다.',
        contributions: [
            'physics-asset editing API, viewport 기반 구조, picking, generation control, humanoid filtering을 추가했습니다.',
            'viewport gizmo editing, view preset, node graph inspection, collision editing을 구현했습니다.',
            'physical-material body profile을 추가하고 axis-mask, alpha, gizmo, shape-type 편집 동작을 수정했습니다.'
        ],
        implementation: [
            'Physics body 생성과 skeletal-bone filtering',
            'Viewport 피킹, Transform Gizmo, View Preset, Shape 편집',
            'Node Graph, Collision 규칙, Physical Material 기반 Body Profile'
        ],
        flow: 'Skeletal mesh → 생성된 physics body → viewport selection / gizmo edit → 저장된 physics asset',
        results: [
            '읽기 전용 collision preview가 아닌 end-to-end physics-asset authoring workflow를 구현했습니다.',
            'generation, inspection, transform editing, collision behavior, physical material을 하나의 tool로 연결했습니다.'
        ],
        evidenceStatus: '작성자 커밋 검증 완료',
        evidenceNote: '저장소에서 HaXX0rBunny 작성 커밋 20건을 확인했으며, 이 가운데 15건은 2026년 6월 1~3일의 non-merge 커밋입니다.',
        sourceLabel: 'Week13 작성 커밋 열기',
        troubleshootingEvidence: [
            {
                kicker: '보존된 runtime trace',
                title: 'physics preview가 drawing에 사용한 생성 body 치수와 bone-space scale을 log로 남겼습니다.',
                summary: 'Git에서 추적하지 않는 이 local Engine.log는 구현 후 실제 runtime artifact입니다. 사례 01의 generated-body inspection 경로를 뒷받침하지만, 이에 대응하는 수정 전 trace나 frame capture는 없습니다.',
                tags: ['실제 runtime log', 'Physics Body 구성', '사례 01'],
                facts: [
                    { label: '기록된 body', value: '6개', detail: 'Pelvis 및 좌우 leg chain' },
                    { label: 'Shape 유형', value: 'Sphyl', detail: '저장된 radius와 length' },
                    { label: 'Bone Scale', value: '1.0000', detail: '보존된 Sample에서 Uniform' }
                ],
                trace: { label: '구현 후 draw trace' },
                method: 'project runtime log에서 physics-draw row를 복구하고, 각 field를 preview draw 경로가 사용한 generated sphyl dimension 및 bone-matrix scale과 대조했습니다.',
                limitations: [
                    'Git에서 추적하지 않는 log는 이를 생성한 정확한 executable 또는 commit을 기록하지 않습니다.',
                    '통제된 비교를 위한 수정 전 trace, screenshot, geometric error measurement가 없습니다.',
                    'sample은 출력된 runtime state를 보여 주며, 시각적 정확성이나 성능 향상을 입증하지 않습니다.'
                ]
            }
        ],
        troubleshooting: [
            {
                title: '생성 body가 일관되지 않은 좌표계를 사용하고 작은 bone influence를 버림',
                symptom: 'physics body의 크기가 맞지 않거나 늘어날 수 있었고, 작은 bone이 걸러질 때 그 bone의 influenced vertex가 활용 가능한 parent body에 반영되지 않았습니다.',
                cause: 'body 생성이 skeletal/global 가정과 bone별 point cloud를 혼용했고, 작은 candidate를 통합하기 전에 넓은 humanoid filter를 적용했습니다.',
                fix: 'candidate vertex를 bone-local space에 유지하고 undersized point cloud를 parent local space로 변환·병합한 뒤 병합된 candidate를 측정했으며, 필요한 경우 구조적으로 필요한 parent body를 강제로 만들었습니다.',
                result: '생성 shape가 skinned mesh volume을 더 잘 따르며 helper 또는 작은 bone도 사용하기 어려운 단독 body를 만들지 않고 geometry에 기여합니다.'
            },
            {
                title: '일반 gizmo axis가 유효하지 않은 shape edit을 노출함',
                symptom: 'sphere radius에 세 개의 독립 axis를 보이거나 capsule에 중복 radius axis를 표시하는 등, physics editor에 중복되거나 의미 없는 scale handle이 나타났습니다.',
                cause: 'viewport가 선택한 physics shape의 자유도를 고려하지 않고 generic gizmo axis mask를 재사용했습니다.',
                fix: 'shape-aware mask를 계산했습니다. sphere에는 사용 가능한 scalar axis 하나를, capsule에는 radius용 X와 length용 Z를 사용하고 현재 orthographic view가 해당 axis를 숨기면 fallback을 적용했습니다. 같은 경로에서 edit alpha도 수정했습니다.',
                result: '표시된 handle이 선택 shape에서 실제로 수정 가능한 parameter에 대응하고 제한된 view에서도 조작 가능합니다.',
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
        theme: 'Final Game Jam · The Stage Is Set. Let the Game Begin!',
        title: 'Final Game 통합·Tool',
        summary: 'Unreal에서 제작한 scene, decal, boss·score UI, game-flow 전환, loading, cutscene, audio를 최종 custom-engine game에 통합했습니다.',
        role: 'Game Flow·Integration 프로그래머',
        objective: '누적된 engine feature와 제작 content를 scene loading·countdown부터 combat UI, scoring, cutscene, ending credit까지 이어지는 일관된 playable flow로 완성하는 것이 목표였습니다.',
        contributions: [
            'boss UI flow를 추가하고 Unreal에서 제작한 Tokyo scene을 import했으며 custom engine용 decal export/import를 구현했습니다.',
            'countdown, scoreboard, score 기록, combo UI, boss·mob HP bar, loading scene, ending credit을 연결했습니다.',
            '2 page·5 cut reveal sequence를 구현하고 asynchronous scene readiness와 동기화했으며, retry skip 동작과 transition별 audio timing·volume을 조정했습니다.'
        ],
        implementation: [
            'Unreal Scene·Decal Exporter/Importer 파이프라인',
            'Lua/RmlUi 기반 게임 흐름, 점수판, 콤보, Boss·Mob HP, 카운트다운, 로딩, 크레딧',
            '5컷 Page/Reveal 상태, 비동기 Load Barrier, Retry 상태 영속화, FMOD Audio Cue'
        ],
        flow: 'Unreal 제작 scene/UI asset → custom import 및 runtime binding → game flow + scoring → cutscene / audio / ending',
        results: [
            'editor에서 제작한 content와 engine system을 최종 playable game sequence로 연결했습니다.',
            'combat, scoring, scene change, retry, cutscene 전반에 걸쳐 사용자에게 보이는 flow와 feedback을 완성했습니다.'
        ],
        evidenceStatus: '작성자 커밋 검증 완료',
        evidenceNote: '저장소에서 HaXX0rBunny 작성 커밋 60건을 확인했으며, 이 가운데 43건은 2026년 6월 6~11일의 non-merge 커밋입니다.',
        sourceLabel: 'Week14 작성 커밋 열기',
        troubleshootingEvidence: [
            {
                kicker: '3단계 RmlUi 캡처 흐름 · working-tree 증거',
                title: '초기 3→2→1 prototype을 filled sweep sector가 있는 5초 countdown으로 발전시켰습니다.',
                summary: '첫 캡처는 PICTURE START Label, Sprocket, Ring, Crosshair, 단일 Sweep Line을 사용한 3→2→1 In-Engine Prototype을 기록합니다. 이후 캡처는 반응형 Guide Geometry를 분리해 확인한 과정과 Grain, Vignette, Filled Sweep Sector가 적용된 5초 Runtime 상태를 보여 줍니다. 화면은 구현 발전 과정을 설명하고, 코드 수준의 근거는 작성 Commit 이력으로 연결합니다.',
                tags: ['실제 UI 캡처', 'RmlUi + Lua', '필름 카운트다운', 'Prototype → 개선'],
                figures: [
                    {
                        stage: '초기 in-engine prototype · 2026-06-08 23:55 KST',
                        alt: 'sepia film strip, sprocket hole, ring, crosshair, single sweep line, Picture Start label, 숫자 3이 표시된 Week14 초기 in-engine film countdown prototype',
                        caption: 'commit 전 working-tree 결과에서 single rotating sweep line과 첫 film-frame 처리를 사용한 초기 3→2→1 presentation이 이미 실행되고 있습니다.'
                    },
                    {
                        stage: 'Layout 분리 진단 · 2026-06-10 17:27 KST',
                        alt: 'responsive outer circle, inner circle, crosshair guide만 표시한 Week14 film countdown UI layout 진단 화면',
                        caption: '이후 진단 화면은 presentation layer에서 responsive center, outer·inner circle, crosshair를 분리해 보여 줍니다.'
                    },
                    {
                        stage: '개선된 runtime 검증 · 2026-06-10 17:38 KST',
                        alt: 'sepia film gate, sprocket hole, grain, sweep arm, Picture Start label, 숫자 5가 표시된 Week14 완성 film countdown UI',
                        caption: '개선된 출력은 digit 5에서 전체 presentation을 복원하고 filled sector, 이동 sprocket, grain, vignette, layered number 처리를 함께 보여 줍니다.'
                    }
                ],
                facts: [
                    { label: '카운트다운 타이밍', value: '3.35 → 5.35 sec', detail: '초기 구현에서 a3006a9까지' },
                    { label: 'Sweep 우회 구현', value: '33 frames', detail: 'fdaa6f7의 raster sector sequence' }
                ],
                trace: { label: 'RmlUi sector-animation 우회 구현' },
                method: '세 캡처에 보이는 Label, Layer Geometry, Countdown 값, Sweep 표현을 작성한 RmlUi 및 Lua 구현 이력과 대조했습니다.',
                limitations: [
                    '초기 캡처는 64e1ed9보다 앞서므로 출력이 이후 commit된 구현과 일치하더라도 당시 uncommitted source diff와 build configuration을 정확히 재구성할 수 없습니다.',
                    '6월 10일 두 캡처 사이에는 commit이 없어 guide geometry만 노출한 일시적인 UI-reload 또는 diagnostic state를 Git으로 재구성할 수 없습니다.',
                    'screenshot에 executable hash가 들어 있지 않습니다. source 대응은 binary attestation이 아니라 보이는 layout과 인접한 작성 이력을 근거로 합니다.',
                    '6월 9일 숫자 2 film frame은 이 engine 출력과 확실하게 연결할 수 없고 작성된 runtime 증거가 아닌 visual reference일 가능성이 있어 제외했습니다.',
                    '2 page·5 cut comic sequence는 6월 11일 a590136에서 추가되었습니다. 이 6월 10일 캡처는 countdown prelude를 입증하며 이후 cutscene page를 입증하지 않습니다.',
                    '시각적 구현 진행만 기록하며 frame-time 또는 loading benchmark는 측정하지 않았습니다.'
                ]
            },
            {
                kicker: 'Week14 씬 배치 완료',
                title: 'Tokyo 레벨의 씬 배치를 완료했습니다.',
                summary: '이 가로형 에디터 화면이 작업자가 확인한 최종 배치 상태입니다. 건물 볼륨, 교통 구조물, 거리 규모 구조가 하나의 씬으로 조립되어 있으며, 다른 에디터 캡처는 아래 트러블슈팅 사례에서 작업 과정으로 분리했습니다.',
                figures: [
                    {
                        stage: '씬 배치 완료',
                        alt: '건물과 교통 구조물, 거리 규모 구조가 정렬된 Week14 Tokyo 최종 씬 배치',
                        caption: '건물 볼륨, 교통 구조물, 거리 규모 구조가 최종 배치된 상태입니다.'
                    }
                ],
                method: '작업자 확인을 기준으로 6월 8일 가로형 viewport를 최종 배치 화면으로 구분했으며, 제공된 이미지의 RGB 픽셀이 사이트에 보존된 파일과 정확히 일치함을 확인했습니다.',
                limitations: [
                    '최종 배치 상태를 보여 주는 화면이지만 실행 파일이나 커밋 hash와 직접 연결되지 않으며, 성능 측정 자료는 아닙니다.'
                ]
            },
            {
                kicker: '사례 02 첨부 · 에디터 작업 과정',
                title: '나머지 캡처는 다른 최종 상태가 아니라 가져온 오브젝트의 배치와 방향을 점검한 과정입니다.',
                summary: '흩어진 초기 배치를 확인하고, 기울어진 Tokyo_Current에서 방향 문제를 진단한 뒤, Tokyo_Verify_Train에서 거리 구조가 바로 서는지 검사했습니다. Transform 수정과 import 완료는 각각 fdaa6f7 diff와 로컬 import 리포트를 별도 근거로 사용합니다.',
                tags: ['작업 과정', 'Scene Import', 'Transform 검증'],
                figures: [
                    {
                        stage: '과정 01 · 흩어진 초기 배치',
                        alt: '배치 완료 전 scene mesh가 에디터 화면 전체에 흩어져 있는 Week14 Tokyo import 과정',
                        caption: 'Import된 건물 모듈과 표면을 하나의 레벨로 조립하는 중인 상태입니다.'
                    },
                    {
                        stage: '과정 02 · 방향 문제 진단',
                        alt: 'transform 검사 중 import된 Tokyo scene이 옆으로 기울어진 모습을 보여 주는 custom engine editor',
                        caption: '기울어진 Tokyo_Current viewport에서 import 방향 문제를 확인했습니다.'
                    },
                    {
                        stage: '과정 03 · 방향 검증',
                        alt: 'Tokyo Verify Train scene에서 바로 선 Tokyo 거리를 보여 주는 custom engine editor',
                        caption: '전용 Tokyo_Verify_Train scene에서 import된 거리 구조가 바로 서는지 확인했습니다.'
                    }
                ],
                facts: [
                    { label: 'Transform 수정', value: 'fdaa6f7', detail: 'Environment Transform 회전 보정' },
                    { label: 'Import 결과', value: 'Actor 5,290개 · 실패 0건', detail: 'Matrix Transform 5,181개 · Mesh·Material·Texture 리소스' }
                ],
                method: '세 장을 과정 자료로 구분하고, import 수치는 로컬 리포트와, environment transform 로직은 fdaa6f7 diff와 대조했습니다.',
                limitations: [
                    '세 장은 camera, scene, 작업 상태가 다르므로 시간순·동일 camera 전후 비교로 사용하지 않습니다.',
                    '실제 검증 과정을 보여 주지만, 특정 실행 파일이 시각 변화나 성능 향상을 만들었다고 이 캡처만으로 주장하지 않습니다.'
                ]
            },
            {
                kicker: '실제 defect 캡처 → Git 근거가 있는 수정',
                title: '눈에 보이는 decal 사각형과 foliage-card 배경의 원인을 mask source와 pre-depth 결함으로 추적했습니다.',
                summary: '첫 캡처는 masked foliage에서 각 leaf card의 투명 영역이 보이는 문제를 기록하고, 두 번째는 사각형 배경을 진단하던 중 선택된 decal을 기록합니다. foliage 수정은 alpha를 고려하지 않는 pre-depth pass에서 masked section을 제외합니다. decal 경로는 먼저 누락된 dependency texture를 복구한 뒤, 항상 opaque인 synthetic alpha channel 대신 실제 grayscale pixel data에서 coverage를 계산합니다.',
                tags: ['실제 defect 캡처', 'Alpha Mask 처리', 'Pre-depth Pass', '사례 03–04'],
                figures: [
                    {
                        stage: 'Foliage 결함 · 2026-06-08 21:28 KST',
                        alt: 'green leaf 주변에 옅은 card 배경이 보이는 masked foliage 수정 전 import된 Tokyo tree',
                        caption: '서로 교차하는 leaf card의 투명 부분이 깨끗한 foliage cutout으로 처리되지 않고 그대로 보입니다.'
                    },
                    {
                        stage: 'Decal 결함 · 2026-06-09 02:20 KST',
                        alt: 'pink marking 주변에 사각형 배경이 보이는 grayscale coverage 수정 전 선택된 Tokyo ground decal',
                        caption: 'projected marking은 표시되지만 사각형 배경 결함을 검사하는 상태입니다. 흰 outline 자체는 editor selection bounds일 수 있습니다.'
                    }
                ],
                facts: [
                    { label: 'Foliage 수정', value: '64e1ed9', detail: 'Pre-Depth Pass에서 Masked Section 제외' },
                    { label: 'Decal 수정 경로', value: 'fdaa6f7 → 0c5ae28', detail: 'Dependency 복구 → Grayscale RGB Coverage 계산' },
                    { label: 'Texture 증거', value: 'Alpha 255 · 100%', detail: 'base RGB pixel의 91.034%가 검은색' }
                ],
                trace: { label: '수정 후 coverage·depth routing' },
                method: '64e1ed9, fdaa6f7, 0c5ae28의 Source 및 Generated HLSL Blob을 비교하고, Import된 PNG Mode와 Pixel Distribution을 조사해 각 경로가 사용한 Mask Source를 확인했습니다.',
                limitations: [
                    '제공된 두 image 모두 수정 전 결함 캡처이며 same-camera 수정 후 screenshot은 보존되지 않았습니다.',
                    '파일에는 Executable 또는 Working-Tree Hash가 없습니다. 캡처는 눈에 보이는 결함을 기록하고, 작성된 Diff가 코드 수준의 원인과 수정 근거를 제공합니다.',
                    'decal의 경우 fdaa6f7은 누락된 texture dependency를 복구했지만 최종 배경 제거는 0c5ae28입니다. 앞선 변경만으로 수정이 완료되었다고 보면 부정확합니다.',
                    'decal 캡처에 editor selection bounds가 포함되어 있어 흰 outline 자체를 rendering defect로 주장하지 않습니다.',
                    '시각적 정확성 수정이며 frame-time benchmark는 기록하거나 추정하지 않았습니다.'
                ]
            },
            {
                kicker: '커밋 기준 생성 데이터 A/B',
                title: 'blocking-volume matrix 11개 모두가 centimeter 크기에서 export field와 같은 meter scale로 바뀌었습니다.',
                summary: 'tracked Tokyo manifest를 adfb597^와 adfb597에서 직접 parse할 수 있습니다. scalar scale 값은 그대로인 반면 모든 world-matrix basis 크기는 정확히 100분의 1로 줄어, 사례 02에 대한 결정적인 수정 전·후 fixture를 제공합니다.',
                tags: ['정확한 Git blob', '11개 volume', '사례 02'],
                facts: [
                    { label: '검증한 Matrix', value: '11 / 11', detail: '동일 Record · Scalar Scale 유지' },
                    { label: '단위 보정', value: '÷ 100', detail: 'Centimeter를 Meter로 변환' }
                ],
                trace: { label: '대표 generated record' },
                method: 'tracked JSON blob 두 버전을 parse해 blocking-volume record 11개를 짝짓고 scalar scale field와 world-matrix basis 크기를 비교했습니다.',
                limitations: [
                    '렌더링된 viewport 비교가 아니라 generated-data 검증입니다.',
                    'manifest 내 unit 일치를 입증하지만 collision 동작은 importer와 runtime이 matrix를 올바르게 소비하는지에도 달려 있습니다.',
                    '이 수정에 대한 frame-time 또는 collision-query benchmark는 기록되지 않았습니다.'
                ]
            },
            {
                kicker: '커밋 기준 Manifest A/B',
                title: 'fdaa6f7 변경에서 scene export에 완전한 light transform과 decal record 95개가 추가되었습니다.',
                summary: 'tracked Tokyo scene·material manifest를 fdaa6f7^와 fdaa6f7에서 parse할 수 있습니다. 사례 02·03의 environment-transform 및 decal-dependency 작업에 대해 정확한 generated-output 비교를 제공합니다.',
                tags: ['정확한 Git blob', 'Scene Manifest 검증', '사례 02–03'],
                facts: [
                    { label: 'Light World Matrix 수', value: '0 → 2', detail: 'DirectionalLight와 SkyLight' },
                    { label: 'Decal Record 수', value: '0 → 95', detail: 'Tokyo.scene.json' }
                ],
                trace: { label: '생성된 manifest delta' },
                method: 'tracked manifest 두 개의 parent·fix blob을 각각 parse한 뒤 worldMatrix가 있는 environment record, decal record, material, texture 수를 집계했습니다.',
                limitations: [
                    'manifest delta는 exporter가 record를 출력했음을 입증하지만 시각적 정확성은 importer·renderer 동작에도 달려 있습니다.',
                    'material 또는 texture 수가 늘어난 사실만으로 모든 dependency가 의미적으로 올바르게 분류되었다고 입증할 수 없습니다.',
                    '이 자료는 dependency-recovery 단계입니다. 최종 grayscale decal coverage 보정은 0c5ae28에서 별도로 검증합니다.',
                    'same-camera로 렌더링한 decal 또는 shadow 비교는 보존되지 않았습니다.'
                ]
            },
            {
                kicker: '보존된 packaged-runtime trace',
                title: 'transition은 cutscene 뒤에 대기했고 Tokyo_Current가 준비된 뒤에만 commit했습니다.',
                summary: 'Git에서 추적하지 않는 이 GameBuild log는 wait-to-commit 변경 3일 뒤 기록된 실제 수정 후 runtime artifact입니다. 사례 01의 asynchronous sequencing을 직접 실행한 결과입니다.',
                tags: ['실제 packaged 실행', '비동기 로딩', '사례 01'],
                facts: [
                    { label: 'Transition 순서', value: 'Wait → Ready → Commit', detail: 'Tokyo_Current Packaged 실행' }
                ],
                trace: { label: '수정 후 transition sequence' },
                method: '보존된 packaged-run log를 시간순으로 읽고 wait, readiness, commit message를 a590136에서 도입한 state transition과 대조했습니다.',
                limitations: [
                    'Git에서 추적하지 않는 log는 이후 local artifact이며 정확한 executable hash를 포함하지 않습니다.',
                    '성공한 수정 후 실행 trace이며 시간을 측정한 before/after benchmark는 아닙니다.',
                    '이에 대응하는 수정 전 package log는 보존되지 않았습니다.'
                ]
            },
            {
                kicker: '보존된 persistence 출력',
                title: '완료된 run time이 clear-score storage와 scoreboard에 동일하게 기록되었습니다.',
                summary: '실제 local save file 두 개가 같은 최종 write timestamp와 동일한 85.688초 결과를 보유합니다. 완료된 run 이후 사례 01에서 사용하는 persistence output을 직접 검증합니다.',
                tags: ['실제 save file', '점수 영속화', '사례 01'],
                facts: [
                    { label: '저장된 값', value: '85.688 sec', detail: 'LastClearScore.txt = GameFlowScoreboard.tsv' }
                ],
                trace: { label: '일치하는 persisted value' },
                method: 'save output 두 개의 값과 last-write timestamp를 비교하고 scoreboard에 같은 완료 run time이 포함된 것을 확인했습니다.',
                limitations: [
                    '파일은 수정 후 persistence output을 입증하며 원래 asynchronous-reset 실패를 입증하지 않습니다.',
                    'save artifact는 Git에서 추적하지 않는 local state이며 정확한 executable hash를 식별하지 않습니다.',
                    '수정 전 output pair는 보존되지 않았습니다.'
                ]
            },
        ],
        troubleshooting: [
            {
                title: '비동기 scene flow에서 clear score가 사라짐',
                symptom: 'scene transition이 in-memory timer state를 초기화한 뒤 clear 또는 credit 화면에서 방금 완료한 combat time을 복구하지 못할 수 있었습니다.',
                cause: 'score 표시는 combatElapsedTime과 local Lua state가 multithreaded scene transition 뒤에도 유지된다는 가정에 의존했습니다.',
                fix: 'clear time을 한 번 capture해 LastClearScore.txt에 저장하고 combat timer를 사용할 수 없으면 저장 값을 다시 읽었으며, recordClearScore의 중복 삽입을 막았습니다.',
                result: 'scene state가 재구축된 뒤에도 clear·credit UI가 완료된 run time을 일관되게 표시합니다.'
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
                title: 'Grayscale decal texture를 alpha가 있는 RGBA로 처리함',
                symptom: 'import된 Tokyo decal 주변에 의도한 도로·지면 marking 바깥의 사각형 배경이 보였고, 직접 texture parameter가 없는 decal chain은 초기에는 dependency texture 없이 도착할 수 있었습니다.',
                cause: 'exporter가 처음에는 parent/material-function dependency 내부 texture를 놓쳤습니다. 이를 복구한 뒤에도 import된 base·mask PNG는 stored alpha가 없는 Gray8이었고, RGBA 변환 시 모든 pixel alpha가 255가 되어 .a sampling이 전체 projection을 opaque로 만들었습니다.',
                fix: 'fdaa6f7에서 제한된 dependency texture를 복구하고, 0c5ae28에서 saturate(R+G+B)로 decal coverage를 만들고 별도 grayscale mask는 .r에서 읽었으며 projected UV를 decal Y/Z plane에 맞게 수정했습니다.',
                result: '검은 background pixel은 coverage 0으로 clip되고 작성된 marking과 grayscale mask 값은 보존됩니다.',
                code: { context: '0c5ae28^ → 0c5ae28에서 생성된 decal opacity 출력' }
            },
            {
                title: 'Masked foliage가 leaf-card 전체 배경을 pre-depth에 기록함',
                symptom: 'import된 tree crown에서 정상적인 녹색 잎 주변에 옅은 사각형 또는 다각형 card 배경이 보였고, 양면 shadow coverage가 일부 방향에서 사라질 수 있었습니다.',
                cause: '생성된 surface shader는 leaf를 올바르게 alpha clip했지만 앞선 generic pre-depth submission은 material mask를 실행하지 않아 card silhouette 전체를 기록했습니다. shadow culling도 section material의 two-sided raster state를 무시했습니다.',
                fix: 'generic pre-depth pass에서 opacity-masked section을 건너뛰어 alpha-tested surface pass가 visible coverage를 담당하게 하고, two-sided shadow material에는 SolidNoCull을 선택했으며 의도한 culling behavior로 directional caster submission을 복원했습니다.',
                result: '투명한 leaf-card 영역이 같은 unmasked pre-depth coverage에 기여하지 않고 foliage shadow submission이 material별 two-sided state를 따릅니다.',
                code: { context: 'FDrawCommandBuilder::BuildCommandForProxy()의 opacity-mask pre-depth 제외' }
            },
            {
                title: 'Film sweep가 RmlUi로 깔끔하게 표현 가능한 shape 범위를 넘음',
                symptom: '초기 countdown 구현은 조명된 원형 sweep을 각각 회전한 사각형 element 24개로 근사해, coarse CSS-style primitive 모음에 시각 표현이 묶였습니다.',
                cause: '사용 가능한 RmlUi 경로는 positioned box, image, transform을 지원했지만 film-leader wedge용 filled circular-sector primitive를 안정적으로 제공하지 않았습니다.',
                fix: '투명 sector frame 33개를 생성해 겹친 RmlUi image로 배치하고 normalized sweep progress를 frame index로 변환해 선택 frame만 노출했습니다. Lua는 계속 digit, sprocket, grain, flash, timing을 제어했습니다.',
                result: 'responsive central layout에 맞춰 크기를 조정하고 runtime widget에서 재현할 수 있는 결정적인 filled-sector animation을 구현했습니다.',
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
            { label: 'Tokyo 게임 흐름·Scoreboard' },
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
            title: 'SkySphere의 배경 패스 순서·깊이 상태·노멀 규약 불일치',
            symptom: 'SkySphere가 장면 geometry를 가리거나 depth write를 끄면 사라졌고, scale에 따라 gradient가 일그러졌습니다.',
            cause: '일반 opaque mesh와 같은 순서로 정렬했고 depth-write option이 depth test까지 껐으며, shader가 scale이 반영된 안쪽 방향 normal을 사용했습니다.',
            fix: 'Depth test는 유지하고 depth write만 끈 background geometry로 분리한 뒤 normalized world direction에서 gradient를 계산했습니다.',
            result: 'SkySphere가 항상 장면 뒤에 남고 scale과 camera 변화에도 gradient가 안정적으로 유지됩니다.'
        }
    },
    '03': {
        1: {
            title: 'Picking ray와 동일 깊이 highlight의 pixel·depth 규칙 불일치',
            symptom: 'Cursor가 얇은 geometry를 놓치고, 선택 gizmo가 base pass와 같은 depth에 있을 때 highlight가 사라졌습니다.',
            cause: 'Ray는 pixel 모서리에서 시작했고 highlight pass는 strict less-than depth comparison을 사용했습니다.',
            fix: 'Half-pixel offset으로 pixel center를 sampling하고 highlight pass가 동일 depth를 허용하도록 변경했습니다.',
            result: 'Cursor에 보이는 geometry와 picking·selection feedback이 일치합니다.'
        }
    },
    '04': {
        1: {
            title: 'OBJ 입력 경로에 versioned binary cache와 indexed geometry build가 필요했음',
            symptom: 'Cold load마다 text OBJ를 다시 parse했고 face-corner 확장 과정에서 vertex와 material search가 중복됐습니다.',
            cause: '검증 가능한 binary format이 없었고 importer가 모든 corner를 다시 만들면서 material을 선형 탐색했습니다.',
            fix: 'Version이 포함된 .dasset header와 binary reader/writer를 추가하고, indexed vertex를 deduplicate하면서 material name을 직접 mapping했습니다.',
            result: 'Baked asset은 text parsing을 건너뛰고 imported mesh는 불필요한 vertex·material 작업을 줄입니다.'
        },
        2: {
            title: 'Static Mesh reload의 dependency 손실과 asset cache의 GPU ownership 잔존',
            symptom: 'Scene reload 뒤 mesh·UV Scroll 상태가 사라질 수 있었고, shutdown 이후에도 SRV와 cached asset의 ownership이 남았습니다.',
            cause: 'Serialized component가 모든 asset dependency를 복원하지 않았고 cache entry 삭제 전에 GPU reference를 명시적으로 해제하지 않았습니다.',
            fix: 'Load 과정에서 mesh dependency와 UV state를 복원하고, 명시적인 teardown path에서 SRV와 asset cache를 정리했습니다.',
            result: 'Static Mesh scene이 동일하게 reload되고 graphics resource가 shutdown 시점에 해제됩니다.'
        }
    },
    '05': {
        0: {
            title: '고밀도 장면 검색의 확장성과 말단 노드 데이터 유실',
            symptom: '오브젝트 5만 개 배치에서 피킹 비용이 커졌고, SceneGraph가 최대 깊이에 도달하면 일부 오브젝트가 검색 결과에서 빠질 수 있었습니다.',
            cause: '검색이 triangle과 오브젝트를 전수 검사하는 경로로 돌아갔고, 말단 leaf가 남은 오브젝트 전체를 보관하지 않았습니다.',
            fix: '공간 broad phase로 검색 범위를 먼저 줄이고, 말단 leaf에 남은 오브젝트를 모두 저장했습니다.',
            result: 'SceneGraph의 깊이 제한에서 오브젝트를 누락하지 않으면서 고밀도 장면의 상호작용 검색 비용을 줄였습니다.'
        }
    },
    '06': {
        0: {
            title: 'Height Fog의 sky reconstruction 불일치와 far-depth 비정상 값',
            symptom: 'Sky와 geometry 사이에 수평선 경계가 생겼고 먼 depth pixel이 불안정하거나 검게 변했습니다.',
            cause: 'Sky는 상수 fog branch를 사용했고 homogeneous reconstruction은 잘못된 W로 나누거나 non-finite 값을 전달할 수 있었습니다.',
            fix: 'InvViewProj로 sky ray를 복원해 geometry와 같은 fog function을 적용하고 W·ray·exponent·최종 출력을 검증했습니다.',
            result: 'Sky와 geometry가 끊기지 않는 유한한 fog response를 공유합니다.'
        },
        1: {
            title: 'Fog·Decal blend가 destination alpha를 덮어 geometry를 투명하게 만듦',
            symptom: 'Projected RGB는 정상인데 shared render target의 alpha가 오염되어 가까운 mesh가 editor에서 투명해졌습니다.',
            cause: 'Blend state가 scene의 기존 alpha를 보존하지 않고 source opacity를 destination alpha에 기록했습니다.',
            fix: 'Fog·Decal의 RGB contribution만 blend하고 destination alpha는 유지하도록 변경했습니다.',
            result: 'Editor composition과 mesh opacity를 손상하지 않고 fog와 decal이 표시됩니다.'
        }
    },
    '07': {
        0: {
            title: 'Shader reload의 cache invalidation과 GPU resource lifecycle 불일치',
            symptom: 'Include shader 변경을 놓칠 수 있었고 cache teardown이 살아 있는 resource를 남긴 채 entry를 제거했습니다.',
            cause: 'Dependency tracking과 cache invalidation이 불완전했고 entry 제거와 resource release가 연결되지 않았습니다.',
            fix: 'Include dependency를 추적해 영향받은 variant를 rebuild하고 cache entry 삭제 전에 소유 GPU resource를 해제했습니다.',
            result: 'Hot reload가 dependency 변경을 반영하고 shutdown이 shader resource를 확정적으로 정리합니다.'
        }
    },
    '08': {
        2: {
            title: 'Point Shadow PCF 우회와 Cube Face 경계 불연속',
            symptom: 'Point Light가 요청된 filter path를 건너뛰었고 cube face를 넘는 sample에서 shadow seam이 나타났습니다.',
            cause: 'Lighting path가 PCF를 우회했고 모든 tap이 중심 sample의 cube-face basis를 재사용했습니다.',
            fix: 'Point Shadow를 PCF path로 연결하고 각 offset direction마다 cube face와 UV를 다시 계산했습니다.',
            result: 'Cube-map face 경계를 넘어도 Point Shadow filtering이 연속적으로 유지됩니다.'
        }
    },
    '09': {
        2: {
            title: '파괴된 Component가 Overlap·Tick Queue에 dangling reference로 남음',
            symptom: 'Frame 도중 파괴된 component를 overlap peer나 queued tick function이 다시 참조할 수 있었습니다.',
            cause: 'Raw-pointer collection이 owner보다 오래 남았고 teardown이 모든 양방향 관계를 해제하지 않았습니다.',
            fix: 'Teardown에서 overlap peer를 상호 해제하고 queued tick 실행 전에 owner lifetime을 검증했습니다.',
            result: '파괴된 object에 stale overlap 또는 tick callback이 전달되지 않습니다.'
        }
    },
    '11': {
        1: {
            title: 'FBX Animation cache key에 source stack과 target skeleton 식별자가 없었음',
            symptom: '형식상 유효한 cache file이 다른 animation stack이나 다른 skeleton용 데이터를 반환할 수 있었습니다.',
            cause: 'Cache contract가 stack identity와 안정적인 target-skeleton signature를 포함하지 않았습니다.',
            fix: 'Source stack·importer version·skeleton identity를 검증 정보에 포함하고 일치하지 않는 cache entry를 거부했습니다.',
            result: 'Clip과 target skeleton이 일치할 때만 cached animation을 재사용합니다.'
        },
        3: {
            title: 'FBX Track import의 parent-basis 변환과 누락 Scale Channel 합성',
            symptom: 'Imported bone이 authored pose에서 벗어나고 scale curve가 없는 bone에 인공적인 scale animation이 생겼습니다.',
            cause: 'Local transform이 서로 다른 parent basis를 사용했고 missing scale key를 animated value처럼 처리했습니다.',
            fix: 'Parent와 child transform을 같은 runtime basis로 변환하고 authored scale channel이 없으면 identity scale을 유지했습니다.',
            result: 'Runtime track이 인공적인 scale motion 없이 authored transform hierarchy를 보존합니다.'
        }
    },
    '12': {
        0: {
            title: 'Particle Asset의 editor cache·runtime data·복제 child graph 간 ownership 공유',
            symptom: '한 particle asset의 edit·duplicate가 stale compiled pointer를 남기거나 shared child object를 통해 다른 asset에 영향을 줄 수 있었습니다.',
            cause: 'Asset graph·editor cache·runtime representation의 ownership 경계가 겹쳤고 module을 shallow copy했습니다.',
            fix: 'Asset이 deep-cloned child graph를 소유하고 runtime component는 별도로 compile된 LOD data를 사용하도록 분리했습니다.',
            result: 'Duplicated asset이 독립적으로 동작하고 edit 이후 runtime pointer를 안전하게 갱신할 수 있습니다.'
        }
    },
    '14': {
        0: {
            title: 'Async Scene Flow에 transition·persistence·retry 상태 분리가 필요했음',
            symptom: '완료 점수가 사라지고 target scene 준비 전에 cutscene이 끝나거나 retry에서 최초 진입 연출이 다시 실행될 수 있었습니다.',
            cause: 'Scene transition·persistence·readiness·첫 진입과 retry 동작을 하나의 transient flow에 결합했습니다.',
            fix: 'Transition 전에 score를 저장하고 Wait → Ready → Commit 상태를 도입했으며 첫 진입과 retry path를 분기했습니다.',
            result: 'Score가 scene 전환 뒤에도 유지되고 준비 완료 뒤에만 scene을 commit하며 retry는 onboarding 연출을 건너뜁니다.'
        },
        1: {
            title: 'Unreal Scene Import의 centimeter scale과 orientation convention 혼용',
            symptom: 'Blocking Volume matrix scale이 100배로 export됐고 environment·light actor가 잘못된 방향으로 배치됐습니다.',
            cause: 'Scalar field는 meter인데 world matrix는 centimeter를 유지했고 imported actor type 전반에서 Unreal basis conversion이 불완전했습니다.',
            fix: 'Export matrix를 meter로 통일하고 environment·light transform에 명시적인 basis·rotation conversion을 적용했습니다.',
            result: 'Blocking Volume 11개의 matrix가 scalar scale과 일치하고 imported environment actor가 예상 orientation을 사용합니다.'
        }
    }
};
