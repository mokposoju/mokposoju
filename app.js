// 기업 한눈에 분석하기 - 메인 애플리케이션 로직

const STORAGE_KEY_WATCHLIST = "vibe_company_analyzer_watchlist_v1";

// 상태 관리
let selectedCategory = "대형주";
let currentCompanyCode = null;
let watchlistCodes = loadWatchlist();

// DOM 요소 참조
const categoryTabs = document.querySelectorAll(".category-tab");
const categoryDescIcon = document.getElementById("categoryDescIcon");
const categoryDescText = document.getElementById("categoryDescText");

const analyzeBtn = document.getElementById("analyzeBtn");
const reRecommendBtn = document.getElementById("reRecommendBtn");

const emptyStateSection = document.getElementById("emptyStateSection");
const emptyWatchlistAlert = document.getElementById("emptyWatchlistAlert");
const resultContainer = document.getElementById("resultContainer");

const heroCategoryBadges = document.getElementById("heroCategoryBadges");
const toggleFavoriteBtn = document.getElementById("toggleFavoriteBtn");
const heroRecommendationLabel = document.getElementById("heroRecommendationLabel");
const companyNameTitle = document.getElementById("companyNameTitle");
const companySubInfo = document.getElementById("companySubInfo");

const companySummary = document.getElementById("companySummary");
const revenueTrendList = document.getElementById("revenueTrendList");
const opProfitTrendList = document.getElementById("opProfitTrendList");
const metricRoe = document.getElementById("metricRoe");
const metricOpMargin = document.getElementById("metricOpMargin");
const metricDebtRatio = document.getElementById("metricDebtRatio");
const strengthsList = document.getElementById("strengthsList");
const risksList = document.getElementById("risksList");
const investmentPointText = document.getElementById("investmentPointText");

const footerSource = document.getElementById("footerSource");
const footerBaseDate = document.getElementById("footerBaseDate");

// 관심종목 모달 관련 DOM
const watchlistCountBadge = document.getElementById("watchlistCountBadge");
const openWatchlistBtn = document.getElementById("openWatchlistBtn");
const emptyWatchlistOpenBtn = document.getElementById("emptyWatchlistOpenBtn");
const watchlistModal = document.getElementById("watchlistModal");
const closeWatchlistBtn = document.getElementById("closeWatchlistBtn");
const saveWatchlistBtn = document.getElementById("saveWatchlistBtn");
const watchlistGrid = document.getElementById("watchlistGrid");
const modalSelectedCount = document.getElementById("modalSelectedCount");
const selectAllWatchlistBtn = document.getElementById("selectAllWatchlistBtn");
const resetDefaultWatchlistBtn = document.getElementById("resetDefaultWatchlistBtn");
const clearAllWatchlistBtn = document.getElementById("clearAllWatchlistBtn");

// 1. 관심종목 로컬스토리지 로드 및 저장
function loadWatchlist() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_WATCHLIST);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("관심종목 로드 중 오류:", e);
  }
  return [...DEFAULT_WATCHLIST];
}

function saveWatchlist() {
  try {
    localStorage.setItem(STORAGE_KEY_WATCHLIST, JSON.stringify(watchlistCodes));
  } catch (e) {
    console.warn("관심종목 저장 중 오류:", e);
  }
  updateWatchlistCountUI();
}

function updateWatchlistCountUI() {
  watchlistCountBadge.textContent = watchlistCodes.length;
  modalSelectedCount.textContent = `선택됨: ${watchlistCodes.length} / ${COMPANIES_DATA.length}개`;
}

// 2. 데이터 원칙: 값이 없거나 null이면 "데이터 확인 필요" 배지 반환
function formatValueOrNeedsCheck(val) {
  if (val === null || val === undefined || String(val).trim() === "") {
    return `<span class="needs-check-badge">데이터 확인 필요</span>`;
  }
  return String(val);
}

