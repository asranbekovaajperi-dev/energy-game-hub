export type Language = 'kg' | 'ru' | 'en';

export const translations = {
  // Navigation & Common
  appTitle: { kg: 'Электр Энергия', ru: 'Электроэнергия', en: 'Electric Energy' },
  start: { kg: 'Баштоо', ru: 'Начать', en: 'Start' },
  back: { kg: 'Артка', ru: 'Назад', en: 'Back' },
  next: { kg: 'Кийинки', ru: 'Далее', en: 'Next' },
  complete: { kg: 'Бүтүрүү', ru: 'Завершить', en: 'Complete' },
  progress: { kg: 'Прогресс', ru: 'Прогресс', en: 'Progress' },
  locked: { kg: 'Кулпуланган', ru: 'Заблокировано', en: 'Locked' },
  theory: { kg: '📚 Теория', ru: '📚 Теория', en: '📚 Theory' },
  visual: { kg: '🎥 Көрсөтмө', ru: '🎥 Наглядно', en: '🎥 Visual' },
  game: { kg: '🎮 Оюн', ru: '🎮 Игра', en: '🎮 Game' },
  test: { kg: '✅ Текшерүү', ru: '✅ Проверка', en: '✅ Test' },
  correct: { kg: 'Туура!', ru: 'Правильно!', en: 'Correct!' },
  wrong: { kg: 'Ката!', ru: 'Неправильно!', en: 'Wrong!' },
  score: { kg: 'Упай', ru: 'Очки', en: 'Score' },
  levelMap: { kg: 'Баскычтар картасы', ru: 'Карта уровней', en: 'Level Map' },
  subtitle: { kg: 'Электр энергиясы жөнүндө интерактивдүү билим берүү платформасы', ru: 'Интерактивная образовательная платформа об электроэнергии', en: 'Interactive educational platform about electric energy' },
  levelsCompleted: { kg: 'баскыч өтүлдү', ru: 'уровней пройдено', en: 'levels completed' },
  tryAgain: { kg: 'Кайра аракет', ru: 'Попробовать снова', en: 'Try Again' },
  nextLevel: { kg: 'Кийинки баскыч', ru: 'Следующий уровень', en: 'Next Level' },
  congrats: { kg: 'Куттуктайбыз!', ru: 'Поздравляем!', en: 'Congratulations!' },
  passedLevel: { kg: 'Баскыч ийгиликтүү өтүлдү!', ru: 'Уровень успешно пройден!', en: 'Level completed successfully!' },
  dragHere: { kg: 'Бул жерге сүйрөңүз', ru: 'Перетащите сюда', en: 'Drag here' },
  findWords: { kg: 'Сөздөрдү табыңыз', ru: 'Найдите слова', en: 'Find the words' },
  questionsOf: { kg: 'суроо', ru: 'вопрос из', en: 'question of' },
  findImages: { kg: 'Сүрөттөрдү табыңыз', ru: 'Найдите картинки', en: 'Find the images' },
  matchImages: { kg: 'Сүрөттөрдү дал келтириңиз', ru: 'Сопоставьте картинки', en: 'Match the images' },
  historyLevel: { kg: 'Электрдин тарыхы', ru: 'История электричества', en: 'History of Electricity' },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, lang: Language): string {
  return translations[key][lang];
}
