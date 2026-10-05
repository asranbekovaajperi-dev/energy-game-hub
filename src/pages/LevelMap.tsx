import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProgress } from '@/contexts/ProgressContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { levels } from '@/data/levels';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { Lock, CheckCircle, ArrowLeft, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LevelMap() {
  const { lang, t } = useLanguage();
  const { completedLevels, isUnlocked, isCompleted } = useProgress();
  const navigate = useNavigate();

  const progressPercent = (completedLevels.length / levels.length) * 100;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-6 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Zap className="h-5 w-5 text-secondary" />
            <span className="font-semibold">{t('levelMap')}</span>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{t('progress')}</span>
            <span className="font-semibold">{completedLevels.length} / {levels.length}</span>
          </div>
          <Progress value={progressPercent} className="h-3" />
        </div>

        {/* Final Exam — big & scary, on top */}
        {(() => {
          const exam = levels.find(l => l.id === 14);
          if (!exam) return null;
          const unlocked = isUnlocked(exam.id);
          const completed = isCompleted(exam.id);
          return (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-8">
              <Card
                className={`relative overflow-hidden cursor-pointer border-2 border-red-500/60 shadow-[0_0_40px_rgba(239,68,68,0.35)] ${!unlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => unlocked && navigate(`/level/${exam.id}`)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-950/90 via-purple-950/90 to-slate-950/90" />
                <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent" animate={{ x: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 3, ease: 'linear' }} />
                <div className="relative p-6 flex flex-col sm:flex-row items-center gap-6">
                  <motion.img
                    src={exam.animationImage}
                    alt={exam.title[lang]}
                    width={1024} height={1024} loading="lazy"
                    className="w-40 h-40 sm:w-52 sm:h-52 object-cover rounded-2xl shadow-2xl ring-2 ring-red-500/50"
                    animate={{ scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                  />
                  <div className="text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                      <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="text-3xl">💀</motion.span>
                      <span className="text-red-400 font-bold tracking-widest uppercase text-sm">{lang === 'ru' ? 'Финальный экзамен' : lang === 'en' ? 'Final Exam' : 'Жыйынтык экзамен'}</span>
                      <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="text-3xl">💀</motion.span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">{exam.title[lang]}</h3>
                    <p className="text-red-200/80 text-sm mb-3">{exam.subtitle[lang]}</p>
                    <div className="flex items-center justify-center sm:justify-start gap-3 text-xs text-red-300">
                      <span className="bg-red-500/20 px-3 py-1 rounded-full">⏱️ 50 {lang === 'ru' ? 'вопросов' : lang === 'en' ? 'questions' : 'суроо'}</span>
                      <span className="bg-red-500/20 px-3 py-1 rounded-full">⚡ 1 {lang === 'ru' ? 'минута' : lang === 'en' ? 'minute' : 'мүнөт'}</span>
                      {completed && <CheckCircle className="h-5 w-5 text-green-400" />}
                      {!unlocked && <Lock className="h-5 w-5" />}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })()}

        {/* Level Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {levels.map((level, i) => {
            const unlocked = isUnlocked(level.id);
            const completed = isCompleted(level.id);

            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  className={`relative overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                    !unlocked ? 'opacity-50 cursor-not-allowed' : ''
                  } ${completed ? 'ring-2 ring-green-500/50' : ''}`}
                  onClick={() => unlocked && navigate(`/level/${level.id}`)}
                >
                  {/* Gradient header */}
                  <div className={`h-2 bg-gradient-to-r ${level.color}`} />

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      {/* Character image instead of just emoji */}
                      <motion.img
                        src={level.characterImage}
                        alt={level.title[lang]}
                        className="w-14 h-14 object-contain"
                        animate={unlocked ? { y: [0, -3, 0] } : {}}
                        transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                      />
                      {completed ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : !unlocked ? (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                          {level.id}
                        </span>
                      )}
                    </div>

                    <h3 className="font-semibold text-sm mb-1">{level.title[lang]}</h3>
                    <p className="text-xs text-muted-foreground">{level.subtitle[lang]}</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
