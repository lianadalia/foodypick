import { Info } from 'lucide-react';
import { useState } from 'react';

export default function FeeBreakdown({ subtotal, deliveryFee, serviceFeePct, promoDiscount = 0 }) {
  const [showInfo, setShowInfo] = useState(false);
  const serviceFee = parseFloat(((subtotal * serviceFeePct) / 100).toFixed(2));
  const total = subtotal + deliveryFee + serviceFee - promoDiscount;

  return (
    <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Subtotal</span>
        <span>€{subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Delivery fee</span>
        <span>{deliveryFee === 0 ? <span className="text-green-600 font-medium">Free</span> : `€${deliveryFee.toFixed(2)}`}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <button className="flex items-center gap-1" onClick={() => setShowInfo((v) => !v)}>
          <span>Service fee ({serviceFeePct}%)</span>
          <Info size={13} className="text-gray-400" />
        </button>
        <span>€{serviceFee.toFixed(2)}</span>
      </div>
      {showInfo && (
        <p className="text-xs text-gray-400 bg-white rounded-xl p-2.5 border border-gray-100">
          The service fee supports foodypick — including our platform, customer support, and rider safety programmes.
        </p>
      )}
      {promoDiscount > 0 && (
        <div className="flex justify-between text-sm text-green-600 font-medium">
          <span>Promo discount</span>
          <span>-€{promoDiscount.toFixed(2)}</span>
        </div>
      )}
      <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-gray-900">
        <span>Total</span>
        <span>€{total.toFixed(2)}</span>
      </div>
    </div>
  );
}
