export default function Hero() {
  return (
    <section className="bg-primary px-4 py-20 md:py-28 flex flex-col items-center justify-center">
      <h1 className="text-white text-[44px] font-bold text-center leading-tight max-w-3xl">
        Iglesia Santidad a Jehovah
      </h1>
      <p className="text-text-light text-[17px] text-center mt-4 max-w-xl">
        "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en Él cree no se pierda, mas tenga vida eterna." — Juan 3:16
      </p>
      <a
        href="#"
        className="mt-8 inline-flex items-center gap-2 bg-accent text-primary font-semibold px-6 py-3 rounded-full text-sm no-underline hover:opacity-90 transition-opacity"
      >
        🔴 Ver transmisión en vivo
      </a>
    </section>
  );
}
