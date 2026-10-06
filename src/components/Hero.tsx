import React from 'react';
import { ArrowLeft, Sparkles, Shield, Truck, Award } from 'lucide-react';
import { StoreSettings } from '../types';

interface HeroProps {
  onExploreProducts: () => void;
  onBrowseCatalog: () => void;
  onContactUs: () => void;
  settings: StoreSettings;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreProducts,
  onBrowseCatalog,
  onContactUs,
  settings,
}) => {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#14110E] text-white">
      {/* Background Luxury Architectural & Furniture Visual with Subtle Parallax/Zoom */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=85&w=2400&auto=format&fit=crop"
          alt="أثاث فاخر - بصمة عالم الفخامة"
          className="w-full h-full object-cover object-center opacity-45 scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Gradients to emphasize luxury depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#14110E] via-[#14110E]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#14110E]/80 via-transparent to-[#14110E]/80" />
      </div>

      {/* Decorative Gold Accent Lines */}
      <div className="absolute top-10 left-10 right-10 bottom-10 border border-[#C8A265]/15 pointer-events-none hidden md:block" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        {/* Subtle Brand Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#241E17]/80 border border-[#C8A265]/40 text-[#E5C384] text-xs sm:text-sm font-medium mb-6 backdrop-blur-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#C8A265]" />
          <span>المعرض الرائد للأثاث الراقي والمجالس الفاخرة</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight mb-6 leading-tight sm:leading-none text-[#FAF6EE]">
          {settings.storeName}
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-2xl text-[#D9CFBE] font-light max-w-2xl mx-auto mb-10 leading-relaxed">
          "{settings.tagline}"
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={onExploreProducts}
            className="px-7 py-3.5 rounded-md bg-[#C8A265] text-[#14110E] font-bold text-sm sm:text-base hover:bg-[#d4af72] hover:shadow-lg hover:shadow-[#C8A265]/20 transition-all flex items-center gap-2 cursor-pointer"
            id="hero-btn-explore"
          >
            <span>اكتشف منتجاتنا</span>
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            onClick={onBrowseCatalog}
            className="px-7 py-3.5 rounded-md bg-transparent border border-[#E8DFD0]/40 text-[#FAF6EE] font-medium text-sm sm:text-base hover:bg-white/10 hover:border-white transition-all cursor-pointer"
            id="hero-btn-catalog"
          >
            تصفح الكتالوج
          </button>

          <button
            onClick={onContactUs}
            className="px-7 py-3.5 rounded-md bg-[#241E17]/70 text-[#C8A265] border border-[#C8A265]/30 text-sm sm:text-base hover:bg-[#241E17] hover:text-[#e4c284] transition-all cursor-pointer"
            id="hero-btn-contact"
          >
            تواصل معنا
          </button>
        </div>

        {/* Luxury Pillars / Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-[#C8A265]/15 text-right">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#221C16] border border-[#C8A265]/20 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-[#C8A265]" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-[#FAF6EE]">خامات نخب أول</h2>
              <p className="text-[11px] text-[#A69986]">أخشاب صلبة ورخام طبيعي</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#221C16] border border-[#C8A265]/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#C8A265]" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-[#FAF6EE]">تصاميم حصرية</h2>
              <p className="text-[11px] text-[#A69986]">إيطالية وعربية أصيلة</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#221C16] border border-[#C8A265]/20 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-[#C8A265]" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-[#FAF6EE]">توصيل وتركيب</h2>
              <p className="text-[11px] text-[#A69986]">فريق فني متخصص بالرياض</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#221C16] border border-[#C8A265]/20 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-[#C8A265]" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-[#FAF6EE]">ضمان الجودة</h2>
              <p className="text-[11px] text-[#A69986]">راحة تدوم لسنوات طويلة</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
