import React from 'react';

export default function ProjectFilters({ categories, activeCategory, onSelectCategory, projectCounts }) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter projects by category">
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        const count = projectCounts[cat] || 0;

        return (
          <button
            key={cat}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-2 text-xs font-black uppercase font-display tracking-wider transition-all duration-200 flex items-center gap-2 ${
              isActive
                ? 'bg-[#FFDE00] text-black shadow-lg shadow-[#FFDE00]/20'
                : 'bg-zinc-950 text-zinc-300 hover:text-white hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <span>{cat}</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.2 ${
              isActive ? 'bg-black text-[#FFDE00]' : 'bg-black text-zinc-500'
            }`}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
