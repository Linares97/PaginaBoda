import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SITE } from '../lib/config.js';

const OPTIONS = [
  { key: 'ambos', label: 'Ambos' },
  { key: 'ceremonia', label: 'Ceremonia' },
  { key: 'recepcion', label: 'Recepción' },
  { key: 'ninguno', label: 'No podré' },
];

export default function Rsvp() {
  const { code } = useParams();
  const [state, setState] = useState('loading'); // loading | ready | nocode | notfound | error | done
  const [family, setFamily] = useState(null);
  const [answers, setAnswers] = useState({});
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!code) { setState('nocode'); return; }
    fetch(`/api/rsvp/${encodeURIComponent(code)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        setFamily(data);
        const init = {};
        data.guests.forEach((g) => { init[g.id] = g.attendance === 'pendiente' ? null : g.attendance; });
        setAnswers(init);
        setMessage(data.message || '');
        setState('ready');
      })
      .catch((s) => setState(s === 404 ? 'notfound' : 'error'));
  }, [code]);

  function choose(guestId, key) {
    setAnswers((a) => ({ ...a, [guestId]: key }));
  }

  async function submit() {
    const responses = family.guests.map((g) => ({ id: g.id, attendance: answers[g.id] || 'ninguno' }));
    setSubmitting(true);
    try {
      const r = await fetch('/api/rsvp/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, responses, message }),
      });
      if (!r.ok) throw new Error();
      setState('done');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      alert('No pudimos guardar tu respuesta. Intenta de nuevo en un momento.');
    } finally {
      setSubmitting(false);
    }
  }

  const allAnswered = family && family.guests.every((g) => answers[g.id]);

  if (state === 'loading') return <Shell><div className="state">Cargando tu invitación…</div></Shell>;
  if (state === 'nocode') return <Shell><Msg title="Usa tu enlace personal" body="Para confirmar, abre el enlace que te enviamos por mensaje. Es único para ti y tu familia." /></Shell>;
  if (state === 'notfound') return <Shell><Msg title="No encontramos esta invitación" body="Revisa que el enlace esté completo, o escríbenos directamente." /></Shell>;
  if (state === 'error') return <Shell><Msg title="Algo salió mal" body="Vuelve a intentar en unos minutos, por favor." /></Shell>;

  if (state === 'done') {
    return (
      <Shell>
        <div className="container" style={{ maxWidth: 640 }}>
          <div className="thanks">
            <div className="check">✓</div>
            <h1>¡Gracias!</h1>
            <p>Tu confirmación quedó registrada. Nos hace muy felices contar contigo.</p>
            <p style={{ marginTop: 18 }}>
              <Link className="btn-ghost" to="/">Volver al inicio</Link>
            </p>
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="container">
        <div className="rsvp-hero">
          <span className="eyebrow">{SITE.novios.ella} &amp; {SITE.novios.el} · {SITE.fechaTexto}</span>
          <h1>¡Hola, {family.label}!</h1>
          <p>
            Nos encantaría que nos acompañes. Indica para cada persona si nos acompaña a la
            ceremonia, a la recepción, a ambas, o si lamentablemente no podrá.
          </p>
        </div>

        {family.guests.map((g) => (
          <div className="guest-card" key={g.id}>
            <div className="gname">{g.nombre} {g.apellido || ''}</div>
            <div className="opt-row">
              {OPTIONS.map((o) => {
                const sel = answers[g.id] === o.key;
                return (
                  <div
                    key={o.key}
                    className={`opt ${sel ? 'sel' : ''} ${sel && o.key === 'ninguno' ? 'no' : ''}`}
                    onClick={() => choose(g.id, o.key)}
                  >
                    {o.label}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div style={{ marginTop: 26 }}>
          <label className="eyebrow" style={{ display: 'block', marginBottom: 10 }}>
            Mensaje para los novios (opcional)
          </label>
          <textarea
            className="msg-box"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Déjanos unas palabras…"
          />
        </div>

        <div className="rsvp-actions">
          <button className="btn-primary" onClick={submit} disabled={submitting || !allAnswered}>
            {submitting ? 'Guardando…' : 'Confirmar asistencia'}
          </button>
          {!allAnswered && (
            <p style={{ color: 'var(--tinta-soft)', fontSize: '0.82rem', marginTop: 12 }}>
              Selecciona una opción para cada persona.
            </p>
          )}
        </div>
      </div>
    </Shell>
  );
}

function Shell({ children }) {
  return <main className="rsvp-page">{children}</main>;
}
function Msg({ title, body }) {
  return (
    <div className="container">
      <div className="state">
        <h1>{title}</h1>
        <p>{body}</p>
        <p style={{ marginTop: 20 }}><Link className="btn-ghost" to="/">Ir al inicio</Link></p>
      </div>
    </div>
  );
}
