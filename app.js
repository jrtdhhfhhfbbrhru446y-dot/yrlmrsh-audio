function safeCreateIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        try { window.lucide.createIcons(); } catch (e) {}
    }
}

// 72 независимых канала шумов (24 Золотых + 24 Изумрудных + 24 Аметистовых)
const NOISE_CHANNELS = [
    // --- ЗОЛОТАЯ КОЛЛЕКЦИЯ (1-24) ---
    { id: 'brown',       title: 'Коричневый шум',     sub: 'Глубокий бархатный суб-бас',    icon: 'waves',            defaultVol: 0.00 },
    { id: 'pink',        title: 'Розовый шум',        sub: 'Тёплый сбалансированный фон',   icon: 'activity',         defaultVol: 0.00 },
    { id: 'white',       title: 'Белый шум',          sub: 'Мягкий воздушный фильтр',       icon: 'wind',             defaultVol: 0.00 },
    { id: 'rain',        title: 'Ночной дождь',       sub: 'Ливень за стеклом и капли',     icon: 'cloud-rain',       defaultVol: 0.25 },
    { id: 'roof_rain',   title: 'Дождь по крыше',     sub: 'Уютный стук капель по навесу',  icon: 'umbrella',         defaultVol: 0.00 },
    { id: 'thunder',     title: 'Далёкая гроза',      sub: 'Мягкие раскаты грома вдали',    icon: 'cloud-lightning',  defaultVol: 0.00 },
    { id: 'wind',        title: 'Холодный ветер',     sub: 'Медленные порывы в долине',     icon: 'tornado',          defaultVol: 0.15 },
    { id: 'blizzard',    title: 'Снежная вьюга',      sub: 'Завывание метели за окном',     icon: 'snowflake',        defaultVol: 0.00 },
    { id: 'forest',      title: 'Шелест листвы',      sub: 'Ветер в кронах соснового леса', icon: 'trees',            defaultVol: 0.00 },
    { id: 'crickets',    title: 'Ночные сверчки',     sub: 'Тёплая летняя полночь в поле',  icon: 'bug',              defaultVol: 0.00 },
    { id: 'sea',         title: 'Морской прибой',     sub: 'Накатывающие волны океана',     icon: 'anchor',           defaultVol: 0.55 },
    { id: 'underwater',  title: 'Глубина океана',     sub: 'Приглушенный подводный гул',    icon: 'droplets',         defaultVol: 0.20 },
    { id: 'stream',      title: 'Горный ручей',       sub: 'Переливы воды по камням',       icon: 'droplet',          defaultVol: 0.00 },
    { id: 'cave',        title: 'Капли в пещере',     sub: 'Резонансное эхо сталактитов',   icon: 'mountain',         defaultVol: 0.00 },
    { id: 'fire',        title: 'Ночной костёр',      sub: 'Потрескивание дров и углей',    icon: 'flame',            defaultVol: 0.00 },
    { id: 'vinyl',       title: 'Виниловая пластинка',sub: 'Тёплый ламповый шорох иглы',    icon: 'disc',             defaultVol: 0.15 },
    { id: 'tape',        title: 'Кассетный Лоу-Фай',  sub: 'Мягкое шипение плёнки 80-х',    icon: 'cassette-tape',    defaultVol: 0.00 },
    { id: 'clock_heart', title: 'Часы и Сердцебиение',sub: 'Тиканье секунд и глубокий пульс',icon: 'heart-pulse',     defaultVol: 0.00 },
    { id: 'train',       title: 'Ночной поезд',       sub: 'Мерный стук колёс купе',        icon: 'train-front',      defaultVol: 0.00 },
    { id: 'airplane',    title: 'Салон самолёта',     sub: 'Ровный гул ночного перелёта',   icon: 'plane',            defaultVol: 0.00 },
    { id: 'cat_purr',    title: 'Мурчание кота',      sub: 'Уютная сонная вибрация 25 Гц',  icon: 'cat',              defaultVol: 0.00 },
    { id: 'wind_chimes', title: 'Музыка ветра',       sub: 'Хрустальные перезвоны на ветру',icon: 'sparkles',         defaultVol: 0.00 },
    { id: 'cosmos',      title: 'Гул космоса',        sub: 'Низкий планетарный резонанс',   icon: 'orbit',            defaultVol: 0.15 },
    { id: 'bowls',       title: 'Тибетские чаши',     sub: 'Редкие медитативные обертоны',  icon: 'bell',             defaultVol: 0.00 },

    // --- ИЗУМРУДНАЯ КОЛЛЕКЦИЯ (25-48) ---
    { id: 'green_noise', title: 'Зелёный шум природы',sub: 'Центр спектра 500 Гц для гармонии', icon: 'leaf',         defaultVol: 0.00, isNew: true },
    { id: 'violet_noise',title: 'Фиолетовый шум',     sub: 'Тонкий высокочастотный бриз',      icon: 'zap',          defaultVol: 0.00, isNew: true },
    { id: 'velvet_sub',  title: 'Бархатный суб-шум',  sub: 'Глубокое обволакивающее одеяло',   icon: 'layers',       defaultVol: 0.00, isNew: true },
    { id: 'shishi_odoshi',title: 'Бамбуковый фонтан', sub: 'Стук японского сада Сиси-одоси',   icon: 'sprout',       defaultVol: 0.00, isNew: true },
    { id: 'whales',      title: 'Песни китов',        sub: 'Глубокий зов в бездне океана',     icon: 'fish',         defaultVol: 0.00, isNew: true },
    { id: 'cicadas',     title: 'Тропические цикады', sub: 'Знойный вечер в субтропиках',      icon: 'sun',          defaultVol: 0.00, isNew: true },
    { id: 'night_owl',   title: 'Ночная сова в бору', sub: 'Редкое уханье в густом лесу',      icon: 'moon',         defaultVol: 0.00, isNew: true },
    { id: 'frogs',       title: 'Лягушки у пруда',    sub: 'Ночной хор у тихого камыша',       icon: 'waves',        defaultVol: 0.00, isNew: true },
    { id: 'snow_steps',  title: 'Шаги по снегу',      sub: 'Морозный хруст под ногами',        icon: 'footprints',   defaultVol: 0.00, isNew: true },
    { id: 'waterfall',   title: 'Лесной водопад',     sub: 'Мощный поток чистой воды',         icon: 'cloud-drizzle',defaultVol: 0.00, isNew: true },
    { id: 'geyser',      title: 'Термальный гейзер',  sub: 'Дыхание пара и подземных вод',     icon: 'flame-kindling',defaultVol:0.00, isNew: true },
    { id: 'night_cafe',  title: 'Ночное кафе вдали',  sub: 'Приглушенный уютный гул голосов',  icon: 'coffee',       defaultVol: 0.00, isNew: true },
    { id: 'keyboard',    title: 'Печать клавиатуры',  sub: 'Мягкие механические свитч-клики',  icon: 'keyboard',     defaultVol: 0.00, isNew: true },
    { id: 'book_pages',  title: 'Шелест страниц',     sub: 'Перелистывание старинных книг',    icon: 'book-open',    defaultVol: 0.00, isNew: true },
    { id: 'pendulum',    title: 'Маятник старых часов',sub: 'Тяжёлый мерный ход в гостиной',   icon: 'clock',        defaultVol: 0.00, isNew: true },
    { id: 'sonar',       title: 'Подводный сонар',    sub: 'Гипнотический пинг батискафа',     icon: 'radar',        defaultVol: 0.00, isNew: true },
    { id: 'server_room', title: 'Серверная станция',  sub: 'Ровный гул кулеров дата-центра',   icon: 'server',       defaultVol: 0.00, isNew: true },
    { id: 'projector',   title: 'Кинопроектор 35мм',  sub: 'Стрекот катушки старого кино',     icon: 'film',         defaultVol: 0.00, isNew: true },
    { id: 'night_drive', title: 'Ночная трасса в авто',sub: 'Шум шин по мокрому асфальту',     icon: 'car',          defaultVol: 0.00, isNew: true },
    { id: 'ship_creak',  title: 'Каюта парусника',    sub: 'Мерное покачивание деревянной палубы',icon: 'ship',      defaultVol: 0.00, isNew: true },
    { id: 'fork_528',    title: 'Камертон 528 Гц',    sub: 'Чистая частота восстановления',    icon: 'wand-2',       defaultVol: 0.00, isNew: true },
    { id: 'om_drone',    title: 'Тибетский Ом-дрон',  sub: 'Низкая горловая вибрация храма',   icon: 'compass',      defaultVol: 0.00, isNew: true },
    { id: 'aurora_hum',  title: 'Магнитосфера Полюса',sub: 'Эфирный шелест северного сияния',  icon: 'sparkles',     defaultVol: 0.00, isNew: true },
    { id: 'beehive',     title: 'Тёплый гул улья',    sub: 'Успокаивающая природная микро-вибрация',icon: 'hexagon', defaultVol: 0.00, isNew: true },

    // --- АМЕТИСТОВАЯ КОЛЛЕКЦИЯ (49-72) ---
    { id: 'black_noise',     title: 'Чёрный шум пустоты',   sub: 'Ультра-низкий инфра-пульс тишины', icon: 'eclipse',      defaultVol: 0.00, isAmethyst: true },
    { id: 'blue_mist',       title: 'Голубой туман',        sub: 'Кристальный высокочастотный воздух',icon: 'cloud-fog',   defaultVol: 0.00, isAmethyst: true },
    { id: 'binaural_delta',  title: 'Бинауральный Дельта',  sub: 'Волны 2.5 Гц для глубочайшего сна', icon: 'brain',        defaultVol: 0.00, isAmethyst: true },
    { id: 'schumann_783',    title: 'Резонанс Шумана',      sub: 'Природное сердцебиение Земли 7.83Гц',icon: 'globe',       defaultVol: 0.00, isAmethyst: true },
    { id: 'pulsar_rhythm',   title: 'Пульсар Вела',         sub: 'Космический радио-маяк далекой звезды',icon: 'radio',     defaultVol: 0.00, isAmethyst: true },
    { id: 'saturn_rings',    title: 'Кольца Сатурна',       sub: 'Поющий электромагнитный спектр',    icon: 'disc-3',       defaultVol: 0.00, isAmethyst: true },
    { id: 'crystal_cave',    title: 'Пещера кристаллов',    sub: 'Звенящий кварцевый микро-резонанс', icon: 'gem',          defaultVol: 0.00, isAmethyst: true },
    { id: 'bamboo_chimes',   title: 'Бамбуковые трубки',    sub: 'Глухой деревянный перестук на ветру',icon: 'align-center',defaultVol: 0.00, isAmethyst: true },
    { id: 'rain_tent',       title: 'Дождь по палатке',     sub: 'Уютный шелест капель по брезенту',  icon: 'tent',         defaultVol: 0.00, isAmethyst: true },
    { id: 'autumn_leaves',   title: 'Осенний листопад',     sub: 'Шуршание сухой листвы в парке',     icon: 'feather',      defaultVol: 0.00, isAmethyst: true },
    { id: 'harbor_bells',    title: 'Колокол в тумане',     sub: 'Далёкий буй в ночной гавани',       icon: 'bell-ring',    defaultVol: 0.00, isAmethyst: true },
    { id: 'seagulls_far',    title: 'Чайки над бухтой',     sub: 'Утренние крики птиц над прибоем',   icon: 'bird',         defaultVol: 0.00, isAmethyst: true },
    { id: 'camel_caravan',   title: 'Караван в пустыне',    sub: 'Мерный шаг и колокольчики в барханах',icon: 'compass',    defaultVol: 0.00, isAmethyst: true },
    { id: 'temple_incense',  title: 'Дым благовоний',       sub: 'Тонкое потрескивание курильницы',   icon: 'flame',        defaultVol: 0.00, isAmethyst: true },
    { id: 'monks_whisper',   title: 'Эхо древнего свода',   sub: 'Бархатный хоровой обертон под куполом',icon: 'landmark',  defaultVol: 0.00, isAmethyst: true },
    { id: 'fountain_plaza',  title: 'Дворцовый фонтан',     sub: 'Мягкий плеск воды в мраморной чаше',icon: 'droplets',     defaultVol: 0.00, isAmethyst: true },
    { id: 'gramophone_horn', title: 'Старый граммофон',     sub: 'Винтажный рупорный шорох 1920-х',   icon: 'speaker',      defaultVol: 0.00, isAmethyst: true },
    { id: 'morse_beacon',    title: 'Ночной радиоэфир',     sub: 'Далёкие станции сквозь тёплый эфир',icon: 'antenna',      defaultVol: 0.00, isAmethyst: true },
    { id: 'espresso_steam',  title: 'Кофейня на рассвете',  sub: 'Тихий пар кофемашины и звон фарфора',icon: 'cup-soda',    defaultVol: 0.00, isAmethyst: true },
    { id: 'fireplace_bellow',title: 'Угли в камине',        sub: 'Тёплое инфракрасное дыхание золы',  icon: 'heater',       defaultVol: 0.00, isAmethyst: true },
    { id: 'sub_engine',      title: 'Двигатель Наутилуса',  sub: 'Мерный турбинный пульс на глубине', icon: 'gauge',        defaultVol: 0.00, isAmethyst: true },
    { id: 'space_hull',      title: 'Обшивка звездолёта',   sub: 'Колыбельная каюты дальнего космоса',icon: 'rocket',       defaultVol: 0.00, isAmethyst: true },
    { id: 'quartz_bowl_174', title: 'Кварцевая чаша 174 Гц',sub: 'Частота снятия напряжения тела',    icon: 'shield-check', defaultVol: 0.00, isAmethyst: true },
    { id: 'solfeggio_852',   title: 'Сфера интуиции 852 Гц',sub: 'Чистый кристальный тон пробуждения',icon: 'eye',          defaultVol: 0.00, isAmethyst: true }
];

