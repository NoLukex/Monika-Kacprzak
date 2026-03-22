import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import {
  Menu,
  ArrowRight,
  X,
  Ban,
  Hand,
  TimerOff,
  Users,
  ShieldPlus,
  Accessibility,
  Heart,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Facebook,
  Play,
  MapPin,
  Phone
} from 'lucide-react';

const CONTACT = {
  phoneDisplay: '+48 663 598 242',
  phoneHref: 'tel:+48663598242',
  email: 'monika.kacprzak9@gmail.com',
  instagram: 'https://www.instagram.com/monika.kacprzak.p.l?igsh=M3R4cGVlenJlZ2Fo&utm_source=qr',
  facebook: 'https://www.facebook.com/monika.kacprzak.trener.osobisty',
  youtube: 'https://youtube.com/c/MonikaKacprzak',
  google: 'https://www.google.com/maps/place/%F0%9F%94%B5+MONIKA+KACPRZAK+Medyczny+Trener+Personalny/@52.4186531,16.8083299,12z/data=!4m16!1m10!4m9!1m1!4e2!1m6!1m2!1s0x470445dc017b955b:0x4ffd9d18a9bdddbb!2smonika+kacprzak++poznan!2m2!1d16.8783694!2d52.4186738!3m4!1s0x470445dc017b955b:0x4ffd9d18a9bdddbb!8m2!3d52.4186738!4d16.8783694',
  studioAddress: 'ul. Roosevelta 10/2, 60-829 Poznań',
  studioName: 'Hello Body',
};

const NAV_ITEMS = [
  ['#o-mnie', 'O mnie'],
  ['#metody', 'Metody'],
  ['#oferta', 'Oferta'],
  ['/portfolio.html', 'Portfolio'],
  ['#studio', 'Studio'],
  ['#opinie', 'Opinie'],
] as const;

const OFFER_ITEMS = [
  {
    name: 'Trening medyczny',
    displayName: 'Trening medyczny',
    price: '360 zł',
    tag: 'Na ból i ograniczenia',
    intro: 'Gdy ciało potrzebuje ulgi, odzyskania zakresu i bezpiecznego planu działania.',
    bullets: ['pierwsze dolegliwości', 'bezpieczny powrót do ruchu', 'koniec zgadywania'],
    outcome: 'Pomaga wrócić do swobodnego, bezpiecznego ruchu.',
  },
  {
    name: 'Trening korekcji postawy ciała',
    displayName: 'Korekcja postawy',
    price: '360 zł',
    tag: 'Na postawę i napięcia',
    intro: 'Praca nad ustawieniem ciała, zmniejszeniem napięć i odzyskaniem większej swobody w ruchu.',
    bullets: ['praca siedząca', 'sztywność i napięcia', 'lepsza postawa'],
    outcome: 'Pomaga ustawić ciało w bardziej stabilny i komfortowy sposób.',
  },
  {
    name: 'Trening siłowy - kształtowanie sylwetki',
    displayName: 'Trening siłowy',
    price: '320 zł',
    tag: 'Na siłę i sylwetkę',
    intro: 'Jeśli chcesz widzieć efekty, budować sprawność i ćwiczyć z planem.',
    bullets: ['konkretne efekty', 'więcej siły', 'sprawność i sylwetka'],
    outcome: 'Pomaga budować siłę, sprawność i pewność w ruchu.',
  },
];

const PILATES_OFFER = {
  name: 'Pilates',
  description:
    'Zajęcia grupowe wspierające mięśnie głębokie, stabilizację centralną i świadomą pracę z ciałem. To forma ruchu szczególnie ceniona przez osoby, które chcą zadbać o kręgosłup, centrum ciała i lepszą jakość codziennego funkcjonowania.',
  prices: ['Wejście jednorazowe - 45 zł', 'Karnet 4 wejść - 160 zł', 'Karnet 8 wejść - 300 zł'],
  schedule: ['Poniedziałek, 20:00 - ul. Dąbrowskiego 170, Poznań', 'Czwartek, 19:10 - ul. Jarochowskiego 8, Poznań'],
  cta: 'https://www.facebook.com/groups/619298106742690/',
};

const PersonalMark = ({ emphasis = 'default', showRole = true }: { emphasis?: 'default' | 'strong'; showRole?: boolean }) => (
  <div className="min-w-0">
    <p className={`brand-name ${emphasis === 'strong' ? 'text-[1.4rem] md:text-[2.1rem]' : 'text-[1.1rem] md:text-[1.25rem]'}`}>
      Monika Kacprzak
    </p>
    {showRole ? (
      <p className={`brand-role ${emphasis === 'strong' ? 'text-[9px] md:text-xs mt-1.5 md:mt-2.5' : 'text-[10px] mt-1.5'}`}>
        Medyczny Trener Personalny
      </p>
    ) : null}
  </div>
);

function useIntersection<T extends HTMLElement = HTMLDivElement>(threshold = 0.08): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/* ─────────────────────────────────── */
/* HOOK — IntersectionObserver         */
/* Adds 'is-visible' class to the ref  */
/* element when it enters the viewport */
/* ─────────────────────────────────── */
function useReveal<T extends HTMLElement = HTMLDivElement>(
  direction: 'from-bottom' | 'from-left' | 'from-right' | 'scale-hidden' = 'from-bottom',
  delay?: 100 | 200 | 300 | 400 | 500,
  threshold = 0.08
): React.RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Apply initial animation class
    el.classList.add('reveal-section', direction);
    if (delay) el.classList.add(`delay-${delay}`);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [direction, delay, threshold]);

  return ref;
}

/* ─────────────────────────────────── */
/* LOADING FALLBACK                    */
/* ─────────────────────────────────── */
const SectionLoader = () => (
  <div className="py-32 flex justify-center items-center">
    <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" role="status" aria-label="Ładowanie sekcji" />
  </div>
);

