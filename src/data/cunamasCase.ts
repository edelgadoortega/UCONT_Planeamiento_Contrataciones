export type Badge = "OEI" | "AEI" | "AO" | "Insumo" | "Bien" | "Servicio" | "Contratacion";

export type Option = {
  id: string;
  text: string;
  correct: boolean;
  feedback?: string;
  badge?: Badge;
  meta?: string;
};

export type Activity = Option & {
  unit?: string;
  annualGoal?: number;
  annualCost?: number;
};

export const stageScores = {
  oei: 20,
  aei: 20,
  activities: 25,
  inputs: 20,
  procurement: 15,
};

export const stageImages = {
  welcome:
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80",
  oei:
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  aei:
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  activities:
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
  inputs:
    "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
  procurement:
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
  report:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
};

export const oeiOptions: Option[] = [
  {
    id: "OEI.01",
    badge: "OEI",
    correct: true,
    text: "Mejorar el cuidado y la asistencia a los servicios de educacion temprana y salud de ninas y ninos de infancia temprana y gestantes en situacion de pobreza, pobreza extrema y vulnerabilidad.",
    feedback:
      "Correcto. Cuna Mas contribuye directamente al desarrollo infantil temprano mediante el Servicio de Cuidado Diurno y el Servicio de Acompanamiento a Familias.",
  },
  {
    id: "OEI.02",
    badge: "OEI",
    correct: false,
    text: "Incrementar la asistencia efectiva a los servicios de educacion primaria y secundaria de las ninas, ninos y adolescentes en situacion de pobreza, pobreza extrema y vulnerabilidad.",
    feedback: "No corresponde directamente a Cuna Mas. Este objetivo se vincula con educacion primaria/secundaria.",
  },
  {
    id: "OEI.03",
    badge: "OEI",
    correct: false,
    text: "Potenciar el desarrollo de capacidades productivas de jovenes y adultos/as en situacion de pobreza, pobreza extrema y vulnerabilidad.",
    feedback: "No corresponde a Cuna Mas. Esta vinculado con capacidades productivas de jovenes y adultos.",
  },
  {
    id: "OEI.04",
    badge: "OEI",
    correct: false,
    text: "Fortalecer la seguridad economica y autonomia social de las personas con discapacidad severa y personas adultas mayores de 65 anos.",
    feedback: "No corresponde a Cuna Mas. Esta orientado a personas con discapacidad severa y adultos mayores.",
  },
  {
    id: "OEI.05",
    badge: "OEI",
    correct: false,
    text: "Incrementar el acceso a infraestructura y servicios basicos de la poblacion en centros poblados rurales.",
    feedback: "No corresponde directamente a Cuna Mas. Esta vinculado a infraestructura y plataformas de servicios.",
  },
  {
    id: "OEI.06",
    badge: "OEI",
    correct: false,
    text: "Fortalecer la gestion efectiva y articulada de las entidades responsables de la implementacion de la PNDIS en el marco del SINADIS.",
    feedback: "No es el objetivo misional directo de Cuna Mas en este caso.",
  },
  {
    id: "OEI.07",
    badge: "OEI",
    correct: false,
    text: "Fortalecer la gestion de los Programas, Prestaciones Sociales del MIDIS y sus procesos con un enfoque de mejora continua.",
    feedback: "Puede relacionarse indirectamente con la gestion de programas, pero no es el objetivo estrategico directo.",
  },
  {
    id: "OEI.08",
    badge: "OEI",
    correct: false,
    text: "Fortalecer la gestion institucional bajo un enfoque de eficiencia.",
    feedback: "Es un objetivo de gestion institucional, no el objetivo misional directo de Cuna Mas.",
  },
  {
    id: "OEI.09",
    badge: "OEI",
    correct: false,
    text: "Fortalecer la Gestion del Riesgo de Desastres y la adaptacion al cambio climatico.",
    feedback: "No corresponde directamente a la prestacion regular de los servicios Cuna Mas del caso.",
  },
];

