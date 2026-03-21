import React, { useState } from 'react';
import {
  Menu,
  ArrowRight,
  Ban,
  Hand,
  TimerOff,
  Users,
  ShieldPlus,
  Accessibility,
  Heart,
  CheckCircle2,
  Share2,
  Camera,
  Activity
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-[0_20px_40px_rgba(51,69,55,0.06)]">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Activity className="text-primary w-6 h-6" />
          <span className="text-xl font-bold tracking-tighter text-on-surface font-display">
            Monika Kacprzak
          </span>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          <a href="#o-mnie" className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300">O mnie</a>
          <a href="#metody" className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300">Metody</a>
          <a href="#studio" className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300">Studio</a>
          <a href="#kontakt" className="bg-primary text-on-primary px-6 py-2 rounded-lg font-semibold hover:scale-105 active:scale-95 transition-all">
            Kontakt
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-primary p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      
      {/* Mobile Nav Dropdown (Simple) */}
      {isOpen && (
        <div className="md:hidden bg-surface border-t border-surface-variant px-6 py-4 flex flex-col gap-4 shadow-lg">
          <a href="#o-mnie" className="text-on-surface-variant font-medium" onClick={() => setIsOpen(false)}>O mnie</a>
          <a href="#metody" className="text-on-surface-variant font-medium" onClick={() => setIsOpen(false)}>Metody</a>
          <a href="#studio" className="text-on-surface-variant font-medium" onClick={() => setIsOpen(false)}>Studio</a>
          <a href="#kontakt" className="text-primary font-bold" onClick={() => setIsOpen(false)}>Kontakt</a>
        </div>
      )}
    </header>
  );
};

const Hero = () => {
  return (
    <section className="relative px-6 py-12 md:py-24 overflow-hidden pt-32">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="z-10">
          <span className="inline-block px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold tracking-widest uppercase mb-6">
            Medyczny Trener Personalny
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-on-surface mb-6">
            Odzyskaj sprawność i energię sprzed lat.
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant mb-10 max-w-lg leading-relaxed">
            Dla świadomych osób 40+, które cenią czas, prywatność i chcą ćwiczyć bez bólu pod okiem eksperta z 13-letnim doświadczeniem.
          </p>
          <a href="#kontakt" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary rounded-lg font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_40px_rgba(51,69,55,0.15)]">
            Umów się na konsultację
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(51,69,55,0.1)] relative z-10 bg-surface-container-high">
            <img 
              src="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1000&auto=format&fit=crop" 
              alt="Monika Kacprzak - Trener" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Decorative Elements */}
          <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary-container/20 rounded-full blur-3xl -z-0"></div>
          <div className="absolute top-1/2 -right-4 w-32 h-32 bg-secondary-container/30 rounded-full blur-2xl -z-0"></div>
        </div>
      </div>
    </section>
  );
};