// 48 уникальных мелодий
const MELODIES = [
    // --- ЗОЛОТАЯ КОЛЛЕКЦИЯ (1-16) ---
    {
        id: 'architect_video',
        title: '1. Архитектор Будущего',
        subtitle: 'Фетровое пианино + Snowfall Пэд',
        badge: '🔥 ФАВОРИТ СТУДИИ',
        isFavorite: true,
        instrument: 'felt_piano',
        noteInterval: 0.80,
        chordDuration: 4.0,
        chords: [
            [82.41, 123.47, 164.81, 196.00, 246.94],
            [65.41, 130.81, 164.81, 196.00, 246.94],
            [110.00, 164.81, 196.00, 261.63, 329.63],
            [61.74, 123.47, 146.83, 185.00, 246.94]
        ],
        scale: [329.63, 392.00, 493.88, 440.00, 392.00, 329.63, 293.66, 246.94, 523.25, 493.88, 440.00, 392.00]
    },
    {
        id: 'ocean_pure_sleep',
        title: '2. Океан и Чистый Сон',
        subtitle: 'Тёплый подводный Хорус + Челеста (Медленно)',
        badge: '🔥 ДЛЯ СНА',
        isFavorite: true,
        instrument: 'dream_celesta',
        noteInterval: 2.1,
        chordDuration: 6.5,
        chords: [
            [65.41, 98.00, 130.81, 164.81, 196.00],
            [58.27, 87.31, 116.54, 146.83, 174.61],
            [43.65, 87.31, 110.00, 130.81, 164.81],
            [49.00, 98.00, 123.47, 146.83, 196.00]
        ],
        scale: [261.63, 329.63, 392.00, 523.25, 493.88, 392.00, 329.63, 293.66]
    },
    {
        id: 'music_box_waltz',
        title: '3. Заводная Шкатулка',
        subtitle: 'Хрустальные колокольчики • Вальс 3/4',
        instrument: 'music_box',
        noteInterval: 0.45,
        chordDuration: 3.6,
        chords: [
            [110.00, 164.81, 220.00, 261.63],
            [87.31, 130.81, 174.61, 220.00],
            [73.42, 110.00, 146.83, 220.00],
            [82.41, 123.47, 164.81, 246.94]
        ],
        scale: [440.00, 523.25, 659.25, 587.33, 523.25, 493.88, 440.00, 392.00, 329.63]
    },
    {
        id: 'nordic_cello',
        title: '4. Исландская Виолончель',
        subtitle: 'Протяжный смычковый баритон с вибрато',
        instrument: 'bowed_cello',
        noteInterval: 2.6,
        chordDuration: 5.5,
        chords: [
            [73.42, 110.00, 146.83, 220.00],
            [58.27, 116.54, 146.83, 220.00],
            [65.41, 98.00, 130.81, 196.00],
            [55.00, 110.00, 138.59, 220.00]
        ],
        scale: [146.83, 174.61, 220.00, 261.63, 293.66, 220.00, 196.00, 164.81]
    },
    {
        id: 'vintage_rhodes',
        title: '5. Ночной Лоу-Фай Родес',
        subtitle: 'Винтажное электропианино с тремоло',
        instrument: 'warm_rhodes',
        noteInterval: 1.15,
        chordDuration: 4.6,
        chords: [
            [73.42, 130.81, 174.61, 220.00],
            [98.00, 146.83, 185.00, 246.94],
            [65.41, 123.47, 164.81, 196.00],
            [55.00, 110.00, 138.59, 196.00]
        ],
        scale: [293.66, 349.23, 440.00, 523.25, 493.88, 440.00, 392.00, 329.63]
    },
    {
        id: 'angelic_harp',
        title: '6. Небесная Арфа',
        subtitle: 'Быстрые переливы щипковых струн',
        instrument: 'plucked_harp',
        noteInterval: 0.35,
        chordDuration: 4.2,
        chords: [
            [87.31, 130.81, 174.61, 220.00],
            [98.00, 146.83, 196.00, 246.94],
            [110.00, 164.81, 220.00, 261.63],
            [65.41, 130.81, 164.81, 246.94]
        ],
        scale: [261.63, 329.63, 392.00, 440.00, 523.25, 659.25, 587.33, 523.25, 440.00, 392.00]
    },
    {
        id: 'cathedral_organ',
        title: '7. Космический Орган',
        subtitle: 'Величественные аккорды в духе Interstellar',
        instrument: 'space_organ',
        noteInterval: 1.8,
        chordDuration: 6.0,
        chords: [
            [55.00, 110.00, 164.81, 220.00, 261.63],
            [43.65, 87.31, 130.81, 174.61, 261.63],
            [65.41, 130.81, 196.00, 246.94, 329.63],
            [49.00, 98.00, 146.83, 196.00, 293.66]
        ],
        scale: [220.00, 261.63, 329.63, 440.00, 392.00, 329.63, 293.66, 261.63]
    },
    {
        id: 'vhs_nostalgia',
        title: '8. Старая Кассета 1998',
        subtitle: 'Аналоговый синт с плывущей лентой',
        instrument: 'tape_synth',
        noteInterval: 1.35,
        chordDuration: 4.8,
        chords: [
            [69.30, 103.83, 138.59, 207.65],
            [55.00, 110.00, 138.59, 185.00],
            [61.74, 92.50, 123.47, 185.00],
            [73.42, 110.00, 146.83, 220.00]
        ],
        scale: [277.18, 329.63, 369.99, 415.30, 493.88, 415.30, 369.99, 329.63]
    },
    {
        id: 'glass_marimba',
        title: '9. Стеклянная Маримба',
        subtitle: 'Мягкие деревянно-хрустальные молоточки',
        instrument: 'marimba',
        noteInterval: 0.55,
        chordDuration: 4.0,
        chords: [
            [98.00, 146.83, 196.00, 246.94],
            [82.41, 123.47, 164.81, 246.94],
            [65.41, 130.81, 164.81, 196.00],
            [73.42, 110.00, 146.83, 220.00]
        ],
        scale: [293.66, 392.00, 440.00, 493.88, 587.33, 493.88, 440.00, 392.00]
    },
    {
        id: 'japanese_koto',
        title: '10. Сад Камней (Кото)',
        subtitle: 'Японская пентатоника Сакуры и созерцания',
        instrument: 'koto_pluck',
        noteInterval: 0.90,
        chordDuration: 5.0,
        chords: [
            [73.42, 110.00, 146.83, 220.00],
            [58.27, 87.31, 146.83, 174.61],
            [65.41, 98.00, 146.83, 196.00],
            [55.00, 110.00, 164.81, 220.00]
        ],
        scale: [293.66, 311.13, 392.00, 440.00, 587.33, 466.16, 392.00, 311.13]
    },
    {
        id: 'acoustic_campfire',
        title: '11. Акустика у Костра',
        subtitle: 'Тёплый перебор нейлоновых гитарных струн',
        instrument: 'nylon_guitar',
        noteInterval: 0.65,
        chordDuration: 4.2,
        chords: [
            [82.41, 123.47, 164.81, 246.94],
            [65.41, 98.00, 130.81, 196.00],
            [98.00, 146.83, 196.00, 293.66],
            [73.42, 110.00, 146.83, 220.00]
        ],
        scale: [196.00, 246.94, 293.66, 329.63, 392.00, 329.63, 293.66, 246.94]
    },
    {
        id: 'theta_432_drone',
        title: '12. Чистый Дрон 432 Гц',
        subtitle: 'Бесконечные волны без резких нот (Для чтения)',
        instrument: 'pure_harmonic',
        noteInterval: 3.4,
        chordDuration: 7.5,
        chords: [
            [54.00, 108.00, 162.00, 216.00],
            [48.00, 96.00, 144.00, 216.00],
            [64.00, 128.00, 192.00, 256.00],
            [54.00, 108.00, 162.00, 216.00]
        ],
        scale: [216.00, 288.00, 324.00, 432.00, 324.00, 288.00]
    },
    {
        id: 'winter_heart',
        title: '13. Зимний Снегопад',
        subtitle: 'Высокое хрустальное пианино на морозе',
        instrument: 'felt_piano',
        noteInterval: 1.05,
        chordDuration: 4.5,
        chords: [
            [61.74, 123.47, 146.83, 185.00, 246.94],
            [49.00, 98.00, 146.83, 185.00, 220.00],
            [73.42, 110.00, 146.83, 185.00, 277.18],
            [55.00, 110.00, 138.59, 164.81, 220.00]
        ],
        scale: [369.99, 493.88, 587.33, 659.25, 587.33, 493.88, 440.00, 369.99]
    },
    {
        id: 'submarine_radar',
        title: '14. Погружение на 4000м',
        subtitle: 'Гипнотический сонар и глубокое эхо бездны',
        instrument: 'dream_celesta',
        noteInterval: 1.9,
        chordDuration: 5.8,
        chords: [
            [46.25, 92.50, 138.59, 185.00],
            [55.00, 110.00, 164.81, 207.65],
            [41.20, 82.41, 123.47, 164.81],
            [49.00, 98.00, 146.83, 185.00]
        ],
        scale: [185.00, 246.94, 277.18, 369.99, 329.63, 277.18, 246.94]
    },
    {
        id: 'cyber_blade_rain',
        title: '15. Неоновый Дождь 2049',
        subtitle: 'Аналоговый брасс-синт в стиле Vangelis',
        instrument: 'blade_synth',
        noteInterval: 1.7,
        chordDuration: 5.2,
        chords: [
            [65.41, 130.81, 155.56, 196.00, 246.94],
            [51.91, 103.83, 155.56, 196.00, 233.08],
            [58.27, 116.54, 146.83, 174.61, 220.00],
            [49.00, 98.00, 146.83, 196.00, 246.94]
        ],
        scale: [261.63, 311.13, 392.00, 493.88, 466.16, 392.00, 311.13]
    },
    {
        id: 'golden_dawn_hope',
        title: '16. Рассвет После Шторма',
        subtitle: 'Светлая мажорная гармония благодарности',
        instrument: 'warm_rhodes',
        noteInterval: 0.95,
        chordDuration: 4.4,
        chords: [
            [87.31, 130.81, 164.81, 196.00, 261.63],
            [98.00, 146.83, 185.00, 246.94, 293.66],
            [110.00, 164.81, 196.00, 261.63, 329.63],
            [65.41, 130.81, 164.81, 196.00, 246.94]
        ],
        scale: [329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 523.25, 440.00]
    },

    // --- ИЗУМРУДНАЯ КОЛЛЕКЦИЯ (17-32) ---
    {
        id: 'emerald_handpan',
        title: '17. Тибетский Ханг (Handpan)',
        subtitle: 'Бархатный стальной барабан с обертонами',
        badge: '🌿 ХАНГ',
        isNew: true,
        instrument: 'handpan',
        noteInterval: 0.68,
        chordDuration: 4.8,
        chords: [
            [73.42, 110.00, 146.83, 220.00],
            [58.27, 116.54, 174.61, 220.00],
            [65.41, 130.81, 196.00, 261.63],
            [82.41, 123.47, 164.81, 246.94]
        ],
        scale: [293.66, 349.23, 440.00, 523.25, 587.33, 659.25, 523.25, 440.00]
    },
    {
        id: 'emerald_kalimba',
        title: '18. Лесная Калимба',
        subtitle: 'Деревянный резонатор и звонкие язычки',
        badge: '🌿 КАЛИМБА',
        isNew: true,
        instrument: 'kalimba',
        noteInterval: 0.42,
        chordDuration: 4.0,
        chords: [
            [65.41, 130.81, 164.81, 246.94],
            [82.41, 123.47, 196.00, 246.94],
            [110.00, 164.81, 220.00, 329.63],
            [87.31, 130.81, 174.61, 261.63]
        ],
        scale: [392.00, 493.88, 523.25, 587.33, 659.25, 783.99, 659.25, 523.25]
    },
    {
        id: 'emerald_shakuhachi',
        title: '19. Бамбуковая Флейта Дзен',
        subtitle: 'Дыхание ветра в японской флейте Сякухати',
        badge: '🌿 ФЛЕЙТА',
        isNew: true,
        instrument: 'bamboo_flute',
        noteInterval: 1.95,
        chordDuration: 5.5,
        chords: [
            [73.42, 110.00, 146.83, 220.00],
            [65.41, 98.00, 146.83, 196.00],
            [55.00, 110.00, 164.81, 220.00],
            [73.42, 110.00, 146.83, 220.00]
        ],
        scale: [293.66, 349.23, 392.00, 440.00, 523.25, 440.00, 349.23, 293.66]
    },
    {
        id: 'emerald_theremin',
        title: '20. Полярный Терменвокс',
        subtitle: 'Парящая в невесомости поющая радиоволна',
        badge: '🌿 КОСМОС',
        isNew: true,
        instrument: 'theremin',
        noteInterval: 2.2,
        chordDuration: 6.0,
        chords: [
            [55.00, 110.00, 164.81, 220.00],
            [65.41, 130.81, 196.00, 246.94],
            [49.00, 98.00, 146.83, 220.00],
            [58.27, 116.54, 174.61, 261.63]
        ],
        scale: [440.00, 523.25, 659.25, 587.33, 493.88, 440.00, 392.00]
    },
    {
        id: 'emerald_duduk',
        title: '21. Древний Горный Дудук',
        subtitle: 'Тёплый бархатный голос утренних вершин',
        badge: '🌿 ДУДУК',
        isNew: true,
        instrument: 'warm_duduk',
        noteInterval: 2.5,
        chordDuration: 6.2,
        chords: [
            [65.41, 98.00, 130.81, 196.00],
            [58.27, 87.31, 130.81, 174.61],
            [51.91, 103.83, 155.56, 196.00],
            [65.41, 98.00, 130.81, 196.00]
        ],
        scale: [196.00, 233.08, 261.63, 293.66, 311.13, 293.66, 261.63, 233.08]
    },
    {
        id: 'emerald_vibraphone',
        title: '22. Полуночный Вибрафон',
        subtitle: 'Джазовые металлические пластины под дождём',
        badge: '🌿 ДЖАЗ-НУАР',
        isNew: true,
        instrument: 'vibraphone',
        noteInterval: 1.1,
        chordDuration: 4.8,
        chords: [
            [58.27, 116.54, 164.81, 207.65, 261.63],
            [51.91, 103.83, 155.56, 196.00, 233.08],
            [65.41, 130.81, 155.56, 196.00, 233.08],
            [49.00, 98.00, 146.83, 185.00, 220.00]
        ],
        scale: [311.13, 392.00, 466.16, 523.25, 587.33, 466.16, 392.00, 311.13]
    },
    {
        id: 'emerald_glass_harp',
        title: '23. Поющие Хрустальные Бокалы',
        subtitle: 'Чистый ангельский резонанс стеклянной арфы',
        badge: '🌿 ХРУСТАЛЬ',
        isNew: true,
        instrument: 'glass_harp',
        noteInterval: 1.6,
        chordDuration: 5.5,
        chords: [
            [87.31, 130.81, 164.81, 246.94],
            [73.42, 110.00, 164.81, 220.00],
            [65.41, 130.81, 196.00, 246.94],
            [98.00, 146.83, 196.00, 293.66]
        ],
        scale: [523.25, 659.25, 783.99, 880.00, 783.99, 659.25, 587.33]
    },
    {
        id: 'emerald_chiptune',
        title: '24. Звёздная Консоль 1994',
        subtitle: 'Тёплый 8-битный ностальгический арпеджиатор',
        badge: '🌿 РЕТРО 8-BIT',
        isNew: true,
        instrument: 'retro_chip',
        noteInterval: 0.32,
        chordDuration: 3.8,
        chords: [
            [65.41, 130.81, 164.81, 196.00],
            [55.00, 110.00, 130.81, 164.81],
            [43.65, 87.31, 130.81, 174.61],
            [49.00, 98.00, 146.83, 196.00]
        ],
        scale: [261.63, 329.63, 392.00, 523.25, 659.25, 523.25, 392.00, 329.63]
    },
    {
        id: 'emerald_sitar',
        title: '25. Ночной Рассвет в Варанаси',
        subtitle: 'Мягкий резонанс индийского ситара и танпуры',
        badge: '🌿 ВОСТОК',
        isNew: true,
        instrument: 'sitar_pluck',
        noteInterval: 0.85,
        chordDuration: 5.6,
        chords: [
            [73.42, 110.00, 146.83, 220.00],
            [73.42, 110.00, 155.56, 220.00],
            [73.42, 110.00, 146.83, 185.00],
            [73.42, 110.00, 146.83, 220.00]
        ],
        scale: [293.66, 311.13, 369.99, 440.00, 466.16, 554.37, 440.00, 369.99]
    },
    {
        id: 'emerald_gusli',
        title: '26. Сказание Древнего Бора',
        subtitle: 'Перезвон многострунных гуслей над туманной рекой',
        badge: '🌿 ГУСЛИ',
        isNew: true,
        instrument: 'plucked_harp',
        noteInterval: 0.48,
        chordDuration: 4.5,
        chords: [
            [82.41, 123.47, 164.81, 246.94],
            [73.42, 110.00, 146.83, 220.00],
            [65.41, 98.00, 130.81, 196.00],
            [82.41, 123.47, 164.81, 246.94]
        ],
        scale: [329.63, 392.00, 440.00, 493.88, 587.33, 659.25, 493.88, 392.00]
    },
    {
        id: 'emerald_mellotron',
        title: '27. Ленточный Меллотрон 1969',
        subtitle: 'Винтажный оркестр на магнитных лентах',
        badge: '🌿 ВИНТАЖ',
        isNew: true,
        instrument: 'mellotron',
        noteInterval: 1.75,
        chordDuration: 5.4,
        chords: [
            [73.42, 110.00, 146.83, 185.00],
            [65.41, 98.00, 130.81, 164.81],
            [58.27, 87.31, 116.54, 146.83],
            [55.00, 110.00, 138.59, 164.81]
        ],
        scale: [293.66, 369.99, 440.00, 392.00, 329.63, 293.66, 261.63]
    },
    {
        id: 'emerald_ocarina',
        title: '28. Лесная Глиняная Окарина',
        subtitle: 'Чистая пастушья мелодия изумрудных холмов',
        badge: '🌿 ОКАРИНА',
        isNew: true,
        instrument: 'ocarina',
        noteInterval: 1.25,
        chordDuration: 4.6,
        chords: [
            [82.41, 123.47, 164.81, 246.94],
            [65.41, 130.81, 164.81, 196.00],
            [73.42, 110.00, 146.83, 220.00],
            [82.41, 123.47, 164.81, 246.94]
        ],
        scale: [329.63, 392.00, 493.88, 587.33, 523.25, 493.88, 392.00, 329.63]
    },
    {
        id: 'emerald_tank_drum',
        title: '29. Поющий Глюкофон в Дождь',
        subtitle: 'Медитативный язычковый барабан с долгим сустейном',
        badge: '🌿 ГЛЮКОФОН',
        isNew: true,
        instrument: 'handpan',
        noteInterval: 0.95,
        chordDuration: 5.0,
        chords: [
            [65.41, 98.00, 146.83, 196.00],
            [55.00, 110.00, 164.81, 220.00],
            [43.65, 87.31, 130.81, 196.00],
            [49.00, 98.00, 146.83, 220.00]
        ],
        scale: [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 392.00, 329.63]
    },
    {
        id: 'emerald_radio_stars',
        title: '30. Радиотелескоп Аресибо',
        subtitle: 'Мерцающие сигналы пульсаров и квазаров',
        badge: '🌿 СИГНАЛ',
        isNew: true,
        instrument: 'pulsar_bells',
        noteInterval: 0.72,
        chordDuration: 5.8,
        chords: [
            [49.00, 98.00, 146.83, 220.00],
            [58.27, 116.54, 174.61, 261.63],
            [43.65, 87.31, 130.81, 196.00],
            [55.00, 110.00, 164.81, 246.94]
        ],
        scale: [440.00, 587.33, 659.25, 880.00, 783.99, 659.25, 587.33]
    },
    {
        id: 'emerald_528_healing',
        title: '31. Изумрудный Резонанс 528 Гц',
        subtitle: 'Кристальная частота обновления и покоя',
        badge: '🌿 528 ГЦ',
        isNew: true,
        instrument: 'pure_harmonic',
        noteInterval: 2.8,
        chordDuration: 7.0,
        chords: [
            [66.00, 132.00, 198.00, 264.00],
            [58.67, 117.33, 176.00, 264.00],
            [44.00, 88.00, 132.00, 264.00],
            [66.00, 132.00, 198.00, 264.00]
        ],
        scale: [264.00, 352.00, 396.00, 528.00, 396.00, 352.00]
    },
    {
        id: 'emerald_paris_accordion',
        title: '32. Полночь на Монмартре',
        subtitle: 'Меланхоличный французский аккордеон под дождём',
        badge: '🌿 ПАРИЖ',
        isNew: true,
        instrument: 'accordion',
        noteInterval: 1.4,
        chordDuration: 4.5,
        chords: [
            [55.00, 110.00, 130.81, 164.81],
            [73.42, 110.00, 146.83, 174.61],
            [82.41, 123.47, 164.81, 196.00],
            [55.00, 110.00, 130.81, 164.81]
        ],
        scale: [220.00, 261.63, 329.63, 349.23, 329.63, 293.66, 246.94, 220.00]
    },

    // --- АМЕТИСТОВАЯ КОЛЛЕКЦИЯ (33-48) ---
    {
        id: 'amethyst_hang_cosmos',
        title: '33. Аметистовый Космо-Ханг',
        subtitle: 'Глубокий резонанс в невесомости туманности',
        badge: '🔮 АМЕТИСТ',
        isAmethyst: true,
        instrument: 'handpan',
        noteInterval: 0.78,
        chordDuration: 5.2,
        chords: [
            [61.74, 123.47, 185.00, 246.94],
            [49.00, 98.00, 146.83, 220.00],
            [55.00, 110.00, 164.81, 246.94],
            [65.41, 130.81, 196.00, 293.66]
        ],
        scale: [246.94, 293.66, 369.99, 440.00, 493.88, 587.33, 493.88, 369.99]
    },
    {
        id: 'amethyst_nocturne_piano',
        title: '34. Полуночный Ноктюрн',
        subtitle: 'Бархатный рояль в пустом старинном зале',
        badge: '🔮 РОЯЛЬ',
        isAmethyst: true,
        instrument: 'felt_piano',
        noteInterval: 0.92,
        chordDuration: 4.8,
        chords: [
            [69.30, 103.83, 138.59, 207.65],
            [55.00, 110.00, 138.59, 164.81],
            [61.74, 92.50, 138.59, 185.00],
            [69.30, 103.83, 138.59, 207.65]
        ],
        scale: [277.18, 329.63, 415.30, 493.88, 554.37, 493.88, 415.30, 329.63]
    },
    {
        id: 'amethyst_choir_sanctuary',
        title: '35. Хор Древнего Свода',
        subtitle: 'Ангельские вокальные пады под куполом',
        badge: '🔮 ХОР',
        isAmethyst: true,
        instrument: 'mellotron',
        noteInterval: 2.3,
        chordDuration: 6.4,
        chords: [
            [65.41, 98.00, 146.83, 196.00],
            [58.27, 87.31, 130.81, 174.61],
            [43.65, 87.31, 130.81, 164.81],
            [49.00, 98.00, 146.83, 196.00]
        ],
        scale: [261.63, 293.66, 392.00, 440.00, 392.00, 329.63, 293.66]
    },
    {
        id: 'amethyst_arabian_oud',
        title: '36. Мираж Ночной Пустыни',
        subtitle: 'Восточный уд под звёздным небом Сахары',
        badge: '🔮 ВОСТОК',
        isAmethyst: true,
        instrument: 'sitar_pluck',
        noteInterval: 0.74,
        chordDuration: 5.0,
        chords: [
            [73.42, 110.00, 146.83, 220.00],
            [77.78, 116.54, 146.83, 233.08],
            [69.30, 110.00, 138.59, 220.00],
            [73.42, 110.00, 146.83, 220.00]
        ],
        scale: [293.66, 311.13, 369.99, 392.00, 440.00, 466.16, 369.99, 311.13]
    },
    {
        id: 'amethyst_crystal_bowls',
        title: '37. Кристальные Чаши 852 Гц',
        subtitle: 'Чистый кварцевый резонанс глубокого транса',
        badge: '🔮 852 ГЦ',
        isAmethyst: true,
        instrument: 'glass_harp',
        noteInterval: 2.1,
        chordDuration: 6.5,
        chords: [
            [71.00, 142.00, 213.00, 284.00],
            [53.25, 106.50, 159.75, 213.00],
            [63.90, 127.80, 191.70, 255.60],
            [71.00, 142.00, 213.00, 284.00]
        ],
        scale: [284.00, 426.00, 568.00, 852.00, 568.00, 426.00]
    },
    {
        id: 'amethyst_velvet_sax',
        title: '38. Ночной Нуар-Силуэт',
        subtitle: 'Тёплый бархатный духовой тембр ночного города',
        badge: '🔮 НУАР',
        isAmethyst: true,
        instrument: 'warm_duduk',
        noteInterval: 1.85,
        chordDuration: 5.4,
        chords: [
            [58.27, 116.54, 138.59, 174.61, 207.65],
            [51.91, 103.83, 130.81, 155.56, 196.00],
            [46.25, 92.50, 138.59, 164.81, 207.65],
            [58.27, 116.54, 138.59, 174.61, 207.65]
        ],
        scale: [233.08, 277.18, 311.13, 349.23, 415.30, 349.23, 277.18]
    },
    {
        id: 'amethyst_celestial_lute',
        title: '39. Звёздная Лютня',
        subtitle: 'Средневековая баллада у камина в замке',
        badge: '🔮 ЛЮТНЯ',
        isAmethyst: true,
        instrument: 'nylon_guitar',
        noteInterval: 0.58,
        chordDuration: 4.3,
        chords: [
            [73.42, 110.00, 146.83, 220.00],
            [65.41, 98.00, 130.81, 196.00],
            [58.27, 87.31, 116.54, 174.61],
            [55.00, 110.00, 138.59, 220.00]
        ],
        scale: [293.66, 349.23, 392.00, 440.00, 523.25, 440.00, 349.23, 293.66]
    },
    {
        id: 'amethyst_analog_odyssey',
        title: '40. Одиссея Андромеды',
        subtitle: 'Космический аналоговый синт далёких галактик',
        badge: '🔮 ГАЛАКТИКА',
        isAmethyst: true,
        instrument: 'blade_synth',
        noteInterval: 1.65,
        chordDuration: 5.8,
        chords: [
            [49.00, 98.00, 146.83, 185.00, 220.00],
            [58.27, 116.54, 146.83, 174.61, 220.00],
            [43.65, 87.31, 130.81, 164.81, 196.00],
            [55.00, 110.00, 146.83, 164.81, 220.00]
        ],
        scale: [293.66, 369.99, 440.00, 587.33, 493.88, 440.00, 369.99]
    },
    {
        id: 'amethyst_ice_glockenspiel',
        title: '41. Ледяной Глокеншпиль',
        subtitle: 'Хрустальная колыбельная замерзшего озера',
        badge: '🔮 ЛЁД',
        isAmethyst: true,
        instrument: 'music_box',
        noteInterval: 0.52,
        chordDuration: 4.2,
        chords: [
            [82.41, 123.47, 164.81, 246.94],
            [65.41, 130.81, 164.81, 246.94],
            [73.42, 110.00, 146.83, 220.00],
            [61.74, 123.47, 164.81, 246.94]
        ],
        scale: [493.88, 587.33, 659.25, 783.99, 659.25, 587.33, 493.88]
    },
    {
        id: 'amethyst_zen_marimba',
        title: '42. Тропический Сумеречный Лес',
        subtitle: 'Глубокая деревянная маримба в тумане',
        badge: '🔮 МАРИМБА',
        isAmethyst: true,
        instrument: 'marimba',
        noteInterval: 0.62,
        chordDuration: 4.5,
        chords: [
            [65.41, 98.00, 146.83, 196.00],
            [58.27, 87.31, 130.81, 174.61],
            [51.91, 103.83, 155.56, 196.00],
            [58.27, 87.31, 130.81, 174.61]
        ],
        scale: [261.63, 311.13, 392.00, 466.16, 523.25, 466.16, 392.00]
    },
    {
        id: 'amethyst_deep_cello_duet',
        title: '43. Элегия Осеннего Дождя',
        subtitle: 'Камерная виолончель у запотевшего окна',
        badge: '🔮 ЭЛЕГИЯ',
        isAmethyst: true,
        instrument: 'bowed_cello',
        noteInterval: 2.4,
        chordDuration: 5.8,
        chords: [
            [65.41, 98.00, 130.81, 155.56],
            [51.91, 103.83, 130.81, 155.56],
            [58.27, 87.31, 116.54, 146.83],
            [49.00, 98.00, 123.47, 146.83]
        ],
        scale: [130.81, 155.56, 196.00, 233.08, 261.63, 196.00, 155.56]
    },
    {
        id: 'amethyst_vinyl_dreams',
        title: '44. Сны на Старой Пластинке',
        subtitle: 'Уютное расстроенное пианино сквозь годы',
        badge: '🔮 РЕТРО-СОН',
        isAmethyst: true,
        instrument: 'tape_synth',
        noteInterval: 1.45,
        chordDuration: 5.0,
        chords: [
            [73.42, 110.00, 138.59, 164.81],
            [61.74, 92.50, 138.59, 164.81],
            [55.00, 82.41, 110.00, 138.59],
            [65.41, 98.00, 130.81, 164.81]
        ],
        scale: [277.18, 329.63, 369.99, 440.00, 369.99, 329.63, 277.18]
    },
    {
        id: 'amethyst_temple_koto',
        title: '45. Храм Киото в Полночь',
        subtitle: 'Шёлковые струны кото и ночной сад',
        badge: '🔮 КИОТО',
        isAmethyst: true,
        instrument: 'koto_pluck',
        noteInterval: 0.88,
        chordDuration: 5.2,
        chords: [
            [82.41, 123.47, 164.81, 246.94],
            [65.41, 98.00, 164.81, 196.00],
            [73.42, 110.00, 164.81, 220.00],
            [82.41, 123.47, 164.81, 246.94]
        ],
        scale: [329.63, 349.23, 440.00, 493.88, 659.25, 493.88, 440.00, 349.23]
    },
    {
        id: 'amethyst_solfeggio_174',
        title: '46. Частота Покоя 174 Гц',
        subtitle: 'Фундаментальный низкий дрон расслабления',
        badge: '🔮 174 ГЦ',
        isAmethyst: true,
        instrument: 'pure_harmonic',
        noteInterval: 3.2,
        chordDuration: 7.5,
        chords: [
            [43.50, 87.00, 130.50, 174.00],
            [58.00, 116.00, 174.00, 232.00],
            [43.50, 87.00, 130.50, 174.00],
            [52.20, 104.40, 156.60, 208.80]
        ],
        scale: [174.00, 261.00, 348.00, 522.00, 348.00, 261.00]
    },
    {
        id: 'amethyst_aurora_flute',
        title: '47. Сказка Северного Сияния',
        subtitle: 'Кристальная окарина над снежной тундрой',
        badge: '🔮 АВРОРА',
        isAmethyst: true,
        instrument: 'ocarina',
        noteInterval: 1.35,
        chordDuration: 5.0,
        chords: [
            [65.41, 130.81, 164.81, 196.00],
            [55.00, 110.00, 164.81, 220.00],
            [43.65, 87.31, 130.81, 174.61],
            [49.00, 98.00, 146.83, 196.00]
        ],
        scale: [392.00, 440.00, 523.25, 659.25, 587.33, 523.25, 440.00]
    },
    {
        id: 'amethyst_infinity_organ',
        title: '48. Горизонт Событий',
        subtitle: 'Глубокий соборный орган на краю Вселенной',
        badge: '🔮 ВЕЧНОСТЬ',
        isAmethyst: true,
        instrument: 'space_organ',
        noteInterval: 2.0,
        chordDuration: 6.5,
        chords: [
            [49.00, 98.00, 146.83, 220.00],
            [43.65, 87.31, 130.81, 196.00],
            [36.71, 73.42, 110.00, 164.81],
            [41.20, 82.41, 123.47, 185.00]
        ],
        scale: [196.00, 246.94, 293.66, 392.00, 329.63, 293.66, 246.94]
    }
];

