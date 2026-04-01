import { useEffect, useRef, useState } from 'react';
import { useGameMode } from '../../../hooks/useGameMode';
import { useGameMethod } from '../../../hooks/useGameMethod';
import { RadarIcon } from '../../../shared/components/RadarIcon';

export function ModeToggle() {
  const { mode, toggleBuilder } = useGameMode();
  const { getAircraftPresets, getActiveAircraftPresetId, setAircraftPreset } = useGameMethod();
  const [isPlanesOpen, setIsPlanesOpen] = useState(false);
  const [activeAircraftId, setActiveAircraftId] = useState(() => getActiveAircraftPresetId());
  const rootRef = useRef<HTMLDivElement>(null);

  const presets = getAircraftPresets();

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsPlanesOpen(false);
      }
    };

    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div ref={rootRef} className="relative flex flex-col items-end gap-2 pointer-events-auto">
      <button
        onClick={toggleBuilder}
        className="bg-slate-900/80 border border-cyan-400/80 
                   px-4 py-2.5 hover:bg-slate-800 hover:border-cyan-300 
                   transition-all duration-300 text-cyan-100 hover:text-white text-xs font-medium 
                   tracking-wide flex items-center gap-2 group rounded-lg backdrop-blur-sm shadow-lg"
        title={mode === 'play' ? 'Enter Builder Mode (B)' : 'Exit Builder Mode (B)'}
      >
        <div className={`w-1.5 h-1.5 rounded-full ${mode === 'builder' ? 'bg-yellow-400' : 'bg-cyan-400'} animate-pulse`} />
        <span>{mode === 'play' ? 'Builder' : 'Play'}</span>
      </button>

      {mode === 'play' && (
        <>
          <button
            onClick={() => setIsPlanesOpen((prev) => !prev)}
            className="bg-slate-900/80 border border-cyan-400/80 
                       px-4 py-2.5 hover:bg-slate-800 hover:border-cyan-300 
                       transition-all duration-300 text-cyan-100 hover:text-white text-xs font-medium 
                       tracking-wide rounded-lg backdrop-blur-sm flex items-center gap-2 shadow-lg"
            title="Choose Aircraft"
          >
            <RadarIcon size={16} className="animate-pulse" />
            Aircraft
          </button>

          {isPlanesOpen && (
            <div className="absolute top-full right-0 mt-2 z-[70] w-80 bg-gradient-to-br from-slate-900/95 to-slate-800/95 
                           border border-cyan-400/30 rounded-lg p-3 space-y-2 backdrop-blur-md shadow-2xl">
              {presets.map((preset) => (
                <div key={preset.id} className="space-y-2">
                  <button
                    onClick={() => {
                      setAircraftPreset(preset.id);
                      setActiveAircraftId(preset.id);
                      setIsPlanesOpen(false);
                    }}
                    className={`w-full px-3 py-2 rounded-md text-left text-xs transition-all duration-300 ${
                      activeAircraftId === preset.id
                        ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border border-cyan-300/50 text-cyan-50 shadow-lg'
                        : 'bg-slate-800/50 border border-slate-600/30 text-cyan-200/70 hover:bg-slate-700/70 hover:border-cyan-400/40 hover:text-cyan-100'
                    }`}
                    title={`${preset.name} (${preset.maxSpeed} km/h)`}
                  >
                    {preset.name} • {preset.maxSpeed} km/h
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
