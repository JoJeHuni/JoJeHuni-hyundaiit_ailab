import React from 'react';
import { X, Navigation, MapPin, ExternalLink } from 'lucide-react';
import { ItineraryItem } from '../types';

interface MapModalProps {
  items: ItineraryItem[];
  onClose: () => void;
}

export const MapModal: React.FC<MapModalProps> = ({ items, onClose }) => {
  const openExternalGoogleMaps = () => {
    if (items.length === 0) return;
    const destination = encodeURIComponent(items[items.length - 1].address || items[0].title);
    window.open(`https://www.google.com/maps/search/?api=1&query=${destination}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-950 rounded-lg max-w-3xl w-full h-[85vh] flex flex-col overflow-hidden border border-zinc-800 text-white shadow-2xl">
        {/* Header */}
        <div className="p-4 bg-zinc-900 text-white flex justify-between items-center border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <h3 className="font-bold text-base">구글 맵 동선 지도 ({items.length}개 장소)</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-zinc-800 rounded transition-colors text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Visual Map Simulator */}
        <div className="relative flex-1 bg-zinc-950 overflow-hidden">
          {/* Simulated Dark Map Canvas Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />

          {/* Connected Route Line */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path
              d="M 120 150 Q 280 220 450 180 T 600 320"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
              strokeDasharray="6 6"
            />
          </svg>

          {/* Place Markers */}
          <div className="absolute inset-0 p-8 flex flex-col justify-around">
            {items.map((item, index) => {
              const offsets = [
                'top-[20%] left-[15%]',
                'top-[40%] left-[50%]',
                'top-[70%] left-[75%]',
                'top-[80%] left-[30%]'
              ];
              const posClass = offsets[index % offsets.length];

              return (
                <div key={item.id} className={`absolute ${posClass} group`}>
                  <div className="flex items-center gap-2 bg-white text-black px-3 py-1.5 rounded-full shadow-lg border border-zinc-300 hover:scale-110 transition-transform cursor-pointer">
                    <span className="w-5 h-5 bg-black text-white rounded-full font-black text-xs flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="font-bold text-xs whitespace-nowrap">{item.title}</span>
                  </div>
                  <span className="block text-[10px] text-zinc-300 bg-zinc-900/90 px-2 py-0.5 rounded mt-1 border border-zinc-700 font-medium">
                    ★ {item.rating} ({item.time})
                  </span>
                </div>
              );
            })}
          </div>

          <div className="absolute bottom-4 left-4 bg-zinc-900/90 backdrop-blur-md p-3 rounded-lg border border-zinc-800 text-xs font-bold text-white shadow-md">
            📍 총 예상 이동 거리: 약 4.2km (도보 + 지하철 25분)
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-zinc-900 border-t border-zinc-800 flex justify-between items-center">
          <p className="text-xs text-zinc-400">
            구글 맵 연동을 통해 실제 내비게이션 및 길찾기를 확인하실 수 있습니다.
          </p>

          <button
            onClick={openExternalGoogleMaps}
            className="bg-white text-black px-5 py-2.5 rounded font-bold text-xs flex items-center gap-2 hover:bg-zinc-200 transition-colors"
          >
            Google Maps에서 경로 열기
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
