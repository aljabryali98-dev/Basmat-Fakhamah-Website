import React, { useState } from 'react';
import { Search, Download, Trash2, Edit3, Sparkles, Filter, ExternalLink, Tag } from 'lucide-react';
import { SocialMediaDesign, Product, StoreSettings, DesignStatus } from '../../types';
import { storeService } from '../../services/storeService';
import { exportSocialDesignAsImage } from './CanvasExporter';

interface ContentLibraryProps {
  designs: SocialMediaDesign[];
  products: Product[];
  settings: StoreSettings;
  onEditDesign: (design: SocialMediaDesign) => void;
  onNewDesign: () => void;
}

export const ContentLibrary: React.FC<ContentLibraryProps> = ({
  designs,
  products,
  settings,
  onEditDesign,
  onNewDesign,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [exportingId, setExportingId] = useState<string | null>(null);

  const filteredDesigns = designs.filter((d) => {
    const matchesSearch =
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.customHeadline.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
    const matchesPlatform = platformFilter === 'all' || d.format === platformFilter;

    return matchesSearch && matchesStatus && matchesPlatform;
  });

  const handleDelete = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا التصميم التسويقي من الأرشيف؟')) {
      storeService.deleteDesign(id);
    }
  };

  const handleExport = async (design: SocialMediaDesign) => {
    setExportingId(design.id);
    try {
      await exportSocialDesignAsImage(design, settings);
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء تحميل الصورة.');
    } finally {
      setExportingId(null);
    }
  };

  const getStatusBadge = (status: DesignStatus) => {
    switch (status) {
      case 'published':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">تم النشر</span>;
      case 'ready':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">جاهز للنشر</span>;
      case 'draft':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">مسودة</span>;
      case 'archived':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-100 text-stone-700">مؤرشف</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#ECE4D8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-right">
        <div>
          <h2 className="text-xl font-bold font-heading text-[#1A1612]">
            مكتبة المحتوى وتصاميم السوشيال ميديا
          </h2>
          <p className="text-xs text-[#7A6E5E] mt-1">
            أرشيف المنشورات والإعلانات المعدة مسبقاً لمنتجات بصمة عالم الفخامة جاهزة للتصدير وإعادة النشر.
          </p>
        </div>

        <button
          onClick={onNewDesign}
          className="px-5 py-2.5 rounded-lg bg-[#1A1612] text-[#E5C384] text-xs font-bold hover:bg-[#342D26] transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#C8A265]" />
          <span>إنشاء تصميم إعلاني جديد</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-[#ECE4D8] flex flex-wrap items-center justify-between gap-3 text-right">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="بحث في التصاميم والمنتجات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-[#D9CEBC] bg-[#FAF8F5]"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-[#D9CEBC] bg-[#FAF8F5]"
          >
            <option value="all">جميع الحالات</option>
            <option value="ready">جاهز للنشر</option>
            <option value="published">تم النشر</option>
            <option value="draft">مسودة</option>
            <option value="archived">مؤرشف</option>
          </select>

          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-[#D9CEBC] bg-[#FAF8F5]"
          >
            <option value="all">كافة المقاسات</option>
            <option value="ig_post">Instagram Post (1:1)</option>
            <option value="ig_portrait">Instagram Portrait (4:5)</option>
            <option value="ig_story">Story (9:16)</option>
            <option value="fb_post">Facebook (4:5)</option>
          </select>
        </div>
      </div>

      {/* Designs Grid */}
      {filteredDesigns.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#ECE4D8] py-16 text-center space-y-3">
          <p className="text-sm text-[#7A6E5E]">لا توجد تصاميم مطابقة للمعايير المحددة</p>
          <button
            onClick={onNewDesign}
            className="text-xs text-[#9E7E45] font-bold hover:underline"
          >
            ابدأ بإنشاء تصميم جديد الآن
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDesigns.map((d) => (
            <div
              key={d.id}
              className="bg-white rounded-2xl border border-[#ECE4D8] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between text-right"
            >
              {/* Preview Image Frame */}
              <div className="relative aspect-4/3 bg-[#1A1612] overflow-hidden group">
                <img
                  src={d.productImage}
                  alt={d.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />

                <div className="absolute top-3 right-3">{getStatusBadge(d.status)}</div>

                <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-xs text-[#E5C384] text-[10px] font-mono px-2 py-0.5 rounded">
                  {d.format.toUpperCase()}
                </div>
              </div>

              {/* Card Meta Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] text-[#8A7B69] block mb-1">
                    مرتبط بـ: {d.productName}
                  </span>
                  <h3 className="text-sm font-bold text-[#1A1612] line-clamp-1 mb-1 font-heading">
                    {d.customHeadline || d.title}
                  </h3>
                  <p className="text-xs text-[#736554] line-clamp-2 font-light">
                    {d.customSubhead}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F0EAE1] flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-[#9E7E45]">
                    <Tag className="w-3 h-3" />
                    <span>سعر الإعلان: {d.temporaryPrice} {settings.currency}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleExport(d)}
                      disabled={exportingId === d.id}
                      className="p-2 text-[#1A1612] hover:bg-[#FAF6EE] rounded-lg transition-colors"
                      title="تحميل كصورة PNG عالية الجودة"
                    >
                      <Download className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onEditDesign(d)}
                      className="p-2 text-[#9E7E45] hover:bg-[#FAF6EE] rounded-lg transition-colors"
                      title="تعديل في المحرر"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(d.id)}
                      className="p-2 text-stone-400 hover:text-red-600 rounded-lg transition-colors"
                      title="حذف التصميم"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
