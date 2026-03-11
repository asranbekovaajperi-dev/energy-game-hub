import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/i18n/translations';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ThumbsUp, ThumbsDown } from 'lucide-react';

interface QuizQuestion {
  question: Record<Language, string>;
  options: Record<Language, string[]>;
  correct: number;
}

interface MixedQuizGameProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

type QuestionStyle = 'standard' | 'truefalse' | 'highlight' | 'grid';

export function MixedQuizGame({ questions, onComplete }: MixedQuizGameProps) {
  const { lang, t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Assign varied styles to each question
  const styles = useMemo<QuestionStyle[]>(() => {
    const s: QuestionStyle[] = [];
    const allStyles: QuestionStyle[] = ['standard', 'truefalse', 'highlight', 'grid'];
    for (let i = 0; i < questions.length; i++) {
      s.push(allStyles[i % allStyles.length]);
    }
    return s;
  }, [questions.length]);

  const q = questions[current];
  const style = styles[current];
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

  const optionColors = (idx: number) => {
    if (!showResult) return '';
    if (idx === q.correct) return 'border-green-500 bg-green-500/10 text-green-700';
    if (selected === idx) return 'border-destructive bg-destructive/10 text-destructive';
    return 'opacity-50';
  };

  const renderTrueFalse = () => {
    // Show first option as the "statement", ask true/false
    const statement = q.options[lang][q.correct];
    const allOptions = q.options[lang];
    const wrongOption = allOptions.find((_, i) => i !== q.correct) || allOptions[1];
    // Randomly show correct or wrong statement
    const showCorrectStatement = current % 2 === 0;
    const displayStatement = showCorrectStatement ? statement : wrongOption;
    const correctAnswer = showCorrectStatement ? 0 : 1;

    return (
      <div className="space-y-4">
        <Card className="p-6 text-center bg-muted/50">
          <p className="text-sm text-muted-foreground mb-2">{q.question[lang]}</p>
          <p className="text-lg font-bold">"{displayStatement}"</p>
        </Card>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className={`h-16 text-lg gap-2 ${
              showResult
                ? correctAnswer === 0
                  ? 'border-green-500 bg-green-500/10'
                  : selected === 0
                  ? 'border-destructive bg-destructive/10'
                  : ''
                : 'hover:border-green-500 hover:bg-green-500/5'
            }`}
            onClick={() => handleSelect(correctAnswer === 0 ? q.correct : (q.correct === 0 ? 1 : 0))}
            disabled={selected !== null}
          >
            <ThumbsUp className="h-5 w-5" />
            {lang === 'kg' ? 'Туура' : lang === 'ru' ? 'Верно' : 'True'}
          </Button>
          <Button
            variant="outline"
            className={`h-16 text-lg gap-2 ${
              showResult
                ? correctAnswer === 1
                  ? 'border-green-500 bg-green-500/10'
                  : selected !== null && correctAnswer !== 1
                  ? 'border-destructive bg-destructive/10'
                  : ''
                : 'hover:border-destructive hover:bg-destructive/5'
            }`}
            onClick={() => handleSelect(correctAnswer === 1 ? q.correct : (q.correct === 0 ? 1 : 0))}
            disabled={selected !== null}
          >
            <ThumbsDown className="h-5 w-5" />
            {lang === 'kg' ? 'Ката' : lang === 'ru' ? 'Неверно' : 'False'}
          </Button>
        </div>
      </div>
    );
  };

  const renderGrid = () => (
    <div className="space-y-4">
      <Card className="p-5 text-center">
        <h3 className="text-lg font-semibold">{q.question[lang]}</h3>
      </Card>
      <div className="grid grid-cols-2 gap-3">
        {q.options[lang].map((opt, idx) => (
          <motion.div key={idx} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Card
              className={`p-4 text-center cursor-pointer border-2 transition-all min-h-[80px] flex items-center justify-center ${optionColors(idx)} ${
                !showResult ? 'hover:border-primary hover:bg-primary/5' : ''
              }`}
              onClick={() => handleSelect(idx)}
            >
              <div>
                <span className="text-2xl font-bold text-muted-foreground/40 block mb-1">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-sm font-medium">{opt}</span>
                {showResult && idx === q.correct && <CheckCircle className="mx-auto mt-1 h-4 w-4 text-green-500" />}
                {showResult && selected === idx && idx !== q.correct && <XCircle className="mx-auto mt-1 h-4 w-4 text-destructive" />}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderHighlight = () => (
    <div className="space-y-4">
      <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
        <div className="text-3xl text-center mb-2">🤔</div>
        <h3 className="text-lg font-semibold text-center">{q.question[lang]}</h3>
      </Card>
      <div className="space-y-2">
        {q.options[lang].map((opt, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Button
              variant="outline"
              className={`w-full justify-start h-auto py-3 px-4 text-left text-base ${optionColors(idx)}`}
              onClick={() => handleSelect(idx)}
              disabled={selected !== null}
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
    </div>
  );

  const renderStandard = () => (
    <div className="space-y-4">
      <Card className="p-6">
        <h3 className="text-lg font-semibold">{q.question[lang]}</h3>
      </Card>
      <div className="grid gap-3">
        {q.options[lang].map((opt, idx) => (
          <Button
            key={idx}
            variant="outline"
            className={`justify-start h-auto py-4 px-5 text-left text-base transition-all ${optionColors(idx)}`}
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
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{current + 1} / {questions.length} {t('questionsOf')}</span>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-muted text-xs">
            {style === 'truefalse' ? '✋ Туура/Ката' : style === 'grid' ? '🔲 Тор' : style === 'highlight' ? '✨ Атайын' : '📝 Стандарт'}
          </span>
          <span>{t('score')}: {score}</span>
        </div>
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
          {style === 'truefalse' ? renderTrueFalse() :
           style === 'grid' ? renderGrid() :
           style === 'highlight' ? renderHighlight() :
           renderStandard()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
