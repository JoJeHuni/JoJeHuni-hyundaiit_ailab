import React, { useState } from 'react';
import { Search, Calendar, ChevronRight, Sparkles, Plane, MapPin, ArrowRight } from 'lucide-react';
import { Trip } from '../types';

interface ExploreViewProps {
  onPlanTrip: (destination: string, durationText: string, startDate: string) => void;
  onSelectExistingTrip: (tripId: string) => void;
  onNavigateToFlights: () => void;
  savedTrips: Trip[];
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  onPlanTrip,
  onSelectExistingTrip,
  onNavigateToFlights,
  savedTrips,
}) => {
  const [destinationInput, setDestinationInput] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('3박 4일');
  const [startDate, setStartDate] = useState('2026-08-21');
  const [isGenerating, setIsGenerating] = useState(false);

  const durationOptions = [
    '2박 3일',
    '3박 4일',
    '4박 5일',
    '5박 6일',
    '1주일',
    '자유 설정'
  ];

  const popularDestinations = [
    {
      name: '도쿄 (Tokyo)',
      title: '시부야의 새벽',
      subtitle: '모던 건축과 빛의 여정',
      tag: 'TOKYO',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
      duration: '3박 4일',
      country: '일본'
    },
    {
      name: '아이슬란드 (Iceland)',
      title: '빙하의 고요',
      subtitle: '대자연이 빚은 침묵의 미학',
      tag: 'ICELAND',
      image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80',
      duration: '5박 6일',
      country: '아이슬란드'
    },
    {
      name: '파리 (Paris)',
      title: '기록의 예술',
      subtitle: '파리의 카페에서 머무는 시간',
      tag: 'PARIS',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
      duration: '4박 5일',
      country: '프랑스'
    },
    {
      name: '런던 (London)',
      title: '템즈강변의 클래식',
      subtitle: '역사와 현대 가치가 교차하는 도시',
      tag: 'LONDON',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
      duration: '6박 7일',
      country: '영국'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dest = destinationInput.trim() || '도쿄';
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      onPlanTrip(dest, selectedDuration, startDate);
    }, 600);
  };

  return (
    <div className="pb-24 max-w-6xl mx-auto px-5 pt-6 text-white">
      {/* Hero Search Section */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
            CREATE YOUR ITINERARY
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-1 rounded">
            <Sparkles className="w-3.5 h-3.5 text-white" /> AI Google Maps Rating Engine
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-6">
          어디로 떠나시나요?
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-950 p-6 rounded-lg border border-zinc-800 shadow-2xl">
          {/* Destination Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
            <input
              type="text"
              value={destinationInput}
              onChange={(e) => setDestinationInput(e.target.value)}
              placeholder="목적지를 입력하세요 (예: 도쿄, 파리, 오사카, 런던)"
              className="w-full h-14 pl-12 pr-4 bg-zinc-900 border border-zinc-800 rounded-md focus:border-white focus:outline-none transition-colors text-base font-medium text-white placeholder:text-zinc-500"
            />
          </div>

          {/* Date and Duration Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 px-1">일정 시작일</label>
              <div className="relative flex items-center h-12 px-4 border border-zinc-800 rounded-md bg-zinc-900 hover:border-zinc-600 transition-colors">
                <Calendar className="text-zinc-400 mr-2.5 w-4 h-4" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-transparent w-full text-sm font-medium text-white focus:outline-none cursor-pointer [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 px-1">여행 기간 (N박 M일)</label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="h-12 px-4 border border-zinc-800 rounded-md bg-zinc-900 font-medium text-sm text-white focus:border-white focus:outline-none cursor-pointer"
              >
                {durationOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-zinc-900 text-white">{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full bg-white text-black font-bold text-xs uppercase tracking-[0.2em] h-14 rounded-md transition-all hover:bg-zinc-200 active:scale-[0.99] flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                구글 맵 고평점 추천 코스 생성 중...
              </span>
            ) : (
              <>
                PLAN MY TRIP
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </section>

      {/* Saved / Recent Trips */}
      {savedTrips.length > 0 && (
        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">내 여행 일정</h3>
            <span className="text-xs text-zinc-500 font-medium">{savedTrips.length}개 보관됨</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedTrips.map((trip) => (
              <div
                key={trip.id}
                onClick={() => onSelectExistingTrip(trip.id)}
                className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg cursor-pointer hover:border-zinc-500 transition-all shadow-sm flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={trip.coverImage}
                    alt={trip.destination}
                    className="w-16 h-16 object-cover rounded-md grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                  <div>
                    <span className="inline-block bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase mb-1">
                      {trip.durationText}
                    </span>
                    <h4 className="font-bold text-lg text-white">{trip.destination} 여행</h4>
                    <p className="text-xs text-zinc-400">{trip.startDate} ~ {trip.endDate}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recommended Destinations Carousel */}
      <section className="mb-10 overflow-hidden">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">CURATED PLACES</span>
            <h3 className="text-xl font-bold text-white">추천 여행지</h3>
          </div>
          <button className="text-xs font-bold uppercase text-zinc-400 hover:text-white transition-colors">
            전체보기
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-5 px-5 snap-x">
          {popularDestinations.map((item) => (
            <div
              key={item.name}
              onClick={() => onPlanTrip(item.name.split(' ')[0], item.duration, startDate)}
              className="min-w-[280px] md:min-w-[320px] snap-start group cursor-pointer"
            >
              <div className="relative h-[380px] bg-zinc-900 rounded-lg overflow-hidden mb-3 border border-zinc-800">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-white text-black text-[11px] font-bold tracking-widest px-3 py-1 rounded uppercase">
                    {item.tag}
                  </span>
                  <span className="bg-zinc-900/90 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded border border-zinc-700">
                    {item.duration}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/60 to-transparent text-white">
                  <p className="text-xs text-zinc-400 font-medium mb-1">{item.country}</p>
                  <h4 className="font-bold text-lg leading-tight mb-1">{item.title}</h4>
                  <p className="text-xs text-zinc-300 line-clamp-1">{item.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bento Style Info Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div
          onClick={onNavigateToFlights}
          className="col-span-1 md:col-span-2 p-6 bg-zinc-900 border border-zinc-800 rounded-lg cursor-pointer hover:border-zinc-600 transition-all group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded bg-white text-black flex items-center justify-center">
              <Plane className="w-5 h-5" />
            </div>
            <span className="bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-bold px-2.5 py-1 rounded tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              LIVE CANCELLATIONS
            </span>
          </div>
          <h4 className="text-xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform">
            최적의 항공권 & 취소표 모니터링 ➔
          </h4>
          <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
            15분 단위 실시간 취소표 감지 및 최저가 항공권을 자동으로 매칭해 드립니다.
          </p>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-zinc-950 border border-zinc-800 rounded text-xs font-bold text-zinc-300">
              실시간 갱신
            </span>
            <span className="px-2.5 py-1 bg-zinc-950 border border-zinc-800 rounded text-xs font-bold text-zinc-300">
              취소표 특가 알림
            </span>
          </div>
        </div>

        <div className="p-6 bg-zinc-950 border border-zinc-800 text-white rounded-lg flex flex-col justify-between">
          <div>
            <div className="w-8 h-8 rounded bg-white text-black flex items-center justify-center mb-3">
              <MapPin className="w-4 h-4" />
            </div>
            <h4 className="text-lg font-bold mb-2">Google Maps 별점 4.5+</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              검증된 현지 맛집과 명소만 골라 완벽한 동선으로 추천해드립니다.
            </p>
          </div>
          <div className="mt-6 flex justify-end">
            <Sparkles className="w-8 h-8 text-zinc-600" />
          </div>
        </div>
      </section>
    </div>
  );
};
