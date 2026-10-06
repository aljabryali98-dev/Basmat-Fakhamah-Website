import React from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { Product, StoreSettings } from '../types';
import { ProductCard } from './ProductCard';

interface NewArrivalsSectionProps {
  products: Product[];
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onViewDetails: (product: Product) => void;
  onQuickOrder: (product: Product) => void;
  onViewAllCatalog: () => void;
  settings: StoreSettings;
}

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  onViewDetails,
  onQuickOrder,
  onViewAllCatalog,
  settings,
}) => {
  const newArrivals = products.filter((p) => p.isNewArrival);

  if (newArrivals.length === 0) return null;

  return (
    <section className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#9E7E45] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>أحدث إضافات المعرض</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1A1612] font-heading">
              وصل حديثاً
            </h2>
          </div>

          <button
            onClick={onViewAllCatalog}
            className="self-start sm:self-auto text-xs sm:text-sm font-bold text-[#1A1612] hover:text-[#9E7E45] flex items-center gap-1.5 transition-colors group cursor-pointer"
          >
            <span>استعراض الكتالوج الكامل</span>
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onViewDetails={onViewDetails}
              onQuickOrder={onQuickOrder}
              settings={settings}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