export const aeiOptions: Option[] = [
  {
    id: "AEI.01.01",
    badge: "AEI",
    correct: true,
    meta: "Servicio de Cuidado Diurno - SCD",
    text: "Cuidado diurno de atencion integral para ninos y ninas de 6 a 36 meses que viven en situacion de pobreza y pobreza extrema.",
    feedback: "Correcto. Esta AEI corresponde al Servicio de Cuidado Diurno de Cuna Mas.",
  },
  {
    id: "AEI.01.02",
    badge: "AEI",
    correct: true,
    meta: "Servicio de Acompanamiento a Familias - SAF",
    text: "Acompanamiento en cuidado y aprendizaje adecuado para familias con ninos y ninas menores de 36 meses de edad y/o gestantes.",
    feedback: "Correcto. Esta AEI corresponde al Servicio de Acompanamiento a Familias de Cuna Mas.",
  },
  {
    id: "AEI.01.03",
    badge: "AEI",
    correct: false,
    text: "Incentivos monetarios condicionados segun esquema de transferencias a primera infancia entregados de manera oportuna.",
    feedback: "No corresponde a Cuna Mas; se vincula con transferencias monetarias condicionadas.",
  },
  { id: "AEI.02.01", badge: "AEI", correct: false, text: "Incentivos monetarios condicionados entregados de manera oportuna para hogares con gestantes, ninas, ninos y adolescentes.", feedback: "Corresponde a otra prestacion social, no a Cuna Mas." },
  { id: "AEI.02.03", badge: "AEI", correct: false, text: "Alimentacion escolar permanente a estudiantes de instituciones educativas publicas.", feedback: "La alimentacion escolar no forma parte de los servicios Cuna Mas del caso." },
  { id: "AEI.03.01", badge: "AEI", correct: false, text: "Asistencia tecnica personalizada para activos productivos y naturales de hogares rurales.", feedback: "Se relaciona con capacidades productivas, no con desarrollo infantil temprano." },
  { id: "AEI.04.03", badge: "AEI", correct: false, text: "Subvencion monetaria focalizada a personas adultas mayores de 65 anos en pobreza extrema.", feedback: "Esta dirigida a adultos mayores, no a ninas y ninos menores de 36 meses." },
  { id: "AEI.05.01", badge: "AEI", correct: false, text: "Servicios publicos con plataformas itinerantes accesibles a poblaciones rurales.", feedback: "No corresponde a los servicios SCD o SAF." },
  { id: "AEI.06.06", badge: "AEI", correct: false, text: "Clasificacion socioeconomica oportuna para entidades publicas a cargo de intervenciones focalizadas.", feedback: "Es soporte de focalizacion, no AEI misional de Cuna Mas." },
  { id: "AEI.08.05", badge: "AEI", correct: false, text: "Gestion institucional efectiva en el MIDIS.", feedback: "Es gestion institucional, no accion misional del caso." },
  { id: "AEI.09.01", badge: "AEI", correct: false, text: "Asistencia tecnica en gestion del riesgo de desastres y adaptacion al cambio climatico.", feedback: "No corresponde a la cadena PEI-POI del caso Cuna Mas." },
];

const scdActivities: Activity[] = [
  { id: "0107180", badge: "AO", correct: true, text: "Atencion integral durante el cuidado diurno", unit: "Nino", annualGoal: 67387, annualCost: 342652838, feedback: "Correcto. Es la actividad central de entrega del Servicio de Cuidado Diurno." },
  { id: "0394350", badge: "AO", correct: true, text: "Mantenimiento de locales para el cuidado diurno", unit: "Local", annualGoal: 1153, annualCost: 14193984, feedback: "Correcto. Contribuye a mantener la capacidad operativa del servicio." },
  { id: "0394351", badge: "AO", correct: true, text: "Equipamiento de locales para el cuidado diurno", unit: "Local", annualGoal: 3539, annualCost: 43868944, feedback: "Correcto. Es una condicion habilitante para la prestacion del cuidado diurno." },
  { id: "0394352", badge: "AO", correct: true, text: "Acondicionamiento de locales para el cuidado diurno", unit: "Local", annualGoal: 398, annualCost: 21047800, feedback: "Correcto. Permite que los locales respondan a condiciones de atencion integral." },
  { id: "0107178-SCD", badge: "AO", correct: true, text: "Asistencia tecnica para la gestion y vigilancia comunitaria del cuidado diurno", unit: "Organizacion", annualGoal: 740, annualCost: 4498023 },
  { id: "0107179-SCD", badge: "AO", correct: true, text: "Capacitacion de equipos tecnicos y actores comunales del cuidado diurno", unit: "Persona capacitada", annualGoal: 27022, annualCost: 21880931 },
];

