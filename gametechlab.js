const labWeeks = [
    {
        week: '01',
        theme: '1st Game Jam',
        title: 'Jungle Brick Break',
        summary: 'Built core brick, stage, input, effects, score, and rendering systems while resolving lifetime and collision issues in the first game-jam project.',
        role: 'Gameplay & Systems Programmer',
        objective: 'Complete a playable game while structuring game objects, stage progression, input, collision, feedback, and persistent scoring into one reliable loop.',
        contributions: [
            'Refactored blocks around UGameObject, added rectangle rendering, and improved stage/block logic and collision handling.',
            'Added Windows Runtime gamepad support and encapsulated gamepad/input processing.',
            'Implemented particles, high-score flow, flash/light feedback, ball rendering updates, and double-free/memory fixes.'
        ],
        implementation: [
            'UGameObject/UBlock structure, stage data, block damage, and collision response',
            'Windows.Gaming.Input gamepad manager and input lifecycle',
            'Particle effects, score/high-score updates, flash timer, ball and rectangle rendering'
        ],
        flow: 'Gamepad / keyboard input → stage and object update → collision / damage → effects, score, and frame render',
        technologies: ['C++', 'Windows Runtime', 'Gamepad', 'Collision', 'Particles'],
        results: [
            'Completed the first playable game-jam milestone.',
            'Created a practical baseline for the following 3D engine work.'
        ],
        evidenceStatus: 'Verified author commits',
        evidenceNote: 'Authored diffs connect the UGameObject/UBlock structure, stage and collision loop, gamepad lifecycle, and score-feedback systems to the personal implementation scope.',
        troubleshooting: [
            {
                title: 'Double free during scene teardown',
                symptom: 'Releasing or restarting the game scene could free block objects twice and terminate with a heap error.',
                cause: 'The same block pointers were treated as owned by both UGameObjectList and the separate stageblocks collection. UGameObjectList already destroyed them, but UGameScene::Release() iterated stageblocks and deleted them again.',
                fix: 'Kept UGameObjectList as the single owner. Scene teardown now clears stageblocks only as a non-owning lookup collection and no longer deletes its pointers.',
                result: 'Scene shutdown follows one explicit ownership path and avoids the duplicated delete operation.',
                code: {
                    file: 'JungleEntranceExam/UGameScene.cpp',
                    context: 'UGameScene::Release()',
                    language: 'C++',
                    snippet: `for (UGameObject* Object : UGameObjectList)
{
    if (Object != nullptr) {
        delete Object;
    }
}

UGameObjectList.clear();
stageblocks.clear();`
                },
                commit: { hash: '75a5da5' }
            },
            {
                title: 'High score persisted before the final life was lost',
                symptom: 'Losing the penultimate life could update the high-score file even though the player still had one life remaining.',
                cause: 'SubHealth() decremented health and then compared the decrement value with the new health value. The transition from two lives to one already satisfied the condition and triggered persistence too early.',
                fix: 'Removed score persistence from the generic health-decrement function and called HightScoreUpdate() only from the terminal game-over branch.',
                result: 'Ordinary life loss only changes health; the score file is updated when the game actually reaches game over.',
                code: {
                    file: 'JungleEntranceExam/UGameScene.cpp',
                    context: 'UGameScene::Update() game-over branch',
                    language: 'C++',
                    snippet: `else
{
    gameManager->SubHealth(1);
    StopAllBall();
    HightScoreUpdate(gameManager->GetTotalScore());
    ShowGameOverModal = true;
}`
                },
                commit: { hash: '22b50d2' }
            },
            {
                title: 'Projectile column lookup could leave stage bounds',
                symptom: 'A bullet outside the stage horizontal span could produce an invalid stageblocks index during the upper or lower traversal.',
                cause: 'CurCol was derived from world X and used in CurRow × CurrentStageCol + CurCol without first validating the calculated column.',
                fix: 'Corrected the grid-space offset and rejected columns below zero or at/above CurrentStageCol before indexing the block array.',
                result: 'Out-of-stage projectiles skip block traversal instead of reading beyond the stage collection.',
                code: {
                    file: 'JungleEntranceExam/UGameScene.cpp',
                    context: 'Upper/lower projectile block traversal',
                    language: 'C++',
                    snippet: `int CurCol = static_cast<int>(
    (CurLocation.x - (-1.0f + StageData.START_X + 0.035f))
    / StageData.STEP_X);

if (CurCol < 0 || CurCol >= CurrentStageCol)
    continue;`
                },
                commit: { hash: '515c9b4' }
            }
        ],
        commitRefs: [
            { hash: 'a344571', label: 'Stage, block, and collision logic' },
            { hash: '1d96e8c', label: 'Windows Runtime gamepad support' },
            { hash: '43e933b', label: 'Particle system' },
            { hash: 'd3f7a43', label: 'High-score system' }
        ],
        featured: true
    },
    {
        week: '02',
        theme: 'Break Into 3D',
        title: '3D Engine Foundations',
        summary: 'Established the D3D11 frame pipeline, CPU-side MVP transforms, editor UI, enhanced input and camera control, and the SkySphere rendering path.',
        role: 'Rendering & Input Systems Programmer',
        objective: 'Move from the Week01 game loop to a reusable 3D renderer and editor with explicit graphics resources, camera math, input actions, and a visible 3D environment.',
        contributions: [
            'Initialized the D3D11 device, flip-discard swap chain, render-target/depth views, frame clear/present path, shaders, and pipeline constants.',
            'Implemented CPU-side MVP math, inverse/aspect handling, ImGui console/property/stat panels, and resize-safe perspective behavior.',
            'Built enhanced-input actions/modifiers/triggers, separated editor camera pawn/controller, and implemented SkySphere rendering and depth state.'
        ],
        implementation: [
            'D3D11 device, swap chain, RTV/DSV, shader binding, frame begin/end, and MVP pipeline',
            'ImGui editor layout, viewport/client-size correction, inverse matrix, perspective divide, and aspect-ratio maintenance',
            'Enhanced Input actions/modifiers/triggers, editor camera controller, and SkySphere shader/depth state'
        ],
        flow: 'Input action → editor camera → world/view/projection constants → D3D11 draw → SkySphere and editor viewport',
        technologies: ['C++', 'DirectX 11', 'ImGui', '3D Math', 'Enhanced Input'],
        results: [
            'Established the engine’s initial 3D rendering path.',
            'Preserved the sky-sphere implementation in a publicly accessible branch.'
        ],
        evidenceStatus: 'Verified author commits',
        evidenceNote: 'The Week02 repository history contains the renderer, input, editor-camera, and SkySphere commits attributed to HaXX0rBunny.',
        sourceUrl: 'https://github.com/DDing-Ho/Jungle3_Week2_Team1/commits/main/?author=HaXX0rBunny',
        sourceLabel: 'Open authored Week02 commits',
        troubleshooting: [
            {
                title: 'Projection distortion after resizing the editor window',
                symptom: 'The 3D view stretched after a window resize because the projection continued to use the previous client dimensions.',
                cause: 'The resize path recreated renderer resources but did not consistently propagate the new width-to-height ratio to the camera. A minimized or zero-height client area also risked an invalid division.',
                fix: 'Connected the window resize callback to renderer resizing, recalculated aspect as width / height only when height is positive, and updated the camera projection state from the new client size.',
                result: 'Perspective proportions remain stable across resize events, including the guarded minimized-window case.',
                code: {
                    file: 'Editor/UI/EditorUI.cpp',
                    context: 'CEditorUI::SetupWindow() resize callback',
                    language: 'C++',
                    snippet: `if (Core->GetScene() && Core->GetScene()->GetCamera())
{
    // 분모가 0이 되는 것을 방지
    float NewAspect = (H > 0) ? static_cast<float>(W) / static_cast<float>(H) : 1.0f;
    Core->GetScene()->GetCamera()->SetAspectRatio(NewAspect);
}`
                },
                commit: { hash: '542c9f4', url: 'https://github.com/DDing-Ho/Jungle3_Week2_Team1/commit/542c9f4afbb0bbad013d5dff8aa0fb22a154942e' }
            },
            {
                title: 'SkySphere was sorted with ordinary opaque geometry',
                symptom: 'The SkySphere could be submitted in an opaque order that competed with foreground drawing instead of behaving as a dedicated background pass.',
                cause: 'Sky draws shared the ordinary opaque sort path even though the sphere must be placed at far depth and submitted after foreground geometry.',
                fix: 'Forced the sky clip-space depth near the far plane with z = w × 0.9999, marked it as depth-write-disabled, and sorted that state after regular opaque draws.',
                result: 'The sky draw is ordered as background work and its vertices remain at the far end of clip space.',
                commit: { hash: 'deba29b', url: 'https://github.com/DDing-Ho/Jungle3_Week2_Team1/commit/deba29b8d211ce53ff1cb84244fefe11ad459bcf' }
            },
            {
                title: 'Disabling sky depth writes also disabled depth testing',
                symptom: 'Even when sorted after opaque geometry, the sky could pass over foreground pixels because its state no longer tested the existing depth buffer.',
                cause: 'Both bDisableDepthTest and bDisableDepthWrite selected OverlayDepthState, which used DepthEnable = FALSE and the ALWAYS comparison.',
                fix: 'Added a separate SkyDepthState with testing enabled, writes disabled, and LESS comparison, while keeping OverlayDepthState for true overlays.',
                result: 'The sky can fill untouched background pixels without changing depth or covering foreground geometry.',
                code: {
                    file: 'Engine/Source/Renderer/Renderer.cpp',
                    context: 'CRenderer::ExecuteCommands()',
                    language: 'C++',
                    snippet: `ID3D11DepthStencilState* DesiredDepthStencilState = nullptr;
if (Cmd.bDisableDepthTest)
    DesiredDepthStencilState = OverlayDepthState;
else if (Cmd.bDisableDepthWrite)
    DesiredDepthStencilState = SkyDepthState;`
                },
                commit: { hash: '37dbe40', url: 'https://github.com/DDing-Ho/Jungle3_Week2_Team1/commit/37dbe40d15385d268c41db10a42a00395e817d43' }
            },
            {
                title: 'Sky gradient used scaled, inside-facing normals',
                symptom: 'The sky and ground colors could appear reversed, and the gradient interpolation factor could leave its intended range.',
                cause: 'The pixel shader used Input.Normal.z directly even though the interpolated normal inherited the sphere scale and faced inward.',
                fix: 'Normalized the interpolated normal and negated its Z component before selecting the sky or ground gradient branch.',
                result: 'The gradient uses a unit-length factor and maps the inside-facing upper hemisphere to the intended sky color.',
                code: {
                    file: 'Engine/Shaders/SkyPixelShader.hlsl',
                    context: 'main()',
                    language: 'HLSL',
                    snippet: `float3 N = normalize(Input.Normal);
float T = -N.z;

if (T > 0.0f)
    Color = lerp(HorizonColor, SkyColor, T);
else
    Color = lerp(HorizonColor, GroundColor, -T);`
                },
                commit: { hash: '557f15e', url: 'https://github.com/DDing-Ho/Jungle3_Week2_Team1/commit/557f15e17ef52099526de484460ab04c36dc8965' }
            }
        ],
        commitRefs: [
            { hash: 'dab1430', label: 'D3D11 renderer and swap chain', url: 'https://github.com/DDing-Ho/Jungle3_Week2_Team1/commit/dab1430db7a865dc404da23f81a2d10d57137987' },
            { hash: '66def18', label: 'CPU-side MVP pipeline', url: 'https://github.com/DDing-Ho/Jungle3_Week2_Team1/commit/66def186229926b3cd039eb5bd9637ea190fd630' },
            { hash: 'f9942a8', label: 'Enhanced Input modifiers', url: 'https://github.com/DDing-Ho/Jungle3_Week2_Team1/commit/f9942a8b3c8b9f28410a0dca26ea6b19fe5c75c5' },
            { hash: '24329ba', label: 'SkySphere rendering', url: 'https://github.com/DDing-Ho/Jungle3_Week2_Team1/commit/24329badc2eb3f49732c6a71eeddd19fbe9a591e' }
        ]
    },
    {
        week: '03',
        theme: 'Atlas · Billboard · Batch Line · Bounding Box',
        title: 'Editor & Scene Infrastructure',
        summary: 'Built engine infrastructure around FName, the Outliner, show flags, visibility, UUID picking, scene serialization, world/level ownership, and camera separation.',
        role: 'Engine & Editor Programmer',
        objective: 'Support the weekly rendering utilities with stable naming, object visibility, selection, serialization, scene ownership, and editor camera architecture.',
        contributions: [
            'Implemented FName/FNameTable and an Outliner with show flags, actor visibility, billboard visibility, and selection/highlight safeguards.',
            'Added UUID management and picking fixes, including half-pixel NDC correction and billboard behavior across scene reloads.',
            'Replaced direct JSON actor serialization with FArchive, wrapped scenes in World/PersistentLevel/StreamingLevel, and split camera management from scene dependencies.'
        ],
        implementation: [
            'FName pool/table and general UUID management',
            'Outliner, show flags, actor/billboard visibility, highlighting, and picking',
            'FArchive object serialization, World and level ownership, renderer collection, and camera separation'
        ],
        flow: 'World / level objects → FName + UUID identity → Outliner visibility / picking → serialized scene and renderer collection',
        technologies: ['C++', 'ImGui', 'FName', 'FArchive', 'Outliner', 'Picking'],
        results: [
            'Created reusable renderer utilities instead of one-off visual tests.',
            'Improved the ability to inspect later scene and rendering systems.'
        ],
        evidenceStatus: 'Verified author commits',
        evidenceNote: 'The Week03 scope begins after its Week02 ancestor and follows the preserved public Week03 author history.',
        sourceUrl: 'https://github.com/HaXX0rBunny/Week3_Team5_DinoEngine/commits/main/?author=HaXX0rBunny',
        sourceLabel: 'Open authored Week03 commits',
        troubleshooting: [
            {
                title: 'Billboard components disappeared after scene reload',
                symptom: 'Actor billboards that worked before saving could no longer resolve their owner after loading the scene, so editor visualization and selection became inconsistent.',
                cause: 'TObjectPtr cached the actor’s pre-load UUID. The loader then restored a different serialized UUID, leaving the component owner reference keyed to an identity that no longer existed.',
                fix: 'Saved and restored component UUIDs, reassigned the component owner after UUID restoration, removed stale UUID-map entries during pending kill, and made the last-issued UUID advance monotonically.',
                result: 'Actor/component identity remains coherent across save and reload, and editor billboards reappear with their correct owner.',
                code: {
                    file: 'Engine/Source/Scene/Scene.cpp',
                    context: 'UScene::LoadSceneFromFile()',
                    language: 'C++',
                    snippet: `for (UActorComponent* Comp : Actor->GetComponents())
{
    if (Comp)
    {
        Comp->SetOwner(Actor);
    }
}
++ActorIndex;`
                },
                commit: {
                    label: 'Evidence chain',
                    hash: '83df98f → c969e89',
                    url: 'https://github.com/HaXX0rBunny/Week3_Team5_DinoEngine/commit/c969e895cd5288317ad923ee46ba879512616d20'
                }
            },
            {
                title: 'Heap corruption during console-variable enumeration',
                symptom: 'Enumerating registered names through a temporary aggregate array could reach an invalid allocator header and corrupt the heap.',
                cause: 'The active failing path copied values into an intermediate TArray across allocator-sensitive code, while a freed or invalid header was not rejected early enough.',
                fix: 'First disabled the failing GetAllNames call in 1d8996d, then replaced aggregate-return enumeration with callbacks and added the allocator-header guard in 631198a.',
                result: 'The two-commit sequence removes the risky temporary ownership transfer and rejects invalid headers before deallocation bookkeeping proceeds.',
                commit: {
                    label: 'Fix sequence',
                    hash: '1d8996d → 631198a',
                    url: 'https://github.com/HaXX0rBunny/Week3_Team5_DinoEngine/commit/631198ad4157bec0ac9d3b7ad97940525134c790'
                }
            },
            {
                title: 'Editor billboard intercepted actor picking',
                symptom: 'Clicking an actor could select its UUID billboard helper instead of the actor represented by that helper.',
                cause: 'The picking pass treated UUUIDBillboardComponent as ordinary selectable scene geometry.',
                fix: 'Excluded UUID billboard components from the picking candidate path while preserving their editor visualization.',
                result: 'The visual helper remains visible, but selection resolves to the intended scene actor.',
                commit: { hash: '96b5305', url: 'https://github.com/HaXX0rBunny/Week3_Team5_DinoEngine/commit/96b5305a8818076243a4869e8873b089d64f6258' }
            },
            {
                title: 'Preview viewport was selected unconditionally',
                symptom: 'The normal scene world could receive the preview viewport client, including a possible null preview client.',
                cause: 'A stray semicolon terminated the preview-world if statement, so the following block ran regardless of its conditions.',
                fix: 'Removed the semicolon and kept the assignment inside the world-type and client-validity guard.',
                result: 'Preview routing now occurs only for a preview scene with an available preview viewport client.',
                code: {
                    file: 'Editor/Source/FEditorEngine.cpp',
                    context: 'SyncViewportClient()',
                    language: 'C++',
                    snippet: `if (ActiveSceneContext
    && ActiveSceneContext->WorldType == ESceneType::Preview
    && PreviewViewportClient)
{
    TargetViewportClient = PreviewViewportClient.get();
}`
                },
                commit: { hash: '80a79c3', url: 'https://github.com/HaXX0rBunny/Week3_Team5_DinoEngine/commit/80a79c3202074dbf8bad40fdeaf17a9f9bb4d63d' }
            },
            {
                title: 'Picking ray missed the pixel center',
                symptom: 'Picking rays carried a systematic half-pixel displacement, making fine selection disagree with the pixel the user clicked.',
                cause: 'Integer screen coordinates were normalized as pixel boundaries rather than the centers of their corresponding pixels.',
                fix: 'Added a 0.5-pixel offset to both axes before converting screen coordinates to normalized device coordinates.',
                result: 'Each integer screen position now generates a ray through the center of the selected pixel.',
                code: {
                    file: 'Editor/Source/Picking/Picker.cpp',
                    context: 'CPicker::ScreenToRay()',
                    language: 'C++',
                    snippet: `const float NdcX =
    (2.0f * (ScreenX + 0.5f) / ScreenWidth) - 1.0f;
const float NdcY =
    1.0f - (2.0f * (ScreenY + 0.5f) / ScreenHeight);`
                },
                commit: { hash: '512fc94', url: 'https://github.com/HaXX0rBunny/Week3_Team5_DinoEngine/commit/512fc94d5d826dd111149a24770ceca8d5a9b7fd' }
            },
            {
                title: 'Equal-depth gizmo highlight was rejected',
                symptom: 'The hover or highlight pass could disappear when it was drawn at exactly the same depth as the original gizmo.',
                cause: 'Depth-state creation hardcoded LESS and ignored the comparison requested by the material.',
                fix: 'Added a configurable DepthFunc to render-state options and JSON parsing, then configured the gizmo material to use LessEqual.',
                result: 'Highlight fragments at the original gizmo depth are eligible to pass without disabling depth testing.',
                code: {
                    file: 'Engine/Source/Renderer/MaterialManager.cpp',
                    context: 'Render-state JSON parsing',
                    language: 'C++',
                    snippet: `if (RenderStatesJson.contains("DepthFunc"))
{
    FString Func = RenderStatesJson["DepthFunc"].get<std::string>();
    if (Func == "LessEqual")
        depthStencilOption.DepthFunc = D3D11_COMPARISON_LESS_EQUAL;
    else if (Func == "Less")
        depthStencilOption.DepthFunc = D3D11_COMPARISON_LESS;
}`
                },
                commit: { hash: 'dd8d133', url: 'https://github.com/HaXX0rBunny/Week3_Team5_DinoEngine/commit/dd8d133bf76599a76fa6a61dacad4064cc6d8a61' }
            }
        ],
        commitRefs: [
            { hash: '119e660', label: 'FName and FNameTable', url: 'https://github.com/HaXX0rBunny/Week3_Team5_DinoEngine/commit/119e660648c4799db9687663919c6c6248177fbf' },
            { hash: '76d3367', label: 'Outliner window', url: 'https://github.com/HaXX0rBunny/Week3_Team5_DinoEngine/commit/76d3367ea42b6e1594e5a048d448501ad9e759f1' },
            { hash: 'c600d3a', label: 'FArchive object serialization', url: 'https://github.com/HaXX0rBunny/Week3_Team5_DinoEngine/commit/c600d3a0f91369f0d46c0b8d0043e230180cf059' },
            { hash: '96b5305', label: 'UUID picking', url: 'https://github.com/HaXX0rBunny/Week3_Team5_DinoEngine/commit/96b5305a8818076243a4869e8873b089d64f6258' }
        ]
    },
    {
        week: '04',
        theme: 'OBJ Import',
        title: 'OBJ Asset Pipeline & Binary Cooking',
        summary: 'Built the engine path from OBJ/MTL parsing to UStaticMesh assets, registry-backed lookup, editor use, and versioned .dasset binary reload.',
        role: 'Asset Pipeline & Engine Programmer',
        objective: 'Turn external OBJ files into reusable engine assets and avoid reparsing unchanged text geometry on every load.',
        contributions: [
            'Separated OBJ/MTL parsing into FObjImporter and represented imported geometry through FObjInfo, FStaticMeshRenderData, and UStaticMesh.',
            'Implemented TObjectIterator, FObjManager, FAssetManager/FAssetRegistry integration, material sections, and texture-path resolution.',
            'Implemented versioned .dasset cook/load with source timestamp and FNV-1a hash validation, then connected component, material, texture, and UV-state serialization.',
            'Team scope: ObjViewerPanel and the multi-viewport SWindow foundation. Personal scope: OBJ/MTL importing, UStaticMesh integration, binary cooking, and serialization.'
        ],
        implementation: [
            'OBJ/MTL token parsing, material sections, indexed vertex construction, and static-mesh bounds',
            'UStaticMesh object ownership, TObjectIterator traversal, asset registry lookup, and runtime mesh/texture caches',
            'FAssetCooker binary header, versioning, source validation, .dasset save/load, and stale-cache recooking',
            'Static-mesh picking plus scene serialization for mesh, material, texture, and per-slot UV-scroll state'
        ],
        flow: 'OBJ + MTL → FObjInfo → indexed mesh build → UStaticMesh / asset registry → .dasset cook → validated binary reload',
        technologies: ['C++', 'DirectX 11', 'OBJ/MTL', 'Binary I/O', 'Asset Registry', 'ImGui'],
        results: [
            'Converted external geometry from a one-off text input into an engine-managed static-mesh asset workflow.',
            'Added a deterministic binary reload path that reuses valid cooked data and recooks when source content or the format version changes.',
            'Preserved the original Week04 commit graph and all 16 upstream branches without rewriting commit hashes.'
        ],
        evidenceStatus: 'Original Week04 author commits verified',
        evidenceNote: 'Across the preserved range from Week03 snapshot c7e30e4e to Week04 main 1d193e53, author, diff, and blame evidence connects the OBJ/MTL importer, UStaticMesh integration, versioned .dasset cooking, and serialization to the personal implementation scope.',
        sourceUrl: 'https://github.com/HaXX0rBunny/Week3_Team5_DinoEngine/tree/week04/main',
        sourceLabel: 'Open preserved Week04 source and history',
        troubleshooting: [
            {
                title: 'Korean and other non-ASCII asset paths failed to open reliably',
                symptom: 'OBJ, MTL, texture, and cooked-asset paths could fail when the project or asset path contained Korean characters.',
                cause: 'File access mixed UTF-8 strings, std::filesystem narrow conversions, and .string() reconstruction, so Windows path encoding was not handled consistently.',
                fix: 'Migrated importer, cooker, property, and primitive file-access call sites to the existing FPaths::ToWide UTF-8/UTF-16 helper and rebuilt relative OBJ/MTL paths without converting them back through a narrow filesystem string.',
                result: 'Importer, cooker, property comparison, and primitive loading now pass Windows-native wide paths to file APIs while retaining normalized engine paths.',
                code: {
                    file: 'Engine/Source/Mesh/ObjImporter.cpp',
                    context: 'FObjImporter::ParseObj()',
                    language: 'C++',
                    snippet: `std::ifstream File(
    FPaths::ToWide(FPaths::ToAbsolutePath(FilePath)));

FString AbsPath = FPaths::ToAbsolutePath(FilePath);
size_t Slash = AbsPath.rfind('/');
FString ObjDir = (Slash != std::string::npos)
    ? AbsPath.substr(0, Slash) : AbsPath;
MtlPath = ObjDir + "/" + MtlFileName;`
                },
                commit: { hash: 'c2cb6e5', url: 'https://github.com/HaXX0rBunny/Week3_Team5_DinoEngine/commit/c2cb6e548e0147de6f4c631b88183ae9e09b9269' }
            },
            {
                title: 'Cold loads had no validated binary alternative to OBJ parsing',
                symptom: 'A mesh not already present in the runtime cache had to pass through raw OBJ import, with no cooked representation or reliable stale-data check.',
                cause: 'Raw vertex/index/section data and source identity were not stored together in a versioned binary asset format.',
                fix: 'Added FAssetCooker and a .dasset header containing magic, format version, source timestamp, and FNV-1a source hash; unchanged sources use binary load while invalid data is recooked.',
                result: 'The loader rejects wrong or outdated binary data and bypasses OBJ parsing when the validated cooked asset is current.',
                code: {
                    file: 'Engine/Source/Asset/AssetCooker.cpp',
                    context: 'FAssetCooker::SaveCookedStaticMesh()',
                    language: 'C++',
                    snippet: `FCookedAssetHeader Header{};
Header.Magic = DINO_COOKED_MAGIC;
Header.Version = COOKED_STATIC_MESH_VERSION;
Header.AssetType = static_cast<uint32>(
    ECookedAssetType::StaticMesh);
Header.SourceHash = ComputeFileHash(AbsSource);
Header.SourceTimestamp = GetFileTimestamp(AbsSource);`
                },
                commit: { hash: 'a14c7f7', url: 'https://github.com/HaXX0rBunny/Week3_Team5_DinoEngine/commit/a14c7f77c86d923fd78cc138de2212d79519cd14' }
            },
            {
                title: 'OBJ cooking duplicated face-corner vertices and repeated material searches',
                symptom: 'Each parsed face corner became a new render vertex even when position, normal, and UV were identical, and material lookup contained a duplicate nested loop.',
                cause: 'The cooker appended vertices linearly without an indexed-vertex key and searched the same material collection twice per section.',
                fix: 'Introduced a hash/equality key over position, normal, and UV, reused existing indices, and reduced material resolution to one loop with an early exit.',
                result: 'Equivalent face corners share an index, and each section resolves its material in a single pass.',
                code: {
                    file: 'Engine/Source/Mesh/ObjImporter.cpp',
                    context: 'FObjImporter::Cook()',
                    language: 'C++',
                    snippet: `auto It = UniqueVertices.find(V);
if (It != UniqueVertices.end())
{
    MeshData->Indices.push_back(It->second);
}
else
{
    uint32 NewIndex = static_cast<uint32>(
        MeshData->Vertices.size());
    MeshData->Vertices.push_back(V);
    MeshData->Indices.push_back(NewIndex);
    UniqueVertices[V] = NewIndex;
}`
                },
                commit: { hash: 'c5677ef', url: 'https://github.com/HaXX0rBunny/Week3_Team5_DinoEngine/commit/c5677ef45dd7247f9b3777e55d903998b8e51efc' }
            },
            {
                title: 'Imported UStaticMesh actors could not be selected',
                symptom: 'Triangle picking worked for legacy primitive-backed components but skipped static meshes stored through the new mesh-component path.',
                cause: 'The picker continued only when UPrimitiveComponent::GetPrimitive() returned a legacy CPrimitiveBase instance.',
                fix: 'Kept the legacy path and added a UMeshComponent fallback that obtains FMeshData directly from the component before triangle intersection.',
                result: 'Both legacy primitives and imported UStaticMesh components participate in the same triangle-picking pass.',
                code: {
                    file: 'Editor/Source/Picking/Picker.cpp',
                    context: 'FPicker::PickActor()',
                    language: 'C++',
                    snippet: `FMeshData* Mesh = nullptr;
if (PrimitiveComponent->GetPrimitive())
    Mesh = PrimitiveComponent->GetPrimitive()->GetMeshData();
else if (PrimitiveComponent->IsA(
    UMeshComponent::StaticClass()))
    Mesh = static_cast<UMeshComponent*>(
        PrimitiveComponent)->GetMeshData();`
                },
                commit: { hash: '178e8f0', url: 'https://github.com/HaXX0rBunny/Week3_Team5_DinoEngine/commit/178e8f03427001283f1639faa2b06b4ec126886e' }
            },
            {
                title: 'Reloaded scenes lost mesh-component dependencies and UV state',
                symptom: 'A scene reload could reconstruct an actor without restoring its component flags, material/texture dependencies, or per-slot UV-scroll settings.',
                cause: 'FArchive initially lacked the required string-array and float/state coverage, and component classes did not serialize their dependent asset properties end to end.',
                fix: 'Extended FArchive and component Serialize functions, restored textures after mesh/material creation, and saved each slot’s UVEnabled and UVSpeed values.',
                result: 'Saved scenes can reconstruct the static-mesh asset relationship and reapply material, texture, and UV-scroll state in dependency order.',
                code: {
                    file: 'Engine/Source/Component/StaticMeshComponent.cpp',
                    context: 'UStaticMeshComponent::Serialize()',
                    language: 'C++',
                    snippet: `FString EnabledKey = "UVEnabled_" + std::to_string(i);
FString SpeedKey = "UVSpeed_" + std::to_string(i);

bool bEnabled = IsUVScrollEnabled(i);
FVector2 Speed = GetUVScrollSpeed(i);
FVector SpeedVec3(Speed.X, Speed.Y, 0.0f);
Ar.Serialize(EnabledKey, bEnabled);
Ar.Serialize(SpeedKey, SpeedVec3);`
                },
                commit: {
                    label: 'Serialization sequence',
                    hash: '1a6dbc3 → def0d49 → ac13b14',
                    url: 'https://github.com/HaXX0rBunny/Week3_Team5_DinoEngine/commit/ac13b1404b566ee7c84fa7e9bb3cbece3e8a3a42'
                }
            },
            {
                title: 'Texture SRVs and asset caches retained GPU ownership at shutdown',
                symptom: 'Static-mesh texture assignment added an extra COM reference, while cached SRVs and meshes had no explicit renderer-shutdown cleanup path.',
                cause: 'Texture ownership was incremented in both the asset manager handoff and the component, and renderer teardown did not clear the engine caches before releasing the D3D11 device.',
                fix: 'Removed the redundant component AddRef, added FAssetManager::ClearCache to release cached SRVs and clear mesh/texture maps, and invoked primitive/asset cache cleanup before context and device release.',
                result: 'COM reference ownership and cache teardown are explicit, and GPU-facing caches are released before renderer shutdown.',
                code: {
                    file: 'Engine/Source/Asset/AssetManager.cpp',
                    context: 'FAssetManager::ClearCache()',
                    language: 'C++',
                    snippet: `for (auto& Pair : LoadedTextures)
{
    if (Pair.second)
        Pair.second->Release();
}
LoadedTextures.clear();
LoadedMeshes.clear();`
                },
                commit: { hash: 'c24e24b', url: 'https://github.com/HaXX0rBunny/Week3_Team5_DinoEngine/commit/c24e24b7a525e2c9a705d30c85ddabfdff43f909' }
            }
        ],
        commitRefs: [
            { hash: 'e97bf4a', label: 'OBJ/MTL importer, FObjInfo, and TObjectIterator', url: 'https://github.com/HaXX0rBunny/Week3_Team5_DinoEngine/commit/e97bf4aaa914b8643717c5942d5c62b533855406' },
            { hash: 'd877a18', label: 'FObjManager and UStaticMesh foundation', url: 'https://github.com/HaXX0rBunny/Week3_Team5_DinoEngine/commit/d877a18bc00f8445d219ebb204e3e26f22a60b24' },
            { hash: 'a14c7f7', label: 'Versioned .dasset cooking and loading', url: 'https://github.com/HaXX0rBunny/Week3_Team5_DinoEngine/commit/a14c7f77c86d923fd78cc138de2212d79519cd14' },
            { hash: 'c2cb6e5', label: 'Unicode asset-path handling', url: 'https://github.com/HaXX0rBunny/Week3_Team5_DinoEngine/commit/c2cb6e548e0147de6f4c631b88183ae9e09b9269' },
            { hash: 'c5677ef', label: 'Indexed-vertex and material-loop correction', url: 'https://github.com/HaXX0rBunny/Week3_Team5_DinoEngine/commit/c5677ef45dd7247f9b3777e55d903998b8e51efc' },
            { hash: '178e8f0', label: 'Static-mesh picking integration', url: 'https://github.com/HaXX0rBunny/Week3_Team5_DinoEngine/commit/178e8f03427001283f1639faa2b06b4ec126886e' },
            { hash: 'ac13b14', label: 'Mesh/material/texture/UV serialization', url: 'https://github.com/HaXX0rBunny/Week3_Team5_DinoEngine/commit/ac13b1404b566ee7c84fa7e9bb3cbece3e8a3a42' },
            { hash: 'c24e24b', label: 'GPU and asset-cache cleanup', url: 'https://github.com/HaXX0rBunny/Week3_Team5_DinoEngine/commit/c24e24b7a525e2c9a705d30c85ddabfdff43f909' }
        ]
    },
    {
        week: '05',
        theme: "2nd Game Jam · It's Pie Time",
        title: 'Octahedral Impostor Optimization',
        summary: 'Selected octahedral impostors for a 50,000-object optimization challenge and integrated the technique into the team engine.',
        role: 'Rendering Optimization Programmer',
        objective: 'Replace expensive repeated mesh rendering with a direction-aware proxy representation suitable for a dense object scene.',
        contributions: [
            'Proposed octahedral impostors as the optimization strategy for the 50,000-object comparison.',
            'Implemented render-state caching, state sorting, proxy-collision picking, sub-mesh BVH, and data-oriented StructuredBuffer rendering before the impostor path.',
            'Added hierarchical FSceneComponent transforms with dirty flags, then implemented octahedral atlas baking, billboard reconstruction, parallax, and runtime proxy rendering.'
        ],
        implementation: [
            'Render-state cache, state sorting, proxy collision, sub-mesh BVH, and data-oriented structured-buffer fetch',
            'Hierarchical transforms, dirty flags, AABB updates, column-major GPU data, and DirectXMath SIMD helpers',
            'Directional atlas baking, octahedral direction mapping, parallax, billboard reconstruction, and proxy shading'
        ],
        flow: 'Dense mesh scene → optimized transforms / culling → octahedral atlas bake → view-direction proxy render',
        technologies: ['C++', 'HLSL', 'DirectX 11', 'Impostor', 'BVH', 'DOD'],
        results: [
            'Applied a renderer-level optimization to the dense-object challenge.',
            'Preserved deterministic 50,000- and 64,000-object workloads for repeatable comparison.'
        ],
        evidenceStatus: 'Verified author commits',
        evidenceNote: 'Authored history connects the sub-mesh BVH, StructuredBuffer instancing, hierarchical transforms, atlas baking, and runtime impostor path to the personal scope; the public game-jam repository preserves the integrated engine state.',
        sourceUrl: 'https://github.com/HaXX0rBunny/Week5_Team4_Gamejam',
        sourceLabel: 'Open integrated game-jam repository',
        troubleshootingEvidence: [
            {
                caseId: 'impostor-bake-framing',
                kicker: 'Output attached to the Case 03 fix',
                title: 'b3f0a6c is the first inspected revision with complete directional captures; 2960b5b preserves them after the matrix-upload cleanup.',
                summary: 'The failure blob at ec931251 has 149 of 256 cells below 5% non-black coverage. The authored sequence corrected camera side (ee8d71a), bake state (5dd2281), orthographic extent (d1b7e7a), vertex-derived bounds and pole-safe camera basis (b3f0a6c), then row-major matrix upload (2960b5b). The images show the failed endpoint and the completed directional bake after those five corrections.',
                figures: [
                    {
                        stage: 'Failure output · ec931251',
                        src: 'Assets/images/gametechlab/evidence/week05-atlas-before-ec931251.png',
                        alt: 'Committed octahedral impostor atlas whose directional cells mostly contain narrow apple fragments',
                        caption: 'Most directional cells contain only thin or collapsed fragments of the source mesh.',
                        fit: 'contain'
                    },
                    {
                        stage: 'Verified descendant output · 2960b5b',
                        src: 'Assets/images/gametechlab/evidence/week05-atlas-after-2960b5b.png',
                        alt: 'Committed octahedral impostor atlas containing complete apple silhouettes across a sixteen by sixteen directional grid',
                        caption: 'Complete apple silhouettes are preserved across the directional grid.',
                        fit: 'contain'
                    }
                ],
                facts: [
                    { label: 'Sparse cells (<5%)', value: '149 / 256 → 0 / 256', detail: 'Failure blob → displayed descendant blob' }
                ],
                method: 'The displayed files match Git blobs 6c8769c0 (ec931251) and a6c40959 (2960b5b) byte-for-byte. Both are 2048 × 2048 RGB PNGs. Each image was divided into 256 cells of 128 × 128 pixels; a pixel was counted as non-black when RGB differed from (0, 0, 0). The b3f0a6c baker diff and its ancestry to 2960b5b were verified separately.'
            },
            {
                placement: 'result',
                kicker: 'Local runtime observation',
                title: 'Full Mesh and Impostor rendering were compared with the same 50,000-object scene.',
                summary: 'The HUD captures record Full Mesh and Impostor rendering on the same PC, and the Impostor CSV adds a 4,481-frame mean-frame-time sample.',
                tags: ['Actual runtime captures', '50,000 objects', 'Single-sample comparison'],
                figures: [
                    {
                        stage: 'Full Mesh capture',
                        src: 'Assets/images/gametechlab/evidence/week05-runtime-full-mesh.png',
                        alt: 'PerformanceEngine rendering fifty thousand full apple meshes with the runtime HUD visible',
                        caption: 'The full-mesh path rendering the preserved 50,000-object scene.'
                    },
                    {
                        stage: 'Impostor capture',
                        src: 'Assets/images/gametechlab/evidence/week05-runtime-impostor.png',
                        alt: 'PerformanceEngine rendering fifty thousand apple impostors with the runtime HUD visible',
                        caption: 'The Impostor path rendering the same preserved scene.'
                    }
                ],
                facts: [
                    { label: 'Workload', value: '50,000 objects', detail: '25k apple + 25k bitten apple' },
                    { label: 'Frame time', value: '6.62 → 3.21 ms', detail: 'Full Mesh → Impostor HUD; Impostor log mean 2.033 ms over 4,481 frames' },
                    { label: 'Draw calls', value: '10,725 → 2', detail: 'Full Mesh → Impostor' }
                ],
                trace: {
                    label: 'Impostor-only frame log',
                    file: 'BenchmarkLogs/20260821_215607_summary.txt',
                    snippet: `TotalFrames: 4481
TotalRuntimeMs: 9108.893800
AverageFrameMs: 2.032781
TotalPickCount: 0
AdapterName: NVIDIA GeForce RTX 5060
Resolution: 1280x720`
                },
                method: 'Release x64 at 1280 × 720. Source configuration disables VSync and pins the main thread to affinity bit 2. The Impostor CSV was recorded on 2026-08-21; the two HUD captures were preserved on 2026-08-22.',
                hardwareLabel: 'Capture PC',
                hardware: 'Intel Core i7-14700 · NVIDIA GeForce RTX 5060 8 GB (driver 596.36) · 32 GB RAM · Windows 11'
            }
        ],
        troubleshooting: [
            {
                id: 'dense-scene-scaling',
                title: 'Dense-scene picking and per-object submission cost',
                symptom: 'The 50,000-object challenge amplified CPU work from testing mesh triangles and updating draw data object by object.',
                cause: 'Picking traversed every triangle in a sub-mesh, and repeated object constants were submitted through a per-object path that did not scale with the dense scene.',
                fix: 'Built a sub-mesh BVH to reject non-intersecting branches and moved world/tint instance data into a StructuredBuffer addressed by an instance index.',
                result: 'The renderer performs hierarchical candidate rejection and batches repeated instance data instead of repeating the full per-object path.',
                commit: { hash: 'a4595f6' }
            },
            {
                title: 'Recursive dirty-transform update caused stack overflow',
                symptom: 'Updating a dirty FSceneComponent world transform could recurse indefinitely and overflow the stack.',
                cause: 'The dirty flag remained set while UpdateComponentToWorld() entered code that consulted the same dirty state, causing the update path to call itself again.',
                fix: 'Cleared bIsWorldTransformDirty before entering UpdateComponentToWorld(), and centralized dependent AABB refresh work in OnUpdateWorldTransform().',
                result: 'A transform change is evaluated once, then its bounds are refreshed from the completed world transform without re-entering the update.',
                code: {
                    file: 'PerformanceEngine/Source/Scene/SceneComponent.cpp',
                    context: 'FSceneComponent::GetComponentToWorld()',
                    language: 'C++',
                    snippet: `if (bIsWorldTransformDirty)
{
    bIsWorldTransformDirty = false;
    UpdateComponentToWorld();
}
return ComponentToWorld;`
                },
                commit: { hash: 'c7d381e' }
            },
            {
                id: 'impostor-bake-framing',
                title: 'Bake camera transform clipped directional atlas captures',
                symptom: 'In the albedo atlas committed at ec931251, 149 of the 256 cells contained less than 5% non-black pixels and showed narrow apple fragments instead of a complete object view.',
                cause: 'The WIP bake path framed the mesh with mesh-provided bounds, a custom FMatrix::MakeLookAt transform, and an orthographic projection that did not produce stable full-object coverage across the octahedral directions.',
                fix: 'In b3f0a6c, recomputed min/max bounds from mesh vertices, used the largest half-extent with 20% padding, derived a pole-safe up basis, and built the left-handed view and orthographic projection with DirectXMath.',
                result: 'b3f0a6c is the first inspected commit with complete directional captures. The displayed descendant atlas at 2960b5b keeps every cell above 50% non-black coverage, while the same-scene Full Mesh/Impostor comparison records runtime output and timing.',
                code: {
                    file: 'PerformanceEngine/Source/Renderer/ImpostorBaker.cpp',
                    context: 'CalculateCameraTransform() and vertex-derived bake bounds',
                    language: 'C++',
                    snippet: `// Bake(): derive bounds from the source vertices.
FVector MinB(1e30f, 1e30f, 1e30f);
FVector MaxB(-1e30f, -1e30f, -1e30f);
for (const auto& V : InMesh->GetVertices()) {
    MinB.X = std::min(MinB.X, V.Position.X);
    MinB.Y = std::min(MinB.Y, V.Position.Y);
    MinB.Z = std::min(MinB.Z, V.Position.Z);
    MaxB.X = std::max(MaxB.X, V.Position.X);
    MaxB.Y = std::max(MaxB.Y, V.Position.Y);
    MaxB.Z = std::max(MaxB.Z, V.Position.Z);
}

FVector BoundsCenter = (MaxB + MinB) * 0.5f;
FVector Extents = (MaxB - MinB) * 0.5f;
float BoundsRadius = std::max({ Extents.X, Extents.Y, Extents.Z });

// CalculateCameraTransform(): frame each octahedral direction.
float SafeRadius = BoundsRadius * 1.2f;
float CameraDistance = SafeRadius * 2.0f + 10.0f;

FVector EyePosition = BoundsCenter + (CameraDir * CameraDistance);
FVector UpGuide(0.0f, 1.0f, 0.0f);
if (std::abs(CameraDir.Y) > 0.999f)
    UpGuide = FVector(0.0f, 0.0f, 1.0f);
FVector Right = FVector::CrossProduct(UpGuide, CameraDir);
if (Right.SizeSquared() < 1e-6f) {
    UpGuide = FVector(0.0f, 0.0f, 1.0f);
    Right = FVector::CrossProduct(UpGuide, CameraDir);
}
Right.Normalize();
FVector TrueUp = FVector::CrossProduct(CameraDir, Right);
TrueUp.Normalize();

DirectX::XMVECTOR Eye = DirectX::XMVectorSet(
    EyePosition.X, EyePosition.Y, EyePosition.Z, 1.0f);
DirectX::XMVECTOR At = DirectX::XMVectorSet(
    BoundsCenter.X, BoundsCenter.Y, BoundsCenter.Z, 1.0f);
DirectX::XMVECTOR Up = DirectX::XMVectorSet(
    TrueUp.X, TrueUp.Y, TrueUp.Z, 0.0f);
DirectX::XMMATRIX View = DirectX::XMMatrixLookAtLH(Eye, At, Up);
float OrthoSize = SafeRadius * 2.0f;
float NearZ = std::max(0.1f, CameraDistance - SafeRadius);
float FarZ = CameraDistance + SafeRadius;
DirectX::XMMATRIX Proj = DirectX::XMMatrixOrthographicLH(
    OrthoSize, OrthoSize, NearZ, FarZ);`
                },
                commit: { hash: 'b3f0a6c' }
            },
            {
                title: 'SceneGraph dropped objects at maximum depth',
                symptom: 'Dense objects occupying the same octant could disappear from the picking candidate list once subdivision reached depth eight.',
                cause: 'A terminal leaf stored only one PrimitiveIndex. When the maximum depth was reached with several remaining indices, the leaf did not retain the complete set.',
                fix: 'Changed leaves to store every remaining primitive index and emit the entire collection during traversal.',
                result: 'All primitives assigned to a maximum-depth leaf remain available to the picking pass.',
                code: {
                    file: 'PerformanceEngine/Source/Scene/SceneGraph.cpp',
                    context: 'Terminal leaf creation and traversal',
                    language: 'C++',
                    snippet: `if (Indices.size() <= 1 || Depth >= 8)
{
    Nodes[GroupIndex].PrimitiveIndices = Indices;
    return GroupIndex;
}

for (int32 Idx : Node.PrimitiveIndices)
    OutCandidates.push_back(Idx);`
                },
                commit: { hash: '8afa838' }
            },
            {
                title: 'GPU culling was hard-limited to 50,000 objects',
                symptom: 'Scenes above 50,000 primitives could exceed fixed instance and visibility resource capacity while the compute shader ignored higher indices.',
                cause: 'CPU buffers, SRV/UAV element counts, staging storage, and the HLSL boundary check all used the literal value 50000.',
                fix: 'Added growable culling resources and passed the actual primitive count to the compute shader instead of using a fixed scene limit.',
                result: 'Culling resources expand to the required object count and shader dispatch terminates at the scene’s real primitive count.',
                code: {
                    file: 'PerformanceEngine/Source/Graphics/D3D11/D3D11RHI.cpp',
                    context: 'EnsureCullingBufferCapacity()',
                    language: 'C++',
                    snippet: `if (RequiredCount <= MaxInstanceCapacity)
    return;

MaxInstanceCapacity = std::max(
    MaxInstanceCapacity + (MaxInstanceCapacity / 2),
    RequiredCount);

InstanceSRV.Reset();
InstanceBuffer.Reset();
VisibilityUAV.Reset();`
                },
                commit: { hash: '05162a7' }
            },
            {
                title: 'Per-layer instance cache overwrote a shared buffer',
                symptom: 'Cached objects in one render layer could consume transforms or object IDs belonging to another layer.',
                cause: 'Each layer mapped the same instance buffer with WRITE_DISCARD, wrote from offset zero, and retained batch offsets after the next layer replaced the buffer contents.',
                fix: 'Rebuilt every layer in one mapped buffer and assigned each batch a non-overlapping global offset.',
                result: 'Every cached batch addresses its own stable range in the shared instance buffer.',
                code: {
                    file: 'Engine/Source/Renderer/Renderer.cpp',
                    context: 'RebuildAllLayerInstanceBuffers()',
                    language: 'C++',
                    snippet: `FInstanceData* InstanceData =
    static_cast<FInstanceData*>(Mapped.pData);
uint32 GlobalOffset = 0;

InstanceData[GlobalOffset + Index].World = curr->WorldMatrix;
InstanceData[GlobalOffset + Index].ObjectID = curr->ObjectID;
NewBatch.InstanceBufferOffset = GlobalOffset;
GlobalOffset += InstanceCount;`
                },
                commit: { hash: '8088edc', url: 'https://github.com/HaXX0rBunny/Week5_Team4_Gamejam/commit/8088edc9b8c0fc83a5134e5c7d3936d2eae38cb0' }
            }
        ],
        commitRefs: [
            { hash: '15047d9', label: 'Render-state caching and draw sorting' },
            { hash: 'a4595f6', label: 'Sub-mesh BVH and DOD rendering' },
            { hash: 'c7d381e', label: 'Scene component and rendering overhaul' },
            { hash: 'b3f0a6c', label: 'Vertex-bounds bake camera correction' },
            { hash: '520b502', label: 'Local-direction billboard and four-cell sampling' },
            { hash: '2960b5b', label: 'Final matrix upload, weighted sampling, and regenerated atlas' },
            { hash: '28fe14e', label: 'Integrated octahedral impostor path' }
        ],
        featured: true
    },
    {
        week: '06',
        theme: 'Decal · P.S. I Love You — Clearing the Fog',
        title: 'Height Fog & Decal Rendering',
        summary: 'Implemented height/linear fog and depth-reconstructed spotlight projection while separating RGB contribution from the viewport render target’s alpha channel.',
        role: 'Atmospheric & Decal Rendering Programmer',
        objective: 'Add controllable fog and projected lighting to the shared renderer without corrupting viewport alpha, depth reconstruction, or the surrounding render sequence.',
        contributions: [
            'Built the fog shader/state path, movable FogActor, cutoff parameters, near/far access, color controls, and billboard representation.',
            'Split scene-depth generation from the fog renderer and connected FScene collection with reverse-depth reconstruction.',
            'Diagnosed the alpha-blend equation that made near fog pixels transparent in the ImGui viewport and restored the final linear-fog path.',
            'Built the alpha-preserving blend states and SpotLightDecal additive path, then isolated decal artifacts by checking the render output channel by channel.'
        ],
        implementation: [
            'Height/linear fog equation, cutoff, color, and camera near/far parameters',
            'FogActor, scene collection, billboard, color picker, and editor properties',
            'Scene-depth split, inverse view-projection reconstruction, reverse depth, render order, and alpha blending',
            'Depth-reconstructed spotlight projection, additive RGB contribution, and destination-alpha preservation'
        ],
        flow: 'Scene depth + camera + fog/decal parameters → world reconstruction → atmospheric or additive contribution → alpha-safe editor viewport',
        technologies: ['C++', 'HLSL', 'Height Fog', 'Decal Projection', 'Scene Depth', 'D3D11 Blend State'],
        results: [
            'Expanded the renderer beyond opaque object drawing.',
            'Kept fog and decal color contributions from overwriting the viewport alpha consumed by ImGui.',
            'Preserved the fog-focused branch as a public implementation reference.'
        ],
        evidenceStatus: 'Verified author commits',
        evidenceNote: 'Authored diffs connect depth reconstruction, alpha-preserving fog blending, spotlight decals, and render-channel diagnosis to the personal implementation scope.',
        sourceUrl: 'https://github.com/HaXX0rBunny/Jungle_Week6_Team7/tree/feature/v_fog',
        sourceLabel: 'Open fog feature branch',
        troubleshootingEvidence: [
            {
                caseId: 'alpha-preservation',
                kicker: 'Earliest fog failure · pre-commit captures',
                title: 'The first fog pass saturated geometry to the fog color while most of the editor viewport remained black.',
                summary: 'These captures were recorded 12.65 seconds apart, 32 minutes before 894b180 first committed the WIP full-screen fog path. The cube color is #8098B1—nearly identical to the configured default fog color of approximately #8099B3—while #0F0F0F dominates the surrounding viewport. Commit 3f5241e identifies the direct composition fault: ordinary alpha blending replaced render-target alpha with fogOpacity, so ImGui exposed its black background. Commit ed1d815 adds the finite far/sky guards used by the corrected path.',
                tags: ['Actual defect captures', 'Initial fog pass', 'Viewport alpha', 'Far-depth guard'],
                figures: [
                    {
                        stage: 'Distant black-viewport state · 2026-04-12 00:53:07 KST',
                        src: 'Assets/images/gametechlab/evidence/week06-initial-fog-black-distance-20260412.png',
                        alt: 'Week06 initial fog implementation showing a black distant viewport and sky while the editor grid remains visible',
                        caption: 'The full-screen scene region is black toward the horizon and sky; the grid still draws afterward as an editor overlay.',
                        fit: 'wide'
                    },
                    {
                        stage: 'Geometry contribution · 2026-04-12 00:53:20 KST',
                        src: 'Assets/images/gametechlab/evidence/week06-initial-fog-tinted-cube-20260412.png',
                        alt: 'Week06 initial fog implementation showing a cube tinted blue-gray while the surrounding viewport remains black',
                        caption: 'The cube demonstrates that fog color reaches geometry, while the surrounding scene still exposes the black failure state.',
                        fit: 'contain'
                    }
                ],
                facts: [
                    { label: 'Observed failure', value: '89.870% black', detail: '#0F0F0F versus normal #404040 clear', hidden: true },
                    { label: 'FogColor propagation', value: '#8098B1 ≈ #8099B3', detail: 'Rendered cube versus default FogColor', hidden: true },
                    { label: 'Alpha correction', value: '3f5241e', detail: 'Fog RGB blend with destination alpha preserved' }
                ],
                trace: {
                    label: 'Direct alpha-composition fault and correction',
                    file: 'Fog.hlsl + BlendStateManager.cpp',
                    snippet: `// Fog emits its opacity in the source alpha channel.
return float4(FogColor.rgb, opacity);

// Before: render-target alpha becomes fogOpacity.
Desc.RenderTarget[0].SrcBlendAlpha  = D3D11_BLEND_ONE;
Desc.RenderTarget[0].DestBlendAlpha = D3D11_BLEND_ZERO;

// After: blend fog RGB but retain the scene alpha.
Desc.RenderTarget[0].SrcBlendAlpha  = D3D11_BLEND_ZERO;
Desc.RenderTarget[0].DestBlendAlpha = D3D11_BLEND_ONE;`
                },
                method: 'The captures document the black failure state and FogColor reaching geometry; the 3f5241e and ed1d815 diffs identify the alpha-composition and finite-value corrections.'
            },
            {
                collapsed: true,
                kicker: 'Actual fog-visibility pair · local captures',
                title: 'One fog-active view retains the meshes; the later cropped view contains only the FogActor billboard.',
                summary: 'Both captures contain the same dominant fog color. The first retains the cube and sphere; the later cropped viewport contains only the editor FogActor billboard, recording the mesh-visible and mesh-absent states during the intermediate exponential-fog iteration.',
                tags: ['Actual editor captures', 'Height fog', 'Visibility response', 'Week06'],
                figures: [
                    {
                        stage: 'Fog applied · mesh visible · 2026-04-15 20:35 KST',
                        src: 'Assets/images/gametechlab/evidence/week06-fog-mesh-visible-20260415.png',
                        alt: 'Week06 editor viewport with blue height fog applied while a large cube and a sphere remain visible',
                        caption: 'Fog changes the scene color and attenuates contrast, but the cube and sphere still contribute to the rendered viewport.',
                        fit: 'contain'
                    },
                    {
                        stage: 'Fog active · mesh not visible · 2026-04-15 20:43 KST',
                        src: 'Assets/images/gametechlab/evidence/week06-fog-active-fogactor-only-20260415.png',
                        alt: 'Week06 editor viewport filled by blue height fog with scene meshes no longer visible and only the fog actor icon remaining',
                        caption: 'The cropped viewport contains no scene mesh; the FogActor billboard remains as an editor overlay.',
                        fit: 'contain'
                    }
                ],
                trace: {
                    label: 'Nearest known prior visibility-to-opacity implementation',
                    file: 'KraftonEngine/Shaders/HeightFog.hlsl · GetExponentialHeightFog()',
                    snippet: `fogIntegral = min(fogIntegral, 20.0);
float visibility = exp(-fogIntegral);
visibility = max(visibility, 1.0 - FogMaxOpacity);

float fogOpacity = saturate(1.0 - visibility);
return float4(FogInscatteringColor.rgb, fogOpacity);`
                },
                method: 'Compared the two visibility states with the adjacent HeightFog shader history and its visibility-to-opacity path.'
            },
            {
                caseId: 'fog-horizon',
                kicker: 'Actual horizon-seam diagnostics → Git-backed correction',
                title: 'Sky and scene geometry followed different fog evaluations, leaving a hard horizon boundary.',
                summary: 'These three editor captures document the height-fog profile being tuned immediately before the final fog commit. The first two retain a dark upper sky above a sharply bounded blue fog layer; the third extends the fog response into the sky. Commit 5ccad72 records the final direction-integrated sky-path correction.',
                tags: ['Actual editor captures', 'Horizon seam', 'Sky ray', '5ccad72'],
                figures: [
                    {
                        stage: 'Diagnostic 01 · 2026-04-16 00:53:39 KST',
                        src: 'Assets/images/gametechlab/evidence/week06-horizon-seam-before-005338.png',
                        alt: 'Week06 height fog diagnostic with a dark sky sharply separated from the blue fog layer at the horizon',
                        caption: 'A clear horizontal boundary separates the dark upper sky from the blue fogged scene and grid.',
                        fit: 'contain'
                    },
                    {
                        stage: 'Diagnostic 02 · 2026-04-16 00:53:54 KST',
                        src: 'Assets/images/gametechlab/evidence/week06-horizon-seam-before-005354.png',
                        alt: 'Second Week06 height fog viewpoint showing the same hard transition between dark sky and blue fog layer',
                        caption: 'The same discontinuity remains from a slightly different crop and camera position.',
                        fit: 'contain'
                    },
                    {
                        stage: 'After candidate · working tree · 2026-04-16 00:54:19 KST',
                        src: 'Assets/images/gametechlab/evidence/week06-horizon-seam-before-005419.png',
                        alt: 'Week06 working-tree fog iteration with the blue fog response extending into the sky above the grid horizon',
                        caption: 'The alternate response extends fog into the sky and removes the dark upper region.',
                        fit: 'contain'
                    }
                ],
                facts: [
                    { label: 'Final authored commit', value: '5ccad72', detail: 'Sky-path correction' },
                    { label: 'Old sky path', value: 'Constant return', detail: 'Depth = 1 bypassed world-space fog integration' },
                    { label: 'Corrected sky path', value: 'Direction-integrated', detail: 'InvViewProj ray evaluated by the selected fog function' }
                ],
                trace: {
                    label: 'Sky path before and after 5ccad72',
                    file: 'KraftonEngine/Shaders/HeightFog.hlsl · PS()',
                    snippet: `// Before: sky and geometry used unrelated fog evaluations.
if (depth >= 1.0)
    return float4(FogInscatteringColor.rgb, FogMaxOpacity);

// After: reconstruct a sky ray and use the same fog function.
float4 worldH = mul(ndc, InvViewProj);
float3 worldDir = normalize(worldH.xyz / worldH.w - CameraWorldPos);
float3 skyWorldPos = CameraWorldPos + worldDir * 100000.0;
float4 fogResult = bUseLinearFog
    ? GetLinearHeightFog(skyWorldPos)
    : GetExponentialHeightFog(skyWorldPos);`
                },
                method: 'The captures record the horizon-seam diagnosis; the parent/result blobs of 5ccad72 record the constant-return to direction-integrated shader change.'
            },
            {
                caseId: 'alpha-preservation',
                kicker: 'User-described RGBA isolation · actual diagnostic captures',
                title: 'Channel-by-channel inspection isolated render-target alpha as the source of the black decal exterior.',
                summary: 'The first capture records the black exterior around the projected response; the second records the wide red additive contribution used during channel isolation. R, G, B, and A were inspected in sequence to isolate destination-alpha contamination, then the blend-state path was corrected.',
                tags: ['Actual editor captures', 'Alpha contamination', 'Blend state', 'SpotLightDecal'],
                figures: [
                    {
                        stage: 'Black exterior symptom · 2026-04-16 02:40:47 KST',
                        src: 'Assets/images/gametechlab/evidence/week06-decal-channel-debug-024047.png',
                        alt: 'Week06 spotlight decal diagnostic showing a white projected response surrounded by a dark ring on the test surface',
                        caption: 'The dark exterior around the projected response motivated isolating the render target’s color and alpha channels.',
                        fit: 'contain'
                    },
                    {
                        stage: 'Additive footprint diagnostic · 2026-04-16 02:53:01 KST',
                        src: 'Assets/images/gametechlab/evidence/week06-decal-channel-debug-025301.png',
                        alt: 'Week06 spotlight decal diagnostic showing a broad red additive contribution across the floor and a saturated white cube',
                        caption: 'The dominant red footprint exposes the projected RGB contribution across reconstructed planar and cube surfaces.',
                        fit: 'contain'
                    }
                ],
                facts: [
                    { label: 'Dominant red frame', value: '#BF4040 · 64.619%', detail: 'Consistent with red additive contribution over #404040', hidden: true },
                    { label: 'Saved PNG alpha', value: '255 everywhere', detail: 'Channel diagnosis uses the render-target path and the corresponding code diff', hidden: true },
                    { label: 'Recorded Git state', value: 'After decfa685', detail: 'No subsequent commit exists between or after these captures', hidden: true },
                    { label: 'Role split', value: 'Keep-alpha state + SpotLightDecal', detail: 'Projection Decal binding: teammate commit 2a066ce' }
                ],
                trace: {
                    label: 'Separate RGB blending from destination-alpha preservation',
                    file: 'BlendStateManager.cpp + Renderer.cpp',
                    snippet: `// Personal blend-state implementation: preserve destination alpha.
Desc.RenderTarget[0].SrcBlendAlpha  = D3D11_BLEND_ZERO;
Desc.RenderTarget[0].DestBlendAlpha = D3D11_BLEND_ONE;

// Team integration for projection decals.
S[(uint32)E::Decal] = {
    EDepthStencilState::Default,
    EBlendState::AlphaBlendKeepAlpha,
    ERasterizerState::SolidFrontCull,
    D3D11_PRIMITIVE_TOPOLOGY_TRIANGLELIST, true };

// Personal spotlight path: add RGB while retaining destination alpha.
S[(uint32)E::SpotLightDecal] = {
    EDepthStencilState::NoDepth,
    EBlendState::Additive,
    ERasterizerState::SolidBackCull,
    D3D11_PRIMITIVE_TOPOLOGY_TRIANGLELIST, false };`
                },
                method: 'Channel-isolation captures and authored blend-state history separate RGB contribution from destination-alpha preservation. Personal scope is the reusable keep-alpha state and SpotLightDecal additive path; teammate commit 2a066ce connects Projection Decal.'
            }
        ],
        troubleshooting: [
            {
                id: 'fog-horizon',
                title: 'A constant sky-fog branch created a hard horizon seam',
                symptom: 'The fogged ground and the background sky met at a visibly sharp horizontal boundary instead of sharing a continuous atmospheric response.',
                cause: 'Depth-buffer sky pixels (depth ≥ 1) returned FogInscatteringColor at FogMaxOpacity immediately, while geometry pixels reconstructed a world position and integrated exponential height fog. Adjacent pixels across the horizon therefore used different equations.',
                fix: 'Reconstructed a world-space direction for sky pixels through InvViewProj, evaluated a far virtual point with the same selected linear or exponential fog function used by geometry, and exposed bUseLinearFog through the component and constant-buffer path.',
                result: 'Sky and geometry now share the distance-, height-, and direction-aware fog evaluation, removing the code-path discontinuity at the horizon.',
                code: {
                    file: 'KraftonEngine/Shaders/HeightFog.hlsl',
                    context: 'PS() · depth >= 1.0 sky path',
                    language: 'HLSL',
                    snippet: `float4 worldH = mul(ndc, InvViewProj);
float3 worldDir = normalize(
    worldH.xyz / worldH.w - CameraWorldPos);

float3 skyWorldPos = CameraWorldPos + worldDir * 100000.0;
float4 fogResult = bUseLinearFog
    ? GetLinearHeightFog(skyWorldPos)
    : GetExponentialHeightFog(skyWorldPos);`
                },
                commit: { hash: '5ccad72', url: 'https://github.com/wwonnn/Jungle_Week6_Team7/commit/5ccad725930af9e88f3b11399fa81269dd73eec5' }
            },
            {
                id: 'alpha-preservation',
                title: 'Decal RGB was valid while its blend path polluted viewport alpha',
                symptom: 'The projected response was visible, but its exterior became black when the viewport texture was composited. Inspecting the output channels individually isolated alpha rather than the RGB lighting calculation.',
                cause: 'The ordinary alpha blend equation wrote destination alpha as 1 × SrcAlpha + 0 × DstAlpha. A fog or decal pass could therefore replace the scene render target’s alpha even when its RGB result was correct, and ImGui later interpreted the damaged alpha during viewport composition.',
                fix: 'Created an AlphaBlendKeepAlpha state for ordinary translucent color and an Additive state for spotlight contribution. Both keep destination alpha through 0 × SrcAlpha + 1 × DstAlpha; the projection decal pass was connected to the reusable state by a teammate, while the SpotLightDecal path used the personal additive integration.',
                result: 'Fog and spotlight color can change RGB while preserving viewport alpha. Personal work covers the reusable keep-alpha state and SpotLightDecal additive path; teammate commit 2a066ce supplies the Projection Decal binding.',
                code: {
                    file: 'KraftonEngine/Source/Engine/Render/Device/BlendStateManager.cpp',
                    context: 'FBlendStateManager::Create() · alpha-preserving states',
                    language: 'C++',
                    snippet: `// RGB: SrcAlpha blend or additive accumulation.
Desc.RenderTarget[0].SrcBlend = D3D11_BLEND_SRC_ALPHA;
Desc.RenderTarget[0].DestBlend = D3D11_BLEND_INV_SRC_ALPHA;

// Alpha: keep the value already stored by the scene pass.
Desc.RenderTarget[0].SrcBlendAlpha = D3D11_BLEND_ZERO;
Desc.RenderTarget[0].DestBlendAlpha = D3D11_BLEND_ONE;
Desc.RenderTarget[0].BlendOpAlpha = D3D11_BLEND_OP_ADD;`
                },
                commit: { hash: '13b60e7', url: 'https://github.com/wwonnn/Jungle_Week6_Team7/commit/13b60e7e27eaa82df96b4484b945691bd77193a3' }
            },
            {
                title: 'The spotlight cone predicate treated almost every difference as true',
                symptom: 'Valid pixels inside the projected cone could be discarded unless their cosine happened to equal the outer-cone threshold exactly.',
                cause: 'The shader used `if (cosAngle - OuterConeAngleCos)`, so any nonzero difference converted to true instead of testing whether the pixel was outside the cone.',
                fix: 'Changed the predicate to the intended ordered comparison, discarding only pixels whose angle falls outside the outer cone.',
                result: 'Interior spotlight pixels proceed to falloff, normal, and luminance evaluation while exterior pixels are rejected.',
                code: {
                    file: 'KraftonEngine/Shaders/SpotLightDecal.hlsl',
                    context: 'PS() · cone-angle rejection',
                    language: 'HLSL',
                    snippet: `// Before: almost every nonzero difference is true.
if (cosAngle - OuterConeAngleCos)
    discard;

// After: reject only pixels outside the cone.
if (cosAngle < OuterConeAngleCos)
    discard;`
                },
                commit: { hash: '1a1b013', url: 'https://github.com/wwonnn/Jungle_Week6_Team7/commit/1a1b0136d220c166e0c0651a9ccf3933a19c4c85' }
            },
            {
                title: 'Removing the fog component also erased mesh visibility lists',
                symptom: 'Deleting or removing the height-fog component could make unrelated scene meshes disappear with it.',
                cause: 'FScene::RemoveFog() erased the fog component and then cleared SelectedProxies, NeverCullProxies, FreeSlots, and VisibleProxies—scene-wide containers that belong to every render proxy, not to fog ownership.',
                fix: 'Restricted RemoveFog() to removing the matching UHeightFogComponent and stopped clearing the global proxy bookkeeping arrays.',
                result: 'Fog removal preserves the visibility records used to render the rest of the scene. The supplied screenshots document the subsequent fog test context, while the commit diff records the visibility-container correction.',
                code: {
                    file: 'KraftonEngine/Source/Engine/Render/Proxy/FScene.cpp',
                    context: 'FScene::RemoveFog()',
                    language: 'C++',
                    snippet: `for (auto It = FogComponents.begin(); It != FogComponents.end(); ++It)
{
    if (*It == Fog)
    {
        FogComponents.erase(It);
        break;
    }
}
// Do not clear scene-wide mesh proxy containers here.`
                },
                commit: { hash: '5989270', url: 'https://github.com/wwonnn/Jungle_Week6_Team7/commit/5989270af7e1b3b5a911e3c3b0f45eaa500b61c6' }
            },
            {
                title: 'Fog pass made near geometry transparent in the editor',
                symptom: 'Pixels near the camera appeared as the black editor background after the fog pass, even though their RGB lighting result was valid.',
                cause: 'The existing alpha blend state evaluated the target alpha as 1 × SrcAlpha + 0 × DstAlpha. Fog therefore replaced render-target alpha with fogOpacity; near pixels had fogOpacity near zero, and ImGui composited the viewport texture as transparent.',
                fix: 'Added a fog-specific blend state that preserves the destination alpha while blending fog color, then bound that state only for the fog pass.',
                result: 'Fog changes scene color without erasing viewport opacity, so near geometry remains visible when ImGui presents the render target.',
                code: {
                    file: 'KraftonEngine/Source/Engine/Render/Device/BlendStateManager.cpp',
                    context: 'FBlendStateManager::Create()',
                    language: 'C++',
                    snippet: `Desc.RenderTarget[0].SrcBlend = D3D11_BLEND_SRC_ALPHA;
Desc.RenderTarget[0].DestBlend = D3D11_BLEND_INV_SRC_ALPHA;
Desc.RenderTarget[0].BlendOp = D3D11_BLEND_OP_ADD;
Desc.RenderTarget[0].SrcBlendAlpha = D3D11_BLEND_ZERO;
Desc.RenderTarget[0].DestBlendAlpha = D3D11_BLEND_ONE;
Desc.RenderTarget[0].BlendOpAlpha = D3D11_BLEND_OP_ADD;
Desc.RenderTarget[0].RenderTargetWriteMask = D3D11_COLOR_WRITE_ENABLE_ALL;
InDevice->CreateBlendState(&Desc, &AlphaKeepAlpha);`
                },
                commit: { hash: '3f5241e', url: 'https://github.com/wwonnn/Jungle_Week6_Team7/commit/3f5241eee1359d13e2142b6f33712144373c2f8c' }
            },
            {
                title: 'Scene-depth debug mode was coupled to the fog renderer',
                symptom: 'Depth visualization depended on fog collection and shared fog constants, so the debug view could not operate cleanly when fog was absent or disabled.',
                cause: 'HeightFog.hlsl contained both atmospheric blending and depth-visualization branches, while the collector synthesized fog parameters just to activate SceneDepth mode.',
                fix: 'Created a dedicated SceneDepth shader and renderer path, registered fog components with FScene, and explicitly unbound the DSV before binding the same depth resource as an SRV.',
                result: 'Scene-depth inspection works independently, and the fog pass contains only fog responsibilities without a DSV/SRV binding hazard.',
                commit: { hash: '0a3be28', url: 'https://github.com/wwonnn/Jungle_Week6_Team7/commit/0a3be28fad4f147d7dd52467e0c7e219be5cd169' }
            },
            {
                title: 'Removed fog survived through the reused render bus',
                symptom: 'After a scene or frame stopped collecting fog, the renderer could still report fog as present and reuse the previous parameters.',
                cause: 'FRenderBus::Clear() reset proxy, entry, and resource collections but did not reset bHasFog or FogParams.',
                fix: 'Reset both the presence flag and fog parameter structure during every render-bus clear.',
                result: 'A frame with no SetFogParams() call starts with HasFog = false and does not carry the old fog pass forward.',
                code: {
                    file: 'KraftonEngine/Source/Engine/Render/Pipeline/RenderBus.cpp',
                    context: 'FRenderBus::Clear()',
                    language: 'C++',
                    snippet: `bHasFog = false;
FogParams = {};`
                },
                commit: { hash: 'f6b3910', url: 'https://github.com/wwonnn/Jungle_Week6_Team7/commit/f6b3910f22b58ecaa3b51525d740dcb925a5f5e9' }
            },
            {
                title: 'Fog and decal buffers declared the inverse view-projection twice',
                symptom: 'Shaders including the shared constant-buffer file had a duplicate InvViewProj symbol while fog and decal maintained separate copies of frame-global camera matrices.',
                cause: 'DecalBuffer and HeightFogCB each declared InvViewProj in the same HLSL include.',
                fix: 'Moved ViewProjection and InvViewProj into the frame buffer, populated them once in UpdateFrameBuffer(), and removed the per-pass copies.',
                result: 'The shared include has one inverse view-projection declaration and both passes consume the same frame matrix.',
                code: {
                    file: 'KraftonEngine/Source/Engine/Render/Pipeline/Renderer.cpp',
                    context: 'FRenderer::UpdateFrameBuffer()',
                    language: 'C++',
                    snippet: `frameConstantData.ViewProjection =
    frameConstantData.View * frameConstantData.Projection;
frameConstantData.InvViewProj =
    frameConstantData.ViewProjection.GetInverse();`
                },
                commit: { hash: '36f86c1', url: 'https://github.com/wwonnn/Jungle_Week6_Team7/commit/36f86c17b70ba4cd0a2cf28cc9a3e318913c755e' }
            },
            {
                title: 'Far-depth reconstruction could feed non-finite values into fog blending',
                symptom: 'While stabilizing the first full-screen fog prototype, the depth-boundary code path could produce undefined world positions and opacity inputs for sky or far pixels.',
                cause: 'ReconstructWorldPos divided by homogeneous worldH.w without guarding a near-zero value. The resulting ray length, normalized direction, height exponent, and accumulated density could then become zero-length, infinite, NaN, negative, or overflowed before reaching the blend stage.',
                fix: 'Guarded homogeneous W and invalid ray lengths, clamped exponential inputs, forced a non-negative bounded fog integral, saturated opacity, and discarded a final result if any component remained NaN or infinite.',
                result: 'The reconstruction guards keep fog-pass opacity and color finite; the supplied captures and commit-linked shader diff document the failure and correction.',
                code: {
                    file: 'KraftonEngine/Shaders/HeightFog.hlsl',
                    context: 'ReconstructWorldPos() + GetExponentialHeightFog()',
                    language: 'HLSL',
                    snippet: `float4 worldH = mul(ndc, InvViewProj);
if (abs(worldH.w) < 1e-6)
    return CameraWorldPos;

float rayLength = length(worldPos - CameraWorldPos);
if (rayLength < 0.001 || isnan(rayLength) || isinf(rayLength))
    return float4(0, 0, 0, 0);

float densityExponent = clamp(
    -FogHeightFalloff * cameraRelHeight, -80.0, 80.0);
fogIntegral = min(max(fogIntegral, 0.0), 20.0);`
                },
                commit: { hash: 'ed1d815', url: 'https://github.com/wwonnn/Jungle_Week6_Team7/commit/ed1d815b937d28c1d6dd9df741079f916d303047' }
            }
        ],
        commitRefs: [
            { hash: '894b180', label: 'Initial full-screen fog WIP', url: 'https://github.com/wwonnn/Jungle_Week6_Team7/commit/894b180522308dd812b45460064a97824a3e2e7c' },
            { hash: 'a5ddaeb', label: 'Height fog', url: 'https://github.com/wwonnn/Jungle_Week6_Team7/commit/a5ddaeb96e2120b055239ab0b78307357858cdd3' },
            { hash: 'ed1d815', label: 'Far-depth and numerical fog guards', url: 'https://github.com/wwonnn/Jungle_Week6_Team7/commit/ed1d815b937d28c1d6dd9df741079f916d303047' },
            { hash: '3f5241e', label: 'Reusable alpha-preserving blend state', url: 'https://github.com/wwonnn/Jungle_Week6_Team7/commit/3f5241eee1359d13e2142b6f33712144373c2f8c' },
            { hash: '13b60e7', label: 'Personal branch: SpotLightDecal additive state integration', url: 'https://github.com/wwonnn/Jungle_Week6_Team7/commit/13b60e7e27eaa82df96b4484b945691bd77193a3' },
            { hash: '1a1b013', label: 'Personal branch: spotlight cone predicate and additive-state binding', url: 'https://github.com/wwonnn/Jungle_Week6_Team7/commit/1a1b0136d220c166e0c0651a9ccf3933a19c4c85' },
            { hash: '2a066ce', label: 'Team integration: Projection Decal keep-alpha binding', url: 'https://github.com/wwonnn/Jungle_Week6_Team7/commit/2a066ce365b1468de7b01b598b201c50db42871a' },
            { hash: '0a3be28', label: 'Scene-depth separation', url: 'https://github.com/wwonnn/Jungle_Week6_Team7/commit/0a3be28fad4f147d7dd52467e0c7e219be5cd169' },
            { hash: '5989270', label: 'Fog removal keeps mesh proxy lists', url: 'https://github.com/wwonnn/Jungle_Week6_Team7/commit/5989270af7e1b3b5a911e3c3b0f45eaa500b61c6' },
            { hash: '5ccad72', label: 'Final linear fog and spotlight projection path', url: 'https://github.com/wwonnn/Jungle_Week6_Team7/commit/5ccad725930af9e88f3b11399fa81269dd73eec5' }
        ]
    },
    {
        week: '07',
        theme: 'Let There Be Light',
        title: 'Lighting Pipeline',
        summary: 'Built the light-component and scene-proxy path, forward-renderer light buffers, editor light actors, shader hot reload, and a time-driven daylight system.',
        role: 'Rendering Programmer',
        objective: 'Make lights, materials, and scene data operate as one maintainable real-time rendering path.',
        contributions: [
            'Implemented LightComponentBase, LightSceneProxy, forward-renderer constant-buffer binding, light actors, billboards, ambient light, and debug drawing.',
            'Added shader hot reload that includes shared lighting functions and toon-lit paths while fixing render-state and GPU resource leaks.',
            'Built daylight orbit, 24-hour sunlight, altitude-driven ambient color, sky clear color, and safe cached-light cleanup.'
        ],
        implementation: [
            'Light component / scene proxy / forward-renderer buffer architecture',
            'Editor placement, billboard, cone/debug visualization, and shader hot reload',
            'Daylight orbit, sun direction, altitude/time conversion, ambient color, and sky clear color'
        ],
        flow: 'Editor light actor → component / scene proxy → forward light buffer → material lighting + daylight update',
        technologies: ['C++', 'HLSL', 'Forward Lighting', 'Shader Hot Reload', 'Daylight'],
        results: [
            'Established the lighting layer required for the following shadow assignment.',
            'Integrated lighting behavior into the engine rather than a standalone sample.'
        ],
        evidenceStatus: 'Verified local author commits',
        evidenceNote: 'Authored history connects the Light Component/Proxy boundary, forward-buffer binding, shader hot reload, daylight control, and resource cleanup to the personal implementation scope.',
        troubleshooting: [
            {
                title: 'Shader hot reload missed dependencies and invalidated cached data',
                symptom: 'Edits to shared lighting or toon functions were not reliably reflected, and a failed reload could leave unstable shader state or leaked cached GPU resources.',
                cause: 'The hot-reload dependency path did not include all shared lighting functions. During recompilation, macro pointers referenced strings inside CachedDefines even though Create() cleared that cache, and UberShaderCache was not cleared during renderer shutdown.',
                fix: 'Included shared function/lighting dependencies, copied cached paths, entry points, and define strings into local owned storage before recompilation, retained the previous shader on failure, and released the uber-shader cache in shutdown order.',
                result: 'Lighting variants reload from valid inputs, compile failures are reported without discarding the working shader, and shader cache resources are reclaimed.',
                code: {
                    file: 'KraftonEngine/Source/Engine/Render/Resource/Shader.cpp',
                    context: 'FShader::Recompile()',
                    language: 'C++',
                    snippet: `for (const auto& D : CachedDefines)
{
    LocalDefines.emplace_back(D.first, D.second);
}
std::vector<D3D_SHADER_MACRO> MacroList;
MacroList.reserve(LocalDefines.size() + 1);
for (const auto& D : LocalDefines)
{
    MacroList.push_back({ D.first.c_str(), D.second.c_str() });
}
MacroList.push_back({ nullptr, nullptr });`
                },
                commit: { hash: '893ff21' }
            },
            {
                title: 'Deleting daylight or light actors left stale render state',
                symptom: 'Deleting a Daylight actor could leave its last sky clear color active, while deleting cached directional or ambient lights risked dereferencing stale component pointers on the next update.',
                cause: 'Daylight wrote global scene color but did not restore it in destruction, and raw cached component pointers were assumed to remain valid after actors were removed from the world.',
                fix: 'Cleared the scene sky-color override in the Daylight destructor and invalidated/rebuilt cached sun and ambient component pointers before tick and property-driven updates.',
                result: 'Removing lighting actors restores neutral scene state and no longer leaves the daylight system pointing at destroyed components.',
                commit: { hash: 'd82cae2' }
            },
            {
                title: 'Zero light attenuation inputs produced non-finite shader values',
                symptom: 'Point or spot lighting could generate invalid values when AttenuationRadius or LightFalloffExponent was zero.',
                cause: 'Lambert, Gouraud, and Blinn–Phong paths divided by the raw attenuation radius and passed the raw exponent into pow().',
                fix: 'Clamped the divisor and exponent to a small positive value in every lighting model.',
                result: 'The changed attenuation path no longer feeds zero edge cases into division or exponentiation.',
                code: {
                    file: 'KraftonEngine/Shaders/BlinnPhong.hlsl',
                    context: 'CalculatePointLight() / CalculateSpotLight()',
                    language: 'HLSL',
                    snippet: `float attenuation = saturate(
    1.0f - distance / max(light.AttenuationRadius, 0.0001f));
attenuation = pow(
    attenuation,
    max(light.LightFalloffExponent, 0.0001f));`
                },
                commit: { hash: 'c1ee8d3' }
            },
            {
                title: 'Renderer shutdown dropped cache entries without releasing owned resources',
                symptom: 'Shutdown or reinitialization left cached materials, meshes, textures, constant buffers, and shader-reflection allocations alive.',
                cause: 'Several cache maps were cleared without destroying cached UObjects; UStaticMesh, the constant-buffer pool, and FShader also omitted heap or GPU resources they owned.',
                fix: 'Destroyed cached objects through UObjectManager, deleted mesh assets and shader layout records, and released both constant-buffer containers.',
                result: 'The affected owners now reclaim their resources during Release() or destruction instead of only dropping lookup entries.',
                code: {
                    file: 'KraftonEngine/Source/Engine/Render/Resource/Shader.cpp',
                    context: 'FShader::Release()',
                    language: 'C++',
                    snippet: `for (auto& Pair : ShaderParameterLayout)
{
    delete Pair.second;
}
ShaderParameterLayout.clear();`
                },
                commit: { hash: '3ab1246' }
            }
        ],
        commitRefs: [
            { hash: 'e0af0f9', label: 'Light component foundation' },
            { hash: '8abc1d6', label: 'Forward light-buffer binding' },
            { hash: '460ede0', label: 'Shader hot reload' },
            { hash: '10c0d6e', label: '24-hour sunlight system' }
        ]
    },
    {
        week: '08',
        theme: 'Where There Is Light, There Is Also Shadow',
        title: 'Shadow Rendering',
        summary: 'Implemented directional, spot, and point-light shadow paths with shadow-depth resources, cube maps, PCF/VSM filtering, culling, mobility, and cache-dirty control.',
        role: 'Rendering Programmer',
        objective: 'Extend the Week07 lighting path so scene geometry can cast and receive real-time shadows.',
        contributions: [
            'Set up spot/directional shadow depth rendering, fixed D3D11 resource-state and constant-buffer issues, and addressed shadow-map leaks and peter-panning.',
            'Added point-light cube shadow maps, point-light shaders, VSM/PCF evaluation, cube-map descriptor correction, and distortion fixes.',
            'Implemented shadow candidate priority/culling, mobility and dirty flags, movable-light behavior, and editor-facing controls.'
        ],
        implementation: [
            'Directional/spot shadow depth pass and rasterizer bias control',
            'Point-light cube map, PCF/VSM filtering, and cube-direction correction',
            'Priority collection, shadow culling, mobility, dirty cache, and editor controls'
        ],
        flow: 'Per-light candidate collection → depth / cube shadow pass → PCF or VSM sampling → cached lit result',
        technologies: ['C++', 'HLSL', 'Shadow Map', 'PCF', 'VSM', 'Cube Map'],
        results: [
            'Added visible spatial grounding to the Week07 lighting pipeline.',
            'Preserved the integrated project in a public repository.'
        ],
        evidenceStatus: 'Verified author commits',
        evidenceNote: 'Authored diffs connect directional, spot, and point-light shadow passes with cube maps, PCF/VSM filtering, culling, and cache control.',
        sourceUrl: 'https://github.com/chodott/KraftonJungle_Week8_Team5/commits/main/?author=HaXX0rBunny',
        sourceLabel: 'Open authored Week08 commits',
        troubleshooting: [
            {
                title: 'Point-shadow cube SRV descriptor corruption',
                symptom: 'Point-light shadow sampling produced invalid or corrupted cube-map results and could trigger an illegal D3D11 view description.',
                cause: 'The texture was created without D3D11_RESOURCE_MISC_TEXTURECUBE, and the SRV path mixed 2D-array and cube-array union fields. The shader also read the cube index from the wrong packed parameter.',
                fix: 'Created the texture with the cube flag, built separate Texture2DArray and TextureCubeArray SRVs using their correct descriptor fields, and stored/read the cube index from Params0.w.',
                result: 'The resource is valid for both face rendering and cube sampling, with each point light addressing the intended cube slice.',
                code: {
                    file: 'Engine/Source/Renderer/Features/Shadow/ShadowRenderFeature.cpp',
                    context: 'FShadowRenderFeature::EnsureShadowDepthArray()',
                    language: 'C++',
                    snippet: `D3D11_SHADER_RESOURCE_VIEW_DESC CubeSRVDesc = {};
CubeSRVDesc.Format = DXGI_FORMAT_R32_FLOAT;
CubeSRVDesc.ViewDimension = D3D11_SRV_DIMENSION_TEXTURECUBEARRAY;
CubeSRVDesc.TextureCubeArray.MostDetailedMip = 0;
CubeSRVDesc.TextureCubeArray.MipLevels = 1;
CubeSRVDesc.TextureCubeArray.First2DArrayFace = ShadowConfig::PointShadowSliceOffset;
CubeSRVDesc.TextureCubeArray.NumCubes = ShadowConfig::MaxPointShadowCubes;

if (FAILED(Device->CreateShaderResourceView(ShadowDepthArray, &CubeSRVDesc, &ShadowDepthCubeArraySRV)))
{
    SafeRelease(ShadowDepthArraySRV);
    SafeRelease(ShadowDepthArray);
    bShadowDepthArrayDirty = true;
    return false;
}`
                },
                commit: { hash: '1b12031', url: 'https://github.com/chodott/KraftonJungle_Week8_Team5/commit/1b120319dbd4fe24f2315cc9113ecaa22973cb11' }
            },
            {
                title: 'Shadow bias produced visible peter-panning',
                symptom: 'Shadows detached from the feet and contact edges of their casters.',
                cause: 'CPU/rasterizer depth bias and a large 0.05 normal offset were applied together, pushing the sampled receiver position too far from the surface.',
                fix: 'Removed the redundant depth bias, changed the shadow cull mode to back faces, reduced the normal offset to 0.02, and compared against the unmodified receiver depth.',
                result: 'Contact shadows sit closer to their casters while retaining enough offset to limit self-shadow artifacts.',
                commit: { hash: 'b68dd30', url: 'https://github.com/chodott/KraftonJungle_Week8_Team5/commit/b68dd30b27a306d95ff8ab67beeb1339bf1c7dc4' }
            },
            {
                title: 'Point lights bypassed the requested PCF path',
                symptom: 'Selecting PCF for a point light still produced an unfiltered/default shadow result, and cached shadows did not have an explicit invalidation contract.',
                cause: 'The point-shadow evaluation routed VSM and fallback modes but never dispatched filter mode 1 to a cube-map PCF implementation.',
                fix: 'Added a dedicated 3 × 3 point-cube PCF sampler, routed the filter-mode branch correctly, and introduced light mobility plus shadow-cache dirty state.',
                result: 'Point lights use the selected PCF filter, while movable or edited lights can explicitly invalidate cached shadow data.',
                commit: { hash: '6fb998f', url: 'https://github.com/chodott/KraftonJungle_Week8_Team5/commit/6fb998f7d84ae299ba540dbb04017f06d64949ee' }
            },
            {
                title: 'Point-shadow candidates consumed allocations before priority sorting',
                symptom: 'Casting point lights could allocate shadow records and views once during collection and again in the sorted pass, undermining the cube budget.',
                cause: 'The first pass both registered each shadow and enqueued the same light as a candidate; the second pass repeated allocation after sorting.',
                fix: 'Made collection candidate-only, sorted by camera distance, and allocated at most MaxPointShadowCubes once in the priority pass.',
                result: 'Shadow metadata and cube views are created only after prioritization, with each selected light emitted once.',
                code: {
                    file: 'Engine/Source/Renderer/Scene/Builders/SceneCommandLightingBuilder.cpp',
                    context: 'Point-light candidate collection',
                    language: 'C++',
                    snippet: `if (Point->IsCastingShadows())
{
    // Registration happens after priority sorting.
    ShadowCandidates.push_back(Candidate);
}`
                },
                commit: { hash: '8d32f27', url: 'https://github.com/chodott/KraftonJungle_Week8_Team5/commit/8d32f271d986c4b81c14485e673732119f982d3c' }
            },
            {
                title: 'Directional shadow inputs were built but never rendered after merge',
                symptom: 'Directional shadows were absent even though directional shadow lights and views were present in the frame data.',
                cause: 'RenderShadows() invoked the general shadow-view path, but the merge omitted its RenderDirectionalShadows() call.',
                fix: 'Restored directional depth rendering before preview generation, buffer upload, and resource binding.',
                result: 'Directional shadow maps are rendered in the same shadow frame before their data is consumed.',
                code: {
                    file: 'Engine/Source/Renderer/Features/Shadow/ShadowRenderFeature.cpp',
                    context: 'RenderShadows()',
                    language: 'C++',
                    snippet: `RenderShadowViews(
    Renderer, Processor, Targets, SceneViewData);
RenderDirectionalShadows(
    Renderer, Processor, Targets, SceneViewData);`
                },
                commit: { hash: 'ab0df57', url: 'https://github.com/chodott/KraftonJungle_Week8_Team5/commit/ab0df57ebc47427e2b3243aad6713c7ef3a692df' }
            },
            {
                title: 'Point-cube PCF changed basis at cube-face boundaries',
                symptom: 'The soft-shadow kernel changed orientation or distorted around dominant-axis and cube-face boundaries.',
                cause: 'The 3 × 3 offsets selected fixed axis bases through piecewise dominant-component tests and sampled the unoffset receiver position.',
                fix: 'Applied a slope-scaled normal offset, derived tangent and bitangent from the light-to-surface direction, and rotated an eight-tap Poisson disk in that continuous local plane.',
                result: 'PCF offset generation no longer switches among three hard-coded cube-face bases.',
                code: {
                    file: 'Engine/Shaders/LightCommon.hlsli',
                    context: 'SampleShadowViewPointPCF()',
                    language: 'HLSL',
                    snippet: `float3 L_norm = normalize(lightToSurface);
float3 up = abs(L_norm.z) < 0.999f
    ? float3(0, 0, 1)
    : float3(1, 0, 0);
float3 tangent = normalize(cross(up, L_norm));
float3 bitangent = cross(L_norm, tangent);`
                },
                commit: { hash: '0f67c07', url: 'https://github.com/chodott/KraftonJungle_Week8_Team5/commit/0f67c07dbb5562499094307a17b1305165dd999e' }
            }
        ],
        commitRefs: [
            { hash: '5450865', label: 'Directional shadow path', url: 'https://github.com/chodott/KraftonJungle_Week8_Team5/commit/545086541458124bcf7bac1cac483f11a39e5f3f' },
            { hash: 'd792c00', label: 'Point-light shadow path', url: 'https://github.com/chodott/KraftonJungle_Week8_Team5/commit/d792c00d75a8e6e5f8937d953169e9c1656c2b2f' },
            { hash: '83c5142', label: 'VSM point-light filtering', url: 'https://github.com/chodott/KraftonJungle_Week8_Team5/commit/83c51429d834d935dd081c822a15712d0ab4d171' },
            { hash: '6fb998f', label: 'PCF, mobility, and dirty cache', url: 'https://github.com/chodott/KraftonJungle_Week8_Team5/commit/6fb998f7d84ae299ba540dbb04017f06d64949ee' }
        ]
    },
    {
        week: '09',
        theme: '3rd Game Jam · Light, Camera, Action!',
        title: 'Standalone Shipping Build',
        summary: 'Implemented the shipping/cooking pipeline and also connected game framework, binary world serialization, PIE/offscreen rendering, camera effects, Lua routing, and gamma correction.',
        role: 'Build & Runtime Integration Programmer',
        objective: 'Make the team project start outside the editor with the runtime assets needed by the packaged application.',
        contributions: [
            'Added GameModeBase/GameInstance, binary world serialization, enhanced-input migration, project generation, shipping builds, cooking, and a headless parser/builder.',
            'Split offscreen rendering and input for PIE, then implemented PlayerCameraManager, camera shake/effects, Lua camera modifiers, and actor camera calculation.',
            'Added gamma correction controls and fixed post-process ordering, ABI mismatches, runtime asset roots, crash/dangling references, and packaging scripts.'
        ],
        implementation: [
            'Shipping target, generated project, cook/stage layout, headless builder, batch packaging, and mirrored assets',
            'GameMode/GameInstance, world binary serialization, PIE/offscreen buffer, and enhanced input',
            'Camera pipeline, Lua modifiers, hit/vignette effects, gamma correction, and render-pass ordering'
        ],
        flow: 'Editor world → binary serialize / cook → stage mirrored assets → shipping executable → runtime camera and post-process flow',
        technologies: ['C++', 'Build Pipeline', 'Cook', 'LuaJIT', 'Camera', 'Post Process'],
        results: [
            'Verified direct launch through the standalone menu path.',
            'Verified the START/loading transition and StoryScene BeginPlay in the runtime log.'
        ],
        evidenceStatus: 'Verified author commits',
        evidenceNote: 'Code and runtime evidence connects Shipping/Cook/Stage tooling, camera and post-process work, the START transition, and the StoryScene BeginPlay path to the personal implementation scope.',
        sourceUrl: 'https://github.com/Rocketstein/Jungle_Week9_Team6/commits/main/?author=HaXX0rBunny',
        sourceLabel: 'Open authored Week09 commits',
        troubleshootingEvidence: [
            {
                placement: 'result',
                kicker: 'Actual Shipping runtime checkpoints',
                title: 'The packaged EXE reached the menu and entered the START loading transition.',
                summary: 'Build, Cook, and Stage completed. The same staged EXE rendered the menu, entered the START transition, and logged game/story.scene plus StoryScene Lua BeginPlay; Verify reported the missing cube source/cache dependency.',
                tags: ['Actual runtime captures', 'Shipping x64', 'Runtime log'],
                figures: [
                    {
                        stage: 'Checkpoint 01 · Direct launch',
                        src: 'Assets/images/gametechlab/evidence/week09-standalone-menu.png',
                        alt: 'LunaticEngine standalone Shipping executable displaying the Engine Dive main menu',
                        caption: 'The staged executable initialized its render path and presented the main menu outside Visual Studio.'
                    },
                    {
                        stage: 'Checkpoint 02 · START transition',
                        src: 'Assets/images/gametechlab/evidence/week09-start-transition.png',
                        alt: 'LunaticEngine standalone executable displaying the loading transition after START was selected',
                        caption: 'START moved the runtime into its loading transition.',
                        fit: 'crop-ui'
                    }
                ],
                facts: [
                    { label: 'Standalone launch', value: 'Verified', detail: 'Menu rendered · StoryScene BeginPlay observed' },
                    { label: 'Packaged output', value: '16 maps · 429 files', detail: 'Cook/Stage completed · 0 source .Scene files', hidden: true },
                    { label: 'Dependency Verify', value: 'Required asset gap detected', detail: 'BasicShape/cube.obj · Cache/cube.bin' },
                ],
                trace: {
                    label: 'Preserved Shipping runtime log',
                    file: 'ShippingBuild/Saves/Logs/Engine.log',
                    snippet: `[INFO] EngineInit: [INIT] Engine loop init complete
[INFO] Engine: [SceneLoad] Queued scene load: game/story.scene
[DEBUG] ScriptComponent: BeginPlay for actor: AUIRootActor_Story, script: Scripts/UI/StoryScene.lua
[DEBUG] ScriptComponent: Lua BeginPlay successful for Scripts/UI/StoryScene.lua`
                },
                method: 'Shipping x64 package and fresh Build → Cook → Stage → Verify run captured on 2026-08-22. Startup timing is transcribed from one preserved Shipping Engine.log run.',
                hardwareLabel: 'Capture PC',
                hardware: 'Intel Core i7-14700 · NVIDIA GeForce RTX 5060 8 GB (driver 596.36) · 32 GB RAM · Windows 11'
            }
        ],
        troubleshooting: [
            {
                title: 'Incremental-build ABI mismatch shifted frame data',
                symptom: 'Render code read FFrameContext fields from incorrect offsets after post-process settings were added, producing address-dependent failures across object files.',
                cause: 'A large FPostProcessSettings member was inserted in the middle of FFrameContext. Incrementally compiled translation units could still use the older C++ struct layout, so every following member moved relative to their compiled offsets.',
                fix: 'Moved the new post-process settings member to the end of FFrameContext and routed material parameters through the centralized camera/post-process structure.',
                result: 'Existing leading field offsets remain stable across incremental objects while the new post-process data remains available to draw-command construction.',
                commit: { hash: '09176be', url: 'https://github.com/Rocketstein/Jungle_Week9_Team6/commit/09176bef9a99a836b26dc76d53a62c6bc9b3b66a' }
            },
            {
                title: 'Screen text disappeared and vignette caused a black gamma result',
                symptom: 'ScreenText could sort before gamma correction, and high-intensity vignette blending could turn the corrected frame black.',
                cause: 'The draw SortKey reserved only four bits for ERenderPass, truncating pass IDs 16 and above. Separately, vignette blend weights above one made lerp extrapolate into negative colors before gamma correction.',
                fix: 'Expanded the render-pass field in SortKey from four to eight bits and clamped vignette blend weights with saturate().',
                result: 'ScreenText remains after gamma correction and vignette effects cannot feed negative color values into the final transform.',
                code: {
                    file: 'KraftonEngine/Source/Engine/Render/Command/DrawCommand.h',
                    context: 'FDrawCommand::ComputeSortKey()',
                    language: 'C++',
                    snippet: `uint64 Key = 0;
Key |= (static_cast<uint64>(InPass) & 0xFF) << 56;       // [63:56] Pass
Key |= (static_cast<uint64>(PtrHash16(InShader))) << 40; // [55:40] Shader
Key |= (static_cast<uint64>(PtrHash16(InMeshId))) << 24; // [39:24] MeshBuffer
Key |= (static_cast<uint64>(PtrHash16(InSRV))) << 8;     // [23:8] SRV
Key |= (static_cast<uint64>(UserBits) & 0xFF);           // [7:0] User
return Key;`
                },
                commit: { hash: '726c03f', url: 'https://github.com/Rocketstein/Jungle_Week9_Team6/commit/726c03f1d4c0c90b0245cc8b08acd9f8766ad1a3' }
            },
            {
                title: 'Shipping stage omitted runtime assets and used inconsistent roots',
                symptom: 'The standalone executable could launch but fail later because scenes, dialogue/scenario data, or mesh source/cache files were absent from the staged directory.',
                cause: 'The batch pipeline copied selected roots directly into ShippingBuild while cooked scenes lived under a separate directory, so source and cooked asset hierarchies diverged.',
                fix: 'Built one Saved/Cooked/Shipping asset root with mirrored source assets and cooked scenes, staged that root, derived the executable name from the project, and added required-file and source-or-cache mesh checks.',
                result: 'Packaging fails early when a runtime dependency is missing and produces a stage whose asset hierarchy matches runtime lookup rules.',
                code: {
                    file: 'ShippingBuild.bat',
                    context: 'Build and validate cooked asset root',
                    language: 'Batch',
                    snippet: `set "COOKED_ROOT=%SOLUTION_DIR%Saved\\Cooked\\%CONFIGURATION%"
set "COOKED_SCENE_DIR=%COOKED_ROOT%\\Asset\\Content\\Scene"

robocopy "%PROJECT_DIR%\\Asset" "%COOKED_ROOT%\\Asset" /MIR /NFL /NDL /NJH /NJS /NP /XD "%PROJECT_DIR%\\Asset\\Content\\Scene" /XF *.Scene *.umap *.pdb *.ilk *.obj.recipe
if errorlevel 8 (
    echo ERROR: Failed to build cooked Asset root.
    goto :Failed
)`
                },
                commit: { hash: '51d741c', url: 'https://github.com/Rocketstein/Jungle_Week9_Team6/commit/51d741c320864e1f140a36691437cfd3bd99194a' }
            },
            {
                title: 'Destroyed collision components remained in overlap peers',
                symptom: 'Destroying one side of an overlap could leave its address in the surviving component, allowing the next overlap pass to inspect freed memory.',
                cause: 'UPrimitiveComponent destruction removed the component from the world pending set but did not erase it from peers’ OverlapInfo arrays.',
                fix: 'Walked current overlaps during destruction, silently removed this component from every peer, and then cleared the local overlap list without broadcasting teardown events.',
                result: 'No surviving overlap peer retains the destroyed component pointer.',
                code: {
                    file: 'KraftonEngine/Source/Engine/Component/PrimitiveComponent.cpp',
                    context: 'UPrimitiveComponent destructor',
                    language: 'C++',
                    snippet: `for (const FOverlapInfo& Info : OverlapInfo)
{
    UPrimitiveComponent* Other = Info.HitResult.Component;
    if (Other && Other != this)
        Other->RemoveOverlapPeerSilent(this);
}
OverlapInfo.clear();`
                },
                commit: { hash: '968c630', url: 'https://github.com/Rocketstein/Jungle_Week9_Team6/commit/968c6303f19648933ee90b56977ffe2ee12768fb' }
            },
            {
                title: 'Tick queue retained raw members of objects that could die mid-frame',
                symptom: 'If an earlier tick destroyed an actor or component, a later queued FTickFunction pointer could address freed or reused object storage.',
                cause: 'GatherTickFunctions() queued addresses of PrimaryActorTick and PrimaryComponentTick, then dereferenced them later without revalidating their owner.',
                fix: 'Queued the target UObject and UUID instead, resolved the tick member immediately before execution, rejected dead or UUID-reused targets, and reset tick/world state during teardown.',
                result: 'A queued entry executes only while the original target and identity are still live.',
                code: {
                    file: 'KraftonEngine/Source/Engine/Core/TickFunction.cpp',
                    context: 'FTickManager::ResolveTickFunction()',
                    language: 'C++',
                    snippet: `if (!IsAliveObject(QueuedTickFunction.Target) ||
    QueuedTickFunction.Target->GetUUID() !=
        QueuedTickFunction.TargetUUID)
{
    return nullptr;
}`
                },
                commit: { hash: '799c296', url: 'https://github.com/Rocketstein/Jungle_Week9_Team6/commit/799c296b40f2b9fa94f9d09264d61875799019b2' }
            },
            {
                title: 'Post-process copies reused textures still bound as shader resources',
                symptom: 'Gamma, FXAA, or later post-process output could become invalid when a copy destination remained bound for shader reads from the previous pass.',
                cause: 'BeginPass() called CopyResource() for scene-color or depth copies before clearing the system SRV slots.',
                fix: 'Unbound system textures before each copy and then bound the fresh scene-color or stencil resources for the new pass.',
                result: 'The changed passes no longer retain the copy destination as a simultaneous pipeline input.',
                code: {
                    file: 'KraftonEngine/Source/Engine/Render/RenderPass/GammaCorrectionPass.cpp',
                    context: 'BeginPass()',
                    language: 'C++',
                    snippet: `Ctx.Resources.UnbindSystemTextures(Ctx.Device);
DC->CopyResource(
    Frame.SceneColorCopyTexture,
    Frame.ViewportRenderTexture);
DC->OMSetRenderTargets(1, &Cache.RTV, Cache.DSV);`
                },
                commit: { hash: 'c9db45c', url: 'https://github.com/Rocketstein/Jungle_Week9_Team6/commit/c9db45c73a163f853410fd55d18594988acbd81d' }
            }
        ],
        commitRefs: [
            { hash: '9d9fd5b', label: 'Shipping build', url: 'https://github.com/Rocketstein/Jungle_Week9_Team6/commit/9d9fd5bd20f3050f0d494b69e6b11b98ecef8355' },
            { hash: '61db202', label: 'Headless parsing builder', url: 'https://github.com/Rocketstein/Jungle_Week9_Team6/commit/61db20225e803bdb7a9e527195ad2c966bb82230' },
            { hash: '7d38d8f', label: 'Actor camera pipeline', url: 'https://github.com/Rocketstein/Jungle_Week9_Team6/commit/7d38d8f81d2cd39dff41fdd64a6ad7214ac8d3bd' },
            { hash: '726c03f', label: 'Gamma and render-order fix', url: 'https://github.com/Rocketstein/Jungle_Week9_Team6/commit/726c03f1d4c0c90b0245cc8b08acd9f8766ad1a3' }
        ],
        featured: true
    },
    {
        week: '10',
        theme: 'More Than Just Weight',
        title: 'Skeletal Mesh & Skinning Pipeline',
        summary: 'Implemented the skeletal-mesh component and scene proxy, CPU skinning, FBX bind-pose correction, bone visualization and picking, and morph-target updates.',
        role: 'Skeletal Rendering Programmer',
        objective: 'Move imported skeletal data from a viewer-only state into a renderable, selectable, and dynamically updateable engine component.',
        contributions: [
            'Created USkeletalMeshComponent, its scene proxy, FSkeletalMesh wrapping, and the initial object CPU-skinning path.',
            'Added rigid-bind and non-hierarchical bone handling, dynamic mesh updates, bounds, show flags, and bounding-box picking.',
            'Corrected FBX cluster bind-pose alignment, then added rasterized bone drawing, bone picking, morph targets, and texture-SRV recovery.'
        ],
        implementation: [
            'Skeletal mesh component, scene proxy, FSkeletalMesh resource, and CPU skinning',
            'FBX cluster Transform / TransformLink bind source and rigid-bind fallback',
            'Dynamic skinned-mesh update, bounds, bone rasterization, picking, and morph targets'
        ],
        flow: 'FBX skeletal data → bind pose + skin weights → component / scene proxy → skinned vertices + bone tools',
        technologies: ['C++', 'FBX SDK', 'Skeletal Mesh', 'CPU Skinning', 'Picking', 'Morph Target'],
        results: [
            'Established the component and renderer path required for imported skeletal assets.',
            'Resolved the 90-degree bind-pose offset seen with mismatched Blender/FBX bind data.'
        ],
        evidenceStatus: 'Verified author commits',
        evidenceNote: 'Week10-specific work is separated from the inherited Week09 history by the May 9–13 skeletal-import and rendering commit range.',
        sourceUrl: 'https://github.com/HaXX0rBunny/Jungle_Week10_Team5/commits/main/?author=HaXX0rBunny',
        sourceLabel: 'Open authored Week10 commits',
        troubleshooting: [
            {
                title: 'Blender FBX skeleton imported with a 90-degree bind offset',
                symptom: 'Some Blender/FBX 6.x skeletal meshes rendered with bones and skinned vertices rotated approximately 90 degrees from the mesh.',
                cause: 'The importer trusted scene BindPose mesh data even when it disagreed with the skin cluster’s Transform and TransformLink matrices, which are the authoritative mesh and linked-bone bind transforms for the skin deformation.',
                fix: 'Preferred cluster Transform/TransformLink when resolving the reference mesh bind matrix, handled Blender armature-root stripping, and bumped the skeletal bake version so stale .skm caches are regenerated.',
                result: 'The imported reference skeleton and skinning matrices align with the source mesh instead of inheriting the mismatched scene bind pose.',
                code: {
                    file: 'LunaticEngine/Source/Engine/Mesh/Fbx/FbxSkeletonImporter.cpp',
                    context: 'FFbxSkeletonImporter::TryGetFirstMeshBindMatrix()',
                    language: 'C++',
                    snippet: `FbxAMatrix MeshNodeBindFbx;
Cluster->GetTransformMatrix(MeshNodeBindFbx);

const FMatrix MeshNodeBind = FFbxTransformUtils::ToEngineMatrix(MeshNodeBindFbx);

OutMeshBindMatrix = GeometryTransform * MeshNodeBind;
return true;`
                },
                commit: { hash: '86411d4', url: 'https://github.com/HaXX0rBunny/Jungle_Week10_Team5/commit/86411d45ef0e635bb5edff3b5da7a622c215e5f2' }
            },
            {
                title: 'Bone picking did not match the armature drawn on screen',
                symptom: 'Thin or joint areas were difficult to select, and the preview gizmo rotation could disagree with the selected bone’s rendered world orientation.',
                cause: 'Picking used distance-to-segment/radius approximations instead of the actual solid armature triangles, while rotation composition did not follow the engine’s row-vector BoneComponent × MeshWorld convention.',
                fix: 'Ray-tested the same body and joint triangles used for armature rendering and extracted the no-scale world quaternion from BoneComponentTransform.ToMatrix() × MeshWorldMatrix.',
                result: 'Clicks resolve against visible bone geometry, including joints, and the gizmo follows the selected bone’s displayed world transform.',
                commit: { hash: 'ac36adf', url: 'https://github.com/HaXX0rBunny/Jungle_Week10_Team5/commit/ac36adffb0021db73ebde3d432ecb63476c0e36b' }
            },
            {
                title: 'Loaded materials retained missing texture SRVs',
                symptom: 'A cached or reloaded skeletal material could exist but render without one or more textures because its texture object or SRV had not been restored.',
                cause: 'Material-cache hits returned the existing material without re-reading asset texture assignments or rebuilding the cached SRV array after resource recreation.',
                fix: 'Detected missing JSON-declared textures, reapplied them from the material asset, rebuilt cached SRVs, and used the load path for preview textures so cache synchronization always runs.',
                result: 'Materials recover texture bindings after reload or device-resource rebuild instead of preserving a partially initialized cache entry.',
                commit: { hash: '0c90ed9', url: 'https://github.com/HaXX0rBunny/Jungle_Week10_Team5/commit/0c90ed90a5bea437c1be4751d26031147c4b6c90' }
            },
            {
                title: 'CPU skinning uploaded the mesh inside the vertex loop',
                symptom: 'One skeletal update repeatedly acquired the immediate context and created or updated GPU buffers while CPU vertices were still being computed.',
                cause: 'The vertex-buffer update and MeshBuffer creation block was scoped inside the loop over LOD vertices.',
                fix: 'Completed the entire skinned vertex array first, acquired one context, and created or updated the GPU buffer once after the loop.',
                result: 'FSkeletalMeshObjectCPU::Update() now performs one upload path per call and uploads the completed CPU result.',
                code: {
                    file: 'LunaticEngine/Source/Engine/Render/Skeletal/SkeletalMeshObjectCPU.cpp',
                    context: 'FSkeletalMeshObjectCPU::Update()',
                    language: 'C++',
                    snippet: `for (size_t v = 0; v < LOD.Vertices.size(); ++v)
{
    // Compute completed CPU output.
}

Device->GetImmediateContext(&Context);
if (!VB.GetBuffer())
    VB.Create(/* completed vertex array */);
else
    VB.Update(Context, SkinnedMeshData.Vertices.data(), TotalSize);`
                },
                commit: { hash: '1d11772', url: 'https://github.com/HaXX0rBunny/Jungle_Week10_Team5/commit/1d1177266fa5b380dba4f93b8edcaaa705233a45' }
            },
            {
                title: 'Morph changes left CPU skinning stale and ignored progressive shapes',
                symptom: 'Changing a morph weight did not immediately rebuild the CPU buffer, and intermediate weights always scaled the final FBX shape instead of following progressive shape thresholds.',
                cause: 'SetMorphTarget() and ClearMorphTargets() only marked data dirty, while ApplyMorphTargets() always selected Shapes.back() and ignored FullWeight.',
                fix: 'Triggered UpdateSkinnedMeshObject() from weight setters and interpolated between neighboring shape-delta sets using their declared FullWeight ranges.',
                result: 'Weight changes update the rendered CPU-skinned mesh and progressive FBX morphs follow their authored thresholds.',
                code: {
                    file: 'LunaticEngine/Source/Engine/Render/Skeletal/SkeletalMeshObjectCPU.cpp',
                    context: 'ApplyMorphLODByWeight()',
                    language: 'C++',
                    snippet: `const float Alpha = std::clamp(
    (FbxWeight - PrevShape.FullWeight) / Denom,
    0.0f,
    1.0f);
ApplyInterpolatedShapeDeltas(
    PrevShape, NextShape, Alpha, InOutVertices);`
                },
                commit: { hash: '120802a', url: 'https://github.com/HaXX0rBunny/Jungle_Week10_Team5/commit/120802a2f1cc937c6c47224fc0ef4cbcd57196b4' }
            },
            {
                title: 'Duplicated skeletal components lost runtime render state',
                symptom: 'A duplicated component retained serialized paths and arrays but did not reconstruct its mesh asset, material overrides, pose, CPU mesh object, or render state.',
                cause: 'USkinnedMeshComponent::PostDuplicate() called only the base implementation, and the derived component refreshed transforms without rebuilding the skinned object.',
                fix: 'Reloaded SkeletalMeshPath, restored material slots and compatible bone transforms, rebuilt the mesh object, and dirtied bounds and proxy state.',
                result: 'The duplicate reconstructs runtime asset and rendering data from its copied serialized state.',
                code: {
                    file: 'LunaticEngine/Source/Engine/Component/SkinnedMeshComponent.cpp',
                    context: 'PostDuplicate()',
                    language: 'C++',
                    snippet: `USkeletalMesh* Loaded =
    FSkeletalMeshManager::LoadSkeletalMesh(SkeletalMeshPath);
if (Loaded)
{
    SetSkeletalMeshInternal(Loaded, false, false);
    RefreshBoneTransforms();
    UpdateSkinnedMeshObject();
}`
                },
                commit: { hash: 'f3640c0', url: 'https://github.com/HaXX0rBunny/Jungle_Week10_Team5/commit/f3640c0c14c64a61adaf0c0327ceaf07f6c3e551' }
            }
        ],
        commitRefs: [
            { hash: '3d0dd0f', label: 'Component and CPU skinning', url: 'https://github.com/HaXX0rBunny/Jungle_Week10_Team5/commit/3d0dd0f3544c47dd450e10fd5a71105dd57ed20a' },
            { hash: '86411d4', label: 'FBX bind-pose alignment', url: 'https://github.com/HaXX0rBunny/Jungle_Week10_Team5/commit/86411d45ef0e635bb5edff3b5da7a622c215e5f2' },
            { hash: '26796d2', label: 'Rasterized bone drawing', url: 'https://github.com/HaXX0rBunny/Jungle_Week10_Team5/commit/26796d23963bb99cafe0d9e931dc2343598c7a5d' },
            { hash: 'ac36adf', label: 'Bone picking', url: 'https://github.com/HaXX0rBunny/Jungle_Week10_Team5/commit/ac36adffb0021db73ebde3d432ecb63476c0e36b' }
        ]
    },
    {
        week: '11',
        theme: "Let's Go, Move!",
        title: 'FBX Animation Pipeline',
        summary: 'Built the animation-sequence import and asset pipeline around the reference skeleton, FBX channels, binary cache validation, bone palettes, editor tools, and Lua exposure.',
        role: 'Animation Pipeline Programmer',
        objective: 'Import animation independently from skeletal meshes, validate it against the target skeleton, cache it safely, and expose it to editor and runtime systems.',
        contributions: [
            'Refactored mesh bones into a reference skeleton and implemented FBX animation sequence loading with transform utilities and binary serialization.',
            'Added cache source/skeleton/version validation, bone-match diagnostics, authored channel sampling, and resource cleanup.',
            'Introduced section bone palettes and animation-sequence assets that can be saved from the viewer, shown in the editor, referenced by components, packaged, and exposed to Lua.'
        ],
        implementation: [
            'Reference skeleton and FFbxAnimSequenceImporter',
            'FBX channel sampling, cache identity/version validation, and target-skeleton binding',
            'Section bone palettes, animation asset descriptors, editor viewer, component reference, packaging, and Lua API'
        ],
        flow: 'FBX animation stack → skeleton-matched tracks → validated binary cache → animation asset → component / GPU bone palette',
        technologies: ['C++', 'FBX SDK', 'Animation', 'Binary Cache', 'GPU Skinning', 'Lua'],
        results: [
            'Separated reusable animation assets from skeletal-mesh import and added explicit compatibility checks.',
            'Connected the same asset from import and cache through editor inspection, packaging, Lua, and component playback.'
        ],
        evidenceStatus: 'Verified author commits',
        evidenceNote: 'Authored history connects reference-skeleton processing, animation import and cache validation, and editor, package, and Lua integration to the personal implementation scope.',
        sourceUrl: 'https://github.com/nacho2407/jungle-gtl-week11/commits/main/?author=HaXX0rBunny',
        sourceLabel: 'Open authored Week11 commits',
        troubleshooting: [
            {
                title: 'Duplicate FBX bone names bound animation to the wrong node',
                symptom: 'Animation tracks could bind to an unrelated node when an FBX contained multiple nodes with the same bone name.',
                cause: 'The importer stored one node per name, so later duplicates overwrote earlier entries and name-only lookup ignored the target skeleton’s parent hierarchy.',
                fix: 'Stored every candidate node per name, recursively resolved each target bone after resolving its parent, preferred candidates descending from that parent, and logged duplicate paths and hierarchy mismatches.',
                result: 'Track binding follows the reference-skeleton hierarchy and ambiguous files produce actionable diagnostics instead of silently choosing the last duplicate.',
                code: {
                    file: 'JSEngine/Source/Engine/Asset/FbxAnimSequenceImporter.cpp',
                    context: 'ResolveBoneNodeForSkeleton()',
                    language: 'C++',
                    snippet: `if (ParentBoneNode)
{
    for (fbxsdk::FbxNode* Candidate : Candidates)
    {
        if (HasAncestorNode(Candidate, ParentBoneNode))
        {
            if (!SelectedNode)
            {
                SelectedNode = Candidate;
            }
            ++MatchCount;
        }
    }
}`
                },
                commit: { hash: '6134cc0', url: 'https://github.com/nacho2407/jungle-gtl-week11/commit/6134cc028d59542dbe4d1599cc9c02301d54cf19' }
            },
            {
                title: 'Animation cache could represent a different FBX stack',
                symptom: 'A cache file could be accepted after the source FBX or selected animation stack changed, returning stale animation data.',
                cause: 'Validity checked only source modification time; that did not identify file size or which animation stack had produced the cache.',
                fix: 'Raised the binary format to version 3 and recorded source write time, source byte size, and a stable hash of the animation-stack name in the header.',
                result: 'A source or stack identity mismatch rejects the cache and forces a fresh import.',
                commit: { hash: '6db77c9', url: 'https://github.com/nacho2407/jungle-gtl-week11/commit/6db77c90cba0dca20da8966ec7389db6a915f52f' }
            },
            {
                title: 'Valid source cache could still target the wrong skeleton',
                symptom: 'The same animation source and stack could load from cache even when requested for a different or modified reference skeleton.',
                cause: 'Source identity alone did not encode target bone count, parent hierarchy, names, or local bind transforms.',
                fix: 'Raised the binary format to version 4 and added target bone count plus a stable hash over every bone name, parent index, and local bind matrix.',
                result: 'The loader accepts cached tracks only when both source animation and target reference skeleton match.',
                commit: { hash: 'b9c1368', url: 'https://github.com/nacho2407/jungle-gtl-week11/commit/b9c136856ffaf83a78533df71d22342271b7efde' }
            },
            {
                title: 'Mirrored FBX transforms inverted triangle winding',
                symptom: 'Meshes with a negative-determinant node or bind transform could turn inside out or lose faces under back-face culling.',
                cause: 'Control points received the global and geometric transform, but triangle indices were always stored as I0, I1, I2 even when that transform changed handedness.',
                fix: 'Detected a negative upper 3 × 3 determinant, swapped I1 and I2, and bumped static and skeletal binary versions to invalidate stale caches.',
                result: 'Static, skinned, and rigid-attached meshes store winding that matches the transformed coordinate system.',
                code: {
                    file: 'JSEngine/Source/Engine/Asset/FbxImporter.cpp',
                    context: 'AppendTriangleIndices() / ProcessSkeletalMesh()',
                    language: 'C++',
                    snippet: `OutIndices.push_back(I0);
OutIndices.push_back(bReverseWinding ? I2 : I1);
OutIndices.push_back(bReverseWinding ? I1 : I2);`
                },
                commit: { hash: '505eba8', url: 'https://github.com/nacho2407/jungle-gtl-week11/commit/505eba8f4ca69939d2d8cf8010bf839984d4fcf7' }
            },
            {
                title: 'FBX local transforms used a different parent basis than runtime',
                symptom: 'When helper or armature nodes separated FBX bones, imported animation tracks could use a local basis different from the reference skeleton used at runtime.',
                cause: 'EvaluateLocalTransform() was relative to the direct FBX parent, while runtime composition was relative to Bone.ParentIndex in the reference skeleton.',
                fix: 'Sampled each bone global transform and its reference-parent global transform, then computed BoneGlobal × inverse(ParentGlobal); the animation cache version was raised.',
                result: 'Imported tracks use the same parent basis as runtime pose composition and old-basis caches are rejected.',
                code: {
                    file: 'JSEngine/Source/Engine/Asset/FbxAnimSequenceImporter.cpp',
                    context: 'EvaluateEngineLocalBoneMatrix()',
                    language: 'C++',
                    snippet: `const FMatrix ParentGlobal =
    FFbxTransformUtils::ToFMatrix(
        ParentBoneNode->EvaluateGlobalTransform(SampleTime));
return BoneGlobal * ParentGlobal.GetInverse();`
                },
                commit: { hash: '41309b4', url: 'https://github.com/nacho2407/jungle-gtl-week11/commit/41309b49b3e944bd1ad6603ab62ad4ee1537e57e' }
            },
            {
                title: 'Bones without scale curves acquired synthetic scale animation',
                symptom: 'A bone with no authored LclScaling curve could still receive a scale key on every sampled frame.',
                cause: 'The importer wrote evaluated scale every frame without distinguishing an authored channel from inherited or constant evaluation.',
                fix: 'Checked all animation layers for X/Y/Z scale keys, emitted one bind-scale key when no scale curve existed, and collapsed authored constant curves to one key.',
                result: 'Curveless bones retain constant bind scale while genuinely authored scale variation remains in the track.',
                code: {
                    file: 'JSEngine/Source/Engine/Asset/FbxAnimSequenceImporter.cpp',
                    context: 'LoadAnimSequence()',
                    language: 'C++',
                    snippet: `const bool bHasAuthoredScaleCurve =
    HasAuthoredScaleCurve(BoneNode, Stack);

if (!bHasAuthoredScaleCurve)
{
    SetConstantScaleTrack(Raw, BindScale);
}`
                },
                commit: { hash: '6de6a24', url: 'https://github.com/nacho2407/jungle-gtl-week11/commit/6de6a245563084262d904112ed64796ad1b0b2dc' }
            }
        ],
        commitRefs: [
            { hash: 'd41b6bd', label: 'FBX animation sequence loading', url: 'https://github.com/nacho2407/jungle-gtl-week11/commit/d41b6bd64de85d1ba60d1610dceb1cbeaa917487' },
            { hash: '9cc0376', label: 'Importer and binary serialization', url: 'https://github.com/nacho2407/jungle-gtl-week11/commit/9cc0376d3cb6efc7870c5713c7234438e14f27aa' },
            { hash: 'e884398', label: 'Section bone palettes', url: 'https://github.com/nacho2407/jungle-gtl-week11/commit/e8843984499b2f93367ffd844c9f5376106243f9' },
            { hash: '978363a', label: 'Animation asset descriptor', url: 'https://github.com/nacho2407/jungle-gtl-week11/commit/978363af38483be1b5f892009300ea5ba24ed235' }
        ]
    },
    {
        week: '12',
        theme: 'Dance of the Dust',
        title: 'Particle Runtime & Editor',
        summary: 'Built the particle foundation, runtime emitter APIs, asset workflow, LOD compilation, renderer properties, and event dispatch used by the editor and render pass.',
        role: 'Particle Systems & Tools Programmer',
        objective: 'Create a particle architecture that could be authored as an asset, compiled for runtime, rendered through dedicated passes, and extended without exposing emitter internals.',
        contributions: [
            'Implemented the base particle system, modules, emitter instances, component integration, events, and documented module execution order.',
            'Encapsulated emitter state behind runtime access APIs and added asset persistence, deep-copy ownership, cache management, and actor placement.',
            'Introduced compiled LOD data and renderer-property abstractions, then connected editor validation, smoke-test rendering, and runtime event dispatch.'
        ],
        implementation: [
            'ParticleSystem, ParticleEmitterInstance, modules, component, events, and dynamic render data',
            'Editor asset workflow, emitter/LOD controls, validation, duplication, serialization, and cache ownership',
            'Compiled LOD bindings, renderer properties, particle render pass, runtime listeners, and event-dispatch policy'
        ],
        flow: 'Particle asset → compiled LOD + renderer properties → emitter simulation → render pass / runtime events',
        technologies: ['C++', 'Particles', 'ImGui', 'LOD', 'Asset Pipeline', 'Render Pass'],
        results: [
            'Established the particle system from its base runtime through authoring, placement, validation, and rendering.',
            'Separated editor-facing data from compiled runtime bindings and removed legacy TypeData ownership.'
        ],
        evidenceStatus: 'Verified author commits',
        evidenceNote: 'Authored history connects the particle runtime and editor architecture, compiled LOD binding, deep-copy and cache ownership, and event dispatch to the personal implementation scope.',
        sourceUrl: 'https://github.com/mathison0/Jungle_Week12_Team3/commits/main/?author=HaXX0rBunny',
        sourceLabel: 'Open authored Week12 commits',
        troubleshooting: [
            {
                title: 'Particle assets had ambiguous editor/cache ownership',
                symptom: 'Closing documents, restoring undo snapshots, or shutting down the editor could leak temporary particle assets or destroy an instance still owned by the resource cache.',
                cause: 'Loaded assets, preview-only assets, and document snapshots shared raw UParticleSystem pointers without a single rule distinguishing cached ownership from temporary editor ownership.',
                fix: 'Added a normalized ParticleSystemMap cache, returned existing cached assets on reload, destroyed only uncached document/preview instances, and released cached assets centrally with other resource-manager GPU resources.',
                result: 'Each particle asset follows either resource-cache lifetime or explicit temporary-editor lifetime, avoiding both duplicate objects and accidental destruction of shared assets.',
                commit: { hash: '9c63edd', url: 'https://github.com/mathison0/Jungle_Week12_Team3/commit/9c63edd0183c3f1207d23dc07bea8c52d53f8a9a' }
            },
            {
                title: 'Runtime emitters kept stale compiled LOD pointers after edits',
                symptom: 'Changing modules, renderer type, or LOD data in the particle editor did not reliably update the preview and placed components; existing emitter instances could reference obsolete compiled data.',
                cause: 'CacheEmitterModuleInfo rebuilt CompiledLODData, but runtime emitter instances retained pointers and payload assumptions from the previous compilation.',
                fix: 'Added a CompiledRevision, validated payload size/stride/render mode compatibility, and implemented RefreshTemplateRuntime to rebind a compatible LOD or recreate emitter instances when the contract changed.',
                result: 'Editor changes propagate to preview and world components without leaving runtime instances attached to invalid compiled bindings.',
                code: {
                    file: 'JSEngine/Source/Engine/Particle/ParticleSystemComponent.cpp',
                    context: 'UParticleSystemComponent::RefreshTemplateRuntime()',
                    language: 'C++',
                    snippet: `const FCompiledParticleLODData* NewLOD = Emitter ?
    Emitter->SelectCompiledLODData(Distance) : nullptr;

if (!Emitter || !Instance || Instance->GetTemplate() != Emitter ||
    !Instance->CanRebindCompiledLOD(NewLOD))
{
    RecreateEmitterInstances();
    return;
}`
                },
                commit: { hash: 'ea7efde', url: 'https://github.com/mathison0/Jungle_Week12_Team3/commit/ea7efde30255864e15395497efd3f20a8ba68e0f' }
            },
            {
                title: 'Serialized event-dispatcher references coupled assets to runtime actors',
                symptom: 'Particle components and assets could retain hidden dispatcher dependencies, making reuse and save/load behavior depend on a specific gameplay actor.',
                cause: 'UParticleSystemComponent directly stored an AParticleEventManager pointer instead of exposing events at the component boundary.',
                fix: 'Made the component delegate the official event surface, moved binding into AParticleEventManager as a runtime-only listener, removed serialized dispatcher ownership, and explicitly unbound delegate IDs during destruction.',
                result: 'Particle assets stay reusable; gameplay listeners can subscribe per runtime component without back-references in serialized simulation data.',
                commit: { hash: 'ac26edb', url: 'https://github.com/mathison0/Jungle_Week12_Team3/commit/ac26edb45d602a4b604051f2ef4dc8a0b783fb9c' }
            },
            {
                title: 'Duplicated particle assets shared their owned child graph',
                symptom: 'Editing or destroying a duplicated emitter, LOD, or module could affect the original asset through the same child pointers.',
                cause: 'Default duplication copied raw child arrays without recursively duplicating objects owned by the particle hierarchy.',
                fix: 'Implemented PostDuplicate() through ParticleSystem → Emitter → LOD → Module, duplicated each child, rebuilt cached module lists, and made destructors clear owned children.',
                result: 'Original and duplicated particle assets hold separate editable object graphs.',
                code: {
                    file: 'JSEngine/Source/Engine/Particle/ParticleSystem.cpp',
                    context: 'UParticleLODLevel::PostDuplicate()',
                    language: 'C++',
                    snippet: `UParticleModule* DuplicatedModule = SourceModule
    ? Cast<UParticleModule>(SourceModule->Duplicate())
    : nullptr;
if (DuplicatedModule)
    Modules.push_back(DuplicatedModule);

CacheModuleLists();`
                },
                commit: { hash: 'ed26199', url: 'https://github.com/mathison0/Jungle_Week12_Team3/commit/ed26199df91f4ac50678234ed2219066af434c93' }
            },
            {
                title: 'Particle template references were not persistable asset references',
                symptom: 'A saved and loaded component could fail to restore its UParticleSystem template by path or keep the same template pointer with zero runtime emitters.',
                cause: 'Particle assets lacked a normalized AssetPath and resolver support, Template was not marked as an asset reference, and SetTemplate() returned early even when instances were empty.',
                fix: 'Stored the asset path, resolved particle references through ResourceManager, marked Template as an asset reference, and rebuilt when emitter instances were missing.',
                result: 'Saved component references resolve to the particle asset and reconstruct their runtime emitter instances.',
                code: {
                    file: 'JSEngine/Source/Engine/Particle/ParticleSystemComponent.cpp',
                    context: 'SetTemplate()',
                    language: 'C++',
                    snippet: `if (Template == InTemplate && !EmitterInstances.empty())
{
    return;
}
Template = InTemplate;
RecreateEmitterInstances();`
                },
                commit: { hash: 'e5a1fa5', url: 'https://github.com/mathison0/Jungle_Week12_Team3/commit/e5a1fa50f2f5e6fbeb31e0dff51488f99d53b4d2' }
            },
            {
                title: 'Event dispatch could run before event-producing modules',
                symptom: 'If EventGenerator preceded a collision or update module in authored order, it could drain the queue before same-frame events were produced.',
                cause: 'CacheModuleLists() preserved arbitrary module order even though EventGenerator is the dispatcher and must follow producers.',
                fix: 'Collected event-generator modules separately and appended them after all other update modules.',
                result: 'Event-producing updates complete before dispatch in every compiled LOD.',
                code: {
                    file: 'JSEngine/Source/Engine/Particle/ParticleSystem.cpp',
                    context: 'UParticleLODLevel::CacheModuleLists()',
                    language: 'C++',
                    snippet: `if (Cast<UParticleModuleEventGenerator>(Module))
    DeferredEventModules.push_back(Module);
else
    UpdateModules.push_back(Module);

for (UParticleModule* EventModule : DeferredEventModules)
    UpdateModules.push_back(EventModule);`
                },
                commit: { hash: '4e2bffe', url: 'https://github.com/mathison0/Jungle_Week12_Team3/commit/4e2bffeb0cc3b19ef963670939b7cda9f43dc5c7' }
            }
        ],
        commitRefs: [
            { hash: '9f129f1', label: 'Particle base system', url: 'https://github.com/mathison0/Jungle_Week12_Team3/commit/9f129f17261ae474b18ebcc0e39cf93eebcf37c2' },
            { hash: 'a235301', label: 'Particle editor asset workflow', url: 'https://github.com/mathison0/Jungle_Week12_Team3/commit/a23530150e96aef53b4a7a3fd278c0590c80cc08' },
            { hash: '9cae91b', label: 'Compiled LOD data', url: 'https://github.com/mathison0/Jungle_Week12_Team3/commit/9cae91bbcc7818bf00ff2fedaafb40fc1f8d06e1' },
            { hash: '38921e5', label: 'Runtime event dispatcher', url: 'https://github.com/mathison0/Jungle_Week12_Team3/commit/38921e53ab9c45b4e24b1c03e5eeb46d1b971cc9' }
        ]
    },
    {
        week: '13',
        theme: 'Understanding Focus and Force in 3D World · Two DOF Techniques',
        title: 'Physics Asset Editor',
        summary: 'Implemented the physics-asset editing workflow used to generate, pick, inspect, and modify collision bodies around skeletal meshes.',
        role: 'Physics Tools Programmer',
        objective: 'Turn generated skeletal collision bodies into editable assets with viewport selection, transform gizmos, node relationships, collision controls, and material profiles.',
        contributions: [
            'Added physics-asset editing APIs, viewport scaffolding, picking, generation controls, and humanoid filtering.',
            'Implemented viewport gizmo editing, view presets, node graph inspection, and collision editing.',
            'Added physical-material body profiles and fixed axis-mask, alpha, gizmo, and shape-type editing behavior.'
        ],
        implementation: [
            'Physics body generation and skeletal-bone filtering',
            'Viewport picking, transform gizmo, view presets, and shape editing',
            'Node graph, collision rules, and physical-material body profiles'
        ],
        flow: 'Skeletal mesh → generated physics bodies → viewport selection / gizmo edit → saved physics asset',
        technologies: ['C++', 'Physics Asset', 'Editor Tools', 'Picking', 'Gizmo'],
        results: [
            'Delivered an end-to-end physics-asset authoring workflow instead of a read-only collision preview.',
            'Connected generation, inspection, transform editing, collision behavior, and physical materials in one tool.'
        ],
        evidenceStatus: 'Verified author commits',
        evidenceNote: 'Authored diffs connect physics-body generation, viewport picking and gizmos, and node, collision, and material profiles to the personal implementation scope.',
        sourceUrl: 'https://github.com/puter2712git/Jungle_Week13_Team3/commits/main/?author=HaXX0rBunny',
        sourceLabel: 'Open authored Week13 commits',
        troubleshootingEvidence: [
            {
                caseId: 'physics-body-generation',
                kicker: 'Preserved runtime trace',
                title: 'The physics preview logged the generated body dimensions and bone-space scale used for drawing.',
                summary: 'The preserved Engine.log records the Radius, Length, and bone-space Scale used to draw six generated Sphyl bodies in the physics preview.',
                tags: ['Actual runtime log', 'Physics bodies', 'Case 01'],
                facts: [
                    { label: 'Logged bodies', value: '6', detail: 'Pelvis and left/right leg chain' },
                    { label: 'Shape', value: 'Sphyl', detail: 'Stored radius and length' },
                    { label: 'Bone scale', value: '1.0000', detail: 'Uniform in the preserved sample' }
                ],
                trace: {
                    label: 'Post-implementation draw trace',
                    file: 'KraftonEngine/Saves/Logs/Engine.log',
                    snippet: `[PhysDraw] Bone=Bip001 Pelvis | stored sphyl(R,L)=(0.12,0.02,0.00) | BoneMatScale=(1.0000,1.0000,1.0000) avg=1.0000 | world~=stored*avg=0.12
[PhysDraw] Bone=Bip001 L Thigh | stored sphyl(R,L)=(0.08,0.21,0.00) | BoneMatScale=(1.0000,1.0000,1.0000) avg=1.0000 | world~=stored*avg=0.08
[PhysDraw] Bone=Bip001 L Calf | stored sphyl(R,L)=(0.06,0.25,0.00) | BoneMatScale=(1.0000,1.0000,1.0000) avg=1.0000 | world~=stored*avg=0.06
[PhysDraw] Bone=Bip001 R Thigh | stored sphyl(R,L)=(0.08,0.21,0.00) | BoneMatScale=(1.0000,1.0000,1.0000) avg=1.0000 | world~=stored*avg=0.08`
                },
                method: 'Recovered the physics-draw rows from the project runtime log and matched their fields to the generated Sphyl dimensions and bone-matrix scale used by the preview draw path.'
            }
        ],
        troubleshooting: [
            {
                id: 'physics-body-generation',
                title: 'Generated bodies used inconsistent spaces and dropped small-bone influence',
                symptom: 'Physics bodies could be mis-sized or stretched, while small bones were filtered out without their influenced vertices contributing to a usable parent body.',
                cause: 'Body generation mixed skeletal/global assumptions with per-bone point clouds and applied a broad humanoid filter before consolidating small candidates.',
                fix: 'Kept candidate vertices in bone-local space, transformed and merged undersized point clouds into the parent’s local space, measured merged candidates, and forced structurally necessary parent bodies when appropriate.',
                result: 'Generated shapes better follow the skinned mesh volume while helper or tiny bones contribute geometry without creating unusably small standalone bodies.',
                commit: { hash: '3f5a7d9', url: 'https://github.com/puter2712git/Jungle_Week13_Team3/commit/3f5a7d9bc5780b07a246f564976c27bb85cdb7e5' }
            },
            {
                title: 'Generic gizmo axes exposed invalid shape edits',
                symptom: 'The physics editor displayed redundant or meaningless scale handles—for example three independent axes for a sphere radius or duplicate radius axes for a capsule.',
                cause: 'The viewport reused the generic gizmo axis mask without considering the selected physics shape’s degrees of freedom.',
                fix: 'Computed a shape-aware mask: one available scalar axis for spheres, X for capsule radius and Z for capsule length, with a fallback when the current orthographic view hides those axes. The edit alpha was corrected in the same path.',
                result: 'Displayed handles correspond to parameters the selected shape can actually modify and remain operable in constrained views.',
                code: {
                    file: 'KraftonEngine/Source/Editor/Viewport/Asset/PhysicsAssetEditorViewportClient.cpp',
                    context: 'FPhysicsAssetEditorViewportClient::ComputeGizmoAxisMask()',
                    language: 'C++',
                    snippet: `case EPhysicsAssetShapeType::Sphere:
    AxisMask = FirstAvailableAxisMask(BaseAxisMask);
    break;
case EPhysicsAssetShapeType::Sphyl:
    AxisMask = BaseAxisMask & 0x5;
    if (AxisMask == 0)
    {
        AxisMask = FirstAvailableAxisMask(BaseAxisMask);
    }
    break;`
                },
                commit: { hash: '0a12dca', url: 'https://github.com/puter2712git/Jungle_Week13_Team3/commit/0a12dca3c37783d35aa0dd03e6787a3d8b8929d9' }
            },
            {
                title: 'Physics gizmo visibility and shape conversion were incomplete',
                symptom: 'The transform gizmo could disappear into the preview draw and changing a body between box, sphere, and capsule did not provide a complete editor operation.',
                cause: 'The gizmo used the ordinary debug draw path and the widget lacked a coordinated shape-type replacement flow.',
                fix: 'Added additive gizmo drawing and editor controls that replace the aggregate geometry with the selected shape type while preserving the asset-edit workflow.',
                result: 'The active manipulation control stays visually distinct and body shape conversion is available from the same physics-asset editor.',
                commit: { hash: 'bfd7c08', url: 'https://github.com/puter2712git/Jungle_Week13_Team3/commit/bfd7c08951dcc78d2687c15f5d9c760dad5564da' }
            }
        ],
        commitRefs: [
            { hash: '2d46987', label: 'Physics asset editor workflow', url: 'https://github.com/puter2712git/Jungle_Week13_Team3/commit/2d46987dad6ecfc4290df2a403a98d623234c18a' },
            { hash: '965e731', label: 'Viewport gizmo editing', url: 'https://github.com/puter2712git/Jungle_Week13_Team3/commit/965e73132bcd8cb037f9528e6a0b1f7d36ef3ce3' },
            { hash: '08ddd2d', label: 'Node graph and collision editing', url: 'https://github.com/puter2712git/Jungle_Week13_Team3/commit/08ddd2d306d8e946a9174f05a508f3d1c4d19e28' },
            { hash: '1b88398', label: 'Physical material body profiles', url: 'https://github.com/puter2712git/Jungle_Week13_Team3/commit/1b883984b04a0a7b86a3edbea062f30be57ccd5d' }
        ]
    },
    {
        week: '14',
        theme: 'Final Game Jam · The Stage Is Set. Let the Game Begin!',
        title: 'Final Game Integration & Tools',
        summary: 'Integrated Unreal-authored scenes, decals, boss and score UI, game-flow transitions, loading, cutscenes, and audio into the final custom-engine game.',
        role: 'Game Flow & Integration Programmer',
        objective: 'Convert the accumulated engine features and authored content into a coherent playable flow from scene loading and countdown to combat UI, scoring, cutscenes, and ending credits.',
        contributions: [
            'Added the boss UI flow, imported Unreal-authored Tokyo scenes, and implemented decal export/import for the custom engine.',
            'Connected countdown, scoreboard, score recording, combo UI, boss and mob HP bars, loading scenes, and ending credits.',
            'Implemented a two-page, five-cut reveal sequence, synchronized it with asynchronous scene readiness, added retry skip behavior, and tuned transition-specific audio timing and volume.'
        ],
        implementation: [
            'Unreal scene and decal exporter/importer pipeline',
            'Lua/RmlUi game flow, scoreboard, combo, boss/mob HP, countdown, loading, and credits',
            'Five-cut page/reveal states, asynchronous load barrier, retry-state persistence, and FMOD audio cues'
        ],
        flow: 'Unreal-authored scene/UI assets → custom import and runtime binding → game flow + scoring → cutscenes / audio / ending',
        technologies: ['C++', 'Unreal Export', 'Lua', 'RmlUi', 'FMOD', 'Game Flow'],
        results: [
            'Connected editor-authored content and engine systems into the final playable game sequence.',
            'Delivered user-facing flow and feedback across combat, scoring, scene changes, retry, and cutscenes.'
        ],
        evidenceStatus: 'Verified author commits',
        evidenceNote: 'Authored history connects scene and decal import, countdown and scoreboard systems, the load barrier, and retry, cutscene, and audio flow to the personal implementation scope.',
        sourceUrl: 'https://github.com/yoonjiii218/Jungle_Week14_Team3/commits/main/?author=HaXX0rBunny',
        sourceLabel: 'Open authored Week14 commits',
        troubleshootingEvidence: [
            {
                placement: 'result',
                kicker: 'Three-stage RmlUi capture trail · working-tree evidence',
                title: 'The first 3→2→1 prototype became a five-second countdown with a filled sweep sector.',
                summary: 'The first capture records the in-engine 3→2→1 prototype with the PICTURE START label, sprockets, rings, crosshair, and a single sweep line. The later captures isolate the responsive guide geometry and show the refined five-second runtime state with grain, vignette, and a filled sweep sector. Together they document the implementation progression, while the authored commit trail provides the code-level evidence.',
                tags: ['Actual UI captures', 'RmlUi + Lua', 'Film countdown', 'Prototype → refinement'],
                figures: [
                    {
                        stage: 'Initial in-engine prototype · 2026-06-08 23:55 KST',
                        src: 'Assets/images/gametechlab/evidence/week14-film-countdown-initial-3-20260608.png',
                        alt: 'Week14 initial in-engine film countdown prototype with sepia film strips, sprocket holes, rings, crosshair, single sweep line, Picture Start label, and number three',
                        caption: 'The pre-commit working-tree output already runs the initial 3→2→1 presentation, using a single rotating sweep line and the first film-frame treatment.',
                        fit: 'wide'
                    },
                    {
                        stage: 'Layout-isolation diagnostic · 2026-06-10 17:27 KST',
                        src: 'Assets/images/gametechlab/evidence/week14-film-countdown-layout-20260610.png',
                        alt: 'Week14 film countdown UI layout diagnostic showing only the responsive outer circle, inner circle, and crosshair guides',
                        caption: 'A later diagnostic isolates the responsive center, outer and inner circles, and crosshair from the presentation layers.',
                        fit: 'wide'
                    },
                    {
                        stage: 'Refined runtime validation · 2026-06-10 17:38 KST',
                        src: 'Assets/images/gametechlab/evidence/week14-film-countdown-styled-20260610.png',
                        alt: 'Week14 completed film countdown UI showing a sepia film gate, sprocket holes, grain, sweep arm, Picture Start label, and number five',
                        caption: 'The refined output restores the full presentation at digit five and shows the filled sector, moving sprockets, grain, vignette, and layered number treatment together.',
                        fit: 'wide'
                    }
                ],
                facts: [
                    { label: 'Countdown timing', value: '3.35 → 5.35 sec', detail: 'Initial implementation to a3006a9', hidden: true },
                    { label: 'Sweep workaround', value: '33 frames', detail: 'Raster sector sequence at fdaa6f7' }
                ],
                trace: {
                    label: 'RmlUi sector-animation workaround',
                    file: 'FilmCountdown.rml + GameFlowDirector.lua',
                    snippet: `<img id="sweep-sector-0" class="sweep-sector-frame"
     src="Images/film_sweep_sector_00.png" />

local frameIndex = math.floor(
    clamp(sweepCycle, 0.0, 1.0) *
    (FILM_SWEEP_SECTOR_FRAME_COUNT - 1) + 0.5)

for i = 0, FILM_SWEEP_SECTOR_FRAME_COUNT - 1 do
    setCountdownOpacity(widget, "sweep-sector-" .. tostring(i),
        i == frameIndex and sectorOpacity or 0.0)
end`
                },
                method: 'Matched the visible labels, layer geometry, countdown value, and sweep treatment in the three captures to the authored RmlUi and Lua implementation history.'
            },
            {
                placement: 'result',
                kicker: 'Completed Week14 scene placement',
                title: 'The Tokyo level scene placement was completed.',
                summary: 'This wide viewport is the final placement state confirmed by the author. Building volumes, transit geometry, and street-scale structures are assembled into the completed scene; the other editor captures are documented separately as process records.',
                figures: [
                    {
                        stage: 'Completed scene placement',
                        src: 'Assets/images/gametechlab/evidence/week14-level-placement-after-20260608.png',
                        alt: 'Completed Week14 Tokyo scene placement with aligned buildings, transit geometry, and street-scale structures',
                        caption: 'Building volumes, transit geometry, and street-scale structures are shown in their completed scene placement.',
                        fit: 'hero'
                    }
                ],
                method: 'The author identified this June 8 viewport as the completed placement. Its RGB pixels match the preserved site asset exactly.'
            },
            {
                caseId: 'scene-import-validation',
                kicker: 'Case 02 attachment · editor process record',
                title: 'The remaining captures document import placement and orientation checks.',
                summary: 'These three editor views record the working process: inspecting the initially scattered import, diagnosing the tilted Tokyo_Current scene, and checking upright geometry in Tokyo_Verify_Train. Transform correction and import completion are supported separately by the fdaa6f7 diff and the local import report.',
                tags: ['Process captures', 'Scene import', 'Transform verification'],
                figures: [
                    {
                        stage: 'Process 01 · scattered import',
                        src: 'Assets/images/gametechlab/evidence/week14-level-placement-before-20260607.png',
                        alt: 'Week14 Tokyo import process with scene meshes scattered throughout the editor viewport before placement was completed',
                        caption: 'Imported modules and surfaces are still dispersed while the level layout is being assembled.',
                        fit: 'contain'
                    },
                    {
                        stage: 'Process 02 · orientation diagnosis',
                        src: 'Assets/images/gametechlab/evidence/week14-tokyo-current-inspection.png',
                        alt: 'Custom engine editor showing the imported Tokyo scene tilted sideways during transform inspection',
                        caption: 'The tilted Tokyo_Current viewport records the orientation problem investigated during import validation.',
                        fit: 'wide'
                    },
                    {
                        stage: 'Process 03 · orientation verification',
                        src: 'Assets/images/gametechlab/evidence/week14-tokyo-verify-train.png',
                        alt: 'Custom engine editor showing an upright Tokyo street in the Tokyo Verify Train scene',
                        caption: 'The dedicated Tokyo_Verify_Train scene checks that imported street geometry is upright.',
                        fit: 'wide'
                    }
                ],
                facts: [
                    { label: 'Transform fix', value: 'fdaa6f7', detail: 'Environment-transform rotation correction' },
                    { label: 'Import result', value: '5,290 actors · 0 failures', detail: '5,181 matrix transforms · Mesh, material, and texture resources' }
                ],
                method: 'The captures record placement and orientation checks; the fdaa6f7 diff records the transform correction and the local report records 5,290 imported actors with zero resource failures.'
            },
            {
                kicker: 'Actual defect captures → Git-backed fixes',
                title: 'The visible decal rectangle and foliage-card background were traced to mask-source and pre-depth faults.',
                summary: 'The first capture records masked foliage leaving the transparent area of each leaf card visible; the second records a selected decal while its rectangular background was being diagnosed. The foliage fix removes masked sections from an alpha-unaware pre-depth pass. The decal path first restores hidden dependency textures, then derives coverage from the actual grayscale pixel data instead of an always-opaque synthetic alpha channel.',
                tags: ['Actual defect captures', 'Alpha mask', 'Pre-depth', 'Cases 03–04'],
                figures: [
                    {
                        stage: 'Foliage defect · 2026-06-08 21:28 KST',
                        src: 'Assets/images/gametechlab/evidence/week14-foliage-background-before-20260608.png',
                        alt: 'Imported Tokyo tree before the masked foliage fix, with pale card backgrounds visible around green leaves',
                        caption: 'Transparent portions of the intersecting leaf cards remain visible instead of resolving to clean foliage cutouts.',
                        fit: 'contain'
                    },
                    {
                        stage: 'Decal defect · 2026-06-09 02:20 KST',
                        src: 'Assets/images/gametechlab/evidence/week14-decal-background-before-20260609.png',
                        alt: 'Selected Tokyo ground decal before the grayscale coverage fix, with a rectangular background visible around the pink marking',
                        caption: 'The pink rectangular background is the rendering defect; the white outline is the editor selection indicator.',
                        fit: 'contain'
                    }
                ],
                facts: [
                    { label: 'Foliage fix', value: '64e1ed9', detail: 'Skip masked sections in the pre-depth pass' },
                    { label: 'Decal fix path', value: 'fdaa6f7 → 0c5ae28', detail: 'Restore dependencies → derive grayscale RGB coverage' },
                    { label: 'Texture evidence', value: 'Alpha 255 · 100%', detail: '91.034% of base RGB pixels are black', hidden: true }
                ],
                trace: {
                    label: 'Post-fix coverage and depth routing',
                    file: 'UnrealSceneManifestImporter.cpp + DrawCommandBuilder.cpp',
                    snippet: `// Gray8 decal base: alpha is always 1, so derive RGB coverage.
const uint32 RGB = AddAdd(Graph, RG, Pins.B, X + 160.0f, Y);
const uint32 Coverage = AddSaturate(Graph, RGB, X + 320.0f, Y);

// A separate Gray8 opacity mask uses its stored red channel.
const uint32 MaskPin = OpacityPins.R != 0 ? OpacityPins.R : OpacityPins.A;

// Do not write an unmasked foliage card into pre-depth.
if (Pass == ERenderPass::PreDepth &&
    Section.Material->HasOpacityMaskInputConnected())
    continue;`
                },
                method: 'The captures record the visible defects. Source and generated-HLSL diffs record the correction sequence: 64e1ed9 skips masked pre-depth, fdaa6f7 restores dependencies, and 0c5ae28 derives grayscale coverage.'
            },
            {
                caseId: 'scene-import-validation',
                kicker: 'Commit-bound generated-data A/B',
                title: 'All 11 blocking-volume matrices moved from centimeter magnitudes to the same meter scale as their exported fields.',
                summary: 'The tracked Tokyo manifest can be parsed directly at adfb597^ and adfb597. Scalar scale values remain unchanged, while every world-matrix basis magnitude drops by exactly 100×, providing a deterministic before/after fixture for Case 02.',
                tags: ['Exact Git blobs', '11 volumes', 'Case 02'],
                facts: [
                    { label: 'Verified matrices', value: '11 / 11', detail: 'Same records · scalar scale unchanged' },
                    { label: 'Unit correction', value: '÷ 100', detail: 'Centimeters converted to meters' }
                ],
                trace: {
                    label: 'Representative generated record',
                    file: 'KraftonEngine/Content/Data/UnrealImport/Tokyo/Tokyo.scene.json',
                    snippet: `Before · adfb597^
scale       = [3.909492, 0.290751, 5.981553]
matrix basis= [390.949202, 29.075059, 598.155260]

After · adfb597
scale       = [3.909492, 0.290751, 5.981553]
matrix basis= [3.909492, 0.290751, 5.981553]`
                },
                method: 'Parsed both tracked JSON blobs, paired all 11 blocking-volume records, and confirmed the world-matrix basis conversion to the exported meter scale while scalar scale remained unchanged.'
            },
            {
                caseId: 'scene-import-validation',
                collapsed: true,
                kicker: 'Commit-bound manifest A/B',
                title: 'The scene export gained complete light transforms and 95 decal records in the authored fdaa6f7 change.',
                summary: 'The tracked Tokyo scene and material manifests can be parsed at fdaa6f7^ and fdaa6f7. They provide an exact generated-output comparison for the environment-transform and decal-dependency work in Cases 02 and 03.',
                tags: ['Exact Git blobs', 'Scene manifest', 'Cases 02–03'],
                facts: [
                    { label: 'Light world matrices', value: '0 → 2', detail: 'DirectionalLight and SkyLight' },
                    { label: 'Decal records', value: '0 → 95', detail: 'Tokyo.scene.json' }
                ],
                trace: {
                    label: 'Generated manifest delta',
                    file: 'Tokyo.scene.json + Tokyo.materials.json',
                    snippet: `Before · fdaa6f7^
DirectionalLight.worldMatrix = absent
SkyLight.worldMatrix          = absent
decals / materials / textures = 0 / 129 / 44

After · fdaa6f7
DirectionalLight.worldMatrix = 4 × 4 matrix
SkyLight.worldMatrix          = 4 × 4 matrix
decals / materials / textures = 95 / 131 / 48`
                },
                method: 'Parsed the parent and fix blobs and confirmed the dependency-recovery output: light transforms and 95 decal records were added in fdaa6f7; grayscale coverage was corrected separately in 0c5ae28.'
            },
            {
                caseId: 'game-flow-state',
                kicker: 'Preserved packaged-runtime trace',
                title: 'The transition waited after the cutscene, then committed only when Tokyo_Current became ready.',
                summary: 'The preserved GameBuild log records the runtime sequence introduced by the wait-to-commit change: Cutscene complete → Wait → Scene ready → Commit.',
                tags: ['Actual packaged run', 'Async loading', 'Case 01'],
                facts: [
                    { label: 'Transition sequence', value: 'Wait → Ready → Commit', detail: 'Tokyo_Current packaged run' }
                ],
                trace: {
                    label: 'Post-fix transition sequence',
                    file: 'GameBuild/Saves/Logs/Engine.log',
                    snippet: `[GameEngine] Async TransitionToScene begin: .../Tokyo_Current.Scene
[GameFlow-Debug] Cutscene completed but scene loading not finished yet. Waiting to commit...
[GameEngine] Async TransitionToScene scene data ready: .../Tokyo_Current.Scene
[GameFlow-Debug] Scene loading ready during wait. Committing transition now.
[GameEngine] Async TransitionToScene committed: .../Tokyo_Current.Scene`
                },
                method: 'Read the packaged-run log chronologically and matched the Wait → Ready → Commit messages to the state transition introduced by a590136.'
            },
            {
                caseId: 'game-flow-state',
                kicker: 'Preserved persistence output',
                title: 'The completed run time was written consistently to both clear-score storage and the scoreboard.',
                summary: 'Two actual local save files share the same final-write timestamp and contain the same 85.688-second result. This directly validates the persistence output used by Case 01 after a completed run.',
                tags: ['Actual save files', 'Score persistence', 'Case 01'],
                facts: [
                    { label: 'Persisted value', value: '85.688 sec', detail: 'LastClearScore.txt = GameFlowScoreboard.tsv' }
                ],
                trace: {
                    label: 'Matching persisted value',
                    file: 'KraftonEngine/Saves/LastClearScore.txt + GameFlowScoreboard.tsv',
                    snippet: `LastClearScore.txt
85.688

GameFlowScoreboard.tsv
...
85.688
...`
                },
                method: 'Compared both save outputs and confirmed the same completed-run value: LastClearScore.txt = GameFlowScoreboard.tsv = 85.688 sec.'
            }
        ],
        troubleshooting: [
            {
                id: 'game-flow-state',
                title: 'Clear score was lost across asynchronous scene flow',
                symptom: 'The clear or credits screen could no longer recover the just-completed combat time after a scene transition reset in-memory timer state.',
                cause: 'Score presentation depended on combatElapsedTime and local Lua state surviving the multithreaded scene transition.',
                fix: 'Captured the clear time once, persisted it to LastClearScore.txt, reloaded the stored value when the combat timer was unavailable, and guarded recordClearScore against duplicate insertion.',
                result: 'Clear and credits UI can display the completed run consistently even after scene state is rebuilt.',
                commit: { hash: '6639868', url: 'https://github.com/yoonjiii218/Jungle_Week14_Team3/commit/6639868c54446bd5a2f13918c5147ddcf587b067' }
            },
            {
                title: 'Countdown/cutscene finished before async scene loading',
                symptom: 'The visual transition could end while the destination scene was still loading, leaving the flow with no safe scene commit point.',
                cause: 'Film-countdown completion and asynchronous scene readiness advanced on independent timelines.',
                fix: 'Added an explicit waiting-to-commit state, kept the transition widget visible with a LOADING SCENE status, polled readiness, and committed only when IsAsyncOpenSceneReady returned true.',
                result: 'The UI covers the load gap and scene activation occurs only after the asynchronous load is ready.',
                commit: { hash: 'a590136', url: 'https://github.com/yoonjiii218/Jungle_Week14_Team3/commit/a59013616a5afbee0d762c56e137e1af57751a8a' }
            },
            {
                title: 'Retry replayed first-entry countdown and cutscenes',
                symptom: 'Restarting from pause or game-over repeated presentation intended only for the initial level entry, delaying the player’s retry.',
                cause: 'Fresh start and retry shared the same transition function without state distinguishing their user intent.',
                fix: 'Introduced an isRetryTransition flag, hid the countdown layer, skipped film audio/cutscene timing, and presented a loading state until the retry scene could commit.',
                result: 'Initial entry retains the full presentation while retry takes the shorter recovery path.',
                code: {
                    file: 'KraftonEngine/Content/Script/GameFlow/GameFlowDirector.lua',
                    context: 'triggerTransitionWithCountdown()',
                    language: 'Lua',
                    snippet: `if isRetryTransition then
    filmCountdownTime = FILM_COUNTDOWN_DURATION
    filmCountdownStartRealtime = nil
    setCountdownProperty(countdown, "countdown-root", "display", "none")
    setCountdownProperty(countdown, "cutscene-root", "display", "block")
    setCountdownProperty(countdown, "cutscene-root", "opacity", scalar(1.0))
    setText(countdown, "skip-hint", "LOADING SCENE...")
    setCountdownProperty(countdown, "skip-hint", "opacity", scalar(1.0))`
                },
                commit: { hash: '0ad4db0', url: 'https://github.com/yoonjiii218/Jungle_Week14_Team3/commit/0ad4db0bb2b4ab0e9b3d57ee6409b9cf39eda0bd' }
            },
            {
                id: 'scene-import-validation',
                title: 'Blocking-volume scale mixed centimeters and meters',
                symptom: 'An Unreal BlockingVolume could import with world-matrix scale approximately 100 times larger than its separately exported scale field.',
                cause: 'The scalar scale converted local_extent_cm to meters, but world_matrix_rows() still received the original centimeter extent as its override scale.',
                fix: 'Passed the converted meter-scale vector into the matrix override for both cube and bounds fallback paths.',
                result: 'The exported scalar and world-matrix scales now use the same meter unit.',
                code: {
                    file: 'Scripts/Unreal/export_level_manifest.py',
                    context: 'BlockingVolume export',
                    language: 'Python',
                    snippet: `scale = [
    round(local_extent_cm[0] * 0.01, 6),
    round(local_extent_cm[1] * 0.01, 6),
    round(local_extent_cm[2] * 0.01, 6),
]
matrix = world_matrix_rows(transform, override_scale=scale)`
                },
                commit: { hash: 'adfb597', url: 'https://github.com/yoonjiii218/Jungle_Week14_Team3/commit/adfb59757d3aade1c8140ec1c7a0714f819c7ffe' }
            },
            {
                title: 'Environment and light transforms lost Unreal orientation',
                symptom: 'Imported environment actors and lights could point in a different direction, making scene and shadow orientation disagree with the Unreal-authored source.',
                cause: 'Environment records omitted worldMatrix, and the fallback Euler swizzle discarded full transform composition and missed the required sign conversion.',
                fix: 'Exported worldMatrix, decomposed it with translated units scaled correctly, and corrected the Euler mapping used only when a matrix is unavailable.',
                result: 'Environment actors consume their authored world transform; legacy records use the corrected fallback orientation.',
                code: {
                    file: 'KraftonEngine/Source/Editor/Import/UnrealSceneManifestImporter.cpp',
                    context: 'ApplyEnvironmentTransform()',
                    language: 'C++',
                    snippet: `DecomposePlacementMatrix(
    Record, MatrixLocation, MatrixRotation, MatrixScale);
Root->SetRelativeLocation(MatrixLocation);
Root->SetRelativeRotationWithEulerHint(
    MatrixRotation, MatrixRotation.ToRotator());
Root->SetRelativeScale(MatrixScale);`
                },
                commit: { hash: 'fdaa6f7', url: 'https://github.com/yoonjiii218/Jungle_Week14_Team3/commit/fdaa6f7a1562c0898af7e1415560717f499a0dd9' }
            },
            {
                title: 'Grayscale decal textures were treated as alpha-bearing RGBA',
                symptom: 'Imported Tokyo decals showed a rectangular background around the intended road or ground marking, and decal chains without direct texture parameters could initially arrive without their dependency textures.',
                cause: 'The exporter initially missed textures hidden in parent/material-function dependencies. After they were recovered, the imported base and mask PNGs were still Gray8 images with no stored alpha; converting them to RGBA produced alpha 255 for every pixel, so sampling .a made the full projection opaque.',
                fix: 'Recovered bounded dependency textures in fdaa6f7, then in 0c5ae28 generated decal coverage with saturate(R+G+B), read separate grayscale masks from .r, and corrected projected UVs to the decal Y/Z plane.',
                result: 'Black background pixels produce zero coverage and are clipped, while the authored marking and grayscale mask values remain visible.',
                code: {
                    file: 'KraftonEngine/Shaders/Generated/Materials/_84C667DFDBE780B1_Decal_DefaultLit.hlsl',
                    context: 'Generated output at 0c5ae28^ → 0c5ae28',
                    language: 'HLSL',
                    snippet: `// Before: Gray8 is expanded with alpha=1, so the whole rectangle survives.
float n_39 = ((n_12).a * n_37);
Result.Opacity = n_39;

// After: coverage follows the grayscale data stored in RGB.
float n_39 = ((n_12).r + (n_12).g);
float n_45 = (n_39 + (n_12).b);
float n_51 = saturate(n_45);
Result.Opacity = n_51 * n_37;`
                },
                commit: { hash: '0c5ae28', url: 'https://github.com/yoonjiii218/Jungle_Week14_Team3/commit/0c5ae2809b5b7fb40f7cb946d39ef807732cb3f3' }
            },
            {
                title: 'Masked foliage wrote the full leaf-card background into pre-depth',
                symptom: 'Imported tree crowns showed pale rectangular or polygonal card backgrounds around otherwise valid green leaves; their two-sided shadow coverage could also disappear from some directions.',
                cause: 'The generated surface shader alpha-clipped each leaf correctly, but the earlier generic pre-depth submission did not run that material mask and therefore wrote the entire card silhouette. Shadow culling also ignored each section material’s two-sided raster state.',
                fix: 'Skipped opacity-masked sections in the generic pre-depth pass so the alpha-tested surface pass owns visible coverage, selected SolidNoCull for two-sided shadow materials, and restored directional caster submission with the intended culling behavior.',
                result: 'Transparent leaf-card regions no longer contribute the same unmasked pre-depth coverage, while foliage shadow submission respects per-material two-sided state.',
                code: {
                    file: 'KraftonEngine/Source/Engine/Render/Command/DrawCommandBuilder.cpp',
                    context: 'FDrawCommandBuilder::BuildCommandForProxy()',
                    language: 'C++',
                    snippet: `if (Pass == ERenderPass::PreDepth &&
    Section.Material &&
    Section.Material->HasOpacityMaskInputConnected())
{
    continue;
}`
                },
                commit: { hash: '64e1ed9', url: 'https://github.com/yoonjiii218/Jungle_Week14_Team3/commit/64e1ed91c2aac10d2647970b31efefdbfb866e9d' }
            },
            {
                title: 'The film sweep exceeded the shapes RmlUi could express cleanly',
                symptom: 'The first countdown implementation approximated the illuminated circular sweep with 24 individually rotated rectangular elements, leaving the visual tied to a coarse collection of CSS-style primitives.',
                cause: 'The available RmlUi path supported positioned boxes, images, and transforms, but did not provide a reliable filled circular-sector primitive for the film-leader wedge.',
                fix: 'Generated 33 transparent sector frames, placed them as overlapping RmlUi images, converted normalized sweep progress to a frame index, and exposed only the selected frame while Lua continued to drive the digit, sprockets, grain, flash, and timing.',
                result: 'The countdown gained a deterministic filled-sector animation that could be sized with the responsive central layout and reproduced by the runtime widget.',
                code: {
                    file: 'KraftonEngine/Content/Script/GameFlow/GameFlowDirector.lua',
                    context: 'updateSweepSector()',
                    language: 'Lua',
                    snippet: `local frameIndex = math.floor(
    clamp(sweepCycle, 0.0, 1.0) *
    (FILM_SWEEP_SECTOR_FRAME_COUNT - 1) + 0.5)

for i = 0, FILM_SWEEP_SECTOR_FRAME_COUNT - 1 do
    local id = "sweep-sector-" .. tostring(i)
    setCountdownRect(widget, id, centerX - sectorSize * 0.5,
        centerY - sectorSize * 0.5, sectorSize, sectorSize)
    setCountdownOpacity(widget, id,
        i == frameIndex and sectorOpacity or 0.0)
end`
                },
                commit: { hash: 'fdaa6f7', url: 'https://github.com/yoonjiii218/Jungle_Week14_Team3/commit/fdaa6f7a1562c0898af7e1415560717f499a0dd9' }
            }
        ],
        commitRefs: [
            { hash: '06079db', label: 'Boss UI flow and UE scene import', url: 'https://github.com/yoonjiii218/Jungle_Week14_Team3/commit/06079db2a59dbfcfe79af9ce1f92c4170488c839' },
            { hash: '1089022', label: 'Tokyo import and material output-pin swizzle', url: 'https://github.com/yoonjiii218/Jungle_Week14_Team3/commit/1089022d2bc9d63bc3c44a0ea605027303a904fa' },
            { hash: '64e1ed9', label: 'Film countdown and masked-foliage depth fix', url: 'https://github.com/yoonjiii218/Jungle_Week14_Team3/commit/64e1ed91c2aac10d2647970b31efefdbfb866e9d' },
            { hash: 'a3006a9', label: 'Five-second countdown timing fix', url: 'https://github.com/yoonjiii218/Jungle_Week14_Team3/commit/a3006a94775e90d40ae15e8d0d601839960542a5' },
            { hash: 'a590136', label: 'Five-cut reveal flow and asynchronous load barrier', url: 'https://github.com/yoonjiii218/Jungle_Week14_Team3/commit/a59013616a5afbee0d762c56e137e1af57751a8a' },
            { hash: 'c0afab3', label: 'Decal exporter/importer', url: 'https://github.com/yoonjiii218/Jungle_Week14_Team3/commit/c0afab301cdb08a7f214d58fa9e34ea759fb17d4' },
            { hash: 'fdaa6f7', label: 'Countdown sweep frames, decal dependencies, and scene-shadow fix', url: 'https://github.com/yoonjiii218/Jungle_Week14_Team3/commit/fdaa6f7a1562c0898af7e1415560717f499a0dd9' },
            { hash: '0c5ae28', label: 'Final grayscale decal coverage fix', url: 'https://github.com/yoonjiii218/Jungle_Week14_Team3/commit/0c5ae2809b5b7fb40f7cb946d39ef807732cb3f3' },
            { hash: '6253e27', label: 'Tokyo game-flow scoreboard', url: 'https://github.com/yoonjiii218/Jungle_Week14_Team3/commit/6253e27b66b32fc90473a6e97b9c6060ea490cf4' },
            { hash: '3f5ef50', label: 'Custom cutscene reveal transition', url: 'https://github.com/yoonjiii218/Jungle_Week14_Team3/commit/3f5ef5079c66debd99c3a97116975910cc207750' }
        ],
        featured: true
    }
];

