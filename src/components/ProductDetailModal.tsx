import React, { useState, useEffect } from 'react';
import { X, Heart, MessageCircle, Phone, ShoppingBag, ShieldCheck, Truck, Check, Share2, Sparkles, Layers, Star } from 'lucide-react';
import { Product, StoreSettings } from '../types';
import { formatCurrency, generateWhatsAppProductLink } from '../utils/formatters';
import { storeService } from '../services/storeService';
import { ProductReviewsSection } from './ProductReviewsSection';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onQuickOrder: (product: Product, selectedColor?: string) => void;
  onSelectProduct: (product: Product) => void;
  onOpenStudioWithProduct?: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  settings: StoreSettings;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onQuickOrder,
  onSelectProduct,
  onOpenStudioWithProduct,
  isWishlisted,
  onToggleWishlist,
  settings,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [copiedLink, setCopiedLink] = useState(false);
  const [ratingSummary, setRatingSummary] = useState(() =>
    storeService.getProductRatingSummary(product.id)
  );

  useEffect(() => {
    const updateSummary = () => {
      setRatingSummary(storeService.getProductRatingSummary(product.id));
    };
    updateSummary();
    return storeService.subscribe(updateSummary);
  }, [product.id]);

  const allProducts = storeService.getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 3);

  const linkedDesigns = storeService.getDesignsByProductId(product.id);

  const images = product.images && product.images.length > 0 ? product.images : [
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200&auto=format&fit=crop'
  ];

  const currentImage = images[selectedImageIndex] || images[0];
  const whatsappLink = generateWhatsAppProductLink(product, settings, selectedColor);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleAddToCart = () => {
    storeService.addToCart({
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: 1,
      selectedColor,
      image: currentImage,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden my-6 border border-[#E8DFD0] flex flex-col max-h-[92vh]">
        {/* Top Floating Close Button */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/90 hover:bg-white text-[#241F1A] shadow-md transition-all cursor-pointer"
            title="نسخ الرابط"
          >
            {copiedLink ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/90 hover:bg-white text-[#241F1A] shadow-md transition-all cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Gallery Column (7 cols on lg) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Main Stage Image */}
              <div className="relative aspect-4/3 sm:aspect-16/11 w-full bg-[#1A1612] rounded-xl overflow-hidden border border-[#ECE4D8] group">
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Badge Overlay */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {product.isNewArrival && (
                    <span className="px-3 py-1 text-xs font-bold bg-[#14110E] text-[#E5C384] rounded-sm border border-[#C8A265]/40 shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#C8A265]" />
                      <span>وصل حديثاً</span>
                    </span>
                  )}
                  {product.isDiscounted && product.discountPercentage && (
                    <span className="px-3 py-1 text-xs font-bold bg-[#9E2B2B] text-white rounded-sm shadow-sm">
                      وفر {product.discountPercentage}%
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails Row */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-20 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        selectedImageIndex === idx
                          ? 'border-[#C8A265] ring-2 ring-[#C8A265]/30'
                          : 'border-[#E8DFD0] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`صورة ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Staff Marketing Note (If designs exist) */}
              {linkedDesigns.length > 0 && onOpenStudioWithProduct && (
                <div className="p-3 bg-[#FAF6EE] rounded-xl border border-[#E8DFD0] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-[#6E5D48]">
                    <Layers className="w-4 h-4 text-[#C8A265]" />
                    <span>يوجد {linkedDesigns.length} تصميم تسويقي جاهز لهذا المنتج في استوديو المحتوى الداخلي</span>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenStudioWithProduct(product);
                    }}
                    className="text-xs font-bold text-[#9E7E45] hover:underline"
                  >
                    فتح في الاستوديو
                  </button>
                </div>
              )}
            </div>

            {/* Information Column (5 cols on lg) */}
            <div className="lg:col-span-5 flex flex-col justify-between text-right">
              <div>
                {/* Category & SKU */}
                <div className="flex items-center justify-between text-xs text-[#8A7B69] mb-2">
                  <span className="font-bold text-[#9E7E45]">{product.categoryName}</span>
                  <span className="font-mono">كود الموديل: {product.code}</span>
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1612] font-heading mb-2 leading-tight">
                  {product.name}
                </h2>

                {/* Star Rating Quick Jump */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.round(ratingSummary.average)
                            ? 'fill-[#C8A265] text-[#C8A265]'
                            : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#1A1612] font-mono">
                    {ratingSummary.average.toFixed(1)}
                  </span>
                  <a
                    href="#product-reviews"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('product-reviews')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs text-[#8A7B69] hover:text-[#9E7E45] underline decoration-dotted font-medium cursor-pointer"
                  >
                    ({ratingSummary.count} تقييمات العملاء)
                  </a>
                </div>

                {/* Pricing Block */}
                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EAE2D5] mb-6">
                  <span className="text-xs text-[#7D7060] block mb-1">السعر المعتمد (شامل الضريبة):</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl sm:text-3xl font-black text-[#1A1612] font-heading">
                      {formatCurrency(product.price, settings.currency)}
                    </span>
                    {product.isDiscounted && product.originalPrice && (
                      <span className="text-sm text-[#998D7E] line-through font-light">
                        {formatCurrency(product.originalPrice, settings.currency)}
                      </span>
                    )}
                  </div>
                  {product.isDiscounted && product.originalPrice && (
                    <p className="text-xs text-[#9E2B2B] font-bold mt-1.5">
                      قيمة التوفير الحالية: {formatCurrency(product.originalPrice - product.price, settings.currency)}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-[#8A7B69] uppercase tracking-wider mb-2">
                    تفاصيل القطعة والوصف الفاخر
                  </h4>
                  <p className="text-sm text-[#383129] leading-relaxed font-light">
                    {product.fullDescription || product.shortDescription}
                  </p>
                </div>

                {/* Specifications & Materials */}
                <div className="space-y-3 mb-6 p-4 rounded-xl bg-white border border-[#EFE9DF] text-xs">
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-[#8A7B69]">الأبعاد والمقاسات:</span>
                    <span className="font-semibold text-[#1A1612] text-left" dir="ltr">{product.dimensions}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-[#8A7B69]">الخامات والمكونات:</span>
                    <span className="font-semibold text-[#1A1612] max-w-[65%] text-left">{product.materials}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#8A7B69]">حالة التوفر بالمستودع:</span>
                    <span className="font-semibold text-emerald-700">جاهز للتوصيل والتركيب</span>
                  </div>
                </div>

                {/* Color Selector */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-xs font-bold text-[#8A7B69] mb-2">
                      اختر اللون المرغوب: <span className="text-[#1A1612] font-semibold">{selectedColor}</span>
                    </label>
                    <div className="flex items-center gap-3">
                      {product.colors.map((c, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedColor(c.name)}
                          className={`group relative p-1 rounded-full border-2 transition-all cursor-pointer ${
                            selectedColor === c.name ? 'border-[#C8A265] ring-2 ring-[#C8A265]/20' : 'border-transparent'
                          }`}
                        >
                          <span
                            className="block w-6 h-6 rounded-full border border-black/15 shadow-inner"
                            style={{ backgroundColor: c.hex }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4 border-t border-[#EAE2D5]">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onQuickOrder(product, selectedColor)}
                    className="w-full py-3.5 px-4 rounded-lg bg-[#1A1612] hover:bg-[#322A22] text-[#E5C384] font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>طلب فوري مباشر</span>
                  </button>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 text-center cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>تواصل عبر واتساب</span>
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-2.5 px-4 rounded-lg bg-[#FAF6EE] hover:bg-[#F0E8D8] text-[#1A1612] border border-[#D9CEBC] font-medium text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#8A7B69]" />
                    <span>إضافة لسلة الاستفسار</span>
                  </button>

                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className={`p-2.5 rounded-lg border text-xs font-medium transition-colors flex items-center justify-center cursor-pointer ${
                      isWishlisted
                        ? 'bg-[#9E2B2B]/10 border-[#9E2B2B] text-[#9E2B2B]'
                        : 'bg-white border-[#D9CEBC] text-[#4A4136] hover:bg-[#FAF6EE]'
                    }`}
                    title="المفضلة"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Trust mini banner */}
                <div className="flex items-center justify-around py-3 mt-2 bg-[#FAF8F5] rounded-lg text-[11px] text-[#7A6E5E]">
                  <div className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#C8A265]" />
                    <span>شحن وتركيب مجاني بالرياض</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C8A265]" />
                    <span>ضمان الجودة 5 سنوات</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Reviews & Star Ratings Section */}
          <div id="product-reviews">
            <ProductReviewsSection product={product} />
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#ECE4D8] text-right">
              <h3 className="text-xl font-bold text-[#1A1612] font-heading mb-4">
                منتجات مشابهة قد تناسب ذوقك
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onSelectProduct(rel);
                      setSelectedImageIndex(0);
                    }}
                    className="p-3 bg-[#FAF8F5] rounded-xl border border-[#ECE4D8] hover:border-[#C8A265] transition-all cursor-pointer flex items-center gap-3"
                  >
                    <img
                      src={rel.images[0]}
                      alt={rel.name}
                      className="w-16 h-16 rounded-lg object-cover shrink-0"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-[#1A1612] line-clamp-1">{rel.name}</h4>
                      <span className="text-xs font-extrabold text-[#9E7E45] font-heading block mt-1">
                        {formatCurrency(rel.price, settings.currency)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
