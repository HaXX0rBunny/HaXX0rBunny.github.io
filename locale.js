const PORTFOLIO_I18N = {
    en: {
        recycle: {
            "metaDescription": "Recycle, a three-person Unreal Engine game-jam project. Gameplay flow, HUD and menus, gamepad input, combat feedback and selected C++ source.",
            "pageTitle": "Recycle | Gameplay, HUD and input",
            "role": "Gameplay systems, HUD, menus and input",
            "intro": "A first-person defense game about escorting a walking fortress and turning fallen enemies into allied reinforcements. Our three-person team submitted a Windows build to the 2026 Epic AI MegaJam.",
            "build": "Play the Windows build",
            "entry": "Jam entry",
            "team": "3 people",
            "periodLabel": "Period",
            "period": "November 2026",
            "videoLabel": "Play Recycle gameplay video",
            "videoCaption": "Team gameplay video. The still shows the route and weapon HUD during development.",
            "navLabel": "Recycle sections",
            "navHud": "HUD and minimap",
            "navMenus": "Menus and input",
            "navCombat": "Hit reactions",
            "navTeam": "Team and release",
            "scopeIntro": "I developed the HUD, menus and gamepad input, and connected combat to the maintenance cycle. My work also included supply rules, aim assist and infantry hit reactions. Teammates built fortress locomotion and the core enemy and recovery systems.",
            "hudTitle": "HUD and minimap",
            "hudIntro": "The player needs to watch their own health, protect the fortress and keep track of several weapons. I grouped the health gauges and route around the minimap, with the equipped weapon and ammunition on the other side of the screen.",
            "imageHint": "Select a screenshot to view it at full size. These are captures from development.",
            "openImage": "View screenshot at full size",
            "hudAlt": "Recycle gameplay HUD with health and minimap at left and gamepad weapon prompts at right",
            "hudCaption": "Gameplay HUD with gamepad prompts. Health and navigation are on the left; the equipped weapon, magazine and weapon slots are on the right.",
            "statusTitle": "Health and navigation",
            "statusBody": "Player and fortress health share a circular display. The map rotates with the view and distinguishes enemies, allies and the fortress. A fortress outside the map range stays marked at its edge, while the route distinguishes traveled and remaining sections.",
            "weaponTitle": "Weapon and ammunition display",
            "weaponBody": "Switching weapons updates the portrait and highlights the active slot. The loaded magazine and reserve magazines are shown separately. Weapon and reload state drive the material parameters used by the ammunition display.",
            "statusAlt": "Close view of the health gauges and minimap from the gameplay screenshot",
            "statusCaption": "Health gauges, fortress route and map markers.",
            "weaponAlt": "Close view of the equipped weapon, magazine and gamepad weapon slots",
            "weaponCaption": "Equipped weapon, loaded magazine and reserve magazines.",
            "hudStateTitle": "Keeping the display in step with gameplay",
            "hudStateBody": "Gameplay objects own health and ammunition. The C++ widget reads those values and passes display parameters to UMG materials. Ammunition text and material parameters are rewritten when the relevant values change. Damaged health leaves a short trail before draining to the new value.",
            "routeAlt": "Keyboard HUD showing the convoy route progress and weapon display",
            "routeCaption": "Keyboard HUD during a route-progress check. The arc follows the convoy’s actual progress along its path.",
            "hudCodeTitle": "Ammunition material update",
            "codeNote": "Excerpt from the project source.",
            "menuTitle": "Menus, gamepad input and language",
            "menuIntro": "I connected the title, pause, settings and result screens to game state. The Widget Blueprints keep the layout editable; C++ handles transitions, focus, settings and input mode.",
            "titleAlt": "Recycle title screen with gamepad confirm and back prompts",
            "titleCaption": "Title screen with gamepad navigation, confirm and back prompts.",
            "pauseAlt": "Recycle pause menu over the gameplay screen",
            "pauseCaption": "Pause menu over the current game. Resume and return-to-title are handled by the menu controller.",
            "settingsEnAlt": "English options screen with display, language, vibration and audio settings",
            "settingsEnCaption": "English options with display, language, controller vibration and audio settings.",
            "settingsKoAlt": "Korean settings screen during development",
            "settingsKoCaption": "Korean settings screen from an earlier development capture.",
            "focusTitle": "Returning control to the right place",
            "focusBody": "Opening a menu switches to UI-only input and focuses its initial button. Hovering a button also updates focus. Closing settings returns focus to the menu; resuming restores the appropriate gameplay input mode. This keeps navigation and firing from sharing the same input accidentally.",
            "languageTitle": "Updating prompts when the device or language changes",
            "languageBody": "A local-player subsystem observes keyboard, mouse and gamepad input. When the active device changes, the HUD and menus refresh their prompts using the current bindings. English and Korean text use a String Table, and language changes notify existing widgets so dynamic prompts update too. The selected language is saved for the next launch.",
            "cinematicTitle": "Input during cinematics",
            "cinematicBody": "I connected cinematic input capture and a hold-to-skip prompt to the menu flow. Gameplay keys held before the transition are cleared, and control is restored after the sequence. Gamepad landing selection also uses the stick to move the target instead of relying on a mouse ray.",
            "cinematicAlt": "Fortress cinematic with a hold-to-skip prompt at the lower right",
            "cinematicCaption": "Cinematic playback with a hold-to-skip prompt.",
            "combatTitle": "Weapon hit reactions and explosion knockback",
            "combatIntro": "Hit reactions had to fit the existing damage, death and recovery flow. I added a temporary physical response to the hit body region and short weapon-specific staggers, while leaving the living character’s capsule in control of movement.",
            "hitAlt": "Infantry reacting to a local hit in a dedicated development test scene",
            "hitCaption": "Local hit-reaction check. The temporary test scene isolates the infantry response.",
            "explosionAlt": "Infantry launched into the air by an explosion in a development test scene",
            "explosionCaption": "Explosion knockback check. Nearby and distant infantry were compared in the same test.",
            "reactionTitle": "A hit body that recovers to animation",
            "reactionBody": "The hit resolves to a valid physics body. If a capsule hit does not identify a usable body, a safe fallback is selected. Only that branch is simulated, the physics weight fades out, and the previous collision and animation-tick settings are restored. Death and corpse collection end the temporary reaction before continuing their own flow.",
            "cancelTitle": "Canceling the attack already in flight",
            "cancelBody": "Stopping an animation alone would leave a scheduled melee impact able to fire. On stagger, I clear the impact timer and pending attack flags, stop the montage and interrupt movement. The escort controller also respects stagger while following and attacking.",
            "blastTitle": "Tuning the launch distance",
            "blastBody": "Explosion launch velocity falls off with distance from the impact. Living infantry use a character launch, while a dead body receives the velocity through its physics body. After feedback that enemies flew too far, I reduced horizontal and upward speeds and checked the near/far relationship again. Damage is passed separately from the knockback calculation.",
            "blastCodeTitle": "Distance-based launch calculation",
            "teamTitle": "Integration and release",
            "teamBody": "I integrated changes from my Diversion branch and resolved source conflicts. While connecting combat feedback and UI to the team’s enemy, recovery and fortress code, I corrected heavy-enemy approach and recovery behavior, and conflicts between recall and gamepad input. I also tuned wave and maintenance defaults.",
            "releaseBody": "The team published a Windows build and gameplay video on itch.io for the 2026 Epic AI MegaJam. The work shown here covers my gameplay, combat feedback and interface contributions.",
            "checksTitle": "Development checks",
            "checksBody": "During development, PIE checks covered the normal grenade-fire path, relative near/far launch, cancellation of queued attacks, death and corpse recovery. Interface checks in PIE and Standalone covered language persistence, dynamic text and input-device switching. These checks concern the single-player build and infantry behavior described here.",
            "sourceTitle": "Implementation files",
            "sourceHud": "HUD state and presentation",
            "sourceInput": "Menu focus and device/language changes",
            "sourceCombat": "Weapon hit handling and temporary physical reaction",
            "ai": "The jam entry discloses AI assistance in code, graphics and text. The descriptions above distinguish my assigned work from the team’s other systems.",
            "back": "Back to selected projects",
            "navFlow": "Combat and maintenance",
            "flowTitle": "Combat, maintenance and the next departure",
            "dayNightTitle": "A day/night cycle tied to combat",
            "dayNightBody": "I connected daytime combat, sunset, night maintenance and sunrise to the encounter state. Combat waits for surviving enemies to be defeated before ending. Maintenance can be finished early through player input, and the sun, moon and exposure change with each phase.",
            "deploymentTitle": "From the opening to the result screen",
            "deploymentBody": "I extended the existing redeployment flow for an automatic initial drop, holding fortress departure until the player had recovered control. I also connected the opening and victory/defeat sequences to the menus, with input restored at the end of the sequence.",
            "pickupTitle": "Which weapon receives an ammunition pickup",
            "pickupBody": "A pickup first supplies the equipped finite-ammo weapon if it has room. Otherwise, it chooses the weapon with the fewest reserve rounds relative to magazine size. I preserved capacity limits and prevented duplicate collection. A valid pickup is consumed even when health or ammunition is already full.",
            "aimTitle": "Aim assist that respects stick input",
            "aimBody": "I added reduced sensitivity near a target and a limit on corrective rotation. A neutral stick does not turn the camera. Steering away from the target disables rotation correction, so the assist does not keep pulling against the player’s input.",
            "drumTitle": "Grenade-launcher rotation and sound",
            "drumBody": "Each successful shot advances the launcher drum by one chamber, with the motion controlled by a Curve. When several weapon representations are visible, only one plays the rotation sound. Switching weapons or ending play stops the rotation and cleans up its audio.",
            "navCode": "Source code",
            "codeTitle": "Source code and original changes",
            "codeIntro": "These four examples include the original source, tests and Diversion patches. They show the files when first added; later changes on main may differ. The original commit references are kept alongside the code.",
            "sampleGauge": "Health-gauge animation",
            "sampleGaugeBody": "The health value stays in gameplay code. This helper animates the fill, delayed damage trail and hit flash.",
            "sampleMinimap": "Minimap projection",
            "sampleMinimapBody": "Project world offsets into view-relative map coordinates, clamp markers to the edge and clip route segments to the circular map.",
            "sampleInterface": "Input device and language changes",
            "sampleInterfaceBody": "Observe the active input device and notify widgets when prompts, language or vibration preferences change.",
            "sampleAim": "Controller aim-assist calculation",
            "sampleAimBody": "Calculate sensitivity and bounded correction, with explicit behavior for neutral input and steering away from the target.",
            "viewSource": "Source",
            "viewTests": "Tests",
            "viewPatch": "Original diff",
            "downloadCode": "Download source and diffs",
            "sourceCollection": "Browse all source files",
            "sourceFlow": "Day/night and departure flow",
            "sourceWeapons": "Supply rules and weapon presentation",
            "sourceAim": "Gamepad aim assist"
        },
        global: {
            siteLangLabel: '한국어',
            siteLangAria: '한국어로 전환',
            langLabelKo: '한국어',
            langLabelEn: 'English',
            themeToDark: 'Dark',
            themeToLight: 'Light',
            themeToDarkAria: 'Switch to dark theme',
            themeToLightAria: 'Switch to light theme',
            playBackgroundVideo: 'Play background video',
            backgroundVideo: 'Background video',
            stopBackgroundVideo: 'Stop background video',
            project: 'Project',
            overview: 'Overview',
            techStack: 'Tech Stack',
            viewDetails: 'View Details',
            downloadDemo: 'Download Demo',
            downloadProject: 'Download Project',
            challenge: 'Technical Challenges',
            solution: 'Solution',
            rootCause: 'Root Cause',
            result: 'Result',
            totalDuration: 'Total Duration',
            weeksPrefix: 'Week',
            teamOverview: 'Team Overview',
            myRole: 'My Role',
            hudItems: 'Item slots and selection',
            hudAngle: 'Current and previous aiming angles',
            hudGauges: 'Movement and power gauges',
            teamDynamics: 'Team Dynamics',
            teamComposition: 'Team Composition',
            collaborationTools: 'Collaboration Tools',
            teamSize: 'Team Size',
            soloDevelopment: 'Solo Development',
            projectType: 'Project Type',
            scope: 'Scope',
            timeConstraint: 'Time Constraint',
            selfManagedAspects: 'Self-Managed Aspects',
            navHome: 'Home',
            backToPortfolio: 'Back to portfolio',
            portfolio: 'Portfolio',
            developmentTimeline: 'Development Timeline',
            systemFlow: 'System flow',
            assignment: 'Assignment',
            primaryStack: 'Primary stack',
            resultTitle: 'Result',
            evidenceStatus: 'Project record',
            commitDerivedCases: 'Engineering problem solving',
            openWeekPrefix: 'Open Week ',
            prepareDemoVideo: 'Prepare demo video',
            preparingDemoProject: '{title} preparing a demo project video',
            placeholder: {
                videoLabel: 'VIDEO'
            },
            problem: 'Problem',
            solution: 'Solution',
            rootCause: 'Root Cause',
            result: 'Result',
            collaborationHeader: {
                overview: 'Project Overview'
            },
            timelineLabel: 'Development Timeline',
            totalDurationLabel: 'Total Duration'
        },
        index: {
            viewProjects: "View selected projects",
            additionalProjects: "Other Projects",
            additionalLead: "Character movement, boss behavior and UI from earlier team games.",
            coreSkills: "Gameplay and animation",
            renderSkills: "Rendering and engines",
            toolSkills: "Tools and collaboration",
            aiSkills: "AI-assisted development",
            coreExperience: "I implemented boss behavior in C, character controls and animation analysis in C++, and time and rain controls in Blueprint.",
            renderExperience: "I built a C++/OpenGL engine and used HLSL shaders in DirectX 11 to render repeated objects as impostors.",
            toolExperience: "As team lead, I coordinated data formats, update timing, and integration order. I used Git and Perforce for shared changes, and Python for data checks and build automation.",
            aiExperience: "I used AI to write benchmark and build tools, then checked them by running the code. I corrected hardcoded paths that tied the tools to one environment.",
            skillCoreLink: "Plug-in implementation",
            skillRenderLink: "Rendering implementation",
            skillToolsLink: "Standalone build",
            skillAiLink: "Build workflow",

            pageTitle: "Cho Sanghyeon, C++ Game Programmer",
            pageDescription: 'HaXX0rBunny portfolio: C++ gameplay, real-time rendering, engine architecture, and Unreal Engine development.',
            navHome: 'Home',
            navProjects: 'Projects',
            navSkills: 'Skills',
            navContact: 'Contact',
            heroName: 'Cho Sanghyeon',
            heroName: 'Cho Sanghyeon',
            heroFeatured: 'Released on Fab',
            ctaText: 'Game Developer',
            heroDescription: "I’m Sanghyeon Jo, a game developer adding my own touch to the worlds I once admired on screen. I build character movement, animation and game UI in C++ and Unreal Engine. I led a three-person team that released an animation plug-in on Fab, and optimized rendering in a C++ engine. I want to create worlds people find themselves wanting to return to after they put the game down, as I do with the games I’ve loved.",
            selectedWork: 'Selected Work',
            projectIndexAria: 'Project index',
            projectIndexPlugin: 'Animation deformation plug-in',
            projectIndexEngine: 'Rendering and custom engine',
            projectIndexGameplay: 'Character and time control',
            projectIndexRecycle: 'Combat feedback and game UI',
            featuredProjects: "Selected Projects",
            featuredProjectsLead: "A released animation plug-in, C++ engine work and a game-jam shooter.",
            featuredProjectsAside1: "3 Selected Projects",
            featuredProjectsAside2: 'Game, Engine, Tools',
            technicalProfile: 'Technical Profile',
            skillsExpertise: "Technical Experience",
            skillsLead: "Languages and tools I used, with examples from the projects.",
            skillsSub1: "Built and used in projects",
            skillsSub2: "C++, Rendering, Tools",
            programmingLanguages: 'Programming Languages',
            gameEngines: 'Game Engines',
            graphicsRendering: 'Graphics & Rendering',
            developmentTools: 'Development Tools',
            background: 'Background',
            educationTraining: 'Education & Training',
            backgroundLead: 'Computer science foundation followed by focused game and engine development programs.',
            contact: 'Contact',
            contactTitle: "Contact",
            contactLead: "I am looking for game client and engine programming roles using C++ and Unreal Engine.",
            contactFocusLabel: 'Focus',
            contactInterestsLabel: 'Interests',
            contactOnlineTitle: 'Find me online',
            contactBackToTop: 'Back to top',
            contactButtonLinkedIn: 'View profile',
            linkedInUrl: 'https://www.linkedin.com/in/haxxorbunny/?locale=en-US',
            contactButtonGithub: 'View repositories',
            contactSubGithub: 'Source code and project history',
            contactSubLinkedin: 'Career and professional network',
            projectTypeTeam: 'Team',
            projectTypeSolo: 'Solo',
            team: 'Team',
            solo: 'Solo'
        },
        lab: {
            selectedWorkAria: "Selected engine work",
            impostorTitle: "50,000-object rendering comparison",
            impostorSummary: "A comparison of Full Mesh and Impostor rendering in the same 50,000-object scene, with test conditions.",
            resultLink: "View comparison and conditions ↗",
            standaloneTitle: "Run the game outside the editor",
            standaloneSummary: "Runtime scenes, viewport and backbuffer initialization, and verification for a standalone build.",
            buildLink: "View runtime captures and implementation ↗",

            pageTitle: 'GameTechLab3rd, C++ Rendering & Engine Development',
            pageDescription: "HaXX0rBunny's C++ rendering and engine development record from KRAFTON Jungle Game Tech Lab 3rd.",
            heroKicker: 'KRAFTON Jungle, Game Tech Lab 3rd',
            heroTitle: 'C++ Rendering & Engine Development',
            heroDescription: 'A weekly record of the rendering systems, editor tools, runtime features, and integration work completed during Game Tech Lab 3rd.',
            heroScope: 'Project Scope',
            heroScopeValue: 'Engine course, Weeks 1–14',
            heroTeam: 'Team Structure',
            heroTeamValue: '3–4 members per project',
            heroRole: 'Primary Role',
            heroRoleValue: 'Rendering & Engine',
            heroStack: 'Core Stack',
            heroStackValue: 'C++, DirectX 11, HLSL',
            heroImageAlt: 'Custom C++ engine particle editor developed during Game Tech Lab',
            heroImageCaption: 'Custom engine particle editor from the later stage of the program.',
            developmentRecord: 'Development Record',
            viewsAria: 'Game Tech Lab views',
            weekSelectorAria: 'Select a week',
            detailTabsAria: 'Selected week details',
            explorerHeading: 'Weekly engine development',
            explorerIntro: 'My work and problem-solving from the 14-week engine development course.',
            weekByWeek: 'Week-by-week',
            weekByWeekSub: 'Role, implementation, and project record',
            timeline: 'Engine timeline',
            timelineSub: 'Engine development progression',
            roleTab: 'Assignment & Role',
            implTab: 'Implementation',
            evidenceTab: 'Results & source',
            troubleTab: 'Troubleshooting',
            timelineTitle: 'From a playable loop to an integrated engine and game.',
            timelineIntro: 'Select any milestone to open the same week inside the detailed view.',
            noscript: 'JavaScript is required to browse the interactive weekly record.',
            footerLabel: 'Game Tech Lab 3rd, Weekly Project Archive',
            weekLabel: 'Week',
            timelineOpen: 'Open',
            assignmentLabel: 'Assignment',
            myRoleLabel: 'My role',
            implementationFlowAria: 'Implementation flow',
            coreImplementation: 'Core implementation',
            selectedAuthoredCommits: 'Selected implementation commits',
            noPublicSourceLink: 'Hub snapshot',
            sourceRecovery: 'Source files pending',
            sourceRecoveryTitle: 'Source recovery is still pending.',
            pendingSourceRecovery: 'Pending source recovery',
            commitDerivedLabel: 'Problem solving',
            evidenceCommit: 'Commit',
            localHistory: 'Local history',
            documentedCases: '{count} {noun}',
            caseSingular: 'case',
            casePlural: 'cases',
            caseLabel: 'Case {number}',
            symptom: 'Symptom',
            rootCause: 'Root cause',
            fix: 'Fix',
            result: 'Result',
            troubleshootingIntro: 'The main issues, root causes, fixes, and resulting behavior are documented with the relevant code.',
            codeSnapshotAfter: 'Code fix',
            representativeFixAria: 'Representative fix from {file}',
            openEvidenceAria: 'Open full-size image: {stage}',
            method: 'Details',
            testPc: 'Test PC',
            scopeLimits: 'Notes',
            validationDetails: 'Implementation details',
            additionalValues: 'Additional values',
            preservedEvidenceAria: 'Project visuals and runtime records'
        },
        modal: {
            implementationTitle: 'Implementation',
            tabOverview: 'Overview',
            tabCollaboration: 'Team & Collaboration',
            tabTechnical: 'Technical Details',
            tabChallenges: 'Challenges & Solutions',
            tabTimeline: 'Timeline',
            close: 'Close',
            backToPortfolio: 'Back to portfolio',
            downloadProject: 'Download Project',
            rolePrefix: 'Role:',
            projectBreadcrumb: 'Projects',
            projectDetails: 'Project Details'
        },
        huntress: {
            home: 'Back to portfolio',
            overview: 'Overview',
            contribution: 'My contribution',
            architecture: 'Architecture',
            troubleshooting: 'Troubleshooting',
            evidence: 'Gameplay & source',
            introTitle: 'One interface across two game loops',
            introSub: "The project alternates between purchasing upgrades and resolving turn-based projectile combat. The interface has to stay synchronized with inventory, player statistics, combat state, camera input, and render order.",
            playerLoop: 'Player loop',
            primaryOwnership: 'Primary ownership',
            coreConstraint: 'Core constraint',
            verifiedWork: 'My implementation',
            verifiedWorkDesc: 'I built the menus, store interface, and combat HUD, connected them to game state, and handled input and draw order.',
            architectureTitle: 'State, input, interface, and rendering stay separate',
            architectureDesc: 'The interface participates in the engine update, converts cursor actions into domain events, observes combat data, and renders after the world while preserving text feedback.',
            troubleTitle: 'UI problems and fixes',
            troubleDesc: 'The cases below show the UI issues I addressed and the code changes for each fix.',
            evidenceTitle: 'Gameplay and source code',
            sourceLinkLabel: 'Source fork'
        }
    },
    ko: {
        recycle: {
            "metaDescription": "3인 팀으로 개발한 Recycle의 개인 작업. 전투와 정비 흐름, HUD와 메뉴, 게임패드 입력, 피격 반응과 C++ 소스.",
            "pageTitle": "Recycle | 게임플레이와 HUD, 입력 개발",
            "role": "게임플레이와 HUD, 메뉴 및 입력 개발",
            "intro": "걸어가는 요새를 호위하고 쓰러진 적을 아군으로 재활용하는 1인칭 디펜스 게임입니다. 3인 팀으로 개발해 2026 Epic AI MegaJam에 Windows 빌드를 출품했습니다.",
            "build": "Windows 빌드 플레이",
            "entry": "게임잼 출품 페이지",
            "team": "3명",
            "periodLabel": "기간",
            "period": "2026년 11월",
            "videoLabel": "Recycle 플레이 영상 재생",
            "videoCaption": "팀 게임플레이 영상입니다. 정지 화면은 개발 중 경로와 무기 HUD를 확인한 장면입니다.",
            "navLabel": "Recycle 페이지 목차",
            "navHud": "HUD와 미니맵",
            "navMenus": "메뉴와 입력",
            "navCombat": "피격 반응",
            "navTeam": "협업과 결과",
            "scopeIntro": "HUD와 메뉴, 게임패드 입력을 맡고 전투와 정비 흐름을 연결했습니다. 보급 규칙과 조준 보정, 보병 피격 반응을 구현했습니다. 요새 보행과 적 및 회수의 기본 시스템은 팀원이 개발했습니다.",
            "hudTitle": "HUD와 미니맵",
            "hudIntro": "플레이어는 자신의 체력을 확인하면서 요새를 지키고 여러 무기를 바꿔 써야 합니다. 체력과 호위 경로는 미니맵 주변에 모으고, 현재 무기와 탄약 정보는 반대편에 배치했습니다.",
            "imageHint": "화면을 선택하면 원본 크기로 볼 수 있습니다. 사진은 개발 중 촬영한 화면입니다.",
            "openImage": "원본 크기로 보기",
            "hudAlt": "왼쪽에 체력과 미니맵, 오른쪽에 탄약과 게임패드 안내가 표시된 Recycle HUD",
            "hudCaption": "게임패드 조작 상태의 HUD입니다. 왼쪽에는 체력과 경로, 오른쪽에는 현재 무기와 탄창, 무기 슬롯을 표시합니다.",
            "statusTitle": "체력과 호위 경로",
            "statusBody": "플레이어와 요새의 체력을 원형 게이지로 함께 표시했습니다. 시점 방향을 기준으로 미니맵을 회전시키고 적과 아군, 요새를 구분합니다. 지도 밖의 요새는 가장자리에 표시하고, 이동한 경로와 남은 경로를 나눠 현재 위치를 읽을 수 있게 했습니다.",
            "weaponTitle": "무기와 탄창 표시",
            "weaponBody": "무기를 바꾸면 현재 무기 이미지와 선택된 슬롯을 갱신합니다. 장전된 탄약과 예비 탄창은 나누어 표시했습니다. 무기 종류와 장전 상태를 머티리얼 파라미터에 전달해 탄창 표시와 연결했습니다.",
            "statusAlt": "게임 화면에서 체력 게이지와 미니맵을 확대한 모습",
            "statusCaption": "체력 게이지, 요새 경로와 지도 마커 확대.",
            "weaponAlt": "현재 무기와 탄창, 게임패드 무기 슬롯을 확대한 모습",
            "weaponCaption": "현재 무기, 장전된 탄약과 예비 탄창 확대.",
            "hudStateTitle": "게임 상태와 표시 연결",
            "hudStateBody": "체력과 탄약의 원본 값은 게임 객체가 관리하고, C++ Widget이 이를 읽어 UMG 머티리얼에 표시할 값을 전달합니다. 탄약 수와 장전 상태가 달라질 때 관련 문구와 파라미터를 갱신합니다. 피해를 받으면 줄어든 체력 구간이 잠시 남았다가 따라 내려오도록 표시했습니다.",
            "routeAlt": "호위 경로 진행률과 무기 정보가 표시된 키보드 HUD",
            "routeCaption": "키보드 HUD에서 경로 진행 표시를 확인한 화면입니다. 위쪽 호는 요새의 실제 경로 진행률과 연결했습니다.",
            "hudCodeTitle": "탄약 머티리얼 갱신 코드",
            "codeNote": "프로젝트 소스의 일부입니다.",
            "menuTitle": "메뉴, 게임패드 입력과 한영 전환",
            "menuIntro": "타이틀과 일시정지, 설정, 결과 화면을 게임 상태와 연결했습니다. 레이아웃은 Widget Blueprint에서 편집하고, 화면 전환과 포커스, 설정 적용과 입력 모드는 C++에서 처리합니다.",
            "titleAlt": "게임패드 이동과 확인, 뒤로가기 안내가 있는 Recycle 타이틀 화면",
            "titleCaption": "게임패드 이동과 확인, 뒤로가기 안내를 적용한 타이틀 화면.",
            "pauseAlt": "게임 화면 위에 표시된 Recycle 일시정지 메뉴",
            "pauseCaption": "현재 게임 위에 표시되는 일시정지 메뉴입니다. 계속하기와 메인 메뉴 이동을 연결했습니다.",
            "settingsEnAlt": "화면과 언어, 게임패드 진동, 오디오 항목이 있는 영어 설정 화면",
            "settingsEnCaption": "화면, 언어, 게임패드 진동과 오디오를 조절하는 영어 설정 화면.",
            "settingsKoAlt": "개발 중 촬영한 한국어 설정 화면",
            "settingsKoCaption": "한국어 설정 화면입니다. 앞선 개발 단계에서 촬영했습니다.",
            "focusTitle": "메뉴를 닫은 뒤 조작이 이어지도록",
            "focusBody": "메뉴를 열 때 UI 전용 입력으로 바꾸고 첫 버튼에 포커스를 줍니다. 마우스로 버튼을 가리킬 때도 포커스를 맞춥니다. 설정을 닫으면 메뉴 버튼으로, 계속하기를 누르면 게임 조작에 맞는 입력 모드로 복구해 메뉴 이동과 발사 입력이 겹치지 않도록 했습니다.",
            "languageTitle": "입력 장치와 언어에 맞는 안내",
            "languageBody": "로컬 플레이어의 Subsystem에서 키보드와 마우스, 게임패드 입력을 관찰합니다. 장치가 바뀌면 HUD와 메뉴가 현재 키 바인딩에 맞춰 안내를 갱신합니다. 한영 문구는 String Table로 관리하고, 언어 변경을 기존 위젯에도 알려 동적으로 만들어지는 안내까지 바꿉니다. 선택한 언어는 다음 실행에도 유지됩니다.",
            "cinematicTitle": "연출 중 입력 처리",
            "cinematicBody": "메뉴 흐름에 연출용 입력과 길게 눌러 건너뛰는 안내를 연결했습니다. 전환 전에 누르고 있던 게임 입력을 정리하고 연출 종료 후 조작을 복구합니다. 게임패드로 착지 위치를 고를 때도 마우스 레이에 의존하지 않고 스틱으로 목표 지점을 옮기도록 했습니다.",
            "cinematicAlt": "오른쪽 아래에 길게 눌러 건너뛰기 안내가 표시된 요새 연출 화면",
            "cinematicCaption": "길게 눌러 건너뛰기 안내를 연결한 연출 화면.",
            "combatTitle": "무기별 피격 반응과 폭발 넉백",
            "combatIntro": "피격 반응은 기존의 피해, 사망과 회수 흐름을 유지해야 했습니다. 살아 있는 캐릭터는 캡슐 이동을 유지하면서 맞은 부위에 잠시 물리 반응을 주고, 무기마다 다른 경직을 적용했습니다.",
            "hitAlt": "분리된 개발 테스트 장면에서 보병의 국소 피격 반응을 확인하는 모습",
            "hitCaption": "국소 피격 반응 확인 장면입니다. 반응을 구분하기 위해 별도 테스트 공간에서 촬영했습니다.",
            "explosionAlt": "개발 테스트 장면에서 폭발로 보병이 공중으로 밀려나는 모습",
            "explosionCaption": "폭발 넉백 확인 장면입니다. 가까운 보병과 먼 보병을 같은 조건에서 비교했습니다.",
            "reactionTitle": "맞은 부위에서 애니메이션으로 복귀",
            "reactionBody": "맞은 위치에서 유효한 물리 본을 찾고, 캡슐 피격처럼 본을 특정할 수 없으면 안전한 대체 본을 선택합니다. 해당 가지에만 물리를 적용한 뒤 비중을 줄여 애니메이션으로 복귀시키고, 이전 충돌과 애니메이션 갱신 설정을 복원합니다. 사망하거나 시체를 회수할 때도 임시 반응을 정리한 후 기존 흐름을 이어갑니다.",
            "cancelTitle": "이미 예약된 공격도 함께 취소",
            "cancelBody": "애니메이션만 멈추면 예약된 근접 공격 타이머가 남아 피해를 줄 수 있습니다. 경직 시 피해 타이머와 공격 대기 플래그를 정리하고 Montage와 이동도 중단했습니다. 추적과 공격을 담당하는 컨트롤러 역시 경직 상태에서는 동작을 이어가지 않도록 연결했습니다.",
            "blastTitle": "너무 멀리 날아가지 않도록 조절",
            "blastBody": "폭발 중심에서 멀어질수록 밀려나는 속도가 줄어들도록 했습니다. 살아 있는 적은 캐릭터 이동에, 사망한 적은 물리 바디에 속도를 전달합니다. 적이 너무 멀리 날아간다는 피드백을 받아 수평과 상승 속도를 낮추고 가까운 적과 먼 적의 차이를 다시 확인했습니다. 피해량은 넉백 계산과 별도로 전달합니다.",
            "blastCodeTitle": "거리별 넉백 계산 코드",
            "teamTitle": "팀 코드 연결과 출품",
            "teamBody": "Diversion에서 담당 브랜치의 변경을 통합하고 소스 충돌을 조정했습니다. 피격 반응과 UI를 팀의 적, 회수, 요새 코드에 연결하는 과정에서 중장갑 적의 접근과 회수 동작, 귀환과 게임패드 입력의 충돌을 수정했습니다. 웨이브와 정비의 기본값도 조정했습니다.",
            "releaseBody": "완성한 Windows 빌드와 플레이 영상을 itch.io에 공개하고 2026 Epic AI MegaJam에 출품했습니다. 이 페이지에는 제가 맡은 게임플레이와 전투 피드백, 인터페이스 작업을 정리했습니다.",
            "checksTitle": "개발 중 확인한 동작",
            "checksBody": "개발 당시 PIE에서 실제 수류탄 발사, 거리별 넉백, 예약된 공격 취소와 사망 후 회수를 확인했습니다. 인터페이스는 PIE와 Standalone에서 언어 저장, 동적 문구와 입력 장치 전환을 확인했습니다. 싱글플레이 빌드와 보병을 대상으로 한 내용입니다.",
            "sourceTitle": "주요 구현 파일",
            "sourceHud": "HUD 상태 연동과 화면 표시",
            "sourceInput": "메뉴 포커스와 장치 및 언어 전환",
            "sourceCombat": "무기 피격 처리와 임시 물리 반응",
            "ai": "게임잼 페이지에는 코드, 그래픽과 텍스트의 AI 보조 활용을 공개했습니다. 위 설명에서는 본인의 담당 범위와 팀의 다른 시스템을 구분했습니다.",
            "back": "대표 프로젝트로 돌아가기",
            "navFlow": "전투와 정비",
            "flowTitle": "전투와 정비, 다음 출발까지",
            "dayNightTitle": "전투 진행에 따른 낮과 밤",
            "dayNightBody": "주간 전투에서 해질녘과 야간 정비를 거쳐 다음 전투로 이어지는 흐름을 연결했습니다. 남은 적을 모두 처치해야 전투가 끝나고, 정비는 별도 입력으로 일찍 마칠 수 있습니다. 진행 단계에 맞춰 해와 달, 노출도 함께 바뀌도록 했습니다.",
            "deploymentTitle": "시작 화면에서 결과 화면까지",
            "deploymentBody": "기존 재투입 흐름을 확장해 첫 투입은 자동으로 진행하고, 플레이어의 조작 복구가 끝난 뒤 요새가 출발하도록 연결했습니다. 오프닝과 승리, 패배 연출을 메뉴에 연결하고 연출 종료 후 입력을 복구했습니다.",
            "pickupTitle": "보급 탄약을 받을 무기 선택",
            "pickupBody": "장착 중인 유한 탄약 무기에 여유가 있으면 먼저 지급하고, 그 외에는 탄창 크기 대비 예비탄이 적은 무기를 선택합니다. 최대치를 넘지 않도록 처리하고 같은 보급품을 중복 수집하지 않게 했습니다. 체력이나 탄약이 가득 차 있어도 유효한 보급품은 수집 후 사라지도록 수정했습니다.",
            "aimTitle": "스틱 입력을 따르는 조준 보정",
            "aimBody": "표적 근처에서는 감도를 낮추고, 조준을 보정하는 회전량에는 상한을 뒀습니다. 스틱이 중립이면 카메라가 저절로 움직이지 않고, 표적 반대 방향으로 입력하면 회전 보정을 꺼 플레이어의 조작을 방해하지 않도록 했습니다.",
            "drumTitle": "유탄 발사기의 회전과 사운드",
            "drumBody": "발사에 성공하면 드럼이 한 칸 회전하고, 움직임은 Curve로 조절하도록 했습니다. 무기 표시가 여러 개여도 회전 소리는 한 곳에서만 재생합니다. 무기를 바꾸거나 플레이가 끝날 때는 진행 중인 회전과 오디오를 정리했습니다.",
            "navCode": "소스 코드",
            "codeTitle": "소스 코드와 원본 변경 내역",
            "codeIntro": "네 가지 구현의 소스와 테스트, Diversion 원본 diff를 공개했습니다. 각 파일을 처음 추가한 시점의 코드이며 이후 main의 수정 내용과는 차이가 있을 수 있습니다. 원래 커밋 번호도 함께 남겼습니다.",
            "sampleGauge": "체력 게이지 애니메이션",
            "sampleGaugeBody": "실제 체력은 게임 코드가 관리하고, 표시용 채움과 피해 잔상, 피격 점멸을 별도로 계산합니다.",
            "sampleMinimap": "미니맵 좌표 계산",
            "sampleMinimapBody": "월드 위치를 시점 기준 지도 좌표로 바꾸고, 마커와 경로를 원형 지도 안에 표시하는 계산입니다.",
            "sampleInterface": "입력 장치와 언어 전환",
            "sampleInterfaceBody": "현재 입력 장치를 관찰하고, 조작 안내와 언어, 진동 설정의 변경을 위젯에 전달합니다.",
            "sampleAim": "게임패드 조준 보정 계산",
            "sampleAimBody": "감도와 제한된 회전 보정량을 계산하고, 중립 입력이나 표적 반대 방향 입력을 구분합니다.",
            "viewSource": "소스 보기",
            "viewTests": "테스트 보기",
            "viewPatch": "원본 diff",
            "downloadCode": "소스와 변경 내역 다운로드",
            "sourceCollection": "전체 소스 목록",
            "sourceFlow": "낮과 밤, 출발 흐름",
            "sourceWeapons": "보급 규칙과 무기 연출",
            "sourceAim": "게임패드 조준 보정"
        },
        global: {
            siteLangLabel: 'English',
            siteLangAria: '영어로 전환',
            langLabelKo: '한국어',
            langLabelEn: 'English',
            themeToDark: '다크',
            themeToLight: '라이트',
            themeToDarkAria: '다크 테마로 전환',
            themeToLightAria: '라이트 테마로 전환',
            playBackgroundVideo: '배경 영상 재생',
            backgroundVideo: '배경 영상',
            stopBackgroundVideo: '배경 영상 정지',
            project: '프로젝트',
            overview: '개요',
            techStack: '기술 스택',
            viewDetails: '상세 보기',
            downloadDemo: '다운로드',
            downloadProject: '프로젝트 다운로드',
            challenge: '기술적 과제',
            solution: '해결',
            rootCause: '원인',
            result: '결과',
            totalDuration: '총 기간',
            weeksPrefix: '주차',
            teamOverview: '팀 개요',
            myRole: '담당 역할',
            hudItems: '아이템 슬롯과 선택',
            hudAngle: '현재 조준 각도와 이전 발사 각도',
            hudGauges: '이동량과 발사 세기 게이지',
            teamDynamics: '팀 운영',
            teamComposition: '팀 구성',
            collaborationTools: '협업 도구',
            teamSize: '팀 규모',
            soloDevelopment: '개인 작업',
            projectType: '프로젝트 유형',
            scope: '범위',
            timeConstraint: '일정 제약',
            selfManagedAspects: '직접 담당',
            navHome: '홈',
            backToPortfolio: '포트폴리오로 돌아가기',
            portfolio: '포트폴리오',
            developmentTimeline: '개발 타임라인',
            systemFlow: '동작 흐름',
            assignment: '과제',
            primaryStack: '핵심 스택',
            resultTitle: '결과',
            evidenceStatus: '작업 기록',
            commitDerivedCases: '엔지니어링 문제 해결',
            openWeekPrefix: '주차 ',
            prepareDemoVideo: '데모 영상을 준비 중',
            preparingDemoProject: '{title} 데모 영상을 준비 중입니다',
            placeholder: {
                videoLabel: '비디오'
            },
            problem: '문제',
            solution: '해결',
            rootCause: '원인',
            result: '결과',
            collaborationHeader: {
                overview: '프로젝트 개요'
            },
            timelineLabel: '개발 타임라인',
            totalDurationLabel: '총 소요 기간'
        },
        index: {
            viewProjects: "대표 프로젝트 보기",
            additionalProjects: "다른 프로젝트",
            additionalLead: "이전 팀 게임에서 맡은 캐릭터 움직임과 보스 행동, 게임 UI입니다.",
            coreSkills: "게임플레이와 애니메이션",
            renderSkills: "렌더링과 자체 엔진",
            toolSkills: "도구 제작과 협업",
            aiSkills: "AI 활용과 검증",
            coreExperience: "C로 보스의 상태별 행동을, C++로 캐릭터 조작과 애니메이션 동작 분석을 구현했습니다. Blueprint에서는 시간 제어와 비 연출을 연결했습니다.",
            renderExperience: "C++/OpenGL로 자체 엔진을 만들었습니다. DirectX 11에서는 HLSL 셰이더로 반복 오브젝트를 임포스터로 그리도록 구현했습니다.",
            toolExperience: "팀장으로 데이터 형식과 갱신 시점, 기능을 합치는 순서를 조율했습니다. Git과 Perforce로 작업을 공유하고 Python으로 데이터 검사와 빌드를 자동화했습니다.",
            aiExperience: "AI로 작성한 벤치마크와 빌드 도구를 실행하며 확인했습니다. 특정 환경에서만 동작하도록 고정된 경로는 직접 수정했습니다.",
            skillCoreLink: "플러그인 구현 보기",
            skillRenderLink: "렌더링 구현 보기",
            skillToolsLink: "독립 실행 빌드 보기",
            skillAiLink: "빌드 작업 보기",

            pageTitle: "Cho Sanghyeon, C++ 게임 프로그래머",
            pageDescription: 'HaXX0rBunny의 C++ 게임플레이, 실시간 렌더링, 엔진 아키텍처, Unreal Engine 개발 포트폴리오입니다.',
            navHome: '홈',
            navProjects: '프로젝트',
            navSkills: '기술',
            navContact: '연락',
            heroName: '조상현',
            heroName: '조상현',
            heroFeatured: 'Fab 출시 프로젝트',
            ctaText: '게임 개발자',
            heroDescription: "화면 너머에서 동경하던 세계에, 이제는 제 손으로 한 장면을 보태는 개발자 조상현입니다. C++과 Unreal Engine으로 캐릭터의 움직임과 애니메이션, 게임 UI를 구현합니다. 3인 팀을 이끌어 애니메이션 플러그인을 Fab에 출시했고, 자체 엔진의 렌더링을 최적화했습니다. 제가 사랑한 게임들이 그랬듯, 플레이가 끝난 뒤에도 문득 돌아가고 싶어지는 세계를 만들고 싶습니다.",
            selectedWork: '주요 작업',
            projectIndexAria: '프로젝트 바로가기',
            projectIndexPlugin: '애니메이션 변형 플러그인',
            projectIndexEngine: '렌더링과 자체 엔진',
            projectIndexGameplay: '캐릭터와 시간 제어',
            projectIndexRecycle: '전투 피드백과 게임 UI',
            featuredProjects: "대표 프로젝트",
            featuredProjectsLead: "직접 구현한 기능과 문제 해결 과정을 프로젝트별로 정리했습니다.",
            featuredProjectsAside1: "대표 프로젝트 3개",
            featuredProjectsAside2: '게임, 엔진, 도구',
            technicalProfile: '기술 프로필',
            skillsExpertise: "사용 기술",
            skillsLead: "프로젝트에서 사용한 언어와 도구, 구현한 기능입니다.",
            skillsSub1: "프로젝트에서 직접 사용",
            skillsSub2: "C++, 렌더링, 도구",
            programmingLanguages: '프로그래밍 언어',
            gameEngines: '게임 엔진',
            graphicsRendering: '그래픽, 렌더링',
            developmentTools: '개발 도구',
            background: '이력',
            educationTraining: '교육 및 수료',
            backgroundLead: '컴퓨터과학을 전공한 뒤 DigiPen Academy와 크래프톤 정글 게임테크랩에서 게임과 엔진을 개발했습니다.',
            contact: '연락',
            contactTitle: "연락처",
            contactLead: "C++과 Unreal Engine을 사용하는 게임 클라이언트 및 엔진 개발 직무를 찾고 있습니다.",
            contactFocusLabel: '주요 기술',
            contactInterestsLabel: '관심 분야',
            contactOnlineTitle: '온라인 채널',
            contactBackToTop: '맨 위로',
            contactButtonLinkedIn: '프로필 보기',
            linkedInUrl: 'https://www.linkedin.com/in/haxxorbunny/',
            contactButtonGithub: '저장소 보기',
            contactSubGithub: '소스 코드와 작업 이력',
            contactSubLinkedin: '학력과 개발 경험',
            projectTypeTeam: '팀',
            projectTypeSolo: '개인',
            team: '팀',
            solo: '개인'
        },
        lab: {
            selectedWorkAria: "대표 엔진 작업",
            impostorTitle: "오브젝트 5만 개 렌더링 비교",
            impostorSummary: "같은 5만 개 장면에서 Full Mesh와 Impostor 렌더링을 비교했습니다. 비교 화면과 측정 조건을 함께 정리했습니다.",
            resultLink: "비교 화면과 측정 조건 보기 ↗",
            standaloneTitle: "에디터 밖에서 게임 실행하기",
            standaloneSummary: "실행용 Scene과 자산 경로, Viewport, Backbuffer 초기화를 연결해 에디터 없이 실행되는 빌드를 만들었습니다.",
            buildLink: "실행 화면과 구현 과정 보기 ↗",

            pageTitle: 'GameTechLab3rd, C++ 렌더링 및 엔진 개발',
            pageDescription: 'HaXX0rBunny가 KRAFTON Jungle Game Tech Lab 3rd에서 수행한 C++ 렌더링 및 엔진 개발 기록입니다.',
            heroKicker: 'KRAFTON Jungle, Game Tech Lab 3rd',
            heroTitle: 'C++ 렌더링 및 엔진 개발',
            heroDescription: 'Game Tech Lab 3rd에서 주차별로 구현한 렌더링과 에디터 도구, 게임 실행 기능을 정리했습니다.',
            heroScope: '프로젝트 범위',
            heroScopeValue: '엔진 제작 과정, 1~14주',
            heroTeam: '팀 구조',
            heroTeamValue: '매 주차 3~4명 팀 구성',
            heroRole: '주요 역할',
            heroRoleValue: '렌더링 및 엔진',
            heroStack: '핵심 스택',
            heroStackValue: 'C++, DirectX 11, HLSL',
            heroImageAlt: 'Game Tech Lab 과정에서 개발한 커스텀 C++ 엔진 파티클 에디터',
            heroImageCaption: '과정 후반부에 개발한 커스텀 엔진 파티클 에디터입니다.',
            developmentRecord: '개발 기록',
            viewsAria: 'Game Tech Lab 보기 방식',
            weekSelectorAria: '주차 선택',
            detailTabsAria: '선택한 주차의 상세 내용',
            explorerHeading: '주차별 엔진 개발',
            explorerIntro: '주차별 담당 작업과 문제 해결 과정을 정리했습니다.',
            weekByWeek: '주차별 보기',
            weekByWeekSub: '역할, 구현, 작업 기록',
            timeline: '엔진 개발 흐름',
            timelineSub: '엔진 개발 진행도',
            roleTab: '과제 및 역할',
            implTab: '구현 내용',
            evidenceTab: '결과, 소스',
            troubleTab: '트러블슈팅',
            timelineTitle: '플레이 가능한 루프에서 통합 엔진과 게임까지.',
            timelineIntro: '마일스톤을 선택하면 해당 주차의 상세 화면으로 이동합니다.',
            noscript: '주차별 기록을 탐색하려면 JavaScript가 필요합니다.',
            footerLabel: 'Game Tech Lab 3rd, 주차별 프로젝트 아카이브',
            weekLabel: 'Week',
            timelineOpen: '열기',
            assignmentLabel: '과제',
            myRoleLabel: '담당 역할',
            implementationFlowAria: '구현 흐름',
            coreImplementation: '핵심 구현',
            selectedAuthoredCommits: '주요 구현 커밋',
            noPublicSourceLink: '공개 소스 링크 없음',
            sourceRecovery: '소스 파일 대기 중',
            sourceRecoveryTitle: '소스 복구가 아직 진행 중입니다.',
            pendingSourceRecovery: '소스 복구 대기 중',
            commitDerivedLabel: '문제 해결',
            evidenceCommit: '커밋',
            localHistory: '로컬 이력',
            documentedCases: '{count}건',
            caseSingular: '사례',
            casePlural: '사례',
            caseLabel: '사례 {number}',
            symptom: '증상',
            rootCause: '근본 원인',
            fix: '수정',
            result: '결과',
            troubleshootingIntro: '핵심 문제의 증상, 원인, 수정 방법, 결과를 관련 코드와 함께 정리했습니다.',
            codeSnapshotAfter: '수정 코드',
            representativeFixAria: '{file}의 대표 수정 코드',
            openEvidenceAria: '원본 이미지 열기: {stage}',
            method: '상세 내용',
            testPc: '테스트 PC',
            scopeLimits: '참고',
            validationDetails: '구현 상세',
            additionalValues: '추가 수치',
            preservedEvidenceAria: '프로젝트 화면과 실행 기록'
        },
        modal: {
            implementationTitle: '담당 구현',
            tabOverview: '개요',
            tabCollaboration: '팀 작업',
            tabTechnical: '기술 상세',
            tabChallenges: '문제 해결',
            tabTimeline: '타임라인',
            close: '닫기',
            backToPortfolio: '포트폴리오로 돌아가기',
            downloadProject: '프로젝트 다운로드',
            rolePrefix: '역할:',
            projectBreadcrumb: '프로젝트',
            projectDetails: '프로젝트 상세'
        },
        huntress: {
            home: '포트폴리오로 돌아가기',
            overview: '개요',
            contribution: '기여 내용',
            architecture: '아키텍처',
            troubleshooting: '트러블슈팅',
            evidence: '플레이 화면, 소스',
            introTitle: '두 가지 루프를 잇는 하나의 인터페이스',
            introSub: '구매/업그레이드 루프와 턴 기반 탄막 전투가 오가며, UI는 인벤토리, 플레이어 수치, 전투 상태, 카메라 입력, 렌더 순서와 항상 동기화되어야 합니다.',
            playerLoop: '플레이어 루프',
            primaryOwnership: '주요 담당',
            coreConstraint: '핵심 제약',
            verifiedWork: '담당 구현',
            verifiedWorkDesc: '메뉴와 상점, 전투 HUD를 구현하고 게임 상태와 연결했습니다. UI 입력과 전투 조작이 겹치지 않도록 처리하고 화면 출력 순서를 정리했습니다.',
            architectureTitle: '상태, 입력, UI 분리를 기준으로 구성',
            architectureDesc: 'UI는 엔진 갱신 과정에 직접 참여해 커서 동작을 도메인 이벤트로 변환하고, 월드, UI를 분리된 렌더 단계에서 안정적으로 출력합니다.',
            troubleTitle: 'UI 문제 해결 과정',
            troubleDesc: 'UI 개발 중 발생한 문제와 수정 내용을 코드와 함께 정리했습니다.',
            evidenceTitle: '플레이 화면과 소스 코드',
            sourceLinkLabel: '소스 포크'
        }
    }
};

