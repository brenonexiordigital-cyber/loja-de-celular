import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import LoadingExperience from './LoadingExperience.jsx';

const categories = [
  { title: 'iPhone', note: 'A experiência Apple', image: '/images/store-iphone.jpg', href: '#colecao' },
  { title: 'Samsung', note: 'Feito para ir além', image: '/images/iphone-colors.jpg', href: '#colecao' },
  { title: 'Xiaomi', note: 'Tecnologia sem pausa', image: '/images/store-cases.jpg', href: '#colecao' },
  { title: 'Motorola', note: 'Seu ritmo, suas regras', image: '/images/store-accessories.jpg', href: '#colecao' },
  { title: 'Acessórios', note: 'O detalhe faz diferença', image: '/images/store-accessories.jpg', href: '#acessorios' },
  { title: 'Ofertas', note: 'Novas possibilidades', image: '/images/store-cases.jpg', href: '#colecao' },
];

function FlowingMenu() {
  const [active, setActive] = useState(null);
  const imageRef = useRef(null);
  const activeItem = active == null ? null : categories[active];
  useEffect(() => {
    if (!imageRef.current || !activeItem) return;
    gsap.fromTo(imageRef.current, { opacity: 0, scale: 1.035, y: 12 }, { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: 'power3.out' });
  }, [activeItem]);
  return <div className="category-layout">
    <nav className="flowing-menu" aria-label="Explore por categoria">
      {categories.map((item, index) => <a key={item.title} href={item.href} className={`flowing-item ${active === index ? 'is-active' : ''}`} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}>
        <span className="flowing-index">0{index + 1}</span><span className="flowing-title">{item.title}</span><span className="flowing-note">{item.note}</span><span className="flowing-arrow" aria-hidden="true">↗</span>
      </a>)}
    </nav>
    <div className="category-image" aria-live="polite">
      {activeItem ? <img ref={imageRef} src={activeItem.image} alt={`Ambiente de ${activeItem.title}`} /> : <img src="/images/store-cases.jpg" alt="Parede de capas e acessórios selecionados" />}
      <div className="category-image-caption"><span>EM DESTAQUE</span><strong>{activeItem?.title || 'Encontre o que combina com você'}</strong></div>
    </div>
  </div>;
}

function MaskedHeading({ text, src }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tween = gsap.fromTo(ref.current, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power3.inOut' });
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { tween.play(); observer.disconnect(); } }, { threshold: 0.3 });
    tween.pause(); observer.observe(ref.current);
    return () => { observer.disconnect(); tween.kill(); };
  }, []);
  return <h2 className="masked-heading" ref={ref} aria-label={text} style={{ backgroundImage: `url(${src})` }}><span>{text}</span></h2>;
}