// 30 готовых атмосферных миксов
const READY_MIXES = [
    {
        id: 'mix_ocean_sleep',
        title: '🔥 Океан и Чистый Сон',
        desc: 'Морской прибой + Глубина океана + Космос + Мелодия сна',
        badge: '🔥 ЛУЧШИЙ ВЫБОР',
        isFavorite: true,
        melodyIdx: 1,
        warmth: 480,
        music: { pad: 0.90, piano: 0.65, shimmer: 0.50 },
        noises: { sea: 0.58, underwater: 0.25, brown: 0.22, cosmos: 0.20 }
    },
    {
        id: 'mix_sculptor_video',
        title: '🔥 Скульптор Будущего',
        desc: 'Фетровое пианино + Ночной дождь + Часы и Сердцебиение + Винил',
        badge: '🔥 ФЛАГМАН',
        isFavorite: true,
        melodyIdx: 0,
        warmth: 850,
        music: { pad: 0.88, piano: 0.85, shimmer: 0.40 },
        noises: { rain: 0.35, clock_heart: 0.42, vinyl: 0.22, wind: 0.18 }
    },
    {
        id: 'mix_snowfall',
        title: 'Зимний Снегопад',
        desc: 'Снежная вьюга + Хрустальное пианино + Тёплый костёр',
        melodyIdx: 12,
        warmth: 780,
        music: { pad: 0.85, piano: 0.80, shimmer: 0.45 },
        noises: { blizzard: 0.38, fire: 0.30, vinyl: 0.15 }
    },
    {
        id: 'mix_focus',
        title: 'Глубокий Фокус (Работа)',
        desc: 'Коричневый шум + Дрон 432 Гц + Дождь по крыше',
        melodyIdx: 11,
        warmth: 520,
        music: { pad: 0.75, piano: 0.35, shimmer: 0.15 },
        noises: { brown: 0.55, pink: 0.20, roof_rain: 0.30 }
    },
    {
        id: 'mix_cozy_cat',
        title: 'Домик в Грозу и Кот',
        desc: 'Мурчание кота + Ночной костёр + Далёкая гроза + Родес',
        melodyIdx: 4,
        warmth: 720,
        music: { pad: 0.70, piano: 0.75, shimmer: 0.25 },
        noises: { cat_purr: 0.45, fire: 0.45, thunder: 0.32, rain: 0.35 }
    },
    {
        id: 'mix_interstellar',
        title: 'Полет сквозь Космос',
        desc: 'Космический орган + Гул космоса + Салон корабля',
        melodyIdx: 6,
        warmth: 920,
        music: { pad: 0.95, piano: 0.80, shimmer: 0.60 },
        noises: { cosmos: 0.50, airplane: 0.25, brown: 0.20 }
    },
    {
        id: 'mix_japanese_zen',
        title: 'Японский Сад Камней',
        desc: 'Струны Кото + Горный ручей + Музыка ветра + Чаши',
        melodyIdx: 9,
        warmth: 1100,
        music: { pad: 0.65, piano: 0.85, shimmer: 0.50 },
        noises: { stream: 0.45, wind_chimes: 0.35, bowls: 0.40, forest: 0.25 }
    },
    {
        id: 'mix_night_train',
        title: 'Поезд в Полночь',
        desc: 'Стук колёс поезда + Дождь за окном + Старая кассета',
        melodyIdx: 7,
        warmth: 680,
        music: { pad: 0.80, piano: 0.70, shimmer: 0.30 },
        noises: { train: 0.50, rain: 0.30, tape: 0.28 }
    },
    {
        id: 'mix_nordic_fjord',
        title: 'Туманный Фьорд',
        desc: 'Исландская виолончель + Холодный ветер + Капли в пещере',
        melodyIdx: 3,
        warmth: 640,
        music: { pad: 0.85, piano: 0.90, shimmer: 0.30 },
        noises: { wind: 0.42, cave: 0.35, sea: 0.20 }
    },
    {
        id: 'mix_summer_campfire',
        title: 'Летняя Ночь у Костра',
        desc: 'Акустическая гитара + Ночные сверчки + Костёр и Лес',
        melodyIdx: 10,
        warmth: 980,
        music: { pad: 0.60, piano: 0.85, shimmer: 0.35 },
        noises: { crickets: 0.45, fire: 0.45, forest: 0.30 }
    },
    {
        id: 'mix_emerald_temple',
        title: 'Бамбуковый Храм в Дождь',
        desc: 'Тибетский Ханг + Бамбуковый фонтан + Зелёный шум + Водопад',
        badge: '🌿 ИЗУМРУД',
        isNew: true,
        melodyIdx: 16,
        warmth: 920,
        music: { pad: 0.80, piano: 0.88, shimmer: 0.45 },
        noises: { shishi_odoshi: 0.48, green_noise: 0.25, waterfall: 0.28, rain: 0.25 }
    },
    {
        id: 'mix_emerald_whales',
        title: 'Песни Китов и Бездна',
        desc: 'Песни китов + Подводный сонар + Поющий глюкофон',
        badge: '🌿 ГЛУБИНА',
        isNew: true,
        melodyIdx: 28,
        warmth: 540,
        music: { pad: 0.92, piano: 0.75, shimmer: 0.55 },
        noises: { whales: 0.55, sonar: 0.35, underwater: 0.40, velvet_sub: 0.30 }
    },
    {
        id: 'mix_emerald_cyber_code',
        title: 'Ночной Кодинг и Серверная',
        desc: 'Печать клавиатуры + Серверная + Бархатный суб-шум + Консоль 94',
        badge: '🌿 ДЛЯ РАБОТЫ',
        isNew: true,
        melodyIdx: 23,
        warmth: 680,
        music: { pad: 0.78, piano: 0.60, shimmer: 0.30 },
        noises: { keyboard: 0.42, server_room: 0.38, velvet_sub: 0.35, night_cafe: 0.20 }
    },
    {
        id: 'mix_emerald_library',
        title: 'Тайная Библиотека в Полночь',
        desc: 'Шелест страниц + Маятник часов + Поющие бокалы + Дождь',
        badge: '🌿 ЧТЕНИЕ',
        isNew: true,
        melodyIdx: 22,
        warmth: 790,
        music: { pad: 0.75, piano: 0.70, shimmer: 0.50 },
        noises: { book_pages: 0.45, pendulum: 0.42, roof_rain: 0.32, fire: 0.25 }
    },
    {
        id: 'mix_emerald_jungle',
        title: 'Ночные Джунгли Амазонки',
        desc: 'Лесная Калимба + Тропические цикады + Лягушки + Водопад',
        badge: '🌿 ПРИРОДА',
        isNew: true,
        melodyIdx: 17,
        warmth: 1050,
        music: { pad: 0.70, piano: 0.85, shimmer: 0.40 },
        noises: { cicadas: 0.40, frogs: 0.38, waterfall: 0.30, green_noise: 0.22 }
    },
    {
        id: 'mix_emerald_highway',
        title: 'Ночная Трасса и Джаз',
        desc: 'Полуночный Вибрафон + Шум ночного авто + Ливень по крыше',
        badge: '🌿 ДОРОГА',
        isNew: true,
        melodyIdx: 21,
        warmth: 740,
        music: { pad: 0.82, piano: 0.80, shimmer: 0.35 },
        noises: { night_drive: 0.52, rain: 0.35, tape: 0.20 }
    },
    {
        id: 'mix_emerald_highlands',
        title: 'Туманное Ущелье и Дудук',
        desc: 'Древний Дудук + Ночная сова + Термальный гейзер + Костёр',
        badge: '🌿 ГОРЫ',
        isNew: true,
        melodyIdx: 20,
        warmth: 620,
        music: { pad: 0.88, piano: 0.85, shimmer: 0.30 },
        noises: { night_owl: 0.42, geyser: 0.32, wind: 0.30, fire: 0.28 }
    },
    {
        id: 'mix_emerald_aurora',
        title: 'Полярная Станция и Терменвокс',
        desc: 'Эфирный Терменвокс + Шаги по снегу + Магнитосфера Полюса',
        badge: '🌿 СЕВЕР',
        isNew: true,
        melodyIdx: 19,
        warmth: 860,
        music: { pad: 0.90, piano: 0.75, shimmer: 0.65 },
        noises: { snow_steps: 0.45, aurora_hum: 0.48, blizzard: 0.28 }
    },
    {
        id: 'mix_emerald_shambhala',
        title: 'Храм Шамбалы (528 Гц)',
        desc: 'Изумрудный резонанс 528 Гц + Камертон + Тибетский Ом-дрон',
        badge: '🌿 МЕДИТАЦИЯ',
        isNew: true,
        melodyIdx: 30,
        warmth: 580,
        music: { pad: 0.95, piano: 0.65, shimmer: 0.60 },
        noises: { fork_528: 0.45, om_drone: 0.50, bowls: 0.35 }
    },
    {
        id: 'mix_emerald_montmartre',
        title: 'Старый Кинотеатр на Монмартре',
        desc: 'Французский аккордеон + Кинопроектор 35мм + Ночное кафе',
        badge: '🌿 ПАРИЖ',
        isNew: true,
        melodyIdx: 31,
        warmth: 820,
        music: { pad: 0.72, piano: 0.85, shimmer: 0.30 },
        noises: { projector: 0.45, night_cafe: 0.40, rain: 0.28, vinyl: 0.20 }
    },
    {
        id: 'mix_amethyst_delta',
        title: '🔮 Глубокий Дельта-Сон',
        desc: 'Бинауральный Дельта + Чёрный шум + Кристальные чаши 852 Гц',
        badge: '🔮 ГЛУБОКИЙ СОН',
        isAmethyst: true,
        melodyIdx: 36,
        warmth: 460,
        music: { pad: 0.92, piano: 0.60, shimmer: 0.55 },
        noises: { binaural_delta: 0.50, black_noise: 0.42, quartz_bowl_174: 0.35 }
    },
    {
        id: 'mix_amethyst_nebula',
        title: '🔮 Обшивка Звездолёта',
        desc: 'Космо-Ханг + Кольца Сатурна + Пульсар Вела + Каюта корабля',
        badge: '🔮 КОСМОС',
        isAmethyst: true,
        melodyIdx: 32,
        warmth: 740,
        music: { pad: 0.90, piano: 0.82, shimmer: 0.60 },
        noises: { space_hull: 0.48, saturn_rings: 0.38, pulsar_rhythm: 0.32 }
    },
    {
        id: 'mix_amethyst_nocturne',
        title: '🔮 Ноктюрн и Граммофон',
        desc: 'Полуночный рояль + Старый граммофон + Угли в камине + Ливень',
        badge: '🔮 ВИНТАЖ',
        isAmethyst: true,
        melodyIdx: 33,
        warmth: 690,
        music: { pad: 0.80, piano: 0.88, shimmer: 0.35 },
        noises: { gramophone_horn: 0.42, fireplace_bellow: 0.40, rain: 0.30 }
    },
    {
        id: 'mix_amethyst_tent',
        title: '🔮 Палатка в Осеннем Лесу',
        desc: 'Звёздная лютня + Дождь по палатке + Осенний листопад + Костёр',
        badge: '🔮 ПОХОД',
        isAmethyst: true,
        melodyIdx: 38,
        warmth: 820,
        music: { pad: 0.72, piano: 0.85, shimmer: 0.35 },
        noises: { rain_tent: 0.52, autumn_leaves: 0.38, fire: 0.32 }
    },
    {
        id: 'mix_amethyst_sanctuary',
        title: '🔮 Древний Храм и Благовония',
        desc: 'Хор древнего свода + Дым благовоний + Резонанс Шумана',
        badge: '🔮 МИСТИКА',
        isAmethyst: true,
        melodyIdx: 34,
        warmth: 580,
        music: { pad: 0.94, piano: 0.70, shimmer: 0.50 },
        noises: { monks_whisper: 0.48, temple_incense: 0.35, schumann_783: 0.40 }
    },
    {
        id: 'mix_amethyst_sahara',
        title: '🔮 Караван под Звёздами',
        desc: 'Восточный уд + Караван в пустыне + Ночной ветер барханов',
        badge: '🔮 ВОСТОК',
        isAmethyst: true,
        melodyIdx: 35,
        warmth: 890,
        music: { pad: 0.78, piano: 0.86, shimmer: 0.40 },
        noises: { camel_caravan: 0.48, wind: 0.28, crickets: 0.25 }
    },
    {
        id: 'mix_amethyst_harbor',
        title: '🔮 Туманная Гавань в Полночь',
        desc: 'Нуар-силуэт + Колокол в тумане + Чайки над бухтой + Прибой',
        badge: '🔮 НУАР',
        isAmethyst: true,
        melodyIdx: 37,
        warmth: 660,
        music: { pad: 0.85, piano: 0.80, shimmer: 0.30 },
        noises: { harbor_bells: 0.44, seagulls_far: 0.30, sea: 0.40, blue_mist: 0.25 }
    },
    {
        id: 'mix_amethyst_nautilus',
        title: '🔮 Батискаф Наутилус',
        desc: 'Горизонт событий + Двигатель Наутилуса + Пещера кристаллов',
        badge: '🔮 БЕЗДНА',
        isAmethyst: true,
        melodyIdx: 47,
        warmth: 520,
        music: { pad: 0.92, piano: 0.75, shimmer: 0.55 },
        noises: { sub_engine: 0.48, crystal_cave: 0.40, underwater: 0.35 }
    },
    {
        id: 'mix_amethyst_espresso',
        title: '🔮 Утренняя Кофейня в Дождь',
        desc: 'Элегия виолончели + Пар кофемашины + Дворцовый фонтан',
        badge: '🔮 УЮТ',
        isAmethyst: true,
        melodyIdx: 42,
        warmth: 770,
        music: { pad: 0.76, piano: 0.88, shimmer: 0.30 },
        noises: { espresso_steam: 0.46, fountain_plaza: 0.35, night_cafe: 0.30 }
    },
    {
        id: 'mix_amethyst_kyoto',
        title: '🔮 Полночь в Киото',
        desc: 'Шёлковый кото + Бамбуковые трубки + Сфера интуиции 852 Гц',
        badge: '🔮 ДЗЕН',
        isAmethyst: true,
        melodyIdx: 44,
        warmth: 960,
        music: { pad: 0.80, piano: 0.85, shimmer: 0.50 },
        noises: { bamboo_chimes: 0.46, solfeggio_852: 0.32, shishi_odoshi: 0.35 }
    }
];

