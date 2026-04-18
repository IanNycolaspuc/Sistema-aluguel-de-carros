import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
const faqData = [
  {
    q: "Quais documentos são necessários para alugar um carro?",
    a: "Para alugar um carro, você precisará de CNH válida emitida há mais de 2 anos, documento de identidade, cartão de crédito com limite suficiente para o bloqueio da caução e comprovante de residência. Em alguns casos, a Permissão Internacional para Dirigir (PID) pode ser exigida."
  },
  {
    q: "Como funciona a caução no aluguel de carros?",
    a: "A caução é um valor pré-autorizado no seu cartão de crédito como garantia durante o aluguel. Esse valor é liberado automaticamente após a devolução do veículo sem avarias ou pendências."
  },
  {
    q: "O que está incluso na diária de aluguel de um carro?",
    a: "A diária geralmente inclui o uso do veículo, quilometragem livre ou limitada (conforme plano escolhido), seguro básico obrigatório e assistência 24h. Adicionais como GPS, cadeirinha infantil e proteções extras podem ser contratados."
  },
  {
    q: "Como funcionam os seguros dos carros alugados?",
    a: "Os veículos possuem seguro básico incluso. Você pode contratar proteções adicionais para cobertura total contra colisão, roubo, danos a terceiros e vidros, garantindo maior tranquilidade durante o período de locação."
  },
  {
    q: "Como incluir um cupom de desconto na reserva?",
    a: "Na tela de finalização da reserva, há um campo específico para inserir o código do cupom. O desconto é aplicado automaticamente no valor total antes da confirmação do pagamento."
  },
  {
    q: "Vale a pena alugar com a CIEL Cars?",
    a: "Sim! Oferecemos os melhores preços comparando diversas locadoras, atendimento especializado em português, cashback nas reservas e suporte 7 dias por semana para garantir a melhor experiência no seu aluguel."
  }
];

const destinations = [
  "São Paulo", "Rio de Janeiro", "Belo Horizonte", "Brasília",
  "Curitiba", "Salvador", "Recife", "Fortaleza",
  "Manaus", "Goiânia", "Porto Alegre", "Teresina"

  

];


const destinosInspiracao = [
  { nome: "Ouro Preto", estado: "MINAS GERAIS", img: "https://blog.123milhas.com/wp-content/uploads/2022/08/conheca-o-estado-de-minas-gerais-historia-turismo-e-mais-conexao123.jpg" },
  { nome: "Barra Grande", estado: "PIAUÍ", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/39/56/b6/ma-vale-muito-apenas.jpg?w=900&h=-1&s=1" },
  { nome: "Chapada das Mesas", estado: "MARANHÃO", img: "https://www.umviajante.com.br/wp-content/uploads/2019/09/chapada-das-mesas-maranhao-023.jpg" },
  { nome: "Fortaleza", estado: "CEARÁ", img: "https://images.trvl-media.com/place/6142832/917c6b31-1da4-4e62-9869-79b2c991dec8.jpg" },
    { nome: "Belo Horizonte", estado: "MINAS GERAIS", img: "https://content.r9cdn.net/rimg/dimg/ec/dc/35e2faf0-city-10930-17b1a6be790.jpg?width=1200&height=630&xhint=1400&yhint=972&crop=true" },

  { nome: "Chapada Diamantina", estado: "BAHIA", img: "https://bhecoturismo.com.br/wp-content/uploads/2021/10/cats-3-1-1200x600.jpg" },

  { nome: "Fernando de Noronha", estado: "PERNAMBUCO", img: "https://s2-g1.glbimg.com/gSSqAapiqbt6ehgJi_8OwmQ4Wcg=/4160x0/filters:format(jpeg)/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2025/W/e/zfLViqTniY5lNSAuWJfg/fernando-de-noronha-aarea-2-cristiano-regis.jpg" },
];



const partners = ["Localiza", "Movida", "Unidas", "Hertz", "Avis", "Budget", "Foco", "Interlocadora"];

export default function Landing() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const heroSlides = [
    {
      title: "Aluguel de carros fácil e do seu jeito.",
      sub: "Explore o Brasil com liberdade e economia.",
      img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80"
    },
    {
      title: "Viaje mais pagando menos ",
      sub: "Compare preços em centenas de locadoras.",
      img: "https://dicas.olx.com.br/wp-content/uploads/2023/11/melhores-carros-para-pegar-estrada-2023.jpg"
    },
    {
      title: "Carro por assinatura sem burocracia",
      sub: "Sem IPVA, sem manutenção e sem dor de cabeça.",
      img: "https://autoinforme.com.br/wp-content/uploads/2015/03/Land-Rover_Discovery-Sport_Frentlat2_2015.jpg"
    }
  ];

const [currentSlide, setCurrentSlide] = useState(0);

const [carouselIndex, setCarouselIndex] = useState(0);
const visibleCount = 4;
const maxIndex = destinosInspiracao.length - visibleCount;
const prevCarousel = () => setCarouselIndex(i => Math.max(i - 1, 0));
const nextCarousel = () => setCarouselIndex(i => Math.min(i + 1, maxIndex));
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);



