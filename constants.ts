import { Proposal, CommentData, ChartData } from './types';

export const PROPOSALS: Proposal[] = [
  {
    id: 1,
    title: "다대포 올인원 나이트",
    subtitle: "선셋에서 별밤까지",
    background: "댓글에서 가장 언급량이 많고 만족도가 높은 '다대포'와 '야간 음악분수'를 결합",
    target: "2030 커플, 가족 단위 여행객",
    course: "아미산 전망대(일몰) → 다대포 해변공원(피크닉) → 꿈의 낙조분수",
    activities: [
      "다대포 선셋 요가 & 싱잉볼 (힐링 프로그램)",
      "낙조분수 사연 읽어주는 밤 (참여형 이벤트)"
    ],
    tags: ["#다대포재발견", "#야간음악분수", "#아미산뷰"]
  },
  {
    id: 2,
    title: "히스토리 워킹 투어",
    subtitle: "평화를 걷다 (Peace Walker)",
    background: "UN기념공원(댓글 추천)과 일제강제동원역사관을 엮은 의미 있는 도보 여행",
    target: "외국인 관광객, 수학여행/역사 동호회",
    course: "강제동원역사관 → (셔틀) → UN기념공원 → 이기대 해안산책로",
    activities: [
      "평화의 헌화 (Flower Tribute)",
      "다크 투어리즘 디지털 스탬프북 (굿즈 증정)"
    ],
    tags: ["#역사트레킹", "#UN공원", "#평화관광"]
  },
  {
    id: 3,
    title: "부산 동-서 횡단 챌린지",
    subtitle: "끝에서 끝까지",
    background: "기장(동쪽 끝)과 다대포(서쪽 끝)를 아우르는 광역 코스 니즈 반영",
    target: "자차 이용 여행객, 2박 3일 이상 체류객",
    course: "(동부산) 아홉산숲/죽성성당 → (중부산) 광안리 → (서부산) 다대포",
    activities: [
      "부산 횡단 인증서 (양쪽 끝 일몰/일출 인증)",
      "카페 투어 패스 (제휴 카페 할인)"
    ],
    tags: ["#부산마스터", "#인증챌린지", "#드라이브"]
  },
  {
    id: 4,
    title: "리얼 로컬 트레킹",
    subtitle: "부산 사람처럼 걷기",
    background: "'이기대와 금정산이 진짜'라는 현지인 의견 반영",
    target: "트레킹족, 중장년층",
    course: "이기대 해안산책로 → 오륙도",
    activities: [
      "이기대~오륙도 런치팩 (로컬 도시락 픽업)",
      "문라이트 워킹 (야간 안전 조명 트레킹)"
    ],
    tags: ["#현지인찐코스", "#가성비힐링", "#트레킹"]
  }
];

export const SENTIMENT_DATA: ChartData[] = [
  { name: '긍정 (Positive)', value: 65, fill: '#4ade80' }, // Estimated from CSV
  { name: '부정 (Negative)', value: 25, fill: '#f87171' },
  { name: '중립 (Neutral)', value: 10, fill: '#94a3b8' },
];

export const KEYWORD_DATA: ChartData[] = [
  { name: '다대포', value: 24 },
  { name: '이기대', value: 18 },
  { name: '해운대', value: 15 },
  { name: '야경', value: 12 },
  { name: '맛집', value: 10 },
  { name: '역사', value: 8 },
];

export const HOT_SPOTS = [
  { name: "다대포", desc: "압도적 지지, 일몰 맛집, 3~4월 봄바람" },
  { name: "이기대", desc: "현지인이 꼽는 진짜 부산 바다" },
  { name: "UN기념공원", desc: "역사적 의미, 강력 추천 명소" },
  { name: "아미산 전망대", desc: "낙조와 모래톱 뷰 포인트" }
];

export const PAIN_POINTS = [
  "새로운 게 없다 (기존 명소 나열)",
  "접근성 및 교통 체증",
  "경제적 부담 (가성비 추구)"
];
