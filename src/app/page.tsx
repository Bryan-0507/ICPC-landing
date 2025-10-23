import QuestionConvergeSection from "@/components/sections/QuestionConvergeSection";
import HeroSection from "@/components/sections/HeroSection";
import TerminalStatsSection from "@/components/sections/TerminalStatsSection";
import GlitchStatsSection from "@/components/sections/GlitchStatsSection";
import ModernStatsSection from "@/components/sections/ModernStatsSection";
import ParticipantsSection from "@/components/sections/ParticipantsSection";
import WhereWeAreSection from "@/components/sections/WhereWeAreSection";
import Footer from "@/components/shared/Footer";

export default function Page() {
  return (
    <main className="snap-y snap-mandatory">
      <HeroSection
        id="hero"
        title="ICPC"
        description="Digno desafio desde el salón de clases hasta la final."
        image="/images/hero.jpg"
      />

      {/* Primer converge section, solo como intro */}
      <QuestionConvergeSection
        id="que-es-icpc"
        title="El concurso de programación más antiguo, el más grande y el más importante"
        kicker="¿Qué es el ICPC?"
        images={[
          { src: "/images/what_is_icpc/event.png" },
          { src: "/images/what_is_icpc/medals.png" },
          { src: "/images/what_is_icpc/registration1.png" },
          { src: "/images/what_is_icpc/trophy.png" },
          { src: "/images/what_is_icpc/champions.png" },
          { src: "/images/what_is_icpc/team.png" },
        ]}
      />

      <ModernStatsSection
        id="estadisticas"
        title="50,000"
        description="estudiantes cada año"
        image="/images/glocal_icpc_statistics/50_000_students.png"
      />

      <TerminalStatsSection
        id="universidades"
        title="3,000"
        description="universidades en 11 paises"
        image="/images/glocal_icpc_statistics/300_universities.png"
      />

      <GlitchStatsSection
        id="competiciones"
        title="+400"
        description="competiciones locales"
        image="/images/glocal_icpc_statistics/400_competitions.png"
      />

      {/* Segunda converge section, cual es el desafio */}
      <QuestionConvergeSection
        id="desafio"
        title="Equipos de tres integrantes compiten contra el reloj para resolver problemas algorítmicos"
        kicker="¿Cuál es el desafío?"
        images={[
          { src: "/images/what_is_challenge/team1.jpg" },
          { src: "/images/what_is_challenge/team2.jpg" },
          { src: "/images/what_is_challenge/team3.jpg" },
          { src: "/images/what_is_challenge/team4.jpg" },
          { src: "/images/what_is_challenge/team5.jpg" },
          { src: "/images/what_is_challenge/team6.jpg" },
        ]}
      />

      {/* Sección de Dónde Estamos */}
      <WhereWeAreSection />

      {/* Particpantes */}
      <ParticipantsSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
