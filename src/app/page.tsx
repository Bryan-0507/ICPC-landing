import QuestionConvergeSection from "@/components/sections/QuestionConvergeSection";

export default function Page() {
  return (
    <main className="snap-y snap-mandatory">
      <section id="intro" className="snap-start min-h-screen grid place-items-center px-6 bg-slate-200">
        <div className="max-w-4xl">
          <h2 className="font-heading text-4xl md:text-5xl font-semibold">HERO</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            IMAGEN DE HUGUITO CON OTRAS COSAS
          </p>
        </div>
      </section>

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

      <section id="statistics" className="snap-start min-h-screen grid place-items-center px-6 bg-slate-300">
        <div className="max-w-4xl">
          <h2 className="font-heading text-4xl md:text-5xl font-semibold">DATA ESTADISTICA</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            AQUI PONDREMOS LOS DATOS
          </p>
        </div>
      </section>

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

      <section id="where-are-we" className="snap-start min-h-screen grid place-items-center px-6 bg-slate-300">
        <div className="max-w-4xl">
          <h2 className="font-heading text-4xl md:text-5xl font-semibold">¿Dónde estamos?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            ver como ponemos la data
          </p>
        </div>
      </section>

      <section id="next-objective" className="snap-start min-h-screen grid place-items-center px-6 bg-slate-200">
        <div className="max-w-4xl">
          <h2 className="font-heading text-4xl md:text-5xl font-semibold">Próximo objetivo</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            ver como ponemos la data
          </p>
        </div>
      </section>

      <section id="participants" className="snap-start min-h-screen grid place-items-center px-6 bg-slate-300">
        <div className="max-w-4xl">
          <h2 className="font-heading text-4xl md:text-5xl font-semibold">Participantes</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Grid con filtros y equipos
          </p>
        </div>
      </section>
    </main>
  );
}