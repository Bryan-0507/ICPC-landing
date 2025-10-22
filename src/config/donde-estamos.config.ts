/**
 * Configuration for the "Dónde Estamos" section
 */

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
}

export interface Country {
  name: string;
  flag: string;
  yearJoined: number;
  teams: number;
  universities: number;
  problemsSolved: number;
  highlights: string[];
}

export interface Achievement {
  label: string;
  value: number;
  suffix?: string;
  icon: string;
  gradient: string;
}

export interface ClassificationStep {
  title: string;
  date: string;
  description: string;
  icon: string; // Lucide icon name
  details: string[];
  status?: "completed" | "cancelled" | "pending" | "upcoming";
}

export const DONDE_ESTAMOS_CONFIG = {
  timeline: [
    { year: "1977", title: "Nacimiento de ICPC", description: "Fundación del International Collegiate Programming Contest como competencia mundial de programación universitaria.", icon: "Globe" },
    { year: "1996", title: "Primera Final Latinoamericana", description: "Se establece la región LATAM (Latinoamérica) con la primera competencia regional en Buenos Aires, Argentina.", icon: "MapPin" },
    { year: "2000", title: "Guatemala se Incorpora", description: "Guatemala se convierte en el primer país centroamericano en participar en ICPC LATAM.", icon: "Flag" },
    { year: "2005", title: "Costa Rica se Une", description: "Costa Rica comienza su participación oficial en el clasificatorio regional ICPC.", icon: "Flag" },
    { year: "2009", title: "Expansión Regional", description: "Centroamérica consolida su presencia con múltiples universidades participantes de la región.", icon: "TrendingUp" },
    { year: "2016", title: "El Salvador Participa", description: "El Salvador se incorpora formalmente al clasificatorio ICPC Centroamérica.", icon: "Flag" },
    { year: "2017", title: "Crecimiento Sostenido", description: "Centroamérica alcanza más de 20 universidades y 60+ equipos participantes en el clasificatorio regional.", icon: "Rocket" },
    { year: "2020", title: "Adaptación Virtual", description: "Durante la pandemia, el clasificatorio se adapta a formato virtual manteniendo la competencia activa.", icon: "Laptop" },
    { year: "2023", title: "Retorno Presencial", description: "Regreso exitoso al formato presencial con sedes distribuidas en toda Centroamérica.", icon: "Trophy" },
    { year: "2024", title: "TEC Alajuela en World Finals", description: "Equipo del Tecnológico de Costa Rica (Alajuela) clasifica a la Final Mundial ICPC 2024 en Kazajistán.", icon: "Target" },
    { year: "2025", title: "Clasificatorio CA-ICPC 2025", description: "95 equipos de 23 universidades compiten en el clasificatorio regional Centroamérica.", icon: "Zap" },
      ] satisfies TimelineEvent[],

  achievements: [
    { label: "Equipos Participantes", value: 95, icon: "Users", gradient: "from-blue-500 to-cyan-500" },
    { label: "Universidades", value: 23, icon: "GraduationCap", gradient: "from-purple-500 to-pink-500" },
    { label: "Competidores", value: 285, suffix: "+", icon: "Code2", gradient: "from-green-500 to-emerald-500" },
    { label: "Problemas Resueltos", value: 541, icon: "CheckCircle2", gradient: "from-orange-500 to-red-500" },
    { label: "Fechas de Competencia", value: 6, icon: "Calendar", gradient: "from-indigo-500 to-blue-500" },
    { label: "Equipos Clasificados", value: 52, icon: "Award", gradient: "from-yellow-500 to-amber-500" },
  ] satisfies Achievement[],

  countries: [
    { name: "Costa Rica", flag: "MapPinned", yearJoined: 2005, teams: 31, universities: 5, problemsSolved: 201, highlights: ["TEC Alajuela clasificó a World Finals 2024 (Kazajistán)", "TEC Alajuela clasificó a World Finals 2025 (Egipto)", "Universidad de Costa Rica con participación constante desde 2005", "Sede de múltiples clasificatorios regionales"] },
    { name: "Guatemala", flag: "MapPinned", yearJoined: 2000, teams: 36, universities: 9, problemsSolved: 189, highlights: ["Primer país centroamericano en participar (2000)", "Universidad del Valle de Guatemala líder histórico", "Mayor número de universidades participantes", "Universidad de San Carlos con equipos competitivos"] },
    { name: "El Salvador", flag: "MapPinned", yearJoined: 2016, teams: 28, universities: 9, problemsSolved: 151, highlights: ["Incorporación formal en 2016", "UCA y Don Bosco lideran participación", "Crecimiento sostenido año tras año", "Nueve universidades activamente participando"] },
  ] satisfies Country[],

  classificationPath: [
    { title: "1a Fecha MX", date: "03 de Mayo 2025", description: "Clasificatorio al Gran Premio CA", icon: "Calendar", details: [], status: "completed" },
    { title: "UTP Open", date: "17 de Mayo 2025", description: "Competencia UTP Open", icon: "Trophy", details: [], status: "completed" },
    { title: "2a Fecha MX", date: "31 de Mayo 2025", description: "Clasificatorio al Gran Premio CA", icon: "CalendarX", details: ["Cancelado"], status: "cancelled" },
    { title: "3a Fecha MX", date: "21 de Junio 2025", description: "Clasificatorio al Gran Premio CA", icon: "Calendar", details: [], status: "completed" },
    { title: "Nueva fecha MX", date: "23 de Agosto 2025", description: "Clasificatorio al Gran Premio CA", icon: "CalendarCheck", details: ["Resultados muy pronto!"], status: "completed" },
    { title: "Repechaje BR", date: "13 de Septiembre 2025", description: "Fecha de repechaje en Brasil", icon: "RefreshCw", details: [], status: "completed" },
    { title: "Gran Premio CA", date: "8 de noviembre de 2025", description: "Gran Premio Centroamérica - Final Regional", icon: "Award", details: [], status: "upcoming" },
  ] satisfies ClassificationStep[],

  topUniversities: [
    { name: "Tecnológico de Costa Rica - Alajuela", country: "Costa Rica", teams: 3, bestRank: 1, worldFinals: true, achievements: "Clasificados a World Finals 2024 y 2025" },
    { name: "Universidad del Valle de Guatemala", country: "Guatemala", teams: 7, bestRank: 2, achievements: "Líder histórico de Guatemala en ICPC" },
    { name: "Universidad Centroamericana (UCA)", country: "El Salvador", teams: 6, bestRank: 8, achievements: "Mayor participación de El Salvador" },
  ],

  animations: {
    entryDuration: 0.5,
    staggerDelay: 0.06,
    scrollTriggerStart: "top 80%",
  },

  metadata: {
    lastUpdated: "2025-01-15",
    sources: ["ClasificatorioCA-ICPC2025.csv (95 teams, 23 universities)", "icpclatam.org (historical timeline 1996-2025)", "ICPC Argentina Rules 2024-2025 (LAC classification)", "cphof.org (World Finals results)", "TEC Alajuela official announcements (World Finals 2024/2025)", "Universidad del Valle de Guatemala historical records", "UCA El Salvador participation data"],
    coverage: "Central America (Costa Rica, Guatemala, El Salvador)",
    period: "2000-2025",
  },
};
