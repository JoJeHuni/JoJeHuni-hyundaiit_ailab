import React from 'react';
import { Search, Plane, Calendar, Bell } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  alertCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  alertCount = 2,
}) => {
  const tabs = [
    { id: 'explore', label: 'Explore', icon: Search },
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'itinerary', label: 'Itinerary', icon: Calendar },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: alertCount },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center h-16 px-4 bg-zinc-950 border-t border-zinc-800 z-40">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-lg transition-all active:scale-95 relative ${
              isActive
                ? 'bg-white text-black font-bold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              {tab.badge && tab.badge > 0 && !isActive && (
                <span className="absolute -top-1 -right-2 bg-green-500 text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="text-[11px] mt-0.5 font-medium tracking-tight">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
