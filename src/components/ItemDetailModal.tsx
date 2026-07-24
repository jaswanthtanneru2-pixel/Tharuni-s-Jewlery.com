import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Phone,
  Heart,
  QrCode,
  CheckCircle2,
  ShieldCheck,
  Award,
  Truck,
  RotateCcw,
  Share2,
} from 'lucide-react';
import { JewelryItem } from '../types';
import { SHOP_INFO } from '../data/jewelryData';

interface ItemDetailModalProps {
  item: JewelryItem | null;
  onClose: () => void;
  onToggleWishlist: (item: JewelryItem) => void;
  isWishlisted: boolean;
  onOpenItemQR: (item: JewelryItem) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  onToggleWishlist,
  isWishlisted,
  onOpenItemQR,
}) => {
  if (!item) return null;

  const allImages = [item.imageUrl, ...(item.additionalImages || [])];
  const [selectedImg, setSelectedImg] = useState(allImages[0]);

  const whatsappMessage = encodeURIComponent(
    `Hello Tharuni's Jewelry, I am interested in: ${item.name} (Code: ${item.code}) priced at ₹${item.price.toLocaleString('en-IN')}. Please confirm stock availability and booking procedure.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080808]/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#121212] border border-[#c5a059]/30 rounded-3xl shadow-2xl text-[#e0d8cc] my-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#080808] hover:bg-[#1a1a1a] text-[#c5a059] border border-[#c5a059]/30 transition shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          {/* Left Column: Image Gallery & Zoom Frame */}
          <div className="md:col-span-6 space-y-3">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#080808] border border-[#c5a059]/30 shadow-xl group">
              <img
                src={selectedImg}
                alt={item.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="absolute top-3 left-3 bg-[#080808]/90 border border-[#c5a059]/50 text-[#c5a059] px-3 py-1 rounded-full text-xs font-mono font-bold uppercase">
                {item.code}
              </div>

              {item.isBestSeller && (
                <div className="absolute top-3 right-3 bg-[#c5a059] text-[#080808] px-2.5 py-1 rounded-full text-[10px] font-sans font-black uppercase tracking-wider">
                  Best Seller
                </div>
              )}
            </div>

            {/* Thumbnail Selectors */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition ${
                      selectedImg === img ? 'border-[#c5a059] shadow-md' : 'border-[#1a1a1a] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-[#e0d8cc]/80 font-sans tracking-wide">
              <div className="bg-[#080808] p-2 rounded-xl border border-[#c5a059]/20 text-center">
                <ShieldCheck className="w-4 h-4 text-[#c5a059] mx-auto mb-1" />
                <span>Anti-Tarnish</span>
              </div>
              <div className="bg-[#080808] p-2 rounded-xl border border-[#c5a059]/20 text-center">
                <Award className="w-4 h-4 text-[#c5a059] mx-auto mb-1" />
                <span>Handcrafted Finish</span>
              </div>
              <div className="bg-[#080808] p-2 rounded-xl border border-[#c5a059]/20 text-center">
                <Truck className="w-4 h-4 text-[#c5a059] mx-auto mb-1" />
                <span>Pan India Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Specifications & Cost */}
          <div className="md:col-span-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-[#080808] border border-[#c5a059]/30 text-[#c5a059] px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider">
                  {item.category.replace('-', ' ')}
                </span>
                <span className="text-xs text-[#e0d8cc]/60 font-sans">Rating: ⭐ {item.rating} ({item.reviewsCount} reviews)</span>
              </div>

              <h2 className="text-2xl font-serif font-light text-[#e0d8cc] leading-snug">
                {item.name}
              </h2>

              <p className="text-xs text-[#e0d8cc]/70 leading-relaxed font-light">
                {item.description}
              </p>

              {/* COST CALLOUT */}
              <div className="bg-[#181818] p-4 rounded-2xl border border-[#c5a059]/40 shadow-lg">
                <div className="text-[9px] text-[#c5a059] font-sans font-semibold uppercase tracking-[0.2em]">
                  Grand Luxury Cost
                </div>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-3xl font-serif font-semibold text-[#c5a059] tracking-tight">
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm text-[#e0d8cc]/40 line-through font-mono">
                    ₹{item.mrp.toLocaleString('en-IN')}
                  </span>
                  <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full text-xs font-mono font-bold">
                    SAVE ₹{(item.mrp - item.price).toLocaleString('en-IN')} ({item.discountPercent}%)
                  </span>
                </div>
              </div>

              {/* Specifications Breakdown */}
              <div className="space-y-2 bg-[#080808] p-3.5 rounded-2xl border border-[#c5a059]/20 text-xs">
                <h4 className="font-sans font-semibold uppercase tracking-wider text-[#c5a059] text-[11px] border-b border-[#c5a059]/15 pb-1.5 flex items-center justify-between">
                  <span>Product Specifications</span>
                  <span className="text-[10px] text-[#c5a059]/70 font-mono">Code: {item.code}</span>
                </h4>

                <div className="grid grid-cols-2 gap-2 text-[#e0d8cc]/80 font-sans">
                  <div>
                    <span className="text-[#e0d8cc]/50 block text-[10px]">Material:</span>
                    <strong className="text-[#e0d8cc] text-[11px] font-medium">{item.specifications.material}</strong>
                  </div>
                  <div>
                    <span className="text-[#e0d8cc]/50 block text-[10px]">Stone Grade:</span>
                    <strong className="text-[#e0d8cc] text-[11px] font-medium">{item.specifications.stoneType}</strong>
                  </div>
                  <div>
                    <span className="text-[#e0d8cc]/50 block text-[10px]">Plating Finish:</span>
                    <strong className="text-[#e0d8cc] text-[11px] font-medium">{item.specifications.finish}</strong>
                  </div>
                  <div>
                    <span className="text-[#e0d8cc]/50 block text-[10px]">Total Weight:</span>
                    <strong className="text-[#e0d8cc] text-[11px] font-medium">{item.specifications.weight}</strong>
                  </div>
                </div>

                {item.specifications.includes.length > 0 && (
                  <div className="pt-2 border-t border-[#c5a059]/15">
                    <span className="text-[#e0d8cc]/50 block text-[10px] mb-1 font-sans">Set Includes:</span>
                    <div className="grid grid-cols-2 gap-1 text-[11px]">
                      {item.specifications.includes.map((inc, i) => (
                        <div key={i} className="flex items-center gap-1 text-[#e0d8cc]/90">
                          <CheckCircle2 className="w-3 h-3 text-[#c5a059] flex-shrink-0" />
                          <span className="truncate">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#c5a059]/15 space-y-2">
              <a
                href={`https://wa.me/${SHOP_INFO.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-2xl bg-[#080808] hover:bg-[#1a1a1a] text-emerald-400 border border-emerald-500/40 font-sans font-semibold text-xs tracking-wider uppercase shadow-xl flex items-center justify-center gap-2 transition"
              >
                <Phone className="w-4 h-4" />
                <span>Inquire & Reserve on WhatsApp</span>
              </a>

              <div className="flex gap-2">
                <button
                  onClick={() => onToggleWishlist(item)}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-sans tracking-wider uppercase font-semibold transition flex items-center justify-center gap-1.5 ${
                    isWishlisted
                      ? 'bg-[#c5a059] border-[#c5a059] text-[#080808]'
                      : 'bg-[#080808] border-[#c5a059]/20 text-[#c5a059] hover:border-[#c5a059]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#080808]' : ''}`} />
                  <span>{isWishlisted ? 'Saved in Wishlist' : 'Save to Wishlist'}</span>
                </button>

                <button
                  onClick={() => onOpenItemQR(item)}
                  className="px-4 py-2.5 rounded-xl bg-[#080808] border border-[#c5a059]/20 text-[#c5a059] hover:border-[#c5a059] text-xs font-sans uppercase tracking-wider font-semibold transition flex items-center gap-1.5"
                >
                  <QrCode className="w-4 h-4 text-[#c5a059]" />
                  <span>Item QR Code</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
