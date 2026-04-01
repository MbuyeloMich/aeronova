import { IntroScreen } from './shared/components/IntroScreen';
import { DebugPanel } from './features/debug/components/DebugPanel';
import { CameraControls } from './features/camera/components/CameraControls';
import { PlayModeUI } from './layouts/PlayModeUI';
import { BuilderModeUI } from './layouts/BuilderModeUI';
import { ModeToggle } from './features/builder/components/ModeToggle';
import { useGameMode } from './hooks/useGameMode';
import { ThrottleSlider } from './features/controls/components/mobile/ThrottleSlider';
import { isMobileDevice } from './shared/utils/mobileDetect';
import { useGameMethod } from './hooks/useGameMethod';
import { HUD } from './features/hud/components/HUD';
import { CrashScreen } from './features/crash/components/CrashScreen';

export function App() {
  const { mode } = useGameMode();

  const isMobile = isMobileDevice();
  const { setThrottle } = useGameMethod();

  const handleThrottleChange = (percent: number) => {
    setThrottle(percent / 100);
  };

  return (
    <>
      {/* Global UI - always visible */}
      <IntroScreen />
      <DebugPanel />
      
      {/* Global mode toggle + camera control container */}
      <div className="fixed top-12 right-16 z-50 pointer-events-auto flex flex-col items-end gap-3">
        <ModeToggle />
        {/* camera control is only available in play mode */}
        {mode === 'play' && !isMobile && <CameraControls />}
      </div>
      
      {/* Mode-specific UI */}
      {mode === 'play' && !isMobile && <PlayModeUI />}      {mode === 'builder' && <BuilderModeUI />}
      <HUD />
      {isMobile && <ThrottleSlider onChange={handleThrottleChange} />}
      <CrashScreen />
    </>
  );
}
