// =========================================
// Enhanced Game Developer Portfolio Data & Logic
// =========================================

const projectsData = {
    "1": {
        "title": "Edge Drive",
        "subtitle": "Hybrid 3D Action Game",
        "project_type": "team",
        "is_team_project": true,
        "team_size": 4,
        "my_role": "Game Director & Gameplay Programmer",
        "technologies":,
        "description": "A hybrid 3D action game inspired by Bayonetta, Dark Souls, and Paper Mario. As a DigiPen Busan Academy graduation project, this project enhanced my skills in implementing Unreal Engine 5's latest features and complex gameplay systems.",
        "videoUrl": "https://www.youtube.com/embed/264Wfi25UOU",
        

        "githubUrl": "https://github.com/HaXX0rBunny/EdgeDrive", 
        
        "collaboration_details": {
            "team_size": 4,
            "my_role": "Game Director & Gameplay Programmer",
            "team_roles":,
            "collaboration_tools":,
            "team_dynamics": "Led technical implementation and game design decisions while coordinating with artists and designers. Managed project timeline and feature prioritization."
        },
        "technical_challenges":,
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
            "phases":
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
        

        "githubUrl": "https://github.com/HaXX0rBunny/MegaRogue",

        "collaboration_details": {
            "team_size": 2,
            "my_role": "System Engineer",
            "team_roles":,
            "collaboration_tools":,
            "team_dynamics": "Client development including design, programming, and testing"
        },
        "technical_challenges":,
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
            "phases":
        },
        "downloadLink": "assets/downloads/MEGA_ROGUE_Setup.exe"
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
        "githubUrl": "https://github.com/HaXX0rBunny/Huntress",
        "collaboration_details": {
            "team_size": 3,
            "my_role": "UI/UX Developer",
            "team_roles":,
            "collaboration_tools":,
            "team_dynamics": "Rapid prototyping with focus on core mechanics"
        },
        "technical_challenges": ["Implementing complex systems under time pressure", "Creating intuitive UI/UX", "Optimizing performance"],
        "troubleshooting": {
            "ui_responsiveness": {
                "problem": "UI not responding smoothly",
                "root_cause": "Heavy UI updates blocking main thread",
                "solution": "Implemented efficient UI rendering system",
                "result": "40% improvement in UI response time"
            }
        },
        "development_timeline": {
            "duration": "1 month",
            "phases":
        },
        "downloadLink": "assets/downloads/Huntress_setup.exe"
    },
    "4": {
        "title": "Redash Engine",
        "subtitle": "Custom Game Engine",
        "project_type": "solo",
        "is_team_project": false,
        "my_role": "Engine Developer",
        "technologies":,
        "description": "Custom game engine development project focused on engine architecture design and implementation.",
        "githubUrl": "https://github.com/HaXX0rBunny/RedashEngine",
        "collaboration_details": {
            "project_type": "Solo Development",
            "scope": "Full engine development",
            "self_managed_aspects":
        },
        "technical_challenges":,
        "troubleshooting": {
            "component_performance": {
                "problem": "Component lookup overhead",
                "root_cause": "Inefficient iteration",
                "solution": "Data-oriented design ECS",
                "result": "Fast iteration"
            }
        },
        "development_timeline": {
            "duration": "6 months",
            "phases": [{ "phase": "Architecture", "duration": "2 months", "focus": "Core systems" }]
        }
    },
    "5": {
        "title": "Rescue Simulator",
        "subtitle": "Comprehensive Puzzle Game",
        "project_type": "team",
        "is_team_project": true,
        "team_size": 3,
        "my_role": "C++ Frontend/Backend Developer",
        "technologies":,
        "description": "A comprehensive puzzle game developed in Unreal Engine 4.",
        "videoUrl": "https://www.youtube.com/embed/qxAU1XQOO1o",
        "githubUrl": "https://github.com/HaXX0rBunny/RescueSim",
        "collaboration_details": {
            "team_size": 3,
            "my_role": "C++ Dev",
            "team_roles":,
            "collaboration_tools":,
            "team_dynamics": "Technical architecture"
        },
        "technical_challenges":,
        "troubleshooting": {
            "qte_precision": {
                "problem": "Timing inconsistency",
                "root_cause": "Frame-dependent calculations",
                "solution": "Custom timer system",
                "result": "Consistent timing"
            }
        },
        "development_timeline": {
            "duration": "4 months",
            "phases":
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
            autoplay: 1, mute: 1, loop: 1, controls: 0, showinfo: 0,
            rel: 0, modestbranding: 1, disablekb: 1, iv_load_policy: 3,...options
        };
        this.init();
    }

    init() {
        if (typeof YT!== 'undefined' && YT.Player) {
            this.createPlayer();
        } else {
            this.loadYouTubeAPI();
        }
    }

    loadYouTubeAPI() {
        window.onYouTubeIframeAPIReady = () => {
            this.apiLoaded = true;
            this.createPlayer();
        };
        if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            tag.async = true;
            document.getElementsByTagName('script').parentNode.insertBefore(tag, null);
        }
    }

    createPlayer() {
        const container = document.getElementById(this.containerId);
        if (!container) return;
        container.classList.add('loading');
        try {
            this.player = new YT.Player(this.containerId, {
                videoId: this.videoId,
                playerVars: {...this.options, playlist: this.videoId },
                events: {
                    onReady: (e) => { e.target.mute(); e.target.playVideo(); container.classList.remove('loading'); container.classList.add('loaded'); },
                    onStateChange: (e) => { if (e.data === YT.PlayerState.ENDED) this.player.playVideo(); }
                }
            });
        } catch (e) { console.warn("Player error", e); }
    }
}

