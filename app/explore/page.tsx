"use client";
import { Search } from 'lucide-react';
import { usePlayerStore } from '../../store/usePlayerStore';

export default function Explore() {
  const { allTracks } = usePlayerStore();

  const genres = [
    'Soundtrack & musikal', 'Blues', 'Romantis', 'Irak', 'Sedih', 'Latin',
    'Thai', 'Mandopop', 'Reggae', 'J-Pop', 'Merasa senang', 'Hip-hop'
  ];

  return (
    <div className="p-6 md:p-10 w-full min-h-screen text-white pb-32">
      <div className="flex justify-center mb-16 mt-4 z-10 relative">
        <div className="relative w-full max-w-2xl group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-400 transition-colors" size={20} />
          <input type="text" placeholder="Telusuri lagu, album, artis..." className="w-full bg-[#121212]/80 backdrop-blur-xl border border-white/10 rounded-full py-4 pl-14 pr-6 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/30 transition-all shadow-lg" />
        </div>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Album & single terbaru</h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 mask-image-fade-right">
          {allTracks.map((track) => {
            const isSingle = !track.album || track.album === "Independent Release";
            const label = isSingle ? `Single • ${track.artist}` : `Album • ${track.artist}`;

            return (
              <div key={track.id} className="min-w-[140px] md:min-w-[180px] group cursor-pointer">
                <div className="overflow-hidden rounded-2xl mb-3 shadow-lg border border-white/5">
                  <img src={track.coverImageUrl} alt={track.title} className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="font-semibold text-white truncate text-sm">{isSingle ? track.title : track.album}</h3>
                <p className="text-xs text-gray-400 truncate mt-1">{label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight mb-6">Jenis musik & suasana</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {genres.map((genre, index) => (
            <div key={index} className="bg-[#1a1a1a] hover:bg-[#252525] border border-white/5 rounded-xl p-4 cursor-pointer transition-colors shadow-md flex items-center h-20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-900/20 group-hover:to-transparent transition-all"></div>
              <span className="font-semibold text-sm z-10">{genre}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}