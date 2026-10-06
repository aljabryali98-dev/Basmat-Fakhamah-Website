import { Product, StoreSettings } from '../types';

export function formatCurrency(amount: number, currency: string = 'ر.س'): string {
  const formattedNumber = new Intl.NumberFormat('ar-SA').format(amount);
  return `${formattedNumber} ${currency}`;
}

export function generateWhatsAppProductLink(product: Product, settings: StoreSettings, selectedColor?: string): string {
  const phone = settings.whatsapp.replace(/[^0-9]/g, '');
  const colorText = selectedColor ? `%0A🎨 *اللون المفضل:* ${encodeURIComponent(selectedColor)}` : '';
  const message = `السلام عليكم ورحمة الله%0Aأرغب في الاستفسار والطلب من *بصمة عالم الفخامة*:%0A%0A🛋️ *المنتج:* ${encodeURIComponent(product.name)}%0A🔖 *كود المنتج:* ${encodeURIComponent(product.code)}%0A💰 *السعر:* ${encodeURIComponent(formatCurrency(product.price, settings.currency))}${colorText}%0A📐 *المقاسات والخامات:* ${encodeURIComponent(product.dimensions)}%0A%0Aأرجو تزويدي بتفاصيل التوصيل والتأكيد.`;
  return `https://wa.me/${phone}?text=${message}`;
}

export function generateWhatsAppCartLink(
  items: { productName: string; price: number; quantity: number; selectedColor?: string }[],
  total: number,
  settings: StoreSettings,
  customerName?: string,
  customerCity?: string
): string {
  const phone = settings.whatsapp.replace(/[^0-9]/g, '');
  let itemsList = '';
  items.forEach((item, idx) => {
    itemsList += `%0A${idx + 1}. *${encodeURIComponent(item.productName)}* × ${item.quantity} (${encodeURIComponent(formatCurrency(item.price * item.quantity, settings.currency))})${item.selectedColor ? ` [${encodeURIComponent(item.selectedColor)}]` : ''}`;
  });

  const customerInfo = customerName ? `%0A%0A👤 *اسم العميل:* ${encodeURIComponent(customerName)}%0A📍 *المدينة:* ${encodeURIComponent(customerCity || 'الرياض')}` : '';
  const message = `السلام عليكم، أود تقديم طلب أثاث من *بصمة عالم الفخامة*:%0A${itemsList}%0A%0A💵 *الإجمالي المقدر:* ${encodeURIComponent(formatCurrency(total, settings.currency))}${customerInfo}%0A%0Aأرجو التواصل لتأكيد التجهيز وموعد التوصيل.`;
  return `https://wa.me/${phone}?text=${message}`;
}
