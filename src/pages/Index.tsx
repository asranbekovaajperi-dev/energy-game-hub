import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProgress } from '@/contexts/ProgressContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Zap, Play } from 'lucide-react';

const Index = () => {
  const { t } = useLanguage();
  const { completedLevels } = useProgress();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-secondary" />
          <span className="font-bold text-lg">{t('appTitle')}</span>
        </div>
        <LanguageSwitcher />
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-2xl text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center justify-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="text-8xl"
              >
                ⚡
              </motion.div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
              <span className="text-gradient">{t('appTitle')}</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              {t('subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <Button
              size="lg"
              onClick={() => navigate('/levels')}
              className="electric-gradient text-primary-foreground h-14 px-10 text-lg rounded-2xl glow-shadow hover:opacity-90 transition-opacity"
            >
              <Play className="mr-2 h-5 w-5" />
              {t('start')}
            </Button>

            {completedLevels.length > 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-muted-foreground"
              >
                {completedLevels.length} / 12 {t('levelsCompleted')}
              </motion.p>
            )}
          </motion.div>

          {/* Floating icons */}
          <div className="relative h-20">
            {['💡', '🔋', '🔌', '⚙️', '🌍'].map((emoji, i) => (
              <motion.span
                key={i}
                className="absolute text-3xl"
                style={{ left: `${15 + i * 17}%` }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2 + i * 0.3,
                  delay: i * 0.2,
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
