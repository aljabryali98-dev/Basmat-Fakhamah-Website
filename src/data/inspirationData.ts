import { GalleryItem } from '../types';

export const initialGalleryItems: GalleryItem[] = [
  {
    id: 'gal-01',
    title: 'جناح نوم رئيسي بتدرجات العاج والبرونز',
    category: 'غرف نوم',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200&auto=format&fit=crop',
    description: 'تنسيق متناسق لسرير فينيسيا مع إضاءة دافئة غير مباشرة وأرضيات باركيه خشبية.',
    featuredFurniture: ['طقم غرفة نوم فينيسيا الملكية', 'كومودينة رخامية كلكتا', 'إضاءة سقف خافتة']
  },
  {
    id: 'gal-02',
    title: 'صالة معيشة مع نافذة بانورامية وكنب بوكليه',
    category: 'غرف معيشة',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
    description: 'انسيابية الضوء الطبيعي مع كنب ميلانو العصري وطاولات متداخلة أنيقة.',
    featuredFurniture: ['طقم كنب ميلانو العصري', 'طقم طاولات قهوة متداخلة نوفا']
  },
  {
    id: 'gal-03',
    title: 'مجلس استقبال فخم بروح الأندلس والضيافة',
    category: 'مجالس',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
    description: 'تفاصيل الخشب المنحوت والزخارف الذهبية مع وسائد مخملية مريحة.',
    featuredFurniture: ['مجلس الأصالة الملكية الفاخر', 'طاولات ضيافة رخامية']
  },
  {
    id: 'gal-04',
    title: 'منطقة طعام ملكية مجهزة لضيافة كبار الشخصيات',
    category: 'صالات طعام',
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?q=80&w=1200&auto=format&fit=crop',
    description: 'رخام كلكتا مع كراسي مريحة وثريا لوسيا المتدلية لإضفاء سحر استثنائي.',
    featuredFurniture: ['طاولة طعام كلكتا أورورا', 'ثريا كريستال عصرية لوسيا']
  },
  {
    id: 'gal-05',
    title: 'ركن قراءة واستجمام مع كرسي أوريون الدوار',
    category: 'زوايا منزلية',
    image: 'https://images.unsplash.com/photo-1580481077195-c3a8b2a30d5b?q=80&w=1200&auto=format&fit=crop',
    description: 'تناغم خشب الجوز والجلد الطبيعي مع نباتات داخلية تعطي لمسة حياة هادئة.',
    featuredFurniture: ['كرسي لاونج أوريون مع مسند قدم', 'طاولة جانبية صغيرة']
  },
  {
    id: 'gal-06',
    title: 'مكتب منزلي تنفيذي يعزز التركيز والإنتاجية',
    category: 'مكاتب',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop',
    description: 'أناقة الأبنوس مع تنظيم احترافي للإضاءة والمكتبة الخلفية.',
    featuredFurniture: ['مكتب الرؤساء التنفيذيين مونارك', 'كرسي إداري داعم للظهر']
  }
];
