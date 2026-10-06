import { Product } from '../types';

export const initialProducts: Product[] = [
  {
    id: 'prod-01',
    code: 'BAF-101',
    name: 'طقم غرفة نوم "فينيسيا" الملكية',
    categoryId: 'cat-bedrooms',
    categoryName: 'غرف النوم',
    shortDescription: 'جناح نوم فاخر من خشب الماهوجني المعتق مع تنجيد رأس السرير بجلد نابا طبيعي وتطعيمات برونزية ذهبية.',
    fullDescription: 'تجسد غرفة نوم "فينيسيا" قمة الإتقان الحرفي الإيطالي. السرير مزود برأس ضخم مبطن يدوياً بنمط الكابيتونيه الفاخر، مصحوباً بكومودينتين رخاميتين، وتسريحة متكاملة بمرآة بيفيلد دائرية، ودولاب ملابس هيدروليكي بستة أبواب. كل قطعة تم صقلها بعناية لتعيش أجيالاً.',
    price: 18500,
    originalPrice: 22800,
    discountPercentage: 19,
    isDiscounted: true,
    isFeatured: true,
    isNewArrival: true,
    stockStatus: 'in_stock',
    dimensions: 'سرير: 200×200 سم | دولاب: 280×220×65 سم | تسريحة: 160×90×50 سم',
    materials: 'خشب ماهوجني صلب، رخام كلكتا إيطالي، جلد نابا طبيعي، مفصلات ألمانية بلوم',
    colors: [
      { name: 'بيج كلاسيكي مع عاجي', hex: '#E8DFD0' },
      { name: 'بني شوكولاتة مع برونز', hex: '#4A3525' },
      { name: 'رمادي ملكي دافئ', hex: '#8C857B' }
    ],
    images: [
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop'
    ],
    viewsCount: 1420,
    ordersCount: 38,
    tags: ['غرف نوم', 'ملكي', 'إيطالي', 'عرض خاص', 'خشب صلب'],
    createdAt: '2026-03-01'
  },
  {
    id: 'prod-02',
    code: 'BAF-202',
    name: 'طقم كنب "ميلانو" العصري الفاخر',
    categoryId: 'cat-sofas',
    categoryName: 'أطقم الكنب',
    shortDescription: 'طقم جلوس مكون من 4 قطع بقماش بوكليه بلجيكي مقاوم للبقع وقواعد خشب جوز أمريكي مطعمة بالنحاس.',
    fullDescription: 'تصميم أوروبي حديث يتناغم مع الراحة اليومية والرفاهية البصرية. يحتوي الطقم على كنبة ثلاثية رحبة، كنبة ثنائية، وكرسيين منفصلين (Armchairs) بتصميم منحوت مريح لأسفل الظهر ومزود بحشوات ريش معالجة مع طبقات رغوية ألمانية مرنة.',
    price: 14900,
    originalPrice: 17500,
    discountPercentage: 15,
    isDiscounted: true,
    isFeatured: true,
    isNewArrival: false,
    stockStatus: 'in_stock',
    dimensions: 'كنبة رئيسية: 260×95×82 سم | ثنائية: 190×95×82 سم | مفرد: 85×85×80 سم',
    materials: 'هيكل خشب زان مبخر، أقمشة بوكليه بلجيكية، حشوات ريش وألياف دقيقة، أرجل نحاس مطفي',
    colors: [
      { name: 'أبيض عاجي (Cream Boucle)', hex: '#F4EFEA' },
      { name: 'رمادي فحمي دافئ', hex: '#373533' },
      { name: 'أخضر ميرمية هادئ', hex: '#6B7A6E' }
    ],
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop'
    ],
    viewsCount: 2310,
    ordersCount: 52,
    tags: ['كنب', 'مودرن', 'بوكليه', 'غرف معيشة', 'تصميم أوروبي'],
    createdAt: '2026-02-15'
  },
  {
    id: 'prod-03',
    code: 'BAF-303',
    name: 'مجلس "الأصالة الملكية" الفاخر',
    categoryId: 'cat-majlis',
    categoryName: 'المجالس الفاخرة',
    shortDescription: 'مجلس عربي فاخر متصل بتفاصيل أرابيسك مذهبة وأقمشة مخملية حريرية مصممة للقصور والفلل الراقية.',
    fullDescription: 'صُمم هذا المجلس خصيصاً ليعكس كرم الضيافة والاعتزاز بالتراث بروح الرفاهية المعاصرة. يتميز بإطارات خشبية منحوتة يدوياً ومطلية بورق الذهب العتيق، مع مساند جانبية مصممة هندسياً وطاولات خدمة رخامية متناسقة.',
    price: 26000,
    originalPrice: 31000,
    discountPercentage: 16,
    isDiscounted: true,
    isFeatured: true,
    isNewArrival: true,
    stockStatus: 'in_stock',
    dimensions: 'مجلس على شكل حرف U بطول 8 متر إجمالي + 4 طاولات خدمة + طاولة وسط كبرى',
    materials: 'خشب زان روماني، مخمل إيطالي مقاوم للتآكل، دهانات ذهبية إسبانية مقاومة للبهتان',
    colors: [
      { name: 'كحلي ملوكي مع ذهبي', hex: '#1C2942' },
      { name: 'عنابي أندلسي فاخر', hex: '#521422' },
      { name: 'بيج رملي مع زيتي', hex: '#D6CEBE' }
    ],
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop'
    ],
    viewsCount: 3180,
    ordersCount: 29,
    tags: ['مجلس', 'أرابيسك', 'مخمل', 'ملكي', 'تراث فاخر'],
    createdAt: '2026-03-05'
  },
  {
    id: 'prod-04',
    code: 'BAF-404',
    name: 'طاولة طعام "كلكتا أورورا" لعشرة أشخاص',
    categoryId: 'cat-tables',
    categoryName: 'طاولات الطعام والضيافة',
    shortDescription: 'سطح رخام طبيعي كلكتا مع قاعدة نحاسية هندسية و10 كراسي بتنجيد مريح وتشطيبات راقية.',
    fullDescription: 'طاولة طعام استثنائية تشكل قطعة فنية مركزية في منزلك. عروق الرخام الطبيعي تعطي كل طاولة بصمة فريدة لا تتكرر، بينما تضمن القواعد المعدنية الثقيلة ثباتاً مطلقاً وأناقة لا تخبو مع الزمن.',
    price: 16800,
    originalPrice: 19500,
    discountPercentage: 14,
    isDiscounted: true,
    isFeatured: true,
    isNewArrival: false,
    stockStatus: 'in_stock',
    dimensions: 'الطاولة: 300×110×76 سم | الكراسي: 55×60×88 سم',
    materials: 'رخام كلكتا نخب أول محمي بتقنية النانو، حديد مشغول مع طلاء الكتروستاتيك نحاسي، كراسي جلد صناعي فاخر',
    colors: [
      { name: 'رخام أبيض بعروق ذهبية ورمادية', hex: '#F0EFEA' },
      { name: 'رخام أسود نيرو ماركينا', hex: '#1F1E1D' }
    ],
    images: [
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1200&auto=format&fit=crop'
    ],
    viewsCount: 1890,
    ordersCount: 21,
    tags: ['طاولة طعام', 'رخام', 'كلكتا', 'سفرة', 'فخامة'],
    createdAt: '2026-02-20'
  },
  {
    id: 'prod-05',
    code: 'BAF-505',
    name: 'كرسي لاونج "أوريون" مع مسند قدم',
    categoryId: 'cat-chairs',
    categoryName: 'الكراسي واللاونج',
    shortDescription: 'كرسي استرخاء مفرد بتصميم أيقوني من خشب الجوز المقولب والجلد الطبيعي مع قاعدة دوارة.',
    fullDescription: 'أعلى مراتب الراحة في زاوية القراءة أو صالة المعيشة. انحناءات هندسية مدروسة طبياً لدعم العمود الفقري بالكامل مع زاوية ميلان تلقائية ومسند أقدام منفصل يحقق استرخاءً تاما بعد يوم عمل شاق.',
    price: 4950,
    originalPrice: 5800,
    discountPercentage: 15,
    isDiscounted: false,
    isFeatured: true,
    isNewArrival: true,
    stockStatus: 'in_stock',
    dimensions: 'الكرسي: 84×85×85 سم | المسند: 63×54×42 سم',
    materials: 'خشب الجوز متعدد الطبقات، جلد توب-جرين بقري طبيعي، ألمنيوم مصقول',
    colors: [
      { name: 'جلد كراميل عسلي مع جوز داكن', hex: '#8B5A2B' },
      { name: 'جلد أسود مع جوز داكن', hex: '#212121' },
      { name: 'جلد كريمي مع خشب البلوط', hex: '#E5DFD3' }
    ],
    images: [
      'https://images.unsplash.com/photo-1580481077195-c3a8b2a30d5b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1200&auto=format&fit=crop'
    ],
    viewsCount: 1560,
    ordersCount: 44,
    tags: ['كرسي لاونج', 'استرخاء', 'جلد طبيعي', 'خشب جوز'],
    createdAt: '2026-03-08'
  },
  {
    id: 'prod-06',
    code: 'BAF-606',
    name: 'مكتب الرؤساء التنفيذيين "مونارك"',
    categoryId: 'cat-offices',
    categoryName: 'المكاتب والمكتبات',
    shortDescription: 'مكتب رئاسي فخم من خشب الأبنوس الملمع مع سطح جلدي وإضاءة LED مخفية وخزانة خلفية مدمجة.',
    fullDescription: 'يعطي مكتب "مونارك" هيبة وانطباعاً فورياً بالقيادة والتميز في المكاتب والمقرات الفارهة. يشمل منافذ ذكية لتمرير الأسلاك، أدراج بقفل رقمي سري، وحدة جانبية واسعة، وكرسي رئيسي هيدروليكي داعم.',
    price: 21500,
    originalPrice: 25000,
    discountPercentage: 14,
    isDiscounted: false,
    isFeatured: false,
    isNewArrival: true,
    stockStatus: 'in_stock',
    dimensions: 'المكتب: 240×110×78 سم | الخزانة الخلفية: 280×200×45 سم',
    materials: 'قشرة أبنوس طبيعية، جلد نابا أسود، ستانلس ستيل مطلي تيتانيوم أسود، خشب MDF مضغوط نخب أول',
    colors: [
      { name: 'أسود أبنوس مع برونز', hex: '#1A1817' },
      { name: 'بني جوز ملكي', hex: '#3E2A1E' }
    ],
    images: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop'
    ],
    viewsCount: 980,
    ordersCount: 12,
    tags: ['مكتب', 'تنفيذي', 'رئاسي', 'فخامة', 'شركات'],
    createdAt: '2026-03-02'
  },
  {
    id: 'prod-07',
    code: 'BAF-707',
    name: 'كونسول مدخل "سيمفوني" مع مرآة كريستال',
    categoryId: 'cat-wardrobes',
    categoryName: 'الخزائن والكونسول',
    shortDescription: 'كونسول فاخر بتصميم مموج منحوت يدوياً مع سطح رخامي داكن ومرآة هندسية بتشطيب ذهبي غير لامع.',
    fullDescription: 'القطعة الأولى التي تبهر ضيوفك عند دخول المنزل. يجمع بين الانحناءات الهندسية الجريئة وتوازن المواد بين الرخام الثقيل والألواح الخشبية المتعرجة.',
    price: 7200,
    originalPrice: 8500,
    discountPercentage: 15,
    isDiscounted: true,
    isFeatured: false,
    isNewArrival: false,
    stockStatus: 'in_stock',
    dimensions: 'الكونسول: 160×42×85 سم | المرآة: 120×90 سم',
    materials: 'خشب زان، رخام سان لوران أسود مذهب، مرآة بلجيكية غير قابلة للتشويه',
    colors: [
      { name: 'بيج رملي مع رخام أسود', hex: '#D1C7B7' },
      { name: 'بني شوكولاتة غامق', hex: '#3C2E25' }
    ],
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200&auto=format&fit=crop'
    ],
    viewsCount: 1120,
    ordersCount: 31,
    tags: ['كونسول', 'مدخل', 'مرآة', 'ديكور'],
    createdAt: '2026-01-25'
  },
  {
    id: 'prod-08',
    code: 'BAF-808',
    name: 'طقم طاولات قهوة متداخلة "نوفا"',
    categoryId: 'cat-tables',
    categoryName: 'طاولات الطعام والضيافة',
    shortDescription: 'طقم ثنائي لطاولات وسط متداخلة تجمع بين الرخام الأبيض والخشب الدافئ بقواعد أسطوانية مميزة.',
    fullDescription: 'حل مثالي لصالات المعيشة الحديثة. يمكن توزيع الطاولتين لتوفير مساحة ضيافة إضافية أو دمجهما معاً لتكوين تشكيل فني متكامل يمنح الصالة طابعاً هندسياً مريحاً.',
    price: 3400,
    originalPrice: 4200,
    discountPercentage: 19,
    isDiscounted: true,
    isFeatured: true,
    isNewArrival: false,
    stockStatus: 'in_stock',
    dimensions: 'الطاولة الكبرى: قطر 90 سم × ارتفاع 42 سم | الصغرى: قطر 60 سم × ارتفاع 36 سم',
    materials: 'سطح رخامي طبيعي معالج، قواعد خشبية مضلعة، إطارات مقاومة للخدش',
    colors: [
      { name: 'رخام أبيض مع خشب سنديان طبيعي', hex: '#EBE5DC' },
      { name: 'رخام رمادي مع خشب جوز أسود', hex: '#423D3A' }
    ],
    images: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1200&auto=format&fit=crop'
    ],
    viewsCount: 2240,
    ordersCount: 68,
    tags: ['طاولة وسط', 'طاولات قهوة', 'رخام', 'مودرن'],
    createdAt: '2026-02-18'
  },
  {
    id: 'prod-09',
    code: 'BAF-909',
    name: 'ثريا كريستال عصرية "لوسيا"',
    categoryId: 'cat-decor',
    categoryName: 'الإكسسوارات والديكور',
    shortDescription: 'ثريا سقف دائرية متدرجة من الكريستال النقي مع أشرطة نحاسية تمنح إضاءة ساحرة دافئة.',
    fullDescription: 'إضاءة فاخرة تضفي بريقاً ملكياً فوق طاولات الطعام أو صالات الاستقبال والمجالس، مزودة بنظام تحكم ذكي بشدة الإضاءة ودرجة حرارة اللون (كلفن).',
    price: 5800,
    originalPrice: 6900,
    discountPercentage: 16,
    isDiscounted: true,
    isFeatured: false,
    isNewArrival: true,
    stockStatus: 'in_stock',
    dimensions: 'قطر 100 سم | ارتفاع قابل للتعديل حتى 150 سم',
    materials: 'كريستال K9 عالي النقاء، نحاس أصفر مقاوم للأكسدة، شرائح LED موفرة للطاقة',
    colors: [
      { name: 'ذهبي مع كريستال شفاف', hex: '#D4AF37' },
      { name: 'كروم فضي مع كريستال دخاني', hex: '#A8A9AD' }
    ],
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop'
    ],
    viewsCount: 1630,
    ordersCount: 24,
    tags: ['ديكور', 'إضاءة', 'ثريا', 'كريستال'],
    createdAt: '2026-03-10'
  },
  {
    id: 'prod-10',
    code: 'BAF-1010',
    name: 'غرفة معيشة متكاملة "توسكانا"',
    categoryId: 'cat-living-rooms',
    categoryName: 'غرف المعيشة',
    shortDescription: 'طقم متكامل يضم كنب زاوية فخم، وحدة تلفزيون جدارية معلقة، وطاولات خدمة بتناغم لوني مهدئ.',
    fullDescription: 'تجسيد رائع لراحة العائلة وأناقة الضيافة اليومية. قماش فائق النعومة بمقاومة استثنائية للبقع والسوائل، مدعوم بوحدة تلفزيون بتصميم معلق وإضاءات خلفية غير مباشرة ومساحات تخزين ذكية.',
    price: 24500,
    originalPrice: 28900,
    discountPercentage: 15,
    isDiscounted: true,
    isFeatured: true,
    isNewArrival: false,
    stockStatus: 'in_stock',
    dimensions: 'كنب الزاوية: 340×260×85 سم | وحدة التلفزيون: 300×190×40 سم',
    materials: 'خشب زان أحمر، تنجيد كتان هولندي مقاوم، أرفف زجاج سيكوريت مضلع، دهان بوليريثان مطفي',
    colors: [
      { name: 'بيج كتاني طبيعي مع خشب البلوط الرمادي', hex: '#DBD2C4' },
      { name: 'أزرق كحلي دافئ مع جوز طبيعي', hex: '#2A3441' }
    ],
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1200&auto=format&fit=crop'
    ],
    viewsCount: 2870,
    ordersCount: 41,
    tags: ['غرفة معيشة', 'كنب زاوية', 'تلفزيون', 'طقم كامل', 'فاخر'],
    createdAt: '2026-02-28'
  },
  {
    id: 'prod-11',
    code: 'BAF-1111',
    name: 'غرفة أطفال ونشء فاخرة "أوليفيا"',
    categoryId: 'cat-kids',
    categoryName: 'أثاث الأطفال والناشئين',
    shortDescription: 'جناح أطفال أنيق يضم سريرين مدمجين، مكتب استذكار واسع، ودولاب ملابس بتشطيب بيج باستيل آمن للأطفال.',
    fullDescription: 'أثاث مدروس بعناية لتوفير بيئة نوم هادئة ومساحة دراسة مريحة. جميع الزوايا مستديرة لمزيد من الأمان، واستُخدمت دهانات صديقة للبيئة خالية من المركبات العضوية المتطايرة (Low-VOC).',
    price: 11200,
    originalPrice: 13500,
    discountPercentage: 17,
    isDiscounted: true,
    isFeatured: false,
    isNewArrival: true,
    stockStatus: 'in_stock',
    dimensions: 'سرير 120×200 سم | دولاب 180×210×60 سم | مكتب 140×65×75 سم',
    materials: 'خشب صنوبر طبيعي معالج، دهانات مائية آمنة معتمدة، مقابض جلدية ناعمة',
    colors: [
      { name: 'بيج كاشمير مع خشب فاتح', hex: '#DFD7CB' },
      { name: 'أخضر باستيل هادئ', hex: '#B8C2B3' }
    ],
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop'
    ],
    viewsCount: 820,
    ordersCount: 19,
    tags: ['أطفال', 'غرف نوم', 'ناشئين', 'أمان', 'خشب طبيعي'],
    createdAt: '2026-03-11'
  },
  {
    id: 'prod-12',
    code: 'BAF-1212',
    name: 'خزانة ملابس زجاجية ذكية "إيليت"',
    categoryId: 'cat-wardrobes',
    categoryName: 'الخزائن والكونسول',
    shortDescription: 'دولاب ملابس بتصميم فندقي فخم بأبواب زجاجية عاكسة وإضاءة ذكية بمستشعر حركة وتقسيمات إيطالية.',
    fullDescription: 'تحفة تنظيمية للملابس والمقتنيات الثمينة. يشتمل على أدراج مبطنة بالمخمل للساعات والمجوهرات، علاقات ملابس هيدروليكية قابلة للإنزال، وقواطع زجاجية تمنح الغرفة إحساساً لا نهائياً بالاتساع.',
    price: 19800,
    originalPrice: 23000,
    discountPercentage: 14,
    isDiscounted: false,
    isFeatured: true,
    isNewArrival: false,
    stockStatus: 'in_stock',
    dimensions: '320×240×65 سم (تصميم مفصل حسب الطلب متوفر)',
    materials: 'هيكل ألمنيوم مؤكسد، زجاج مضلع رمادي عاكس، أرفف جلد فاخر وإضاءة LED مستمرة',
    colors: [
      { name: 'برونز مؤكسد مع زجاج رمادي', hex: '#3D352F' },
      { name: 'أسود مطفي مع زجاج شفاف برونزي', hex: '#1E1E1E' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558997519-83ea9252def8?q=80&w=1200&auto=format&fit=crop'
    ],
    viewsCount: 1740,
    ordersCount: 22,
    tags: ['دولاب', 'خزانة', 'زجاج', 'دريسنج روم', 'فخامة'],
    createdAt: '2026-01-30'
  }
];