// Global Variables

let currentTheme = 'dark';
let heroPlayer = null;
let currentProjectId = null;

// DOM Elements
let themeToggle, navToggle, navMenu, backToTop, loadingSpinner, projectModal, modalClose, tabBtns, tabPanes;

document.addEventListener('DOMContentLoaded', function () {
    initializeElements();
    initializeTheme();
    initializeNavigation();
    initializeProjects();
    initializeModal();
    initializeScrollEffects();
    initializeContactForm();
    initializeTypingEffect();
    
    setTimeout(() => {
        initializeHeroVideo();
        if(loadingSpinner) loadingSpinner.classList.remove('active');
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
    // [수정] 로컬 스토리지 값이 없으면 'dark'를 기본으로 사용
    const savedTheme = localStorage.getItem('theme') |

| 'dark';
    setTheme(savedTheme);
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-color-scheme', theme);
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark'? '☀️' : '🌙';
    }
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const newTheme = currentTheme === 'light'? 'dark' : 'light';
    setTheme(newTheme);
}

function initializeNavigation() {
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = ['hero', 'projects', 'skills', 'contact'];
    let current = '';
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section && window.scrollY >= section.offsetTop - 100) {
            current = sectionId;
        }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
}

function initializeTypingEffect() {
    const typingText = document.getElementById('typingText');
    const typingCursor = document.getElementById('typingCursor');
    if (!typingText) return;
    const text = "Cho Sanghyeon";
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(() => { if(typingCursor) typingCursor.style.opacity = '0'; }, 2000);
        }
    }
    setTimeout(typeWriter, 1000);
}

function initializeHeroVideo() {
    heroPlayer = new YouTubeBackgroundPlayer('hero-youtube-player', '264Wfi25UOU');
}

function initializeProjects() {
    const grid = document.getElementById('projectsGrid');
    if(!grid) return;
    Object.entries(projectsData).forEach(([id, project]) => {
        grid.appendChild(createProjectCard(id, project));
    });
}

function createProjectCard(id, project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    // Project Type Badge
    const typeBadgeClass = project.is_team_project? 'team' : 'solo';
    const typeIcon = project.is_team_project? '👥' : '👤';
    const typeText = project.is_team_project? `Team of ${project.team_size}` : 'Solo Project';

    // Tech Badges
    const techBadges = project.technologies.slice(0,3).map(tech => {
        let cls = 'tech-badge';
        if(tech.includes('C++') |

| tech.includes('Unreal')) cls += ' expert';
        return `<span class="${cls}">${tech}</span>`;
    }).join('');

    card.innerHTML = `
        <div class="project-video">
            ${project.videoUrl? `<iframe src="${project.videoUrl}?mute=1" loading="lazy"></iframe>` : ''}
        </div>
        <div class="project-info">
            <div class="project-header">
                <h3>${project.title}</h3>
                <p class="project-subtitle">${project.subtitle}</p>
                <div class="project-type-indicator">
                    <div class="project-type-badge ${typeBadgeClass}">
                        <span>${typeIcon}</span><span>${typeText}</span>
                    </div>
                </div>
            </div>
            <p>${project.description.substring(0, 100)}...</p>
            <div class="tech-stack">${techBadges}</div>
            <button class="btn btn--primary project-detail-btn project-action">View Details</button>
        </div>
    `;
    
    card.addEventListener('click', () => openProjectModal(id));
    return card;
}

function initializeModal() {
    if(!projectModal) return;
    modalClose.addEventListener('click', closeProjectModal);
    projectModal.addEventListener('click', (e) => { if(e.target === projectModal) closeProjectModal(); });
    document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeProjectModal(); });
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.getAttribute('data-tab')));
    });
}

