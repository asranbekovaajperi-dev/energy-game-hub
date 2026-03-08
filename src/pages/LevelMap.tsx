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
                      <span className="text-3xl">{level.icon}</span>
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
