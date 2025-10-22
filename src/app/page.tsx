import QuestionConvergeSection from "@/components/sections/QuestionConvergeSection";
import HeroSection from "@/components/sections/HeroSection";
import TerminalStatsSection from "@/components/sections/TerminalStatsSection";
import GlitchStatsSection from "@/components/sections/GlitchStatsSection";
import ModernStatsSection from "@/components/sections/ModernStatsSection";
import ParticipantsSection from "@/components/sections/ParticipantsSection";

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
        id="50_000"
        title="50,000"
        description="estudiantes cada año"
        image="/images/glocal_icpc_statistics/50_000_students.png"
      />

      <TerminalStatsSection
        id="3_000"
        title="3,000"
        description="universidades en 11 paises"
        image="/images/glocal_icpc_statistics/50_000_students.png"
      />

      <GlitchStatsSection
        id="400"
        title="+400"
        description="competiciones locales"
        image="/images/glocal_icpc_statistics/50_000_students.png"
      />

      {/* Segunda converge section, cual es el desafio */}
      <QuestionConvergeSection
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

      <section
        id="where-are-we"
        className="snap-start min-h-screen grid place-items-center px-6 bg-slate-300"
      >
        <div className="max-w-4xl">
          <h2 className="font-heading text-4xl md:text-5xl font-semibold">
            ¿Dónde estamos?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            ver como ponemos la data
          </p>
        </div>
      </section>

      <section
        id="next-objective"
        className="snap-start min-h-screen grid place-items-center px-6 bg-slate-200"
      >
        <div className="max-w-4xl">
          <h2 className="font-heading text-4xl md:text-5xl font-semibold">
            Próximo objetivo
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            ver como ponemos la data
          </p>
        </div>
      </section>

      <ParticipantsSection />
    </main>
  );
}
