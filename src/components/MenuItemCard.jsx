import { Plus, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DietaryBadge from './DietaryBadge';

export default function MenuItemCard({ item, restaurantId }) {
  const navigate = useNavigate();

  if (!item.available) {
    return (
      <div className="flex gap-3 p-3 opacity-50">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-sm font-medium text-gray-500 line-through">{item.name}</span>
            <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">Unavailable</span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{item.description}</p>
          <span className="text-sm font-semibold text-gray-400 mt-1 block">£{item.price.toFixed(2)}</span>
        </div>
        {item.image && (
          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl shrink-0 grayscale" loading="lazy" />
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => navigate(`/item/${restaurantId}/${item.id}`)}
      className="w-full text-left flex gap-3 p-3 active:bg-gray-50 transition-colors rounded-xl"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-sm font-medium text-gray-900">{item.name}</span>
          {item.popular && <Star size={11} className="fill-amber-400 text-amber-400" />}
        </div>
        <div className="flex gap-1 mt-1 flex-wrap">
          {item.dietaryTags.map((tag) => (
            <DietaryBadge key={tag} tag={tag} />
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
        <span className="text-sm font-semibold text-[#FF6B35] mt-1.5 block">£{item.price.toFixed(2)}</span>
      </div>

      <div className="relative shrink-0">
        {item.image && (
          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" loading="lazy" />
        )}
        <span className="absolute -bottom-1.5 -right-1.5 bg-[#FF6B35] text-white rounded-full w-6 h-6 flex items-center justify-center shadow">
          <Plus size={14} />
        </span>
      </div>
    </button>
  );
}