// 3. 선택한 유형에 맞는 후보 기업 풀 필터링
function getCandidatePool(category) {
  if (category === "관심종목") {
    return COMPANIES_DATA.filter((item) => watchlistCodes.includes(item.code));
  }
  return COMPANIES_DATA.filter(
    (item) => Array.isArray(item.categories) && item.categories.includes(category)
  );
}

// 4. 랜덤 기업 1곳 추첨 (다시 추천 시 직전 종목 제외)
function pickRandomCompany(category, excludeCode = null) {
  const pool = getCandidatePool(category);
  if (pool.length === 0) {
    return null;
  }
  if (pool.length === 1) {
    return pool[0];
  }
  const filteredPool = excludeCode
    ? pool.filter((item) => item.code !== excludeCode)
    : pool;
  const targetPool = filteredPool.length > 0 ? filteredPool : pool;
  const randomIndex = Math.floor(Math.random() * targetPool.length);
  return targetPool[randomIndex];
}

// 5. 최근 3년 매출/영업이익 추이 렌더링 함수
function renderTrendChart(container, items, isOperatingProfit = false) {
  if (!Array.isArray(items) || items.length === 0) {
    container.innerHTML = `<div class="needs-check-badge">데이터 확인 필요</div>`;
    return;
  }

  // 유효한 수치들의 절대값 최대치를 기준으로 막대 길이 산출
  const validRawValues = items
    .map((d) => (typeof d.raw === "number" && !isNaN(d.raw) ? Math.abs(d.raw) : 0))
    .filter((v) => v > 0);
  const maxAbs = validRawValues.length > 0 ? Math.max(...validRawValues) : 1;

  container.innerHTML = items
    .map((entry) => {
      const yearLabel = entry.year ? `${entry.year}년` : "-";
      const hasData =
        entry.value !== null &&
        entry.value !== undefined &&
        String(entry.value).trim() !== "" &&
        typeof entry.raw === "number";

      if (!hasData) {
        return `
          <div class="trend-row">
            <span class="trend-year">${yearLabel}</span>
            <div class="trend-bar-track">
              <div class="trend-bar-fill bar-unknown"></div>
            </div>
            <span class="trend-value"><span class="needs-check-badge">데이터 확인 필요</span></span>
          </div>
        `;
      }

      const ratio = Math.max(10, Math.round((Math.abs(entry.raw) / maxAbs) * 100));
      const isNegative = entry.raw < 0;
      let barClass = "trend-bar-fill";
      if (isOperatingProfit) {
        barClass += isNegative ? " profit-negative" : " profit-positive";
      }

      return `
        <div class="trend-row">
          <span class="trend-year">${yearLabel}</span>
          <div class="trend-bar-track">
            <div class="${barClass}" style="width: ${ratio}%"></div>
          </div>
          <span class="trend-value ${isNegative ? "negative" : ""}">${entry.value}</span>
        </div>
      `;
    })
    .join("");
}

