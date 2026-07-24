import React from 'react';
import { 
  Plane, Ticket, Building, Cloud, ChevronRight, AlertTriangle, 
  Clock, CheckCircle, ExternalLink, Zap 
} from 'lucide-react';
import { FlightAlert, FlightTicket } from '../types';

interface AlertsDashboardViewProps {
  alerts: FlightAlert[];
  flights: FlightTicket[];
  onNavigateToItinerary: () => void;
  onNavigateToFlights: () => void;
}

export const AlertsDashboardView: React.FC<AlertsDashboardViewProps> = ({
  alerts,
  flights,
  onNavigateToItinerary,
  onNavigateToFlights,
}) => {
  return (
    <div className="pb-24 max-w-6xl mx-auto px-5 pt-6 space-y-6 text-white">
      {/* Header Countdown */}
      <section>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
          NEXT ADVENTURE
        </span>
        <h2 className="text-2xl font-black text-white">내 일정 관리</h2>
        <p className="text-zinc-400 text-xs mt-0.5">런던 브릿지로 떠나는 여정</p>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-6xl md:text-7xl font-black text-white tracking-tighter">08</span>
          <span className="text-xl font-bold text-white uppercase tracking-widest">DAYS</span>
        </div>
      </section>

      {/* Flight Monitoring Card (LIVE) */}
      <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">항공권 모니터링 현황</span>
          <span className="bg-white text-black text-[10px] font-bold px-2.5 py-0.5 rounded tracking-widest flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
            LIVE
          </span>
        </div>

        <div className="flex items-center justify-between py-3 border-y border-zinc-800">
          <div>
            <span className="text-2xl font-black text-white tracking-tight">ICN</span>
            <span className="block text-xs text-zinc-400">Seoul</span>
          </div>

          <div className="flex flex-col items-center">
            <Plane className="w-5 h-5 text-white" />
            <div className="w-20 md:w-32 h-[2px] bg-white mt-1" />
          </div>

          <div className="text-right">
            <span className="text-2xl font-black text-white tracking-tight">LHR</span>
            <span className="block text-xs text-zinc-400">London</span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs font-bold text-zinc-300">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span>정상 운행 중 (On-time)</span>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="bg-zinc-950 border border-zinc-800 text-white p-6 rounded-lg">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 block mb-4">
          QUICK ACCESS
        </span>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onNavigateToItinerary}
            className="bg-white text-black p-5 rounded flex flex-col items-center justify-center gap-2 hover:bg-zinc-200 transition-colors"
          >
            <Ticket className="w-6 h-6" />
            <span className="text-xs font-bold">내 티켓</span>
          </button>

          <button
            onClick={() => alert('호텔 예약 서비스 연결 준비 중입니다.')}
            className="border border-zinc-700 text-white p-5 rounded flex flex-col items-center justify-center gap-2 hover:bg-zinc-900 transition-colors"
          >
            <Building className="w-6 h-6" />
            <span className="text-xs font-bold">호텔 예약</span>
          </button>
        </div>

        <p className="text-[10px] text-zinc-500 mt-4 text-right">마지막 업데이트: 5분 전</p>
      </div>

      {/* Destination Weather */}
      <div className="bg-zinc-900 p-5 rounded-lg border border-zinc-800 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 block mb-1">
            DESTINATION WEATHER
          </span>
          <div className="text-3xl font-black text-white">14°C</div>
          <p className="text-xs text-zinc-400 mt-1">대체로 흐림, 비 올 확률 20%</p>
        </div>
        <Cloud className="w-12 h-12 text-white stroke-[1.5]" />
      </div>

      {/* Explore Banner */}
      <div className="relative h-44 rounded-lg overflow-hidden border border-zinc-800 group cursor-pointer" onClick={onNavigateToItinerary}>
        <img
          src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=80"
          alt="London Tower Bridge"
          className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-5 flex flex-col justify-end text-white">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">EXPLORE DESTINATION</span>
          <h4 className="text-lg font-bold">런던의 숨겨진 명소 확인하기 ➔</h4>
        </div>
      </div>

      {/* Live Cancellation Alerts Logs */}
      <section className="bg-zinc-900 p-5 rounded-lg border border-zinc-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            실시간 취소표 알림 피드
          </h3>
          <button
            onClick={onNavigateToFlights}
            className="text-xs font-bold text-zinc-300 hover:text-white hover:underline"
          >
            항공권 모니터링 이동
          </button>
        </div>

        <div className="space-y-3">
          {alerts.map((al) => (
            <div
              key={al.id}
              onClick={onNavigateToFlights}
              className="p-3 bg-zinc-950 border border-zinc-800 rounded flex items-center justify-between cursor-pointer hover:border-zinc-500 transition-colors"
            >
              <div>
                <span className="inline-block bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded mb-1">
                  🔥 {al.discountPercentage}% OFF
                </span>
                <h4 className="font-bold text-sm text-white">{al.route}</h4>
                <p className="text-xs text-zinc-400">{al.flightNumber} • {al.timestamp}</p>
              </div>

              <div className="text-right">
                <span className="text-base font-black text-white">₩{al.price.toLocaleString()}</span>
                <span className="block text-[11px] text-green-400 font-bold">잔여 {al.seats}석</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Schedule List (Screenshot 1 스타일) */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-black">주요 일정</h3>
          <button onClick={onNavigateToItinerary} className="text-xs text-gray-500 hover:text-black">
            전체보기
          </button>
        </div>

        <div className="space-y-3">
          <div className="p-4 bg-white border border-gray-300 rounded-lg flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400">10:30 AM</span>
              <h4 className="font-bold text-sm text-black">인천공항 제2터미널 출발</h4>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="p-4 bg-white border border-gray-300 rounded-lg flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400">04:45 PM (LST)</span>
              <h4 className="font-bold text-sm text-black">히드로 공항 도착</h4>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="p-4 bg-white border border-gray-300 rounded-lg flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400">06:30 PM</span>
              <h4 className="font-bold text-sm text-black">사보이 호텔 체크인</h4>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </section>
    </div>
  );
};
