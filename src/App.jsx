import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import CircularCarousel from './components/reactbits/CircularCarousel.jsx';
import FoldText from './components/reactbits/FoldText.jsx';
import LoadingExperience from './LoadingExperience.jsx';
import { showroomPhones, storeCategories } from './data/phones.js';

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Atelier Mobile, início">
        <span className="wordmark-mark">A.</span><span>ATELIER<br />MOBILE</span>
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        aria-label={menuOpen ? 'Fechar navegação' : 'Abrir navegação'}
        onClick={() => setMenuOpen(open => !open)}
      ><span /><span /></button>
      <nav id="main-navigation" className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Navegação principal">
        <a href="#showroom" onClick={closeMenu}>Smartphones</a>
        <a href="#jornada" onClick={closeMenu}>A experiência</a>
        <a href="#escolha" onClick={closeMenu}>Escolha</a>
        <a className="nav-cta" href="#contato" onClick={closeMenu}>Falar com a loja <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  );
}

function Hero({ phoneRef }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow"><i /> ATELIER MOBILE <span>·</span> SMARTPHONES EM DESTAQUE</p>
        <h1 id="hero-title" tabIndex="-1">A boa escolha<br /><em>começa por ver.</em></h1>
        <div className="hero-bottomline">
          <p>Explore os aparelhos, aproxime os detalhes e encontre o que combina com você.</p>
          <a className="hero-link" href="#showroom">Explorar smartphones <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <figure className="hero-art">
        <span className="hero-art-index">iPhone 17 Pro Max <i>·</i> Laranja</span>
        <img ref={phoneRef} className="hero-phone" src="/images/iphone-17-pro-max-orange.jpg" alt="Traseira laranja do iPhone 17 Pro Max" fetchPriority="high" />
        <figcaption>VEJA DE PERTO<br />ESCOLHA COM CALMA</figcaption>
      </figure>
      <div className="hero-foot" aria-hidden="true"><span>ATELIER MOBILE</span><span>SMARTPHONES · ACESSÓRIOS</span></div>
    </section>
  );
}

function EditorialIntro() {
  return (
    <section id="intro" className="editorial-intro" aria-labelledby="intro-title">
        <p className="eyebrow">ANTES DO PRIMEIRO CONTATO</p>
      <div className="editorial-intro-body">
        <h2 id="intro-title">O cliente quer ver de perto.<br /><em>A escolha vem depois.</em></h2>
        <div className="editorial-intro-aside">
          <span className="editorial-rule" aria-hidden="true" />
          <p>Uma vitrine clara mostra os aparelhos, revela os detalhes e deixa o próximo passo sempre à mão.</p>
        </div>
      </div>
    </section>
  );
}

function FoldInterlude() {
  return (
    <section className="fold-interlude" aria-labelledby="fold-heading">
      <div className="fold-interlude-meta"><span>O APARELHO, SEM PRESSA</span><span>ATELIER MOBILE</span></div>
      <h2 id="fold-heading" className="fold-heading">
        <FoldText
          text="O produto certo merece ser visto de perto."
          splitBy="word"
          hinge="top"
          trigger="scroll"
          duration={0.6}
          stagger={0.055}
          ease="power3.out"
          perspective={850}
          creaseShading={0.38}
          fontSize="clamp(2.55rem, 9.5vw, 9rem)"
          fontWeight={600}
          color="#f5f2ec"
          className="fold-heading-text"
        />
      </h2>
      <p className="fold-interlude-note">Veja primeiro. Escolha no seu tempo.</p>
    </section>
  );
}

