import React from 'react';
import { JewelryItem } from '../types';
import { JewelryCard } from './JewelryCard';
import { Sparkles, RefreshCw } from 'lucide-react';

interface JewelryGridProps {
  items: JewelryItem[];
  onOpenDetail: (item: JewelryItem) => void;
  onToggleWishlist: (item: JewelryItem) => void;
  wishlistIds: Set<string>;
  onOpenItemQR: (item: JewelryItem) => void;
  onResetFilters: () => void;
}

export const JewelryGrid: React.FC<JewelryGridProps> = ({
  items,
  onOpenDetail,
  onToggleWishlist,
  wishlistIds,
  onOpenItemQR,
  onResetFilters,
}) => {
  if (items.length === 0) {
    return (
      <div className="bg-[#121212] border border-[#c5a059]/20 rounded-2xl p-12 text-center space-y-4 max-w-lg mx-auto my-8">
        <Sparkles className="w-12 h-12 text-[#c5a059] mx-auto opacity-60" />
        <h3 className="text-xl font-serif font-light text-[#c5a059]">No Jewels Match Your Criteria</h3>
        <p className="text-[#e0d8cc]/60 text-sm font-light">
          Try adjusting your search keyword, category selection, or price range slider to discover more grand pieces.
        </p>
        <button
          onClick={onResetFilters}
          className="px-5 py-2.5 rounded-full bg-[#c5a059] hover:bg-[#d8b56f] text-[#080808] font-sans font-semibold text-xs tracking-wider uppercase transition inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reset All Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <JewelryCard
          key={item.id}
          item={item}
          onOpenDetail={onOpenDetail}
          onToggleWishlist={onToggleWishlist}
          isWishlisted={wishlistIds.has(item.id)}
          onOpenItemQR={onOpenItemQR}
        />
      ))}
    </div>
  );
};
