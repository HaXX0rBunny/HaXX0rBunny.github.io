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
        evidenceNote: 'The local history contains 55 commits attributed to HaXX0rBunny, including 45 non-merge commits from March 9–12, 2026. The original repository is not publicly accessible.',
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
        ]
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
        evidenceNote: 'The public repository preserves the Week03 author history. Week02 ancestor commits were excluded when interpreting the later Week03 work.',
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
        title: 'Asset Import Pipeline',
        summary: 'Developed the path from external OBJ data to reusable engine mesh assets, viewing, binary baking, and UV behavior.',
        role: 'Asset Pipeline Integration (snapshot-verified)',
        objective: 'Stop treating OBJ files as one-time demo inputs and turn them into assets the engine can load, inspect, and reuse.',
        contributions: [
            'The authored snapshot contains FObjManager and UStaticMesh responsibilities for imported geometry.',
            'The same snapshot contains TObjectIterator-style object traversal and the engine object model integration.',
            'OBJ viewing, archive/bake paths, and UV scrolling are present, but the pre-snapshot line history is not preserved.'
        ],
        implementation: [
            'OBJ parsing and static-mesh construction',
            'FArchive, FWindowsBinWriter, and FWindowsBinReader binary path',
            'OBJ Viewer, object iteration, and UV scroll controls'
        ],
        flow: 'OBJ text → parsed mesh → engine object → binary bake → fast reload',
        technologies: ['C++', 'OBJ', 'FArchive', 'Binary I/O', 'UV'],
        results: [
            'The preserved project state contains an engine-managed OBJ/static-mesh asset workflow.',
            'Personal custody and integration are commit-backed; original implementation ownership remains partially unverified.'
        ],
        evidenceStatus: 'Snapshot commit verified; original authorship incomplete',
        evidenceNote: 'Commit f023410, authored by HaXX0rBunny, adds ObjManager, UStaticMesh, TObjectIterator, ObjViewerPanel, and Archive sources to the later game-jam repository. Because that commit imports the project as one snapshot, it proves custody/integration of the code but not the original line-by-line Week04 authorship.',
        sourceUrl: 'https://github.com/HaXX0rBunny/Week5_Team4_Gamejam/commit/f02341063228af043cb322bb36605dbccaf3a82a',
        sourceLabel: 'Open imported project snapshot',
        troubleshootingPending: 'Original Week04 source files and pre-snapshot commit history are not available yet. Troubleshooting cases will be added after those files are recovered; the imported Week05 snapshot is not sufficient to reconstruct symptom, cause, and fix truthfully.',
        troubleshooting: [],
        commitRefs: [
            { hash: 'f023410', label: 'OBJ/StaticMesh/Iterator/Viewer/Archive snapshot', url: 'https://github.com/HaXX0rBunny/Week5_Team4_Gamejam/commit/f02341063228af043cb322bb36605dbccaf3a82a' }
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
            'Preserved deterministic 50,000- and 64,000-object workloads for repeatable comparison; no original paired performance benchmark is preserved.'
        ],
        evidenceStatus: 'Verified author commits',
        evidenceNote: 'The local W5_Team4 history contains 46 commits attributed to HaXX0rBunny, including 36 non-merge commits from April 4–7, 2026. That repository is private; the public game-jam repository preserves the later integrated engine state.',
        sourceUrl: 'https://github.com/HaXX0rBunny/Week5_Team4_Gamejam',
        sourceLabel: 'Open integrated game-jam repository',
        troubleshootingEvidence: [
            {
                kicker: 'Git-backed before / after',
                title: 'The atlas development progressed from collapsed shards to complete directional captures.',
                summary: 'These are exact 2048 × 2048 albedo-atlas blobs recovered from two points in the authored commit sequence. They document the iterative bake and direction-mapping work associated with Case 03; the Case 03 code diff remains the fix-level evidence.',
                tags: ['Actual generated artifacts', 'Authored Git commits', 'Case 03'],
                figures: [
                    {
                        stage: 'Before · ec931251',
                        src: 'Assets/images/gametechlab/evidence/week05-atlas-before-ec931251.png',
                        alt: 'Broken octahedral impostor albedo atlas where most directional cells contain thin apple shards',
                        caption: 'Most cells contain thin or collapsed projections, so the baked proxy cannot reconstruct a stable view.',
                        fit: 'contain'
                    },
                    {
                        stage: 'After · 2960b5b',
                        src: 'Assets/images/gametechlab/evidence/week05-atlas-after-2960b5b.png',
                        alt: 'Corrected octahedral impostor albedo atlas with complete apple views across a sixteen by sixteen directional grid',
                        caption: 'The final bake contains recognizable apple silhouettes throughout the 16 × 16 directional grid.',
                        fit: 'contain'
                    }
                ],
                facts: [
                    { label: 'Artifact', value: 'Albedo atlas', detail: 'Generated by the engine bake path' },
                    { label: 'Resolution', value: '2048 × 2048', detail: '16 × 16 directional cells' },
                    { label: 'Before blob', value: 'ec931251', detail: 'Authored WIP commit' },
                    { label: 'After blob', value: '2960b5b', detail: 'Authored final bake commit' }
                ],
                method: 'Both PNG files are copied byte-for-byte from the corresponding authored Git revisions of PerformanceEngine/Data/Scene/apple_mid_Impostor_Albedo.png.',
                limitations: ['This comparison proves the generated atlas changed; it does not by itself measure runtime frame time or final proxy fidelity from every camera angle.']
            },
            {
                kicker: 'Local runtime observation',
                title: 'The 50,000-object workload was captured in Full Mesh and Impostor modes.',
                summary: 'The screenshots are real local engine captures and the raw HUD values are transcribed below. They are shown as observed samples, not as a controlled speedup benchmark, because an exact binary/configuration manifest and a repeated Full Mesh run were not preserved.',
                tags: ['Actual runtime captures', '50,000 objects', 'Single-sample comparison'],
                figures: [
                    {
                        stage: 'Full Mesh capture',
                        src: 'Assets/images/gametechlab/evidence/week05-runtime-full-mesh.png',
                        alt: 'PerformanceEngine rendering fifty thousand full apple meshes with the runtime HUD visible',
                        caption: 'HUD sample: 151.15 FPS · 6.62 ms · 10,725 draw calls · 50,000 primitives.'
                    },
                    {
                        stage: 'Impostor capture',
                        src: 'Assets/images/gametechlab/evidence/week05-runtime-impostor.png',
                        alt: 'PerformanceEngine rendering fifty thousand apple impostors with the runtime HUD visible',
                        caption: 'HUD sample: 311.16 FPS · 3.21 ms · 2 draw calls · 50,000 primitives.'
                    }
                ],
                facts: [
                    { label: 'HUD FPS', value: '151.15 / 311.16', detail: 'Full Mesh / Impostor · instantaneous samples' },
                    { label: 'HUD frame', value: '6.62 / 3.21 ms', detail: 'Full Mesh / Impostor · instantaneous samples' },
                    { label: 'HUD draw calls', value: '10,725 / 2', detail: 'Full Mesh / Impostor · instantaneous samples' },
                    { label: 'Logged Impostor run', value: '4,481 frames', detail: '9.109 s · 2.033 ms mean frame time' },
                    { label: 'Primary fixture', value: '50,000 objects', detail: '25k apple + 25k bitten apple' },
                    { label: 'Capacity fixture', value: '64,000 objects', detail: 'Repro input exists; no result metric preserved' }
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
                method: 'Later local Release x64 evidence at 1280 × 720. Source configuration disables VSync and pins the main thread to affinity bit 2. The Impostor-only CSV was recorded on 2026-08-21; the two HUD captures were preserved on 2026-08-22.',
                hardwareLabel: 'Capture PC',
                hardware: 'Intel Core i7-14700 · NVIDIA GeForce RTX 5060 8 GB (driver 596.36) · 32 GB RAM · Windows 11',
                limitations: [
                    'The screenshots are not commit-bound controlled benchmark runs; raw values are observations from the preserved captures.',
                    'Only the Impostor path has a repeated frame log. No repeated Full Mesh CSV, GPU counter capture, VRAM trace, or statistical speedup claim is available.',
                    'The arithmetic average of instantaneous FPS is intentionally omitted; mean frame time is the comparable logged statistic.'
                ]
            }
        ],
        troubleshooting: [
            {
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
                title: 'Impostor view mismatch, pole instability, and atlas halos',
                symptom: 'The impostor could choose an incorrect atlas direction, flip near the poles, and show seams or dark halos around alpha edges.',
                cause: 'World-space camera direction was encoded as if it were local, the billboard up vector became unstable near parallel directions, a single atlas cell produced discontinuities, and color around transparent texels was not safely dilated/unpremultiplied.',
                fix: 'Transformed the camera direction into object local space, derived stable spherical billboard axes, blended four neighboring octahedral cells, unpremultiplied alpha, and dilated atlas borders in the CPU staging texture.',
                result: 'The proxy tracks the source object orientation more reliably and transitions between captured directions with fewer seams and edge halos.',
                code: {
                    file: 'PerformanceEngine/Shader/ImpostorRuntime.hlsl',
                    context: 'VSMain() direction and billboard basis',
                    language: 'HLSL',
                    snippet: `float3 worldCenter = mul(float4(0.0f, 0.0f, 0.0f, 1.0f), data.WorldMatrix).xyz;
float3 dirToCameraWorld = normalize(CameraPos.xyz - worldCenter);
float3 dirToCameraLocal = normalize(mul((float3x3) data.WorldMatrix, dirToCameraWorld));

float3 upGuide = float3(0, 1, 0);
if (abs(dirToCameraWorld.y) > 0.999f)
{
    upGuide = float3(0, 0, 1);
}
float3 right = normalize(cross(upGuide, dirToCameraWorld));
float3 up = normalize(cross(dirToCameraWorld, right));`
                },
                commit: { hash: '520b502' }
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
            { hash: '28fe14e', label: 'Octahedral impostor' }
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
        evidenceNote: 'The repository contains 34 commits attributed to HaXX0rBunny, including 28 non-merge commits from April 12–16, 2026.',
        sourceUrl: 'https://github.com/HaXX0rBunny/Jungle_Week6_Team7/tree/feature/v_fog',
        sourceLabel: 'Open fog feature branch',
        troubleshootingEvidence: [
            {
                kicker: 'Earliest fog failure · pre-commit captures',
                title: 'The first fog pass saturated geometry to the fog color while most of the editor viewport remained black.',
                summary: 'These captures were recorded 12.65 seconds apart, 32 minutes before 894b180 first committed the WIP full-screen fog path. The cube color is #8098B1—nearly identical to the configured default fog color of approximately #8099B3—while #0F0F0F dominates the surrounding viewport. Commit 3f5241e later identifies the direct composition fault: ordinary alpha blending replaced render-target alpha with fogOpacity, so ImGui exposed its black background. The early far/sky math also lacked the numerical guards later added in ed1d815, but the screenshots alone do not prove that camera distance caused the black pixels.',
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
                    { label: 'Capture interval', value: '12.65 sec', detail: '00:53:07.922 → 00:53:20.569 KST' },
                    { label: 'Black frame coverage', value: '89.870%', detail: '#0F0F0F versus normal #404040 clear' },
                    { label: 'Cube / default fog', value: '#8098B1 / ≈ #8099B3', detail: 'Rendered mesh closely matches FogColor' },
                    { label: 'First fog commit', value: '894b180', detail: 'WIP path committed 32 min later' },
                    { label: 'Numerical guard', value: 'ed1d815', detail: 'Homogeneous W, ray, exponent, and result checks' },
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
                method: 'Copied both PNGs byte-for-byte, measured their dominant colors, ordered them by sub-second timestamps, confirmed that the parent of the first fog commit contains no fog files, and compared the later numerical-guard and alpha-blend diffs. A pre-894b180 working-tree run is the strongest timeline inference, not an embedded revision claim.',
                limitations: [
                    'The images precede the first fog commit, so the exact uncommitted shader text, fog parameters, camera transform, and executable build are not preserved.',
                    'An opaque desktop screenshot cannot expose the original render-target alpha or identify non-finite shader values directly; those causes are established by the later code diffs.',
                    'The black output aligns most directly with the documented ImGui alpha-composition fault; distance, far-plane clipping, and non-finite sky reconstruction are not isolated by these images.',
                    'No same-camera post-fix capture or frame-time benchmark is preserved.'
                ]
            },
            {
                kicker: 'Actual fog-visibility pair · local captures',
                title: 'One fog-active view retains the meshes; the later cropped view contains only the FogActor billboard.',
                summary: 'Both captures contain the same dominant fog color. In the first, the cube and sphere remain visible; seven minutes and 39 seconds later, the cropped viewport contains only the editor FogActor billboard. This faithfully records the requested mesh-visible / mesh-not-visible states, but the files do not isolate fog attenuation from camera movement or far-plane clipping and are not presented as a commit-bound bug-fix before/after.',
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
                        caption: 'No scene mesh is visible in this cropped frame; the FogActor billboard remains because it is rendered as an editor overlay. The capture alone does not identify whether fog, camera distance, or clipping removed the mesh.',
                        fit: 'contain'
                    }
                ],
                facts: [
                    { label: 'Capture interval', value: '7 min 39 s', detail: 'April 15 20:35:25 → 20:43:04 KST' },
                    { label: 'Visible frame', value: '527 × 371', detail: 'Fog applied with cube and sphere readable' },
                    { label: 'Mesh-absent frame', value: '292 × 165', detail: 'Only the FogActor billboard is visible' },
                    { label: 'Nearest prior revision', value: '1a1b013 · 20:00 KST', detail: 'Exponential fog; both captures precede the later 5ccad72 linear-fog restore' }
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
                method: 'Copied the two original PNGs byte-for-byte, ordered them by filesystem capture time, inspected the adjacent capture sequence, and matched the interval to the Week06 HeightFog shader history.',
                limitations: [
                    'The captures use different viewport crops and resolutions, so they are not a pixel-matched visual regression test.',
                    'Neither image includes the property panel, exact camera transform, fog parameter values, executable hash, or working-tree revision; the exact input change between them cannot be recovered.',
                    'The camera configuration saved in the next fog commit still used a 100-unit far clip, so the second image cannot be used as proof that fog alone hid the geometry.',
                    'Both images postdate the initial a5ddaeb height-fog implementation and predate the final 5ccad72 linear-fog path, so they validate the intermediate exponential-fog behavior only.',
                    'They demonstrate visual attenuation, not a performance improvement; no frame-time benchmark was recorded.'
                ]
            },
            {
                kicker: 'Actual horizon-seam diagnostics → Git-backed correction',
                title: 'Sky and scene geometry followed different fog evaluations, leaving a hard horizon boundary.',
                summary: 'These three editor captures document the height-fog profile being tuned immediately before the final fog commit. The first two retain a dark upper sky above a sharply bounded blue fog layer; the third replaces that dark region with a fog-colored sky response during the working-tree iteration. The sequence is treated as pre-commit diagnostics—not as a clean commit before/after.',
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
                        caption: 'The alternate response reaches the sky and removes the black upper region, but the exact mode and parameter change are not recoverable because the property panel is absent.',
                        fit: 'contain'
                    }
                ],
                facts: [
                    { label: 'Working-tree comparison', value: '40.15 s', detail: '00:53:39.051 → 00:54:19.198 KST' },
                    { label: 'Final authored commit', value: '5ccad72', detail: '15 min 39 s after the final capture' },
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
                method: 'Preserved the three source PNGs byte-for-byte, ordered them by sub-second filesystem timestamps, compared their visible sky/fog regions, and matched the sequence to the parent and result blobs of 5ccad72.',
                limitations: [
                    'All three images were captured before the authored commit and may contain uncommitted working-tree changes; they cannot be assigned to exact Git blobs.',
                    'The property panel is absent, so the linear/exponential toggle, density, height, falloff, maximum opacity, and camera values in each frame are unknown.',
                    'No matching post-commit horizon screenshot is preserved. The correction is proven by the shader diff, while the final visual result is not independently captured.',
                    'This is a visual-correctness investigation; no frame-time or GPU-pass benchmark was recorded.'
                ]
            },
            {
                kicker: 'User-described RGBA isolation · actual diagnostic captures',
                title: 'Channel-by-channel inspection isolated render-target alpha as the source of the black decal exterior.',
                summary: 'The first capture preserves the black exterior visible around the projected response; the second preserves a wide red additive contribution during the same debugging session. The developer reports testing R, G, B, and A individually and isolating the fault to alpha. The temporary channel-isolation shader was not committed, so the exact channel represented by either full-color PNG is not claimed.',
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
                        caption: 'The dominant red footprint makes the projected RGB contribution visible across reconstructed planar and cube surfaces; it is not labeled as a committed R-only view.',
                        fit: 'contain'
                    }
                ],
                facts: [
                    { label: 'Capture interval', value: '12 min 14.42 s', detail: '02:40:47.233 → 02:53:01.653 KST' },
                    { label: 'Dominant red frame', value: '#BF4040 · 64.619%', detail: 'Consistent with red additive contribution over #404040' },
                    { label: 'Saved PNG alpha', value: '255 everywhere', detail: 'The screenshots do not preserve the source render-target alpha values' },
                    { label: 'Recorded Git state', value: 'After decfa685', detail: 'No subsequent commit exists between or after these captures' }
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
                method: 'Copied both source PNGs byte-for-byte, inspected dimensions, timestamps, colors, and stored alpha, then compared the authored blend-state history and renderer blame. The developer’s RGBA-isolation recollection is retained as context where Git cannot preserve the temporary shader edits.',
                limitations: [
                    'The committed editor has no standalone R/G/B/A view mode, so the exact temporary diagnostic shader and per-image channel selection cannot be reconstructed.',
                    'Both PNGs are opaque full-color screenshots; they show the investigation but do not numerically expose the underlying render-target alpha channel.',
                    'Both captures postdate the final recorded branch merge and have no intervening commit, so they are not commit-level before/after evidence.',
                    'The direct Projection Decal binding in 2a066ce was authored by a teammate; the personal contribution is the reusable alpha-preserving state and SpotLightDecal additive integration.',
                    'This is a visual-correctness fix; no frame-time or GPU benchmark was recorded.'
                ]
            }
        ],
        troubleshooting: [
            {
                title: 'A constant sky-fog branch created a hard horizon seam',
                symptom: 'The fogged ground and the background sky met at a visibly sharp horizontal boundary instead of sharing a continuous atmospheric response.',
                cause: 'Depth-buffer sky pixels (depth ≥ 1) returned FogInscatteringColor at FogMaxOpacity immediately, while geometry pixels reconstructed a world position and integrated exponential height fog. Adjacent pixels across the horizon therefore used different equations.',
                fix: 'Reconstructed a world-space direction for sky pixels through InvViewProj, evaluated a far virtual point with the same selected linear or exponential fog function used by geometry, and exposed bUseLinearFog through the component and constant-buffer path.',
                result: 'Sky and geometry now share the distance-, height-, and direction-aware fog evaluation. The code-path discontinuity is removed; a clean post-commit comparison frame was not preserved.',
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
                title: 'Decal RGB was valid while its blend path polluted viewport alpha',
                symptom: 'The projected response was visible, but its exterior became black when the viewport texture was composited. Inspecting the output channels individually isolated alpha rather than the RGB lighting calculation.',
                cause: 'The ordinary alpha blend equation wrote destination alpha as 1 × SrcAlpha + 0 × DstAlpha. A fog or decal pass could therefore replace the scene render target’s alpha even when its RGB result was correct, and ImGui later interpreted the damaged alpha during viewport composition.',
                fix: 'Created an AlphaBlendKeepAlpha state for ordinary translucent color and an Additive state for spotlight contribution. Both keep destination alpha through 0 × SrcAlpha + 1 × DstAlpha; the projection decal pass was connected to the reusable state by a teammate, while the SpotLightDecal path used the personal additive integration.',
                result: 'Fog and spotlight color can change RGB without modifying the viewport alpha. Personal work covers the reusable keep-alpha state and SpotLightDecal additive path; teammate commit 2a066ce supplies the Projection Decal binding. The supplied images are post-merge diagnostic captures, not a commit A/B.',
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
                result: 'Interior spotlight pixels proceed to falloff, normal, and luminance evaluation while exterior pixels are rejected. No matching runtime A/B capture is preserved.',
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
                result: 'Fog removal no longer invalidates the visibility records used to render the rest of the scene. The supplied screenshots were captured after this fix and therefore are contextual fog tests, not this commit’s before/after evidence.',
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
                symptom: 'While stabilizing the first full-screen fog prototype, the depth-boundary code path could produce undefined world positions and opacity inputs for sky or far pixels. The supplied black-viewport captures are contextual evidence, not a direct numerical trace of this condition.',
                cause: 'ReconstructWorldPos divided by homogeneous worldH.w without guarding a near-zero value. The resulting ray length, normalized direction, height exponent, and accumulated density could then become zero-length, infinite, NaN, negative, or overflowed before reaching the blend stage.',
                fix: 'Guarded homogeneous W and invalid ray lengths, clamped exponential inputs, forced a non-negative bounded fog integral, saturated opacity, and discarded a final result if any component remained NaN or infinite.',
                result: 'Invalid far/sky reconstruction no longer propagates a non-finite opacity or color into the fog pass. The supplied captures record the earlier failure; no matched post-fix frame is preserved.',
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
        evidenceNote: 'The local history contains 44 commits attributed to HaXX0rBunny, including 31 non-merge commits from April 17–23, 2026. The original public remote is no longer available.',
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
        evidenceNote: 'The repository contains 37 commits attributed to HaXX0rBunny, including 29 non-merge commits from April 25–29, 2026.',
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
            'Verified the START/loading transition and StoryScene BeginPlay in the runtime log; no rendered gameplay viewport frame is claimed.'
        ],
        evidenceStatus: 'Verified author commits',
        evidenceNote: 'The Week09 repository contains 95 commits attributed to HaXX0rBunny, including 74 non-merge commits from May 1–9, 2026. Runtime claims remain limited to the directly verified standalone path.',
        sourceUrl: 'https://github.com/Rocketstein/Jungle_Week9_Team6/commits/main/?author=HaXX0rBunny',
        sourceLabel: 'Open authored Week09 commits',
        troubleshootingEvidence: [
            {
                kicker: 'Actual Shipping runtime checkpoints',
                title: 'The packaged EXE reached the menu and entered the START loading transition.',
                summary: 'The captures and preserved Engine.log verify the standalone path without overstating the result. The log records game/story.scene load and StoryScene Lua BeginPlay; no rendered gameplay frame was preserved.',
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
                        caption: 'START moved the runtime into its loading transition. This is not labeled as a gameplay viewport capture.',
                        fit: 'crop-ui'
                    }
                ],
                facts: [
                    { label: 'Direct launch', value: 'Verified', detail: 'Standalone menu rendered and presented' },
                    { label: 'Scene-flow log', value: 'StoryScene BeginPlay', detail: 'game/story.scene queued and loaded' },
                    { label: 'Cook output', value: '16 .umap', detail: 'Cook step completed' },
                    { label: 'Stage inventory', value: '429 files', detail: '0 source .Scene files' },
                    { label: 'Fresh pipeline', value: '65.296 s', detail: 'Build, Cook, and Stage completed' },
                    { label: 'Verify gate', value: 'Exit 1', detail: 'Required cube source/cache was missing' },
                    { label: 'Preserved startup run', value: '6,961.2 ms', detail: 'One run only; not a benchmark' },
                    { label: 'Gameplay frame', value: 'Not captured', detail: 'No visual success claim' }
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
                hardware: 'Intel Core i7-14700 · NVIDIA GeForce RTX 5060 8 GB (driver 596.36) · 32 GB RAM · Windows 11',
                limitations: [
                    'The fresh run completed Build, Cook, and Stage but correctly failed Verify because BasicShape/cube.obj and Cache/cube.bin were absent.',
                    'The START transition and StoryScene BeginPlay are verified separately; a rendered gameplay viewport frame was not preserved.',
                    'Clean-PC execution and bundled VC++ redistributable coverage were not verified. The startup timing is a single run, not a repeated benchmark.'
                ]
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
        evidenceNote: 'The repository history contains 59 commits attributed to HaXX0rBunny, including 54 non-merge commits from May 16–20, 2026. Public remote access was reverified against origin/main.',
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
        evidenceNote: 'The repository history contains 30 commits attributed to HaXX0rBunny, including 23 non-merge commits from May 23–27, 2026. Public remote access was reverified against origin/main.',
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
        evidenceNote: 'The repository contains 20 commits attributed to HaXX0rBunny, including 15 non-merge commits from June 1–3, 2026.',
        sourceUrl: 'https://github.com/puter2712git/Jungle_Week13_Team3/commits/main/?author=HaXX0rBunny',
        sourceLabel: 'Open authored Week13 commits',
        troubleshootingEvidence: [
            {
                kicker: 'Preserved runtime trace',
                title: 'The physics preview logged the generated body dimensions and bone-space scale used for drawing.',
                summary: 'This ignored local Engine.log is an actual post-implementation runtime artifact. It supports the generated-body inspection path in Case 01, but there is no matching pre-fix trace or frame capture.',
                tags: ['Actual runtime log', 'Physics bodies', 'Case 01'],
                facts: [
                    { label: 'Logged bodies', value: '6', detail: 'Pelvis and left/right leg chain' },
                    { label: 'Shape', value: 'Sphyl', detail: 'Stored radius and length' },
                    { label: 'Bone scale', value: '1.0000', detail: 'Uniform in the preserved sample' },
                    { label: 'Performance data', value: 'Not recorded', detail: 'Validation trace, not a benchmark' }
                ],
                trace: {
                    label: 'Post-implementation draw trace',
                    file: 'KraftonEngine/Saves/Logs/Engine.log',
                    snippet: `[PhysDraw] Bone=Bip001 Pelvis | stored sphyl(R,L)=(0.12,0.02,0.00) | BoneMatScale=(1.0000,1.0000,1.0000) avg=1.0000 | world~=stored*avg=0.12
[PhysDraw] Bone=Bip001 L Thigh | stored sphyl(R,L)=(0.08,0.21,0.00) | BoneMatScale=(1.0000,1.0000,1.0000) avg=1.0000 | world~=stored*avg=0.08
[PhysDraw] Bone=Bip001 L Calf | stored sphyl(R,L)=(0.06,0.25,0.00) | BoneMatScale=(1.0000,1.0000,1.0000) avg=1.0000 | world~=stored*avg=0.06
[PhysDraw] Bone=Bip001 R Thigh | stored sphyl(R,L)=(0.08,0.21,0.00) | BoneMatScale=(1.0000,1.0000,1.0000) avg=1.0000 | world~=stored*avg=0.08`
                },
                method: 'Recovered the physics-draw rows from the project runtime log and matched their fields to the generated sphyl dimensions and bone-matrix scale used by the preview draw path.',
                limitations: [
                    'The ignored log does not record the exact executable or commit that produced it.',
                    'There is no pre-fix trace, screenshot, or geometric error measurement for a controlled comparison.',
                    'The sample demonstrates emitted runtime state, not visual correctness or a performance improvement.'
                ]
            }
        ],
        troubleshooting: [
            {
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
        evidenceNote: 'The repository contains 60 commits attributed to HaXX0rBunny, including 43 non-merge commits from June 6–11, 2026.',
        sourceUrl: 'https://github.com/yoonjiii218/Jungle_Week14_Team3/commits/main/?author=HaXX0rBunny',
        sourceLabel: 'Open authored Week14 commits',
        troubleshootingEvidence: [
            {
                kicker: 'Three-stage RmlUi capture trail · working-tree evidence',
                title: 'The first 3→2→1 prototype became a five-second countdown with a filled sweep sector.',
                summary: 'The June 8 capture is an actual in-engine prototype recorded 1 hour 7 minutes 59 seconds before 64e1ed9 first committed the RmlUi, Lua, and film-noise assets. Its PICTURE START // 3 label, sprockets, rings, crosshair, and single sweep line match that initial 3.35-second implementation. The June 10 captures then isolate the responsive guide geometry and show the refined five-second runtime state with grain, vignette, and a filled sweep sector. Together they document the implementation progression, but they are not a controlled commit A/B test.',
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
                    { label: 'First runtime evidence', value: '1 h 07 m 59 s pre-commit', detail: 'Working tree on a1755b4 before 64e1ed9' },
                    { label: 'Countdown timing', value: '3.35 → 5.35 sec', detail: 'Initial implementation to a3006a9' },
                    { label: 'Sweep workaround', value: '33 frames', detail: 'Raster sector sequence at fdaa6f7' },
                    { label: 'June 10 check', value: '11 min 44 sec', detail: 'Layout diagnostic → styled validation' },
                    { label: 'Authored trail', value: '64e1ed9 → fdaa6f7 → a3006a9', detail: 'UI, sweep, and five-second timing' }
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
                method: 'Copied all three PNGs byte-for-byte, ordered them by filesystem timestamps, checked the reflog for both active revisions, and matched the visible labels, layer geometry, countdown value, and sweep treatment to the authored RmlUi and Lua history.',
                limitations: [
                    'The initial capture predates 64e1ed9, so its exact uncommitted source diff and build configuration cannot be reconstructed even though its output matches the subsequently committed implementation.',
                    'There is no commit between the two June 10 captures, so the transient UI-reload or diagnostic state that exposed only the guide geometry cannot be reconstructed from Git.',
                    'The screenshots do not embed an executable hash; source correspondence is established through the visible layout and nearby authored history rather than binary attestation.',
                    'The June 9 number-two film frame was excluded because its provenance cannot be tied confidently to this engine output and it may be a visual reference rather than authored runtime evidence.',
                    'The two-page, five-cut comic sequence was added on June 11 in a590136; these June 10 captures prove the countdown prelude, not the later cutscene pages.',
                    'This documents visual implementation progress only; no frame-time or loading benchmark was recorded.'
                ]
            },
            {
                kicker: 'User-provided level-placement A/B · local captures',
                title: 'The Tokyo import progressed from exploded scene geometry to a coherent city block.',
                summary: 'These original editor screenshots were captured approximately 5 hours 48 minutes apart during Week14. The first shows imported building modules and surfaces scattered through the level; the later capture shows aligned facades, transit geometry, and a navigable street-scale environment. They are direct visual evidence of the level-placement iteration, but not a same-camera or commit-bound test.',
                tags: ['Actual editor captures', 'Level placement', 'Before / After', 'Week14'],
                figures: [
                    {
                        stage: 'Before · 2026-06-07 19:18 KST',
                        src: 'Assets/images/gametechlab/evidence/week14-level-placement-before-20260607.png',
                        alt: 'Week14 Tokyo level import before placement correction, with scene meshes scattered and exploded throughout the editor viewport',
                        caption: 'Imported modules are visibly dispersed and overlapping, so the city cannot yet be inspected as a coherent level.',
                        fit: 'contain'
                    },
                    {
                        stage: 'After · 2026-06-08 01:06 KST',
                        src: 'Assets/images/gametechlab/evidence/week14-level-placement-after-20260608.png',
                        alt: 'Week14 Tokyo level after placement correction, showing aligned buildings and transit geometry in the editor viewport',
                        caption: 'The later capture shows the city assembled into aligned architectural volumes and transit structures.',
                        fit: 'wide'
                    }
                ],
                facts: [
                    { label: 'Capture interval', value: '5 h 48 min', detail: 'June 7 19:18 → June 8 01:06 KST' },
                    { label: 'Before frame', value: '1084 × 823', detail: 'Exploded scene overview' },
                    { label: 'After frame', value: '1415 × 534', detail: 'Coherent close inspection' },
                    { label: 'Evidence source', value: 'Original PNGs', detail: 'Provided from the local Screenshots folder' }
                ],
                method: 'Copied both source PNG files byte-for-byte, ordered them by filesystem capture timestamps, and compared visible scene placement and architectural continuity.',
                limitations: [
                    'The images use different camera positions, fields of view, and resolutions, so they are not a pixel-matched comparison.',
                    'They do not record the exact executable, working-tree revision, or import command used for either capture.',
                    'Both captures predate the later authored 06079db, 1089022, fdaa6f7, and adfb597 import commits, so they demonstrate the real Week14 placement iteration but cannot prove that a specific commit caused the change.',
                    'They support visual correctness only; no frame-time or import-duration benchmark was recorded.'
                ]
            },
            {
                kicker: 'Actual defect captures → Git-backed fixes',
                title: 'The visible decal rectangle and foliage-card background were traced to mask-source and pre-depth faults.',
                summary: 'The first capture records masked foliage leaving the transparent area of each leaf card visible; the second records a selected decal while its rectangular background was being diagnosed. The foliage fix removes masked sections from an alpha-unaware pre-depth pass. The decal path first restores hidden dependency textures, then derives coverage from the actual grayscale pixel data instead of an always-opaque synthetic alpha channel.',
                tags: ['Actual defect captures', 'Alpha mask', 'Pre-depth', 'Cases 06–07'],
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
                        caption: 'The projected marking is present while the rectangular-background defect is being inspected; the white outline itself may be the editor selection bounds.',
                        fit: 'contain'
                    }
                ],
                facts: [
                    { label: 'Foliage fix', value: '64e1ed9', detail: '3 h 35 min after the capture' },
                    { label: 'Dependency recovery', value: 'fdaa6f7', detail: '29 min after the decal capture' },
                    { label: 'Final decal fix', value: '0c5ae28', detail: '5 h 38 min after the capture' },
                    { label: 'Texture evidence', value: 'Alpha 255 · 100%', detail: '91.034% of base RGB pixels are black' }
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
                method: 'Matched the original PNG timestamps to the authored Git history, compared the exact source and generated-HLSL blobs in 64e1ed9, fdaa6f7, and 0c5ae28, and inspected the imported PNG modes and pixel distributions.',
                limitations: [
                    'Both supplied images are pre-fix defect captures; no same-camera post-fix screenshots are preserved.',
                    'The files do not embed the executable or working-tree hash, so timestamp proximity supports the diagnosis but does not independently prove causality.',
                    'For the decal, fdaa6f7 restored missing texture dependencies but 0c5ae28 is the final background-removal fix; treating the earlier change as complete would be inaccurate.',
                    'The decal capture includes editor selection bounds, so the white outline itself is not claimed as the rendering defect.',
                    'These are visual-correctness fixes; no frame-time benchmark was recorded or inferred.'
                ]
            },
            {
                kicker: 'Commit-bound generated-data A/B',
                title: 'All 11 blocking-volume matrices moved from centimeter magnitudes to the same meter scale as their exported fields.',
                summary: 'The tracked Tokyo manifest can be parsed directly at adfb597^ and adfb597. Scalar scale values remain unchanged, while every world-matrix basis magnitude drops by exactly 100×, providing a deterministic before/after fixture for Case 04.',
                tags: ['Exact Git blobs', '11 volumes', 'Case 04'],
                facts: [
                    { label: 'Volumes compared', value: '11 / 11', detail: 'Same records before and after' },
                    { label: 'Scalar scale changes', value: '0', detail: 'Scale fields remain stable' },
                    { label: 'Matrix correction', value: '÷ 100', detail: 'Centimeters converted to meters' },
                    { label: 'Commit', value: 'adfb597', detail: 'Parent blob versus fix blob' }
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
                method: 'Parsed both tracked JSON blobs, paired the 11 blocking-volume records, and compared their scalar scale fields and world-matrix basis magnitudes.',
                limitations: [
                    'This is generated-data verification rather than a rendered viewport comparison.',
                    'It proves unit agreement in the manifest; collision behavior still depends on the importer and runtime consuming the matrix correctly.',
                    'No frame-time or collision-query benchmark was recorded for this fix.'
                ]
            },
            {
                kicker: 'Commit-bound manifest A/B',
                title: 'The scene export gained complete light transforms and 95 decal records in the authored fdaa6f7 change.',
                summary: 'The tracked Tokyo scene and material manifests can be parsed at fdaa6f7^ and fdaa6f7. They provide an exact generated-output comparison for the environment-transform and decal-dependency work in Cases 05 and 06.',
                tags: ['Exact Git blobs', 'Scene manifest', 'Cases 05–06'],
                facts: [
                    { label: 'Light world matrices', value: '0 → 2', detail: 'DirectionalLight and SkyLight' },
                    { label: 'Decal records', value: '0 → 95', detail: 'Tokyo.scene.json' },
                    { label: 'Materials', value: '129 → 131', detail: 'Tokyo.materials.json' },
                    { label: 'Textures', value: '44 → 48', detail: 'Generated material manifest' }
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
                method: 'Parsed the parent and fix blobs for both tracked manifests, then counted environment records with worldMatrix, decal records, materials, and textures.',
                limitations: [
                    'The manifest delta proves the exporter emitted the records; visual correctness still depends on importer and renderer behavior.',
                    'Higher material or texture counts alone do not prove every dependency was semantically classified correctly.',
                    'This is the dependency-recovery stage; the final grayscale decal coverage correction is verified separately at 0c5ae28.',
                    'No same-camera rendered decal or shadow comparison is preserved.'
                ]
            },
            {
                kicker: 'Preserved packaged-runtime trace',
                title: 'The transition waited after the cutscene, then committed only when Tokyo_Current became ready.',
                summary: 'This ignored GameBuild log is an actual post-fix runtime artifact recorded three days after the wait-to-commit change. It directly exercises the asynchronous sequencing described in Case 02.',
                tags: ['Actual packaged run', 'Async loading', 'Case 02'],
                facts: [
                    { label: 'Target scene', value: 'Tokyo_Current', detail: 'Packaged GameBuild content' },
                    { label: 'Wait state', value: 'Observed', detail: 'Cutscene ended before load readiness' },
                    { label: 'Final state', value: 'Committed', detail: 'Only after scene-data-ready' },
                    { label: 'Run window', value: '3 min 12 sec', detail: '2026-06-14 18:27–18:30 KST' }
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
                method: 'Read the preserved packaged-run log in chronological order and matched the wait, readiness, and commit messages to the state transition introduced by a590136.',
                limitations: [
                    'The ignored log is a later local artifact and does not embed the exact executable hash.',
                    'It is a successful post-fix execution trace, not a timed before/after benchmark.',
                    'No matching pre-fix package log is preserved.'
                ]
            },
            {
                kicker: 'Preserved persistence output',
                title: 'The completed run time was written consistently to both clear-score storage and the scoreboard.',
                summary: 'Two actual local save files share the same final-write timestamp and contain the same 85.688-second result. This directly validates the persistence output used by Case 01 after a completed run.',
                tags: ['Actual save files', 'Score persistence', 'Case 01'],
                facts: [
                    { label: 'Last clear score', value: '85.688 sec', detail: 'LastClearScore.txt' },
                    { label: 'Scoreboard match', value: '85.688 sec', detail: 'GameFlowScoreboard.tsv' },
                    { label: 'Stored scores', value: '10', detail: 'Persisted scoreboard entries' },
                    { label: 'Final write', value: '2026-06-14 20:11', detail: 'Identical timestamp for both files' }
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
                method: 'Compared the value and last-write timestamp of both save outputs and confirmed that the scoreboard contains the same completed-run time.',
                limitations: [
                    'The files prove the post-fix persistence output, not the original asynchronous-reset failure.',
                    'The save artifacts are ignored local state and do not identify the exact executable hash.',
                    'No pre-fix output pair is preserved.'
                ]
            },
            {
                kicker: 'Local visual validation · not commit-bound',
                title: 'The preserved viewport captures show the scene-orientation diagnosis, not a controlled commit A/B test.',
                summary: 'Both images are original editor-window captures recovered from the project Saves/Logs directory. The tilted Tokyo_Current view and the upright Tokyo_Verify view document the local verification workflow around Unreal-scene import, while the fdaa6f7 code diff remains the authoritative evidence for the environment-transform fix.',
                tags: ['Actual editor captures', 'Scene import', 'Case 05'],
                figures: [
                    {
                        stage: 'Imported scene inspection · Tokyo_Current',
                        src: 'Assets/images/gametechlab/evidence/week14-tokyo-current-inspection.png',
                        alt: 'Custom engine editor showing the imported Tokyo scene tilted sideways during transform inspection',
                        caption: 'The saved Tokyo_Current viewport is visibly tilted, matching the orientation problem being investigated.',
                        fit: 'wide'
                    },
                    {
                        stage: 'Verification scene · Tokyo_Verify_Train',
                        src: 'Assets/images/gametechlab/evidence/week14-tokyo-verify-train.png',
                        alt: 'Custom engine editor showing an upright Tokyo street in the Tokyo Verify Train scene',
                        caption: 'A separately named verification scene shows the street upright after the local import checks.',
                        fit: 'wide'
                    }
                ],
                facts: [
                    { label: 'Captured', value: '2026-06-08', detail: '20:58 and 21:05 KST' },
                    { label: 'Imported actors', value: '5,290', detail: 'Later local report: success=true' },
                    { label: 'Matrix transforms', value: '5,181', detail: '11 blocking volumes' },
                    { label: 'Resource failures', value: '0', detail: 'Mesh, material, and texture' }
                ],
                method: 'Compared the preserved full editor-window captures and cross-checked their creation times against the authored import commits and the fdaa6f7 transform diff.',
                limitations: [
                    'The captures use different scene names and viewpoints, so they are not a pixel-matched before/after pair.',
                    'The files were created before the authored fdaa6f7 commit and do not identify the exact binary or working-tree revision used.',
                    'They demonstrate the real diagnostic workflow, but do not by themselves prove that fdaa6f7 produced the visual change or any performance improvement.'
                ]
            }
        ],
        troubleshooting: [
            {
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
        ]
    }
];

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

function codeSnippetMarkup(code) {
    if (!code) return '';

    const file = escapeMarkup(code.file);
    const context = escapeMarkup(code.context);
    const language = escapeMarkup(code.language);
    const snippet = escapeMarkup(code.snippet.trim());

    return `<section class="lab-code-snippet" aria-label="Representative fix from ${file}">
                <header class="lab-code-snippet-header">
                    <span class="lab-code-snippet-label">Code snapshot · after fix</span>
                    <strong>${file}</strong>
                    <span class="lab-code-snippet-context">${context} · ${language}</span>
                </header>
                <pre tabindex="0"><code>${snippet}</code></pre>
            </section>`;
}

function evidencePanelMarkup(panel) {
    const tags = panel.tags?.length
        ? `<div class="lab-runtime-evidence-tags">${panel.tags.map(tag => `<span>${escapeMarkup(tag)}</span>`).join('')}</div>`
        : '';

    const figures = panel.figures?.length
        ? `<div class="lab-runtime-evidence-figures">
                ${panel.figures.map(figure => {
                    const fitClass = figure.fit ? ` is-${escapeMarkup(figure.fit)}` : '';
                    const src = escapeMarkup(figure.src);
                    const alt = escapeMarkup(figure.alt);
                    const stage = escapeMarkup(figure.stage);
                    const caption = escapeMarkup(figure.caption);

                    return `<figure class="lab-runtime-evidence-figure${fitClass}">
                                <a href="${src}" target="_blank" rel="noopener noreferrer" aria-label="Open full-size evidence: ${stage}">
                                    <img src="${src}" alt="${alt}" loading="lazy" decoding="async">
                                </a>
                                <figcaption>
                                    <strong>${stage}</strong>
                                    <p>${caption}</p>
                                </figcaption>
                            </figure>`;
                }).join('')}
           </div>`
        : '';

    const facts = panel.facts?.length
        ? `<div class="lab-runtime-evidence-facts">
                ${panel.facts.map(fact => `<article>
                            <span>${escapeMarkup(fact.label)}</span>
                            <strong>${escapeMarkup(fact.value)}</strong>
                            <small>${escapeMarkup(fact.detail)}</small>
                        </article>`).join('')}
           </div>`
        : '';

    const trace = panel.trace
        ? `<section class="lab-runtime-evidence-trace" aria-label="${escapeMarkup(panel.trace.label)}">
                <header>
                    <span>${escapeMarkup(panel.trace.label)}</span>
                    <strong>${escapeMarkup(panel.trace.file)}</strong>
                </header>
                <pre tabindex="0"><code>${escapeMarkup(panel.trace.snippet.trim())}</code></pre>
           </section>`
        : '';

    const method = panel.method
        ? `<div>
                <span>Method</span>
                <p>${escapeMarkup(panel.method)}</p>
           </div>`
        : '';
    const hardware = panel.hardware
        ? `<div>
                <span>${escapeMarkup(panel.hardwareLabel || 'Test PC')}</span>
                <p>${escapeMarkup(panel.hardware)}</p>
           </div>`
        : '';
    const limitations = panel.limitations?.length
        ? `<div class="lab-runtime-evidence-limits">
                <span>Scope &amp; limits</span>
                <ul>${panel.limitations.map(item => `<li>${escapeMarkup(item)}</li>`).join('')}</ul>
           </div>`
        : '';
    const notes = method || hardware || limitations
        ? `<div class="lab-runtime-evidence-notes">${method}${hardware}${limitations}</div>`
        : '';

    return `<section class="lab-runtime-evidence">
                <header class="lab-runtime-evidence-header">
                    <div>
                        <span class="lab-detail-label">${escapeMarkup(panel.kicker)}</span>
                        <h4>${escapeMarkup(panel.title)}</h4>
                        <p>${escapeMarkup(panel.summary)}</p>
                    </div>
                    ${tags}
                </header>
                ${figures}
                ${facts}
                ${trace}
                ${notes}
            </section>`;
}

function troubleshootingEvidenceMarkup(panels) {
    if (!panels?.length) return '';

    return `<div class="lab-runtime-evidence-list" aria-label="Preserved runtime and visual evidence">
                ${panels.map(evidencePanelMarkup).join('')}
            </div>`;
}

function renderWeekSelector() {
    labElements.weekSelector.innerHTML = labWeeks.map((week, index) => `
        <button class="lab-week-select${index === labState.selectedWeek ? ' is-active' : ''}${week.featured ? ' is-featured' : ''}"
                type="button"
                role="tab"
                aria-selected="${index === labState.selectedWeek}"
                aria-label="Week ${week.week}: ${week.title}"
                tabindex="${index === labState.selectedWeek ? '0' : '-1'}"
                data-week-index="${index}">
            <span>Week</span>
            <strong>${week.week}</strong>
        </button>
    `).join('');
}

function renderWeekHeader() {
    const week = labWeeks[labState.selectedWeek];
    labElements.weekEyebrow.textContent = `Week ${week.week} · ${week.theme}`;
    labElements.weekTitle.textContent = week.title;
    labElements.weekSummary.textContent = week.summary;
}

function renderDetailPanel() {
    const week = labWeeks[labState.selectedWeek];
    let content = '';

    if (labState.detailTab === 'role') {
        content = `
            <div class="lab-detail-grid">
                <section class="lab-detail-card lab-detail-card--accent">
                    <span class="lab-detail-label">Assignment</span>
                    <h4>${week.objective}</h4>
                </section>
                <section class="lab-detail-card">
                    <span class="lab-detail-label">My role</span>
                    <h4>${week.role}</h4>
                    ${listMarkup(week.contributions)}
                </section>
            </div>
        `;
    } else if (labState.detailTab === 'implementation') {
        content = `
            <div class="lab-system-flow" aria-label="Implementation flow">
                <span>System flow</span>
                <strong>${week.flow}</strong>
            </div>
            <div class="lab-detail-grid">
                <section class="lab-detail-card">
                    <span class="lab-detail-label">Core implementation</span>
                    ${listMarkup(week.implementation)}
                </section>
                <section class="lab-detail-card">
                    <span class="lab-detail-label">Primary stack</span>
                    ${techMarkup(week.technologies)}
                </section>
            </div>
        `;
    } else if (labState.detailTab === 'evidence') {
        const sourceLink = week.sourceUrl
            ? `<a class="lab-source-link" href="${week.sourceUrl}" target="_blank" rel="noopener noreferrer">${week.sourceLabel}</a>`
            : '<span class="lab-summary-only">No public source link</span>';
        const commitEvidence = week.commitRefs?.length
            ? `<div class="lab-commit-evidence">
                    <span class="lab-detail-label">Selected authored commits</span>
                    <div class="lab-commit-list">
                        ${week.commitRefs.map(commit => commit.url
                            ? `<a href="${commit.url}" target="_blank" rel="noopener noreferrer"><code>${commit.hash}</code><span>${commit.label}</span></a>`
                            : `<div><code>${commit.hash}</code><span>${commit.label}</span></div>`
                        ).join('')}
                    </div>
               </div>`
            : '';

        content = `
            <div class="lab-detail-grid">
                <section class="lab-detail-card">
                    <span class="lab-detail-label">Result</span>
                    ${listMarkup(week.results)}
                </section>
                <section class="lab-detail-card lab-evidence-card">
                    <span class="lab-detail-label">Evidence status</span>
                    <h4>${week.evidenceStatus}</h4>
                    <p>${week.evidenceNote}</p>
                    ${sourceLink}
                    ${commitEvidence}
                </section>
            </div>
        `;
    } else {
        const troubleshootingCount = week.troubleshooting?.length || 0;
        const troubleshootingCountLabel = week.troubleshootingPending
            ? 'Source files pending'
            : `${troubleshootingCount} documented case${troubleshootingCount === 1 ? '' : 's'}`;
        const pending = week.troubleshootingPending
            ? `<section class="lab-trouble-pending">
                    <span class="lab-detail-label">Pending source recovery</span>
                    <h4>Week04 troubleshooting is intentionally not reconstructed.</h4>
                    <p>${week.troubleshootingPending}</p>
               </section>`
            : '';
        const runtimeEvidence = troubleshootingEvidenceMarkup(week.troubleshootingEvidence);
        const cases = week.troubleshooting?.length
            ? `<div class="lab-troubleshooting-list">
                    ${week.troubleshooting.map((item, index) => {
                        const commit = item.commit?.url
                            ? `<a class="lab-trouble-commit" href="${item.commit.url}" target="_blank" rel="noopener noreferrer"><span>${item.commit.label || 'Evidence commit'}</span><code>${item.commit.hash}</code></a>`
                            : `<div class="lab-trouble-commit is-local"><span>${item.commit?.label || 'Evidence commit'}</span><code>${item.commit?.hash || 'Local history'}</code></div>`;

                        return `<article class="lab-trouble-card">
                                    <header class="lab-trouble-header">
                                        <span class="lab-trouble-index">Case ${String(index + 1).padStart(2, '0')}</span>
                                        <h4>${item.title}</h4>
                                        ${commit}
                                    </header>
                                    <div class="lab-trouble-grid">
                                        <section class="lab-trouble-field lab-trouble-field--symptom">
                                            <span>Symptom</span>
                                            <p>${item.symptom}</p>
                                        </section>
                                        <section class="lab-trouble-field lab-trouble-field--cause">
                                            <span>Root cause</span>
                                            <p>${item.cause}</p>
                                        </section>
                                        <section class="lab-trouble-field lab-trouble-field--fix">
                                            <span>Fix</span>
                                            <p>${item.fix}</p>
                                        </section>
                                        <section class="lab-trouble-field lab-trouble-field--result">
                                            <span>Result</span>
                                            <p>${item.result}</p>
                                        </section>
                                    </div>
                                    ${codeSnippetMarkup(item.code)}
                                </article>`;
                    }).join('')}
               </div>`
            : '';

        content = `
            <div class="lab-trouble-intro">
                <div class="lab-trouble-intro-heading">
                    <span class="lab-detail-label">Commit-derived engineering cases</span>
                    <strong>${troubleshootingCountLabel}</strong>
                </div>
                <p>Each case is reconstructed from authored commits and diffs. Where preserved evidence exists, actual generated artifacts, runtime captures, logs, and measurements are shown with their acquisition method and limits; missing evidence is never inferred from code.</p>
            </div>
            ${pending}
            ${runtimeEvidence}
            ${cases}
        `;
    }

    labElements.detailPanel.innerHTML = content;
}

function renderTimeline() {
    labElements.timeline.innerHTML = labWeeks.map((week, index) => `
        <li class="lab-timeline-item${week.featured ? ' is-featured' : ''}">
            <button type="button" data-timeline-week="${index}" aria-label="Open Week ${week.week}: ${week.title}">
                <span class="lab-timeline-week">Week ${week.week}</span>
                <span class="lab-timeline-copy">
                    <small>${week.theme}</small>
                    <strong>${week.title}</strong>
                    <span>${week.summary}</span>
                </span>
                <span class="lab-timeline-open" aria-hidden="true">Open</span>
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

initializeLabExplorer();
