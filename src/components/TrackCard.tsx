import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import type { Track } from '../types';

type Props = {
  track: Track;
  onPlay: (track: Track) => void;
};

export function TrackCard({ track, onPlay }: Props) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ y: -4 }}
      onClick={() => onPlay(track)}
      className="group min-w-40 rounded-[1.6rem] border border-white/10 bg-white/[0.06] p-3 text-left shadow-glow backdrop-blur-xl"
    >
      <div className="relative overflow-hidden rounded-3xl">
        <img src={track.thumbnail} alt="" className="aspect-square w-full object-cover" />
        <span className="absolute bottom-2 right-2 grid size-10 place-items-center rounded-full bg-neon text-night shadow-glow">
          <Play size={18} fill="currentColor" />
        </span>
      </div>
      <p className="mt-3 truncate font-semibold text-white">{track.title}</p>
      <p className="truncate text-sm text-slate-400">{track.artist}</p>
    </motion.button>
  );
}
