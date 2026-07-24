import React, { useState } from 'react';
import { 
  Share2, Edit3, MapPin, Plus, Star, Map, Navigation, 
  Trash2, GripVertical, Clock, Sparkles, ChevronRight, Image as ImageIcon 
} from 'lucide-react';
import { Trip, DayItinerary, ItineraryItem, CategoryType } from '../types';

interface ItineraryViewProps {
  trip: Trip;
  onUpdateTrip: (updatedTrip: Trip) => void;
  onOpenMapModal: (items: ItineraryItem[]) => void;
  onOpenPhotoModal: (imageSrc: string, title: string) => void;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({
  trip,
  onUpdateTrip,
  onOpenMapModal,
  onOpenPhotoModal,
}) => {
  const [activeDayNumber, setActiveDayNumber] = useState<number>(1);
  const [isAddPlaceModalOpen, setIsAddPlaceModalOpen] = useState(false);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // New place form state
  const [newPlaceTitle, setNewPlaceTitle] = useState('');
  const [newPlaceCategory, setNewPlaceCategory] = useState<CategoryType>('RESTAURANT');
  const [newPlaceTime, setNewPlaceTime] = useState('12:00 PM');
  const [newPlaceRating, setNewPlaceRating] = useState('4.7');
  const [newPlaceDesc, setNewPlaceDesc] = useState('');

  const currentDay: DayItinerary = trip.daysItinerary.find(
    (d) => d.dayNumber === activeDayNumber
  ) || {
    dayNumber: activeDayNumber,
    date: trip.startDate,
    title: `Day ${activeDayNumber} 일정`,
    items: [],
  };

  const cafeCount = currentDay.items.filter((i) => i.category === 'CAFE').length;
  const foodCount = currentDay.items.filter((i) => i.category === 'RESTAURANT').length;
  const sightCount = currentDay.items.filter((i) => i.category === 'SIGHTSEEING').length;

  // Drag and Drop reordering handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    setDraggedItemIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const sourceIndex = draggedItemIndex;
    if (sourceIndex === null || sourceIndex === dropIndex) return;

    const newItems = [...currentDay.items];
    const [draggedItem] = newItems.splice(sourceIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);

    // Update times logically
    const updatedItems = newItems.map((item, idx) => {
      let timeStr = item.time;
      if (idx === 0) timeStr = '10:00 AM';
      else if (idx === 1) timeStr = '01:30 PM';
      else if (idx === 2) timeStr = '04:30 PM';
      else if (idx === 3) timeStr = '07:00 PM';
      return { ...item, time: timeStr };
    });

    const updatedDays = trip.daysItinerary.map((d) =>
      d.dayNumber === activeDayNumber ? { ...d, items: updatedItems } : d
    );

    onUpdateTrip({ ...trip, daysItinerary: updatedDays });
    setDraggedItemIndex(null);
    setDragOverIndex(null);
  };

  const handleDeleteItem = (itemId: string) => {
    const updatedItems = currentDay.items.filter((i) => i.id !== itemId);
    const updatedDays = trip.daysItinerary.map((d) =>
      d.dayNumber === activeDayNumber ? { ...d, items: updatedItems } : d
    );
    onUpdateTrip({ ...trip, daysItinerary: updatedDays });
  };

