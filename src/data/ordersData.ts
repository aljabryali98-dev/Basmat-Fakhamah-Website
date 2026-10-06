import { CustomerOrder } from '../types';

export const initialOrders: CustomerOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'BAF-ORD-2026-089',
    customerName: 'سلطان بن عبدالعزيز آل سعود',
    customerPhone: '+966 50 111 2233',
    customerCity: 'الرياض',
    customerAddress: 'حي حطين، شارع وادي حنيفة، فيلا 14',
    items: [
      {
        productId: 'prod-01',
        productName: 'طقم غرفة نوم "فينيسيا" الملكية',
        price: 18500,
        quantity: 1,
        selectedColor: 'بيج كلاسيكي مع عاجي',
        image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=600&auto=format&fit=crop'
      }
    ],
    totalAmount: 18500,
    status: 'processing',
    notes: 'العميل يرغب بالتوصيل بعد الساعة 4 عصراً ومعاينة التركيب.',
    orderMethod: 'whatsapp',
    createdAt: '2026-03-14 16:30'
  },
  {
    id: 'ord-102',
    orderNumber: 'BAF-ORD-2026-090',
    customerName: 'د. مريم بنت خالد التميمي',
    customerPhone: '+966 55 444 7788',
    customerCity: 'جدة',
    customerAddress: 'حي الشاطئ، أبراج الكورنيش، الدور 18',
    items: [
      {
        productId: 'prod-02',
        productName: 'طقم كنب "ميلانو" العصري الفاخر',
        price: 14900,
        quantity: 1,
        selectedColor: 'أبيض عاجي (Cream Boucle)',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop'
      },
      {
        productId: 'prod-08',
        productName: 'طقم طاولات قهوة متداخلة "نوفا"',
        price: 3400,
        quantity: 1,
        selectedColor: 'رخام أبيض مع خشب سنديان طبيعي',
        image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=600&auto=format&fit=crop'
      }
    ],
    totalAmount: 18300,
    status: 'confirmed',
    notes: 'تم تأكيد الطلب عبر واتساب مع الدفع المسبق بنسبة 50%.',
    orderMethod: 'whatsapp',
    createdAt: '2026-03-15 11:15'
  },
  {
    id: 'ord-103',
    orderNumber: 'BAF-ORD-2026-091',
    customerName: 'المهندس طارق الشهري',
    customerPhone: '+966 53 999 8811',
    customerCity: 'الخبر',
    customerAddress: 'حي الحزام الذهبي، شارع الأمير فيصل',
    items: [
      {
        productId: 'prod-05',
        productName: 'كرسي لاونج "أوريون" مع مسند قدم',
        price: 4950,
        quantity: 2,
        selectedColor: 'جلد كراميل عسلي مع جوز داكن',
        image: 'https://images.unsplash.com/photo-1580481077195-c3a8b2a30d5b?q=80&w=600&auto=format&fit=crop'
      }
    ],
    totalAmount: 9900,
    status: 'delivered',
    notes: 'تم التسليم والتركيب بنجاح ونال استحسان العميل.',
    orderMethod: 'web_form',
    createdAt: '2026-03-09 19:45'
  }
];
