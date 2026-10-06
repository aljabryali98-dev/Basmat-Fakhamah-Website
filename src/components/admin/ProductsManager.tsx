import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Layers,
  Sparkles,
  Tag,
  Check,
  Eye,
  Copy,
  Star,
  FolderTree,
  Filter,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Product, Category, StoreSettings, StockStatus } from '../../types';
import { storeService } from '../../services/storeService';
import { formatCurrency } from '../../utils/formatters';
import { ProductFormModal } from './ProductFormModal';

interface ProductsManagerProps {
  products: Product[];
  categories: Category[];
  settings: StoreSettings;
  onOpenStudioForProduct: (product: Product) => void;
  onNavigateToCategories?: () => void;
  initialCategoryFilter?: string;
}

export const ProductsManager: React.FC<ProductsManagerProps> = ({
  products,
  categories,
  settings,
  onOpenStudioForProduct,
  onNavigateToCategories,
  initialCategoryFilter,
}) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(initialCategoryFilter || 'all');
  const [stockFilter, setStockFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'featured' | 'new' | 'discounted'>('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Quick Inline Price Editing State
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [quickPriceVal, setQuickPriceVal] = useState<number>(0);

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.code.toLowerCase().includes(search.toLowerCase()) ||
      p.materials.toLowerCase().includes(search.toLowerCase());

    const matchesCat = categoryFilter === 'all' || p.categoryId === categoryFilter;
    const matchesStock = stockFilter === 'all' || p.stockStatus === stockFilter;

    let matchesType = true;
    if (typeFilter === 'featured') matchesType = Boolean(p.isFeatured);
    if (typeFilter === 'new') matchesType = Boolean(p.isNewArrival);
    if (typeFilter === 'discounted') matchesType = Boolean(p.isDiscounted);

    return matchesSearch && matchesCat && matchesStock && matchesType;
  });

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`هل أنت متأكد من حذف القطعة "${name}" نهائياً من الكتالوج؟`)) {
      storeService.deleteProduct(id);
    }
  };

  const handleDuplicate = (id: string) => {
    const duplicated = storeService.duplicateProduct(id);
    if (duplicated) {
      setEditingProduct(duplicated);
      setIsModalOpen(true);
    }
  };

  const handleToggleFeatured = (id: string) => {
    storeService.toggleProductFeatured(id);
  };

  const handleSaveQuickPrice = (productId: string) => {
    storeService.updateProductPrice(productId, quickPriceVal);
    setEditingPriceId(null);
  };

  const handleStockChange = (productId: string, status: StockStatus) => {
    storeService.updateProductStockStatus(productId, status);
  };

  return (
    <div className="space-y-6 text-right">
      {/* Top Action & Navigation Bar */}
      <div className="bg-white p-6 rounded-2xl border border-[#ECE4D8] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#C8A265]/20 text-[#9E7E45] border border-[#C8A265]/40">
              كتالوج بصمة عالم الفخامة
            </span>
            <span className="text-xs text-[#7A6E5E]">
              ({products.length} قطعة أثاث مسجلة)
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#1A1612]">
            إدارة قطع الأثاث والكتالوج
          </h2>
          <p className="text-xs text-[#7A6E5E] mt-1">
            أضف موديلات جديدة، عدل الأسعار، تحكم بالخصومات وحالة المخزون، أو صمم إعلانات سوشيال ميديا فورية لكل قطعة.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {onNavigateToCategories && (
            <button
              onClick={onNavigateToCategories}
              className="px-4 py-2.5 rounded-lg border border-[#C8A265]/40 bg-[#FAF8F5] hover:bg-[#FAF0DE] text-[#8C6D34] text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <FolderTree className="w-4 h-4 text-[#C8A265]" />
              <span>إدارة الأقسام والتصنيفات ({categories.length})</span>
            </button>
          )}

          <button
            onClick={() => {
              setEditingProduct(null);
              setIsModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-lg bg-[#1A1612] text-[#E5C384] text-xs font-bold hover:bg-[#342D26] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4 text-[#C8A265]" />
            <span>إضافة قطعة أثاث جديدة</span>
          </button>
        </div>
      </div>

      {/* Filter Row with Category, Stock, and Type Pills */}
      <div className="bg-white p-4 rounded-xl border border-[#ECE4D8] space-y-3 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="ابحث بالاسم، الكود، أو الخامات..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-4 py-2 text-xs rounded-lg border border-[#D9CEBC] bg-[#FAF8F5] focus:outline-none focus:border-[#C8A265]"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Select Category */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="text-xs text-[#7A6E5E] font-bold whitespace-nowrap">
              القسم:
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-lg border border-[#D9CEBC] bg-[#FAF8F5] focus:outline-none focus:border-[#C8A265] font-medium"
            >
              <option value="all">كافة الأقسام ({products.length})</option>
              {categories.map((c) => {
                const count = products.filter((p) => p.categoryId === c.id).length;
                return (
                  <option key={c.id} value={c.id}>
                    {c.name} ({count})
                  </option>
                );
              })}
            </select>

            {/* Select Stock Status */}
            <label className="text-xs text-[#7A6E5E] font-bold whitespace-nowrap mr-2">
              المخزون:
            </label>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-lg border border-[#D9CEBC] bg-[#FAF8F5] focus:outline-none focus:border-[#C8A265] font-medium"
            >
              <option value="all">كافة الحالات</option>
              <option value="in_stock">متوفر للتسليم</option>
              <option value="low_stock">كمية محدودة</option>
              <option value="on_order">تفصيل حسب الطلب</option>
              <option value="out_of_stock">غير متوفر</option>
            </select>
          </div>
        </div>

        {/* Quick Type Filter Tabs */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#F0EAE1] overflow-x-auto text-xs">
          <span className="text-[#8A7B69] font-bold text-[11px] whitespace-nowrap">
            تصفية سريعة:
          </span>
          <button
            onClick={() => setTypeFilter('all')}
            className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
              typeFilter === 'all'
                ? 'bg-[#1A1612] text-[#E5C384] font-bold shadow-xs'
                : 'text-[#7A6E5E] hover:text-[#1A1612] bg-[#FAF8F5]'
            }`}
          >
            الكل ({products.length})
          </button>
          <button
            onClick={() => setTypeFilter('featured')}
            className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
              typeFilter === 'featured'
                ? 'bg-[#9E7E45] text-white font-bold shadow-xs'
                : 'text-[#7A6E5E] hover:text-[#1A1612] bg-[#FAF8F5]'
            }`}
          >
            المميز بالرئيسية ({products.filter((p) => p.isFeatured).length})
          </button>
          <button
            onClick={() => setTypeFilter('new')}
            className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
              typeFilter === 'new'
                ? 'bg-[#1A1612] text-[#E5C384] font-bold shadow-xs'
                : 'text-[#7A6E5E] hover:text-[#1A1612] bg-[#FAF8F5]'
            }`}
          >
            وصل حديثاً ({products.filter((p) => p.isNewArrival).length})
          </button>
          <button
            onClick={() => setTypeFilter('discounted')}
            className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
              typeFilter === 'discounted'
                ? 'bg-red-700 text-white font-bold shadow-xs'
                : 'text-[#7A6E5E] hover:text-[#1A1612] bg-[#FAF8F5]'
            }`}
          >
            العروض والخصومات ({products.filter((p) => p.isDiscounted).length})
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-[#ECE4D8] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-[#FAF8F5] border-b border-[#ECE4D8] text-[#7A6E5E] font-bold">
              <tr>
                <th className="p-4 w-16">صورة</th>
                <th className="p-4">المنتج والكود</th>
                <th className="p-4">التصنيف</th>
                <th className="p-4">السعر المعتمد</th>
                <th className="p-4">حالة المخزون</th>
                <th className="p-4">الميزات</th>
                <th className="p-4">استوديو الإعلانات</th>
                <th className="p-4 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EAE1]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-stone-500">
                    لا توجد قطع أثاث مطابقة لخيارات البحث أو الفلتر الحالية.
                  </td>
                </tr>
              ) : (
                filtered.map((prod) => {
                  const linkedDesigns = storeService.getDesignsByProductId(prod.id);
                  const isQuickEditing = editingPriceId === prod.id;

                  return (
                    <tr key={prod.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                      <td className="p-4 w-16">
                        <img
                          src={prod.images[0] || 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200&auto=format&fit=crop'}
                          alt={prod.name}
                          className="w-12 h-12 rounded-lg object-cover border border-[#ECE4D8]"
                        />
                      </td>

                      <td className="p-4">
                        <span className="font-bold text-[#1A1612] block text-sm">{prod.name}</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] text-[#8A7B69] font-mono">كود: {prod.code}</span>
                          <span className="text-[10px] text-stone-400">({prod.viewsCount || 0} مشاهدة)</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => setCategoryFilter(prod.categoryId)}
                          className="text-xs text-[#8C6D34] hover:underline font-medium bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#ECE4D8] cursor-pointer"
                        >
                          {prod.categoryName || 'بدون تصنيف'}
                        </button>
                      </td>

                      <td className="p-4">
                        {isQuickEditing ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              value={quickPriceVal}
                              onChange={(e) => setQuickPriceVal(Number(e.target.value))}
                              className="w-24 px-2 py-1 text-xs border border-[#C8A265] rounded bg-white font-bold"
                              autoFocus
                            />
                            <button
                              onClick={() => handleSaveQuickPrice(prod.id)}
                              className="p-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 cursor-pointer"
                              title="حفظ السعر"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              setEditingPriceId(prod.id);
                              setQuickPriceVal(prod.price);
                            }}
                            className="cursor-pointer group flex items-baseline gap-1"
                            title="اضغط للتعديل السريع للسعر"
                          >
                            <span className="font-bold text-sm text-[#1A1612]">
                              {formatCurrency(prod.price, settings.currency)}
                            </span>
                            {prod.originalPrice && prod.originalPrice > prod.price && (
                              <span className="text-[10px] text-stone-400 line-through">
                                {formatCurrency(prod.originalPrice, settings.currency)}
                              </span>
                            )}
                            <span className="text-[10px] text-stone-400 group-hover:text-[#9E7E45] transition-colors">
                              (تعديل)
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Stock Status Selector */}
                      <td className="p-4">
                        <select
                          value={prod.stockStatus}
                          onChange={(e) => handleStockChange(prod.id, e.target.value as StockStatus)}
                          className={`text-[11px] font-bold px-2 py-1 rounded-md border cursor-pointer ${
                            prod.stockStatus === 'in_stock'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : prod.stockStatus === 'low_stock'
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : prod.stockStatus === 'on_order'
                              ? 'bg-blue-50 text-blue-800 border-blue-200'
                              : 'bg-red-50 text-red-800 border-red-200'
                          }`}
                        >
                          <option value="in_stock">متوفر للتسليم</option>
                          <option value="low_stock">كمية محدودة</option>
                          <option value="on_order">متاح للتفصيل</option>
                          <option value="out_of_stock">نفذت الكمية</option>
                        </select>
                      </td>

                      {/* Features Badges */}
                      <td className="p-4 space-y-1">
                        <div className="flex items-center gap-1 flex-wrap">
                          <button
                            onClick={() => handleToggleFeatured(prod.id)}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-0.5 cursor-pointer ${
                              prod.isFeatured
                                ? 'bg-[#C8A265]/20 text-[#8C6D34] border border-[#C8A265]/40'
                                : 'bg-stone-100 text-stone-400 hover:text-stone-600'
                            }`}
                            title="تبديل الظهور في المميز بالرئيسية"
                          >
                            <Star className={`w-3 h-3 ${prod.isFeatured ? 'fill-[#C8A265] text-[#C8A265]' : ''}`} />
                            <span>{prod.isFeatured ? 'مميز' : 'عادي'}</span>
                          </button>

                          {prod.isNewArrival && (
                            <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FAF6EE] text-[#9E7E45] border border-[#C8A265]/30">
                              جديد
                            </span>
                          )}

                          {prod.isDiscounted && (
                            <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800">
                              خصم {prod.discountPercentage || 0}%
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Studio Ad Generator Button */}
                      <td className="p-4">
                        <button
                          onClick={() => onOpenStudioForProduct(prod)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#FAF6EE] hover:bg-[#F3ECE0] text-[#9E7E45] border border-[#C8A265]/40 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                          title="تصميم بوست إعلاني لهذا المنتج في استوديو المحتوى"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#C8A265]" />
                          <span>تصميم إعلان ({linkedDesigns.length})</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleDuplicate(prod.id)}
                            className="p-1.5 text-stone-500 hover:text-[#9E7E45] rounded-lg hover:bg-white border border-transparent hover:border-[#ECE4D8] cursor-pointer"
                            title="نسخ القطعة لعمل موديل مشابه"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingProduct(prod);
                              setIsModalOpen(true);
                            }}
                            className="p-1.5 text-[#8A7B69] hover:text-[#1A1612] rounded-lg hover:bg-white border border-transparent hover:border-[#ECE4D8] cursor-pointer"
                            title="تعديل التفاصيل"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(prod.id, prod.name)}
                            className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-white border border-transparent hover:border-[#ECE4D8] cursor-pointer"
                            title="حذف القطعة"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Add/Edit Modal */}
      {isModalOpen && (
        <ProductFormModal
          product={editingProduct}
          categories={categories}
          initialCategoryId={categoryFilter !== 'all' ? categoryFilter : undefined}
          onClose={() => setIsModalOpen(false)}
          onSaved={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
