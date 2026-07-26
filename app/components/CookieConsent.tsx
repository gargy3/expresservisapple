'use client';

import { useEffect, useState } from 'react';

const CONSENT_KEY = 'cookie-consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const handleChoice = (choice: 'accepted' | 'declined') => {
    window.localStorage.setItem(CONSENT_KEY, choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="container-narrow py-4 flex flex-col sm:flex-row items-center gap-4">
        <p className="text-xs text-text-secondary leading-relaxed flex-1">
          Tento web používá pouze anonymní analytické nástroje k měření
          návštěvnosti (bez trackovacích cookies). Více informací najdete v{' '}
          <a
            href="/obchodni-podminky"
            className="underline hover:text-primary transition-colors"
          >
            obchodních podmínkách
          </a>
          .
        </p>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={() => handleChoice('declined')}
            className="btn-secondary py-2 px-4 text-xs"
          >
            Odmítnout
          </button>
          <button
            type="button"
            onClick={() => handleChoice('accepted')}
            className="btn-primary py-2 px-4 text-xs"
          >
            Souhlasím
          </button>
        </div>
      </div>
    </div>
  );
}
