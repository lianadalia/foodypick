import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, ShoppingBag, Heart } from 'lucide-react';
import { getRestaurantById } from '../data/restaurants';
import MenuItemCard from '../components/MenuItemCard';
import CartButton from '../components/CartButton';
import BottomNav from '../components/BottomNav';

export default function Restaurant() {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = getRestaurantById(id);
  const [activeCategory, setActiveCategory] = useState(0);
  const [liked, setLiked] = useState(false);
  const categoryRefs = useRef([]);
  const navRef = useRef(null);

  useEffect(() => {
    if (restaurant) setActiveCategory(0);
  }, [restaurant]);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAF9] gap-3">
        <span className="text-5xl">🍽️</span>
        <p className="text-gray-500">Restaurant not found.</p>
        <button onClick={() => navigate('/home')} className="text-[#FF6B35] font-semibold">Back to Home</button>
      </div>
    );
  }

  const scrollToCategory = (index) => {
    setActiveCategory(index);
    categoryRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] pb-32">
      {/* Hero image */}
      <div className="relative h-56 bg-gray-200">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow"
        >
          <ArrowLeft size={18} className="text-gray-700" />
        </button>
        <button
          onClick={() => setLiked((v) => !v)}
          className="absolute top-12 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow"
        >
          <Heart size={18} className={liked ? 'fill-[#FF6B35] text-[#FF6B35]' : 'text-gray-400'} />
        </button>
      </div>

      {/* Info */}
      <div className="bg-white px-4 pb-4 pt-4 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">{restaurant.name}</h1>
            <p className="text-sm text-gray-500 mt-0.5">{restaurant.cuisine}</p>
          </div>
          {restaurant.isNew && (
            <span className="bg-[#FFE8DC] text-[#FF6B35] text-xs font-bold px-2.5 py-1 rounded-full">NEW</span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-3">
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold text-gray-700">{restaurant.rating}</span>
            <span className="text-xs text-gray-400">({restaurant.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock size={14} />
            <span>{restaurant.etaMin}–{restaurant.etaMax} min</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <ShoppingBag size={14} />
            <span>{restaurant.deliveryFee === 0 ? 'Free delivery' : `£${restaurant.deliveryFee.toFixed(2)} delivery`}</span>
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">Min. order £{restaurant.minOrder}</span>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">~{restaurant.serviceFeePct}% service fee</span>
          <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">Open · closes 11 PM</span>
        </div>
      </div>

      {/* Sticky category nav */}
      <div ref={navRef} className="sticky top-0 z-20 bg-white border-b border-gray-100">
        <div className="flex gap-0 overflow-x-auto scrollbar-hide">
          {restaurant.categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(i)}
              className={`shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeCategory === i
                  ? 'border-[#FF6B35] text-[#FF6B35]'
                  : 'border-transparent text-gray-500'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="divide-y divide-gray-100">
        {restaurant.categories.map((cat, i) => (
          <section key={cat.id} ref={(el) => (categoryRefs.current[i] = el)} className="bg-white mb-2">
            <h2 className="px-4 pt-4 pb-2 text-sm font-bold text-gray-900 uppercase tracking-wide">{cat.name}</h2>
            <div className="divide-y divide-gray-50">
              {cat.items.map((item) => (
                <MenuItemCard key={item.id} item={item} restaurantId={id} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <CartButton />
      <BottomNav />
    </div>
  );
}
