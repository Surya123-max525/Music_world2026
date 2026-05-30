import type { Track } from '../types';
import { featuredTracks } from '../data';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000';

export async function searchTracks(query: string): Promise<Track[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  try {
    const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(trimmed)}`);
    if (!response.ok) throw new Error('Search request failed');
    const data = (await response.json()) as { results?: Track[] };
    return data.results ?? [];
  } catch {
    return featuredTracks.filter((track) =>
      `${track.title} ${track.artist}`.toLowerCase().includes(trimmed.toLowerCase()),
    );
  }
}

export function streamUrl(trackId: string) {
  if (trackId.startsWith('masti-')) return '';
  return `${API_BASE_URL}/stream/${trackId}`;
}
