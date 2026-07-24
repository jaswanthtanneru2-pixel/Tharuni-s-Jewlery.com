import React from 'react';
import { Sparkles, QrCode, Shield, Award, Gem, ChevronRight, Phone } from 'lucide-react';
import { SHOP_INFO, JEWELRY_ITEMS } from '../data/jewelryData';
import { JewelryItem } from '../types';

interface HeroBannerProps {
  onSelectFeatured: (item: JewelryItem) => void;
  onOpenScanner: () => void;
  onExploreCatalog: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSelectFeatured,
  onOpenScanner,
  onExploreCatalog,
}) => {
  const featuredItem = JEWELRY_ITEMS.find((item) => item.code === 'No.1290net') || JEWELRY_ITEMS[0];

  return (
    <div className="relative overflow-hidden bg-[#080808] border-b border-[#c5a059]/20 py-12 px-4 sm:px-6 lg:px-8">
      {/* Subtle Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Brand Statement & CTA */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121212] border border-[#c5a059]/30 text-[#c5a059] text-[11px] font-sans font-medium tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>High-End Artificial Jewels & Boutique</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#e0d8cc] tracking-tight leading-tight">
            Elevate Your Grace with{' '}
            <span className="text-[#c5a059] font-normal italic">
              Grand Luxury Jewels
            </span>
          </h1>

          <p className="text-[#e0d8cc]/70 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
            Welcome to <strong className="text-[#c5a059] font-normal">Tharuni's Jewelry</strong>.
            Discover timeless Reverse AD stones, uncut Kundan Polki, micro-gold plated bridal sets,
            and antique temple neckpieces. Every creation is crafted to highlight grand opulence at accessible costs.
          </p>

          {/* Key Feature Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs text-[#e0d8cc]/80 font-sans tracking-wide">
            <div className="flex items-center gap-2 bg-[#121212] border border-[#c5a059]/15 p-3 rounded-xl">
              <Award className="w-4 h-4 text-[#c5a059] flex-shrink-0" />
              <span>Premium Reverse AD Stones</span>
            </div>
            <div className="flex items-center gap-2 bg-[#121212] border border-[#c5a059]/15 p-3 rounded-xl">
              <Gem className="w-4 h-4 text-[#c5a059] flex-shrink-0" />
              <span>Micro Gold & Rhodium Finish</span>
            </div>
            <div className="flex items-center gap-2 bg-[#121212] border border-[#c5a059]/15 p-3 rounded-xl col-span-2 sm:col-span-1">
              <Shield className="w-4 h-4 text-[#c5a059] flex-shrink-0" />
              <span>100% Anti-Tarnish Finish</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
            <button
              onClick={onExploreCatalog}
              className="px-6 py-3 rounded-full bg-[#c5a059] hover:bg-[#d8b56f] text-[#080808] font-sans font-semibold text-xs tracking-wider uppercase shadow-xl transition-all flex items-center gap-2"
            >
              <span>Explore All Jewels & Costs</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenScanner}
              className="px-5 py-3 rounded-full bg-[#121212] hover:bg-[#1a1a1a] text-[#c5a059] border border-[#c5a059]/30 hover:border-[#c5a059] text-xs font-sans tracking-wider uppercase font-medium transition flex items-center gap-2"
            >
              <QrCode className="w-4 h-4 text-[#c5a059]" />
              <span>Open Website QR Scanner</span>
            </button>

            <a
              href={`https://wa.me/${SHOP_INFO.whatsapp}?text=Hi%20Tharuni%27s%20Jewelry%2C%20I%20saw%20your%20jewel%20brochure%20and%20want%20to%20know%20more.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-full bg-[#121212] hover:bg-[#1a1a1a] border border-emerald-500/40 text-emerald-400 text-xs font-sans tracking-wider uppercase font-medium transition flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Direct WhatsApp Inquiry</span>
            </a>
          </div>
        </div>

        {/* Right Column: Highlighted Grand Jewel Spotlight */}
        <div className="lg:col-span-5 relative">
          <div className="relative group rounded-2xl bg-[#121212] border border-[#c5a059]/30 p-4 shadow-2xl transition-all hover:border-[#c5a059]">
            {/* Top Badge */}
            <div className="absolute top-6 left-6 z-10 bg-[#c5a059] text-[#080808] px-3 py-1 rounded-full text-[10px] font-sans font-extrabold uppercase tracking-widest shadow-lg flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Flagship Highlight • {featuredItem.code}</span>
            </div>

            {/* Image Box */}
            <div className="relative h-72 sm:h-80 rounded-xl overflow-hidden bg-[#080808] border border-[#c5a059]/20">
              <img
                src={featuredItem.imageUrl}
                alt={featuredItem.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80" />

              {/* Price Tag Overlay Under Image */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-[#121212]/95 border border-[#c5a059]/40 backdrop-blur-md p-3 rounded-xl">
                <div>
                  <div className="text-[9px] text-[#c5a059] uppercase tracking-[0.2em] font-sans font-semibold">
                    Grand Offer Cost
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-serif font-semibold text-[#c5a059]">
                      ₹{featuredItem.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-[#e0d8cc]/40 line-through font-mono">
                      ₹{featuredItem.mrp.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-mono font-bold">
                      {featuredItem.discountPercent}% OFF
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectFeatured(featuredItem)}
                  className="bg-[#c5a059] hover:bg-[#d8b56f] text-[#080808] px-3 py-2 rounded-lg text-xs font-sans font-bold uppercase tracking-wider transition flex items-center gap-1"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Title & Short Details */}
            <div className="mt-4 px-1">
              <h3 className="text-base font-serif font-light text-[#e0d8cc] line-clamp-1">
                {featuredItem.name}
              </h3>
              <p className="text-xs text-[#e0d8cc]/60 line-clamp-2 mt-1 font-light">
                {featuredItem.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
