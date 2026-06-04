import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal<T extends HTMLElement>(
  options: {
    y?: number;
    scale?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
    scrub?: boolean | number;
    start?: string;
  } = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y = 40,
      scale = 0.95,
      opacity = 0,
      duration = 1,
      delay = 0,
      scrub = false,
      start = 'top 85%',
    } = options;

    gsap.set(el, { y, scale, opacity });

    const tween = gsap.to(el, {
      y: 0,
      scale: 1,
      opacity: 1,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: scrub ? undefined : 'play none none none',
        scrub: scrub || false,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [options.y, options.scale, options.opacity, options.duration, options.delay, options.scrub, options.start]);

  return ref;
}
