import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Package,
  Layers,
  ExternalLink,
  Eye,
  AlertTriangle,
  LayoutGrid,
  List,
  CheckCircle2,
  FolderPlus
} from 'lucide-react';
import { Category, Product, StoreSettings } from '../../types';
import { storeService } from '../../services/storeService';
import { CategoryFormModal } from './CategoryFormModal';

interface CategoriesManagerProps {
  categories: Category[];
  products: Product[];
  settings: StoreSettings;
  onNavigateToProductsWithCategory?: (categoryId: string) => void;
  onAddProductForCategory?: (categoryId: string) => void;
}

export const CategoriesManager: React.FC<CategoriesManagerProps> = ({
  categories,
  products,
  settings,
  onNavigateToProductsWithCategory,
  onAddProductForCategory,
}) => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'featured' | 'has_products' | 'empty'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  
  // Modals state
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
  const [reassignTargetId, setReassignTargetId] = useState<string>('');

  // Helper to count products in category
  const getProductCount = (catId: string) => {
    return products.filter((p) => p.categoryId === catId).length;
  };

  // Filtered categories
  const filteredCategories = categories.filter((cat) => {
    const matchesSearch =
      cat.name.toLowerCase().includes(search.toLowerCase()) ||
      cat.description.toLowerCase().includes(search.toLowerCase()) ||
      cat.slug.toLowerCase().includes(search.toLowerCase());

    const count = getProductCount(cat.id);
    if (!matchesSearch) return false;

    if (filterType === 'featured') return Boolean(cat.featured);
    if (filterType === 'has_products') return count > 0;
    if (filterType === 'empty') return count === 0;
    return true;
  });

  // Reorder handlers
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const reordered = [...categories];
    const temp = reordered[index - 1];
    reordered[index - 1] = reordered[index];
    reordered[index] = temp;
    storeService.reorderCategories(reordered);
  };

  const handleMoveDown = (index: number) => {
    if (index === categories.length - 1) return;
    const reordered = [...categories];
    const temp = reordered[index + 1];
    reordered[index + 1] = reordered[index];
    reordered[index] = temp;
    storeService.reorderCategories(reordered);
  };

  const handleToggleFeatured = (id: string) => {
    storeService.toggleCategoryFeatured(id);
  };

  const handleConfirmDelete = () => {
    if (!deletingCategory) return;
    storeService.deleteCategory(deletingCategory.id, reassignTargetId || undefined);
    setDeletingCategory(null);
    setReassignTargetId('');
  };

  const promptDelete = (category: Category) => {
    const count = getProductCount(category.id);
    const otherCategories = categories.filter((c) => c.id !== category.id);
    setDeletingCategory(category);
    setReassignTargetId(otherCategories[0]?.id || '');
  };

  return (
    <div className="space-y-6 text-right">
      {/* Top Header & Action Bar */}
      <div className="bg-white p-6 rounded-2xl border border-[#ECE4D8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#C8A265]/20 text-[#9E7E45] border border-[#C8A265]/40">
              كتالوج بصمة عالم الفخامة
            </span>
            <span className="text-xs text-[#7A6E5E]">
              ({categories.length} أقسام وتصنيفات معتمدة)
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#1A1612]">
            إدارة أقسام وتصنيفات الأثاث
          </h2>
          <p className="text-xs text-[#7A6E5E] mt-1">
            تحكم كامل بتصنيفات المعرض (غرف النوم، المجالس، أطقم الكنب، طاولات الضيافة)، تخصيص الصور الملكية، وتحديد الأقسام المميزة في الواجهة.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingCategory(null);
            setIsFormOpen(true);
          }}
          className="px-5 py-2.5 rounded-lg bg-[#1A1612] text-[#E5C384] text-xs font-bold hover:bg-[#342D26] transition-colors flex items-center gap-2 cursor-pointer shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4 text-[#C8A265]" />
          <span>إضافة تصنيف أثاث جديد</span>
        </button>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#ECE4D8] shadow-xs">
          <span className="text-[11px] text-[#8A7B69] block mb-1">إجمالي التصنيفات</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#1A1612] font-heading">{categories.length}</span>
            <span className="text-[10px] text-stone-500">قسم أثاث</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#ECE4D8] shadow-xs">
          <span className="text-[11px] text-[#8A7B69] block mb-1">الأقسام المميزة بالرئيسية</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#9E7E45] font-heading">
              {categories.filter((c) => c.featured).length}
            </span>
            <span className="text-[10px] text-stone-500">في الصفحة الأولى</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#ECE4D8] shadow-xs">
          <span className="text-[11px] text-[#8A7B69] block mb-1">قطع الأثاث الموزعة</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#1A1612] font-heading">{products.length}</span>
            <span className="text-[10px] text-stone-500">قطعة مفهرسة</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#ECE4D8] shadow-xs">
          <span className="text-[11px] text-[#8A7B69] block mb-1">متوسط القطع بالقسم</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-stone-800 font-heading">
              {categories.length > 0 ? (products.length / categories.length).toFixed(1) : 0}
            </span>
            <span className="text-[10px] text-stone-500">قطع لكل قسم</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#ECE4D8] flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="ابحث باسم القسم أو الوصف..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-4 py-2 text-xs rounded-lg border border-[#D9CEBC] bg-[#FAF8F5] focus:outline-none focus:border-[#C8A265]"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Filter Pills */}
          <div className="flex items-center bg-[#FAF8F5] p-1 rounded-lg border border-[#ECE4D8] text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                filterType === 'all'
                  ? 'bg-white text-[#1A1612] font-bold shadow-xs'
                  : 'text-[#7A6E5E] hover:text-[#1A1612]'
              }`}
            >
              كافة الأقسام ({categories.length})
            </button>
            <button
              onClick={() => setFilterType('featured')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                filterType === 'featured'
                  ? 'bg-white text-[#9E7E45] font-bold shadow-xs'
                  : 'text-[#7A6E5E] hover:text-[#1A1612]'
              }`}
            >
              المميزة ({categories.filter((c) => c.featured).length})
            </button>
            <button
              onClick={() => setFilterType('has_products')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                filterType === 'has_products'
                  ? 'bg-white text-[#1A1612] font-bold shadow-xs'
                  : 'text-[#7A6E5E] hover:text-[#1A1612]'
              }`}
            >
              بها منتجات ({categories.filter((c) => getProductCount(c.id) > 0).length})
            </button>
            <button
              onClick={() => setFilterType('empty')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                filterType === 'empty'
                  ? 'bg-white text-stone-700 font-bold shadow-xs'
                  : 'text-[#7A6E5E] hover:text-[#1A1612]'
              }`}
            >
              فارغة ({categories.filter((c) => getProductCount(c.id) === 0).length})
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-[#ECE4D8] rounded-lg p-1 bg-[#FAF8F5]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md cursor-pointer transition-colors ${
                viewMode === 'grid' ? 'bg-white text-[#1A1612] shadow-xs' : 'text-stone-400 hover:text-stone-700'
              }`}
              title="عرض كبطاقات"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md cursor-pointer transition-colors ${
                viewMode === 'table' ? 'bg-white text-[#1A1612] shadow-xs' : 'text-stone-400 hover:text-stone-700'
              }`}
              title="عرض كجدول"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid View of Categories */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCategories.map((cat, idx) => {
            const productCount = getProductCount(cat.id);
            const globalIndex = categories.findIndex((c) => c.id === cat.id);

            return (
              <div
                key={cat.id}
                className="bg-white rounded-2xl border border-[#ECE4D8] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
              >
                {/* Image Cover */}
                <div className="relative aspect-16/9 w-full bg-[#1A1612] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleFeatured(cat.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 backdrop-blur-xs transition-colors cursor-pointer ${
                        cat.featured
                          ? 'bg-[#C8A265] text-[#14110E] shadow-sm'
                          : 'bg-black/50 text-stone-300 hover:bg-black/70'
                      }`}
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{cat.featured ? 'مميز بالرئيسية' : 'عادي'}</span>
                    </button>
                  </div>

                  {/* Reorder Buttons on Card Image */}
                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/60 rounded-lg p-1 backdrop-blur-xs">
                    <button
                      onClick={() => handleMoveUp(globalIndex)}
                      disabled={globalIndex === 0}
                      className="p-1 text-stone-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      title="تحريك للأعلى في الترتيب"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMoveDown(globalIndex)}
                      disabled={globalIndex === categories.length - 1}
                      className="p-1 text-stone-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      title="تحريك للأسفل في الترتيب"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Category Title on image bottom */}
                  <div className="absolute bottom-3 right-3 left-3 text-right">
                    <span className="text-[10px] text-[#E5C384] font-mono block">/{cat.slug}</span>
                    <h3 className="text-lg font-bold text-white font-heading">{cat.name}</h3>
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-[#7A6E5E] line-clamp-2 leading-relaxed">
                    {cat.description || 'لا يوجد وصف مدخل لهذا القسم.'}
                  </p>

                  <div className="pt-3 border-t border-[#F0EAE1] flex items-center justify-between">
                    {/* Products Count Badge & Quick Link */}
                    {onNavigateToProductsWithCategory ? (
                      <button
                        onClick={() => onNavigateToProductsWithCategory(cat.id)}
                        className="px-3 py-1 rounded-lg bg-[#FAF8F5] border border-[#ECE4D8] hover:bg-[#FAF0DE] hover:border-[#C8A265]/40 text-xs font-bold text-[#1A1612] flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="انقر لعرض وتعديل قطع هذا القسم"
                      >
                        <Package className="w-3.5 h-3.5 text-[#9E7E45]" />
                        <span>{productCount} قطع أثاث</span>
                        <ExternalLink className="w-3 h-3 text-stone-400" />
                      </button>
                    ) : (
                      <span className="px-3 py-1 rounded-lg bg-[#FAF8F5] border border-[#ECE4D8] text-xs font-bold text-[#1A1612] flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5 text-[#9E7E45]" />
                        <span>{productCount} قطع أثاث</span>
                      </span>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1.5">
                      {onAddProductForCategory && (
                        <button
                          onClick={() => onAddProductForCategory(cat.id)}
                          className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-50 border border-emerald-200 transition-colors cursor-pointer"
                          title="إضافة قطعة أثاث جديدة داخل هذا التصنيف مباشرة"
                        >
                          <FolderPlus className="w-4 h-4" />
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setEditingCategory(cat);
                          setIsFormOpen(true);
                        }}
                        className="p-1.5 rounded-lg text-[#5C5042] hover:bg-stone-100 border border-stone-200 transition-colors cursor-pointer"
                        title="تعديل بيانات التصنيف"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => promptDelete(cat)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 border border-red-200 transition-colors cursor-pointer"
                        title="حذف التصنيف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View of Categories */
        <div className="bg-white rounded-2xl border border-[#ECE4D8] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#FAF8F5] border-b border-[#ECE4D8] text-[#7A6E5E] font-bold">
                <tr>
                  <th className="p-4 w-12 text-center">ترتيب</th>
                  <th className="p-4 w-16">الغلاف</th>
                  <th className="p-4">اسم التصنيف والمسار</th>
                  <th className="p-4">الوصف</th>
                  <th className="p-4 text-center">المنتجات المرتبطة</th>
                  <th className="p-4 text-center">المميز في الرئيسية</th>
                  <th className="p-4 text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EAE1]">
                {filteredCategories.map((cat, idx) => {
                  const productCount = getProductCount(cat.id);
                  const globalIndex = categories.findIndex((c) => c.id === cat.id);

                  return (
                    <tr key={cat.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <button
                            onClick={() => handleMoveUp(globalIndex)}
                            disabled={globalIndex === 0}
                            className="p-1 text-stone-400 hover:text-stone-800 disabled:opacity-20 cursor-pointer"
                            title="تحريك لأعلى"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-[11px] font-mono font-bold text-stone-500">
                            {globalIndex + 1}
                          </span>
                          <button
                            onClick={() => handleMoveDown(globalIndex)}
                            disabled={globalIndex === categories.length - 1}
                            className="p-1 text-stone-400 hover:text-stone-800 disabled:opacity-20 cursor-pointer"
                            title="تحريك لأسفل"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      <td className="p-4">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-14 h-10 rounded-lg object-cover border border-[#ECE4D8]"
                        />
                      </td>

                      <td className="p-4">
                        <span className="font-bold text-[#1A1612] block text-sm">{cat.name}</span>
                        <span className="text-[11px] text-[#8A7B69] font-mono">/{cat.slug}</span>
                      </td>

                      <td className="p-4 max-w-xs text-stone-600 truncate">
                        {cat.description}
                      </td>

                      <td className="p-4 text-center">
                        {onNavigateToProductsWithCategory ? (
                          <button
                            onClick={() => onNavigateToProductsWithCategory(cat.id)}
                            className="px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#ECE4D8] hover:bg-[#FAF0DE] text-xs font-bold text-[#1A1612] inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>{productCount} قطع</span>
                            <ExternalLink className="w-3 h-3 text-stone-400" />
                          </button>
                        ) : (
                          <span className="font-bold text-[#1A1612]">{productCount} قطع</span>
                        )}
                      </td>

                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleToggleFeatured(cat.id)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-colors ${
                            cat.featured
                              ? 'bg-[#C8A265]/20 text-[#9E7E45] border border-[#C8A265]/40'
                              : 'bg-stone-100 text-stone-500'
                          }`}
                        >
                          {cat.featured ? 'مميز' : 'عادي'}
                        </button>
                      </td>

                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {onAddProductForCategory && (
                            <button
                              onClick={() => onAddProductForCategory(cat.id)}
                              className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-50 border border-emerald-200 cursor-pointer"
                              title="إضافة قطعة أثاث جديدة داخل هذا التصنيف"
                            >
                              <FolderPlus className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setEditingCategory(cat);
                              setIsFormOpen(true);
                            }}
                            className="p-1.5 rounded-lg text-[#5C5042] hover:bg-stone-100 border border-stone-200 cursor-pointer"
                            title="تعديل"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => promptDelete(cat)}
                            className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 border border-red-200 cursor-pointer"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Category Form Modal (Add / Edit) */}
      {isFormOpen && (
        <CategoryFormModal
          category={editingCategory}
          onClose={() => {
            setIsFormOpen(false);
            setEditingCategory(null);
          }}
          onSaved={() => {
            setIsFormOpen(false);
            setEditingCategory(null);
          }}
        />
      )}

      {/* Delete Confirmation & Reassign Modal */}
      {deletingCategory && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 text-right border border-[#ECE4D8]">
            <div className="flex items-center gap-3 mb-4 text-amber-600">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1A1612] font-heading">
                  حذف تصنيف: {deletingCategory.name}
                </h3>
                <span className="text-xs text-stone-500">
                  هل أنت متأكد من رغبتك بحذف هذا القسم من المعرض؟
                </span>
              </div>
            </div>

            {/* If has products, show reassign selector */}
            {getProductCount(deletingCategory.id) > 0 ? (
              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#ECE4D8] mb-5 text-xs text-[#5C5042] space-y-2">
                <p className="font-bold text-[#1A1612]">
                  تنبيه: يحتوي هذا القسم على {getProductCount(deletingCategory.id)} قطعة أثاث!
                </p>
                <p>
                  اختر القسم البديل الذي ترغب بنقل هذه القطع إليه للحفاظ على بقائها في الكتالوج:
                </p>
                <select
                  value={reassignTargetId}
                  onChange={(e) => setReassignTargetId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9CEBC] bg-white font-bold"
                >
                  {categories
                    .filter((c) => c.id !== deletingCategory.id)
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        نقل إلى: {c.name}
                      </option>
                    ))}
                </select>
              </div>
            ) : (
              <p className="text-xs text-[#7A6E5E] mb-5">
                هذا القسم لا يحتوي على أي قطع أثاث حالياً، وسيتم حذفه مباشرة دون أي تأثير على المنتجات.
              </p>
            )}

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeletingCategory(null)}
                className="px-4 py-2 rounded-lg border border-[#D9CEBC] text-xs font-bold text-stone-600 hover:bg-stone-100 cursor-pointer"
              >
                تراجع
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer transition-colors"
              >
                تأكيد الحذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