const state = {
    isPlaying: false,
    noisesPaused: false,
    melodyPaused: false,
    masterVol: 0.90,
    warmthCutoff: 850,
    selectedMelodyIdx: 1,
    activeMixId: 'mix_ocean_sleep',
    musicLayers: {
        pad: 0.90,
        piano: 0.65,
        shimmer: 0.50
    },
    noiseVolumes: {}
};

NOISE_CHANNELS.forEach(ch => {
    state.noiseVolumes[ch.id] = ch.defaultVol;
});

// Детектор мобильных устройств (iOS / iPadOS / Android), где звук должен идти через нативный <audio> WAV-поток
const IS_IOS_OR_MOBILE = /iPad|iPhone|iPod|Android/i.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

class SanctuaryAudioEngine {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.noisesBusGain = null;
        this.musicBusGain = null;
        this.channelGains = {};
        this.musicGains = {};
        this.isInitialized = false;

        this.nextChordAudioTime = 0;
        this.nextNoteAudioTime = 0;
        this.chordStepCounter = 0;
        this.noteStepCounter = 0;
        this.lastClockSec = -1;
        this.lastProcessedAudioTime = null;
        this.audioClockNode = null;

        // The supplied mobile version uses native HTML audio; desktop uses its original live graph.
        this.bgAudioEl = document.getElementById('iosCarrierAudio');
        this.carrierBlobUrl = null;
        this.artworkDataUrl = null;
        this.useDirectStream = IS_IOS_OR_MOBILE;
        this.rebakeTimer = null;
        this.playRequest = 0;

