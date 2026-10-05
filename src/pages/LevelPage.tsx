import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProgress } from '@/contexts/ProgressContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { levels } from '@/data/levels';
import { categoryItems1, categoryItems2, categoryItems3, categoryItems4, categoryItems5, categoryItems6, categoryItems7, categoryItems8, categoryItems9, categoryItems10, categoryItems11, categoryItems12, categoryItems13 } from '@/data/categoryData';
import { examQuestions } from '@/data/examQuestions';
import { QuizGame } from '@/components/games/QuizGame';
import { MixedQuizGame } from '@/components/games/MixedQuizGame';
import { TimedExamGame } from '@/components/games/TimedExamGame';
import { DragDropGame } from '@/components/games/DragDropGame';
import { WordSearchGame } from '@/components/games/WordSearchGame';
import { ImageFindGame } from '@/components/games/ImageFindGame';
import { ImageMatchGame } from '@/components/games/ImageMatchGame';
import { CategoryGame } from '@/components/games/CategoryGame';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, ArrowRight } from 'lucide-react';

const categoryMap = [categoryItems1, categoryItems2, categoryItems3, categoryItems4, categoryItems5, categoryItems6, categoryItems7, categoryItems8, categoryItems9, categoryItems10, categoryItems11, categoryItems12, categoryItems13];

export default function LevelPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const { completeLevel, isUnlocked } = useProgress();

  const levelId = parseInt(id || '1');
  const level = levels.find(l => l.id === levelId);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);
  const [testScore, setTestScore] = useState(0);

  if (!level || !isUnlocked(levelId)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center space-y-4">
          <p className="text-lg">{t('locked')}</p>
          <Button onClick={() => navigate('/levels')}>{t('back')}</Button>
        </Card>
      </div>
    );
  }

  const handleGameComplete = (score: number) => {
    setGameScore(score);
    setGameCompleted(true);
  };

  const handleTestComplete = (score: number) => {
    setTestScore(score);
    setTestCompleted(true);
    const totalQuestions = levelId === 14 ? examQuestions.length : level.quiz.length;
    if (score >= Math.ceil(totalQuestions * 0.5)) {
      completeLevel(levelId);
    }
  };

  const levelIndex = levels.findIndex(l => l.id === levelId);
  const catItems = levelIndex >= 0 && levelIndex < categoryMap.length ? categoryMap[levelIndex] : null;

  const renderGame = () => {
    if (gameCompleted) {
      return (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-4 py-8">
          <Trophy className="mx-auto h-16 w-16 text-secondary" />
          <h3 className="text-2xl font-bold">{t('congrats')}</h3>
          <p className="text-muted-foreground">{t('score')}: {gameScore}</p>
          <Button variant="outline" onClick={() => { setGameCompleted(false); setGameScore(0); }}>
            {t('tryAgain')}
          </Button>
        </motion.div>
      );
    }

    // Always show CategoryGame with 25 items if available
    if (catItems) {
      return <CategoryGame items={catItems} onComplete={handleGameComplete} />;
    }

    // Fallback to original game types
    switch (level.gameType) {
      case 'quiz':
        return <QuizGame questions={level.quiz} onComplete={handleGameComplete} />;
      case 'drag':
        return level.dragItems ? <DragDropGame items={level.dragItems} onComplete={handleGameComplete} /> : null;
      case 'wordsearch':
        return level.words ? <WordSearchGame words={level.words} onComplete={handleGameComplete} /> : null;
      case 'imagefind':
        return level.imageItems ? <ImageFindGame items={level.imageItems} onComplete={handleGameComplete} /> : null;
      case 'imagematch':
        return level.imageMatchItems ? <ImageMatchGame items={level.imageMatchItems} onComplete={handleGameComplete} /> : null;
      case 'exam':
        return <TimedExamGame questions={examQuestions} timePerQuestion={60} onComplete={handleGameComplete} />;
      case 'final':
        return <QuizGame questions={level.quiz} onComplete={handleGameComplete} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-6 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/levels')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <span className="text-2xl">{level.icon}</span>
            <span className="font-semibold text-sm md:text-base">{level.title[lang]}</span>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-6">
          <motion.img src={level.characterImage} alt={level.title[lang]} className="w-20 h-20 object-contain drop-shadow-lg" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }} />
          <div>
            <h2 className="text-xl font-bold">{level.title[lang]}</h2>
            <p className="text-sm text-muted-foreground">{level.subtitle[lang]}</p>
          </div>
        </motion.div>

        <div className={`h-1.5 rounded-full bg-gradient-to-r ${level.color} mb-8`} />

        <Tabs defaultValue="theory" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="theory" className="text-xs sm:text-sm">{t('theory')}</TabsTrigger>
            <TabsTrigger value="visual" className="text-xs sm:text-sm">{t('visual')}</TabsTrigger>
            <TabsTrigger value="game" className="text-xs sm:text-sm">{t('game')}</TabsTrigger>
            <TabsTrigger value="test" className="text-xs sm:text-sm">{t('test')}</TabsTrigger>
          </TabsList>

          <TabsContent value="theory">
            <Card className="p-6">
              <div className="flex justify-center mb-4">
                <motion.img src={level.animationImage} alt={level.title[lang]} width={1024} height={1024} loading="lazy" className="w-full max-w-md rounded-2xl shadow-xl" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} whileHover={{ scale: 1.03, rotate: 1 }} />
              </div>
              <div className="space-y-4">
                {level.theory[lang].map((text, i) => (
                  <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="text-base leading-relaxed">{text}</motion.p>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="visual">
            <Card className="p-6">
              <div className="space-y-4">
                {level.visual[lang].map((text, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="p-4 rounded-xl bg-muted text-center text-lg font-mono">{text}</motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="game">
            {renderGame()}
          </TabsContent>

          <TabsContent value="test">
            <AnimatePresence mode="wait">
              {testCompleted ? (
                <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6 py-8">
                  <motion.img src={level.characterImage} alt="" className="mx-auto w-24 h-24 object-contain" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
                  <Trophy className="mx-auto h-16 w-16 text-secondary" />
                  <h3 className="text-2xl font-bold">{t('congrats')}</h3>
                  <p className="text-lg">{t('score')}: {testScore} / {levelId === 14 ? examQuestions.length : level.quiz.length}</p>
                  {testScore >= Math.ceil((levelId === 14 ? examQuestions.length : level.quiz.length) * 0.5) ? (
                    <div className="space-y-3">
                      <p className="text-green-600 font-medium">{t('passedLevel')}</p>
                      {levelId < 14 && (
                        <Button onClick={() => navigate(`/level/${levelId + 1}`)} className="electric-gradient text-primary-foreground">
                          {t('nextLevel')} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ) : (
                    <Button variant="outline" onClick={() => { setTestCompleted(false); setTestScore(0); }}>
                      {t('tryAgain')}
                    </Button>
                  )}
                </motion.div>
              ) : (
                <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {levelId === 14 ? (
                    <TimedExamGame questions={examQuestions} timePerQuestion={60} onComplete={handleTestComplete} />
                  ) : (
                    <MixedQuizGame questions={level.quiz} onComplete={handleTestComplete} />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
