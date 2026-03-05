import { useMemo, useState } from 'react';
import { useGameMethod } from '../../../hooks/useGameMethod';
import { SketchfabPreview } from './SketchfabPreview';

export function AircraftSelector() {
  const { getAircraftPresets, getActiveAircraftPresetId, setAircraftPreset } = useGameMethod();
  const presets = useMemo(() => getAircraftPresets(), [getAircraftPresets]);
  const [activeId, setActiveId] = useState(() => getActiveAircraftPresetId());

  return (
    <div className="glass-panel px-2 py-2 flex flex-col items-start gap-1.5">
      <div className="flex flex-wrap gap-1.5">
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => {
              setAircraftPreset(preset.id);
              setActiveId(preset.id);
            }}
            className={`px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors ${
              activeId === preset.id
                ? 'bg-white/20 text-white'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
            title={`${preset.name} (${preset.maxSpeed} km/h)`}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* HondaJet preview and download section */}
      {activeId === 'honda-ha420-hondajet' && (
        <div className="flex flex-col gap-2 mt-2 w-full">
          <div className="flex gap-2">
            <SketchfabPreview
              modelId="5a9b43379b5a4d4eb7d4513d8e9ac296"
              modelName="Honda HA-420"
              artistName="Yo Boy"
            />
            <a
              href="https://sketchfab.com/models/5a9b43379b5a4d4eb7d4513d8e9ac296"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 rounded-md transition-colors text-blue-300 hover:text-blue-200"
            >
              📦 Download GLB
            </a>
          </div>
          <p className="text-xs text-white/50 leading-snug">
            Save the GLB file to <code className="bg-white/5 px-1">packages/web/public/hondajet.glb</code> and restart dev server.
          </p>
        </div>
      )}
    </div>
  );
}
