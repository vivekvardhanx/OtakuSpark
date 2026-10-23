import React from 'react';
import { Search, X, Filter, RotateCcw, Play, Sparkles } from 'lucide-react';
import { Character, AnimeSeries, MotivationalTheme } from '../types/character';
import { ALL_SERIES, ALL_THEMES } from '../data/characters';
import { CharacterCard } from './CharacterCard';
import { EmptyState } from './EmptyState';

interface AllCharactersSectionProps {
  characters: Character[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedAnime: AnimeSeries | 'ALL';
  onAnimeChange: (anime: AnimeSeries | 'ALL') => void;
  selectedTheme: MotivationalTheme | 'ALL';
  onThemeChange: (theme: MotivationalTheme | 'ALL') => void;
  verifiedOnly: boolean;
  onVerifiedOnlyToggle: () => void;
  onClearFilters: () => void;
  onSelectCharacter: (char: Character) => void;
  totalAllCount: number;
}

export const AllCharactersSection: React.FC<AllCharactersSectionProps> = ({
  characters,
  searchQuery,
  onSearchChange,
  selectedAnime,
  onAnimeChange,
  selectedTheme,
  onThemeChange,
  verifiedOnly,
  onVerifiedOnlyToggle,
  onClearFilters,
  onSelectCharacter,
  totalAllCount,
}) => {
  const isFiltered =
    searchQuery.trim().length > 0 ||
    selectedAnime !== 'ALL' ||
    selectedTheme !== 'ALL' ||
    verifiedOnly;

  return (
    <section id="all-characters-section" className="py-10 sm:py-14 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#8B5CF6] uppercase font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE FULL ROSTER</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#F5F3F8] uppercase font-display">
              EXPLORE ALL CHARACTERS
            </h2>
            <p className="text-sm sm:text-base text-[#A5A1B2] max-w-xl">
              Search by name, browse by anime universe, or filter by defining will.
            </p>
          </div>

          <div className="text-xs font-mono text-[#A5A1B2] self-start md:self-end">
            Showing <strong className="text-white font-bold">{characters.length}</strong> of {totalAllCount} characters
          </div>
        </div>

        {/* Filter Controls Toolbar */}
        <div className="space-y-4 bg-[#101018] p-4 sm:p-5 rounded-2xl border border-white/10 shadow-xl">
          {/* Top Row: Search Input + Universe Select + Verified Toggle + Reset */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A5A1B2]" />
              <input
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search character, anime universe, or quote..."
                className="w-full pl-10 pr-9 py-2.5 bg-[#08080D] border border-white/10 rounded-xl text-sm text-[#F5F3F8] placeholder-[#64748B] focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A5A1B2] hover:text-white p-0.5 rounded cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Anime Universe Selector */}
            <div className="relative shrink-0 sm:w-64">
              <select
                value={selectedAnime}
                onChange={(e) => onAnimeChange(e.target.value as AnimeSeries | 'ALL')}
                className="w-full appearance-none px-4 py-2.5 bg-[#08080D] border border-white/10 rounded-xl text-sm text-[#F5F3F8] focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all cursor-pointer font-medium"
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

            {/* Verified Scenes Toggle */}
            <button
              type="button"
              onClick={onVerifiedOnlyToggle}
              className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl border transition-all whitespace-nowrap cursor-pointer ${
                verifiedOnly
                  ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-[#8B5CF6]'
                  : 'bg-[#08080D] border-white/10 text-[#A5A1B2] hover:text-white hover:border-white/20'
              }`}
            >
              <Play className={`w-3.5 h-3.5 ${verifiedOnly ? 'fill-[#8B5CF6]' : ''}`} />
              <span>Verified Scenes</span>
            </button>

            {/* Reset Button */}
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

          {/* Theme Horizontal Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-left pt-1">
            <button
              type="button"
              onClick={() => onThemeChange('ALL')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                selectedTheme === 'ALL'
                  ? 'bg-[#F5F3F8] text-[#08080D] shadow-sm font-bold'
                  : 'bg-[#08080D] text-[#A5A1B2] hover:text-white hover:bg-white/5 border border-white/[0.08]'
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
                    ? 'bg-[#8B5CF6] text-white shadow-sm font-bold'
                    : 'bg-[#08080D] text-[#A5A1B2] hover:text-white hover:bg-white/5 border border-white/[0.08]'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        {/* Character Cards Responsive Grid */}
        {characters.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-2">
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onSelect={onSelectCharacter}
              />
            ))}
          </div>
        ) : (
          <EmptyState onReset={onClearFilters} searchQuery={searchQuery} />
        )}
      </div>
    </section>
  );
};
