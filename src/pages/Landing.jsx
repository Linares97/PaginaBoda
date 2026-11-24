import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SITE } from '../lib/config.js';
import { useReveal, useCountdown, useParallax, Photo, GrainOverlay, Particles } from '../lib/ui.jsx';
import RsvpSection from '../components/RsvpSection.jsx';

function Nav({ t, rsvpActivo }) {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`nav ${solid ? 'solid' : ''}`}>
      <span className="brand">A &amp; J</span>
      <div className="links">
        <a href="#historia">{t.nav.historia}</a>
        <a href="#evento">{t.nav.evento}</a>
        <a href="#galeria">{t.nav.galeria}</a>
        {rsvpActivo && <a className="cta" href="#confirmar">{t.nav.confirmar}</a>}
      </div>
    </nav>
  );
}

function Hero({ t }) {
  const mediaRef = useRef(null);
  useParallax(mediaRef, -0.16);
  return (
    <header className="hero">
      <div className="hero__media" ref={mediaRef}>
        <Photo src={SITE.fotos.hero} alt="Alejandra y Jean" label={t.hero.fotoLabel} />
      </div>
      <Particles density={40} />
      <div className="hero__inner">
        <p className="hero__date">{t.fechaTexto}</p>
        <h1 className="hero__names">
          {SITE.novios.ella}
          <span className="amp">&amp;</span>
          {SITE.novios.el}
        </h1>
        <p className="hero__sub">{t.hero.sub}</p>
      </div>
      <div className="hero__scroll">
        <span>{t.hero.scroll}</span>
        <span className="line" />
      </div>
    </header>
  );
}

