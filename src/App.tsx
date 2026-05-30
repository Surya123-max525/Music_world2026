import { motion } from 'framer-motion';
import { Mic2, Plus, Search, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { Player } from './components/Player';
import { TrackCard } from './components/TrackCard';
import { featuredTracks, playlists, shelves } from './data';
import { searchTracks } from './lib/api';
import type { NavTab, Track } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [currentTrack, setCurrentTrack] = useState<Track>(featuredTracks[0]);
  const [playing, setPlaying] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [results, setResults] = useState<Track[]>([]);
  const [query, setQuery] = useState('');

  const queue = useMemo(() => featuredTracks.filter((track) => track.id !== currentTrack.id), [currentTrack.id]);

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setPlaying(true);
  };

  const goNext = () => playTrack(queue[0] ?? featuredTracks[0]);
  const goPrev = () => playTrack(featuredTracks[(featuredTracks.findIndex((track) => track.id === currentTrack.id) + featuredTracks.length - 1) % featuredTracks.length]);

  const runSearch = async (value: string) => {
    setQuery(value);
    setResults(await searchTracks(value));
  };

  return (
    <main className="min-h-screen overflow-hidden bg-night pb-48 font-display text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,217,255,0.25),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(247,201,72,0.18),transparent_30%)]" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:44px_44px] opacity-30" />

      <section className="relative mx-auto max-w-6xl px-4 pt-5 md:px-8">
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-neon">Premium AI Streaming</p>
            <h1 className="mt-1 text-3xl font-black md:text-5xl">Masti Music</h1>
          </div>
          <button className="rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-bold text-gold shadow-gold">Go Pro</button>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-glow backdrop-blur-2xl md:grid md:grid-cols-[1.2fr_0.8fr] md:items-center md:gap-8"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-neon/10 px-3 py-1 text-sm text-neon"><Sparkles size={16} /> Mood AI active</span>
            <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">Your neon-powered music universe.</h2>
            <p className="mt-4 max-w-xl text-slate-300">Search YouTube Music through a custom API, sync playlists with Supabase, and enjoy a glassmorphism mobile player with gestures, lyrics, queue, and PWA install support.</p>
          </div>
          <div className="mt-6 rounded-[2rem] bg-black/40 p-4 md:mt-0">
            <img src={currentTrack.thumbnail} alt="" className="aspect-square w-full rounded-[1.6rem] object-cover shadow-glow" />
          </div>
        </motion.div>

        {activeTab === 'home' && (
          <div className="mt-8 space-y-8">
            {shelves.map((shelf, shelfIndex) => (
              <section key={shelf}>
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-xl font-bold">{shelf}</h2>
                  <button className="text-sm text-neon">See all</button>
                </div>
                <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
                  {featuredTracks.map((track, index) => (
                    <TrackCard key={`${shelf}-${track.id}`} track={featuredTracks[(index + shelfIndex) % featuredTracks.length]} onPlay={playTrack} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {activeTab === 'search' && (
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
            <div className="flex items-center gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.08] p-3 shadow-glow backdrop-blur-xl">
              <Search className="text-neon" />
              <input value={query} onChange={(event) => void runSearch(event.target.value)} placeholder="Search songs, artists, moods..." className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-slate-500" />
              <button className="rounded-full bg-gold/20 p-3 text-gold"><Mic2 /></button>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-300">
              {['Tamil party', 'English hits', 'LoFi focus', 'AR Rahman', 'Chill beats'].map((item) => <button key={item} onClick={() => void runSearch(item)} className="rounded-full bg-white/10 px-4 py-2">{item}</button>)}
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {(results.length ? results : featuredTracks).map((track) => (
                <motion.button whileTap={{ scale: 0.98 }} key={track.id} onClick={() => playTrack(track)} className="flex items-center gap-3 rounded-3xl bg-white/[0.06] p-3 text-left backdrop-blur-xl">
                  <img src={track.thumbnail} alt="" className="size-16 rounded-2xl object-cover" />
                  <div className="min-w-0 flex-1"><p className="truncate font-bold">{track.title}</p><p className="truncate text-sm text-slate-400">{track.artist}</p></div>
                  <span className="text-neon">{track.duration}</span>
                </motion.button>
              ))}
            </div>
          </motion.section>
        )}

        {activeTab === 'library' && (
          <section className="mt-8 grid gap-4 md:grid-cols-3">
            <button className="flex items-center justify-center gap-2 rounded-[2rem] border border-dashed border-neon/50 bg-neon/10 p-8 text-neon"><Plus /> Create playlist</button>
            {playlists.map((playlist) => <article key={playlist.id} className="rounded-[2rem] bg-white/[0.06] p-4 backdrop-blur-xl"><img src={playlist.cover_url} alt="" className="aspect-video rounded-3xl object-cover" /><h3 className="mt-3 text-xl font-bold">{playlist.name}</h3><p className="text-slate-400">{playlist.tracks.length} songs • share/import enabled</p></article>)}
          </section>
        )}

        {activeTab === 'favorites' && <section className="mt-8 grid gap-4 md:grid-cols-2">{featuredTracks.slice(0, 4).map((track) => <TrackCard key={track.id} track={track} onPlay={playTrack} />)}</section>}

        {activeTab === 'profile' && (
          <section className="mt-8 rounded-[2rem] bg-white/[0.06] p-6 backdrop-blur-xl">
            <div className="flex items-center gap-4"><div className="grid size-20 place-items-center rounded-full bg-gradient-to-br from-neon to-gold text-3xl font-black text-night">M</div><div><h2 className="text-2xl font-black">Masti Listener</h2><p className="text-slate-400">Email + Google Supabase auth ready</p></div></div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center"><div className="rounded-3xl bg-black/30 p-4"><b>24</b><p className="text-xs text-slate-400">Playlists</p></div><div className="rounded-3xl bg-black/30 p-4"><b>1.8k</b><p className="text-xs text-slate-400">Favorites</p></div><div className="rounded-3xl bg-black/30 p-4"><b>96h</b><p className="text-xs text-slate-400">Listening</p></div></div>
          </section>
        )}
      </section>

      <Player track={currentTrack} queue={queue} playing={playing} fullscreen={fullscreen} onTogglePlay={() => setPlaying((value) => !value)} onNext={goNext} onPrev={goPrev} onFullscreen={setFullscreen} />
      <BottomNav active={activeTab} onChange={setActiveTab} />
    </main>
  );
}
