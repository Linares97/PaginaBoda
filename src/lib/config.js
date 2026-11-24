/* Edita aquí los datos del evento y las fotos. */

// La fecha en español se usa en dos lugares (SITE.fechaTexto para el RSVP y
// landingTextos.es para el Landing), así que vive en una sola constante.
const FECHA_TEXTO_ES = '05 · 12 · 2026';
const FECHA_LARGA_ES = '5 de diciembre de 2026';

export const SITE = {
  novios: { ella: 'Alejandra', el: 'Jean', apellidos: 'Chacón & Linares' },
  fechaISO: '2026-12-05T16:00:00-06:00', // 5 dic 2026, 16:00 hora Guatemala
  fechaTexto: FECHA_TEXTO_ES,
  fechaLarga: FECHA_LARGA_ES,
  ceremonia: { hora: '4:00 PM', lugar: 'Versatto, Guatemala' },
  recepcion: { hora: '6:00 PM — 11:00 PM', lugar: 'Versatto, Guatemala' },

  // Tarjeta única del lugar (sección "El gran día"). Solo lo que no se traduce:
  // el nombre propio y la foto. La ciudad y el itinerario están en landingTextos.
  // La foto vive en public/fotos/, que Vite sirve desde la raíz → ruta con "/".
  lugar: {
    nombre: 'Versatto',
    foto: '/fotos/versatto.png',
  },

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
      '/fotos/14-7-29.jpeg',
      '/fotos/FullSizeRender (1).jpeg',
      '/fotos/IMG_2925.jpeg',
      '/fotos/IMG_2003.JPG',
      '/fotos/riodulce.jpg',
      '/fotos/IMG_3329.jpeg',
      '/fotos/IMG_6323.jpeg',
      '/fotos/IMG_7837.jpeg',
      '/fotos/IMG_8237.jpeg',
      '/fotos/IMG_8960.jpeg',
      '/fotos/W14-17-10.jpeg',
      '/fotos/W4.jpeg',
      '/fotos/puerto.JPG',
      '/fotos/Save-the -Date J&A-13.jpg',
      '/fotos/fullsize-1.jpeg',
      '/fotos/fullsize-1.jpeg',
    ],
  },

  // Textos de la sección de confirmación embebida (RsvpSection), por idioma.
  // El idioma lo define families.lang: 'en' → inglés; vacío o cualquier otro valor → español.
  rsvpTextos: {
    es: {
      cargando: 'Cargando tu invitación…',
      saludo: '¡Hola, {label}!',
      intro:
        'Nos encantaría que nos acompañes. Indica para cada persona si nos acompaña a la ceremonia, a la recepción, a ambas, o si lamentablemente no podrá.',
      opciones: {
        ambos: 'Ambos',
        ceremonia: 'Ceremonia',
        recepcion: 'Recepción',
        ninguno: 'No podré',
      },
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
      mensajeLabel: 'Mensaje para los novios (opcional)',
      mensajePlaceholder: 'Déjanos unas palabras…',
      enviar: 'Confirmar asistencia',
      enviando: 'Guardando…',
      faltan: 'Selecciona una opción para cada persona.',
      volverInicio: 'Volver al inicio',
    },
    en: {
      cargando: 'Loading your invitation…',
      saludo: 'Hello, {label}!',
      intro:
        'We would love to have you with us. For each person, let us know whether they will join us for the ceremony, the reception, both, or sadly cannot attend.',
      opciones: {
        ambos: 'Both',
        ceremonia: 'Ceremony',
        recepcion: 'Reception',
        ninguno: "Can't attend",
      },
      sinCodigo: {
        titulo: 'Confirm from your personal link',
        texto:
          'To confirm your attendance, please open the personal link we sent you on WhatsApp — it is unique to you and your family.',
      },
      notFound: {
        titulo: "We couldn't find this invitation",
        texto: "Please check that the link is complete, or message us directly and we'll gladly help.",
      },
      errorCarga: {
        titulo: "We couldn't load your invitation",
        texto: 'It may be a connection issue. Please try again in a moment.',
        reintentar: 'Try again',
      },
      errorEnvio: "We couldn't save your confirmation. Please try again.",
      reintentar: 'Try again',
      graciasTitulo: 'Thank you!',
      graciasTexto: "Your response has been saved. We're so happy you'll be with us.",
      resumenTitulo: 'Hello again!',
      resumenTexto: 'You have already confirmed your attendance. Here is a summary of your response:',
      mensajeLabel: 'Message for the couple (optional)',
      mensajePlaceholder: 'Leave us a few words…',
      enviar: 'Confirm attendance',
      enviando: 'Saving…',
      faltan: 'Please choose an option for each guest.',
      volverInicio: 'Back to home',
    },
  },

  // El nombre de cada color se traduce en landingTextos.<lang>.vestimenta.colores[key]
  paleta: [
    { hex: '#1f3a5f', key: 'marino' },
    { hex: '#a7c4e2', key: 'azulMedio' },
    { hex: '#cfe2f3', key: 'azulClaro' },
    { hex: '#a9abae', key: 'gris' },
    { hex: '#0a1a2b', key: 'negroAzul' },
  ],

  // Textos del Landing por idioma. El idioma lo define families.lang, igual que el RSVP:
  // 'en' → inglés; sin código en la URL, o cualquier otro valor → español.
  landingTextos: {
    es: {
      fechaTexto: FECHA_TEXTO_ES,
      fechaLarga: FECHA_LARGA_ES,
      nav: { historia: 'Historia', evento: 'Evento', galeria: 'Galería', confirmar: 'Confirmar' },
      hero: {
        sub: 'Nos vamos a casar · Guatemala',
        scroll: 'Desliza',
        fotoLabel: 'Foto principal — horizontal',
      },
      countdown: { dias: 'Días', horas: 'Horas', minutos: 'Minutos', segundos: 'Segundos' },
      historia: {
        eyebrow: 'Nuestra historia',
        titulo: 'Siete años, una decisión.',
        parrafos: [
          'Empezó en septiembre de 2019, cuando coincidimos en el mismo trabajo durante las prácticas de Alejandra. Lo que nació entre miradas curiosas y desayunos compartidos pronto se volvió algo especial.',
          'Nuestra primera cita fue en Carl’s Jr., y desde ese primer desayuno supimos que esto era amor a primera vista. Con los años viajamos, reímos y construimos una vida hecha de buena comida, películas y nuevas aventuras.',
          'Después de siete años juntos y una propuesta sorpresa rodeada de nuestras familias, hoy damos el siguiente paso. Más que pareja, somos compañeros de vida — y queremos celebrarlo con ustedes.',
        ],
        sello: 'Desde 2019',
        fotoLabel: 'Foto vertical (4:5)',
      },
      evento: {
        eyebrow: 'El gran día',
        ciudad: 'Guatemala',
        verMapa: 'Ver mapa',
        itinerarioTitulo: 'Itinerario',
        itinerario: [
          { hora: '4:00 PM', evento: 'Ceremonia' },
          { hora: '5:00 PM', evento: 'Cóctel de bienvenida y fotos' },
          { hora: '6:00 PM', evento: 'Inicio de la recepción' },
          { hora: '11:00 PM', evento: 'Fin de la fiesta' },
        ],
      },
      vestimenta: {
        eyebrow: 'Código de vestimenta',
        titulo: 'Formal, en nuestra paleta.',
        intro:
          'Su presencia es lo más importante para nosotros. Les agradeceremos muchísimo si acompañan la combinación de colores de la boda:',
        ellas: 'Ellas:',
        ellasTexto: 'tonos de la paleta (azules, gris, marino).',
        ellos: 'Ellos:',
        ellosTexto: 'tonos azules sobre fondo oscuro.',
        colores: {
          marino: 'Marino',
          azulMedio: 'Azul medio',
          azulClaro: 'Azul claro',
          gris: 'Gris',
          negroAzul: 'Negro azul',
        },
      },
      galeria: { eyebrow: 'Momentos', titulo: 'Un poco de nosotros', fotoLabel: 'Foto {n}' },
      regalos: {
        titulo: 'Mesa de regalos',
        intro:
          'No hay mejor regalo que tu presencia. Si deseas acompañarnos con un detalle para nuestro futuro hogar, tenemos una lista en {tienda}.',
        instruccionesPre: 'En cualquier sucursal física da nuestros apellidos',
        instruccionesMedio: 'y el número de evento',
        instruccionesPost: ', o en línea:',
        boton: 'Ver lista de regalos',
        nota: 'Nota: no se colocará mesa de regalos el día del evento.',
      },
      confirmar: { eyebrow: 'Confirma tu asistencia' },
      footer: { lugar: 'Versatto, Guatemala' },
    },
    en: {
      fechaTexto: '12 · 05 · 2026',
      fechaLarga: 'December 5, 2026',
      nav: { historia: 'Story', evento: 'Event', galeria: 'Gallery', confirmar: 'RSVP' },
      hero: {
        sub: 'We’re getting married · Guatemala',
        scroll: 'Scroll',
        fotoLabel: 'Main photo — landscape',
      },
      countdown: { dias: 'Days', horas: 'Hours', minutos: 'Minutes', segundos: 'Seconds' },
      historia: {
        eyebrow: 'Our story',
        titulo: 'Seven years, one decision.',
        parrafos: [
          'It started in September 2019, when we found ourselves working at the same place during Alejandra’s internship. What began with curious glances and shared breakfasts soon turned into something special.',
          'Our first date was at Carl’s Jr., and from that first breakfast we knew this was love at first sight. Over the years we travelled, laughed and built a life made of good food, movies and new adventures.',
          'After seven years together and a surprise proposal surrounded by our families, today we take the next step. More than a couple, we are partners for life — and we want to celebrate it with you.',
        ],
        sello: 'Since 2019',
        fotoLabel: 'Portrait photo (4:5)',
      },
      evento: {
        eyebrow: 'The big day',
        ciudad: 'Guatemala',
        verMapa: 'View map',
        itinerarioTitulo: 'Schedule',
        itinerario: [
          { hora: '4:00 PM', evento: 'Ceremony' },
          { hora: '5:00 PM', evento: 'Welcome cocktail and photos' },
          { hora: '6:00 PM', evento: 'Reception begins' },
          { hora: '11:00 PM', evento: 'End of the party' },
        ],
      },
      vestimenta: {
        eyebrow: 'Dress code',
        titulo: 'Formal, in our palette.',
        intro:
          'Your presence is what matters most to us. We would be very grateful if you follow the colour palette of the wedding:',
        ellas: 'Ladies:',
        ellasTexto: 'shades from the palette (blues, grey, navy).',
        ellos: 'Gentlemen:',
        ellosTexto: 'blue tones over a dark base.',
        colores: {
          marino: 'Navy',
          azulMedio: 'Mid blue',
          azulClaro: 'Light blue',
          gris: 'Grey',
          negroAzul: 'Blue black',
        },
      },
      galeria: { eyebrow: 'Moments', titulo: 'A little of us', fotoLabel: 'Photo {n}' },
      regalos: {
        titulo: 'Gift registry',
        intro:
          'There is no better gift than your presence. If you would like to give us something for our future home, we have a registry at {tienda}.',
        instruccionesPre: 'At any store, give our surnames',
        instruccionesMedio: 'and the event number',
        instruccionesPost: ', or online:',
        boton: 'View gift registry',
        nota: 'Note: there will be no gift table at the venue on the day of the event.',
      },
      confirmar: { eyebrow: 'Confirm your attendance' },
      footer: { lugar: 'Versatto, Guatemala' },
    },
  },
};