// Keep the complete audit data above, but present only the cases that explain a
// meaningful engineering decision. Closely related symptoms are merged into one
// root-cause narrative so the troubleshooting tab reads as a technical record,
// not as an unfiltered commit log.
const labTroubleshootingCuration = {
    '01': [0, 2],
    '02': [
        {
            indices: [1, 2, 3],
            codeSource: 2,
            content: {
                title: 'SkySphere rendering mixed background-pass ordering, depth state, and normal conventions',
                symptom: 'The SkySphere could occlude scene geometry, disappear when depth writes were disabled, or produce a distorted gradient.',
                cause: 'It was sorted with ordinary opaque meshes, the depth-write toggle also disabled depth testing, and the shader used scaled inside-facing normals.',
                fix: 'Render it as background geometry with depth testing retained and depth writes disabled, then derive the gradient from a normalized world direction.',
                result: 'The sky remains behind scene geometry and keeps a stable gradient across scale and camera changes.'
            }
        }
    ],
    '03': [
        0,
        {
            indices: [4, 5],
            codeSource: 4,
            content: {
                title: 'Picking rays and equal-depth highlights used inconsistent pixel and depth rules',
                symptom: 'Cursor picks could miss thin geometry and the selected gizmo highlight disappeared when it shared depth with the base pass.',
                cause: 'The ray started at the pixel corner while the highlight pass used a strict less-than depth comparison.',
                fix: 'Sample the pixel center with a half-pixel offset and allow the highlight pass to accept equal depth.',
                result: 'Picking and selection feedback now agree with the geometry visible at the cursor.'
            }
        }
    ],
    '04': [
        0,
        {
            indices: [1, 2],
            codeSource: 1,
            content: {
                title: 'OBJ ingestion needed a versioned binary cache and indexed geometry build',
                symptom: 'Cold loads repeatedly parsed text OBJ data while face-corner expansion duplicated vertices and material searches.',
                cause: 'There was no validated binary format, and the importer rebuilt every corner while resolving materials linearly.',
                fix: 'Add a versioned .dasset header and binary reader/writer, then deduplicate indexed vertices and map material names directly.',
                result: 'Baked assets can bypass text parsing and imported meshes avoid redundant vertex and material work.'
            }
        },
        {
            indices: [4, 5],
            codeSource: 4,
            content: {
                title: 'Reloaded static meshes lost dependencies while asset caches retained GPU ownership',
                symptom: 'Scene reloads could lose mesh and UV-scroll state, and shutdown left SRVs and cached assets owned past their intended lifetime.',
                cause: 'Serialized components did not restore every asset dependency, while cache teardown erased entries without explicitly releasing GPU-facing references.',
                fix: 'Restore mesh dependencies and UV state during load, then clear SRVs and asset caches through explicit teardown paths.',
                result: 'Static-mesh scenes reload deterministically and release graphics resources on shutdown.'
            }
        }
    ],
    '05': [
        {
            indices: [0, 3],
            codeSource: 3,
            content: {
                title: 'Dense-scene queries needed scalable traversal without terminal-node data loss',
                symptom: 'The 50,000-object workload made picking expensive, while objects could disappear when the SceneGraph reached maximum depth.',
                cause: 'Queries fell back to per-triangle and per-object work, and terminal leaves failed to retain every remaining object.',
                fix: 'Use spatial broad-phase traversal for dense queries and store all remaining objects in terminal leaves.',
                result: 'Dense-scene interaction scales better without dropping objects at the tree depth limit.'
            }
        },
        1,
        2,
        5
    ],
    '06': [
        {
            indices: [0, 8],
            codeSource: 0,
            content: {
                title: 'Height Fog reconstruction diverged at the sky and admitted non-finite far-depth inputs',
                symptom: 'A hard horizon seam separated sky from geometry, while far-depth pixels could become unstable or black.',
                cause: 'The sky used a constant fog branch, and homogeneous reconstruction could divide by an invalid W or propagate non-finite values.',
                fix: 'Reconstruct a sky ray through InvViewProj, evaluate the same fog function used by geometry, and guard W, ray, exponent, and final output.',
                result: 'Sky and geometry share a continuous finite fog response.'
            }
        },
        {
            indices: [1, 4],
            codeSource: 1,
            content: {
                title: 'Fog and decal blend paths overwrote destination alpha and made geometry transparent',
                symptom: 'Projected RGB looked valid, but the shared render target accumulated polluted alpha and near geometry became transparent in the editor.',
                cause: 'The blend state copied source opacity into destination alpha instead of preserving the scene alpha channel.',
                fix: 'Blend the fog/decal RGB contribution while retaining destination alpha.',
                result: 'Fog and decals remain visible without corrupting editor composition or mesh opacity.'
            }
        },
        3
    ],
    '07': [
        {
            indices: [0, 3],
            codeSource: 0,
            content: {
                title: 'Shader reload invalidated cache entries without completing the GPU resource lifecycle',
                symptom: 'Changes in included shader files could be missed, and cache teardown discarded entries while owned resources were still live.',
                cause: 'Dependency tracking and cache invalidation were incomplete, and resource release was not coupled to entry removal.',
                fix: 'Track include dependencies, rebuild affected variants, and release owned GPU resources before cache entries are erased.',
                result: 'Hot reload responds to dependency changes and shutdown releases shader resources deterministically.'
            }
        },
        1
    ],
    '08': [
        0,
        3,
        {
            indices: [2, 5],
            codeSource: 5,
            content: {
                title: 'Point-shadow PCF was bypassed and discontinuous across cube-face boundaries',
                symptom: 'Point lights skipped the requested filter path, and filtered shadows showed seams where samples crossed cube faces.',
                cause: "The lighting path bypassed PCF and reused the center sample's cube-face basis for every tap.",
                fix: 'Route point shadows through PCF and recompute cube face and UV coordinates for each offset direction.',
                result: 'Point shadows receive consistent filtering across cube-map face boundaries.'
            }
        }
    ],
    '09': [
        0,
        2,
        {
            indices: [3, 4],
            codeSource: 4,
            content: {
                title: 'Destroyed components remained in overlap and tick queues as dangling references',
                symptom: 'Components destroyed during a frame could still be reached through overlap peers or queued tick functions.',
                cause: 'Raw-pointer collections outlived their owners and teardown did not unlink every bidirectional relationship.',
                fix: 'Unlink overlap peers during teardown and validate owner lifetime before executing queued tick work.',
                result: 'Destroyed objects no longer receive stale overlap or tick callbacks.'
            }
        },
        5
    ],
    '10': [0, 1, 3, 4],
    '11': [
        0,
        {
            indices: [1, 2],
            codeSource: 1,
            content: {
                title: 'FBX animation cache keys did not identify the source stack and target skeleton',
                symptom: 'A valid cache file could return animation from another stack or data built for a different skeleton.',
                cause: 'The cache contract omitted stack identity and a stable target-skeleton signature.',
                fix: 'Include source stack, importer version, and skeleton identity in validation and reject mismatched cache entries.',
                result: 'Cached animation is reused only when the clip and target skeleton match.'
            }
        },
        3,
        {
            indices: [4, 5],
            codeSource: 4,
            content: {
                title: 'FBX track import mixed parent-basis conversion and synthesized missing scale channels',
                symptom: 'Imported bones could drift from the authored pose and bones without scale curves acquired artificial scale animation.',
                cause: 'Local transforms used inconsistent parent bases, while missing scale keys were treated as animated values.',
                fix: 'Convert parent and child transforms in the same runtime basis and preserve identity scale when no authored scale channel exists.',
                result: 'Runtime tracks retain the authored transform hierarchy without synthetic scale motion.'
            }
        }
    ],
    '12': [
        {
            indices: [0, 3],
            codeSource: 3,
            content: {
                title: 'Particle assets shared ownership between editor caches, runtime data, and duplicated child graphs',
                symptom: 'Editing or duplicating one particle asset could leave stale compiled pointers or affect another asset through shared child objects.',
                cause: 'The asset graph, editor cache, and runtime representation shared ownership boundaries and shallow-copied modules.',
                fix: 'Make the asset own a deep-cloned child graph and let runtime components consume separately compiled LOD data.',
                result: 'Duplicated assets are independent and runtime pointers can be refreshed safely after edits.'
            }
        },
        1,
        4,
        5
    ],
    '13': [0, 1],
    '14': [
        {
            indices: [0, 1, 2],
            codeSource: 2,
            content: {
                title: 'Async scene flow needed explicit transition, persistence, and retry states',
                symptom: 'A completed score could be lost, cutscenes could finish before the target scene was ready, and retry replayed first-entry presentation.',
                cause: 'Scene transition, persistence, readiness, and first-entry/retry behavior were coupled to one transient flow.',
                fix: 'Persist the score before transition, introduce Wait → Ready → Commit states, and branch first entry from retry.',
                result: 'Scores survive transitions, scenes commit only when ready, and retry skips onboarding sequences.'
            }
        },
        {
            indices: [3, 4],
            codeSource: 4,
            content: {
                title: 'Unreal scene import mixed centimeter scale and orientation conventions',
                symptom: 'Blocking volumes were exported at 100× matrix scale while environment and light actors arrived with incorrect orientation.',
                cause: 'World matrices remained in centimeters while scalar fields used meters, and Unreal basis conversion was incomplete across imported actor types.',
                fix: 'Normalize exported matrices to meters and apply an explicit basis and rotation conversion to environment and light transforms.',
                result: 'All 11 blocking-volume matrices match scalar scale and imported environment actors use the expected orientation.'
            }
        },
        5,
        6
    ]
};

