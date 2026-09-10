import React, { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from './usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        id="btn-pwa-install"
        onClick={install}
        className="flex items-center gap-2 rounded-full bg-linear-to-r from-pink-500 to-purple-500 px-3.5 py-2 text-xs md:text-sm font-bold text-white shadow-md hover:from-pink-600 hover:to-purple-600 active:scale-95 transition-transform cursor-pointer"
        title="Install app to play offline while traveling"
      >
        <Download className="w-4 h-4" />
        <span>Save App Offline</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          id="btn-pwa-install-ios"
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 rounded-full bg-pink-100 border border-pink-300 px-3 py-1.5 text-xs font-bold text-pink-700 hover:bg-pink-200 active:scale-95 transition cursor-pointer"
          title="Install for offline travel"
        >
          <Smartphone className="w-4 h-4 text-pink-600" />
          <span>Play Offline</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border-4 border-pink-200">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-extrabold text-pink-700 flex items-center gap-2">
                  <span>👑</span> Play Offline in the Car!
                </h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="rounded-full p-1 text-gray-400 hover:bg-pink-50 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                To play while traveling without Wi-Fi:
                <br />
                <span className="font-semibold text-pink-600">1.</span> Tap the <strong>Share</strong> button at the bottom of Safari.
                <br />
                <span className="font-semibold text-pink-600">2.</span> Tap <strong>Add to Home Screen</strong>.
                <br />
                Now your princess can play anytime offline!
              </p>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full rounded-2xl bg-pink-500 py-2.5 text-sm font-bold text-white shadow hover:bg-pink-600 active:scale-98 transition"
              >
                Got It! 💖
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
