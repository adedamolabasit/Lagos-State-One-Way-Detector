import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { Icon, LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { OnewayRoad, UserLocation } from '../types';
import { Navigation2 } from 'lucide-react';

interface MapViewProps {
  userLocation: UserLocation | null;
  onewayRoads: OnewayRoad[];
  onRoadClick: (road: OnewayRoad) => void;
}

function LocationMarker({ location }: { location: UserLocation }) {
  const map = useMap();

  useEffect(() => {
    map.setView([location.latitude, location.longitude], map.getZoom());
  }, [location, map]);

  return (
    <Marker
      position={[location.latitude, location.longitude]}
      icon={
        new Icon({
          iconUrl:
            'data:image/svg+xml;base64,' +
            btoa(`
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" fill="#3B82F6"/>
              <circle cx="12" cy="12" r="4" fill="white"/>
            </svg>
          `),
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        })
      }
    />
  );
}

export function MapView({ userLocation, onewayRoads, onRoadClick }: MapViewProps) {
  const [selectedRoad, setSelectedRoad] = useState<OnewayRoad | null>(null);

  const defaultCenter: [number, number] = [6.5244, 3.3792];

  const handleRoadClick = (road: OnewayRoad) => {
    setSelectedRoad(road);
    onRoadClick(road);
  };

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {userLocation && <LocationMarker location={userLocation} />}

        {onewayRoads.map((road) => {
          const start: [number, number] = [
            road.direction_start_lat,
            road.direction_start_lng,
          ];
          const end: [number, number] = [
            road.direction_end_lat,
            road.direction_end_lng,
          ];

          return (
            <div key={road.id}>
              <Polyline
                positions={[start, end]}
                pathOptions={{ color: '#EF4444', weight: 4, opacity: 0.8 }}
                eventHandlers={{
                  click: () => handleRoadClick(road),
                }}
              />
              <Marker
                position={[road.latitude, road.longitude]}
                icon={
                  new Icon({
                    iconUrl:
                      'data:image/svg+xml;base64,' +
                      btoa(`
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                        <circle cx="12" cy="12" r="10" fill="#EF4444"/>
                        <path d="M8 12 L16 12" stroke="white" stroke-width="3"/>
                        <path d="M12 8 L16 12 L12 16" stroke="white" stroke-width="2" fill="none"/>
                      </svg>
                    `),
                    iconSize: [32, 32],
                    iconAnchor: [16, 16],
                  })
                }
                eventHandlers={{
                  click: () => handleRoadClick(road),
                }}
              >
                <Popup>
                  <div className="text-gray-900 min-w-[200px]">
                    <h3 className="font-bold text-lg mb-2">{road.road_name}</h3>
                    <p className="text-sm mb-1">
                      <strong>LGA:</strong> {road.lga}
                    </p>
                    {road.safety_note && (
                      <p className="text-sm mb-2 bg-yellow-100 p-2 rounded">
                        {road.safety_note}
                      </p>
                    )}
                    {road.photo_url && (
                      <img
                        src={road.photo_url}
                        alt={road.road_name}
                        className="w-full h-32 object-cover rounded mt-2"
                      />
                    )}
                    <div className="flex items-center gap-1 text-xs text-red-600 mt-2">
                      <Navigation2 className="w-4 h-4" />
                      <span>One-Way Traffic</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </div>
          );
        })}
      </MapContainer>

      <div className="absolute top-4 right-4 z-[1000] bg-gray-900/90 text-white px-3 py-2 rounded-lg text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Your Location</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>One-Way Road</span>
        </div>
      </div>
    </div>
  );
}
