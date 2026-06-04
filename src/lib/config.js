/* Edita aquí los datos del evento y las fotos. */
export const SITE = {
  novios: { ella: 'Alejandra', el: 'Jean', apellidos: 'Chacón & Linares' },
  fechaISO: '2026-12-05T16:00:00-06:00', // 5 dic 2026, 16:00 hora Guatemala
  fechaTexto: '05 · 12 · 2026',
  fechaLarga: '5 de diciembre de 2026',
  ceremonia: { hora: '4:00 PM', lugar: 'Versatto, Guatemala' },
  recepcion: { hora: '6:00 PM — 11:00 PM', lugar: 'Versatto, Guatemala' },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=@14.6304297,-90.6544713,19z&query_place_id=ChIJpTZSMXANiYURbL-9D23Wf0o',
  regalos: {
    tienda: 'SIMAN',
    evento: '20009325',
    url: 'https://simangiftregistry.web.app/table/20009325',
  },

  /* Reemplaza las rutas por tus fotos en /public/fotos/.
     Si una foto no existe todavía, se muestra un placeholder con su etiqueta. */
  fotos: {
    hero: '/fotos/Save-the -Date J&A-06.jpg',
    historia: '/fotos/IMG_1830.JPG',
    galeria: [
      { src: '/fotos/Save-the -Date J&A-06.jpg', cls: 'g-a', label: 'Foto principal' },
      { src: '/fotos/g2.jpg', cls: 'g-b', label: 'Foto 2' },
      { src: '/fotos/FullSizeRender (1).jpeg', cls: 'g-c', label: 'Foto 3' },
      { src: '/fotos/g4.jpg', cls: 'g-d', label: 'Foto 4' },
      { src: '/fotos/g5.jpg', cls: 'g-e', label: 'Foto 5' },
      { src: '/fotos/g6.jpg', cls: 'g-f', label: 'Foto 6' },
    ],
  },

  paleta: [
    { hex: '#1f3a5f', name: 'Marino' },
    { hex: '#a7c4e2', name: 'Azul medio' },
    { hex: '#cfe2f3', name: 'Azul claro' },
    { hex: '#a9abae', name: 'Gris' },
    { hex: '#0a1a2b', name: 'Negro azul' },
  ],
};
