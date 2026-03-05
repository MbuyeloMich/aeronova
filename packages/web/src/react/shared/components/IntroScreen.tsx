import { useState, useEffect, useRef } from 'react';
import { Button } from './Button';
import { isMobileDevice } from '../utils/mobileDetect';
import { gsap } from 'gsap';

export function IntroScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const popupRef = useRef<HTMLDivElement>(null);
  const isMobile = isMobileDevice();

  useEffect(() => {
    if (popupRef.current) {
      gsap.fromTo(popupRef.current, 
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' }
      );
    }
  }, []);

  const handleStart = () => {
    if (popupRef.current) {
      gsap.to(popupRef.current, {
        scale: 0.8,
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => setIsVisible(false)
      });
    } else {
      setIsVisible(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[180] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center">
      <div ref={popupRef} className="max-w-2xl w-full mx-4">
        <div className="bg-gradient-to-br from-slate-900/98 to-slate-800/98 border-2 border-cyan-400/50 rounded-2xl p-8 space-y-6 backdrop-blur-md shadow-2xl shadow-cyan-400/20">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent animate-pulse" 
                style={{ fontFamily: '"Press Start 2P", "Courier New", monospace', textShadow: '0 0 20px #00ffff' }}>
              AERO NOVA
            </h1>
            <p className="text-cyan-200/80 text-sm font-mono tracking-wider">
              {isMobile
                ? 'TOUCH CONTROLS FOR INTUITIVE FLIGHT'
                : 'MASTER THE SKIES WITH THESE SIMPLE CONTROLS'}
            </p>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            {isMobile ? <MobileControls /> : <DesktopControls />}
          </div>

          {/* Quick Tips */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-xl p-4">
            <h3 className="text-xs uppercase tracking-wider text-cyan-300 font-bold mb-3 font-mono">
              QUICK TIPS
            </h3>
            <ul className="space-y-2 text-xs text-cyan-100/70 font-mono">
              {isMobile ? (
                <>
                  <li>• SWIPE LEFT/RIGHT TO ROLL (BANKING)</li>
                  <li>• SWIPE UP/DOWN TO CLIMB/DESCEND</li>
                  <li>• RIGHT SLIDER CONTROLS SPEED (THROTTLE)</li>
                  <li>• TAP TO BRAKE OR USE EMERGENCY CONTROLS</li>
                </>
              ) : (
                <>
                  <li>• WASD OR ARROW KEYS TO MOVE</li>
                  <li>• MOUSE TO LOOK AROUND</li>
                  <li>• SPACEBAR TO THROTTLE UP</li>
                  <li>• SHIFT TO THROTTLE DOWN</li>
                  <li>• B TO TOGGLE BUILDER MODE</li>
                </>
              )}
            </ul>
          </div>

          {/* Start Button */}
          <div className="text-center pt-4">
            <Button
              onClick={handleStart}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 
                         text-black font-bold py-3 px-8 rounded-lg text-lg font-mono tracking-wider
                         shadow-lg shadow-cyan-400/50 hover:shadow-cyan-300/70 transition-all duration-300
                         border-2 border-cyan-300 hover:border-cyan-200 transform hover:scale-105"
            >
              START FLIGHT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileControls() {
  return (
    <div className="space-y-4">
      {/* Touch Controls */}
      <div className="space-y-3">
        <h3 className="text-xs uppercase tracking-wider text-cyan-300 font-bold font-mono">
          TOUCH CONTROLS
        </h3>
        <div className="space-y-2.5">
          <TouchControlRow
            icon="↔️"
            action="SWIPE LEFT/RIGHT"
            description="ROLL PLANE (BANKING)"
          />
          <TouchControlRow
            icon="↕️"
            action="SWIPE UP/DOWN"
            description="CLIMB/DESCEND"
          />
          <TouchControlRow
            icon="🎚️"
            action="RIGHT SLIDER"
            description="CONTROL SPEED (THROTTLE)"
          />
        </div>
      </div>
    </div>
  );
}

function DesktopControls() {
  return (
    <div className="space-y-4">
      {/* Desktop Controls */}
      <div className="space-y-3">
        <h3 className="text-xs uppercase tracking-wider text-cyan-300 font-bold font-mono">
          DESKTOP CONTROLS
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <ControlRow keyName="WASD" description="MOVE AIRCRAFT" />
            <ControlRow keyName="MOUSE" description="LOOK AROUND" />
            <ControlRow keyName="SPACE" description="THROTTLE UP" />
          </div>
          <div className="space-y-2">
            <ControlRow keyName="SHIFT" description="THROTTLE DOWN" />
            <ControlRow keyName="B" description="BUILDER MODE" />
            <ControlRow keyName="M" description="GROUND MODE" />
          </div>
        </div>
      </div>
    </div>
  );
}

function TouchControlRow({ icon, action, description }: { icon: string; action: string; description: string }) {
  return (
    <div className="flex items-center gap-3 bg-slate-800/50 border border-cyan-400/20 rounded-lg p-3">
      <span className="text-lg">{icon}</span>
      <div className="flex-1">
        <div className="text-cyan-200 font-mono text-xs font-bold">{action}</div>
        <div className="text-cyan-100/60 font-mono text-xs">{description}</div>
      </div>
    </div>
  );
}

function ControlRow({ keyName, description }: { keyName: string; description: string }) {
  return (
    <div className="flex items-center gap-3">
      <kbd className="bg-cyan-500/20 border border-cyan-400/40 rounded px-2 py-1 text-cyan-200 font-mono text-xs font-bold min-w-[60px] text-center">
        {keyName}
      </kbd>
      <span className="text-cyan-100/70 font-mono text-xs">{description}</span>
    </div>
  );
}