// indicadores da empresa //

const [counters, setCounters] = useState({
  locadoras: 0,
  veiculos: 0,
  clientes: 0,
});

useEffect(() => {
  const targets = {
    locadoras: 350,
    veiculos: 12000,
    clientes: 500000,
  };

  const duration = 2000;
  const delay = 2500; // pausa entre animações

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const startAnimation = () => {
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = easeOutCubic(progress);

      setCounters({
        locadoras: Math.floor(targets.locadoras * easedProgress),
        veiculos: Math.floor(targets.veiculos * easedProgress),
        clientes: Math.floor(targets.clientes * easedProgress),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    // reset antes de animar
    setCounters({ locadoras: 0, veiculos: 0, clientes: 0 });
    requestAnimationFrame(animate);
  };

  // roda imediatamente
  startAnimation();

  // roda em loop (anima + pausa)
  const interval = setInterval(startAnimation, duration + delay);

  return () => clearInterval(interval);
}, []);

  return (
    <div style={s.page}>

      <Header/>


      {/* ── HERO ── */}
      <section
  style={{
    ...s.hero,
    position: "relative",
    overflow: "hidden"
  }}
>
  {/* IMAGEM (resolve o problema de “achatado”) */}
  <img
    src={heroSlides[currentSlide].img}
    alt=""
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
      zIndex: 0
    }}
  />

  {/* OVERLAY (opcional, mas deixa bem mais bonito) */}
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.4)",
      zIndex: 0
    }}
  />

  {/* CONTEÚDO */}
  <div style={{ ...s.heroContent, position: "relative", zIndex: 1 }}>
    <p style={s.heroTag}>
      Aluguel de carros • Aluguel mensal • Carro por assinatura
    </p>

    <h1 style={s.heroTitle}>
      {heroSlides[currentSlide].title}
    </h1>

    <p style={s.heroSub}>
      {heroSlides[currentSlide].sub}
    </p>


          {/* bolinhas */}
          <div style={s.dots}>
            {heroSlides.map((_, i) => (
              <span
                key={i}
                style={{
                  ...s.dot,
                  background: i === currentSlide ? "#f59e0b" : "#fff"
                }}
              />
            ))}
          </div>
        </div>
      </section>



      {/* ── BANNERS PROMO ── */}
      <section style={s.banners}>
        <div style={{ ...s.banner, background: "linear-gradient(135deg,#1a1a2e,#16213e)" }}>
          <div>
            <p style={{ color: "#f59e0b", fontWeight: 700, fontSize: 13, margin: 0 }}>FERIADOS EM DOBRO,</p>
            <p style={{ color: "#fff", fontWeight: 800, fontSize: 18, margin: "4px 0" }}>Viagens em dobro 🚀</p>
            <p style={{ color: "#ccc", fontSize: 12, margin: 0 }}>Parcele em até <strong style={{ color: "#f59e0b", fontSize: 22 }}>12x</strong></p>
          </div>
          <button
            style={s.bannerBtn}
            onClick={() => navigate("/home")}
          >
            ALUGAR JÁ
          </button>        </div>

        <div
          style={{
            ...s.banner,
            background: "linear-gradient(135deg,#f59e0b,#f97316)",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 10px 25px rgba(245, 158, 11, 0.25)",
            cursor: "pointer",
            transition: "all 0.25s ease",
          }}
        >
          {/* brilho decorativo */}
          <div
            style={{
              position: "absolute",
              width: 120,
              height: 120,
              background: "rgba(255,255,255,0.15)",
              borderRadius: "50%",
              top: -30,
              right: -30,
              filter: "blur(10px)",
            }}
          />

          <div style={{ zIndex: 1 }}>
            <p style={{ color: "#1a1a2e", fontWeight: 700, fontSize: 13, margin: 0 }}>
              Quanto mais você aluga
            </p>

            <p style={{ color: "#1a1a2e", fontWeight: 900, fontSize: 20, margin: "6px 0" }}>
              Mais você viaja pelo mundo
            </p>

            <p style={{ color: "#1a1a2e", fontSize: 12, margin: 0, opacity: 0.8 }}>
              Ganhe vantagens e desbloqueie melhores preços
            </p>
          </div>

          <span
            style={{
              fontSize: 44,
              zIndex: 1,
              transform: "rotate(-10deg)",
              filter: "drop-shadow(0 5px 10px rgba(0,0,0,0.2))",
            }}
          >
            🚗
          </span>
        </div>

        <div
          style={{
            ...s.banner,
            background: "linear-gradient(135deg,#064e3b,#065f46)",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 12px 30px rgba(6, 95, 70, 0.25)",
          }}
        >
          {/* brilho decorativo */}
          <div
            style={{
              position: "absolute",
              width: 140,
              height: 140,
              background: "rgba(110, 231, 183, 0.15)",
              borderRadius: "50%",
              top: -40,
              right: -40,
              filter: "blur(15px)",
            }}
          />

          <div style={{ zIndex: 1 }}>
            <p style={{ color: "#6ee7b7", fontWeight: 700, fontSize: 13, margin: 0 }}>
              Ganhe recompensas
            </p>

            <p style={{ color: "#fff", fontWeight: 900, fontSize: 26, margin: "6px 0" }}>
              Até 10% de cashback 💰
            </p>

            <p style={{ color: "#a7f3d0", fontSize: 13, margin: 0 }}>
              Use seu saldo na próxima viagem
            </p>
          </div>

          <button
            style={{
              ...s.bannerBtn,
              background: "#f59e0b",
              color: "#1a1a2e",
              fontWeight: 900,
              padding: "10px 16px",
              borderRadius: 12,
              boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
              cursor: "pointer",
            }}
          >
            QUERO MEU CASHBACK →
          </button>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section style={s.trust}>
        <div style={s.trustItem}>✅ Compare preços em mais de 350 locadoras</div>
        <div style={s.trustItem}>🏷️ Melhor preço garantido</div>
        <div style={s.trustItem}>💸 Cashback para o seu próximo aluguel</div>
      </section>

      {/* ── RATINGS ── */}
      <section style={s.ratings}>
        <div style={s.ratingsLeft}>
          <h2 style={s.ratingsTitle}>Confiança para explorar o mundo do seu jeito</h2>
          <p style={s.ratingsSub}>Milhões de pessoas confiam na CIEL Cars para viajar pelo mundo.</p>
        </div>
        <div style={s.ratingsBadges}>
          <div style={s.badge}>
            <div style={{ fontSize: 22 }}>⭐⭐⭐⭐⭐</div>
            <div style={{ fontWeight: 700, fontSize: 20, color: "#1a1a2e" }}>4.5</div>
            <div style={{ fontSize: 12, color: "#666" }}>119.040 avaliações — Excelente</div>
            <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>Trustpilot</div>
          </div>
          <div style={s.badge}>
            <div style={{ fontSize: 22 }}>🏆</div>
            <div style={{ fontWeight: 700, fontSize: 20, color: "#1a1a2e" }}>RA1000</div>
            <div style={{ fontSize: 12, color: "#666" }}>Reputação máxima</div>
            <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>Reclame Aqui</div>
          </div>
        </div>
      </section>

      {/* ── PARCEIROS ── */}