        // Предварительно собираем стартовый WAV-микс, чтобы в момент первого же тапа iOS мгновенно запустил <audio>
        if (this.useDirectStream) this.rebuildDirectMixWav(true);
    }

    forceIOSPlaybackSession() {
        try {
            if ('audioSession' in navigator && navigator.audioSession) {
                navigator.audioSession.type = 'playback';
            }
        } catch (e) {}
    }

    // Планировщик пересборки WAV-потока при движении ползунков
    scheduleDirectMixRebuild(immediate = false) {
        if (!this.useDirectStream) return;
        if (this.rebakeTimer) clearTimeout(this.rebakeTimer);
        this.rebakeTimer = setTimeout(() => {
            this.rebuildDirectMixWav(false);
        }, immediate ? 20 : 180);
    }

    // Конвертация Float32-буфера в Data URL (base64 WAV) или Blob URL для мгновенного воспроизведения в Safari
    rebuildDirectMixWav(isInitialBoot = false) {
        if (!this.useDirectStream) return;
        try {
            const sampleRate = 22050;
            const melody = MELODIES[state.selectedMelodyIdx] || MELODIES[0];
            const durationSec = 16;
            const numSamples = sampleRate * durationSec;
            const buffer = new ArrayBuffer(44 + numSamples * 2);
            const view = new DataView(buffer);

            const writeStr = (offset, str) => {
                for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
            };
            writeStr(0, 'RIFF');
            view.setUint32(4, 36 + numSamples * 2, true);
            writeStr(8, 'WAVE');
            writeStr(12, 'fmt ');
            view.setUint32(16, 16, true);
            view.setUint16(20, 1, true);
            view.setUint16(22, 1, true);
            view.setUint32(24, sampleRate, true);
            view.setUint32(28, sampleRate * 2, true);
            view.setUint16(32, 2, true);
            view.setUint16(34, 16, true);
            writeStr(36, 'data');
            view.setUint32(40, numSamples * 2, true);

            const mixBuf = new Float32Array(numSamples);

            // 1. СИНТЕЗ ВСЕХ АКТИВНЫХ ШУМОВ И ПРИРОДЫ
            if (!state.noisesPaused) {
                const nv = state.noiseVolumes;
                const subLevel = (nv.brown || 0) * 0.45 + (nv.underwater || 0) * 0.5 + (nv.velvet_sub || 0) * 0.55 +
                                 (nv.black_noise || 0) * 0.6 + (nv.airplane || 0) * 0.4 + (nv.sub_engine || 0) * 0.45 +
                                 (nv.space_hull || 0) * 0.4 + (nv.fireplace_bellow || 0) * 0.35 + (nv.train || 0) * 0.35;

                const midLevel = (nv.pink || 0) * 0.32 + (nv.rain || 0) * 0.38 + (nv.roof_rain || 0) * 0.35 +
                                 (nv.forest || 0) * 0.3 + (nv.green_noise || 0) * 0.35 + (nv.waterfall || 0) * 0.35 +
                                 (nv.night_cafe || 0) * 0.3 + (nv.server_room || 0) * 0.3 + (nv.night_drive || 0) * 0.35 +
                                 (nv.rain_tent || 0) * 0.38 + (nv.autumn_leaves || 0) * 0.28 + (nv.fountain_plaza || 0) * 0.3 +
                                 (nv.gramophone_horn || 0) * 0.25 + (nv.fire || 0) * 0.3;

                const highLevel = (nv.white || 0) * 0.22 + (nv.stream || 0) * 0.28 + (nv.vinyl || 0) * 0.22 +
                                  (nv.tape || 0) * 0.22 + (nv.violet_noise || 0) * 0.2 + (nv.blue_mist || 0) * 0.22 +
                                  (nv.temple_incense || 0) * 0.2 + (nv.geyser || 0) * 0.25;

                const seaVol = nv.sea || 0;
                const windVol = (nv.wind || 0) + (nv.blizzard || 0) * 0.9 + (nv.aurora_hum || 0) * 0.6 + (nv.saturn_rings || 0) * 0.6;
                const purrVol = nv.cat_purr || 0;

                const cosmosVol = nv.cosmos || 0;
                const fork528Vol = nv.fork_528 || 0;
                const omVol = nv.om_drone || 0;
                const binDeltaVol = nv.binaural_delta || 0;
                const schumannVol = nv.schumann_783 || 0;
                const monksVol = nv.monks_whisper || 0;
                const q174Vol = nv.quartz_bowl_174 || 0;
                const s852Vol = nv.solfeggio_852 || 0;
                const beeVol = nv.beehive || 0;

                let lowState = 0;
                let midState = 0;
                const twoPi = Math.PI * 2;

                for (let i = 0; i < numSamples; i++) {
                    const t = i / sampleRate;
                    const white = Math.random() * 2 - 1;
                    lowState = lowState * 0.975 + white * 0.025;
                    midState = midState * 0.86 + white * 0.14;
                    const highSample = white - midState;

                    let sample = lowState * subLevel * 1.6 + midState * midLevel * 0.95 + highSample * highLevel * 0.45;

                    if (seaVol > 0.01) {
                        const waveEnv = 0.52 + 0.45 * Math.sin(twoPi * (t / 8.0));
                        sample += (lowState * 1.3 + midState * 0.45) * seaVol * waveEnv * 0.65;
                    }
                    if (windVol > 0.01) {
                        const windEnv = 0.5 + 0.45 * Math.sin(twoPi * (t / 5.333));
                        sample += midState * windVol * windEnv * 0.5;
                    }
                    if (purrVol > 0.01) {
                        const breath = 0.6 + 0.4 * Math.sin(twoPi * (t / 2.666));
                        sample += Math.sin(twoPi * 26.5 * t) * purrVol * breath * 0.18;
                    }
                    if (cosmosVol > 0.01) {
                        sample += (Math.sin(twoPi * 55.0 * t) + 0.5 * Math.sin(twoPi * 82.5 * t)) * cosmosVol * 0.12;
                    }
                    if (fork528Vol > 0.01) {
                        sample += (Math.sin(twoPi * 528.0 * t) + 0.4 * Math.sin(twoPi * 264.0 * t)) * fork528Vol * 0.07;
                    }
                    if (omVol > 0.01) {
                        sample += (Math.sin(twoPi * 136.1 * t) + 0.6 * Math.sin(twoPi * 68.05 * t)) * omVol * 0.13;
                    }
                    if (binDeltaVol > 0.01) {
                        sample += (Math.sin(twoPi * 100.0 * t) + Math.sin(twoPi * 102.5 * t)) * binDeltaVol * 0.09;
                    }
                    if (schumannVol > 0.01) {
                        sample += (Math.sin(twoPi * 78.3 * t) + Math.sin(twoPi * 86.13 * t)) * schumannVol * 0.1;
                    }
                    if (monksVol > 0.01) {
                        sample += (Math.sin(twoPi * 110.0 * t) + 0.6 * Math.sin(twoPi * 165.0 * t)) * monksVol * 0.11;
                    }
                    if (q174Vol > 0.01) {
                        sample += Math.sin(twoPi * 174.0 * t) * q174Vol * 0.11;
                    }
                    if (s852Vol > 0.01) {
                        sample += Math.sin(twoPi * 852.0 * t) * s852Vol * 0.05;
                    }
                    if (beeVol > 0.01) {
                        sample += (Math.sin(twoPi * 98.0 * t) + Math.sin(twoPi * 99.5 * t)) * beeVol * 0.08;
                    }

                    mixBuf[i] += sample;
                }

                const addToneEvent = (startSec, freqStart, freqEnd, durSec, amp) => {
                    const startIdx = Math.floor(startSec * sampleRate);
                    const lenIdx = Math.floor(durSec * sampleRate);
                    let phase = 0;
                    for (let j = 0; j < lenIdx; j++) {
                        const idx = (startIdx + j) % numSamples;
                        const prog = j / lenIdx;
                        const f = freqStart + (freqEnd - freqStart) * prog;
                        phase += (twoPi * f) / sampleRate;
                        const env = Math.sin(Math.min(1, prog * 12) * (Math.PI / 2)) * Math.exp(-prog * 4.5);
                        mixBuf[idx] += Math.sin(phase) * amp * env;
                    }
                };

                if ((nv.clock_heart || 0) > 0.03) {
                    const cv = nv.clock_heart;
                    for (let s = 0; s < durationSec; s++) {
                        addToneEvent(s, 1200, 420, 0.03, cv * 0.12);
                        addToneEvent(s + 0.02, 72, 30, 0.25, cv * 0.42);
                    }
                }
                if ((nv.pendulum || 0) > 0.03) {
                    for (let s = 0; s < durationSec; s++) {
                        addToneEvent(s, s % 2 === 0 ? 520 : 410, 180, 0.045, nv.pendulum * 0.16);
                    }
                }
                if ((nv.bowls || 0) > 0.03) {
                    [1.5, 6.5, 11.5].forEach((sec, k) => {
                        const bf = [216, 288, 432][k % 3];
                        addToneEvent(sec, bf, bf, 4.2, nv.bowls * 0.16);
                    });
                }
                if ((nv.whales || 0) > 0.03) {
                    [2.0, 9.5].forEach((sec, k) => {
                        addToneEvent(sec, k === 0 ? 310 : 250, 165, 2.8, nv.whales * 0.16);
                    });
                }
                if ((nv.sonar || 0) > 0.03) {
                    [1.0, 5.0, 9.0, 13.0].forEach(sec => {
                        addToneEvent(sec, 1320, 1315, 1.1, nv.sonar * 0.11);
                    });
                }
                if ((nv.wind_chimes || 0) > 0.03 || (nv.crystal_cave || 0) > 0.03) {
                    const chV = Math.max(nv.wind_chimes || 0, nv.crystal_cave || 0);
                    const chFreqs = [1046.5, 1174.6, 1318.5, 1567.9, 1760.0];
                    for (let c = 0; c < 12; c++) {
                        addToneEvent(c * 1.3, chFreqs[c % chFreqs.length], chFreqs[c % chFreqs.length], 1.2, chV * 0.07);
                    }
                }
                if ((nv.shishi_odoshi || 0) > 0.03 || (nv.bamboo_chimes || 0) > 0.03) {
                    const bv = Math.max(nv.shishi_odoshi || 0, nv.bamboo_chimes || 0);
                    [2.2, 6.4, 10.8, 14.2].forEach(sec => {
                        addToneEvent(sec, 540, 190, 0.09, bv * 0.2);
                    });
                }
                if ((nv.harbor_bells || 0) > 0.03) {
                    [3.0, 11.0].forEach(sec => {
                        addToneEvent(sec, 392, 389, 3.0, nv.harbor_bells * 0.14);
                    });
                }
            }

            // 2. СИНТЕЗ ВЫБРАННОЙ МЕЛОДИИ, ПЭДА И ШИММЕРА
            if (!state.melodyPaused) {
                const padVol = state.musicLayers.pad;
                const pianoVol = state.musicLayers.piano;
                const shimmerVol = state.musicLayers.shimmer;
                const warmthRatio = Math.max(0.25, Math.min(1.5, state.warmthCutoff / 900));
                const twoPi = Math.PI * 2;

                if (padVol > 0.01 && melody.chords && melody.chords.length > 0) {
                    const chordDur = 4.0;
                    for (let cIdx = 0; cIdx < 4; cIdx++) {
                        const chord = melody.chords[cIdx % melody.chords.length];
                        const startSample = Math.floor(cIdx * chordDur * sampleRate);
                        const lenSamples = Math.floor((chordDur + 0.6) * sampleRate);
                        const voiceAmp = (0.095 * padVol) / Math.sqrt(chord.length);

                        chord.forEach(freq => {
                            for (let j = 0; j < lenSamples; j++) {
                                const idx = (startSample + j) % numSamples;
                                const prog = j / lenSamples;
                                const t = j / sampleRate;
                                const env = Math.sin(prog * Math.PI);
                                const sig = Math.sin(twoPi * freq * t) +
                                            0.45 * Math.sin(twoPi * (freq * 1.003) * t) +
                                            0.22 * warmthRatio * Math.sin(twoPi * (freq * 2) * t);
                                let out = sig * voiceAmp * env;
                                if (shimmerVol > 0.02) {
                                    out += Math.sin(twoPi * (freq * 4) * t) * voiceAmp * shimmerVol * 0.28 * env;
                                }
                                mixBuf[idx] += out;
                            }
                        });
                    }
                }

                if (pianoVol > 0.01 && melody.scale && melody.scale.length > 0) {
                    const interval = Math.max(0.32, melody.noteInterval || 0.85);
                    const totalNotes = Math.floor(durationSec / interval);
                    const inst = melody.instrument || 'felt_piano';

                    for (let n = 0; n < totalNotes; n++) {
                        const freq = melody.scale[n % melody.scale.length];
                        const noteStartSec = n * interval;
                        const noteDurSec = (inst === 'bowed_cello' || inst === 'space_organ' || inst === 'warm_duduk' || inst === 'theremin' || inst === 'glass_harp')
                            ? 2.8 : 2.1;
                        const startSample = Math.floor(noteStartSec * sampleRate);
                        const lenSamples = Math.floor(noteDurSec * sampleRate);
                        const noteAmp = 0.17 * pianoVol;

                        for (let j = 0; j < lenSamples; j++) {
                            const idx = (startSample + j) % numSamples;
                            const t = j / sampleRate;
                            const prog = j / lenSamples;

                            let env = 0;
                            let wave = 0;

                            if (inst === 'bowed_cello' || inst === 'space_organ' || inst === 'warm_duduk' || inst === 'mellotron' || inst === 'theremin' || inst === 'glass_harp') {
                                env = Math.sin(Math.min(1, prog * 3.2) * (Math.PI / 2)) * Math.exp(-prog * 2.2) * (1 - prog);
                                const vib = Math.sin(twoPi * 5.2 * t) * 1.8;
                                wave = Math.sin(twoPi * (freq + vib) * t) +
                                       0.45 * warmthRatio * Math.sin(twoPi * (freq * 2) * t) +
                                       0.2 * warmthRatio * Math.sin(twoPi * (freq * 3) * t);
                            } else if (inst === 'music_box' || inst === 'kalimba' || inst === 'dream_celesta') {
                                env = Math.min(1, t / 0.01) * Math.exp(-t * 2.8) * (1 - prog);
                                wave = Math.sin(twoPi * freq * t) + 0.35 * Math.sin(twoPi * (freq * 3) * t) * Math.exp(-t * 6);
                            } else if (inst === 'handpan' || inst === 'marimba') {
                                env = Math.min(1, t / 0.015) * Math.exp(-t * 2.3) * (1 - prog);
                                wave = Math.sin(twoPi * freq * t) +
                                       0.4 * Math.sin(twoPi * (freq * 2) * t) * Math.exp(-t * 4) +
                                       0.2 * Math.sin(twoPi * (freq * 3) * t) * Math.exp(-t * 7);
                            } else {
                                env = Math.min(1, t / 0.02) * Math.exp(-t * 2.1) * (1 - prog);
                                wave = Math.sin(twoPi * freq * t) +
                                       0.32 * warmthRatio * Math.sin(twoPi * (freq * 2) * t) * Math.exp(-t * 3.5) +
                                       0.12 * warmthRatio * Math.sin(twoPi * (freq * 3) * t) * Math.exp(-t * 6.0);
                            }

                            mixBuf[idx] += wave * noteAmp * env;
                        }
                    }
                }
            }

            // 3. Кроссфейд краёв буфера и запись 16-бит PCM
            const fadeSamples = Math.floor(0.25 * sampleRate);
            for (let i = 0; i < fadeSamples; i++) {
                const alpha = i / fadeSamples;
                const endIdx = numSamples - fadeSamples + i;
                mixBuf[i] = mixBuf[i] * alpha + mixBuf[endIdx] * (1 - alpha);
            }

            const masterMult = Math.max(0.05, Math.min(1.4, state.masterVol));
            for (let i = 0; i < numSamples; i++) {
                let s = Math.tanh(mixBuf[i] * masterMult * 0.95);
                if (Math.abs(s) < 0.0003) s = (i % 2 === 0 ? 0.0003 : -0.0003);
                view.setInt16(44 + i * 2, (s * 32760) | 0, true);
            }

            const prevUrl = this.carrierBlobUrl;
            const blob = new Blob([buffer], { type: 'audio/wav' });
            this.carrierBlobUrl = URL.createObjectURL(blob);

            if (!this.bgAudioEl) {
                this.bgAudioEl = document.getElementById('iosCarrierAudio');
            }

            const shouldKeepPlaying = state.isPlaying && !isInitialBoot;
            const prevTime = this.bgAudioEl ? (this.bgAudioEl.currentTime || 0) : 0;

            if (this.bgAudioEl) {
                this.bgAudioEl.src = this.carrierBlobUrl;
                this.bgAudioEl.loop = true;
                this.bgAudioEl.volume = 1.0;

                if (shouldKeepPlaying) {
                    this.bgAudioEl.currentTime = prevTime % durationSec;
                    this.playNativeAudio();
                }
            }

            if (prevUrl) {
                setTimeout(() => URL.revokeObjectURL(prevUrl), 4000);
            }
        } catch (e) {
            this.reportPlaybackError('Не удалось подготовить звук. Попробуйте выбрать микс ещё раз.');
        }
    }

    // Native playback belongs only to the original mobile audio path.
    playNativeAudio() {
        if (!this.useDirectStream || !this.bgAudioEl) return;
        const request = ++this.playRequest;
        try {
            const result = this.bgAudioEl.play();
            Promise.resolve(result).catch(error => {
                if (request === this.playRequest && state.isPlaying && error.name !== 'AbortError') {
                    this.reportPlaybackError('Не удалось включить звук. Нажмите «Включить звук» ещё раз.');
                }
            });
        } catch (error) {
            this.reportPlaybackError('Не удалось включить звук. Нажмите «Включить звук» ещё раз.');
        }
    }

    reportPlaybackError(message) {
        state.isPlaying = false;
        this.playRequest++;
        if (this.bgAudioEl) this.bgAudioEl.pause();
        if (this.ctx && this.masterGain) this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.03);
        const status = document.getElementById('audioStatus');
        if (status) { status.textContent = message; status.hidden = false; }
        updateMasterToggle();
        this.updateMediaSessionMetadata();
    }

    unlockAndPlayIOSCarrierSync() {
        this.forceIOSPlaybackSession();
        if (this.useDirectStream && this.bgAudioEl) {
            this.bgAudioEl.loop = true;
            this.bgAudioEl.muted = false;
            this.bgAudioEl.volume = 1.0;
            this.playNativeAudio();
        }
        if (!this.useDirectStream && this.ctx && this.ctx.state !== 'running') {
            this.ctx.resume().catch(() => this.reportPlaybackError('Не удалось возобновить звук. Нажмите «Включить звук» ещё раз.'));
        }
    }

    init() {
        this.forceIOSPlaybackSession();
        if (this.isInitialized) {
            if (!this.useDirectStream && this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume().catch(() => this.reportPlaybackError('Не удалось включить звук. Нажмите ещё раз.'));
            }
            return;
        }

        // Retain the supplied mobile playback path. Actual iOS behavior is device-tested separately.
        if (this.useDirectStream) {
            this.setupMobileLockScreenBridge();
            this.isInitialized = true;
            return;
        }

        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) { this.reportPlaybackError('Браузер не поддерживает аудиосинтез. Откройте сайт в актуальном браузере.'); return; }
        this.ctx = new AudioCtx();
        let contextRan = this.ctx.state === 'running';
        this.ctx.addEventListener('statechange', () => {
            if (this.ctx.state === 'running') contextRan = true;
            else if (contextRan && state.isPlaying) {
                this.reportPlaybackError('Браузер приостановил звук. Нажмите «Включить звук», чтобы продолжить.');
            }
        });

        const comp = this.ctx.createDynamicsCompressor();
        comp.threshold.value = -16;
        comp.ratio.value = 5;

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = state.masterVol;

        this.noisesBusGain = this.ctx.createGain();
        this.noisesBusGain.gain.value = state.noisesPaused ? 0 : 1;

        this.musicBusGain = this.ctx.createGain();
        this.musicBusGain.gain.value = state.melodyPaused ? 0 : 1;

        this.noisesBusGain.connect(this.masterGain);
        this.musicBusGain.connect(this.masterGain);
        this.masterGain.connect(comp);
        comp.connect(this.ctx.destination);

        NOISE_CHANNELS.forEach(ch => {
            const g = this.ctx.createGain();
            g.gain.value = state.noiseVolumes[ch.id] || 0;
            g.connect(this.noisesBusGain);
            this.channelGains[ch.id] = g;
        });

        ['pad', 'piano', 'shimmer'].forEach(m => {
            const g = this.ctx.createGain();
            g.gain.value = state.musicLayers[m];
            g.connect(this.musicBusGain);
            this.musicGains[m] = g;
        });

        this.setupContinuousGenerators();
        this.setupHardwareAudioClock();
        this.setupMobileLockScreenBridge(comp);
        this.resetMelodySchedule();
        this.isInitialized = true;
    }

    generateLockScreenArtwork() {
        if (this.artworkDataUrl) return this.artworkDataUrl;
        try {
            const c = document.createElement('canvas');
            c.width = 512;
            c.height = 512;
            const g = c.getContext('2d');

            const grad = g.createRadialGradient(256, 220, 20, 256, 256, 320);
            grad.addColorStop(0, '#1C1712');
            grad.addColorStop(0.6, '#09090D');
            grad.addColorStop(1, '#040406');
            g.fillStyle = grad;
            g.fillRect(0, 0, 512, 512);

            g.strokeStyle = 'rgba(245, 158, 11, 0.35)';
            g.lineWidth = 3;
            g.beginPath();
            g.arc(256, 230, 145, 0, Math.PI * 2);
            g.stroke();

            g.strokeStyle = '#F59E0B';
            g.lineWidth = 3.5;
            g.beginPath();
            g.moveTo(60, 140);
            g.lineTo(190, 210);
            g.lineTo(310, 175);
            g.lineTo(450, 250);
            g.stroke();

            g.fillStyle = '#FFFFFF';
            g.textAlign = 'center';
            g.font = 'bold 42px Georgia, serif';
            g.fillText('YRLMRSH AUDIO', 256, 235);

            g.fillStyle = '#F59E0B';
            g.font = 'bold 24px monospace';
            g.fillText('@yrlmrsh', 256, 280);

            this.artworkDataUrl = c.toDataURL('image/png');
        } catch (e) {
            this.artworkDataUrl = '';
        }
        return this.artworkDataUrl;
    }

    updateMediaSessionMetadata() {
        if (!('mediaSession' in navigator)) return;
        const activeMix = READY_MIXES.find(m => m.id === state.activeMixId);
        const activeMelody = MELODIES[state.selectedMelodyIdx] || MELODIES[0];
        const title = activeMix ? activeMix.title.replace(/^🔥\s*|^🔮\s*/, '') : activeMelody.title;
        const album = activeMelody ? activeMelody.title : 'Yrlmrsh Audio';
        const artUrl = this.generateLockScreenArtwork();

        try {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: title,
                artist: 'Yrlmrsh Audio • @yrlmrsh',
                album: album,
                artwork: artUrl ? [
                    { src: artUrl, sizes: '512x512', type: 'image/png' }
                ] : []
            });
            navigator.mediaSession.playbackState = state.isPlaying ? 'playing' : 'paused';
        } catch (e) {}
    }

    setupMobileLockScreenBridge(compressorNode) {
        this.forceIOSPlaybackSession();

        if (this.useDirectStream && this.bgAudioEl) {
            this.bgAudioEl.addEventListener('playing', () => {
                if (!this.bgAudioEl.paused) { state.isPlaying = true; updateMasterToggle(); this.updateMediaSessionMetadata(); }
            });
            this.bgAudioEl.addEventListener('pause', () => {
                if (this.bgAudioEl.paused && state.isPlaying) {
                    state.isPlaying = false; this.playRequest++; updateMasterToggle(); this.updateMediaSessionMetadata();
                }
            });
            this.bgAudioEl.addEventListener('error', () => {
                if (this.bgAudioEl.error) this.reportPlaybackError('Браузер не смог воспроизвести звук. Выберите микс ещё раз.');
            });
        }

        if ('mediaSession' in navigator) {
            this.updateMediaSessionMetadata();

            const safeHandler = (action, fn) => {
                try { navigator.mediaSession.setActionHandler(action, fn); } catch (e) {}
            };

            safeHandler('play', () => {
                if (!state.isPlaying) toggleMasterPlay();
            });
            safeHandler('pause', () => {
                if (state.isPlaying) toggleMasterPlay();
            });
            safeHandler('stop', () => {
                if (state.isPlaying) toggleMasterPlay();
            });
            safeHandler('previoustrack', () => {
                const curIdx = READY_MIXES.findIndex(m => m.id === state.activeMixId);
                const prevIdx = (curIdx - 1 + READY_MIXES.length) % READY_MIXES.length;
                applyReadyMix(READY_MIXES[prevIdx]);
            });
            safeHandler('nexttrack', () => {
                const curIdx = READY_MIXES.findIndex(m => m.id === state.activeMixId);
                const nextIdx = (curIdx + 1) % READY_MIXES.length;
                applyReadyMix(READY_MIXES[nextIdx]);
            });
        }
    }

    setupHardwareAudioClock() {
        if (!this.ctx || !this.ctx.createScriptProcessor) return;
        this.audioClockNode = this.ctx.createScriptProcessor(16384, 1, 1);
        const silentKeepAlive = this.ctx.createGain();
        silentKeepAlive.gain.value = 0.0;

        this.audioClockNode.onaudioprocess = () => {
            if (state.isPlaying && this.isInitialized) {
                this.stepSchedulerFromAudioThread();
            }
        };

        this.audioClockNode.connect(silentKeepAlive);
        silentKeepAlive.connect(this.ctx.destination);
    }

    resetMelodySchedule() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        this.nextChordAudioTime = now + 0.05;
        this.nextNoteAudioTime = now + 0.10;
        this.lastProcessedAudioTime = now;
    }

    setupContinuousGenerators() {
        const sr = this.ctx.sampleRate;
        const len = sr * 4;

        const brownBuf = this.ctx.createBuffer(1, len, sr);
        const bData = brownBuf.getChannelData(0);
        let lastB = 0;
        for (let i = 0; i < len; i++) {
            const w = Math.random() * 2 - 1;
            bData[i] = (lastB + 0.02 * w) / 1.02;
            lastB = bData[i];
            bData[i] *= 0.35;
        }

        const pinkBuf = this.ctx.createBuffer(1, len, sr);
        const pData = pinkBuf.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < len; i++) {
            const w = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + w * 0.0555179;
            b1 = 0.99332 * b1 + w * 0.0750759;
            b2 = 0.96900 * b2 + w * 0.1538520;
            b3 = 0.86650 * b3 + w * 0.3104856;
            b4 = 0.55000 * b4 + w * 0.5329522;
            b5 = -0.7616 * b5 - w * 0.0168980;
            pData[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.018;
            b6 = w * 0.115926;
        }

        const whiteBuf = this.ctx.createBuffer(1, len, sr);
        const wData = whiteBuf.getChannelData(0);
        for (let i = 0; i < len; i++) {
            wData[i] = (Math.random() * 2 - 1) * 0.12;
        }

        const createLoop = (buf, filterType, freq, q = 0.7) => {
            const src = this.ctx.createBufferSource();
            src.buffer = buf;
            src.loop = true;
            const flt = this.ctx.createBiquadFilter();
            flt.type = filterType;
            flt.frequency.value = freq;
            flt.Q.value = q;
            src.connect(flt);
            src.start();
            return flt;
        };

        createLoop(brownBuf, 'lowpass', 230).connect(this.channelGains.brown);
        createLoop(pinkBuf, 'lowpass', 1800).connect(this.channelGains.pink);
        createLoop(whiteBuf, 'lowpass', 4200).connect(this.channelGains.white);
        createLoop(pinkBuf, 'bandpass', 780, 0.65).connect(this.channelGains.rain);
        createLoop(brownBuf, 'bandpass', 380, 0.9).connect(this.channelGains.roof_rain);

        const windFlt = createLoop(pinkBuf, 'bandpass', 320, 2.2);
        const windLfo = this.ctx.createOscillator();
        const windDepth = this.ctx.createGain();
        windLfo.frequency.value = 0.11;
        windDepth.gain.value = 180;
        windLfo.connect(windDepth);
        windDepth.connect(windFlt.frequency);
        windLfo.start();
        windFlt.connect(this.channelGains.wind);

        const blizFlt = createLoop(whiteBuf, 'bandpass', 580, 3.0);
        const blizLfo = this.ctx.createOscillator();
        const blizDepth = this.ctx.createGain();
        blizLfo.frequency.value = 0.19;
        blizDepth.gain.value = 320;
        blizLfo.connect(blizDepth);
        blizDepth.connect(blizFlt.frequency);
        blizLfo.start();
        blizFlt.connect(this.channelGains.blizzard);

        const forestFlt = createLoop(pinkBuf, 'bandpass', 1250, 1.2);
        forestFlt.connect(this.channelGains.forest);

        const seaFlt = createLoop(brownBuf, 'lowpass', 480);
        const seaWave = this.ctx.createGain();
        seaWave.gain.value = 0.55;
        const seaLfo = this.ctx.createOscillator();
        const seaDepth = this.ctx.createGain();
        seaLfo.frequency.value = 0.13;
        seaDepth.gain.value = 0.42;
        seaLfo.connect(seaDepth);
        seaDepth.connect(seaWave.gain);
        seaLfo.start();
        seaFlt.connect(seaWave);
        seaWave.connect(this.channelGains.sea);

        createLoop(brownBuf, 'lowpass', 135, 1.8).connect(this.channelGains.underwater);
        createLoop(whiteBuf, 'bandpass', 1650, 1.4).connect(this.channelGains.stream);
        createLoop(brownBuf, 'lowpass', 260).connect(this.channelGains.fire);
        createLoop(pinkBuf, 'highpass', 2400).connect(this.channelGains.vinyl);
        createLoop(pinkBuf, 'bandpass', 1900, 1.1).connect(this.channelGains.tape);
        createLoop(brownBuf, 'lowpass', 170).connect(this.channelGains.train);
        createLoop(brownBuf, 'lowpass', 145).connect(this.channelGains.airplane);

        const purrOsc = this.ctx.createOscillator();
        const purrSub = this.ctx.createOscillator();
        purrOsc.type = 'sawtooth';
        purrSub.type = 'sine';
        purrOsc.frequency.value = 26.5;
        purrSub.frequency.value = 53.0;
        const purrFlt = this.ctx.createBiquadFilter();
        purrFlt.type = 'lowpass';
        purrFlt.frequency.value = 115;
        const purrAmp = this.ctx.createGain();
        purrAmp.gain.value = 0.18;
        const purrBreath = this.ctx.createOscillator();
        const purrBreathDepth = this.ctx.createGain();
        purrBreath.frequency.value = 0.38;
        purrBreathDepth.gain.value = 0.11;
        purrBreath.connect(purrBreathDepth);
        purrBreathDepth.connect(purrAmp.gain);
        purrOsc.connect(purrFlt);
        purrSub.connect(purrFlt);
        purrFlt.connect(purrAmp);
        purrAmp.connect(this.channelGains.cat_purr);
        purrOsc.start();
        purrSub.start();
        purrBreath.start();

        const cos1 = this.ctx.createOscillator();
        const cos2 = this.ctx.createOscillator();
        cos1.type = 'sine';
        cos2.type = 'triangle';
        cos1.frequency.value = 55.0;
        cos2.frequency.value = 82.41;
        const cosFlt = this.ctx.createBiquadFilter();
        cosFlt.type = 'lowpass';
        cosFlt.frequency.value = 160;
        const cosGain = this.ctx.createGain();
        cosGain.gain.value = 0.16;
        cos1.connect(cosFlt);
        cos2.connect(cosFlt);
        cosFlt.connect(cosGain);
        cosGain.connect(this.channelGains.cosmos);
        cos1.start();
        cos2.start();

        createLoop(pinkBuf, 'bandpass', 500, 1.3).connect(this.channelGains.green_noise);
        createLoop(whiteBuf, 'highpass', 3800, 0.7).connect(this.channelGains.violet_noise);
        createLoop(brownBuf, 'lowpass', 110, 1.2).connect(this.channelGains.velvet_sub);
        createLoop(pinkBuf, 'bandpass', 950, 0.85).connect(this.channelGains.waterfall);
        createLoop(whiteBuf, 'bandpass', 720, 1.8).connect(this.channelGains.geyser);
        createLoop(pinkBuf, 'bandpass', 420, 1.5).connect(this.channelGains.night_cafe);
        createLoop(pinkBuf, 'bandpass', 310, 1.1).connect(this.channelGains.server_room);
        createLoop(brownBuf, 'bandpass', 195, 0.9).connect(this.channelGains.night_drive);

        const f528 = this.ctx.createOscillator();
        const f528Sub = this.ctx.createOscillator();
        f528.type = 'sine';
        f528Sub.type = 'sine';
        f528.frequency.value = 528.0;
        f528Sub.frequency.value = 264.0;
        const g528 = this.ctx.createGain();
        g528.gain.value = 0.08;
        f528.connect(g528);
        f528Sub.connect(g528);
        g528.connect(this.channelGains.fork_528);
        f528.start();
        f528Sub.start();

        const om1 = this.ctx.createOscillator();
        const om2 = this.ctx.createOscillator();
        om1.type = 'sawtooth';
        om2.type = 'triangle';
        om1.frequency.value = 136.1;
        om2.frequency.value = 68.05;
        const omFlt = this.ctx.createBiquadFilter();
        omFlt.type = 'lowpass';
        omFlt.frequency.value = 240;
        const omG = this.ctx.createGain();
        omG.gain.value = 0.16;
        om1.connect(omFlt);
        om2.connect(omFlt);
        omFlt.connect(omG);
        omG.connect(this.channelGains.om_drone);
        om1.start();
        om2.start();

        const aurFlt = createLoop(whiteBuf, 'bandpass', 1400, 4.0);
        const aurLfo = this.ctx.createOscillator();
        const aurDepth = this.ctx.createGain();
        aurLfo.frequency.value = 0.08;
        aurDepth.gain.value = 600;
        aurLfo.connect(aurDepth);
        aurDepth.connect(aurFlt.frequency);
        aurLfo.start();
        aurFlt.connect(this.channelGains.aurora_hum);

        const bee1 = this.ctx.createOscillator();
        const bee2 = this.ctx.createOscillator();
        bee1.type = 'sawtooth';
        bee2.type = 'sawtooth';
        bee1.frequency.value = 98.0;
        bee2.frequency.value = 99.4;
        const beeFlt = this.ctx.createBiquadFilter();
        beeFlt.type = 'bandpass';
        beeFlt.frequency.value = 220;
        const beeG = this.ctx.createGain();
        beeG.gain.value = 0.11;
        bee1.connect(beeFlt);
        bee2.connect(beeFlt);
        beeFlt.connect(beeG);
        beeG.connect(this.channelGains.beehive);
        bee1.start();
        bee2.start();

        createLoop(brownBuf, 'lowpass', 72, 1.4).connect(this.channelGains.black_noise);
        createLoop(whiteBuf, 'bandpass', 2600, 1.2).connect(this.channelGains.blue_mist);
        createLoop(pinkBuf, 'bandpass', 620, 1.3).connect(this.channelGains.rain_tent);
        createLoop(pinkBuf, 'bandpass', 1550, 1.6).connect(this.channelGains.autumn_leaves);
        createLoop(whiteBuf, 'bandpass', 1180, 1.1).connect(this.channelGains.fountain_plaza);
        createLoop(pinkBuf, 'bandpass', 1450, 2.2).connect(this.channelGains.gramophone_horn);
        createLoop(brownBuf, 'lowpass', 190, 0.9).connect(this.channelGains.fireplace_bellow);
        createLoop(brownBuf, 'lowpass', 95, 2.0).connect(this.channelGains.sub_engine);
        createLoop(brownBuf, 'bandpass', 125, 1.5).connect(this.channelGains.space_hull);
        createLoop(whiteBuf, 'highpass', 3200, 1.5).connect(this.channelGains.temple_incense);

        const binL = this.ctx.createOscillator();
        const binR = this.ctx.createOscillator();
        binL.type = 'sine';
        binR.type = 'sine';
        binL.frequency.value = 100.0;
        binR.frequency.value = 102.5;
        const binGain = this.ctx.createGain();
        binGain.gain.value = 0.12;
        binL.connect(binGain);
        binR.connect(binGain);
        binGain.connect(this.channelGains.binaural_delta);
        binL.start();
        binR.start();

        const sch1 = this.ctx.createOscillator();
        const sch2 = this.ctx.createOscillator();
        sch1.type = 'sine';
        sch2.type = 'sine';
        sch1.frequency.value = 78.3;
        sch2.frequency.value = 86.13;
        const schGain = this.ctx.createGain();
        schGain.gain.value = 0.14;
        sch1.connect(schGain);
        sch2.connect(schGain);
        schGain.connect(this.channelGains.schumann_783);
        sch1.start();
        sch2.start();

        const satFlt = createLoop(pinkBuf, 'bandpass', 480, 6.0);
        const satLfo = this.ctx.createOscillator();
        const satDepth = this.ctx.createGain();
        satLfo.frequency.value = 0.06;
        satDepth.gain.value = 210;
        satLfo.connect(satDepth);
        satDepth.connect(satFlt.frequency);
        satLfo.start();
        satFlt.connect(this.channelGains.saturn_rings);

        const mnk1 = this.ctx.createOscillator();
        const mnk2 = this.ctx.createOscillator();
        mnk1.type = 'sawtooth';
        mnk2.type = 'triangle';
        mnk1.frequency.value = 110.0;
        mnk2.frequency.value = 164.81;
        const mnkFlt = this.ctx.createBiquadFilter();
        mnkFlt.type = 'bandpass';
        mnkFlt.frequency.value = 340;
        mnkFlt.Q.value = 2.8;
        const mnkGain = this.ctx.createGain();
        mnkGain.gain.value = 0.14;
        mnk1.connect(mnkFlt);
        mnk2.connect(mnkFlt);
        mnkFlt.connect(mnkGain);
        mnkGain.connect(this.channelGains.monks_whisper);
        mnk1.start();
        mnk2.start();

        const q174 = this.ctx.createOscillator();
        q174.type = 'sine';
        q174.frequency.value = 174.0;
        const q174Gain = this.ctx.createGain();
        q174Gain.gain.value = 0.11;
        q174.connect(q174Gain);
        q174Gain.connect(this.channelGains.quartz_bowl_174);
        q174.start();

        const s852 = this.ctx.createOscillator();
        s852.type = 'sine';
        s852.frequency.value = 852.0;
        const s852Gain = this.ctx.createGain();
        s852Gain.gain.value = 0.05;
        s852.connect(s852Gain);
        s852Gain.connect(this.channelGains.solfeggio_852);
        s852.start();
    }

    setMasterPlayState(playing) {
        if (!this.isInitialized) return;
        this.forceIOSPlaybackSession();
        if (playing) {
            if (this.useDirectStream && this.bgAudioEl) {
                this.bgAudioEl.volume = 1.0;
                this.playNativeAudio();
            }
            if (!this.useDirectStream && this.ctx && this.masterGain) {
                if (this.ctx.state !== 'running') {
                    this.ctx.resume().catch(() => this.reportPlaybackError('Не удалось включить звук. Нажмите ещё раз.'));
                }
                this.masterGain.gain.setTargetAtTime(state.masterVol, this.ctx.currentTime, 0.04);
            }
        } else {
            this.playRequest++;
            if (this.useDirectStream && this.bgAudioEl) this.bgAudioEl.pause();
            if (!this.useDirectStream && this.ctx && this.masterGain) {
                this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.03);
                setTimeout(() => {
                    if (!state.isPlaying && this.ctx.state === 'running') {
                        this.ctx.suspend().catch(() => this.reportPlaybackError('Не удалось остановить аудиоконтекст.'));
                    }
                }, 120);
            }
        }
        this.updateMediaSessionMetadata();
    }

    setNoiseVolume(id, val) {
        state.noiseVolumes[id] = val;
        if (!this.useDirectStream && this.isInitialized && this.channelGains[id] && this.ctx) {
            this.channelGains[id].gain.setTargetAtTime(val, this.ctx.currentTime, 0.06);
        }
        this.scheduleDirectMixRebuild(false);
    }

    setMusicLayerVolume(id, val) {
        state.musicLayers[id] = val;
        if (!this.useDirectStream && this.isInitialized && this.musicGains[id] && this.ctx) {
            this.musicGains[id].gain.setTargetAtTime(val, this.ctx.currentTime, 0.06);
        }
        this.scheduleDirectMixRebuild(false);
    }

    setNoisesPaused(paused) {
        state.noisesPaused = paused;
        if (!this.useDirectStream && this.isInitialized && this.noisesBusGain && this.ctx) {
            this.noisesBusGain.gain.setTargetAtTime(paused ? 0 : 1, this.ctx.currentTime, 0.08);
        }
        this.scheduleDirectMixRebuild(true);
    }

    setMelodyPaused(paused) {
        state.melodyPaused = paused;
        if (!this.useDirectStream && this.isInitialized && this.musicBusGain && this.ctx) {
            this.musicBusGain.gain.setTargetAtTime(paused ? 0 : 1, this.ctx.currentTime, 0.08);
        }
        this.scheduleDirectMixRebuild(true);
    }

    triggerMicroEvents(dt) {
        if (!this.isInitialized || state.noisesPaused) return;
        const now = this.ctx.currentTime;

        const playDrop = (bus, freqStart, freqEnd, dur, vol) => {
            const osc = this.ctx.createOscillator();
            const g = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freqStart, now);
            osc.frequency.exponentialRampToValueAtTime(freqEnd, now + dur);
            g.gain.setValueAtTime(vol, now);
            g.gain.exponentialRampToValueAtTime(0.0001, now + dur + 0.02);
            osc.connect(g);
            g.connect(bus);
            osc.start(now);
            osc.stop(now + dur + 0.03);
        };

        if (state.noiseVolumes.rain > 0.05 && Math.random() < dt * 8) {
            playDrop(this.channelGains.rain, 1300 + Math.random() * 800, 450, 0.04, 0.025);
        }
        if (state.noiseVolumes.roof_rain > 0.05 && Math.random() < dt * 11) {
            playDrop(this.channelGains.roof_rain, 420 + Math.random() * 250, 140, 0.035, 0.04);
        }
        if (state.noiseVolumes.stream > 0.05 && Math.random() < dt * 10) {
            playDrop(this.channelGains.stream, 900 + Math.random() * 1100, 1500, 0.045, 0.02);
        }
        if (state.noiseVolumes.cave > 0.05 && Math.random() < dt * 1.6) {
            playDrop(this.channelGains.cave, 1800 + Math.random() * 600, 900, 0.35, 0.06);
        }
        if (state.noiseVolumes.crickets > 0.05 && Math.random() < dt * 4.5) {
            playDrop(this.channelGains.crickets, 4300, 4450, 0.09, 0.022);
        }
        if (state.noiseVolumes.wind_chimes > 0.05 && Math.random() < dt * 1.8) {
            const chimeFreqs = [1046.5, 1174.6, 1318.5, 1567.9, 1760.0];
            const cf = chimeFreqs[Math.floor(Math.random() * chimeFreqs.length)];
            playDrop(this.channelGains.wind_chimes, cf, cf * 0.998, 1.4, 0.045);
        }
        if ((state.noiseVolumes.fire > 0.05 || state.noiseVolumes.vinyl > 0.05) && Math.random() < dt * 14) {
            const target = state.noiseVolumes.fire >= state.noiseVolumes.vinyl ? this.channelGains.fire : this.channelGains.vinyl;
            playDrop(target, 2800 + Math.random() * 2000, 300, 0.015, 0.035);
        }
        if (state.noiseVolumes.thunder > 0.05 && Math.random() < dt * 0.22) {
            playDrop(this.channelGains.thunder, 88, 28, 3.2, 0.28);
        }
        if (state.noiseVolumes.train > 0.05 && Math.random() < dt * 1.9) {
            playDrop(this.channelGains.train, 135, 48, 0.075, 0.14);
        }
        if (state.noiseVolumes.bowls > 0.05 && Math.random() < dt * 0.35) {
            const bowlFreqs = [216, 288, 324, 432, 528];
            const bf = bowlFreqs[Math.floor(Math.random() * bowlFreqs.length)];
            playDrop(this.channelGains.bowls, bf, bf, 4.8, 0.075);
        }
        if (state.noiseVolumes.shishi_odoshi > 0.05 && Math.random() < dt * 0.45) {
            playDrop(this.channelGains.shishi_odoshi, 620, 180, 0.08, 0.12);
        }
        if (state.noiseVolumes.whales > 0.05 && Math.random() < dt * 0.30) {
            const wStart = 220 + Math.random() * 180;
            playDrop(this.channelGains.whales, wStart, wStart * 0.62, 2.8, 0.085);
        }
        if (state.noiseVolumes.cicadas > 0.05 && Math.random() < dt * 7.0) {
            playDrop(this.channelGains.cicadas, 5200, 4900, 0.06, 0.018);
        }
        if (state.noiseVolumes.night_owl > 0.05 && Math.random() < dt * 0.32) {
            playDrop(this.channelGains.night_owl, 390, 310, 0.55, 0.065);
        }
        if (state.noiseVolumes.frogs > 0.05 && Math.random() < dt * 1.4) {
            playDrop(this.channelGains.frogs, 240, 380, 0.12, 0.045);
        }
        if (state.noiseVolumes.snow_steps > 0.05 && Math.random() < dt * 1.5) {
            playDrop(this.channelGains.snow_steps, 1400, 290, 0.14, 0.055);
        }
        if (state.noiseVolumes.keyboard > 0.05 && Math.random() < dt * 6.5) {
            playDrop(this.channelGains.keyboard, 1900 + Math.random() * 700, 320, 0.022, 0.045);
        }
        if (state.noiseVolumes.book_pages > 0.05 && Math.random() < dt * 0.55) {
            playDrop(this.channelGains.book_pages, 2600, 680, 0.22, 0.035);
        }
        if (state.noiseVolumes.sonar > 0.05 && Math.random() < dt * 0.38) {
            playDrop(this.channelGains.sonar, 1320, 1315, 1.2, 0.055);
        }
        if (state.noiseVolumes.projector > 0.05 && Math.random() < dt * 12.0) {
            playDrop(this.channelGains.projector, 950, 210, 0.012, 0.022);
        }
        if (state.noiseVolumes.ship_creak > 0.05 && Math.random() < dt * 0.65) {
            playDrop(this.channelGains.ship_creak, 190, 115, 0.45, 0.06);
        }
        if (state.noiseVolumes.pulsar_rhythm > 0.05 && Math.random() < dt * 2.8) {
            playDrop(this.channelGains.pulsar_rhythm, 880, 220, 0.09, 0.045);
        }
        if (state.noiseVolumes.crystal_cave > 0.05 && Math.random() < dt * 1.2) {
            const qFreq = [1318.5, 1567.9, 1975.5, 2093.0][Math.floor(Math.random() * 4)];
            playDrop(this.channelGains.crystal_cave, qFreq, qFreq * 0.995, 1.6, 0.038);
        }
        if (state.noiseVolumes.bamboo_chimes > 0.05 && Math.random() < dt * 1.9) {
            const bFreq = [380, 440, 510, 590][Math.floor(Math.random() * 4)];
            playDrop(this.channelGains.bamboo_chimes, bFreq, bFreq * 0.75, 0.14, 0.065);
        }
        if (state.noiseVolumes.harbor_bells > 0.05 && Math.random() < dt * 0.28) {
            playDrop(this.channelGains.harbor_bells, 392.0, 389.0, 3.2, 0.075);
        }
        if (state.noiseVolumes.seagulls_far > 0.05 && Math.random() < dt * 0.42) {
            playDrop(this.channelGains.seagulls_far, 1650, 980, 0.48, 0.035);
        }
        if (state.noiseVolumes.camel_caravan > 0.05 && Math.random() < dt * 1.1) {
            playDrop(this.channelGains.camel_caravan, 780, 760, 0.35, 0.045);
        }
        if (state.noiseVolumes.morse_beacon > 0.05 && Math.random() < dt * 3.5) {
            playDrop(this.channelGains.morse_beacon, 680, 680, 0.08, 0.032);
        }
        if (state.noiseVolumes.espresso_steam > 0.05 && Math.random() < dt * 0.85) {
            playDrop(this.channelGains.espresso_steam, 2200, 1850, 0.18, 0.03);
        }

        const sec = Math.floor(now);
        if (sec !== this.lastClockSec) {
            this.lastClockSec = sec;
            if (state.noiseVolumes.clock_heart > 0.04) {
                playDrop(this.channelGains.clock_heart, 1250, 400, 0.025, 0.08);
                playDrop(this.channelGains.clock_heart, 74, 28, 0.24, 0.38);
            }
            if (state.noiseVolumes.pendulum > 0.04) {
                playDrop(this.channelGains.pendulum, sec % 2 === 0 ? 520 : 410, 180, 0.045, 0.11);
            }
        }
    }

    playSnowfallPad(freqs, duration = 4.6, startTime = null) {
        if (!this.isInitialized || state.melodyPaused) return;
        const now = startTime !== null ? startTime : this.ctx.currentTime;

        freqs.forEach(f => {
            const osc1 = this.ctx.createOscillator();
            const osc2 = this.ctx.createOscillator();
            osc1.type = 'sawtooth';
            osc2.type = 'triangle';
            osc1.frequency.setValueAtTime(f, now);
            osc2.frequency.setValueAtTime(f * 1.004, now);

            const flt = this.ctx.createBiquadFilter();
            flt.type = 'lowpass';
            flt.frequency.setValueAtTime(160, now);
            flt.frequency.linearRampToValueAtTime(state.warmthCutoff, now + duration * 0.48);
            flt.frequency.exponentialRampToValueAtTime(190, now + duration);

            const g = this.ctx.createGain();
            const peak = 0.065 / Math.sqrt(freqs.length);
            g.gain.setValueAtTime(0.0001, now);
            g.gain.linearRampToValueAtTime(peak, now + duration * 0.28);
            g.gain.exponentialRampToValueAtTime(0.0001, now + duration);

            osc1.connect(flt);
            osc2.connect(flt);
            flt.connect(g);
            g.connect(this.musicGains.pad);

            osc1.start(now);
            osc2.start(now);
            osc1.stop(now + duration + 0.08);
            osc2.stop(now + duration + 0.08);

            if (state.musicLayers.shimmer > 0.04) {
                const shOsc = this.ctx.createOscillator();
                const shGain = this.ctx.createGain();
                shOsc.type = 'sine';
                shOsc.frequency.setValueAtTime(f * 4, now);
                shGain.gain.setValueAtTime(0.0001, now);
                shGain.gain.linearRampToValueAtTime(peak * 0.22, now + duration * 0.5);
                shGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
                shOsc.connect(shGain);
                shGain.connect(this.musicGains.shimmer);
                shOsc.start(now);
                shOsc.stop(now + duration + 0.08);
            }
        });
    }

    playInstrumentNote(instrumentType, freq, startTime = null) {
        if (!this.isInitialized || state.melodyPaused) return;
        const now = startTime !== null ? startTime : this.ctx.currentTime;
        const out = this.musicGains.piano;

        switch (instrumentType) {
            case 'felt_piano': {
                const osc = this.ctx.createOscillator();
                const over = this.ctx.createOscillator();
                osc.type = 'sine';
                over.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now);
                over.frequency.setValueAtTime(freq * 2, now);

                const flt = this.ctx.createBiquadFilter();
                flt.type = 'lowpass';
                flt.frequency.setValueAtTime(Math.min(2000, state.warmthCutoff * 2.1), now);
                flt.frequency.exponentialRampToValueAtTime(240, now + 2.4);

                const g = this.ctx.createGain();
                g.gain.setValueAtTime(0.001, now);
                g.gain.linearRampToValueAtTime(0.18, now + 0.025);
                g.gain.exponentialRampToValueAtTime(0.0005, now + 2.6);

                const og = this.ctx.createGain();
                og.gain.setValueAtTime(0.025, now);
                og.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

                osc.connect(flt);
                over.connect(og);
                og.connect(flt);
                flt.connect(g);
                g.connect(out);
                osc.start(now);
                over.start(now);
                osc.stop(now + 2.65);
                over.stop(now + 0.5);
                break;
            }

            case 'dream_celesta': {
                const osc = this.ctx.createOscillator();
                const bell = this.ctx.createOscillator();
                osc.type = 'sine';
                bell.type = 'sine';
                osc.frequency.setValueAtTime(freq, now);
                bell.frequency.setValueAtTime(freq * 3, now);

                const g = this.ctx.createGain();
                g.gain.setValueAtTime(0.0001, now);
                g.gain.linearRampToValueAtTime(0.14, now + 0.08);
                g.gain.exponentialRampToValueAtTime(0.0004, now + 3.4);

                const bg = this.ctx.createGain();
                bg.gain.setValueAtTime(0.02, now);
                bg.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);

                osc.connect(g);
                bell.connect(bg);
                bg.connect(g);
                g.connect(out);
                osc.start(now);
                bell.start(now);
                osc.stop(now + 3.45);
                bell.stop(now + 1.15);
                break;
            }

            case 'music_box': {
                const osc = this.ctx.createOscillator();
                const chime = this.ctx.createOscillator();
                osc.type = 'sine';
                chime.type = 'triangle';
                osc.frequency.setValueAtTime(freq * 2, now);
                chime.frequency.setValueAtTime(freq * 6, now);

                const g = this.ctx.createGain();
                g.gain.setValueAtTime(0.001, now);
                g.gain.linearRampToValueAtTime(0.12, now + 0.008);
                g.gain.exponentialRampToValueAtTime(0.0004, now + 1.5);

                const cg = this.ctx.createGain();
                cg.gain.setValueAtTime(0.03, now);
                cg.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

                osc.connect(g);
                chime.connect(cg);
                cg.connect(g);
                g.connect(out);
                osc.start(now);
                chime.start(now);
                osc.stop(now + 1.55);
                chime.stop(now + 0.18);
                break;
            }

            case 'bowed_cello': {
                const osc1 = this.ctx.createOscillator();
                const osc2 = this.ctx.createOscillator();
                osc1.type = 'sawtooth';
                osc2.type = 'triangle';
                osc1.frequency.setValueAtTime(freq, now);
                osc2.frequency.setValueAtTime(freq * 0.998, now);

                const vib = this.ctx.createOscillator();
                const vibGain = this.ctx.createGain();
                vib.frequency.value = 5.2;
                vibGain.gain.value = 2.2;
                vib.connect(vibGain);
                vibGain.connect(osc1.frequency);

                const flt = this.ctx.createBiquadFilter();
                flt.type = 'lowpass';
                flt.frequency.setValueAtTime(Math.min(1100, state.warmthCutoff * 1.2), now);

                const g = this.ctx.createGain();
                g.gain.setValueAtTime(0.0001, now);
                g.gain.linearRampToValueAtTime(0.14, now + 0.85);
                g.gain.exponentialRampToValueAtTime(0.0005, now + 3.2);

                osc1.connect(flt);
                osc2.connect(flt);
                flt.connect(g);
                g.connect(out);
                osc1.start(now);
                osc2.start(now);
                vib.start(now);
                osc1.stop(now + 3.25);
                osc2.stop(now + 3.25);
                vib.stop(now + 3.25);
                break;
            }

            case 'warm_rhodes': {
                const car = this.ctx.createOscillator();
                const mod = this.ctx.createOscillator();
                const modGain = this.ctx.createGain();
                car.type = 'sine';
                mod.type = 'sine';
                car.frequency.setValueAtTime(freq, now);
                mod.frequency.setValueAtTime(freq * 2, now);
                modGain.gain.setValueAtTime(freq * 0.8, now);
                modGain.gain.exponentialRampToValueAtTime(1, now + 0.6);

                mod.connect(modGain);
                modGain.connect(car.frequency);

                const g = this.ctx.createGain();
                g.gain.setValueAtTime(0.001, now);
                g.gain.linearRampToValueAtTime(0.16, now + 0.02);
                g.gain.exponentialRampToValueAtTime(0.0005, now + 2.2);

                car.connect(g);
                g.connect(out);
                car.start(now);
                mod.start(now);
                car.stop(now + 2.25);
                mod.stop(now + 2.25);
                break;
            }

            case 'plucked_harp':
            case 'koto_pluck':
            case 'nylon_guitar': {
                const osc = this.ctx.createOscillator();
                osc.type = instrumentType === 'koto_pluck' ? 'sawtooth' : 'triangle';
                osc.frequency.setValueAtTime(freq, now);

                const flt = this.ctx.createBiquadFilter();
                flt.type = 'lowpass';
                flt.frequency.setValueAtTime(2400, now);
                flt.frequency.exponentialRampToValueAtTime(320, now + 1.1);

                const g = this.ctx.createGain();
                g.gain.setValueAtTime(0.001, now);
                g.gain.linearRampToValueAtTime(0.16, now + 0.012);
                g.gain.exponentialRampToValueAtTime(0.0005, now + 1.4);

                osc.connect(flt);
                flt.connect(g);
                g.connect(out);
                osc.start(now);
                osc.stop(now + 1.45);
                break;
            }

            case 'space_organ': {
                [0.5, 1, 2, 3].forEach((mult, idx) => {
                    const osc = this.ctx.createOscillator();
                    osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
                    osc.frequency.setValueAtTime(freq * mult, now);
                    const g = this.ctx.createGain();
                    const v = 0.05 / (idx + 1);
                    g.gain.setValueAtTime(0.0001, now);
                    g.gain.linearRampToValueAtTime(v, now + 0.55);
                    g.gain.exponentialRampToValueAtTime(0.0002, now + 2.8);
                    osc.connect(g);
                    g.connect(out);
                    osc.start(now);
                    osc.stop(now + 2.85);
                });
                break;
            }

            case 'tape_synth':
            case 'blade_synth': {
                const osc = this.ctx.createOscillator();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(freq, now);
                if (instrumentType === 'tape_synth') {
                    osc.frequency.linearRampToValueAtTime(freq * 0.992, now + 0.9);
                    osc.frequency.linearRampToValueAtTime(freq * 1.004, now + 1.8);
                }

                const flt = this.ctx.createBiquadFilter();
                flt.type = 'lowpass';
                flt.Q.value = 2.5;
                flt.frequency.setValueAtTime(280, now);
                flt.frequency.exponentialRampToValueAtTime(Math.min(2200, state.warmthCutoff * 2), now + 0.5);
                flt.frequency.exponentialRampToValueAtTime(300, now + 2.2);

                const g = this.ctx.createGain();
                g.gain.setValueAtTime(0.0001, now);
                g.gain.linearRampToValueAtTime(0.13, now + 0.25);
                g.gain.exponentialRampToValueAtTime(0.0004, now + 2.3);

                osc.connect(flt);
                flt.connect(g);
                g.connect(out);
                osc.start(now);
                osc.stop(now + 2.35);
                break;
            }

            case 'marimba': {
                const osc = this.ctx.createOscillator();
                const wood = this.ctx.createOscillator();
                osc.type = 'sine';
                wood.type = 'sine';
                osc.frequency.setValueAtTime(freq, now);
                wood.frequency.setValueAtTime(freq * 4, now);

                const g = this.ctx.createGain();
                g.gain.setValueAtTime(0.001, now);
                g.gain.linearRampToValueAtTime(0.18, now + 0.01);
                g.gain.exponentialRampToValueAtTime(0.0004, now + 0.75);

                const wg = this.ctx.createGain();
                wg.gain.setValueAtTime(0.04, now);
                wg.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

                osc.connect(g);
                wood.connect(wg);
                wg.connect(g);
                g.connect(out);
                osc.start(now);
                wood.start(now);
                osc.stop(now + 0.8);
                wood.stop(now + 0.1);
                break;
            }

            case 'handpan': {
                const fund = this.ctx.createOscillator();
                const oct = this.ctx.createOscillator();
                const fifth = this.ctx.createOscillator();
                fund.type = 'sine';
                oct.type = 'sine';
                fifth.type = 'triangle';
                fund.frequency.setValueAtTime(freq * 1.015, now);
                fund.frequency.exponentialRampToValueAtTime(freq, now + 0.035);
                oct.frequency.setValueAtTime(freq * 2, now);
                fifth.frequency.setValueAtTime(freq * 2.998, now);

                const g = this.ctx.createGain();
                g.gain.setValueAtTime(0.001, now);
                g.gain.linearRampToValueAtTime(0.18, now + 0.015);
                g.gain.exponentialRampToValueAtTime(0.0004, now + 2.4);

                const og = this.ctx.createGain();
                og.gain.setValueAtTime(0.05, now);
                og.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

                const fg = this.ctx.createGain();
                fg.gain.setValueAtTime(0.025, now);
                fg.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

                fund.connect(g);
                oct.connect(og);
                fifth.connect(fg);
                og.connect(g);
                fg.connect(g);
                g.connect(out);
                fund.start(now);
                oct.start(now);
                fifth.start(now);
                fund.stop(now + 2.45);
                oct.stop(now + 0.95);
                fifth.stop(now + 0.5);
                break;
            }

            case 'kalimba': {
                const osc = this.ctx.createOscillator();
                const tine = this.ctx.createOscillator();
                osc.type = 'sine';
                tine.type = 'sine';
                osc.frequency.setValueAtTime(freq, now);
                tine.frequency.setValueAtTime(freq * 6.2, now);

                const g = this.ctx.createGain();
                g.gain.setValueAtTime(0.001, now);
                g.gain.linearRampToValueAtTime(0.16, now + 0.008);
                g.gain.exponentialRampToValueAtTime(0.0004, now + 1.25);

                const tg = this.ctx.createGain();
                tg.gain.setValueAtTime(0.04, now);
                tg.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

                osc.connect(g);
                tine.connect(tg);
                tg.connect(g);
                g.connect(out);
                osc.start(now);
                tine.start(now);
                osc.stop(now + 1.3);
                tine.stop(now + 0.05);
                break;
            }

            case 'bamboo_flute':
            case 'ocarina': {
                const osc = this.ctx.createOscillator();
                osc.type = instrumentType === 'ocarina' ? 'sine' : 'triangle';
                osc.frequency.setValueAtTime(freq * 0.99, now);
                osc.frequency.linearRampToValueAtTime(freq, now + 0.12);

                const vib = this.ctx.createOscillator();
                const vg = this.ctx.createGain();
                vib.frequency.value = 4.6;
                vg.gain.value = 2.0;
                vib.connect(vg);
                vg.connect(osc.frequency);

                const flt = this.ctx.createBiquadFilter();
                flt.type = 'lowpass';
                flt.frequency.value = 1400;

                const g = this.ctx.createGain();
                g.gain.setValueAtTime(0.0001, now);
                g.gain.linearRampToValueAtTime(0.13, now + 0.28);
                g.gain.exponentialRampToValueAtTime(0.0004, now + 2.3);

                osc.connect(flt);
                flt.connect(g);
                g.connect(out);
                osc.start(now);
                vib.start(now);
                osc.stop(now + 2.35);
                vib.stop(now + 2.35);
                break;
            }

            case 'theremin':
            case 'glass_harp': {
                const osc = this.ctx.createOscillator();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq * 0.97, now);
                osc.frequency.exponentialRampToValueAtTime(freq, now + 0.35);

                const vib = this.ctx.createOscillator();
                const vg = this.ctx.createGain();
                vib.frequency.value = 6.0;
                vg.gain.value = 3.5;
                vib.connect(vg);
                vg.connect(osc.frequency);

                const g = this.ctx.createGain();
                g.gain.setValueAtTime(0.0001, now);
                g.gain.linearRampToValueAtTime(0.11, now + 0.55);
                g.gain.exponentialRampToValueAtTime(0.0004, now + 2.9);

                osc.connect(g);
                g.connect(out);
                osc.start(now);
                vib.start(now);
                osc.stop(now + 2.95);
                vib.stop(now + 2.95);
                break;
            }

            case 'warm_duduk':
            case 'accordion': {
                const osc1 = this.ctx.createOscillator();
                const osc2 = this.ctx.createOscillator();
                osc1.type = 'sawtooth';
                osc2.type = 'square';
                osc1.frequency.setValueAtTime(freq, now);
                osc2.frequency.setValueAtTime(freq * 1.003, now);

                const flt = this.ctx.createBiquadFilter();
                flt.type = 'bandpass';
                flt.frequency.value = instrumentType === 'warm_duduk' ? 620 : 980;
                flt.Q.value = 1.8;

                const g = this.ctx.createGain();
                g.gain.setValueAtTime(0.0001, now);
                g.gain.linearRampToValueAtTime(0.14, now + 0.45);
                g.gain.exponentialRampToValueAtTime(0.0004, now + 2.7);

                osc1.connect(flt);
                osc2.connect(flt);
                flt.connect(g);
                g.connect(out);
                osc1.start(now);
                osc2.start(now);
                osc1.stop(now + 2.75);
                osc2.stop(now + 2.75);
                break;
            }

            case 'vibraphone':
            case 'pulsar_bells': {
                const osc = this.ctx.createOscillator();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now);

                const trem = this.ctx.createOscillator();
                const tg = this.ctx.createGain();
                trem.frequency.value = 5.5;
                tg.gain.value = 0.04;

                const g = this.ctx.createGain();
                g.gain.setValueAtTime(0.001, now);
                g.gain.linearRampToValueAtTime(0.15, now + 0.02);
                g.gain.exponentialRampToValueAtTime(0.0004, now + 2.6);

                trem.connect(tg);
                tg.connect(g.gain);
                osc.connect(g);
                g.connect(out);
                osc.start(now);
                trem.start(now);
                osc.stop(now + 2.65);
                trem.stop(now + 2.65);
                break;
            }

            case 'retro_chip': {
                const osc = this.ctx.createOscillator();
                osc.type = 'square';
                osc.frequency.setValueAtTime(freq, now);
                const flt = this.ctx.createBiquadFilter();
                flt.type = 'lowpass';
                flt.frequency.value = 1450;
                const g = this.ctx.createGain();
                g.gain.setValueAtTime(0.001, now);
                g.gain.linearRampToValueAtTime(0.085, now + 0.01);
                g.gain.exponentialRampToValueAtTime(0.0004, now + 0.45);
                osc.connect(flt);
                flt.connect(g);
                g.connect(out);
                osc.start(now);
                osc.stop(now + 0.48);
                break;
            }

            case 'sitar_pluck': {
                const osc = this.ctx.createOscillator();
                const buzz = this.ctx.createOscillator();
                osc.type = 'sawtooth';
                buzz.type = 'sawtooth';
                osc.frequency.setValueAtTime(freq * 0.985, now);
                osc.frequency.linearRampToValueAtTime(freq, now + 0.08);
                buzz.frequency.setValueAtTime(freq * 2.01, now);

                const flt = this.ctx.createBiquadFilter();
                flt.type = 'bandpass';
                flt.frequency.setValueAtTime(1600, now);
                flt.frequency.exponentialRampToValueAtTime(480, now + 1.6);
                flt.Q.value = 2.4;

                const g = this.ctx.createGain();
                g.gain.setValueAtTime(0.001, now);
                g.gain.linearRampToValueAtTime(0.15, now + 0.02);
                g.gain.exponentialRampToValueAtTime(0.0004, now + 1.8);

                osc.connect(flt);
                buzz.connect(flt);
                flt.connect(g);
                g.connect(out);
                osc.start(now);
                buzz.start(now);
                osc.stop(now + 1.85);
                buzz.stop(now + 1.85);
                break;
            }

            case 'mellotron': {
                const osc1 = this.ctx.createOscillator();
                const osc2 = this.ctx.createOscillator();
                osc1.type = 'sawtooth';
                osc2.type = 'triangle';
                osc1.frequency.setValueAtTime(freq, now);
                osc2.frequency.setValueAtTime(freq * 1.007, now);

                const flt = this.ctx.createBiquadFilter();
                flt.type = 'lowpass';
                flt.frequency.value = 920;

                const g = this.ctx.createGain();
                g.gain.setValueAtTime(0.0001, now);
                g.gain.linearRampToValueAtTime(0.13, now + 0.5);
                g.gain.exponentialRampToValueAtTime(0.0004, now + 2.8);

                osc1.connect(flt);
                osc2.connect(flt);
                flt.connect(g);
                g.connect(out);
                osc1.start(now);
                osc2.start(now);
                osc1.stop(now + 2.85);
                osc2.stop(now + 2.85);
                break;
            }

            case 'pure_harmonic':
            default: {
                const osc = this.ctx.createOscillator();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now);
                const g = this.ctx.createGain();
                g.gain.setValueAtTime(0.0001, now);
                g.gain.linearRampToValueAtTime(0.09, now + 1.2);
                g.gain.exponentialRampToValueAtTime(0.0003, now + 3.8);
                osc.connect(g);
                g.connect(out);
                osc.start(now);
                osc.stop(now + 3.9);
                break;
            }
        }
    }

    stepSchedulerFromAudioThread() {
        if (!this.isInitialized || !state.isPlaying || !this.ctx) return;
        const now = this.ctx.currentTime;

        if (this.lastProcessedAudioTime === null) {
            this.lastProcessedAudioTime = now;
        }
        const elapsed = now - this.lastProcessedAudioTime;
        if (elapsed > 0) {
            this.lastProcessedAudioTime = now;
            // A stalled page must not replay seconds of micro-events at once.
            this.triggerMicroEvents(elapsed > 0.5 ? 0.12 : elapsed);
        }

        const melody = MELODIES[state.selectedMelodyIdx] || MELODIES[0];
        const lookaheadSec = 1.4;

        const earliest = now + 0.025;
        if (this.nextChordAudioTime < earliest) {
            const skipped = Math.ceil((earliest - this.nextChordAudioTime) / melody.chordDuration);
            this.nextChordAudioTime += skipped * melody.chordDuration;
            this.chordStepCounter += skipped;
        }
        if (this.nextNoteAudioTime < earliest) {
            const skipped = Math.ceil((earliest - this.nextNoteAudioTime) / melody.noteInterval);
            this.nextNoteAudioTime += skipped * melody.noteInterval;
            this.noteStepCounter += skipped;
        }

        let safetyChords = 0;
        while (this.nextChordAudioTime < now + lookaheadSec && safetyChords < 6) {
            const chord = melody.chords[this.chordStepCounter % melody.chords.length];
            this.playSnowfallPad(chord, melody.chordDuration + 0.35, this.nextChordAudioTime);
            this.nextChordAudioTime += melody.chordDuration;
            this.chordStepCounter++;
            safetyChords++;
        }

        let safetyNotes = 0;
        while (this.nextNoteAudioTime < now + lookaheadSec && safetyNotes < 16) {
            if (state.musicLayers.piano > 0.02) {
                const note = melody.scale[this.noteStepCounter % melody.scale.length];
                this.playInstrumentNote(melody.instrument, note, this.nextNoteAudioTime);
            }
            this.nextNoteAudioTime += melody.noteInterval;
            this.noteStepCounter++;
            safetyNotes++;
        }
    }
}