const safActivities: Activity[] = [
  { id: "0076319", badge: "AO", correct: true, text: "Visitas domiciliarias a familias en zonas rurales", unit: "Familia", annualGoal: 277283, annualCost: 438994447, feedback: "Correcto. Es la actividad central de entrega del Servicio de Acompanamiento a Familias." },
  { id: "0076320", badge: "AO", correct: true, text: "Sesiones de socializacion e interaprendizaje", unit: "Familia", annualGoal: 183020, annualCost: 41927581 },
  { id: "0107178-SAF", badge: "AO", correct: true, text: "Asistencia tecnica para la gestion y vigilancia comunitaria del acompanamiento familiar", unit: "Organizacion", annualGoal: 2329, annualCost: 7012043 },
  { id: "0107179-SAF", badge: "AO", correct: true, text: "Capacitacion de equipos tecnicos y actores comunales del acompanamiento familiar", unit: "Persona capacitada", annualGoal: 50290, annualCost: 45849022 },
];

const activityDistractors = [
  "Gestion de alta direccion del programa",
  "Implementacion de sistemas de tecnologia de informacion",
  "Conduccion de procesos de planeamiento, presupuesto y modernizacion",
  "Atencion de asesoramiento tecnico y juridico",
  "Supervision territorial de la gestion del programa",
  "Seguimiento y evaluacion del programa",
  "Diseno e implementacion de estrategia comunicacional",
];

export const activityOptions: Activity[] = [
  ...scdActivities,
  ...safActivities,
  ...activityDistractors.map((text, index) => ({
    id: `distractor-ao-${index + 1}`,
    text,
    correct: false,
    badge: "AO" as Badge,
    feedback: "Es una actividad de apoyo, gestion o soporte; no debe seleccionarse como actividad de linea vinculada a las AEI misionales.",
  })),
];

const inputDistractors = [
  "Subvencion monetaria bimestral",
  "Tarjetas de debito para usuarios",
  "Infraestructura vial",
  "Equipos para plataformas itinerantes PIAS",
  "Alimentos para escolares de primaria",
  "Modulos productivos agropecuarios",
  "Pension no contributiva",
  "Servicios de clasificacion socioeconomica SISFOH",
];

export const inputOptions: Option[] = [
  { id: "madre-cuidadora", text: "Madre Cuidadora", badge: "Servicio", correct: true, meta: "Principal" },
  { id: "madre-guia", text: "Madre Guia", badge: "Servicio", correct: true, meta: "Principal" },
  { id: "guia-familia", text: "Guia de Familia", badge: "Servicio", correct: true, meta: "Principal" },
  { id: "socia-cocina", text: "Socia de Cocina", badge: "Servicio", correct: true, meta: "Principal" },
  { id: "repartidor-alimentos", text: "Repartidor de Alimentos", badge: "Servicio", correct: true, meta: "Principal" },
  { id: "limpieza-vigilancia", text: "Apoyo de Limpieza y Vigilancia", badge: "Servicio", correct: true, meta: "Principal" },
  { id: "evaluacion-salud-actores", text: "Evaluacion y certificacion de salud fisica y mental de actores comunales", badge: "Servicio", correct: true },
  { id: "almuerzo", text: "Bienes alimentarios para almuerzo", badge: "Bien", correct: true, meta: "Principal" },
  { id: "alimentos-hierro", text: "Alimentos de origen animal ricos en hierro", badge: "Bien", correct: true, meta: "Principal" },
  { id: "materiales-juego", text: "Materiales y juguetes para aprendizaje, cuidado y juego", badge: "Bien", correct: true },
  { id: "materiales-higiene", text: "Materiales para higiene, descanso y cuidado saludable en el CIAI", badge: "Bien", correct: true },
  { id: "facilitador", text: "Facilitador/a comunitario/a para realizar la visita domiciliaria", badge: "Servicio", correct: true, meta: "Principal" },
  { id: "materiales-mensajes", text: "Materiales con mensajes y actividades de acompanamiento familiar", badge: "Bien", correct: true, meta: "Principal" },
  { id: "kit-familia", text: "Kit de la familia", badge: "Bien", correct: true, meta: "Principal" },
  { id: "kit-nina-nino", text: "Kit de la nina y nino", badge: "Bien", correct: true, meta: "Principal" },
  { id: "kit-gestante", text: "Kit de la gestante", badge: "Bien", correct: true },
  { id: "kit-facilitador", text: "Kit del/de la facilitador/a", badge: "Bien", correct: true },
  { id: "formatos-visita", text: "Formatos de acompanamiento a familias y registros de visita", badge: "Insumo", correct: true },
  ...inputDistractors.map((text, index) => ({
    id: `distractor-input-${index + 1}`,
    text,
    badge: "Insumo" as Badge,
    correct: false,
    feedback: "Este insumo pertenece a otra intervencion o no corresponde al servicio Cuna Mas analizado.",
  })),
];

