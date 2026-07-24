export type CategoryType = 'CAFE' | 'RESTAURANT' | 'SIGHTSEEING' | 'HOTEL' | 'SHOPPING' | 'FLIGHT';

export interface ItineraryItem {
  id: string;
  category: CategoryType;
  time: string;
  title: string;
  rating: number;
  reviewCount: number;
  description: string;
  image: string;
  address: string;
  mapCoords: {
    lat: number;
    lng: number;
  };
  estimatedDurationMinutes?: number;
  notes?: string;
}

export interface DayItinerary {
  dayNumber: number;
  date: string;
  title: string;
  items: ItineraryItem[];
}

export interface Trip {
  id: string;
  destination: string;
  country: string;
  startDate: string;
  endDate: string;
  durationText: string; // e.g. "3박 4일"
  nights: number;
  days: number;
  coverImage: string;
  daysItinerary: DayItinerary[];
}

export interface FlightTicket {
  id: string;
  airline: string;
  flightNumber: string;
  origin: string; // e.g., "SEOUL (ICN)"
  originCity: string;
  destination: string; // e.g., "TOKYO (NRT)"
  destinationCity: string;
  departureTime: string; // "10:25"
  arrivalTime: string; // "12:50"
  duration: string; // "2h 25m"
  date: string;
  price: number; // in KRW
  originalPrice?: number;
  isCancellationTicket: boolean; // 취소표 여부
  remainingSeats: number;
  isDirect: boolean;
  status: 'On-time' | 'Delayed' | 'Boarding';
  updatedAt: string;
  badgeText?: string; // e.g., "잔여 1석", "Best Price", "취소표 특가!"
}

export interface FlightAlert {
  id: string;
  flightNumber: string;
  route: string;
  discountPercentage: number;
  price: number;
  timestamp: string;
  seats: number;
}