function getLabLocale() {
    return window.PortfolioI18n?.getLocale?.() === 'ko' ? 'ko' : 'en';
}

function getLabText(key, fallback = '') {
    return window.PortfolioI18n?.t?.(`lab.${key}`, fallback) || fallback;
}

function formatLabText(key, fallback, replacements = {}) {
    return Object.entries(replacements).reduce(
        (text, [name, value]) => text.replaceAll(`{${name}}`, String(value)),
        getLabText(key, fallback)
    );
}

function mergeLocalizedValue(baseValue, overrideValue) {
    if (overrideValue === undefined) return baseValue;

    if (Array.isArray(baseValue) && Array.isArray(overrideValue)) {
        return baseValue.map((item, index) => mergeLocalizedValue(item, overrideValue[index]));
    }

    if (
        baseValue && overrideValue
        && typeof baseValue === 'object' && !Array.isArray(baseValue)
        && typeof overrideValue === 'object' && !Array.isArray(overrideValue)
    ) {
        const merged = { ...baseValue };
        Object.entries(overrideValue).forEach(([key, value]) => {
            merged[key] = mergeLocalizedValue(baseValue[key], value);
        });
        return merged;
    }

    return overrideValue;
}

function curateTroubleshooting(week) {
    const specs = labTroubleshootingCuration[week.week];
    if (!Array.isArray(specs)) return week.troubleshooting || [];

    return specs.map((spec, curatedIndex) => {
        if (Number.isInteger(spec)) return week.troubleshooting[spec];

        const sourceIndices = spec.indices || [];
        const sourceCase = week.troubleshooting[sourceIndices[0]];
        const codeCase = week.troubleshooting[spec.codeSource ?? sourceIndices[0]] || sourceCase;
        const commits = sourceIndices
            .map((sourceIndex) => week.troubleshooting[sourceIndex]?.commit)
            .filter(Boolean);
        const hashes = [...new Set(commits.map((commit) => commit.hash).filter(Boolean))];
        const lastCommit = commits.at(-1) || sourceCase?.commit;
        const localizedContent = getLabLocale() === 'ko'
            ? window.GAME_TECH_LAB_TROUBLESHOOTING_KO?.[week.week]?.[curatedIndex]
            : undefined;

        return {
            ...sourceCase,
            ...spec.content,
            ...(localizedContent || {}),
            code: codeCase?.code,
            commit: lastCommit
                ? { ...lastCommit, hash: hashes.join(' → ') || lastCommit.hash }
                : undefined
        };
    }).filter(Boolean);
}

