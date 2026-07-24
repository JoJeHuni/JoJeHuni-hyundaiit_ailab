import React, { useState, useRef } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Move } from 'lucide-react';

interface PhotoViewerModalProps {
  imageSrc: string;
  title: string;
  onClose: () => void;
}

export const PhotoViewerModal: React.FC<PhotoViewerModalProps> = ({
  imageSrc,
  title,
  onClose,
}) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.3, 3));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.3, 0.6));
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between select-none">
      {/* Top Header */}
      <div className="p-4 flex justify-between items-center text-white border-b border-zinc-800 z-10 bg-zinc-950/80">
        <div>
          <h3 className="font-bold text-base">{title}</h3>
          <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
            <Move className="w-3.5 h-3.5 text-zinc-300" />
            마우스를 누른 채 드래그하여 이미지를 마음대로 이동해보세요.
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Draggable & Zoomable Photo Workspace */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="flex-1 overflow-hidden relative flex items-center justify-center cursor-grab active:cursor-grabbing p-4"
      >
        <img
          src={imageSrc}
          alt={title}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.15s ease-out',
          }}
          className="max-h-[75vh] max-w-full object-contain rounded shadow-2xl pointer-events-none select-none grayscale-[20%]"
        />
      </div>

      {/* Bottom Floating Control Bar */}
      <div className="p-4 border-t border-zinc-800 flex justify-center items-center gap-3 z-10 bg-zinc-950/90">
        <button
          onClick={handleZoomOut}
          className="p-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded transition-colors"
          title="축소"
        >
          <ZoomOut className="w-5 h-5" />
        </button>

        <span className="text-xs font-mono text-zinc-300 px-2 font-bold">
          {Math.round(scale * 100)}%
        </span>

        <button
          onClick={handleZoomIn}
          className="p-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded transition-colors"
          title="확대"
        >
          <ZoomIn className="w-5 h-5" />
        </button>

        <button
          onClick={handleReset}
          className="p-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded transition-colors ml-2"
          title="위치/크기 리셋"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
