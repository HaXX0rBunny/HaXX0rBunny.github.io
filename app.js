
const icons = {
    github: '<svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
    steam: '<svg viewBox="0 0 24 24"><path d="M21.644 14.508c-.149-.785-1.03-2.924-4.225-4.888-2.585-1.59-4.269-1.555-4.269-1.555-.164.004-.325.021-.482.046l-4.102-5.959c.287-.583.435-1.218.435-1.852 0-2.376-1.925-4.3-4.301-4.3s-4.301 1.924-4.301 4.3c0 2.298 1.802 4.167 4.07 4.288l2.906 4.218c-.896 1.353-1.272 2.927-1.023 4.439.467 2.835 3.149 4.8 5.986 4.39 1.166-.169 2.213-.717 3.027-1.517l1.011 1.47 1.859-1.278-1.428-2.074c1.171-1.615 1.432-3.235 1.487-3.951.082-1.066.368-1.597 1.271-2.581 1.096-1.192 1.93-1.691 2.08-1.78l-4.288-6.191c.08.069.96 1.096 1.637 2.126.791 1.205 2.162 2.766 2.647 3.141zM4.7 6.1c-1.325 0-2.4-1.075-2.4-2.4s1.075-2.4 2.4-2.4 2.4 1.075 2.4 2.4-1.075 2.4-2.4 2.4zm10.742 13.918c-1.678.242-3.264-.92-3.506-2.597-.104-.716.096-1.411.493-1.983l-2.046-2.973c-.156.037-.315.057-.474.057-1.151 0-2.083-.933-2.083-2.083 0-1.151.932-2.083 2.083-2.083 1.15 0 2.083.932 2.083 2.083 0 .16-.02.318-.057.474l2.973 2.046c.573-.397 1.267-.597 1.983-.493 1.676.242 2.839 1.828 2.597 3.506-.242 1.678-1.83 2.839-3.507 2.597z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>',
    default: '<svg viewBox="0 0 24 24"><path d="M14 0l-6 13h-4v2h2.571l5.429 9 6-13h4v-2h-2.571l-5.429-9zM6 13h-4v2h4v-2zm12 0h-4v2h4v-2z"/></svg>'
};

