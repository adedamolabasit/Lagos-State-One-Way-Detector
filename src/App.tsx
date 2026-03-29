import { useState, useEffect, useRef } from 'react';
import { StatusBar } from './components/StatusBar';
import { MapView } from './components/MapView';
import { AlertCard } from './components/AlertCard';
import { BottomNav } from './components/BottomNav';
import { ReportPage } from './components/ReportPage';
import { InfoPage } from './components/InfoPage';
import { SettingsPage } from './components/SettingsPage';
import { supabase } from './lib/supabase';
import { calculateDistance, calculateBearing, isHeadingOpposite } from './utils/geo';
import { OnewayRoad, UserLocation, DrivingStatus, NavigationPage } from './types';

const WARNING_DISTANCE = 500;
const DANGER_DISTANCE = 50;

function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('map');
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [onewayRoads, setOnewayRoads] = useState<OnewayRoad[]>([]);
  const [status, setStatus] = useState<DrivingStatus>('safe');
  const [currentStreet, setCurrentStreet] = useState('');
  const [nearbyRoad, setNearbyRoad] = useState<OnewayRoad | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [distance, setDistance] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastAlertRef = useRef<string>('');

  useEffect(() => {
    loadOnewayRoads();
    startLocationTracking();
  }, []);

  useEffect(() => {
    if (userLocation && onewayRoads.length > 0) {
      checkProximity();
    }
  }, [userLocation, onewayRoads]);

  const loadOnewayRoads = async () => {
    const { data, error } = await supabase
      .from('oneway_roads')
      .select('*')
      .order('created_at', { ascending: false });

      console.log(onewayRoads,"jjeje")

    if (error) {
      console.error('Error loading roads:', error);
      return;
    }

    if (data) {
      setOnewayRoads(data);
    }
  };

  const startLocationTracking = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            heading: position.coords.heading,
          });
          reverseGeocode(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setCurrentStreet('Location unavailable');
        },
        {
          enableHighAccuracy: true,
          maximumAge: 1000,
          timeout: 5000,
        }
      );
    } else {
      setCurrentStreet('Geolocation not supported');
    }
  };

  const reverseGeocode = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const data = await response.json();
      if (data.address) {
        const street = data.address.road || data.address.suburb || data.address.city || 'Unknown location';
        setCurrentStreet(street);
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  };

  const checkProximity = () => {
    if (!userLocation) return;

    let closestRoad: OnewayRoad | null = null;
    let minDistance = Infinity;

    onewayRoads.forEach((road) => {
      const dist = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        road.latitude,
        road.longitude
      );

      if (dist < minDistance) {
        minDistance = dist;
        closestRoad = road;
      }
    });

    if (closestRoad && minDistance < WARNING_DISTANCE) {
      const roadBearing = calculateBearing(
        closestRoad.direction_start_lat,
        closestRoad.direction_start_lng,
        closestRoad.direction_end_lat,
        closestRoad.direction_end_lng
      );

      const isDanger =
        userLocation.heading !== null &&
        isHeadingOpposite(userLocation.heading, roadBearing) &&
        minDistance < DANGER_DISTANCE;

      if (isDanger) {
        setStatus('danger');
        playAlert('danger');
      } else if (minDistance < WARNING_DISTANCE) {
        setStatus('warning');
        playAlert('warning');
      } else {
        setStatus('safe');
      }

      setNearbyRoad(closestRoad);
      setDistance(minDistance);
      setAlertVisible(true);
    } else {
      setStatus('safe');
      setAlertVisible(false);
      setNearbyRoad(null);
    }
  };

  const playAlert = (type: 'warning' | 'danger') => {
    if (!soundEnabled) return;

    if (lastAlertRef.current === type) return;
    lastAlertRef.current = type;

    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = type === 'danger' ? 800 : 600;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.5
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);

    setTimeout(() => {
      lastAlertRef.current = '';
    }, 3000);
  };

  const handleRoadClick = (road: OnewayRoad) => {
    setNearbyRoad(road);
    setAlertVisible(true);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 overflow-hidden">
      <StatusBar currentStreet={currentStreet} status={status} />

      {alertVisible && nearbyRoad && (
        <AlertCard
          road={nearbyRoad}
          distance={distance}
          isDanger={status === 'danger'}
          onDismiss={() => setAlertVisible(false)}
        />
      )}

      <div className="flex-1 relative overflow-hidden">
        {currentPage === 'map' && (
          <MapView
            userLocation={userLocation}
            onewayRoads={onewayRoads}
            onRoadClick={handleRoadClick}
          />
        )}
        {currentPage === 'report' && <ReportPage userLocation={userLocation} />}
        {currentPage === 'info' && <InfoPage />}
        {currentPage === 'settings' && (
          <SettingsPage
            soundEnabled={soundEnabled}
            onSoundToggle={() => setSoundEnabled(!soundEnabled)}
          />
        )}
      </div>

      <BottomNav currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
}

export default App;
