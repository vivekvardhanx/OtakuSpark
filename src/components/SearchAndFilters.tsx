import React from 'react';
import { Search, X, Filter, RotateCcw, Play, Sparkles } from 'lucide-react';
import { ALL_SERIES, ALL_THEMES } from '../data/characters';
import { AnimeSeries, MotivationalTheme } from '../types/character';

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedAnime: AnimeSeries | 'ALL';
  onAnimeChange: (anime: AnimeSeries | 'ALL') => void;
  selectedTheme: MotivationalTheme | 'ALL';
  onThemeChange: (theme: MotivationalTheme | 'ALL') => void;
  verifiedOnly: boolean;
  onVerifiedOnlyToggle: () => void;
  totalFiltered: number;
  totalAll: number;
  onClearFilters: () => void;
  onSurpriseClick: () => void;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedAnime,
  onAnimeChange,
  selectedTheme,
  onThemeChange,
  verifiedOnly,
  onVerifiedOnlyToggle,
  totalFiltered,
  totalAll,
  onClearFilters,
  onSurpriseClick,
}) => {
  const isFiltered =
    searchQuery.trim().length > 0 ||
    selectedAnime !== 'ALL' ||
    selectedTheme !== 'ALL' ||
    verifiedOnly;

  return (
    <section id="explore-section" className="w-full space-y-6 pt-4 pb-2">
      {/* Top Row: Search Input + Anime Dropdown Selector + Surprise Me Button */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A5A1B2]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by character name, series, or iconic quote..."
            className="w-full pl-10 pr-9 py-2.5 bg-[#15151D] border border-white/10 rounded-xl text-sm text-[#F5F3F8] placeholder-[#64748B] focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A5A1B2] hover:text-white p-0.5 rounded cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Anime Series Filter Select */}
        <div className="relative shrink-0 md:w-64">
          <select
            value={selectedAnime}
            onChange={(e) => onAnimeChange(e.target.value as AnimeSeries | 'ALL')}
            className="w-full appearance-none px-4 py-2.5 bg-[#15151D] border border-white/10 rounded-xl text-sm text-[#F5F3F8] focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all cursor-pointer font-medium"
          >
            <option value="ALL">All Anime Universes ({ALL_SERIES.length})</option>
            {ALL_SERIES.map((series) => (
              <option key={series} value={series}>
                {series}
              </option>
            ))}
          </select>
          <Filter className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A5A1B2] pointer-events-none" />
        </div>

        {/* Verified Moments Toggle */}
        <button
          type="button"
          onClick={onVerifiedOnlyToggle}
          className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl border transition-all whitespace-nowrap cursor-pointer ${
            verifiedOnly
              ? 'bg-[#8B5CF6]/15 border-[#8B5CF6] text-[#8B5CF6]'
              : 'bg-[#15151D] border-white/10 text-[#A5A1B2] hover:text-white hover:border-white/20'
          }`}
        >
          <Play className={`w-3.5 h-3.5 ${verifiedOnly ? 'fill-[#8B5CF6]' : ''}`} />
          <span>Verified Scenes</span>
        </button>

        {/* Quick Surprise Me Button */}
        <button
          type="button"
          onClick={onSurpriseClick}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#F5F3F8] hover:border-white/25 transition-all whitespace-nowrap cursor-pointer font-display"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
          <span>Surprise Me</span>
        </button>

        {/* Clear Filters Button (shown only when filters active) */}
        {isFiltered && (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-medium text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/15 border border-rose-500/20 rounded-xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Motivational Pillar Segmented Bar */}
      <div id="themes-section" className="space-y-2">
        <div className="flex items-center justify-between text-xs text-[#A5A1B2] font-mono">
          <span className="uppercase tracking-wider font-semibold">
            Pillars of Character & Will:
          </span>
          <span>
            Showing <strong className="text-white font-bold">{totalFiltered}</strong> of {totalAll}
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          <button
            type="button"
            onClick={() => onThemeChange('ALL')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              selectedTheme === 'ALL'
                ? 'bg-[#F5F3F8] text-[#09090D] shadow-sm font-bold'
                : 'bg-[#15151D] text-[#A5A1B2] hover:text-white hover:bg-white/5 border border-white/[0.06]'
            }`}
          >
            All Themes
          </button>
          {ALL_THEMES.map((theme) => (
            <button
              key={theme}
              type="button"
              onClick={() => onThemeChange(theme)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                selectedTheme === theme
                  ? 'bg-[#8B5CF6] text-white shadow-sm font-semibold'
                  : 'bg-[#15151D] text-[#A5A1B2] hover:text-white hover:bg-white/5 border border-white/[0.06]'
              }`}
            >
              {theme}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
