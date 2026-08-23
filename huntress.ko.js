// Korean narrative overrides for Huntress are kept separate from the English HTML.
window.HUNTRESS_KO_TRANSLATIONS = [
    {
        "selector": "html",
        "attribute": "lang",
        "values": [
            "ko"
        ]
    },
    {
        "selector": "meta[name=\"description\"]",
        "attribute": "content",
        "values": [
            "Huntress 프로젝트 사례 연구: C++ UI 시스템, 게임플레이 통합, 아키텍처, Git 이력으로 확인한 트러블슈팅 근거."
        ]
    },
    {
        "selector": "title",
        "values": [
            "Huntress · C++ UI 시스템 및 게임플레이 통합"
        ]
    },
    {
        "selector": ".lab-brand",
        "values": [
            "HaXX0rBunny"
        ]
    },
    {
        "selector": ".lab-back-link",
        "values": [
            "포트폴리오로 돌아가기"
        ]
    },
    {
        "selector": ".huntress-hero-copy .section-kicker",
        "values": [
            "C++ 팀 프로젝트 · Alpha Engine"
        ]
    },
    {
        "selector": ".huntress-hero-copy h1",
        "values": [
            "Huntress"
        ]
    },
    {
        "selector": ".huntress-hero-role",
        "values": [
            "UI 시스템 및 게임플레이 통합 프로그래머"
        ]
    },
    {
        "selector": ".huntress-hero-lede",
        "values": [
            "상점·업그레이드 루프를 바람과 중력 기반 전투에 연결한 2D 턴제 포격 전략 게임입니다. 인터페이스 아키텍처, 메뉴와 상점 흐름, 전투 HUD, 버튼 상호작용, 아이템 툴팁, UI 입력과 전투 상태 사이의 연동을 담당했습니다."
        ]
    },
    {
        "selector": ".huntress-hero-actions",
        "attribute": "aria-label",
        "values": [
            "프로젝트 링크"
        ]
    },
    {
        "selector": ".huntress-hero-actions a:nth-child(1)",
        "values": [
            "소스 포크"
        ]
    },
    {
        "selector": ".huntress-hero-actions a:nth-child(2)",
        "values": [
            "개인 브랜치"
        ]
    },
    {
        "selector": ".huntress-hero-actions a:nth-child(3)",
        "values": [
            "Windows 설치 파일"
        ]
    },
    {
        "selector": ".huntress-hero-facts > div:nth-child(1) dt",
        "values": [
            "팀"
        ]
    },
    {
        "selector": ".huntress-hero-facts > div:nth-child(1) dd",
        "values": [
            "4명"
        ]
    },
    {
        "selector": ".huntress-hero-facts > div:nth-child(2) dt",
        "values": [
            "기간"
        ]
    },
    {
        "selector": ".huntress-hero-facts > div:nth-child(2) dd",
        "values": [
            "2024년 8월 27일~10월 9일"
        ]
    },
    {
        "selector": ".huntress-hero-facts > div:nth-child(3) dt",
        "values": [
            "기술 스택"
        ]
    },
    {
        "selector": ".huntress-hero-facts > div:nth-child(3) dd",
        "values": [
            "C++ · Alpha Engine · FMOD"
        ]
    },
    {
        "selector": ".huntress-hero-facts > div:nth-child(4) dt",
        "values": [
            "검증된 이력"
        ]
    },
    {
        "selector": ".huntress-hero-facts > div:nth-child(4) dd",
        "values": [
            "작성 커밋 46개"
        ]
    },
    {
        "selector": ".huntress-video-frame iframe",
        "attribute": "title",
        "values": [
            "Huntress 게임플레이 데모"
        ]
    },
    {
        "selector": ".huntress-media-caption img",
        "attribute": "alt",
        "values": [
            "Huntress 게임 로고"
        ]
    },
    {
        "selector": ".huntress-media-caption p strong",
        "values": [
            "실행 근거"
        ]
    },
    {
        "selector": ".huntress-media-caption p span",
        "values": [
            "기록된 게임플레이 데모입니다. 통합된 게임 동작은 보여 주지만, 통제된 트러블슈팅 비교 자료는 아닙니다."
        ]
    },
    {
        "selector": ".huntress-section-nav",
        "attribute": "aria-label",
        "values": [
            "Huntress 프로젝트 사례 연구 목차"
        ]
    },
    {
        "selector": ".huntress-section-nav a:nth-child(1)",
        "values": [
            "개요"
        ]
    },
    {
        "selector": ".huntress-section-nav a:nth-child(2)",
        "values": [
            "담당 기여"
        ]
    },
    {
        "selector": ".huntress-section-nav a:nth-child(3)",
        "values": [
            "아키텍처"
        ]
    },
    {
        "selector": ".huntress-section-nav a:nth-child(4)",
        "values": [
            "트러블슈팅"
        ]
    },
    {
        "selector": ".huntress-section-nav a:nth-child(5)",
        "values": [
            "검증 자료"
        ]
    },
    {
        "selector": "#overview .huntress-section-heading .section-kicker",
        "values": [
            "01 · 프로젝트 개요"
        ]
    },
    {
        "selector": "#overview .huntress-section-heading h2",
        "values": [
            "두 게임 루프를 연결하는 하나의 인터페이스"
        ]
    },
    {
        "selector": "#overview .huntress-section-heading > p",
        "values": [
            "업그레이드를 구매하는 과정과 턴제 투사체 전투가 번갈아 진행됩니다. 인터페이스는 인벤토리, 플레이어 능력치, 전투 상태, 카메라 입력, 렌더 순서와 항상 동기화되어야 합니다."
        ]
    },
    {
        "selector": ".huntress-overview-grid > article:nth-child(1) > span",
        "values": [
            "플레이어 루프"
        ]
    },
    {
        "selector": ".huntress-overview-grid > article:nth-child(1) h3",
        "values": [
            "상점 → 준비 → 조준 → 발사 → 결과 처리"
        ]
    },
    {
        "selector": ".huntress-flow",
        "attribute": "aria-label",
        "values": [
            "Huntress 게임 루프"
        ]
    },
    {
        "selector": ".huntress-flow strong:nth-of-type(1)",
        "values": [
            "아이템 구매"
        ]
    },
    {
        "selector": ".huntress-flow strong:nth-of-type(2)",
        "values": [
            "전투 진입"
        ]
    },
    {
        "selector": ".huntress-flow strong:nth-of-type(3)",
        "values": [
            "바람 확인"
        ]
    },
    {
        "selector": ".huntress-flow strong:nth-of-type(4)",
        "values": [
            "각도·출력 설정"
        ]
    },
    {
        "selector": ".huntress-flow strong:nth-of-type(5)",
        "values": [
            "발사"
        ]
    },
    {
        "selector": ".huntress-overview-grid > article:nth-child(2) > span",
        "values": [
            "주요 담당 영역"
        ]
    },
    {
        "selector": ".huntress-overview-grid > article:nth-child(2) h3",
        "values": [
            "인터페이스 시스템"
        ]
    },
    {
        "selector": ".huntress-overview-grid > article:nth-child(2) p",
        "values": [
            "메뉴, 상점, 전투 HUD, ESC·조작 안내 오버레이, 버튼, 호버 동작, 툴팁, 아이템 선택 연동을 담당했습니다."
        ]
    },
    {
        "selector": ".huntress-overview-grid > article:nth-child(3) > span",
        "values": [
            "핵심 제약 조건"
        ]
    },
    {
        "selector": ".huntress-overview-grid > article:nth-child(3) h3",
        "values": [
            "공유 실시간 루프"
        ]
    },
    {
        "selector": ".huntress-overview-grid > article:nth-child(3) p",
        "values": [
            "UI와 게임플레이가 하나의 업데이트 루프에서 실행되므로 상태 조건, 입력 중재, 렌더 단계, 객체 수명을 명시적으로 관리해야 합니다."
        ]
    },
    {
        "selector": ".huntress-feature-figure img",
        "attribute": "alt",
        "values": [
            "조준 각도기, 출력 게이지, 체력 바, 게임 필드를 보여 주는 Huntress 전투 UI 튜토리얼"
        ]
    },
    {
        "selector": ".huntress-feature-figure figcaption span",
        "values": [
            "저장소에 추적된 프로젝트 이미지"
        ]
    },
    {
        "selector": ".huntress-feature-figure figcaption strong",
        "values": [
            "게임 화면에 통합된 전투 HUD와 조준 안내"
        ]
    },
    {
        "selector": ".huntress-feature-figure figcaption p",
        "values": [
            "저장소에 포함된 이 자료는 아이템 슬롯, 현재·이전 각도, 이동·출력 게이지, 양측 체력 바가 통합된 HUD 구성을 보여 줍니다."
        ]
    },
    {
        "selector": "#contribution .huntress-section-heading .section-kicker",
        "values": [
            "02 · 역할 및 기여"
        ]
    },
    {
        "selector": "#contribution .huntress-section-heading h2",
        "values": [
            "Git 이력으로 확인된 실제 기여"
        ]
    },
    {
        "selector": "#contribution .huntress-section-heading > p",
        "values": [
            "아래 수치는 공개 작성자 식별자 <code>HaXX0rBunny</code>와 <code>f64cd0f</code> 시점의 <code>main</code>에서 확인한 현재 라인 작성 이력을 기준으로 합니다. 이 집계는 현재 남아 있는 라인만 측정하므로, 수행한 전체 작업량을 의미하지 않습니다."
        ]
    },
    {
        "selector": ".huntress-metric-grid > article:nth-child(1) span",
        "values": [
            "작성 커밋"
        ]
    },
    {
        "selector": ".huntress-metric-grid > article:nth-child(1) small",
        "values": [
            "비병합 32개 · 병합 14개"
        ]
    },
    {
        "selector": ".huntress-metric-grid > article:nth-child(2) span",
        "values": [
            "현재 남아 있는 C++ 라인"
        ]
    },
    {
        "selector": ".huntress-metric-grid > article:nth-child(2) small",
        "values": [
            "main의 34개 파일 기준"
        ]
    },
    {
        "selector": ".huntress-metric-grid > article:nth-child(3) small",
        "values": [
            "472줄 중 349줄"
        ]
    },
    {
        "selector": ".huntress-metric-grid > article:nth-child(4) small",
        "values": [
            "150줄 중 146줄"
        ]
    },
    {
        "selector": ".huntress-contribution-grid > article:nth-child(1) .huntress-panel-label",
        "values": [
            "구현 및 통합"
        ]
    },
    {
        "selector": ".huntress-check-list li:nth-child(1)",
        "values": [
            "메뉴, 상점, 전투 HUD, ESC 메뉴, 조작 안내, 아이템 정보 모듈을 구현했습니다."
        ]
    },
    {
        "selector": ".huntress-check-list li:nth-child(2)",
        "values": [
            "<code>ButtonComp</code> 콜백을 상점 구매 및 전투 아이템 선택 로직과 연결했습니다."
        ]
    },
    {
        "selector": ".huntress-check-list li:nth-child(3)",
        "values": [
            "인터페이스 컴포넌트를 월드 그래픽과 분리해 그리기 순서를 명시적으로 구성했습니다."
        ]
    },
    {
        "selector": ".huntress-check-list li:nth-child(4)",
        "values": [
            "HUD 값을 플레이어·적 HP, 바람, 각도, 이동량, 출력, 골드, 인벤토리 상태에 연동했습니다."
        ]
    },
    {
        "selector": ".huntress-check-list li:nth-child(5)",
        "values": [
            "화면 공간 UI 조작과 월드 공간 조준 입력이 겹치는 문제를 해결했습니다."
        ]
    },
    {
        "selector": ".huntress-check-list li:nth-child(6)",
        "values": [
            "기능 브랜치와 직접 병합을 통해 협업했으며, 원본 해시는 <code>main</code>에서 계속 추적할 수 있습니다."
        ]
    },
    {
        "selector": ".huntress-contribution-grid > article:nth-child(2) .huntress-panel-label",
        "values": [
            "현재 라인 기여 비중"
        ]
    },
    {
        "selector": ".huntress-panel-note",
        "values": [
            "근거: <code>git blame main</code> 명령 결과를 공개 작성자 식별자 <code>HaXX0rBunny</code> 기준으로 집계했습니다."
        ]
    },
    {
        "selector": ".huntress-history-strip > div:nth-child(1) span",
        "values": [
            "원본 저장소 <code>main</code>"
        ]
    },
    {
        "selector": ".huntress-history-strip > div:nth-child(2) span",
        "values": [
            "사용자 포크 <code>main</code>"
        ]
    },
    {
        "selector": ".huntress-history-strip > div:nth-child(3) span",
        "values": [
            "보존된 개인 브랜치"
        ]
    },
    {
        "selector": ".huntress-history-strip > a",
        "values": [
            "포크 열기"
        ]
    },
    {
        "selector": "#architecture .huntress-section-heading .section-kicker",
        "values": [
            "03 · 아키텍처 및 기술적 과제"
        ]
    },
    {
        "selector": "#architecture .huntress-section-heading h2",
        "values": [
            "상태·입력·인터페이스·렌더링의 책임 분리"
        ]
    },
    {
        "selector": "#architecture .huntress-section-heading > p",
        "values": [
            "인터페이스는 단순한 오버레이가 아닙니다. 엔진 업데이트에 참여해 커서 조작을 도메인 이벤트로 변환하고, 전투 데이터를 관찰하며, 텍스트 피드백을 가리지 않도록 월드 렌더링 뒤에 출력됩니다."
        ]
    },
    {
        "selector": ".huntress-architecture-flow",
        "attribute": "aria-label",
        "values": [
            "Huntress UI 아키텍처 흐름"
        ]
    },
    {
        "selector": ".huntress-architecture-flow > div:nth-of-type(1) strong",
        "values": [
            "입력"
        ]
    },
    {
        "selector": ".huntress-architecture-flow > div:nth-of-type(1) small",
        "values": [
            "마우스 · 키보드"
        ]
    },
    {
        "selector": ".huntress-architecture-flow > div:nth-of-type(2) strong",
        "values": [
            "ButtonManager"
        ]
    },
    {
        "selector": ".huntress-architecture-flow > div:nth-of-type(2) small",
        "values": [
            "히트 테스트 · 호버 · 클릭"
        ]
    },
    {
        "selector": ".huntress-architecture-flow > div:nth-of-type(3) strong",
        "values": [
            "UI 모듈"
        ]
    },
    {
        "selector": ".huntress-architecture-flow > div:nth-of-type(3) small",
        "values": [
            "StoreUI · CombatUI · 메뉴"
        ]
    },
    {
        "selector": ".huntress-architecture-flow > div:nth-of-type(4) strong",
        "values": [
            "게임 상태"
        ]
    },
    {
        "selector": ".huntress-architecture-flow > div:nth-of-type(4) small",
        "values": [
            "Inventory · PlayerComp · CombatComp"
        ]
    },
    {
        "selector": ".huntress-architecture-flow > div:nth-of-type(5) strong",
        "values": [
            "렌더 단계"
        ]
    },
    {
        "selector": ".huntress-architecture-flow > div:nth-of-type(5) small",
        "values": [
            "월드 → 인터페이스 → 텍스트"
        ]
    },
    {
        "selector": ".huntress-challenge-grid > article:nth-child(1) span",
        "values": [
            "렌더링 아키텍처"
        ]
    },
    {
        "selector": ".huntress-challenge-grid > article:nth-child(1) h3",
        "values": [
            "명시적인 인터페이스 레이어 순서"
        ]
    },
    {
        "selector": ".huntress-challenge-grid > article:nth-child(1) p",
        "values": [
            "<code>UIComponent</code>를 인터페이스 전용 컴포넌트 매니저로 분리해 월드 그래픽, 인터페이스 스프라이트, 자막이 명시된 순서로 업데이트되도록 했습니다."
        ]
    },
    {
        "selector": ".huntress-challenge-grid > article:nth-child(2) span",
        "values": [
            "입력 아키텍처"
        ]
    },
    {
        "selector": ".huntress-challenge-grid > article:nth-child(2) h3",
        "values": [
            "UI와 조준 입력 중재"
        ]
    },
    {
        "selector": ".huntress-challenge-grid > article:nth-child(2) p",
        "values": [
            "버튼 히트 테스트는 커서 좌표를 화면 공간 상호작용으로 변환하고, 전투 코드는 HUD 영역의 클릭을 조준 입력에서 제외합니다."
        ]
    },
    {
        "selector": ".huntress-challenge-grid > article:nth-child(3) span",
        "values": [
            "상태 통합"
        ]
    },
    {
        "selector": ".huntress-challenge-grid > article:nth-child(3) h3",
        "values": [
            "상점에서 전투로 이어지는 상태 연속성"
        ]
    },
    {
        "selector": ".huntress-challenge-grid > article:nth-child(3) p",
        "values": [
            "UI 콜백이 게임플레이 데이터를 별도로 소비하지 않고 전투 상태에 의도를 전달하도록 구성해 인벤토리, 효과, HUD 피드백이 하나의 경로를 따르도록 했습니다."
        ]
    },
    {
        "selector": ".huntress-challenge-grid > article:nth-child(4) span",
        "values": [
            "객체 수명"
        ]
    },
    {
        "selector": ".huntress-challenge-grid > article:nth-child(4) h3",
        "values": [
            "일시적 툴팁의 소유권 관리"
        ]
    },
    {
        "selector": ".huntress-challenge-grid > article:nth-child(4) p",
        "values": [
            "아이템 정보 객체의 시각 요소는 한 번의 호버 콜백보다 오래 유지되지만 UI 모듈보다는 먼저 종료되므로, 생성·사용·해제 구간을 명시해야 합니다."
        ]
    },
    {
        "selector": ".huntress-architecture-code header div span",
        "values": [
            "코드 구조"
        ]
    },
    {
        "selector": ".huntress-architecture-code header div strong",
        "values": [
            "프레임 업데이트 및 출력 순서"
        ]
    },
    {
        "selector": "#troubleshooting .huntress-section-heading .section-kicker",
        "values": [
            "04 · 트러블슈팅"
        ]
    },
    {
        "selector": "#troubleshooting .huntress-section-heading h2",
        "values": [
            "코드·맥락·커밋으로 추적한 6가지 해결 과정"
        ]
    },
    {
        "selector": "#troubleshooting .huntress-section-heading > p",
        "values": [
            "각 비교는 보존된 Git 객체를 근거로 합니다. 통제된 실행 A/B 캡처나 벤치마크는 보존되지 않았으므로, 근거 유형을 <strong>Git 이력 기반 수정 전·후 코드 비교</strong>로 명시합니다."
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(1) > header > div > p",
        "values": [
            "렌더 순서"
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(1) > header > div > h3",
        "values": [
            "월드와 UI가 동일한 출력 단계를 공유하던 문제"
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(1) .huntress-case-facts > div:nth-child(1) p",
        "values": [
            "월드 그래픽과 인터페이스 스프라이트의 순서를 독립적으로 제어할 수 없었고, 연속된 커밋에는 <code>Modify/Fix UI Draw sequence</code>가 명시되어 있습니다."
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(1) .huntress-case-facts > div:nth-child(2) p",
        "values": [
            "<code>UIComponent</code>가 월드 그래픽과 같은 그래픽 매니저 경로를 사용했고, 프레임에는 월드 그래픽 다음에 자막을 처리하는 순서만 있었습니다."
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(1) .huntress-case-facts > div:nth-child(3) p",
        "values": [
            "<code>InterfaceComponent</code>를 도입하고 UI·버튼 동작을 해당 레이어로 옮긴 뒤, 그래픽과 자막 사이에 인터페이스 매니저 업데이트를 추가했습니다."
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(1) .huntress-case-facts > div:nth-child(4) p",
        "values": [
            "코드에 월드 → 인터페이스 → 텍스트 순서가 명시되었습니다. 대응되는 실행 화면 쌍은 보존되지 않았습니다."
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(1) .huntress-code-compare > div:nth-child(1) > span",
        "values": [
            "수정 전 · <code>fffb2b1</code>"
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(1) .huntress-code-compare > div:nth-child(2) > span",
        "values": [
            "수정 후 · <code>3a05019</code>"
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(1) > footer > span",
        "values": [
            "Git 이력 기반 수정 전·후 코드 비교"
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(2) > header > div > p",
        "values": [
            "버튼 히트 테스트"
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(2) > header > div > h3",
        "values": [
            "호버 피드백 때문에 보이는 버튼이 클릭되지 않던 문제"
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(2) .huntress-case-facts > div:nth-child(1) p",
        "values": [
            "버튼이 호버 시 알파 값 <code>0.7</code>로 바뀐 뒤, 화면에는 보이지만 자체 클릭 판정을 통과하지 못했습니다."
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(2) .huntress-case-facts > div:nth-child(2) p",
        "values": [
            "히트 테스트가 알파 값이 정확히 <code>1.0</code>이 아닌 모든 요소를 비활성으로 처리해 숨김·비활성·호버 피드백 상태를 구분하지 못했습니다."
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(2) .huntress-case-facts > div:nth-child(3) p",
        "values": [
            "완전히 투명한 UI 요소만 제외하고, 그 외에는 일반적인 사각형 영역 판정을 수행하도록 수정했습니다."
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(2) .huntress-case-facts > div:nth-child(4) p",
        "values": [
            "호버 상태의 버튼은 계속 클릭할 수 있고, 알파 값이 <code>0</code>인 컨트롤은 상호작용 경로에서 제외됩니다."
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(2) .huntress-code-compare > div:nth-child(1) > span",
        "values": [
            "수정 전"
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(2) .huntress-code-compare > div:nth-child(2) > span",
        "values": [
            "수정 후"
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(2) > footer > span",
        "values": [
            "Git 이력 기반 수정 전·후 코드 비교"
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(3) > header > div > p",
        "values": [
            "입력 중재"
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(3) > header > div > h3",
        "values": [
            "HUD 클릭이 월드 조준 상태까지 변경하던 문제"
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(3) .huntress-case-facts > div:nth-child(1) p",
        "values": [
            "화면 하단의 아이템이나 HUD 컨트롤을 클릭하면 <code>CombatComp</code>의 좌클릭 조준 경로도 함께 전환될 수 있었습니다."
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(3) .huntress-case-facts > div:nth-child(2) p",
        "values": [
            "UI와 월드 입력이 화면 영역 경계 없이 동일한 마우스 왼쪽 버튼 트리거를 함께 소비했습니다."
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(3) .huntress-case-facts > div:nth-child(3) p",
        "values": [
            "트리거를 읽기 전에 커서 Y 좌표 경계로 조준 상태 전환을 제한했습니다."
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(3) .huntress-case-facts > div:nth-child(4) p",
        "values": [
            "경계 아래 HUD 클릭은 더 이상 월드 조준 상태 전환 경로로 들어가지 않습니다."
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(3) .huntress-code-compare > div:nth-child(1) > span",
        "values": [
            "수정 전"
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(3) .huntress-code-compare > div:nth-child(2) > span",
        "values": [
            "수정 후"
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(3) > footer > span",
        "values": [
            "Git 이력 기반 수정 전·후 코드 비교"
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(4) > header > div > p",
        "values": [
            "HUD 데이터 바인딩"
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(4) > header > div > h3",
        "values": [
            "적 체력 계산에 플레이어의 최대 HP를 사용하던 문제"
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(4) .huntress-case-facts > div:nth-child(1) p",
        "values": [
            "플레이어와 적의 최대 체력이 다를 때 적 체력 바의 정규화된 높이와 기준 위치가 잘못 표시되었습니다."
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(4) .huntress-case-facts > div:nth-child(2) p",
        "values": [
            "크기와 위치 계산식 모두에서 적의 현재 HP를 <code>playerData-&gt;maxLife</code>로 나누고 있었습니다."
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(4) .huntress-case-facts > div:nth-child(3) p",
        "values": [
            "게이지 비율을 <code>enemyData-&gt;maxLife</code>에 바인딩하고, 같은 비율을 크기와 기준 위치 계산에 재사용했습니다."
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(4) .huntress-case-facts > div:nth-child(4) p",
        "values": [
            "적 게이지가 플레이어 기준 상대값이 아니라 적 자신의 체력 범위를 표현하게 되었습니다."
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(4) .huntress-code-compare > div:nth-child(1) > span",
        "values": [
            "수정 전"
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(4) .huntress-code-compare > div:nth-child(2) > span",
        "values": [
            "수정 후"
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(4) > footer > span",
        "values": [
            "Git 이력 기반 수정 전·후 코드 비교"
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(5) > header > div > p",
        "values": [
            "상태 의존 객체 수명"
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(5) > header > div > h3",
        "values": [
            "전투 밖에서 전투 객체를 역참조하던 HUD 문제"
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(5) .huntress-case-facts > div:nth-child(1) p",
        "values": [
            "해당 커밋은 예외 처리 수정을 기록합니다. 게임이 상점 또는 전환 상태일 수 있는데도 바람, 각도, 게이지 업데이트가 실행되었습니다."
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(5) .huntress-case-facts > div:nth-child(2) p",
        "values": [
            "상태에 의존하는 <code>player</code>, <code>enemy</code>, <code>directionArrow</code> 컴포넌트를 전투 상태 검사 없이 역참조했습니다."
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(5) .huntress-case-facts > div:nth-child(3) p",
        "values": [
            "전투 전용 핵심 HUD 업데이트를 <code>state == COMBAT</code> 조건 안으로 이동했습니다."
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(5) .huntress-case-facts > div:nth-child(4) p",
        "values": [
            "잘못된 역참조가 발생할 수 있는 범위를 줄였습니다. 이 커밋만으로 완전한 널 포인터 안전성을 입증할 수 없으며, 보존된 크래시 추적 기록도 없습니다."
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(5) .huntress-code-compare > div:nth-child(1) > span",
        "values": [
            "수정 전"
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(5) .huntress-code-compare > div:nth-child(2) > span",
        "values": [
            "수정 후"
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(5) > footer > span",
        "values": [
            "Git 이력 기반 수정 전·후 코드 비교 · 부분적 안전성 개선"
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(6) > header > div > p",
        "values": [
            "툴팁 객체 수명"
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(6) > header > div > h3",
        "values": [
            "할당 전에 ItemInfo 포인터를 사용하던 문제"
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(6) .huntress-case-facts > div:nth-child(1) p",
        "values": [
            "이전 리비전은 툴팁 포인터 4개를 null로 초기화한 직후 해당 포인터를 통해 <code>CreateItemInfo()</code>를 호출했습니다."
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(6) .huntress-case-facts > div:nth-child(2) p",
        "values": [
            "툴팁 기능을 추가하면서 사용 지점은 생겼지만 그에 대응하는 할당·해제 구간이 없었습니다."
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(6) .huntress-case-facts > div:nth-child(3) p",
        "values": [
            "설정 전에 객체 4개를 모두 할당하고 <code>ExitCombatUI()</code>에서 삭제하도록 수정했습니다."
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(6) .huntress-case-facts > div:nth-child(4) p",
        "values": [
            "전투 툴팁 배열에 최소한의 생성·사용·해제 수명 주기가 갖춰졌습니다. 실행 중 발생한 크래시 로그는 보존되지 않았습니다."
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(6) .huntress-code-compare > div:nth-child(1) > span",
        "values": [
            "수정 전 · <code>8713369</code>"
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(6) .huntress-code-compare > div:nth-child(2) > span",
        "values": [
            "수정 후 · <code>95d8772</code>"
        ]
    },
    {
        "selector": ".huntress-trouble-card:nth-child(6) > footer > span",
        "values": [
            "Git 이력 기반 수정 전·후 코드 비교"
        ]
    },
    {
        "selector": "#evidence .huntress-section-heading .section-kicker",
        "values": [
            "05 · 시각 자료 및 소스 근거"
        ]
    },
    {
        "selector": "#evidence .huntress-section-heading h2",
        "values": [
            "저장소로 확인할 수 있는 것과 확인할 수 없는 것"
        ]
    },
    {
        "selector": "#evidence .huntress-section-heading > p",
        "values": [
            "소스, 커밋 해시, 저장소에 추적된 튜토리얼 프레임, 현재 게임플레이 영상은 보존되어 있습니다. 통제된 부모·수정 커밋 실행 캡처와 성능 벤치마크는 보존되지 않았습니다."
        ]
    },
    {
        "selector": ".huntress-visual-grid > figure:nth-child(1) img",
        "attribute": "alt",
        "values": [
            "Huntress 인게임 UI 튜토리얼 도입 화면"
        ]
    },
    {
        "selector": ".huntress-visual-grid > figure:nth-child(1) figcaption strong",
        "values": [
            "통합 전투 UI 구성"
        ]
    },
    {
        "selector": ".huntress-visual-grid > figure:nth-child(1) figcaption span",
        "values": [
            "저장소에 추적된 튜토리얼 프레임입니다."
        ]
    },
    {
        "selector": ".huntress-visual-grid > figure:nth-child(2) img",
        "attribute": "alt",
        "values": [
            "적 체력 게이지를 보여 주는 Huntress 튜토리얼 화면"
        ]
    },
    {
        "selector": ".huntress-visual-grid > figure:nth-child(2) figcaption strong",
        "values": [
            "적 HP 표시"
        ]
    },
    {
        "selector": ".huntress-visual-grid > figure:nth-child(2) figcaption span",
        "values": [
            "HP 바인딩 수정의 영향을 받는 게이지를 보여 주는 저장소 추적 프레임입니다."
        ]
    },
    {
        "selector": ".huntress-visual-grid > figure:nth-child(3) img",
        "attribute": "alt",
        "values": [
            "Huntress 상점 배경 아트"
        ]
    },
    {
        "selector": ".huntress-visual-grid > figure:nth-child(3) figcaption strong",
        "values": [
            "상점 인터페이스 원본 에셋"
        ]
    },
    {
        "selector": ".huntress-visual-grid > figure:nth-child(3) figcaption span",
        "values": [
            "상점 루프에 사용된 저장소 에셋이며, 실행 화면 스크린샷은 아닙니다."
        ]
    },
    {
        "selector": ".huntress-evidence-grid > article:nth-child(1) > span",
        "values": [
            "검증됨"
        ]
    },
    {
        "selector": ".huntress-evidence-grid > article:nth-child(1) h3",
        "values": [
            "소스 및 작성 이력"
        ]
    },
    {
        "selector": ".huntress-evidence-grid > article:nth-child(1) li:nth-child(1)",
        "values": [
            "사용자 포크와 원본 저장소 <code>main</code>이 <code>f64cd0f</code>를 공유합니다."
        ]
    },
    {
        "selector": ".huntress-evidence-grid > article:nth-child(1) li:nth-child(2)",
        "values": [
            "HaXX0rBunny가 작성한 커밋 46개를 <code>main</code>에서 계속 추적할 수 있습니다."
        ]
    },
    {
        "selector": ".huntress-evidence-grid > article:nth-child(1) li:nth-child(3)",
        "values": [
            "개인 브랜치 <code>sanghyeon</code>이 사용자 포크에 보존되어 있습니다."
        ]
    },
    {
        "selector": ".huntress-evidence-grid > article:nth-child(1) li:nth-child(4)",
        "values": [
            "현재 라인의 작성자 추적 결과가 명시한 UI 시스템 기여 범위를 뒷받침합니다."
        ]
    },
    {
        "selector": ".huntress-evidence-grid > article:nth-child(2) > span",
        "values": [
            "검증됨"
        ]
    },
    {
        "selector": ".huntress-evidence-grid > article:nth-child(2) h3",
        "values": [
            "실행 및 시각 자료"
        ]
    },
    {
        "selector": ".huntress-evidence-grid > article:nth-child(2) li:nth-child(1)",
        "values": [
            "공개 게임플레이 영상에서 통합된 게임 동작을 확인할 수 있습니다."
        ]
    },
    {
        "selector": ".huntress-evidence-grid > article:nth-child(2) li:nth-child(2)",
        "values": [
            "저장소에 추적된 튜토리얼 프레임에서 HUD, 조준 안내, 체력 표시를 확인할 수 있습니다."
        ]
    },
    {
        "selector": ".huntress-evidence-grid > article:nth-child(2) li:nth-child(3)",
        "values": [
            "별도로 보존한 Windows 설치 파일이 이 포트폴리오에 연결되어 있습니다."
        ]
    },
    {
        "selector": ".huntress-evidence-grid > article:nth-child(3) > span",
        "values": [
            "보존되지 않음"
        ]
    },
    {
        "selector": ".huntress-evidence-grid > article:nth-child(3) h3",
        "values": [
            "통제된 비교 자료"
        ]
    },
    {
        "selector": ".huntress-evidence-grid > article:nth-child(3) li:nth-child(1)",
        "values": [
            "특정 커밋에 연결된 실행 수정 전·후 스크린샷이나 크래시 로그가 없습니다."
        ]
    },
    {
        "selector": ".huntress-evidence-grid > article:nth-child(3) li:nth-child(2)",
        "values": [
            "벤치마크 CSV, 프로파일러 캡처, 근거로 뒷받침되는 개선율이 없습니다."
        ]
    },
    {
        "selector": ".huntress-evidence-grid > article:nth-child(3) li:nth-child(3)",
        "values": [
            "GitHub 릴리스·태그가 없고, 소스 저장소에 커밋된 실행 파일도 없습니다."
        ]
    },
    {
        "selector": ".huntress-evidence-grid > article:nth-child(4) > span",
        "values": [
            "확인된 잔여 위험"
        ]
    },
    {
        "selector": ".huntress-evidence-grid > article:nth-child(4) h3",
        "values": [
            "상점 툴팁 콜백의 객체 수명"
        ]
    },
    {
        "selector": ".huntress-evidence-grid > article:nth-child(4) p",
        "values": [
            "<code>StoreUI::CreateStoreItem()</code>은 지역 <code>StoreItem</code>을 <code>vector</code>에 복사하기 전에 호버 콜백에서 참조로 캡처합니다. 따라서 이 페이지는 모든 UI 객체 수명 문제가 해결되었다고 주장하지 않습니다."
        ]
    },
    {
        "selector": ".huntress-repro-note > span",
        "values": [
            "향후 시각적 A/B 비교를 위한 재현 계획"
        ]
    },
    {
        "selector": ".huntress-repro-note > p",
        "values": [
            "부모 커밋과 수정 커밋을 각각 분리한 <code>worktree</code>에서 빌드하고, 동일한 저장 파일·레벨과 1600×900 뷰포트로 호버 상태의 스킬 클릭, HUD와 조준 입력 충돌, 서로 다른 플레이어·적 최대 HP, CombatUI 툴팁 초기화를 캡처합니다. 이 통제된 실행 자료를 확보하기 전까지 위 6개 사례는 코드 변경 내역만을 근거로 제시합니다."
        ]
    },
    {
        "selector": ".site-footer-content > span",
        "values": [
            "Huntress · C++ UI 시스템 및 게임플레이 통합"
        ]
    },
    {
        "selector": ".site-footer-content > a",
        "values": [
            "포트폴리오"
        ]
    },
    {
        "selector": ".site-footer-content > strong",
        "values": [
            "HaXX0rBunny"
        ]
    },
    {
        "selector": ".huntress-case-facts > div:nth-child(1) > span",
        "values": [
            "증상",
            "증상",
            "증상",
            "증상",
            "증상",
            "증상"
        ]
    },
    {
        "selector": ".huntress-case-facts > div:nth-child(2) > span",
        "values": [
            "원인",
            "원인",
            "원인",
            "원인",
            "원인",
            "원인"
        ]
    },
    {
        "selector": ".huntress-case-facts > div:nth-child(3) > span",
        "values": [
            "해결",
            "해결",
            "해결",
            "해결",
            "해결",
            "해결"
        ]
    },
    {
        "selector": ".huntress-case-facts > div:nth-child(4) > span",
        "values": [
            "결과",
            "결과",
            "결과",
            "결과",
            "결과",
            "결과"
        ]
    }
];
