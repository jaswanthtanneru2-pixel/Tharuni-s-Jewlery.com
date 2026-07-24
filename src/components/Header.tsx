import React from 'react';
import { Sparkles, QrCode, BookOpen, Heart, Phone, ShoppingBag, Search } from 'lucide-react';
import { SHOP_INFO } from '../data/jewelryData';

interface HeaderProps {
  activeTab: 'catalog' | 'brochure';
  setActiveTab: (tab: 'catalog' | 'brochure') => void;
  onOpenScanner: () => void;
  onOpenWishlist: () => void;
  wishlistCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenScanner,
  onOpenWishlist,
  wishlistCount,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#080808]/95 text-[#e0d8cc] border-b border-[#c5a059]/20 shadow-2xl backdrop-blur-md">
      {/* Top Banner Bar */}
      <div className="bg-[#121212] py-1.5 px-4 text-center text-xs tracking-widest font-sans uppercase text-[#c5a059]/90 flex items-center justify-between border-b border-[#c5a059]/15">
        <div className="hidden sm:flex items-center gap-2 text-[#c5a059]">
          <Sparkles className="w-3.5 h-3.5 text-[#c5a059] animate-pulse" />
          <span>Grand Collection • Up to 65% OFF Artificial Jewels</span>
        </div>
        <div className="mx-auto sm:mx-0 flex items-center gap-4">
          <a
            href={`https://wa.me/${SHOP_INFO.whatsapp}?text=Hello%20Tharuni%27s%20Jewellery%2C%20I%20would%20like%20to%20inquire%20about%20your%20jewel%20collection.`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition flex items-center gap-1 font-mono text-[11px]"
          >
            <Phone className="w-3 h-3 text-emerald-400" />
            <span>WhatsApp: {SHOP_INFO.phone}</span>
          </a>
        </div>
        <div className="hidden md:block text-[#c5a059]/70 text-[11px] tracking-wider">
          <span>📍 {SHOP_INFO.hours}</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('catalog')}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-[#c5a059]/40 bg-[#121212] p-0.5 shadow-lg shadow-black/80">
            <div className="w-full h-full bg-[#080808] rounded-full flex items-center justify-center border border-[#c5a059]/20">
              <Sparkles className="w-5 h-5 text-[#c5a059]" />
            </div>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-serif font-light tracking-widest text-[#c5a059] uppercase">
              THARUNI'S
            </h1>
            <p className="text-[10px] sm:text-[11px] text-[#e0d8cc]/60 font-sans tracking-[0.3em] uppercase font-light">
              Grand Artificial Collection
            </p>
          </div>
        </div>

        {/* Quick Search Bar (Desktop) */}
        <div className="hidden lg:flex items-center flex-1 max-w-xs mx-4 relative">
          <input
            type="text"
            placeholder="Search jewels (e.g. 1290net, AD Stone)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#121212] border border-[#c5a059]/20 rounded-full pl-9 pr-4 py-1.5 text-xs text-[#e0d8cc] placeholder-[#e0d8cc]/40 focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]/40 font-sans tracking-wide"
          />
          <Search className="w-3.5 h-3.5 text-[#c5a059]/60 absolute left-3 top-2.5" />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Navigation Mode Switcher */}
          <div className="flex bg-[#121212] p-1 rounded-full border border-[#c5a059]/20">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-sans tracking-wider uppercase transition flex items-center gap-1.5 ${
                activeTab === 'catalog'
                  ? 'bg-[#c5a059] text-[#080808] font-semibold shadow-md'
                  : 'text-[#e0d8cc]/80 hover:text-[#c5a059]'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Catalog</span>
            </button>
            <button
              onClick={() => setActiveTab('brochure')}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-sans tracking-wider uppercase transition flex items-center gap-1.5 ${
                activeTab === 'brochure'
                  ? 'bg-[#c5a059] text-[#080808] font-semibold shadow-md'
                  : 'text-[#e0d8cc]/80 hover:text-[#c5a059]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Printable</span> Brochure
            </button>
          </div>

          {/* Scanner Button */}
          <button
            onClick={onOpenScanner}
            title="Scan QR Code / Open Website QR"
            className="bg-[#121212] border border-[#c5a059]/30 hover:border-[#c5a059] text-[#c5a059] hover:text-[#e0d8cc] px-3 py-1.5 rounded-full text-[11px] font-sans tracking-wider uppercase transition flex items-center gap-1.5 shadow-sm"
          >
            <QrCode className="w-3.5 h-3.5 text-[#c5a059] animate-pulse" />
            <span className="hidden sm:inline">Web Scanner</span>
          </button>

          {/* Wishlist / Inquiry Cart */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 rounded-full bg-[#121212] border border-[#c5a059]/30 hover:border-[#c5a059] text-[#c5a059] hover:text-[#e0d8cc] transition"
            title="Saved Jewellery Inquiries"
          >
            <Heart className="w-4 h-4 text-[#c5a059]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#c5a059] text-[#080808] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-sans">
                {wishlistCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
