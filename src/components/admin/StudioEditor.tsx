import React, { useState, useEffect } from 'react';
import {
  Download,
  Save,
  Layers,
  Sparkles,
  Smartphone,
  Eye,
  Check,
  RotateCcw,
  Palette,
  Sliders,
  Type,
  Phone,
  MessageCircle,
  Tag,
  Share2,
  ZoomIn,
  Move
} from 'lucide-react';
import { Product, SocialMediaDesign, DesignTemplate, SocialPlatformFormat, DesignTheme, DesignStatus, StoreSettings } from '../../types';
import { initialTemplates } from '../../data/templatesData';
import { storeService } from '../../services/storeService';
import { exportSocialDesignAsImage } from './CanvasExporter';
import { formatCurrency } from '../../utils/formatters';

interface StudioEditorProps {
  products: Product[];
  settings: StoreSettings;
  preSelectedProduct?: Product | null;
  editingDesign?: SocialMediaDesign | null;
  onSaveComplete?: () => void;
}

export const StudioEditor: React.FC<StudioEditorProps> = ({
  products,
  settings,
  preSelectedProduct,
  editingDesign,
  onSaveComplete,
}) => {
  // 1. Core Selection State
  const [selectedProductId, setSelectedProductId] = useState<string>(
    editingDesign?.productId || preSelectedProduct?.id || products[0]?.id || ''
  );
  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];

  const [selectedFormat, setSelectedFormat] = useState<SocialPlatformFormat>(
    editingDesign?.format || 'ig_post'
  );
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    editingDesign?.templateId || 'tpl-new-arrival'
  );
  const [selectedTheme, setSelectedTheme] = useState<DesignTheme>(
    editingDesign?.theme || 'dark_luxury'
  );

  // 2. Custom Content & Overrides
  const [headline, setHeadline] = useState<string>(
    editingDesign?.customHeadline || 'فخامة تتجدد في كل تفصيلة'
  );
  const [subhead, setSubhead] = useState<string>(
    editingDesign?.customSubhead || selectedProduct?.shortDescription || ''
  );
  const [tagline, setTagline] = useState<string>(
    editingDesign?.customTagline || 'بصمة عالم الفخامة - إتقان يفوق التوقعات'
  );
  const [badgeText, setBadgeText] = useState<string>(
    editingDesign?.badgeText || (selectedProduct?.isDiscounted ? `خصم حصري ${selectedProduct.discountPercentage}%` : 'وصل حديثاً')
  );

  // 3. Temporary Price Controls (Requirement #16)
  const [showPrice, setShowPrice] = useState<boolean>(editingDesign?.showPrice ?? true);
  const [tempPrice, setTempPrice] = useState<number>(
    editingDesign?.temporaryPrice ?? (selectedProduct?.price || 0)
  );
  const [showOldPrice, setShowOldPrice] = useState<boolean>(editingDesign?.showOldPrice ?? true);
  const [tempOldPrice, setTempOldPrice] = useState<number>(
    editingDesign?.temporaryOriginalPrice ?? (selectedProduct?.originalPrice || 0)
  );
  const [alsoUpdateCatalogPrice, setAlsoUpdateCatalogPrice] = useState(false);

  // 4. Image Adjustments
  const [imageScale, setImageScale] = useState<number>(editingDesign?.imageScale || 1);
  const [imageOffsetX, setImageOffsetX] = useState<number>(editingDesign?.imageOffsetX || 0);
  const [imageOffsetY, setImageOffsetY] = useState<number>(editingDesign?.imageOffsetY || 0);

  // 5. Elements Visibility
  const [showLogo, setShowLogo] = useState<boolean>(editingDesign?.showLogo ?? true);
  const [showContact, setShowContact] = useState<boolean>(editingDesign?.showContact ?? true);
  const [showPhone, setShowPhone] = useState<boolean>(editingDesign?.showPhone ?? true);
  const [showWhatsapp, setShowWhatsapp] = useState<boolean>(editingDesign?.showWhatsapp ?? true);
  const [showHandle, setShowHandle] = useState<boolean>(editingDesign?.showHandle ?? true);
  const [showSpecs, setShowSpecs] = useState<boolean>(editingDesign?.showSpecs ?? true);

  // 6. Status & Save Feedback
  const [designStatus, setDesignStatus] = useState<DesignStatus>(editingDesign?.status || 'ready');
  const [isExporting, setIsExporting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'template' | 'content' | 'pricing' | 'image' | 'theme'>('template');

  // When selected product changes, pre-populate if not editing existing design
  useEffect(() => {
    if (!editingDesign && selectedProduct) {
      setTempPrice(selectedProduct.price);
      setTempOldPrice(selectedProduct.originalPrice || Math.round(selectedProduct.price * 1.2));
      setSubhead(selectedProduct.shortDescription);
      if (selectedProduct.isDiscounted) {
        setBadgeText(`خصم خاص ${selectedProduct.discountPercentage}%`);
      } else if (selectedProduct.isNewArrival) {
        setBadgeText('وصل حديثاً 2026');
      } else {
        setBadgeText('قطعة حصرية');
      }
    }
  }, [selectedProductId]);

  // When template changes, apply suggested theme & copy
  const handleSelectTemplate = (tpl: DesignTemplate) => {
    setSelectedTemplateId(tpl.id);
    setSelectedTheme(tpl.defaultTheme);
    setSelectedFormat(tpl.defaultFormat);
    setHeadline(tpl.sampleHeadline);
    setBadgeText(tpl.badge);
  };

  // Compile current design object
  const getCurrentDesign = (): SocialMediaDesign => {
    return {
      id: editingDesign?.id || 'des-' + Date.now(),
      title: `${selectedProduct?.name || 'تصميم'} - ${formatLabels[selectedFormat].name}`,
      productId: selectedProduct?.id || '',
      productName: selectedProduct?.name || '',
      productImage: selectedProduct?.images[0] || '',
      format: selectedFormat,
      templateId: selectedTemplateId,
      theme: selectedTheme,
      customHeadline: headline,
      customSubhead: subhead,
      customTagline: tagline,
      badgeText,
      showPrice,
      temporaryPrice: tempPrice,
      temporaryOriginalPrice: tempOldPrice,
      temporaryDiscount: tempOldPrice > tempPrice ? Math.round(((tempOldPrice - tempPrice) / tempOldPrice) * 100) : 0,
      showOldPrice,
      showLogo,
      showContact,
      showPhone,
      showWhatsapp,
      showHandle,
      showSpecs,
      imageScale,
      imageOffsetX,
      imageOffsetY,
      status: designStatus,
      createdAt: editingDesign?.createdAt || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
  };

  const handleSaveDesign = () => {
    const design = getCurrentDesign();
    storeService.saveDesign(design);

    if (alsoUpdateCatalogPrice && selectedProduct) {
      storeService.updateProductPrice(selectedProduct.id, tempPrice, tempOldPrice > tempPrice ? tempOldPrice : undefined);
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
    if (onSaveComplete) onSaveComplete();
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const design = getCurrentDesign();
      await exportSocialDesignAsImage(design, settings);
    } catch (err) {
      console.error('Export error:', err);
      alert('حدث خطأ أثناء تصدير الصورة. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsExporting(false);
    }
  };

  // Format dimensions metadata
  const formatLabels: Record<SocialPlatformFormat, { name: string; dims: string; aspectClass: string }> = {
    ig_post: { name: 'Instagram Post', dims: '1080 × 1080 (1:1)', aspectClass: 'aspect-square' },
    ig_portrait: { name: 'Instagram Portrait', dims: '1080 × 1350 (4:5)', aspectClass: 'aspect-4/5' },
    ig_story: { name: 'Instagram Story', dims: '1080 × 1920 (9:16)', aspectClass: 'aspect-9/16' },
    fb_post: { name: 'Facebook Post', dims: '1200 × 1500 (4:5)', aspectClass: 'aspect-4/5' },
    fb_story: { name: 'Facebook Story', dims: '1080 × 1920 (9:16)', aspectClass: 'aspect-9/16' },
    reel_cover: { name: 'Reels / TikTok Cover', dims: '1080 × 1920 (9:16)', aspectClass: 'aspect-9/16' },
  };

  // Theme styling for live mockup frame
  const getThemeStyles = () => {
    switch (selectedTheme) {
      case 'royal_gold':
        return {
          bg: 'bg-[#1F1710]',
          text: 'text-[#FAF6EE]',
          subtext: 'text-[#D9CDBA]',
          accent: 'text-[#D4AF37]',
          border: 'border-[#D4AF37]',
          card: 'bg-[#2A1F16]/90',
        };
      case 'warm_walnut':
        return {
          bg: 'bg-[#261C14]',
          text: 'text-[#FDFBF7]',
          subtext: 'text-[#C7B299]',
          accent: 'text-[#DEB887]',
          border: 'border-[#DEB887]',
          card: 'bg-[#36271D]/90',
        };
      case 'ivory_chic':
        return {
          bg: 'bg-[#F7F4EE]',
          text: 'text-[#1E1B18]',
          subtext: 'text-[#61594F]',
          accent: 'text-[#9E7E45]',
          border: 'border-[#9E7E45]',
          card: 'bg-white/95 shadow-md',
        };
      case 'emerald_night':
        return {
          bg: 'bg-[#0D1C17]',
          text: 'text-[#F4FAF7]',
          subtext: 'text-[#A8C3B8]',
          accent: 'text-[#E5C07B]',
          border: 'border-[#E5C07B]',
          card: 'bg-[#132A23]/90',
        };
      case 'pure_minimal':
        return {
          bg: 'bg-[#FFFFFF]',
          text: 'text-[#111111]',
          subtext: 'text-[#666666]',
          accent: 'text-[#1A1A1A]',
          border: 'border-[#333333]',
          card: 'bg-[#F8F8F8] shadow-xs',
        };
      case 'dark_luxury':
      default:
        return {
          bg: 'bg-[#121110]',
          text: 'text-[#FFFFFF]',
          subtext: 'text-[#D1C7B7]',
          accent: 'text-[#C8A265]',
          border: 'border-[#C8A265]',
          card: 'bg-[#1C1917]/90',
        };
    }
  };

  const themeStyle = getThemeStyles();

  return (
    <div className="space-y-6">
      {/* Studio Header Bar */}
      <div className="bg-[#1A1612] text-white p-6 rounded-2xl border border-[#C8A265]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#271E16] text-[#E5C384] text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A265]" />
            <span>نظام الإدارة الداخلية - استوديو محتوى بصمة</span>
          </div>
          <h2 className="text-2xl font-bold font-heading text-[#FAF6EE]">
            محرر ومولد منشورات السوشيال ميديا للمحل
          </h2>
          <p className="text-xs text-[#B8AA97] mt-1">
            أنشئ، صمم، واطبع منشورات وإعلانات احترافية لمنتجات بصمة عالم الفخامة للنشر على إنستغرام، فيسبوك، تيك توك، وواتساب.
          </p>
        </div>

        {/* Top Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSaveDesign}
            className="px-4 py-2.5 rounded-lg bg-[#2E241C] hover:bg-[#3D3025] text-[#E5C384] border border-[#C8A265]/40 text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
          >
            {saveSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
            <span>{saveSuccess ? 'تم الحفظ بالمكتبة!' : 'حفظ التصميم'}</span>
          </button>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-5 py-2.5 rounded-lg bg-[#C8A265] hover:bg-[#d8b375] text-[#14110E] text-xs font-extrabold transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'جاري التصدير...' : 'تصدير صورة عالية الدقة (PNG)'}</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid: Controls (Left) and Live Canvas Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= CONTROLS SIDEBAR (7 cols) ================= */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#ECE4D8] p-6 shadow-xs space-y-6 text-right">
          {/* Step 1: Select Product */}
          <div>
            <label className="block text-xs font-bold text-[#4A4136] mb-2">
              1. اختر المنتج المطلوب تصميم إعلان له:
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full px-4 py-2.5 text-sm bg-[#FAF8F5] border border-[#D9CEBC] rounded-xl focus:ring-2 focus:ring-[#C8A265]"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.categoryName} ({formatCurrency(p.price, settings.currency)})
                </option>
              ))}
            </select>
          </div>

          {/* Step 2: Format & Platform Selector */}
          <div>
            <label className="block text-xs font-bold text-[#4A4136] mb-2">
              2. حدد مقاس المنصة والمقاس الإعلاني:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(Object.keys(formatLabels) as SocialPlatformFormat[]).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setSelectedFormat(fmt)}
                  className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                    selectedFormat === fmt
                      ? 'bg-[#1A1612] text-[#E5C384] border-[#1A1612] shadow-sm'
                      : 'bg-[#FAF8F5] text-[#544A3D] border-[#E2D8C9] hover:bg-[#F3ECE0]'
                  }`}
                >
                  <span className="font-bold text-xs block truncate">{formatLabels[fmt].name}</span>
                  <span className="text-[10px] opacity-70 font-mono" dir="ltr">{formatLabels[fmt].dims}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Tabs for Fine-Tuning */}
          <div className="border-t border-[#ECE4D8] pt-4">
            <div className="flex border-b border-[#ECE4D8] mb-4 gap-1 overflow-x-auto pb-1">
              <button
                onClick={() => setActiveTab('template')}
                className={`px-3 py-1.5 text-xs font-bold rounded-t-lg transition-colors ${
                  activeTab === 'template' ? 'border-b-2 border-[#C8A265] text-[#1A1612] font-black' : 'text-[#8A7B69]'
                }`}
              >
                القوالب الجاهزة
              </button>
              <button
                onClick={() => setActiveTab('content')}
                className={`px-3 py-1.5 text-xs font-bold rounded-t-lg transition-colors ${
                  activeTab === 'content' ? 'border-b-2 border-[#C8A265] text-[#1A1612] font-black' : 'text-[#8A7B69]'
                }`}
              >
                النصوص والعناوين
              </button>
              <button
                onClick={() => setActiveTab('pricing')}
                className={`px-3 py-1.5 text-xs font-bold rounded-t-lg transition-colors ${
                  activeTab === 'pricing' ? 'border-b-2 border-[#C8A265] text-[#1A1612] font-black' : 'text-[#8A7B69]'
                }`}
              >
                الأسعار والعروض
              </button>
              <button
                onClick={() => setActiveTab('image')}
                className={`px-3 py-1.5 text-xs font-bold rounded-t-lg transition-colors ${
                  activeTab === 'image' ? 'border-b-2 border-[#C8A265] text-[#1A1612] font-black' : 'text-[#8A7B69]'
                }`}
              >
                موضع الصورة والزووم
              </button>
              <button
                onClick={() => setActiveTab('theme')}
                className={`px-3 py-1.5 text-xs font-bold rounded-t-lg transition-colors ${
                  activeTab === 'theme' ? 'border-b-2 border-[#C8A265] text-[#1A1612] font-black' : 'text-[#8A7B69]'
                }`}
              >
                الألوان والخيارات
              </button>
            </div>

            {/* TAB 1: Ready Templates */}
            {activeTab === 'template' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto p-1">
                {initialTemplates.map((tpl) => (
                  <div
                    key={tpl.id}
                    onClick={() => handleSelectTemplate(tpl)}
                    className={`p-3 rounded-xl border text-right cursor-pointer transition-all ${
                      selectedTemplateId === tpl.id
                        ? 'border-[#C8A265] bg-[#FAF6EE] ring-2 ring-[#C8A265]/20'
                        : 'border-[#ECE4D8] bg-[#FAF8F5] hover:bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-xs text-[#1A1612]">{tpl.name}</span>
                      <span className="text-[10px] bg-[#EAE1D3] text-[#6E5D49] px-2 py-0.5 rounded">
                        {tpl.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#736554] line-clamp-1">{tpl.description}</p>
                    <span className="text-[10px] text-[#9E7E45] font-bold mt-1 block">شارة: {tpl.badge}</span>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 2: Text Customization */}
            {activeTab === 'content' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#4A4136] mb-1">العنوان الرئيسي للإعلان:</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9CEBC]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A4136] mb-1">العنوان الفرعي / الوصف التسويقي:</label>
                  <textarea
                    rows={2}
                    value={subhead}
                    onChange={(e) => setSubhead(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9CEBC]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#4A4136] mb-1">نص الشارة الترويجية:</label>
                    <input
                      type="text"
                      value={badgeText}
                      onChange={(e) => setBadgeText(e.target.value)}
                      placeholder="وصل حديثاً / خصم 20%"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9CEBC]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#4A4136] mb-1">شعار / عبارة العلامة التجارية:</label>
                    <input
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9CEBC]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Pricing Controls (Requirement #16) */}
            {activeTab === 'pricing' && (
              <div className="space-y-4">
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                  💡 <strong>ملاحظة للمسؤول:</strong> تعديل السعر هنا هو سعر خاص بالتصميم فقط، ولن يؤثر على السعر في المتجر إلا إذا قمت بتفعيل خيار "تحديث السعر في الكتالوج أيضاً".
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-xs font-bold text-[#1A1612] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showPrice}
                      onChange={(e) => setShowPrice(e.target.checked)}
                      className="rounded accent-[#C8A265]"
                    />
                    <span>إظهار بطاقة السعر في المنشور</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-medium text-[#1A1612] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showOldPrice}
                      onChange={(e) => setShowOldPrice(e.target.checked)}
                      className="rounded accent-[#C8A265]"
                    />
                    <span>إظهار السعر السابق وشطب الخصم</span>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#4A4136] mb-1">
                      السعر الحالي في التصميم ({settings.currency}):
                    </label>
                    <input
                      type="number"
                      value={tempPrice}
                      onChange={(e) => setTempPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm font-bold rounded-lg border border-[#D9CEBC]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#4A4136] mb-1">
                      السعر السابق قبل الخصم ({settings.currency}):
                    </label>
                    <input
                      type="number"
                      value={tempOldPrice}
                      onChange={(e) => setTempOldPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#D9CEBC]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2 text-xs text-[#9E7E45] font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={alsoUpdateCatalogPrice}
                      onChange={(e) => setAlsoUpdateCatalogPrice(e.target.checked)}
                      className="rounded accent-[#C8A265]"
                    />
                    <span>تحديث سعر المنتج في قاعدة بيانات المتجر أيضاً عند الحفظ</span>
                  </label>
                </div>
              </div>
            )}

            {/* TAB 4: Image Adjustments */}
            {activeTab === 'image' && (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-[#4A4136] mb-1">
                    <span>حجم وتكبير المنتج (Scale): {Math.round(imageScale * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.8"
                    max="1.5"
                    step="0.05"
                    value={imageScale}
                    onChange={(e) => setImageScale(Number(e.target.value))}
                    className="w-full accent-[#C8A265]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#4A4136] mb-1">إزاحة أفقية (X Offset):</label>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      value={imageOffsetX}
                      onChange={(e) => setImageOffsetX(Number(e.target.value))}
                      className="w-full accent-[#C8A265]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#4A4136] mb-1">إزاحة رأسية (Y Offset):</label>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      value={imageOffsetY}
                      onChange={(e) => setImageOffsetY(Number(e.target.value))}
                      className="w-full accent-[#C8A265]"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setImageScale(1);
                    setImageOffsetX(0);
                    setImageOffsetY(0);
                  }}
                  className="text-xs text-[#8A7B69] hover:text-[#1A1612] flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>إعادة ضبط الموضع</span>
                </button>
              </div>
            )}

            {/* TAB 5: Themes & Visibility */}
            {activeTab === 'theme' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#4A4136] mb-2">طابع وخلفية التصميم:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'dark_luxury', name: 'أونيكس فاحم وذهب', color: '#14110E' },
                      { id: 'royal_gold', name: 'بني ملكي مع ذهبي', color: '#241910' },
                      { id: 'warm_walnut', name: 'خشب جوز ونحاس', color: '#2D2015' },
                      { id: 'ivory_chic', name: 'عاجي شامبانيا', color: '#F7F4EE' },
                      { id: 'emerald_night', name: 'زمردي ملوكي', color: '#0F211B' },
                      { id: 'pure_minimal', name: 'أبيض ناصع معاصر', color: '#FFFFFF' },
                    ].map((th) => (
                      <button
                        key={th.id}
                        type="button"
                        onClick={() => setSelectedTheme(th.id as DesignTheme)}
                        className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-2 cursor-pointer ${
                          selectedTheme === th.id
                            ? 'border-[#C8A265] ring-2 ring-[#C8A265]/30'
                            : 'border-[#E2D8C9]'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-black/20 shrink-0"
                          style={{ backgroundColor: th.color }}
                        />
                        <span className="truncate">{th.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#ECE4D8]">
                  <label className="block text-xs font-bold text-[#4A4136] mb-2">عناصر الهوية والتواصل:</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showLogo}
                        onChange={(e) => setShowLogo(e.target.checked)}
                        className="rounded accent-[#C8A265]"
                      />
                      <span>شعار "بصمة عالم الفخامة"</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showContact}
                        onChange={(e) => setShowContact(e.target.checked)}
                        className="rounded accent-[#C8A265]"
                      />
                      <span>شريط التواصل والعنوان</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showWhatsapp}
                        onChange={(e) => setShowWhatsapp(e.target.checked)}
                        className="rounded accent-[#C8A265]"
                      />
                      <span>رقم الواتساب</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showHandle}
                        onChange={(e) => setShowHandle(e.target.checked)}
                        className="rounded accent-[#C8A265]"
                      />
                      <span>حساب الإنستغرام</span>
                    </label>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#ECE4D8]">
                  <label className="block text-xs font-bold text-[#4A4136] mb-1">حالة حفظ التصميم:</label>
                  <select
                    value={designStatus}
                    onChange={(e) => setDesignStatus(e.target.value as DesignStatus)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9CEBC]"
                  >
                    <option value="draft">مسودة (Draft)</option>
                    <option value="ready">جاهز للنشر على السوشيال (Ready)</option>
                    <option value="published">تم النشر في حسابات المحل (Published)</option>
                    <option value="archived">مؤرشف (Archived)</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ================= LIVE CANVAS PREVIEW (5 cols) ================= */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-3 text-xs text-[#8A7B69] px-2">
            <span className="font-bold text-[#1A1612]">المعاينة الحية للمنشور (Live Preview)</span>
            <span className="font-mono">{formatLabels[selectedFormat].dims}</span>
          </div>

          {/* Interactive Scaled Mockup Container */}
          <div className="w-full max-w-sm mx-auto shadow-2xl rounded-2xl overflow-hidden border-2 border-[#C8A265]/50 bg-stone-950 p-2">
            <div
              className={`w-full relative rounded-xl overflow-hidden p-5 flex flex-col justify-between select-none ${themeStyle.bg} ${themeStyle.text} ${formatLabels[selectedFormat].aspectClass}`}
            >
              {/* Outer Decorative Border Frame */}
              <div className={`absolute inset-3 border-2 pointer-events-none rounded-lg ${themeStyle.border} opacity-40`} />

              {/* Corner Ornaments */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#C8A265]" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#C8A265]" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#C8A265]" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#C8A265]" />

              {/* 1. Header with Brand Logo */}
              {showLogo && (
                <div className="relative z-10 text-center pt-1 pb-2">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-black tracking-wider">
                    <span className="text-[#C8A265]">❖</span>
                    <span className={`font-heading ${themeStyle.accent}`}>بصمة عالم الفخامة</span>
                    <span className="text-[#C8A265]">❖</span>
                  </div>
                  <span className={`text-[9px] block tracking-wider font-light ${themeStyle.subtext}`}>
                    LUXURY LIVING & FURNITURE
                  </span>
                </div>
              )}

              {/* 2. Central Product Image Area */}
              <div className="relative flex-1 my-2 rounded-lg overflow-hidden border border-[#C8A265]/30 bg-black/20 flex items-center justify-center">
                <img
                  src={selectedProduct?.images[0]}
                  alt={selectedProduct?.name}
                  style={{
                    transform: `scale(${imageScale}) translate(${imageOffsetX}px, ${imageOffsetY}px)`,
                  }}
                  className="w-full h-full object-cover transition-transform duration-200"
                />

                {/* Badge Overlay */}
                {badgeText && (
                  <div className="absolute top-2 right-2 bg-[#C8A265] text-[#14110E] text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm">
                    {badgeText}
                  </div>
                )}
              </div>

              {/* 3. Text & Info Section */}
              <div className="relative z-10 text-right pt-2 space-y-1">
                <h3 className="text-sm font-black font-heading leading-tight line-clamp-1">
                  {headline}
                </h3>
                <p className={`text-[11px] line-clamp-1 font-light ${themeStyle.subtext}`}>
                  {subhead}
                </p>

                {/* Price Tag Box */}
                {showPrice && (
                  <div className={`mt-2 p-2 rounded-lg border border-[#C8A265]/40 flex items-baseline justify-between ${themeStyle.card}`}>
                    <span className="text-xs font-black font-heading text-[#C8A265]">
                      {formatCurrency(tempPrice, settings.currency)}
                    </span>
                    {showOldPrice && tempOldPrice > tempPrice && (
                      <span className="text-[10px] line-through text-stone-400">
                        {formatCurrency(tempOldPrice, settings.currency)}
                      </span>
                    )}
                  </div>
                )}

                {/* Footer Brand Handles */}
                {showContact && (
                  <div className={`pt-2 mt-2 border-t border-[#C8A265]/20 text-center text-[9px] space-y-0.5 ${themeStyle.subtext}`}>
                    <div className="flex items-center justify-center gap-3">
                      {showWhatsapp && <span>واتساب: {settings.whatsapp}</span>}
                      {showHandle && <span>@{settings.instagram}</span>}
                    </div>
                    <span className="block text-[8px] opacity-75">{settings.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="px-6 py-2.5 rounded-full bg-[#C8A265] hover:bg-[#d8b375] text-[#14110E] text-xs font-bold transition-all shadow-md flex items-center gap-2 mx-auto cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>تحميل هذا التصميم الآن</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
