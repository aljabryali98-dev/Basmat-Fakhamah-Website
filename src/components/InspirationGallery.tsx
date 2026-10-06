import React, { useState } from 'react';
import { Maximize2, X, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { GalleryItem } from '../types';
import { initialGalleryItems } from '../data/inspirationData';

export const InspirationGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('الكل');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['الكل', 'غرف نوم', 'غرف معيشة', 'مجالس', 'صالات طعام', 'زوايا منزلية', 'مكاتب'];

  const filteredItems = activeCategory === 'الكل'
    ? initialGalleryItems
    : initialGalleryItems.filter((item) => item.category === activeCategory);

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  return (
    <section className="py-20 bg-[#F4EFEA] border-t border-[#E8E0D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#9E7E45] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>معرض الإلهام المعماري والسكني</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1612] font-heading mb-4">
            اكتشف الفخامة
          </h2>
          <p className="text-sm text-[#736655] leading-relaxed">
            شاهد كيف تمنح تصاميم "بصمة عالم الفخامة" الروح والسكينة للمساحات المختلفة، ملهمةً اختياراتك لأرقى تشكيلات الأثاث.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#1A1612] text-[#E5C384] shadow-md'
                  : 'bg-white/80 text-[#544A3D] hover:bg-white hover:text-black border border-[#E2D7C5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 bg-[#1A1612]"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#14110E] via-[#14110E]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 text-right">
                <span className="text-[11px] font-bold text-[#E5C384] tracking-wider block mb-1">
                  {item.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white font-heading mb-1 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#D1C7B7] line-clamp-1 font-light">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {currentItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20 hidden sm:block"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20 hidden sm:block"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full bg-[#1A1612] rounded-2xl overflow-hidden border border-[#C8A265]/30 shadow-2xl flex flex-col md:flex-row max-h-[85vh]">
            <div className="md:w-3/5 h-80 md:h-auto bg-black flex items-center justify-center">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between text-right text-white">
              <div>
                <span className="text-xs font-bold text-[#E5C384] tracking-widest block mb-2">
                  {currentItem.category}
                </span>
                <h3 className="text-2xl font-bold font-heading mb-3 text-[#FAF6EE]">
                  {currentItem.title}
                </h3>
                <p className="text-sm text-[#C8BBA9] font-light leading-relaxed mb-6">
                  {currentItem.description}
                </p>

                <div className="border-t border-[#342A22] pt-4">
                  <h4 className="text-xs font-bold text-[#E5C384] mb-2.5">
                    القطع المميزة في هذه المساحة:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#EAE2D5]">
                    {currentItem.featuredFurniture.map((piece, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C8A265]" />
                        <span>{piece}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#342A22]">
                <p className="text-[11px] text-[#A6957F]">
                  هل تود تنسيق مساحة مشابهة؟ يمكنك طلب القطع المعروضة مباشرة عبر خدمة العملاء أو زيارة صالة العرض.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
