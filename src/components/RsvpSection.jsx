import { useEffect, useRef, useState } from 'react';
import { SITE } from '../lib/config.js';

const OPTIONS = [
  { key: 'ambos', label: 'Ambos' },
  { key: 'ceremonia', label: 'Ceremonia' },
  { key: 'recepcion', label: 'Recepción' },
  { key: 'ninguno', label: 'No podré' },
];
const OPTION_LABEL = Object.fromEntries(OPTIONS.map((o) => [o.key, o.label]));

export default function RsvpSection({ code }) {
  const T = SITE.rsvpTextos;
  const [phase, setPhase] = useState('loading'); // loading | notfound | error | form | summary
  const [family, setFamily] = useState(null);
  const [answers, setAnswers] = useState({});
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const scrolledRef = useRef(false);

  function load() {
    setPhase('loading');
    fetch(`/api/rsvp/${encodeURIComponent(code)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        setFamily(data);
        const init = {};
        data.guests.forEach((g) => { init[g.id] = g.attendance === 'pendiente' ? null : g.attendance; });
        setAnswers(init);
        setMessage(data.message || '');
        setJustSubmitted(false);
        setPhase(data.respondedAt ? 'summary' : 'form');
      })
      .catch((s) => setPhase(s === 404 ? 'notfound' : 'error'));
  }

  useEffect(() => { load(); }, [code]);

  // Scroll a #confirmar solo una vez que la sección terminó de cargar (evita saltos por el layout que aún se está armando)
  useEffect(() => {
    if (phase === 'loading' || scrolledRef.current) return;
    scrolledRef.current = true;
    if (window.location.hash === '#confirmar') {
      document.getElementById('confirmar')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [phase]);

  function choose(guestId, key) {
    setAnswers((a) => ({ ...a, [guestId]: key }));
  }

  async function submit() {
    const responses = family.guests.map((g) => ({ id: g.id, attendance: answers[g.id] || 'ninguno' }));
    setSubmitting(true);
    setSubmitError(false);
    try {
      const r = await fetch('/api/rsvp/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, responses, message }),
      });
      if (!r.ok) throw new Error();
      setJustSubmitted(true);
      setPhase('summary');
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (phase === 'loading') return <Skeleton />;

  if (phase === 'notfound') {
    return <Msg title={T.notFound.titulo} body={T.notFound.texto} />;
  }

  if (phase === 'error') {
    return (
      <Msg
        title={T.errorCarga.titulo}
        body={T.errorCarga.texto}
        action={<button className="btn-ghost" onClick={load}>{T.errorCarga.reintentar}</button>}
      />
    );
  }

  if (phase === 'summary') {
    return (
      <Summary
        family={family}
        answers={answers}
        justSubmitted={justSubmitted}
        onEdit={() => setPhase('form')}
      />
    );
  }

  const allAnswered = family.guests.every((g) => answers[g.id]);

  return (
    <div>
      <div className="rsvp-hero">
        <span className="eyebrow">{SITE.novios.ella} &amp; {SITE.novios.el} · {SITE.fechaTexto}</span>
        <h1>¡Hola, {family.label}!</h1>
        <p>{T.intro}</p>
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
        <label className="eyebrow" style={{ display: 'block', marginBottom: 10 }}>{T.mensajeLabel}</label>
        <textarea
          className="msg-box"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={T.mensajePlaceholder}
        />
      </div>

      {submitError && (
        <p className="err" style={{ marginTop: 18, textAlign: 'center' }}>
          {T.errorEnvio}{' '}
          <button className="btn-ghost" style={{ marginLeft: 10 }} onClick={submit}>{T.reintentar}</button>
        </p>
      )}

      <div className="rsvp-actions">
        <button className="btn-primary" onClick={submit} disabled={submitting || !allAnswered}>
          {submitting ? T.enviando : T.enviar}
        </button>
        {!allAnswered && (
          <p style={{ color: 'var(--tinta-soft)', fontSize: '0.82rem', marginTop: 12 }}>{T.faltan}</p>
        )}
      </div>
    </div>
  );
}

function Summary({ family, answers, justSubmitted, onEdit }) {
  const T = SITE.rsvpTextos;
  return (
    <div className="thanks">
      <div className="check">✓</div>
      <h1>{justSubmitted ? T.graciasTitulo : T.resumenTitulo}</h1>
      <p>{justSubmitted ? T.graciasTexto : T.resumenTexto}</p>
      <ul style={{ listStyle: 'none', marginTop: 22, textAlign: 'left', maxWidth: 380, marginInline: 'auto' }}>
        {family.guests.map((g) => (
          <li key={g.id} style={{ padding: '8px 0', borderBottom: '1px solid rgba(18,32,54,0.08)' }}>
            <strong>{g.nombre} {g.apellido || ''}</strong> — {OPTION_LABEL[answers[g.id]] || OPTION_LABEL.ninguno}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 26 }}>
        <button className="btn-ghost" onClick={onEdit}>{T.editar}</button>
      </div>
    </div>
  );
}

function Msg({ title, body, action }) {
  return (
    <div className="state state--inline">
      <h1>{title}</h1>
      <p>{body}</p>
      {action && <div style={{ marginTop: 20 }}>{action}</div>}
    </div>
  );
}

function Skeleton() {
  return (
    <div aria-hidden="true">
      <div className="rsvp-hero">
        <div className="skel skel-line" style={{ width: 160, height: 12, margin: '0 auto 16px' }} />
        <div className="skel skel-line" style={{ height: 32, width: '55%', margin: '0 auto 12px' }} />
        <div className="skel skel-line" style={{ height: 14, width: '75%', margin: '0 auto' }} />
      </div>
      {[0, 1].map((i) => (
        <div className="guest-card" key={i}>
          <div className="skel skel-line" style={{ width: '35%', height: 20, marginBottom: 16 }} />
          <div className="opt-row">
            {[0, 1, 2, 3].map((j) => <div key={j} className="skel" style={{ height: 42, borderRadius: 6 }} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
