import React, { createContext, useContext, useState, useCallback } from 'react';

interface ProgressContextType {
  completedLevels: number[];
  completeLevel: (id: number) => void;
  isUnlocked: (id: number) => boolean;
  isCompleted: (id: number) => boolean;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completedLevels, setCompleted] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('completed-levels') || '[]');
    } catch { return []; }
  });

  const completeLevel = useCallback((id: number) => {
    setCompleted(prev => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      localStorage.setItem('completed-levels', JSON.stringify(next));
      return next;
    });
  }, []);

  // All levels are unlocked by default
  const isUnlocked = useCallback((_id: number) => {
    return true;
  }, []);

  const isCompleted = useCallback((id: number) => completedLevels.includes(id), [completedLevels]);

  const resetProgress = useCallback(() => {
    setCompleted([]);
    localStorage.removeItem('completed-levels');
  }, []);

  return (
    <ProgressContext.Provider value={{ completedLevels, completeLevel, isUnlocked, isCompleted, resetProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
