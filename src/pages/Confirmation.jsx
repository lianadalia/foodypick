import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

export default function Confirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const orderId = state?.orderId || 'ORDER-0000';
  const restaurantName = state?.restaurant || 'Restaurant';
  const etaMin = state?.etaMin || 25;
  const etaMax = state?.etaMax || 35;

  const now = new Date();
  const arrivalMin = new Date(now.getTime() + etaMin * 60000);
  const arrivalMax = new Date(now.getTime() + etaMax * 60000);
  const fmt = (d) => d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex flex-col items-center justify-between px-6 py-16">
      <div />

      <div className={`flex flex-col items-center gap-6 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 size={56} className="text-green-500" strokeWidth={1.5} />
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-gray-900">Order confirmed!</h1>
          <p className="text-gray-500 text-sm mt-1">Your food is on its way from {restaurantName}.</p>
        </div>

        <div className="bg-white rounded-3xl p-6 w-full space-y-4 shadow-sm">
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">Order number</p>
            <p className="text-lg font-extrabold text-gray-900 mt-0.5">{orderId}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">Estimated arrival</p>
            <p className="text-lg font-extrabold text-[#FF6B35] mt-0.5">{fmt(arrivalMin)} – {fmt(arrivalMax)}</p>
            <p className="text-xs text-gray-400 mt-0.5">{etaMin}–{etaMax} minutes from now</p>
          </div>
          <div className="bg-[#FFE8DC] rounded-2xl p-3 text-center">
            <p className="text-xs text-[#CC4A1A] font-medium">We'll notify you at each stage of your order.</p>
          </div>
        </div>
      </div>

      <div className="w-full space-y-3">
        <button
          onClick={() => navigate('/tracking', { state: { orderId, etaMin, etaMax, restaurant: restaurantName } })}
          className="w-full bg-[#FF6B35] text-white font-bold text-base py-4 rounded-2xl active:scale-95 transition-transform"
        >
          Track My Order
        </button>
        <button
          onClick={() => navigate('/home')}
          className="w-full bg-white border-2 border-gray-200 text-gray-700 font-semibold text-base py-4 rounded-2xl active:scale-95 transition-transform"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
