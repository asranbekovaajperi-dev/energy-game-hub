import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/i18n/translations';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

interface ImageItem {
  emoji: string;
  label: Record<Language, string>;
  correct: boolean;
}

interface ImageFindGameProps {
  items: ImageItem[];
  onComplete: (score: number) => void;
}

export function ImageFindGame({ items, onComplete }: ImageFindGameProps) {
  const { lang, t } = useLanguage();
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [revealed, setRevealed] = useState(false);

  const correctCount = items.filter(i => i.correct).length;

  const toggleSelect = (idx: number) => {
    if (revealed) return;
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const handleCheck = () => {
    setRevealed(true);
    let score = 0;
    items.forEach((item, idx) => {
      const isSelected = selected.has(idx);
      if ((item.correct && isSelected) || (!item.correct && !isSelected)) {
        score++;
      }
    });
    setTimeout(() => onComplete(score), 2000);
  };

  const prompt = lang === 'kg'
    ? 'Электрге тиешелүү сүрөттөрдү тандаңыз!'
    : lang === 'ru'
    ? 'Выберите картинки, связанные с электричеством!'
    : 'Select images related to electricity!';

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground text-center font-medium">{prompt}</p>

      <div className="grid grid-cols-3 gap-3">
        {items.map((item, idx) => {
          const isSelected = selected.has(idx);
          const isCorrectItem = item.correct;

          let borderClass = 'border-border';
          if (revealed) {
            if (isSelected && isCorrectItem) borderClass = 'border-green-500 bg-green-500/10';
            else if (isSelected && !isCorrectItem) borderClass = 'border-destructive bg-destructive/10';
            else if (!isSelected && isCorrectItem) borderClass = 'border-yellow-500 bg-yellow-500/10';
          } else if (isSelected) {
            borderClass = 'border-primary bg-primary/10';
          }

          return (
            <motion.div
              key={idx}
              whileHover={{ scale: revealed ? 1 : 1.05 }}
              whileTap={{ scale: revealed ? 1 : 0.95 }}
            >
              <Card
                className={`p-3 text-center cursor-pointer transition-all border-2 ${borderClass} ${revealed ? '' : 'hover:shadow-md'}`}
                onClick={() => toggleSelect(idx)}
              >
                <div className="text-4xl mb-2">{item.emoji}</div>
                <p className="text-xs font-medium truncate">{item.label[lang]}</p>
                {revealed && isSelected && isCorrectItem && (
                  <CheckCircle className="mx-auto mt-1 h-4 w-4 text-green-500" />
                )}
                {revealed && isSelected && !isCorrectItem && (
                  <XCircle className="mx-auto mt-1 h-4 w-4 text-destructive" />
                )}
                {revealed && !isSelected && isCorrectItem && (
                  <span className="text-xs text-yellow-600 block mt-1">⚠️</span>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {!revealed && (
        <div className="text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            {lang === 'kg' ? `${correctCount} туура жооп бар` : lang === 'ru' ? `${correctCount} правильных ответов` : `${correctCount} correct answers`}
          </p>
          <Button
            onClick={handleCheck}
            disabled={selected.size === 0}
            className="electric-gradient text-primary-foreground"
          >
            {lang === 'kg' ? 'Текшерүү' : lang === 'ru' ? 'Проверить' : 'Check'}
          </Button>
        </div>
      )}

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center font-semibold text-lg"
          >
            {(() => {
              const correctSelections = items.filter((item, idx) => item.correct && selected.has(idx)).length;
              const wrongSelections = items.filter((item, idx) => !item.correct && selected.has(idx)).length;
              return (
                <span className={wrongSelections === 0 && correctSelections === correctCount ? 'text-green-600' : 'text-amber-600'}>
                  ✅ {correctSelections}/{correctCount} {lang === 'kg' ? 'туура табылды' : lang === 'ru' ? 'найдено правильно' : 'found correctly'}
                  {wrongSelections > 0 && ` | ❌ ${wrongSelections} ${lang === 'kg' ? 'ката' : lang === 'ru' ? 'ошибок' : 'wrong'}`}
                </span>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
