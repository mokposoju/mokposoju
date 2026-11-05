// 국내 상장기업 20개 MVP 데이터셋
// 원칙: 확인된 공시/컨센서스 수치만 수록하며, 업종 특성(금융/보험 회계기준 차이 등)이나
// 단일 기준으로 확정하기 어려운 지표는 임의 생성하지 않고 null로 두어 화면에 "데이터 확인 필요"로 표시합니다.

const CATEGORY_INFO = {
  "대형주": {
    label: "대형주",
    icon: "🏛️",
    desc: "국내 증시 시가총액 상위권을 차지하며 산업 대표성과 시장 지배력을 갖춘 종목 중에서 추천합니다."
  },
  "성장주": {
    label: "성장주",
    icon: "🚀",
    desc: "최근 매출액 또는 영업이익 성장성이 두드러지거나 신시장 확장이 가파른 종목 중에서 추천합니다."
  },
  "가치주": {
    label: "가치주",
    icon: "💎",
    desc: "PER, PBR 등 밸류에이션 지표가 자산가치·이익 대비 상대적으로 저평가된 종목 중에서 추천합니다."
  },
  "배당주": {
    label: "배당주",
    icon: "💰",
    desc: "배당수익률 또는 주주환원(배당 성장·자사주 소각 등) 매력도가 높은 종목 중에서 추천합니다."
  },
  "관심종목": {
    label: "관심종목",
    icon: "⭐",
    desc: "사용자가 미리 등록한 관심종목(최대 20개 MVP 종목) 목록 중에서 랜덤으로 추천합니다."
  }
};

// 기본 관심종목 초기값 (첫 방문 시 바로 테스트 가능하도록 대표 6개 종목 기본 등록)
const DEFAULT_WATCHLIST = ["005930", "000660", "005380", "003230", "105560", "259960"];

