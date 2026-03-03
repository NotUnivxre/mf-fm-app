"use client";
import React, { useState, useRef } from 'react';
import { usePlayerStore } from '../../store/usePlayerStore';
import { UploadCloud, FileText, Clock, CheckCircle2 } from 'lucide-react';
import { SyncedLyric } from '../../data/mockData';

export default function StudioPage() {
  const [activeTab, setActiveTab] = useState<'upload' | 'lyrics' | 'sync'>('upload');
  const { allTracks, addTrack, updateTrackLyrics, currentTime } = usePlayerStore();

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState(''); // TAMBAHAN: State buat Album
  const [isExplicit, setIsExplicit] = useState(false);
  const [staticLyrics, setStaticLyrics] = useState('');
  
  const audioInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [coverUrl, setCoverUrl] = useState('');

  const [selectedTrackId, setSelectedTrackId] = useState('');
  const [editLyrics, setEditLyrics] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudioUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handlePublish = () => {
    if (!title || !artist || !audioUrl || !coverUrl) return alert("Lengkapi semua data & file!");
    addTrack({
      id: "local_" + Date.now().toString(),
      title, 
      artist, 
      album: album || "Independent Release", // TAMBAHAN: Pakai album yang dipilih
      explicit: isExplicit,
      audioUrl, 
      coverImageUrl: coverUrl,
      lyrics: staticLyrics
    });
    alert("Track Berhasil Dirilis!");
    setTitle(''); setArtist(''); setAlbum(''); setStaticLyrics(''); setAudioUrl(''); setCoverUrl('');
  };

  const handleSelectTrack = (id: string) => {
    setSelectedTrackId(id);
    const track = allTracks.find(t => t.id === id);
    setEditLyrics(track?.lyrics || '');
    setIsChecked(false);
  };

  const handleSubmitLyrics = () => {
    if (!isChecked) return alert("Checklist persetujuan dulu!");

    const lines = editLyrics.split('\n');
    const parsedSyncedLyrics: SyncedLyric[] = [];

    lines.forEach(line => {
      const match = line.match(/\[(\d+):([\d.]+)\](.*)/);
      if (match) {
        const min = parseInt(match[1], 10);
        const sec = parseFloat(match[2]);
        const text = match[3].trim();
        parsedSyncedLyrics.push({ time: (min * 60) + sec, text });
      }
    });

    const finalSyncedData = parsedSyncedLyrics.length > 0 ? parsedSyncedLyrics : undefined;
    
    updateTrackLyrics(selectedTrackId, editLyrics, finalSyncedData);
    alert("Lyrics saved & Synced!");
  };

  const insertTimestamp = () => {
    const min = Math.floor(currentTime / 60);
    const sec = (currentTime % 60).toFixed(2).padStart(5, '0');
    setEditLyrics(prev => prev + `\n[${min < 10 ? '0'+min : min}:${sec}] `);
  };

  return (
    <div className="p-10 w-full max-w-6xl mx-auto flex flex-col h-screen">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-white">Creator Studio</h1>
        <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs font-bold border border-purple-500/50">BETA</span>
      </div>

      <div className="flex gap-4 border-b border-white/10 mb-8 pb-4">
        {[
          { id: 'upload', label: 'Release Lab', icon: UploadCloud },
          { id: 'lyrics', label: 'Lyric Canvas', icon: FileText },
          { id: 'sync', label: 'TimeSync Forge', icon: Clock }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button 
              key={tab.id} onClick={() => setActiveTab(tab.id as 'upload' | 'lyrics' | 'sync')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${isActive ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              <Icon size={18} /> {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === 'upload' && (
        <div className="grid grid-cols-2 gap-8 overflow-y-auto no-scrollbar pb-32">
          
          {/* BAGIAN KIRI: TRACK DETAILS & MEDIA FILES */}
          <div className="flex flex-col gap-6">
            
            {/* TRACK DETAILS KOTAK */}
            <div className="bg-[#18181a] border border-white/10 p-6 rounded-2xl">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><UploadCloud className="text-purple-500" size={20}/> Track Details</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div><label className="text-xs text-gray-400 mb-1 block">Title</label><input type="text" value={title} onChange={e=>setTitle(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-purple-500 outline-none" placeholder="Song Name"/></div>
                <div><label className="text-xs text-gray-400 mb-1 block">Artist</label><input type="text" value={artist} onChange={e=>setArtist(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-purple-500 outline-none" placeholder="Artist Name"/></div>
              </div>

              {/* TAMBAHAN 1: ALBUM SELECTION */}
              <div className="mb-4">
                <label className="text-xs text-gray-400 mb-1 block">Album Assignment</label>
                <div className="flex gap-2">
                  <select value={album} onChange={e=>setAlbum(e.target.value)} className="flex-1 bg-black/50 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-purple-500 outline-none appearance-none cursor-pointer">
                    <option value="">Select an existing album...</option>
                    <option value="The Dark Pop Era">The Dark Pop Era</option>
                    <option value="Midnight Vibes">Midnight Vibes</option>
                  </select>
                  <button className="px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-white text-sm font-medium transition-all">
                    + New
                  </button>
                </div>
              </div>

              {/* TAMBAHAN 2: STATIC LYRICS */}
              <div className="mb-4">
                <label className="text-xs text-gray-400 mb-1 block">Static Lyrics <span className="text-gray-500">(Optional)</span></label>
                <textarea 
                  value={staticLyrics}
                  onChange={e=>setStaticLyrics(e.target.value)}
                  rows={4} 
                  placeholder="Paste your lyrics here..." 
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-purple-500 outline-none resize-none"
                ></textarea>
              </div>

              {/* EXPLICIT CONTENT (ASLI) */}
              <div className="flex items-center justify-between bg-black/50 p-3 rounded-lg border border-white/10">
                <span className="text-sm text-white">Explicit Content</span>
                <input type="checkbox" checked={isExplicit} onChange={e=>setIsExplicit(e.target.checked)} className="accent-purple-500 w-5 h-5 cursor-pointer" />
              </div>
            </div>

            {/* MEDIA FILES */}
            <div className="bg-[#18181a] border border-white/10 p-6 rounded-2xl">
              <h2 className="text-lg font-bold text-white mb-4">Media Files</h2>
              <input type="file" accept="audio/*" ref={audioInputRef} hidden onChange={handleAudioUpload} />
              <button onClick={() => audioInputRef.current?.click()} className="w-full border-2 border-dashed border-white/20 hover:border-purple-500 rounded-xl p-8 flex flex-col items-center justify-center text-gray-400 hover:text-purple-400 transition-all mb-4">
                <UploadCloud size={32} className="mb-2" />
                <span className="font-bold text-sm text-white">{audioUrl ? "Audio Selected ✓" : "Click to upload audio"}</span>
                <span className="text-xs mt-1">MP3, WAV (Refresh to clear)</span>
              </button>
              
              <input type="file" accept="image/*" ref={coverInputRef} hidden onChange={handleCoverUpload} />
              <button onClick={() => coverInputRef.current?.click()} className="w-full border-2 border-dashed border-white/20 hover:border-purple-500 rounded-xl p-8 flex flex-col items-center justify-center text-gray-400 hover:text-purple-400 transition-all">
                <UploadCloud size={32} className="mb-2" />
                <span className="font-bold text-sm text-white">{coverUrl ? "Cover Selected ✓" : "Click to upload artwork"}</span>
                <span className="text-xs mt-1">JPG, PNG (Square)</span>
              </button>
            </div>
          </div>

          {/* BAGIAN KANAN: LIVE PREVIEW */}
          <div>
             <div className="bg-[#18181a] border border-white/10 p-6 rounded-2xl sticky top-0">
               <h2 className="text-xs font-bold text-gray-500 tracking-widest mb-6">LIVE PREVIEW</h2>
               <div className="aspect-square bg-black/50 rounded-2xl border border-white/5 flex flex-col items-center justify-center overflow-hidden mb-6">
                 {coverUrl ? <img src={coverUrl} className="w-full h-full object-cover" alt="cover"/> : <span className="text-gray-600 font-medium">No Artwork</span>}
               </div>
               <h3 className="text-2xl font-bold text-white mb-1">{title || 'Untitled Track'}</h3>
               <p className="text-purple-400 text-sm mb-6">{artist || 'Unknown Artist'}</p>
               
               <button onClick={handlePublish} className="w-full bg-white hover:bg-gray-200 text-black font-bold py-4 rounded-xl transition-all shadow-lg text-lg">
                 Publish Release
               </button>
             </div>
          </div>
        </div>
      )}

      {(activeTab === 'lyrics' || activeTab === 'sync') && (
        <div className="flex flex-col h-full bg-[#18181a] border border-white/10 rounded-2xl overflow-hidden mb-32">
          <div className="p-6 border-b border-white/10 bg-black/20 flex gap-4 items-center">
            <span className="text-sm font-bold text-gray-400">Select Track:</span>
            <select 
              value={selectedTrackId} onChange={(e) => handleSelectTrack(e.target.value)}
              className="bg-black/50 border border-white/10 text-white text-sm rounded-lg p-2 outline-none focus:border-purple-500 min-w-[250px]"
            >
              <option value="" disabled>-- Choose a track --</option>
              {allTracks.map(t => <option key={t.id} value={t.id}>{t.title} - {t.artist}</option>)}
            </select>

            {activeTab === 'sync' && selectedTrackId && (
              <button onClick={insertTimestamp} className="ml-auto bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
                <Clock size={16} /> Stamp Current Time ({Math.floor(currentTime/60)}:{(currentTime%60).toFixed(2).padStart(5,'0')})
              </button>
            )}
          </div>

          <div className="flex-1 p-6 flex flex-col">
             <textarea 
               disabled={!selectedTrackId}
               value={editLyrics} 
               onChange={e => setEditLyrics(e.target.value)}
               className="flex-1 w-full bg-black/30 border border-white/5 rounded-xl p-6 text-white text-lg focus:border-purple-500/50 outline-none resize-none font-medium whitespace-pre-wrap leading-relaxed" 
               placeholder={selectedTrackId ? (activeTab === 'sync' ? "Paste LRC here or use Stamp button..." : "Type or paste static lyrics here. Ctrl+A to delete all.") : "Select a track first..."}
             />
          </div>

          <div className="p-6 border-t border-white/10 bg-black/20 flex items-center justify-between">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" checked={isChecked} onChange={e=>setIsChecked(e.target.checked)} className="accent-purple-500 w-5 h-5 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">I know this will be curated and reviewed first by the artist.</span>
            </label>
            <button 
              onClick={handleSubmitLyrics}
              disabled={!selectedTrackId}
              className="bg-white hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3 px-8 rounded-xl transition-all shadow-lg flex items-center gap-2"
            >
              <CheckCircle2 size={18} /> Submit Lyrics
            </button>
          </div>
        </div>
      )}
    </div>
  );
}