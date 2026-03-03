import { useEffect, useState } from 'react';

const triggers = ['scroll', 'mousemove', 'touchstart', 'click', 'keydown'];

export function useYouTubeInteractionGate() {
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    if (isActivated || typeof window === 'undefined') {
      return;
    }

    const activate = () => {
      setIsActivated(true);
    };

    triggers.forEach((eventName) => {
      window.addEventListener(eventName, activate, { passive: true });
    });

    return () => {
      triggers.forEach((eventName) => {
        window.removeEventListener(eventName, activate);
      });
    };
  }, [isActivated]);

  return isActivated;
}