const projectsData = {
    "1": {
        "title": "Edge Drive",
        "subtitle": "Hybrid 3D Action Game",
        "project_type": "team",
        "is_team_project": true,
        "team_size": 4,
        "my_role": "Game Director & Gameplay Programmer",
        "technologies": ["Unreal Engine 5.4", "C++", "Blueprint"],
        "description": "A hybrid 3D action game inspired by Bayonetta, Dark Souls, and Paper Mario. As a DigiPen Busan Academy graduation project, this project enhanced my skills in implementing Unreal Engine 5's latest features and complex gameplay systems.",
        "videoUrl": "https://www.youtube.com/embed/264Wfi25UOU",
        "links": {
            "github": "https://github.com/Team-Illegal-Design-Club/EdgeDrive", 
            "youtube": "https://youtube.com/watch?v=264Wfi25UOU"
        },
        "collaboration_details": {
            "team_size": 4,
            "my_role": "Game Director & Gameplay Programmer",
            "team_roles": [
                "Game Director & Gameplay Programmer (Me)",
                "3D Artist & Animator",
                "UI/UX Designer",
                "Sound Designer & Music Composer"
            ],
            "collaboration_tools": ["Git", "Github", "Gdrive", "Discord"],
            "team_dynamics": "Led technical implementation and game design decisions while coordinating with artists and designers. Managed project timeline and feature prioritization."
        },
        "technical_challenges": [
            "Frame drops during complex combat scenarios",
            "Memory management with multiple weapon systems",
            "State synchronization in motion matching system",
            "Performance optimization for 50-60 FPS target"
        ],
        "troubleshooting": {
            "performance_issues": {
                "problem": "Frame drops during complex combat scenarios with multiple enemies and effects",
                "root_cause": "Excessive draw calls and synchronous combat calculations on main thread",
                "solution": "Implemented event-driven combat system and object pooling for VFX",
                "result": "Achieved 30% reduction in CPU usage and stable 50-60 FPS"
            },
            "memory_optimization": {
                "problem": "Memory leaks in weapon switching system",
                "root_cause": "Improper cleanup of weapon components and animation blueprints",
                "solution": "Created structured weapon component lifecycle management",
                "result": "28% reduction in memory usage using Unreal Insights profiling"
            }
        },
        "development_timeline": {
            "duration": "2 months",
            "phases": [
                { "phase": "Pre-production", "duration": "2 weeks", "focus": "Concept design and technical planning" },
                { "phase": "Core Development", "duration": "1 months", "focus": "Combat system and core mechanics" },
                { "phase": "Polish & Optimization", "duration": "2 weeks", "focus": "Performance tuning and bug fixes" }
            ]
        },
        "downloadLink": "https://drive.google.com/file/d/1XqZQiWAvwnG1kajS_e9Vc4t5MeMhALR_/view?usp=sharing"
    },
    "2": {
        "title": "MegaRogue",
        "subtitle": "2D Action Platformer · Boss-Rush Prototype",
        "project_type": "team",
        "is_team_project": true,
        "team_size": 2,
        "my_role": "Gameplay & Systems Programmer",
        "technologies": ["C", "CProcessing", "FMOD"],
        "description": "A C-based 2D action prototype built around pooled projectiles, data-driven levels, three boss state machines, and explicit game-state resource lifetimes. The public repository retains the original APETI name while the shipped menu identifies the game as MEGA ROGUE.",
        "videoUrl": "https://www.youtube.com/embed/dd0ZqgdRN5Y",
        "links": {
            "github": "https://github.com/HaXX0rBunny/APETI"
        },
        "collaboration_details": {
            "team_size": 2,
            "my_role": "Gameplay & Systems Programmer",
            "team_roles": [
                "Gameplay & Systems Programmer (Me)",
                "Gameplay & Content Programmer"
            ],
            "collaboration_tools": ["Git", "Visual Studio"],
            "team_dynamics": "Shared C codebase with feature branches for gameplay, bosses, editor integration, and final state wiring"
        },
        "technical_challenges": [
            "Keeping projectile movement deterministic across frame rates",
            "Reusing fixed-capacity projectile and hazard pools",
            "Coordinating menu, game, boss, clear, and game-over states",
            "Serializing editable level data into text-based .lvl files",
            "Matching sound-handle lifetime to each game state's init/exit cycle"
        ],
        "troubleshooting": {
            "projectile_timestep": {
                "problem": "Projectile movement could slow down at 60 Hz and stop updating at frame times below 0.01 seconds.",
                "root_cause": "The integration count used floor(dt / 0.01), discarding the remainder and producing zero steps at 120 Hz.",
                "solution": "Split each frame's full dt into three equal substeps and run movement plus collision for every substep.",
                "result": "The updated loop integrates the complete frame delta across three substeps, eliminating zero-step updates at high refresh rates."
            },
            "enemy_patrol_collision": {
                "problem": "A patrolling enemy could accumulate movement into a wall or platform edge before reversing.",
                "root_cause": "The code reversed velocity after a tentative move without restoring the pre-move position.",
                "solution": "Save originalPos, test the tentative move, restore on collision or missing ground, then flip direction.",
                "result": "Rejected patrol moves no longer become the starting point of the next frame."
            },
            "sound_lifetime": {
                "problem": "Player and menu audio handles had overlapping or missing cleanup paths across state transitions.",
                "root_cause": "Cleanup was split between button callbacks, GameOver_exit, and state-exit functions.",
                "solution": "Moved ownership to the corresponding game/menu exit paths and removed duplicate callback cleanup.",
                "result": "Audio-handle ownership and cleanup now follow the corresponding game-state lifecycle."
            }
        },
        "development_timeline": {
            "duration": "June 19–25, 2024",
            "phases": [
                { "phase": "Core Gameplay", "duration": "Jun 19–21", "focus": "Player, projectile pools, enemies, and collision" },
                { "phase": "Boss & Level Systems", "duration": "Jun 22–24", "focus": "Boss state machines, editor integration, and level files" },
                { "phase": "Integration", "duration": "Jun 25", "focus": "Game states, resource cleanup, naming, and Release build" }
            ]
        },
        "downloadLink": "https://github.com/HaXX0rBunny/HaXX0rBunny.github.io/raw/main/Assets/downlaods/MEGA_ROGUE_Setup.exe",
        "downloadLabel": "Windows Installer"
    },
    "3": {
        "title": "Huntress",
        "subtitle": "2D Turn-Based Artillery Strategy",
        "project_type": "team",
        "is_team_project": true,
        "team_size": 4,
        "my_role": "UI Systems & Gameplay Integration Programmer",
        "technologies": ["C++", "Alpha Engine", "FMOD"],
        "description": "A four-person C++ team project that combines a store-and-upgrade loop with wind- and gravity-driven artillery combat. I built and integrated the menu, store, combat HUD, button/hover interactions, item tooltips, and the UI-to-combat input path.",
        "videoUrl": "https://www.youtube.com/embed/I_cFyhu3i0E",
        "detailPage": "huntress.html",
        "links": {
            "github": "https://github.com/HaXX0rBunny/Huntress",
            "upstream": "https://github.com/ido-013/Huntress"
        },
        "collaboration_details": {
            "team_size": 4,
            "my_role": "UI Systems & Gameplay Integration Programmer",
            "team_roles": [
                "UI Systems & Gameplay Integration (Me)",
                "Combat & Gameplay",
                "Level & Content",
                "Animation & Effects"
            ],
            "collaboration_tools": ["Git branches", "Visual Studio 2022"],
            "team_dynamics": "Feature-branch collaboration across a shared Alpha Engine codebase, with personal scope covering UI architecture, gameplay integration, and input routing"
        },
        "technical_challenges": [
            "Separating world, interface, and text rendering order",
            "Routing screen-space UI input without changing world aim state",
            "Synchronizing store, inventory, combat, and HUD state",
            "Managing tooltip and interface-object lifetime",
            "Keeping button hit testing consistent with hover visibility"
        ],
        "troubleshooting": {},
        "development_timeline": {
            "duration": "August 27–October 9, 2024",
            "phases": [
                { "phase": "UI Foundation", "duration": "Aug 27–Sep 6", "focus": "Menu, store, combat HUD, button manager, and UI components" },
                { "phase": "System Integration", "duration": "Sep 24–30", "focus": "Render order, store/combat synchronization, item input, and lifetime fixes" },
                { "phase": "Final UI Pass", "duration": "Oct 8–9", "focus": "Hover behavior, tooltips, layout polish, and final integration" }
            ]
        },
        "downloadLink": "https://github.com/HaXX0rBunny/HaXX0rBunny.github.io/raw/main/Assets/downlaods/Huntress_setup.exe",
        "downloadLabel": "Windows Installer"
    },
    "4": {
        "title": "GameTechLab3rd",
        "subtitle": "C++ Rendering & Engine Development",
        "project_type": "collection",
        "team_label": "Team Project · 3–4 Members",
        "scope_label": "Weekly Projects",
        "is_team_project": true,
        "team_size": "3–4",
        "my_role": "Rendering & Engine Programmer",
        "technologies": ["C++", "DirectX 11", "HLSL", "ImGui", "FBX SDK"],
        "description": "A curated record of the projects I contributed to throughout KRAFTON Jungle Game Tech Lab 3rd. The weekly snapshots trace custom engine development from 3D fundamentals through asset import, lighting, shadows, physics, animation, particles, and final game integration.",
        "coverImage": "Assets/images/GameTechLab3rd-Engine-Editor.png",
        "coverAlt": "Custom C++ engine particle editor developed during Game Tech Lab",
        "coverLabel": "Engine development archive",
        "links": {
            "overview": "gametechlab.html"
        },
        "collaboration_details": {
            "team_size": "3–4 members per weekly project",
            "my_role": "Rendering & Engine Programmer",
            "team_roles": [
                "Rendering and engine programming (Me)",
                "Weekly graphics, engine, gameplay, and tool development teams"
            ],
            "collaboration_tools": ["Git", "GitHub", "Visual Studio", "Discord"],
            "team_dynamics": "Worked in changing weekly teams and integrated focused rendering or engine features into each shared codebase. The hub preserves the reviewable snapshots from Week01 through Week14."
        },
        "technical_challenges": [
            "Evolving custom C++ engines from basic 3D rendering into editor and runtime systems",
            "Integrating OBJ and FBX assets with lighting, shadow, physics, animation, and particle pipelines",
            "Optimizing large object scenes with octahedral impostors and GPU-oriented rendering techniques",
            "Keeping weekly projects buildable across changing codebases and external SDK dependencies"
        ],
        "troubleshooting": {
            "large_scene_rendering": {
                "problem": "Rendering tens of thousands of repeated objects with full mesh geometry created a severe performance bottleneck.",
                "root_cause": "Per-object geometry and draw overhead scaled poorly as the scene population increased.",
                "solution": "Implemented an octahedral impostor pipeline that bakes directional appearance into atlases and renders distant objects as lightweight proxies.",
                "result": "Established a practical comparison path between full-mesh and impostor rendering for the large-scene optimization challenge."
            },
            "engine_integration": {
                "problem": "Weekly engine branches accumulated different render features, asset formats, and third-party runtime dependencies.",
                "root_cause": "Each assignment extended a different subsystem while sharing a growing custom engine foundation.",
                "solution": "Organized the verified snapshots by week and repaired build linkage for required libraries such as FBX SDK and FMOD where needed.",
                "result": "Produced one reviewable hub that connects the program's weekly development progression."
            }
        },
        "development_timeline": {
            "duration": "Full program",
            "phases": [
                { "phase": "1st Game Jam", "duration": "Week 01", "focus": "Jungle Brick Break, game loop, input, and collision foundations" },
                { "phase": "Break Into 3D", "duration": "Week 02", "focus": "3D primitives, scene components, camera transforms, and sky sphere" },
                { "phase": "Atlas · Billboard · Batch Line · Bounding Box", "duration": "Week 03", "focus": "Reusable rendering utilities and engine debugging features" },
                { "phase": "OBJ Import", "duration": "Week 04", "focus": "OBJ/MTL import, UStaticMesh assets, registry lookup, and versioned .dasset cooking" },
                { "phase": "2nd Game Jam · It's Pie Time", "duration": "Week 05", "focus": "Octahedral impostor baking and large-scene rendering optimization" },
                { "phase": "Decal · Clearing the Fog", "duration": "Week 06", "focus": "Surface decals, volumetric fog, and atmospheric rendering" },
                { "phase": "Let There Be Light", "duration": "Week 07", "focus": "Real-time lighting and material integration" },
                { "phase": "Where There Is Light, There Is Also Shadow", "duration": "Week 08", "focus": "Light-space rendering and real-time shadow evaluation" },
                { "phase": "3rd Game Jam · Light, Camera, Action!", "duration": "Week 09", "focus": "Standalone build, cook, stage, runtime loading, and verification" },
                { "phase": "More Than Just Weight", "duration": "Week 10", "focus": "Mass, force, collision, and object response systems" },
                { "phase": "Let's Go, Move!", "duration": "Week 11", "focus": "Movement, input, actor state, and animation updates" },
                { "phase": "Dance of the Dust", "duration": "Week 12", "focus": "Particle editor, emitters, modules, curves, and runtime effects" },
                { "phase": "Understanding Focus and Force in 3D World", "duration": "Week 13", "focus": "Two depth-of-field techniques and camera focus controls" },
                { "phase": "Final Game Jam", "duration": "Week 14", "focus": "Rendering, FBX, skeletal animation, physics, audio, tools, and gameplay integration" }
            ]
        }
    },
    "5": {
        "title": "Dynamic OverAnimation",
        "subtitle": "Real-time Animation Exaggeration · GPU Mesh Deformer Plug-in",
        "project_type": "team",
        "team_label": "Team Product · 3-Person Team",
        "scope_label": "Epic Project · Fab Product",
        "is_team_project": true,
        "team_size": 3,
        "my_role": "Team Lead · Motion Phase, Runtime Systems & GPU Deformation Programmer",
        "technologies": ["Unreal Engine 5.8", "C++", "HLSL", "RDG", "Slate", "Perforce"],
        "description": "A UE 5.8 plug-in that adds reusable, camera-aware exaggeration to existing animation. Its six-stage Motion Phase Analyzer converts final-pose Region motion into stable timing, direction, and strength signals; Response Rules then drive selective GPU mesh deformation.",
        "coverImage": "Assets/images/overanimation/dynamic-overanimation-hero.webp",
        "coverAlt": "Dynamic OverAnimation product artwork showing a stylized GPU mesh deformation effect",
        "coverLabel": "Fab product · Epic Project",
        "detailPage": "overanimation.html",
        "featured": true,
        "links": {
            "fab": "https://www.fab.com/listings/8d23f843-b47c-4280-aa0a-d86cb49d77af",
            "documentation": "https://dynamaxgtl3rd.github.io/OverAnimDocs/"
        },
        "collaboration_details": {
            "team_size": "DynaMax · 3-person team",
            "my_role": "Team Lead · Motion Phase, Runtime Systems & GPU Deformation Programmer",
            "team_roles": [
                "Product direction, system design, motion phase analysis, runtime response, GPU deformation pipeline, and editor authoring tools (Team Lead · Me)",
                "DynaMax team contributions across runtime, editor, content, and product delivery"
            ],
            "collaboration_tools": ["Perforce", "Unreal Engine 5.8", "Visual Studio", "Fab"],
            "team_dynamics": "I led the three-person DynaMax product team, set the product and system direction, and implemented the Motion Phase Analyzer, runtime response, render/GPU, and editor systems within the released team plug-in."
        },
        "technical_challenges": [
            "Separating pose-derived automation from authored AnimNotify and Gameplay Event intent before deterministic arbitration",
            "Keeping Region and Chain deformation selective while applying camera-aware silhouette guards",
            "Stabilizing noisy motion measurements and resolving competing Region ownership before changing animation phase",
            "Carrying immutable deformation state from the Game Thread to the Render Thread",
            "Composing module passes and vertex-factory outputs through RDG"
        ],
        "troubleshooting": {
            "phase_stability": {
                "title": "Motion noise caused false phase transitions",
                "problem": "Single-frame spikes could flip the phase or start Anticipation before a movement trend was established.",
                "root_cause": "Raw energy thresholds did not encode trend history, confirmation duration, or cancellation state.",
                "solution": "Combined adaptive trend smoothing, a confirmation window, phase-local guards, and cycle history.",
                "result": "In the deterministic fixture, the 16 ms high-energy sample remains a zero-strength Anticipation boundary and the confirmed 32 ms sample commits Action."
            },
            "region_ownership": {
                "title": "Similar Region scores produced owner jitter",
                "problem": "Two candidate Regions with nearly equal scores could exchange ownership across adjacent frames.",
                "root_cause": "Selecting the current maximum had no hysteresis or pending-challenger confirmation.",
                "solution": "Required a relative 15% or absolute 0.02 advantage and retained the active owner until the challenger became stable.",
                "result": "Minor score changes no longer replace the current Region owner."
            },
            "render_handoff": {
                "title": "Mutable gameplay state could drift from render consumption",
                "problem": "The renderer could observe state that changed after a deformation request was created.",
                "root_cause": "Analyzer-owned mutable state and asynchronous render work have different lifetimes.",
                "solution": "Moved value-copy snapshots into scene- and execution-group-scoped work items, then submitted them after the MeshDeformer stage fence.",
                "result": "Render work consumes a stable snapshot while unrelated scene or execution-group items remain queued."
            },
            "visual_attachments": {
                "title": "Socket-attached visuals detached from deformed endpoints",
                "problem": "Mesh deformation changed the visible endpoint while attached visual components still followed the undeformed socket transform.",
                "root_cause": "Skeletal socket transforms did not include the dependent visual offset created by deformation.",
                "solution": "Exported deformation offsets separately, applied them to registered visual attachments, restored without drift, and excluded physics-driven targets.",
                "result": "Visual attachments follow deformed endpoints without accumulating transform error."
            }
        },
        "development_timeline": {
            "duration": "Epic Project · 2026",
            "phases": [
                { "phase": "Native contracts", "duration": "Bone Group contracts", "focus": "Bone Groups, hierarchy expansion, LOD falloff, and data-driven responses" },
                { "phase": "Runtime & GPU composition", "duration": "Snapshot & RDG composition", "focus": "Response arbitration, Squash & Stretch, snapshots, RDG passes, normals, and tangents" },
                { "phase": "Automatic motion phases", "duration": "Phase & Region state machine", "focus": "Phase stability, Region ownership, cycle timing, animation routing, and authoring UX" },
                { "phase": "Product integration", "duration": "Socket-follower integration", "focus": "Deformed socket followers and restored showcase assets" }
            ]
        }
    }
};

