/**
 * Utilidades para la sección de participantes
 */

import type { Team, University } from "@/types/participants";

/**
 * Calcula el ranking de un equipo basado en su puntuación
 */
export function calculateRanking(teams: Team[], teamId: string): number {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  return sortedTeams.findIndex(t => t.id === teamId) + 1;
}

/**
 * Obtiene los equipos por universidad
 */
export function getTeamsByUniversity(teams: Team[], university: University): Team[] {
  return teams.filter(team => team.university === university);
}

/**
 * Calcula estadísticas generales de los equipos
 */
export function calculateTeamStats(teams: Team[]) {
  const totalTeams = teams.length;
  const totalParticipants = teams.reduce(
    (sum, team) => sum + team.members.filter((m) => m.role === "Competidor").length,
    0
  );
  const totalCoaches = teams.reduce(
    (sum, team) => sum + team.members.filter((m) => m.role === "Coach").length,
    0
  );
  const avgScore = Math.round(teams.reduce((sum, team) => sum + team.score, 0) / teams.length);
  const maxScore = Math.max(...teams.map(team => team.score));
  const minScore = Math.min(...teams.map(team => team.score));

  return {
    totalTeams,
    totalParticipants,
    totalCoaches,
    avgScore,
    maxScore,
    minScore,
  };
}

/**
 * Obtiene el top N equipos por puntuación
 */
export function getTopTeams(teams: Team[], count: number = 5): Team[] {
  return [...teams]
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
}

/**
 * Filtra y ordena equipos según criterios
 */
export function filterAndSortTeams(
  teams: Team[],
  university: University | "all",
  sortBy: "score" | "alphabetical"
): Team[] {
  let filteredTeams = university === "all" 
    ? teams 
    : teams.filter(team => team.university === university);

  if (sortBy === "score") {
    filteredTeams = [...filteredTeams].sort((a, b) => b.score - a.score);
  } else {
    filteredTeams = [...filteredTeams].sort((a, b) => a.name.localeCompare(b.name));
  }

  return filteredTeams;
}

/**
 * Obtiene las estadísticas por universidad
 */
export function getUniversityStats(teams: Team[], university: University) {
  const universityTeams = getTeamsByUniversity(teams, university);
  const stats = calculateTeamStats(universityTeams);
  const bestTeam = universityTeams.reduce((best, current) => 
    current.score > best.score ? current : best
  );

  return {
    ...stats,
    bestTeam,
  };
}

/**
 * Genera un color aleatorio de la paleta del tema
 */
export function getRandomThemeColor(): string {
  const colors = ["#5459ab", "#52357b", "#648db3"];
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Formatea el número de puntos con separadores
 */
export function formatScore(score: number): string {
  return score.toLocaleString("es-GT");
}

/**
 * Obtiene las iniciales de un nombre
 */
export function getInitials(name: string): string {
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}
