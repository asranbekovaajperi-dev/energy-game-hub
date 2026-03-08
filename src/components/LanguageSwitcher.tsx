import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/i18n/translations';

const flags: Record<Language, string> = { kg: '🇰🇬', ru: '🇷🇺', en: '🇬🇧' };
const labels: Record<Language, string> = { kg: 'KG', ru: 'RU', en: 'EN' };

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex gap-1 rounded-full bg-muted p-1">
      {(['kg', 'ru', 'en'] as Language[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
            lang === l
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <span>{flags[l]}</span>
          <span>{labels[l]}</span>
        </button>
      ))}
    </div>
  );
}
