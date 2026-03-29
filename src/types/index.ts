export interface OnewayRoad {
  id: string;
  road_name: string;
  lga: string;
  latitude: number;
  longitude: number;
  direction_start_lat: number;
  direction_start_lng: number;
  direction_end_lat: number;
  direction_end_lng: number;
  photo_url: string;
  safety_note: string;
  created_at: string;
  updated_at: string;
}

export interface RoadReport {
  id?: string;
  road_name: string;
  lga: string;
  latitude: number;
  longitude: number;
  description: string;
  photo_url?: string;
  status?: string;
  created_at?: string;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
  heading: number | null;
}

export type DrivingStatus = 'safe' | 'warning' | 'danger';

export type NavigationPage = 'map' | 'report' | 'info' | 'settings';
