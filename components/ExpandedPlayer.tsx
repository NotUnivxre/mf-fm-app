"use client";
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, AlignJustify, Heart, Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Repeat1, Disc3, Music, MoreVertical } from 'lucide-react';
import { usePlayerStore } from '../store/usePlayerStore';

interface ExpandedPlayerProps {
  onClose: () => void;
  isPlaying?: boolean;
  togglePlay?: () => void;
  progress?: number;
}

export default function ExpandedPlayer({ onClose, progress = 0 }: ExpandedPlayerProps) {
  const {
    currentTrack, isPlaying, togglePlay, volume, setVolume,
    currentTime, setSeekCommand, loopMode, toggleLoopMode,
    playNext, playPrevious, likedTracks, toggleLike
  } = usePlayerStore();

  const [viewMode, setViewMode] = useState<'music' | 'lyrics'>('lyrics');
  const [showMenu, setShowMenu] = useState(false);
  const [lyricsType, setLyricsType] = useState<'synced' | 'static'>('synced');
  
  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  if (!currentTrack) return null;

  const isLiked = likedTracks.includes(currentTrack.id);
  const hasSynced = !!currentTrack.syncedLyrics;
  const hasStatic = !!currentTrack.lyrics;
  const hasNoLyrics = !hasSynced && !hasStatic;

  useEffect(() => {
    if (hasSynced) setLyricsType('synced');
    else if (hasStatic) setLyricsType('static');
  }, [currentTrack, hasSynced, hasStatic]);

  // Tutup menu kalau klik di luar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const durationSec = progress > 0 ? (currentTime / progress) * 100 : 0;
  
  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    const targetTime = (newProgress / 100) * durationSec;
    setSeekCommand(targetTime);
  };

  const activeLyricIndex = currentTrack.syncedLyrics?.findIndex((lyric, index, array) => {
    const nextLyric = array[index + 1];
    if (!nextLyric) return currentTime >= lyric.time;
    return currentTime >= lyric.time && currentTime < nextLyric.time;
  });

  useEffect(() => {
    if (viewMode === 'lyrics' && lyricsType === 'synced' && activeLyricIndex !== undefined && activeLyricIndex !== -1 && lyricsContainerRef.current) {
      const activeElement = lyricsContainerRef.current.children[activeLyricIndex] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [activeLyricIndex, viewMode, lyricsType]);

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] z-[100] flex flex-col animate-in slide-in-from-bottom-full duration-500 overflow-hidden text-white font-sans">
      
      {/* TOP HEADER NAV */}
      <div className="w-full flex justify-between items-center px-10 py-8 absolute top-0 z-20">
        <button onClick={onClose} className="p-2 text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full">
          <ChevronDown size={28} />
        </button>
        
        <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">NOW PLAYING</span>
        
        <div className="relative flex items-center gap-4">
          <button onClick={() => setViewMode(viewMode === 'music' ? 'lyrics' : 'music')} className="p-2 text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full" title={viewMode === 'music' ? "Show Lyrics" : "Show Cover"}>
            {viewMode === 'music' ? <AlignJustify size={24}/> : <Disc3 size={24}/>}
          </button>

          <div ref={menuRef}>
            <button onClick={() => setShowMenu(!showMenu)} className={`p-2 transition-colors rounded-full ${showMenu ? 'bg-purple-600/30 text-white' : 'text-gray-400 hover:text-white bg-white/5 hover:bg-white/10'}`}>
              <MoreVertical size={24} />
            </button>

            {/* DROPDOWN MENU LIRIK */}
            {showMenu && (
              <div className="absolute top-14 right-0 bg-[#1c1c1e] border border-white/10 p-2 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.6)] flex flex-col w-48 z-50 animate-in fade-in zoom-in duration-200">
                <button
                  disabled={!hasStatic}
                  onClick={() => { setLyricsType('static'); setShowMenu(false); setViewMode('lyrics'); }}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${!hasStatic ? 'text-gray-600 cursor-not-allowed' : lyricsType === 'static' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-300 hover:bg-white/5'}`}
                >
                  Static Lyrics
                </button>
                <button
                  disabled={!hasSynced}
                  onClick={() => { setLyricsType('synced'); setShowMenu(false); setViewMode('lyrics'); }}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors mt-1 ${!hasSynced ? 'text-gray-600 cursor-not-allowed' : lyricsType === 'synced' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-300 hover:bg-white/5'}`}
                >
                  Synced Lyrics
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CENTER CONTENT */}
      {/* Animasi smooth buat ngelebarin container lirik */}
      <div className={`flex-1 flex items-center justify-center w-full px-16 mt-20 mb-32 max-w-[1400px] mx-auto relative transition-all duration-700 ease-in-out ${viewMode === 'lyrics' ? 'gap-16' : 'gap-0'}`}>
          
        {/* KIRI: Kover Lagu + Info + Love (Sejajar Kiri Kanan) */}
        <div className="flex flex-col items-start w-80 md:w-[450px] flex-shrink-0 z-10">
           <img src={currentTrack.coverImageUrl} className="w-full aspect-square rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] object-cover mb-6 border border-white/5" alt="cover" />
           <div className="w-full flex items-center justify-between">
              <div className="flex flex-col overflow-hidden pr-4">
                <h2 className="text-3xl font-bold text-white truncate pb-2">{currentTrack.title}</h2>
                <p className="text-xl text-gray-400 truncate">{currentTrack.artist}</p>
              </div>
              <Heart 
                onClick={() => toggleLike(currentTrack.id)} 
                className={`cursor-pointer transition-all flex-shrink-0 ${isLiked ? 'text-purple-500 fill-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]' : 'text-gray-400 hover:text-white hover:scale-110'}`} 
                size={32} 
              />
            </div>
        </div>

        {/* KANAN: Kotak Lirik */}
        <div className={`h-[65vh] bg-gradient-to-br from-purple-900/10 to-[#121212]/80 border-white/5 rounded-[2rem] flex flex-col relative shadow-2xl backdrop-blur-sm transition-all duration-700 ease-in-out overflow-hidden
          ${viewMode === 'lyrics' ? 'flex-1 p-12 opacity-100 translate-x-0 border' : 'w-0 p-0 opacity-0 translate-x-20 border-none'}`}>
          
          {/* Inner Wrapper biar teksnya gak kegencet pas lagi proses animasi */}
          <div className="w-full h-full min-w-[500px] flex flex-col">
             {hasNoLyrics ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-6">
                  <Music size={64} className="text-gray-700" />
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">No Lyrics</h3>
                    <p className="text-gray-400">Tambahkan lirik statis atau sync di data lagu.</p>
                  </div>
                </div>
             ) : lyricsType === 'synced' ? (
                <div ref={lyricsContainerRef} className="flex-1 overflow-y-auto no-scrollbar space-y-12 pb-40 mask-image-fade pr-4" style={{ scrollBehavior: 'smooth' }}>
                  {currentTrack.syncedLyrics?.map((lyric, i) => {
                    const isActive = i === activeLyricIndex;
                    const isPast = activeLyricIndex !== undefined && i < activeLyricIndex;
                    return (
                      <p 
                        key={i} 
                        onClick={() => setSeekCommand(lyric.time)}
                        className={`text-[32px] font-bold leading-tight cursor-pointer transition-all duration-700 ease-in-out ${
                          isActive ? 'text-white scale-105 origin-left drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]' : isPast ? 'text-white/40 blur-[0.5px]' : 'text-white/20 hover:text-white/50'
                        }`}
                      >
                        {lyric.text}
                      </p>
                    );
                  })}
                </div>
             ) : (
                <div className="flex-1 overflow-y-auto no-scrollbar pb-10 mask-image-fade pr-4">
                  <p className="text-[28px] font-bold leading-relaxed text-white/80 whitespace-pre-wrap">{currentTrack.lyrics}</p>
                </div>
             )}
          </div>
        </div>
      </div>

      {/* BOTTOM CONTROL BAR */}
      <div className="w-full px-16 pb-12 absolute bottom-0 flex items-center justify-between z-20">
        
        {/* KIRI: Timer & Slider */}
        <div className="w-[30%] flex items-center gap-4">
          <span className="text-xs font-bold text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
          <div className="flex-1 h-1.5 bg-gray-600/50 rounded-full relative group flex items-center">
            <div className="absolute left-0 h-full bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" style={{ width: `${progress}%` }} />
            <input type="range" min="0" max="100" step="0.1" value={progress} onChange={handleSeek} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
          </div>
          <span className="text-xs font-bold text-gray-400 w-10">{durationSec > 0 ? formatTime(durationSec) : "0:00"}</span>
        </div>

        {/* TENGAH: Playback (Play/Prev/Next) */}
        <div className="w-[40%] flex items-center justify-center gap-10">
          <SkipBack onClick={playPrevious} size={32} className="text-gray-400 hover:text-white cursor-pointer transition hover:scale-110 active:scale-95" />
          <button onClick={togglePlay} className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 active:scale-95 transition shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            {isPlaying ? <Pause fill="black" size={32} /> : <Play fill="black" size={32} className="ml-2" />}
          </button>
          <SkipForward onClick={playNext} size={32} className="text-gray-400 hover:text-white cursor-pointer transition hover:scale-110 active:scale-95" />
        </div>

        {/* KANAN: Loop & Volume */}
        <div className="w-[30%] flex items-center justify-end gap-6">
          <button onClick={toggleLoopMode} className={`p-3 rounded-full transition-all ${loopMode !== 'off' ? 'bg-white/10' : 'hover:bg-white/5'}`}>
            {loopMode === 'song' ? <Repeat1 size={22} className="text-purple-400" /> : <Repeat size={22} className={loopMode === 'queue' ? 'text-blue-400' : 'text-gray-400'} />}
          </button>
          <Volume2 size={24} className="text-gray-400 ml-4" />
          <div className="w-32 h-1.5 bg-gray-600/50 rounded-full relative group flex items-center">
            <div className="absolute left-0 h-full bg-white rounded-full" style={{ width: `${volume * 100}%` }} />
            <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
          </div>
        </div>
        
      </div>
    </div>
  );
}