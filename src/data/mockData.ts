import { Trip, FlightTicket, FlightAlert } from '../types';

export const INITIAL_TRIPS: Trip[] = [
  {
    id: 'tokyo-trip-1',
    destination: '도쿄',
    country: '일본',
    startDate: '2026-08-21',
    endDate: '2026-08-25',
    durationText: '3박 4일',
    nights: 3,
    days: 4,
    coverImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    daysItinerary: [
      {
        dayNumber: 1,
        date: '2026-08-21',
        title: '긴자 & 롯폰기 감성 탐방',
        items: [
          {
            id: 'item-1',
            category: 'CAFE',
            time: '10:00 AM',
            title: '블루보틀 커피 긴자',
            rating: 4.6,
            reviewCount: 2400,
            description: '긴자의 조용한 뒷골목에 위치한 미니멀한 무드의 카페입니다. 드립 커피와 함께 도쿄의 아침을 시작하기에 완벽한 장소입니다.',
            image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
            address: '6 Chome-10-1 Ginza, Chuo City, Tokyo',
            mapCoords: { lat: 35.6712, lng: 139.7651 },
            estimatedDurationMinutes: 60
          },
          {
            id: 'item-2',
            category: 'SIGHTSEEING',
            time: '01:30 PM',
            title: '모리 미술관',
            rating: 4.8,
            reviewCount: 5120,
            description: '현대 미술의 정수를 경험할 수 있는 공간입니다. 롯폰기 힐즈의 높은 곳에서 내려다보는 도쿄 시내의 전경은 예술 작품만큼이나 아름답습니다.',
            image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
            address: '6 Chome-10-1 Roppongi, Minato City, Tokyo',
            mapCoords: { lat: 35.6605, lng: 139.7292 },
            estimatedDurationMinutes: 120
          },
          {
            id: 'item-3',
            category: 'RESTAURANT',
            time: '07:00 PM',
            title: '스키야바시 지로',
            rating: 4.9,
            reviewCount: 1850,
            description: '장인 정신이 깃든 스시 오마카세를 즐길 수 있는 미슐랭 3스타 레스토랑입니다. 엄격한 분위기 속에서 펼쳐지는 최고의 맛을 경험해보세요.',
            image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
            address: '4 Chome-2-15 Ginza, Chuo City, Tokyo',
            mapCoords: { lat: 35.6720, lng: 139.7635 },
            estimatedDurationMinutes: 90
          }
        ]
      },
      {
        dayNumber: 2,
        date: '2026-08-22',
        title: '시부야 & 하라주쿠 힙스터 코스',
        items: [
          {
            id: 'item-4',
            category: 'SIGHTSEEING',
            time: '11:00 AM',
            title: '시부야 스카이 전망대',
            rating: 4.8,
            reviewCount: 8900,
            description: '시부야 스크램블 스퀘어 최상층에서 즐기는 360도 도쿄 파노라마 뷰. 후지산까지 보이는 압도적인 스카이라인.',
            image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
            address: '2 Chome-24-12 Shibuya, Shibuya City, Tokyo',
            mapCoords: { lat: 35.6590, lng: 139.7006 },
            estimatedDurationMinutes: 90
          },
          {
            id: 'item-5',
            category: 'RESTAURANT',
            time: '01:30 PM',
            title: '이치란 라멘 시부야',
            rating: 4.5,
            reviewCount: 12400,
            description: '진한 돈코츠 육수와 맞춤형 라멘을 즐길 수 있는 도쿄 필수 맛집. 1인 독서실 스타일 좌석이 특징.',
            image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
            address: '1 Chome-22-7 Jinnan, Shibuya City, Tokyo',
            mapCoords: { lat: 35.6618, lng: 139.7002 },
            estimatedDurationMinutes: 45
          },
          {
            id: 'item-6',
            category: 'SHOPPING',
            time: '04:00 PM',
            title: '오모테산도 힐즈 & 캣스트리트',
            rating: 4.6,
            reviewCount: 4300,
            description: '안도 타다오가 설계한 건축물과 플래그십 스트릿 브랜드 쇼핑 플레이스.',
            image: 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=800&q=80',
            address: '4 Chome-12-10 Jingumae, Shibuya City, Tokyo',
            mapCoords: { lat: 35.6672, lng: 139.7090 },
            estimatedDurationMinutes: 150
          }
        ]
      },
      {
        dayNumber: 3,
        date: '2026-08-23',
        title: '아사쿠사 전통 문화 & 팀랩 미디어아트',
        items: [
          {
            id: 'item-7',
            category: 'SIGHTSEEING',
            time: '09:30 AM',
            title: '센소지 전통 사찰',
            rating: 4.7,
            reviewCount: 31000,
            description: '도쿄에서 가장 오래된 고즈넉한 사찰. 카미나리몬 정문과 상점가 나카미세도리 구경.',
            image: 'https://images.unsplash.com/photo-1583838224419-74e99ef3d077?auto=format&fit=crop&w=800&q=80',
            address: '2 Chome-3-1 Asakusa, Taito City, Tokyo',
            mapCoords: { lat: 35.7148, lng: 139.7967 },
            estimatedDurationMinutes: 90
          },
          {
            id: 'item-8',
            category: 'SIGHTSEEING',
            time: '02:00 PM',
            title: '팀랩 플래닛 도쿄 (TeamLab Planets)',
            rating: 4.8,
            reviewCount: 15600,
            description: '물 속을 걸으며 인터랙티브 빛의 오케스트라를 체험하는 세계 최고의 몰입형 미디어 아트 몰.',
            image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
            address: '6 Chome-1-16 Toyosu, Koto City, Tokyo',
            mapCoords: { lat: 35.6491, lng: 139.7898 },
            estimatedDurationMinutes: 120
          }
        ]
      },
      {
        dayNumber: 4,
        date: '2026-08-24',
        title: '츠키지 시장 모닝 해산물 & 공항 이동',
        items: [
          {
            id: 'item-9',
            category: 'RESTAURANT',
            time: '08:30 AM',
            title: '츠키지 장외시장 해산물 덮밥',
            rating: 4.6,
            reviewCount: 7800,
            description: '갓 잡은 신선한 성게알, 참치, 연어알 카이센동과 달콤한 계란말이 꼬치 맛집 탐방.',
            image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80',
            address: '4 Chome-16-2 Tsukiji, Chuo City, Tokyo',
            mapCoords: { lat: 35.6654, lng: 139.7707 },
            estimatedDurationMinutes: 90
          }
        ]
      }
    ]
  },
  {
    id: 'osaka-trip-2',
    destination: '오사카',
    country: '일본',
    startDate: '2026-09-10',
    endDate: '2026-09-13',
    durationText: '2박 3일',
    nights: 2,
    days: 3,
    coverImage: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=1200&q=80',
    daysItinerary: [
      {
        dayNumber: 1,
        date: '2026-09-10',
        title: '도톤보리 & 미나미 밤거리',
        items: [
          {
            id: 'osaka-1',
            category: 'SIGHTSEEING',
            time: '03:00 PM',
            title: '도톤보리 글리코상 거리를 맛보다',
            rating: 4.6,
            reviewCount: 18000,
            description: '오사카의 상징 도톤보리 운하와 글리코상 앞에서 인생샷 촬영, 타코야키 맛집 투어.',
            image: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=800&q=80',
            address: '1 Chome Dotonbori, Chuo Ward, Osaka',
            mapCoords: { lat: 34.6687, lng: 135.5013 }
          }
        ]
      }
    ]
  },
  {
    id: 'paris-trip-3',
    destination: '파리',
    country: '프랑스',
    startDate: '2026-10-01',
    endDate: '2026-10-07',
    durationText: '5박 6일',
    nights: 5,
    days: 6,
    coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    daysItinerary: []
  }
];