const PORTFOLIO_LOCALE_STORAGE_KEY = 'portfolio-locale-v2';
let currentLocale = 'en';

try {
    currentLocale = localStorage.getItem(PORTFOLIO_LOCALE_STORAGE_KEY) || 'en';
} catch (error) {
    console.warn('Could not read the saved language preference.', error);
}

function resolveLocaleValue(locale, keyPath) {
    const [group, ...keys] = keyPath.split('.');
    let value = PORTFOLIO_I18N[locale];
    if (!value) return null;

    if (group && value[group]) {
        value = value[group];
        for (const key of keys) {
            if (!value || typeof value !== 'object') return null;
            value = value[key];
        }
        return typeof value === 'string' ? value : null;
    }
    return null;
}

function getLocale() {
    return currentLocale === 'ko' ? 'ko' : 'en';
}

function setLocale(locale, options = {}) {
    const next = locale === 'ko' ? 'ko' : 'en';
    if (next === currentLocale && !options.force) {
        return;
    }

    currentLocale = next;
    if (options.persist !== false) {
        try {
            localStorage.setItem(PORTFOLIO_LOCALE_STORAGE_KEY, currentLocale);
        } catch (error) {
            console.warn('Locale preference save failed:', error);
        }
    }

    document.documentElement.lang = getLocale() === 'ko' ? 'ko' : 'en';
    applyStaticI18n(document);

    document.dispatchEvent(new CustomEvent('portfolio-locale-changed', {
        detail: { locale: currentLocale }
    }));
}

