import React, { useState, useEffect } from 'react';
import {
  Star,
  CheckCircle2,
  MessageSquare,
  ThumbsUp,
  User,
  MapPin,
  Sparkles,
  Send,
  ShieldCheck
} from 'lucide-react';
import { Product, ProductReview } from '../types';
import { storeService } from '../services/storeService';

interface ProductReviewsSectionProps {
  product: Product;
}

const RATING_LABELS: Record<number, string> = {
  5: 'ممتاز وفائق الفخامة',
  4: 'جيد جداً وراقي',
  3: 'جيد ومناسب',
  2: 'متوسط',
  1: 'غير راضٍ',
};

export const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({ product }) => {
  const [reviews, setReviews] = useState<ProductReview[]>(() =>
    storeService.getReviews(product.id)
  );
  const [ratingSummary, setRatingSummary] = useState(() =>
    storeService.getProductRatingSummary(product.id)
  );

  // Review form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formRating, setFormRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [formName, setFormName] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formComment, setFormComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, boolean>>({});

  // Reload reviews when product changes or update occurs
  useEffect(() => {
    const reload = () => {
      setReviews(storeService.getReviews(product.id));
      setRatingSummary(storeService.getProductRatingSummary(product.id));
    };
    reload();
    return storeService.subscribe(reload);
  }, [product.id]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) return;

    setSubmitting(true);
    setTimeout(() => {
      storeService.addReview({
        productId: product.id,
        customerName: formName.trim(),
        city: formCity.trim() || 'المملكة العربية السعودية',
        rating: formRating,
        comment: formComment.trim(),
        verifiedPurchase: true,
      });

      setSubmitting(false);
      setSubmittedSuccess(true);
      setFormName('');
      setFormCity('');
      setFormComment('');
      setFormRating(5);

      setTimeout(() => {
        setSubmittedSuccess(false);
        setIsFormOpen(false);
      }, 2500);
    }, 400);
  };

  const toggleHelpful = (reviewId: string) => {
    setHelpfulVotes((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const activeRating = hoverRating || formRating;

  return (
    <div className="mt-10 pt-8 border-t border-[#ECE4D8] text-right">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#C8A265]/20 text-[#9E7E45] border border-[#C8A265]/40">
              تجارب العملاء المعتمدة
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#1A1612] font-heading flex items-center gap-2">
            <span>آراء وتقييمات العملاء</span>
            <span className="text-sm font-normal text-[#8A7B69] font-sans">
              ({reviews.length} مراجعة)
            </span>
          </h3>
        </div>

        {!isFormOpen && (
          <button
            onClick={() => setIsFormOpen(true)}
            className="px-5 py-2.5 rounded-lg bg-[#1A1612] hover:bg-[#342D26] text-[#E5C384] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#C8A265]" />
            <span>كتابة تقييم ومراجعة للقطعة</span>
          </button>
        )}
      </div>

      {/* Ratings Overview Card */}
      <div className="bg-[#FAF8F5] p-5 sm:p-6 rounded-2xl border border-[#ECE4D8] mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Average Rating Big Box */}
          <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-[#E8DFD0] text-center shadow-xs">
            <span className="text-4xl sm:text-5xl font-black text-[#1A1612] font-heading mb-1">
              {reviews.length > 0 ? ratingSummary.average.toFixed(1) : '5.0'}
            </span>
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(ratingSummary.average)
                      ? 'fill-[#C8A265] text-[#C8A265]'
                      : 'text-stone-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-[#7A6E5E] font-medium">
              بناءً على {reviews.length} تقييم من عملاء المعرض
            </span>
            <span className="text-[11px] text-emerald-700 font-bold mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>مراجعات عملاء موثقة 100%</span>
            </span>
          </div>

          {/* Breakdown Progress Bars */}
          <div className="md:col-span-8 space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = ratingSummary.breakdown[stars] || 0;
              const percent = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : stars === 5 ? 100 : 0;

              return (
                <div key={stars} className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1 w-16 shrink-0 justify-end">
                    <span className="font-bold text-[#1A1612]">{stars}</span>
                    <Star className="w-3.5 h-3.5 fill-[#C8A265] text-[#C8A265]" />
                  </div>

                  <div className="flex-1 h-2.5 bg-stone-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#9E7E45] to-[#C8A265] rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <div className="w-12 text-left text-[11px] text-[#8A7B69] font-mono shrink-0">
                    {count} ({percent}%)
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Review Submission Form Modal / Box */}
      {isFormOpen && (
        <div className="bg-white p-6 rounded-2xl border-2 border-[#C8A265]/40 shadow-md mb-8 transition-all">
          <div className="flex items-center justify-between mb-4 border-b border-[#ECE4D8] pb-3">
            <div>
              <h4 className="text-base font-bold text-[#1A1612] font-heading">
                مشاركة تقييمك لقطعة: {product.name}
              </h4>
              <p className="text-xs text-[#7A6E5E] mt-0.5">
                رأيك يهمنا ويساعد عملاء بصمة الفخامة في اتخاذ قرارهم بكل ثقة.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="text-xs text-stone-400 hover:text-stone-700 cursor-pointer font-medium"
            >
              إلغاء
            </button>
          </div>

          {submittedSuccess ? (
            <div className="py-8 text-center bg-emerald-50 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2 animate-bounce" />
              <h5 className="text-base font-bold text-emerald-800 font-heading">
                شكراً لمشاركتك الكريمة!
              </h5>
              <p className="text-xs text-emerald-700 mt-1">
                تم حفظ ونشر مراجعتك وتقييمك بنجاح على صفحة هذه القطعة.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Star Rating Interactive Selector */}
              <div>
                <label className="block text-xs font-bold text-[#4A4136] mb-2">
                  اختر تقييمك بالنجوم:
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 p-2 bg-[#FAF8F5] rounded-xl border border-[#ECE4D8]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 cursor-pointer transition-transform hover:scale-110 focus:outline-none"
                        title={`${star} نجوم`}
                      >
                        <Star
                          className={`w-7 h-7 transition-colors ${
                            star <= activeRating
                              ? 'fill-[#C8A265] text-[#C8A265]'
                              : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  <span className="text-xs font-bold text-[#9E7E45] px-3 py-1 bg-[#FAF6EE] rounded-lg border border-[#C8A265]/30">
                    {RATING_LABELS[activeRating] || `${activeRating} نجوم`}
                  </span>
                </div>
              </div>

              {/* Customer Name & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#4A4136] mb-1">
                    الاسم الكريم *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="مثال: عبدالله الشمري، سارة العلي..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#D9CEBC] bg-[#FAF8F5] focus:outline-none focus:border-[#C8A265]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A4136] mb-1">
                    المدينة أو المنطقة
                  </label>
                  <input
                    type="text"
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    placeholder="مثال: الرياض، جدة، الخبر، القصيم..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#D9CEBC] bg-[#FAF8F5] focus:outline-none focus:border-[#C8A265]"
                  />
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-bold text-[#4A4136] mb-1">
                  نص المراجعة والتجربة *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  placeholder="حدثنا عن رأيك بالقطعة من حيث: جودة الخشب والتشطيب، نعومة الأقمشة، مظهرها في المكان، ودقة التوصيل..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#D9CEBC] bg-[#FAF8F5] focus:outline-none focus:border-[#C8A265]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#D9CEBC] text-xs font-bold text-stone-600 hover:bg-stone-100 cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-lg bg-[#1A1612] hover:bg-[#342D26] text-[#E5C384] text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'جاري الإرسال...' : 'نشر التقييم الآن'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Customer Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-[#ECE4D8]">
            <MessageSquare className="w-10 h-10 text-[#C8A265] mx-auto mb-3 opacity-60" />
            <h4 className="text-base font-bold text-[#1A1612] font-heading mb-1">
              كن أول من يقيّم هذه القطعة الفاخرة!
            </h4>
            <p className="text-xs text-[#7A6E5E] max-w-md mx-auto mb-4">
              لم يقم أحد بمراجعة هذا الموديل حتى الآن. شاركنا تجربتك وانطباعك الأول حول هذه القطعة.
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-5 py-2.5 rounded-lg bg-[#1A1612] text-[#E5C384] text-xs font-bold hover:bg-[#342D26] transition-colors cursor-pointer"
            >
              كتابة أول تقييم
            </button>
          </div>
        ) : (
          reviews.map((rev) => {
            const hasVoted = Boolean(helpfulVotes[rev.id]);

            return (
              <div
                key={rev.id}
                className="bg-white p-5 rounded-2xl border border-[#ECE4D8] shadow-xs hover:border-[#C8A265]/40 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  {/* User info */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FAF6EE] text-[#9E7E45] border border-[#C8A265]/30 flex items-center justify-center font-bold text-sm">
                      <User className="w-5 h-5 text-[#9E7E45]" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#1A1612]">
                          {rev.customerName}
                        </span>
                        {rev.verifiedPurchase && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>مشتري موثق</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-[#8A7B69] mt-0.5">
                        {rev.city && (
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 text-[#9E7E45]" />
                            <span>{rev.city}</span>
                          </span>
                        )}
                        <span>•</span>
                        <span>{rev.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  {/* Star Rating Badge */}
                  <div className="flex items-center gap-1 bg-[#FAF8F5] px-2.5 py-1 rounded-lg border border-[#ECE4D8] self-start sm:self-auto">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= rev.rating
                            ? 'fill-[#C8A265] text-[#C8A265]'
                            : 'text-stone-300'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-bold text-[#1A1612] mr-1 font-mono">
                      {rev.rating}.0
                    </span>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#383129] leading-relaxed font-light mb-3">
                  {rev.comment}
                </p>

                {/* Bottom Helpful Action */}
                <div className="flex items-center justify-between pt-2 border-t border-[#F5EFE6] text-[11px] text-[#8A7B69]">
                  <span className="text-[#9E7E45] font-medium">
                    تقييم معتمد لـ {product.name}
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleHelpful(rev.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      hasVoted
                        ? 'bg-[#FAF6EE] text-[#9E7E45] font-bold border border-[#C8A265]/40'
                        : 'text-stone-500 hover:text-[#1A1612] hover:bg-stone-50'
                    }`}
                  >
                    <ThumbsUp className={`w-3 h-3 ${hasVoted ? 'fill-current' : ''}`} />
                    <span>مفيد {hasVoted ? '(1)' : ''}</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
