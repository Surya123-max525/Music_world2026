import { streamUrl } from '../lib/api';
import type { Track } from '../types';

type Props = {
  track: Track;
  playing: boolean;
};

export function HiddenYouTubePlayer({ track, playing }: Props) {
  const embedSource = track.id.startsWith('masti-')
    ? ''
    : `https://www.youtube.com/embed/${track.id}?autoplay=${playing ? 1 : 0}&controls=0&modestbranding=1`;

  return (
    <div aria-hidden className="pointer-events-none fixed -left-[9999px] top-0 h-px w-px overflow-hidden">
      {embedSource ? <iframe title="Hidden YouTube audio bridge" src={embedSource} allow="autoplay; encrypted-media" /> : null}
      {streamUrl(track.id) ? <audio src={streamUrl(track.id)} autoPlay={playing} /> : null}
    </div>
  );
}