const PainPoints = () => {
  const points = [
    {
      icon: <Ban className="w-8 h-8 text-error" />,
      title: "Sprzeczne informacje",
      desc: "Gubisz się w gąszczu porad internetowych \"ekspertów\", które często sobie przeczą."
    },
    {
      icon: <Hand className="w-8 h-8 text-error" />,
      title: "Ból pleców",
      desc: "Boisz się, że tradycyjny trening siłowy pogorszy stan Twojego kręgosłupa."
    },
    {
      icon: <TimerOff className="w-8 h-8 text-error" />,
      title: "Stracony czas",
      desc: "Godziny na siłowni bez widocznych efektów i ciągłe poczucie stagnacji."
    },
    {
      icon: <Users className="w-8 h-8 text-error" />,
      title: "Tłoczne siłownie",
      desc: "Hałas, kolejki do sprzętu i brak prywatności odbierają ochotę do ćwiczeń."
    }
  ];

  return (
    <section className="bg-surface-container-low py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">Dlaczego dotychczasowe próby zawiodły?</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">Trening po 40-tce wymaga innego podejścia niż ten, który znasz z młodości.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((point, idx) => (
            <div key={idx} className="bg-surface-container-lowest p-8 rounded-2xl shadow-[0_20px_40px_rgba(51,69,55,0.04)]">
              <div className="mb-6">{point.icon}</div>
              <h3 className="font-bold text-xl mb-3 text-on-surface">{point.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Authority = () => {
  return (
    <section id="metody" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-16 items-center">
        <div className="w-full md:w-1/2 order-2 md:order-1">
          <div className="relative inline-block w-full">
            <div className="rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(51,69,55,0.08)] bg-surface-container aspect-[4/5]">
              <img 
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop" 
                alt="Trening medyczny" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-primary p-8 rounded-2xl text-on-primary shadow-[0_20px_40px_rgba(51,69,55,0.15)] hidden lg:block">
              <span className="text-5xl font-bold block mb-1">13 lat</span>
              <span className="text-sm uppercase tracking-widest opacity-80 font-medium">Doświadczenia</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 order-1 md:order-2">
          <h2 className="text-3xl md:text-5xl font-bold mb-10 text-on-surface leading-[1.1]">Medyczna precyzja,<br/>ludzkie podejście.</h2>
          <div className="space-y-10">
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <ShieldPlus className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-2 text-on-surface">Medyczne fundamenty</h4>
                <p className="text-on-surface-variant leading-relaxed">Łączę wiedzę z zakresu fizjoterapii i kinezjologii, aby Twój ruch był bezpieczny i terapeutyczny.</p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <Accessibility className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-2 text-on-surface">Trening funkcjonalny</h4>
                <p className="text-on-surface-variant leading-relaxed">Skupiamy się na ruchach, które realnie przekładają się na jakość Twojego codziennego życia.</p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-2 text-on-surface">Empatia i zrozumienie</h4>
                <p className="text-on-surface-variant leading-relaxed">Rozumiem wyzwania, z jakimi mierzy się organizm po 40. roku życia. Nie forsuję – wspieram.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Studio = () => {
  return (
    <section id="studio" className="bg-primary text-on-primary py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-[1.1]">Trening w Twoim rytmie. Studio Hello Body.</h2>
          <p className="text-on-primary-container text-lg mb-10 leading-relaxed max-w-lg">
            Zapomnij o zatłoczonych sieciówkach. W moim kameralnym studio w Gdańsku liczy się tylko Twój progres i Twój komfort.
          </p>
          <ul className="space-y-5 text-on-primary-container text-lg">
            <li className="flex items-center gap-4">
              <CheckCircle2 className="text-on-primary w-6 h-6 flex-shrink-0" />
              Prywatność na wyłączność
            </li>
            <li className="flex items-center gap-4">
              <CheckCircle2 className="text-on-primary w-6 h-6 flex-shrink-0" />
              Premium sprzęt medyczny
            </li>
            <li className="flex items-center gap-4">
              <CheckCircle2 className="text-on-primary w-6 h-6 flex-shrink-0" />
              Kameralna atmosfera
            </li>
          </ul>
        </div>
        <div className="lg:w-1/2 grid grid-cols-2 gap-6 relative">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-primary-container shadow-2xl transform translate-y-8">
            <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop" 
              alt="Wnętrze studia" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-primary-container shadow-2xl transform -translate-y-8">
            <img 
              src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000&auto=format&fit=crop" 
              alt="Sprzęt do treningu" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Po trzech miesiącach treningów medycznych z Moniką, ból pleców, który towarzyszył mi od lat, praktycznie zniknął. Odzyskałem swobodę ruchu.",
      name: "Marek",
      age: "48 lat",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
    },
    {
      quote: "Cenię dyskrecję i profesjonalizm. Monika to ekspertka, która nie marnuje mojego czasu. Każde ćwiczenie ma swój cel.",
      name: "Anna",
      age: "42 lata",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-24 px-6 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-on-surface">Historie moich podopiecznych</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-surface-container-lowest p-10 rounded-3xl shadow-[0_20px_40px_rgba(51,69,55,0.04)] flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 grayscale">
                <img src={t.img} alt={t.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div>
                <p className="text-lg italic text-on-surface mb-6 leading-relaxed">"{t.quote}"</p>
                <span className="font-bold text-primary block">— {t.name}, {t.age}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  return (
    <section id="kontakt" className="py-24 px-6 bg-surface">
      <div className="max-w-3xl mx-auto bg-surface-container-lowest rounded-[2rem] shadow-[0_20px_60px_rgba(51,69,55,0.08)] overflow-hidden">
        <div className="p-10 md:p-16">
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">Zrób pierwszy krok do sprawności.</h2>
          <p className="text-on-surface-variant mb-10 text-lg">Umów się na medyczną konsultację treningową. Porozmawiamy o Twoich celach i barierach.</p>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-on-surface">Imię</label>
                <input 
                  type="text" 
                  placeholder="Wpisz swoje imię" 
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-xl p-4 focus:bg-surface-container-highest focus:border-primary/40 focus:outline-none transition-all text-on-surface"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-on-surface">Email</label>
                <input 
                  type="email" 
                  placeholder="Twoja poczta e-mail" 
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-xl p-4 focus:bg-surface-container-highest focus:border-primary/40 focus:outline-none transition-all text-on-surface"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-on-surface">Telefon (opcjonalnie)</label>
              <input 
                type="tel" 
                placeholder="+48 000 000 000" 
                className="w-full bg-surface-container border border-outline-variant/20 rounded-xl p-4 focus:bg-surface-container-highest focus:border-primary/40 focus:outline-none transition-all text-on-surface"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-on-surface">Twoje największe wyzwanie</label>
              <select className="w-full bg-surface-container border border-outline-variant/20 rounded-xl p-4 focus:bg-surface-container-highest focus:border-primary/40 focus:outline-none transition-all text-on-surface appearance-none">
                <option>Ból pleców / kręgosłupa</option>
                <option>Brak energii i kondycji</option>
                <option>Powrót po kontuzji</option>
                <option>Chcę zacząć bezpiecznie ćwiczyć</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-primary text-on-primary font-bold py-5 rounded-xl hover:bg-primary-container transition-colors shadow-[0_10px_20px_rgba(51,69,55,0.1)] active:scale-[0.98] text-lg mt-4">
              Wyślij zgłoszenie
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="w-full border-t border-surface-variant/50 bg-surface">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 space-y-8 md:space-y-0 max-w-7xl mx-auto">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <span className="font-display font-bold text-xl text-on-surface">Monika Kacprzak</span>
          <p className="text-sm tracking-wide text-on-surface-variant">© {new Date().getFullYear()} Monika Kacprzak. Personal Training & Clinical Wellness.</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8">
          <a href="#o-mnie" className="text-on-surface-variant hover:text-primary transition-colors font-medium">O mnie</a>
          <a href="#metody" className="text-on-surface-variant hover:text-primary transition-colors font-medium">Metody</a>
          <a href="#studio" className="text-on-surface-variant hover:text-primary transition-colors font-medium">Studio</a>
          <a href="#kontakt" className="text-on-surface-variant hover:text-primary transition-colors font-medium">Kontakt</a>
        </div>
        
        <div className="flex gap-4">
          <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-container text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all">
            <Share2 className="w-5 h-5" />
          </a>
          <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-container text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all">
            <Camera className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-surface selection:bg-primary-container selection:text-on-primary">
      <Navbar />
      <main>
        <Hero />
        <PainPoints />
        <Authority />
        <Studio />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