function openProjectModal(id) {
    currentProjectId = id;
    const project = projectsData[id];
    document.getElementById('modalTitle').textContent = project.title;
    
    populateOverviewTab(project);
    populateCollaborationTab(project);
    populateTechnicalTab(project);
    populateChallengesTab(project);
    populateTimelineTab(project);
    
    // Tab visibility for solo/team
    const collabTab = document.getElementById('collaborationTab');
    if(collabTab) collabTab.textContent = project.is_team_project? 'Team & Collaboration' : 'Solo Development';

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    switchTab('overview');
}

function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
}

function switchTab(tabId) {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanes.forEach(p => p.classList.remove('active'));
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    const content = document.getElementById(`${tabId}Tab`) |

| document.getElementById(`${tabId}Tab-content`);
    if(content) content.classList.add('active');
}


function populateOverviewTab(project) {
    const downloadSection = document.getElementById('downloadSection');
    
    // Video setup
    const modalVideo = document.getElementById('modalVideo');
    if(project.videoUrl) {
        modalVideo.innerHTML = `<iframe src="${project.videoUrl}" allowfullscreen></iframe>`;
    } else {
        modalVideo.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:white;">No Video Available</div>`;
    }

    document.getElementById('modalDescription').textContent = project.description;
    
    // Role Info
    document.getElementById('roleInfo').innerHTML = `<strong>Role:</strong> ${project.my_role}`;
    
    // Tech Stack
    document.getElementById('modalTechStack').innerHTML = project.technologies.map(t => 
        `<span class="tech-badge ${t.includes('C++')?'expert':''}">${t}</span>`
    ).join('');

    // Buttons (Download + GitHub)
    if (downloadSection) {
        let buttonsHtml = '';

        // 1. GitHub Button (새로운 리다이렉션 버튼)
        if (project.githubUrl) {
            // 보안(noopener noreferrer)과 아이콘 적용
            buttonsHtml += `
                <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn--github" aria-label="View Source Code on GitHub">
                    <svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor" aria-hidden="true" style="display: block;">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0.67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2.27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0.21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    <span>View Code</span>
                </a>
            `;
        }

        // 2. Download Button
        if (project.downloadLink) {
            buttonsHtml += `
                <a href="${project.downloadLink}" target="_blank" class="download-btn">
                    <span>📁</span> <span>Download Demo</span>
                </a>
            `;
        }
        
        downloadSection.innerHTML = buttonsHtml;
    }
}

function populateCollaborationTab(project) {
    const content = document.querySelector('#collaborationTab-content.collaboration-content');
    if(!content) return;
    
    if (project.is_team_project) {
        content.innerHTML = `
            <div class="team-overview">
                <h3>Team Overview</h3>
                <p><strong>Team Size:</strong> ${project.collaboration_details.team_size}</p>
                <p><strong>Role:</strong> ${project.collaboration_details.my_role}</p>
                <p><strong>Dynamics:</strong> ${project.collaboration_details.team_dynamics}</p>
            </div>
            <div class="team-roles">
                <h3>Roles</h3>
                <ul>${project.collaboration_details.team_roles.map(r=>`<li>${r}</li>`).join('')}</ul>
            </div>
        `;
    } else {
        content.innerHTML = `<div class="team-overview"><h3>Solo Project</h3><p>${project.collaboration_details.scope}</p></div>`;
    }
}

function populateTechnicalTab(project) {
    const list = document.getElementById('technicalChallenges');
    if(list) list.innerHTML = project.technical_challenges.map(c => `<li>${c}</li>`).join('');
}

function populateChallengesTab(project) {
    const container = document.querySelector('#challengesTab.challenges-content');
    if(!container) return;
    container.innerHTML = Object.entries(project.troubleshooting).map(([k, v]) => `
        <div class="troubleshooting-card">
            <h4>${k.replace(/_/g,' ')}</h4>
            <div class="problem-solution-grid">
                <div class="problem-section"><h5>Problem</h5><p>${v.problem}</p></div>
                <div class="solution-section"><h5>Solution</h5><p>${v.solution}</p></div>
            </div>
            <div class="result-highlight"><h5>Result</h5><p>${v.result}</p></div>
        </div>
    `).join('');
}

function populateTimelineTab(project) {
    const container = document.querySelector('#timelineTab.timeline-content');
    if(!container) return;
    container.innerHTML = project.development_timeline.phases.map((p, i) => `
        <div class="timeline-item">
            <div class="timeline-marker">${i+1}</div>
            <div class="timeline-content-item">
                <div class="timeline-phase">${p.phase}</div>
                <div class="timeline-duration">${p.duration}</div>
                <div class="timeline-focus">${p.focus}</div>
            </div>
        </div>
    `).join('');
}

function initializeScrollEffects() {
    if (backToTop) {
        backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 300);
        });
    }
}

function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const mailto = `mailto:sprtms9062@gmail.com?subject=Portfolio Contact: ${formData.get('name')}&body=${formData.get('message')} (from ${formData.get('email')})`;
            window.open(mailto);
            form.reset();
        });
    }
}
