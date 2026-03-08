import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/i18n/translations';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface DragItem {
  item: Record<Language, string>;
  target: Record<Language, string>;
}

interface DragDropGameProps {
  items: DragItem[];
  onComplete: (score: number) => void;
}

export function DragDropGame({ items, onComplete }: DragDropGameProps) {
  const { lang, t } = useLanguage();
  const [matched, setMatched] = useState<Record<number, number>>({});
  const [dragging, setDragging] = useState<number | null>(null);
  const [shuffledItems] = useState(() => {
    const indices = items.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  });

  const allMatched = Object.keys(matched).length === items.length;

  const handleDragStart = (idx: number) => setDragging(idx);

  const handleDrop = (targetIdx: number) => {
    if (dragging === null) return;
    if (dragging === targetIdx) {
      setMatched(prev => {
        const next = { ...prev, [targetIdx]: targetIdx };
        if (Object.keys(next).length === items.length) {
          setTimeout(() => onComplete(items.length), 800);
        }
        return next;
      });
    }
    setDragging(null);
  };

  const isItemMatched = (idx: number) => idx in matched;

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground text-center">{t('dragHere')}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Items to drag */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground mb-2">
            {lang === 'kg' ? 'Элементтер' : lang === 'ru' ? 'Элементы' : 'Elements'}
          </h4>
          {shuffledItems.map((idx) => (
            <motion.div
              key={idx}
              draggable={!isItemMatched(idx)}
              onDragStart={() => handleDragStart(idx)}
              onDragEnd={() => setDragging(null)}
              className={`cursor-grab active:cursor-grabbing ${isItemMatched(idx) ? 'opacity-40' : ''}`}
              whileDrag={{ scale: 1.05, rotate: 2 }}
            >
              <Card className={`p-4 text-center font-medium transition-all ${
                isItemMatched(idx) ? 'bg-green-500/10 border-green-500' : 'hover:shadow-md hover:border-primary'
              }`}>
                {items[idx].item[lang]}
                {isItemMatched(idx) && <CheckCircle className="inline ml-2 h-4 w-4 text-green-500" />}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Drop targets */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground mb-2">
            {lang === 'kg' ? 'Категориялар' : lang === 'ru' ? 'Категории' : 'Categories'}
          </h4>
          {items.map((item, idx) => (
            <div
              key={idx}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(idx)}
              className={`rounded-lg border-2 border-dashed p-4 text-center transition-all ${
                isItemMatched(idx)
                  ? 'border-green-500 bg-green-500/10'
                  : dragging !== null
                  ? 'border-primary bg-primary/5'
                  : 'border-border'
              }`}
            >
              <span className="text-sm font-medium">{item.target[lang]}</span>
              {isItemMatched(idx) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-1 text-xs text-green-600"
                >
                  ✓ {items[idx].item[lang]}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      {allMatched && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-green-600 font-semibold text-lg"
        >
          {t('correct')} 🎉
        </motion.div>
      )}
    </div>
  );
}
