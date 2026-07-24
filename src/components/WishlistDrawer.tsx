import React from 'react';
import { X, Trash2, Phone, ShoppingBag, Sparkles, ChevronRight } from 'lucide-react';
import { WishlistItem } from '../types';
import { SHOP_INFO } from '../data/jewelryData';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: WishlistItem[];
  onRemoveFromWishlist: (itemId: string) => void;
  onClearWishlist: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onClearWishlist,
}) => {
  if (!isOpen) return null;

  const totalCost = wishlist.reduce((acc, curr) => acc + curr.item.price, 0);
  const totalMrp = wishlist.reduce((acc, curr) => acc + curr.item.mrp, 0);

  const combinedItemsText = wishlist
    .map(
      (w, idx) =>
        `${idx + 1}. ${w.item.name} (${w.item.code}) - Cost: ₹${w.item.price.toLocaleString('en-IN')}`
    )
    .join('%0A');

  const whatsappInquiryMessage = encodeURIComponent(
    `Hello Tharuni's Jewelry, I have compiled a list of jewels I would like to inquire about:%0A%0A${decodeURIComponent(
      combinedItemsText
    )}%0A%0ATotal Estimated Cost: ₹${totalCost.toLocaleString(
      'en-IN'
    )}%0A%0APlease confirm stock availability and booking procedure.`
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#080808]/85 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-[#121212] border-l border-[#c5a059]/30 text-[#e0d8cc] h-full flex flex-col shadow-2xl">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#c5a059]/20 flex items-center justify-between bg-[#080808]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#c5a059]" />
            <div>
              <h3 className="font-serif font-light text-[#c5a059] text-lg">Inquiry Wishlist</h3>
              <p className="text-[10px] text-[#e0d8cc]/50 font-sans tracking-wider uppercase">
                {wishlist.length} {wishlist.length === 1 ? 'Jewel' : 'Jewels'} Saved
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#1a1a1a] text-[#c5a059] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <ShoppingBag className="w-12 h-12 text-[#c5a059]/40" />
              <h4 className="font-serif font-light text-[#c5a059]">Your Wishlist is Empty</h4>
              <p className="text-xs text-[#e0d8cc]/60 font-light">
                Click the heart icon on any jewel card to save it for your custom price quote or WhatsApp inquiry.
              </p>
            </div>
          ) : (
            wishlist.map(({ item }) => (
              <div
                key={item.id}
                className="bg-[#080808] border border-[#c5a059]/20 p-3 rounded-xl flex items-center gap-3 relative group"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-lg object-cover border border-[#c5a059]/20 flex-shrink-0"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[9px] font-mono bg-[#121212] text-[#c5a059] px-1.5 py-0.5 rounded border border-[#c5a059]/20 font-bold">
                    {item.code}
                  </span>
                  <h4 className="text-xs font-serif font-normal text-[#e0d8cc] truncate">
                    {item.name}
                  </h4>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-serif font-semibold text-[#c5a059]">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-[#e0d8cc]/40 line-through font-mono">
                      ₹{item.mrp.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveFromWishlist(item.id)}
                  className="p-2 text-[#e0d8cc]/40 hover:text-red-400 transition"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Summary & WhatsApp Inquiry */}
        {wishlist.length > 0 && (
          <div className="p-4 border-t border-[#c5a059]/20 bg-[#080808] space-y-3 font-sans">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[#e0d8cc]/60">
                <span>Total MRP:</span>
                <span className="line-through font-mono">₹{totalMrp.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-medium">
                <span>Total Discount Savings:</span>
                <span className="font-mono">-₹{(totalMrp - totalCost).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-base font-serif text-[#c5a059] pt-2 border-t border-[#c5a059]/15">
                <span>Total Estimated Cost:</span>
                <span className="font-semibold">₹{totalCost.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <a
              href={`https://wa.me/${SHOP_INFO.whatsapp}?text=${whatsappInquiryMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-[#080808] hover:bg-[#1a1a1a] text-emerald-400 border border-emerald-500/40 font-sans tracking-wider uppercase font-semibold text-xs shadow-xl flex items-center justify-center gap-2 transition"
            >
              <Phone className="w-4 h-4" />
              <span>Send Combined Inquiry on WhatsApp</span>
            </a>

            <div className="flex justify-between items-center text-[11px] text-[#e0d8cc]/50 pt-1">
              <button
                onClick={onClearWishlist}
                className="hover:text-[#c5a059] underline uppercase tracking-wider"
              >
                Clear Wishlist
              </button>
              <span>{wishlist.length} Items Selected</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
