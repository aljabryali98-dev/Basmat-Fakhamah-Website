import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Package,
  ShoppingBag,
  BarChart3,
  Settings,
  ArrowRight,
  ShieldCheck,
  Plus,
  FolderTree
} from 'lucide-react';
import { Product, Category, CustomerOrder, SocialMediaDesign, StoreSettings } from '../../types';
import { StudioEditor } from './StudioEditor';
import { ContentLibrary } from './ContentLibrary';
import { ProductsManager } from './ProductsManager';
import { CategoriesManager } from './CategoriesManager';
import { OrdersManager } from './OrdersManager';
import { AdminDashboardStats } from './AdminDashboardStats';
import { SettingsManager } from './SettingsManager';

interface AdminLayoutProps {
  products: Product[];
  categories: Category[];
  orders: CustomerOrder[];
  designs: SocialMediaDesign[];
  settings: StoreSettings;
  onExitAdmin: () => void;
  initialProductForStudio?: Product | null;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  products,
  categories,
  orders,
  designs,
  settings,
  onExitAdmin,
  initialProductForStudio,
}) => {
  const [currentTab, setCurrentTab] = useState<string>(
    initialProductForStudio ? 'studio' : 'stats'
  );
  const [studioPreselectedProduct, setStudioPreselectedProduct] = useState<Product | null>(
    initialProductForStudio || null
  );
  const [editingDesign, setEditingDesign] = useState<SocialMediaDesign | null>(null);
  const [productsCategoryFilter, setProductsCategoryFilter] = useState<string>('all');

  const handleOpenStudioForProduct = (product: Product) => {
    setStudioPreselectedProduct(product);
    setEditingDesign(null);
    setCurrentTab('studio');
  };

  const handleEditDesign = (design: SocialMediaDesign) => {
    setEditingDesign(design);
    setStudioPreselectedProduct(null);
    setCurrentTab('studio');
  };

  const handleNewDesign = () => {
    setEditingDesign(null);
    setStudioPreselectedProduct(null);
    setCurrentTab('studio');
  };

  const handleNavigateToProductsWithCategory = (catId: string) => {
    setProductsCategoryFilter(catId);
    setCurrentTab('products');
  };

  const tabs = [
    { id: 'stats', label: 'لوحة الإحصائيات العامة', icon: BarChart3 },
    { id: 'categories', label: 'إدارة الأقسام والتصنيفات', icon: FolderTree, count: categories.length },
    { id: 'products', label: 'إدارة قطع الأثاث والكتالوج', icon: Package, count: products.length },
    { id: 'studio', label: 'استوديو محتوى بصمة (مولد الإعلانات)', icon: Sparkles, highlight: true },
    { id: 'library', label: 'مكتبة التصاميم والمنشورات', icon: Layers },
    { id: 'orders', label: 'طلبات المعاينة والحجز', icon: ShoppingBag, badge: orders.filter((o) => o.status === 'pending').length },
    { id: 'settings', label: 'إعدادات المعرض والتواصل', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#1A1612]" dir="rtl">
      {/* Admin Top Navigation Bar */}
      <header className="bg-[#14110E] text-white border-b border-[#2B231B] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Internal Label */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-[#241E17] border border-[#C8A265]/40 flex items-center justify-center text-[#E5C384]">
                <ShieldCheck className="w-5 h-5 text-[#C8A265]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm sm:text-base font-heading text-white">
                    {settings.storeName}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-[#C8A265]/20 text-[#E5C384] border border-[#C8A265]/40">
                    بوابة الإدارة واستوديو المحتوى الداخلي
                  </span>
                </div>
              </div>
            </div>

            {/* Back to Public Store Front */}
            <button
              onClick={onExitAdmin}
              className="px-4 py-2 rounded-lg bg-[#241E17] hover:bg-[#342D26] text-[#E5C384] border border-[#C8A265]/30 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>العودة لمتجر العملاء</span>
              <ArrowRight className="w-4 h-4 transform rotate-180" />
            </button>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="bg-[#1C1814] border-t border-[#262019] px-4 overflow-x-auto">
          <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2 py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (tab.id === 'products') {
                      // Keep or reset category filter
                    }
                    setCurrentTab(tab.id);
                  }}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#C8A265] text-[#14110E] shadow-sm'
                      : tab.highlight
                      ? 'text-[#E5C384] hover:bg-[#2B231B] border border-[#C8A265]/30'
                      : 'text-[#B8AA98] hover:text-white hover:bg-[#2B231B]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-mono">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Admin Content View Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentTab === 'stats' && (
          <AdminDashboardStats
            products={products}
            categories={categories}
            orders={orders}
            designs={designs}
            settings={settings}
            onNavigateToTab={setCurrentTab}
          />
        )}

        {currentTab === 'categories' && (
          <CategoriesManager
            categories={categories}
            products={products}
            settings={settings}
            onNavigateToProductsWithCategory={handleNavigateToProductsWithCategory}
          />
        )}

        {currentTab === 'products' && (
          <ProductsManager
            products={products}
            categories={categories}
            settings={settings}
            initialCategoryFilter={productsCategoryFilter}
            onOpenStudioForProduct={handleOpenStudioForProduct}
            onNavigateToCategories={() => setCurrentTab('categories')}
          />
        )}

        {currentTab === 'studio' && (
          <StudioEditor
            products={products}
            settings={settings}
            preSelectedProduct={studioPreselectedProduct}
            editingDesign={editingDesign}
            onSaveComplete={() => setCurrentTab('library')}
          />
        )}

        {currentTab === 'library' && (
          <ContentLibrary
            designs={designs}
            products={products}
            settings={settings}
            onEditDesign={handleEditDesign}
            onNewDesign={handleNewDesign}
          />
        )}

        {currentTab === 'orders' && (
          <OrdersManager orders={orders} settings={settings} />
        )}

        {currentTab === 'settings' && (
          <SettingsManager settings={settings} />
        )}
      </main>
    </div>
  );
};
