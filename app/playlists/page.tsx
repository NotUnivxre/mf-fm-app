"use client";
import { Plus, ListMusic, Play } from 'lucide-react';
import { usePlayerStore } from '../../store/usePlayerStore';
import { useRouter } from 'next/navigation';

export default function Playlists() {
  const playlists = usePlayerStore((state) => state.playlists);
  const allTracks = usePlayerStore((state) => state.allTracks);
  const createPlaylist = usePlayerStore((state) => state.createPlaylist);
  const playPlaylist = usePlayerStore((state) => state.playPlaylist);
  const router = useRouter();

  return (
    <div className="p-6 md:p-10 w-full min-h-screen text-white pb-32 bg-[#0a0a0a]">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Your Playlists</h1>
          <p className="text-gray-400 mt-2 font-medium">Kumpulan playlist buatanmu ada di sini.</p>
        </div>
        <button 
          onClick={() => {
            const name = prompt("Nama Playlist Baru:");
            if (name) createPlaylist(name);
          }}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-5 py-3 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]"
        >
          <Plus size={20} /> <span className="hidden md:inline">New Playlist</span>
        </button>
      </div>

      {playlists.length === 0 ? (
        <div className="flex items-center justify-center h-[40vh] border border-white/5 bg-[#121212]/50 rounded-[2rem] backdrop-blur-sm">
          <p className="text-gray-400">Belum ada playlist. Klik New Playlist untuk membuat.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {playlists.map((pl) => {
            // Ambil data lagu lengkap berdasarkan ID di playlist
            const tracksInPlaylist = pl.tracks
              .map(id => allTracks.find(t => t.id === id))
              .filter(Boolean) as any[];

            // --- LOGIKA KOVER DINAMIS ---
            let coverElement;
            const count = tracksInPlaylist.length;

            if (count === 0) {
              // Kosong = Logo mf.fm
              coverElement = (
                <div className="w-full h-full bg-[#1c1c1e] flex items-center justify-center text-2xl font-bold text-purple-500/40 tracking-tighter">
                  mf.fm
                </div>
              );
            } else if (count < 4) {
              // 1-3 Lagu = Kover lagu pertama
              coverElement = (
                <img 
                  src={tracksInPlaylist[0].coverImageUrl} 
                  className="w-full h-full object-cover" 
                  alt={pl.name} 
                />
              );
            } else {
              // 4+ Lagu = Grid 2x2 campuran 4 cover pertama
              coverElement = (
                <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
                  <img src={tracksInPlaylist[0].coverImageUrl} className="w-full h-full object-cover" alt="1" />
                  <img src={tracksInPlaylist[1].coverImageUrl} className="w-full h-full object-cover" alt="2" />
                  <img src={tracksInPlaylist[2].coverImageUrl} className="w-full h-full object-cover" alt="3" />
                  <img src={tracksInPlaylist[3].coverImageUrl} className="w-full h-full object-cover" alt="4" />
                </div>
              );
            }

            return (
              <div 
                key={pl.id} 
                onClick={() => router.push(`/playlists/${pl.id}`)}
                className="bg-[#18181a]/80 backdrop-blur-md border border-white/5 p-4 rounded-2xl hover:bg-[#252525] transition-all cursor-pointer group relative shadow-lg"
              >
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 border border-white/5 shadow-md">
                  {/* Render Kover Dinamis */}
                  {coverElement}

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        if (pl.tracks.length > 0) playPlaylist(pl.tracks); 
                        else alert("Playlist is empty!");
                      }}
                      className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(168,85,247,0.6)] transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                    >
                      <Play size={24} fill="white" className="ml-1" />
                    </button>
                  </div>
                </div>
                <h3 className="font-bold text-lg text-white truncate">{pl.name}</h3>
                <p className="text-sm text-gray-400 mt-1 flex items-center gap-2 font-medium">
                  <ListMusic size={14} className="text-purple-400" /> {pl.tracks.length} Tracks
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}