function getLocalizedWeek(index) {
    const week = labWeeks[index];
    if (!week) return week;

    let localizedWeek = week;
    if (getLabLocale() === 'ko') {
        const overrides = window.GAME_TECH_LAB_KO || {};
        const localized = overrides[week.week] ?? overrides[index];
        localizedWeek = localized ? mergeLocalizedValue(week, localized) : week;
    }

    return {
        ...localizedWeek,
        troubleshooting: curateTroubleshooting(localizedWeek)
    };
}

function getLocalizedWeeks() {
    return labWeeks.map((_, index) => getLocalizedWeek(index));
}

const labState = {
    selectedWeek: 0,
    detailTab: 'role',
    view: 'weeks'
};

const labElements = {
    primaryTabs: Array.from(document.querySelectorAll('[data-lab-view]')),
    viewPanels: Array.from(document.querySelectorAll('.lab-view-panel')),
    weekSelector: document.getElementById('labWeekSelector'),
    weekEyebrow: document.getElementById('labWeekEyebrow'),
    weekTitle: document.getElementById('labWeekTitle'),
    weekSummary: document.getElementById('labWeekSummary'),
    detailTabs: Array.from(document.querySelectorAll('[data-detail-tab]')),
    detailPanel: document.getElementById('labDetailPanel'),
    timeline: document.getElementById('labProgramTimeline')
};

