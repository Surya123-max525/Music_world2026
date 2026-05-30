import { Heart, Home, Library, Search, UserRound } from 'lucide-react';
import type { NavTab } from '../types';

const tabs: Array<{ id: NavTab; label: string; Icon: typeof Home }> = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'search', label: 'Search', Icon: Search },
  { id: 'library', label: 'Library', Icon: Library },
  { id: 'favorites', label: 'Favorites', Icon: Heart },
  { id: 'profile', label: 'Profile', Icon: UserRound },
];

type Props = {
  active: NavTab;
  onChange: (tab: NavTab) => void;
};

export function BottomNav({ active, onChange }: Props) {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-40 rounded-[2rem] border border-white/10 bg-black/70 px-2 py-2 shadow-glow backdrop-blur-2xl md:left-1/2 md:max-w-xl md:-translate-x-1/2">
      <div className="grid grid-cols-5 gap-1">
        {tabs.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`flex flex-col items-center gap-1 rounded-3xl px-1 py-2 text-[0.68rem] transition ${
                isActive ? 'bg-neon/15 text-neon shadow-glow' : 'text-slate-400'
              }`}
            >
              <Icon size={20} />
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
