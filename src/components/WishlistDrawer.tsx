import React from 'react';
import { X, Trash2, ShoppingBag, ArrowLeft, MessageCircle } from 'lucide-react';
import { Product, StoreSettings } from '../types';
import { formatCurrency, generateWhatsAppProductLink } from '../utils/formatters';
import { storeService } from '../services/storeService';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onViewDetails: (product: Product) => void;
  settings: StoreSettings;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  products,
  wishlistIds,
  onToggleWishlist,
  onViewDetails,
  settings,
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose} />

      <div className="fixed inset-y-0 left-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl border-r border-[#ECE4D8] flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#ECE4D8] flex items-center justify-between text-right">
            <button onClick={onClose} className="p-2 text-[#7D7060] hover:text-[#1A1612]">
              <X className="w-5 h-5" />
            </button>
            <div>
              <h3 className="text-lg font-bold text-[#1A1612] font-heading">
                قائمة المفضلة ({wishlistedProducts.length})
              </h3>
              <p className="text-xs text-[#8A7B69]">القطع التي اخترت حفظها لمعاينتها لاحقاً</p>
            </div>
          </div>

          {/* Items List */}
          <div className="p-6 overflow-y-auto flex-1 divide-y divide-[#F0EAE1]">
            {wishlistedProducts.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-[#C8B8A5] mx-auto stroke-1" />
                <p className="text-sm font-medium text-[#7A6E5E]">قائمة المفضلة فارغة حالياً</p>
                <p className="text-xs text-[#A69986]">تصفح تشكيلاتنا الفاخرة وانقر على رمز القلب لحفظ القطع المفضلة</p>
              </div>
            ) : (
              wishlistedProducts.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 text-right items-center">
                  <button
                    onClick={() => onToggleWishlist(item.id)}
                    className="p-1.5 text-stone-400 hover:text-red-600 transition-colors"
                    title="حذف من المفضلة"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex-1">
                    <h4
                      onClick={() => {
                        onViewDetails(item);
                        onClose();
                      }}
                      className="text-sm font-bold text-[#1A1612] line-clamp-1 hover:text-[#9E7E45] cursor-pointer"
                    >
                      {item.name}
                    </h4>
                    <span className="text-xs text-[#8A7B69] block mt-0.5">{item.categoryName}</span>
                    <span className="text-sm font-extrabold text-[#9E7E45] font-heading block mt-1">
                      {formatCurrency(item.price, settings.currency)}
                    </span>
                  </div>

                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover cursor-pointer"
                    onClick={() => {
                      onViewDetails(item);
                      onClose();
                    }}
                  />
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistedProducts.length > 0 && (
            <div className="p-6 border-t border-[#ECE4D8] bg-[#FAF8F5]">
              <button
                onClick={() => {
                  wishlistedProducts.forEach((p) => {
                    storeService.addToCart({
                      productId: p.id,
                      productName: p.name,
                      price: p.price,
                      quantity: 1,
                      image: p.images[0],
                    });
                  });
                  onClose();
                }}
                className="w-full py-3 bg-[#1A1612] text-[#E5C384] text-xs font-bold rounded-lg hover:bg-[#342D26] transition-colors flex items-center justify-center gap-2"
              >
                <span>إضافة الكل لسلة الاستفسار</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