// 6. 추천된 기업 화면 렌더링
function renderCompanyAnalysis(company) {
  if (!company) {
    emptyStateSection.classList.add("hidden");
    resultContainer.classList.add("hidden");
    emptyWatchlistAlert.classList.remove("hidden");
    reRecommendBtn.classList.add("hidden");
    return;
  }

  currentCompanyCode = company.code;

  emptyStateSection.classList.add("hidden");
  emptyWatchlistAlert.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  reRecommendBtn.classList.remove("hidden");

  // 히어로 카드 애니메이션 재실행
  const heroCard = document.querySelector(".hero-company-card");
  if (heroCard) {
    heroCard.style.animation = "none";
    void heroCard.offsetWidth;
    heroCard.style.animation = "";
  }

  // 상단 유형 배지 표시
  const categoryBadgesHtml = (company.categories || [])
    .map((cat) => {
      const isMatched = cat === selectedCategory;
      return `<span class="type-badge ${isMatched ? "match" : ""}">${CATEGORY_INFO[cat]?.icon || ""} ${cat}</span>`;
    })
    .join("");
  const watchlistBadgeHtml = watchlistCodes.includes(company.code)
    ? `<span class="type-badge ${selectedCategory === "관심종목" ? "match" : ""}">⭐ 관심종목</span>`
    : "";
  heroCategoryBadges.innerHTML = categoryBadgesHtml + watchlistBadgeHtml;

  // 관심종목 토글 버튼 업데이트
  updateHeroFavoriteButton();

  // 중앙 기업명 및 종목코드·업종 표시 (예: "삼성전자 (005930) · 반도체")
  const catInfo = CATEGORY_INFO[selectedCategory];
  heroRecommendationLabel.textContent = `${catInfo ? catInfo.icon : "🎯"} ${selectedCategory} 랜덤 추천 결과`;
  companyNameTitle.textContent = company.name;
  companySubInfo.textContent = `${company.name} (${company.code}) · ${company.sector || "데이터 확인 필요"}`;

  // (1) 한 줄 사업 요약
  companySummary.innerHTML = formatValueOrNeedsCheck(company.summary);

  // (2) 최근 3년 매출 추이
  renderTrendChart(revenueTrendList, company.financials?.revenue, false);

  // (3) 최근 3년 영업이익 추이
  renderTrendChart(opProfitTrendList, company.financials?.operatingProfit, true);

  // (4) ROE, 영업이익률, 부채비율
  const metrics = company.financials?.metrics || {};
  metricRoe.innerHTML = formatValueOrNeedsCheck(metrics.roe);
  metricOpMargin.innerHTML = formatValueOrNeedsCheck(metrics.operatingMargin);
  metricDebtRatio.innerHTML = formatValueOrNeedsCheck(metrics.debtRatio);

  // (5) 강점 2개
  const strengths = company.analysis?.strengths || [];
  if (strengths.length > 0) {
    strengthsList.innerHTML = strengths
      .slice(0, 2)
      .map((s) => `<li>${formatValueOrNeedsCheck(s)}</li>`)
      .join("");
  } else {
    strengthsList.innerHTML = `<li><span class="needs-check-badge">데이터 확인 필요</span></li>`;
  }

  // (6) 리스크 2개
  const risks = company.analysis?.risks || [];
  if (risks.length > 0) {
    risksList.innerHTML = risks
      .slice(0, 2)
      .map((r) => `<li>${formatValueOrNeedsCheck(r)}</li>`)
      .join("");
  } else {
    risksList.innerHTML = `<li><span class="needs-check-badge">데이터 확인 필요</span></li>`;
  }

  // (7) 투자 포인트 1개
  investmentPointText.innerHTML = formatValueOrNeedsCheck(company.analysis?.investmentPoint);

  // (8) 하단 데이터 출처 및 기준일 업데이트
  footerSource.textContent =
    company.meta?.source || "금융감독원 전자공시시스템(DART) 연결재무제표 및 KRX";
  footerBaseDate.textContent =
    company.meta?.baseDate || "2022~2024년 연간 결산 기준";
}

function updateHeroFavoriteButton() {
  if (!currentCompanyCode) return;
  const isFav = watchlistCodes.includes(currentCompanyCode);
  if (isFav) {
    toggleFavoriteBtn.textContent = "★ 관심종목 등록됨";
    toggleFavoriteBtn.classList.add("active");
  } else {
    toggleFavoriteBtn.textContent = "☆ 관심종목 추가";
    toggleFavoriteBtn.classList.remove("active");
  }
}

// 7. 유형 탭 전환 이벤트
categoryTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const newCategory = tab.getAttribute("data-category");
    if (!newCategory) return;

    selectedCategory = newCategory;

    categoryTabs.forEach((t) => {
      const isSelected = t === tab;
      t.classList.toggle("active", isSelected);
      t.setAttribute("aria-checked", isSelected ? "true" : "false");
    });

    const info = CATEGORY_INFO[selectedCategory];
    if (info) {
      categoryDescIcon.textContent = info.icon;
      categoryDescText.textContent = info.desc;
    }
  });
});

