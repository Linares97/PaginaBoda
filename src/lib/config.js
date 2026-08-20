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

  // Boda civil — celebración íntima previa a la recepción de diciembre
  civil: {
    fechaISO: '2026-11-07T16:00:00-06:00',
    fechaTexto: '07 · 11 · 2026',
    fechaLarga: '7 de noviembre de 2026',
    ceremonia: { hora: '4:00 PM' },
    convivencia: { hora: '6:00 PM' },
    lugar: 'Quintas de Alta Loma',
    direccion: 'Calle Real Lote 38, Quintas de Alta Loma, Santiago Sacatepéquez, Sacatepéquez',
    mapsUrl: 'https://maps.app.goo.gl/kaqPvVcQv8rxeCBF7',
    whatsapp: {
      numero: '50250185660',
      mensaje: '¡Hola! Confirmo mi asistencia a la boda civil de Alejandra y Jean 💙',
    },
  },

  // Foto de portada (horizontal) y foto de la sección "Nuestra historia" (vertical)
  fotos: {
    hero: '/fotos/Save-the -Date J&A-2.jpg',
    historia: '/fotos/IMG_1830.JPG',
  },

  // Galería rotativa: 6 huecos que alternan con crossfade entre todo el pool
  galeria: {
    slots: ['g-a', 'g-b', 'g-c', 'g-d', 'g-e', 'g-f'],
    intervalMs: 4000,
    pool: [
      '/fotos/IMG_2925.jpeg',
      '/fotos/IMG_2003.JPG',
      '/fotos/IMG_3322.JPG',
      '/fotos/IMG_3329.jpeg',
      '/fotos/14-7-29.jpeg',
      '/fotos/W14-17-10.jpeg',
      '/fotos/W4.jpeg',
      '/fotos/puerto.JPG',
      '/fotos/Save-the -Date J&A-13.jpg',
      '/fotos/fullsize-1.jpeg',
    ],
  },

  // Textos de la sección de confirmación embebida (RsvpSection)
  rsvpTextos: {
    intro:
      'Nos encantaría que nos acompañes. Indica para cada persona si nos acompaña a la ceremonia, a la recepción, a ambas, o si lamentablemente no podrá.',
    sinCodigo: {
      titulo: 'Confirma desde tu link personal',
      texto:
        'Para confirmar tu asistencia, abre el enlace personal que te enviamos por WhatsApp — es único para ti y tu familia.',
    },
    notFound: {
      titulo: 'No encontramos esta invitación',
      texto: 'Revisa que el enlace esté completo, o escríbenos directamente y con gusto te ayudamos.',
    },
    errorCarga: {
      titulo: 'No pudimos cargar tu invitación',
      texto: 'Puede ser un problema de conexión. Intenta de nuevo en un momento.',
      reintentar: 'Reintentar',
    },
    errorEnvio: 'No pudimos guardar tu confirmación. Intenta de nuevo.',
    reintentar: 'Reintentar',
    graciasTitulo: '¡Gracias!',
    graciasTexto: 'Tu confirmación quedó registrada. Nos hace muy felices contar contigo.',
    resumenTitulo: '¡Hola de nuevo!',
    resumenTexto: 'Ya habías confirmado tu asistencia. Este es un resumen de tu respuesta:',
    editar: 'Editar mi respuesta',
    mensajeLabel: 'Mensaje para los novios (opcional)',
    mensajePlaceholder: 'Déjanos unas palabras…',
    enviar: 'Confirmar asistencia',
    enviando: 'Guardando…',
    faltan: 'Selecciona una opción para cada persona.',
  },

  paleta: [
    { hex: '#1f3a5f', name: 'Marino' },
    { hex: '#a7c4e2', name: 'Azul medio' },
    { hex: '#cfe2f3', name: 'Azul claro' },
    { hex: '#a9abae', name: 'Gris' },
    { hex: '#0a1a2b', name: 'Negro azul' },
  ],
};