// YouTube Player Class
class YouTubeBackgroundPlayer {
    constructor(containerId, videoId, options = {}) {
        this.containerId = containerId;
        this.videoId = videoId;
        this.player = null;
        this.apiLoaded = false;
        this.retryCount = 0;
        this.maxRetries = 3;
        this.options = {
            autoplay: 1,
            mute: 1,
            loop: 1,
            controls: 0,
            showinfo: 0,
            rel: 0,
            modestbranding: 1,
            disablekb: 1,
            iv_load_policy: 3,
            ...options
        };

        this.init();
    }

    init() {
        if (typeof YT !== 'undefined' && YT.Player) {
            this.createPlayer();
        } else {
            this.loadYouTubeAPI();
        }
    }

    loadYouTubeAPI() {
        console.log('YouTube API 로드 시작');

        // 글로벌 콜백 설정
        window.onYouTubeIframeAPIReady = () => {
            this.apiLoaded = true;
            this.createPlayer();
        };

        if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            tag.async = true;
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        // 타임아웃 설정
        setTimeout(() => {
            if (!this.apiLoaded && this.retryCount < this.maxRetries) {
                console.warn('YouTube API 로드 타임아웃, 재시도 중...');
                this.retryCount++;
                this.handleError('API load timeout');
            }
        }, 10000);
    }