function listMarkup(items) {
    return `<ul class="lab-detail-list">${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
}

function techMarkup(technologies) {
    return `<div class="lab-tags">${technologies.map(technology => `<span>${technology}</span>`).join('')}</div>`;
}

function escapeMarkup(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function codeFileName(path) {
    const normalizedPath = String(path || '').replaceAll('\\', '/');
    const pathSegments = normalizedPath.split('/');
    return pathSegments[pathSegments.length - 1] || normalizedPath;
}

function codeContextLabel(context) {
    const normalizedContext = String(context || '').trim();
    const functionMatch = normalizedContext.match(/[A-Za-z_~][\w~]*(?:::[A-Za-z_~][\w~]*)*\([^)]*\)/);

    if (functionMatch) {
        const qualifiedParts = functionMatch[0].split('::');
        return qualifiedParts[qualifiedParts.length - 1];
    }

    return normalizedContext.length > 42
        ? `${normalizedContext.slice(0, 41).trimEnd()}…`
        : normalizedContext;
}

function compactEvidenceStage(stage) {
    return String(stage || '')
        .replace(/\s*·\s*\d{4}-\d{2}-\d{2}(?:\s+\d{2}:\d{2}(?::\d{2})?)?(?:\s+[A-Z]{2,5})?/g, '')
        .trim();
}

function compactEvidenceFile(file) {
    return String(file || '')
        .split(/\s+\+\s+/)
        .map(codeFileName)
        .filter(Boolean)
        .join(' + ');
}

function troubleCommitMarkup(commit) {
    const rawHash = String(commit?.hash || getLabText('localHistory', 'Local history'));
    const hashes = rawHash.split(/\s*→\s*/).filter(Boolean);
    const visibleHash = hashes[hashes.length - 1] || rawHash;
    const extraCount = Math.max(0, hashes.length - 1);
    const label = commit?.label || getLabText('evidenceCommit', 'Commit');
    const title = escapeMarkup(`${label} · ${rawHash}`);
    const content = `<code>${escapeMarkup(visibleHash)}</code>${extraCount ? `<span>+${extraCount}</span>` : ''}`;

    return commit?.url
        ? `<a class="lab-trouble-commit" href="${escapeMarkup(commit.url)}" target="_blank" rel="noopener noreferrer" aria-label="${title}" title="${title}">${content}</a>`
        : `<div class="lab-trouble-commit is-local" aria-label="${title}" title="${title}">${content}</div>`;
}

function codeSnippetMarkup(code) {
    if (!code) return '';

    const fullFile = String(code.file || '');
    const fullContext = String(code.context || '');
    const file = escapeMarkup(codeFileName(fullFile));
    const context = escapeMarkup(codeContextLabel(fullContext));
    const language = escapeMarkup(code.language);
    const snippet = escapeMarkup(code.snippet.trim());
    const detailTitle = escapeMarkup([fullFile, fullContext].filter(Boolean).join(' · '));

    const ariaLabel = escapeMarkup(formatLabText('representativeFixAria', 'Representative fix from {file}', { file: fullFile }));

    return `<section class="lab-code-snippet" aria-label="${ariaLabel}">
                <header class="lab-code-snippet-header">
                    <span class="lab-code-snippet-label">${escapeMarkup(getLabText('codeSnapshotAfter', 'Code fix'))}</span>
                    <span class="lab-code-snippet-identity" title="${detailTitle}">
                        <strong>${file}</strong>
                        ${context ? `<span class="lab-code-snippet-context">${context}</span>` : ''}
                    </span>
                    <span class="lab-code-snippet-language">${language}</span>
                </header>
                <pre tabindex="0"><code>${snippet}</code></pre>
            </section>`;
}

function evidencePanelMarkup(panel, { attached = false, result = false } = {}) {
    const figures = panel.figures?.length
        ? `<div class="lab-runtime-evidence-figures">
                ${panel.figures.map(figure => {
                    const fitClass = figure.fit ? ` is-${escapeMarkup(figure.fit)}` : '';
                    const src = escapeMarkup(figure.src);
                    const alt = escapeMarkup(figure.alt);
                    const fullStage = String(figure.stage || '');
                    const stage = escapeMarkup(compactEvidenceStage(fullStage));
                    const caption = escapeMarkup(figure.caption);

                    return `<figure class="lab-runtime-evidence-figure${fitClass}">
                                <a href="${src}" target="_blank" rel="noopener noreferrer" aria-label="${escapeMarkup(formatLabText('openEvidenceAria', 'Open full-size evidence: {stage}', { stage }))}">
                                    <img src="${src}" alt="${alt}" loading="lazy" decoding="async">
                                </a>
                                <figcaption>
                                    <strong title="${escapeMarkup(fullStage)}">${stage}</strong>
                                    <p>${caption}</p>
                                </figcaption>
                            </figure>`;
                }).join('')}
           </div>`
        : '';

    const allFacts = (panel.facts || []).filter(fact => !fact.hidden);
    const visibleFacts = allFacts.slice(0, 3);
    const extraFacts = allFacts.slice(3);
    const facts = visibleFacts.length
        ? `<div class="lab-runtime-evidence-facts has-${visibleFacts.length}-items">
                ${visibleFacts.map(fact => {
                    const factDetail = [fact.label, fact.value, fact.detail].filter(Boolean).join(' · ');
                    return `<article title="${escapeMarkup(factDetail)}">
                            <span>${escapeMarkup(fact.label)}</span>
                            <strong>${escapeMarkup(fact.value)}</strong>
                        </article>`;
                }).join('')}
           </div>`
        : '';

    const trace = panel.trace?.snippet
        ? `<section class="lab-runtime-evidence-trace" aria-label="${escapeMarkup(panel.trace.label)}">
                <header title="${escapeMarkup(panel.trace.file)}">
                    <span>${escapeMarkup(panel.trace.label)}</span>
                    <strong>${escapeMarkup(compactEvidenceFile(panel.trace.file))}</strong>
                </header>
                <pre tabindex="0"><code>${escapeMarkup(panel.trace.snippet.trim())}</code></pre>
           </section>`
        : '';

    const method = panel.method
        ? `<div>
                <span>${escapeMarkup(getLabText('method', 'Method'))}</span>
                <p>${escapeMarkup(panel.method)}</p>
           </div>`
        : '';
    const hardware = panel.hardware
        ? `<div>
                <span>${escapeMarkup(panel.hardwareLabel || getLabText('testPc', 'Test PC'))}</span>
                <p>${escapeMarkup(panel.hardware)}</p>
           </div>`
        : '';
    const limitations = panel.limitations?.length
        ? `<div class="lab-runtime-evidence-limits">
                <span>${escapeMarkup(getLabText('scopeLimits', 'Evidence basis'))}</span>
                <ul>${panel.limitations.map(item => `<li>${escapeMarkup(item)}</li>`).join('')}</ul>
           </div>`
        : '';
    const additionalFacts = extraFacts.length
        ? `<div class="lab-runtime-evidence-extra-facts">
                <span>${escapeMarkup(getLabText('additionalValues', 'Additional values'))}</span>
                <ul>${extraFacts.map(fact => `<li><strong>${escapeMarkup(fact.label)}: ${escapeMarkup(fact.value)}</strong>${fact.detail ? ` — ${escapeMarkup(fact.detail)}` : ''}</li>`).join('')}</ul>
           </div>`
        : '';
    const notes = method || hardware || limitations || additionalFacts
        ? `<div class="lab-runtime-evidence-notes">${method}${hardware}${additionalFacts}${limitations}</div>`
        : '';
    const validation = trace || notes
        ? `<details class="lab-runtime-evidence-validation">
                <summary>${escapeMarkup(getLabText('validationDetails', 'Validation details'))}</summary>
                <div class="lab-runtime-evidence-validation-body">${trace}${notes}</div>
           </details>`
        : '';
    const summary = attached ? '' : `<p>${escapeMarkup(panel.summary)}</p>`;
    const body = `${figures}${facts}${validation}`;

    if (panel.collapsed && !result) {
        return `<details class="lab-runtime-evidence lab-runtime-evidence-disclosure">
                    <summary>${escapeMarkup(panel.title)}</summary>
                    <div class="lab-runtime-evidence-disclosure-body">${body}</div>
                </details>`;
    }

    return `<section class="lab-runtime-evidence">
                <header class="lab-runtime-evidence-header">
                    <div>
                        <h4>${escapeMarkup(panel.title)}</h4>
                        ${summary}
                    </div>
                </header>
                ${body}
            </section>`;
}

function troubleshootingEvidenceMarkup(panels, { attached = false, result = false } = {}) {
    if (!panels?.length) return '';

    return `<div class="lab-runtime-evidence-list${attached ? ' is-attached' : ''}${result ? ' is-result' : ''}" aria-label="${escapeMarkup(getLabText('preservedEvidenceAria', 'Preserved runtime and visual evidence'))}">
                ${panels.map(panel => evidencePanelMarkup(panel, { attached, result })).join('')}
            </div>`;
}

function renderWeekSelector() {
    const weekLabel = getLabText('weekLabel', 'Week');
    labElements.weekSelector.innerHTML = getLocalizedWeeks().map((week, index) => `
        <button class="lab-week-select${index === labState.selectedWeek ? ' is-active' : ''}${week.featured ? ' is-featured' : ''}"
                type="button"
                role="tab"
                aria-selected="${index === labState.selectedWeek}"
                aria-label="${escapeMarkup(`${weekLabel} ${week.week}: ${week.title}`)}"
                tabindex="${index === labState.selectedWeek ? '0' : '-1'}"
                data-week-index="${index}">
            <span>${escapeMarkup(weekLabel)}</span>
            <strong>${week.week}</strong>
        </button>
    `).join('');
}

function renderWeekHeader() {
    const week = getLocalizedWeek(labState.selectedWeek);
    labElements.weekEyebrow.textContent = `${getLabText('weekLabel', 'Week')} ${week.week} · ${week.theme}`;
    labElements.weekTitle.textContent = week.title;
    labElements.weekSummary.textContent = week.summary;
}

function renderDetailPanel() {
    const week = getLocalizedWeek(labState.selectedWeek);
    let content = '';

    if (labState.detailTab === 'role') {
        content = `
            <div class="lab-detail-grid">
                <section class="lab-detail-card lab-detail-card--accent">
                    <span class="lab-detail-label">${getLabText('assignmentLabel', 'Assignment')}</span>
                    <h4>${week.objective}</h4>
                </section>
                <section class="lab-detail-card">
                    <span class="lab-detail-label">${getLabText('myRoleLabel', 'My role')}</span>
                    <h4>${week.role}</h4>
                    ${listMarkup(week.contributions)}
                </section>
            </div>
        `;
    } else if (labState.detailTab === 'implementation') {
        content = `
            <div class="lab-system-flow" aria-label="${getLabText('implementationFlowAria', 'Implementation flow')}">
                <span>${window.PortfolioI18n?.t?.('global.systemFlow', 'System flow') || 'System flow'}</span>
                <strong>${week.flow}</strong>
            </div>
            <div class="lab-detail-grid">
                <section class="lab-detail-card">
                    <span class="lab-detail-label">${getLabText('coreImplementation', 'Core implementation')}</span>
                    ${listMarkup(week.implementation)}
                </section>
                <section class="lab-detail-card">
                    <span class="lab-detail-label">${window.PortfolioI18n?.t?.('global.primaryStack', 'Primary stack') || 'Primary stack'}</span>
                    ${techMarkup(week.technologies)}
                </section>
            </div>
        `;
    } else if (labState.detailTab === 'evidence') {
        const resultEvidence = troubleshootingEvidenceMarkup(
            (week.troubleshootingEvidence || []).filter(panel => panel.placement === 'result'),
            { result: true }
        );
        const sourceLink = week.sourceUrl
            ? `<a class="lab-source-link" href="${week.sourceUrl}" target="_blank" rel="noopener noreferrer">${week.sourceLabel}</a>`
            : '';
        const commitEvidence = week.commitRefs?.length
            ? `<details class="lab-commit-evidence">
                    <summary>
                        <span>${getLabText('selectedAuthoredCommits', 'Key commits')}</span>
                        <strong>${week.commitRefs.length}</strong>
                    </summary>
                    <div class="lab-commit-list">
                        ${week.commitRefs.map(commit => commit.url
                            ? `<a href="${escapeMarkup(commit.url)}" target="_blank" rel="noopener noreferrer"><code>${escapeMarkup(commit.hash)}</code><span>${escapeMarkup(commit.label)}</span></a>`
                            : `<div><code>${escapeMarkup(commit.hash)}</code><span>${escapeMarkup(commit.label)}</span></div>`
                        ).join('')}
                    </div>
               </details>`
            : '';

        content = `
            <div class="lab-detail-grid">
                <section class="lab-detail-card">
                    <span class="lab-detail-label">${window.PortfolioI18n?.t?.('global.resultTitle', 'Result') || 'Result'}</span>
                    ${listMarkup(week.results)}
                </section>
                <section class="lab-detail-card lab-evidence-card">
                    <span class="lab-detail-label">${window.PortfolioI18n?.t?.('global.evidenceStatus', 'Evidence status') || 'Evidence status'}</span>
                    <h4>${week.evidenceStatus}</h4>
                    <p>${week.evidenceNote}</p>
                    ${sourceLink}
                </section>
            </div>
            ${resultEvidence}
            ${commitEvidence}
        `;
    } else {
        const troubleshootingCount = week.troubleshooting?.length || 0;
        const troubleshootingCountLabel = week.troubleshootingPending
            ? getLabText('sourceRecovery', 'Source files pending')
            : formatLabText('documentedCases', '{count} {noun}', {
                count: troubleshootingCount,
                noun: getLabText(troubleshootingCount === 1 ? 'caseSingular' : 'casePlural', troubleshootingCount === 1 ? 'case' : 'cases')
            });
        const pending = week.troubleshootingPending
            ? `<section class="lab-trouble-pending">
                    <span class="lab-detail-label">${getLabText('pendingSourceRecovery', 'Pending source recovery')}</span>
                    <h4>${getLabText('sourceRecoveryTitle', 'Source recovery is still pending.')}</h4>
                    <p>${week.troubleshootingPending}</p>
               </section>`
            : '';
        const evidencePanels = (week.troubleshootingEvidence || []).filter(
            panel => panel.placement !== 'result'
        );
        const availableCaseIds = new Set(
            (week.troubleshooting || []).map(item => item.id).filter(Boolean)
        );
        const standaloneEvidencePanels = evidencePanels.filter(
            panel => !panel.caseId || !availableCaseIds.has(panel.caseId)
        );
        const runtimeEvidence = troubleshootingEvidenceMarkup(standaloneEvidencePanels);
        const cases = week.troubleshooting?.length
            ? `<div class="lab-troubleshooting-list">
                    ${week.troubleshooting.map((item, index) => {
                        const commit = troubleCommitMarkup(item.commit);

                        const attachedEvidencePanels = item.id
                            ? evidencePanels.filter(panel => panel.caseId === item.id)
                            : [];
                        const attachedEvidence = troubleshootingEvidenceMarkup(attachedEvidencePanels, { attached: true });

                        return `<article class="lab-trouble-card">
                                    <header class="lab-trouble-header">
                                        <span class="lab-trouble-index">${formatLabText('caseLabel', 'Case {number}', { number: String(index + 1).padStart(2, '0') })}</span>
                                        <h4>${item.title}</h4>
                                        ${commit}
                                    </header>
                                    <div class="lab-trouble-grid">
                                        <section class="lab-trouble-field lab-trouble-field--symptom">
                                            <span>${getLabText('symptom', 'Symptom')}</span>
                                            <p>${item.symptom}</p>
                                        </section>
                                        <section class="lab-trouble-field lab-trouble-field--cause">
                                            <span>${getLabText('rootCause', 'Root cause')}</span>
                                            <p>${item.cause}</p>
                                        </section>
                                        <section class="lab-trouble-field lab-trouble-field--fix">
                                            <span>${getLabText('fix', 'Fix')}</span>
                                            <p>${item.fix}</p>
                                        </section>
                                        <section class="lab-trouble-field lab-trouble-field--result">
                                            <span>${getLabText('result', 'Result')}</span>
                                            <p>${item.result}</p>
                                        </section>
                                    </div>
                                    ${codeSnippetMarkup(item.code)}
                                    ${attachedEvidence}
                                </article>`;
                    }).join('')}
               </div>`
            : '';

        content = `
            <div class="lab-trouble-intro">
                <div class="lab-trouble-intro-heading">
                    <span class="lab-detail-label">${getLabText('commitDerivedLabel', 'Curated engineering cases')}</span>
                    <strong>${troubleshootingCountLabel}</strong>
                </div>
                <p>${getLabText('troubleshootingIntro', 'Key cases verified through authored commits and code changes.')}</p>
            </div>
            ${pending}
            ${cases}
            ${runtimeEvidence}
        `;
    }

    labElements.detailPanel.innerHTML = content;
}

function renderTimeline() {
    const weekLabel = getLabText('weekLabel', 'Week');
    labElements.timeline.innerHTML = getLocalizedWeeks().map((week, index) => `
        <li class="lab-timeline-item${week.featured ? ' is-featured' : ''}">
            <button type="button" data-timeline-week="${index}" aria-label="${escapeMarkup(`${getLabText('timelineOpen', 'Open')} ${weekLabel} ${week.week}: ${week.title}`)}">
                <span class="lab-timeline-week">${weekLabel} ${week.week}</span>
                <span class="lab-timeline-copy">
                    <small>${week.theme}</small>
                    <strong>${week.title}</strong>
                    <span>${week.summary}</span>
                </span>
                <span class="lab-timeline-open" aria-hidden="true">${getLabText('timelineOpen', 'Open')}</span>
            </button>
        </li>
    `).join('');
}

function updateWeek(index, updateHash = true) {
    labState.selectedWeek = index;
    renderWeekSelector();
    renderWeekHeader();
    renderDetailPanel();

    if (updateHash) {
        history.replaceState(null, '', `#week${labWeeks[index].week}`);
    }
}