// 8. "기업 분석!" 및 "다시 추천" 버튼 이벤트
analyzeBtn.addEventListener("click", () => {
  const picked = pickRandomCompany(selectedCategory, currentCompanyCode);
  renderCompanyAnalysis(picked);
});

reRecommendBtn.addEventListener("click", () => {
  const picked = pickRandomCompany(selectedCategory, currentCompanyCode);
  renderCompanyAnalysis(picked);
});

// 히어로 카드 내 관심종목 즉시 추가/해제 버튼
toggleFavoriteBtn.addEventListener("click", () => {
  if (!currentCompanyCode) return;
  if (watchlistCodes.includes(currentCompanyCode)) {
    watchlistCodes = watchlistCodes.filter((c) => c !== currentCompanyCode);
  } else {
    watchlistCodes.push(currentCompanyCode);
  }
  saveWatchlist();
  updateHeroFavoriteButton();

  // 현재 표시 중인 기업의 배지도 즉시 갱신
  const currentCompany = COMPANIES_DATA.find((c) => c.code === currentCompanyCode);
  if (currentCompany) {
    renderCompanyAnalysis(currentCompany);
  }
});

// 9. 관심종목 모달 렌더링 및 제어
function renderWatchlistModalItems() {
  watchlistGrid.innerHTML = COMPANIES_DATA.map((company) => {
    const isSelected = watchlistCodes.includes(company.code);
    return `
      <div class="watchlist-item ${isSelected ? "selected" : ""}" data-code="${company.code}">
        <span class="watchlist-star">${isSelected ? "⭐" : "☆"}</span>
        <div class="watchlist-info">
          <span class="watchlist-name">${company.name} <small>(${company.code})</small></span>
          <span class="watchlist-meta">${company.sector} · ${company.categories.join(", ")}</span>
        </div>
      </div>
    `;
  }).join("");

  watchlistGrid.querySelectorAll(".watchlist-item").forEach((el) => {
    el.addEventListener("click", () => {
      const code = el.getAttribute("data-code");
      if (!code) return;
      if (watchlistCodes.includes(code)) {
        watchlistCodes = watchlistCodes.filter((c) => c !== code);
      } else {
        watchlistCodes.push(code);
      }
      saveWatchlist();
      renderWatchlistModalItems();
      if (currentCompanyCode) {
        updateHeroFavoriteButton();
      }
    });
  });
}

function openWatchlistModal() {
  renderWatchlistModalItems();
  updateWatchlistCountUI();
  watchlistModal.classList.remove("hidden");
}

function closeWatchlistModal() {
  watchlistModal.classList.add("hidden");
  // 만약 관심종목 탭이 선택되어 있고 방금 종목을 추가했다면 경고창 숨김 처리
  if (selectedCategory === "관심종목" && watchlistCodes.length > 0 && !emptyWatchlistAlert.classList.contains("hidden")) {
    const picked = pickRandomCompany("관심종목");
    renderCompanyAnalysis(picked);
  }
}

openWatchlistBtn.addEventListener("click", openWatchlistModal);
emptyWatchlistOpenBtn.addEventListener("click", openWatchlistModal);
closeWatchlistBtn.addEventListener("click", closeWatchlistModal);
saveWatchlistBtn.addEventListener("click", closeWatchlistModal);

watchlistModal.addEventListener("click", (e) => {
  if (e.target === watchlistModal) {
    closeWatchlistModal();
  }
});

selectAllWatchlistBtn.addEventListener("click", () => {
  watchlistCodes = COMPANIES_DATA.map((c) => c.code);
  saveWatchlist();
  renderWatchlistModalItems();
});

resetDefaultWatchlistBtn.addEventListener("click", () => {
  watchlistCodes = [...DEFAULT_WATCHLIST];
  saveWatchlist();
  renderWatchlistModalItems();
});

clearAllWatchlistBtn.addEventListener("click", () => {
  watchlistCodes = [];
  saveWatchlist();
  renderWatchlistModalItems();
});

// 초기 UI 세팅
updateWatchlistCountUI();
