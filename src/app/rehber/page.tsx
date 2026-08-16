import Header from "@/components/Header";
import GuideBoard from "@/components/GuideBoard";

export default function RehberPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-8 sm:py-16">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Saha Rehberi
        </h1>
        <p className="mt-2 text-sm text-muted">
          Jeolojiden dere okumaya, doğru panlama tekniğine kadar sahada işine
          yarayacak temel bilgiler.
        </p>

        <div className="mt-8">
          <GuideBoard />
        </div>
      </main>
    </>
  );
}
