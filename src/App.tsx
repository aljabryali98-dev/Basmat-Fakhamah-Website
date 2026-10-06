import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoriesSection } from './components/CategoriesSection';
import { OffersSection } from './components/OffersSection';
import { NewArrivalsSection } from './components/NewArrivalsSection';
import { ProductCard } from './components/ProductCard';
import { SearchFilterBar } from './components/SearchFilterBar';
import { InspirationGallery } from './components/InspirationGallery';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuickOrderModal } from './components/QuickOrderModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CartDrawer } from './components/CartDrawer';
import { TermsPrivacyModal } from './components/TermsPrivacyModal';
import { AdminLayout } from './components/admin/AdminLayout';
import { storeService } from './services/storeService';
import { Product } from './types';

export default function App() {
  // 1. Reactive Store State
  const [products, setProducts] = useState(() => storeService.getProducts());
  const [categories, setCategories] = useState(() => storeService.getCategories());
  const [settings, setSettings] = useState(() => storeService.getSettings());
  const [orders, setOrders] = useState(() => storeService.getOrders());
  const [designs, setDesigns] = useState(() => storeService.getDesigns());
  const [cart, setCart] = useState(() => storeService.getCart());
  const [wishlist, setWishlist] = useState<string[]>(() => storeService.getWishlist());

  // Subscribe to changes across the app
  useEffect(() => {
    const unsubscribe = storeService.subscribe(() => {
      setProducts(storeService.getProducts());
      setCategories(storeService.getCategories());
      setSettings(storeService.getSettings());
      setOrders(storeService.getOrders());
      setDesigns(storeService.getDesigns());
      setCart(storeService.getCart());
      setWishlist(storeService.getWishlist());
    });
    return unsubscribe;
  }, []);

  // 2. Navigation State
  const [activeView, setActiveView] = useState<'home' | 'catalog' | 'offers' | 'inspiration' | 'about' | 'contact' | 'admin'>('home');
  const [adminTargetProduct, setAdminTargetProduct] = useState<Product | null>(null);

  // 3. Modals & Drawers State
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [quickOrderProduct, setQuickOrderProduct] = useState<Product | null>(null);
  const [quickOrderColor, setQuickOrderColor] = useState<string | undefined>(undefined);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // 4. Catalog Filters & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState('الكل');
  const [onlyOffers, setOnlyOffers] = useState(false);
  const [onlyNew, setOnlyNew] = useState(false);
  const [sortBy, setSortBy] = useState('latest');

  // Navigation Helper
  const handleNavigate = (view: string, catId?: string | null) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveView(view as any);
    if (catId !== undefined) {
      setSelectedCategory(catId);
    }
  };

  const handleSelectCategoryFromHome = (catId: string) => {
    setSelectedCategory(catId);
    setActiveView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProductDetails = (product: Product) => {
    storeService.recordProductView(product.id);
    setSelectedProductForModal(product);
  };

  const handleOpenQuickOrder = (product: Product, color?: string) => {
    setQuickOrderProduct(product);
    setQuickOrderColor(color);
  };

  const handleToggleWishlist = (productId: string) => {
    storeService.toggleWishlist(productId);
  };

  const handleOpenStudioForProduct = (product: Product) => {
    setAdminTargetProduct(product);
    setActiveView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter & Sort Logic for Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = p.name.toLowerCase().includes(q);
          const matchesCode = p.code.toLowerCase().includes(q);
          const matchesCat = p.categoryName.toLowerCase().includes(q);
          const matchesMat = p.materials.toLowerCase().includes(q);
          if (!matchesName && !matchesCode && !matchesCat && !matchesMat) return false;
        }

        // Category
        if (selectedCategory && p.categoryId !== selectedCategory) {
          return false;
        }

        // Price range
        if (selectedPriceRange === 'under_5k' && p.price >= 5000) return false;
        if (selectedPriceRange === '5k_to_15k' && (p.price < 5000 || p.price > 15000)) return false;
        if (selectedPriceRange === 'above_15k' && p.price <= 15000) return false;

        // Material
        if (selectedMaterial !== 'الكل' && !p.materials.includes(selectedMaterial)) {
          return false;
        }

        // Only Offers
        if (onlyOffers && !p.isDiscounted) return false;

        // Only New
        if (onlyNew && !p.isNewArrival) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') return a.price - b.price;
        if (sortBy === 'price_high') return b.price - a.price;
        if (sortBy === 'most_viewed') return (b.viewsCount || 0) - (a.viewsCount || 0);
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [products, searchQuery, selectedCategory, selectedPriceRange, selectedMaterial, onlyOffers, onlyNew, sortBy]);

  // If Admin View is active, show the Internal Studio & Management Layout
  if (activeView === 'admin') {
    return (
      <AdminLayout
        products={products}
        categories={categories}
        orders={orders}
        designs={designs}
        settings={settings}
        initialProductForStudio={adminTargetProduct}
        onExitAdmin={() => {
          setAdminTargetProduct(null);
          setActiveView('home');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1612] flex flex-col justify-between selection:bg-[#C8A265]/30 selection:text-[#14110E]" dir="rtl">
      {/* 1. Global Navigation Header */}
      <Navbar
        settings={settings}
        categories={categories}
        activeView={activeView}
        currentView={activeView}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setCurrentView={(view) => handleNavigate(view)}
        onNavigate={handleNavigate}
        onOpenSearch={() => handleNavigate('catalog')}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAdmin={() => setActiveView('admin')}
      />

      {/* 2. Main Content Router */}
      <main className="flex-1">
        {/* VIEW: HOME */}
        {activeView === 'home' && (
          <>
            <Hero
              settings={settings}
              onExploreProducts={() => handleNavigate('catalog')}
              onBrowseCatalog={() => handleNavigate('catalog')}
              onContactUs={() => handleNavigate('contact')}
            />

            <CategoriesSection
              categories={categories}
              onSelectCategory={handleSelectCategoryFromHome}
            />

            <OffersSection
              products={products}
              settings={settings}
              onViewDetails={handleOpenProductDetails}
              onQuickOrder={handleOpenQuickOrder}
            />

            <NewArrivalsSection
              products={products}
              wishlist={wishlist}
              settings={settings}
              onToggleWishlist={handleToggleWishlist}
              onViewDetails={handleOpenProductDetails}
              onQuickOrder={handleOpenQuickOrder}
              onViewAllCatalog={() => handleNavigate('catalog')}
            />

            {/* Featured Catalog Preview */}
            <section className="py-20 bg-white border-t border-[#ECE4D8]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-xs font-bold tracking-widest text-[#9E7E45] uppercase mb-2 block">
                    تشكيلات حصرية
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1612] font-heading mb-3">
                    مختارات من روائع بصمة عالم الفخامة
                  </h2>
                  <p className="text-sm text-[#7A6E5E]">
                    تصاميم استثنائية متوفرة الآن للتسليم الفوري أو الطلب والتفصيل في صالة العرض.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.slice(0, 8).map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      isWishlisted={wishlist.includes(prod.id)}
                      onToggleWishlist={handleToggleWishlist}
                      onViewDetails={handleOpenProductDetails}
                      onQuickOrder={handleOpenQuickOrder}
                      settings={settings}
                    />
                  ))}
                </div>

                <div className="mt-12 text-center">
                  <button
                    onClick={() => handleNavigate('catalog')}
                    className="px-8 py-3.5 bg-[#1A1612] text-[#E5C384] text-xs sm:text-sm font-bold rounded-lg hover:bg-[#322A22] transition-colors shadow-md cursor-pointer"
                  >
                    عرض كافة القطع المتوفرة بالكتالوج ({products.length})
                  </button>
                </div>
              </div>
            </section>

            <InspirationGallery />
            <AboutSection settings={settings} onBrowseCatalog={() => handleNavigate('catalog')} />
            <ContactSection settings={settings} />
          </>
        )}

        {/* VIEW: CATALOG (FULL PRODUCT BROWSER & FILTERING) */}
        {activeView === 'catalog' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Catalog Page Header */}
            <div className="text-right mb-8">
              <span className="text-xs font-bold tracking-widest text-[#9E7E45] uppercase block mb-1">
                الكتالوج الشامل
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1612] font-heading">
                {selectedCategory
                  ? categories.find((c) => c.id === selectedCategory)?.name || 'أقسام الأثاث'
                  : 'كافة قطع الأثاث الفاخر'}
              </h1>
              <p className="text-xs sm:text-sm text-[#7A6E5E] mt-1">
                استعرض التفاصيل، المواصفات، والخامات، واطلب المعاينة أو التوصيل الفوري.
              </p>
            </div>

            {/* Filter Bar */}
            <SearchFilterBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categories}
              selectedPriceRange={selectedPriceRange}
              setSelectedPriceRange={setSelectedPriceRange}
              selectedMaterial={selectedMaterial}
              setSelectedMaterial={setSelectedMaterial}
              onlyOffers={onlyOffers}
              setOnlyOffers={setOnlyOffers}
              onlyNew={onlyNew}
              setOnlyNew={setOnlyNew}
              sortBy={sortBy}
              setSortBy={setSortBy}
              totalResultsCount={filteredProducts.length}
            />

            {/* Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#ECE4D8] p-16 text-center space-y-3">
                <p className="text-base text-[#574B3D] font-bold">لم نجد قطع أثاث مطابقة لخيارات البحث المحددة</p>
                <p className="text-xs text-[#8A7B69]">جرّب إزالة بعض الفلاتر أو البحث باسم منتج آخر.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                    setOnlyOffers(false);
                    setOnlyNew(false);
                  }}
                  className="px-5 py-2 rounded-lg bg-[#FAF6EE] text-[#9E7E45] border border-[#C8A265] text-xs font-bold hover:bg-[#FAF0E0]"
                >
                  إعادة ضبط البحث
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    isWishlisted={wishlist.includes(prod.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onViewDetails={handleOpenProductDetails}
                    onQuickOrder={handleOpenQuickOrder}
                    settings={settings}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW: OFFERS ONLY */}
        {activeView === 'offers' && (
          <div className="py-6">
            <OffersSection
              products={products}
              settings={settings}
              onViewDetails={handleOpenProductDetails}
              onQuickOrder={handleOpenQuickOrder}
            />
          </div>
        )}

        {/* VIEW: INSPIRATION */}
        {activeView === 'inspiration' && <InspirationGallery />}

        {/* VIEW: ABOUT */}
        {activeView === 'about' && <AboutSection settings={settings} onBrowseCatalog={() => handleNavigate('catalog')} />}

        {/* VIEW: CONTACT */}
        {activeView === 'contact' && <ContactSection settings={settings} />}
      </main>

      {/* 3. Global Luxury Footer */}
      <Footer
        settings={settings}
        categories={categories}
        onNavigate={handleNavigate}
        onOpenAdmin={() => setActiveView('admin')}
        onOpenPrivacyTerms={() => setIsPrivacyOpen(true)}
      />

      {/* 4. Modals & Drawers */}
      {selectedProductForModal && (
        <ProductDetailModal
          product={selectedProductForModal}
          onClose={() => setSelectedProductForModal(null)}
          onQuickOrder={handleOpenQuickOrder}
          onSelectProduct={handleOpenProductDetails}
          onOpenStudioWithProduct={handleOpenStudioForProduct}
          isWishlisted={wishlist.includes(selectedProductForModal.id)}
          onToggleWishlist={handleToggleWishlist}
          settings={settings}
        />
      )}

      {quickOrderProduct && (
        <QuickOrderModal
          product={quickOrderProduct}
          selectedColor={quickOrderColor}
          onClose={() => {
            setQuickOrderProduct(null);
            setQuickOrderColor(undefined);
          }}
          settings={settings}
        />
      )}

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        products={products}
        wishlistIds={wishlist}
        onToggleWishlist={handleToggleWishlist}
        onViewDetails={handleOpenProductDetails}
        settings={settings}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        settings={settings}
      />

      <TermsPrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        settings={settings}
      />
    </div>
  );
}
