import { useState, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/i18n/translations';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface WordSearchGameProps {
  words: Record<Language, string[]>;
  onComplete: (score: number) => void;
}

export function WordSearchGame({ words, onComplete }: WordSearchGameProps) {
  const { lang, t } = useLanguage();
  const targetWords = words[lang];

  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [input, setInput] = useState('');
  const [found, setFound] = useState<string[]>([]);
  const [shake, setShake] = useState(false);

  const scramble = useCallback((word: string) => {
    const chars = word.split('');
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars;
  }, []);

  const [scrambled] = useState(() => targetWords.map(w => scramble(w)));

  const handleSubmit = () => {
    const currentWord = targetWords[currentWordIdx];
    if (input.toUpperCase() === currentWord.toUpperCase()) {
      const newFound = [...found, currentWord];
      setFound(newFound);
      setInput('');
      if (newFound.length === targetWords.length) {
        onComplete(targetWords.length);
      } else {
        setCurrentWordIdx(i => i + 1);
      }
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const allFound = found.length === targetWords.length;

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground text-center">{t('findWords')}</p>

      <div className="flex flex-wrap gap-2 justify-center">
        {targetWords.map((w, i) => (
          <span
            key={i}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              found.includes(w)
                ? 'bg-green-500/20 text-green-700 line-through'
                : i === currentWordIdx
                ? 'bg-primary/20 text-primary'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {found.includes(w) ? w : '???'}
          </span>
        ))}
      </div>

      {!allFound && currentWordIdx < targetWords.length && (
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-3 text-center">
            {lang === 'kg' ? 'Тамгаларды туура жайгаштырыңыз:' : lang === 'ru' ? 'Составьте слово из букв:' : 'Unscramble the letters:'}
          </p>
          <div className="flex justify-center gap-2 mb-4">
            {scrambled[currentWordIdx].map((char, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-lg font-bold text-primary border border-primary/20"
              >
                {char}
              </motion.div>
            ))}
          </div>

          <motion.div animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder={lang === 'kg' ? 'Сөздү жазыңыз...' : lang === 'ru' ? 'Введите слово...' : 'Type the word...'}
              className="flex-1 rounded-lg border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button onClick={handleSubmit}>
              {lang === 'kg' ? 'Текшерүү' : lang === 'ru' ? 'Проверить' : 'Check'}
            </Button>
          </motion.div>
        </Card>
      )}

      {allFound && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-green-600 font-semibold text-lg"
        >
          {t('correct')} 🎉
        </motion.div>
      )}
    </div>
  );
}
