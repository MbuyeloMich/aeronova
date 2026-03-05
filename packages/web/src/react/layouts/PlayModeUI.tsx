import { ControlsPanel } from '../features/controls/components/ControlsPanel';
import { MiniMap } from '../features/minimap/components/MiniMap';
import { LocationSelector } from '../features/location/components/LocationSelector';

export function PlayModeUI() {
  return (
    <>
      <ControlsPanel />
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <LocationSelector />
      </div>
      <MiniMap />
    </>
  );
}