    createPlayer() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error('플레이어 컨테이너를 찾을 수 없습니다:', this.containerId);
            this.handleError('Container not found');
            return;
        }

        container.classList.add('loading');

        try {
            this.player = new YT.Player(this.containerId, {
                videoId: this.videoId,
                playerVars: {
                    ...this.options,
                    playlist: this.videoId // 무한 루프를 위한 플레이리스트
                },
                events: {
                    onReady: (event) => this.onPlayerReady(event),
                    onStateChange: (event) => this.onPlayerStateChange(event),
                    onError: (event) => this.onPlayerError(event)
                }
            });
        } catch (error) {
            console.error('플레이어 생성 중 오류:', error);
            this.handleError('Player creation failed');
        }
    }

    onPlayerReady(event) {
        console.log('플레이어 준비 완료');

        try {
            // 음소거 및 자동 재생
            event.target.mute();

            // 화질 조정
            this.adjustQualityForDevice();

            try {
                const playResult = event.target.playVideo();

                // Promise 여부 확인 후 처리
                if (playResult && typeof playResult.then === 'function') {
                    playResult.then(() => {
                        console.log('자동 재생 성공');
                        this.onVideoLoaded();
                    }).catch(error => {
                        console.warn('자동 재생 실패:', error);
                        this.setupUserInteractionPlay();
                    });
                } else {
                    // Promise가 아닌 경우 직접 처리
                    setTimeout(() => {
                        this.onVideoLoaded();
                    }, 1000);
                }
            } catch (playError) {
                console.warn('재생 시도 중 오류:', playError);
                this.setupUserInteractionPlay();
            }

        } catch (error) {
            console.error('플레이어 준비 중 오류:', error);
            this.handleError('Player ready error');
        }
    }

    onPlayerStateChange(event) {
        const states = {
            [-1]: 'UNSTARTED', [0]: 'ENDED', [1]: 'PLAYING',
            [2]: 'PAUSED', [3]: 'BUFFERING', [5]: 'CUED'
        };

        console.log('플레이어 상태:', states[event.data]);

        switch (event.data) {
            case YT.PlayerState.PLAYING:
                this.onVideoLoaded();
                break;
            case YT.PlayerState.ENDED:
                this.handleVideoEnd();
                break;
            case YT.PlayerState.PAUSED:
                this.handleAutoPause();
                break;
        }
    }

    onPlayerError(event) {
        const errorCodes = {
            2: '잘못된 매개변수',
            5: 'HTML5 플레이어 오류',
            100: '비디오를 찾을 수 없음',
            101: '임베드 불가 (소유자 설정)',
            150: '임베드 불가 (소유자 설정)'
        };

        const errorMessage = errorCodes[event.data] || '알 수 없는 오류';
        console.error('YouTube 플레이어 오류:', errorMessage);

        this.handleError('Player error: ' + errorMessage);
    }

    onVideoLoaded() {
        const container = document.getElementById(this.containerId);
        if (container) {
            container.classList.remove('loading');
            container.classList.add('loaded');
            console.log('비디오 로드 완료, 시각 효과 적용');
        }
    }

    handleVideoEnd() {
        // 루프 재생을 위한 추가 로직 (필요시)
        if (this.player && typeof this.player.playVideo === 'function') {
            this.player.playVideo();
        }
    }

    handleAutoPause() {
        // 자동 일시정지 처리 (필요시)
        setTimeout(() => {
            if (this.player && typeof this.player.playVideo === 'function') {
                this.player.playVideo();
            }
        }, 1000);
    }

    adjustQualityForDevice() {
        if (!this.player || typeof this.player.getAvailableQualityLevels !== 'function') return;

        try {
            const availableQualities = this.player.getAvailableQualityLevels();
            const isMobile = window.innerWidth < 768;

            if (isMobile && availableQualities.includes('medium')) {
                this.player.setPlaybackQuality('medium');
                console.log('모바일 최적화: 화질을 medium으로 설정');
            } else if (availableQualities.includes('hd720')) {
                this.player.setPlaybackQuality('hd720');
                console.log('데스크톱 최적화: 화질을 HD720으로 설정');
            }
        } catch (error) {
            console.warn('화질 조정 중 오류:', error);
        }
    }

    setupUserInteractionPlay() {
        console.log('사용자 상호작용 대기 중...');

        // 사용자 알림 메시지
        const notification = document.createElement('div');
        notification.innerHTML = `
        <div style="position: fixed; top: 80px; left: 50%; transform: translateX(-50%); 
                    background: rgba(33, 128, 141, 0.9); color: white; padding: 10px 20px; 
                    border-radius: 8px; z-index: 1001; font-size: 14px;">
            Play background video
        </div>
    `;
        document.body.appendChild(notification);

        const playOnInteraction = () => {
            if (this.player && typeof this.player.playVideo === 'function') {
                this.player.mute();
                this.player.playVideo();

                // 알림 제거
                if (notification) {
                    document.body.removeChild(notification);
                }

                // 이벤트 리스너 제거
                document.removeEventListener('click', playOnInteraction);
                document.removeEventListener('touchstart', playOnInteraction);
                document.removeEventListener('keydown', playOnInteraction);

                console.log('사용자 상호작용 후 재생 시작');
            }
        };

        // 다양한 상호작용 이벤트 등록
        document.addEventListener('click', playOnInteraction, { once: true });
        document.addEventListener('touchstart', playOnInteraction, { once: true });
        document.addEventListener('keydown', playOnInteraction, { once: true });
    }

    handleError(errorType) {
        console.error('YouTube 배경 비디오 오류:', errorType);

        // Fallback 배경 활성화
        const container = document.getElementById(this.containerId);
        const fallback = document.querySelector('.fallback-background');

        if (container) {
            container.style.display = 'none';
            container.classList.remove('loading');
        }

        if (fallback) {
            fallback.classList.add('active');
            console.log('Fallback 배경 활성화');
        }

        // 재시도 로직
        if (this.retryCount < this.maxRetries) {
            setTimeout(() => {
                this.retryCount++;
                console.log(`재시도 ${this.retryCount}/${this.maxRetries}`);
                this.init();
            }, 3000 * this.retryCount);
        }
    }
}

