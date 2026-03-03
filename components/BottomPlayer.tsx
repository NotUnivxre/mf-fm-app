"use client";
import { useEffect, useRef, useState } from 'react';
import { usePlayerStore } from '../store/usePlayerStore';
import { Play, Pause, SkipBack, SkipForward, Heart, Settings, Repeat, Repeat1, Maximize2 } from 'lucide-react';
import ExpandedPlayer from './ExpandedPlayer'; // <-- Tambahan import ExpandedPlayer

export default function BottomPlayer() {
  const { 
    currentTrack, isPlaying, togglePlay, 
    volume, setVolume, likedTracks, toggleLike, 
    setCurrentTime, seekCommand, setSeekCommand,
    playbackRate, setPlaybackRate, loopMode, toggleLoopMode,
    playNext, playPrevious 
  } = usePlayerStore();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTimeRaw, setCurrentTimeRaw] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [isDragging, setIsDragging] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // <-- Tambahan state buat buka tutup Expanded Player
  const [isExpanded, setIsExpanded] = useState(false); 

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.play().catch(() => togglePlay());
      else audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.playbackRate = playbackRate || 1; 
    }
  }, [volume, playbackRate]);

  useEffect(() => {
    if (seekCommand !== null && audioRef.current) {
      audioRef.current.currentTime = seekCommand;
      setCurrentTime(seekCommand);
      setSeekCommand && setSeekCommand(null);
      if (!isPlaying) togglePlay();
    }
  }, [seekCommand]);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    if (isDragging) return;
    const audio = e.currentTarget;
    setProgress((audio.currentTime / audio.duration) * 100);
    setCurrentTimeRaw(formatTime(audio.currentTime));
    setCurrentTime(audio.currentTime);
    setDuration(formatTime(audio.duration));
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    if (audioRef.current) {
      const newTime = (newProgress / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime); 
      setCurrentTimeRaw(formatTime(newTime));
    }
  };

  const handleEnded = () => {
    if (loopMode === 'song' && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      playNext(); 
    }
  };

  if (!currentTrack) return null;
  const isLiked = likedTracks.includes(currentTrack.id);
  const speedPercentage = ((playbackRate - 0.25) / 2.75) * 100;

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-40">
        <div className="bg-[#1c1c1e]/80 backdrop-blur-2xl border border-white/5 rounded-[2rem] px-6 py-3 flex items-center justify-between shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
          <audio 
            ref={audioRef} src={currentTrack.audioUrl} 
            onTimeUpdate={handleTimeUpdate} onEnded={handleEnded}
          />
          
          {/* KIRI: Cover & Info (Ditambahin fitur Click buat Expand) */}
          <div className="flex items-center gap-4 w-1/4 overflow-hidden">
            <div 
              className="relative w-12 h-12 flex-shrink-0 group cursor-pointer"
              onClick={() => setIsExpanded(true)}
              title="Expand Player"
            >
              <img src={currentTrack.coverImageUrl} alt="Cover" className={`w-full h-full rounded-full object-cover border-2 border-white/10 shadow-md transition-all ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''} group-hover:blur-[2px]`} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#1c1c1e] rounded-full border border-gray-600 group-hover:hidden"></div>
              
              {/* Icon Maximize muncul pas di-hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-black/40">
                 <Maximize2 size={16} className="text-white" />
              </div>
            </div>
            <div className="w-full mask-fade overflow-hidden">
              <h4 className="font-bold text-white text-sm truncate">{currentTrack.title}</h4>
              <p className="text-xs text-gray-400 truncate">{currentTrack.artist}</p>
            </div>
          </div>

          {/* TENGAH: Player Controls */}
          <div className="flex flex-col items-center justify-center w-2/4 gap-1">
            <div className="flex items-center gap-6">
              <SkipBack onClick={playPrevious} className="text-gray-400 hover:text-white cursor-pointer transition hover:scale-110 active:scale-95" size={20} />
              
              <button onClick={togglePlay} className="p-3 bg-white rounded-full hover:scale-105 active:scale-95 transition shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                {isPlaying ? <Pause className="text-black" fill="currentColor" size={20} /> : <Play className="text-black ml-1" fill="currentColor" size={20} />}
              </button>
              
              <SkipForward onClick={playNext} className="text-gray-400 hover:text-white cursor-pointer transition hover:scale-110 active:scale-95" size={20} />
            </div>
            
            <div className="flex items-center gap-3 w-full max-w-md mt-1">
              <span className="text-[10px] text-gray-400 w-8 text-right font-medium">{currentTimeRaw}</span>
              <div className="relative w-full h-1.5 bg-gray-600/40 rounded-full group flex items-center">
                <div className="absolute left-0 h-full bg-purple-500 rounded-full" style={{ width: `${progress || 0}%` }} />
                <input type="range" min="0" max="100" step="0.1" value={progress || 0} onChange={handleSeek} onMouseDown={() => setIsDragging(true)} onMouseUp={() => setIsDragging(false)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              </div>
              <span className="text-[10px] text-gray-400 w-8 font-medium">{duration}</span>
            </div>
          </div>

          {/* KANAN: Settings Popup & Like */}
          <div className="flex items-center justify-end w-1/4 gap-4 relative">
            {showSettings && (
              <div className="absolute bottom-28 -right-2 bg-[#28282b]/95 backdrop-blur-3xl border border-white/5 p-5 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.6)] flex gap-6 animate-in slide-in-from-bottom-3 fade-in duration-200 z-50">
                <div className="flex flex-col items-center gap-4">
                  <span className="text-[10px] font-bold text-gray-400 tracking-wider">VOL</span>
                  <div className="relative h-24 w-6 flex items-center justify-center">
                    <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="absolute w-24 h-1.5 origin-center -rotate-90 cursor-pointer appearance-none outline-none rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:rounded-full shadow-inner" style={{ background: `linear-gradient(to right, #a855f7 ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%)` }} />
                  </div>
                  <span className="text-[10px] font-bold text-purple-400">{Math.round(volume * 100)}%</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <span className="text-[10px] font-bold text-gray-400 tracking-wider">SPEED</span>
                  <div className="relative h-24 w-6 flex items-center justify-center">
                    <input type="range" min="0.25" max="3" step="0.25" value={playbackRate} onChange={(e) => setPlaybackRate(parseFloat(e.target.value))} className="absolute w-24 h-1.5 origin-center -rotate-90 cursor-pointer appearance-none outline-none rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full shadow-inner" style={{ background: `linear-gradient(to right, #3b82f6 ${speedPercentage}%, rgba(255,255,255,0.1) ${speedPercentage}%)` }} />
                  </div>
                  <span className="text-[10px] font-bold text-blue-400">{playbackRate}x</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-3 pl-6 border-l border-white/10">
                  <button onClick={toggleLoopMode} title={loopMode === 'song' ? "Looping Current Song" : loopMode === 'queue' ? "Looping Queue" : "Loop Off"} className={`p-2.5 rounded-full transition-all duration-300 ${loopMode !== 'off' ? 'bg-white/10' : 'hover:bg-white/5'}`}>
                    {loopMode === 'song' ? <Repeat1 size={20} className="text-purple-400" /> : <Repeat size={20} className={loopMode === 'queue' ? 'text-blue-400' : 'text-gray-400'} />}
                  </button>
                  <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">{loopMode === 'song' ? 'SONG' : loopMode === 'queue' ? 'QUEUE' : 'OFF'}</span>
                </div>
              </div>
            )}
            <button onClick={() => setShowSettings(!showSettings)} className={`p-2 rounded-full transition-all duration-300 focus:outline-none ${showSettings ? 'rotate-90 bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:rotate-45'}`}>
              <Settings size={20} />
            </button>
            <button onClick={() => toggleLike(currentTrack.id)} className="focus:outline-none pr-2">
              <Heart className={`cursor-pointer hover:scale-110 transition-all ${isLiked ? 'text-purple-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'text-gray-400 hover:text-white'}`} fill={isLiked ? "currentColor" : "none"} size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* <-- Panggil ExpandedPlayer di sini kalau isExpanded TRUE */}
      {isExpanded && (
        <ExpandedPlayer 
          onClose={() => setIsExpanded(false)} 
          isPlaying={isPlaying} 
          togglePlay={togglePlay} 
          progress={progress}
        />
      )}
    </>
  );
}