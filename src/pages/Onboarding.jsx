import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ChevronRight } from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function Onboarding() {
  const navigate = useNavigate();
  const { setPostcode, setAddress } = useUser();
  const [postcode, setLocal] = useState('');
  const [error, setError] = useState('');

  const handleContinue = () => {
    const trimmed = postcode.trim().toUpperCase();
    if (trimmed.length < 5) {
      setError('Please enter a valid postcode.');
      return;
    }
    setPostcode(trimmed);
    setAddress(`Flat 12, 47 Bridge Street, ${trimmed}`);
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] px-6">
      <div className="pt-16 pb-8">
        <div className="w-12 h-12 bg-[#FFE8DC] rounded-2xl flex items-center justify-center mb-6">
          <MapPin size={24} className="text-[#FF6B35]" />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900">Where are you?</h1>
        <p className="text-gray-500 mt-2 text-sm">Enter your postcode to see restaurants near you. No account needed.</p>
      </div>

      <div className="flex-1">
        <div className="space-y-3">
          <div>
            <input
              type="text"
              value={postcode}
              onChange={(e) => { setLocal(e.target.value); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
              placeholder="e.g. M1 1AE"
              className="w-full border-2 border-gray-200 rounded-2xl px-4 py-4 text-base font-medium focus:outline-none focus:border-[#FF6B35] transition-colors uppercase placeholder:normal-case placeholder:font-normal"
              autoFocus
            />
            {error && <p className="text-red-500 text-xs mt-1.5 ml-1">{error}</p>}
          </div>

          <button
            onClick={handleContinue}
            className="w-full bg-[#FF6B35] text-white font-bold text-base py-4 rounded-2xl active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            Find restaurants
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#FAFAF9] px-3 text-xs text-gray-400 font-medium">or sign in for saved addresses</span>
          </div>
        </div>

        <div className="space-y-3">
          {['Continue with Google', 'Continue with Apple'].map((label) => (
            <button
              key={label}
              onClick={handleContinue}
              className="w-full border-2 border-gray-200 rounded-2xl py-3.5 px-4 flex items-center justify-center gap-3 font-medium text-gray-700 active:bg-gray-50 transition-colors"
            >
              {label === 'Continue with Google' ? '🔵' : '🍎'}
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="text-center text-gray-400 text-xs pb-8">
        By continuing, you agree to our Terms and Privacy Policy.
      </p>
    </div>
  );
}
