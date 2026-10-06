import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Category } from '../types';

interface CategoriesSectionProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  onSelectCategory,
}) => {
  return (
    <section className="py-20 bg-[#FAF8F5] border-b border-[#ECE4D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#9E7E45] uppercase mb-2 block">
              مجموعات الأثاث الفاخر
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1A1612] font-heading">
              تصفح الأثاث حسب التصنيف
            </h2>
          </div>
          <p className="text-sm text-[#7A6E5E] max-w-md">
            تشكيلات متكاملة تلبي أرقى معايير الذوق للمنازل والقصور والمقرات الفخمة.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            // Give the first two prominent featured sizing on large screens if desired
            const isLarge = idx === 0 || idx === 1;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group relative overflow-hidden rounded-xl cursor-pointer shadow-xs hover:shadow-xl transition-all duration-500 bg-[#1A1612] ${
                  isLarge ? 'sm:col-span-2 lg:col-span-2 aspect-16/10' : 'aspect-4/3'
                }`}
              >
                {/* Background Image with Smooth Hover Zoom */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-95"
                />

                {/* Dark Luxury Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#14110E] via-[#14110E]/40 to-transparent group-hover:via-[#14110E]/25 transition-all duration-300" />

                {/* Subtle Gold Accent Border on hover */}
                <div className="absolute inset-0 border border-transparent group-hover:border-[#C8A265]/50 rounded-xl transition-colors duration-300 pointer-events-none" />

                {/* Content Details */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end text-right z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#FAF6EE] font-heading group-hover:text-[#E5C384] transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#D1C7B7] line-clamp-1 mt-1 font-light">
                        {cat.description}
                      </p>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-[#C8A265] text-white group-hover:text-[#14110E] flex items-center justify-center transition-all duration-300 shrink-0 mr-3">
                      <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
