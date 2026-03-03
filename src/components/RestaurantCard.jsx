import { Star, Clock, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RestaurantCard({ restaurant }) {
  const navigate = useNavigate();
  const { id, name, cuisine, rating, reviewCount, deliveryFee, serviceFeePct, etaMin, etaMax, image, isNew } = restaurant;

  return (
    <button
      onClick={() => navigate(`/restaurant/${id}`)}
      className="w-full text-left bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 active:scale-[0.98] transition-transform"
    >
      <div className="relative h-44 bg-gray-200">
        <img src={image} alt={name} className="w-full h-full object-cover" loading="lazy" />
        {isNew && (
          <span className="absolute top-3 left-3 bg-[#FF6B35] text-white text-xs font-bold px-2 py-1 rounded-full">
            NEW
          </span>
        )}
        {deliveryFee === 0 && (
          <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Free delivery
          </span>
        )}
      </div>

      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">{name}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{cuisine}</p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold text-gray-700">{rating}</span>
            <span className="text-xs text-gray-400">({reviewCount})</span>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock size={12} />
            <span>{etaMin}–{etaMax} min</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <ShoppingBag size={12} />
            <span>{deliveryFee === 0 ? 'Free' : `€${deliveryFee.toFixed(2)}`} delivery</span>
          </div>
          <span className="text-xs text-gray-400">~{serviceFeePct}% service</span>
        </div>
      </div>
    </button>
  );
}
