import { ArrowLeft, ArrowRight, Facebook, Instagram, MapPin, Play } from 'lucide-react'

const CONTACT = {
  youtube: 'https://youtube.com/c/MonikaKacprzak',
  google: 'https://www.google.com/maps/place/%F0%9F%94%B5+MONIKA+KACPRZAK+Medyczny+Trener+Personalny/@52.4186531,16.8083299,12z/data=!4m16!1m10!4m9!1m1!4e2!1m6!1m2!1s0x470445dc017b955b:0x4ffd9d18a9bdddbb!2smonika+kacprzak++poznan!2m2!1d16.8783694!2d52.4186738!3m4!1s0x470445dc017b955b:0x4ffd9d18a9bdddbb!8m2!3d52.4186738!4d16.8783694',
  instagram: 'https://www.instagram.com/monika.kacprzak.p.l?igsh=M3R4cGVlenJlZ2Fo&utm_source=qr',
  facebook: 'https://www.facebook.com/monika.kacprzak.trener.osobisty',
}

const VIDEOS = [
  {
    id: '2vi28FEjRp8',
    title: 'Ćwiczenia na poranną sztywność',
    description: 'Krótki materiał o elastyczności całego ciała i lepszym starcie dnia.',
    thumbnail: 'https://i.ytimg.com/vi/2vi28FEjRp8/hqdefault.jpg',
  },
  {
    id: '1fc_jQfvbqU',
    title: 'Pilates i zdrowy kręgosłup',
    description: 'Ćwiczenia wspierające kręgosłup, stabilizację i świadomą pracę z ciałem.',
    thumbnail: 'https://i.ytimg.com/vi/1fc_jQfvbqU/hqdefault.jpg',
  },
  {
    id: '2dC_QC0BgF0',
    title: 'Pilates i zdrowy kręgosłup — tydzień drugi',
    description: 'Kolejny materiał z naciskiem na ruch, oddech i spokojną pracę z ciałem.',
    thumbnail: 'https://i.ytimg.com/vi/2dC_QC0BgF0/hqdefault.jpg',
  },
  {
    id: '0wpmwuPx1yo',
    title: 'Codzienny rozruch',
    description: 'Prosty zestaw ruchu na dzień, kiedy chcesz się rozruszać i poczuć lepiej.',
    thumbnail: 'https://i.ytimg.com/vi/0wpmwuPx1yo/hqdefault.jpg',
  },
]

const PersonalMark = () => (
  <div className="min-w-0">
    <p className="brand-name text-[1.7rem] md:text-[2.1rem]">Monika Kacprzak</p>
    <p className="brand-role text-[11px] md:text-xs mt-2.5">Medyczny Trener Personalny</p>
  </div>
)

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-surface selection:bg-primary-container selection:text-on-primary">
      <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md shadow-[0_4px_30px_rgba(51,69,55,0.08)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <a href="/" aria-label="Przejdź do strony głównej">
            <PersonalMark />
          </a>
          <nav className="hidden md:flex items-center gap-8" aria-label="Nawigacja portfolio">
            <a href="/" className="text-on-surface-variant hover:text-primary transition-colors">Strona główna</a>
            <a href={CONTACT.youtube} target="_blank" rel="noreferrer" className="text-on-surface-variant hover:text-primary transition-colors">YouTube</a>
            <a href={CONTACT.google} target="_blank" rel="noreferrer" className="text-on-surface-variant hover:text-primary transition-colors">Google</a>
          </nav>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-on-primary font-semibold shadow-[0_16px_30px_rgba(51,69,55,0.18)] hover:opacity-90 transition-all"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Wróć na stronę główną
          </a>
        </div>
      </header>

      <main>
        <section className="px-6 pt-24 pb-16">
          <div className="max-w-7xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold tracking-widest uppercase mb-6">
              Portfolio
            </span>
            <h1 className="text-4xl md:text-6xl font-semibold text-on-surface leading-[1.05] font-display mb-6">
              Filmy i materiały
              <span className="block text-primary">o zdrowym ruchu na co dzień.</span>
            </h1>
            <p className="max-w-3xl text-lg text-on-surface-variant leading-relaxed mb-10">
              Tutaj znajdziesz moje wybrane materiały z YouTube. To treści o ruchu, pracy z ciałem, rozruchu i ćwiczeniach, które pomagają lepiej zrozumieć, jak dbać o sprawność w codziennym życiu.
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <a
                href={CONTACT.youtube}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-xl bg-primary px-6 py-4 text-on-primary font-semibold shadow-[0_16px_30px_rgba(51,69,55,0.18)] hover:opacity-90 transition-all"
              >
                <Play className="w-5 h-5" aria-hidden="true" />
                Otwórz kanał YouTube
              </a>
              <a
                href={CONTACT.google}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-xl border border-primary/25 px-6 py-4 text-primary font-semibold hover:bg-primary hover:text-on-primary transition-all"
              >
                <MapPin className="w-5 h-5" aria-hidden="true" />
                Zobacz wizytówkę Google
              </a>
            </div>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
            {VIDEOS.map((video) => (
              <article key={video.id} className="rounded-[2rem] border border-surface-variant/40 bg-surface-container-lowest p-6 md:p-8 shadow-[0_12px_40px_rgba(51,69,55,0.06)]">
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group block mb-6"
                >
                  <div className="aspect-video overflow-hidden rounded-2xl bg-surface-container border border-surface-variant/30 relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-contain bg-black"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/35 via-transparent to-transparent">
                      <div className="w-16 h-16 rounded-full bg-white/92 text-primary flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.18)] group-hover:scale-105 transition-all">
                        <Play className="w-7 h-7 ml-1" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </a>
                <h2 className="text-2xl font-display text-on-surface mb-3">{video.title}</h2>
                <p className="text-on-surface-variant leading-relaxed mb-6">{video.description}</p>
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                >
                  Otwórz na YouTube
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-surface-variant/50 bg-surface">
        <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-3 text-center md:text-left items-center md:items-start">
            <PersonalMark />
            <p className="text-sm tracking-wide text-on-surface-variant">© {new Date().getFullYear()} Monika Kacprzak</p>
          </div>
          <div className="flex gap-4">
            <a href={CONTACT.youtube} target="_blank" rel="noreferrer" aria-label="YouTube — Monika Kacprzak" className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-container text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all">
              <Play className="w-5 h-5" aria-hidden="true" />
            </a>
            <a href={CONTACT.google} target="_blank" rel="noreferrer" aria-label="Google Maps — Monika Kacprzak" className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-container text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all">
              <MapPin className="w-5 h-5" aria-hidden="true" />
            </a>
            <a href={CONTACT.instagram} target="_blank" rel="noreferrer" aria-label="Instagram — Monika Kacprzak" className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-container text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all">
              <Instagram className="w-5 h-5" aria-hidden="true" />
            </a>
            <a href={CONTACT.facebook} target="_blank" rel="noreferrer" aria-label="Facebook — Monika Kacprzak" className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-container text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all">
              <Facebook className="w-5 h-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
