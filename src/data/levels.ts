import { Language } from '@/i18n/translations';

export interface LevelData {
  id: number;
  icon: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  color: string;
  theory: Record<Language, string[]>;
  visual: Record<Language, string[]>;
  gameType: 'quiz' | 'drag' | 'wordsearch' | 'final';
  quiz: { question: Record<Language, string>; options: Record<Language, string[]>; correct: number }[];
  dragItems?: { item: Record<Language, string>; target: Record<Language, string> }[];
  words?: Record<Language, string[]>;
}

export const levels: LevelData[] = [
  {
    id: 1, icon: '⚡', color: 'from-blue-500 to-cyan-400',
    title: { kg: 'Электр деген эмне?', ru: 'Что такое электричество?', en: 'What is Electricity?' },
    subtitle: { kg: 'Негизги түшүнүк', ru: 'Основные понятия', en: 'Basic concepts' },
    theory: {
      kg: ['Электр — бул заряддалган бөлүкчөлөрдүн кыймылынан пайда болгон энергиянын бир түрү.', 'Электрондор — терс заряддалган бөлүкчөлөр, алар атомдордун айланасында айланат.', 'Электр тогу — бул электрондордун багытталган кыймылы.', 'Электр энергиясы биздин күнүмдүк жашообузда маанилүү роль ойнойт.'],
      ru: ['Электричество — это вид энергии, возникающий при движении заряженных частиц.', 'Электроны — отрицательно заряженные частицы, вращающиеся вокруг атомов.', 'Электрический ток — это направленное движение электронов.', 'Электрическая энергия играет важную роль в нашей повседневной жизни.'],
      en: ['Electricity is a form of energy created by the movement of charged particles.', 'Electrons are negatively charged particles that orbit around atoms.', 'Electric current is the directed flow of electrons.', 'Electrical energy plays an important role in our daily lives.'],
    },
    visual: {
      kg: ['⚛️ Атом: протондор (+) жана электрондор (-) бар', '➡️ Электрондор бир багытта кыймылдаганда ток пайда болот', '💡 Лампочка: ток өткөндө жарык берет'],
      ru: ['⚛️ Атом: содержит протоны (+) и электроны (-)', '➡️ Когда электроны движутся в одном направлении — возникает ток', '💡 Лампочка: светится когда через неё проходит ток'],
      en: ['⚛️ Atom: contains protons (+) and electrons (-)', '➡️ When electrons move in one direction — current flows', '💡 Light bulb: glows when current passes through it'],
    },
    gameType: 'quiz',
    quiz: [
      { question: { kg: 'Электр тогу деген эмне?', ru: 'Что такое электрический ток?', en: 'What is electric current?' }, options: { kg: ['Электрондордун кыймылы', 'Жылуулук', 'Жарык', 'Үн'], ru: ['Движение электронов', 'Теплота', 'Свет', 'Звук'], en: ['Movement of electrons', 'Heat', 'Light', 'Sound'] }, correct: 0 },
      { question: { kg: 'Электрон кандай заряддалган?', ru: 'Какой заряд у электрона?', en: 'What charge does an electron have?' }, options: { kg: ['Терс', 'Оң', 'Нейтрал', 'Эки жактуу'], ru: ['Отрицательный', 'Положительный', 'Нейтральный', 'Двусторонний'], en: ['Negative', 'Positive', 'Neutral', 'Bilateral'] }, correct: 0 },
      { question: { kg: 'Электр энергиясы эмнеден пайда болот?', ru: 'Откуда возникает электроэнергия?', en: 'Where does electrical energy come from?' }, options: { kg: ['Заряддалган бөлүкчөлөрдүн кыймылынан', 'Суудан', 'Жерден', 'Абадан'], ru: ['От движения заряженных частиц', 'От воды', 'От земли', 'От воздуха'], en: ['From moving charged particles', 'From water', 'From earth', 'From air'] }, correct: 0 },
    ],
  },
  {
    id: 2, icon: '🔋', color: 'from-green-500 to-emerald-400',
    title: { kg: 'Электр энергиянын булактары', ru: 'Источники электроэнергии', en: 'Sources of Electricity' },
    subtitle: { kg: 'Суу, шамал, күн, атом', ru: 'Вода, ветер, солнце, атом', en: 'Water, wind, sun, atom' },
    theory: {
      kg: ['Электр энергиясын алуунун бир нече жолу бар:', '🌊 Суу электр станциялары (ГЭС) — суунун күчү менен', '☀️ Күн панелдери — күн нурунун энергиясы менен', '💨 Шамал генераторлору — шамалдын күчү менен', '⚛️ Атом электр станциялары (АЭС) — ядролук реакция менен'],
      ru: ['Существует несколько способов получения электроэнергии:', '🌊 Гидроэлектростанции (ГЭС) — сила воды', '☀️ Солнечные панели — энергия солнечного света', '💨 Ветрогенераторы — сила ветра', '⚛️ Атомные электростанции (АЭС) — ядерная реакция'],
      en: ['There are several ways to generate electricity:', '🌊 Hydroelectric plants (HEP) — water power', '☀️ Solar panels — sunlight energy', '💨 Wind turbines — wind power', '⚛️ Nuclear power plants (NPP) — nuclear reaction'],
    },
    visual: {
      kg: ['🏔️ ГЭС: Суу бийиктиктен түшүп турбинаны айландырат', '☀️ Күн панели: Фотондор электрондорду козгойт', '💨 Шамал: Канаттарды айландырып генераторду иштетет'],
      ru: ['🏔️ ГЭС: Вода падает с высоты и вращает турбину', '☀️ Солнечная панель: Фотоны возбуждают электроны', '💨 Ветер: Вращает лопасти и приводит в действие генератор'],
      en: ['🏔️ HEP: Water falls from height spinning a turbine', '☀️ Solar panel: Photons excite electrons', '💨 Wind: Spins blades powering a generator'],
    },
    gameType: 'quiz',
    quiz: [
      { question: { kg: 'ГЭС эмнени колдонот?', ru: 'Что использует ГЭС?', en: 'What does a hydroelectric plant use?' }, options: { kg: ['Суунун күчүн', 'Шамалды', 'Күн нурун', 'Газды'], ru: ['Силу воды', 'Ветер', 'Солнечный свет', 'Газ'], en: ['Water power', 'Wind', 'Sunlight', 'Gas'] }, correct: 0 },
      { question: { kg: 'Күн панели эмнени электр энергияга айландырат?', ru: 'Что солнечная панель преобразует в электричество?', en: 'What do solar panels convert to electricity?' }, options: { kg: ['Жарыкты', 'Жылуулукту', 'Сууну', 'Абаны'], ru: ['Свет', 'Тепло', 'Воду', 'Воздух'], en: ['Light', 'Heat', 'Water', 'Air'] }, correct: 0 },
      { question: { kg: 'АЭС кандай реакцияны колдонот?', ru: 'Какую реакцию использует АЭС?', en: 'What reaction does a nuclear plant use?' }, options: { kg: ['Ядролук', 'Химиялык', 'Механикалык', 'Жылуулук'], ru: ['Ядерную', 'Химическую', 'Механическую', 'Тепловую'], en: ['Nuclear', 'Chemical', 'Mechanical', 'Thermal'] }, correct: 0 },
    ],
  },
  {
    id: 3, icon: '💡', color: 'from-yellow-400 to-orange-400',
    title: { kg: 'Токтун түрлөрү', ru: 'Виды тока', en: 'Types of Current' },
    subtitle: { kg: 'Туруктуу жана өзгөрмө ток', ru: 'Постоянный и переменный ток', en: 'DC and AC current' },
    theory: {
      kg: ['Электр тогунун эки негизги түрү бар:', '🔋 Туруктуу ток (DC) — бир багытта агат. Мисалы: батарейка, аккумулятор', '🔌 Өзгөрмө ток (AC) — багыты өзгөрүп турат. Мисалы: розеткадагы ток', 'Биздин үйлөрдө 220В өзгөрмө ток колдонулат.'],
      ru: ['Существует два основных вида электрического тока:', '🔋 Постоянный ток (DC) — течёт в одном направлении. Пример: батарейка', '🔌 Переменный ток (AC) — меняет направление. Пример: ток в розетке', 'В наших домах используется переменный ток 220В.'],
      en: ['There are two main types of electric current:', '🔋 Direct Current (DC) — flows in one direction. Example: battery', '🔌 Alternating Current (AC) — changes direction. Example: wall outlet', 'Our homes use 220V alternating current.'],
    },
    visual: {
      kg: ['→→→ DC: Электрондор бир багытта кыймылдайт', '↔↔↔ AC: Электрондор алдыга-артка кыймылдайт', '🔋 Батарейка = DC | 🔌 Розетка = AC'],
      ru: ['→→→ DC: Электроны движутся в одном направлении', '↔↔↔ AC: Электроны движутся вперёд-назад', '🔋 Батарейка = DC | 🔌 Розетка = AC'],
      en: ['→→→ DC: Electrons move in one direction', '↔↔↔ AC: Electrons move back and forth', '🔋 Battery = DC | 🔌 Outlet = AC'],
    },
    gameType: 'quiz',
    quiz: [
      { question: { kg: 'DC деген эмне?', ru: 'Что такое DC?', en: 'What is DC?' }, options: { kg: ['Туруктуу ток', 'Өзгөрмө ток', 'Жогорку ток', 'Төмөн ток'], ru: ['Постоянный ток', 'Переменный ток', 'Высокий ток', 'Низкий ток'], en: ['Direct Current', 'Alternating Current', 'High Current', 'Low Current'] }, correct: 0 },
      { question: { kg: 'Розеткада кандай ток бар?', ru: 'Какой ток в розетке?', en: 'What type of current is in an outlet?' }, options: { kg: ['Өзгөрмө ток', 'Туруктуу ток', 'Жок ток', 'Аралаш ток'], ru: ['Переменный', 'Постоянный', 'Нет тока', 'Смешанный'], en: ['Alternating', 'Direct', 'No current', 'Mixed'] }, correct: 0 },
      { question: { kg: 'Батарейка кандай ток берет?', ru: 'Какой ток даёт батарейка?', en: 'What current does a battery give?' }, options: { kg: ['Туруктуу', 'Өзгөрмө', 'Аралаш', 'Эч кандай'], ru: ['Постоянный', 'Переменный', 'Смешанный', 'Никакой'], en: ['Direct', 'Alternating', 'Mixed', 'None'] }, correct: 0 },
    ],
  },
  {
    id: 4, icon: '🔌', color: 'from-purple-500 to-pink-400',
    title: { kg: 'Электр чынжыры', ru: 'Электрическая цепь', en: 'Electric Circuit' },
    subtitle: { kg: 'Жөнөкөй электр чынжыры', ru: 'Простая электрическая цепь', en: 'Simple electric circuit' },
    theory: {
      kg: ['Электр чынжыры — ток агып өтүүчү жабык жол.', 'Негизги элементтери: 🔋 Ток булагы, 💡 Жүктөмө (лампочка), 🔌 Өткөргүч (зым), 🔘 Өчүргүч', 'Чынжыр жабык болгондо ток агат, ачык болгондо токмокот.'],
      ru: ['Электрическая цепь — замкнутый путь для протекания тока.', 'Основные элементы: 🔋 Источник тока, 💡 Нагрузка (лампочка), 🔌 Проводник (провод), 🔘 Выключатель', 'При замкнутой цепи ток течёт, при разомкнутой — нет.'],
      en: ['An electric circuit is a closed path for current to flow.', 'Key elements: 🔋 Power source, 💡 Load (bulb), 🔌 Conductor (wire), 🔘 Switch', 'Current flows when the circuit is closed, stops when open.'],
    },
    visual: {
      kg: ['🔋 ——— 🔘 ——— 💡 ——— 🔋', 'Жабык чынжыр = Лампочка жанат ✅', 'Ачык чынжыр = Лампочка өчүк ❌'],
      ru: ['🔋 ——— 🔘 ——— 💡 ——— 🔋', 'Замкнутая цепь = Лампочка горит ✅', 'Разомкнутая цепь = Лампочка не горит ❌'],
      en: ['🔋 ——— 🔘 ——— 💡 ——— 🔋', 'Closed circuit = Bulb lights up ✅', 'Open circuit = Bulb is off ❌'],
    },
    gameType: 'drag',
    quiz: [
      { question: { kg: 'Ток качан агат?', ru: 'Когда течёт ток?', en: 'When does current flow?' }, options: { kg: ['Чынжыр жабык', 'Чынжыр ачык', 'Батарейка жок', 'Зым жок'], ru: ['Цепь замкнута', 'Цепь разомкнута', 'Нет батарейки', 'Нет провода'], en: ['Circuit is closed', 'Circuit is open', 'No battery', 'No wire'] }, correct: 0 },
      { question: { kg: 'Өчүргүч эмне кылат?', ru: 'Что делает выключатель?', en: 'What does a switch do?' }, options: { kg: ['Чынжырды ачат/жабат', 'Ток жаратат', 'Жарык берет', 'Зымды кесет'], ru: ['Размыкает/замыкает цепь', 'Создаёт ток', 'Даёт свет', 'Режет провод'], en: ['Opens/closes circuit', 'Creates current', 'Gives light', 'Cuts wire'] }, correct: 0 },
    ],
    dragItems: [
      { item: { kg: '🔋 Батарейка', ru: '🔋 Батарейка', en: '🔋 Battery' }, target: { kg: 'Ток булагы', ru: 'Источник тока', en: 'Power source' } },
      { item: { kg: '💡 Лампочка', ru: '💡 Лампочка', en: '💡 Bulb' }, target: { kg: 'Жүктөмө', ru: 'Нагрузка', en: 'Load' } },
      { item: { kg: '🔌 Зым', ru: '🔌 Провод', en: '🔌 Wire' }, target: { kg: 'Өткөргүч', ru: 'Проводник', en: 'Conductor' } },
      { item: { kg: '🔘 Өчүргүч', ru: '🔘 Выключатель', en: '🔘 Switch' }, target: { kg: 'Башкаруу', ru: 'Управление', en: 'Control' } },
    ],
  },
  {
    id: 5, icon: '📏', color: 'from-teal-500 to-cyan-400',
    title: { kg: 'Өлчөө бирдиктери', ru: 'Единицы измерения', en: 'Units of Measurement' },
    subtitle: { kg: 'Вольт, Ампер, Ом, Ватт', ru: 'Вольт, Ампер, Ом, Ватт', en: 'Volt, Ampere, Ohm, Watt' },
    theory: {
      kg: ['⚡ Вольт (V) — чыңалуу, ток "басымы"', '💧 Ампер (A) — ток күчү, электрондордун саны', '🚧 Ом (Ω) — каршылык, токко тоскоолдук', '💪 Ватт (W) — кубаттуулук, иштин көлөмү'],
      ru: ['⚡ Вольт (V) — напряжение, "давление" тока', '💧 Ампер (A) — сила тока, количество электронов', '🚧 Ом (Ω) — сопротивление, препятствие току', '💪 Ватт (W) — мощность, объём работы'],
      en: ['⚡ Volt (V) — voltage, current "pressure"', '💧 Ampere (A) — current strength, number of electrons', '🚧 Ohm (Ω) — resistance, opposition to current', '💪 Watt (W) — power, amount of work'],
    },
    visual: {
      kg: ['Суу түтүгү аналогиясы:', '💧 Вольт = Суунун басымы', '🌊 Ампер = Суунун агымы', '🪨 Ом = Түтүктүн тарлыгы', '⚡ Ватт = Суунун жалпы күчү'],
      ru: ['Аналогия с водопроводом:', '💧 Вольт = Давление воды', '🌊 Ампер = Поток воды', '🪨 Ом = Сужение трубы', '⚡ Ватт = Общая мощность потока'],
      en: ['Water pipe analogy:', '💧 Volt = Water pressure', '🌊 Ampere = Water flow', '🪨 Ohm = Pipe narrowing', '⚡ Watt = Total flow power'],
    },
    gameType: 'drag',
    quiz: [
      { question: { kg: 'Чыңалуу эмне менен өлчөнөт?', ru: 'В чём измеряется напряжение?', en: 'What measures voltage?' }, options: { kg: ['Вольт', 'Ампер', 'Ом', 'Ватт'], ru: ['Вольт', 'Ампер', 'Ом', 'Ватт'], en: ['Volt', 'Ampere', 'Ohm', 'Watt'] }, correct: 0 },
      { question: { kg: 'Ом эмнени өлчөйт?', ru: 'Что измеряет Ом?', en: 'What does Ohm measure?' }, options: { kg: ['Каршылыкты', 'Чыңалууну', 'Кубаттуулукту', 'Ток күчүн'], ru: ['Сопротивление', 'Напряжение', 'Мощность', 'Силу тока'], en: ['Resistance', 'Voltage', 'Power', 'Current'] }, correct: 0 },
    ],
    dragItems: [
      { item: { kg: 'Вольт', ru: 'Вольт', en: 'Volt' }, target: { kg: 'Чыңалуу', ru: 'Напряжение', en: 'Voltage' } },
      { item: { kg: 'Ампер', ru: 'Ампер', en: 'Ampere' }, target: { kg: 'Ток күчү', ru: 'Сила тока', en: 'Current' } },
      { item: { kg: 'Ом', ru: 'Ом', en: 'Ohm' }, target: { kg: 'Каршылык', ru: 'Сопротивление', en: 'Resistance' } },
      { item: { kg: 'Ватт', ru: 'Ватт', en: 'Watt' }, target: { kg: 'Кубаттуулук', ru: 'Мощность', en: 'Power' } },
    ],
  },
  {
    id: 6, icon: '⚖️', color: 'from-indigo-500 to-blue-400',
    title: { kg: 'Ом мыйзамы', ru: 'Закон Ома', en: "Ohm's Law" },
    subtitle: { kg: 'Формула, эсептөөлөр', ru: 'Формула, расчёты', en: 'Formula, calculations' },
    theory: {
      kg: ['Ом мыйзамы: U = I × R', '⚡ U — чыңалуу (Вольт)', '💧 I — ток күчү (Ампер)', '🚧 R — каршылык (Ом)', 'Мисал: U=12В, R=4Ом → I = 12/4 = 3А'],
      ru: ['Закон Ома: U = I × R', '⚡ U — напряжение (Вольт)', '💧 I — сила тока (Ампер)', '🚧 R — сопротивление (Ом)', 'Пример: U=12В, R=4Ом → I = 12/4 = 3А'],
      en: ["Ohm's Law: U = I × R", '⚡ U — voltage (Volts)', '💧 I — current (Amperes)', '🚧 R — resistance (Ohms)', 'Example: U=12V, R=4Ω → I = 12/4 = 3A'],
    },
    visual: {
      kg: ['📐 Ом үчбурчтугу:', '    [U]', '  [I] × [R]', 'U табуу = I × R', 'I табуу = U ÷ R', 'R табуу = U ÷ I'],
      ru: ['📐 Треугольник Ома:', '    [U]', '  [I] × [R]', 'Найти U = I × R', 'Найти I = U ÷ R', 'Найти R = U ÷ I'],
      en: ["📐 Ohm's Triangle:", '    [U]', '  [I] × [R]', 'Find U = I × R', 'Find I = U ÷ R', 'Find R = U ÷ I'],
    },
    gameType: 'wordsearch',
    quiz: [
      { question: { kg: 'U = I × R. I = 2А, R = 5Ом. U = ?', ru: 'U = I × R. I = 2А, R = 5Ом. U = ?', en: 'U = I × R. I = 2A, R = 5Ω. U = ?' }, options: { kg: ['10В', '7В', '3В', '2.5В'], ru: ['10В', '7В', '3В', '2.5В'], en: ['10V', '7V', '3V', '2.5V'] }, correct: 0 },
      { question: { kg: 'I = U ÷ R. U = 24В, R = 8Ом. I = ?', ru: 'I = U ÷ R. U = 24В, R = 8Ом. I = ?', en: 'I = U ÷ R. U = 24V, R = 8Ω. I = ?' }, options: { kg: ['3А', '16А', '32А', '192А'], ru: ['3А', '16А', '32А', '192А'], en: ['3A', '16A', '32A', '192A'] }, correct: 0 },
    ],
    words: { kg: ['ВОЛЬТ', 'АМПЕР', 'ОМ', 'ТОК', 'ЗАРЯД'], ru: ['ВОЛЬТ', 'АМПЕР', 'ОМ', 'ТОК', 'ЗАРЯД'], en: ['VOLT', 'AMPERE', 'OHM', 'CURRENT', 'CHARGE'] },
  },
  {
    id: 7, icon: '🏠', color: 'from-amber-500 to-yellow-400',
    title: { kg: 'Үйдөгү электр', ru: 'Электричество дома', en: 'Electricity at Home' },
    subtitle: { kg: 'Розетка, коопсуздук', ru: 'Розетка, безопасность', en: 'Outlets, safety' },
    theory: {
      kg: ['Үйдөгү электр 220В өзгөрмө ток.', '🔌 Розетка — аппараттарды туташтыруу үчүн', '⚠️ Коопсуздук эрежелери:', '• Нымдуу колдор менен тийбеңиз', '• Бузулган зымдарды колдонбоңуз', '• Балдарды электрден коргоңуз'],
      ru: ['Домашнее электричество — 220В переменного тока.', '🔌 Розетка — для подключения приборов', '⚠️ Правила безопасности:', '• Не трогайте мокрыми руками', '• Не используйте повреждённые провода', '• Защищайте детей от электричества'],
      en: ['Home electricity is 220V AC.', '🔌 Outlets — for connecting devices', '⚠️ Safety rules:', '• Never touch with wet hands', '• Do not use damaged wires', '• Protect children from electricity'],
    },
    visual: {
      kg: ['🏠 Үйдүн электр схемасы:', '⚡ Электр столбу → 📊 Эсептегич → 🔒 Автомат → 🔌 Розеткалар', '⚠️ КООПСУЗ БОЛУҢУЗ!'],
      ru: ['🏠 Схема домашнего электричества:', '⚡ Столб → 📊 Счётчик → 🔒 Автомат → 🔌 Розетки', '⚠️ БУДЬТЕ ОСТОРОЖНЫ!'],
      en: ['🏠 Home electrical diagram:', '⚡ Power line → 📊 Meter → 🔒 Breaker → 🔌 Outlets', '⚠️ STAY SAFE!'],
    },
    gameType: 'wordsearch',
    quiz: [
      { question: { kg: 'Үйдө канча вольт?', ru: 'Сколько вольт дома?', en: 'How many volts at home?' }, options: { kg: ['220В', '12В', '380В', '110В'], ru: ['220В', '12В', '380В', '110В'], en: ['220V', '12V', '380V', '110V'] }, correct: 0 },
      { question: { kg: 'Нымдуу колдор менен электрге тийсе болобу?', ru: 'Можно ли трогать электричество мокрыми руками?', en: 'Can you touch electricity with wet hands?' }, options: { kg: ['Жок, коркунучтуу', 'Ооба', 'Кээде', 'Башка жооп'], ru: ['Нет, опасно', 'Да', 'Иногда', 'Другой ответ'], en: ['No, dangerous', 'Yes', 'Sometimes', 'Other'] }, correct: 0 },
    ],
    words: { kg: ['РОЗЕТКА', 'КООПСУЗ', 'АВТОМАТ', 'ЗЫМ'], ru: ['РОЗЕТКА', 'БЕЗОПАСНОСТЬ', 'АВТОМАТ', 'ПРОВОД'], en: ['OUTLET', 'SAFETY', 'BREAKER', 'WIRE'] },
  },
  {
    id: 8, icon: '🏭', color: 'from-slate-500 to-gray-400',
    title: { kg: 'Электр станциялары', ru: 'Электростанции', en: 'Power Plants' },
    subtitle: { kg: 'ГЭС, ТЭС, АЭС', ru: 'ГЭС, ТЭС, АЭС', en: 'HEP, TPP, NPP' },
    theory: {
      kg: ['🌊 ГЭС — суунун күчү менен иштейт. Кыргызстанда Токтогул ГЭС бар.', '🔥 ТЭС — көмүр, газ же мазутту өрттөп ток алат.', '⚛️ АЭС — уран ядросун бөлүп энергия алат.', '☀️ Күн электр станциясы — күн нуру менен.', '💨 Шамал электр станциясы — шамал менен.'],
      ru: ['🌊 ГЭС — работает на силе воды. В Кыргызстане есть Токтогульская ГЭС.', '🔥 ТЭС — сжигает уголь, газ или мазут для получения тока.', '⚛️ АЭС — расщепляет ядро урана для получения энергии.', '☀️ Солнечная электростанция — работает на солнечном свете.', '💨 Ветряная электростанция — работает на ветре.'],
      en: ['🌊 HEP — works on water power. Kyrgyzstan has the Toktogul HEP.', '🔥 TPP — burns coal, gas or fuel oil for electricity.', '⚛️ NPP — splits uranium nuclei for energy.', '☀️ Solar power plant — works on sunlight.', '💨 Wind power plant — works on wind.'],
    },
    visual: {
      kg: ['🏭 Электр станцияларынын салыштыруусу:', '🌊 ГЭС: Экологиялык таза, арзан', '🔥 ТЭС: Ишенимдүү, бирок аба булгайт', '⚛️ АЭС: Кубаттуу, бирок коркунучтуу'],
      ru: ['🏭 Сравнение электростанций:', '🌊 ГЭС: Экологически чистая, дешёвая', '🔥 ТЭС: Надёжная, но загрязняет воздух', '⚛️ АЭС: Мощная, но опасная'],
      en: ['🏭 Power plant comparison:', '🌊 HEP: Eco-friendly, cheap', '🔥 TPP: Reliable, but pollutes air', '⚛️ NPP: Powerful, but dangerous'],
    },
    gameType: 'quiz',
    quiz: [
      { question: { kg: 'Кыргызстандын эң чоң ГЭСи?', ru: 'Крупнейшая ГЭС Кыргызстана?', en: "Kyrgyzstan's largest HEP?" }, options: { kg: ['Токтогул', 'Камбар-Ата', 'Уч-Коргон', 'Ат-Башы'], ru: ['Токтогульская', 'Камбар-Ата', 'Уч-Коргон', 'Ат-Башы'], en: ['Toktogul', 'Kambar-Ata', 'Uch-Korgon', 'At-Bashy'] }, correct: 0 },
      { question: { kg: 'ТЭС эмне өрттөйт?', ru: 'Что сжигает ТЭС?', en: 'What does a TPP burn?' }, options: { kg: ['Көмүр же газ', 'Суу', 'Уран', 'Күн нуру'], ru: ['Уголь или газ', 'Воду', 'Уран', 'Солнечный свет'], en: ['Coal or gas', 'Water', 'Uranium', 'Sunlight'] }, correct: 0 },
    ],
  },
  {
    id: 9, icon: '🌍', color: 'from-green-500 to-lime-400',
    title: { kg: 'Электр жана экология', ru: 'Электричество и экология', en: 'Electricity & Ecology' },
    subtitle: { kg: 'Жашыл энергия', ru: 'Зелёная энергия', en: 'Green energy' },
    theory: {
      kg: ['🌱 Жашыл энергия — жаратылышка зыян келтирбеген энергия булактары.', '♻️ Электр үнөмдөө жолдору:', '• Колдонбогондо өчүрүңүз', '• LED лампочкаларды колдонуңуз', '• Энергия үнөмдөгүч аппараттарды тандаңыз'],
      ru: ['🌱 Зелёная энергия — источники энергии, не вредящие природе.', '♻️ Способы экономии электричества:', '• Выключайте, когда не используете', '• Используйте LED лампочки', '• Выбирайте энергосберегающие приборы'],
      en: ['🌱 Green energy — energy sources that do not harm nature.', '♻️ Ways to save electricity:', '• Turn off when not using', '• Use LED bulbs', '• Choose energy-efficient appliances'],
    },
    visual: {
      kg: ['🌍 Жашыл энергия булактары:', '☀️ Күн → Чексиз, таза', '💨 Шамал → Кайра жаралуучу', '🌊 Суу → Экологиялык таза'],
      ru: ['🌍 Зелёные источники энергии:', '☀️ Солнце → Безграничное, чистое', '💨 Ветер → Возобновляемый', '🌊 Вода → Экологически чистая'],
      en: ['🌍 Green energy sources:', '☀️ Sun → Unlimited, clean', '💨 Wind → Renewable', '🌊 Water → Eco-friendly'],
    },
    gameType: 'quiz',
    quiz: [
      { question: { kg: 'Жашыл энергия деген эмне?', ru: 'Что такое зелёная энергия?', en: 'What is green energy?' }, options: { kg: ['Табиятка зыянсыз энергия', 'Жашыл түстөгү энергия', 'Кымбат энергия', 'Газ энергиясы'], ru: ['Энергия, безвредная для природы', 'Энергия зелёного цвета', 'Дорогая энергия', 'Газовая энергия'], en: ['Energy harmless to nature', 'Green colored energy', 'Expensive energy', 'Gas energy'] }, correct: 0 },
      { question: { kg: 'LED лампочка эмне үчүн жакшы?', ru: 'Почему LED лампочки лучше?', en: 'Why are LED bulbs better?' }, options: { kg: ['Энергия үнөмдөйт', 'Кымбат', 'Чоңураак', 'Ысыктыгы көп'], ru: ['Экономят энергию', 'Дороже', 'Больше', 'Горячее'], en: ['Save energy', 'More expensive', 'Bigger', 'Hotter'] }, correct: 0 },
    ],
  },
  {
    id: 10, icon: '🔧', color: 'from-red-500 to-orange-400',
    title: { kg: 'Электр аспаптары', ru: 'Электрические приборы', en: 'Electric Devices' },
    subtitle: { kg: 'Мотор, генератор', ru: 'Мотор, генератор', en: 'Motor, generator' },
    theory: {
      kg: ['⚙️ Электр мотору — электр энергиясын механикалык энергияга айландырат.', '🔄 Генератор — механикалык энергияны электрге айландырат.', '🔌 Трансформатор — чыңалууну өзгөртөт (жогорулатат же төмөндөтөт).'],
      ru: ['⚙️ Электромотор — преобразует электрическую энергию в механическую.', '🔄 Генератор — преобразует механическую энергию в электрическую.', '🔌 Трансформатор — изменяет напряжение (повышает или понижает).'],
      en: ['⚙️ Electric motor — converts electrical energy to mechanical.', '🔄 Generator — converts mechanical energy to electrical.', '🔌 Transformer — changes voltage (increases or decreases).'],
    },
    visual: {
      kg: ['⚡→⚙️ Мотор: Электр → Кыймыл', '⚙️→⚡ Генератор: Кыймыл → Электр', '🔌 Трансформатор: 220В → 12В (же тескериси)'],
      ru: ['⚡→⚙️ Мотор: Электричество → Движение', '⚙️→⚡ Генератор: Движение → Электричество', '🔌 Трансформатор: 220В → 12В (или наоборот)'],
      en: ['⚡→⚙️ Motor: Electricity → Motion', '⚙️→⚡ Generator: Motion → Electricity', '🔌 Transformer: 220V → 12V (or reverse)'],
    },
    gameType: 'drag',
    quiz: [
      { question: { kg: 'Мотор эмнени кылат?', ru: 'Что делает мотор?', en: 'What does a motor do?' }, options: { kg: ['Электрди кыймылга айландырат', 'Кыймылды электрге айландырат', 'Чыңалууну өзгөртөт', 'Токту өчүрөт'], ru: ['Электричество в движение', 'Движение в электричество', 'Меняет напряжение', 'Выключает ток'], en: ['Electricity to motion', 'Motion to electricity', 'Changes voltage', 'Turns off current'] }, correct: 0 },
    ],
    dragItems: [
      { item: { kg: '⚙️ Мотор', ru: '⚙️ Мотор', en: '⚙️ Motor' }, target: { kg: 'Электр → Кыймыл', ru: 'Электричество → Движение', en: 'Electricity → Motion' } },
      { item: { kg: '🔄 Генератор', ru: '🔄 Генератор', en: '🔄 Generator' }, target: { kg: 'Кыймыл → Электр', ru: 'Движение → Электричество', en: 'Motion → Electricity' } },
      { item: { kg: '🔌 Трансформатор', ru: '🔌 Трансформатор', en: '🔌 Transformer' }, target: { kg: 'Чыңалууну өзгөртүү', ru: 'Изменение напряжения', en: 'Change voltage' } },
    ],
  },
  {
    id: 11, icon: '📡', color: 'from-violet-500 to-purple-400',
    title: { kg: 'Электр жана технология', ru: 'Электричество и технологии', en: 'Electricity & Technology' },
    subtitle: { kg: 'Компьютер, телефон', ru: 'Компьютер, телефон', en: 'Computer, phone' },
    theory: {
      kg: ['💻 Компьютер — электр менен иштейт, маалыматты 0 жана 1 менен сактайт.', '📱 Смартфон — батарейкада иштейт, кубаттоо керек.', '🌐 Интернет — серверлер электр менен иштейт.', '🤖 Робототехника — электр моторлору жана сенсорлор.'],
      ru: ['💻 Компьютер — работает на электричестве, хранит данные в 0 и 1.', '📱 Смартфон — работает от батареи, нужна зарядка.', '🌐 Интернет — серверы работают на электричестве.', '🤖 Робототехника — электромоторы и сенсоры.'],
      en: ['💻 Computer — runs on electricity, stores data as 0s and 1s.', '📱 Smartphone — runs on battery, needs charging.', '🌐 Internet — servers run on electricity.', '🤖 Robotics — electric motors and sensors.'],
    },
    visual: {
      kg: ['📱 Смартфондун ичи:', '🔋 Батарейка → ⚡ Процессор → 📺 Экран', '📡 Антенна → 🌐 Интернет → ☁️ Булут'],
      ru: ['📱 Внутри смартфона:', '🔋 Батарея → ⚡ Процессор → 📺 Экран', '📡 Антенна → 🌐 Интернет → ☁️ Облако'],
      en: ['📱 Inside a smartphone:', '🔋 Battery → ⚡ Processor → 📺 Screen', '📡 Antenna → 🌐 Internet → ☁️ Cloud'],
    },
    gameType: 'drag',
    quiz: [
      { question: { kg: 'Компьютер маалыматты кантип сактайт?', ru: 'Как компьютер хранит данные?', en: 'How does a computer store data?' }, options: { kg: ['0 жана 1 менен', 'Тамгалар менен', 'Сүрөттөр менен', 'Үн менен'], ru: ['В виде 0 и 1', 'Буквами', 'Картинками', 'Звуком'], en: ['As 0s and 1s', 'With letters', 'With images', 'With sound'] }, correct: 0 },
    ],
    dragItems: [
      { item: { kg: '🔋 Батарейка', ru: '🔋 Батарея', en: '🔋 Battery' }, target: { kg: 'Энергия булагы', ru: 'Источник энергии', en: 'Power source' } },
      { item: { kg: '⚡ Процессор', ru: '⚡ Процессор', en: '⚡ Processor' }, target: { kg: 'Эсептөө', ru: 'Вычисления', en: 'Computing' } },
      { item: { kg: '📺 Экран', ru: '📺 Экран', en: '📺 Screen' }, target: { kg: 'Көрсөтүү', ru: 'Отображение', en: 'Display' } },
    ],
  },
  {
    id: 12, icon: '🎓', color: 'from-yellow-500 to-red-500',
    title: { kg: 'Жыйынтык', ru: 'Итоговый', en: 'Final' },
    subtitle: { kg: 'Бардык билимди бышыктоо', ru: 'Закрепление всех знаний', en: 'Consolidate all knowledge' },
    theory: {
      kg: ['🎉 Куттуктайбыз! Сиз бардык баскычтарды өтүп жатасыз!', 'Эсиңизде болсун:', '⚡ Электр — заряддалган бөлүкчөлөрдүн кыймылы', '📏 U = I × R (Ом мыйзамы)', '⚠️ Коопсуздук — эң маанилүү!', '🌱 Жашыл энергия — келечек!'],
      ru: ['🎉 Поздравляем! Вы проходите все уровни!', 'Запомните:', '⚡ Электричество — движение заряженных частиц', '📏 U = I × R (Закон Ома)', '⚠️ Безопасность — самое важное!', '🌱 Зелёная энергия — будущее!'],
      en: ['🎉 Congratulations! You are completing all levels!', 'Remember:', '⚡ Electricity — movement of charged particles', "📏 U = I × R (Ohm's Law)", '⚠️ Safety — most important!', '🌱 Green energy — the future!'],
    },
    visual: {
      kg: ['🏆 Сиздин жетишкендиктериңиз:', '📚 12 тема өтүлдү', '🎮 Бардык оюндар ойнолду', '✅ Бардык тесттер тапшырылды'],
      ru: ['🏆 Ваши достижения:', '📚 12 тем пройдено', '🎮 Все игры сыграны', '✅ Все тесты сданы'],
      en: ['🏆 Your achievements:', '📚 12 topics completed', '🎮 All games played', '✅ All tests passed'],
    },
    gameType: 'final',
    quiz: [
      { question: { kg: 'Электр тогу деген эмне?', ru: 'Что такое электрический ток?', en: 'What is electric current?' }, options: { kg: ['Электрондордун кыймылы', 'Жылуулук', 'Жарык', 'Үн'], ru: ['Движение электронов', 'Теплота', 'Свет', 'Звук'], en: ['Movement of electrons', 'Heat', 'Light', 'Sound'] }, correct: 0 },
      { question: { kg: 'U = I × R. I=3А, R=10Ом. U=?', ru: 'U = I × R. I=3А, R=10Ом. U=?', en: 'U = I × R. I=3A, R=10Ω. U=?' }, options: { kg: ['30В', '13В', '7В', '3.3В'], ru: ['30В', '13В', '7В', '3.3В'], en: ['30V', '13V', '7V', '3.3V'] }, correct: 0 },
      { question: { kg: 'ГЭС эмнени колдонот?', ru: 'Что использует ГЭС?', en: 'What does HEP use?' }, options: { kg: ['Суунун күчүн', 'Газ', 'Уран', 'Шамал'], ru: ['Силу воды', 'Газ', 'Уран', 'Ветер'], en: ['Water power', 'Gas', 'Uranium', 'Wind'] }, correct: 0 },
      { question: { kg: 'LED лампа эмне үчүн жакшы?', ru: 'Чем хороши LED лампы?', en: 'Why are LED bulbs good?' }, options: { kg: ['Энергия үнөмдөйт', 'Ысык', 'Чоң', 'Кымбат'], ru: ['Экономят энергию', 'Горячие', 'Большие', 'Дорогие'], en: ['Save energy', 'Hot', 'Big', 'Expensive'] }, correct: 0 },
      { question: { kg: 'Генератор эмне кылат?', ru: 'Что делает генератор?', en: 'What does a generator do?' }, options: { kg: ['Кыймылды электрге айландырат', 'Электрди кыймылга', 'Чыңалуу өзгөртөт', 'Токту өчүрөт'], ru: ['Движение в электричество', 'Электричество в движение', 'Меняет напряжение', 'Выключает ток'], en: ['Motion to electricity', 'Electricity to motion', 'Changes voltage', 'Turns off'] }, correct: 0 },
    ],
  },
];
