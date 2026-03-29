import { AlertTriangle, Navigation, Shield, Bell } from 'lucide-react';

export function InfoPage() {
  return (
    <div className="h-full bg-gray-900 text-white p-4 overflow-y-auto pb-20">
      <h2 className="text-2xl font-bold mb-4">Road Safety Information</h2>

      <div className="space-y-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg mb-2">How It Works</h3>
              <p className="text-gray-400 text-sm">
                This app uses your GPS location to detect when you're approaching
                one-way roads in Lagos. You'll receive alerts 500 meters before a
                one-way road and immediate warnings if you're driving in the wrong
                direction.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Bell className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg mb-2">Alert System</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 font-bold">●</span>
                  <span>
                    <strong className="text-green-400">Green:</strong> Safe to
                    drive - No one-way roads nearby
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">●</span>
                  <span>
                    <strong className="text-yellow-400">Yellow:</strong>{' '}
                    Approaching one-way - Prepare to follow direction
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">●</span>
                  <span>
                    <strong className="text-red-400">Red:</strong> Wrong
                    direction - Turn around immediately
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Navigation className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg mb-2">Common One-Way Areas</h3>
              <p className="text-gray-400 text-sm mb-2">
                Be extra careful in these Lagos areas known for one-way roads:
              </p>
              <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
                <li>Victoria Island</li>
                <li>Ikoyi</li>
                <li>Lagos Island</li>
                <li>Ikeja GRA</li>
                <li>Lekki Phase 1</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg mb-2 text-red-400">
                Safety Reminder
              </h3>
              <p className="text-gray-300 text-sm">
                Always pay attention to physical road signs and traffic. This app
                is a supplementary tool and should not replace careful driving.
                Report any missing or unclear road signs to help other drivers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
