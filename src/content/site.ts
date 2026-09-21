/*
 * Contenido del sitio.
 *
 * Todo el texto visible vive aqui para poder reemplazarlo facilmente.
 * El copy actual es PROVISIONAL y debe reemplazarse por el material real
 * de Yerma (posts de Instagram, formacion, servicios, FAQ, contacto).
 */

export type NavItem = {
  href: string;
  label: string;
};

export type Service = {
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const site = {
  name: "psico.yerma",
  professionalName: "Yermain A. González C.",
  tagline: "Psicología infantil",
  description:
    "Acompañamiento psicológico para niñas, niños y sus familias.",
  url: "https://psico-yerma.vercel.app",
  instagram: "https://www.instagram.com/psico.yerma/",
  contact: {
    whatsapp: "+56 9 4109 2678",
    email: "yermain.gonzalez7@gmail.com",
    location: "",
  },
};

export const nav: NavItem[] = [
  { href: "/", label: "Inicio" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/servicios", label: "Servicios" },
  { href: "/faq", label: "Preguntas frecuentes" },
  { href: "/contacto", label: "Contacto" },
];

export const home = {
  title: "Un espacio seguro para crecer",
  intro:
    "Bienvenidos. Aquí encontrarás información y acompañamiento desde la psicología para el bienestar y desarrollo de niños, niñas y adolescentes.",
  cta: "Conversemos",
  highlights: [
    {
      title: "Atención cercana",
      description:
        "Cada proceso se adapta al ritmo y las necesidades de cada niña o niño.",
    },
    {
      title: "Trabajo con familias",
      description:
        "Las familias son parte fundamental del acompañamiento y del cambio.",
    },
    {
      title: "Espacio seguro",
      description:
        "Un entorno de confianza donde expresar emociones sin juicios.",
    },
  ],
};

export const about = {
  title: "Sobre mí",
  description:
    "Psicóloga infantil y adolescente. Formación en desarrollo infantil, WISC V, TEA y TDAH. Terapia cognitivo-conductual con el juego como herramienta de evaluación e intervención.",
  intro: "¡Hola! Soy Yermain A. González C. y me dicen Yerma.",
  paragraphs: [
    "Mi sentir por la psicología me ha llevado a formarme y enfocarme en el apoyo a niños, niñas y adolescentes.",
    "He trabajado con niños, niñas y adolescentes que presentan alteraciones en el neurodesarrollo, trastorno obsesivo-compulsivo y dificultades conductuales y emocionales.",
    "Mi enfoque se basa en la terapia cognitivo-conductual, utilizando el juego como herramienta clave para la evaluación e intervención.",
    "Trabajo en conjunto con la familia, la escuela y otros profesionales para brindar un apoyo integral, promoviendo el bienestar socioemocional de los más jóvenes.",
  ],
  formationTitle: "Formación",
  studies: [
    "Licenciada en Psicología por la Universidad Central de Venezuela, con reválida en la Universidad de Chile.",
    "Diplomado en Alteraciones en el Desarrollo Infantil y Juvenil.",
    "Certificada en el uso del WISC V para la evaluación psicológica.",
  ],
  additionalFormationTitle: "Formación adicional",
  additionalFormation: [
    "Trastorno del Espectro Autista (TEA).",
    "Trastorno de Déficit de Atención e Hiperactividad (TDAH).",
    "Intervención funcional en problemas de conducta.",
    "Violencia escolar, un abordaje desde la educación emocional.",
    "Habilidades sociales para TEA, TDAH y fobia social.",
    "Exploración en evaluación neuropsicológica infanto-juvenil.",
  ],
};

export const services = {
  title: "Servicios",
  intro:
    "Estos son los espacios de acompañamiento disponibles. Si no sabes cuál necesitas, podemos conversarlo juntos.",
  items: [
    {
      title: "Evaluación psicológica infantil",
      description:
        "Un proceso para comprender las necesidades emocionales, cognitivas y del desarrollo de cada niña o niño.",
    },
    {
      title: "Acompañamiento psicoterapéutico",
      description:
        "Sesiones regulares de apoyo emocional adaptadas a la edad y al momento de cada persona.",
    },
    {
      title: "Orientación a familias",
      description:
        "Herramientas y estrategias para acompañar a hijos e hijas desde casa.",
    },
    {
      title: "Talleres y charlas",
      description:
        "Espacios de aprendizaje sobre crianza, emociones y desarrollo infantil.",
    },
  ] as Service[],
};

export const faq = {
  title: "Preguntas frecuentes",
  intro:
    "Algunas dudas comunes antes de comenzar un proceso. Si queda alguna, escríbeme.",
  items: [
    {
      question: "¿A qué edad atiendes?",
      answer:
        "Atención de niñas, niños y adolescentes. La modalidad se ajusta a la etapa de desarrollo de cada persona.",
    },
    {
      question: "¿Cómo es la primera sesión?",
      answer:
        "Es un espacio para conocernos, entender el motivo de consulta y definir juntos los siguientes pasos.",
    },
    {
      question: "¿Cuánto dura cada sesión?",
      answer:
        "La duración se acuerda según la edad y las necesidades, y se conversa en la primera reunión.",
    },
    {
      question: "¿Los padres participan del proceso?",
      answer:
        "Sí, las familias son parte importante del acompañamiento y se define su participación en cada caso.",
    },
    {
      question: "¿Cómo agendo una hora?",
      answer:
        "A través del formulario de contacto o por WhatsApp, según prefieras.",
    },
  ] as FaqItem[],
};

export const contact = {
  title: "Contacto",
  intro:
    "Escríbeme para coordinar una primera conversación. Si prefieres, puedes usar el formulario.",
  whatsappCta: "Escríbeme por WhatsApp",
  whatsappMessage:
    "Hola Yerma, me gustaría agendar una hora y recibir más información.",
  emailCta: "Envíame un correo",
  emailSubject: "Consulta desde el sitio web",
  emailBody:
    "Hola Yerma,\n\nMe gustaría recibir más información sobre tus servicios.\n\nGracias.",
  privacyNote:
    "Por tu privacidad, evita enviar información clínica o detalles sensibles a través de este sitio.",
};

export const contactForm = {
  title: "Envíame un mensaje",
  contactHint:
    "Déjanos un correo o un teléfono para poder responderte (puedes dejar uno o ambos).",
  nameLabel: "Nombre",
  emailLabel: "Correo electrónico",
  phoneLabel: "Teléfono",
  reasonLabel: "Motivo de contacto",
  reasonPlaceholder: "Selecciona una opción",
  messageLabel: "Mensaje",
  messageHint:
    "Cuéntame brevemente en qué te puedo ayudar. No incluyas información clínica ni datos sensibles.",
  submit: "Enviar mensaje",
  submitting: "Enviando…",
  fixErrorsMessage: "Revisa los campos marcados en rojo.",
  successTitle: "¡Mensaje enviado!",
  successMessage: "Gracias por escribir. Te responderé lo antes posible.",
  sendAnother: "Enviar otro mensaje",
  errorMessage: "No pudimos enviar tu mensaje. Inténtalo nuevamente.",
  reasons: [
    { value: "consulta", label: "Consulta general" },
    { value: "evaluacion", label: "Evaluación psicológica" },
    { value: "acompanamiento", label: "Acompañamiento psicoterapéutico" },
    { value: "talleres", label: "Talleres o charlas" },
    { value: "otro", label: "Otro" },
  ],
};
