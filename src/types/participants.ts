export type University = "UVG" | "Landívar" | "UNIS" | "USAC";

export type TeamMember = {
  name: string;
  role: "Competidor" | "Coach";
  image: string;
};

export type Team = {
  id: string;
  name: string;
  university: University;
  score: number;
  members: TeamMember[];
  description?: string;
};

export const UNIVERSITY_COLORS: Record<University, { primary: string; secondary: string; text: string }> = {
  UNIS: {
    primary: "#0C4A6E", // Dark blue
    secondary: "#0EA5E9", // Sky blue
    text: "#FFFFFF"
  },
  USAC: {
    primary: "#7C2D12", // Dark red
    secondary: "#EF4444", // Red
    text: "#FFFFFF"
  },
  UVG: {
    primary: "#065F46", // Dark green
    secondary: "#10B981", // Green
    text: "#FFFFFF"
  },
  Landívar: {
    primary: "#1E3A8A", // Dark blue
    secondary: "#3B82F6", // Blue
    text: "#FFFFFF"
  }
};

