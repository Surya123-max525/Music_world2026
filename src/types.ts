export type Track = {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: string;
};

export type Playlist = {
  id: string;
  name: string;
  cover_url: string;
  tracks: Track[];
};

export type NavTab = 'home' | 'search' | 'library' | 'favorites' | 'profile';
