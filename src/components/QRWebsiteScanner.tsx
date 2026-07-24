import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  X,
  QrCode,
  ExternalLink,
  Copy,
  Check,
  Camera,
  Sparkles,
  Phone,
  Download,
  Search,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SHOP_INFO, JEWELRY_ITEMS } from '../data/jewelryData';
import { JewelryItem } from '../types';

interface QRWebsiteScannerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItemForQR?: JewelryItem | null;
  onSelectJewelByCode?: (code: string) => void;
}

export const QRWebsiteScanner: React.FC<QRWebsiteScannerProps> = ({
  isOpen,
  onClose,
  selectedItemForQR,
  onSelectJewelByCode,
}) => {
  const [activeTab, setActiveTab] = useState<'qr-code' | 'camera-scanner'>('qr-code');
  const [copied, setCopied] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [scanSuccess, setScanSuccess] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Dynamic website URL or deep link to specific jewel item
  const currentWebsiteUrl = typeof window !== 'undefined' ? window.location.href : SHOP_INFO.websiteUrl;
  
  const targetUrl = selectedItemForQR
    ? `${currentWebsiteUrl.split('#')[0]}#jewel-card-${selectedItemForQR.id}`
    : currentWebsiteUrl;

  useEffect(() => {
    if (selectedItemForQR) {
      setActiveTab('qr-code');
    }
  }, [selectedItemForQR]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateScan = (codeToScan: string) => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanSuccess(codeToScan);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });

      if (onSelectJewelByCode) {
        setTimeout(() => {
          onSelectJewelByCode(codeToScan);
          onClose();
        }, 1500);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080808]/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#121212] border border-[#c5a059]/30 rounded-3xl p-6 shadow-2xl text-[#e0d8cc] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#080808] hover:bg-[#1a1a1a] text-[#c5a059] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1 mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080808] border border-[#c5a059]/30 text-[#c5a059] text-[10px] font-sans uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Tharuni's Jewellery Scanner</span>
          </div>
          <h2 className="text-2xl font-serif font-light text-[#c5a059]">
            {selectedItemForQR ? `Jewel Tag: ${selectedItemForQR.code}` : 'Visit Web & Shop QR'}
          </h2>
          <p className="text-xs text-[#e0d8cc]/60 font-light">
            {selectedItemForQR
              ? 'Scan code to view this jewel directly on mobile'
              : 'Scan code with camera to open Tharuni\'s Jewellery online catalog'}
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex bg-[#080808] p-1 rounded-xl border border-[#c5a059]/20 mb-6">
          <button
            onClick={() => setActiveTab('qr-code')}
            className={`flex-1 py-2 text-xs font-sans tracking-wider uppercase font-semibold rounded-lg transition flex items-center justify-center gap-2 ${
              activeTab === 'qr-code'
                ? 'bg-[#c5a059] text-[#080808] shadow-md'
                : 'text-[#e0d8cc]/70 hover:text-[#e0d8cc]'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Website QR Code</span>
          </button>
          <button
            onClick={() => setActiveTab('camera-scanner')}
            className={`flex-1 py-2 text-xs font-sans tracking-wider uppercase font-semibold rounded-lg transition flex items-center justify-center gap-2 ${
              activeTab === 'camera-scanner'
                ? 'bg-[#c5a059] text-[#080808] shadow-md'
                : 'text-[#e0d8cc]/70 hover:text-[#e0d8cc]'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Camera Tag Scanner</span>
          </button>
        </div>

        {/* TAB 1: QR CODE DISPLAY FOR WEBSITE */}
        {activeTab === 'qr-code' && (
          <div className="space-y-5 text-center">
            {/* QR Code Canvas Box */}
            <div className="relative inline-block p-5 bg-white rounded-2xl shadow-2xl border-2 border-[#c5a059] mx-auto">
              <QRCodeSVG
                value={targetUrl}
                size={190}
                level="H"
                includeMargin={false}
                imageSettings={{
                  src: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=100&q=80',
                  x: undefined,
                  y: undefined,
                  height: 32,
                  width: 32,
                  excavate: true,
                }}
              />
              <div className="mt-2 pt-2 border-t border-stone-200 text-[10px] text-stone-900 font-sans font-bold uppercase tracking-[0.2em]">
                THARUNI'S JEWELLERY • SCAN TO VISIT
              </div>
            </div>

            {/* Quick Link Info */}
            <div className="bg-[#080808] p-3 rounded-xl border border-[#c5a059]/20 text-xs flex items-center justify-between gap-2">
              <span className="text-[#e0d8cc]/70 truncate text-[11px] font-mono">
                {targetUrl}
              </span>
              <button
                onClick={handleCopyLink}
                className="bg-[#121212] hover:bg-[#1a1a1a] text-[#c5a059] p-1.5 rounded-lg border border-[#c5a059]/30 transition flex-shrink-0"
                title="Copy Link"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-[#c5a059] hover:bg-[#d8b56f] text-[#080808] font-sans font-semibold text-xs tracking-wider uppercase shadow-lg flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open Website Now</span>
              </a>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Check out Tharuni's Jewelry Grand Artificial Collection & Costs on our website: ${targetUrl}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl bg-[#080808] hover:bg-[#1a1a1a] text-emerald-400 border border-emerald-500/40 text-xs font-sans font-semibold tracking-wider uppercase transition flex items-center justify-center gap-1.5"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Share</span>
              </a>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE CAMERA / ITEM TAG SCANNER */}
        {activeTab === 'camera-scanner' && (
          <div className="space-y-4">
            {/* Viewfinder Frame */}
            <div className="relative aspect-video w-full bg-[#080808] rounded-2xl border border-[#c5a059]/30 overflow-hidden flex flex-col items-center justify-center p-4">
              {/* Animated Laser Scanning Line */}
              <div className="absolute inset-x-0 h-0.5 bg-[#c5a059] shadow-[0_0_12px_#c5a059] animate-bounce my-auto top-1/2" />

              {/* Viewfinder Target Corners */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#c5a059]" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#c5a059]" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#c5a059]" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#c5a059]" />

              <Camera className="w-8 h-8 text-[#c5a059]/60 animate-pulse mb-2" />
              <p className="text-xs text-[#e0d8cc]/80 font-light text-center">
                Point camera at any Tharuni's Jewellery Tag or QR Code
              </p>

              {scanSuccess && (
                <div className="absolute inset-0 bg-[#080808]/95 flex flex-col items-center justify-center p-4 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mb-2 animate-bounce" />
                  <span className="text-xs text-emerald-400 font-sans tracking-wider font-bold uppercase">
                    Tag Scanned Successfully!
                  </span>
                  <span className="text-sm font-serif font-light text-[#c5a059] mt-1">
                    Opening Jewel: {scanSuccess}
                  </span>
                </div>
              )}
            </div>

            {/* Quick Test Sample Tags */}
            <div>
              <span className="text-[10px] text-[#c5a059] font-sans font-semibold block mb-2 uppercase tracking-[0.2em]">
                Or Tap Sample Item Tag to Test Scanner:
              </span>
              <div className="flex flex-wrap gap-2">
                {JEWELRY_ITEMS.slice(0, 4).map((item) => (
                  <button
                    key={item.id}
                    disabled={isScanning}
                    onClick={() => handleSimulateScan(item.code)}
                    className="bg-[#080808] hover:bg-[#1a1a1a] border border-[#c5a059]/20 hover:border-[#c5a059] text-[#e0d8cc] px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition flex items-center gap-1"
                  >
                    <QrCode className="w-3 h-3 text-[#c5a059]" />
                    <span>{item.code}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Manual Code Input */}
            <div className="pt-2 border-t border-[#c5a059]/15 flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter item code (e.g., 1290net)..."
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                className="flex-1 bg-[#080808] border border-[#c5a059]/20 rounded-xl px-3 py-2 text-xs text-[#e0d8cc] placeholder-[#e0d8cc]/40 focus:outline-none focus:border-[#c5a059] font-sans tracking-wide"
              />
              <button
                onClick={() => handleSimulateScan(manualCode || 'No.1290net')}
                className="bg-[#c5a059] hover:bg-[#d8b56f] text-[#080808] font-sans font-bold uppercase tracking-wider px-3.5 py-2 rounded-xl text-xs transition"
              >
                Scan Code
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
