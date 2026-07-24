import React, { useState, useEffect } from 'react';
import { RefreshCw, Plane, Filter, AlertCircle, ArrowRight, Check, Zap } from 'lucide-react';
import { FlightTicket } from '../types';

interface FlightsViewProps {
  flights: FlightTicket[];
  onRefreshFlights: () => void;
  onApplyFlightToTrip?: (flight: FlightTicket) => void;
}

export const FlightsView: React.FC<FlightsViewProps> = ({
  flights,
  onRefreshFlights,
  onApplyFlightToTrip,
}) => {
  const [activeFilter, setActiveFilter] = useState<'lowest' | 'cancellation' | 'direct'>('cancellation');
  const [secondsRemaining, setSecondsRemaining] = useState(900); // 15분 (900초) 카운트다운
  const [isSpinning, setIsSpinning] = useState(false);
  const [appliedFlightId, setAppliedFlightId] = useState<string | null>(null);

  // 15분 자동 갱신 타이머
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          onRefreshFlights();
          return 900;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onRefreshFlights]);

  const formatCountdown = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleManualRefresh = () => {
    setIsSpinning(true);
    onRefreshFlights();
    setSecondsRemaining(900);
    setTimeout(() => {
      setIsSpinning(false);
    }, 600);
  };

  const handleApply = (flight: FlightTicket) => {
    setAppliedFlightId(flight.id);
    if (onApplyFlightToTrip) {
      onApplyFlightToTrip(flight);
    }
    setTimeout(() => setAppliedFlightId(null), 2500);
  };

  const filteredFlights = flights.filter((f) => {
    if (activeFilter === 'cancellation') return f.isCancellationTicket;
    if (activeFilter === 'direct') return f.isDirect;
    return true;
  }).sort((a, b) => {
    if (activeFilter === 'lowest') return a.price - b.price;
    return 0;
  });

  return (
    <div className="pb-24 max-w-6xl mx-auto px-5 pt-6 text-white">
      {/* 15분 자동 갱신 헤더 바 (Screenshot 3 / Elegant Dark 스타일) */}
      <div className="bg-zinc-950 border border-zinc-800 text-white p-5 rounded-lg flex flex-wrap items-center justify-between gap-3 mb-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
            <RefreshCw className={`w-4 h-4 text-zinc-300 ${isSpinning ? 'animate-spin' : ''}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">REAL-TIME FLIGHT MONITOR</span>
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-mono font-bold bg-zinc-900 text-green-400 border border-zinc-800 px-2 py-0.5 rounded">
                {formatCountdown(secondsRemaining)}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">15분마다 실시간 항공사 취소표 데이터를 감지하고 있습니다.</p>
          </div>
        </div>

        <button
          onClick={handleManualRefresh}
          className="bg-white text-black hover:bg-zinc-200 px-4 py-2.5 rounded font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-2 transition-all active:scale-95"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin' : ''}`} />
          갱신
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide mb-6 pb-1">
        <button
          onClick={() => setActiveFilter('lowest')}
          className={`px-4 py-2 rounded-full font-bold text-xs transition-all whitespace-nowrap border ${
            activeFilter === 'lowest'
              ? 'bg-white text-black border-white'
              : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-500'
          }`}
        >
          최저가순
        </button>
        <button
          onClick={() => setActiveFilter('cancellation')}
          className={`px-4 py-2 rounded-full font-bold text-xs transition-all whitespace-nowrap border flex items-center gap-1.5 ${
            activeFilter === 'cancellation'
              ? 'bg-white text-black border-white'
              : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-500'
          }`}
        >
          <Zap className={`w-3.5 h-3.5 ${activeFilter === 'cancellation' ? 'text-amber-500 fill-amber-500' : 'text-amber-400'}`} />
          취소표 우선
        </button>
        <button
          onClick={() => setActiveFilter('direct')}
          className={`px-4 py-2 rounded-full font-bold text-xs transition-all whitespace-nowrap border ${
            activeFilter === 'direct'
              ? 'bg-white text-black border-white'
              : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-500'
          }`}
        >
          직항만
        </button>
      </div>

      {/* Flights List */}
      <div className="space-y-4">
        {filteredFlights.length === 0 ? (
          <div className="p-12 text-center bg-zinc-950 border border-dashed border-zinc-800 rounded-lg">
            <AlertCircle className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
            <p className="font-bold text-zinc-300">해당 조건의 항공권이 없습니다.</p>
            <p className="text-xs text-zinc-500 mt-1">필터를 변경하시거나 '갱신' 버튼을 눌러보세요.</p>
          </div>
        ) : (
          filteredFlights.map((flight) => (
            <div
              key={flight.id}
              className={`bg-zinc-900 border p-5 rounded-lg transition-all hover:border-zinc-600 ${
                flight.isCancellationTicket ? 'border-zinc-600 ring-1 ring-zinc-700' : 'border-zinc-800'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                    <Plane className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base text-white tracking-tight">{flight.origin}</span>
                      <ArrowRight className="w-4 h-4 text-zinc-500" />
                      <span className="font-bold text-base text-white tracking-tight">{flight.destination}</span>
                    </div>
                    <p className="text-xs text-zinc-400 font-medium">
                      {flight.originCity} ➔ {flight.destinationCity}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black text-white tracking-tight">
                    ₩{flight.price.toLocaleString()}
                  </div>
                  {flight.badgeText && (
                    <span className="inline-block text-[11px] font-bold text-green-400 bg-green-500/10 px-2.5 py-0.5 rounded border border-green-500/20 mt-1 uppercase tracking-wider">
                      {flight.badgeText}
                    </span>
                  )}
                </div>
              </div>

              {/* Time & Flight Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-xs">
                <div>
                  <span className="block text-zinc-500 font-bold uppercase text-[10px] tracking-wider">DEPARTURE</span>
                  <span className="font-bold text-sm text-white">{flight.departureTime} — {flight.arrivalTime}</span>
                </div>

                <div>
                  <span className="block text-zinc-500 font-bold uppercase text-[10px] tracking-wider">FLIGHT INFO</span>
                  <span className="font-bold text-sm text-white">
                    {flight.flightNumber} | {flight.isDirect ? 'Direct' : 'Layover'}
                  </span>
                </div>

                <div>
                  <span className="block text-zinc-500 font-bold uppercase text-[10px] tracking-wider">DURATION</span>
                  <span className="font-medium text-zinc-300 text-sm">{flight.duration}</span>
                </div>

                <div className="flex items-center justify-end">
                  <button
                    onClick={() => handleApply(flight)}
                    className={`px-4 py-2.5 rounded text-xs font-bold transition-all flex items-center gap-1.5 ${
                      appliedFlightId === flight.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-black hover:bg-zinc-200'
                    }`}
                  >
                    {appliedFlightId === flight.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        일정에 반영됨
                      </>
                    ) : (
                      '일정에 항공권 반영'
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Aesthetic Monochrome Footer Banner */}
      <div className="mt-8 rounded-lg overflow-hidden border border-zinc-800 relative h-48 bg-zinc-950 text-white">
        <img
          src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80"
          alt="Airport Runway"
          className="w-full h-full object-cover opacity-30 grayscale"
        />
        <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black via-black/60 to-transparent">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">FLIGHT CANCELLATION ENGINE</span>
          <h4 className="text-xl font-bold">취소표 자동 알림 등록</h4>
          <p className="text-xs text-zinc-400 mt-1">원하는 날짜와 노선을 선택해 두시면 취소표가 풀리는 즉시 푸시 알림을 보내드립니다.</p>
        </div>
      </div>
    </div>
  );
};
