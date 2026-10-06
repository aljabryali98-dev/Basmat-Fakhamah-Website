import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, MessageCircle, Menu, X, ShieldCheck, Sparkles, Phone, ChevronDown } from 'lucide-react';
import { StoreSettings, Category } from '../types';
import { storeService } from '../services/storeService';

interface NavbarProps {
  currentView?: string;
  activeView?: string;
  setCurrentView?: (view: string) => void;
  onNavigate?: (view: string, catId?: string | null) => void;
  selectedCategory?: string | null;
  setSelectedCategory?: (catId: string | null) => void;
  categories?: Category[];
  cartCount?: number;
  wishlistCount?: number;
  onOpenSearch?: () => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onOpenAdmin: () => void;
  settings: StoreSettings;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView: propCurrentView,
  activeView: propActiveView,
  setCurrentView,
  onNavigate,
  selectedCategory = null,
  setSelectedCategory,
  categories: propCategories,
  cartCount: propCartCount,
  wishlistCount: propWishlistCount,
  onOpenSearch,
  onOpenWishlist,
  onOpenCart,
  onOpenAdmin,
  settings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [internalWishlistCount, setInternalWishlistCount] = useState(() => storeService.getWishlist().length);
  const [internalCartCount, setInternalCartCount] = useState(() => storeService.getCart().reduce((sum, item) => sum + item.quantity, 0));
  const [categoriesDropdown, setCategoriesDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const currentView = propActiveView || propCurrentView || 'home';
  const categories = propCategories && propCategories.length > 0 ? propCategories : storeService.getCategories();
  const wishlistCount = propWishlistCount !== undefined ? propWishlistCount : internalWishlistCount;
  const cartCount = propCartCount !== undefined ? propCartCount : internalCartCount;

  useEffect(() => {
    const updateCounts = () => {
      setInternalWishlistCount(storeService.getWishlist().length);
      setInternalCartCount(storeService.getCart().reduce((sum, item) => sum + item.quantity, 0));
    };
    updateCounts();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('basmat-store-update', updateCounts);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('basmat-store-update', updateCounts);
    };
  }, []);

