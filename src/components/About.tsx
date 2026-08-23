export default function About() {
  return (
    <section id="hakkinda" className="border-t border-border px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Sahadan gelen bilgi, doğru kaynakla{" "}
            <span className="text-accent">değer kazanır</span>.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            KırıntıMadencilik.com; kaynağı belli jeolojik veriyi, kişisel
            saha notlarını ve gerçek kullanıcı deneyimini aynı yerde
            buluşturur. Platformun amacı, kırıntı madenciliği hobisine ilgi
            duyanların araştırma yapabildiği, öğrendiklerini kayıt altına
            alabildiği ve isterse toplulukla deneyim paylaşabildiği
            güvenilir bir dijital merkez oluşturmaktır.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { title: "Kaynak", desc: "Jeolojik kayıtların dayanağını görebil." },
            { title: "Gizlilik", desc: "Kişisel keşiflerini paylaşmak zorunda değilsin." },
            { title: "Saha", desc: "Teoriyi gerçek saha deneyimiyle birleştir." },
            { title: "Topluluk", desc: "Deneyimi paylaş, bilgiyi büyüt." },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-surface-2 p-5"
            >
              <h3 className="text-sm font-semibold text-accent">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
