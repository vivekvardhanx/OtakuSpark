import React from 'react';
import { Shield, Flame, Zap, HeartHandshake, Crown, Sparkles, Brain, ArrowRight } from 'lucide-react';
import { MotivationalTheme } from '../types/character';

interface ExploreThemesProps {
  onSelectTheme: (theme: MotivationalTheme) => void;
  selectedTheme?: MotivationalTheme | 'ALL';
}

const THEMES: {
  theme: MotivationalTheme;
  label: string;
  icon: React.ElementType;
  accent: string;
}[] = [
  {
    theme: 'Resilience',
    label: 'Resilience',
    icon: Zap,
    accent: '#8B5CF6',
  },
  {
    theme: 'Courage',
    label: 'Courage',
    icon: Flame,
    accent: '#E5484D',
  },
  {
    theme: 'Discipline',
    label: 'Discipline',
    icon: Shield,
    accent: '#10B981',
  },
  {
    theme: 'Leadership',
    label: 'Leadership',
    icon: Crown,
    accent: '#D6AD60',
  },
  {
    theme: 'Sacrifice',
    label: 'Sacrifice',
    icon: HeartHandshake,
    accent: '#F43F5E',
  },
  {
    theme: 'Mental Strength',
    label: 'Mental Strength',
    icon: Brain,
    accent: '#38BDF8',
  },
  {
    theme: 'Confidence',
    label: 'Confidence',
    icon: Sparkles,
    accent: '#EC4899',
  },
];

export const ExploreThemes: React.FC<ExploreThemesProps> = ({
  onSelectTheme,
  selectedTheme = 'ALL',
}) => {
  return (
    <section id="themes-section" className="py-10 sm:py-14 border-b border-white/[0.06] relative bg-[#08080D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Compact Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-left">
          <div className="space-y-1.5">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#F5F3F8] uppercase font-display">
              FIND YOUR EDGE
            </h2>
            <p className="text-sm sm:text-base text-[#A5A1B2]">
              Discover the qualities behind your favorite legends.
            </p>
          </div>

          <span className="text-xs font-mono text-[#8B5CF6] uppercase tracking-wider font-semibold self-start sm:self-auto">
            7 Defining Qualities
          </span>
        </div>

        {/* Compact Responsive Theme Tiles Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4 text-left">
          {THEMES.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedTheme === item.theme;

            return (
              <button
                key={item.theme}
                type="button"
                onClick={() => onSelectTheme(item.theme)}
                className={`group relative p-4 sm:p-5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between text-left overflow-hidden ${
                  isSelected
                    ? 'bg-[#15151D] border-[#8B5CF6] shadow-[0_0_20px_rgba(139,92,246,0.35)]'
                    : 'bg-[#101018] border-white/10 hover:border-white/25 hover:bg-[#15151D] shadow-sm'
                }`}
              >
                {/* Subtle top indicator bar on hover/selection */}
                <div
                  className={`absolute top-0 inset-x-0 h-0.5 transition-opacity ${
                    isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                  style={{ backgroundColor: item.accent }}
                />

                <div className="flex items-center justify-between w-full mb-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: `${item.accent}15`,
                      color: item.accent,
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <ArrowRight
                    className={`w-3.5 h-3.5 text-[#A5A1B2] group-hover:text-white group-hover:translate-x-0.5 transition-all ${
                      isSelected ? 'text-[#8B5CF6] translate-x-0.5' : ''
                    }`}
                  />
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#8B5CF6] transition-colors font-display tracking-tight">
                    {item.label}
                  </h3>
                  <span className="text-[11px] font-mono text-[#A5A1B2] group-hover:text-slate-300">
                    Explore →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