function PhoneCarousel() {
  const sectionRef = useRef(null);
  const [entered, setEntered] = useState(false);
  const [activePhone, setActivePhone] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobileViewport = viewportWidth <= 680;

  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', updateWidth, { passive: true });
    return () => window.removeEventListener('resize', updateWidth);
  }, []);


  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;
    if (reducedMotion || !('IntersectionObserver' in window)) {
      setEntered(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setEntered(true);
        observer.disconnect();
      }
    }, { rootMargin: '120px 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const selected = showroomPhones[activePhone] || showroomPhones[0];

  return (
    <section id="showroom" className="carousel-section" ref={sectionRef} aria-labelledby="showroom-title">
      <div className="carousel-heading">
        <div>
          <p className="eyebrow">APARELHOS EM DESTAQUE</p>
          <h2 id="showroom-title">Sua próxima escolha,<br /><em>vista de perto.</em></h2>
        </div>
        <p>Arraste para explorar. O aparelho em foco e seus detalhes acompanham cada escolha.</p>
      </div>
      <div className="carousel-stage-shell">
        {entered ? (
          <CircularCarousel
            items={showroomPhones}
            preset="cylinder"
            intro={reducedMotion ? 'none' : 'rise'}
            cardWidth={mobileViewport ? Math.min(340, Math.max(248, viewportWidth * 0.8)) : 270}
            aspectRatio={0.62}
            gap={34}
            autoplay={mobileViewport || reducedMotion ? 'off' : 'drift'}
            speed={4.2}
            direction="left"
            draggable
            momentum={mobileViewport ? 0.62 : 0.42}
            snap
            pauseOnHover
            focusOnClick
            parallax={0.08}
            stretch={0.08}
            depthFade={0.28}
            fadeColor="#f0eee9"
            innerShade={0.24}
            cornerRadius={3}
            captions
            ariaLabel="Vitrine circular de smartphones"
            onChange={setActivePhone}
            onItemClick={(item, index) => setActivePhone(index)}
            className="atelier-carousel"
          />
        ) : <div className="carousel-placeholder" aria-hidden="true" />}
      </div>
      <div className="carousel-selection" aria-live="polite" aria-atomic="true">
        <span className="selection-kicker">EM FOCO</span>
        <div className="carousel-selection-copy"><strong>{selected.title}</strong><span>{selected.subtitle}</span></div>
        <p>{selected.summary}</p>
          <a href="#escolha">Ver esta apresentação <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}

const customerPath = [
  { label: 'A vitrine', title: 'A loja aparece antes da conversa.', text: 'O cliente entende o que encontra e começa a explorar no próprio ritmo.', image: '/images/store-iphone.jpg', alt: 'Vitrine física com comunicação visual de iPhone 17 Pro' },
  { label: 'O aparelho', title: 'Um produto chama o olhar.', text: 'O smartphone ganha espaço, escala e contexto para ser reconhecido.', image: '/images/iphone-17-pro-max-orange.jpg', alt: 'Traseira laranja do iPhone 17 Pro Max' },
  { label: 'Os detalhes', title: 'A escolha fica mais próxima.', text: 'Imagens de frente e verso ajudam a conhecer o que está sendo apresentado.', image: '/images/smartphone-display-blue.webp', alt: 'Smartphone azul mostrado pela frente e pela traseira, sem modelo identificado' },
  { label: 'O contato', title: 'A dúvida encontra um caminho.', text: 'Quando o cliente quiser saber mais, a conversa com a loja fica à vista.', image: '/images/store-accessories.jpg', alt: 'Acessórios e capas expostos na loja' },
];

function CustomerJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const step = customerPath[activeStep];

  return (
    <section id="jornada" className="customer-journey" aria-labelledby="journey-title">
      <div className="journey-heading">
        <p className="eyebrow">DO PRIMEIRO OLHAR AO PRÓXIMO PASSO</p>
        <h2 id="journey-title">A loja continua<br /><em>presente na escolha.</em></h2>
      </div>
      <div className="journey-scene">
        <div className="journey-image"><img key={step.image} src={step.image} alt={step.alt} loading="lazy" /><span className="journey-image-label">{step.label}</span></div>
        <div className="journey-copy" aria-live="polite" aria-atomic="true">
          <span className="journey-counter">{String(activeStep + 1).padStart(2, '0')} <i>/</i> 04</span>
          <h3>{step.title}</h3><p>{step.text}</p>
          {activeStep === 3 && <a className="line-link" href="#contato">Encontrar o atendimento <span aria-hidden="true">↗</span></a>}
        </div>
      </div>
      <div className="journey-steps" role="group" aria-label="Explore o percurso do cliente">
        {customerPath.map((item, index) => <button key={item.label} type="button" aria-pressed={activeStep === index} onClick={() => setActiveStep(index)}><span>{String(index + 1).padStart(2, '0')}</span>{item.label}</button>)}
      </div>
    </section>
  );
}

function DesireMoment() {
  return (
    <section className="desire-moment" aria-labelledby="desire-title">
      <div className="desire-copy"><p className="eyebrow">UM APARELHO EM PRIMEIRO PLANO</p><h2 id="desire-title">Um aparelho<br /><em>em destaque.</em></h2><p>Uma boa imagem dá espaço para ver o desenho, a cor e os detalhes de cada aparelho.</p></div>
      <div className="desire-image"><img src="/images/iphone-17-pro-max-orange.jpg" alt="Detalhe em primeiro plano do conjunto de câmeras do iPhone 17 Pro Max laranja" loading="lazy" /></div>
    </section>
  );
}

