import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SITE } from '../lib/config.js';
import { useReveal, useCountdown, useParallax, Photo } from '../lib/ui.jsx';

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
        <a href="#historia">Historia</a>
        <a href="#evento">Evento</a>
        <a href="#galeria">Galería</a>
        <Link className="cta" to="/rsvp">Confirmar</Link>
      </div>
    </nav>
  );
}

function Hero() {
  const mediaRef = useRef(null);
  useParallax(mediaRef, 0.16);
  return (
    <header className="hero">
      <div className="hero__media" ref={mediaRef}>
        <Photo src={SITE.fotos.hero} alt="Alejandra y Jean" label="Foto principal — horizontal" />
      </div>
      <div className="hero__inner">
        <p className="hero__date">{SITE.fechaTexto}</p>
        <h1 className="hero__names">
          {SITE.novios.ella}
          <span className="amp">&amp;</span>
          {SITE.novios.el}
        </h1>
        <p className="hero__sub">Nos vamos a casar · Guatemala</p>
      </div>
      <div className="hero__scroll">
        <span>Desliza</span>
        <span className="line" />
      </div>
    </header>
  );
}

function Countdown() {
  const { d, h, m, s } = useCountdown(SITE.fechaISO);
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

function Story() {
  return (
    <section className="section" id="historia">
      <div className="container story">
        <div className="story__text reveal">
          <span className="eyebrow">Nuestra historia</span>
          <h2>Siete años, una decisión.</h2>
          <p>
            Empezó en septiembre de 2019, cuando coincidimos en el mismo trabajo durante las
            prácticas de Alejandra. Lo que nació entre miradas curiosas y desayunos compartidos
            pronto se volvió algo especial.
          </p>
          <p>
            Nuestra primera cita fue en Carl's Jr., y desde ese primer desayuno supimos que esto
            era amor a primera vista. Con los años viajamos, reímos y construimos una vida hecha de
            buena comida, películas y nuevas aventuras.
          </p>
          <p>
            Después de siete años juntos y una propuesta sorpresa rodeada de nuestras familias, hoy
            damos el siguiente paso. Más que pareja, somos compañeros de vida — y queremos
            celebrarlo con ustedes.
          </p>
        </div>
        <div className="story__media reveal d1">
          <Photo src={SITE.fotos.historia} label="Foto vertical (4:5)" />
          <span className="stamp">Desde 2019</span>
        </div>
      </div>
    </section>
  );
}

function Events() {
  const E = SITE;
  return (
    <section className="section section--alt" id="evento">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow">El gran día</span>
          <h2>{E.fechaLarga}</h2>
        </div>
        <div className="events">
          <div className="event reveal d1">
            <h3>Ceremonia</h3>
            <div className="time">{E.ceremonia.hora}</div>
            <p className="place">{E.ceremonia.lugar}</p>
            <div className="links">
              <a href={E.mapsUrl} target="_blank" rel="noreferrer">Ver mapa</a>
            </div>
          </div>
          <div className="event reveal d2">
            <h3>Recepción</h3>
            <div className="time">{E.recepcion.hora}</div>
            <p className="place">{E.recepcion.lugar}</p>
            <div className="links">
              <a href={E.mapsUrl} target="_blank" rel="noreferrer">Ver mapa</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DressCode() {
  return (
    <section className="section">
      <div className="container dress">
        <div className="reveal">
          <span className="eyebrow">Código de vestimenta</span>
          <h2 style={{ fontSize: 'clamp(1.9rem,4.5vw,3rem)', margin: '14px 0 6px' }}>
            Formal, en nuestra paleta.
          </h2>
          <div className="swatches">
            {SITE.paleta.map((c) => (
              <div className="swatch" key={c.hex}>
                <div className="dot" style={{ background: c.hex }} />
                <span>{c.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="dress__note reveal d1">
          <p style={{ marginBottom: 18 }}>
            Su presencia es lo más importante para nosotros. Les agradeceremos muchísimo si
            acompañan la combinación de colores de la boda:
          </p>
          <ul style={{ listStyle: 'none' }}>
            <li><strong>Ellas:</strong> tonos de la paleta (azules, gris, marino).</li>
            <li><strong>Ellos:</strong> tonos azules sobre fondo oscuro.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="section section--alt" id="galeria">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow">Momentos</span>
          <h2>Un poco de nosotros</h2>
        </div>
        <div className="gallery">
          {SITE.fotos.galeria.map((g, i) => (
            <div className={`cell ${g.cls} reveal ${i % 3 === 1 ? 'd1' : i % 3 === 2 ? 'd2' : ''}`} key={i}>
              <Photo src={g.src} label={g.label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gifts() {
  const R = SITE.regalos;
  return (
    <section className="section">
      <div className="container">
        <div className="gifts__card reveal">
          <h2>Mesa de regalos</h2>
          <p>
            No hay mejor regalo que tu presencia. Si deseas acompañarnos con un detalle para nuestro
            futuro hogar, tenemos una lista en {R.tienda}.
          </p>
          <p>
            En cualquier sucursal física da nuestros apellidos <em>“Linares Chacón”</em> y el número
            de evento <span className="evt">{R.evento}</span>, o en línea:
          </p>
          <a className="gifts__btn" href={R.url} target="_blank" rel="noreferrer">
            Ver lista de regalos
          </a>
          <p className="gifts__note">Nota: no se colocará mesa de regalos el día del evento.</p>
        </div>
      </div>
    </section>
  );
}

function RsvpBand() {
  return (
    <section className="rsvpband">
      <div className="container reveal">
        <span className="eyebrow" style={{ color: 'var(--azul-medio)' }}>Confirmá tu asistencia</span>
        <h2>¿Nos acompañas?</h2>
        <p>
          Solo podrá ingresar quien esté en la lista, así que tu confirmación es muy importante.
          Usa el enlace personal que te enviamos para confirmar por ti y tu familia.
        </p>
        <Link className="btn-primary" to="/rsvp">Abrir mi invitación</Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="names">{SITE.novios.ella} &amp; {SITE.novios.el}</div>
      <div className="date">{SITE.fechaLarga} · Versatto, Guatemala</div>
    </footer>
  );
}

export default function Landing() {
  useReveal();
  return (
    <>
      <Nav />
      <Hero />
      <Countdown />
      <Story />
      <Events />
      <DressCode />
      <Gallery />
      <Gifts />
      <RsvpBand />
      <Footer />
    </>
  );
}
