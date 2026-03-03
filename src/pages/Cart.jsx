import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Trash2, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getRestaurantById } from '../data/restaurants';
import FeeBreakdown from '../components/FeeBreakdown';
import BottomNav from '../components/BottomNav';

const VALID_PROMOS = { FOODYPICK10: 0.1, WELCOME5: 5 };

export default function Cart() {
  const navigate = useNavigate();
  const { items, restaurantId, updateQuantity, removeItem, subtotal } = useCart();
  const restaurant = restaurantId ? getRestaurantById(restaurantId) : null;
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#FAFAF9] px-6">
        <span className="text-6xl">🛒</span>
        <h2 className="text-xl font-bold text-gray-900">Your cart is empty</h2>
        <p className="text-gray-500 text-sm text-center">Add some delicious items to get started.</p>
        <button onClick={() => navigate('/home')} className="bg-[#FF6B35] text-white font-bold px-8 py-3.5 rounded-2xl active:scale-95 transition-transform">
          Browse Restaurants
        </button>
        <BottomNav />
      </div>
    );
  }

  const deliveryFee = restaurant?.deliveryFee ?? 0;
  const serviceFeePct = restaurant?.serviceFeePct ?? 6;

  const promoDiscount = appliedPromo
    ? appliedPromo.type === 'pct'
      ? parseFloat((subtotal * appliedPromo.value).toFixed(2))
      : appliedPromo.value
    : 0;

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    const val = VALID_PROMOS[code];
    if (!val) {
      setPromoError('Invalid or expired promo code.');
      return;
    }
    setAppliedPromo({ code, type: typeof val === 'number' && val < 1 ? 'pct' : 'fixed', value: val });
    setPromoError('');
  };

  const belowMin = restaurant && subtotal < restaurant.minOrder;

  return (
    <div className="min-h-screen bg-[#FAFAF9] pb-32">
      <div className="bg-white px-4 pt-12 pb-4 border-b border-gray-100 sticky top-0 z-30 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
          <ArrowLeft size={18} className="text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Your Cart</h1>
        {restaurant && <span className="text-sm text-gray-400 ml-auto">from {restaurant.name}</span>}
      </div>

      <div className="px-4 py-4 space-y-3">
        {items.map((entry) => {
          const modCost = (entry.selectedModifiers || []).reduce((s, m) => s + (m.price || 0), 0);
          const unitPrice = entry.item.price + modCost;
          return (
            <div key={entry.key} className="bg-white rounded-2xl p-4 flex gap-3">
              {entry.item.image && (
                <img src={entry.item.image} alt={entry.item.name} className="w-16 h-16 object-cover rounded-xl shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{entry.item.name}</p>
                {entry.selectedModifiers?.length > 0 && (
                  <p className="text-xs text-gray-400 mt-0.5">{entry.selectedModifiers.map((m) => m.label).join(', ')}</p>
                )}
                <p className="text-sm font-bold text-[#FF6B35] mt-1">£{(unitPrice * entry.quantity).toFixed(2)}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button onClick={() => removeItem(entry.key)} className="text-gray-300 hover:text-red-400">
                  <Trash2 size={15} />
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(entry.key, entry.quantity - 1)}
                    className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center"
                  >
                    <Minus size={12} className="text-gray-600" />
                  </button>
                  <span className="text-sm font-semibold w-4 text-center">{entry.quantity}</span>
                  <button
                    onClick={() => updateQuantity(entry.key, entry.quantity + 1)}
                    className="w-7 h-7 rounded-lg border border-[#FF6B35] flex items-center justify-center"
                  >
                    <Plus size={12} className="text-[#FF6B35]" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Promo code */}
      <div className="px-4 pb-4">
        <div className="bg-white rounded-2xl p-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={promoCode}
                onChange={(e) => { setPromoCode(e.target.value); setPromoError(''); }}
                placeholder="Promo code"
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B35]"
                disabled={!!appliedPromo}
              />
            </div>
            {appliedPromo ? (
              <button onClick={() => { setAppliedPromo(null); setPromoCode(''); }} className="px-4 py-2.5 text-sm font-medium text-red-500 border border-red-200 rounded-xl">
                Remove
              </button>
            ) : (
              <button onClick={applyPromo} className="px-4 py-2.5 text-sm font-semibold text-[#FF6B35] border border-[#FF6B35] rounded-xl active:bg-[#FFE8DC]">
                Apply
              </button>
            )}
          </div>
          {promoError && <p className="text-red-500 text-xs mt-1.5">{promoError}</p>}
          {appliedPromo && <p className="text-green-600 text-xs mt-1.5 font-medium">Code "{appliedPromo.code}" applied!</p>}
          <p className="text-xs text-gray-400 mt-2">Try: FOODYPICK10 (10% off) or WELCOME5 (£5 off)</p>
        </div>
      </div>

      {/* Fee breakdown */}
      <div className="px-4 pb-4">
        <FeeBreakdown subtotal={subtotal} deliveryFee={deliveryFee} serviceFeePct={serviceFeePct} promoDiscount={promoDiscount} />
      </div>

      {belowMin && (
        <div className="px-4 pb-4">
          <p className="text-amber-700 bg-amber-50 text-xs px-3 py-2.5 rounded-xl text-center">
            Minimum order is £{restaurant.minOrder}. Add £{(restaurant.minOrder - subtotal).toFixed(2)} more.
          </p>
        </div>
      )}

      <div className="px-4">
        <button
          onClick={() => navigate('/checkout')}
          disabled={belowMin}
          className="w-full bg-[#FF6B35] text-white font-bold text-base py-4 rounded-2xl active:scale-95 transition-transform disabled:opacity-40 disabled:scale-100"
        >
          Proceed to Checkout
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