export const INITIAL_FLIGHTS: FlightTicket[] = [
  {
    id: 'flight-1',
    airline: '대한항공 (Korean Air)',
    flightNumber: 'KE703',
    origin: 'SEOUL (ICN)',
    originCity: 'Seoul',
    destination: 'TOKYO (NRT)',
    destinationCity: 'Tokyo',
    departureTime: '10:25',
    arrivalTime: '12:50',
    duration: '2시간 25분',
    date: '2026-08-21',
    price: 245000,
    originalPrice: 380000,
    isCancellationTicket: true,
    remainingSeats: 1,
    isDirect: true,
    status: 'On-time',
    updatedAt: '방금 전',
    badgeText: '🔥 취소표 특가! 잔여 1석'
  },
  {
    id: 'flight-2',
    airline: '제주항공 (Jeju Air)',
    flightNumber: '7C1302',
    origin: 'SEOUL (ICN)',
    originCity: 'Seoul',
    destination: 'OSAKA (KIX)',
    destinationCity: 'Osaka',
    departureTime: '08:00',
    arrivalTime: '09:45',
    duration: '1시간 45분',
    date: '2026-09-10',
    price: 189000,
    originalPrice: 220000,
    isCancellationTicket: false,
    remainingSeats: 4,
    isDirect: true,
    status: 'On-time',
    updatedAt: '2분 전',
    badgeText: 'Best Price'
  },
  {
    id: 'flight-3',
    airline: '에어프랑스 (Air France)',
    flightNumber: 'AF267',
    origin: 'SEOUL (ICN)',
    originCity: 'Seoul',
    destination: 'PARIS (CDG)',
    destinationCity: 'Paris',
    departureTime: '13:15',
    arrivalTime: '19:30',
    duration: '12시간 15분',
    date: '2026-10-01',
    price: 1120000,
    originalPrice: 1450000,
    isCancellationTicket: true,
    remainingSeats: 2,
    isDirect: true,
    status: 'On-time',
    updatedAt: '5분 전',
    badgeText: '⚡ 취소표 발생! 잔여 2석'
  },
  {
    id: 'flight-4',
    airline: '아시아나항공 (Asiana)',
    flightNumber: 'OZ102',
    origin: 'SEOUL (ICN)',
    originCity: 'Seoul',
    destination: 'TOKYO (HND)',
    destinationCity: 'Tokyo',
    departureTime: '15:40',
    arrivalTime: '18:05',
    duration: '2시간 25분',
    date: '2026-08-21',
    price: 310000,
    originalPrice: 350000,
    isCancellationTicket: false,
    remainingSeats: 5,
    isDirect: true,
    status: 'On-time',
    updatedAt: '10분 전'
  },
  {
    id: 'flight-5',
    airline: '티웨이항공 (T\'way Air)',
    flightNumber: 'TW211',
    origin: 'SEOUL (ICN)',
    originCity: 'Seoul',
    destination: 'FUKUOKA (FUK)',
    destinationCity: 'Fukuoka',
    departureTime: '07:10',
    arrivalTime: '08:35',
    duration: '1시간 25분',
    date: '2026-08-25',
    price: 135000,
    originalPrice: 210000,
    isCancellationTicket: true,
    remainingSeats: 1,
    isDirect: true,
    status: 'On-time',
    updatedAt: '1분 전',
    badgeText: '🔥 취소표 특가! 35% OFF'
  },
  {
    id: 'flight-6',
    airline: '영국항공 (British Airways)',
    flightNumber: 'BA018',
    origin: 'SEOUL (ICN)',
    originCity: 'Seoul',
    destination: 'LONDON (LHR)',
    destinationCity: 'London',
    departureTime: '10:30',
    arrivalTime: '16:45',
    duration: '14시간 15분',
    date: '2026-10-12',
    price: 1280000,
    originalPrice: 1600000,
    isCancellationTicket: true,
    remainingSeats: 1,
    isDirect: true,
    status: 'On-time',
    updatedAt: '방금 전',
    badgeText: '🔥 런던 취소표 긴급 감지'
  }
];

