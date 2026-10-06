import React from 'react';
import { Search, SlidersHorizontal, X, Sparkles, Tag } from 'lucide-react';
import { Category } from '../types';

interface SearchFilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (catId: string | null) => void;
  categories: Category[];
  selectedPriceRange: string;
  setSelectedPriceRange: (range: string) => void;
  selectedMaterial: string;
  setSelectedMaterial: (mat: string) => void;
  onlyOffers: boolean;
  setOnlyOffers: (val: boolean) => void;
  onlyNew: boolean;
  setOnlyNew: (val: boolean) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  totalResultsCount: number;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  selectedPriceRange,
  setSelectedPriceRange,
  selectedMaterial,
  setSelectedMaterial,
  onlyOffers,
  setOnlyOffers,
  onlyNew,
  setOnlyNew,
  sortBy,
  setSortBy,
  totalResultsCount,
}) => {
  const materialsList = ['الكل', 'خشب ماهوجني', 'خشب جوز', 'خشب زان', 'رخام كلكتا', 'جلد نابا', 'بوكليه', 'مخمل إيطالي'];

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedPriceRange('all');
    setSelectedMaterial('الكل');
    setOnlyOffers(false);
    setOnlyNew(false);
    setSortBy('latest');
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedPriceRange !== 'all' || selectedMaterial !== 'الكل' || onlyOffers || onlyNew;

  return (
    <div className="bg-white rounded-2xl border border-[#ECE4D8] p-5 sm:p-6 shadow-xs mb-8">
      {/* Top Search Input & Sort Selector */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-5">
        {/* Search Input Box */}
        <div className="relative w-full md:w-2/3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث بالاسم، الخامة، أو كود المنتج (مثال: طقم كنب، رخام، فينيسيا...)"
            className="w-full pl-10 pr-11 py-3 bg-[#FAF8F5] border border-[#E2D8C9] rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#C8A265] text-right"
          />
          <Search className="w-5 h-5 text-[#8A7B69] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Selector */}
        <div className="w-full md:w-1/3 flex items-center justify-end gap-2 text-right">
          <span className="text-xs text-[#7A6E5E] shrink-0 font-medium">الترتيب حسب:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E2D8C9] rounded-xl text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-[#C8A265]"
          >
            <option value="latest">الأحدث إضافة</option>
            <option value="price_low">الأقل سعراً</option>
            <option value="price_high">الأعلى سعراً</option>
            <option value="most_viewed">الأكثر مشاهدة وشعبية</option>
          </select>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="pt-4 border-t border-[#F0EAE1] flex flex-wrap items-center justify-between gap-3 text-right">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === null
                ? 'bg-[#1A1612] text-[#E5C384]'
                : 'bg-[#FAF8F5] text-[#544A3D] hover:bg-[#F3ECE0] border border-[#E2D8C9]'
            }`}
          >
            جميع الأقسام
          </button>

          {categories.slice(0, 6).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#1A1612] text-[#E5C384] font-bold'
                  : 'bg-[#FAF8F5] text-[#544A3D] hover:bg-[#F3ECE0] border border-[#E2D8C9]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Quick Toggles: Offers & New Arrivals */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOnlyOffers(!onlyOffers)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              onlyOffers
                ? 'bg-[#9E2B2B] text-white shadow-xs'
                : 'bg-[#FAF8F5] text-[#9E2B2B] border border-[#D9CEBC] hover:bg-[#FAF0F0]'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>عروض فقط</span>
          </button>

          <button
            onClick={() => setOnlyNew(!onlyNew)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              onlyNew
                ? 'bg-[#1A1612] text-[#E5C384]'
                : 'bg-[#FAF8F5] text-[#544A3D] border border-[#D9CEBC] hover:bg-[#F3ECE0]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C8A265]" />
            <span>وصل حديثاً</span>
          </button>

          {hasActiveFilters && (
            <button
              onClick={resetAllFilters}
              className="text-xs text-[#9E7E45] hover:underline px-2 py-1"
            >
              إعادة تعيين
            </button>
          )}
        </div>
      </div>

      {/* Results Counter */}
      <div className="mt-4 pt-3 border-t border-[#F5EFE6] flex items-center justify-between text-xs text-[#8A7B69]">
        <span>إجمالي النتائج المطابقة: <strong className="text-[#1A1612]">{totalResultsCount}</strong> قطعة أثاث</span>
        {hasActiveFilters && <span className="text-[#9E7E45]">تصفية مخصصة نشطة</span>}
      </div>
    </div>
  );
};
