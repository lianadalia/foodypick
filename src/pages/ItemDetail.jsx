import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
import { getItemById, getRestaurantById } from '../data/restaurants';
import { useCart } from '../context/CartContext';
import DietaryBadge from '../components/DietaryBadge';

export default function ItemDetail() {
  const { restaurantId, itemId } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const item = getItemById(restaurantId, itemId);
  const restaurant = getRestaurantById(restaurantId);

  const [quantity, setQuantity] = useState(1);
  const [selections, setSelections] = useState({});
  const [errors, setErrors] = useState({});

  if (!item || !restaurant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">
        <p className="text-gray-500">Item not found.</p>
        <button onClick={() => navigate(-1)} className="text-[#FF6B35] font-semibold">Go back</button>
      </div>
    );
  }

  const modifierCost = Object.values(selections).reduce((sum, opt) => sum + (opt?.price || 0), 0);
  const unitPrice = item.price + modifierCost;
  const total = unitPrice * quantity;

  const selectOption = (modId, option) => {
    setSelections((prev) => ({ ...prev, [modId]: option }));
    setErrors((prev) => ({ ...prev, [modId]: false }));
  };

  const handleAdd = () => {
    const newErrors = {};
    item.modifiers?.forEach((mod) => {
      if (mod.required && !selections[mod.id]) newErrors[mod.id] = true;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    addItem(restaurantId, item, quantity, Object.values(selections));
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex flex-col">
      {/* Image */}
      <div className="relative h-64 bg-gray-200 shrink-0">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-6xl">🍽️</span>
          </div>
        )}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow"
        >
          <ArrowLeft size={18} className="text-gray-700" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white px-4 pt-4 pb-4">
          <h1 className="text-xl font-extrabold text-gray-900">{item.name}</h1>
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {item.dietaryTags.map((tag) => <DietaryBadge key={tag} tag={tag} />)}
          </div>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">{item.description}</p>
          <p className="text-lg font-bold text-[#FF6B35] mt-2">£{item.price.toFixed(2)}</p>
        </div>

        {/* Modifiers */}
        {item.modifiers?.map((mod) => (
          <div key={mod.id} className="bg-white mt-2 px-4 py-4">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-sm font-bold text-gray-900">{mod.name}</h3>
              {mod.required && (
                <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">Required</span>
              )}
            </div>
            {errors[mod.id] && (
              <p className="text-red-500 text-xs mb-2">Please make a selection</p>
            )}
            <div className="space-y-2">
              {mod.options.map((opt) => {
                const selected = selections[mod.id]?.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => selectOption(mod.id, opt)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-xl border-2 transition-all ${
                      selected ? 'border-[#FF6B35] bg-[#FFE8DC]' : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        selected ? 'border-[#FF6B35]' : 'border-gray-300'
                      }`}>
                        {selected && <div className="w-2 h-2 rounded-full bg-[#FF6B35]" />}
                      </div>
                      <span className="text-sm text-gray-800">{opt.label}</span>
                    </div>
                    {opt.price > 0 && <span className="text-sm text-gray-500">+£{opt.price.toFixed(2)}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Add to cart bar */}
      <div className="bg-white border-t border-gray-100 px-4 pt-3 pb-8 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-9 h-9 rounded-xl border-2 border-gray-200 flex items-center justify-center active:bg-gray-50"
            >
              <Minus size={16} className="text-gray-600" />
            </button>
            <span className="text-lg font-bold text-gray-900 w-6 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-9 h-9 rounded-xl border-2 border-[#FF6B35] flex items-center justify-center active:bg-[#FFE8DC]"
            >
              <Plus size={16} className="text-[#FF6B35]" />
            </button>
          </div>
          <p className="text-sm text-gray-400">{quantity} × £{unitPrice.toFixed(2)}</p>
        </div>
        <button
          onClick={handleAdd}
          className="w-full bg-[#FF6B35] text-white font-bold text-base py-4 rounded-2xl flex items-center justify-between px-5 active:scale-95 transition-transform"
        >
          <ShoppingCart size={18} />
          <span>Add to Cart</span>
          <span>£{total.toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
}