export const INITIAL_ALERTS: FlightAlert[] = [
  {
    id: 'alert-1',
    flightNumber: 'KE703 (대한항공)',
    route: '인천 ICN ➔ 도쿄 NRT',
    discountPercentage: 35,
    price: 245000,
    timestamp: '10분 전 감지',
    seats: 1
  },
  {
    id: 'alert-2',
    flightNumber: 'AF267 (에어프랑스)',
    route: '인천 ICN ➔ 파리 CDG',
    discountPercentage: 23,
    price: 1120000,
    timestamp: '28분 전 감지',
    seats: 2
  },
  {
    id: 'alert-3',
    flightNumber: 'TW211 (티웨이)',
    route: '인천 ICN ➔ 후쿠오카 FUK',
    discountPercentage: 36,
    price: 135000,
    timestamp: '45분 전 감지',
    seats: 1
  }
];

export const TOP_PLACES_DATABASE = [
  {
    name: '시부야 스카이 전망대',
    category: 'SIGHTSEEING' as const,
    rating: 4.8,
    reviewCount: 8900,
    description: '도쿄에서 가장 뛰어난 360도 야경 스카이라인 전망대',
    address: 'Shibuya, Tokyo',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    lat: 35.6590,
    lng: 139.7006
  },
  {
    name: '긴자 이치란 라멘 본점',
    category: 'RESTAURANT' as const,
    rating: 4.6,
    reviewCount: 14200,
    description: '비법 고춧가루 소스와 진한 돈코츠 수프의 명품 라멘',
    address: 'Ginza, Tokyo',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    lat: 35.6710,
    lng: 139.7640
  },
  {
    name: '카부키초 타워 미디어홀',
    category: 'SIGHTSEEING' as const,
    rating: 4.7,
    reviewCount: 3200,
    description: '신주쿠에 새로 들어선 도쿄 엔터테인먼트의 상징 건물',
    address: 'Shinjuku, Tokyo',
    image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80',
    lat: 35.6948,
    lng: 139.7028
  },
  {
    name: '하라주쿠 매치 & 카페 오모테산도',
    category: 'CAFE' as const,
    rating: 4.7,
    reviewCount: 1950,
    description: '고급 말차 유기농 파르페와 로스터리 핸드드립 시그니처',
    address: 'Harajuku, Tokyo',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    lat: 35.6690,
    lng: 139.7050
  },
  {
    name: '도쿄 디즈니씨 (DisneySea)',
    category: 'SIGHTSEEING' as const,
    rating: 4.9,
    reviewCount: 45000,
    description: '세계 유일의 바다 테마 디즈니 파크. 어트랙션과 야간 불꽃놀이',
    address: 'Urayasu, Chiba, Tokyo',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    lat: 35.6267,
    lng: 139.8881
  }
];