/* ─────────────────────────────────── */
/* NAVBAR                              */
/* ─────────────────────────────────── */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen(p => !p), []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/95 backdrop-blur-md shadow-[0_4px_30px_rgba(51,69,55,0.08)]'
          : 'bg-surface/72 backdrop-blur-sm'
      }`}
    >
      <div className="flex justify-between items-center px-5 md:px-6 py-3 md:py-4 max-w-7xl mx-auto gap-4">
        {/* Logo */}
        <a href="#main-content" className="flex items-center gap-3" aria-label="Przejdź do początku strony">
          <PersonalMark emphasis="strong" showRole />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center" aria-label="Nawigacja główna">
          {NAV_ITEMS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300"
              aria-label={label}
            >
              {label}
            </a>
          ))}
          <a
            href="#kontakt"
            className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-semibold hover:opacity-90 hover:scale-105 active:scale-95 transition-all shadow-[0_4px_15px_rgba(51,69,55,0.2)]"
            aria-label="Umów konsultację z Moniką Kacprzak"
          >
            Umów konsultację
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-primary p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg"
          onClick={toggleMenu}
          aria-label={isOpen ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile nav — animated */}
      <div
        className={`md:hidden bg-surface border-t border-surface-variant px-6 flex flex-col gap-5 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[32rem] py-6 opacity-100' : 'max-h-0 py-0 opacity-0'
        }`}
        aria-hidden={!isOpen}
      >
        {NAV_ITEMS.map(([href, label]) => (
          <a
            key={href}
            href={href}
            className="text-on-surface-variant font-medium py-1 min-h-[44px] flex items-center"
            onClick={closeMenu}
          >
            {label}
          </a>
        ))}
        <a
          href="#kontakt"
          className="bg-primary text-on-primary px-6 py-3 rounded-lg font-bold text-center min-h-[48px] flex items-center justify-center"
          onClick={closeMenu}
        >
          Umów konsultację
        </a>
      </div>
    </header>
  );
};

/* ─────────────────────────────────── */
/* STICKY CTA (mobile)                 */
/* ─────────────────────────────────── */
const StickyCTA = () => (
  <a
    href="#kontakt"
    className="sticky-cta"
    aria-label="Umów się na konsultację — otworzy formularz kontaktowy"
  >
    Umów się
    <ArrowRight className="w-4 h-4" aria-hidden="true" />
  </a>
);

const QuickCallButton = () => (
  <a
    href={CONTACT.phoneHref}
    className="call-fab"
    aria-label={`Zadzwoń teraz: ${CONTACT.phoneDisplay}`}
  >
    <Phone className="w-6 h-6" aria-hidden="true" />
  </a>
);

/* ─────────────────────────────────── */
/* HERO                                */
/* ─────────────────────────────────── */
const Hero = () => {
  const [ref, visible] = useIntersection(0.05);

  return (
    <section
      ref={ref}
      className="relative px-6 py-10 md:py-24 overflow-hidden pt-24 md:pt-28 md:min-h-screen flex items-center grain-overlay"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-secondary-container/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center w-full">
        {/* Text */}
        <div className={`z-10 ${visible ? 'animate-fade-in-left' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold tracking-widest uppercase mb-6">
            Poznań · trening 1:1 i Pilates
          </span>
          <h1 className="text-[3rem] md:text-7xl font-semibold tracking-tight leading-[0.98] md:leading-[1.05] text-on-surface mb-5 md:mb-6 font-display max-w-none md:max-w-none text-balance">
            Zacznij ćwiczyć tak,
            <em className="block text-primary not-italic">żeby to naprawdę miało sens.</em>
          </h1>
          <p className="text-[1.02rem] md:text-xl text-on-surface-variant mb-4 max-w-lg leading-relaxed">
            Jeśli wiesz, że ruch jest Ci potrzebny, ale nie chcesz dalej zgadywać, co będzie dobre dla Twojego ciała, jesteś w dobrym miejscu. Pomagam ćwiczyć bezpiecznie, konkretnie i z planem dopasowanym do Ciebie.
          </p>
          <p className="text-[0.98rem] md:text-base text-on-surface-variant mb-8 md:mb-10 max-w-md leading-relaxed">
            <span className="font-semibold text-primary">13 lat</span> doświadczenia w pracy indywidualnej z klientami, którzy chcą zadbać o zdrowie, sprawność i większą lekkość w ciele. Treningi prowadzę w studio {CONTACT.studioName} w centrum Poznania.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary rounded-xl font-bold text-lg hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_40px_rgba(51,69,55,0.18)] min-h-[56px]"
              aria-label="Umów się na pierwszą konsultację z Moniką Kacprzak"
            >
              Umów się na konsultację
              <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
            </a>
            <a
              href="#oferta"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary rounded-xl font-semibold text-lg hover:bg-primary hover:text-on-primary transition-all min-h-[56px]"
              aria-label="Zobacz ofertę Moniki Kacprzak"
            >
              Zobacz ofertę
            </a>
          </div>
        </div>

        {/* Image */}
        <div className={`relative ${visible ? 'animate-fade-in-right delay-200' : 'opacity-0'}`}>
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(51,69,55,0.18)] relative z-10">
            <img
              src="/zdjecia/2O8A5905.jpg"
              alt="Monika Kacprzak — Medyczny Trener Personalny w Poznaniu"
              className="w-full h-full object-cover object-top"
              width="600"
              height="750"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          {/* Badge 13 lat */}
          <div className="absolute -bottom-6 -left-6 bg-primary text-on-primary p-5 rounded-2xl shadow-[0_20px_40px_rgba(51,69,55,0.2)] z-20 hidden lg:block">
            <span className="text-4xl font-bold block leading-none font-display">13</span>
            <span className="text-xs uppercase tracking-widest opacity-80 font-medium">lat doświadczenia</span>
          </div>
          <div className="absolute -bottom-4 -left-4 lg:hidden bg-primary text-on-primary px-4 py-2 rounded-xl shadow-lg z-20">
            <span className="font-bold text-sm">13 lat doświadczenia</span>
          </div>
          {/* Decorative */}
          <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary-container/20 rounded-full blur-3xl -z-0" aria-hidden="true" />
          <div className="absolute top-1/2 -right-4 w-32 h-32 bg-secondary-container/30 rounded-full blur-2xl -z-0" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────── */
