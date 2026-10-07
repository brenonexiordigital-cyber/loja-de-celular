import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const PHONE_IMAGE = '/images/iphone-17-pro-max-orange.jpg';

export default function LoadingExperience() {
  const [visible, setVisible] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [ready, setReady] = useState(false);
  const overlayRef = useRef(null);
  const phoneRef = useRef(null);
  const copyRef = useRef(null);
  const apertureRef = useRef(null);
  const skipButtonRef = useRef(null);
  const restoreOverflow = useRef('');
  const backgroundInert = useRef([]);
  const wasPresented = useRef(false);

  useEffect(() => {
    if (!visible) return undefined;

    restoreOverflow.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    wasPresented.current = true;
    backgroundInert.current = [...document.querySelectorAll('.scroll-progress, .site-header, main, .site-footer')]
      .map(element => [element, element.inert]);
    backgroundInert.current.forEach(([element]) => { element.inert = true; });
    skipButtonRef.current?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = restoreOverflow.current;
      backgroundInert.current.forEach(([element, wasInert]) => { element.inert = wasInert; });
    };
  }, [visible]);

  useEffect(() => {
    if (visible || !wasPresented.current) return;
    wasPresented.current = false;
    document.getElementById('hero-title')?.focus({ preventScroll: true });
  }, [visible]);

  useEffect(() => {
    if (!visible || !ready || !phoneRef.current) return undefined;

    const finish = () => {
      document.body.style.overflow = restoreOverflow.current;
      setVisible(false);
    };

    const timeline = gsap.timeline({ onComplete: finish });
    timeline
      .fromTo(phoneRef.current, { autoAlpha: 0, scale: 0.9, y: 22 }, {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
      })
      .to({}, { duration: 0.24 })
      .to(copyRef.current, { autoAlpha: 0, y: -8, duration: 0.22, ease: 'power2.in' }, 'zoom')
      .to(phoneRef.current, {
        scale: 10,
        x: () => window.innerWidth * 0.14,
        y: () => window.innerHeight * 0.28,
        transformOrigin: '24.5% 12.8%',
        duration: 1.22,
        ease: 'power3.in',
      }, 'zoom')
      .fromTo(apertureRef.current, { scale: 0.01, autoAlpha: 0 }, {
        scale: 1,
        autoAlpha: 1,
        duration: 0.54,
        ease: 'power2.inOut',
      }, '-=0.32')
      .to(overlayRef.current, { autoAlpha: 0, duration: 0.28, ease: 'power1.out' });

    return () => timeline.kill();
  }, [ready, visible]);

  useEffect(() => {
    if (!visible) return undefined;
    const onKeyDown = event => {
      if (event.key === 'Escape') {
        document.body.style.overflow = restoreOverflow.current;
        setVisible(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [visible]);

  if (!visible) return null;

  const skip = () => {
    document.body.style.overflow = restoreOverflow.current;
    setVisible(false);
  };

  return (
    <div className="loading-experience" ref={overlayRef} role="dialog" aria-modal="true" aria-label="Apresentação do iPhone 17 Pro Max">
      <a className="loading-wordmark" href="#top" aria-label="Atelier Mobile">
        <span className="wordmark-mark">A.</span><span>ATELIER<br />MOBILE</span>
      </a>
      <button ref={skipButtonRef} className="loading-skip" type="button" onClick={skip}>Pular intro <span aria-hidden="true">↗</span></button>
      <div className="loading-product-stage">
        <img
          ref={phoneRef}
          className="loading-product"
          src={PHONE_IMAGE}
          alt="Traseira laranja do iPhone 17 Pro Max, com foco no conjunto de câmeras"
          onLoad={() => setReady(true)}
          onError={skip}
          fetchPriority="high"
        />
        <div className="loading-aperture" ref={apertureRef} aria-hidden="true" />
      </div>
      <div className="loading-caption" ref={copyRef}>
        <p>ATELIER MOBILE <span>·</span> SÉRIE 17 PRO</p>
        <strong>Uma nova perspectiva.</strong>
        <span>iPhone 17 Pro Max</span>
      </div>
    </div>
  );
}
