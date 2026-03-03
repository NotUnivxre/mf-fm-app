"use client";
import { Heart } from 'lucide-react';
import { usePlayerStore } from '../../store/usePlayerStore';
import TrackList from '../../components/TrackList';

export default function LikedSongs() {
  const { allTracks, likedTracks } = usePlayerStore();
  
  const likedTracksData = allTracks.filter(t => likedTracks.includes(t.id));

  return (
    <div className="p-10 w-full min-h-screen text-white pb-32">
      <div className="flex items-center gap-6 mb-12">
        <div className="w-32 h-32 bg-gradient-to-br from-purple-700 to-indigo-900 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.4)] flex items-center justify-center">
          <Heart size={48} fill="white" className="text-white drop-shadow-lg" />
        </div>
        <div>
          <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">Playlist</h4>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter">Liked Songs</h1>
          <p className="text-gray-400 mt-2">{likedTracksData.length} Tracks</p>
        </div>
      </div>

      {likedTracksData.length > 0 ? (
        <TrackList tracks={likedTracksData} />
      ) : (
        <p className="text-gray-500">Belum ada lagu yang disukai.</p>
      )}
    </div>
  );
}