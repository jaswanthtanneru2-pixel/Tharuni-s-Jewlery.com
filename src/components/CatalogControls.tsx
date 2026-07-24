import React from 'react';
import { Search, Filter, SlidersHorizontal, ArrowUpDown, Sparkles, X } from 'lucide-react';
import { JEWELRY_CATEGORIES } from '../data/jewelryData';
import { CategoryId, FilterState } from '../types';

interface CatalogControlsProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalResults: number;
}

export const CatalogControls: React.FC<CatalogControlsProps> = ({
  filters,
  setFilters,
  totalResults,
}) => {
  const handleCategorySelect = (categoryId: CategoryId) => {
    setFilters((prev) => ({ ...prev, selectedCategory: categoryId }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }));
  };

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      selectedCategory: 'all',
      maxPrice: 5000,
      minPrice: 0,
      sortBy: 'featured',
      onlyInStock: false,
    });
  };

  return (
    <div className="bg-[#121212] border border-[#c5a059]/20 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-4">
      {/* Category Tabs */}
      <div>
        <div className="text-[10px] text-[#c5a059] font-sans font-semibold uppercase tracking-[0.2em] mb-2.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            Jewellery Categories
          </span>
          <span className="text-[#e0d8cc]/50 font-normal">
            Showing <strong className="text-[#c5a059] font-serif">{totalResults}</strong> Jewels
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#c5a059]/40">
          {JEWELRY_CATEGORIES.map((cat) => {
            const isSelected = filters.selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase whitespace-nowrap transition flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-[#c5a059] text-[#080808] border-[#c5a059] font-semibold shadow-md'
                    : 'bg-[#080808] text-[#e0d8cc]/80 border-[#c5a059]/20 hover:border-[#c5a059] hover:text-[#e0d8cc]'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Controls Bar: Search, Price Slider, Sort */}
      <div className="pt-3 border-t border-[#c5a059]/15 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Search Input */}
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 text-[#c5a059]/60 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search code (e.g. 1290net), material, or jewel name..."
            value={filters.searchQuery}
            onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
            className="w-full bg-[#080808] border border-[#c5a059]/20 rounded-xl pl-9 pr-8 py-2 text-xs text-[#e0d8cc] placeholder-[#e0d8cc]/40 focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] font-sans tracking-wide"
          />
          {filters.searchQuery && (
            <button
              onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
              className="absolute right-3 top-2.5 text-[#e0d8cc]/40 hover:text-[#c5a059]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Max Price Range Filter */}
        <div className="md:col-span-4 flex items-center gap-3 bg-[#080808] p-2 rounded-xl border border-[#c5a059]/20">
          <SlidersHorizontal className="w-4 h-4 text-[#c5a059] flex-shrink-0" />
          <div className="flex-1">
            <div className="flex justify-between text-[10px] text-[#e0d8cc]/80 font-sans tracking-wider uppercase mb-1">
              <span>Max Cost:</span>
              <strong className="text-[#c5a059] font-serif text-xs">₹{filters.maxPrice.toLocaleString('en-IN')}</strong>
            </div>
            <input
              type="range"
              min="500"
              max="5000"
              step="100"
              value={filters.maxPrice}
              onChange={handlePriceChange}
              className="w-full accent-[#c5a059] cursor-pointer h-1.5 rounded-lg bg-[#1a1a1a]"
            />
          </div>
        </div>

        {/* Sort dropdown & Reset */}
        <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-2">
          <div className="relative flex-1 md:flex-initial">
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))
              }
              className="w-full bg-[#080808] border border-[#c5a059]/20 text-[#e0d8cc] text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-[#c5a059] cursor-pointer font-sans tracking-wide"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Cost: Low to High</option>
              <option value="price-high">Cost: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>

          {(filters.searchQuery ||
            filters.selectedCategory !== 'all' ||
            filters.maxPrice < 5000 ||
            filters.sortBy !== 'featured') && (
            <button
              onClick={resetFilters}
              className="text-xs text-[#c5a059] hover:text-[#e0d8cc] underline font-sans uppercase tracking-wider whitespace-nowrap px-1"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
