import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Heart, ListMusic, Maximize2, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { lyrics } from '../data';
import type { Track } from '../types';
import { HiddenYouTubePlayer } from './HiddenYouTubePlayer';
import { Visualizer } from './Visualizer';

type Props = {
  track: Track;
  queue: Track[];
  playing: boolean;
  fullscreen: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onFullscreen: (open: boolean) => void;
};

export function Player({ track, queue, playing, fullscreen, onTogglePlay, onNext, onPrev, onFullscreen }: Props) {
  return (
    <>
      <HiddenYouTubePlayer track={track} playing={playing} />
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={(_, info) => {
          if (info.offset.y < -50) onFullscreen(true);
        }}
        onClick={() => onFullscreen(true)}
        className="fixed inset-x-4 bottom-24 z-30 rounded-[1.7rem] border border-white/10 bg-black/70 p-3 shadow-glow backdrop-blur-2xl md:left-1/2 md:max-w-2xl md:-translate-x-1/2"
      >
        <div className="flex items-center gap-3">
          <img src={track.thumbnail} alt="" className="size-14 rounded-2xl object-cover" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-white">{track.title}</p>
            <p className="truncate text-sm text-slate-400">{track.artist}</p>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full bg-neon" initial={{ width: '10%' }} animate={{ width: playing ? '68%' : '26%' }} />
            </div>
          </div>
          <button onClick={(event) => { event.stopPropagation(); onTogglePlay(); }} className="grid size-12 place-items-center rounded-full bg-neon text-night shadow-glow">
            {playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
          </button>
          <button onClick={(event) => { event.stopPropagation(); onNext(); }} className="text-white">
            <SkipForward />
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {fullscreen ? (
          <motion.section
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 90) onFullscreen(false);
              if (info.offset.x > 80) onPrev();
              if (info.offset.x < -80) onNext();
            }}
            className="fixed inset-0 z-50 overflow-y-auto bg-night px-5 pb-8 pt-4 text-white"
          >
            <div className="absolute inset-0 opacity-50 blur-3xl" style={{ backgroundImage: `url(${track.thumbnail})`, backgroundSize: 'cover' }} />
            <div className="relative mx-auto flex min-h-full max-w-xl flex-col">
              <div className="flex items-center justify-between">
                <button onClick={() => onFullscreen(false)} className="rounded-full bg-white/10 p-3 backdrop-blur-xl"><ChevronDown /></button>
                <span className="text-sm font-semibold uppercase tracking-[0.35em] text-neon">Now Playing</span>
                <button className="rounded-full bg-white/10 p-3 backdrop-blur-xl"><Maximize2 /></button>
              </div>

              <motion.img
                src={track.thumbnail}
                alt=""
                className="mx-auto mt-10 aspect-square w-full max-w-sm rounded-[2.5rem] object-cover shadow-glow"
                animate={{ scale: playing ? [1, 1.03, 1] : 1 }}
                transition={{ repeat: playing ? Infinity : 0, duration: 4 }}
              />

              <div className="mt-8 text-center">
                <h2 className="text-3xl font-black">{track.title}</h2>
                <p className="mt-2 text-slate-300">{track.artist}</p>
              </div>

              <Visualizer active={playing} />

              <div className="mt-4">
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-neon to-gold" animate={{ width: playing ? '72%' : '35%' }} />
                </div>
                <div className="mt-2 flex justify-between text-xs text-slate-400"><span>1:48</span><span>{track.duration}</span></div>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-[2rem] bg-white/[0.06] p-4 backdrop-blur-xl">
                <Shuffle className="text-neon" />
                <button onClick={onPrev}><SkipBack size={30} /></button>
                <button onClick={onTogglePlay} className="grid size-20 place-items-center rounded-full bg-neon text-night shadow-glow">{playing ? <Pause size={34} fill="currentColor" /> : <Play size={34} fill="currentColor" />}</button>
                <button onClick={onNext}><SkipForward size={30} /></button>
                <Repeat className="text-gold" />
              </div>

              <div className="mt-5 grid grid-cols-4 gap-3 text-center text-sm">
                <button className="rounded-3xl bg-white/10 p-4"><Heart className="mx-auto text-gold" />Favorite</button>
                <button className="rounded-3xl bg-white/10 p-4"><ListMusic className="mx-auto text-neon" />Queue</button>
                <button className="rounded-3xl bg-white/10 p-4"><Volume2 className="mx-auto" />Volume</button>
                <button className="rounded-3xl bg-white/10 p-4">Lyrics</button>
              </div>

              <div className="mt-6 rounded-[2rem] border border-white/10 bg-black/40 p-5 backdrop-blur-xl">
                <h3 className="font-bold text-gold">Synced Lyrics</h3>
                <div className="mt-3 space-y-3">
                  {lyrics.map((line, index) => <p key={line} className={index === 2 ? 'text-xl font-bold text-neon' : 'text-slate-400'}>{line}</p>)}
                </div>
              </div>

              <div className="mt-5 rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
                <h3 className="font-bold text-gold">Up Next</h3>
                {queue.slice(0, 4).map((item) => <p key={item.id} className="mt-3 rounded-2xl bg-black/30 p-3 text-sm">☰ {item.title} — {item.artist}</p>)}
              </div>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </>
  );
}
