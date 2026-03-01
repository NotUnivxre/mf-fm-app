"use client";
import { usePlayerStore } from '../../store/usePlayerStore';
import TrackList from '../../components/TrackList';

export default function SearchPage() {
  const { allTracks } = usePlayerStore();
  return (
    <div className="p-10 w-full">
      <h1 className="text-4xl font-bold mb-8 text-white">Explore</h1>
      <TrackList tracks={allTracks} />
    </div>
  );
}