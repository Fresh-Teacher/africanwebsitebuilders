import React from 'react';
import { X } from 'lucide-react';

const ControlButton = ({ onClick, className = '', children, tooltip }) => (
  <button
    onClick={onClick}
    className={`group relative p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 
    transform transition-all duration-200 hover:scale-105 
    focus:outline-none focus:ring-2 focus:ring-white/50 ${className}`}
    title={tooltip}
  >
    {children}
    {tooltip && (
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 
        text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity
        pointer-events-none whitespace-nowrap hidden sm:block">
        {tooltip}
      </span>
    )}
  </button>
);

const VideoPlayer = ({ videoUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="relative w-full max-w-3xl rounded-lg overflow-hidden bg-black shadow-2xl">
        <ControlButton 
          onClick={onClose}
          className="absolute top-2 right-2 z-10 bg-black/40 hover:bg-black/60"
          tooltip="Close"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </ControlButton>

        <div className="aspect-video relative">
          <video
            className="w-full h-full"
            src={videoUrl}
            controls
            playsInline
            autoPlay
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;