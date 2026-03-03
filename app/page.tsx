"use client";
import { useEffect, useRef, useState } from 'react';
import TrackList from '../components/TrackList';
import { usePlayerStore } from '../store/usePlayerStore';
import { Minimize2, Maximize2 } from 'lucide-react';

export default function Home() {
  const { currentTrack, currentTime, allTracks, setSeekCommand } = usePlayerStore();
  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  
  // State khusus buat minimize lirik
  const [isLyricsMinimized, setIsLyricsMinimized] = useState(false);

  // Cari index lirik mana yang lagi aktif berdasarkan detik saat ini
  const activeLyricIndex = currentTrack?.syncedLyrics?.findIndex((lyric, index, array) => {
    const nextLyric = array[index + 1];
    if (!nextLyric) return currentTime >= lyric.time;
    return currentTime >= lyric.time && currentTime < nextLyric.time;
  });

  // Auto-scroll pelan-pelan ke lirik yang aktif
  useEffect(() => {
    if (activeLyricIndex !== undefined && activeLyricIndex !== -1 && lyricsContainerRef.current) {
      const activeElement = lyricsContainerRef.current.children[activeLyricIndex] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [activeLyricIndex]);

  return (
    // Tambahin relative di sini biar tombol melayangnya bisa pas di pojok kanan atas
    <div className="p-10 flex gap-10 w-full relative min-h-screen">
      
      {/* KIRI: Daftar Lagu (Bakal melebar kalau lirik di-minimize) */}
      <div className={`transition-all duration-700 ease-in-out ${isLyricsMinimized ? 'w-full max-w-5xl' : 'w-1/2'}`}>
        {/* Lo bebas ganti h1 ini jadi apa aja */}
        <h1 className="text-4xl font-bold mb-8 text-white">For You</h1> 
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-white">Recently Added</h2>
          <TrackList tracks={allTracks} />
        </section>
      </div>

      {/* TOMBOL EXPAND MELAYANG (Cuma muncul kalau lirik HILANG) */}
      {isLyricsMinimized && (
        <button 
          onClick={() => setIsLyricsMinimized(false)} 
          className="absolute top-10 right-10 p-3 bg-gradient-to-br from-purple-900/60 to-black/80 hover:bg-white/10 rounded-full text-white transition-all backdrop-blur-xl border border-white/10 shadow-2xl z-50 flex items-center justify-center group animate-in fade-in zoom-in duration-300"
          title="Show Lyrics"
        >
          <Maximize2 size={24} className="group-hover:scale-110 transition-transform" />
        </button>
      )}

      {/* KANAN: Panel Lirik (HILANG TOTAL kalau isLyricsMinimized true) */}
      {!isLyricsMinimized && (
        <div 
          className="w-1/2 rounded-[2rem] bg-gradient-to-br from-purple-900/40 to-black/60 backdrop-blur-3xl border border-white/5 p-10 relative overflow-hidden shadow-2xl flex flex-col transition-all duration-700 ease-in-out h-[70vh] animate-in slide-in-from-right-8 fade-in"
        >
          
          {/* HEADER LIRIK */}
          <div className="flex justify-between items-center mb-6 z-10">
            <h2 className="text-sm font-bold tracking-widest text-purple-400 uppercase drop-shadow-md">
              {currentTrack?.syncedLyrics ? 'Live Lyrics' : 'Lyrics'}
            </h2>
            <button 
              onClick={() => setIsLyricsMinimized(true)} 
              className="p-2 bg-white/5 hover:bg-white/15 rounded-full text-white transition-all backdrop-blur-md border border-white/10"
              title="Hide Lyrics"
            >
              <Minimize2 size={16}/>
            </button>
          </div>
          
          {/* KONTEN LIRIK */}
          {currentTrack?.syncedLyrics ? (
            <div 
              ref={lyricsContainerRef}
              className="flex-1 overflow-y-auto pr-4 space-y-8 no-scrollbar pb-32 transition-all duration-500 ease-in-out"
              style={{ scrollBehavior: 'smooth' }}
            >
              {currentTrack.syncedLyrics.map((lyric, i) => {
                const isActive = i === activeLyricIndex;
                const isPast = activeLyricIndex !== undefined && i < activeLyricIndex;

                return (
                  <p 
                    key={i} 
                    onClick={() => setSeekCommand && setSeekCommand(lyric.time)}
                    className={`text-3xl font-bold leading-tight cursor-pointer hover:text-white transition-all duration-700 ease-in-out ${
                      isActive 
                        ? 'text-white scale-105 origin-left blur-none opacity-100 drop-shadow-xl' 
                        : isPast 
                          ? 'text-white/30 blur-[1px] scale-95 origin-left'
                          : 'text-white/20 scale-95 origin-left'
                    }`}
                  >
                    {lyric.text}
                  </p>
                );
              })}
            </div>
          ) : currentTrack?.lyrics ? (
            <div className="flex-1 overflow-y-auto pr-4 no-scrollbar pb-10">
              <p className="text-2xl font-bold leading-relaxed text-white/80 whitespace-pre-wrap">
                {currentTrack.lyrics}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <h3 className="text-2xl font-bold text-white mb-2">No Lyrics</h3>
              <p className="text-gray-400">Tambahkan lirik statis atau sync di data lagu.</p>
            </div>
          )}

        </div>
      )}

    </div>
  );
}