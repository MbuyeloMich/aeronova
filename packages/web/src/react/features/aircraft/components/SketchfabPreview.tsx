import { useState } from 'react';

interface SketchfabPreviewProps {
  modelId: string;
  modelName: string;
  artistName: string;
}

export function SketchfabPreview({
  modelId,
  modelName,
  artistName,
}: SketchfabPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-md transition-colors text-white/80 hover:text-white"
      >
        👁️ Preview 3D Model
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full h-full max-w-4xl max-h-[90vh] bg-black rounded-lg overflow-hidden flex flex-col">
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-colors text-white"
        >
          ✕
        </button>

        {/* Sketchfab embed */}
        <div className="flex-1 overflow-hidden relative w-full">
          <iframe
            title={modelName}
            frameBorder="0"
            width="100%"
            height="100%"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            src={`https://sketchfab.com/models/${modelId}/embed`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
        </div>

        {/* Info footer */}
        <div className="bg-black/60 border-t border-white/10 p-4">
          <p className="text-sm text-white/80">
            <strong>{modelName}</strong> by{' '}
            <a
              href={`https://sketchfab.com/jratanatharathorn`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              {artistName}
            </a>{' '}
            on{' '}
            <a
              href={`https://sketchfab.com/models/${modelId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Sketchfab
            </a>
          </p>
          <p className="text-xs text-white/60 mt-2">
            Download the GLB file from Sketchfab and place it in `packages/web/public/hondajet.glb`
            to fly with this model.
          </p>
        </div>
      </div>
    </div>
  );
}
