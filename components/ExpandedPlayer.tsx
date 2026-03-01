"use client";
import { useState } from 'react';
import { ChevronDown, MoreHorizontal, Mic2, Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

interface ExpandedPlayerProps {
  onClose: () => void;
  isPlaying: boolean;
  togglePlay: () => void;
  progress: number;
}

export default function ExpandedPlayer({ onClose, isPlaying, togglePlay, progress }: ExpandedPlayerProps) {
  const [showLyrics, setShowLyrics] = useState(false);

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] z-[100] flex flex-col animate-in slide-in-from-bottom-full duration-500 overflow-hidden">
      
      {/* HEADER: KEMBALI KE KIRI ATAS SESUAI FOTO */}
      <div className="w-full flex justify-between items-center p-6 lg:p-10 absolute top-0 z-10">
        <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white">
          <ChevronDown size={24} />
        </button>
        <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">NOW PLAYING</span>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowLyrics(!showLyrics)} 
            className={`p-3 rounded-full transition-all ${showLyrics ? 'bg-white text-black' : 'bg-white/5 text-white'}`}
          >
            <Mic2 size={20} />
          </button>
          <button onClick={() => alert("Options Menu")} className="p-3 bg-white/5 rounded-full text-white">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* CONTENT: COVER & LIRIK (TIDAK KETENDANG) */}
      <div className="flex-1 flex items-center justify-center px-6 lg:px-20 mt-20">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 w-full max-w-7xl relative">
          
          {/* COVER AREA (TIDAK TERDORONG) */}
          <div className={`flex flex-col items-center transition-all duration-700
            ${showLyrics ? 'hidden lg:flex w-1/3' : 'flex w-full'}
          `}>
            <img 
              src="/cover.jpg" // Kembali ke cover aslimu
              alt="cover" 
              className="w-64 h-64 md:w-[450px] md:h-[450px] rounded-2xl shadow-2xl object-cover" 
            />
            <div className="mt-8 text-center lg:text-left w-full max-w-[450px]">
              <h2 className="text-3xl md:text-5xl font-bold text-white truncate">Ferrari</h2>
              <p className="text-xl text-gray-400 mt-2">Yk</p>
            </div>
          </div>

          {/* LYRICS AREA FULL DI MOBILE */}
          {showLyrics && (
            <div className="flex-1 w-full h-[50vh] lg:h-[60vh] overflow-y-auto no-scrollbar py-10">
              <div className="space-y-8 text-center lg:text-left">
                <p className="text-3xl lg:text-5xl font-bold text-white leading-tight">My bro said he wanna get paid, okay, let's see what's possible</p>
                <p className="text-2xl lg:text-4xl font-bold text-gray-500">Popped a pill and now I feel alright, I believe I can fly, I feel unstoppable</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* dadadPLAYER CONTROLS (TETAP SINKRON) */}
      <div className="w-full p-10 flex flex-col items-center gap-6 z-10">
        <div className="w-full max-w-4xl flex items-center gap-4 mb-2">
          <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 to-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="flex items-center gap-10">
          <SkipBack size={32} className="text-gray-400 hover:text-white cursor-pointer" />
          <button 
            onClick={togglePlay}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause size={36} fill="black" /> : <Play size={36} fill="black" className="ml-1" />}
          </button>
          <SkipForward size={32} className="text-gray-400 hover:text-white cursor-pointer" />
        </div>
      </div>
    </div>
  ); 
}