function setDetailTab(tabName, shouldFocus = false) {
    labState.detailTab = tabName;

    labElements.detailTabs.forEach(button => {
        const isActive = button.dataset.detailTab === tabName;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-selected', String(isActive));
        button.tabIndex = isActive ? 0 : -1;
        if (isActive) {
            labElements.detailPanel.setAttribute('aria-labelledby', button.id);
            if (shouldFocus) button.focus();
        }
    });

    renderDetailPanel();
}

function setView(viewName, shouldFocus = false) {
    labState.view = viewName;

    labElements.primaryTabs.forEach(button => {
        const isActive = button.dataset.labView === viewName;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-selected', String(isActive));
        button.tabIndex = isActive ? 0 : -1;
        if (isActive && shouldFocus) button.focus();
    });

    labElements.viewPanels.forEach(panel => {
        const isActive = panel.id === `${viewName}View`;
        panel.classList.toggle('is-active', isActive);
        panel.hidden = !isActive;
    });
}

function handleArrowNavigation(event, buttons, currentIndex, callback) {
    let nextIndex = currentIndex;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        nextIndex = (currentIndex + 1) % buttons.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
    } else if (event.key === 'Home') {
        nextIndex = 0;
    } else if (event.key === 'End') {
        nextIndex = buttons.length - 1;
    } else {
        return;
    }

    event.preventDefault();
    callback(nextIndex);
}

