import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  onReset: () => void;
  searchQuery: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onReset, searchQuery }) => {
  return (
    <div className="w-full py-16 px-4 flex flex-col items-center justify-center text-center bg-[#15151D]/60 rounded-2xl border border-white/10 my-8">
      <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#8B5CF6] mb-4">
        <SearchX className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-[#F5F3F8]">No Characters Found</h3>
      <p className="text-sm text-[#A5A1B2] max-w-md mt-1 mb-6">
        {searchQuery
          ? `No characters matching "${searchQuery}" with the current filters.`
          : 'No characters match your current combination of anime series and theme filters.'}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] active:scale-95 transition-all rounded-lg shadow-sm cursor-pointer uppercase tracking-wider font-display"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Clear All Filters</span>
      </button>
    </div>
  );
};
