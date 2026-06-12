import { useEffect, useRef, useState } from 'react';

/* Revela elementos al hacer scroll (IntersectionObserver) */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* Cuenta regresiva hacia la fecha de la boda */
export function useCountdown(targetIso) {
  const [t, setT] = useState(() => diff(targetIso));
  useEffect(() => {
    const id = setInterval(() => setT(diff(targetIso)), 1000);
    return () => clearInterval(id);
  }, [targetIso]);
  return t;
}
function diff(targetIso) {
  const ms = Math.max(0, new Date(targetIso).getTime() - Date.now());
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return { d, h, m, s };
}

/* Foto con placeholder elegante si aún no existe el archivo */
export function Photo({ src, alt, label, className = '' }) {
  const [failed, setFailed] = useState(!src);
  return (
    <div className={`photo ${className}`}>
      {src && !failed && (
        <img src={src} alt={alt || ''} onError={() => setFailed(true)} loading="lazy" />
      )}
      {failed && <div className="ph">{label || 'Tu foto aquí'}</div>}
    </div>
  );
}

/* Parallax por capas: traslada el elemento según su posición en el viewport.
   speed negativo = se mueve más lento que el scroll (efecto profundidad). */
export function useParallax(ref, speed = -0.12) {
  const raf = useRef(0);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${offset * speed}px, 0)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref, speed]);
}

/* Capa de grano sobre toda la página (textura sutil de revista impresa). */
export function GrainOverlay() {
  return <div className="grain" aria-hidden="true" />;
}

/* Campo de partículas suaves (polvo de luz) sobre fondos oscuros. */
export function Particles({ density = 46, color = '245, 239, 227' }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    let w, h, dpr, parts, raf;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      parts = Array.from({ length: density }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(Math.random() * 0.25 + 0.05),
        a: Math.random() * 0.5 + 0.15,
        tw: Math.random() * Math.PI * 2,
      }));
    };
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy; p.tw += 0.02;
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
        if (p.x < -5) p.x = w + 5; if (p.x > w + 5) p.x = -5;
        const alpha = p.a * (0.6 + 0.4 * Math.sin(p.tw));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    resize(); tick();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [density, color]);
  return <canvas ref={ref} className="particles" aria-hidden="true" />;
}