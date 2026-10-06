import { DesignTemplate } from '../types';

export const initialTemplates: DesignTemplate[] = [
  {
    id: 'tpl-new-arrival',
    name: 'قالب وصول تشكيلة جديدة',
    category: 'جديد',
    description: 'تصميم أنيق وراقٍ لإبراز أحدث القطع الفاخرة الواصلة للمعرض حديثاً',
    defaultTheme: 'dark_luxury',
    defaultFormat: 'ig_post',
    badge: 'وصل حديثاً',
    sampleHeadline: 'فخامة تتجدد في كل تفصيلة',
    sampleSubhead: 'اكتشف جديد تشكيلة 2026 الحصرية لدى بصمة عالم الفخامة'
  },
  {
    id: 'tpl-discount-offer',
    name: 'قالب خصم وعرض خاص',
    category: 'عروض',
    description: 'إبراز نسبة الخصم والسعر الترويجي بوضوح مع الحفاظ على الهيبة والفخامة',
    defaultTheme: 'royal_gold',
    defaultFormat: 'ig_portrait',
    badge: 'عرض استثنائي لفترة محدودة',
    sampleHeadline: 'تألق بأرقى القطع بسعر استثنائي',
    sampleSubhead: 'خصومات مميزة على مختاراتنا الراقية - متوفر للتسليم الفوري'
  },
  {
    id: 'tpl-luxury-showcase',
    name: 'قالب عرض أثاث فخم',
    category: 'عام',
    description: 'تركيز بصري كامل على جودة الخامة والصورة مع لمسات برونزية راقية',
    defaultTheme: 'warm_walnut',
    defaultFormat: 'ig_post',
    badge: 'قطعة حصرية',
    sampleHeadline: 'إتقان لا مثيل له يعانق مساحتك',
    sampleSubhead: 'أثاث يترك بصمته في كل زاوية من منزلك'
  },
  {
    id: 'tpl-royal-bedroom',
    name: 'قالب أجنحة النوم الملكية',
    category: 'غرف نوم',
    description: 'قالب مخصص لأطقم النوم الفاخرة يبرز المقاسات والتفاصيل والراحة',
    defaultTheme: 'ivory_chic',
    defaultFormat: 'ig_portrait',
    badge: 'مجموعة الأجنحة الملكية',
    sampleHeadline: 'ملاذ نوم صُمم لراحتك المطلقة',
    sampleSubhead: 'خشب صلب وتنجيد يدوي من نخب أول'
  },
  {
    id: 'tpl-majlis-splendor',
    name: 'قالب المجالس الفاخرة',
    category: 'مجالس',
    description: 'تصميم عريض وفخم يبرز أطقم المجالس الكبيرة وهيبة الضيافة',
    defaultTheme: 'royal_gold',
    defaultFormat: 'fb_post',
    badge: 'كرم الضيافة وأصالة الذوق',
    sampleHeadline: 'مجالس تصنع هيبة المكان',
    sampleSubhead: 'استقبل ضيوفك بأرقى طراز مع بصمة عالم الفخامة'
  },
  {
    id: 'tpl-modern-living',
    name: 'قالب غرف المعيشة المودرن',
    category: 'معيشة',
    description: 'طابع هندسي معاصر وخطوط نقية تناسب الأثاث الأوروبي العصري',
    defaultTheme: 'pure_minimal',
    defaultFormat: 'ig_post',
    badge: 'تناغم المودرن والراحة',
    sampleHeadline: 'دفء العائلة بأرقى لمسة معاصرة',
    sampleSubhead: 'أقمشة مستوردة مقاومة مع هياكل خشبية صلبة'
  },
  {
    id: 'tpl-promo-ad',
    name: 'قالب إعلان سوشيال ميديا ممول',
    category: 'إعلانات',
    description: 'معد خصيصاً للحملات الإعلانية المدفوعة مع أزرار دعوة واضحة لاتخاذ إجراء',
    defaultTheme: 'dark_luxury',
    defaultFormat: 'ig_story',
    badge: 'إعلان خاص',
    sampleHeadline: 'جدد منزلك مع بصمة عالم الفخامة',
    sampleSubhead: 'احجز قطعتك الآن عبر واتساب واستفد من التوصيل والتركيب'
  },
  {
    id: 'tpl-ramadan',
    name: 'قالب نفحات رمضان المبارك',
    category: 'مواسم',
    description: 'زخارف إسلامية ذهبية دقيقة مع أجواء دافئة تناسب المجالس وطاولات الضيافة',
    defaultTheme: 'royal_gold',
    defaultFormat: 'ig_post',
    badge: 'مجموعة رمضان المبارك',
    sampleHeadline: 'أهلاً بشهر الخير ومجالس البركة',
    sampleSubhead: 'تشكيلة رمضانية حصرية تضفي الدفء والروحانية على مساحاتك'
  },
  {
    id: 'tpl-eid',
    name: 'قالب بهجة العيد والمناسبات',
    category: 'مواسم',
    description: 'تصميم احتفالي مبهج وراقٍ لاستقبال الأعياد والمناسبات السعيدة',
    defaultTheme: 'emerald_night',
    defaultFormat: 'ig_portrait',
    badge: 'تشكيلة العيد الفاخرة',
    sampleHeadline: 'بيتك يكتسي بحلة العيد الراقية',
    sampleSubhead: 'استعد لأجمل اللحظات مع أحدث مفروشات بصمة عالم الفخامة'
  },
  {
    id: 'tpl-fresh-batch',
    name: 'قالب وصول شحنة حصرية',
    category: 'شحنات',
    description: 'تنبيه حصري للمتابعين بوصول حاويات جديدة من الأثاث الإيطالي والأوروبي',
    defaultTheme: 'warm_walnut',
    defaultFormat: 'ig_story',
    badge: 'وصول دفعة محدودة',
    sampleHeadline: 'شحنة إيطالية حصرية وصلت المعرض',
    sampleSubhead: 'الكميات محدودة جداً - تفضل بزيارة المعرض أو احجز فوراً'
  }
];