export const procurementCases = [
  {
    id: "proc-1",
    title: "Servicio de Madre Cuidadora/Madre Guia",
    text: "El Programa Cuna Mas debe asegurar continuidad del cuidado diurno desde enero. El servicio requiere presencia diaria en Centros Infantiles de Atencion Integral, articulacion comunitaria y estandares de atencion a ninas y ninos de 6 a 36 meses. La necesidad esta prevista en el POI y debe estar incorporada en el Cuadro Multianual de Necesidades.",
    options: [
      "Programar la contratacion desde la formulacion del POI/CMN, consolidar la necesidad por ambito territorial, iniciar actuaciones preparatorias antes del inicio del ejercicio y asegurar continuidad del servicio.",
      "Esperar a que el servicio se interrumpa y recien formular el requerimiento.",
      "Contratar mensualmente montos pequenos para evitar un procedimiento mayor.",
      "Usar contratacion directa sin sustentar causal.",
    ],
    correctIndex: 0,
    feedback:
      "La estrategia adecuada es planificar oportunamente, consolidar la demanda y evitar interrupciones. La contratacion mensual fragmentada o tardia pone en riesgo el servicio.",
  },
  {
    id: "proc-2",
    title: "Bienes alimentarios para almuerzo y alimentos ricos en hierro",
    text: "El Servicio de Cuidado Diurno requiere dotar raciones alimentarias diarias. Los bienes deben estar disponibles desde el inicio de la atencion y deben cumplir condiciones nutricionales, oportunidad, inocuidad y abastecimiento territorial.",
    options: [
      "Planificar la adquisicion antes del inicio del servicio, definir especificaciones tecnicas nutricionales, estimar demanda anual/mensual, considerar entregas parciales y asegurar control de calidad.",
      "Comprar solo cuando se agoten los alimentos.",
      "Dividir artificialmente compras por centro para reducir montos.",
      "Adquirir productos sin especificaciones tecnicas nutricionales.",
    ],
    correctIndex: 0,
    feedback:
      "Los alimentos son criticos para la continuidad del servicio y requieren planificacion, especificaciones tecnicas, cronograma de entregas y control.",
  },
  {
    id: "proc-3",
    title: "Servicio de Facilitador/a comunitario/a",
    text: "El SAF requiere visitas domiciliarias periodicas a familias rurales. La actividad tiene alta dispersion territorial, necesidad de continuidad y coordinacion con familias y actores comunitarios.",
    options: [
      "Programar la contratacion antes del inicio del periodo de visitas, segmentar por ambitos territoriales, establecer perfiles y productos verificables, e iniciar con oportunidad para no perder semanas de acompanamiento.",
      "Iniciar contratacion despues del primer trimestre para tener mas informacion.",
      "Contratar sin definir productos ni mecanismos de verificacion.",
      "Fraccionar contrataciones por comunidad sin justificacion tecnica.",
    ],
    correctIndex: 0,
    feedback:
      "El acompanamiento familiar depende de continuidad y oportunidad. El retraso reduce cobertura y afecta la meta fisica.",
  },
  {
    id: "proc-4",
    title: "Kits SAF",
    text: "El Programa debe entregar kits vinculados al acompanamiento familiar, incluyendo materiales para la familia, nina/nino, gestante y facilitador/a. La entrega debe estar disponible para iniciar las sesiones y visitas.",
    options: [
      "Planificar adquisicion en el CMN, consolidar demanda, definir fichas tecnicas de bienes, programar entregas por territorio y prever almacenamiento/distribucion.",
      "Comprar los kits despues de iniciar las visitas, sin cronograma de distribucion.",
      "Reemplazar los kits por cualquier material disponible, sin relacion con el servicio.",
      "Dividir artificialmente la adquisicion para evitar controles.",
    ],
    correctIndex: 0,
    feedback:
      "Los kits son insumos de la prestacion; deben planificarse, adquirirse y distribuirse oportunamente para no afectar la calidad del acompanamiento.",
  },
];

export const costCards = [
  { label: "Atencion integral durante el cuidado diurno", amount: 342652838 },
  { label: "Visitas domiciliarias a familias en zonas rurales", amount: 438994447 },
  { label: "Servicio de Cuidado Diurno total", amount: 448142520 },
  { label: "Servicio de Acompanamiento a Familias total", amount: 533783093 },
];
