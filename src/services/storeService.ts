import { Product, Category, SocialMediaDesign, CustomerOrder, StoreSettings, OrderItem, ProductReview } from '../types';
import { initialProducts } from '../data/productsData';
import { initialCategories } from '../data/categoriesData';
import { initialSocialDesigns } from '../data/socialDesignsData';
import { initialOrders } from '../data/ordersData';
import { initialStoreSettings } from '../data/settingsData';
import { initialReviews } from '../data/reviewsData';

const KEYS = {
  PRODUCTS: 'basmat_products_v1',
  CATEGORIES: 'basmat_categories_v1',
  DESIGNS: 'basmat_designs_v1',
  ORDERS: 'basmat_orders_v1',
  SETTINGS: 'basmat_settings_v1',
  WISHLIST: 'basmat_wishlist_v1',
  CART: 'basmat_cart_v1',
  REVIEWS: 'basmat_reviews_v1',
};

const notifyUpdate = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('basmat-store-update'));
  }
};

export const storeService = {
  // PRODUCTS
  getProducts(): Product[] {
    try {
      const data = localStorage.getItem(KEYS.PRODUCTS);
      return data ? JSON.parse(data) : initialProducts;
    } catch {
      return initialProducts;
    }
  },

  getProductById(id: string): Product | undefined {
    return this.getProducts().find(p => p.id === id);
  },

  saveProduct(product: Product): void {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      products[index] = product;
    } else {
      products.unshift(product);
    }
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
    notifyUpdate();
  },

  deleteProduct(id: string): void {
    const products = this.getProducts().filter(p => p.id !== id);
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
    notifyUpdate();
  },

  duplicateProduct(id: string): Product | undefined {
    const original = this.getProductById(id);
    if (!original) return undefined;
    const duplicated: Product = {
      ...original,
      id: 'prod-' + Date.now(),
      code: 'BWA-' + Math.floor(100 + Math.random() * 900),
      name: `${original.name} (نسخة)`,
      viewsCount: 0,
      ordersCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    this.saveProduct(duplicated);
    return duplicated;
  },

  toggleProductFeatured(id: string): void {
    const products = this.getProducts();
    const product = products.find(p => p.id === id);
    if (product) {
      product.isFeatured = !product.isFeatured;
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
      notifyUpdate();
    }
  },

  toggleProductNewArrival(id: string): void {
    const products = this.getProducts();
    const product = products.find(p => p.id === id);
    if (product) {
      product.isNewArrival = !product.isNewArrival;
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
      notifyUpdate();
    }
  },

  updateProductStockStatus(id: string, status: Product['stockStatus']): void {
    const products = this.getProducts();
    const product = products.find(p => p.id === id);
    if (product) {
      product.stockStatus = status;
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
      notifyUpdate();
    }
  },

  updateProductPrice(id: string, newPrice: number, newOriginalPrice?: number): void {
    const products = this.getProducts();
    const product = products.find(p => p.id === id);
    if (product) {
      product.price = newPrice;
      if (newOriginalPrice !== undefined) {
        product.originalPrice = newOriginalPrice;
        if (newOriginalPrice > newPrice) {
          product.isDiscounted = true;
          product.discountPercentage = Math.round(((newOriginalPrice - newPrice) / newOriginalPrice) * 100);
        } else {
          product.isDiscounted = false;
          product.discountPercentage = 0;
        }
      }
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
      notifyUpdate();
    }
  },

  incrementProductView(id: string): void {
    const products = this.getProducts();
    const product = products.find(p => p.id === id);
    if (product) {
      product.viewsCount = (product.viewsCount || 0) + 1;
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
      notifyUpdate();
    }
  },

  recordProductView(id: string): void {
    this.incrementProductView(id);
  },

  // CATEGORIES
  getCategories(): Category[] {
    try {
      const data = localStorage.getItem(KEYS.CATEGORIES);
      return data ? JSON.parse(data) : initialCategories;
    } catch {
      return initialCategories;
    }
  },

  getCategoryById(id: string): Category | undefined {
    return this.getCategories().find(c => c.id === id);
  },

  saveCategory(cat: Category): void {
    const list = this.getCategories();
    const idx = list.findIndex(c => c.id === cat.id);
    if (idx >= 0) {
      list[idx] = cat;
    } else {
      list.push(cat);
    }
    localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(list));

    // Cascade update: update categoryName on all associated products
    const products = this.getProducts();
    let hasProductChanges = false;
    products.forEach(p => {
      if (p.categoryId === cat.id && p.categoryName !== cat.name) {
        p.categoryName = cat.name;
        hasProductChanges = true;
      }
    });
    if (hasProductChanges) {
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
    }

    notifyUpdate();
  },

  toggleCategoryFeatured(id: string): void {
    const list = this.getCategories();
    const cat = list.find(c => c.id === id);
    if (cat) {
      cat.featured = !cat.featured;
      localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(list));
      notifyUpdate();
    }
  },

  reorderCategories(reorderedCategories: Category[]): void {
    localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(reorderedCategories));
    notifyUpdate();
  },

  deleteCategory(id: string, fallbackCategoryId?: string): void {
    const list = this.getCategories().filter(c => c.id !== id);
    localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(list));

    // Reassign products belonging to the deleted category if needed
    const products = this.getProducts();
    let targetCategory = fallbackCategoryId ? list.find(c => c.id === fallbackCategoryId) : list[0];
    let hasProductChanges = false;

    products.forEach(p => {
      if (p.categoryId === id) {
        if (targetCategory) {
          p.categoryId = targetCategory.id;
          p.categoryName = targetCategory.name;
        } else {
          p.categoryId = 'general';
          p.categoryName = 'عام';
        }
        hasProductChanges = true;
      }
    });

    if (hasProductChanges) {
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
    }

    notifyUpdate();
  },

  // SOCIAL DESIGNS (استوديو محتوى بصمة)
  getDesigns(): SocialMediaDesign[] {
    try {
      const data = localStorage.getItem(KEYS.DESIGNS);
      return data ? JSON.parse(data) : initialSocialDesigns;
    } catch {
      return initialSocialDesigns;
    }
  },

  getDesignById(id: string): SocialMediaDesign | undefined {
    return this.getDesigns().find(d => d.id === id);
  },

  getDesignsByProductId(productId: string): SocialMediaDesign[] {
    return this.getDesigns().filter(d => d.productId === productId);
  },

  saveDesign(design: SocialMediaDesign): void {
    const designs = this.getDesigns();
    const index = designs.findIndex(d => d.id === design.id);
    if (index >= 0) {
      designs[index] = { ...design, updatedAt: new Date().toISOString().split('T')[0] };
    } else {
      designs.unshift(design);
    }
    localStorage.setItem(KEYS.DESIGNS, JSON.stringify(designs));
    notifyUpdate();
  },

  deleteDesign(id: string): void {
    const designs = this.getDesigns().filter(d => d.id !== id);
    localStorage.setItem(KEYS.DESIGNS, JSON.stringify(designs));
    notifyUpdate();
  },

  // ORDERS
  getOrders(): CustomerOrder[] {
    try {
      const data = localStorage.getItem(KEYS.ORDERS);
      return data ? JSON.parse(data) : initialOrders;
    } catch {
      return initialOrders;
    }
  },

  createOrder(order: Omit<CustomerOrder, 'id' | 'orderNumber' | 'createdAt'>): CustomerOrder {
    const orders = this.getOrders();
    const newOrder: CustomerOrder = {
      ...order,
      id: 'ord-' + Date.now(),
      orderNumber: 'BAF-ORD-' + new Date().getFullYear() + '-' + Math.floor(100 + Math.random() * 900),
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    orders.unshift(newOrder);
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
    notifyUpdate();
    return newOrder;
  },

  updateOrderStatus(orderId: string, status: CustomerOrder['status']): void {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
      notifyUpdate();
    }
  },

  // SETTINGS
  getSettings(): StoreSettings {
    try {
      const data = localStorage.getItem(KEYS.SETTINGS);
      return data ? JSON.parse(data) : initialStoreSettings;
    } catch {
      return initialStoreSettings;
    }
  },

  saveSettings(settings: StoreSettings): void {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    notifyUpdate();
  },

  // WISHLIST
  getWishlist(): string[] {
    try {
      const data = localStorage.getItem(KEYS.WISHLIST);
      return data ? JSON.parse(data) : ['prod-01', 'prod-02'];
    } catch {
      return [];
    }
  },

  toggleWishlist(productId: string): boolean {
    const list = this.getWishlist();
    const index = list.indexOf(productId);
    let isAdded = false;
    if (index >= 0) {
      list.splice(index, 1);
      isAdded = false;
    } else {
      list.push(productId);
      isAdded = true;
    }
    localStorage.setItem(KEYS.WISHLIST, JSON.stringify(list));
    notifyUpdate();
    return isAdded;
  },

  isWishlisted(productId: string): boolean {
    return this.getWishlist().includes(productId);
  },

  // CART (سلة الاستفسار والطلب)
  getCart(): OrderItem[] {
    try {
      const data = localStorage.getItem(KEYS.CART);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addToCart(item: OrderItem): void {
    const cart = this.getCart();
    const existing = cart.find(i => i.productId === item.productId && i.selectedColor === item.selectedColor);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      cart.push(item);
    }
    localStorage.setItem(KEYS.CART, JSON.stringify(cart));
    notifyUpdate();
  },

  removeFromCart(productId: string, selectedColor?: string): void {
    const cart = this.getCart().filter(i => !(i.productId === productId && (!selectedColor || i.selectedColor === selectedColor)));
    localStorage.setItem(KEYS.CART, JSON.stringify(cart));
    notifyUpdate();
  },

  updateCartQuantity(productId: string, quantity: number, selectedColor?: string): void {
    const cart = this.getCart();
    const item = cart.find(i => i.productId === productId && (!selectedColor || i.selectedColor === selectedColor));
    if (item) {
      item.quantity = Math.max(1, quantity);
      localStorage.setItem(KEYS.CART, JSON.stringify(cart));
      notifyUpdate();
    }
  },

  clearCart(): void {
    localStorage.removeItem(KEYS.CART);
    notifyUpdate();
  },

  // PRODUCT REVIEWS & STAR RATINGS (نظام تقييمات ومراجعات العملاء)
  getReviews(productId?: string): ProductReview[] {
    try {
      const data = localStorage.getItem(KEYS.REVIEWS);
      const all: ProductReview[] = data ? JSON.parse(data) : initialReviews;
      return productId ? all.filter(r => r.productId === productId) : all;
    } catch {
      return productId ? initialReviews.filter(r => r.productId === productId) : initialReviews;
    }
  },

  addReview(reviewData: Omit<ProductReview, 'id' | 'createdAt'>): ProductReview {
    const list = this.getReviews();
    const newReview: ProductReview = {
      ...reviewData,
      id: 'rev-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      verifiedPurchase: reviewData.verifiedPurchase ?? true,
    };
    list.unshift(newReview);
    localStorage.setItem(KEYS.REVIEWS, JSON.stringify(list));

    // Update product rating summary cache on product if available
    const productReviews = list.filter(r => r.productId === newReview.productId);
    const avg = Number((productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1));
    const products = this.getProducts();
    const p = products.find(prod => prod.id === newReview.productId);
    if (p) {
      p.rating = avg;
      p.reviewsCount = productReviews.length;
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
    }

    notifyUpdate();
    return newReview;
  },

  deleteReview(reviewId: string): void {
    const list = this.getReviews().filter(r => r.id !== reviewId);
    localStorage.setItem(KEYS.REVIEWS, JSON.stringify(list));
    notifyUpdate();
  },

  getProductRatingSummary(productId: string): {
    average: number;
    count: number;
    breakdown: Record<number, number>;
  } {
    const reviews = this.getReviews(productId);
    const breakdown: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    if (reviews.length === 0) {
      return { average: 5.0, count: 0, breakdown };
    }
    let sum = 0;
    reviews.forEach(r => {
      sum += r.rating;
      const rounded = Math.min(5, Math.max(1, Math.round(r.rating)));
      breakdown[rounded] = (breakdown[rounded] || 0) + 1;
    });
    const average = Number((sum / reviews.length).toFixed(1));
    return { average, count: reviews.length, breakdown };
  },

  // RESET TO DEMO DATA
  resetAllToDemo(): void {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(initialProducts));
    localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(initialCategories));
    localStorage.setItem(KEYS.DESIGNS, JSON.stringify(initialSocialDesigns));
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(initialOrders));
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(initialStoreSettings));
    localStorage.setItem(KEYS.WISHLIST, JSON.stringify(['prod-01', 'prod-02']));
    localStorage.setItem(KEYS.REVIEWS, JSON.stringify(initialReviews));
    localStorage.removeItem(KEYS.CART);
    notifyUpdate();
  },

  // REACTIVE LISTENER
  subscribe(callback: () => void): () => void {
    const handler = () => callback();
    if (typeof window !== 'undefined') {
      window.addEventListener('basmat-store-update', handler);
      return () => window.removeEventListener('basmat-store-update', handler);
    }
    return () => {};
  }
};
