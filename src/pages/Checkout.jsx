import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { getRestaurantById } from '../data/restaurants';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, restaurantId, subtotal, clearCart } = useCart();
  const { address, isGuest, signIn, addOrder } = useUser();
  const restaurant = restaurantId ? getRestaurantById(restaurantId) : null;

  const [deliveryNote, setDeliveryNote] = useState('');
  const [tip, setTip] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('apple-pay');
  const [showSignIn, setShowSignIn] = useState(false);
  const [placing, setPlacing] = useState(false);

  const deliveryFee = restaurant?.deliveryFee ?? 0;
  const serviceFeePct = restaurant?.serviceFeePct ?? 6;
  const serviceFee = parseFloat(((subtotal * serviceFeePct) / 100).toFixed(2));
  const total = subtotal + deliveryFee + serviceFee + tip;

  const placeOrder = async () => {
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 1500));
    const orderId = `ORDER-${Math.floor(1000 + Math.random() * 9000)}`;
    if (!isGuest) {
      addOrder({ id: orderId, restaurantId, restaurantName: restaurant?.name, items: items.map((i) => ({ name: i.item.name, quantity: i.quantity, price: i.item.price, selectedModifiers: i.selectedModifiers })), subtotal, deliveryFee, serviceFee, total, status: 'active' });
    }
    clearCart();
    navigate('/confirmation', { state: { orderId, restaurant: restaurant?.name, etaMin: restaurant?.etaMin, etaMax: restaurant?.etaMax } });
  };

  const tips = [0, 1, 2, 3];

  return (
    <div className="min-h-screen bg-[#FAFAF9] pb-10">
      <div className="bg-white px-4 pt-12 pb-4 border-b border-gray-100 sticky top-0 z-30 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
          <ArrowLeft size={18} className="text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Checkout</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Delivery address */}
        <div className="bg-white rounded-2xl p-4">
          <h2 className="text-sm font-bold text-gray-900 mb-3">Delivery address</h2>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="text-[#FF6B35] shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-gray-800 font-medium">{address || '47 Bridge Street, Manchester'}</p>
              <button className="text-xs text-[#FF6B35] font-medium mt-1">Change address</button>
            </div>
          </div>
          <div className="mt-3">
            <label className="text-xs font-medium text-gray-500 mb-1 block">Delivery note (optional)</label>
            <textarea
              value={deliveryNote}
              onChange={(e) => setDeliveryNote(e.target.value)}
              placeholder="e.g. Leave at door, buzz flat 12..."
              rows={2}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:border-[#FF6B35]"
            />
          </div>
        </div>

        {/* Sign-in prompt */}
        {isGuest && (
          <div className="bg-[#FFE8DC] rounded-2xl p-4">
            <p className="text-sm font-semibold text-[#CC4A1A]">Sign in to save your order history</p>
            <p className="text-xs text-[#CC4A1A]/70 mt-0.5">You can continue as guest — your order won't be saved.</p>
            <div className="flex gap-2 mt-3">
              <button onClick={() => signIn('Marcus', 'marcus@example.com')} className="flex-1 bg-[#FF6B35] text-white text-xs font-bold py-2.5 rounded-xl">
                Sign In
              </button>
              <button onClick={() => setShowSignIn(false)} className="flex-1 border border-[#FF6B35] text-[#FF6B35] text-xs font-semibold py-2.5 rounded-xl">
                Continue as Guest
              </button>
            </div>
          </div>
        )}

        {/* Payment */}
        <div className="bg-white rounded-2xl p-4">
          <h2 className="text-sm font-bold text-gray-900 mb-3">Payment</h2>
          <div className="space-y-2">
            {[
              { id: 'apple-pay', label: '🍎 Apple Pay', sub: 'Touch ID / Face ID' },
              { id: 'google-pay', label: '🔵 Google Pay', sub: 'Saved to Google' },
              { id: 'card', label: '💳 Card ending in 4242', sub: 'Visa · expires 06/27' },
            ].map((pm) => (
              <button
                key={pm.id}
                onClick={() => setPaymentMethod(pm.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                  paymentMethod === pm.id ? 'border-[#FF6B35] bg-[#FFE8DC]' : 'border-gray-200'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === pm.id ? 'border-[#FF6B35]' : 'border-gray-300'}`}>
                  {paymentMethod === pm.id && <div className="w-2 h-2 rounded-full bg-[#FF6B35]" />}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-800">{pm.label}</p>
                  <p className="text-xs text-gray-400">{pm.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tip */}
        <div className="bg-white rounded-2xl p-4">
          <h2 className="text-sm font-bold text-gray-900 mb-1">Tip your rider</h2>
          <p className="text-xs text-gray-400 mb-3">100% goes to your rider. Optional.</p>
          <div className="flex gap-2">
            {tips.map((t) => (
              <button
                key={t}
                onClick={() => setTip(t)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                  tip === t ? 'border-[#FF6B35] bg-[#FFE8DC] text-[#FF6B35]' : 'border-gray-200 text-gray-600'
                }`}
              >
                {t === 0 ? 'None' : `€${t}`}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl p-4 space-y-2">
          {[
            { label: 'Subtotal', val: `€${subtotal.toFixed(2)}` },
            { label: 'Delivery', val: deliveryFee === 0 ? 'Free' : `€${deliveryFee.toFixed(2)}` },
            { label: `Service fee (${serviceFeePct}%)`, val: `€${serviceFee.toFixed(2)}` },
            ...(tip > 0 ? [{ label: 'Rider tip', val: `€${tip.toFixed(2)}` }] : []),
          ].map(({ label, val }) => (
            <div key={label} className="flex justify-between text-sm text-gray-600">
              <span>{label}</span><span>{val}</span>
            </div>
          ))}
          <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-900">
            <span>Total</span><span>€{total.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={placeOrder}
          disabled={placing}
          className="w-full bg-[#FF6B35] text-white font-bold text-base py-4 rounded-2xl active:scale-95 transition-transform disabled:opacity-60"
        >
          {placing ? 'Placing order...' : `Place Order · €${total.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
}
