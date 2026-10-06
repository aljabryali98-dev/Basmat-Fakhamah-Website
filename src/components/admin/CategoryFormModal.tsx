import React, { useState, useEffect } from 'react';
import { X, Image as ImageIcon, Sparkles, Check, HelpCircle } from 'lucide-react';
import { Category } from '../../types';
import { storeService } from '../../services/storeService';

interface CategoryFormModalProps {
  category: Category | null; // null means create new
  onClose: () => void;
  onSaved: (savedCategory: Category) => void;
}

// Preset Luxury Furniture Images for 1-click selection
const PRESET_FURNITURE_IMAGES = [
  {
    title: 'غرف نوم ملكية',
    url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'مجالس فخمة وكنب',
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'صالات معيشة راقية',
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'طاولات طعام ورخام',
    url: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'كنب وموديلات إيطالية',
    url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'كراسي ولاونج مودرن',
    url: 'https://images.unsplash.com/photo-1580481077195-c3a8b2a30d5b?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'مكاتب ومكتبات كبار الشخصيات',
    url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'إكسسوارات وديكورات مذهبة',
    url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop',
  },
];

export const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
  category,
  onClose,
  onSaved,
}) => {
  const [name, setName] = useState(category?.name || '');
  const [slug, setSlug] = useState(category?.slug || '');
  const [description, setDescription] = useState(category?.description || '');
  const [image, setImage] = useState(
    category?.image || PRESET_FURNITURE_IMAGES[0].url
  );
  const [featured, setFeatured] = useState<boolean>(category?.featured ?? true);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(Boolean(category?.slug));

  // Auto-generate slug when name changes if not manually set
  useEffect(() => {
    if (!slugManuallyEdited && name) {
      const generated = name
        .trim()
        .toLowerCase()
        .replace(/[\s\-_]+/g, '-')
        .replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, '');
      setSlug(generated || 'cat-' + Date.now());
    }
  }, [name, slugManuallyEdited]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const finalSlug = slug.trim() || 'cat-' + Date.now();
    const finalId = category?.id || `cat-${finalSlug.replace(/[^a-zA-Z0-9-]/g, '') || Date.now()}`;

    const newCategory: Category = {
      id: finalId,
      name: name.trim(),
      slug: finalSlug,
      description: description.trim(),
      image: image.trim() || PRESET_FURNITURE_IMAGES[0].url,
      featured,
    };

    storeService.saveCategory(newCategory);
    onSaved(newCategory);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-right border border-[#ECE4D8] max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#C8A265]/20 text-[#9E7E45] border border-[#C8A265]/40">
              بصمة عالم الفخامة للأثاث
            </span>
          </div>
          <h3 className="text-xl font-bold font-heading text-[#1A1612]">
            {category ? `تعديل تصنيف: ${category.name}` : 'إضافة تصنيف أثاث جديد'}
          </h3>
          <p className="text-xs text-[#7A6E5E] mt-1">
            حدد بيانات القسم، عنوانه التسويقي، وصورة الغلاف التي ستظهر في واجهة المتجر وقوائم التصفح.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category Name & Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#4A4136] mb-1">
                اسم التصنيف / القسم *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثال: غرف النوم الملكية، المجالس الفاخرة..."
                className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#D9CEBC] focus:outline-none focus:border-[#C8A265] bg-[#FAF8F5]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4A4136] mb-1 flex items-center justify-between">
                <span>المعرف البرمجي (Slug / الرابط)</span>
                <span className="text-[10px] text-stone-400 font-normal">إنجليزي أو عربي</span>
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlugManuallyEdited(true);
                  setSlug(e.target.value);
                }}
                placeholder="مثال: royal-bedrooms أو bedrooms"
                className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#D9CEBC] focus:outline-none focus:border-[#C8A265] bg-[#FAF8F5]"
                dir="ltr"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-[#4A4136] mb-1">
              الوصف التسويقي للقسم *
            </label>
            <textarea
              rows={2}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="وصف مختصر وجذاب يبرز فخامة وجودة قطع هذا القسم أمام العملاء..."
              className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#D9CEBC] focus:outline-none focus:border-[#C8A265] bg-[#FAF8F5]"
            />
          </div>

          {/* Featured Toggle */}
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#ECE4D8] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1A1612] text-[#E5C384] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#C8A265]" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#1A1612] block">
                  قسم مميز في الواجهة الرئيسية (Featured)
                </span>
                <span className="text-[11px] text-[#7A6E5E]">
                  يظهر في قسم المجموعات البارزة في الصفحة الرئيسية وشريط التصفح السريع
                </span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9E7E45]"></div>
            </label>
          </div>

          {/* Image Selection & Presets */}
          <div>
            <label className="block text-xs font-bold text-[#4A4136] mb-1">
              صورة الغلاف الرئيسية للتصنيف (Cover Image)
            </label>
            
            <div className="flex gap-2 mb-3">
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 px-3 py-2 text-xs rounded-lg border border-[#D9CEBC] bg-[#FAF8F5]"
                dir="ltr"
              />
              {image && (
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#D9CEBC] shrink-0">
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Quick 1-Click Luxury Furniture Image Selection */}
            <div>
              <span className="text-[11px] text-[#7A6E5E] font-bold block mb-2">
                أو اختر صورة جاهزة عالية الدقة بنقرة واحدة:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRESET_FURNITURE_IMAGES.map((preset, idx) => {
                  const isSelected = image === preset.url;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setImage(preset.url)}
                      className={`relative rounded-lg overflow-hidden h-16 border text-right cursor-pointer group transition-all ${
                        isSelected
                          ? 'border-[#C8A265] ring-2 ring-[#C8A265]'
                          : 'border-[#ECE4D8] hover:border-stone-400'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-1.5">
                        <span className="text-[10px] text-white font-bold truncate">
                          {preset.title}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-[#C8A265] text-[#14110E] flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#ECE4D8] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border border-[#D9CEBC] text-xs font-bold text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-[#1A1612] hover:bg-[#342D26] text-[#E5C384] text-xs font-bold transition-colors cursor-pointer shadow-sm"
            >
              {category ? 'حفظ تعديلات التصنيف' : 'إضافة التصنيف للمتجر'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
