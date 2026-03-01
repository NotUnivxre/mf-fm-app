"use client";
import { usePlayerStore } from '../../store/usePlayerStore';
import TrackList from '../../components/TrackList';
import { Track } from '../../data/mockData';

export default function LibraryPage() {
  const { playHistory, allTracks } = usePlayerStore();
  
  // Cara filter yang 100% disukai dan aman menurut TypeScript
  const historyTracks: Track[] = playHistory
    .map(id => allTracks.find(t => t.id === id))
    .filter((t): t is Track => t !== undefined);

  return (
    <div className="p-10 w-full">
      <h1 className="text-4xl font-bold mb-2 text-white flex items-center gap-3">
        Collection
      </h1>
      <p className="text-gray-400 mb-8 text-sm">
        Lagu yang pernah kamu dengarkan akan otomatis masuk ke sini.
      </p>

      {historyTracks.length > 0 ? (
        <TrackList tracks={historyTracks} />
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <p className="text-2xl font-bold text-white mb-2">Belum ada riwayat</p>
          <p className="text-gray-500">Putar lagu apapun di Explore untuk menambahkannya ke koleksi.</p>
        </div>
      )}
    </div>
  );
}