"use client";
import { usePlayerStore } from '../../store/usePlayerStore';
import TrackList from '../../components/TrackList';

export default function LikesPage() {
  const { likedTracks, allTracks } = usePlayerStore();
  const tracks = allTracks.filter(t => likedTracks.includes(t.id));

  return (
    <div className="p-10 w-full">
      <h1 className="text-4xl font-bold mb-8 text-white flex items-center gap-3">
        <span className="text-purple-500">♥</span> Liked Songs
      </h1>
      {tracks.length > 0 ? <TrackList tracks={tracks} /> : <p className="text-gray-400">Belum ada lagu yang disukai.</p>}
    </div>
  );
}