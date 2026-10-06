import React, { useState } from 'react';
import { X, Plus, Trash2, FolderPlus, Sparkles } from 'lucide-react';
import { Product, Category, StockStatus } from '../../types';
import { storeService } from '../../services/storeService';
import { CategoryFormModal } from './CategoryFormModal';

interface ProductFormModalProps {
  product: Product | null; // null means add new
  categories: Category[];
  initialCategoryId?: string;
  onClose: () => void;
  onSaved: () => void;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  product,
  categories,
  initialCategoryId,
  onClose,
  onSaved,
}) => {
  const [name, setName] = useState(product?.name || '');
  const [categoryId, setCategoryId] = useState(
    product?.categoryId || initialCategoryId || categories[0]?.id || ''
  );
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [price, setPrice] = useState<number>(product?.price || 5000);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(product?.originalPrice);
  const [isDiscounted, setIsDiscounted] = useState<boolean>(product?.isDiscounted || false);
  const [isFeatured, setIsFeatured] = useState<boolean>(product?.isFeatured || false);
  const [isNewArrival, setIsNewArrival] = useState<boolean>(product?.isNewArrival || false);
  const [stockStatus, setStockStatus] = useState<StockStatus>(product?.stockStatus || 'in_stock');
  const [shortDescription, setShortDescription] = useState(product?.shortDescription || '');
  const [fullDescription, setFullDescription] = useState(product?.fullDescription || '');
  const [dimensions, setDimensions] = useState(product?.dimensions || '220 × 95 × 85 سم');
  const [materials, setMaterials] = useState(product?.materials || 'خشب زان طبيعي، رخام كلكتا، قماش بوكليه');
  const [images, setImages] = useState<string[]>(
    product?.images && product.images.length > 0
      ? product.images
      : ['https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200&auto=format&fit=crop']
  );
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const selectedCategory = categories.find((c) => c.id === categoryId);
    const discountPercentage =
      isDiscounted && originalPrice && originalPrice > price
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : undefined;

    const productPayload: Product = {
      id: product?.id || 'prod-' + Date.now(),
      name,
      categoryId,
      categoryName: selectedCategory?.name || '',
      price: Number(price),
      originalPrice: isDiscounted && originalPrice ? Number(originalPrice) : undefined,
      discountPercentage,
      isDiscounted,
      isFeatured,
      isNewArrival,
      stockStatus,
      shortDescription,
      fullDescription,
      dimensions,
      materials,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200&auto=format&fit=crop'],
      colors: product?.colors || [
        { name: 'بيج كلاسيك', hex: '#E6DCBF' },
        { name: 'بني شوكولاتة', hex: '#3E2723' },
      ],
      code: product?.code || 'BWA-' + Math.floor(100 + Math.random() * 900),
      viewsCount: product?.viewsCount || 0,
      ordersCount: product?.ordersCount || 0,
      tags: product?.tags || [selectedCategory?.name || 'أثاث فاخر'],
      createdAt: product?.createdAt || new Date().toISOString().split('T')[0],
    };

    storeService.saveProduct(productPayload);
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-right border border-[#ECE4D8] max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold font-heading text-[#1A1612] mb-6">
          {product ? `تعديل قطعة: ${product.name}` : 'إضافة قطعة أثاث جديدة للكتالوج'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#4A4136] mb-1">اسم القطعة أو الموديل *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثال: مجلس فينيسيا الملكي"
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9CEBC]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-[#4A4136]">التصنيف التابع له *</label>
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(true)}
                  className="text-[11px] text-[#9E7E45] hover:text-[#C8A265] font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>+ إضافة تصنيف جديد</span>
                </button>
              </div>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9CEBC] bg-white font-medium"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#4A4136] mb-1">السعر الحالي (ر.س) *</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs font-bold rounded-lg border border-[#D9CEBC]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4A4136] mb-1">السعر السابق (في حال الخصم)</label>
              <input
                type="number"
                value={originalPrice || ''}
                onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="مثال: 15000"
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9CEBC]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4A4136] mb-1">حالة التوفر بالمستودع</label>
              <select
                value={stockStatus}
                onChange={(e) => setStockStatus(e.target.value as StockStatus)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9CEBC]"
              >
                <option value="in_stock">متوفر للتسليم المباشر</option>
                <option value="low_stock">كمية محدودة</option>
                <option value="on_order">متاح للطلب والتفصيل</option>
                <option value="out_of_stock">غير متوفر حالياً</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 py-2.5 border-y border-[#F0EAE1]">
            <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
              <input
                type="checkbox"
                checked={isDiscounted}
                onChange={(e) => setIsDiscounted(e.target.checked)}
                className="accent-[#C8A265] rounded"
              />
              <span>تفعيل كعرض ترويجي (خصم)</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="accent-[#C8A265] rounded"
              />
              <span>تثبيت في المختارات البارزة</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
              <input
                type="checkbox"
                checked={isNewArrival}
                onChange={(e) => setIsNewArrival(e.target.checked)}
                className="accent-[#C8A265] rounded"
              />
              <span>تمييز كـ "وصل حديثاً"</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4A4136] mb-1">الوصف المختصر</label>
            <input
              type="text"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9CEBC]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4A4136] mb-1">الوصف التفصيلي والقصة</label>
            <textarea
              rows={3}
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9CEBC]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#4A4136] mb-1">الأبعاد والمقاسات</label>
              <input
                type="text"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                placeholder="240 × 100 × 85 سم"
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9CEBC]"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4A4136] mb-1">الخامات والمكونات</label>
              <input
                type="text"
                value={materials}
                onChange={(e) => setMaterials(e.target.value)}
                placeholder="خشب جوز طبيعي، رخام، جلد إيطالي"
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9CEBC]"
              />
            </div>
          </div>

          {/* Image URLs Manager */}
          <div>
            <label className="block text-xs font-bold text-[#4A4136] mb-1">روابط صور المنتج (Images URLs)</label>
            <div className="flex gap-2 mb-2">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 px-3 py-2 text-xs rounded-lg border border-[#D9CEBC]"
                dir="ltr"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="px-4 py-2 bg-[#1A1612] text-[#E5C384] text-xs font-bold rounded-lg flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة رابط</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {images.map((img, idx) => (
                <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-[#D9CEBC] group">
                  <img src={img} alt="Product" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#ECE4D8] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border border-[#D9CEBC] text-xs font-bold text-stone-600 hover:bg-stone-100"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-[#1A1612] hover:bg-[#342D26] text-[#E5C384] text-xs font-bold"
            >
              حفظ بيانات القطعة
            </button>
          </div>
        </form>
      </div>

      {/* Inline Category Creation Modal */}
      {isCategoryModalOpen && (
        <CategoryFormModal
          category={null}
          onClose={() => setIsCategoryModalOpen(false)}
          onSaved={(newCategory) => {
            setIsCategoryModalOpen(false);
            setCategoryId(newCategory.id);
          }}
        />
      )}
    </div>
  );
};
