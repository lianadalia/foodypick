import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartButton() {
  const { cartCount, subtotal } = useCart();
  const navigate = useNavigate();

  if (cartCount === 0) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-[430px] px-4 pointer-events-none">
      <button
        onClick={() => navigate('/cart')}
        className="pointer-events-auto w-full bg-[#FF6B35] text-white rounded-2xl py-3.5 px-5 flex items-center justify-between shadow-lg active:scale-95 transition-transform"
      >
        <span className="bg-[#CC4A1A] text-white text-sm font-bold w-7 h-7 rounded-lg flex items-center justify-center">
          {cartCount}
        </span>
        <span className="font-semibold text-base">View Cart</span>
        <span className="font-semibold text-base">€{subtotal.toFixed(2)}</span>
      </button>
    </div>
  );
}
