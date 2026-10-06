import { ProductReview } from '../types';

export const initialReviews: ProductReview[] = [
  {
    id: 'rev-01',
    productId: 'prod-01', // طقم كنب قصر الحمراء الملكي
    customerName: 'عبدالرحمن العتيبي',
    city: 'الرياض',
    rating: 5,
    comment: 'ما شاء الله تبارك الله، فخامة وجودة لا توصف. الخشب مذهّب بإتقان والأقمشة المخملية غاية في النعومة والراحة. التوصيل والتركيب كان سريعاً ومنظماً جداً.',
    createdAt: '2026-09-15',
    verifiedPurchase: true,
  },
  {
    id: 'rev-02',
    productId: 'prod-01',
    customerName: 'سارة آل سعود',
    city: 'جدة',
    rating: 5,
    comment: 'القطعة قطعة فنية بحد ذاتها، أضافت هيبة لا توصف لمجلس الضيوف. كل زوارنا يسألون عن مصدرها. شكراً بصمة عالم الفخامة.',
    createdAt: '2026-09-20',
    verifiedPurchase: true,
  },
  {
    id: 'rev-03',
    productId: 'prod-02', // غرفة نوم فرساي الإمبراطورية
    customerName: 'م. فهد الدوسري',
    city: 'الدمام',
    rating: 5,
    comment: 'سرير وتفاصيل الغرفة تفوق التوقعات، التشطيب اليدوي والطلاء الذهبي دقيق جداً والهيدبورد الجلدي راقي ومريح للغاية.',
    createdAt: '2026-09-12',
    verifiedPurchase: true,
  },
  {
    id: 'rev-04',
    productId: 'prod-02',
    customerName: 'نورة الشمري',
    city: 'الرياض',
    rating: 4,
    comment: 'غرفة نوم ملكية بحق، مساحة التخزين ممتازة والكومودينات أنيقة جداً. استغرقت يومين إضافيين بالتوصيل لكن النتيجة تستحق كل لحظة انتظار.',
    createdAt: '2026-09-18',
    verifiedPurchase: true,
  },
  {
    id: 'rev-05',
    productId: 'prod-03', // طاولة طعام فينيسيا الرخامية
    customerName: 'سلطان القحطاني',
    city: 'الخبر',
    rating: 5,
    comment: 'رخام كلكتا طبيعي مع عروق ذهبية خلابة، وقاعدة الطاولة من الستانلس المقاوم للصدأ بتشطيب مطفي ممتاز. زادت صالة الطعام رقياً.',
    createdAt: '2026-09-22',
    verifiedPurchase: true,
  },
  {
    id: 'rev-06',
    productId: 'prod-04', // مجلس أندلسي فخم
    customerName: 'خالد المطيري',
    city: 'مكة المكرمة',
    rating: 5,
    comment: 'تصميم المجلس يجمع بين الأصالة والعصر الحديث، الإسفنج مريح وضغطه عالي يتحمل لسنوات، تعامل الفريق راقي وقمة في الاحترام.',
    createdAt: '2026-09-10',
    verifiedPurchase: true,
  },
];
