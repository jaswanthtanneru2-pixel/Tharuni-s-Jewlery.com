import React, { useState } from 'react';
import { Sparkles, Heart, Phone, Eye, QrCode, Check, Award, ShieldCheck } from 'lucide-react';
import { JewelryItem } from '../types';
import { SHOP_INFO } from '../data/jewelryData';

interface JewelryCardProps {
  item: JewelryItem;
  onOpenDetail: (item: JewelryItem) => void;
  onToggleWishlist: (item: JewelryItem) => void;
  isWishlisted: boolean;
  onOpenItemQR: (item: JewelryItem) => void;
}

export const JewelryCard: React.FC<JewelryCardProps> = ({
  item,
  onOpenDetail,
  onToggleWishlist,
  isWishlisted,
  onOpenItemQR,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const whatsappMessage = encodeURIComponent(
    `Hello Tharuni's Jewelry, I want to inquire about: ${item.name} (Code: ${item.code}) priced at ₹${item.price.toLocaleString('en-IN')}. Is this available in stock?`
  );

  return (
    <div
      id={`jewel-card-${item.id}`}
      className="group relative rounded-2xl bg-[#121212] border border-[#c5a059]/20 hover:border-[#c5a059]/70 shadow-2xl transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Top Banner Badges */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1">
          <span className="bg-[#080808]/90 border border-[#c5a059]/50 text-[#c5a059] px-2.5 py-0.5 rounded-md text-[10px] font-sans font-bold tracking-widest uppercase backdrop-blur-md shadow-md">
            {item.code}
          </span>
          {item.isBestSeller && (
            <span className="bg-[#c5a059] text-[#080808] px-2 py-0.5 rounded-md text-[9px] font-sans font-black uppercase tracking-wider shadow-md">
              Best Seller
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(item);
          }}
          className={`pointer-events-auto p-2 rounded-full border transition backdrop-blur-md shadow-lg ${
            isWishlisted
              ? 'bg-[#c5a059] border-[#c5a059] text-[#080808]'
              : 'bg-[#080808]/80 border-[#c5a059]/30 text-[#c5a059] hover:text-white hover:border-[#c5a059]'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#080808]' : ''}`} />
        </button>
      </div>

      {/* Main Image Container */}
      <div
        className="relative aspect-square w-full bg-[#080808] cursor-pointer overflow-hidden border-b border-[#c5a059]/15"
        onClick={() => onOpenDetail(item)}
      >
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#121212] text-[#c5a059]/40">
            <Sparkles className="w-8 h-8 animate-spin" />
          </div>
        )}
        <img
          src={item.imageUrl}
          alt={item.name}
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-transparent to-[#080808]/20 opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#080808]/40 backdrop-blur-[2px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(item);
            }}
            className="px-4 py-2 rounded-full bg-[#c5a059] text-[#080808] font-sans font-bold text-xs uppercase tracking-wider shadow-xl flex items-center gap-1.5 hover:bg-[#d8b56f] transform hover:scale-105 transition"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Grand View</span>
          </button>
        </div>
      </div>

      {/* COST UNDER THE PIC */}
      <div className="bg-[#181818] px-4 py-2.5 border-b border-[#c5a059]/15 flex items-center justify-between">
        <div>
          <span className="text-[9px] text-[#c5a059] uppercase tracking-[0.2em] font-sans font-medium block">
            Jewel Cost
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-serif font-semibold text-[#c5a059] tracking-tight">
              ₹{item.price.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-[#e0d8cc]/40 line-through font-mono">
              ₹{item.mrp.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full inline-block">
            {item.discountPercent}% OFF
          </span>
          <span className="block text-[9px] text-[#e0d8cc]/40 mt-0.5 font-sans">Incl. all taxes</span>
        </div>
      </div>

      {/* Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-[#121212]">
        <div>
          <h3
            onClick={() => onOpenDetail(item)}
            className="text-sm font-serif font-normal text-[#e0d8cc] group-hover:text-[#c5a059] transition line-clamp-2 cursor-pointer leading-snug"
          >
            {item.name}
          </h3>

          <p className="text-xs text-[#e0d8cc]/60 line-clamp-2 mt-1.5 leading-relaxed font-light">
            {item.description}
          </p>

          <div className="mt-2.5 flex flex-wrap gap-1">
            <span className="bg-[#1a1a1a] text-[#c5a059] text-[10px] px-2 py-0.5 rounded border border-[#c5a059]/15 font-sans">
              ✨ {item.specifications.finish}
            </span>
            <span className="bg-[#1a1a1a] text-[#c5a059] text-[10px] px-2 py-0.5 rounded border border-[#c5a059]/15 font-sans">
              💎 {item.specifications.stoneType.split('&')[0]}
            </span>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-2 border-t border-[#c5a059]/15 flex items-center justify-between gap-2">
          {/* WhatsApp Order Inquiry */}
          <a
            href={`https://wa.me/${SHOP_INFO.whatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#1a1a1a] hover:bg-[#222222] text-emerald-400 border border-emerald-500/30 py-2 px-2.5 rounded-lg text-xs font-sans tracking-wider uppercase font-medium transition flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Inquire</span>
          </a>

          {/* Item QR Code Generator Button */}
          <button
            onClick={() => onOpenItemQR(item)}
            className="p-2 rounded-lg bg-[#1a1a1a] hover:bg-[#222222] text-[#c5a059] border border-[#c5a059]/20 hover:border-[#c5a059] transition"
            title="Scan or Share Item QR Code"
          >
            <QrCode className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
