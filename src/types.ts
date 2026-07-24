export type CategoryId =
  | 'all'
  | 'bridal'
  | 'ad-silver'
  | 'kundan'
  | 'temple'
  | 'earrings'
  | 'bangles-vaddanam';

export interface JewelryCategory {
  id: CategoryId;
  name: string;
  description: string;
  iconName: string;
}

export interface JewelryItem {
  id: string;
  code: string;
  name: string;
  category: CategoryId;
  price: number;
  mrp: number;
  discountPercent: number;
  imageUrl: string;
  additionalImages?: string[];
  description: string;
  specifications: {
    material: string;
    stoneType: string;
    finish: string;
    weight: string;
    includes: string[];
    careInstructions: string;
  };
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
}

export interface FilterState {
  searchQuery: string;
  selectedCategory: CategoryId;
  maxPrice: number;
  minPrice: number;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'discount';
  onlyInStock: boolean;
}

export interface WishlistItem {
  item: JewelryItem;
  addedAt: string;
  notes?: string;
}
