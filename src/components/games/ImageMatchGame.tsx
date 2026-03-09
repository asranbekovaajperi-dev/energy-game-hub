import { useState, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/i18n/translations';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface ImageMatchItem {
  image: string; // imported image path
  label: Record<Language, string>;
  description: Record<Language, string>;
}

interface ImageMatchGameProps {
  items: ImageMatchItem[];
  onComplete: (score: number) => void;
}

export function ImageMatchGame({ items, onComplete }: ImageMatchGameProps) {
  const { lang } = useLanguage();
  const [shuffledLabels] = useState(() => {
    const labels = items.map((item, idx) => ({ label: item.label, originalIdx: idx }));
    return labels.sort(() => Math.random() - 0.5);
  });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrongPair, setWrongPair] = useState<{ img: number; lbl: number } | null>(null);
  const [score, setScore] = useState(0);

  const handleImageClick = useCallback((idx: number) => {
    if (matched.has(idx)) return;
    setSelectedImage(idx);
    setWrongPair(null);
  }, [matched]);

  const handleLabelClick = useCallback((shuffledIdx: number) => {
    const originalIdx = shuffledLabels[shuffledIdx].originalIdx;
    if (matched.has(originalIdx)) return;

    if (selectedImage === null) {
      setSelectedLabel(shuffledIdx);
      return;
    }

    if (selectedImage === originalIdx) {
      // Correct match!
      setMatched(prev => new Set([...prev, originalIdx]));
      setScore(prev => prev + 1);
      setSelectedImage(null);
      setSelectedLabel(null);
      setWrongPair(null);

      if (matched.size + 1 === items.length) {
        setTimeout(() => onComplete(items.length), 800);
      }
    } else {
      // Wrong match
      setWrongPair({ img: selectedImage, lbl: shuffledIdx });
      setTimeout(() => {
        setWrongPair(null);
        setSelectedImage(null);
        setSelectedLabel(null);
      }, 1000);
    }
  }, [selectedImage, shuffledLabels, matched, items.length, onComplete]);

  const prompt = lang === 'kg'
    ? 'Сүрөттү туура аталышы менен дал келтириңиз!'
    : lang === 'ru'
    ? 'Сопоставьте изображение с правильным названием!'
    : 'Match the image with the correct label!';

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground text-center font-medium">{prompt}</p>
      <p className="text-xs text-center text-muted-foreground">
        {score} / {items.length} {lang === 'kg' ? 'дал келди' : lang === 'ru' ? 'совпало' : 'matched'}
      </p>

      <div className="grid grid-cols-2 gap-4">
        {/* Images column */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-center text-muted-foreground mb-2">
            {lang === 'kg' ? '📸 Сүрөттөр' : lang === 'ru' ? '📸 Изображения' : '📸 Images'}
          </p>
          {items.map((item, idx) => {
            const isMatched = matched.has(idx);
            const isSelected = selectedImage === idx;
            const isWrong = wrongPair?.img === idx;

            return (
              <motion.div
                key={idx}
                whileHover={{ scale: isMatched ? 1 : 1.03 }}
                whileTap={{ scale: isMatched ? 1 : 0.97 }}
              >
                <Card
                  className={`p-2 cursor-pointer transition-all border-2 overflow-hidden ${
                    isMatched
                      ? 'border-green-500/50 opacity-60'
                      : isWrong
                      ? 'border-destructive bg-destructive/10 animate-pulse'
                      : isSelected
                      ? 'border-primary bg-primary/10 ring-2 ring-primary/30'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleImageClick(idx)}
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.label[lang]}
                      className="w-full h-20 object-contain rounded"
                    />
                    {isMatched && (
                      <div className="absolute inset-0 flex items-center justify-center bg-green-500/20 rounded">
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      </div>
                    )}
                    {isWrong && (
                      <div className="absolute inset-0 flex items-center justify-center bg-destructive/20 rounded">
                        <XCircle className="h-8 w-8 text-destructive" />
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Labels column */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-center text-muted-foreground mb-2">
            {lang === 'kg' ? '🏷️ Аталыштар' : lang === 'ru' ? '🏷️ Названия' : '🏷️ Labels'}
          </p>
          {shuffledLabels.map((item, shuffledIdx) => {
            const isMatched = matched.has(item.originalIdx);
            const isSelected = selectedLabel === shuffledIdx;
            const isWrong = wrongPair?.lbl === shuffledIdx;

            return (
              <motion.div
                key={shuffledIdx}
                whileHover={{ scale: isMatched ? 1 : 1.03 }}
                whileTap={{ scale: isMatched ? 1 : 0.97 }}
              >
                <Card
                  className={`p-3 cursor-pointer transition-all border-2 text-center h-[96px] flex items-center justify-center ${
                    isMatched
                      ? 'border-green-500/50 opacity-60'
                      : isWrong
                      ? 'border-destructive bg-destructive/10 animate-pulse'
                      : isSelected
                      ? 'border-secondary bg-secondary/10'
                      : 'border-border hover:border-secondary/50'
                  }`}
                  onClick={() => handleLabelClick(shuffledIdx)}
                >
                  <div>
                    <p className="text-sm font-medium">{item.label[lang]}</p>
                    {isMatched && <CheckCircle className="mx-auto mt-1 h-4 w-4 text-green-500" />}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {matched.size === items.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-4"
          >
            <p className="text-green-600 font-bold text-lg">
              🎉 {lang === 'kg' ? 'Баарын туура дал келтирдиңиз!' : lang === 'ru' ? 'Всё правильно сопоставлено!' : 'All matched correctly!'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