function initializeLabExplorer() {
    const hashMatch = window.location.hash.match(/^#week(0[1-9]|1[0-4])$/i);
    if (hashMatch) {
        labState.selectedWeek = Number(hashMatch[1]) - 1;
    }

    renderWeekSelector();
    renderWeekHeader();
    renderDetailPanel();
    renderTimeline();

    labElements.primaryTabs.forEach((button, index) => {
        button.addEventListener('click', () => setView(button.dataset.labView));
        button.addEventListener('keydown', event => {
            handleArrowNavigation(event, labElements.primaryTabs, index, nextIndex => {
                setView(labElements.primaryTabs[nextIndex].dataset.labView, true);
            });
        });
    });

    labElements.detailTabs.forEach((button, index) => {
        button.addEventListener('click', () => setDetailTab(button.dataset.detailTab));
        button.addEventListener('keydown', event => {
            handleArrowNavigation(event, labElements.detailTabs, index, nextIndex => {
                setDetailTab(labElements.detailTabs[nextIndex].dataset.detailTab, true);
            });
        });
    });

    labElements.weekSelector.addEventListener('click', event => {
        const button = event.target.closest('[data-week-index]');
        if (!button) return;
        updateWeek(Number(button.dataset.weekIndex));
    });

    labElements.weekSelector.addEventListener('keydown', event => {
        const buttons = Array.from(labElements.weekSelector.querySelectorAll('[data-week-index]'));
        const currentIndex = buttons.indexOf(event.target.closest('[data-week-index]'));
        if (currentIndex < 0) return;

        handleArrowNavigation(event, buttons, currentIndex, nextIndex => {
            updateWeek(nextIndex);
            labElements.weekSelector.querySelector(`[data-week-index="${nextIndex}"]`).focus();
        });
    });

    labElements.timeline.addEventListener('click', event => {
        const button = event.target.closest('[data-timeline-week]');
        if (!button) return;

        const weekIndex = Number(button.dataset.timelineWeek);
        updateWeek(weekIndex);
        setDetailTab('role');
        setView('weeks');
        document.querySelector('.lab-primary-tabs').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

document.addEventListener('portfolio-locale-changed', () => {
    renderWeekSelector();
    renderWeekHeader();
    renderDetailPanel();
    renderTimeline();
});

initializeLabExplorer();