const COMPANIES_DATA = [
  {
    code: "005930",
    name: "삼성전자",
    sector: "반도체",
    categories: ["대형주", "배당주"],
    summary: "메모리 반도체(DRAM·NAND) 세계 1위이자 스마트폰·가전·파운드리를 아우르는 글로벌 종합 IT 기업",
    financials: {
      revenue: [
        { year: "2022", value: "302.2조 원", raw: 302.2 },
        { year: "2023", value: "258.9조 원", raw: 258.9 },
        { year: "2024", value: "300.9조 원", raw: 300.9 }
      ],
      operatingProfit: [
        { year: "2022", value: "43.4조 원", raw: 43.4 },
        { year: "2023", value: "6.6조 원", raw: 6.6 },
        { year: "2024", value: "32.7조 원", raw: 32.7 }
      ],
      metrics: {
        roe: "9.0%",
        operatingMargin: "10.9%",
        debtRatio: "27.9%"
      }
    },
    analysis: {
      strengths: [
        "글로벌 메모리 반도체 시장 1위 지배력과 대규모 설비투자(CAPEX) 여력",
        "반도체(DS)·모바일(MX)·가전·디스플레이로 다각화된 사업 포트폴리오와 탄탄한 재무구조"
      ],
      risks: [
        "AI 가속기용 고대역폭메모리(HBM) 선두권 경쟁 심화 및 파운드리 수율·가동률 과제",
        "글로벌 스마트폰·PC 등 레거시 IT 기기 수요 둔화 시 메모리 가격 변동성 노출"
      ],
      investmentPoint: "차세대 HBM 공급 확대 속도 및 범용 메모리 업황 사이클 회복 강도가 핵심 모멘텀"
    },
    meta: {
      source: "금융감독원 전자공시시스템(DART) 연결재무제표 및 KRX",
      baseDate: "2022~2024년 연간 결산 기준"
    }
  },
  {
    code: "000660",
    name: "SK하이닉스",
    sector: "반도체",
    categories: ["대형주", "성장주"],
    summary: "AI 서버용 고대역폭메모리(HBM) 시장을 선도하는 글로벌 메모리 반도체 전문 기업",
    financials: {
      revenue: [
        { year: "2022", value: "44.6조 원", raw: 44.6 },
        { year: "2023", value: "32.8조 원", raw: 32.8 },
        { year: "2024", value: "66.2조 원", raw: 66.2 }
      ],
      operatingProfit: [
        { year: "2022", value: "6.8조 원", raw: 6.8 },
        { year: "2023", value: "-7.7조 원", raw: -7.7 },
        { year: "2024", value: "23.5조 원", raw: 23.5 }
      ],
      metrics: {
        roe: "31.1%",
        operatingMargin: "35.5%",
        debtRatio: "62.2%"
      }
    },
    analysis: {
      strengths: [
        "글로벌 AI 반도체 밸류체인 내 HBM3·HBM3E 시장 독보적 선점 및 높은 수익성",
        "고부가 서버용 DDR5 및 기업용 eSSD 시장에서의 기술 경쟁력 우위"
      ],
      risks: [
        "글로벌 빅테크 기업들의 AI 데이터센터 투자 속도 조절 가능성",
        "메모리 산업 특유의 설비투자 경쟁 및 업황 사이클 변동성"
      ],
      investmentPoint: "AI 서버용 HBM 세대교체(HBM3E·HBM4) 주도권 유지 여부와 사상 최대 실적 기반 재무구조 개선"
    },
    meta: {
      source: "금융감독원 전자공시시스템(DART) 연결재무제표 및 KRX",
      baseDate: "2022~2024년 연간 결산 기준"
    }
  },
  {
    code: "005380",
    name: "현대차",
    sector: "자동차",
    categories: ["대형주", "가치주", "배당주"],
    summary: "글로벌 톱3 완성차 그룹의 핵심 기업으로 하이브리드(HEV)·전기차(EV)·제네시스 브랜드를 전개",
    financials: {
      revenue: [
        { year: "2022", value: "142.5조 원", raw: 142.5 },
        { year: "2023", value: "162.7조 원", raw: 162.7 },
        { year: "2024", value: "175.2조 원", raw: 175.2 }
      ],
      operatingProfit: [
        { year: "2022", value: "9.8조 원", raw: 9.8 },
        { year: "2023", value: "15.1조 원", raw: 15.1 },
        { year: "2024", value: "14.2조 원", raw: 14.2 }
      ],
      metrics: {
        roe: "12.4%",
        operatingMargin: "8.1%",
        debtRatio: "182.5%"
      }
    },
    analysis: {
      strengths: [
        "제네시스 및 SUV·하이브리드 중심의 고수익 차종 믹스 개선으로 견조한 이익 창출",
        "총주주환원율(TSR) 35% 이상 목표 제시 등 적극적인 배당 및 자사주 소각 정책"
      ],
      risks: [
        "글로벌 자동차 시장 경쟁 심화에 따른 인센티브(판촉비) 증가 및 관세·통상 정책 변수",
        "금융 자회사(현대캐피탈 등) 연결 편입에 따라 외형상 부채비율이 높게 나타나는 구조"
      ],
      investmentPoint: "하이브리드 판매 호조를 통한 수익성 방어와 밸류업(자사주 매입·배당 확대) 실행력"
    },
    meta: {
      source: "금융감독원 전자공시시스템(DART) 연결재무제표 및 KRX",
      baseDate: "2022~2024년 연간 결산 기준"
    }
  },
  {
    code: "207940",
    name: "삼성바이오로직스",
    sector: "바이오·의약품(CDMO)",
    categories: ["대형주", "성장주"],
    summary: "압도적인 생산능력(CAPA)을 보유한 글로벌 1위 바이오의약품 위탁개발생산(CDMO) 기업",
    financials: {
      revenue: [
        { year: "2022", value: "3.00조 원", raw: 3.00 },
        { year: "2023", value: "3.69조 원", raw: 3.69 },
        { year: "2024", value: "4.55조 원", raw: 4.55 }
      ],
      operatingProfit: [
        { year: "2022", value: "0.98조 원", raw: 0.98 },
        { year: "2023", value: "1.11조 원", raw: 1.11 },
        { year: "2024", value: "1.32조 원", raw: 1.32 }
      ],
      metrics: {
        roe: "10.5%",
        operatingMargin: "29.0%",
        debtRatio: "59.0%"
      }
    },
    analysis: {
      strengths: [
        "1~4공장 풀가동 및 5공장 증설을 통한 글로벌 최대 바이오의약품 위탁생산 규모 확보",
        "글로벌 빅파마 상위 20개사 중 다수를 고객사로 확보하여 장기 수주 잔고 성장 지속"
      ],
      risks: [
        "높은 밸류에이션(PER) 멀티플에 따른 금리 및 바이오 투자 심리 변화 민감도",
        "원/달러 환율 변동에 따른 실적 및 마진율 변동 가능성"
      ],
      investmentPoint: "신규 공장(제2바이오캠퍼스) 가동에 따른 계단식 매출 성장과 ADC(항체약물접합체) 등 포트폴리오 확장"
    },
    meta: {
      source: "금융감독원 전자공시시스템(DART) 연결재무제표 및 KRX",
      baseDate: "2022~2024년 연간 결산 기준"
    }
  },
  {
    code: "373220",
    name: "LG에너지솔루션",
    sector: "이차전지·배터리",
    categories: ["대형주"],
    summary: "전기차(EV)·에너지저장장치(ESS)·IT 기기용 리튬이온 배터리를 생산하는 글로벌 배터리 선도 기업",
    financials: {
      revenue: [
        { year: "2022", value: "25.6조 원", raw: 25.6 },
        { year: "2023", value: "33.7조 원", raw: 33.7 },
        { year: "2024", value: "25.6조 원", raw: 25.6 }
      ],
      operatingProfit: [
        { year: "2022", value: "1.21조 원", raw: 1.21 },
        { year: "2023", value: "2.16조 원", raw: 2.16 },
        { year: "2024", value: "0.58조 원", raw: 0.58 }
      ],
      metrics: {
        roe: "-4.9%",
        operatingMargin: "2.2%",
        debtRatio: "94.8%"
      }
    },
    analysis: {
      strengths: [
        "북미·유럽 등 글로벌 완성차 OEM과의 합작법인(JV) 네트워크 및 대규모 수주 잔고",
        "하이니켈 삼원계(NCMA)부터 차세대 원통형(46시리즈)·ESS용 LFP까지 폭넓은 기술력"
      ],
      risks: [
        "글로벌 전기차 캐즘(일시적 수요 둔화) 장기화 및 공장 가동률 저하 부담",
        "미국 친환경 보조금(IRA AMPC) 정책 변화 가능성 및 중국 배터리 업체와의 점유율 경쟁"
      ],
      investmentPoint: "북미 신공장 가동률 회복 시점과 ESS(에너지저장장치) 및 46시리즈 신제품 수주 모멘텀"
    },
    meta: {
      source: "금융감독원 전자공시시스템(DART) 연결재무제표 및 KRX",
      baseDate: "2022~2024년 연간 결산 기준"
    }
  },
  {
    code: "012450",
    name: "한화에어로스페이스",
    sector: "방산·항공우주",
    categories: ["성장주", "대형주"],
    summary: "K9 자주포·천무 등 지상방산 수출 호조와 항공엔진·우주발사체 사업을 영위하는 대한민국 대표 방산·우주 기업",
    financials: {
      revenue: [
        { year: "2022", value: "6.54조 원", raw: 6.54 },
        { year: "2023", value: "7.89조 원", raw: 7.89 },
        { year: "2024", value: "11.24조 원", raw: 11.24 }
      ],
      operatingProfit: [
        { year: "2022", value: "0.38조 원", raw: 0.38 },
        { year: "2023", value: "0.59조 원", raw: 0.59 },
        { year: "2024", value: "1.73조 원", raw: 1.73 }
      ],
      metrics: {
        roe: "53.9%",
        operatingMargin: "15.4%",
        debtRatio: "279.1%"
      }
    },
    analysis: {
      strengths: [
        "폴란드·루마니아·중동 등 글로벌 무기체계 수출 확대로 사상 최대 수주 잔고 및 고마진 달성",
        "신속한 납기 역량과 검증된 가성비로 글로벌 국방비 증액 기조의 직접적인 수혜"
      ],
      risks: [
        "방산 수주산업 특성상 대규모 선수금 유입이 부채로 계상되어 부채비율이 높게 나타나는 구조",
        "지정학적 정세 변화 및 국가별 방산 수출 금융·인허가 일정에 따른 수주 시점 변동성"
      ],
      investmentPoint: "유럽·중동향 지상방산 인도 물량 본격화에 따른 이익 급증과 추가 수출 파이프라인 성사 여부"
    },
    meta: {
      source: "금융감독원 전자공시시스템(DART) 연결재무제표 및 KRX",
      baseDate: "2022~2024년 연간 결산 기준"
    }
  },
  {
    code: "267260",
    name: "HD현대일렉트릭",
    sector: "전력기기·중전기",
    categories: ["성장주"],
    summary: "북미·중동 전력망 교체 및 AI 데이터센터 전력 인프라 확충의 핵심 수혜를 받는 초고압 변압기 전문 기업",
    financials: {
      revenue: [
        { year: "2022", value: "2.10조 원", raw: 2.10 },
        { year: "2023", value: "2.70조 원", raw: 2.70 },
        { year: "2024", value: "3.32조 원", raw: 3.32 }
      ],
      operatingProfit: [
        { year: "2022", value: "1,330억 원", raw: 0.133 },
        { year: "2023", value: "3,152억 원", raw: 0.315 },
        { year: "2024", value: "6,690억 원", raw: 0.669 }
      ],
      metrics: {
        roe: "37.7%",
        operatingMargin: "20.1%",
        debtRatio: "151.8%"
      }
    },
    analysis: {
      strengths: [
        "북미 노후 전력망 교체와 AI 데이터센터 증설에 따른 초고압 변압기 공급자 우위 시장 지속",
        "수년 치 수주 잔고 확보 및 선별 수주를 통한 영업이익률 20%대의 가파른 수익성 개선"
      ],
      risks: [
        "글로벌 변압기 증설 사이클 이후 중장기 공급 과잉 전환 가능성 점검 필요",
        "구리·전기강판 등 주요 원자재 가격 변동 및 대미 수출 관세 정책 리스크"
      ],
      investmentPoint: "북미·유럽 고단가 수주 물량의 매출 인식 본격화와 울산·앨라배마 공장 증설 효과"
    },
    meta: {
      source: "금융감독원 전자공시시스템(DART) 연결재무제표 및 KRX",
      baseDate: "2022~2024년 연간 결산 기준"
    }
  },
  {
    code: "003230",
    name: "삼양식품",
    sector: "음식료·K-푸드",
    categories: ["성장주"],
    summary: "'불닭볶음면' 브랜드의 글로벌 메가히트로 해외 매출 비중이 75%를 넘어선 대표 K-푸드 수출 기업",
    financials: {
      revenue: [
        { year: "2022", value: "9,090억 원", raw: 0.909 },
        { year: "2023", value: "1.19조 원", raw: 1.193 },
        { year: "2024", value: "1.73조 원", raw: 1.728 }
      ],
      operatingProfit: [
        { year: "2022", value: "680억 원", raw: 0.068 },
        { year: "2023", value: "1,475억 원", raw: 0.148 },
        { year: "2024", value: "3,446억 원", raw: 0.345 }
      ],
      metrics: {
        roe: "34.2%",
        operatingMargin: "19.9%",
        debtRatio: "92.6%"
      }
    },
    analysis: {
      strengths: [
        "미국(월마트·코스트코 등)·유럽·중국 주류 유통망 입점 확대로 높은 해외 판가(ASP)와 고마진 달성",
        "국내 생산 후 수출하는 구조로 원화 약세 및 물량 증가 시 영업레버리지 효과가 극대화"
      ],
      risks: [
        "단일 핵심 IP('불닭' 시리즈)에 대한 높은 매출 의존도",
        "글로벌 식품 규제 변화 또는 곡물·팜유 등 원부자재 가격 및 해상운임 변동성"
      ],
      investmentPoint: "밀양 제2공장 및 해외 생산거점 확충을 통한 글로벌 공급 부족 해소와 외형 성장 지속 여부"
    },
    meta: {
      source: "금융감독원 전자공시시스템(DART) 연결재무제표 및 KRX",
      baseDate: "2022~2024년 연간 결산 기준"
    }
  },
  {
    code: "196170",
    name: "알테오젠",
    sector: "바이오·플랫폼",
    categories: ["성장주"],
    summary: "정맥주사(IV) 치료제를 피하주사(SC) 제형으로 전환하는 'ALT-B4' 원천기술을 보유한 바이오 플랫폼 기업",
    financials: {
      revenue: [
        { year: "2022", value: "366억 원", raw: 0.0366 },
        { year: "2023", value: "965억 원", raw: 0.0965 },
        { year: "2024", value: "1,029억 원", raw: 0.1029 }
      ],
      operatingProfit: [
        { year: "2022", value: "-35억 원", raw: -0.0035 },
        { year: "2023", value: "-97억 원", raw: -0.0097 },
        { year: "2024", value: "254억 원", raw: 0.0254 }
      ],
      metrics: {
        roe: "29.5%",
        operatingMargin: "24.7%",
        debtRatio: "49.2%"
      }
    },
    analysis: {
      strengths: [
        "글로벌 블록버스터 면역항암제(MSD 키트루다 등) 대상 독점적 SC 제형 변경 기술이전 계약 체결",
        "단일 신약이 아닌 다수 빅파마에 반복 기술수출이 가능한 하이브로자임(ALT-B4) 플랫폼 확장성"
      ],
      risks: [
        "마일스톤(단계별 기술료) 유입 시점에 따라 분기·연간 실적 변동 폭이 크게 나타나는 구조",
        "글로벌 임상 및 품목허가(FDA 등) 일정 지연 또는 특허 분쟁 등 바이오 업종 특유의 리스크"
      ],
      investmentPoint: "파트너사 상업화 출시에 따른 경상 로열티(판매 수수료) 유입 본격화 및 추가 빅파마 기술수출"
    },
    meta: {
      source: "금융감독원 전자공시시스템(DART) 연결재무제표 및 KRX",
      baseDate: "2022~2024년 연간 결산 기준"
    }
  },
  {
    code: "259960",
    name: "크래프톤",
    sector: "게임·소프트웨어",
    categories: ["성장주"],
    summary: "글로벌 메가 IP 'PUBG: 배틀그라운드'를 기반으로 높은 영업이익률과 현금창출력을 자랑하는 게임사",
    financials: {
      revenue: [
        { year: "2022", value: "1.85조 원", raw: 1.854 },
        { year: "2023", value: "1.91조 원", raw: 1.911 },
        { year: "2024", value: "2.71조 원", raw: 2.710 }
      ],
      operatingProfit: [
        { year: "2022", value: "0.75조 원", raw: 0.752 },
        { year: "2023", value: "0.77조 원", raw: 0.768 },
        { year: "2024", value: "1.18조 원", raw: 1.183 }
      ],
      metrics: {
        roe: "18.7%",
        operatingMargin: "43.6%",
        debtRatio: "16.4%"
      }
    },
    analysis: {
      strengths: [
        "출시 수년 차에도 트래픽과 매출이 역주행 성장하는 PUBG(PC·모바일) IP의 강력한 라이브 서비스 역량",
        "영업이익률 40% 이상, 부채비율 16%대의 압도적인 재무건전성과 풍부한 순현금 보유"
      ],
      risks: [
        "배틀그라운드 단일 프랜차이즈 IP에 대한 높은 매출 의존도",
        "신작(inZOI, 서브노티카2 등) 흥행 성과 및 글로벌 게임 스튜디오 M&A 이후 시너지 검증 과제"
      ],
      investmentPoint: "PUBG IP의 안정적 캐시카우 지속성과 신작 라인업 흥행을 통한 멀티 IP 게임사 도약 여부"
    },
    meta: {
      source: "금융감독원 전자공시시스템(DART) 연결재무제표 및 KRX",
      baseDate: "2022~2024년 연간 결산 기준"
    }
  },
  {
    code: "000270",
    name: "기아",
    sector: "자동차",
    categories: ["가치주", "배당주", "대형주"],
    summary: "RV(레저용 차량) 중심의 고수익 라인업과 디자인 경쟁력으로 글로벌 완성차 최고 수준의 영업이익률을 기록 중인 기업",
    financials: {
      revenue: [
        { year: "2022", value: "86.6조 원", raw: 86.6 },
        { year: "2023", value: "99.8조 원", raw: 99.8 },
        { year: "2024", value: "107.4조 원", raw: 107.4 }
      ],
      operatingProfit: [
        { year: "2022", value: "7.23조 원", raw: 7.23 },
        { year: "2023", value: "11.61조 원", raw: 11.61 },
        { year: "2024", value: "12.67조 원", raw: 12.67 }
      ],
      metrics: {
        roe: "20.4%",
        operatingMargin: "11.8%",
        debtRatio: "66.1%"
      }
    },
    analysis: {
      strengths: [
        "스포티지·쏘렌토·카니발·텔루라이드 등 고마진 RV 비중 확대와 글로벌 톱티어 영업이익률(11.8%)",
        "높은 ROE 대비 낮은 PER 밸류에이션 매력과 고배당·자사주 소각 등 강력한 주주환원"
      ],
      risks: [
        "북미·유럽 등 주요 수출 시장의 통상·관세 정책 변화 및 경쟁사 판촉 경쟁 심화",
        "글로벌 소비 심리 둔화 시 신차 교체 주기 지연 가능성"
      ],
      investmentPoint: "보급형 전기차(EV3·EV4) 및 하이브리드 라인업 확장을 통한 점유율 확대와 저평가 해소"
    },
    meta: {
      source: "금융감독원 전자공시시스템(DART) 연결재무제표 및 KRX",
      baseDate: "2022~2024년 연간 결산 기준"
    }
  },
  {
    code: "005490",
    name: "POSCO홀딩스",
    sector: "철강·이차전지소재",
    categories: ["가치주"],
    summary: "국내 1위 철강사 포스코를 중심으로 리튬·니켈 등 이차전지 소재 밸류체인을 구축한 지주회사",
    financials: {
      revenue: [
        { year: "2022", value: "84.8조 원", raw: 84.8 },
        { year: "2023", value: "77.1조 원", raw: 77.1 },
        { year: "2024", value: "72.7조 원", raw: 72.7 }
      ],
      operatingProfit: [
        { year: "2022", value: "4.85조 원", raw: 4.85 },
        { year: "2023", value: "3.53조 원", raw: 3.53 },
        { year: "2024", value: "2.17조 원", raw: 2.17 }
      ],
      metrics: {
        roe: "1.6%",
        operatingMargin: "3.0%",
        debtRatio: "68.3%"
      }
    },
    analysis: {
      strengths: [
        "PBR 0.4~0.5배 수준의 역사적 자산가치 대비 저평가 영역 및 안정적인 부채비율(68.3%)",
        "철강 본업의 현금창출력과 아르헨티나 염호·광석 리튬 등 이차전지 원료 수직계열화 기반"
      ],
      risks: [
        "중국발 저가 철강재 공급 과잉 및 글로벌 건설·제조업 경기 부진에 따른 철강 마진 압박",
        "리튬 가격 하락 및 전기차 업황 둔화로 인한 이차전지 소재 신사업 초기 적자 부담"
      ],
      investmentPoint: "중국 철강 감산·반덤핑 관세 효과에 따른 철강 스프레드 회복 및 저수익 자산 구조조정 성과"
    },
    meta: {
      source: "금융감독원 전자공시시스템(DART) 연결재무제표 및 KRX",
      baseDate: "2022~2024년 연간 결산 기준"
    }
  },
  {
    code: "012330",
    name: "현대모비스",
    sector: "자동차부품",
    categories: ["가치주"],
    summary: "현대차·기아의 핵심 모듈·전동화 부품 공급사이자 고마진 A/S 부품 사업을 영위하는 글로벌 자동차부품 기업",
    financials: {
      revenue: [
        { year: "2022", value: "51.9조 원", raw: 51.9 },
        { year: "2023", value: "59.3조 원", raw: 59.3 },
        { year: "2024", value: "57.2조 원", raw: 57.2 }
      ],
      operatingProfit: [
        { year: "2022", value: "2.03조 원", raw: 2.03 },
        { year: "2023", value: "2.30조 원", raw: 2.30 },
        { year: "2024", value: "3.07조 원", raw: 3.07 }
      ],
      metrics: {
        roe: "8.8%",
        operatingMargin: "5.4%",
        debtRatio: "44.4%"
      }
    },
    analysis: {
      strengths: [
        "전 세계 운행 중인 현대차·기아 차량 대수 증가에 비례해 안정적 고수익을 내는 A/S 부품 사업부",
        "부채비율 44.4%의 우량한 재무구조와 풍부한 현금성 자산 대비 낮은 PBR 밸류에이션"
      ],
      risks: [
        "전기차 수요 둔화에 따른 전동화 사업부의 고정비 부담 및 수익성 개선 지연",
        "현대차·기아 캡티브(그룹 내부) 물량 의존도가 높아 완성차 업황에 연동되는 구조"
      ],
      investmentPoint: "전장·핵심부품 수익성 턴어라운드, 비계열(글로벌 OEM) 수주 확대 및 주주환원율 제고 정책"
    },
    meta: {
      source: "금융감독원 전자공시시스템(DART) 연결재무제표 및 KRX",
      baseDate: "2022~2024년 연간 결산 기준"
    }
  },
  {
    code: "030200",
    name: "KT",
    sector: "통신·AI/ICT",
    categories: ["가치주", "배당주"],
    summary: "유무선 통신 인프라를 기반으로 클라우드·데이터센터(IDC)·AICT 전환을 추진하는 대표 통신·디지털 플랫폼 기업",
    financials: {
      revenue: [
        { year: "2022", value: "25.7조 원", raw: 25.7 },
        { year: "2023", value: "26.4조 원", raw: 26.4 },
        { year: "2024", value: "26.4조 원", raw: 26.4 }
      ],
      operatingProfit: [
        { year: "2022", value: "1.69조 원", raw: 1.69 },
        { year: "2023", value: "1.65조 원", raw: 1.65 },
        { year: "2024", value: "0.81조 원", raw: 0.81 }
      ],
      metrics: {
        roe: null,
        operatingMargin: "3.1%",
        debtRatio: "132.7%"
      }
    },
    analysis: {
      strengths: [
        "전국 유무선 통신망과 국내 최대 수준의 데이터센터(IDC)·클라우드 및 부동산 자산을 보유한 자산가치주",
        "인력 구조조정 완료에 따른 중장기 인건비 절감 효과와 분기배당·자사주 소각 등 주주환원 강화"
      ],
      risks: [
        "국내 5G 무선통신 시장 성숙에 따른 통신 본업(ARPU) 성장 정체",
        "일회성 인력 재배치 비용 등 대규모 일회성 손익 반영 시 연도별 단순 지표 비교에 주의 필요"
      ],
      investmentPoint: "인건비 기저효과에 따른 영업이익 반등, 유휴 부동산 개발 이익 및 MS 협력 기반 AICT B2B 성장"
    },
    meta: {
      source: "금융감독원 전자공시시스템(DART) 연결재무제표 및 KRX",
      baseDate: "2022~2024년 연간 결산 기준"
    }
  },
  {
    code: "015760",
    name: "한국전력",
    sector: "전력·유틸리티",
    categories: ["가치주"],
    summary: "국내 전력 송배전 및 판매를 독점 수행하고 원전·플랜트 사업을 아우르는 국가 기간 에너지 공기업",
    financials: {
      revenue: [
        { year: "2022", value: "71.3조 원", raw: 71.3 },
        { year: "2023", value: "88.2조 원", raw: 88.2 },
        { year: "2024", value: "90.0조 원", raw: 90.0 }
      ],
      operatingProfit: [
        { year: "2022", value: "-32.7조 원", raw: -32.7 },
        { year: "2023", value: "-4.5조 원", raw: -4.5 },
        { year: "2024", value: "8.36조 원", raw: 8.36 }
      ],
      metrics: {
        roe: "9.2%",
        operatingMargin: "9.3%",
        debtRatio: "496.7%"
      }
    },
    analysis: {
      strengths: [
        "산업용 전기요금 인상 및 국제 에너지(LNG·석탄) 가격 안정화로 대규모 흑자 전환 성공",
        "막대한 전력망·부지 자산 대비 매우 낮은 PBR 밸류에이션과 흑자 전환에 따른 배당 재개 기대감"
      ],
      risks: [
        "과거 누적 적자로 인해 약 500%에 달하는 높은 연결 부채비율과 막대한 이자비용 부담",
        "물가 안정 정책에 따른 전기요금 결정권 제약 및 국제 유가·환율 상승 시 원가 압박 재발 가능성"
      ],
      investmentPoint: "에너지 가격 하향 안정화에 따른 영업이익 흑자 기조 정착과 재무구조 개선(부채 축소) 속도"
    },
    meta: {
      source: "금융감독원 전자공시시스템(DART) 연결재무제표 및 KRX",
      baseDate: "2022~2024년 연간 결산 기준"
    }
  },
  {
    code: "105560",
    name: "KB금융",
    sector: "금융지주·은행",
    categories: ["배당주", "대형주", "가치주"],
    summary: "KB국민은행·KB손해보험·KB증권 등 균형 잡힌 은행·비은행 포트폴리오를 갖춘 국내 리딩 금융지주사",
    financials: {
      revenue: [
        { year: "2022", value: "136.1조 원", raw: 136.1 },
        { year: "2023", value: "146.8조 원", raw: 146.8 },
        { year: "2024", value: "153.1조 원", raw: 153.1 }
      ],
      operatingProfit: [
        { year: "2022", value: "5.29조 원", raw: 5.29 },
        { year: "2023", value: "6.44조 원", raw: 6.44 },
        { year: "2024", value: "8.05조 원", raw: 8.05 }
      ],
      metrics: {
        roe: "9.7%",
        operatingMargin: null,
        debtRatio: null
      }
    },
    analysis: {
      strengths: [
        "업종 최고 수준의 보통주자본비율(CET1)을 바탕으로 한 예측 가능하고 강력한 주주환원(배당+자사주 소각)",
        "은행 이자이익과 손해보험·증권·카드 등 비은행 계열사의 이익 기여도가 조화를 이루는 수익 구조"
      ],
      risks: [
        "기준금리 인하 사이클 진입 시 순이자마진(NIM) 하락 압력 및 가계대출 규제 강화",
        "경기 둔화 시 부동산 PF 및 취약차주 연체율 상승에 따른 대손충당금 적립 부담 (※ 금융업 특성상 일반 제조업식 영업이익률·부채비율 대신 CET1·ROE 사용)"
      ],
      investmentPoint: "CET1 비율 13% 초과 자본을 주주환원에 활용하는 밸류업 공시 이행과 자사주 소각 규모 확대"
    },
    meta: {
      source: "금융감독원 전자공시시스템(DART) 연결재무제표 및 KRX (매출은 영업수익 기준)",
      baseDate: "2022~2024년 연간 결산 기준"
    }
  },
  {
    code: "055550",
    name: "신한지주",
    sector: "금융지주·은행",
    categories: ["배당주", "가치주"],
    summary: "신한은행·신한카드·신한라이프 등 다각화된 금융 계열사와 글로벌 네트워크를 보유한 대형 금융지주사",
    financials: {
      revenue: [
        { year: "2022", value: "51.3조 원", raw: 51.3 },
        { year: "2023", value: "59.0조 원", raw: 59.0 },
        { year: "2024", value: "60.5조 원", raw: 60.5 }
      ],
      operatingProfit: [
        { year: "2022", value: "5.89조 원", raw: 5.89 },
        { year: "2023", value: "6.10조 원", raw: 6.10 },
        { year: "2024", value: "6.54조 원", raw: 6.54 }
      ],
      metrics: {
        roe: "9.2%",
        operatingMargin: null,
        debtRatio: null
      }
    },
    analysis: {
      strengths: [
        "분기 균등 배당과 지속적인 자사주 매입·소각을 통해 유통주식수를 줄이는 주주친화 정책",
        "베트남·일본 등 국내 금융권 최고 수준의 해외 법인 이익 기여도와 카드·생명보험 등 비은행 기반"
      ],
      risks: [
        "내수 경기 부진 시 자영업자·중소기업 대출 건전성 관리 및 대손비용 변동성",
        "비은행(증권·캐피탈 등) 부문의 일회성 손실 관리 과제 (※ 금융지주 특성상 제조업식 영업이익률·부채비율 지표는 산출 기준이 상이하여 확인 필요 처리)"
      ],
      investmentPoint: "2027년까지 총주주환원율 50% 달성 및 자사주 5,000만 주 감축을 목표로 한 기업가치 제고 계획 실행력"
    },
    meta: {
      source: "금융감독원 전자공시시스템(DART) 연결재무제표 및 KRX (영업수익 기준)",
      baseDate: "2022~2024년 연간 결산 기준"
    }
  },
  {
    code: "138040",
    name: "메리츠금융지주",
    sector: "금융지주·보험/증권",
    categories: ["배당주", "성장주"],
    summary: "메리츠화재와 메리츠증권을 100% 완전자회사로 통합하고 연결순이익의 50% 이상 주주환원을 실행하는 금융지주사",
    financials: {
      revenue: [
        { year: "2022", value: null, raw: null },
        { year: "2023", value: "5.86조 원", raw: 5.86 },
        { year: "2024", value: "4.66조 원", raw: 4.66 }
      ],
      operatingProfit: [
        { year: "2022", value: "2.22조 원", raw: 2.22 },
        { year: "2023", value: "2.93조 원", raw: 2.93 },
        { year: "2024", value: "3.19조 원", raw: 3.19 }
      ],
      metrics: {
        roe: "23.7%",
        operatingMargin: null,
        debtRatio: null
      }
    },
    analysis: {
      strengths: [
        "국내 금융권 내 독보적인 ROE(23.7%)와 연결 당기순이익 50% 이상을 자사주 소각·배당에 쓰는 투명한 거버넌스",
        "지주-화재-증권 통합으로 신속한 자본 재배치와 높은 자본 효율성 달성"
      ],
      risks: [
        "부동산 PF 및 대체투자 익스포저에 대한 건전성 모니터링 필요",
        "2023년 IFRS17(신회계기준) 도입 전후 영업수익 인식 기준이 달라 2022년 매출 단순 비교 불가"
      ],
      investmentPoint: "주가 저평가 시 자사주 매입·소각을 우선시하는 자본배치 원칙을 통한 주당순이익(EPS)·주당순자산(BPS) 성장"
    },
    meta: {
      source: "금융감독원 전자공시시스템(DART) 연결재무제표 및 메리츠금융지주 IR",
      baseDate: "2022~2024년 연간 결산 기준"
    }
  },
  {
    code: "017670",
    name: "SK텔레콤",
    sector: "통신·AI",
    categories: ["배당주", "가치주"],
    summary: "국내 이동통신(MNO) 점유율 1위를 기반으로 안정적 현금흐름과 높은 배당수익률을 제공하는 대표 통신·AI 기업",
    financials: {
      revenue: [
        { year: "2022", value: "17.3조 원", raw: 17.30 },
        { year: "2023", value: "17.6조 원", raw: 17.61 },
        { year: "2024", value: "17.9조 원", raw: 17.94 }
      ],
      operatingProfit: [
        { year: "2022", value: "1.61조 원", raw: 1.61 },
        { year: "2023", value: "1.75조 원", raw: 1.75 },
        { year: "2024", value: "1.82조 원", raw: 1.82 }
      ],
      metrics: {
        roe: "9.1%",
        operatingMargin: "10.2%",
        debtRatio: "158.0%"
      }
    },
    analysis: {
      strengths: [
        "국내 무선통신 1위 가입자 기반에서 창출되는 안정적인 잉여현금흐름(FCF)과 예측 가능한 분기 배당",
        "5G 설비투자(CAPEX) 하향 안정화 및 마케팅 비용 효율화로 견조한 영업이익률(10%대) 유지"
      ],
      risks: [
        "정부의 가계통신비 인하 압박 및 알뜰폰(MVNO) 경쟁에 따른 무선 요금제 성장 한계",
        "AI 데이터센터·AI 비서(에이닷) 등 신규 AI 투자 사업의 실질적인 수익화 검증까지 시간 소요"
      ],
      investmentPoint: "연 6~7% 내외의 매력적인 시가배당률 하방 지지력과 AI 데이터센터(AIDC) B2B 매출 가시화"
    },
    meta: {
      source: "금융감독원 전자공시시스템(DART) 연결재무제표 및 KRX",
      baseDate: "2022~2024년 연간 결산 기준"
    }
  },
  {
    code: "000810",
    name: "삼성화재",
    sector: "손해보험",
    categories: ["배당주"],
    summary: "국내 손해보험 업계 1위 기업으로 압도적인 자본건전성(K-ICS 비율)을 바탕으로 고배당을 확대 중인 우량 보험사",
    financials: {
      revenue: [
        { year: "2022", value: null, raw: null },
        { year: "2023", value: "20.8조 원", raw: 20.8 },
        { year: "2024", value: "22.1조 원", raw: 22.1 }
      ],
      operatingProfit: [
        { year: "2022", value: "1.60조 원", raw: 1.60 },
        { year: "2023", value: "2.36조 원", raw: 2.36 },
        { year: "2024", value: "2.64조 원", raw: 2.64 }
      ],
      metrics: {
        roe: "12.5%",
        operatingMargin: null,
        debtRatio: null
      }
    },
    analysis: {
      strengths: [
        "지급여력비율(K-ICS) 240%를 상회하는 업계 1위의 자본건전성으로 배당가능이익 제한 리스크에서 자유로움",
        "장기보장성 보험 계약서비스마진(CSM)의 안정적 성장과 보수적인 자산운용 능력"
      ],
      risks: [
        "자동차보험 요율 인하 및 계절적 손해율 상승에 따른 보험손익 변동성",
        "2023년 IFRS17 회계제도 변경으로 과거 연도(2022년) 영업수익 단순 비교 제한 및 보험업 특유의 부채(책임준비금) 구조"
      ],
      investmentPoint: "중장기 주주환원율 50% 달성 로드맵 발표와 업계 최고 자본비율을 활용한 배당성향 상향 지속성"
    },
    meta: {
      source: "금융감독원 전자공시시스템(DART) 연결재무제표 및 삼성화재 IR",
      baseDate: "2022~2024년 연간 결산 기준"
    }
  }
];
