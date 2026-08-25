/**
 * GSAP Animation Hooks
 * Reusable scroll-triggered animations for all pages
 */

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Fade-in-up animation triggered on scroll
 */
export const useGsapFadeInUp = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        ...options,
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
};

/**
 * Fade-in from left animation
 */
export const useGsapFadeInLeft = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        x: -80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        ...options,
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
};

/**
 * Fade-in from right animation
 */
export const useGsapFadeInRight = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        x: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        ...options,
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
};

/**
 * Scale-in animation
 */
export const useGsapScaleIn = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        ...options,
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
};

/**
 * Stagger children animation on scroll
 */
export const useGsapStagger = (childSelector = ':scope > *', options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const children = ref.current.querySelectorAll(childSelector);
    if (children.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(children, {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        ...options,
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
};

/**
 * Hero entrance animation (no scroll trigger, plays on mount)
 */
export const useGsapHeroEntrance = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Badge
      tl.from('.hero-badge', {
        y: -30,
        opacity: 0,
        duration: 0.6,
      });

      // Title words
      tl.from('.hero-title', {
        y: 40,
        opacity: 0,
        duration: 0.8,
      }, '-=0.3');

      // Description
      tl.from('.hero-desc', {
        y: 30,
        opacity: 0,
        duration: 0.7,
      }, '-=0.4');

      // Buttons
      tl.from('.hero-buttons', {
        y: 20,
        opacity: 0,
        duration: 0.6,
      }, '-=0.3');

      // Stats
      tl.from('.hero-stat', {
        y: 30,
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        stagger: 0.12,
      }, '-=0.3');

      // Hero image
      tl.from('.hero-image-main', {
        x: 80,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
      }, '-=1.2');

      // Sub images
      tl.from('.hero-image-sub', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
      }, '-=0.5');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
};

/**
 * Page header entrance animation (for inner pages)
 */
export const useGsapPageHeader = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('h1', {
        y: 40,
        opacity: 0,
        duration: 0.8,
      });

      tl.from('p', {
        y: 20,
        opacity: 0,
        duration: 0.6,
      }, '-=0.4');
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
};

/**
 * Counter animation for stats
 */
export const useGsapCounter = (endValue, options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: endValue,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = Math.floor(obj.val);
          }
        },
        ...options,
      });
    });

    return () => ctx.revert();
  }, [endValue]);

  return ref;
};

/**
 * Navbar entrance animation
 */
export const useGsapNavbar = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
};

/**
 * Magnetic hover effect for buttons/cards
 */
export const useGsapMagnetic = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * 0.15,
        y: y * 0.15,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return ref;
};

/**
 * Parallax effect on scroll
 */
export const useGsapParallax = (speed = 0.3) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: () => speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
};

/**
 * Text reveal animation (character by character)
 */
export const useGsapTextReveal = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const text = ref.current.textContent;
    ref.current.innerHTML = text
      .split('')
      .map((char) => `<span class="gsap-char" style="display:inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('');

    const ctx = gsap.context(() => {
      gsap.from('.gsap-char', {
        y: 20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.02,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
};

/**
 * Float animation (continuous subtle floating)
 */
export const useGsapFloat = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        ...options,
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
};

/**
 * Text fill animation on scroll (gradually fills text color based on scroll position)
 */
export const useGsapTextFillScrub = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    // Set initial CSS for background clip text effect
    // We use a linear gradient from #020617 (dark slate) to white/transparent
    // The background size is 200% so we can shift it from right (white) to left (dark)
    gsap.set(ref.current, {
      backgroundImage: 'linear-gradient(to right, #020617 50%, #cbd5e1 50%)', 
      backgroundSize: '200% 100%',
      backgroundPosition: '100% 0',
      webkitBackgroundClip: 'text',
      webkitTextFillColor: 'transparent',
      color: 'transparent',
    });

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        backgroundPosition: '0% 0',
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          end: 'top 40%',
          scrub: 1, // Smooth scrub
        },
        ...options,
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
};

export { gsap, ScrollTrigger };
