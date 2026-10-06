import React, { useState } from 'react';
import { ShoppingBag, CheckCircle, Clock, Truck, XCircle, Phone, MessageCircle } from 'lucide-react';
import { CustomerOrder, StoreSettings, OrderStatus } from '../../types';
import { storeService } from '../../services/storeService';
import { formatCurrency } from '../../utils/formatters';

interface OrdersManagerProps {
  orders: CustomerOrder[];
  settings: StoreSettings;
}

export const OrdersManager: React.FC<OrdersManagerProps> = ({ orders, settings }) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredOrders = orders.filter(
    (o) => statusFilter === 'all' || o.status === statusFilter
  );

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    storeService.updateOrderStatus(orderId, newStatus);
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">تم التسليم بنجاح</span>;
      case 'confirmed':
        return <span className="px-2 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">مؤكد ومجدول</span>;
      case 'cancelled':
        return <span className="px-2 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">ملغي</span>;
      case 'pending':
      default:
        return <span className="px-2 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">قيد المراجعة</span>;
    }
  };

  return (
    <div className="space-y-6 text-right">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#ECE4D8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-heading text-[#1A1612]">
            إدارة طلبات المعاينة والحجز ({orders.length})
          </h2>
          <p className="text-xs text-[#7A6E5E] mt-1">
            طلبات الشراء والاستفسار المباشرة الواردة من عملاء متجر بصمة عالم الفخامة.
          </p>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 text-xs rounded-lg border border-[#D9CEBC] bg-[#FAF8F5]"
        >
          <option value="all">كافة الحالات</option>
          <option value="pending">قيد المراجعة</option>
          <option value="confirmed">مؤكد</option>
          <option value="completed">تم التسليم</option>
          <option value="cancelled">ملغي</option>
        </select>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-[#ECE4D8] text-stone-500 text-sm">
            لا توجد طلبات مطابقة للمعايير المحددة
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-2xl border border-[#ECE4D8] shadow-xs space-y-4"
            >
              {/* Order Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F0EAE1] gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#9E7E45]">#{order.id}</span>
                    <span className="text-xs text-stone-400">|</span>
                    <span className="text-xs text-stone-500">{order.createdAt}</span>
                    <span className="text-xs text-stone-400">|</span>
                    <span className="text-xs text-stone-500 font-medium">المدينة: {order.customerCity}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#1A1612] mt-1">{order.customerName}</h3>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusBadge(order.status)}

                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                    className="px-2.5 py-1 text-xs rounded border border-[#D9CEBC] bg-[#FAF8F5]"
                  >
                    <option value="pending">قيد المراجعة</option>
                    <option value="confirmed">تأكيد الطلب</option>
                    <option value="completed">تم التسليم</option>
                    <option value="cancelled">إلغاء الطلب</option>
                  </select>
                </div>
              </div>

              {/* Items in this Order */}
              <div className="divide-y divide-gray-100">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-12 h-12 rounded-lg object-cover border"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-[#1A1612]">{item.productName}</h4>
                        <div className="text-[11px] text-stone-500 flex gap-2">
                          <span>الكمية: {item.quantity}</span>
                          {item.selectedColor && <span>اللون: {item.selectedColor}</span>}
                        </div>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-[#1A1612]">
                      {formatCurrency(item.price * item.quantity, settings.currency)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Customer Contact & Total */}
              <div className="pt-3 border-t border-[#F0EAE1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-4">
                  <a
                    href={`tel:${order.customerPhone}`}
                    className="flex items-center gap-1.5 text-stone-700 hover:text-[#9E7E45] font-bold"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#9E7E45]" />
                    <span dir="ltr">{order.customerPhone}</span>
                  </a>

                  {order.customerPhone && (
                    <a
                      href={`https://wa.me/${order.customerPhone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[#25D366] hover:underline font-bold"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-[#25D366]" />
                      <span>مراسلة واتساب</span>
                    </a>
                  )}

                  {order.customerAddress && (
                    <span className="text-stone-500">العنوان: {order.customerAddress}</span>
                  )}
                </div>

                <div className="text-sm font-extrabold text-[#1A1612] font-heading">
                  الإجمالي: {formatCurrency(order.totalAmount, settings.currency)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
