import React from 'react';
import {
  Package,
  Sparkles,
  Tag,
  ShoppingBag,
  Eye,
  Layers,
  CheckCircle,
  TrendingUp,
  Award,
  FolderTree
} from 'lucide-react';
import { Product, Category, CustomerOrder, SocialMediaDesign, StoreSettings } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface AdminDashboardStatsProps {
  products: Product[];
  categories?: Category[];
  orders: CustomerOrder[];
  designs: SocialMediaDesign[];
  settings: StoreSettings;
  onNavigateToTab: (tab: string) => void;
}

export const AdminDashboardStats: React.FC<AdminDashboardStatsProps> = ({
  products,
  categories = [],
  orders,
  designs,
  settings,
  onNavigateToTab,
}) => {
  const newProductsCount = products.filter((p) => p.isNewArrival).length;
  const discountedProductsCount = products.filter((p) => p.isDiscounted).length;
  const readyDesignsCount = designs.filter((d) => d.status === 'ready').length;
  const publishedDesignsCount = designs.filter((d) => d.status === 'published').length;
  const totalViews = products.reduce((sum, p) => sum + (p.viewsCount || 0), 0);
  const totalRevenue = orders
    .filter((o) => o.status === 'completed' || o.status === 'confirmed')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const topViewedProducts = [...products]
    .sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0))
    .slice(0, 4);

  const topOrderedProducts = [...products]
    .sort((a, b) => (b.ordersCount || 0) - (a.ordersCount || 0))
    .slice(0, 4);

  return (
    <div className="space-y-8 text-right">
      {/* Quick Action Navigation Bar */}
      <div className="bg-[#1A1612] text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold font-heading text-[#E5C384]">
            لوحة الإدارة الشاملة - بصمة عالم الفخامة للأثاث
          </h2>
          <p className="text-xs text-[#B8AA98] mt-0.5">
            التحكم المركزي بالأقسام والتصنيفات، قطع الأثاث، واستوديو تصميم إعلانات السوشيال ميديا.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateToTab('categories')}
            className="px-4 py-2 rounded-lg bg-[#2E261F] hover:bg-[#3D3229] text-[#E5C384] text-xs font-bold transition-colors flex items-center gap-1.5 border border-[#C8A265]/30 cursor-pointer"
          >
            <FolderTree className="w-4 h-4 text-[#C8A265]" />
            <span>إدارة التصنيفات ({categories.length})</span>
          </button>
          <button
            onClick={() => onNavigateToTab('products')}
            className="px-4 py-2 rounded-lg bg-[#C8A265] hover:bg-[#B38D50] text-[#14110E] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Package className="w-4 h-4" />
            <span>إدارة المنتجات ({products.length})</span>
          </button>
        </div>
      </div>

      {/* Top Metric Cards (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-[#ECE4D8] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-[#8A7B69] font-medium block mb-1">إجمالي قطع الأثاث</span>
            <span className="text-2xl font-black text-[#1A1612] font-heading">{products.length}</span>
            <div className="text-[11px] text-[#9E7E45] mt-1 font-medium">
              {newProductsCount} جديد • {discountedProductsCount} مخفض
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FAF6EE] text-[#9E7E45] flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#ECE4D8] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-[#8A7B69] font-medium block mb-1">تصاميم استوديو المحتوى</span>
            <span className="text-2xl font-black text-[#1A1612] font-heading">{designs.length}</span>
            <div className="text-[11px] text-emerald-600 mt-1 font-medium">
              {readyDesignsCount} جاهز للنشر • {publishedDesignsCount} تم نشره
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FAF6EE] text-[#9E7E45] flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#ECE4D8] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-[#8A7B69] font-medium block mb-1">طلبات المعاينة والحجز</span>
            <span className="text-2xl font-black text-[#1A1612] font-heading">{orders.length}</span>
            <div className="text-[11px] text-blue-600 mt-1 font-medium">
              قيمة المبيعات: {formatCurrency(totalRevenue, settings.currency)}
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FAF6EE] text-[#9E7E45] flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#ECE4D8] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-[#8A7B69] font-medium block mb-1">مشاهدات الكتالوج</span>
            <span className="text-2xl font-black text-[#1A1612] font-heading">{totalViews}</span>
            <div className="text-[11px] text-[#8A7B69] mt-1 font-medium">
              تفاعل العملاء مع تشكيلات المعرض
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FAF6EE] text-[#9E7E45] flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Analytics Breakdown & Quick Action Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Most Viewed Products (6 cols) */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-[#ECE4D8] shadow-xs">
          <div className="flex items-center justify-between mb-4 border-b border-[#F0EAE1] pb-3">
            <h3 className="text-base font-bold text-[#1A1612] font-heading flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#9E7E45]" />
              <span>القطع الأكثر مشاهدة واهتماماً</span>
            </h3>
            <button
              onClick={() => onNavigateToTab('products')}
              className="text-xs text-[#9E7E45] font-bold hover:underline"
            >
              عرض الكتالوج
            </button>
          </div>

          <div className="space-y-3">
            {topViewedProducts.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors">
                <div className="flex items-center gap-3">
                  <img src={p.images[0]} alt={p.name} className="w-11 h-11 rounded-lg object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-[#1A1612]">{p.name}</h4>
                    <span className="text-[11px] text-[#8A7B69]">{p.categoryName}</span>
                  </div>
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-[#1A1612] block">
                    {formatCurrency(p.price, settings.currency)}
                  </span>
                  <span className="text-[10px] text-stone-500 font-mono">
                    {p.viewsCount} مشاهدة
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Demanded Furniture (6 cols) */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-[#ECE4D8] shadow-xs">
          <div className="flex items-center justify-between mb-4 border-b border-[#F0EAE1] pb-3">
            <h3 className="text-base font-bold text-[#1A1612] font-heading flex items-center gap-2">
              <Award className="w-4 h-4 text-[#9E7E45]" />
              <span>القطع الأكثر طلباً وحجزاً</span>
            </h3>
            <button
              onClick={() => onNavigateToTab('orders')}
              className="text-xs text-[#9E7E45] font-bold hover:underline"
            >
              عرض الطلبات
            </button>
          </div>

          <div className="space-y-3">
            {topOrderedProducts.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors">
                <div className="flex items-center gap-3">
                  <img src={p.images[0]} alt={p.name} className="w-11 h-11 rounded-lg object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-[#1A1612]">{p.name}</h4>
                    <span className="text-[11px] text-emerald-700 font-medium">
                      {p.stockStatus === 'in_stock' ? 'متوفر للتسليم' : 'حسب الطلب'}
                    </span>
                  </div>
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-[#1A1612] block">
                    {formatCurrency(p.price, settings.currency)}
                  </span>
                  <span className="text-[10px] text-[#9E7E45] font-bold">
                    {p.ordersCount} طلب شراء
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
