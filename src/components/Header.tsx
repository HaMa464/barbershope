import { Scissors, BarChart3 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  currentPage: 'booking' | 'dashboard';
  onNavigate: (page: 'booking' | 'dashboard') => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const { t, language, setLanguage, isRTL } = useLanguage();

  return (
    <header className="bg-slate-900 border-b border-slate-700" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Scissors className="w-8 h-8 text-orange-500" />
            <h1 className="text-2xl font-bold text-white">{t('premiumBarber')}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2 bg-slate-800 rounded-lg p-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  language === 'en'
                    ? 'bg-orange-500 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ku')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  language === 'ku'
                    ? 'bg-orange-500 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                کوردی
              </button>
              <button
                onClick={() => setLanguage('ar')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  language === 'ar'
                    ? 'bg-orange-500 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                عربي
              </button>
            </div>

            <button
              onClick={() => onNavigate('booking')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                currentPage === 'booking'
                  ? 'bg-orange-500 text-white'
                  : 'bg-slate-700 text-white hover:bg-slate-600'
              }`}
            >
              {t('bookNow')}
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                currentPage === 'dashboard'
                  ? 'bg-orange-500 text-white'
                  : 'bg-slate-700 text-white hover:bg-slate-600'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              {t('dashboard')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
