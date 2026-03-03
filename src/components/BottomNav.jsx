import { Home, Search, Receipt, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const tabs = [
  { label: 'Home',    icon: Home,    path: '/home' },
  { label: 'Search',  icon: Search,  path: '/home', search: true },
  { label: 'Orders',  icon: Receipt, path: '/tracking' },
  { label: 'Profile', icon: User,    path: '/profile' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();

  const isActive = (tab) => {
    if (tab.path === '/home' && !tab.search) return location.pathname === '/home';
    if (tab.path === '/tracking') return ['/tracking', '/confirmation', '/orders'].includes(location.pathname);
    if (tab.path === '/profile') return location.pathname === '/profile';
    return false;
  };

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 z-40 safe-area-inset">
      <div className="flex">
        {tabs.map((tab) => {
          const active = isActive(tab);
          const Icon = tab.icon;
          const hasOrderBadge = tab.path === '/tracking' && cartCount > 0;

          return (
            <button
              key={tab.label}
              onClick={() => navigate(tab.path)}
              className="flex-1 flex flex-col items-center py-2 gap-0.5 relative"
            >
              <div className="relative">
                <Icon
                  size={22}
                  className={active ? 'text-[#FF6B35]' : 'text-gray-400'}
                  strokeWidth={active ? 2.5 : 1.8}
                />
                {hasOrderBadge && (
                  <span className="absolute -top-1 -right-1 bg-[#FF6B35] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium ${active ? 'text-[#FF6B35]' : 'text-gray-400'}`}>
                {tab.label}
              </span>
              {active && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#FF6B35] rounded-t-full" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