export default function App() {
  const [selected, setSelected] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroPhone = useRef(null);
  const colors = ['#111313', '#dedbd4', '#9bb7e5', '#7c344e'];
  useEffect(() => {
    const onScroll = () => setScrollProgress(Math.min(100, window.scrollY / (document.documentElement.scrollHeight - innerHeight || 1) * 100));
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    const node = heroPhone.current;
    if (!node || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const media = matchMedia('(pointer: fine)');
    const onMove = e => {
      const box = node.getBoundingClientRect();
      const x = (e.clientX - box.left) / box.width - 0.5;
      const y = (e.clientY - box.top) / box.height - 0.5;
      gsap.to(node, { rotateY: x * 8, rotateX: -y * 6, duration: 0.7, ease: 'power2.out' });
    };
    const onLeave = () => gsap.to(node, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'power3.out' });
    if (media.matches) { node.addEventListener('pointermove', onMove); node.addEventListener('pointerleave', onLeave); }
    return () => { node.removeEventListener('pointermove', onMove); node.removeEventListener('pointerleave', onLeave); gsap.killTweensOf(node); };
  }, []);
  const closeMenu = () => setMenuOpen(false);
  return <>
    <LoadingExperience />
    <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }} />
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Atelier Mobile, início"><span className="wordmark-mark">A.</span><span>ATELIER<br />MOBILE</span></a>
      <button className="menu-toggle" aria-expanded={menuOpen} aria-label={menuOpen ? 'Fechar navegação' : 'Abrir navegação'} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Navegação principal"><a href="#colecao" onClick={closeMenu}>Coleção</a><a href="#universo" onClick={closeMenu}>Universo</a><a href="#acessorios" onClick={closeMenu}>Acessórios</a><a className="nav-cta" href="#colecao" onClick={closeMenu}>Explorar <span>↗</span></a></nav>
    </header>
    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="eyebrow"><i /> CURADORIA DE TECNOLOGIA · DESDE O PRIMEIRO TOQUE</p><h1 id="hero-title" tabIndex="-1">Tecnologia,<br /><em>com intenção.</em></h1><p className="hero-description">Dispositivos que fazem mais sentido para o seu jeito de viver. Uma curadoria pessoal de smartphones e acessórios.</p><a className="button button-light" href="#colecao">Descobrir a coleção <span>↘</span></a></div>
        <div className="hero-visual" aria-label="Seleção de cores de iPhone"><div className="visual-glow" /><div className="visual-ring ring-one" /><div className="visual-ring ring-two" /><img ref={heroPhone} className="hero-product" src="/images/iphone-colors.jpg" alt="Quatro opções de acabamento para smartphone" /><span className="visual-caption">UMA NOVA PERSPECTIVA<br />A CADA DETALHE</span><span className="visual-coordinate">FIG. 01 — IPHONE</span></div>
        <div className="hero-meta"><span>01 / 04</span><span>ENCONTRE SEU PRÓXIMO</span><span>SCROLL PARA EXPLORAR ↓</span></div>
      </section>
      <section id="colecao" className="collection section-pad">
        <div className="section-heading"><div><p className="eyebrow">ESCOLHA COM CALMA</p><h2>O próximo capítulo<br />começa <em>por aqui.</em></h2></div><p className="section-aside">Uma seleção pensada para durar.<br />Encontre a tecnologia que acompanha<br />o seu cotidiano.</p></div>
        <FlowingMenu />
      </section>
      <section id="universo" className="statement-section"><div className="statement-top"><span>OBJETOS FEITOS PARA FICAR</span><span>ATELIER MOBILE — SELEÇÃO Nº 01</span></div><MaskedHeading text="TECNOLOGIA QUE VOCÊ SENTE" src="/images/store-iphone.jpg" /><div className="statement-bottom"><span>Design é o que você vê.</span><span>Experiência é o que fica.</span></div></section>
      <section className="feature section-pad">
        <div className="feature-image-wrap"><img src="/images/iphone-colors.jpg" alt="Smartphones em quatro acabamentos distintos" loading="lazy" /><span className="image-index">01 — ACABAMENTOS</span></div>
        <div className="feature-copy"><p className="eyebrow">UMA ESCOLHA PESSOAL</p><h2>Seu olhar.<br />Sua <em>assinatura.</em></h2><p>Quatro acabamentos, quatro maneiras de levar sua tecnologia pelo mundo. Qual conversa com você?</p><div className="color-selector" role="group" aria-label="Selecionar acabamento"><button aria-label="Ver acabamento escuro" aria-pressed={selected === 0} style={{ '--swatch': colors[0] }} onClick={() => setSelected(0)} /><button aria-label="Ver acabamento claro" aria-pressed={selected === 1} style={{ '--swatch': colors[1] }} onClick={() => setSelected(1)} /><button aria-label="Ver acabamento azul" aria-pressed={selected === 2} style={{ '--swatch': colors[2] }} onClick={() => setSelected(2)} /><button aria-label="Ver acabamento vinho" aria-pressed={selected === 3} style={{ '--swatch': colors[3] }} onClick={() => setSelected(3)} /><span>{['Meia-noite', 'Prateado', 'Azul', 'Vinho'][selected]}</span></div><a href="#contato" className="text-link">Consultar disponibilidade <span>↗</span></a></div>
      </section>
      <section id="acessorios" className="accessories section-pad"><div className="accessories-copy"><p className="eyebrow">O UNIVERSO AO REDOR</p><h2>O detalhe<br />muda <em>tudo.</em></h2><p>Capas, proteção e acessórios escolhidos para fazer parte do seu dia — e do seu dispositivo.</p><a className="button button-outline" href="#contato">Explorar acessórios <span>↗</span></a></div><div className="accessories-photo"><img src="/images/store-accessories.jpg" alt="Acessórios para smartphones organizados em uma parede de exposição" loading="lazy" /><span>PEÇAS PARA O SEU DIA A DIA</span></div></section>
      <section className="store-note"><div className="store-note-image"><img src="/images/store-iphone.jpg" alt="Espaço de demonstração de produtos na loja" loading="lazy" /></div><div><p className="eyebrow">EXPERIÊNCIA, DE PERTO</p><h2>Escolher também<br />é <em>experimentar.</em></h2><p>Conheça os dispositivos, compare acabamentos e encontre a opção que faz sentido para você.</p><a href="#contato" className="text-link">Fale com a equipe <span>↗</span></a></div></section>
      <section id="contato" className="contact section-pad"><p className="eyebrow">VAMOS ENCONTRAR O SEU?</p><h2>Uma boa escolha<br />começa com <em>uma conversa.</em></h2><a href="#top" className="button button-light">Voltar ao início <span>↑</span></a><p className="contact-note">Para consultar preços e disponibilidade, entre em contato com a equipe da loja.</p></section>
    </main>
    <footer className="site-footer"><a className="wordmark" href="#top"><span className="wordmark-mark">A.</span><span>ATELIER<br />MOBILE</span></a><span>TECNOLOGIA, COM INTENÇÃO.</span><a href="#top">VOLTAR AO TOPO ↑</a><small>© {new Date().getFullYear()} ATELIER MOBILE</small></footer>
  </>;
}
