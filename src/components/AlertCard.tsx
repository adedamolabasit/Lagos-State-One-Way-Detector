import { AlertTriangle, Navigation } from 'lucide-react';
import { OnewayRoad } from '../types';

interface AlertCardProps {
  road: OnewayRoad;
  distance: number;
  isDanger: boolean;
  onDismiss: () => void;
}

export function AlertCard({ road, distance, isDanger, onDismiss }: AlertCardProps) {
  return (
    <div
      className={`fixed top-20 left-4 right-4 z-[1000] ${
        isDanger ? 'bg-red-600 animate-pulse' : 'bg-yellow-500'
      } text-white rounded-lg shadow-2xl p-4`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1">
            {isDanger ? 'WRONG DIRECTION!' : 'One-Way Road Ahead'}
          </h3>
          <p className="text-sm mb-2">
            {road.road_name} ({road.lga})
          </p>
          <p className="text-sm opacity-90">
            {isDanger
              ? 'You are driving against traffic flow!'
              : `${Math.round(distance)}m ahead - Prepare to follow one-way direction`}
          </p>
          {road.safety_note && (
            <p className="text-xs mt-2 bg-black/20 p-2 rounded">
              {road.safety_note}
            </p>
          )}
        </div>
        <button
          onClick={onDismiss}
          className="flex-shrink-0 text-white/80 hover:text-white text-2xl leading-none"
        >
          ×
        </button>
      </div>
      {isDanger && (
        <div className="flex items-center gap-2 mt-3 bg-black/30 p-2 rounded">
          <Navigation className="w-5 h-5" />
          <span className="text-sm font-semibold">Turn around immediately</span>
        </div>
      )}
    </div>
  );
}