function PhoneSelection() {
  const [selected, setSelected] = useState(0);
  const phone = showroomPhones[selected] || showroomPhones[0];
  const selectPhone = (index) => setSelected((index + showroomPhones.length) % showroomPhones.length);

  return (
    <section id="escolha" className="phone-selection" aria-labelledby="selection-title">
      <div className="selection-header">
        <p className="eyebrow">UM SHOWROOM, NO SEU RITMO</p>
        <h2 id="selection-title">Qual aparelho<br /><em>você quer ver?</em></h2>
        <p>Avance pelas apresentações disponíveis. A imagem e as informações acompanham a sua escolha.</p>
      </div>
      <div className="selection-showcase">
        <div className="selection-image-wrap"><img key={phone.id} src={phone.src} alt={phone.alt} loading="lazy" /><div className="selection-controls"><button type="button" aria-label="Apresentação anterior" onClick={() => selectPhone(selected - 1)}>←</button><span>{String(selected + 1).padStart(2, '0')} <i>/</i> {String(showroomPhones.length).padStart(2, '0')}</span><button type="button" aria-label="Próxima apresentação" onClick={() => selectPhone(selected + 1)}>→</button></div></div>
        <div className="selection-details" aria-live="polite" aria-atomic="true">
          <span className="selection-kicker">APRESENTAÇÃO {String(selected + 1).padStart(2, '0')}</span>
          <h3>{phone.title}</h3><p>{phone.subtitle}</p><small>{phone.summary}</small>
          <div className="selection-options" role="group" aria-label="Escolher apresentação">
            {showroomPhones.map((option, index) => <button key={option.id} type="button" className={selected === index ? 'is-selected' : ''} aria-label={`Ver ${option.title}`} aria-pressed={selected === index} onClick={() => selectPhone(index)}><span>{String(index + 1).padStart(2, '0')}</span><i /></button>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function ChannelSpace() {
  return (
    <section className="channel-space" aria-labelledby="channel-title">
      <div className="channel-heading"><p className="eyebrow">CADA CANAL TEM SEU PAPEL</p><h2 id="channel-title">Uma loja também<br /><em>precisa de espaço.</em></h2></div>
      <div className="channel-line">
        <div><span>01</span><h3>Instagram</h3><p>Desperta o interesse.</p></div>
        <i aria-hidden="true">↗</i>
        <div><span>02</span><h3>WhatsApp</h3><p>Aproxima a conversa.</p></div>
        <i aria-hidden="true">↗</i>
        <div className="channel-own"><span>03</span><h3>A vitrine da loja</h3><p>Apresenta os aparelhos, os detalhes e o jeito de atender.</p></div>
      </div>
      <p className="channel-note">A descoberta começa em muitos lugares. É bom ter um espaço onde a loja inteira possa aparecer.</p>
    </section>
  );
}

function Categories() {
  return (
    <section id="categorias" className="categories" aria-labelledby="categories-title">
      <div className="categories-heading"><p className="eyebrow">TAMBÉM NA LOJA</p><h2 id="categories-title">Pequenos detalhes<br /><em>acompanham a escolha.</em></h2></div>
      <div className="category-rail">
        {storeCategories.map((category, index) => <article className={`category-item category-item-${index + 1}`} key={category.id}>
          <img src={category.image} alt={category.alt} loading="lazy" />
          <span className="category-item-copy"><strong>{category.title}</strong><small>{category.note}</small></span>
        </article>)}
      </div>
    </section>
  );
}

function ContactMoment() {
  return (
    <section id="contato" className="contact-moment" aria-labelledby="contact-title">
      <p className="eyebrow">ATELIER MOBILE · SMARTPHONES E ACESSÓRIOS</p>
      <h2 id="contact-title">Sua loja, apresentada<br /><em>do seu jeito.</em></h2>
      <p>Uma vitrine para mostrar o que você vende e aproximar quem está escolhendo.</p>
      <a className="contact-cta" href="#contato-info">Falar sobre meu projeto <span aria-hidden="true">↗</span></a>
      <span id="contato-info" className="contact-note">Atendimento pelo WhatsApp</span>
    </section>
  );
}

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroPhone = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrollProgress(Math.min(100, window.scrollY / (document.documentElement.scrollHeight - innerHeight || 1) * 100));
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const node = heroPhone.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const media = window.matchMedia('(pointer: fine)');
    const onMove = event => {
      const box = node.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      gsap.to(node, { rotateY: x * 5, rotateX: -y * 4, duration: 0.8, ease: 'power2.out' });
    };
    const onLeave = () => gsap.to(node, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'power3.out' });
    if (media.matches) {
      node.addEventListener('pointermove', onMove);
      node.addEventListener('pointerleave', onLeave);
    }
    return () => {
      node.removeEventListener('pointermove', onMove);
      node.removeEventListener('pointerleave', onLeave);
      gsap.killTweensOf(node);
    };
  }, []);

  return <>
    <LoadingExperience />
    <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }} aria-hidden="true" />
    <SiteHeader />
    <main id="top">
      <Hero phoneRef={heroPhone} />
      <EditorialIntro />
      <FoldInterlude />
      <PhoneCarousel />
      <CustomerJourney />
      <DesireMoment />
      <PhoneSelection />
      <ChannelSpace />
      <Categories />
      <ContactMoment />
    </main>
    <footer className="site-footer">
      <a className="wordmark" href="#top" aria-label="Atelier Mobile, voltar ao início"><span className="wordmark-mark">A.</span><span>ATELIER<br />MOBILE</span></a>
      <p>SMARTPHONES · ACESSÓRIOS · ATENDIMENTO</p>
      <a href="#top">VOLTAR AO TOPO ↑</a>
      <small>© {new Date().getFullYear()} ATELIER MOBILE</small>
    </footer>
  </>;
}
