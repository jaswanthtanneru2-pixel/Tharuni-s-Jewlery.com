import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Sparkles, MapPin, Phone, Mail, Clock, QrCode, Heart, ExternalLink } from 'lucide-react';
import { SHOP_INFO } from '../data/jewelryData';

interface FooterProps {
  onOpenScanner: () => void;
  setActiveTab: (tab: 'catalog' | 'brochure') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenScanner, setActiveTab }) => {
  const currentWebsiteUrl = typeof window !== 'undefined' ? window.location.href : SHOP_INFO.websiteUrl;

  return (
    <footer className="bg-[#080808] text-[#e0d8cc] border-t border-[#c5a059]/20 pt-12 pb-8 px-4 sm:px-6 lg:px-8 mt-16 relative overflow-hidden">
      {/* Decorative Gold Accent Line */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-[#c5a059]/40" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#c5a059]/15">
        {/* Brand Summary Column */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#121212] border border-[#c5a059]/40 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#c5a059]" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-light text-[#c5a059] tracking-widest uppercase">
                THARUNI'S JEWELLERY
              </h3>
              <p className="text-[10px] text-[#e0d8cc]/50 font-sans tracking-[0.2em] uppercase">
                Grand Artificial & Fashion Jewels
              </p>
            </div>
          </div>

          <p className="text-xs text-[#e0d8cc]/60 font-light leading-relaxed">
            Your destination for grand artificial bridal sets, Reverse AD stone silver jewelry, uncut Kundan Polki, micro gold-plated bangles, and temple ornaments. Handcrafted brilliance for every celebration.
          </p>

          <div className="flex items-center gap-2 pt-1 font-sans">
            <span className="bg-[#121212] border border-[#c5a059]/20 text-[#c5a059] text-[10px] px-2.5 py-1 rounded-full">
              ✨ 100% Anti-Tarnish
            </span>
            <span className="bg-[#121212] border border-[#c5a059]/20 text-[#c5a059] text-[10px] px-2.5 py-1 rounded-full">
              💎 AAA+ AD Stones
            </span>
          </div>
        </div>

        {/* Contact Info Column */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-xs font-sans uppercase tracking-[0.2em] text-[#c5a059] border-b border-[#c5a059]/15 pb-2">
            Store & Contact Details
          </h4>

          <div className="space-y-2.5 text-xs text-[#e0d8cc]/70 font-light">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#c5a059] flex-shrink-0 mt-0.5" />
              <span>{SHOP_INFO.address}</span>
            </div>

            <div className="flex items-center gap-2 font-mono">
              <Phone className="w-4 h-4 text-[#c5a059] flex-shrink-0" />
              <a
                href={`https://wa.me/${SHOP_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#c5a059] transition"
              >
                WhatsApp: {SHOP_INFO.phone}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#c5a059] flex-shrink-0" />
              <span>{SHOP_INFO.email}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#c5a059] flex-shrink-0" />
              <span>{SHOP_INFO.hours}</span>
            </div>
          </div>
        </div>

        {/* QR Code & Scan Website Widget */}
        <div className="md:col-span-4 bg-[#121212] p-4 rounded-2xl border border-[#c5a059]/20 flex items-center gap-4">
          <div className="bg-white p-2 rounded-xl shadow-md border border-[#c5a059] flex-shrink-0">
            <QRCodeSVG value={currentWebsiteUrl} size={85} level="M" />
          </div>

          <div className="space-y-2">
            <div className="text-[10px] text-[#c5a059] uppercase font-sans tracking-[0.2em] font-semibold flex items-center gap-1">
              <QrCode className="w-3.5 h-3.5" />
              <span>Scan to Open Web</span>
            </div>

            <p className="text-[11px] text-[#e0d8cc]/60 leading-snug font-light">
              Scan this QR code with any mobile camera to launch Tharuni's Jewellery digital showcase on your phone!
            </p>

            <button
              onClick={onOpenScanner}
              className="text-xs text-[#c5a059] hover:text-[#e0d8cc] font-sans tracking-wider uppercase font-medium underline inline-flex items-center gap-1"
            >
              <span>Website Scanner Modal</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#e0d8cc]/40 gap-3 font-sans">
        <div>
          © {new Date().getFullYear()} <strong className="text-[#c5a059] font-normal">Tharuni's Jewellery</strong>. All rights reserved.
        </div>

        <div className="flex items-center gap-4 text-[#c5a059]/80 text-[11px] uppercase tracking-wider">
          <button onClick={() => setActiveTab('catalog')} className="hover:text-[#e0d8cc] transition">
            Catalog
          </button>
          <span>•</span>
          <button onClick={() => setActiveTab('brochure')} className="hover:text-[#e0d8cc] transition">
            Brochure
          </button>
          <span>•</span>
          <button onClick={onOpenScanner} className="hover:text-[#e0d8cc] transition">
            QR Scanner
          </button>
        </div>
      </div>
    </footer>
  );
};
