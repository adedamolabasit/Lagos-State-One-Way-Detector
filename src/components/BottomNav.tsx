import { Map, FileText, Info, Settings } from 'lucide-react';
import { NavigationPage } from '../types';

interface BottomNavProps {
  currentPage: NavigationPage;
  onPageChange: (page: NavigationPage) => void;
}

export function BottomNav({ currentPage, onPageChange }: BottomNavProps) {
  const navItems = [
    { id: 'map' as NavigationPage, icon: Map, label: 'Map' },
    { id: 'report' as NavigationPage, icon: FileText, label: 'Report' },
    { id: 'info' as NavigationPage, icon: Info, label: 'Info' },
    { id: 'settings' as NavigationPage, icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 z-[1000]">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`flex-1 flex flex-col items-center py-3 ${
              currentPage === item.id
                ? 'text-blue-400'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
