import { useNavigate } from 'react-router-dom';
import { User, MapPin, Package, ChevronRight, LogOut, Star } from 'lucide-react';
import { useUser } from '../context/UserContext';
import BottomNav from '../components/BottomNav';

export default function Profile() {
  const navigate = useNavigate();
  const { isGuest, user, savedOrders, signIn, signOut } = useUser();

  if (isGuest) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] pb-24">
        <div className="bg-white px-4 pt-12 pb-4 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-900">Profile</h1>
        </div>
        <div className="flex flex-col items-center justify-center py-20 px-6 gap-4">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
            <User size={36} className="text-gray-400" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">Sign in to see your profile</h2>
          <p className="text-gray-500 text-sm text-center">Save addresses, view order history, and reorder your favourites.</p>
          <button onClick={() => signIn('Marcus', 'marcus@example.com')} className="w-full bg-[#FF6B35] text-white font-bold py-4 rounded-2xl active:scale-95 transition-transform">
            Sign In
          </button>
          <button className="w-full border-2 border-gray-200 text-gray-700 font-semibold py-4 rounded-2xl active:scale-95 transition-transform">
            Create Account
          </button>
        </div>
        <BottomNav />
      </div>
    );
  }

  const initials = user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase() || 'M';

  return (
    <div className="min-h-screen bg-[#FAFAF9] pb-24">
      <div className="bg-white px-4 pt-12 pb-4 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900">Profile</h1>
      </div>

      {/* User card */}
      <div className="mx-4 mt-4 bg-[#FF6B35] rounded-3xl p-5 text-white flex items-center gap-4">
        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
          <span className="text-xl font-extrabold">{initials}</span>
        </div>
        <div>
          <p className="text-lg font-extrabold">{user?.name || 'Marcus'}</p>
          <p className="text-sm opacity-70">{user?.email || 'marcus@example.com'}</p>
        </div>
      </div>

      {/* Saved addresses */}
      <div className="mx-4 mt-4 bg-white rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50">
          <h2 className="text-sm font-bold text-gray-900">Saved addresses</h2>
        </div>
        <div className="px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 bg-[#FFE8DC] rounded-xl flex items-center justify-center shrink-0">
            <MapPin size={16} className="text-[#FF6B35]" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Home</p>
            <p className="text-xs text-gray-400 mt-0.5">Flat 12, 47 Bridge Street, M1 1AE</p>
          </div>
          <ChevronRight size={16} className="text-gray-300" />
        </div>
        <button className="w-full px-4 py-3 text-[#FF6B35] text-sm font-medium text-left border-t border-gray-50">
          + Add new address
        </button>
      </div>

      {/* Order history */}
      <div className="mx-4 mt-4 bg-white rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-900">Order history</h2>
          <span className="text-xs text-gray-400">{savedOrders.length} orders</span>
        </div>

        {savedOrders.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <Package size={36} className="text-gray-200 mx-auto mb-2" />
            <p className="text-sm text-gray-400">No past orders yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {savedOrders.map((order) => (
              <button
                key={order.id}
                onClick={() => navigate(`/restaurant/${order.restaurantId}`)}
                className="w-full px-4 py-4 flex items-center gap-3 active:bg-gray-50 transition-colors text-left"
              >
                <img
                  src={order.restaurantImage}
                  alt={order.restaurantName}
                  className="w-12 h-12 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{order.restaurantName}</p>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">
                    {order.items.slice(0, 2).map((i) => i.name).join(', ')}
                    {order.items.length > 2 ? ` +${order.items.length - 2} more` : ''}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">{order.date}</span>
                    {order.rating && (
                      <div className="flex items-center gap-0.5">
                        <Star size={10} className="fill-amber-400 text-amber-400" />
                        <span className="text-xs text-gray-400">{order.rating}</span>
                      </div>
                    )}
                    <span className="text-xs font-semibold text-[#FF6B35]">£{order.total?.toFixed(2)}</span>
                  </div>
                </div>
                <div className="shrink-0">
                  <span className="text-xs font-semibold text-[#FF6B35] bg-[#FFE8DC] px-2.5 py-1 rounded-full">Reorder</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sign out */}
      <div className="mx-4 mt-4 mb-4">
        <button onClick={signOut} className="w-full flex items-center justify-center gap-2 py-3.5 text-red-500 font-semibold text-sm border-2 border-red-100 rounded-2xl active:bg-red-50">
          <LogOut size={16} />
          Sign out
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
