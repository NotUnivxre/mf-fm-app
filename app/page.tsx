"use client";
import { useEffect, useRef } from 'react';
import TrackList from '../components/TrackList';
import { usePlayerStore } from '../store/usePlayerStore';

export default function Home() {
  // Ambil data dari global store, termasuk setSeekCommand dan allTracks
  const { currentTrack, currentTime, allTracks, setSeekCommand } = usePlayerStore();
  const lyricsContainerRef = useRef<HTMLDivElement>(null);

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
    <div className="p-10 flex gap-10 w-full">
      
      {/* KIRI: Daftar Lagu */}
      <div className="w-1/2">
        <h1 className="text-4xl font-bold mb-8 text-white">For You</h1>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-white">Recently Added</h2>
          {/* Panggil allTracks dari store, bukan data statis lagi */}
          <TrackList tracks={allTracks} />
        </section>
      </div>

      {/* KANAN: Panel Lirik Glassmorphism */}
      <div className="w-1/2 h-[70vh] rounded-[2rem] bg-gradient-to-br from-purple-900/40 to-black/60 backdrop-blur-3xl border border-white/5 p-10 relative overflow-hidden shadow-2xl flex flex-col">
        
        {/* KONDISI 1: Punya Lirik Sync */}
        {currentTrack?.syncedLyrics ? (
          <>
            <h2 className="text-sm font-bold tracking-widest text-purple-400 uppercase mb-6 drop-shadow-md">
              Live Lyrics
            </h2>
            
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
                    onClick={() => setSeekCommand && setSeekCommand(lyric.time)} // FITUR CLICK-TO-SEEK
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
          </>
        ) 
        
        /* KONDISI 2: Nggak ada Sync, tapi punya Lirik Statis */
        : currentTrack?.lyrics ? (
          <>
            <h2 className="text-sm font-bold tracking-widest text-purple-400 uppercase mb-6 drop-shadow-md">
              Lyrics
            </h2>
            
            <div className="flex-1 overflow-y-auto pr-4 no-scrollbar pb-10">
              <p className="text-2xl font-bold leading-relaxed text-white/80 whitespace-pre-wrap">
                {currentTrack.lyrics}
              </p>
            </div>
          </>
        ) 
        
        /* KONDISI 3: Kosong sama sekali */
        : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h3 className="text-2xl font-bold text-white mb-2">No Lyrics</h3>
            <p className="text-gray-400">Tambahkan lirik statis atau sync di data lagu.</p>
          </div>
        )}

      </div>

    </div>
  );
}