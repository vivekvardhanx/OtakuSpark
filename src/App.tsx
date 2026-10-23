import { useState, useMemo, useCallback, useEffect } from 'react';
import { CHARACTERS } from './data/characters';
import { Character, AnimeSeries, MotivationalTheme } from './types/character';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DynamicCharacterCarousel } from './components/DynamicCharacterCarousel';
import { IconicMomentsStrip } from './components/IconicMomentsStrip';
import { ExploreThemes } from './components/ExploreThemes';
import { AllCharactersSection } from './components/AllCharactersSection';
import { CharacterDetailModal } from './components/CharacterDetailModal';
import { SurpriseRevealModal } from './components/SurpriseRevealModal';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAnime, setSelectedAnime] = useState<AnimeSeries | 'ALL'>('ALL');
  const [selectedTheme, setSelectedTheme] = useState<MotivationalTheme | 'ALL'>('ALL');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [isSurpriseActive, setIsSurpriseActive] = useState(false);

  // Filtered characters list
  const filteredCharacters = useMemo(() => {
    return CHARACTERS.filter((char) => {
      // Search query (matches name, characterTitle, anime, quote, or tags)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = char.name.toLowerCase().includes(query);
        const matchesTitle = char.characterTitle.toLowerCase().includes(query);
        const matchesAnime = char.anime.toLowerCase().includes(query);
        const matchesQuote = char.quoteText.toLowerCase().includes(query);
        const matchesTheme = char.motivationalTheme.toLowerCase().includes(query);
        const matchesTags = char.motivationTags.some((t) => t.toLowerCase().includes(query));

        if (!matchesName && !matchesTitle && !matchesAnime && !matchesQuote && !matchesTheme && !matchesTags) {
          return false;
        }
      }

      // Anime filter
      if (selectedAnime !== 'ALL' && char.anime !== selectedAnime) {
        return false;
      }

      // Theme filter
      if (selectedTheme !== 'ALL' && char.motivationalTheme !== selectedTheme) {
        return false;
      }

      // Verified moments only filter
      if (verifiedOnly && char.verificationStatus !== 'verified') {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedAnime, selectedTheme, verifiedOnly]);

  // Curated Featured Legends for Hero and Spotlight
  const featuredLegends = useMemo(() => {
    const slugs = [
      'yami-sukehiro',
      'erwin-smith',
      'levi-ackerman',
      'kyojuro-rengoku',
      'satoru-gojo',
      'roronoa-zoro',
      'monkey-d-luffy',
      'all-might',
      'goku',
      'vegeta',
      'tanjiro-kamado',
      'might-guy',
      'julius-novachrono',
      'mereoleona-vermillion',
      'fuegoleon-vermillion',
      'asta',
      'kakashi-hatake',
      'itachi-uchiha',
      'minato-namikaze',
      'jiraiya',
      'shanks',
      'whitebeard',
      'shota-aizawa',
      'endeavor',
      'tengen-uzui',
    ];
    const found = slugs
      .map((slug) => CHARACTERS.find((c) => c.slug === slug))
      .filter((c): c is Character => Boolean(c));
    return found.length > 0 ? found : CHARACTERS.slice(0, 8);
  }, []);

  // Theme character counts
  const themeCounts = useMemo(() => {
    const counts: Record<MotivationalTheme, number> = {
      Resilience: 0,
      Courage: 0,
      Discipline: 0,
      Leadership: 0,
      Sacrifice: 0,
      'Mental Strength': 0,
      Confidence: 0,
    };
    CHARACTERS.forEach((c) => {
      counts[c.motivationalTheme] = (counts[c.motivationalTheme] || 0) + 1;
    });
    return counts;
  }, []);

  // Modal navigation (Next / Prev)
  const currentIndex = useMemo(() => {
    if (!selectedCharacter) return -1;
    return filteredCharacters.findIndex((c) => c.id === selectedCharacter.id);
  }, [selectedCharacter, filteredCharacters]);

  const handleNextCharacter = useCallback(() => {
    if (currentIndex >= 0 && filteredCharacters.length > 0) {
      const nextIdx = (currentIndex + 1) % filteredCharacters.length;
      setSelectedCharacter(filteredCharacters[nextIdx]);
    }
  }, [currentIndex, filteredCharacters]);

  const handlePrevCharacter = useCallback(() => {
    if (currentIndex >= 0 && filteredCharacters.length > 0) {
      const prevIdx = (currentIndex - 1 + filteredCharacters.length) % filteredCharacters.length;
      setSelectedCharacter(filteredCharacters[prevIdx]);
    }
  }, [currentIndex, filteredCharacters]);

  // Smooth scroll helper
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenSearch = () => {
    handleScrollToSection('all-characters-section');
    setTimeout(() => {
      const input = document.getElementById('search-input');
      if (input) input.focus();
    }, 400);
  };

  const handleThemeSelectFromGrid = (theme: MotivationalTheme) => {
    setSelectedTheme(theme);
    handleScrollToSection('all-characters-section');
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedAnime('ALL');
    setSelectedTheme('ALL');
    setVerifiedOnly(false);
  };

  // Trigger Surprise Me animated roulette
  const handleTriggerSurprise = () => {
    setIsSurpriseActive(true);
  };

  const handleSurpriseComplete = (picked: Character) => {
    setIsSurpriseActive(false);
    setSelectedCharacter(picked);
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#08080D] text-[#F5F3F8] flex flex-col font-sans selection:bg-[#8B5CF6]/30">
      {/* 1. Minimal Cinematic Navbar */}
      <Navbar
        onNavigateToSection={handleScrollToSection}
        onOpenSearch={handleOpenSearch}
        onSurpriseClick={handleTriggerSurprise}
      />

      <main className="flex-1">
        {/* 2. Full-Screen Redesigned Hero Viewport */}
        <Hero
          onExploreClick={() => handleScrollToSection('featured-legends-section')}
          onSurpriseClick={handleTriggerSurprise}
          featuredCharacters={featuredLegends}
          onSelectCharacter={setSelectedCharacter}
        />

        {/* 3. Dynamic Character Carousel (The Main Attraction) */}
        <DynamicCharacterCarousel
          characters={featuredLegends}
          onSelectCharacter={setSelectedCharacter}
          onViewAllClick={() => handleScrollToSection('all-characters-section')}
          isModalOpen={Boolean(selectedCharacter)}
        />

        {/* 4. Section B: Iconic Moments (Horizontal Editorial Strip) */}
        <IconicMomentsStrip
          characters={CHARACTERS}
          onSelectCharacter={setSelectedCharacter}
        />

        {/* 5. Section C: Explore by Theme (Compact "FIND YOUR EDGE" Selector) */}
        <ExploreThemes
          onSelectTheme={handleThemeSelectFromGrid}
          selectedTheme={selectedTheme}
        />

        {/* 6. Section D: Explore All Characters (Full Collection with Search & Filters) */}
        <AllCharactersSection
          characters={filteredCharacters}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedAnime={selectedAnime}
          onAnimeChange={setSelectedAnime}
          selectedTheme={selectedTheme}
          onThemeChange={setSelectedTheme}
          verifiedOnly={verifiedOnly}
          onVerifiedOnlyToggle={() => setVerifiedOnly((prev) => !prev)}
          onClearFilters={handleClearFilters}
          onSelectCharacter={setSelectedCharacter}
          totalAllCount={CHARACTERS.length}
        />
      </main>

      {/* 7. Quick Animated Summon/Roulette for Surprise Me */}
      <SurpriseRevealModal
        isOpen={isSurpriseActive}
        pool={filteredCharacters.length > 0 ? filteredCharacters : CHARACTERS}
        onComplete={handleSurpriseComplete}
        onCancel={() => setIsSurpriseActive(false)}
      />

      {/* 8. Cinematic Character Detail Modal */}
      <CharacterDetailModal
        character={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
        onPrev={filteredCharacters.length > 1 ? handlePrevCharacter : undefined}
        onNext={filteredCharacters.length > 1 ? handleNextCharacter : undefined}
        currentIndex={currentIndex >= 0 ? currentIndex : undefined}
        totalCount={filteredCharacters.length}
      />

      {/* 9. Restrained Footer with OTAKUSPARK Identity */}
      <Footer
        onBackToTop={handleBackToTop}
        onThemeSelect={(theme) => {
          setSelectedTheme(theme);
          handleScrollToSection('all-characters-section');
        }}
      />
    </div>
  );
}
