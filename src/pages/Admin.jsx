import { useEffect, useState } from 'react';

const TOKEN_KEY = 'boda_admin_token';

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || '');
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    if (!token) return;
    fetch('/api/admin/stats', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(setData)
      .catch(() => { setToken(''); sessionStorage.removeItem(TOKEN_KEY); });
  }, [token]);

  if (!token) return <Login onToken={(t) => { sessionStorage.setItem(TOKEN_KEY, t); setToken(t); }} />;
  if (!data) return <div className="admin"><div className="container">Cargando…</div></div>;

  const exportXls = () => {
    fetch('/api/admin/export', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.blob())
      .then((b) => {
        const url = URL.createObjectURL(b);
        const a = document.createElement('a');
        a.href = url; a.download = 'confirmaciones-boda.xlsx'; a.click();
        URL.revokeObjectURL(url);
      });
  };

  const s = data.stats;
  return (
    <div className="admin">
      <div className="container">
        <div className="bar" style={{ justifyContent: 'space-between' }}>
          <div>
            <h1>Confirmaciones</h1>
            <p className="sub">Alejandra &amp; Jean · panel privado</p>
          </div>
          <div className="bar">
            <button className="btn-dark" onClick={exportXls}>Exportar Excel</button>
            <button className="btn-ghost" onClick={() => { sessionStorage.removeItem(TOKEN_KEY); setToken(''); }}>
              Salir
            </button>
          </div>
        </div>

        <div className="stat-grid">
          <Stat n={s.confirmadosPersonas} l="Personas confirmadas" />
          <Stat n={s.asistenCeremonia} l="A la ceremonia" />
          <Stat n={s.asistenRecepcion} l="A la recepción" />
          <Stat n={s.noAsisten} l="No asisten" />
          <Stat n={`${s.familiasRespondieron}/${s.familiasTotal}`} l="Invitaciones resp." />
          <Stat n={s.invitadosTotal} l="Invitados totales" />
        </div>

        <h3 style={{ fontFamily: 'var(--display)', margin: '8px 0 14px', fontSize: '1.3rem' }}>Por mesa</h3>
        <div className="stat-grid" style={{ marginBottom: 34 }}>
          {data.porMesa.map((m) => (
            <div className="stat" key={m.mesa}>
              <div className="n" style={{ fontSize: '1.8rem' }}>{m.confirmados}/{m.total}</div>
              <div className="l">Mesa {m.mesa}</div>
            </div>
          ))}
        </div>

        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>Invitación</th><th>Mesa</th><th>Invitado</th><th>Estado</th><th>Mensaje</th>
              </tr>
            </thead>
            <tbody>
              {data.familias.map((f) =>
                f.guests.map((g, i) => (
                  <tr key={g.id}>
                    {i === 0 && <td rowSpan={f.guests.length}><strong>{f.label}</strong></td>}
                    {i === 0 && <td rowSpan={f.guests.length}>{f.mesa || '—'}</td>}
                    <td>{g.nombre} {g.apellido || ''}</td>
                    <td><span className={`pill ${g.attendance}`}>{labelOf(g.attendance)}</span></td>
                    {i === 0 && <td rowSpan={f.guests.length} style={{ color: 'var(--tinta-soft)', fontSize: '0.82rem' }}>{f.message || ''}</td>}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Stat({ n, l }) {
  return <div className="stat"><div className="n">{n}</div><div className="l">{l}</div></div>;
}
function labelOf(a) {
  return { ambos: 'Ambos', ceremonia: 'Ceremonia', recepcion: 'Recepción', ninguno: 'No asiste', pendiente: 'Pendiente' }[a] || a;
}

function Login({ onToken }) {
  const [pwd, setPwd] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const go = async () => {
    setLoading(true); setErr('');
    try {
      const r = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwd }),
      });
      if (!r.ok) throw new Error();
      const { token } = await r.json();
      onToken(token);
    } catch {
      setErr('Contraseña incorrecta.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="admin">
      <div className="container">
        <div className="login-box">
          <h1 style={{ fontFamily: 'var(--display)' }}>Panel privado</h1>
          {err && <div className="err">{err}</div>}
          <input
            className="input" type="password" placeholder="Contraseña"
            value={pwd} onChange={(e) => setPwd(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && go()}
          />
          <button className="btn-dark" onClick={go} disabled={loading}>
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </div>
      </div>
    </div>
  );
}