const audioEngine = new SanctuaryAudioEngine();

const readyMixesGrid = document.getElementById('readyMixesGrid');
function renderReadyMixes() {
    if (!readyMixesGrid) return;
    readyMixesGrid.innerHTML = '';
    READY_MIXES.forEach(mix => {
        const isActive = state.activeMixId === mix.id;
        const isNew = Boolean(mix.isNew);
        const isAmethyst = Boolean(mix.isAmethyst);
        const btn = document.createElement('button');
        btn.className = `kintsugi-card text-left p-3.5 rounded-2xl flex flex-col justify-between gap-2 transition ${
            mix.isFavorite ? 'fire-favorite' : (isAmethyst ? 'amethyst-edition' : (isNew ? 'emerald-edition' : ''))
        } ${isActive ? 'active-channel' : 'hover:bg-white/5'}`;

        let badgeHtml = '';
        if (mix.badge) {
            const badgeClass = isAmethyst
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/45'
                : (isNew
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/45'
                    : 'bg-orange-500/25 text-orange-300 border border-orange-500/50');
            badgeHtml = `<span class="text-[9px] font-mono-tech font-bold px-2 py-0.5 rounded-full ${badgeClass}">${mix.badge}</span>`;
        } else {
            badgeHtml = `<span class="w-2 h-2 rounded-full ${isActive ? 'bg-amber-400 shadow-[0_0_8px_#F59E0B]' : 'bg-zinc-700'}"></span>`;
        }

        const titleColor = isActive
            ? (isAmethyst ? 'text-purple-300' : (isNew ? 'text-emerald-300' : 'text-amber-300'))
            : (mix.isFavorite ? 'text-amber-200' : (isAmethyst ? 'text-purple-100' : (isNew ? 'text-emerald-100' : 'text-white')));

        btn.innerHTML = `
            <div class="flex items-center justify-between gap-1 w-full">
                <span class="text-xs font-bold ${titleColor} leading-tight">${mix.title}</span>
                ${badgeHtml}
            </div>
            <p class="text-[10px] text-zinc-400 leading-relaxed">${mix.desc}</p>
        `;

        btn.addEventListener('click', () => {
            applyReadyMix(mix);
        });
        readyMixesGrid.appendChild(btn);
    });
}