  const handleNav = (view: string, catId: string | null = null) => {
    if (onNavigate) {
      onNavigate(view, catId);
    } else if (setCurrentView) {
      setCurrentView(view);
    }
    if (setSelectedCategory) {
      setSelectedCategory(catId);
    }
    setMobileMenuOpen(false);
    setCategoriesDropdown(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchClick = () => {
    if (onOpenSearch) {
      onOpenSearch();
    } else {
      handleNav('catalog');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar */}
      {settings.showAnnouncement && (
        <div id="announcement-banner" className="bg-[#1C1814] text-[#E8DFD0] text-xs py-2 px-4 border-b border-[#C8A265]/20">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#C8A265] animate-pulse"></span>
              <span className="font-medium tracking-wide">{settings.announcementText}</span>
            </div>
            <div className="flex items-center gap-4 text-[#D1C7B7]">
              <a
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="hover:text-white flex items-center gap-1 transition-colors"
                id="header-phone-link"
              >
                <Phone className="w-3.5 h-3.5 text-[#C8A265]" />
                <span dir="ltr">{settings.phone}</span>
              </a>
              <span className="text-[#554A3E]">|</span>
              <button
                onClick={onOpenAdmin}
                className="hover:text-[#C8A265] text-[#A6957F] text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                title="الدخول للنظام الداخلي واستوديو المنشورات الخاص بالمحل"
                id="btn-admin-top-bar"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#C8A265]" />
                <span>إدارة المحل واستوديو المحتوى</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Luxury Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-[#E8E0D2] py-3.5'
            : 'bg-[#FAF8F5] border-b border-[#E8E0D2] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#241F1A] hover:text-[#C8A265] rounded-md transition-colors"
              aria-label="القائمة"
              id="btn-mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button
              onClick={handleSearchClick}
              className="p-2 text-[#241F1A] hover:text-[#C8A265] transition-colors"
              aria-label="البحث"
              id="btn-mobile-search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo & Monogram */}
          <div
            onClick={() => handleNav('home')}
            className="cursor-pointer flex items-center gap-3 select-none text-right"
            id="brand-logo"
          >
            <div className="w-10 h-10 rounded-sm bg-[#1F1914] border border-[#C8A265]/40 flex items-center justify-center text-[#E5C384] shadow-sm">
              <span className="font-serif text-xl font-bold tracking-wider">ب</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#1F1914] font-heading">
                بصمة عالم الفخامة
              </span>
              <span className="text-[10px] tracking-widest text-[#8A7B69] uppercase font-medium">
                LUXURY FURNITURE & LIVING
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#2E2822]">
            <button
              onClick={() => handleNav('home')}
              className={`transition-colors hover:text-[#C8A265] pb-1 border-b-2 cursor-pointer ${
                currentView === 'home' ? 'border-[#C8A265] text-[#1F1914] font-bold' : 'border-transparent'
              }`}
              id="nav-link-home"
            >
              الرئيسية
            </button>

            <button
              onClick={() => handleNav('catalog', null)}
              className={`transition-colors hover:text-[#C8A265] pb-1 border-b-2 cursor-pointer ${
                currentView === 'catalog' && !selectedCategory ? 'border-[#C8A265] text-[#1F1914] font-bold' : 'border-transparent'
              }`}
              id="nav-link-all-products"
            >
              جميع المنتجات
            </button>

            {/* Categories Mega Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setCategoriesDropdown(!categoriesDropdown)}
                className="flex items-center gap-1 hover:text-[#C8A265] transition-colors pb-1 cursor-pointer"
                id="nav-link-categories-dropdown"
              >
                <span>التصنيفات</span>
                <ChevronDown className="w-4 h-4 text-[#8A7B69] group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full right-0 w-80 bg-white border border-[#E8E0D2] shadow-xl rounded-lg p-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="grid grid-cols-1 gap-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleNav('catalog', cat.id)}
                      className="text-right px-3 py-2 text-sm text-[#2E2822] hover:bg-[#FAF6EE] hover:text-[#C8A265] rounded-md transition-colors flex items-center justify-between"
                    >
                      <span className="font-medium">{cat.name}</span>
                      <span className="text-xs text-[#9E9180]">عرض القطع</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleNav('catalog', 'cat-bedrooms')}
              className={`transition-colors hover:text-[#C8A265] pb-1 border-b-2 cursor-pointer ${
                currentView === 'catalog' && selectedCategory === 'cat-bedrooms' ? 'border-[#C8A265] text-[#1F1914] font-bold' : 'border-transparent'
              }`}
            >
              غرف النوم
            </button>

            <button
              onClick={() => handleNav('catalog', 'cat-living-rooms')}
              className={`transition-colors hover:text-[#C8A265] pb-1 border-b-2 cursor-pointer ${
                currentView === 'catalog' && selectedCategory === 'cat-living-rooms' ? 'border-[#C8A265] text-[#1F1914] font-bold' : 'border-transparent'
              }`}
            >
              غرف المعيشة
            </button>

            <button
              onClick={() => handleNav('catalog', 'cat-majlis')}
              className={`transition-colors hover:text-[#C8A265] pb-1 border-b-2 cursor-pointer ${
                currentView === 'catalog' && selectedCategory === 'cat-majlis' ? 'border-[#C8A265] text-[#1F1914] font-bold' : 'border-transparent'
              }`}
            >
              المجالس
            </button>

            <button
              onClick={() => handleNav('offers')}
              className={`transition-colors hover:text-[#C8A265] pb-1 border-b-2 cursor-pointer flex items-center gap-1 ${
                currentView === 'offers' ? 'border-[#C8A265] text-[#1F1914] font-bold' : 'border-transparent text-[#9E2B2B]'
              }`}
              id="nav-link-offers"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C8A265]" />
              <span>العروض الخاصة</span>
            </button>

            <button
              onClick={() => handleNav('inspiration')}
              className={`transition-colors hover:text-[#C8A265] pb-1 border-b-2 cursor-pointer ${
                currentView === 'inspiration' ? 'border-[#C8A265] text-[#1F1914] font-bold' : 'border-transparent'
              }`}
              id="nav-link-inspiration"
            >
              اكتشف الفخامة
            </button>

            <button
              onClick={() => handleNav('about')}
              className={`transition-colors hover:text-[#C8A265] pb-1 border-b-2 cursor-pointer ${
                currentView === 'about' ? 'border-[#C8A265] text-[#1F1914] font-bold' : 'border-transparent'
              }`}
              id="nav-link-about"
            >
              من نحن
            </button>

            <button
              onClick={() => handleNav('contact')}
              className={`transition-colors hover:text-[#C8A265] pb-1 border-b-2 cursor-pointer ${
                currentView === 'contact' ? 'border-[#C8A265] text-[#1F1914] font-bold' : 'border-transparent'
              }`}
              id="nav-link-contact"
            >
              تواصل معنا
            </button>
          </div>

          {/* Action Icons (Search, Wishlist, Cart, WhatsApp) */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSearchClick}
              className="hidden lg:flex p-2 text-[#241F1A] hover:text-[#C8A265] hover:bg-[#F3ECE0]/50 rounded-full transition-colors cursor-pointer"
              title="البحث في الأثاث"
              id="btn-desktop-search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-[#241F1A] hover:text-[#C8A265] hover:bg-[#F3ECE0]/50 rounded-full transition-colors cursor-pointer"
              title="المفضلة"
              id="btn-wishlist-toggle"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C8A265] text-[#19140F] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart / Quotation */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-[#241F1A] hover:text-[#C8A265] hover:bg-[#F3ECE0]/50 rounded-full transition-colors cursor-pointer"
              title="سلة الطلب والاستفسار"
              id="btn-cart-toggle"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#1F1914] text-[#E5C384] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Direct WhatsApp CTA */}
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                'مرحباً، أود الاستفسار عن تشكيلة الأثاث المتوفرة لدى بصمة عالم الفخامة.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-md bg-[#25D366] text-white text-xs font-bold hover:bg-[#20ba59] transition-all shadow-sm"
              id="btn-whatsapp-direct"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>واتساب</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative mr-auto w-4/5 max-w-sm bg-[#FAF8F5] h-full shadow-2xl overflow-y-auto p-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E8E0D2] pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-sm bg-[#1F1914] text-[#E5C384] flex items-center justify-center font-bold font-serif">
                    ب
                  </div>
                  <span className="font-bold text-[#1F1914]">بصمة عالم الفخامة</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-gray-500 hover:text-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col space-y-3 text-right">
                <button
                  onClick={() => handleNav('home')}
                  className="py-2 px-3 text-[#1F1914] hover:bg-[#EFE9DF] rounded font-medium text-sm text-right"
                >
                  الرئيسية
                </button>
                <button
                  onClick={() => handleNav('catalog')}
                  className="py-2 px-3 text-[#1F1914] hover:bg-[#EFE9DF] rounded font-medium text-sm text-right"
                >
                  تصفح جميع المنتجات
                </button>
                <button
                  onClick={() => handleNav('offers')}
                  className="py-2 px-3 text-[#9E2B2B] hover:bg-[#EFE9DF] rounded font-medium text-sm text-right flex items-center justify-between"
                >
                  <span>العروض الخاصة</span>
                  <Sparkles className="w-4 h-4 text-[#C8A265]" />
                </button>
                <button
                  onClick={() => handleNav('inspiration')}
                  className="py-2 px-3 text-[#1F1914] hover:bg-[#EFE9DF] rounded font-medium text-sm text-right"
                >
                  اكتشف الفخامة (معرض الإلهام)
                </button>
                <div className="border-t border-[#E8E0D2] pt-3">
                  <span className="text-xs font-bold text-[#8A7B69] px-3 block mb-2">أقسام الأثاث</span>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleNav('catalog', cat.id)}
                      className="w-full text-right py-1.5 px-3 text-xs text-[#3E352B] hover:bg-[#EFE9DF] rounded"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
                <div className="border-t border-[#E8E0D2] pt-3">
                  <button
                    onClick={() => handleNav('about')}
                    className="w-full py-2 px-3 text-[#1F1914] hover:bg-[#EFE9DF] rounded font-medium text-sm text-right"
                  >
                    عن بصمة عالم الفخامة
                  </button>
                  <button
                    onClick={() => handleNav('contact')}
                    className="w-full py-2 px-3 text-[#1F1914] hover:bg-[#EFE9DF] rounded font-medium text-sm text-right"
                  >
                    تواصل معنا وحجز موعد
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Footer Area */}
            <div className="border-t border-[#E8E0D2] pt-4 space-y-3">
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#25D366] text-white rounded font-bold text-xs"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>محادثة واتساب المباشرة</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-[#8A7B69] hover:text-[#1F1914] bg-[#EFE9DF] rounded"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#C8A265]" />
                <span>لوحة الإدارة واستوديو المحتوى (داخلي)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
