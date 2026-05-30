create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null,
  avatar text,
  created_at timestamptz default now()
);

create table if not exists public.playlists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  cover_url text,
  created_at timestamptz default now()
);

create table if not exists public.playlist_tracks (
  id uuid primary key default gen_random_uuid(),
  playlist_id uuid not null references public.playlists(id) on delete cascade,
  track_id text not null,
  position integer default 0,
  created_at timestamptz default now()
);

create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  track_id text not null,
  created_at timestamptz default now(),
  unique (user_id, track_id)
);

create table if not exists public.recently_played (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  track_id text not null,
  played_at timestamptz default now()
);

create table if not exists public.spaces (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  theme text default 'neon-blue-gold',
  created_at timestamptz default now()
);

alter table public.users enable row level security;
alter table public.playlists enable row level security;
alter table public.playlist_tracks enable row level security;
alter table public.favorites enable row level security;
alter table public.recently_played enable row level security;
alter table public.spaces enable row level security;

create policy "Users manage own profile" on public.users for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "Users manage own playlists" on public.playlists for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage own favorites" on public.favorites for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage own recents" on public.recently_played for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage own spaces" on public.spaces for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage playlist tracks" on public.playlist_tracks for all using (
  exists (select 1 from public.playlists where playlists.id = playlist_tracks.playlist_id and playlists.user_id = auth.uid())
) with check (
  exists (select 1 from public.playlists where playlists.id = playlist_tracks.playlist_id and playlists.user_id = auth.uid())
);
