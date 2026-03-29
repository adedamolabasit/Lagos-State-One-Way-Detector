import { Volume2, VolumeX, Moon, Sun } from 'lucide-react';

interface SettingsPageProps {
  soundEnabled: boolean;
  onSoundToggle: () => void;
}

export function SettingsPage({ soundEnabled, onSoundToggle }: SettingsPageProps) {
  return (
    <div className="h-full bg-gray-900 text-white p-4 overflow-y-auto pb-20">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>

      <div className="space-y-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {soundEnabled ? (
                <Volume2 className="w-6 h-6 text-blue-400" />
              ) : (
                <VolumeX className="w-6 h-6 text-gray-500" />
              )}
              <div>
                <h3 className="font-semibold">Audio Alerts</h3>
                <p className="text-sm text-gray-400">
                  Sound warnings for one-way roads
                </p>
              </div>
            </div>
            <button
              onClick={onSoundToggle}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                soundEnabled ? 'bg-blue-600' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  soundEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="w-6 h-6 text-blue-400" />
              <div>
                <h3 className="font-semibold">Dark Mode</h3>
                <p className="text-sm text-gray-400">
                  Optimized for night driving
                </p>
              </div>
            </div>
            <button
              disabled
              className="relative inline-flex h-7 w-12 items-center rounded-full bg-blue-600 opacity-50 cursor-not-allowed"
            >
              <span className="inline-block h-5 w-5 transform rounded-full bg-white translate-x-6" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Dark mode is always enabled for safety
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="font-semibold mb-3">Alert Distance</h3>
          <p className="text-sm text-gray-400 mb-3">
            You'll be notified when approaching one-way roads
          </p>
          <div className="bg-gray-700 rounded p-3 text-center">
            <div className="text-3xl font-bold text-blue-400">500m</div>
            <div className="text-xs text-gray-400 mt-1">Warning distance</div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="font-semibold mb-2">About</h3>
          <div className="text-sm text-gray-400 space-y-1">
            <p>
              <strong className="text-white">Version:</strong> 1.0.0
            </p>
            <p>
              <strong className="text-white">Purpose:</strong> Help Lagos
              drivers navigate one-way roads safely
            </p>
            <p className="text-xs text-gray-500 mt-3">
              This app uses your location to provide real-time alerts about
              one-way roads in Lagos, Nigeria.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
