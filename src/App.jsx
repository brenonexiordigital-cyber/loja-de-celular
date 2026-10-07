import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import CircularCarousel from './components/reactbits/CircularCarousel.jsx';
import FoldText from './components/reactbits/FoldText.jsx';
import LoadingExperience from './LoadingExperience.jsx';
import { proFinishes, showroomPhones, storeCategories } from './data/phones.js';

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
        <a href="#showroom" onClick={closeMenu}>Vitrine</a>
        <a href="#experiencias" onClick={closeMenu}>Experiências</a>
        <a href="#escolha" onClick={closeMenu}>Escolha</a>
        <a className="nav-cta" href="#categorias" onClick={closeMenu}>Explorar <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  );
}

function Hero({ phoneRef }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow"><i /> ATELIER MOBILE <span>·</span> CURADORIA DE SMARTPHONES</p>
        <h1 id="hero-title" tabIndex="-1">Tecnologia<br /><em>em primeiro plano.</em></h1>
        <div className="hero-bottomline">
          <p>Uma vitrine para olhar de perto, comparar com calma e escolher com intenção.</p>
          <a className="hero-link" href="#intro">Entrar na experiência <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <figure className="hero-art">
        <span className="hero-art-index">iPhone 17 Pro Max <i>·</i> Laranja</span>
        <img ref={phoneRef} className="hero-phone" src="/images/iphone-17-pro-max-orange.jpg" alt="Traseira laranja do iPhone 17 Pro Max" fetchPriority="high" />
        <figcaption>UM ESTUDO DE LUZ<br />E SUPERFÍCIE</figcaption>
      </figure>
      <div className="hero-foot" aria-hidden="true"><span>01 — ATELIER MOBILE</span><span>DESLIZE PARA DESCOBRIR</span></div>
    </section>
  );
}

function EditorialIntro() {
  return (
    <section id="intro" className="editorial-intro" aria-labelledby="intro-title">
      <p className="eyebrow">UMA ESCOLHA PESSOAL</p>
      <div className="editorial-intro-body">
        <h2 id="intro-title">Não é só o que cabe na mão.<br /><em>É o que cabe na sua vida.</em></h2>
        <div className="editorial-intro-aside">
          <span className="editorial-rule" aria-hidden="true" />
          <p>Reunimos imagens e aparelhos já presentes nesta vitrine para que cada detalhe apareça antes da escolha.</p>
        </div>
      </div>
    </section>
  );
}

function FoldInterlude() {
  return (
    <section className="fold-interlude" aria-labelledby="fold-heading">
      <div className="fold-interlude-meta"><span>UM OLHAR MAIS PRÓXIMO</span><span>ATELIER MOBILE</span></div>
      <h2 id="fold-heading" className="fold-heading">
        <FoldText
          text="Cada detalhe muda a experiência."
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
      <p className="fold-interlude-note">Uma seleção visual para descobrir o que chama seu olhar.</p>
    </section>
  );
}

