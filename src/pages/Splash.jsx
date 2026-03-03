import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-[#FF6B35] px-6 py-16">
      <div />

      <div className="flex flex-col items-center gap-6 animate-[fadeIn_0.6s_ease]">
        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
          <span className="text-5xl">🍕</span>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">foodypick</h1>
          <p className="text-[#FFE8DC] text-base mt-2 font-medium">Great food, honest prices.</p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3">
        <button
          onClick={() => navigate('/onboarding')}
          className="w-full bg-white text-[#FF6B35] font-bold text-base py-4 rounded-2xl shadow-lg active:scale-95 transition-transform"
        >
          Get Started
        </button>
        <button
          onClick={() => navigate('/onboarding')}
          className="w-full bg-transparent border-2 border-white text-white font-semibold text-base py-4 rounded-2xl active:scale-95 transition-transform"
        >
          Sign In
        </button>
        <p className="text-center text-[#FFE8DC] text-xs mt-2">
          No account needed to browse
        </p>
      </div>
    </div>
  );
}
