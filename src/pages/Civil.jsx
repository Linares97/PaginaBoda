import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SITE } from '../lib/config.js';
import { useReveal, useCountdown, useParallax, Photo, GrainOverlay, Particles } from '../lib/ui.jsx';

function Nav() {
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
        <Link to="/">Boda</Link>
        <a href="#evento">Evento</a>
        <a className="cta" href="#confirmar">Confirmar</a>
      </div>
    </nav>
  );
}

function Hero() {
  const mediaRef = useRef(null);
  useParallax(mediaRef, -0.16);
  return (
    <header className="hero">
      <div className="hero__media" ref={mediaRef}>
        <Photo src={SITE.fotos.hero} alt="Alejandra y Jean" label="Foto principal — horizontal" />
      </div>
      <Particles density={40} />
      <div className="hero__inner">
        <p className="hero__date">{SITE.civil.fechaTexto}</p>
        <h1 className="hero__names">
          {SITE.novios.ella}
          <span className="amp">&amp;</span>
          {SITE.novios.el}
        </h1>
        <p className="hero__sub">Nuestra boda civil · Santiago Sacatepéquez</p>
      </div>
      <div className="hero__scroll">
        <span>Desliza</span>
        <span className="line" />
      </div>
    </header>
  );
}

function Countdown() {
  const { d, h, m, s } = useCountdown(SITE.civil.fechaISO);
  const cells = [
    { n: d, l: 'Días' },
    { n: h, l: 'Horas' },
    { n: m, l: 'Minutos' },
    { n: s, l: 'Segundos' },
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

function Intro() {
  return (
    <section className="section">
      <div className="container">
        <div className="section__head reveal" style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <span className="eyebrow">Una celebración íntima</span>
          <h2>Antes de la gran fiesta…</h2>
          <p style={{ marginTop: 18, color: 'var(--tinta-soft)' }}>
            Queremos compartir con ustedes el paso legal de nuestra unión. El 7 de noviembre nos
            casamos ante la ley, rodeados de quienes más queremos, antes de vernos de nuevo en
            diciembre para celebrar en grande.
          </p>
        </div>
      </div>
    </section>
  );
}

function Evento() {
  const C = SITE.civil;
  return (
    <section className="section section--alt" id="evento">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow">La boda civil</span>
          <h2>{C.fechaLarga}</h2>
        </div>
        <div className="events">
          <div className="event reveal d1">
            <h3>Ceremonia civil</h3>
            <div className="time">{C.ceremonia.hora}</div>
            <p className="place">{C.lugar}<br />{C.direccion}</p>
            <div className="links">
              <a href={C.mapsUrl} target="_blank" rel="noreferrer">Ver mapa</a>
            </div>
          </div>
          <div className="event reveal d2">
            <h3>Convivencia y cena</h3>
            <div className="time">{C.convivencia.hora}</div>
            <p className="place">{C.lugar}<br />{C.direccion}</p>
            <div className="links">
              <a href={C.mapsUrl} target="_blank" rel="noreferrer">Ver mapa</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConfirmBand() {
  const { numero, mensaje } = SITE.civil.whatsapp;
  const href = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  return (
    <section className="rsvpband" id="confirmar">
      <Particles density={30} />
      <div className="container reveal">
        <span className="eyebrow" style={{ color: 'var(--azul-medio)' }}>Confirma tu asistencia</span>
        <h2>¿Nos acompañas?</h2>
        <p>
          Esta es una celebración pequeña e íntima. Escríbenos por WhatsApp para confirmar tu
          asistencia a la boda civil.
        </p>
        <a className="btn-primary" href={href} target="_blank" rel="noreferrer">
          Confirmar por WhatsApp
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="names">{SITE.novios.ella} &amp; {SITE.novios.el}</div>
      <div className="date">{SITE.civil.fechaLarga} · {SITE.civil.lugar}, Santiago Sacatepéquez</div>
    </footer>
  );
}

export default function Civil() {
  useReveal();
  return (
    <>
      <GrainOverlay />
      <Nav />
      <Hero />
      <Countdown />
      <Intro />
      <Evento />
      <ConfirmBand />
      <Footer />
    </>
  );
}
