import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { StoreSettings } from '../types';

interface ContactSectionProps {
  settings: StoreSettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-[#9E7E45] uppercase mb-2 block">
            يسعدنا استقبالكم واستفساراتكم
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1A1612] font-heading mb-4">
            تواصل مع مستشاري الفخامة
          </h2>
          <p className="text-sm sm:text-base text-[#6E6050] font-light leading-relaxed">
            فريقنا المتخصص في خدمة العملاء ومستشاري التأثيث جاهزون للرد على كافة استفساراتكم وترتيب زيارتكم لصالة العرض.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-right">
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-white rounded-2xl border border-[#ECE4D8] shadow-xs space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#FAF6EE] text-[#9E7E45] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1A1612] mb-1">صالة العرض والمقر الرئيسي</h4>
                  <p className="text-xs text-[#6E6050] leading-relaxed">{settings.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#FAF6EE] text-[#9E7E45] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1A1612] mb-1">الاتصال الهاتفي المباشر</h4>
                  <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="text-xs text-[#9E7E45] font-bold" dir="ltr">
                    {settings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1A1612] mb-1">خدمة واتساب الفورية</h4>
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#25D366] font-bold"
                    dir="ltr"
                  >
                    +{settings.whatsapp}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#FAF6EE] text-[#9E7E45] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1A1612] mb-1">أوقات العمل واستقبال الزوار</h4>
                  <p className="text-xs text-[#6E6050]">السبت إلى الخميس: 9:30 صباحاً – 11:00 مساءً</p>
                  <p className="text-xs text-[#6E6050]">الجمعة: 4:00 عصراً – 11:00 مساءً</p>
                </div>
              </div>
            </div>

            {/* Social media links */}
            <div className="p-6 bg-[#1A1612] text-white rounded-2xl">
              <h4 className="text-sm font-bold text-[#E5C384] mb-3">حسابات التواصل الرسمية</h4>
              <p className="text-xs text-[#D1C7B7] mb-4">تابعوا تغطياتنا اليومية لأحدث قطع الأثاث والشحنات الواصلة حديثاً.</p>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-3 py-1.5 rounded bg-white/10 text-white">Instagram: @{settings.instagram}</span>
                <span className="px-3 py-1.5 rounded bg-white/10 text-white">TikTok: @{settings.tiktok}</span>
                <span className="px-3 py-1.5 rounded bg-white/10 text-white">X: @{settings.xPlatform}</span>
              </div>
            </div>
          </div>

          {/* Contact Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-[#ECE4D8] shadow-xs">
            {sent ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold text-[#1A1612] font-heading">شكراً لتواصلك معنا!</h3>
                <p className="text-sm text-[#6E6050] max-w-sm mx-auto">
                  تم استلام رسالتك وسيتواصل معك مستشار خدمة العملاء في أقرب وقت.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-[#1A1612] font-heading mb-6">
                  إرسال استفسار أو حجز موعد زيارة
                </h3>

                <div>
                  <label className="block text-xs font-medium text-[#4A4136] mb-1">الاسم الكامل *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: د. عبدالعزيز السالم"
                    className="w-full px-4 py-2.5 text-sm rounded-lg border border-[#D9CEBC] focus:outline-hidden focus:ring-2 focus:ring-[#C8A265]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A4136] mb-1">رقم الهاتف / الجوال *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="05XXXXXXXX"
                    className="w-full px-4 py-2.5 text-sm rounded-lg border border-[#D9CEBC] focus:outline-hidden focus:ring-2 focus:ring-[#C8A265]"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A4136] mb-1">تفاصيل الاستفسار أو موعد المعاينة</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="اكتب استفسارك عن المنتج أو المقاس أو التوصيل..."
                    className="w-full px-4 py-2.5 text-sm rounded-lg border border-[#D9CEBC] focus:outline-hidden focus:ring-2 focus:ring-[#C8A265]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#1A1612] hover:bg-[#342D26] text-[#E5C384] text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال الاستفسار الآن</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
