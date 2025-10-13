import type { Team } from "@/types/participants";

export const TEAMS: Team[] = [
  // UVG Teams
  {
    id: "uvg-1",
    name: "Code Warriors",
    university: "UVG",
    score: 950,
    members: [
      { name: "Ana García", role: "Competidor", image: "/images/participants/placeholder-1.jpg" },
      { name: "Carlos Ruiz", role: "Competidor", image: "/images/participants/placeholder-2.jpg" },
      { name: "María López", role: "Competidor", image: "/images/participants/placeholder-3.jpg" },
      { name: "Dr. Roberto Méndez", role: "Coach", image: "/images/participants/placeholder-4.jpg" }
    ],
    description: "Equipo enfocado en algoritmos de grafos y programación dinámica."
  },
  {
    id: "uvg-2",
    name: "Binary Ninjas",
    university: "UVG",
    score: 880,
    members: [
      { name: "Diego Hernández", role: "Competidor", image: "/images/participants/placeholder-5.jpg" },
      { name: "Sofia Morales", role: "Competidor", image: "/images/participants/placeholder-6.jpg" },
      { name: "Luis Castro", role: "Competidor", image: "/images/participants/placeholder-7.jpg" },
      { name: "Dra. Carmen Flores", role: "Coach", image: "/images/participants/placeholder-8.jpg" }
    ],
    description: "Especialistas en estructuras de datos avanzadas y optimización."
  },
  {
    id: "uvg-3",
    name: "Algorithm Masters",
    university: "UVG",
    score: 820,
    members: [
      { name: "Pedro Sánchez", role: "Competidor", image: "/images/participants/placeholder-9.jpg" },
      { name: "Laura Ramírez", role: "Competidor", image: "/images/participants/placeholder-10.jpg" },
      { name: "Jorge Díaz", role: "Competidor", image: "/images/participants/placeholder-11.jpg" },
      { name: "Ing. Alberto Cruz", role: "Coach", image: "/images/participants/placeholder-12.jpg" }
    ],
    description: "Equipo con fuerte enfoque en matemáticas aplicadas."
  },

  // Landívar Teams
  {
    id: "landivar-1",
    name: "Red Dragons",
    university: "Landívar",
    score: 920,
    members: [
      { name: "Gabriela Torres", role: "Competidor", image: "/images/participants/placeholder-13.jpg" },
      { name: "Roberto Silva", role: "Competidor", image: "/images/participants/placeholder-14.jpg" },
      { name: "Valeria Ortiz", role: "Competidor", image: "/images/participants/placeholder-15.jpg" },
      { name: "Lic. Manuel Pérez", role: "Coach", image: "/images/participants/placeholder-16.jpg" }
    ],
    description: "Expertos en teoría de números y geometría computacional."
  },
  {
    id: "landivar-2",
    name: "Crimson Coders",
    university: "Landívar",
    score: 860,
    members: [
      { name: "Andrea Gómez", role: "Competidor", image: "/images/participants/placeholder-17.jpg" },
      { name: "Fernando Reyes", role: "Competidor", image: "/images/participants/placeholder-18.jpg" },
      { name: "Carolina Vega", role: "Competidor", image: "/images/participants/placeholder-19.jpg" },
      { name: "Dr. Ernesto Mejía", role: "Coach", image: "/images/participants/placeholder-20.jpg" }
    ],
    description: "Equipo equilibrado con experiencia en competencias internacionales."
  },
  {
    id: "landivar-3",
    name: "Phoenix Programmers",
    university: "Landívar",
    score: 795,
    members: [
      { name: "Rodrigo Pacheco", role: "Competidor", image: "/images/participants/placeholder-21.jpg" },
      { name: "Isabella Fuentes", role: "Competidor", image: "/images/participants/placeholder-22.jpg" },
      { name: "Marcos Aguilar", role: "Competidor", image: "/images/participants/placeholder-23.jpg" },
      { name: "Ing. Patricia Muñoz", role: "Coach", image: "/images/participants/placeholder-24.jpg" }
    ],
    description: "Debutantes con gran potencial en algoritmos recursivos."
  },

  // UNIS Teams
  {
    id: "unis-1",
    name: "Green Giants",
    university: "UNIS",
    score: 1000,
    members: [
      { name: "Sebastián Campos", role: "Competidor", image: "/images/participants/placeholder-25.jpg" },
      { name: "Daniela Rojas", role: "Competidor", image: "/images/participants/placeholder-26.jpg" },
      { name: "Miguel Ángel Vargas", role: "Competidor", image: "/images/participants/placeholder-27.jpg" },
      { name: "Dr. Francisco León", role: "Coach", image: "/images/participants/placeholder-28.jpg" }
    ],
    description: "Líderes en el ranking con amplia experiencia en ICPC."
  },
  {
    id: "unis-2",
    name: "Emerald Knights",
    university: "UNIS",
    score: 910,
    members: [
      { name: "Camila Estrada", role: "Competidor", image: "/images/participants/placeholder-29.jpg" },
      { name: "Alejandro Moreno", role: "Competidor", image: "/images/participants/placeholder-30.jpg" },
      { name: "Victoria Herrera", role: "Competidor", image: "/images/participants/placeholder-31.jpg" },
      { name: "Ing. Sandra Guzmán", role: "Coach", image: "/images/participants/placeholder-32.jpg" }
    ],
    description: "Especialistas en problemas de strings y algoritmos de búsqueda."
  },
  {
    id: "unis-3",
    name: "Forest Coders",
    university: "UNIS",
    score: 840,
    members: [
      { name: "Ernesto Cordero", role: "Competidor", image: "/images/participants/placeholder-33.jpg" },
      { name: "Natalia Álvarez", role: "Competidor", image: "/images/participants/placeholder-34.jpg" },
      { name: "Ricardo Navarro", role: "Competidor", image: "/images/participants/placeholder-35.jpg" },
      { name: "Lic. Héctor Jiménez", role: "Coach", image: "/images/participants/placeholder-36.jpg" }
    ],
    description: "Equipo con enfoque en backtracking y branch and bound."
  },

  // USAC Teams
  {
    id: "usac-1",
    name: "Blue Thunder",
    university: "USAC",
    score: 970,
    members: [
      { name: "Pablo Castillo", role: "Competidor", image: "/images/participants/placeholder-37.jpg" },
      { name: "Elena Martínez", role: "Competidor", image: "/images/participants/placeholder-38.jpg" },
      { name: "Javier Mendoza", role: "Competidor", image: "/images/participants/placeholder-39.jpg" },
      { name: "Dr. Gustavo Rosales", role: "Coach", image: "/images/participants/placeholder-40.jpg" }
    ],
    description: "Equipo versátil con experiencia en múltiples paradigmas de programación."
  },
  {
    id: "usac-2",
    name: "Sapphire Squad",
    university: "USAC",
    score: 890,
    members: [
      { name: "Mónica Paredes", role: "Competidor", image: "/images/participants/placeholder-41.jpg" },
      { name: "Daniel Ochoa", role: "Competidor", image: "/images/participants/placeholder-42.jpg" },
      { name: "Patricia Sandoval", role: "Competidor", image: "/images/participants/placeholder-43.jpg" },
      { name: "Ing. Oscar Ramírez", role: "Coach", image: "/images/participants/placeholder-44.jpg" }
    ],
    description: "Especialistas en divide and conquer y greedy algorithms."
  },
  {
    id: "usac-3",
    name: "Azure Algorithms",
    university: "USAC",
    score: 810,
    members: [
      { name: "Cristian Barrios", role: "Competidor", image: "/images/participants/placeholder-45.jpg" },
      { name: "Lucía Delgado", role: "Competidor", image: "/images/participants/placeholder-46.jpg" },
      { name: "Andrés Molina", role: "Competidor", image: "/images/participants/placeholder-47.jpg" },
      { name: "Dra. Julia Montes", role: "Coach", image: "/images/participants/placeholder-48.jpg" }
    ],
    description: "Equipo emergente con gran potencial competitivo."
  },
];
