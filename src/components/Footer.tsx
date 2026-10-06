import React from 'react';
import { Phone, MessageCircle, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { StoreSettings, Category } from '../types';

interface FooterProps {
  settings: StoreSettings;
  categories: Category[];
  onNavigate: (view: string, catId?: string | null) => void;
  onOpenAdmin: () => void;
  onOpenPrivacyTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  categories,
  onNavigate,
  onOpenAdmin,
  onOpenPrivacyTerms,
}) => {
  return (
    <footer className="bg-[#14110E] text-[#D4C8B5] border-t border-[#2A231C]">
      {/* Upper Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 text-right">
          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-[#221C16] border border-[#C8A265]/40 flex items-center justify-center text-[#E5C384]">
                <span className="font-serif text-xl font-bold">ب</span>
              </div>
              <div>
                <h3 className="text-xl font-black text-white font-heading">{settings.storeName}</h3>
                <span className="text-[10px] tracking-widest text-[#8A7B69] uppercase font-mono">
                  LUXURY FURNITURE & LIVING
                </span>
              </div>
            </div>

            <p className="text-xs text-[#A69986] leading-relaxed font-light">
              متجر وكتالوج أثاث فاخر يعكس قمة الذوق والراحة. نقدم تشكيلات مختارة بعناية لأجنحة النوم، غرف المعيشة، والمجالس الملكية بتشطيبات استثنائية.
            </p>

            <div className="pt-2 text-xs space-y-2 text-[#8A7B69]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C8A265] shrink-0" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C8A265] shrink-0" />
                <span dir="ltr">{settings.phone}</span>
              </div>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-[#2A231C] pb-2">
              روابط سريعة
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#E5C384] transition-colors">
                  الصفحة الرئيسية
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-[#E5C384] transition-colors">
                  كتالوج جميع المنتجات
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('offers')} className="hover:text-[#E5C384] text-[#E05A47] font-medium transition-colors">
                  العروض والتخفيضات
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inspiration')} className="hover:text-[#E5C384] transition-colors">
                  اكتشف الفخامة (الإلهام)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#E5C384] transition-colors">
                  من نحن
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#E5C384] transition-colors">
                  تواصل معنا
                </button>
              </li>
            </ul>
          </div>

          {/* Categories Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-[#2A231C] pb-2">
              أبرز التصنيفات
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {categories.slice(0, 8).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onNavigate('catalog', cat.id)}
                  className="text-right hover:text-[#E5C384] transition-colors truncate"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Connect & Social (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-[#2A231C] pb-2">
              تواصل ومتابعة
            </h4>
            <p className="text-xs text-[#A69986]">
              شاهد كواليس وصول الشحنات وأحدث جلسات تصوير الأثاث عبر قنواتنا:
            </p>

            <div className="flex flex-wrap gap-2 text-xs">
              <a
                href={`https://instagram.com/${settings.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded bg-[#221C16] border border-[#3A3026] text-[#E5C384] hover:border-[#C8A265] transition-colors"
              >
                Instagram
              </a>
              <a
                href={`https://tiktok.com/@${settings.tiktok.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded bg-[#221C16] border border-[#3A3026] text-[#E5C384] hover:border-[#C8A265] transition-colors"
              >
                TikTok
              </a>
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/30 transition-colors flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenPrivacyTerms}
                className="text-xs text-[#8A7B69] hover:text-[#D4C8B5] transition-colors"
              >
                سياسة الخصوصية والشروط والأحكام
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#221C16] py-5 px-4 bg-[#0E0C0A] text-xs text-[#7A6E5E]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} {settings.storeName}.
          </div>

          <div className="flex items-center gap-4">
            {/* Internal Staff Portal Link */}
            <button
              onClick={onOpenAdmin}
              className="text-[#8A7B69] hover:text-[#C8A265] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="دخول موظفي المحل لإدارة المنتجات وصناعة تصاميم السوشيال ميديا"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C8A265]" />
              <span>استوديو محتوى بصمة & لوحة الإدارة (داخلي)</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
