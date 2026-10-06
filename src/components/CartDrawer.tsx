import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, Send } from 'lucide-react';
import { StoreSettings, OrderItem } from '../types';
import { formatCurrency, generateWhatsAppCartLink } from '../utils/formatters';
import { storeService } from '../services/storeService';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: OrderItem[];
  settings: StoreSettings;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  settings,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('الرياض');

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const whatsappCartLink = generateWhatsAppCartLink(cartItems, totalAmount, settings, customerName, customerCity);

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
                سلة الاستفسار والطلب ({cartItems.length})
              </h3>
              <p className="text-xs text-[#8A7B69]">القطع المختارة لطلب عرض السعر والتوصيل</p>
            </div>
          </div>

          {/* Cart List */}
          <div className="p-6 overflow-y-auto flex-1 divide-y divide-[#F0EAE1]">
            {cartItems.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-[#C8B8A5] mx-auto stroke-1" />
                <p className="text-sm font-medium text-[#7A6E5E]">السلة فارغة حالياً</p>
                <p className="text-xs text-[#A69986]">أضف قطع الأثاث التي ترغب بطلبها أو الاستفسار عنها</p>
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div key={index} className="py-4 flex gap-4 text-right items-center">
                  <button
                    onClick={() => storeService.removeFromCart(item.productId, item.selectedColor)}
                    className="p-1 text-stone-400 hover:text-red-600"
                    title="حذف"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-[#1A1612] line-clamp-1">{item.productName}</h4>
                    {item.selectedColor && (
                      <span className="text-xs text-[#8A7B69] block">اللون: {item.selectedColor}</span>
                    )}
                    <span className="text-xs font-bold text-[#9E7E45] block mt-1">
                      {formatCurrency(item.price, settings.currency)}
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => storeService.updateCartQuantity(item.productId, item.quantity - 1, item.selectedColor)}
                        className="w-6 h-6 rounded bg-[#FAF6EE] border border-[#D9CEBC] text-xs flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => storeService.updateCartQuantity(item.productId, item.quantity + 1, item.selectedColor)}
                        className="w-6 h-6 rounded bg-[#FAF6EE] border border-[#D9CEBC] text-xs flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </div>
              ))
            )}
          </div>

          {/* Checkout & Quote Request */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-[#ECE4D8] bg-[#FAF8F5] space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#6E6152]">إجمالي القيمة المقدرة:</span>
                <span className="text-xl font-extrabold text-[#1A1612] font-heading">
                  {formatCurrency(totalAmount, settings.currency)}
                </span>
              </div>

              {/* Optional Name & City inputs */}
              <div className="grid grid-cols-2 gap-2 text-right">
                <input
                  type="text"
                  placeholder="اسمك الكريم"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="px-3 py-2 text-xs rounded-md border border-[#D9CEBC] bg-white"
                />
                <input
                  type="text"
                  placeholder="المدينة (الرياض..)"
                  value={customerCity}
                  onChange={(e) => setCustomerCity(e.target.value)}
                  className="px-3 py-2 text-xs rounded-md border border-[#D9CEBC] bg-white"
                />
              </div>

              {/* Direct WhatsApp Quote Button */}
              <a
                href={whatsappCartLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>إرسال السلة عبر واتساب للتأكيد</span>
              </a>

              <button
                onClick={() => {
                  storeService.createOrder({
                    customerName: customerName || 'عميل المتجر',
                    customerPhone: 'عبر السلة المباشرة',
                    customerCity: customerCity || 'الرياض',
                    customerAddress: 'طلب معاينة عبر الموقع',
                    items: cartItems,
                    totalAmount,
                    status: 'pending',
                    orderMethod: 'web_form',
                  });
                  storeService.clearCart();
                  onClose();
                  alert('تم تسجيل طلبك وحفظه بنجاح! سيتم التواصل معك لمتابعة التوصيل.');
                }}
                className="w-full py-2.5 bg-[#1A1612] text-[#E5C384] text-xs font-bold rounded-lg hover:bg-[#342D26] transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>تسجيل طلب رسمي بدون واتساب</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