function PhoneCarousel() {
  const sectionRef = useRef(null);
  const [entered, setEntered] = useState(false);
  const [activePhone, setActivePhone] = useState(0);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
          <p className="eyebrow">O CENTRO DA VITRINE</p>
          <h2 id="showroom-title">Olhe de<br /><em>todos os lados.</em></h2>
        </div>
        <p>Arraste para girar. Escolha uma peça para revelar os detalhes disponíveis.</p>
      </div>
      <div className="carousel-stage-shell">
        {entered ? (
          <CircularCarousel
            items={showroomPhones}
            preset="cylinder"
            intro={reducedMotion ? 'none' : 'rise'}
            cardWidth={270}
            aspectRatio={0.62}
            gap={34}
            autoplay={reducedMotion ? 'off' : 'drift'}
            speed={4.2}
            direction="left"
            draggable
            momentum={0.42}
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
        <a href="#escolha">Explorar as opções <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}

function ProductShowroom() {
  return (
    <section className="product-showroom" aria-labelledby="product-showroom-title">
      <div className="product-showroom-art">
        <img src="/images/iphone-colors.jpg" alt="Quatro aparelhos em acabamentos escuro, claro, azul e vinho" loading="lazy" />
        <span className="image-caption">QUATRO ACABAMENTOS NA MESMA COMPOSIÇÃO</span>
      </div>
      <div className="product-showroom-copy">
        <p className="eyebrow">A VITRINE, SEM PRESSA</p>
        <h2 id="product-showroom-title">Presenças<br /><em>para se aproximar.</em></h2>
        <p>As imagens disponíveis mostram o aparelho por inteiro e em conjunto. Explore a seleção sem fichas técnicas ou valores que ainda não foram informados.</p>
        <a className="line-link" href="#escolha">Escolher uma apresentação <span aria-hidden="true">↘</span></a>
      </div>
    </section>
  );
}

function Experiences() {
  const [finishIndex, setFinishIndex] = useState(0);
  const finish = proFinishes[finishIndex];

  return (
    <section id="experiencias" className="experiences" aria-label="Experiências de produto">
      <div className="experience-intro"><p className="eyebrow">MATÉRIA, LUZ, PRESENÇA</p><h2>Quatro maneiras<br />de se aproximar.</h2></div>

      <article className="experience-camera" aria-labelledby="camera-title">
        <div className="camera-visual"><img src="/images/iphone-17-pro-max-orange.jpg" alt="Detalhe do conjunto de câmeras do iPhone 17 Pro Max laranja" loading="lazy" /><span>VIDRO · LUZ · PROFUNDIDADE</span></div>
        <div className="camera-copy"><p className="eyebrow">01 / CÂMERA</p><h3 id="camera-title">Um olhar<br /><em>mais perto.</em></h3><p>O módulo de câmeras em primeiro plano, observado na própria imagem do aparelho.</p></div>
      </article>

      <article className="experience-display" aria-labelledby="display-title">
        <div className="display-copy"><p className="eyebrow">02 / DISPLAY</p><h3 id="display-title">Uma janela<br />para <em>o que vem.</em></h3><p>Um render fornecido mostra o aparelho dos dois lados. O modelo não está identificado no arquivo.</p><span className="display-caption">FRENTE E VERSO <i>·</i> AZUL</span></div>
        <div className="display-visual"><img src="/images/smartphone-display-blue.webp" alt="Smartphone azul mostrado pela frente e pela traseira" loading="lazy" /></div>
      </article>

      <article className="experience-performance" aria-labelledby="performance-title">
        <div className="performance-copy"><p className="eyebrow">03 / PERFORMANCE</p><h3 id="performance-title">Feito para<br /><em>acompanhar.</em></h3><p>Sem números ou especificações inventados: apenas espaço para o aparelho e para o seu ritmo.</p><span className="performance-mark" aria-hidden="true">↗</span></div>
        <div className="performance-visual"><img src="/images/store-iphone.jpg" alt="Vitrine física com comunicação visual de iPhone 17 Pro" loading="lazy" /><span>iPhone 17 Pro <i>·</i> NA VITRINE</span></div>
      </article>

      <article className="experience-finishes" aria-labelledby="finishes-title">
        <div className="finishes-copy"><p className="eyebrow">04 / ACABAMENTO</p><h3 id="finishes-title">A cor também<br /><em>é escolha.</em></h3><p>Quatro tonalidades visíveis na composição disponível.</p>
          <div className="finish-picker" role="group" aria-label="Selecionar acabamento">
            {proFinishes.map((option, index) => <button key={option.id} type="button" aria-label={`Selecionar acabamento ${option.name}`} aria-pressed={finishIndex === index} style={{ '--swatch': option.color }} onClick={() => setFinishIndex(index)} />)}
            <span aria-live="polite">{finish.name}</span>
          </div>
        </div>
        <div className="finishes-visual"><img src="/images/iphone-colors.jpg" alt={`Composição de quatro aparelhos; acabamento em foco: ${finish.name}`} loading="lazy" /><span>ESCOLHA PELO QUE VOCÊ VÊ</span></div>
      </article>
    </section>
  );
}

function PhoneSelection() {
  const [selected, setSelected] = useState(0);
  const phone = showroomPhones[selected] || showroomPhones[0];

  return (
    <section id="escolha" className="phone-selection" aria-labelledby="selection-title">
      <div className="selection-header">
        <p className="eyebrow">ESCOLHA A APRESENTAÇÃO</p>
        <h2 id="selection-title">O que chamou<br /><em>seu olhar?</em></h2>
        <p>Explore as imagens reais disponíveis. Quando novos modelos e informações forem definidos, eles podem entrar nesta mesma vitrine.</p>
      </div>
      <div className="selection-showcase">
        <div className="selection-image-wrap"><img key={phone.id} src={phone.src} alt={phone.alt} loading="lazy" /></div>
        <div className="selection-details" aria-live="polite" aria-atomic="true">
          <span className="selection-kicker">APRESENTAÇÃO {String(selected + 1).padStart(2, '0')}</span>
          <h3>{phone.title}</h3><p>{phone.subtitle}</p><small>{phone.summary}</small>
          <div className="selection-options" role="group" aria-label="Escolher aparelho ou imagem">
            {showroomPhones.map((option, index) => <button key={option.id} type="button" className={selected === index ? 'is-selected' : ''} aria-pressed={selected === index} onClick={() => setSelected(index)}><span>{String(index + 1).padStart(2, '0')}</span>{option.title}</button>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section id="categorias" className="categories" aria-labelledby="categories-title">
      <div className="categories-heading"><p className="eyebrow">ATELIER MOBILE</p><h2 id="categories-title">Um espaço para<br /><em>descobrir.</em></h2></div>
      <div className="category-rail">
        {storeCategories.map((category, index) => <a className={`category-item category-item-${index + 1}`} href={index === 0 ? '#showroom' : index === 1 ? '#experiencias' : '#escolha'} key={category.id}>
          <img src={category.image} alt={category.alt} loading="lazy" />
          <span className="category-item-copy"><strong>{category.title}</strong><small>{category.note}</small></span><span className="category-arrow" aria-hidden="true">↗</span>
        </a>)}
      </div>
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
      <ProductShowroom />
      <Experiences />
      <PhoneSelection />
      <Categories />
    </main>
    <footer className="site-footer">
      <a className="wordmark" href="#top" aria-label="Atelier Mobile, voltar ao início"><span className="wordmark-mark">A.</span><span>ATELIER<br />MOBILE</span></a>
      <p>TECNOLOGIA EM PRIMEIRO PLANO.</p>
      <a href="#top">VOLTAR AO TOPO ↑</a>
      <small>© {new Date().getFullYear()} ATELIER MOBILE</small>
    </footer>
  </>;
}
