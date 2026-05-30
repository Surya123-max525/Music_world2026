import type { Playlist, Track } from './types';

export const featuredTracks: Track[] = [
  {
    id: 'masti-neon-raaga',
    title: 'Neon Raaga Nights',
    artist: 'Masti AI Collective',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80',
    duration: '3:44',
  },
  {
    id: 'masti-tamil-pulse',
    title: 'Tamil Pulse Drive',
    artist: 'DJ Marina',
    thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80',
    duration: '4:08',
  },
  {
    id: 'masti-gold-skyline',
    title: 'Gold Skyline',
    artist: 'Asha Nova',
    thumbnail: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=600&q=80',
    duration: '2:58',
  },
  {
    id: 'masti-lofi-monsoon',
    title: 'LoFi Monsoon',
    artist: 'Cloud Tabla',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
    duration: '3:20',
  },
  {
    id: 'masti-english-wave',
    title: 'English Wave Glow',
    artist: 'The Midnight Bots',
    thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80',
    duration: '3:36',
  },
];

export const shelves = [
  'Trending Songs',
  'Recently Played',
  'Recommended',
  'Mood Mixes',
  'Tamil Hits',
  'English Hits',
  'LoFi',
  'Chill Beats',
];

export const playlists: Playlist[] = [
  { id: 'focus', name: 'Neon Focus', cover_url: featuredTracks[0].thumbnail, tracks: featuredTracks.slice(0, 3) },
  { id: 'party', name: 'Gold Party', cover_url: featuredTracks[2].thumbnail, tracks: featuredTracks.slice(1, 5) },
  { id: 'late-night', name: 'Late Night Masti', cover_url: featuredTracks[3].thumbnail, tracks: featuredTracks.slice(2) },
];

export const lyrics = [
  'Blue lights dancing on the midnight floor',
  'Gold dust rising every time we want more',
  'Masti in the speakers, hearts in stereo',
  'Swipe into the rhythm, let the whole world glow',
];