// Global variables
const THEME_STORAGE_KEY = 'portfolio-theme-v2';
let currentTheme = 'dark';
let heroPlayer = null;
let currentProjectId = null;

// DOM elements
let themeToggle, languageToggle, navToggle, navMenu, backToTop, loadingSpinner, projectModal;
let modalClose, tabBtns, tabPanes;

function getPortfolioText(key, fallback = '') {
    return window.PortfolioI18n?.t
        ? window.PortfolioI18n.t(key, fallback)
        : fallback;
}

function mergeProjectLocaleValue(baseValue, overrideValue) {
    if (overrideValue === undefined) return baseValue;

    if (Array.isArray(baseValue) && Array.isArray(overrideValue)) {
        return overrideValue;
    }

    if (
        baseValue && overrideValue
        && typeof baseValue === 'object' && !Array.isArray(baseValue)
        && typeof overrideValue === 'object' && !Array.isArray(overrideValue)
    ) {
        const merged = { ...baseValue };
        Object.entries(overrideValue).forEach(([key, value]) => {
            merged[key] = mergeProjectLocaleValue(baseValue[key], value);
        });
        return merged;
    }

    return overrideValue;
}

function getLocalizedProject(projectId, project = projectsData[projectId]) {
    if (!project || window.PortfolioI18n?.getLocale?.() !== 'ko') return project;
    const override = window.PORTFOLIO_PROJECT_KO?.[projectId];
    return override ? mergeProjectLocaleValue(project, override) : project;
}

function applyLocalizedChrome() {
    if (window.PortfolioI18n?.applyStaticI18n) {
        window.PortfolioI18n.applyStaticI18n(document);
    }

    if (themeToggle) {
        const isDark = currentTheme === 'dark';
        themeToggle.textContent = isDark
            ? getPortfolioText('global.themeToLight', 'Light')
            : getPortfolioText('global.themeToDark', 'Dark');

        themeToggle.setAttribute(
            'aria-label',
            isDark
                ? getPortfolioText('global.themeToLightAria', 'Switch to light theme')
                : getPortfolioText('global.themeToDarkAria', 'Switch to dark theme')
        );
    }

    if (window.PortfolioI18n?.updateLanguageButton) {
        window.PortfolioI18n.updateLanguageButton(languageToggle);
    }
}

function initializeLocaleFeatures() {
    if (!window.PortfolioI18n) return;

    const currentLocale = window.PortfolioI18n.getLocale?.();
    if (currentLocale) {
        window.PortfolioI18n.setLocale(currentLocale, { persist: false, force: true });
    }

    window.PortfolioI18n.initializeLocaleToggle('languageToggle');
    applyLocalizedChrome();

    document.addEventListener('portfolio-locale-changed', () => {
        applyLocalizedChrome();
        initializeProjects();
        if (currentProjectId) {
            const activeTab = document.querySelector('.tab-btn.active')?.dataset.tab || 'overview';
            openProjectModal(currentProjectId, { activeTab });
        }
    });
}

// Initialize app
document.addEventListener('DOMContentLoaded', function () {
    console.log('Initializing portfolio...');
    initializeElements();
    initializeTheme();
    initializeLocaleFeatures();
    initializeNavigation();
    initializeProjects();
    initializeModal();
    initializeScrollEffects();
    // Removed: initializeContactForm(); -> No form needed
    initializeTypingEffect();

    // Initialize hero video after a delay
    setTimeout(() => {
        initializeHeroVideo();
        if (loadingSpinner) loadingSpinner.classList.remove('active');
    }, 1000);
});

