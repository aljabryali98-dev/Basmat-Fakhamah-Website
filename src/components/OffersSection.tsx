import React from 'react';
import { Sparkles, ArrowLeft, Tag } from 'lucide-react';
import { Product, StoreSettings } from '../types';
import { formatCurrency } from '../utils/formatters';

interface OffersSectionProps {
  products: Product[];
  onViewDetails: (product: Product) => void;
  onQuickOrder: (product: Product) => void;
  settings: StoreSettings;
}

export const OffersSection: React.FC<OffersSectionProps> = ({
  products,
  onViewDetails,
  onQuickOrder,
  settings,
}) => {
  const offerProducts = products.filter((p) => p.isDiscounted && p.originalPrice);

  if (offerProducts.length === 0) return null;

  return (
    <section className="py-20 bg-[#16120E] text-[#FAF6EE] relative overflow-hidden">
      {/* Subtle Luxury Pattern Background */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C8A265_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#271E16] border border-[#C8A265]/40 text-[#E5C384] text-xs font-bold mb-4">
            <Tag className="w-3.5 h-3.5 text-[#C8A265]" />
            <span>تخفيضات استثنائية لفترة محدودة</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#FAF6EE] mb-4">
            عروض بصمة عالم الفخامة
          </h2>
          <p className="text-sm sm:text-base text-[#D4C8B5] font-light leading-relaxed">
            مختارات استثنائية من أرقى تصاميم الأثاث والمجالس بأسعار ترويجية حصرية، مع الحفاظ على ذات الجودة العالية والضمان المعتمد.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offerProducts.slice(0, 6).map((product) => {
            const savings = product.originalPrice ? product.originalPrice - product.price : 0;

            return (
              <div
                key={product.id}
                className="group relative bg-[#1F1914] rounded-2xl border border-[#C8A265]/30 overflow-hidden shadow-2xl hover:border-[#C8A265] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Section */}
                <div className="relative aspect-16/10 overflow-hidden bg-black/40">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F1914] via-transparent to-transparent" />

                  {/* Discount Badge */}
                  <div className="absolute top-3 right-3 bg-[#9E2B2B] text-white px-3 py-1.5 rounded-md text-xs font-bold shadow-lg flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>خصم {product.discountPercentage}%</span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute bottom-3 right-4 bg-black/60 backdrop-blur-xs text-[#E5C384] text-xs font-medium px-2.5 py-1 rounded">
                    {product.categoryName}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 text-right flex flex-col flex-1 justify-between">
                  <div>
                    <h3
                      onClick={() => onViewDetails(product)}
                      className="text-lg sm:text-xl font-bold text-[#FAF6EE] font-heading hover:text-[#E5C384] cursor-pointer transition-colors line-clamp-1 mb-2"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#B5A895] line-clamp-2 mb-4 font-light leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#342A22]">
                    {/* Price Comparison */}
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-xl sm:text-2xl font-black text-[#E5C384] font-heading block">
                          {formatCurrency(product.price, settings.currency)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-[#8A7C6B] line-through">
                            {formatCurrency(product.originalPrice, settings.currency)}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-medium text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded border border-emerald-800/40">
                        وفر {formatCurrency(savings, settings.currency)}
                      </span>
                    </div>

                    {/* CTA Buttons */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => onViewDetails(product)}
                        className="w-full py-2.5 px-3 rounded-lg bg-[#2E241C] hover:bg-[#3E3126] text-[#FAF6EE] text-xs font-bold transition-colors cursor-pointer border border-[#C8A265]/30"
                      >
                        تفاصيل العرض
                      </button>
                      <button
                        onClick={() => onQuickOrder(product)}
                        className="w-full py-2.5 px-3 rounded-lg bg-[#C8A265] hover:bg-[#d8b375] text-[#14110E] text-xs font-bold transition-all shadow-sm cursor-pointer"
                      >
                        اطلب بالعرض
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
