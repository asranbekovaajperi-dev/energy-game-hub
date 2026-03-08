import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/i18n/translations';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizQuestion {
  question: Record<Language, string>;
  options: Record<Language, string[]>;
  correct: number;
}

interface QuizGameProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

export function QuizGame({ questions, onComplete }: QuizGameProps) {
  const { lang, t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const q = questions[current];
  const isCorrect = selected === q.correct;

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === q.correct) setScore(s => s + 1);

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(c => c + 1);
        setSelected(null);
        setShowResult(false);
      } else {
        onComplete(idx === q.correct ? score + 1 : score);
      }
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{current + 1} / {questions.length} {t('questionsOf')}</span>
        <span>{t('score')}: {score}</span>
      </div>

      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full electric-gradient rounded-full"
          animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
        >
          <Card className="p-6 mb-4">
            <h3 className="text-lg font-semibold mb-1">{q.question[lang]}</h3>
          </Card>

          <div className="grid gap-3">
            {q.options[lang].map((opt, idx) => (
              <Button
                key={idx}
                variant="outline"
                className={`justify-start h-auto py-4 px-5 text-left text-base transition-all ${
                  selected === idx
                    ? idx === q.correct
                      ? 'border-green-500 bg-green-500/10 text-green-700'
                      : 'border-destructive bg-destructive/10 text-destructive'
                    : selected !== null && idx === q.correct
                    ? 'border-green-500 bg-green-500/10'
                    : ''
                }`}
                onClick={() => handleSelect(idx)}
                disabled={selected !== null}
              >
                <span className="mr-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium">
                  {String.fromCharCode(65 + idx)}
                </span>
                {opt}
                {showResult && idx === q.correct && <CheckCircle className="ml-auto h-5 w-5 text-green-500" />}
                {showResult && selected === idx && idx !== q.correct && <XCircle className="ml-auto h-5 w-5 text-destructive" />}
              </Button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
