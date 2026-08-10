export default function About() {
  return (
    <section id="hakkinda" className="border-t border-border px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Küçük kırıntılar, <span className="text-accent">büyük birikim</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            Kırıntı Madencilik, saha tecrübesini ve dijital bilgiyi bir araya
            getiren bağımsız bir topluluk girişimidir. Amacımız; madenlerde
            çalışan, bu alanda yatırım yapan ya da sektöre yeni adım atan
            herkesin doğru bilgiye kolayca ulaşabildiği, güvenilir ve şeffaf
            bir platform oluşturmak.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { title: "Şeffaflık", desc: "Doğrulanabilir ve açık bilgi paylaşımı" },
            { title: "Deneyim", desc: "Sahadan gelen gerçek tecrübeler" },
            { title: "Dayanışma", desc: "Birbirine destek olan bir ağ" },
            { title: "Erişim", desc: "Herkes için ücretsiz üyelik" },
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
