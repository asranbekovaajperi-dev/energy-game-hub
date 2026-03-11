import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/i18n/translations';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

export interface CategoryItem {
  item: Record<Language, string>;
  category: Record<Language, string>;
  emoji: string;
}

interface CategoryGameProps {
  items: CategoryItem[];
  onComplete: (score: number) => void;
}

export function CategoryGame({ items, onComplete }: CategoryGameProps) {
  const { lang } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(items.map(i => i.category[lang]))];
    return cats;
  }, [items, lang]);

  // Shuffle items order once
  const [shuffledIndices] = useState(() => {
    const indices = items.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  });

  const currentItem = items[shuffledIndices[current]];
  const correctCategory = currentItem?.category[lang];
  const isCorrect = selected === correctCategory;
  const totalItems = Math.min(items.length, 25);

  const handleSelect = (cat: string) => {
    if (showResult) return;
    setSelected(cat);
    setShowResult(true);
    const correct = cat === correctCategory;
    if (correct) setScore(s => s + 1);

    setTimeout(() => {
      if (current + 1 < totalItems) {
        setCurrent(c => c + 1);
        setSelected(null);
        setShowResult(false);
      } else {
        onComplete(correct ? score + 1 : score);
      }
    }, 1000);
  };

  if (!currentItem) return null;

  return (
    <div className="space-y-5">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{current + 1} / {totalItems}</span>
        <span>✅ {score}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full electric-gradient rounded-full"
          animate={{ width: `${((current + 1) / totalItems) * 100}%` }}
        />
      </div>

      {/* Current item */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-4"
        >
          <Card className="p-6 text-center">
            <motion.div
              className="text-5xl mb-3"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {currentItem.emoji}
            </motion.div>
            <h3 className="text-xl font-bold">{currentItem.item[lang]}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {lang === 'kg' ? 'Кайсы категорияга кирет?' : lang === 'ru' ? 'К какой категории относится?' : 'Which category does it belong to?'}
            </p>
          </Card>

          {/* Category buttons */}
          <div className="grid gap-3">
            {categories.map((cat) => {
              const isSel = selected === cat;
              const isCorr = cat === correctCategory;
              return (
                <Button
                  key={cat}
                  variant="outline"
                  className={`h-auto py-4 px-5 text-base transition-all ${
                    showResult
                      ? isCorr
                        ? 'border-green-500 bg-green-500/10 text-green-700'
                        : isSel && !isCorr
                        ? 'border-destructive bg-destructive/10 text-destructive'
                        : ''
                      : 'hover:border-primary hover:bg-primary/5'
                  }`}
                  onClick={() => handleSelect(cat)}
                  disabled={showResult}
                >
                  <span className="flex-1 text-left">{cat}</span>
                  {showResult && isCorr && <CheckCircle className="h-5 w-5 text-green-500 ml-2" />}
                  {showResult && isSel && !isCorr && <XCircle className="h-5 w-5 text-destructive ml-2" />}
                </Button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
