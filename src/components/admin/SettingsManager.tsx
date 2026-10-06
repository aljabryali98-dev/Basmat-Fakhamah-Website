import React, { useState } from 'react';
import { Save, Check, Phone, MessageCircle, MapPin, Bell } from 'lucide-react';
import { StoreSettings } from '../../types';
import { storeService } from '../../services/storeService';

interface SettingsManagerProps {
  settings: StoreSettings;
}

export const SettingsManager: React.FC<SettingsManagerProps> = ({ settings }) => {
  const [formData, setFormData] = useState<StoreSettings>({ ...settings });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    storeService.saveSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#ECE4D8] p-6 sm:p-8 max-w-4xl mx-auto shadow-xs text-right">
      <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-4 mb-6">
        <div>
          <h2 className="text-xl font-bold font-heading text-[#1A1612]">
            إعدادات المعرض ووسائل التواصل
          </h2>
          <p className="text-xs text-[#7A6E5E] mt-1">
            عدل أرقام خدمة العملاء، وحسابات السوشيال ميديا، وشريط الإعلانات الترويجي العلوي.
          </p>
        </div>

        {saved && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Check className="w-3.5 h-3.5" />
            <span>تم الحفظ والتحديث فوراً!</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Brand identity */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[#1A1612] border-b border-gray-100 pb-2">
            هوية المعرض والبيانات العامة
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#4A4136] mb-1">اسم المعرض الرسمي:</label>
              <input
                type="text"
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9CEBC]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4A4136] mb-1">العبارة التسويقية (Tagline):</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9CEBC]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#4A4136] mb-1">عنوان صالة العرض والمقر:</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9CEBC]"
            />
          </div>
        </div>

        {/* Contact Numbers */}
        <div className="space-y-4 pt-4 border-t border-[#F0EAE1]">
          <h3 className="text-sm font-bold text-[#1A1612] border-b border-gray-100 pb-2">
            أرقام التواصل والربط المباشر
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#4A4136] mb-1">
                رقم الواتساب الرسمي (بدون مسافات مع رمز الدولة):
              </label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                placeholder="966500000000"
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9CEBC]"
                dir="ltr"
              />
              <span className="text-[10px] text-stone-500 mt-1 block">
                تُرسل إليه كافة طلبات واستفسارات الزوار التلقائية من الموقع
              </span>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4A4136] mb-1">
                رقم الهاتف المباشر للاتصال:
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9CEBC]"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* Social Accounts */}
        <div className="space-y-4 pt-4 border-t border-[#F0EAE1]">
          <h3 className="text-sm font-bold text-[#1A1612] border-b border-gray-100 pb-2">
            حسابات السوشيال ميديا (تظهر على التصاميم والموقع)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#4A4136] mb-1">Instagram Handle:</label>
              <input
                type="text"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9CEBC]"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4A4136] mb-1">TikTok Handle:</label>
              <input
                type="text"
                value={formData.tiktok}
                onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9CEBC]"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4A4136] mb-1">X / Twitter Handle:</label>
              <input
                type="text"
                value={formData.xPlatform}
                onChange={(e) => setFormData({ ...formData, xPlatform: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9CEBC]"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* Top Announcement Bar */}
        <div className="space-y-4 pt-4 border-t border-[#F0EAE1]">
          <h3 className="text-sm font-bold text-[#1A1612] border-b border-gray-100 pb-2">
            شريط الإعلانات الترويجي أعلى الموقع
          </h3>

          <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
            <input
              type="checkbox"
              checked={formData.announcementBarEnabled}
              onChange={(e) => setFormData({ ...formData, announcementBarEnabled: e.target.checked })}
              className="rounded accent-[#C8A265]"
            />
            <span>تفعيل شريط الإعلانات في أعلى الموقع</span>
          </label>

          <div>
            <label className="block text-xs font-medium text-[#4A4136] mb-1">نص الإعلان الترويجي:</label>
            <input
              type="text"
              value={formData.announcementText}
              onChange={(e) => setFormData({ ...formData, announcementText: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9CEBC]"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-6 border-t border-[#ECE4D8] flex justify-end">
          <button
            type="submit"
            className="px-7 py-3 rounded-lg bg-[#1A1612] hover:bg-[#342D26] text-[#E5C384] text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>حفظ الإعدادات المحدثة</span>
          </button>
        </div>
      </form>
    </div>
  );
};