/* ABOUT ME                            */
/* ─────────────────────────────────── */
const AboutMe = () => {
  const [ref, visible] = useIntersection();

  return (
    <section id="o-mnie" className="py-16 md:py-24 px-6 bg-surface-container-low" ref={ref}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        {/* Image */}
        <div className={`order-2 md:order-1 w-full md:w-2/5 ${visible ? 'animate-fade-in-left' : 'opacity-0'}`}>
          <div className="relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(51,69,55,0.12)]">
              <img
                src="/zdjecia/2O8A5430.jpg"
              alt="Monika Kacprzak — medyczny trener personalny w Poznaniu"
                className="w-full h-full object-cover object-[center_35%]"
                width="480"
                height="640"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-surface-container-lowest border border-surface-variant rounded-2xl px-5 py-4 shadow-lg hidden lg:block">
              <p className="text-[11px] uppercase tracking-[0.22em] text-on-surface-variant">Podejście</p>
              <p className="font-display text-xl text-on-surface leading-none mt-2">Bezpiecznie i indywidualnie</p>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className={`order-1 md:order-2 w-full md:w-3/5 ${visible ? 'animate-fade-in-right delay-200' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold tracking-widest uppercase mb-6">
            O mnie
          </span>
          <h2 className="text-4xl md:text-6xl font-semibold text-on-surface mb-3 leading-[1.1] font-display">
            Monika Kacprzak
          </h2>
          <p className="text-primary font-semibold text-lg mb-8 font-display italic">
            Medyczny Trener Personalny · Poznań
          </p>
          <div className="space-y-4 text-on-surface-variant leading-relaxed text-lg mb-10">
            <p>
              Jestem medycznym trenerem personalnym z{' '}
              <strong className="text-on-surface">13-letnim doświadczeniem</strong>. Pracuję głównie z osobami, które wiedzą, że ruch jest ważny, ale potrzebują mądrze dobranego planu i profesjonalnego prowadzenia.
            </p>
            <p>
              Ruch, przez który prowadzę swoich klientów, ma poprawiać{' '}
              <strong className="text-on-surface">postawę ciała</strong>, ale też wspierać sprawność, mobilność i codzienny komfort. Łączę trening medyczny, funkcjonalny i siłowy z elementami mobilności oraz stabilizacji.
            </p>
            <p>
              Odpowiednie połączenie stretchingu, stabilizacji, wzmacniania i świadomości ruchu powoduje u moich klientów poprawę w{' '}
              <strong className="text-on-surface">codziennym funkcjonowaniu</strong>. Jestem empatyczna, ale też konkretna i wymagająca wtedy, kiedy trzeba - tak, aby bezpiecznie budować ciało, które jest silniejsze, stabilniejsze i gotowe na codzienne wyzwania.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 p-6 bg-surface-container-lowest rounded-2xl border border-surface-variant/30">
            <StatCard value="13" label="Lat doświadczenia" />
            <StatCard value="100%" label="Indywidualne podejście" bordered />
            <StatCard value="5★" label="Opinie Google" />
          </div>
        </div>
      </div>
    </section>
  );
};

const StatCard = React.memo<{ value: string; label: string; bordered?: boolean }>(
  ({ value, label, bordered }) => (
    <div className={`text-center ${bordered ? 'border-x border-surface-variant' : ''}`}>
      <span className="text-3xl font-bold text-primary block font-display">{value}</span>
      <span className="text-xs text-on-surface-variant uppercase tracking-wide mt-1 block">{label}</span>
    </div>
  )
);

/* ─────────────────────────────────── */
/* PAIN POINTS                         */
/* ─────────────────────────────────── */
const painPoints = [
  {
    icon: <Ban className="w-8 h-8 text-error" aria-hidden="true" />,
    title: 'Za dużo sprzecznych porad',
    desc: 'Czytasz, oglądasz i próbujesz, ale wciąż nie masz pewności, które ćwiczenia naprawdę służą Twojemu ciału.',
  },
  {
    icon: <Hand className="w-8 h-8 text-error" aria-hidden="true" />,
    title: 'Pierwsze dolegliwości',
    desc: 'Czujesz, że ciało zaczyna wysyłać sygnały: plecy, biodra, barki albo po prostu brak dawnej lekkości w ruchu.',
  },
  {
    icon: <TimerOff className="w-8 h-8 text-error" aria-hidden="true" />,
    title: 'Nie chcesz tracić czasu',
    desc: 'Masz pracę, obowiązki i mało przestrzeni na nietrafione treningi. Jeśli już ćwiczysz, chcesz widzieć sens i efekty.',
  },
  {
    icon: <Users className="w-8 h-8 text-error" aria-hidden="true" />,
    title: 'Duże siłownie nie są dla Ciebie',
    desc: 'Nie czujesz się tam pewnie, nie lubisz chaosu i przypadkowości. Potrzebujesz spokojnej przestrzeni i jasnego prowadzenia.',
  },
];

const PainPoints = () => {
  const [ref, visible] = useIntersection();

  return (
    <section className="bg-surface py-16 md:py-24 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-10 md:mb-16 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-5xl font-semibold text-on-surface mb-4 font-display">
            Czy to brzmi znajomo?
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
            To najczęstsze sytuacje, z którymi trafiają do mnie osoby chcące zadbać o zdrowie i sprawność.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {painPoints.map((point, idx) => (
            <div
              key={idx}
              className={`bg-surface-container-low p-8 rounded-2xl shadow-[0_8px_30px_rgba(51,69,55,0.06)] hover:shadow-[0_20px_40px_rgba(51,69,55,0.10)] hover:-translate-y-1 transition-all duration-300 ${
                visible ? `animate-fade-in-up delay-${(idx + 1) * 100}` : 'opacity-0'
              }`}
            >
              <div className="mb-6">{point.icon}</div>
              <h3 className="font-bold text-xl mb-3 text-on-surface font-display">{point.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────── */
/* AUTHORITY (Metody)                  */
/* ─────────────────────────────────── */
const Authority = () => {
  const [ref, visible] = useIntersection();

  const methods = [
    {
      icon: <ShieldPlus className="w-6 h-6" aria-hidden="true" />,
      title: 'Trening medyczny i siłowy',
      desc: 'Łączę wiedzę z zakresu fizjoterapii i kinezjologii, aby Twój ruch był bezpieczny, terapeutyczny i efektywny.',
    },
    {
      icon: <Accessibility className="w-6 h-6" aria-hidden="true" />,
      title: 'Mobilność i stabilizacja',
      desc: 'Skupiamy się na ruchach, które realnie przekładają się na jakość Twojego codziennego życia, bez bólu i z większą swobodą.',
    },
    {
      icon: <Heart className="w-6 h-6" aria-hidden="true" />,
      title: 'Empatia i konkretność',
      desc: 'Nie forsuję, tylko wspieram mądrą pracę z ciałem. Ale też wymagam, bo wiem, co jest potrzebne do realnych efektów.',
    },
  ];

  return (
    <section id="metody" className="py-16 md:py-24 px-6 max-w-7xl mx-auto" ref={ref}>
      <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
        {/* Image */}
        <div className={`w-full md:w-1/2 order-2 md:order-1 ${visible ? 'animate-fade-in-left' : 'opacity-0'}`}>
          <div className="relative inline-block w-full">
            <div className="rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(51,69,55,0.10)] bg-surface-container aspect-[4/5]">
              <img
                src="/zdjecia/162A0845.jpg"
                alt="Monika Kacprzak podczas sesji treningu medycznego"
                className="w-full h-full object-cover"
                width="560"
                height="700"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-primary p-8 rounded-2xl text-on-primary shadow-[0_20px_40px_rgba(51,69,55,0.15)] hidden lg:block">
              <span className="text-3xl font-bold block mb-2 font-display">Ruch z sensem</span>
              <span className="text-sm uppercase tracking-widest opacity-80 font-medium">Bezpiecznie i skutecznie</span>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className={`w-full md:w-1/2 order-1 md:order-2 ${visible ? 'animate-fade-in-right delay-200' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold tracking-widest uppercase mb-6">
            Metody pracy
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold mb-8 md:mb-10 text-on-surface leading-[1.1] font-display">
            Medyczna precyzja,<br />ludzkie podejście.
          </h2>
          <div className="space-y-8 md:space-y-10">
            {methods.map((m, i) => (
              <div key={i} className="flex gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                  {m.icon}
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-on-surface font-display">{m.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────── */
/* OFFER                               */
/* ─────────────────────────────────── */
const Offer = () => {
  const [ref, visible] = useIntersection();

  return (
    <section id="oferta" className="py-16 md:py-24 px-6 bg-surface-container-low" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10 md:mb-14 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold tracking-widest uppercase mb-6">
              Oferta
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold text-on-surface mb-4 font-display">
              Współpraca 1:1
              <span className="block text-primary">oraz osobny rytm Pilates.</span>
            </h2>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              Jeśli nie chcesz już ćwiczyć przypadkowo, wybierz formę pracy najlepiej dopasowaną do Twojego celu. Współpraca 1:1 daje pełną indywidualizację, a Pilates jest dobrą opcją dla osób, które lubią regularny ruch w spokojnej formule grupowej.
            </p>
            <p className="mt-5 text-sm uppercase tracking-[0.22em] text-primary/80">Wybierz, czego dziś najbardziej potrzebuje Twoje ciało</p>
          </div>
          <a
            href="#kontakt"
            className="inline-flex items-center justify-center px-6 py-4 rounded-xl bg-primary text-on-primary font-semibold shadow-[0_16px_30px_rgba(51,69,55,0.18)] hover:opacity-90 transition-all min-h-[52px]"
          >
            Zapytaj o najlepszą opcję
          </a>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-4 md:gap-5 mb-8 items-stretch">
          {OFFER_ITEMS.map((item, idx) => (
            <article
              key={item.name}
              className={`offer-card relative h-full rounded-[1.55rem] p-4.5 md:p-5 transition-all duration-300 ${idx === 1 ? 'offer-card-featured pt-7 md:pt-8' : idx === 0 ? 'offer-card-soft' : 'offer-card-accent'} hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(51,69,55,0.12)] ${visible ? `animate-fade-in-up delay-${((idx % 5) + 1) * 100}` : 'opacity-0'}`}
            >
              {idx === 1 ? (
                <div className="absolute left-4 right-4 -top-3 md:-top-3.5 flex justify-center pointer-events-none">
                  <span className="rounded-full bg-primary px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-on-primary shadow-[0_12px_24px_rgba(51,69,55,0.18)]">
                    Najczęściej wybierane
                  </span>
                </div>
              ) : null}
              <div className="flex h-full flex-col">
                <div className="flex flex-col gap-3 mb-4">
                  <div className="min-h-[5.8rem]">
                    <div className="flex items-start justify-between gap-2 mb-2 min-h-[1.2rem]">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-primary">Współpraca indywidualna</p>
                    </div>
                    <p className="text-[0.8rem] text-primary/80 mb-2">{item.tag}</p>
                    <h3 className="text-[1.18rem] md:text-[1.28rem] leading-[1.02] text-on-surface font-display font-semibold min-h-[2.1rem] flex items-end text-balance">{item.displayName}</h3>
                  </div>
                  <div className="flex items-end justify-between gap-3 border-t border-surface-variant/40 pt-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.16em] text-on-surface-variant mb-1">Forma</p>
                      <p className="text-[0.9rem] text-on-surface-variant">Spotkanie 1:1</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-on-surface-variant mb-1">Cena</p>
                      <p className="text-[1.45rem] md:text-[1.6rem] font-display text-primary leading-none">{item.price}</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-on-surface leading-relaxed mb-3 text-[0.9rem] min-h-[3.25rem]">{item.intro}</p>
                  <div className="rounded-[1.1rem] bg-white/75 border border-surface-variant/35 px-3.5 py-3 mb-3 min-h-[8.6rem]">
                    <p className="text-[0.88rem] font-semibold text-on-surface mb-2.5">Dla kogo</p>
                    <ul className="space-y-2" role="list">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-center gap-2.5 text-on-surface text-[0.88rem]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" aria-hidden="true" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="rounded-[0.95rem] bg-secondary-container/55 px-3.5 py-2.5 text-[0.82rem] text-on-surface mb-3 border border-secondary-container/80">
                    {item.outcome}
                  </p>
                </div>
                <a href="#kontakt" className={`mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.75 font-semibold text-[0.92rem] transition-all ${idx === 1 ? 'bg-primary text-on-primary shadow-[0_18px_35px_rgba(51,69,55,0.18)] hover:opacity-90' : 'border border-primary/20 text-primary hover:bg-primary hover:text-on-primary'}`}>
                  Zapytaj o ten trening
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className={`rounded-[2.25rem] overflow-hidden border border-primary/15 bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-[0_24px_70px_rgba(51,69,55,0.18)] ${visible ? 'animate-scale-in delay-400' : 'opacity-0'}`}>
          <div className="relative h-[260px] md:h-[340px] overflow-hidden">
            <img
              src="/zdjecia/846A4940.jpg"
              alt="Zajęcia Pilates prowadzone przez Monikę Kacprzak"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/35 to-transparent" />
            <div className="absolute left-6 right-6 bottom-6 md:left-10 md:right-10 md:bottom-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.24em] text-white/70 mb-3">Zajęcia grupowe</p>
                <h3 className="text-4xl md:text-5xl font-display text-white mb-3">{PILATES_OFFER.name}</h3>
                <p className="text-white/82 text-base md:text-lg leading-relaxed max-w-2xl">{PILATES_OFFER.description}</p>
              </div>
              <span className="inline-flex self-start rounded-full border border-white/16 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/85 backdrop-blur-sm">
                Kameralna grupa
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-0">
            <div className="px-8 py-10 md:px-12 md:py-12">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-on-primary/60 mb-4">Terminy i miejsca</p>
                  <ul className="space-y-4" role="list">
                    {PILATES_OFFER.schedule.map((slot) => (
                      <li key={slot} className="flex gap-3 text-on-primary/90 leading-relaxed">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{slot}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-on-primary/60 mb-4">Cennik</p>
                  <ul className="space-y-4" role="list">
                    {PILATES_OFFER.prices.map((price) => (
                      <li key={price} className="flex gap-3 text-on-primary/90 leading-relaxed">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <a
                href={PILATES_OFFER.cta}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-xl bg-white px-6 py-4 text-primary font-semibold shadow-[0_16px_30px_rgba(0,0,0,0.12)] hover:translate-y-[-1px] transition-all min-h-[52px]"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
                Dołącz do grupy na Facebooku
              </a>
            </div>

            <div className="bg-white/8 backdrop-blur-sm px-8 py-8 md:px-10 md:py-10 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col">
              <p className="text-sm uppercase tracking-[0.18em] text-on-primary/60 mb-5">Dla kogo</p>
              <ul className="space-y-5 text-on-primary/90" role="list">
                {[
                  'dla osób, które chcą wzmacniać centrum ciała i pracować nad stabilizacją',
                  'dla tych, którzy potrzebują regularnego ruchu wspierającego kręgosłup',
                  'dla osób lubiących ćwiczyć w grupie, ale w spokojnym, świadomym rytmie',
                ].map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────── */
/* STUDIO                              */
/* ─────────────────────────────────── */
const Studio = () => {
  const [ref, visible] = useIntersection();

  return (
    <section id="studio" className="bg-primary text-on-primary py-16 md:py-24 px-6 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 md:gap-16 items-center">
        {/* Text */}
        <div className={`lg:w-1/2 ${visible ? 'animate-fade-in-left' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-1.5 bg-white/10 text-on-primary rounded-full text-xs font-bold tracking-widest uppercase mb-6">
            Studio {CONTACT.studioName} · Poznań
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold mb-8 leading-[1.1] font-display">
            Trening w Twoim rytmie.<br />Tylko dla Ciebie.
          </h2>
          <p className="text-on-primary/80 text-lg mb-10 leading-relaxed max-w-lg">
            Treningi prowadzę w kameralnym studio {CONTACT.studioName} w centrum Poznania. To przestrzeń dla osób, które nie czują się dobrze w dużych siłowniach i wolą ćwiczyć w spokojnych warunkach, z pełną uwagą trenera.
          </p>
          <ul className="space-y-5 text-on-primary/90 text-lg" role="list">
            {[
              'Kameralna atmosfera i spokojne warunki do pracy',
              'Profesjonalny sprzęt medyczny i treningowy',
              'Kameralna, spokojna atmosfera',
              '100% uwagi trenera przez całą sesję',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4">
                <CheckCircle2 className="text-on-primary w-6 h-6 flex-shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Images — asymetryczne */}
        <div className={`lg:w-1/2 grid grid-cols-2 gap-6 relative ${visible ? 'animate-fade-in-right delay-300' : 'opacity-0'}`}>
          <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl transform translate-y-8">
            <img
              src="/zdjecia/2O8A5370.jpg"
              alt="Studio Hello Body — profesjonalny sprzęt treningowy"
              className="w-full h-full object-cover"
              width="300"
              height="400"
              loading="lazy"
            />
          </div>
          <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl transform -translate-y-8">
            <img
              src="/zdjecia/162A0994.jpg"
              alt="Studio Hello Body — sesja treningowa"
              className="w-full h-full object-cover"
              width="300"
              height="400"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────── */
/* TESTIMONIALS — z touch swipe        */
/* ─────────────────────────────────── */
const TestimonialCard = React.memo<{ src: string; position: string; fit?: 'cover' | 'contain' | 'natural'; index: number; isFocused: boolean }>(
  ({ src, position, fit = 'cover', index, isFocused }) => (
    <div
      className={`animate-testimonial-swap aspect-[5/8] rounded-2xl overflow-hidden bg-white transition-all duration-500 ${
        isFocused
          ? 'scale-105 shadow-[0_20px_50px_rgba(51,69,55,0.12)]'
          : 'opacity-80 scale-100 shadow-[0_8px_30px_rgba(51,69,55,0.08)]'
      }`}
    >
      <img
        src={src}
        alt={`Opinia klienta ${index + 1} — ocena z Google Maps`}
        className={`bg-white ${fit === 'natural' ? 'w-auto max-w-full h-auto max-h-full mx-auto' : fit === 'contain' ? 'w-full h-full object-contain' : 'w-full h-full object-cover'}`}
        style={{ objectPosition: position }}
        loading="lazy"
        width="400"
        height="300"
      />
    </div>
  )
);

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const resumeTimer = useRef<number | null>(null);
  const [announceSlide, setAnnounceSlide] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 768);
  const touchStartX = useRef<number | null>(null);
  const [ref, visible] = useIntersection();

  const opinionImages: Array<{ src: string; position: string; fit?: 'cover' | 'contain' | 'natural' }> = [
    { src: '/opinie/Screenshot_20260321_065100_Maps.jpg', position: 'center 40%' },
    { src: '/opinie/Screenshot_20260321_065154_Maps.jpg', position: 'center 47%' },
    { src: '/opinie/Screenshot_20260321_065205_Maps.jpg', position: 'center 44%' },
    { src: '/opinie/Screenshot_20260321_065232_Maps.jpg', position: 'center 46%' },
    { src: '/opinie/weronika-nowicka-clean.png', position: 'center top', fit: 'natural' },
    { src: '/opinie/Screenshot_20260321_065353_Maps.jpg', position: 'center 46%' },
    { src: '/opinie/hanna-skowronek-clean.png', position: 'center top', fit: 'natural' },
    { src: '/opinie/Screenshot_20260321_065424_Maps.jpg', position: 'center 45%' },
    { src: '/opinie/Screenshot_20260321_065452_Maps.jpg', position: 'center 45%' },
  ];

  const pageSize = 3;
  const total = opinionImages.length;
  const totalPages = Math.ceil(total / pageSize);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const syncMode = (desktop: boolean) => {
      setIsDesktop(desktop);
      setCurrent(prev => {
        if (desktop) return Math.min(Math.floor(prev / pageSize), totalPages - 1);
        return Math.min(prev * pageSize, total - 1);
      });
    };

    const handleChange = (event: MediaQueryListEvent) => syncMode(event.matches);

    syncMode(media.matches);
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, [total, totalPages]);

  const prev = useCallback(() => {
    setCurrent(c => {
      if (isDesktop) return c === 0 ? totalPages - 1 : c - 1;
      return c === 0 ? total - 1 : c - 1;
    });
    setAutoPlay(false);
    setAnnounceSlide(true);
  }, [isDesktop, total, totalPages]);

  const next = useCallback(() => {
    setCurrent(c => {
      if (isDesktop) return c === totalPages - 1 ? 0 : c + 1;
      return c === total - 1 ? 0 : c + 1;
    });
  }, [isDesktop, total, totalPages]);

  const nextManual = useCallback(() => {
    next();
    setAutoPlay(false);
    setAnnounceSlide(true);
  }, [next]);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
    setAutoPlay(false);
    setAnnounceSlide(true);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) setAutoPlay(false);
  }, []);

  const pauseAutoplayTemporarily = useCallback(() => {
    setAutoPlay(false);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      if (!isHovered) setAutoPlay(true);
    }, 6000);
  }, [isHovered]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!announceSlide) return;
    const timer = window.setTimeout(() => setAnnounceSlide(false), 150);
    return () => window.clearTimeout(timer);
  }, [announceSlide, current]);

  // Auto-advance (pauses on user interaction)
  useEffect(() => {
    if (!autoPlay || isHovered) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [autoPlay, isHovered, next]);

  // Touch swipe support
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    pauseAutoplayTemporarily();
  }, [pauseAutoplayTemporarily]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) nextManual();
      else prev();
    }
    touchStartX.current = null;
  }, [nextManual, prev]);

  const visibleImages = isDesktop
    ? opinionImages.slice(current * pageSize, current * pageSize + pageSize)
    : [opinionImages[current]];

  return (
    <section id="opinie" className="py-16 md:py-24 px-6 bg-surface-container-low overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-10 md:mb-16 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold tracking-widest uppercase mb-4">
            Opinie klientów
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold text-on-surface font-display">
            Co mówią podopieczni
          </h2>
          <p className="text-on-surface-variant mt-4 text-lg">Oceny z Google Maps - opinie prawdziwych klientów</p>
        </div>

        {/* Desktop carousel — 3 cards */}
        <div
          className={`hidden md:grid grid-cols-3 gap-6 mb-10 carousel-track ${visible ? 'animate-scale-in delay-200' : 'opacity-0'}`}
          role="region"
          aria-label="Karuzela opinii"
          aria-live={announceSlide ? 'polite' : 'off'}
          onMouseEnter={() => {
            setIsHovered(true);
            setAutoPlay(false);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            setAutoPlay(true);
          }}
        >
          {visibleImages.map((item, idx) => (
            <TestimonialCard key={`${current}-${idx}`} src={item.src} position={item.position} fit={item.fit} index={current * pageSize + idx} isFocused={idx === 1} />
          ))}
        </div>

        {/* Mobile carousel — 1 card + swipe */}
        <div
          className={`md:hidden mb-10 carousel-track ${visible ? 'animate-scale-in delay-200' : 'opacity-0'}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-label="Karuzela opinii — przesuń palcem"
          aria-live={announceSlide ? 'polite' : 'off'}
        >
          <div className="animate-testimonial-swap aspect-[5/8] rounded-2xl overflow-hidden bg-white shadow-[0_8px_30px_rgba(51,69,55,0.08)]">
            <img
              src={visibleImages[0].src}
              alt={`Opinia klienta ${current + 1} — ocena z Google Maps`}
              className={`bg-white ${visibleImages[0].fit === 'natural' ? 'w-auto max-w-full h-auto max-h-full mx-auto' : visibleImages[0].fit === 'contain' ? 'w-full h-full object-contain' : 'w-full h-full object-cover'}`}
              style={{ objectPosition: visibleImages[0].position }}
              loading="lazy"
              width="400"
              height="300"
            />
          </div>
          <p className="text-center text-xs text-on-surface-variant mt-3">← Przesuń aby zmienić →</p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => {
              pauseAutoplayTemporarily();
              prev();
            }}
            className="w-12 h-12 rounded-full bg-surface-container-lowest border border-surface-variant flex items-center justify-center hover:bg-primary hover:text-on-primary hover:border-primary transition-all shadow-sm min-w-[48px] min-h-[48px]"
            aria-label="Poprzednia opinia"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          {/* Dots */}
          <div className="flex gap-2" role="tablist" aria-label="Nawigacja opinii">
            {(isDesktop ? Array.from({ length: totalPages }) : opinionImages).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  pauseAutoplayTemporarily();
                  goTo(idx);
                }}
                className={`rounded-full transition-all duration-300 min-h-[12px] ${
                  current === idx ? 'w-8 h-3 bg-primary' : 'w-3 h-3 bg-surface-variant hover:bg-primary/50'
                }`}
                aria-label={isDesktop ? `Zestaw opinii ${idx + 1}` : `Opinia ${idx + 1}`}
                aria-selected={current === idx}
                role="tab"
              />
            ))}
          </div>

          <button
            onClick={() => {
              pauseAutoplayTemporarily();
              nextManual();
            }}
            className="w-12 h-12 rounded-full bg-surface-container-lowest border border-surface-variant flex items-center justify-center hover:bg-primary hover:text-on-primary hover:border-primary transition-all shadow-sm min-w-[48px] min-h-[48px]"
            aria-label="Następna opinia"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <p className="text-center text-on-surface-variant text-sm mt-6" aria-live="polite">
          {isDesktop ? `${current + 1} / ${totalPages}` : `${current + 1} / ${total}`}
        </p>
      </div>
    </section>
  );
};

/* ─────────────────────────────────── */
/* CONTACT FORM                        */
/* ─────────────────────────────────── */
const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    challenge: 'Bóle pleców / kręgosłupa',
    message: '',
  });
  const [ref, visible] = useIntersection();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(current => ({ ...current, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('email', formData.email);
    payload.append('phone', formData.phone);
    payload.append('challenge', formData.challenge);
    payload.append('message', formData.message);
    payload.append('_subject', 'Nowe zapytanie ze strony Moniki Kacprzak');
    payload.append('_template', 'table');
    payload.append('_captcha', 'false');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT.email}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: payload,
      });

      if (!response.ok) {
        throw new Error('Nie udało się wysłać formularza.');
      }

      const result = await response.json();
      if (result.success !== 'true' && result.success !== true) {
        throw new Error('Nie udało się wysłać formularza.');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        challenge: 'Bóle pleców / kręgosłupa',
        message: '',
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Wystąpił błąd podczas wysyłki.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  return (
    <section id="kontakt" className="py-16 md:py-24 px-6 bg-surface" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-12 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold tracking-widest uppercase mb-4">
            Kontakt
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold text-on-surface mb-4 font-display">
            Zrób pierwszy krok.
          </h2>
          <p className="text-on-surface-variant text-lg max-w-xl mx-auto">
            Zadzwoń, napisz maila albo zostaw wiadomość. Napisz, z czym chcesz popracować, a wspólnie ustalimy, od czego najlepiej zacząć i jaka forma współpracy będzie dla Ciebie najrozsądniejsza.
          </p>
        </div>

        <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-8 items-start">
          <div className={`${visible ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
            <div className="rounded-[2rem] border border-surface-variant/40 bg-surface-container-lowest px-6 py-6 md:px-8 md:py-8 shadow-[0_16px_40px_rgba(51,69,55,0.06)] overflow-hidden">
              <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant/90 mb-4">Dane kontaktowe</p>
              <h3 className="text-3xl font-display text-on-surface mb-4">Skontaktuj się tak, jak Ci najwygodniej.</h3>
              <p className="text-on-surface-variant leading-relaxed mb-8">
                Jeśli chcesz zacząć spokojnie i bez zgadywania, zadzwoń, napisz albo zostaw wiadomość w formularzu. Odpowiem i podpowiem, od czego najlepiej zacząć.
              </p>

              <div className="space-y-5">
                <a
                  href={CONTACT.phoneHref}
                  className="block rounded-2xl border border-surface-variant/35 bg-surface px-5 py-5 transition-all hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(51,69,55,0.08)]"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-on-surface-variant mb-2">Telefon</p>
                  <p className="text-[1.35rem] font-semibold text-on-surface leading-tight">{CONTACT.phoneDisplay}</p>
                </a>

                <a
                  href={`mailto:${CONTACT.email}`}
                  className="block rounded-2xl border border-surface-variant/35 bg-surface px-5 py-5 transition-all hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(51,69,55,0.08)]"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-on-surface-variant mb-2">E-mail</p>
                  <p className="text-[1.02rem] font-semibold text-on-surface leading-snug break-all">{CONTACT.email}</p>
                </a>

                <a
                  href="https://hb-trening.pl/kontakt/"
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl border border-surface-variant/35 bg-surface px-5 py-5 transition-all hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(51,69,55,0.08)]"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-on-surface-variant mb-2">Studio</p>
                  <p className="text-lg font-semibold text-on-surface">{CONTACT.studioName}</p>
                  <p className="text-sm text-on-surface-variant mt-2">{CONTACT.studioAddress}</p>
                </a>
              </div>
            </div>
          </div>

          <div className={`bg-surface-container-lowest rounded-[2rem] shadow-[0_20px_60px_rgba(51,69,55,0.08)] overflow-hidden ${visible ? 'animate-scale-in delay-200' : 'opacity-0'}`}>
            <div className="p-10 md:p-16">
            {submitted ? (
              <div className="text-center py-8" role="alert" aria-live="assertive">
                <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-2xl font-bold text-on-surface mb-2 font-display">Dziękuję za zgłoszenie!</h3>
                <p className="text-on-surface-variant">Wiadomość została wysłana. Jeśli wolisz szybszy kontakt, zadzwoń pod {CONTACT.phoneDisplay} lub napisz na {CONTACT.email}.</p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit} aria-label="Formularz kontaktowy">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2 text-on-surface">
                      Imię *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Wpisz swoje imię"
                      autoComplete="given-name"
                      className="w-full bg-surface-container border border-outline-variant/20 rounded-xl p-4 focus:bg-surface-container-highest focus:border-primary/40 focus:outline-none transition-all text-on-surface min-h-[52px]"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2 text-on-surface">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Twoja poczta e-mail"
                      autoComplete="email"
                      className="w-full bg-surface-container border border-outline-variant/20 rounded-xl p-4 focus:bg-surface-container-highest focus:border-primary/40 focus:outline-none transition-all text-on-surface min-h-[52px]"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold mb-2 text-on-surface">
                    Telefon (opcjonalnie)
                  </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+48 000 000 000"
                      autoComplete="tel"
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl p-4 focus:bg-surface-container-highest focus:border-primary/40 focus:outline-none transition-all text-on-surface min-h-[52px]"
                  />
                </div>
                <div>
                  <label htmlFor="challenge" className="block text-sm font-semibold mb-2 text-on-surface">
                    Twoje największe wyzwanie
                  </label>
                    <select
                      id="challenge"
                      name="challenge"
                      value={formData.challenge}
                      onChange={handleChange}
                      className="w-full bg-surface-container border border-outline-variant/20 rounded-xl p-4 focus:bg-surface-container-highest focus:border-primary/40 focus:outline-none transition-all text-on-surface appearance-none cursor-pointer min-h-[52px]"
                    >
                      <option>Bóle pleców / kręgosłupa</option>
                      <option>Brak energii i kondycji</option>
                      <option>Powrót po kontuzji lub operacji</option>
                      <option>Chcę zacząć bezpiecznie ćwiczyć</option>
                      <option>Mobilność i sprawność na co dzień</option>
                      <option>Inne</option>
                    </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2 text-on-surface">
                    Wiadomość (opcjonalnie)
                  </label>
                    <textarea
                      id="message"
                      rows={3}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Opisz krótko swoją sytuację lub pytania..."
                      className="w-full bg-surface-container border border-outline-variant/20 rounded-xl p-4 focus:bg-surface-container-highest focus:border-primary/40 focus:outline-none transition-all text-on-surface resize-none"
                    />
                </div>
                {submitError ? (
                  <p className="rounded-xl border border-error/20 bg-error/5 px-4 py-3 text-sm text-error" role="alert">
                    {submitError}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-on-primary font-bold py-5 rounded-xl hover:opacity-90 transition-all shadow-[0_10px_20px_rgba(51,69,55,0.15)] active:scale-[0.98] text-lg mt-4 flex items-center justify-center gap-2 min-h-[56px]"
                  aria-label="Wyślij zgłoszenie — odezwiemy się w ciągu 24h"
                >
                  {isSubmitting ? 'Wysyłam wiadomość...' : 'Wyślij zgłoszenie'}
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </button>
                <p className="text-xs text-center text-on-surface-variant">
                  Formularz wysyła wiadomość bezpośrednio na adres {CONTACT.email}. Twoje dane nie są udostępniane osobom trzecim.
                </p>
              </form>
            )}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────── */
/* FOOTER                              */
/* ─────────────────────────────────── */
const Footer = () => (
  <footer className="w-full border-t border-surface-variant/50 bg-surface">
    <div className="grid max-w-7xl mx-auto gap-8 px-8 py-12 md:grid-cols-[minmax(260px,1fr)_auto_auto] md:items-center md:gap-8">
      <div className="flex flex-col gap-3 text-center md:text-left items-center md:items-start">
        <PersonalMark emphasis="strong" />
        <p className="text-sm tracking-wide text-on-surface-variant">
          © {new Date().getFullYear()} Monika Kacprzak
        </p>
        <p className="text-xs text-on-surface-variant">Medyczny Trener Personalny · studio {CONTACT.studioName}, {CONTACT.studioAddress}</p>
      </div>

      <nav className="flex flex-wrap justify-center md:flex-nowrap md:justify-center md:items-center gap-x-7 gap-y-4 whitespace-nowrap" aria-label="Nawigacja stopki">
        {[...NAV_ITEMS, ['#kontakt', 'Kontakt'] as const].map(
          ([href, label]) => (
            <a key={href} href={href} className="text-on-surface-variant hover:text-primary transition-colors font-medium">
              {label}
            </a>
          )
        )}
      </nav>

      <div className="flex justify-center md:justify-end gap-4">
        <a
          href={CONTACT.youtube}
          target="_blank"
          rel="noreferrer"
          aria-label="YouTube — Monika Kacprzak"
          className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-container text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all"
        >
          <Play className="w-5 h-5" aria-hidden="true" />
        </a>
        <a
          href={CONTACT.google}
          target="_blank"
          rel="noreferrer"
          aria-label="Google Maps — Monika Kacprzak"
          className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-container text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all"
        >
          <MapPin className="w-5 h-5" aria-hidden="true" />
        </a>
        <a
          href={CONTACT.instagram}
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram — Monika Kacprzak"
          className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-container text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all"
        >
          <Instagram className="w-5 h-5" aria-hidden="true" />
        </a>
        <a
          href={CONTACT.facebook}
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook — Monika Kacprzak"
          className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-container text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all"
        >
          <Facebook className="w-5 h-5" aria-hidden="true" />
        </a>
      </div>
    </div>
  </footer>
);

/* ─────────────────────────────────── */
/* APP ROOT                            */
/* ─────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen bg-surface selection:bg-primary-container selection:text-on-primary">
      <Navbar />
      <main id="main-content">
        <Hero />
        <AboutMe />
        <PainPoints />
        <Authority />
        <Offer />
        <Studio />
        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ContactForm />
        </Suspense>
      </main>
      <Footer />
      {/* Sticky CTA visible only on mobile */}
      <StickyCTA />
      <QuickCallButton />
    </div>
  );
}
