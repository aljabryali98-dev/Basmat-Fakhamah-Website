import React from 'react';
import { Heart, Eye, MessageCircle, Sparkles, CheckCircle2, Clock, Star } from 'lucide-react';
import { Product, StoreSettings } from '../types';
import { formatCurrency, generateWhatsAppProductLink } from '../utils/formatters';
import { storeService } from '../services/storeService';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onViewDetails: (product: Product) => void;
  onQuickOrder: (product: Product) => void;
  settings: StoreSettings;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onViewDetails,
  onQuickOrder,
  settings,
}) => {
  const ratingSummary = storeService.getProductRatingSummary(product.id);
  const stockLabel = {
    in_stock: { text: 'متوفر للتسليم', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    low_stock: { text: 'كمية محدودة', color: 'text-amber-700 bg-amber-50 border-amber-200' },
    on_order: { text: 'متاح للطلب والتفصيل', color: 'text-blue-700 bg-blue-50 border-blue-200' },
    out_of_stock: { text: 'غير متوفر حالياً', color: 'text-stone-500 bg-stone-100 border-stone-200' },
  }[product.stockStatus];

  const mainImage = product.images[0] || 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop';
  const whatsappLink = generateWhatsAppProductLink(product, settings);

  return (
    <div className="group bg-white rounded-xl border border-[#ECE4D8] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#C8A265]/40 transition-all duration-300 flex flex-col justify-between">
      {/* Top Image Area */}
      <div className="relative aspect-4/3 overflow-hidden bg-[#F5F2EC]">
        <img
          src={mainImage}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          {product.isNewArrival && (
            <span className="px-2.5 py-1 text-[11px] font-bold bg-[#14110E] text-[#E5C384] rounded-sm shadow-xs border border-[#C8A265]/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C8A265]" />
              <span>وصل حديثاً</span>
            </span>
          )}
          {product.isDiscounted && product.discountPercentage && (
            <span className="px-2.5 py-1 text-[11px] font-bold bg-[#9E2B2B] text-white rounded-sm shadow-xs">
              خصم {product.discountPercentage}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center transition-all z-10 ${
            isWishlisted
              ? 'bg-[#9E2B2B] text-white shadow-md'
              : 'bg-white/80 hover:bg-white text-[#241F1A] hover:text-[#9E2B2B] shadow-xs backdrop-blur-xs'
          }`}
          title={isWishlisted ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
          aria-label="المفضلة"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Hover Button */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={() => onViewDetails(product)}
            className="px-4 py-2 bg-white/90 hover:bg-white text-[#1A1612] text-xs font-bold rounded-md shadow-lg flex items-center gap-1.5 transition-transform transform translate-y-2 group-hover:translate-y-0"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>نظرة سريعة</span>
          </button>
        </div>
      </div>

      {/* Body Information */}
      <div className="p-5 flex flex-col flex-grow justify-between text-right">
        <div>
          {/* Category & Code */}
          <div className="flex items-center justify-between text-xs text-[#8A7B69] mb-1.5">
            <span className="font-medium text-[#9E7E45]">{product.categoryName}</span>
            <div className="flex items-center gap-1 text-[11px]">
              <Star className="w-3 h-3 fill-[#C8A265] text-[#C8A265]" />
              <span className="font-bold text-[#1A1612] font-mono">{ratingSummary.average.toFixed(1)}</span>
              <span className="text-stone-400">({ratingSummary.count})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onViewDetails(product)}
            className="text-base sm:text-lg font-bold text-[#1A1612] font-heading line-clamp-1 hover:text-[#9E7E45] cursor-pointer transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-[#6B5F50] line-clamp-2 mt-1.5 font-light leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Stock Status Badge */}
          <div className="mt-3">
            <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full border ${stockLabel.color}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
              <span>{stockLabel.text}</span>
            </span>
          </div>
        </div>

        {/* Price & Action Area */}
        <div className="mt-5 pt-4 border-t border-[#F0EAE1]">
          {/* Price Layout */}
          <div className="flex items-baseline justify-between mb-3.5">
            <div className="text-right">
              <span className="text-lg sm:text-xl font-extrabold text-[#1A1612] font-heading">
                {formatCurrency(product.price, settings.currency)}
              </span>
              {product.isDiscounted && product.originalPrice && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#998D7E] line-through font-light">
                    {formatCurrency(product.originalPrice, settings.currency)}
                  </span>
                  <span className="text-[10px] text-[#9E2B2B] font-bold">
                    وفّر {formatCurrency(product.originalPrice - product.price, settings.currency)}
                  </span>
                </div>
              )}
            </div>

            {/* Colors Preview Dots */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-1">
                {product.colors.slice(0, 3).map((col, idx) => (
                  <span
                    key={idx}
                    className="w-3 h-3 rounded-full border border-black/10 shadow-2xs"
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onViewDetails(product)}
              className="w-full py-2.5 px-3 rounded-md bg-[#FAF6EE] hover:bg-[#F3ECE0] text-[#1A1612] border border-[#E2D8C9] text-xs font-bold transition-colors cursor-pointer"
            >
              التفاصيل
            </button>

            <button
              onClick={() => onQuickOrder(product)}
              className="w-full py-2.5 px-3 rounded-md bg-[#1A1612] hover:bg-[#342D26] text-[#E5C384] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>اطلب الآن</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