function applyReadyMix(mix) {
    // 1. В первой же строчке тапа разблокируем системный плеер iOS!
    audioEngine.unlockAndPlayIOSCarrierSync();

    state.activeMixId = mix.id;
    state.selectedMelodyIdx = mix.melodyIdx;
    state.warmthCutoff = mix.warmth;

    document.getElementById('slWarmth').value = mix.warmth;
    document.getElementById('lblWarmth').textContent = `${mix.warmth} Гц`;

    ['pad', 'piano', 'shimmer'].forEach(k => {
        const v = mix.music[k];
        state.musicLayers[k] = v;
        if (!audioEngine.useDirectStream && audioEngine.isInitialized && audioEngine.musicGains[k] && audioEngine.ctx) {
            audioEngine.musicGains[k].gain.setTargetAtTime(v, audioEngine.ctx.currentTime, 0.06);
        }
    });
    document.getElementById('slMusicPad').value = mix.music.pad;
    document.getElementById('lblMusicPad').textContent = `${Math.round(mix.music.pad * 100)}%`;
    document.getElementById('slMusicPiano').value = mix.music.piano;
    document.getElementById('lblMusicPiano').textContent = `${Math.round(mix.music.piano * 100)}%`;
    document.getElementById('slMusicShimmer').value = mix.music.shimmer;
    document.getElementById('lblMusicShimmer').textContent = `${Math.round(mix.music.shimmer * 100)}%`;

    NOISE_CHANNELS.forEach(ch => {
        const v = mix.noises[ch.id] || 0;
        state.noiseVolumes[ch.id] = v;
        if (!audioEngine.useDirectStream && audioEngine.isInitialized && audioEngine.channelGains[ch.id] && audioEngine.ctx) {
            audioEngine.channelGains[ch.id].gain.setTargetAtTime(v, audioEngine.ctx.currentTime, 0.06);
        }
        const sl = document.getElementById(`slider_${ch.id}`);
        const lb = document.getElementById(`label_${ch.id}`);
        const cd = document.getElementById(`card_${ch.id}`);
        if (sl) sl.value = v;
        if (lb) lb.textContent = `${Math.round(v * 100)}%`;
        if (cd) {
            if (v > 0.02) cd.classList.add('active-channel');
            else cd.classList.remove('active-channel');
        }
    });

    state.noisesPaused = false;
    state.melodyPaused = false;

    setNoisesPauseState(false);
    setMelodyPauseState(false);
    renderReadyMixes();
    renderMelodyCards();

    if (!state.isPlaying) {
        toggleMasterPlay();
    } else if (audioEngine.isInitialized) {
        audioEngine.resetMelodySchedule();
        audioEngine.stepSchedulerFromAudioThread();
        audioEngine.updateMediaSessionMetadata();
    }

    // 2. Пересобираем WAV-поток микса асинхронно после старта плеера
    audioEngine.scheduleDirectMixRebuild(true);
}

