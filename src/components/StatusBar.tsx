import { DrivingStatus } from '../types';

interface StatusBarProps {
  currentStreet: string;
  status: DrivingStatus;
}

export function StatusBar({ currentStreet, status }: StatusBarProps) {
  const statusConfig = {
    safe: {
      bg: 'bg-green-600',
      text: 'Safe Direction',
      icon: '✓',
    },
    warning: {
      bg: 'bg-yellow-500',
      text: 'One-Way Ahead',
      icon: '⚠',
    },
    danger: {
      bg: 'bg-red-600 animate-pulse',
      text: 'WRONG WAY!',
      icon: '⛔',
    },
  };

  const config = statusConfig[status];

  return (
    <div className={`${config.bg} text-white px-4 py-4 shadow-lg`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-xs opacity-90 mb-1">Current Location</div>
          <div className="font-bold text-lg leading-tight">
            {currentStreet || 'Locating...'}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-3xl">{config.icon}</span>
          <div className="text-right">
            <div className="text-sm font-semibold">{config.text}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
