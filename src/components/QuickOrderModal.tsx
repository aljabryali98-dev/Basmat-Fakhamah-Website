import React, { useState } from 'react';
import { X, MessageCircle, Phone, Send, CheckCircle2 } from 'lucide-react';
import { Product, StoreSettings } from '../types';
import { formatCurrency, generateWhatsAppProductLink } from '../utils/formatters';
import { storeService } from '../services/storeService';

interface QuickOrderModalProps {
  product: Product;
  selectedColor?: string;
  onClose: () => void;
  settings: StoreSettings;
}

export const QuickOrderModal: React.FC<QuickOrderModalProps> = ({
  product,
  selectedColor,
  onClose,
  settings,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('الرياض');
  const [customerAddress, setCustomerAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    storeService.createOrder({
      customerName,
      customerPhone,
      customerCity,
      customerAddress,
      items: [
        {
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity: 1,
          selectedColor,
          image: product.images[0] || '',
        },
      ],
      totalAmount: product.price,
      status: 'pending',
      notes,
      orderMethod: 'web_form',
    });

    setSubmitted(true);
  };

  const whatsappDirectLink = generateWhatsAppProductLink(product, settings, selectedColor);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E8DFD0] p-6 text-right">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-[#7D7060] hover:text-[#1A1612] rounded-full hover:bg-[#F3ECE0]"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-[#1A1612] font-heading">
              تم استلام طلبك بنجاح!
            </h3>
            <p className="text-sm text-[#6E6152] max-w-xs mx-auto">
              سيتواصل معك مستشار المبيعات في <span className="font-bold text-[#1A1612]">بصمة عالم الفخامة</span> خلال وقت قصير لتأكيد المقاسات وموعد التوصيل.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg bg-[#1A1612] text-[#E5C384] font-bold text-sm hover:bg-[#342D26] transition-colors"
              >
                إغلاق النافذة
              </button>
            </div>
          </div>
        ) : (
          <div>
            <span className="text-xs font-bold text-[#9E7E45] uppercase tracking-wider block mb-1">
              طلب قطعة أثاث راقية
            </span>
            <h3 className="text-xl font-bold text-[#1A1612] font-heading mb-4">
              {product.name}
            </h3>

            {/* Product Quick Recap */}
            <div className="flex items-center gap-3 p-3 bg-[#FAF8F5] rounded-xl border border-[#ECE4D8] mb-5">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-14 h-14 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-[#1A1612]">
                    {formatCurrency(product.price, settings.currency)}
                  </span>
                  <span className="text-xs text-[#8A7B69] font-mono">كود: {product.code}</span>
                </div>
                {selectedColor && (
                  <span className="text-xs text-[#6E6152] block mt-0.5">
                    اللون المختار: {selectedColor}
                  </span>
                )}
              </div>
            </div>

            {/* Direct Instant Actions */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <a
                href={whatsappDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-3 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>إرسال عبر واتساب</span>
              </a>

              <a
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="py-3 px-3 rounded-lg bg-[#FAF6EE] hover:bg-[#F3ECE0] text-[#1A1612] border border-[#D9CEBC] text-xs font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-[#9E7E45]" />
                <span>اتصال هاتفي مباشر</span>
              </a>
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs text-[#8A7B69]">
                <span className="bg-white px-2">أو أرسل بياناتك وسنتصل بك</span>
              </div>
            </div>

            {/* Quick Request Form */}
            <form onSubmit={handleSubmitForm} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-[#4A4136] mb-1">
                  الاسم الكريم *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="مثال: صالح محمد"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#D9CEBC] focus:outline-hidden focus:ring-2 focus:ring-[#C8A265]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#4A4136] mb-1">
                    رقم الجوال *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="05XXXXXXXX"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#D9CEBC] focus:outline-hidden focus:ring-2 focus:ring-[#C8A265]"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#4A4136] mb-1">
                    المدينة
                  </label>
                  <input
                    type="text"
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    placeholder="الرياض / جدة / الشرقية"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#D9CEBC] focus:outline-hidden focus:ring-2 focus:ring-[#C8A265]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4A4136] mb-1">
                  العنوان أو الحي
                </label>
                <input
                  type="text"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="الحي، اسم الشارع، أو تفاصيل الموقع"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#D9CEBC] focus:outline-hidden focus:ring-2 focus:ring-[#C8A265]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4A4136] mb-1">
                  ملاحظات أو مواصفات خاصة
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="أي تعديل في المقاس أو استفسار عن موعد المعاينة"
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-[#D9CEBC] focus:outline-hidden focus:ring-2 focus:ring-[#C8A265]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-[#1A1612] hover:bg-[#342D26] text-[#E5C384] font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Send className="w-4 h-4" />
                <span>إرسال طلب الحجز والتواصل</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