function getLocalizedLabel(key, fallback = '') {
    return resolveLocaleValue(currentLocale, key)
        || resolveLocaleValue('en', key)
        || fallback
        || key;
}

function applyStaticI18n(root = document) {
    root.querySelectorAll('[data-i18n]').forEach((element) => {
        const key = element.getAttribute('data-i18n');
        const keyValue = getLocalizedLabel(key);
        if (keyValue && keyValue !== key) {
            element.textContent = keyValue;
        }
    });

    root.querySelectorAll('[data-i18n-html]').forEach((element) => {
        const key = element.getAttribute('data-i18n-html');
        const keyValue = getLocalizedLabel(key);
        if (keyValue && keyValue !== key) {
            element.innerHTML = keyValue;
        }
    });

    root.querySelectorAll('[data-i18n-attr-aria-label]').forEach((element) => {
        const key = element.getAttribute('data-i18n-attr-aria-label');
        const keyValue = getLocalizedLabel(key);
        if (keyValue && keyValue !== key) {
            element.setAttribute('aria-label', keyValue);
        }
    });

    root.querySelectorAll('[data-i18n-attr-title]').forEach((element) => {
        const key = element.getAttribute('data-i18n-attr-title');
        const keyValue = getLocalizedLabel(key);
        if (keyValue && keyValue !== key) {
            element.setAttribute('title', keyValue);
        }
    });

    root.querySelectorAll('[data-i18n-attr-alt]').forEach((element) => {
        const key = element.getAttribute('data-i18n-attr-alt');
        const keyValue = getLocalizedLabel(key);
        if (keyValue && keyValue !== key) {
            element.setAttribute('alt', keyValue);
        }
    });

    root.querySelectorAll('[data-i18n-attr-content]').forEach((element) => {
        const key = element.getAttribute('data-i18n-attr-content');
        const keyValue = getLocalizedLabel(key);
        if (keyValue && keyValue !== key) {
            element.setAttribute('content', keyValue);
        }
    });

    root.querySelectorAll('[data-i18n-attr-href]').forEach((element) => {
        const key = element.getAttribute('data-i18n-attr-href');
        const keyValue = getLocalizedLabel(key);
        if (keyValue && keyValue !== key) {
            element.setAttribute('href', keyValue);
        }
    });
}

function updateLanguageButton(button) {
    if (!button) return;

    if (getLocale() === 'en') {
        button.textContent = getLocalizedLabel('global.siteLangLabel');
        button.setAttribute('aria-label', getLocalizedLabel('global.siteLangAria'));
    } else {
        button.textContent = getLocalizedLabel('global.langLabelEn');
        button.setAttribute('aria-label', getLocalizedLabel('global.siteLangAria'));
    }
}

function toggleLocale() {
    setLocale(getLocale() === 'en' ? 'ko' : 'en');
}

function initializeLocaleToggle(toggleId) {
    const languageToggle = document.getElementById(toggleId);
    updateLanguageButton(languageToggle);
    if (languageToggle && !languageToggle.dataset.portfolioLocaleBound) {
        languageToggle.addEventListener('click', () => toggleLocale());
        languageToggle.dataset.portfolioLocaleBound = 'true';
    }
    applyStaticI18n(document);
}

window.PortfolioI18n = {
    getLocale,
    setLocale,
    getLocalizedLabel,
    applyStaticI18n,
    initializeLocaleToggle,
    toggleLocale,
    updateLanguageButton,
    t: getLocalizedLabel
};

if (typeof document !== 'undefined') {
    applyStaticI18n(document);
}