<section style={s.countersSection}>
  <div style={s.counterItem}>
    <span style={s.counterNumber}>{counters.locadoras}+</span>
    <span style={s.counterLabel}>Locadoras parceiras</span>
  </div>
  <div style={s.counterDivider} />
  <div style={s.counterItem}>
    <span style={s.counterNumber}>{counters.veiculos.toLocaleString("pt-BR")}+</span>
    <span style={s.counterLabel}>Veículos disponíveis</span>
  </div>
  <div style={s.counterDivider} />
  <div style={s.counterItem}>
    <span style={s.counterNumber}>{counters.clientes.toLocaleString("pt-BR")}+</span>
    <span style={s.counterLabel}>Clientes satisfeitos</span>
  </div>
</section>

      {/* ── VANTAGENS ── */}
      <section id="vantagens" style={s.vantagens}>
        <h2 style={s.sectionTitle}>Vantagens de alugar um carro com a CIEL Cars</h2>
        <div style={s.vantagensGrid}>
          {[
            { icon: "💰", title: "Melhores preços e descontos", desc: "Tenha acesso aos melhores preços de locadoras em todo o mundo, aproveite descontos e receba cupons exclusivos." },
            { icon: "🔄", title: "Reservas com cashback", desc: "Receba até 10% de cashback em sua carteira digital para o próximo aluguel." },
            { icon: "🌍", title: "Alugue carro no mundo todo", desc: "Compare as melhores opções em mais de 350 locadoras de veículos. 7000 cidades e 40.000 pontos de atendimento." },
            { icon: "🎧", title: "Excelência no atendimento ao cliente", desc: "Time especializado 7 dias por semana. Atendimento em português em reservas no Brasil e no mundo." }
          ].map(v => (
            <div key={v.title} style={s.vantagemCard}>
              <div style={s.vantagemIcon}>{v.icon}</div>
              <h3 style={s.vantagemTitle}>{v.title}</h3>
              <p style={s.vantagemDesc}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── DESTINOS ── */}
    <section id="destinos" style={s.destinosInspira}>
  <h2 style={s.destinosInspiraTitle}>Destinos para descobrir e se inspirar</h2>
  <p style={s.destinosInspiraSub}>
    Mais do que alugar carros, nós cuidamos do seu caminho. Confira as nossas dicas de viagem para inspirar sua próxima experiência.
  </p>

  <div style={s.carouselWrapper}>
    <button style={{ ...s.carouselArrow, opacity: carouselIndex === 0 ? 0.3 : 1 }} onClick={prevCarousel} disabled={carouselIndex === 0}>‹</button>

    <div style={s.carouselTrack}>
      {destinosInspiracao.slice(carouselIndex, carouselIndex + visibleCount).map((d, i) => (
        <div key={i} style={s.destinoCard} onClick={() => navigate("/home")}>
          <div style={s.destinoImgWrap}>
            <img src={d.img} alt={d.nome} style={s.destinoImg} />
          </div>
          <p style={s.destinoNome}>{d.nome}</p>
          <p style={s.destinoEstado}>{d.estado}</p>
        </div>
      ))}
    </div>

    <button style={{ ...s.carouselArrow, opacity: carouselIndex >= maxIndex ? 0.3 : 1 }} onClick={nextCarousel} disabled={carouselIndex >= maxIndex}>›</button>
  </div>

  <div style={{ textAlign: "center", marginTop: 40 }}>
    <button style={s.destinosCTA} onClick={() => navigate("/home")}>CONFERIR TODOS OS DESTINOS</button>
  </div>
</section>

      {/* ── EXPERIÊNCIAS ── */}
      <section style={s.experiences}>
        <h2 style={s.sectionTitle}>Experiências populares</h2>
        <p style={s.sectionSub}>Descubra os destinos mais desejados de nossos clientes</p>
        <div style={s.expTags}>
          {["🏖️ Férias por aí", "🧭 Desbravando o Brasil", "✈️ Aeroportos", "🚗 Categorias", "🏷️ Promoções"].map(t => (
            <span key={t} style={s.expTag}>{t}</span>
          ))}
        </div>
        <div style={s.expGrid}>
          {[
            "Maceió, AL", "João Pessoa, PB", "Belo Horizonte, MG", "Fortaleza, CE", "Salvador, BA", "Ouro Preto, MG",
            "Vitória, ES", "Aracaju, SE", "Porto Seguro, BA", "Foz do Iguaçu, PR", "Braslia, DF", "São Paulo, SP", "Belém do Para, PA", "Teresina, PI"
          ].map(city => (
            <div key={city} style={s.expCity} onClick={() => navigate("/home")}>📍 {city}</div>
          ))}
        </div>
      </section>

      {/* ── ASSINATURA BANNER ── */}
      <section style={s.signatureBanner}>
        <div style={s.signatureContent}>
          <div style={s.signatureTag}>Em destaque</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, margin: "12px 0 8px", color: "#fff" }}>Carro por Assinatura</h2>
          <p style={{ color: "#d1fae5", fontSize: 15, marginBottom: 20 }}>
            O jeito mais inteligente de ter um carro. Sem IPVA, documentação, seguro e manutenção.
            Conheça a opção de assinatura para o aluguel de carro atual.
          </p>
          <button style={s.signatureBtn} onClick={() => navigate("/home")}>Saiba mais →</button>
        </div>
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop"
          alt="Carro"
          style={s.signatureImg}
        />
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={s.faq}>
        <div style={s.faqHeader}>
          <h2 style={s.sectionTitle}>Perguntas frequentes sobre o aluguel de carros</h2>
          <a href="#" style={s.verTodos}>Ver todas as perguntas →</a>
        </div>
        <div style={s.faqList}>
          {faqData.map((item, i) => (
            <div key={i} style={s.faqItem}>
              <button style={s.faqQuestion} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{item.q}</span>
                <span style={{ fontSize: 20, transition: "transform 0.2s", transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
              </button>
              {openFaq === i && <div style={s.faqAnswer}>{item.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ── APP + NEWSLETTER ── */}
      <section style={s.appSection}>
        <div style={s.appCard}>
          <h3 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 8px", color: "#1a1a2e" }}>Baixe agora o app</h3>
          <p style={{ color: "#555", fontSize: 14, marginBottom: 16 }}>Compare preços e alugue seu veículo onde você estiver. É fácil e rápido!</p>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={s.storeBtn}>🍎 App Store</button>
            <button style={s.storeBtn}>🤖 Google Play</button>
          </div>
        </div>
        <div style={s.newsletterCard}>
          <h3 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 8px", color: "#1a1a2e" }}>Receba ofertas exclusivas</h3>
          <p style={{ color: "#555", fontSize: 14, marginBottom: 16 }}>Cadastre seu e-mail para receber promoções exclusivas da CIEL Cars!</p>
          <div style={{ display: "flex", gap: 10 }}>
            <input placeholder="Seu nome" style={s.newsInput} />
            <input placeholder="Seu e-mail" type="email" style={s.newsInput} />
            <button style={s.newsBtn}>Cadastrar</button>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );  
}

const s = {
  page: { fontFamily: "'Segoe UI', sans-serif", color: "#1a1a2e", background: "#f8fafc" },

  /* NAV */
  nav: { position: "fixed", top: 0, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 48px", background: "rgba(15,15,30,0.92)", backdropFilter: "blur(12px)", zIndex: 100 },
  logo: { color: "#fff", fontWeight: 900, fontSize: 20, letterSpacing: -0.5 },
  navLinks: { display: "flex", gap: 28 },
  navLink: { color: "#ccc", textDecoration: "none", fontSize: 14, fontWeight: 500 },
  btnLogin: { padding: "8px 20px", borderRadius: 8, border: "none", background: "#f59e0b", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14 },
  btnCadastro: { padding: "8px 20px", borderRadius: 8, border: "1.5px solid rgba(255,255,255,0.4)", background: "transparent", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: 14 },

  /* HERO */
  hero: { minHeight: "100vh", background: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80') center/cover no-repeat", display: "flex", alignItems: "center", justifyContent: "flex-start", padding: "0 60px", paddingTop: 70 },
  heroContent: { maxWidth: 750 },
  heroTag: { color: "#ffa200", fontSize: 13, fontWeight: 600, marginBottom: 8, textShadow: "0 1px 4px rgba(0,0,0,0.5)" },
  heroTitle: { color: "#fff", fontSize: "clamp(28px,4vw,52px)", fontWeight: 900, lineHeight: 1.1, margin: "0 0 12px", textShadow: "0 2px 12px rgba(0,0,0,0.6)" },
  heroSub: { color: "#ffffff", fontSize: 18, marginBottom: 32, textShadow: "0 1px 6px rgba(0,0,0,0.5)" },


  /* SEARCH */
  searchBox: { display: "flex", alignItems: "center", background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", flexWrap: "wrap" },
  searchField: { display: "flex", alignItems: "center", gap: 10, padding: "14px 20px", flex: 1, minWidth: 160 },
  searchIcon: { fontSize: 18 },
  searchInput: { border: "none", outline: "none", fontSize: 15, width: "100%", background: "transparent" },
  searchInputDate: { border: "none", outline: "none", fontSize: 14, background: "transparent", fontFamily: "inherit" },
  searchLabel: { fontSize: 11, color: "#888", marginBottom: 2 },
  searchDivider: { width: 1, height: 40, background: "#e2e8f0" },
  searchBtn: { padding: "16px 28px", background: "#1d4ed8", color: "#fff", border: "none", fontSize: 15, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" },

  /* BANNERS */
  banners: { display: "flex", gap: 16, padding: "40px 60px 20px", flexWrap: "wrap" },
  banner: { flex: 1, minWidth: 240, borderRadius: 14, padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  bannerBtn: { padding: "10px 18px", borderRadius: 8, border: "none", background: "#f59e0b", color: "#1a1a2e", fontWeight: 800, cursor: "pointer", fontSize: 13 },

  /* TRUST */
  trust: { display: "flex", justifyContent: "center", gap: 32, padding: "20px 60px", background: "#fff", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", flexWrap: "wrap" },
  trustItem: { fontSize: 14, color: "#374151", fontWeight: 500 },

  /* RATINGS */
  ratings: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "40px 60px", background: "#fff", gap: 40, flexWrap: "wrap" },
  ratingsLeft: { flex: 1, minWidth: 280 },
  ratingsTitle: { fontSize: 22, fontWeight: 800, margin: "0 0 10px" },
  ratingsSub: { color: "#555", fontSize: 15, margin: 0 },
  ratingsBadges: { display: "flex", gap: 20 },
  badge: { background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: "18px 24px", textAlign: "center", minWidth: 160 },

  /* INDICADORES */
  
countersSection: { display: "flex", justifyContent: "center", alignItems: "center", gap: 0, padding: "60px", background: "#fff", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" },
counterItem: { flex: 1, textAlign: "center", display: "flex", flexDirection: "column", gap: 8 },
counterNumber: { fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, color: "#ff9100", lineHeight: 1 },
counterLabel: { fontSize: 15, color: "#000000", fontWeight: 500 },
counterDivider: { width: 1, height: 60, background: "#e2e8f0", flexShrink: 0 },

  /* VANTAGENS */
  vantagens: { padding: "60px 60px", background: "#fff" },
  vantagensGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 24, marginTop: 30 },
  vantagemCard: { background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 14, padding: "28px 24px" },
  vantagemIcon: { fontSize: 32, marginBottom: 12 },
  vantagemTitle: { fontSize: 16, fontWeight: 700, margin: "0 0 8px", color: "#1a1a2e" },
  vantagemDesc: { fontSize: 14, color: "#555", margin: 0, lineHeight: 1.6 },

  /* DESTINOS */
destinosInspira: { padding: "70px 60px", background: "#fff", textAlign: "center" },
destinosInspiraTitle: { fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, color: "#166534", margin: "0 0 12px" },
destinosInspiraSub: { color: "#555", fontSize: 15, maxWidth: 700, margin: "0 auto 40px", lineHeight: 1.6 },
carouselWrapper: { display: "flex", alignItems: "center", gap: 12, justifyContent: "center" },
carouselTrack: { display: "flex", gap: 20 },
carouselArrow: { width: 40, height: 40, borderRadius: "50%", border: "1.5px solid #16a34a", background: "#fff", color: "#16a34a", fontSize: 24, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
destinoImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
destinoCard: { cursor: "pointer", textAlign: "center", width: 280, flexShrink: 0 },
destinoImgWrap: {
  width: 280, height: 220,
  clipPath: "polygon(8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 8%)",
  overflow: "hidden", marginBottom: 12,
  boxShadow: "0 8px 24px rgba(0,0,0,0.18)"
},destinoNome: { fontSize: 16, fontWeight: 600, color: "#16a34a", margin: "0 0 4px" },
destinoEstado: { fontSize: 12, fontWeight: 700, color: "#374151", letterSpacing: "0.8px", margin: 0 },
destinosCTA: { padding: "14px 36px", background: "transparent", border: "1.5px solid #16a34a", color: "#16a34a", borderRadius: 6, fontWeight: 700, fontSize: 13, letterSpacing: "1px", cursor: "pointer" },


  /* EXPERIÊNCIAS */
  experiences: { padding: "60px 60px", background: "#fff" },
  expTags: { display: "flex", gap: 10, marginTop: 16, marginBottom: 24, flexWrap: "wrap" },
  expTag: { padding: "8px 16px", background: "#f59e0b", color: "#1a1a2e", borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: "pointer" },
  expGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px,1fr))", gap: 10 },
  expCity: { padding: "10px 14px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, fontSize: 14, cursor: "pointer", fontWeight: 500 },

  /* ASSINATURA */
  signatureBanner: { margin: "0 60px 60px", borderRadius: 18, background: "linear-gradient(135deg,#064e3b,#065f46)", display: "flex", overflow: "hidden", minHeight: 220, position: "relative" },
  signatureContent: { padding: "40px 48px", flex: 1, zIndex: 1 },
  signatureTag: { display: "inline-block", background: "#f59e0b", color: "#1a1a2e", padding: "3px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700 },
  signatureBtn: { padding: "12px 24px", background: "#f59e0b", color: "#1a1a2e", border: "none", borderRadius: 10, fontWeight: 800, fontSize: 15, cursor: "pointer" },
  signatureImg: { width: 340, objectFit: "cover", opacity: 0.35, position: "absolute", right: 0, top: 0, bottom: 0, height: "100%" },

  /* FAQ */
  faq: { padding: "60px 60px", background: "#f8fafc" },
  faqHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  faqList: { display: "flex", flexDirection: "column", gap: 0 },
  faqItem: { borderBottom: "1px solid #e2e8f0" },
  faqQuestion: { width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 4px", background: "none", border: "none", cursor: "pointer", fontSize: 16, fontWeight: 600, color: "#1a1a2e", textAlign: "left", gap: 16 },
  faqAnswer: { padding: "0 4px 18px", fontSize: 14, color: "#555", lineHeight: 1.7 },

  /* APP + NEWSLETTER */
  appSection: { display: "flex", gap: 24, padding: "0 60px 60px", flexWrap: "wrap" },
  appCard: { flex: 1, minWidth: 280, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: "32px" },
  newsletterCard: { flex: 2, minWidth: 320, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: "32px" },
  storeBtn: { padding: "10px 18px", background: "#1a1a2e", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 14 },
  newsInput: { flex: 1, padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, outline: "none", minWidth: 100 },
  newsBtn: { padding: "10px 20px", background: "#f59e0b", color: "#1a1a2e", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer" },

  /* FOOTER */
  footer: { background: "#1a1a2e", color: "#fff", padding: "48px 60px 20px" },
  footerGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: 32, marginBottom: 40 },
  footerLinks: { display: "flex", flexDirection: "column", gap: 8 },
  footerLink: { color: "#94a3b8", fontSize: 13, textDecoration: "none" },
  footerBottom: { borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 20, color: "#64748b", fontSize: 13, textAlign: "center" },

  

  heroBtn: {
    marginTop: 20,
    padding: "16px 32px",
    background: "linear-gradient(135deg,#f59e0b,#d97706)",
    color: "#1a1a2e",
    border: "none",
    borderRadius: 12,
    fontWeight: 800,
    fontSize: 16,
    cursor: "pointer"
  },
  dots: {
    marginTop: 20,
    display: "flex",
    gap: 8
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "#fff",
    opacity: 0.7
  },

  navBtn: {
    padding: "12px 26px",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(135deg,#f59e0b,#f97316,#ea580c)",
    color: "#1a1a2e",
    fontWeight: 900,
    cursor: "pointer",
    fontSize: 14,
    letterSpacing: "0.3px",
    boxShadow: "0 8px 20px rgba(245, 158, 11, 0.35)",
    transition: "all 0.25s ease",
    transform: "translateY(0)",
  }

};