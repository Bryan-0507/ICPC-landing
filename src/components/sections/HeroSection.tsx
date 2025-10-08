import Image from "next/image";

type Props = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export default function HeroSection({ id, title, description, image }: Props) {
  return (
    <section
      id={id}
      className="snap-start min-h-screen grid place-items-center px-6 bg-slate-200 relative"
    >
      <Image
        alt="Hero"
        src={image}
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
      />
      <div className="w-full h-full bg-black absolute opacity-50"></div>

      <div className="max-w-4xl relative z-50">
        <h2 className="font-heading text-4xl md:text-9xl font-bold text-center  text-gray-200">
          {title}
        </h2>
        <p className="mt-4 text-sm text-center text-gray-200">{description}</p>
      </div>
    </section>
  );
}
