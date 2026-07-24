import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Printer,
  Sparkles,
  Phone,
  MapPin,
  Clock,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Award,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { SHOP_INFO, JEWELRY_ITEMS } from '../data/jewelryData';
import { JewelryItem } from '../types';

interface DigitalBrochureProps {
  onOpenDetail: (item: JewelryItem) => void;
  onOpenScanner: () => void;
}

export const DigitalBrochure: React.FC<DigitalBrochureProps> = ({
  onOpenDetail,
  onOpenScanner,
}) => {
  const [activePage, setActivePage] = useState<number>(1);
  const totalPages = 3;

  const handlePrint = () => {
    window.print();
  };

  const currentWebsiteUrl = typeof window !== 'undefined' ? window.location.href : SHOP_INFO.websiteUrl;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Top Brochure Bar & Actions */}
      <div className="bg-[#121212] border border-[#c5a059]/30 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-2xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080808] border border-[#c5a059]/30 text-[#c5a059] text-[10px] font-sans uppercase tracking-[0.2em] mb-1">
            <BookOpen className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Official Showroom Digital Brochure</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-light text-[#c5a059]">
            Tharuni's Jewelry Deluxe Brochure & Price Guide
          </h2>
          <p className="text-xs text-[#e0d8cc]/60 font-light">
            Flip through our luxury booklet or print/save as PDF to present to family and friends.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Page Navigator */}
          <div className="flex items-center bg-[#080808] p-1 rounded-xl border border-[#c5a059]/30 text-xs text-[#e0d8cc]">
            <button
              disabled={activePage === 1}
              onClick={() => setActivePage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg hover:bg-[#1a1a1a] disabled:opacity-40 transition text-[#c5a059]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 font-sans uppercase tracking-wider font-semibold text-[11px] text-[#c5a059]">
              Page {activePage} of {totalPages}
            </span>
            <button
              disabled={activePage === totalPages}
              onClick={() => setActivePage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg hover:bg-[#1a1a1a] disabled:opacity-40 transition text-[#c5a059]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-[#c5a059] hover:bg-[#d8b56f] text-[#080808] font-sans font-semibold text-xs tracking-wider uppercase transition flex items-center gap-2 shadow-lg"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* PRINTABLE BROCHURE CONTAINER */}
      <div className="printable-brochure bg-[#121212] border border-[#c5a059]/30 rounded-3xl p-6 sm:p-10 shadow-2xl text-[#e0d8cc] relative overflow-hidden">
        {/* Background Watermark Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
          <Sparkles className="w-96 h-96 text-[#c5a059]" />
        </div>

        {/* PAGE 1: COVER & FLAGSHIP BRIDAL HIGHLIGHT (NO. 1290NET) */}
        {activePage === 1 && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header Cover Banner */}
            <div className="text-center space-y-3 pb-6 border-b border-[#c5a059]/20">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#080808] p-1 border border-[#c5a059]/40 shadow-xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-[#c5a059]" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-light tracking-tight text-[#c5a059] uppercase">
                THARUNI'S JEWELRY
              </h1>
              <p className="text-xs sm:text-sm text-[#e0d8cc]/80 font-sans tracking-[0.25em] uppercase font-semibold">
                Grand Artificial & Fashion Jewelry Catalog
              </p>
              <div className="text-xs text-[#e0d8cc]/60 max-w-lg mx-auto font-light">
                📍 {SHOP_INFO.address} • 📞 WhatsApp: {SHOP_INFO.phone}
              </div>
            </div>

            {/* Featured Item Banner: No. 1290net */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#080808] border border-[#c5a059]/30 rounded-2xl p-5 items-center shadow-xl">
              <div className="md:col-span-5 relative h-72 rounded-xl overflow-hidden border border-[#c5a059]/20">
                <img
                  src={JEWELRY_ITEMS[0].imageUrl}
                  alt={JEWELRY_ITEMS[0].name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#c5a059] text-[#080808] px-2.5 py-0.5 rounded text-[10px] font-sans font-black uppercase tracking-wider">
                  Featured Cover Set
                </div>
              </div>

              <div className="md:col-span-7 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="bg-[#121212] border border-[#c5a059]/40 text-[#c5a059] px-2.5 py-0.5 rounded text-xs font-mono font-bold">
                    Code: {JEWELRY_ITEMS[0].code}
                  </span>
                  <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[11px] font-mono font-bold">
                    63% OFF Offer
                  </span>
                </div>

                <h3 className="text-xl font-serif font-light text-[#c5a059]">
                  {JEWELRY_ITEMS[0].name}
                </h3>

                <p className="text-xs text-[#e0d8cc]/70 leading-relaxed font-light">
                  {JEWELRY_ITEMS[0].description}
                </p>

                {/* COST UNDER PIC / IN SHOWCASE */}
                <div className="bg-[#121212] p-3 rounded-xl border border-[#c5a059]/30 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-[#c5a059] font-sans font-semibold uppercase tracking-[0.2em] block">
                      Brochure Offer Cost
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-serif font-semibold text-[#c5a059]">
                        ₹{JEWELRY_ITEMS[0].price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-[#e0d8cc]/40 line-through font-mono">
                        ₹{JEWELRY_ITEMS[0].mrp.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenDetail(JEWELRY_ITEMS[0])}
                    className="bg-[#c5a059] hover:bg-[#d8b56f] text-[#080808] px-3.5 py-1.5 rounded-lg text-xs font-sans font-semibold tracking-wider uppercase transition"
                  >
                    View Specs
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-[#e0d8cc]/80 pt-1 font-sans">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Heavy Bridal Choker</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Layered Long Haram</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Jhumkas & Ear Chains</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Nath, Tikka & Rings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 2: JEWELRY TYPES & COST MENU CATALOG */}
        {activePage === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center space-y-1 pb-4 border-b border-[#c5a059]/20">
              <h2 className="text-2xl font-serif font-light text-[#c5a059]">
                Full Artificial Jewels Price Menu & Types
              </h2>
              <p className="text-xs text-[#e0d8cc]/60 font-light">
                Explore our complete variety of Reverse AD, Kundan, Temple Gold, Earrings & Bangles
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {JEWELRY_ITEMS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onOpenDetail(item)}
                  className="bg-[#080808] border border-[#c5a059]/20 hover:border-[#c5a059] p-3 rounded-xl flex items-center gap-3 cursor-pointer transition"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-lg object-cover border border-[#c5a059]/20 flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono bg-[#121212] text-[#c5a059] px-1.5 py-0.5 rounded border border-[#c5a059]/20 font-bold">
                        {item.code}
                      </span>
                      <span className="text-[10px] bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-mono font-bold">
                        {item.discountPercent}% OFF
                      </span>
                    </div>

                    <h4 className="text-xs font-serif font-normal text-[#e0d8cc] truncate mt-1">
                      {item.name}
                    </h4>

                    {/* COST UNDER/NEXT TO PIC */}
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-sm font-serif font-semibold text-[#c5a059]">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-[#e0d8cc]/40 line-through font-mono">
                        ₹{item.mrp.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <span className="text-[10px] text-[#e0d8cc]/50 line-clamp-1 mt-0.5 font-sans">
                      {item.specifications.finish}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGE 3: BACK COVER, QR SCANNER TO OPEN WEBSITE & STORE LOCATION */}
        {activePage === 3 && (
          <div className="space-y-8 animate-fadeIn text-center">
            <div className="max-w-lg mx-auto space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080808] border border-[#c5a059]/30 text-[#c5a059] text-[10px] font-sans uppercase tracking-[0.2em]">
                <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Visit Us Online & In-Store</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#c5a059]">
                Scan QR Code to Open Website
              </h2>

              <p className="text-xs text-[#e0d8cc]/70 leading-relaxed font-light">
                Point your smartphone camera at the QR code below to visit our online live showroom, view real-time stock availability, and place instant WhatsApp orders!
              </p>

              {/* Large Printable QR Code */}
              <div className="p-6 bg-white rounded-2xl shadow-2xl border-2 border-[#c5a059] inline-block my-2">
                <QRCodeSVG
                  value={currentWebsiteUrl}
                  size={180}
                  level="H"
                  includeMargin={false}
                />
                <div className="mt-2 text-[10px] font-sans font-bold text-stone-900 uppercase tracking-[0.2em]">
                  THARUNI'S JEWELRY • WEBSITE SCANNER
                </div>
              </div>

              <div className="bg-[#080808] border border-[#c5a059]/20 p-4 rounded-2xl space-y-2 text-left text-xs text-[#e0d8cc]/80 font-sans">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#c5a059] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#c5a059] block">Showroom Address:</strong>
                    <span>{SHOP_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-[#c5a059]/15">
                  <Clock className="w-4 h-4 text-[#c5a059] flex-shrink-0" />
                  <div>
                    <strong className="text-[#c5a059]">Opening Hours:</strong> {SHOP_INFO.hours}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-[#c5a059]/15">
                  <Phone className="w-4 h-4 text-[#c5a059] flex-shrink-0" />
                  <div>
                    <strong className="text-[#c5a059]">WhatsApp Inquiry:</strong> {SHOP_INFO.phone}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Brochure Navigation Bar */}
        <div className="mt-8 pt-4 border-t border-[#c5a059]/20 flex items-center justify-between text-xs text-[#e0d8cc]/60 font-sans tracking-wider">
          <span className="uppercase">THARUNI'S JEWELRY BROCHURE</span>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenScanner}
              className="text-[#c5a059] hover:text-[#d8b56f] underline font-semibold uppercase flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Launch Website Scanner</span>
            </button>
          </div>
          <span className="uppercase">PAGE {activePage} OF {totalPages}</span>
        </div>
      </div>
    </div>
  );
};
