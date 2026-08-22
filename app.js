
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
        "title": "MegaRogue Project",
        "subtitle": "Advanced Roguelike Game",
        "project_type": "team",
        "is_team_project": true,
        "team_size": 2,
        "my_role": "Gameplay Engineer",
        "technologies": ["C", "CProcessing"],
        "description": "A roguelike game developed in C featuring advanced physics systems, AI patterns, and level design tools. The project showcases low-level programming skills and game architecture design.",
        "videoUrl": "https://www.youtube.com/embed/dd0ZqgdRN5Y",
        "links": {
            "github": "https://github.com/HaXX0rBunny/APETI"
        },
        "collaboration_details": {
            "team_size": 2,
            "my_role": "System Engineer",
            "team_roles": [
                "Gameplay Engineer (Me)",
                "System Engineer",
            ],
            "collaboration_tools": ["Git", "Discord"],
            "team_dynamics": "Client development including design, programming, and testing"
        },
        "technical_challenges": [
            "Real-time collision detection optimization",
            "AI state management complexity",
            "Memory management without garbage collection",
            "Cross-platform compatibility issues"
        ],
        "troubleshooting": {
            "collision_performance": {
                "problem": "Collision detection causing performance bottlenecks",
                "root_cause": "Naive O(n²) collision checking between all entities",
                "solution": "Implemented spatial partitioning with quadtree data structure",
                "result": "Achieved 15% CPU usage optimization for collision detection"
            },
            "ai_complexity": {
                "problem": "Boss AI behavior becoming unpredictable with state conflicts",
                "root_cause": "Multiple state transitions occurring simultaneously",
                "solution": "Designed state pattern with priority-based transition system",
                "result": "Eliminated AI behavior conflicts and improved boss fight experience"
            }
        },
        "development_timeline": {
            "duration": "2 weeks",
            "phases": [
                { "phase": "Core Systems", "duration": "1 weeks", "focus": "Physics engine and collision detection" },
                { "phase": "AI Implementation", "duration": "5 days", "focus": "Enemy AI and boss patterns" },
                { "phase": "Polish & Testing", "duration": "2 days", "focus": "Bug fixes and optimization" }
            ]
        },
        "downloadLink": "https://github.com/HaXX0rBunny/HaXX0rBunny.github.io/raw/main/Assets/downlaods/MEGA_ROGUE_Setup.exe"
    },
    "3": {
        "title": "Huntress Game Jam",
        "subtitle": "Rapid Prototyping Challenge",
        "project_type": "team",
        "is_team_project": true,
        "team_size": 3,
        "my_role": "UI/UX Developer",
        "technologies": ["C++", "AlphaEngine"],
        "description": "A game jam project developed under tight time constraints, showcasing rapid prototyping skills and efficient implementation of core game systems.",
        "videoUrl": "https://www.youtube.com/embed/I_cFyhu3i0E",
        "links": {
            "github": "https://github.com/ido-013/Huntress/tree/main"
        },
        "collaboration_details": {
            "team_size": 3,
            "my_role": "UI/UX Developer",
            "team_roles": [
                "UI/UX Developer (Me)",
                "Gameplay Engineer",
                "System Engineer",
            ],
            "collaboration_tools": ["Git", "Discord"],
            "team_dynamics": "Rapid prototyping with focus on core mechanics"
        },
        "technical_challenges": [
            "Implementing complex systems under time pressure",
            "Creating intuitive UI/UX for game systems",
            "Optimizing performance on limited development time",
            "Balancing scope with quality"
        ],
        "troubleshooting": {
            "time_management": {
                "problem": "Limited time to implement all desired features",
                "root_cause": "Overly ambitious initial scope for 48-hour timeframe",
                "solution": "Focused on core mechanics first, then polish",
                "result": "Delivered fully functional prototype with key features"
            },
            "ui_responsiveness": {
                "problem": "UI elements not responding smoothly during gameplay",
                "root_cause": "Heavy UI updates blocking main thread",
                "solution": "Implemented efficient UI rendering system with ImGui optimization",
                "result": "40% improvement in UI response time"
            }
        },
        "development_timeline": {
            "duration": "1 months",
            "phases": [
                { "phase": "Concept & Planning", "duration": "1 weeks", "focus": "Game design and technical planning" },
                { "phase": "Core Development", "duration": "2 weeks", "focus": "Gameplay systems and UI" },
                { "phase": "Polish & Submission", "duration": "1 weeks", "focus": "Bug fixes and final polish" }
            ]
        },
        "downloadLink": "https://github.com/HaXX0rBunny/HaXX0rBunny.github.io/raw/main/Assets/downlaods/Huntress_setup.exe"
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
let currentTheme = 'light';
let heroPlayer = null;
let currentProjectId = null;

// DOM elements
let themeToggle, navToggle, navMenu, backToTop, loadingSpinner, projectModal;
let modalClose, tabBtns, tabPanes;

// Initialize app
document.addEventListener('DOMContentLoaded', function () {
    console.log('Initializing portfolio...');
    initializeElements();
    initializeTheme();
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
    // Check for saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-color-scheme', theme);
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? 'Light' : 'Dark';
        themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
    try {
        localStorage.setItem('theme', theme);
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

    Object.entries(projectsData).forEach(([id, project]) => {
        const projectCard = createProjectCard(id, project);
        projectsGrid.appendChild(projectCard);
    });
}

function createProjectCard(id, project) {
    const card = document.createElement('div');
    card.className = 'project-card';

    // 카드 클릭 시 모달 열기 (버튼 영역 제외)
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.project-action')) {
            e.preventDefault();
            openProjectModal(id);
        }
    });

    const typeText = project.is_team_project ? `Team · ${project.team_size}` : 'Solo';
    const typeBadgeClass = project.is_team_project ? 'team' : 'solo';

    const techBadges = project.technologies.map(tech => {
        let badgeClass = 'tech-badge';
        if (tech.includes('C++') || tech.includes('Unreal Engine')) badgeClass += ' expert';
        else if (tech.includes('OpenGL') || tech.includes('C')) badgeClass += ' advanced';
        return `<span class="${badgeClass}">${tech}</span>`;
    }).join('');


    const videoSection = project.videoUrl
        ? `<div class="project-video">
           <iframe src="${project.videoUrl}?modestbranding=1&rel=0"
                   title="${project.title}"
                   allowfullscreen
                   loading="lazy"></iframe>
       </div>`
        : `<div class="project-video project-video--placeholder">
           <div class="video-placeholder">
               <div class="placeholder-icon">VIDEO</div>
               <div class="placeholder-text">
                   <h4>${project.title}</h4>
                   <p>Prepare demo video</p>
               </div>
           </div>
       </div>`;


    const downloadBtn = project.downloadLink
        ? `<a href="${project.downloadLink}" target="_blank" class="btn btn--secondary download-btn project-action">
           Download Demo
       </a>`
        : '';

    card.innerHTML = `
      ${videoSection}
      
      <div class="project-info">
          <div class="project-header">
              <h3>${project.title}</h3>
              <p class="project-subtitle">${project.subtitle}</p>
              
              <div class="project-type-indicator">
                  <div class="project-type-badge ${typeBadgeClass}">
                      <span>${typeText}</span>
                  </div>
                  <div class="role-badge">${project.my_role}</div>
              </div>
          </div>
          
          <p>${project.description}</p>
          
          <div class="tech-stack">${techBadges}</div>
          
          <div class="project-actions" style="display:flex;gap:8px;flex-wrap:wrap">
              <button class="btn btn--primary project-detail-btn project-action">
                  View Details
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

            // View Details 버튼인 경우 모달 열기
            if (el.classList.contains('project-detail-btn')) {
                e.preventDefault();
                openProjectModal(id);
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

function openProjectModal(projectId) {
    console.log('Opening modal for project:', projectId);
    currentProjectId = projectId;
    const project = projectsData[projectId];

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
        collaborationTab.textContent = project.is_team_project ? 'Team & Collaboration' : 'Solo Development';
    }

    // Show modal
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Reset to overview tab
    switchTab('overview');
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
        if (project.videoUrl) {
            modalVideo.innerHTML = `
                <iframe src="${project.videoUrl}?modestbranding=1&rel=0" 
                        title="${project.title}" 
                        allowfullscreen>
                </iframe>
            `;
        } else {
            modalVideo.innerHTML = `
                <div class="modal-video-placeholder">
                    <div class="placeholder-icon">VIDEO</div>
                    <div class="placeholder-content">
                        <h4>preparing a demo video</h4>
                        <p>${project.title} preparing a demo project video</p>
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
        const typeText = project.is_team_project ? `Team · ${project.team_size}` : 'Solo';
        const typeBadgeClass = project.is_team_project ? 'team' : 'solo';

        projectTypeBadge.innerHTML = `
            <div class="project-type-badge ${typeBadgeClass}">
                <span>${typeText}</span>
            </div>
        `;
    }

    // Role info
    if (roleInfo) {
        roleInfo.innerHTML = `<strong>Role:</strong> ${project.my_role}`;
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
                    <span>Download Project</span>
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
        collaborationContent.innerHTML = `
            <div class="team-overview">
                <h3>Team Overview</h3>
                <p><strong>Team Size:</strong> ${project.collaboration_details.team_size} members</p>
                <p><strong>My Role:</strong> ${project.collaboration_details.my_role}</p>
                <p><strong>Team Dynamics:</strong> ${project.collaboration_details.team_dynamics}</p>
            </div>
            <div class="team-roles">
                <h3>Team Composition</h3>
                <ul>
                    ${project.collaboration_details.team_roles.map(role => `<li>${role}</li>`).join('')}
                </ul>
            </div>
            <div class="collaboration-tools">
                <h3>Collaboration Tools</h3>
                <ul>
                    ${project.collaboration_details.collaboration_tools.map(tool => `<li>${tool}</li>`).join('')}
                </ul>
            </div>
        `;
    } else {
        collaborationContent.innerHTML = `
            <div class="team-overview">
                <h3>Solo Development</h3>
                <p><strong>Project Type:</strong> ${project.collaboration_details.project_type}</p>
                <p><strong>Scope:</strong> ${project.collaboration_details.scope}</p>
                ${project.collaboration_details.time_constraint ?
                `<p><strong>Time Constraint:</strong> ${project.collaboration_details.time_constraint}</p>` : ''}
            </div>
            <div class="team-roles">
                <h3>Self-Managed Aspects</h3>
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
            <h4>${key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h4>
            <div class="problem-solution-grid">
                <div class="problem-section">
                    <h5>Problem</h5>
                    <p>${issue.problem}</p>
                </div>
                <div class="solution-section">
                    <h5>Solution</h5>
                    <p>${issue.solution}</p>
                </div>
            </div>
            <div class="problem-solution-grid">
                <div class="problem-section">
                    <h5>Root Cause</h5>
                    <p>${issue.root_cause}</p>
                </div>
                <div class="result-highlight">
                    <h5>Result</h5>
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

    const timelineItems = project.development_timeline.phases.map((phase, index) => `
        <div class="timeline-item">
            <div class="timeline-marker">${index + 1}</div>
            <div class="timeline-content-item">
                <div class="timeline-phase">${phase.phase}</div>
                <div class="timeline-duration">${phase.duration}</div>
                <div class="timeline-focus">${phase.focus}</div>
            </div>
        </div>
    `).join('');

    timelineContent.innerHTML = `
        <div class="project-detail-section">
            <h3>Development Timeline</h3>
            <p><strong>Total Duration:</strong> ${project.development_timeline.duration}</p>
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