function initializeElements() {
    themeToggle = document.getElementById('themeToggle');
    languageToggle = document.getElementById('languageToggle');
    navToggle = document.getElementById('navToggle');
    navMenu = document.getElementById('navMenu');
    backToTop = document.getElementById('backToTop');
    loadingSpinner = document.getElementById('loadingSpinner');
    projectModal = document.getElementById('projectModal');
    modalClose = document.getElementById('modalClose');
    tabBtns = document.querySelectorAll('.tab-btn');
    tabPanes = document.querySelectorAll('.tab-pane');
}

function initializeTheme() {
    // Keep an explicit user preference, otherwise start in dark mode.
    let savedTheme = 'dark';

    try {
        savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
    } catch (error) {
        console.warn('Could not read the saved theme preference.', error);
    }

    setTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-color-scheme', theme);
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark'
            ? getPortfolioText('global.themeToLight', 'Light')
            : getPortfolioText('global.themeToDark', 'Dark');
        themeToggle.setAttribute(
            'aria-label',
            theme === 'dark'
                ? getPortfolioText('global.themeToLightAria', 'Switch to light theme')
                : getPortfolioText('global.themeToDarkAria', 'Switch to dark theme')
        );
    }
    try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) {
        console.warn('Could not save theme preference:', e);
    }
}

function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

function initializeNavigation() {
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        });
    });

    // Update active navigation link on scroll
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = ['hero', 'projects', 'skills', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = sectionId;
            }
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Typing Effect for Hero Section
function initializeTypingEffect() {
    const typingText = document.getElementById('typingText');
    const typingCursor = document.getElementById('typingCursor');

    if (!typingText || !typingCursor) return;

    const text = "Cho Sanghyeon";
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // 타이핑 완료 후 커서 깜빡임 중지
            setTimeout(() => {
                typingCursor.style.animation = 'none';
                typingCursor.style.opacity = '0';
            }, 2000);
        }
    }

    // 1초 후 타이핑 시작
    setTimeout(typeWriter, 1000);
}

function initializeHeroVideo() {
    const videoContainer = document.getElementById('hero-youtube-player');
    if (!videoContainer) {
        console.warn('Hero video container not found');
        return;
    }

    const videoId = videoContainer.dataset.videoId || '264Wfi25UOU';

    try {
        heroPlayer = new YouTubeBackgroundPlayer('hero-youtube-player', videoId, {
            autoplay: 1,
            mute: 1,
            loop: 1,
            controls: 0,
            showinfo: 0,
            rel: 0,
            modestbranding: 1,
            disablekb: 1,
            iv_load_policy: 3
        });

        console.log('Hero video player 초기화 완료');
    } catch (error) {
        console.error('Hero video player 초기화 실패:', error);
    }
}

function initializeProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;

    projectsGrid.replaceChildren();

    Object.entries(projectsData)
        .sort(([, projectA], [, projectB]) => Number(Boolean(projectB.featured)) - Number(Boolean(projectA.featured)))
        .forEach(([id, project]) => {
        const projectCard = createProjectCard(id, project);
        projectsGrid.appendChild(projectCard);
    });
}

function createProjectCard(id, project) {
    project = getLocalizedProject(id, project);
    const card = document.createElement('div');
    card.className = 'project-card';
    if (project.featured) card.classList.add('project-card--featured');
    const dedicatedPageUrl = project.detailPage || (project.project_type === 'collection' ? project.links?.overview : null);

    // Projects with a dedicated information architecture bypass the generic modal.
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.project-action')) {
            e.preventDefault();
            if (dedicatedPageUrl) {
                window.location.href = dedicatedPageUrl;
            } else {
                openProjectModal(id);
            }
        }
    });

    const typeText = project.team_label || project.type_label || (project.is_team_project
        ? `${getPortfolioText('index.team', 'Team')} · ${project.team_size}`
        : getPortfolioText('index.solo', 'Solo'));
    const typeBadgeClass = project.is_team_project ? 'team' : 'solo';
    const scopeBadge = project.scope_label
        ? `<div class="project-scope-badge">${project.scope_label}</div>`
        : '';

    const techBadges = project.technologies.map(tech => {
        let badgeClass = 'tech-badge';
        if (tech.includes('C++') || tech.includes('Unreal Engine')) badgeClass += ' expert';
        else if (tech.includes('OpenGL') || tech.includes('C')) badgeClass += ' advanced';
        return `<span class="${badgeClass}">${tech}</span>`;
    }).join('');


    const placeholderVideoText = getPortfolioText('global.placeholder.videoLabel', 'VIDEO');
    const prepareDemoText = getPortfolioText('global.prepareDemoVideo', 'Prepare demo video');

    const videoSection = project.coverImage
        ? `<div class="project-video project-cover">
           <img src="${project.coverImage}"
                alt="${project.coverAlt || project.title}"
                class="project-cover-image"
                loading="lazy">
           ${project.coverLabel ? `<span class="project-cover-label">${project.coverLabel}</span>` : ''}
       </div>`
        : project.videoUrl
        ? `<div class="project-video">
           <iframe src="${project.videoUrl}?modestbranding=1&rel=0"
                   title="${project.title}"
                   allowfullscreen
                   loading="lazy"></iframe>
       </div>`
        : `<div class="project-video project-video--placeholder">
           <div class="video-placeholder">
               <div class="placeholder-icon">${placeholderVideoText}</div>
               <div class="placeholder-text">
                   <h4>${project.title}</h4>
                   <p>${prepareDemoText}</p>
               </div>
           </div>
       </div>`;


    const downloadBtn = project.downloadLink
        ? `<a href="${project.downloadLink}" target="_blank" class="btn btn--secondary download-btn project-action">
           ${project.downloadLabel || getPortfolioText('global.downloadDemo', 'Download Demo')}
       </a>`
        : '';

    card.innerHTML = `
      ${videoSection}
      
      <div class="project-info">
          <div class="project-header">
              <span class="project-card-label">${getPortfolioText('global.project', 'Project')}</span>
              <h3>${project.title}</h3>
              <p class="project-subtitle">${project.subtitle}</p>
              
              <div class="project-type-indicator">
                  <div class="project-type-badge ${typeBadgeClass}">
                      <span>${typeText}</span>
                  </div>
                  ${scopeBadge}
                  <div class="role-badge">${project.my_role}</div>
              </div>
          </div>

          <div class="project-card-section project-overview">
              <span class="project-card-label">${getPortfolioText('global.overview', 'Overview')}</span>
              <p>${project.description}</p>
          </div>

          <div class="project-card-section project-stack-block">
              <span class="project-card-label">${getPortfolioText('global.techStack', 'Tech Stack')}</span>
              <div class="tech-stack">${techBadges}</div>
          </div>

          <div class="project-actions">
              <button class="btn btn--primary project-detail-btn project-action">
                  <span>${getPortfolioText('global.viewDetails', 'View Details')}</span>
              </button>
              ${downloadBtn}
          </div>
      </div>
  `;

    // 버튼 클릭 시 카드 클릭 전파 방지
    //card.querySelectorAll('.project-action').forEach(el => {
    //    el.addEventListener('click', e => e.stopPropagation());
    //});
    card.querySelectorAll('.project-action').forEach(el => {
        el.addEventListener('click', e => {
            e.stopPropagation();

            // Open a dedicated project page when available; otherwise use the shared modal.
            if (el.classList.contains('project-detail-btn')) {
                e.preventDefault();
                if (dedicatedPageUrl) {
                    window.location.href = dedicatedPageUrl;
                } else {
                    openProjectModal(id);
                }
            }
        });
    });
    return card;
}

