import React, { useState } from 'react';
import {
  Volume2,
  UserCheck,
  Sparkles,
  Copy,
  Check,
  MessageSquare,
  Globe2,
  MapPin,
  Building2,
  Briefcase,
  BookOpen,
  Coffee,
  Palette,
  Utensils,
  Shirt,
  Award,
} from 'lucide-react';
import { playRussianAudio } from '../utils/audio';
import { A1CertificateModal } from './A1CertificateModal';

export const SelfIntroductionTab: React.FC = () => {
  const [name, setName] = useState('Фелипе');
  const [surname, setSurname] = useState('Роза');
  const [patronymic, setPatronymic] = useState('');
  const [hasNoPatronymic, setHasNoPatronymic] = useState(true);
  const [gender, setGender] = useState<'m' | 'f'>('m');

  // Aula 5: Nacionalidade
  const [nationality, setNationality] = useState<
    'brazilian' | 'russian' | 'portuguese' | 'american' | 'spanish' | 'german' | 'french' | 'italian' | 'none'
  >('brazilian');

  // Aula 5: Cidade Natal
  const [hometown, setHometown] = useState('Сан-Паулу');
  const [includeHometown, setIncludeHometown] = useState(true);
  const [includeCityDesc, setIncludeCityDesc] = useState(true);

  // Aula 5: Onde mora agora e onde morava antes (verbo жить)
  const [includeLiving, setIncludeLiving] = useState(true);
  const [currentCity, setCurrentCity] = useState('в Бразилии');
  const [includePastLiving, setIncludePastLiving] = useState(true);
  const [previousCity, setPreviousCity] = useState('в Рио-де-Жанейро');

  // Aula 4: Profissão e Local
  const [role, setRole] = useState<
    | 'student'
    | 'teacher'
    | 'doctor'
    | 'engineer'
    | 'lawyer'
    | 'translator'
    | 'economist'
    | 'programmer'
    | 'none'
  >('programmer');
  const [workplace, setWorkplace] = useState<
    'none' | 'firm' | 'university' | 'hospital' | 'bank' | 'school' | 'factory'
  >('firm');

  // Aula 6: Idiomas
  const [includeLanguages, setIncludeLanguages] = useState(true);
  const [nativeLang, setNativeLang] = useState<'portuguese' | 'russian' | 'spanish' | 'english'>('portuguese');

  // Aula 7: Atividades de lazer e rotina
  const [includeFreeTime, setIncludeFreeTime] = useState(true);
  const [freeTimeActivity, setFreeTimeActivity] = useState<'relax' | 'walk' | 'music' | 'study'>('relax');

  // Aula 8: Cores e Adjetivos
  const [includeFavoriteColor, setIncludeFavoriteColor] = useState(true);
  const [favoriteColor, setFavoriteColor] = useState<'blue' | 'black' | 'red' | 'green' | 'white'>('blue');

  // Aula 9: Comidas e Bebidas (Caso Acusativo)
  const [includeFoodDrink, setIncludeFoodDrink] = useState(true);
  const [foodDrinkChoice, setFoodDrinkChoice] = useState<'borscht_tea' | 'fish_coffee' | 'meat_juice' | 'veggie_water'>('borscht_tea');

  // Aula 10: Roupas, Estações e Verbo носить
  const [includeClothesStyle, setIncludeClothesStyle] = useState(true);
  const [clothesChoice, setClothesChoice] = useState<'casual' | 'formal' | 'seasonal'>('seasonal');

  // Status
  const [statusResponse, setStatusResponse] = useState<'otlichno' | 'normalno' | 'khorosho'>('otlichno');
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);

  // Helper phrases
  const getNationalityPhrase = () => {
    if (nationality === 'none') return { ru: '', pt: '' };
    switch (nationality) {
      case 'brazilian':
        return gender === 'm'
          ? { ru: 'Я бразилец.', pt: 'Eu sou brasileiro.' }
          : { ru: 'Я бразильянка.', pt: 'Eu sou brasileira.' };
      case 'russian':
        return gender === 'm'
          ? { ru: 'Я русский.', pt: 'Eu sou russo.' }
          : { ru: 'Я русская.', pt: 'Eu sou russa.' };
      case 'portuguese':
        return gender === 'm'
          ? { ru: 'Я португалец.', pt: 'Eu sou português.' }
          : { ru: 'Я португалка.', pt: 'Eu sou portuguesa.' };
      case 'american':
        return gender === 'm'
          ? { ru: 'Я американец.', pt: 'Eu sou americano.' }
          : { ru: 'Я американка.', pt: 'Eu sou americana.' };
      case 'spanish':
        return gender === 'm'
          ? { ru: 'Я испанец.', pt: 'Eu sou espanhol.' }
          : { ru: 'Я испанка.', pt: 'Eu sou espanhola.' };
      case 'german':
        return gender === 'm'
          ? { ru: 'Я немец.', pt: 'Eu sou alemão.' }
          : { ru: 'Я немка.', pt: 'Eu sou alemã.' };
      case 'french':
        return gender === 'm'
          ? { ru: 'Я француз.', pt: 'Eu sou francês.' }
          : { ru: 'Я француженка.', pt: 'Eu sou francesa.' };
      case 'italian':
        return gender === 'm'
          ? { ru: 'Я итальянец.', pt: 'Eu sou italiano.' }
          : { ru: 'Я итальянка.', pt: 'Eu sou italiana.' };
    }
  };

  const getRolePhrase = () => {
    if (role === 'none') return { ru: '', pt: '' };
    switch (role) {
      case 'student':
        return gender === 'm'
          ? { ru: 'Я студент.', pt: 'Eu sou estudante.' }
          : { ru: 'Я студентка.', pt: 'Eu sou estudante.' };
      case 'teacher':
        return { ru: 'Я учитель.', pt: 'Eu sou professor(a).' };
      case 'doctor':
        return { ru: 'Я врач.', pt: 'Eu sou médico(a).' };
      case 'engineer':
        return { ru: 'Я инженер.', pt: 'Eu sou engenheiro(a).' };
      case 'lawyer':
        return { ru: 'Я юрист.', pt: 'Eu sou advogado(a).' };
      case 'translator':
        return { ru: 'Я переводчик.', pt: 'Eu sou tradutor(a).' };
      case 'economist':
        return { ru: 'Я экономист.', pt: 'Eu sou economista.' };
      case 'programmer':
        return { ru: 'Я программист.', pt: 'Eu sou programador(a).' };
    }
  };

  const getWorkplacePhrase = () => {
    switch (workplace) {
      case 'university':
        return { ru: 'Я учусь в университете.', pt: 'Estudo na universidade.' };
      case 'firm':
        return { ru: 'Я работаю в международной фирме.', pt: 'Trabalho em uma empresa internacional.' };
      case 'hospital':
        return { ru: 'Я работаю в больнице.', pt: 'Trabalho no hospital.' };
      case 'bank':
        return { ru: 'Я работаю в банке.', pt: 'Trabalho no banco.' };
      case 'school':
        return { ru: 'Я работаю в школе.', pt: 'Trabalho na escola.' };
      case 'factory':
        return { ru: 'Я работаю на заводе.', pt: 'Trabalho na fábrica.' };
      case 'none':
        return { ru: '', pt: '' };
    }
  };

  const getLivingPhrase = () => {
    if (!includeLiving || !currentCity.trim()) return { ru: '', pt: '' };
    const cityNow = currentCity.trim().startsWith('в ') || currentCity.trim().startsWith('на ')
      ? currentCity.trim()
      : `в ${currentCity.trim()}`;

    if (includePastLiving && previousCity.trim()) {
      const cityBefore = previousCity.trim().startsWith('в ') || previousCity.trim().startsWith('на ')
        ? previousCity.trim()
        : `в ${previousCity.trim()}`;
      const verbPast = gender === 'm' ? 'жил' : 'жила';
      return {
        ru: `Сейчас я живу ${cityNow}, а раньше я ${verbPast} ${cityBefore}.`,
        pt: `Agora eu moro ${cityNow}, e antes eu morava ${cityBefore}.`,
      };
    }

    return {
      ru: `Сейчас я живу ${cityNow}.`,
      pt: `Agora eu moro ${cityNow}.`,
    };
  };

  const getLanguagesPhrase = () => {
    if (!includeLanguages) return { ru: '', pt: '' };
    switch (nativeLang) {
      case 'portuguese':
        return {
          ru: 'Мой родной язык — португальский. Сейчас я изучаю русский язык, говорю и читаю по-русски.',
          pt: 'Minha língua materna é o português. Agora estudo a língua russa, falo e leio em russo.',
        };
      case 'spanish':
        return {
          ru: 'Мой родной язык — испанский. Сейчас я изучаю русский язык и говорю по-русски.',
          pt: 'Minha língua materna é o espanhol. Agora estudo russo e falo em russo.',
        };
      case 'english':
        return {
          ru: 'Мой родной язык — английский. Я изучаю русский язык и уже понимаю по-русски.',
          pt: 'Minha língua materna é o inglês. Estudo russo e já compreendo em russo.',
        };
      case 'russian':
        return {
          ru: 'Мой родной язык — русский. Я свободно говорю, читаю и пишу по-русски.',
          pt: 'Minha língua materna é o russo. Falo, leio e escrevo fluentemente em russo.',
        };
    }
  };

  const getFreeTimePhrase = () => {
    if (!includeFreeTime) return { ru: '', pt: '' };
    switch (freeTimeActivity) {
      case 'relax':
        return {
          ru: 'В свободное время я люблю отдыхать дома, смотреть фильмы и слушать музыку.',
          pt: 'No tempo livre gosto de descansar em casa, assistir filmes e ouvir música.',
        };
      case 'walk':
        return {
          ru: 'Когда хорошая погода, я гуляю в красивом парке и фотографирую.',
          pt: 'Quando o tempo está bom, passeio no parque bonito e tiro fotos.',
        };
      case 'music':
        return {
          ru: 'Я очень люблю музыку: играю на гитаре и пою русские песни.',
          pt: 'Gosto muito de música: toco violão e canto músicas russas.',
        };
      case 'study':
        return {
          ru: 'Вечером я делаю домашнее задание и много читаю.',
          pt: 'À noite eu faço a lição de casa e leio bastante.',
        };
    }
  };

  const getColorPhrase = () => {
    if (!includeFavoriteColor) return { ru: '', pt: '' };
    switch (favoriteColor) {
      case 'blue':
        return { ru: 'Мой любимый цвет — синий.', pt: 'Minha cor favorita é azul.' };
      case 'black':
        return { ru: 'Мой любимый цвет — чёрный.', pt: 'Minha cor favorita é preto.' };
      case 'red':
        return { ru: 'Мой любимый цвет — красный.', pt: 'Minha cor favorita é vermelho.' };
      case 'green':
        return { ru: 'Мой любимый цвет — зелёный.', pt: 'Minha cor favorita é verde.' };
      case 'white':
        return { ru: 'Мой любимый цвет — белый.', pt: 'Minha cor favorita é branco.' };
    }
  };

  const getFoodDrinkPhrase = () => {
    if (!includeFoodDrink) return { ru: '', pt: '' };
    switch (foodDrinkChoice) {
      case 'borscht_tea':
        return {
          ru: 'Я очень люблю русскую кухню: часто ем горячий борщ и пью чёрный чай с лимоном.',
          pt: 'Gosto muito da culinária russa: costumo comer borscht quente e beber chá preto com limão.',
        };
      case 'fish_coffee':
        return {
          ru: 'На обед я ем свежую рыбу и овощи, а утром всегда пью кофе.',
          pt: 'No almoço como peixe fresco e legumes, e de manhã sempre tomo café.',
        };
      case 'meat_juice':
        return {
          ru: 'Я ем мясо, сыр и свежий хлеб, а также пью яблочный сок.',
          pt: 'Como carne, queijo e pão fresco, e também bebo suco de maçã.',
        };
      case 'veggie_water':
        return {
          ru: 'Я ем здоровую еду: фрукты, рис и салаты, и пью чистую воду.',
          pt: 'Como comida saudável: frutas, arroz e saladas, e bebo água pura.',
        };
    }
  };

  const getClothesPhrase = () => {
    if (!includeClothesStyle) return { ru: '', pt: '' };
    switch (clothesChoice) {
      case 'casual':
        return {
          ru: 'Я люблю удобную одежду: обычно ношу джинсы, футболку и кроссовки.',
          pt: 'Gosto de roupas confortáveis: costumo vestir calças jeans, camiseta e tênis.',
        };
      case 'formal':
        return {
          ru: 'На работе я всегда ношу строгий костюм, рубашку и туфли.',
          pt: 'No trabalho sempre visto terno formal, camisa e sapatos.',
        };
      case 'seasonal':
        return {
          ru: 'Летом я ношу футболку и шорты, а зимой — тёплый свитер, шапку и пальто.',
          pt: 'No verão visto camiseta e shorts, e no inverno — suéter quente, gorro e sobretudo.',
        };
    }
  };

  const getStatusPhrase = () => {
    switch (statusResponse) {
      case 'otlichno':
        return { ru: 'У меня всё отлично!', pt: 'Está tudo ótimo comigo!' };
      case 'normalno':
        return { ru: 'У меня всё нормально.', pt: 'Está tudo bem comigo.' };
      case 'khorosho':
        return { ru: 'Спасибо, хорошо.', pt: 'Obrigado(a), bem.' };
    }
  };

  const patronymicRu = !hasNoPatronymic && patronymic.trim() ? ` Моё отчество — ${patronymic.trim()}.` : '';
  const patronymicPt = !hasNoPatronymic && patronymic.trim() ? ` Meu patronímico é ${patronymic.trim()}.` : '';

  const nat = getNationalityPhrase();
  const hometownRu = includeHometown && hometown.trim() ? ` Мой родной город — ${hometown.trim()}.` : '';
  const hometownPt = includeHometown && hometown.trim() ? ` Minha cidade natal é ${hometown.trim()}.` : '';
  const cityDescRu = includeHometown && includeCityDesc ? ' Это большой и красивый город.' : '';
  const cityDescPt = includeHometown && includeCityDesc ? ' É uma cidade grande e bonita.' : '';

  const living = getLivingPhrase();
  const occupation = getRolePhrase();
  const wp = getWorkplacePhrase();
  const lang = getLanguagesPhrase();
  const freeTime = getFreeTimePhrase();
  const color = getColorPhrase();
  const food = getFoodDrinkPhrase();
  const clothes = getClothesPhrase();
  const st = getStatusPhrase();

  const fullRussianIntro = [
    `Здравствуйте! Меня зовут ${name || '...'}! Моя фамилия — ${surname || '...'}.${patronymicRu}`,
    nat.ru,
    hometownRu ? `${hometownRu.trim()}${cityDescRu}` : '',
    living.ru,
    occupation.ru,
    wp.ru,
    lang.ru,
    color.ru,
    food.ru,
    clothes.ru,
    freeTime.ru,
    `${st.ru} Очень приятно!`,
  ]
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ');

  const fullPtTranslation = [
    `Olá! Meu nome é ${name || '...'}. Meu sobrenome é ${surname || '...'}.${patronymicPt}`,
    nat.pt,
    hometownPt ? `${hometownPt.trim()}${cityDescPt}` : '',
    living.pt,
    occupation.pt,
    wp.pt,
    lang.pt,
    color.pt,
    food.pt,
    clothes.pt,
    freeTime.pt,
    `${st.pt} Muito prazer!`,
  ]
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ');

  const handleCopy = () => {
    navigator.clipboard.writeText(fullRussianIntro);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlayIntro = (speed: 'normal' | 'slow') => {
    setIsPlaying(true);
    playRussianAudio(fullRussianIntro, speed);
    setTimeout(() => setIsPlaying(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-blue-600" />
            <span>Construtor Interativo de Apresentação Pessoal (О себе)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
            Integre os aprendizados de todas as <strong>10 aulas do Nível A1</strong>: cumprimentos, gênero, profissão, cidade natal, onde morava antes, línguas materna e estudada, cores preferidas, pratos típicos e roupas em cada estação do ano!
          </p>
        </div>

        <button
          onClick={() => setIsCertificateModalOpen(true)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
        >
          <Award className="w-4 h-4" />
          <span>Ver Diploma A1</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Configuration Form Column */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-blue-600 border-b border-slate-100 pb-2">
            1. Dados Pessoais & Identidade
          </h3>

          {/* Nome e Sobrenome */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Seu Nome em Russo (Имя)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Фелипе"
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Seu Sobrenome em Russo (Фамилия)
              </label>
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Роза"
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Gênero Gramatical */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Gênero Gramatical (Impacta verbos no passado e profissões/nacionalidades)
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setGender('m')}
                className={`flex-1 p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                  gender === 'm'
                    ? 'bg-blue-50 border-blue-500 text-blue-900 font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Masculino (жил, студент, русский)
              </button>
              <button
                type="button"
                onClick={() => setGender('f')}
                className={`flex-1 p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                  gender === 'f'
                    ? 'bg-blue-50 border-blue-500 text-blue-900 font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Feminino (жила, студентка, русская)
              </button>
            </div>
          </div>

          {/* Patronímico opcional */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">
                Patronímico (Отчество) — Opcional
              </label>
              <label className="text-[11px] text-slate-500 flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasNoPatronymic}
                  onChange={(e) => setHasNoPatronymic(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Estrangeiro (sem patronímico)</span>
              </label>
            </div>
            {!hasNoPatronymic && (
              <input
                type="text"
                value={patronymic}
                onChange={(e) => setPatronymic(e.target.value)}
                placeholder="Иванович / Ивановна"
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            )}
          </div>

          {/* Nacionalidade */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Nacionalidade (Aula 5: по национальности)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
              {[
                { id: 'brazilian' as const, label: 'Brasileiro(a)' },
                { id: 'portuguese' as const, label: 'Português(a)' },
                { id: 'russian' as const, label: 'Russo(a)' },
                { id: 'american' as const, label: 'Americano(a)' },
                { id: 'spanish' as const, label: 'Espanhol(a)' },
                { id: 'german' as const, label: 'Alemão(ã)' },
                { id: 'french' as const, label: 'Francês(a)' },
                { id: 'italian' as const, label: 'Italiano(a)' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setNationality(item.id)}
                  className={`p-1.5 rounded-lg border text-center cursor-pointer transition-colors ${
                    nationality === item.id
                      ? 'bg-blue-50 border-blue-500 text-blue-900 font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cidade Natal */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cidade Natal (Aula 5: Мой родной город)</span>
              </label>
              <label className="text-[11px] text-slate-500 flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeHometown}
                  onChange={(e) => setIncludeHometown(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Incluir</span>
              </label>
            </div>
            {includeHometown && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={hometown}
                  onChange={(e) => setHometown(e.target.value)}
                  placeholder="Сан-Паулу / Рио-де-Жанейро / Москва"
                  className="flex-1 text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setIncludeCityDesc(!includeCityDesc)}
                  className={`px-3 py-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                    includeCityDesc
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                  title="Acrescenta: 'Это большой и красивый город.'"
                >
                  + Descrição
                </button>
              </div>
            )}
          </div>

          {/* Onde mora agora vs. onde morava antes */}
          <div className="space-y-2 border-t border-slate-100 pt-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>Onde mora agora e antes (Aula 5: Verbo жить no presente e passado)</span>
              </label>
              <label className="text-[11px] text-slate-500 flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeLiving}
                  onChange={(e) => setIncludeLiving(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Incluir moradia</span>
              </label>
            </div>
            {includeLiving && (
              <div className="space-y-2">
                <div>
                  <span className="text-[11px] text-slate-500 block mb-0.5">Onde mora agora (живу):</span>
                  <input
                    type="text"
                    value={currentCity}
                    onChange={(e) => setCurrentCity(e.target.value)}
                    placeholder="в Бразилии / в Москве / в Санкт-Петербурге"
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="pastLiving"
                    checked={includePastLiving}
                    onChange={(e) => setIncludePastLiving(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="pastLiving" className="text-xs text-slate-600 cursor-pointer">
                    Mencionar onde morava antes (раньше я {gender === 'm' ? 'жил' : 'жила'}...)
                  </label>
                </div>
                {includePastLiving && (
                  <input
                    type="text"
                    value={previousCity}
                    onChange={(e) => setPreviousCity(e.target.value)}
                    placeholder="в Рио-де-Жанейро / в деревне"
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                )}
              </div>
            )}
          </div>

          {/* Profissão e Local de Trabalho/Estudo */}
          <div className="space-y-2 border-t border-slate-100 pt-3">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-purple-600" />
              <span>Profissão & Ocupação (Aulas 4 e 5: Caso Preposicional em locais)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
              {[
                { id: 'programmer' as const, label: 'Programador(a)' },
                { id: 'student' as const, label: 'Estudante' },
                { id: 'teacher' as const, label: 'Professor(a)' },
                { id: 'doctor' as const, label: 'Médico(a)' },
                { id: 'engineer' as const, label: 'Engenheiro(a)' },
                { id: 'lawyer' as const, label: 'Advogado(a)' },
                { id: 'translator' as const, label: 'Tradutor(a)' },
                { id: 'economist' as const, label: 'Economista' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setRole(item.id)}
                  className={`p-1.5 rounded-lg border text-center cursor-pointer transition-colors ${
                    role === item.id
                      ? 'bg-purple-50 border-purple-500 text-purple-900 font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-1">
              <label className="text-[11px] text-slate-500 block mb-1">
                Local de Trabalho / Estudo (com preposições в / на):
              </label>
              <select
                value={workplace}
                onChange={(e) => setWorkplace(e.target.value as any)}
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="none">Não especificar local</option>
                <option value="firm">Международная фирма (в международной фирме)</option>
                <option value="university">Университет (в университете)</option>
                <option value="hospital">Больница (в больнице)</option>
                <option value="bank">Банк (в банке)</option>
                <option value="school">Школа (в школе)</option>
                <option value="factory">Завод (на заводе — preposição НА!)</option>
              </select>
            </div>
          </div>

          {/* Aula 6: Idiomas */}
          <div className="space-y-1.5 border-t border-slate-100 pt-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>Idiomas e Língua Materna (Aula 6: по-русски, родной язык)</span>
              </label>
              <label className="text-[11px] text-slate-500 flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeLanguages}
                  onChange={(e) => setIncludeLanguages(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Incluir idiomas</span>
              </label>
            </div>
            {includeLanguages && (
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {[
                  { id: 'portuguese' as const, label: 'Português', desc: 'Português nativo + estudo russo' },
                  { id: 'spanish' as const, label: 'Espanhol', desc: 'Espanhol nativo + falo russo' },
                  { id: 'english' as const, label: 'Inglês', desc: 'Inglês nativo + entendo russo' },
                  { id: 'russian' as const, label: 'Russo', desc: 'Russo nativo (fluente)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setNativeLang(item.id)}
                    className={`p-1.5 rounded-lg border text-left cursor-pointer transition-colors ${
                      nativeLang === item.id
                        ? 'bg-blue-50 border-blue-500 text-blue-900 font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-medium text-[11px]">{item.label}</div>
                    <div className="text-[9px] text-slate-500 font-normal">{item.desc}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Aula 8: Cores Favoritas */}
          <div className="space-y-1.5 border-t border-slate-100 pt-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-pink-600" />
                <span>Cor Favorita (Aula 8: Мой любимый цвет)</span>
              </label>
              <label className="text-[11px] text-slate-500 flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeFavoriteColor}
                  onChange={(e) => setIncludeFavoriteColor(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Incluir cor</span>
              </label>
            </div>
            {includeFavoriteColor && (
              <div className="grid grid-cols-5 gap-1.5 text-xs">
                {[
                  { id: 'blue' as const, label: 'Синий', colorClass: 'text-blue-600' },
                  { id: 'red' as const, label: 'Красный', colorClass: 'text-rose-600' },
                  { id: 'green' as const, label: 'Зелёный', colorClass: 'text-emerald-600' },
                  { id: 'black' as const, label: 'Чёрный', colorClass: 'text-slate-800' },
                  { id: 'white' as const, label: 'Белый', colorClass: 'text-slate-500' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFavoriteColor(item.id)}
                    className={`p-1.5 rounded-lg border text-center cursor-pointer transition-colors ${
                      favoriteColor === item.id
                        ? 'bg-pink-50 border-pink-500 font-semibold'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span className={`text-[11px] font-medium ${item.colorClass}`}>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Aula 9: Comidas e Bebidas (Caso Acusativo) */}
          <div className="space-y-1.5 border-t border-slate-100 pt-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-orange-600" />
                <span>Alimentos & Bebidas (Aula 9: Caso Acusativo inanimado)</span>
              </label>
              <label className="text-[11px] text-slate-500 flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeFoodDrink}
                  onChange={(e) => setIncludeFoodDrink(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Incluir comida</span>
              </label>
            </div>
            {includeFoodDrink && (
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {[
                  { id: 'borscht_tea' as const, label: 'Борщ и чай', desc: 'Borscht tradicional e chá preto' },
                  { id: 'fish_coffee' as const, label: 'Рыба и кофе', desc: 'Peixe com salada e café' },
                  { id: 'meat_juice' as const, label: 'Мясо и сок', desc: 'Carne, pão fresco e suco' },
                  { id: 'veggie_water' as const, label: 'Овощи и вода', desc: 'Legumes, frutas e água' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFoodDrinkChoice(item.id)}
                    className={`p-1.5 rounded-lg border text-left cursor-pointer transition-colors ${
                      foodDrinkChoice === item.id
                        ? 'bg-orange-50 border-orange-500 text-orange-950 font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-medium text-[11px]">{item.label}</div>
                    <div className="text-[9px] text-slate-500 font-normal">{item.desc}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Aula 10: Roupas & Estações do Ano (Verbo носить) */}
          <div className="space-y-1.5 border-t border-slate-100 pt-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Shirt className="w-3.5 h-3.5 text-emerald-600" />
                <span>Vestuário & Estações (Aula 10: Одежда и verbo носить)</span>
              </label>
              <label className="text-[11px] text-slate-500 flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeClothesStyle}
                  onChange={(e) => setIncludeClothesStyle(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Incluir roupas</span>
              </label>
            </div>
            {includeClothesStyle && (
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {[
                  { id: 'seasonal' as const, label: 'Estações', desc: 'Verão e inverno russo' },
                  { id: 'casual' as const, label: 'Casual', desc: 'Jeans, camiseta e tênis' },
                  { id: 'formal' as const, label: 'Trabalho', desc: 'Terno, camisa e sapatos' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setClothesChoice(item.id)}
                    className={`p-1.5 rounded-lg border text-left cursor-pointer transition-colors ${
                      clothesChoice === item.id
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-medium text-[11px]">{item.label}</div>
                    <div className="text-[9px] text-slate-500 font-normal">{item.desc}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Aula 7: Atividades de lazer e rotina */}
          <div className="space-y-1.5 border-t border-slate-100 pt-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Coffee className="w-3.5 h-3.5 text-amber-600" />
                <span>Tempo Livre & Rotina (Aula 7: Что вы любите делать?)</span>
              </label>
              <label className="text-[11px] text-slate-500 flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeFreeTime}
                  onChange={(e) => setIncludeFreeTime(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Incluir lazer</span>
              </label>
            </div>
            {includeFreeTime && (
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {[
                  { id: 'relax' as const, label: 'Отдыхать дома', desc: 'Descansar em casa e ver filmes' },
                  { id: 'walk' as const, label: 'Гулять в парке', desc: 'Passear no parque e ouvir música' },
                  { id: 'music' as const, label: 'Играть на гитаре', desc: 'Tocar violão e canções russas' },
                  { id: 'study' as const, label: 'Делать задание', desc: 'Fazer lição e ler livros' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFreeTimeActivity(item.id)}
                    className={`p-1.5 rounded-lg border text-left cursor-pointer transition-colors ${
                      freeTimeActivity === item.id
                        ? 'bg-amber-50 border-amber-500 text-amber-900 font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-medium text-[11px]">{item.label}</div>
                    <div className="text-[9px] text-slate-500 font-normal">{item.desc}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Como vai? */}
          <div className="space-y-1.5 border-t border-slate-100 pt-3">
            <label className="text-xs font-semibold text-slate-700 block">
              Como você está? (Как дела?)
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStatusResponse('otlichno')}
                className={`flex-1 p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                  statusResponse === 'otlichno'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Отлично! (Ótimo)
              </button>
              <button
                type="button"
                onClick={() => setStatusResponse('normalno')}
                className={`flex-1 p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                  statusResponse === 'normalno'
                    ? 'bg-sky-50 border-sky-500 text-sky-900 font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Нормально (Tudo bem)
              </button>
              <button
                type="button"
                onClick={() => setStatusResponse('khorosho')}
                className={`flex-1 p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                  statusResponse === 'khorosho'
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Хорошо (Bem)
              </button>
            </div>
          </div>
        </div>

        {/* Live Presentation Speech Output Column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-md border border-slate-800 space-y-5 sticky top-24">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Sua Apresentação Gerada em Russo (Nível A1)
              </span>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>

            {/* Russian Text Display */}
            <div className="text-lg sm:text-xl font-display font-medium text-amber-100 leading-relaxed bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
              "{fullRussianIntro}"
            </div>

            {/* Portuguese Translation */}
            <div className="text-xs text-slate-300 leading-relaxed">
              <span className="text-slate-500 font-medium block mb-0.5">Tradução em Português:</span>
              "{fullPtTranslation}"
            </div>

            {/* Audio Playback Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => handlePlayIntro('normal')}
                disabled={isPlaying}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer shadow-sm disabled:opacity-50"
              >
                <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
                <span>Ouvir Apresentação (Normal)</span>
              </button>

              <button
                onClick={() => handlePlayIntro('slow')}
                disabled={isPlaying}
                className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-mono text-xs rounded-xl border border-slate-700 transition-colors cursor-pointer disabled:opacity-50"
                title="Pronúncia lenta (0.65x)"
              >
                0.6x Lento
              </button>

              <button
                onClick={() => setIsCertificateModalOpen(true)}
                className="px-3.5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Diploma A1</span>
              </button>
            </div>

            {/* Pedagogical Note Card */}
            <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-1.5">
              <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                <span>Tópicos gramaticais integrados (Aulas 1 a 10 — Nível A1 Completo):</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-400">
                <li>Gênero gramatical ({gender === 'm' ? 'Masculino: жил, студент, русский' : 'Feminino: жила, студентка, русская'})</li>
                <li>Verbo morar: <em>жить</em> (Presente: <em>живу</em> / Passado: <em>{gender === 'm' ? 'жил' : 'жила'}</em>)</li>
                <li>Caso Preposicional de lugar e trabalho (<em>в Бразилии, в университете, на заводе</em>)</li>
                <li>Advérbios de idioma com prefixo по- (<em>по-русски</em>) e diferença <em>учиться</em> vs. <em>изучать</em></li>
                <li>Cores, adjetivos e concordância (<em>синий, красный, белый</em>)</li>
                <li>Caso Acusativo Inanimado com comidas e roupas (<em>борщ, рыбу, джинсы, футболку</em>)</li>
                <li>Verbo vestir/usar: <em>носить</em> (<em>ношу, носишь, носит</em>) e estações (<em>зимой, летом</em>)</li>
                <li>Ações de rotina e lazer (<em>отдыхать, гулять, смотреть, слушать, играть</em>)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Diploma Modal */}
      <A1CertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        defaultName={`${name} ${surname}`}
      />
    </div>
  );
};
