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
        title="Simplemente es el concurso de programación más antiguo, el más grande y el más importante"
        kicker="¿Qué es el ICPC?"
        images={[
          { src: "/images/event.png", alt: "Equipo 1" },
          { src: "/images/medals.png", alt: "Equipo 2" },
          { src: "/images/registration1.png", alt: "Equipo 3" },
          { src: "/images/trophy.png", alt: "Equipo 4" },
          { src: "/images/champions.png", alt: "Equipo 5" },
          { src: "/images/team.png", alt: "Equipo 6" },
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

      <section id="what-is" className="snap-start min-h-screen grid place-items-center px-6 bg-slate-200">
        <div className="max-w-4xl">
          <h2 className="font-heading text-4xl md:text-5xl font-semibold">En que consiste</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Aqui voy a usar mi wrapper
          </p>
        </div>
      </section>

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