function Countdown({ t }) {
  const { d, h, m, s } = useCountdown(SITE.fechaISO);
  const cells = [
    { n: d, l: t.countdown.dias },
    { n: h, l: t.countdown.horas },
    { n: m, l: t.countdown.minutos },
    { n: s, l: t.countdown.segundos },
  ];
  return (
    <section className="count">
      <div className="container count__grid">
        {cells.map((c) => (
          <div className="count__cell" key={c.l}>
            <div className="count__num">{String(c.n).padStart(2, '0')}</div>
            <div className="count__lbl">{c.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Story({ t }) {
  const photoRef = useRef(null);
  useParallax(photoRef, -0.07);
  return (
    <section className="section" id="historia">
      <div className="container story">
        <div className="story__text reveal">
          <span className="eyebrow">{t.historia.eyebrow}</span>
          <h2>{t.historia.titulo}</h2>
          {t.historia.parrafos.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="story__media reveal d1">
          <div className="story__frame">
            <div className="story__parallax" ref={photoRef}>
              <Photo src={SITE.fotos.historia} label={t.historia.fotoLabel} />
            </div>
          </div>
          <span className="stamp">{t.historia.sello}</span>
        </div>
      </div>
    </section>
  );
}

function Events({ t }) {
  const L = SITE.lugar;
  const E = t.evento;
  return (
    <section className="section section--alt" id="evento">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow">{E.eyebrow}</span>
          <h2>{t.fechaLarga}</h2>
        </div>
        <div className="venue reveal d1">
          <div className="venue__media">
            <Photo src={L.foto} alt={L.nombre} label={L.nombre} />
          </div>
          <div className="venue__body">
            <h3 className="venue__name">{L.nombre}</h3>
            <div className="venue__loc">
              <span className="venue__city">{E.ciudad}</span>
              <a className="venue__map" href={SITE.mapsUrl} target="_blank" rel="noreferrer">
                {E.verMapa}
              </a>
            </div>
          </div>
        </div>

        <div className="itinerary reveal d2">
          <span className="eyebrow">{E.itinerarioTitulo}</span>
          <ol className="timeline">
            {E.itinerario.map((it) => (
              <li className="timeline__item" key={`${it.hora}-${it.evento}`}>
                <span className="timeline__time">{it.hora}</span>
                <span className="timeline__event">{it.evento}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function DressCode({ t }) {
  const V = t.vestimenta;
  return (
    <section className="section">
      <div className="container dress">
        <div className="reveal">
          <span className="eyebrow">{V.eyebrow}</span>
          <h2 style={{ fontSize: 'clamp(1.9rem,4.5vw,3rem)', margin: '14px 0 6px' }}>
            {V.titulo}
          </h2>
          <div className="swatches">
            {SITE.paleta.map((c) => (
              <div className="swatch" key={c.hex}>
                <div className="dot" style={{ background: c.hex }} />
                <span>{V.colores[c.key]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="dress__note reveal d1">
          <p style={{ marginBottom: 18 }}>{V.intro}</p>
          <ul style={{ listStyle: 'none' }}>
            <li><strong>{V.ellas}</strong> {V.ellasTexto}</li>
            <li><strong>{V.ellos}</strong> {V.ellosTexto}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function GallerySlot({ cls, initial, nextSrc, recover, delay, interval, label }) {
  const [layers, setLayers] = useState([initial, initial]);
  const [active, setActive] = useState(0);
  const [dead, setDead] = useState(!initial);

  useEffect(() => {
    if (!initial) return;
    let t;
    const schedule = () => {
      t = setTimeout(() => {
        const n = nextSrc();
        if (n) {
          setActive((a) => {
            const back = 1 - a;
            setLayers((ls) => { const c = [...ls]; c[back] = n; return c; });
            return back;
          });
        }
        schedule();
      }, interval + Math.random() * 2000);
    };
    const start = setTimeout(schedule, delay);
    return () => { clearTimeout(start); clearTimeout(t); };
  }, [initial, nextSrc, delay, interval]);

  const onErr = (i) => {
    if (i !== active) return;
    const r = recover(layers[i]);        // marca la rota y trae un reemplazo
    if (r) setLayers((ls) => { const c = [...ls]; c[i] = r; return c; });
    else setDead(true);
  };

  if (dead) {
    return <div className={`cell ${cls}`}><div className="photo"><div className="ph">{label}</div></div></div>;
  }
  return (
    <div className={`cell ${cls} xfade`}>
      {layers.map((src, i) => (
        <img key={i} src={src} alt="" loading="lazy"
          className={`xlayer ${i === active ? 'on' : ''}`}
          onError={() => onErr(i)} />
      ))}
    </div>
  );
}

function Gallery({ t }) {
  const G = SITE.galeria;
  const slots = G.slots || ['g-a', 'g-b', 'g-c', 'g-d', 'g-e', 'g-f'];
  const pool = G.pool || [];
  const interval = G.intervalMs || 6000;
  const displayed = useRef(slots.map((_, i) => pool[i] || null));
  const bad = useRef(new Set());

  // elige una foto válida (no rota, y que no se esté mostrando ya en otro hueco)
  const pick = (i) => {
    const fresh = pool.filter((p) => !bad.current.has(p) && !displayed.current.includes(p));
    const usable = fresh.length ? fresh : pool.filter((p) => !bad.current.has(p) && p !== displayed.current[i]);
    if (!usable.length) return null;
    const choice = usable[Math.floor(Math.random() * usable.length)];
    displayed.current[i] = choice;
    return choice;
  };
  const nextSrc = (i) => () => (pool.length > 1 ? pick(i) : null);
  const recover = (i) => (src) => { bad.current.add(src); displayed.current[i] = null; return pick(i); };

  return (
    <section className="section section--alt" id="galeria">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow">{t.galeria.eyebrow}</span>
          <h2>{t.galeria.titulo}</h2>
        </div>
        <div className="gallery">
          {slots.map((cls, i) => (
            <GallerySlot
              key={i}
              cls={`${cls} reveal ${i % 3 === 1 ? 'd1' : i % 3 === 2 ? 'd2' : ''}`}
              initial={pool[i] || null}
              nextSrc={nextSrc(i)}
              recover={recover(i)}
              delay={i * 900}
              interval={interval}
              label={t.galeria.fotoLabel.replace('{n}', i + 1)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Gifts({ t }) {
  const R = SITE.regalos;
  const G = t.regalos;
  return (
    <section className="section">
      <div className="container">
        <div className="gifts__card reveal">
          <h2>{G.titulo}</h2>
          <p>{G.intro.replace('{tienda}', R.tienda)}</p>
          <p>
            {G.instruccionesPre} <em>“Linares Chacón”</em> {G.instruccionesMedio}{' '}
            <span className="evt">{R.evento}</span>{G.instruccionesPost}
          </p>
          <a className="gifts__btn" href={R.url} target="_blank" rel="noreferrer">
            {G.boton}
          </a>
          <p className="gifts__note">{G.nota}</p>
        </div>
      </div>
    </section>
  );
}

function ConfirmSection({ t, onLang }) {
  const { code } = useParams();
  // Sin código no hay familia, así que no hay idioma que elegir: siempre español.
  const T = SITE.rsvpTextos.es;
  return (
    <section className="section section--alt" id="confirmar">
      <div className="container" style={{ maxWidth: 720 }}>
        {code ? (
          <RsvpSection code={code} onLang={onLang} />
        ) : (
          <div className="state state--inline reveal">
            <span className="eyebrow" style={{ display: 'block', marginBottom: 14 }}>{t.confirmar.eyebrow}</span>
            <h1>{T.sinCodigo.titulo}</h1>
            <p>{T.sinCodigo.texto}</p>
          </div>
        )}
      </div>
    </section>
  );
}

function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="names">{SITE.novios.ella} &amp; {SITE.novios.el}</div>
      <div className="date">{t.fechaLarga} · {t.footer.lugar}</div>
    </footer>
  );
}

export default function Landing() {
  useReveal();
  const { code } = useParams();
  // El idioma se decide una sola vez aquí. Sin código en la URL queda en español.
  const [lang, setLang] = useState('es');
  const t = SITE.landingTextos[lang] || SITE.landingTextos.es;

  // Con el RSVP activo el idioma llega por onLang, porque RsvpSection ya pide la
  // familia. Apagado, nadie la pide: la consultamos aquí solo para saber el idioma.
  useEffect(() => {
    if (!code || SITE.rsvpActivo) return;
    let vigente = true;
    fetch(`/api/rsvp/${encodeURIComponent(code)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (vigente && d?.lang === 'en') setLang('en'); })
      .catch(() => {});
    return () => { vigente = false; };
  }, [code]);

  return (
    <>
      <GrainOverlay />
      <Nav t={t} rsvpActivo={SITE.rsvpActivo} />
      <Hero t={t} />
      <Countdown t={t} />
      <Story t={t} />
      <Events t={t} />
      <DressCode t={t} />
      <Gallery t={t} />
      <Gifts t={t} />
      {SITE.rsvpActivo && <ConfirmSection t={t} onLang={setLang} />}
      <Footer t={t} />
    </>
  );
}