function initializeModal() {
    if (!projectModal) return;

    if (modalClose) {
        modalClose.addEventListener('click', closeProjectModal);
    }

    // Close modal when clicking outside
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeProjectModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeProjectModal();
        }
    });

    // Tab navigation
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
}

function openProjectModal(projectId, options = {}) {
    console.log('Opening modal for project:', projectId);
    currentProjectId = projectId;
    const project = getLocalizedProject(projectId);

    if (!project) {
        console.error('Project not found:', projectId);
        return;
    }

    // Update modal title
    const modalTitle = document.getElementById('modalTitle');
    if (modalTitle) {
        modalTitle.textContent = project.title;
    }

    // Populate modal content
    populateOverviewTab(project);
    populateCollaborationTab(project);
    populateTechnicalTab(project);
    populateChallengesTab(project);
    populateTimelineTab(project);

    // Show/hide collaboration tab based on project type
    const collaborationTab = document.getElementById('collaborationTab');
    if (collaborationTab) {
        collaborationTab.style.display = 'block';
        collaborationTab.textContent = project.is_team_project
            ? getPortfolioText('modal.tabCollaboration', 'Team & Collaboration')
            : getPortfolioText('global.soloDevelopment', 'Solo Development');
    }

    // Show modal
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    switchTab(options.activeTab || 'overview');
}

function closeProjectModal() {
    if (projectModal) {
        projectModal.classList.remove('active');
    }
    document.body.style.overflow = '';
    currentProjectId = null;

    // Stop video
    const modalVideo = document.getElementById('modalVideo');
    if (modalVideo) {
        const iframe = modalVideo.querySelector('iframe');
        if (iframe) {
            const src = iframe.src;
            iframe.src = src; // Reload iframe to stop video
        }
    }
}

function switchTab(tabId) {
    // Update tab buttons
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-tab') === tabId) {
            btn.classList.add('active');
        }
    });

    // Update tab panes
    tabPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === `${tabId}Tab` || pane.id === `${tabId}Tab-content`) {
            pane.classList.add('active');
        }
    });
}

function populateOverviewTab(project) {
    const modalVideo = document.getElementById('modalVideo');
    const modalDescription = document.getElementById('modalDescription');
    const projectTypeBadge = document.getElementById('projectTypeBadge');
    const roleInfo = document.getElementById('roleInfo');
    const modalTechStack = document.getElementById('modalTechStack');
    const downloadSection = document.getElementById('downloadSection');
    const modalLinks = document.getElementById('modalLinks');

    // Video
    if (modalVideo) {
        modalVideo.classList.remove('modal-video--no-content');

        if (project.coverImage) {
            modalVideo.innerHTML = `
                <img src="${project.coverImage}"
                     alt="${project.coverAlt || project.title}"
                     class="project-detail-cover">
            `;
        } else if (project.videoUrl) {
            modalVideo.innerHTML = `
                <iframe src="${project.videoUrl}?modestbranding=1&rel=0" 
                        title="${project.title}" 
                        allowfullscreen>
                </iframe>
            `;
        } else {
            modalVideo.innerHTML = `
                <div class="modal-video-placeholder">
                    <div class="placeholder-icon">${getPortfolioText('global.placeholder.videoLabel', 'VIDEO')}</div>
                    <div class="placeholder-content">
                        <h4>${getPortfolioText('global.prepareDemoVideo', 'Prepare demo video')}</h4>
                        <p>${getPortfolioText('global.preparingDemoProject', '{title} preparing a demo project video').replace('{title}', project.title)}</p>
                    </div>
                </div>
            `;
            modalVideo.classList.add('modal-video--no-content');
        }
    }

    // Links
    if (modalLinks) {
        modalLinks.innerHTML = '';
        if (project.links) {
            Object.entries(project.links).forEach(([platform, url]) => {
                if (!url) return;

                const linkBtn = document.createElement('a');
                linkBtn.href = url;
                linkBtn.target = '_blank';
                linkBtn.className = 'project-link-btn';

                // Get Icon
                const iconKey = platform.toLowerCase();
                const iconSvg = icons[iconKey] || icons.default;

                // Capitalize Label
                const label = platform.charAt(0).toUpperCase() + platform.slice(1);

                linkBtn.innerHTML = `${iconSvg} ${label}`;
                modalLinks.appendChild(linkBtn);
            });
        }
    }

    // Description
    if (modalDescription) {
        modalDescription.textContent = project.description;
    }

    // Project type badge
    if (projectTypeBadge) {
        const typeText = project.team_label || project.type_label || (project.is_team_project
            ? `${getPortfolioText('index.team', 'Team')} · ${project.team_size}`
            : getPortfolioText('index.solo', 'Solo'));
        const typeBadgeClass = project.is_team_project ? 'team' : 'solo';
        const scopeBadge = project.scope_label
            ? `<div class="project-scope-badge">${project.scope_label}</div>`
            : '';

        projectTypeBadge.innerHTML = `
            <div class="project-type-badge ${typeBadgeClass}">
                <span>${typeText}</span>
            </div>
            ${scopeBadge}
        `;
    }

    // Role info
    if (roleInfo) {
        roleInfo.innerHTML = `<strong>${getPortfolioText('modal.rolePrefix', 'Role:')}</strong> ${project.my_role}`;
    }

    // Tech stack
    if (modalTechStack) {
        const techBadges = project.technologies.map(tech => {
            let badgeClass = 'tech-badge';
            if (tech.includes('C++') || tech.includes('Unreal Engine')) badgeClass += ' expert';
            else if (tech.includes('OpenGL') || tech.includes('C')) badgeClass += ' advanced';
            return `<span class="${badgeClass}">${tech}</span>`;
        }).join('');
        modalTechStack.innerHTML = techBadges;
    }

    // Download section
    if (downloadSection) {
        if (project.downloadLink) {
            downloadSection.innerHTML = `
                <a href="${project.downloadLink}" target="_blank" class="download-btn">
                    <span>${project.downloadLabel || getPortfolioText('global.downloadProject', 'Download Project')}</span>
                </a>
            `;
        } else {
            downloadSection.innerHTML = '';
        }
    }
}