const noiseGrid = document.getElementById('noiseGrid');
function renderNoiseChannels() {
    if (!noiseGrid) return;
    noiseGrid.innerHTML = '';
    NOISE_CHANNELS.forEach(item => {
        const val = state.noiseVolumes[item.id] || 0;
        const isNew = Boolean(item.isNew);
        const isAmethyst = Boolean(item.isAmethyst);
        const card = document.createElement('div');
        card.id = `card_${item.id}`;
        card.className = `kintsugi-card rounded-2xl p-3.5 flex flex-col justify-between gap-2.5 ${
            isAmethyst ? 'amethyst-edition' : (isNew ? 'emerald-edition' : '')
        } ${val > 0.02 ? 'active-channel' : ''}`;

        const iconBoxClass = isAmethyst
            ? 'bg-purple-500/15 border border-purple-500/35 text-purple-400'
            : (isNew
                ? 'bg-emerald-500/15 border border-emerald-500/35 text-emerald-400'
                : 'bg-amber-500/10 border border-amber-500/25 text-amber-400');
        const labelColor = isAmethyst ? 'text-purple-400' : (isNew ? 'text-emerald-400' : 'text-amber-400');
        const sliderClass = isAmethyst ? 'slider-amethyst' : (isNew ? 'slider-emerald' : '');
        const newTag = isAmethyst
            ? `<span class="text-[8px] font-mono-tech font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">🔮</span>`
            : (isNew ? `<span class="text-[8px] font-mono-tech font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">🌿</span>` : '');

        card.innerHTML = `
            <div class="flex items-start justify-between gap-2">
                <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-xl ${iconBoxClass} flex items-center justify-center shrink-0">
                        <i data-lucide="${item.icon}" class="w-4 h-4"></i>
                    </div>
                    <div>
                        <div class="flex items-center gap-1.5">
                            <h3 class="text-xs font-bold text-white leading-tight">${item.title}</h3>
                            ${newTag}
                        </div>
                        <p class="text-[10px] text-zinc-400 mt-0.5">${item.sub}</p>
                    </div>
                </div>
                <span id="label_${item.id}" class="text-[11px] font-mono-tech font-bold ${labelColor}">${Math.round(val * 100)}%</span>
            </div>
            <input id="slider_${item.id}" type="range" min="0" max="1" step="0.01" value="${val}" class="w-full ${sliderClass}">
        `;

        const slider = card.querySelector(`#slider_${item.id}`);
        const label = card.querySelector(`#label_${item.id}`);
        slider.addEventListener('input', (e) => {
            const v = parseFloat(e.target.value);
            audioEngine.setNoiseVolume(item.id, v);
            label.textContent = `${Math.round(v * 100)}%`;
            if (v > 0.02) card.classList.add('active-channel');
            else card.classList.remove('active-channel');
        });
        noiseGrid.appendChild(card);
    });
    safeCreateIcons();
}

const melodyGrid = document.getElementById('melodySelectorGrid');
function renderMelodyCards() {
    if (!melodyGrid) return;
    melodyGrid.innerHTML = '';
    MELODIES.forEach((m, idx) => {
        const active = idx === state.selectedMelodyIdx;
        const isNew = Boolean(m.isNew);
        const isAmethyst = Boolean(m.isAmethyst);
        const btn = document.createElement('button');
        btn.className = `kintsugi-card text-left p-3.5 rounded-xl flex flex-col justify-between gap-2 transition ${
            m.isFavorite ? 'fire-favorite' : (isAmethyst ? 'amethyst-edition' : (isNew ? 'emerald-edition' : ''))
        } ${active ? 'active-channel' : 'hover:bg-white/5'}`;

        let topBadge = '';
        if (m.badge) {
            const bClass = isAmethyst
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/45'
                : (isNew
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/45'
                    : 'bg-orange-500/25 text-orange-300 border border-orange-500/50');
            topBadge = `<span class="text-[9px] font-mono-tech font-bold px-2 py-0.5 rounded-full ${bClass} shrink-0">${m.badge}</span>`;
        } else {
            const dotClass = active
                ? (isAmethyst ? 'bg-purple-400 shadow-[0_0_10px_#A855F7]' : (isNew ? 'bg-emerald-400 shadow-[0_0_10px_#10B981]' : 'bg-amber-400 shadow-[0_0_10px_#F59E0B]'))
                : 'bg-zinc-700';
            topBadge = `<span class="w-2.5 h-2.5 rounded-full shrink-0 ${dotClass}"></span>`;
        }

        const titleColor = active
            ? (isAmethyst ? 'text-purple-300' : (isNew ? 'text-emerald-300' : 'text-amber-300'))
            : (m.isFavorite ? 'text-amber-200' : (isAmethyst ? 'text-purple-100' : (isNew ? 'text-emerald-100' : 'text-white')));

        btn.innerHTML = `
            <div class="flex items-center justify-between gap-2 w-full">
                <span class="text-xs font-bold ${titleColor} leading-snug">${m.title}</span>
                ${topBadge}
            </div>
            <div class="text-[10px] font-mono-tech text-zinc-400 leading-relaxed">${m.subtitle}</div>
        `;
        btn.addEventListener('click', () => {
            // 1. СНАЧАЛА синхронно разблокируем <audio> в первой микросекунде тапа для iOS!
            audioEngine.unlockAndPlayIOSCarrierSync();

            state.selectedMelodyIdx = idx;
            if (state.melodyPaused) {
                state.melodyPaused = false;
                const pBtn = document.getElementById('btnToggleMelodyPause');
                if (pBtn) {
                    pBtn.innerHTML = `<i data-lucide="pause-circle" class="w-4 h-4"></i><span>ПАУЗА МЕЛОДИИ</span>`;
                }
            }
            renderMelodyCards();
            if (!state.isPlaying) {
                toggleMasterPlay();
            } else if (audioEngine.isInitialized) {
                audioEngine.resetMelodySchedule();
                audioEngine.stepSchedulerFromAudioThread();
                audioEngine.updateMediaSessionMetadata();
            }
            // 2. И только через 20 мс пересобираем WAV-буфер новой мелодии
            audioEngine.scheduleDirectMixRebuild(true);
            safeCreateIcons();
        });
        melodyGrid.appendChild(btn);
    });
}

function updateMasterToggle() {
    const btn = document.getElementById('btnMasterToggle');
    btn.innerHTML = `
        <i data-lucide="${state.isPlaying ? 'pause' : 'play'}" class="w-4 h-4 fill-current"></i>
        <span>${state.isPlaying ? 'ПАУЗА' : 'ВКЛЮЧИТЬ ЗВУК'}</span>
    `;
    safeCreateIcons();
}

function toggleMasterPlay() {
    const nextState = !state.isPlaying;
    const status = document.getElementById('audioStatus');
    if (status) status.hidden = true;
    if (nextState) {
        audioEngine.unlockAndPlayIOSCarrierSync();
        try { audioEngine.init(); }
        catch { audioEngine.reportPlaybackError('Не удалось включить звук. Нажмите ещё раз.'); return; }
        if (!audioEngine.isInitialized) { updateMasterToggle(); return; }
    }
    state.isPlaying = nextState;
    audioEngine.setMasterPlayState(nextState);
    if (nextState) { audioEngine.resetMelodySchedule(); audioEngine.stepSchedulerFromAudioThread(); }
    updateMasterToggle();
}

document.getElementById('btnMasterToggle').addEventListener('click', toggleMasterPlay);

function setNoisesPauseState(paused) {
    audioEngine.setNoisesPaused(paused);
    const btn = document.getElementById('btnToggleNoisesPause');
    btn.innerHTML = `
        <i data-lucide="${paused ? 'play-circle' : 'pause-circle'}" class="w-3.5 h-3.5 text-amber-400"></i>
        <span>${paused ? 'ВКЛЮЧИТЬ ШУМЫ' : 'ПАУЗА ШУМОВ'}</span>
    `;
    safeCreateIcons();
}

document.getElementById('btnToggleNoisesPause').addEventListener('click', () => {
    setNoisesPauseState(!state.noisesPaused);
});

function setMelodyPauseState(paused) {
    audioEngine.setMelodyPaused(paused);
    const btn = document.getElementById('btnToggleMelodyPause');
    btn.innerHTML = `
        <i data-lucide="${paused ? 'play-circle' : 'pause-circle'}" class="w-4 h-4"></i>
        <span>${paused ? 'ВКЛЮЧИТЬ МЕЛОДИЮ' : 'ПАУЗА МЕЛОДИИ'}</span>
    `;
    safeCreateIcons();
}

document.getElementById('btnToggleMelodyPause').addEventListener('click', () => {
    setMelodyPauseState(!state.melodyPaused);
});

document.getElementById('btnResetNoises').addEventListener('click', () => {
    state.activeMixId = '';
    renderReadyMixes();
    NOISE_CHANNELS.forEach(item => {
        state.noiseVolumes[item.id] = 0;
        if (!audioEngine.useDirectStream && audioEngine.isInitialized && audioEngine.channelGains[item.id] && audioEngine.ctx) {
            audioEngine.channelGains[item.id].gain.setTargetAtTime(0, audioEngine.ctx.currentTime, 0.06);
        }
        const sl = document.getElementById(`slider_${item.id}`);
        const lb = document.getElementById(`label_${item.id}`);
        const cd = document.getElementById(`card_${item.id}`);
        if (sl) sl.value = 0;
        if (lb) lb.textContent = '0%';
        if (cd) cd.classList.remove('active-channel');
    });
    audioEngine.scheduleDirectMixRebuild(true);
});

document.getElementById('sliderMasterVol').addEventListener('input', (e) => {
    state.masterVol = parseFloat(e.target.value);
    if (!audioEngine.useDirectStream && audioEngine.isInitialized && state.isPlaying && audioEngine.ctx) {
        audioEngine.masterGain.gain.setTargetAtTime(state.masterVol, audioEngine.ctx.currentTime, 0.05);
    }
    audioEngine.scheduleDirectMixRebuild(false);
});

['Pad', 'Piano', 'Shimmer'].forEach(layer => {
    const key = layer.toLowerCase();
    const sl = document.getElementById(`slMusic${layer}`);
    const lb = document.getElementById(`lblMusic${layer}`);
    sl.addEventListener('input', (e) => {
        const v = parseFloat(e.target.value);
        audioEngine.setMusicLayerVolume(key, v);
        lb.textContent = `${Math.round(v * 100)}%`;
    });
});

document.getElementById('slWarmth').addEventListener('input', (e) => {
    state.warmthCutoff = parseInt(e.target.value, 10);
    document.getElementById('lblWarmth').textContent = `${state.warmthCutoff} Гц`;
    audioEngine.scheduleDirectMixRebuild(false);
});

const bgCanvas = document.getElementById('sanctuaryCanvas');
const bgCtx = bgCanvas.getContext('2d');

const PARTICLES = Array.from({ length: 75 }, (_, i) => ({
    x: Math.random(),
    y: Math.random(),
    r: 1.0 + Math.random() * 2.2,
    vy: 0.008 + Math.random() * 0.02,
    drift: (Math.random() - 0.5) * 0.015,
    phase: Math.random() * Math.PI * 2,
    isGold: i % 3 === 0
}));

const KINTSUGI_SEAMS = [
    [[0.08, 0.18], [0.19, 0.29], [0.27, 0.24], [0.38, 0.36]],
    [[0.88, 0.14], [0.76, 0.27], [0.81, 0.42], [0.69, 0.55]],
    [[0.14, 0.76], [0.26, 0.68], [0.34, 0.82], [0.46, 0.74]]
];

function resizeCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);

function drawBackground(timeSec) {
    const w = bgCanvas.width;
    const h = bgCanvas.height;

    bgCtx.fillStyle = '#050507';
    bgCtx.fillRect(0, 0, w, h);

    const grad = bgCtx.createRadialGradient(w * 0.5, h * 0.35, 20, w * 0.5, h * 0.4, Math.max(w, h) * 0.65);
    grad.addColorStop(0, 'rgba(245, 158, 11, 0.06)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    bgCtx.fillStyle = grad;
    bgCtx.fillRect(0, 0, w, h);

    bgCtx.save();
    bgCtx.strokeStyle = 'rgba(251, 191, 36, 0.16)';
    bgCtx.lineWidth = 1.4;
    KINTSUGI_SEAMS.forEach(seam => {
        bgCtx.beginPath();
        seam.forEach(([nx, ny], idx) => {
            if (idx === 0) bgCtx.moveTo(nx * w, ny * h);
            else bgCtx.lineTo(nx * w, ny * h);
        });
        bgCtx.stroke();
    });
    bgCtx.restore();

    PARTICLES.forEach(p => {
        const py = ((p.y - timeSec * p.vy) % 1 + 1) % 1;
        const px = ((p.x + Math.sin(timeSec * 0.6 + p.phase) * p.drift) % 1 + 1) % 1;
        bgCtx.fillStyle = p.isGold
            ? `rgba(251, 191, 36, ${0.22 + 0.18 * Math.sin(timeSec * 2 + p.phase)})`
            : 'rgba(148, 163, 184, 0.14)';
        bgCtx.beginPath();
        bgCtx.arc(px * w, py * h, p.r, 0, Math.PI * 2);
        bgCtx.fill();
    });
}

function animate(now) {
    if (!document.hidden) {
        drawBackground(now / 1000);
    }
    requestAnimationFrame(animate);
}

function startBackgroundAudioScheduler() {
    const tickAudio = () => {
        if (state.isPlaying && audioEngine.isInitialized) audioEngine.stepSchedulerFromAudioThread();
    };
    let fallbackTimer = null;
    const fallback = () => { if (fallbackTimer === null) fallbackTimer = setInterval(tickAudio, 400); };
    try {
        const worker = new Worker('./audio-clock.js');
        worker.onmessage = tickAudio;
        worker.onerror = event => { event.preventDefault(); worker.terminate(); fallback(); };
    } catch { fallback(); }
    // Visibility is never an audio-source/volume/playback-mode transition.
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) { tickAudio(); audioEngine.updateMediaSessionMetadata(); }
    });
}

window.onload = () => {
    resizeCanvas();
    renderReadyMixes();
    renderNoiseChannels();
    renderMelodyCards();
    safeCreateIcons();
    startBackgroundAudioScheduler();
    requestAnimationFrame(animate);
};
