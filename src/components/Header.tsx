import React from 'react';
import { Menu, User, Bell } from 'lucide-react';

interface HeaderProps {
  onOpenDrawer?: () => void;
  activeTab: string;
  unreadAlertCount?: number;
  onSelectTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDrawer,
  activeTab,
  unreadAlertCount = 2,
  onSelectTab,
}) => {
  return (
    <header className="bg-zinc-950 border-b border-zinc-800 sticky top-0 z-40 w-full transition-all text-white">
      <div className="flex justify-between items-center px-5 h-16 w-full max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenDrawer}
            className="p-2 rounded hover:bg-zinc-900 transition-colors active:scale-95 text-zinc-300 hover:text-white"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div 
            onClick={() => onSelectTab('explore')}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
              <div className="w-3.5 h-3.5 border-2 border-black rotate-45" />
            </div>
            <h1 className="font-bold text-lg md:text-xl uppercase tracking-tighter text-white">
              NOMAD PLANNER
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectTab('alerts')}
            className="relative p-2 rounded-full hover:bg-zinc-900 text-zinc-300 hover:text-white transition-colors"
            title="알림 모니터링"
          >
            <Bell className="w-5 h-5" />
            {unreadAlertCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-zinc-950 animate-pulse" />
            )}
          </button>

          <button 
            onClick={() => onSelectTab('alerts')}
            className="hover:opacity-80 transition-opacity active:scale-95"
            title="프로필 / 일정 관리"
          >
            <div className="w-8 h-8 rounded-full border border-zinc-700 bg-zinc-900 text-white flex items-center justify-center font-bold text-xs uppercase">
              ST
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
