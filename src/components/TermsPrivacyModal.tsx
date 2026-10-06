import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { StoreSettings } from '../types';

interface TermsPrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: StoreSettings;
}

export const TermsPrivacyModal: React.FC<TermsPrivacyModalProps> = ({ isOpen, onClose, settings }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-right border border-[#ECE4D8] max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4 text-[#9E7E45]">
          <ShieldCheck className="w-6 h-6" />
          <h3 className="text-xl font-bold font-heading text-[#1A1612]">الشروط والأحكام وسياسة الخصوصية</h3>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#5C5042] leading-relaxed">
          <div>
            <h4 className="font-bold text-[#1A1612] mb-1">1. سياسة المعاينة والطلب</h4>
            <p>
              جميع المنتجات والقطع المعروضة في كتالوج {settings.storeName} تمثل تصاميم نخب أول. عند إرسال طلب استفسار أو حجز، يتم تزويد العميل بعقد تأكيد المواصفات والمقاسات قبل جدولة الشحن والتركيب.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#1A1612] mb-1">2. التوصيل والتركيب الفاخر</h4>
            <p>
              يوفر المعرض فريقاً فنياً متخصصاً للتركيب المباشر داخل مدينة الرياض مجاناً للطلبات المؤهلة، مع إمكانية التنسيق للشحن المباشر الآمن إلى كافة مناطق المملكة ودول الخليج العربي.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#1A1612] mb-1">3. ضمان الجودة والمواد</h4>
            <p>
              تتمتع هياكل الأثاث الخشبي والمعدني بالضمان المعتمد ضد عيوب التصنيع. يُرجى مراجعة بطاقة العناية المرفقة بكل قطعة للحفاظ على الرخام الطبيعي والأقمشة المعالجة.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#1A1612] mb-1">4. خصوصية بيانات العملاء</h4>
            <p>
              نلتزم بحماية سرية وأمان بياناتك (الاسم، أرقام التواصل، العناوين) ولن يتم استخدامها إلا لإتمام المعاملات ومتابعة خدمة ما بعد البيع.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 text-left">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#1A1612] text-[#E5C384] text-xs font-bold rounded-lg hover:bg-[#342D26]"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
