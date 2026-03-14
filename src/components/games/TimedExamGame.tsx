import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/i18n/translations';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

interface QuizQuestion {
  question: Record<Language, string>;
  options: Record<Language, string[]>;
  correct: number;
}

interface TimedExamGameProps {
  questions: QuizQuestion[];
  timePerQuestion: number; // seconds
  onComplete: (score: number) => void;
}

type VisualStyle = 'standard' | 'cards' | 'numbered' | 'bold' | 'minimal';

export function TimedExamGame({ questions, timePerQuestion, onComplete }: TimedExamGameProps) {
  const { lang, t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const [timedOut, setTimedOut] = useState(false);

  const styles: VisualStyle[] = ['standard', 'cards', 'numbered', 'bold', 'minimal'];

  const goNext = useCallback(() => {
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowResult(false);
      setTimedOut(false);
      setTimeLeft(timePerQuestion);
    } else {
      onComplete(score);
    }
  }, [current, questions.length, score, onComplete, timePerQuestion]);

  // Timer
  useEffect(() => {
    if (showResult || timedOut) return;
    if (timeLeft <= 0) {
      setTimedOut(true);
      setShowResult(true);
      setTimeout(goNext, 1500);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, showResult, timedOut, goNext]);

  const q = questions[current];
  const style = styles[current % styles.length];

  const handleSelect = (idx: number) => {
    if (selected !== null || timedOut) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === q.correct) setScore(s => s + 1);
    setTimeout(goNext, 1200);
  };

  const timePercent = (timeLeft / timePerQuestion) * 100;
  const timeColor = timeLeft <= 10 ? 'bg-destructive' : timeLeft <= 20 ? 'bg-yellow-500' : 'bg-green-500';

  const optionStyle = (idx: number) => {
    if (!showResult) return '';
    if (idx === q.correct) return 'border-green-500 bg-green-500/10 text-green-700';
    if (selected === idx) return 'border-destructive bg-destructive/10 text-destructive';
    if (timedOut) return 'opacity-40';
    return 'opacity-50';
  };

  const renderOptions = () => {
    const opts = q.options[lang];

    if (style === 'cards') {
      return (
        <div className="grid grid-cols-2 gap-3">
          {opts.map((opt, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Card
                className={`p-4 text-center cursor-pointer border-2 transition-all min-h-[70px] flex items-center justify-center ${optionStyle(idx)} ${!showResult ? 'hover:border-primary hover:bg-primary/5' : ''}`}
                onClick={() => handleSelect(idx)}
              >
                <div>
                  <span className="text-xl font-bold text-muted-foreground/30 block">{String.fromCharCode(65 + idx)}</span>
                  <span className="text-sm font-medium">{opt}</span>
                  {showResult && idx === q.correct && <CheckCircle className="mx-auto mt-1 h-4 w-4 text-green-500" />}
                  {showResult && selected === idx && idx !== q.correct && <XCircle className="mx-auto mt-1 h-4 w-4 text-destructive" />}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      );
    }

    if (style === 'numbered') {
      return (
        <div className="space-y-2">
          {opts.map((opt, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.08 }}>
              <Button
                variant="outline"
                className={`w-full justify-start h-auto py-3 px-4 text-left text-base ${optionStyle(idx)}`}
                onClick={() => handleSelect(idx)}
                disabled={selected !== null || timedOut}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary mr-3">
                  {idx + 1}
                </span>
                {opt}
                {showResult && idx === q.correct && <CheckCircle className="ml-auto h-5 w-5 text-green-500" />}
                {showResult && selected === idx && idx !== q.correct && <XCircle className="ml-auto h-5 w-5 text-destructive" />}
              </Button>
            </motion.div>
          ))}
        </div>
      );
    }

    if (style === 'bold') {
      return (
        <div className="space-y-3">
          {opts.map((opt, idx) => (
            <Button
              key={idx}
              variant="outline"
              className={`w-full justify-start h-auto py-4 px-6 text-left text-lg font-semibold border-2 ${optionStyle(idx)} ${!showResult ? 'hover:border-primary' : ''}`}
              onClick={() => handleSelect(idx)}
              disabled={selected !== null || timedOut}
            >
              {opt}
              {showResult && idx === q.correct && <CheckCircle className="ml-auto h-6 w-6 text-green-500" />}
              {showResult && selected === idx && idx !== q.correct && <XCircle className="ml-auto h-6 w-6 text-destructive" />}
            </Button>
          ))}
        </div>
      );
    }

    if (style === 'minimal') {
      return (
        <div className="grid gap-2">
          {opts.map((opt, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border cursor-pointer transition-all text-sm ${optionStyle(idx)} ${!showResult ? 'hover:bg-muted' : ''} ${selected === null && !timedOut ? 'cursor-pointer' : 'cursor-default'}`}
              onClick={() => handleSelect(idx)}
            >
              <span className="text-muted-foreground mr-2">{String.fromCharCode(65 + idx)}.</span>
              {opt}
              {showResult && idx === q.correct && <CheckCircle className="inline ml-2 h-4 w-4 text-green-500" />}
              {showResult && selected === idx && idx !== q.correct && <XCircle className="inline ml-2 h-4 w-4 text-destructive" />}
            </div>
          ))}
        </div>
      );
    }

    // standard
    return (
      <div className="grid gap-3">
        {opts.map((opt, idx) => (
          <Button
            key={idx}
            variant="outline"
            className={`justify-start h-auto py-4 px-5 text-left text-base transition-all ${optionStyle(idx)}`}
            onClick={() => handleSelect(idx)}
            disabled={selected !== null || timedOut}
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
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{current + 1} / {questions.length}</span>
        <div className="flex items-center gap-3">
          <span>{t('score')}: {score}</span>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${timeLeft <= 10 ? 'bg-destructive/10 text-destructive' : 'bg-muted'}`}>
            <Clock className="h-3.5 w-3.5" />
            <span className="font-mono font-bold text-sm">{timeLeft}s</span>
          </div>
        </div>
      </div>

      {/* Timer bar */}
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${timeColor}`}
          animate={{ width: `${timePercent}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Timeout warning */}
      {timedOut && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          <AlertTriangle className="h-4 w-4" />
          <span>{lang === 'kg' ? 'Убакыт бүттү!' : lang === 'ru' ? 'Время вышло!' : 'Time is up!'}</span>
        </motion.div>
      )}

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
          <Card className="p-5 mb-4">
            <h3 className="text-lg font-semibold">{q.question[lang]}</h3>
          </Card>
          {renderOptions()}
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="flex flex-wrap gap-1 justify-center pt-2">
        {questions.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full ${i === current ? 'bg-primary' : i < current ? 'bg-green-400' : 'bg-muted'}`} />
        ))}
      </div>
    </div>
  );
}
