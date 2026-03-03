import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Track, tracks as initialTracks, SyncedLyric } from '../data/mockData';

export interface Playlist {
  id: string;
  name: string;
  tracks: string[];
}

interface PlayerState {
  allTracks: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  
  playbackRate: number;
  loopMode: 'off' | 'song' | 'queue';
  queue: Track[];
  seekCommand: number | null;
  
  likedTracks: string[];
  playHistory: string[];
  playlists: Playlist[];

  setCurrentTrack: (track: Track) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  setCurrentTime: (time: number) => void;
  
  setPlaybackRate: (rate: number) => void;
  toggleLoopMode: () => void;
  addToQueue: (track: Track) => void;
  popQueue: () => Track | undefined;
  setSeekCommand: (time: number | null) => void;
  
  // FUNGSI BARU BUAT TOMBOL NEXT & PREV
  playNext: () => void;
  playPrevious: () => void;
  
  // FUNGSI BARU BUAT PLAY SE-PLAYLIST FULL
  playPlaylist: (trackIds: string[]) => void;

  toggleLike: (trackId: string) => void;
  createPlaylist: (name: string) => void;
  addToPlaylist: (playlistId: string, trackId: string) => void;
  
  // FUNGSI BARU BUAT EDIT & HAPUS PLAYLIST
  updatePlaylistName: (id: string, name: string) => void;
  deletePlaylist: (id: string) => void;
  
  addTrack: (track: Track) => void;
  updateTrackLyrics: (id: string, lyrics: string, syncedLyrics?: SyncedLyric[]) => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      allTracks: initialTracks,
      currentTrack: null,
      isPlaying: false,
      volume: 1,
      currentTime: 0,
      
      playbackRate: 1,
      loopMode: 'off',
      queue: [],
      seekCommand: null,

      likedTracks: [],
      playHistory: [],
      playlists: [],

      setCurrentTrack: (track) => set((state) => {
        const history = state.playHistory.filter(id => id !== track.id);
        return { 
          currentTrack: track, 
          isPlaying: true,
          playHistory: [track.id, ...history] 
        };
      }),
      
      togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
      setVolume: (volume) => set({ volume }),
      setCurrentTime: (time) => set({ currentTime: time }),
      
      setPlaybackRate: (rate) => set({ playbackRate: rate }),
      toggleLoopMode: () => set((state) => {
        if (state.loopMode === 'off') return { loopMode: 'song' };
        if (state.loopMode === 'song') return { loopMode: 'queue' };
        return { loopMode: 'off' };
      }),
      addToQueue: (track) => set((state) => ({ queue: [...state.queue, track] })),
      popQueue: () => {
        const currentQueue = get().queue;
        if (currentQueue.length === 0) return undefined;
        const nextTrack = currentQueue[0];
        set({ queue: currentQueue.slice(1) });
        return nextTrack;
      },
      setSeekCommand: (time) => set({ seekCommand: time }),

      // LOGIKA TOMBOL NEXT
      playNext: () => {
        const { queue, allTracks, currentTrack, setCurrentTrack, popQueue } = get();
        // Cek antrean dulu
        if (queue.length > 0) {
          const nextTrack = popQueue();
          if (nextTrack) setCurrentTrack(nextTrack);
        } else {
          // Kalau ga ada antrean, puter lagu selanjutnya di daftar
          const currentIndex = allTracks.findIndex(t => t.id === currentTrack?.id);
          if (currentIndex !== -1 && currentIndex < allTracks.length - 1) {
            setCurrentTrack(allTracks[currentIndex + 1]);
          } else if (allTracks.length > 0) {
            setCurrentTrack(allTracks[0]); // Balik ke lagu pertama kalau udah mentok
          }
        }
      },

      // LOGIKA TOMBOL PREV
      playPrevious: () => {
        const { allTracks, currentTrack, setCurrentTrack, currentTime, setSeekCommand } = get();
        // Kalau lagu udah jalan > 3 detik, ngulang ke awal lagu (Kayak di Spotify)
        if (currentTime > 3) {
          setSeekCommand(0);
          return;
        }
        // Kalau masih awal, mundur ke lagu sebelumnya
        const currentIndex = allTracks.findIndex(t => t.id === currentTrack?.id);
        if (currentIndex > 0) {
          setCurrentTrack(allTracks[currentIndex - 1]);
        } else if (allTracks.length > 0) {
          setCurrentTrack(allTracks[allTracks.length - 1]); // Ke lagu paling akhir
        }
      },

      // LOGIKA PLAYLIST
      playPlaylist: (trackIds) => {
        const { allTracks } = get();
        if (trackIds.length === 0) return;

        // Cocokin ID sama data asli, pake strict type guard biar TS gak ngambek
        const fullTracks = trackIds
          .map(id => allTracks.find(t => t.id === id))
          .filter((t): t is Track => t !== undefined);
        
        if (fullTracks.length > 0) {
          // Puter lagu pertama, sisa lagunya lempar ke queue
          set({ 
            currentTrack: fullTracks[0], 
            isPlaying: true,
            queue: fullTracks.slice(1) 
          });
        }
      },

      toggleLike: (trackId) => set((state) => ({
        likedTracks: state.likedTracks.includes(trackId)
          ? state.likedTracks.filter(id => id !== trackId)
          : [...state.likedTracks, trackId]
      })),
      createPlaylist: (name) => set((state) => ({
        playlists: [...state.playlists, { id: Date.now().toString(), name, tracks: [] }]
      })),
      addToPlaylist: (playlistId, trackId) => set((state) => ({
        playlists: state.playlists.map(p => 
          p.id === playlistId && !p.tracks.includes(trackId) 
            ? { ...p, tracks: [...p.tracks, trackId] } 
            : p
        )
      })),
      
      // LOGIKA EDIT & HAPUS PLAYLIST
      updatePlaylistName: (id, name) => set((state) => ({
        playlists: state.playlists.map(p => p.id === id ? { ...p, name } : p)
      })),
      deletePlaylist: (id) => set((state) => ({
        playlists: state.playlists.filter(p => p.id !== id)
      })),

      addTrack: (track) => set((state) => ({ allTracks: [track, ...state.allTracks] })),
      updateTrackLyrics: (id, lyrics, syncedLyrics) => set((state) => ({
        allTracks: state.allTracks.map(t => t.id === id ? { ...t, lyrics, syncedLyrics } : t),
        currentTrack: state.currentTrack?.id === id ? { ...state.currentTrack, lyrics, syncedLyrics } : state.currentTrack
      })),
    }),
    { name: 'mf-ify-storage' }
  )
);