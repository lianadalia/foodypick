import { useState, useMemo } from 'react';
import { Search, Bell, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { restaurants, cuisines } from '../data/restaurants';
import { useUser } from '../context/UserContext';
import RestaurantCard from '../components/RestaurantCard';
import BottomNav from '../components/BottomNav';

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
      <div className="h-44 bg-gray-200" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-3 bg-gray-100 rounded w-1/3" />
        <div className="h-3 bg-gray-100 rounded w-1/2" />
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { postcode, savedOrders } = useUser();
  const [query, setQuery] = useState('');
  const [activeCuisine, setActiveCuisine] = useState('All');
  const [loading] = useState(false);

  const filtered = useMemo(() => {
    let result = restaurants;
    if (activeCuisine !== 'All') {
      result = result.filter((r) => r.tags.includes(activeCuisine));
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [query, activeCuisine]);

  const recentOrders = savedOrders.slice(0, 2);

  return (
    <div className="min-h-screen bg-[#FAFAF9] pb-24">
      {/* Header */}
      <div className="bg-white px-4 pt-10 pb-4 sticky top-0 z-30 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-gray-400">Delivering to</p>
            <button className="text-sm font-semibold text-gray-900 flex items-center gap-1">
              {postcode || 'Set location'}
            </button>
          </div>
          <button className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center relative">
            <Bell size={18} className="text-gray-600" />
          </button>
        </div>

        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search restaurants or cuisines..."
            className="w-full bg-gray-100 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/30"
          />
        </div>
      </div>

      {/* Cuisine chips */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
        {cuisines.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCuisine(c)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCuisine === c
                ? 'bg-[#FF6B35] text-white'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="px-4 space-y-6">
        {/* Order Again */}
        {recentOrders.length > 0 && (
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
              <RotateCcw size={16} className="text-[#FF6B35]" />
              Order Again
            </h2>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
              {recentOrders.map((order) => (
                <button
                  key={order.id}
                  onClick={() => navigate(`/restaurant/${order.restaurantId}`)}
                  className="shrink-0 flex items-center gap-2.5 bg-white rounded-2xl p-3 border border-gray-100 shadow-sm active:scale-95 transition-transform"
                >
                  <img
                    src={order.restaurantImage}
                    alt={order.restaurantName}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div className="text-left">
                    <p className="text-xs font-semibold text-gray-900">{order.restaurantName}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{order.items[0].name}</p>
                    <p className="text-[11px] text-[#FF6B35] font-medium mt-0.5">Reorder</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Restaurant list */}
        <section>
          <h2 className="text-base font-bold text-gray-900 mb-3">
            {activeCuisine === 'All' ? 'All Restaurants' : activeCuisine} · {filtered.length}
          </h2>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-5xl">🍽️</span>
              <p className="text-gray-500 mt-3 text-sm">No restaurants found for "{query}"</p>
              <button onClick={() => { setQuery(''); setActiveCuisine('All'); }} className="text-[#FF6B35] text-sm font-medium mt-2">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((r) => <RestaurantCard key={r.id} restaurant={r} />)}
            </div>
          )}
        </section>
      </div>

      <BottomNav />
    </div>
  );
}
