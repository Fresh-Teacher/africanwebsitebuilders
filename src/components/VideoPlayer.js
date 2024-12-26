import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, MinimizeIcon } from 'lucide-react';

const VideoPlayer = ({ url, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-gray-900 shadow-lg">
      <div className="aspect-video relative">
        <iframe 
          src={`${url}${url.includes('?') ? '&' : '?'}autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        
        {/* Overlay for title */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent">
          <h3 className="text-white font-semibold text-lg">{title}</h3>
        </div>

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent flex items-center gap-4">
          <button 
            onClick={togglePlay}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
          </button>
          
          <button 
            onClick={toggleMute}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
          </button>
          
          <button 
            onClick={toggleFullscreen}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors ml-auto"
          >
            {isFullscreen ? 
              <MinimizeIcon className="w-5 h-5 text-white" /> : 
              <Maximize className="w-5 h-5 text-white" />
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;