  const handleAddCustomPlace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlaceTitle.trim()) return;

    const newItem: ItineraryItem = {
      id: `custom-${Date.now()}`,
      category: newPlaceCategory,
      time: newPlaceTime,
      title: newPlaceTitle,
      rating: parseFloat(newPlaceRating) || 4.7,
      reviewCount: Math.floor(Math.random() * 3000) + 500,
      description: newPlaceDesc || '구글 맵 추천 고평점 인기 장소입니다.',
      image: newPlaceCategory === 'CAFE' 
        ? 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80'
        : newPlaceCategory === 'SIGHTSEEING'
        ? 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
      address: `${trip.destination} 중심가`,
      mapCoords: { lat: 35.6762, lng: 139.6503 }
    };

    const updatedItems = [...currentDay.items, newItem];
    const updatedDays = trip.daysItinerary.map((d) =>
      d.dayNumber === activeDayNumber ? { ...d, items: updatedItems } : d
    );

    onUpdateTrip({ ...trip, daysItinerary: updatedDays });
    setNewPlaceTitle('');
    setNewPlaceDesc('');
    setIsAddPlaceModalOpen(false);
  };

  return (
    <div className="pb-24 max-w-6xl mx-auto px-5 pt-6 text-white">
      {/* Hero / Summary Section */}
      <section className="py-6 border-b border-zinc-800 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="inline-block bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded mb-2">
              TRAVEL PLAN
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              {trip.durationText} {trip.destination} 여행
            </h2>
            <p className="text-zinc-400 text-sm mt-1 font-medium">
              {trip.startDate} - {trip.endDate}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => alert('일정 공유 링크가 복사되었습니다!')}
              className="flex items-center gap-1.5 border border-zinc-700 px-4 py-2 text-xs font-bold rounded hover:bg-zinc-900 transition-colors text-white"
            >
              <Share2 className="w-4 h-4" /> 공유하기
            </button>
            <button
              onClick={() => onOpenMapModal(currentDay.items)}
              className="flex items-center gap-1.5 bg-white text-black px-4 py-2 text-xs font-bold rounded active:scale-95 transition-all hover:bg-zinc-200"
            >
              <Map className="w-4 h-4" /> 전체 동선 보기
            </button>
          </div>
        </div>
      </section>

      {/* Main Layout: Sidebar & Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Date Selector (Desktop Sidebar) */}
        <aside className="md:col-span-3 sticky top-20 h-fit bg-zinc-950 p-4 rounded-lg border border-zinc-800 hidden md:block shadow-xl">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-3">
            ITINERARY DAYS
          </h3>
          <nav className="flex flex-col gap-2">
            {Array.from({ length: trip.days }).map((_, idx) => {
              const dayNum = idx + 1;
              const isActive = activeDayNumber === dayNum;
              return (
                <button
                  key={dayNum}
                  onClick={() => setActiveDayNumber(dayNum)}
                  className={`flex items-center justify-between w-full p-3 rounded font-bold text-xs transition-all ${
                    isActive
                      ? 'bg-white text-black shadow-md'
                      : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
                  }`}
                >
                  <span>Day {dayNum}</span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-black' : 'text-zinc-500'}`} />
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Day Tabs (Mobile) */}
        <div className="md:hidden flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
          {Array.from({ length: trip.days }).map((_, idx) => {
            const dayNum = idx + 1;
            const isActive = activeDayNumber === dayNum;
            return (
              <button
                key={dayNum}
                onClick={() => setActiveDayNumber(dayNum)}
                className={`whitespace-nowrap px-6 py-2 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-white text-black'
                    : 'border border-zinc-800 bg-zinc-900 text-zinc-300'
                }`}
              >
                Day {dayNum}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="md:col-span-9">
          <div className="flex flex-wrap items-center justify-between mb-6 gap-2">
            <div>
              <h3 className="text-xl font-bold text-white">상세 일정</h3>
              <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1">
                <GripVertical className="w-3.5 h-3.5 text-zinc-300" />
                마우스로 카드를 드래그하여 일정 순서를 자유롭게 변경할 수 있습니다.
              </p>
            </div>

            <div className="flex items-center gap-3 text-zinc-300 text-xs font-medium bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded">
              {foodCount > 0 && <span>🍴 맛집 {foodCount}</span>}
              {cafeCount > 0 && <span>☕ 카페 {cafeCount}</span>}
              {sightCount > 0 && <span>🏛️ 명소 {sightCount}</span>}
            </div>
          </div>

          {/* Timeline Container */}
          <div className="relative space-y-8 pl-8 md:pl-10">
            {/* Vertical Dashed Line */}
            <div className="absolute left-[15px] md:left-[19px] top-4 bottom-4 w-[1px] itinerary-line" />

            {currentDay.items.length === 0 ? (
              <div className="p-10 text-center bg-zinc-950 border border-dashed border-zinc-800 rounded-lg">
                <p className="font-bold text-zinc-300">이 날짜에는 아직 추가된 일정이 없습니다.</p>
                <p className="text-xs text-zinc-500 mt-1">아래의 '+' 버튼을 눌러 장소를 추가해보세요.</p>
              </div>
            ) : (
              currentDay.items.map((item, index) => {
                const isDragging = draggedItemIndex === index;
                const isOver = dragOverIndex === index;

                return (
                  <article
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    onDrop={(e) => handleDrop(e, index)}
                    className={`relative group bg-zinc-900 p-4 md:p-5 rounded-lg border transition-all ${
                      isDragging
                        ? 'drag-item-dragging'
                        : isOver
                        ? 'border-white ring-2 ring-white bg-zinc-800'
                        : 'border-zinc-800 hover:border-zinc-500 shadow-sm'
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute -left-[25px] md:-left-[29px] top-6 w-4 h-4 bg-white rounded-full border-4 border-black z-10 shadow-sm" />

                    <div className="flex flex-col md:flex-row gap-4 items-start">
                      {/* Drag Handle & Image */}
                      <div className="flex items-center gap-2 w-full md:w-auto">
                        <div 
                          className="cursor-grab active:cursor-grabbing p-1 hover:bg-zinc-800 rounded text-zinc-500 hover:text-white"
                          title="드래그하여 순서 변경"
                        >
                          <GripVertical className="w-5 h-5" />
                        </div>

                        <div 
                          onClick={() => onOpenPhotoModal(item.image, item.title)}
                          className="relative w-full md:w-48 h-32 flex-shrink-0 rounded-md overflow-hidden border border-zinc-800 bg-zinc-950 cursor-pointer group/img"
                          title="클릭하여 원본 사진 보기 (드래그/확대 가능)"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover grayscale-[40%] group-hover/img:grayscale-0 transition-all duration-300"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1">
                            <ImageIcon className="w-4 h-4" /> 크게 보기
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-grow w-full">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-white text-black px-2 py-0.5 rounded">
                                {item.category}
                              </span>
                              <span className="text-xs text-zinc-400 font-medium flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {item.time}
                              </span>
                            </div>

                            <h4 className="font-bold text-lg text-white mb-1">{item.title}</h4>

                            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                              <span className="font-bold text-white">★ {item.rating}</span>
                              <span className="text-zinc-500">/ {item.reviewCount.toLocaleString()} Google reviews</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => onOpenMapModal([item])}
                              className="p-2 border border-zinc-800 rounded hover:bg-zinc-800 transition-colors text-white"
                              title="지도 및 위치 보기"
                            >
                              <MapPin className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="p-2 border border-zinc-800 rounded hover:bg-red-950/40 hover:border-red-800 text-zinc-500 hover:text-red-400 transition-colors"
                              title="일정에서 삭제"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <p className="mt-2 text-xs md:text-sm text-zinc-300 leading-relaxed">
                          {item.description}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            onClick={() => onOpenMapModal(currentDay.items)}
                            className="bg-white text-black px-3 py-1.5 rounded text-xs font-bold hover:bg-zinc-200 transition-colors"
                          >
                            지도 보기
                          </button>
                          <button
                            onClick={() => alert(`${item.title} 주변 동선 추천 경로가 추가되었습니다.`)}
                            className="border border-zinc-700 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-zinc-800 transition-colors"
                          >
                            동선 추가
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>

          {/* Add Place Button Container */}
          <div className="mt-10 py-10 border-2 border-dashed border-zinc-800 rounded-lg flex flex-col items-center justify-center text-zinc-400 bg-zinc-950">
            <button
              onClick={() => setIsAddPlaceModalOpen(true)}
              className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center mb-3 hover:scale-105 active:scale-95 transition-transform shadow-lg"
            >
              <Plus className="w-6 h-6" />
            </button>
            <p className="font-bold text-sm text-white">새로운 장소를 추가하여 일정을 완성하세요</p>
            <p className="text-xs text-zinc-500 mt-1">구글 맵 고평점 맛집, 카페, 명소를 선택할 수 있습니다.</p>
          </div>
        </div>
      </div>

      {/* Modal: Add Custom Place */}
      {isAddPlaceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-950 rounded-lg max-w-md w-full p-6 shadow-2xl border border-zinc-800 text-white">
            <h3 className="text-xl font-bold text-white mb-4">Day {activeDayNumber}에 장소 추가</h3>

            <form onSubmit={handleAddCustomPlace} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">장소/상호명</label>
                <input
                  type="text"
                  required
                  value={newPlaceTitle}
                  onChange={(e) => setNewPlaceTitle(e.target.value)}
                  placeholder="예: 시부야 스카이 전망대, 이치란 라멘"
                  className="w-full h-10 px-3 bg-zinc-900 border border-zinc-800 text-white rounded font-medium text-sm focus:border-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">카테고리</label>
                  <select
                    value={newPlaceCategory}
                    onChange={(e) => setNewPlaceCategory(e.target.value as CategoryType)}
                    className="w-full h-10 px-3 bg-zinc-900 border border-zinc-800 text-white rounded font-medium text-sm focus:border-white focus:outline-none"
                  >
                    <option value="RESTAURANT" className="bg-zinc-900 text-white">RESTAURANT (맛집)</option>
                    <option value="CAFE" className="bg-zinc-900 text-white">CAFE (카페)</option>
                    <option value="SIGHTSEEING" className="bg-zinc-900 text-white">SIGHTSEEING (명소)</option>
                    <option value="SHOPPING" className="bg-zinc-900 text-white">SHOPPING (쇼핑)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">방문 시간</label>
                  <input
                    type="text"
                    value={newPlaceTime}
                    onChange={(e) => setNewPlaceTime(e.target.value)}
                    className="w-full h-10 px-3 bg-zinc-900 border border-zinc-800 text-white rounded font-medium text-sm focus:border-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">설명 / 메모</label>
                <textarea
                  rows={3}
                  value={newPlaceDesc}
                  onChange={(e) => setNewPlaceDesc(e.target.value)}
                  placeholder="특징이나 꼭 먹어봐야 할 메뉴를 적어주세요."
                  className="w-full p-3 bg-zinc-900 border border-zinc-800 text-white rounded font-medium text-sm focus:border-white focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddPlaceModalOpen(false)}
                  className="flex-1 border border-zinc-800 text-zinc-300 py-2.5 rounded font-bold text-xs hover:bg-zinc-900"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-white text-black py-2.5 rounded font-bold text-xs hover:bg-zinc-200"
                >
                  일정에 추가
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
