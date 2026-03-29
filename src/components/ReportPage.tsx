import { useState } from 'react';
import { MapPin, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { RoadReport, UserLocation } from '../types';

interface ReportPageProps {
  userLocation: UserLocation | null;
}

export function ReportPage({ userLocation }: ReportPageProps) {
  const [roadName, setRoadName] = useState('');
  const [lga, setLga] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userLocation) {
      alert('Please enable location services');
      return;
    }

    setSubmitting(true);
    try {
      const report: RoadReport = {
        road_name: roadName,
        lga,
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        description,
      };

      const { error } = await supabase.from('road_reports').insert([report]);

      if (error) throw error;

      setSuccess(true);
      setRoadName('');
      setLga('');
      setDescription('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-full bg-gray-900 text-white p-4 overflow-y-auto pb-20">
      <h2 className="text-2xl font-bold mb-4">Report Missing Road Sign</h2>
      <p className="text-gray-400 text-sm mb-6">
        Help improve road safety by reporting missing or unclear one-way road signs in Lagos.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Road Name</label>
          <input
            type="text"
            value={roadName}
            onChange={(e) => setRoadName(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            placeholder="e.g., Awolowo Road"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Local Government Area
          </label>
          <input
            type="text"
            value={lga}
            onChange={(e) => setLga(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            placeholder="e.g., Ikeja"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 h-32"
            placeholder="Describe the issue with the road sign..."
            required
          />
        </div>

        {userLocation && (
          <div className="bg-gray-800 rounded-lg p-3 flex items-start gap-2">
            <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <div className="text-gray-400">Current Location</div>
              <div className="font-mono text-xs text-gray-500 mt-1">
                {userLocation.latitude.toFixed(6)}, {userLocation.longitude.toFixed(6)}
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <Send className="w-5 h-5" />
          {submitting ? 'Submitting...' : 'Submit Report'}
        </button>

        {success && (
          <div className="bg-green-600 text-white p-4 rounded-lg text-center">
            Report submitted successfully! Thank you for helping improve road safety.
          </div>
        )}
      </form>
    </div>
  );
}
