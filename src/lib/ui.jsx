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

/* Parallax suave para el hero */
export function useParallax(ref, strength = 0.18) {
  const raf = useRef(0);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        el.style.transform = `translateY(${window.scrollY * strength}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref, strength]);
}
