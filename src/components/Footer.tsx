import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t, isRTL } = useLanguage();

  return (
    <footer className="bg-slate-900 border-t border-slate-700" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center">
          <p className="text-slate-400">
            {t('madeBy')} <span className="text-orange-500 font-semibold">Mohamad Mofaq</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
