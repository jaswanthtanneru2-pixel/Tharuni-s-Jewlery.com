import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CatalogControls } from './components/CatalogControls';
import { JewelryGrid } from './components/JewelryGrid';
import { DigitalBrochure } from './components/DigitalBrochure';
import { QRWebsiteScanner } from './components/QRWebsiteScanner';
import { ItemDetailModal } from './components/ItemDetailModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { Footer } from './components/Footer';
import { JEWELRY_ITEMS } from './data/jewelryData';
import { JewelryItem, FilterState, WishlistItem } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'brochure'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedCategory: 'all',
    maxPrice: 5000,
    minPrice: 0,
    sortBy: 'featured',
    onlyInStock: false,
  });

  // Keep search inputs in sync
  useEffect(() => {
    setFilters((prev) => ({ ...prev, searchQuery }));
  }, [searchQuery]);

  // Modals & Drawers
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedDetailItem, setSelectedDetailItem] = useState<JewelryItem | null>(null);
  const [selectedQRItem, setSelectedQRItem] = useState<JewelryItem | null>(null);

  // Wishlist State with local storage persistence
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem('tharunis_jewelry_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tharunis_jewelry_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const wishlistIds = useMemo(() => new Set(wishlist.map((w) => w.item.id)), [wishlist]);

  const handleToggleWishlist = (item: JewelryItem) => {
    setWishlist((prev) => {
      const exists = prev.some((w) => w.item.id === item.id);
      if (exists) {
        return prev.filter((w) => w.item.id !== item.id);
      } else {
        return [...prev, { item, addedAt: new Date().toISOString() }];
      }
    });
  };

  const handleRemoveFromWishlist = (itemId: string) => {
    setWishlist((prev) => prev.filter((w) => w.item.id !== itemId));
  };

  const handleClearWishlist = () => {
    setWishlist([]);
  };

  // Filtered Jewelry Items Logic
  const filteredItems = useMemo(() => {
    return JEWELRY_ITEMS.filter((item) => {
      // Category filter
      if (filters.selectedCategory !== 'all' && item.category !== filters.selectedCategory) {
        return false;
      }

      // Max price filter
      if (item.price > filters.maxPrice) {
        return false;
      }

      // Search query filter (search by code, name, description, stoneType)
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase();
        const matchesCode = item.code.toLowerCase().includes(query);
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesMaterial = item.specifications.material.toLowerCase().includes(query);
        const matchesStone = item.specifications.stoneType.toLowerCase().includes(query);

        if (!matchesCode && !matchesName && !matchesDesc && !matchesMaterial && !matchesStone) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-low') return a.price - b.price;
      if (filters.sortBy === 'price-high') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'discount') return b.discountPercent - a.discountPercent;
      return 0; // 'featured'
    });
  }, [filters]);

  const handleOpenItemQR = (item: JewelryItem) => {
    setSelectedQRItem(item);
    setIsScannerOpen(true);
  };

  const handleSelectJewelByCode = (code: string) => {
    const found = JEWELRY_ITEMS.find(
      (item) => item.code.toLowerCase().trim() === code.toLowerCase().trim()
    );
    if (found) {
      setSelectedDetailItem(found);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#e0d8cc] font-sans selection:bg-[#c5a059] selection:text-[#080808] flex flex-col">
      {/* Main Sticky Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenScanner={() => {
          setSelectedQRItem(null);
          setIsScannerOpen(true);
        }}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        wishlistCount={wishlist.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {activeTab === 'catalog' ? (
          <div>
            {/* Grand Hero Section */}
            <HeroBanner
              onSelectFeatured={(item) => setSelectedDetailItem(item)}
              onOpenScanner={() => {
                setSelectedQRItem(null);
                setIsScannerOpen(true);
              }}
              onExploreCatalog={() => {
                const element = document.getElementById('catalog-controls-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Main Catalog View Container */}
            <div id="catalog-controls-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
              {/* Filter & Search Bar */}
              <CatalogControls
                filters={filters}
                setFilters={setFilters}
                totalResults={filteredItems.length}
              />

              {/* Jewelry Cards Grid with COST UNDER PIC */}
              <JewelryGrid
                items={filteredItems}
                onOpenDetail={(item) => setSelectedDetailItem(item)}
                onToggleWishlist={handleToggleWishlist}
                wishlistIds={wishlistIds}
                onOpenItemQR={handleOpenItemQR}
                onResetFilters={() =>
                  setFilters({
                    searchQuery: '',
                    selectedCategory: 'all',
                    maxPrice: 5000,
                    minPrice: 0,
                    sortBy: 'featured',
                    onlyInStock: false,
                  })
                }
              />
            </div>
          </div>
        ) : (
          /* Digital Printable Brochure View */
          <DigitalBrochure
            onOpenDetail={(item) => setSelectedDetailItem(item)}
            onOpenScanner={() => {
              setSelectedQRItem(null);
              setIsScannerOpen(true);
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenScanner={() => {
          setSelectedQRItem(null);
          setIsScannerOpen(true);
        }}
        setActiveTab={setActiveTab}
      />

      {/* MODALS & DRAWERS */}

      {/* 1. Website & Item Tag QR Code Scanner Modal */}
      <QRWebsiteScanner
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        selectedItemForQR={selectedQRItem}
        onSelectJewelByCode={handleSelectJewelByCode}
      />

      {/* 2. Item Detail Spotlight Modal */}
      <ItemDetailModal
        item={selectedDetailItem}
        onClose={() => setSelectedDetailItem(null)}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedDetailItem ? wishlistIds.has(selectedDetailItem.id) : false}
        onOpenItemQR={handleOpenItemQR}
      />

      {/* 3. Inquiry Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onClearWishlist={handleClearWishlist}
      />
    </div>
  );
}
