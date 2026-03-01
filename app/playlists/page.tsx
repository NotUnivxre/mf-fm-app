"use client";
import { usePlayerStore } from '../../store/usePlayerStore';
import TrackList from '../../components/TrackList';

export default function PlaylistsPage() {
  const { playlists, allTracks } = usePlayerStore();

  return (
    <div className="p-10 w-full">
      <h1 className="text-4xl font-bold mb-8 text-white">Your Playlists</h1>
      <div className="flex flex-col gap-10">
        {playlists.length === 0 && <p className="text-gray-400">Belum ada playlist.</p>}
        {playlists.map(p => {
          const pTracks = allTracks.filter(t => p.tracks.includes(t.id));
          return (
            <div key={p.id} className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">{p.name}</h2>
              {pTracks.length > 0 ? <TrackList tracks={pTracks} /> : <p className="text-gray-500 text-sm">Playlist kosong.</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}