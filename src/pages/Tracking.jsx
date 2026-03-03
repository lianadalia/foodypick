import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Circle, Phone } from 'lucide-react';

const STAGES = [
  { id: 'confirmed', label: 'Order confirmed', sub: 'We\'ve received your order' },
  { id: 'preparing', label: 'Preparing your food', sub: 'The kitchen is on it' },
  { id: 'collected', label: 'Rider collected', sub: 'On the way to you' },
  { id: 'arriving', label: 'Arriving soon', sub: 'Your rider is nearly there' },
];

export default function Tracking() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const etaMin = state?.etaMin || 25;
  const etaMax = state?.etaMax || 35;
  const orderId = state?.orderId || 'ORDER-0000';
  const restaurant = state?.restaurant || 'Restaurant';

  const [currentStage, setCurrentStage] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState((etaMin + etaMax) / 2 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const total = (etaMin + etaMax) / 2 * 60;
    const elapsed = total - secondsLeft;
    const pct = elapsed / total;
    if (pct > 0.75) setCurrentStage(3);
    else if (pct > 0.5) setCurrentStage(2);
    else if (pct > 0.2) setCurrentStage(1);
    else setCurrentStage(0);
  }, [secondsLeft, etaMin, etaMax]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  return (
    <div className="min-h-screen bg-[#FAFAF9] pb-10">
      <div className="bg-white px-4 pt-12 pb-4 border-b border-gray-100 sticky top-0 z-30 flex items-center gap-3">
        <button onClick={() => navigate('/home')} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
          <ArrowLeft size={18} className="text-gray-700" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-gray-900">Tracking</h1>
          <p className="text-xs text-gray-400">{orderId} · {restaurant}</p>
        </div>
      </div>

      {/* ETA card */}
      <div className="mx-4 mt-4 bg-[#FF6B35] rounded-3xl p-6 text-white">
        <p className="text-sm font-medium opacity-80">Estimated delivery</p>
        <div className="text-4xl font-extrabold mt-1 tabular-nums">
          {mins}:{secs.toString().padStart(2, '0')}
        </div>
        <p className="text-sm opacity-70 mt-1">minutes remaining</p>
        <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-1000"
            style={{ width: `${(1 - secondsLeft / ((etaMin + etaMax) / 2 * 60)) * 100}%` }}
          />
        </div>
      </div>

      {/* Status timeline */}
      <div className="mx-4 mt-4 bg-white rounded-3xl p-5">
        <h2 className="text-sm font-bold text-gray-900 mb-4">Order status</h2>
        <div className="space-y-0">
          {STAGES.map((stage, i) => {
            const done = i < currentStage;
            const active = i === currentStage;
            const future = i > currentStage;

            return (
              <div key={stage.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    done ? 'bg-green-500' : active ? 'bg-[#FF6B35]' : 'bg-gray-100'
                  }`}>
                    {done ? (
                      <CheckCircle2 size={18} className="text-white" />
                    ) : (
                      <Circle size={18} className={active ? 'text-white' : 'text-gray-300'} fill={active ? 'white' : 'none'} />
                    )}
                  </div>
                  {i < STAGES.length - 1 && (
                    <div className={`w-0.5 h-8 mt-1 ${done ? 'bg-green-300' : 'bg-gray-100'}`} />
                  )}
                </div>
                <div className="pb-6 pt-1">
                  <p className={`text-sm font-semibold ${future ? 'text-gray-300' : 'text-gray-900'}`}>{stage.label}</p>
                  <p className={`text-xs mt-0.5 ${future ? 'text-gray-200' : 'text-gray-400'}`}>{stage.sub}</p>
                  {active && (
                    <span className="inline-block mt-1 text-[10px] font-bold text-[#FF6B35] bg-[#FFE8DC] px-2 py-0.5 rounded-full animate-pulse">
                      In progress
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact rider */}
      <div className="mx-4 mt-4">
        <button className="w-full bg-white border-2 border-gray-200 rounded-2xl py-3.5 flex items-center justify-center gap-2 text-gray-700 font-semibold active:bg-gray-50">
          <Phone size={16} className="text-[#FF6B35]" />
          Contact rider
        </button>
      </div>

      <div className="mx-4 mt-3">
        <button onClick={() => navigate('/home')} className="w-full text-center text-sm text-gray-400 py-2">
          Back to Home
        </button>
      </div>
    </div>
  );
}
