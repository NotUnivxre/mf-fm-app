"use client";
import { useState, useEffect } from 'react';
import { Track } from '../data/mockData';
import { usePlayerStore } from '../store/usePlayerStore';
import { Play, Heart, Plus, ListMusic } from 'lucide-react';

export default function TrackList({ tracks }: { tracks: Track[] }) {
  const { currentTrack, setCurrentTrack, isPlaying, likedTracks, toggleLike, playlists, createPlaylist, addToPlaylist } = usePlayerStore();
  
  // State untuk Menu Klik Kanan
  const [menuPos, setMenuPos] = useState<{ x: number, y: number } | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [showPlaylistInput, setShowPlaylistInput] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  // Hilangkan menu kalau klik di tempat lain
  useEffect(() => {
    const handleClick = () => { setMenuPos(null); setShowPlaylistInput(false); };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const handleRightClick = (e: React.MouseEvent, track: Track) => {
    e.preventDefault(); // Matikan klik kanan bawaan browser
    setSelectedTrack(track);
    setMenuPos({ x: e.pageX, y: e.pageY });
    setShowPlaylistInput(false);
  };

  const handleCreatePlaylist = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlaylistName.trim() && selectedTrack) {
      createPlaylist(newPlaylistName);
      // Note: Di sistem real, kita harus nunggu ID playlistnya jadi, tapi karena ini mock, 
      // kita tutup dulu menunya. Nanti kamu bisa masukin manual.
      setNewPlaylistName("");
      setShowPlaylistInput(false);
      setMenuPos(null);
    }
  };

  return (
    <div className="flex flex-col gap-2 relative">
      {tracks.map((track, index) => {
        const isCurrentlyPlaying = currentTrack?.id === track.id;
        const isLiked = likedTracks.includes(track.id);

        return (
          <div 
            key={track.id} 
            onContextMenu={(e) => handleRightClick(e, track)} // Trigger Klik Kanan
            className={`group flex items-center justify-between p-3 rounded-xl transition-all hover:bg-white/10 cursor-pointer ${isCurrentlyPlaying ? 'bg-white/10' : ''}`}
            onClick={() => setCurrentTrack(track)}
          >
            <div className="flex items-center gap-4">
              <span className="text-gray-500 w-4 text-center text-sm">{index + 1}</span>
              <div className="relative w-10 h-10 flex-shrink-0">
                <img src={track.coverImageUrl} alt={track.title} className="w-full h-full rounded-md object-cover" />
                <div className={`absolute inset-0 bg-black/40 flex items-center justify-center rounded-md ${isCurrentlyPlaying && isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                  {isCurrentlyPlaying && isPlaying ? (
                     <div className="w-3 h-3 bg-purple-500 rounded-sm animate-pulse"></div>
                  ) : (
                    <Play fill="white" size={16} />
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <span className={`font-semibold text-sm ${isCurrentlyPlaying ? 'text-purple-400' : 'text-white'}`}>
                  {track.title}
                </span>
                <div className="flex items-center gap-2">
                  {track.explicit && <span className="text-[9px] bg-gray-500/30 text-gray-300 px-1 rounded-sm">E</span>}
                  <span className="text-xs text-gray-400">{track.artist}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* POPUP MENU KLIK KANAN */}
      {menuPos && selectedTrack && (
        <div 
          className="fixed z-50 w-56 bg-[#2c2c2e] border border-white/10 rounded-xl shadow-2xl overflow-hidden py-2"
          style={{ top: menuPos.y, left: menuPos.x }}
          onClick={(e) => e.stopPropagation()} // Biar gak langsung nutup pas diklik dalemnya
        >
{/* Tombol Like */}
          <button 
            className="w-full text-left px-4 py-2 hover:bg-white/10 flex items-center gap-3 text-sm text-white transition-colors"
            onClick={() => { toggleLike(selectedTrack.id); setMenuPos(null); }}
          >
            <Heart size={16} className={likedTracks.includes(selectedTrack.id) ? "text-purple-500" : "text-gray-400"} fill={likedTracks.includes(selectedTrack.id) ? "currentColor" : "none"} />
            {likedTracks.includes(selectedTrack.id) ? "Remove from Likes" : "Save to Likes"}
          </button>

          {/* Tombol Add to Queue */}
          <button 
            className="w-full text-left px-4 py-2 hover:bg-white/10 flex items-center gap-3 text-sm text-white transition-colors"
            onClick={() => { usePlayerStore.getState().addToQueue(selectedTrack); setMenuPos(null); }}
          >
            <ListMusic size={16} className="text-blue-400" /> Add to Queue
          </button>
          
          <div className="h-px bg-white/10 my-1"></div>

          {/* Tombol Tambah ke Playlist */}
          <div className="px-4 py-2 flex items-center gap-3 text-sm text-gray-400">
            <ListMusic size={16} /> Add to Playlist...
          </div>
          
          <div className="max-h-32 overflow-y-auto no-scrollbar">
            {playlists.map(p => (
              <button 
                key={p.id} 
                className="w-full text-left px-10 py-1.5 hover:bg-white/10 text-xs text-white"
                onClick={() => { addToPlaylist(p.id, selectedTrack.id); setMenuPos(null); }}
              >
                {p.name}
              </button>
            ))}
          </div>

          {!showPlaylistInput ? (
            <button 
              className="w-full text-left px-10 py-1.5 hover:bg-white/10 flex items-center gap-2 text-xs text-purple-400 font-medium"
              onClick={() => setShowPlaylistInput(true)}
            >
              <Plus size={14} /> New Playlist
            </button>
          ) : (
            <form onSubmit={handleCreatePlaylist} className="px-4 py-2 flex items-center gap-2">
              <input 
                type="text" 
                autoFocus
                placeholder="Playlist name..."
                className="w-full bg-[#1c1c1e] text-xs text-white px-2 py-1.5 rounded-md outline-none focus:ring-1 focus:ring-purple-500"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
              />
            </form>
          )}
        </div>
      )}
    </div>
  );
}