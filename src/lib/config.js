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
  
    galeria: {
    slots: ['g-a', 'g-b', 'g-c', 'g-d', 'g-e', 'g-f'],
    intervalMs: 4000,   // cada cuánto cambia cada hueco (~4s)
    pool: [
      '/fotos/Save-the -Date J&A-06.jpg',
      '/fotos/IMG_2925.jpeg',
      '/fotos/IMG_2003.JPG',
      '/fotos/FullSizeRender (1).jpeg',
      '/fotos/IMG_3322.JPG',
      '/fotos/Save-the -Date J&A-13.jpg',
      '/fotos/IMG_3329.jpeg',
      '/fotos/14-7-29.jpeg',
      '/fotos/W14-17-10.jpeg',
      '/fotos/W4.jpeg',
      '/fotos/puerto.JPG'
      // …agregá todas las que quieras, una por línea
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
