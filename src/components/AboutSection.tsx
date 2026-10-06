import React from 'react';
import { Award, Shield, CheckCircle, Sparkles, HeartHandshake } from 'lucide-react';
import { StoreSettings } from '../types';

interface AboutSectionProps {
  settings: StoreSettings;
  onBrowseCatalog: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ settings, onBrowseCatalog }) => {
  return (
    <div className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-[#9E7E45] uppercase mb-2 block">
            أصالة الصناعة وفخامة التصميم
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1A1612] font-heading mb-6">
            عن {settings.storeName}
          </h2>
          <p className="text-base sm:text-lg text-[#6E6050] font-light leading-relaxed">
            انطلقت "بصمة عالم الفخامة" برؤية واضحة تهدف إلى إعادة تعريف مفهوم التأثيث الراقي في المملكة العربية السعودية، حيث نجمع بين عبقرية التصميم الإيطالي والأوروبي المعاصر وبين هيبة ودفء المجالس والقصور العربية الأصيلة.
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border border-[#ECE4D8]">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop"
              alt="صالة عرض بصمة عالم الفخامة"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 text-right text-white">
              <div>
                <span className="text-xs text-[#E5C384] font-bold block mb-1">صالة العرض بالرياض</span>
                <p className="text-sm font-light text-[#E8DFD0]">مساحة متكاملة تعرض تنسيقات حقيقية تلهم منزلك القادم</p>
              </div>
            </div>
          </div>

          <div className="text-right space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A1612] font-heading">
              لماذا يختارنا عشاق الذوق الرفيع؟
            </h3>
            <p className="text-sm sm:text-base text-[#574B3D] leading-relaxed font-light">
              نحن لا نبيع مجرد قطع أثاث خشبية أو رخامية؛ بل نصنع بصمة بصرية وروحاً تعيش معك لعقود. نختار خاماتنا بدقة متناهية من أرقى المصانع والورش المتخصصة حول العالم: أخشاب الماهوجني والجوز المعتق، الرخام الإيطالي الطبيعي بعروقه الفريدة، وأقمشة البوكليه والكتان المقاومة للاستخدام اليومي.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-white rounded-xl border border-[#ECE4D8] shadow-xs">
                <div className="w-9 h-9 rounded-lg bg-[#FAF6EE] text-[#9E7E45] flex items-center justify-center mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-[#1A1612] mb-1">حرفية عالمية</h4>
                <p className="text-xs text-[#7A6D5E]">تنسيقات مدروسة وتفاصيل محفورة يدوياً</p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#ECE4D8] shadow-xs">
                <div className="w-9 h-9 rounded-lg bg-[#FAF6EE] text-[#9E7E45] flex items-center justify-center mb-3">
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-[#1A1612] mb-1">ضمان ممتد</h4>
                <p className="text-xs text-[#7A6D5E]">ضمان حقيقي يشمل الهيكل والإسفنج والخامات</p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onBrowseCatalog}
                className="px-6 py-3 bg-[#1A1612] hover:bg-[#322A22] text-[#E5C384] text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                تصفح تشكيلاتنا المتوفرة الآن
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