function populateCollaborationTab(project) {
    const collaborationContent = document.querySelector('#collaborationTab-content .collaboration-content');
    if (!collaborationContent) return;

    if (project.is_team_project) {
        const teamSize = project.collaboration_details.team_size;
        const teamSizeText = typeof teamSize === 'number'
            ? (window.PortfolioI18n?.getLocale?.() === 'ko' ? `${teamSize}명` : `${teamSize} members`)
            : teamSize;
        collaborationContent.innerHTML = `
            <div class="team-overview">
                <h3>${getPortfolioText('global.teamOverview', 'Team Overview')}</h3>
                <p><strong>${getPortfolioText('global.teamSize', 'Team Size')}:</strong> ${teamSizeText}</p>
                <p><strong>${getPortfolioText('global.myRole', 'My Role')}:</strong> ${project.collaboration_details.my_role}</p>
                <p><strong>${getPortfolioText('global.teamDynamics', 'Team Dynamics')}:</strong> ${project.collaboration_details.team_dynamics}</p>
            </div>
            <div class="team-roles">
                <h3>${getPortfolioText('global.teamComposition', 'Team Composition')}</h3>
                <ul>
                    ${project.collaboration_details.team_roles.map(role => `<li>${role}</li>`).join('')}
                </ul>
            </div>
            <div class="collaboration-tools">
                <h3>${getPortfolioText('global.collaborationTools', 'Collaboration Tools')}</h3>
                <ul>
                    ${project.collaboration_details.collaboration_tools.map(tool => `<li>${tool}</li>`).join('')}
                </ul>
            </div>
        `;
    } else {
        collaborationContent.innerHTML = `
            <div class="team-overview">
                <h3>${getPortfolioText('global.soloDevelopment', 'Solo Development')}</h3>
                <p><strong>${getPortfolioText('global.projectType', 'Project Type')}:</strong> ${project.collaboration_details.project_type}</p>
                <p><strong>${getPortfolioText('global.scope', 'Scope')}:</strong> ${project.collaboration_details.scope}</p>
                ${project.collaboration_details.time_constraint ?
                `<p><strong>${getPortfolioText('global.timeConstraint', 'Time Constraint')}:</strong> ${project.collaboration_details.time_constraint}</p>` : ''}
            </div>
            <div class="team-roles">
                <h3>${getPortfolioText('global.selfManagedAspects', 'Self-Managed Aspects')}</h3>
                <ul>
                    ${project.collaboration_details.self_managed_aspects.map(aspect => `<li>${aspect}</li>`).join('')}
                </ul>
            </div>
        `;
    }
}

function populateTechnicalTab(project) {
    const technicalChallenges = document.getElementById('technicalChallenges');
    if (!technicalChallenges) return;

    technicalChallenges.innerHTML = project.technical_challenges.map(challenge =>
        `<li>${challenge}</li>`
    ).join('');
}

function populateChallengesTab(project) {
    const challengesContent = document.querySelector('#challengesTab .challenges-content');
    if (!challengesContent) return;

    const troubleshootingCards = Object.entries(project.troubleshooting).map(([key, issue]) => `
        <div class="troubleshooting-card">
            <h4>${issue.title || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h4>
            <div class="problem-solution-grid">
                <div class="problem-section">
                    <h5>${getPortfolioText('global.problem', 'Problem')}</h5>
                    <p>${issue.problem}</p>
                </div>
                <div class="solution-section">
                    <h5>${getPortfolioText('global.solution', 'Solution')}</h5>
                    <p>${issue.solution}</p>
                </div>
            </div>
            <div class="problem-solution-grid">
                <div class="problem-section">
                    <h5>${getPortfolioText('global.rootCause', 'Root Cause')}</h5>
                    <p>${issue.root_cause}</p>
                </div>
                <div class="result-highlight">
                    <h5>${getPortfolioText('global.result', 'Result')}</h5>
                    <p>${issue.result}</p>
                </div>
            </div>
        </div>
    `).join('');

    challengesContent.innerHTML = troubleshootingCards;
}

function populateTimelineTab(project) {
    const timelineContent = document.querySelector('#timelineTab .timeline-content');
    if (!timelineContent) return;

    const timelineItems = project.development_timeline.phases.map((phase, index) => {
        const marker = project.project_type === 'collection'
            ? String(index + 1).padStart(2, '0')
            : index + 1;

        return `
            <div class="timeline-item">
                <div class="timeline-marker">${marker}</div>
                <div class="timeline-content-item">
                    <div class="timeline-phase">${phase.phase}</div>
                    <div class="timeline-duration">${phase.duration}</div>
                    <div class="timeline-focus">${phase.focus}</div>
                </div>
            </div>
        `;
    }).join('');

    timelineContent.innerHTML = `
        <div class="project-detail-section">
            <h3>${getPortfolioText('global.timelineLabel', 'Development Timeline')}</h3>
            <p><strong>${getPortfolioText('global.totalDurationLabel', 'Total Duration')}:</strong> ${project.development_timeline.duration}</p>
        </div>
        <div class="timeline-phases">
            ${timelineItems}
        </div>
    `;
}

function initializeScrollEffects() {
    // Back to top button
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    window.addEventListener('scroll', () => {
        // Show/hide back to top button
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }

        // Update navbar background on scroll
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = `rgba(var(--color-surface-rgb), 0.95)`;
            } else {
                navbar.style.background = `rgba(var(--color-surface-rgb), 0.85)`;
            }
        }
    });
}

// Removed: initializeContactForm function

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
window.addEventListener('load', () => {
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .education-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});

// Error handling for videos
document.addEventListener('DOMContentLoaded', () => {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        iframe.addEventListener('error', () => {
            console.warn('Video failed to load:', iframe.src);
            iframe.style.display = 'none';
        });
    });
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);

