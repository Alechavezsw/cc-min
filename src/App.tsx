/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Pickaxe, 
  TrendingUp, 
  Globe, 
  Users, 
  Factory, 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin,
  Menu,
  X,
  HardHat,
  Mountain,
  ChevronRight,
  Zap,
  Target,
  BarChart3,
  Search
} from 'lucide-react';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Preloader Component
const Preloader = () => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power4.out"
    })
    .to(textRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.8,
      delay: 0.5,
      ease: "power4.in"
    })
    .to(preloaderRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "expo.inOut"
    });
  }, []);

  return (
    <div ref={preloaderRef} className="fixed inset-0 z-[200] bg-[#ffb800] flex items-center justify-center overflow-hidden">
      <div ref={textRef} className="opacity-0 translate-y-10">
        <span className="text-6xl md:text-9xl font-display uppercase italic tracking-tighter text-black">
          MINE<span className="opacity-30">MARK</span>
        </span>
      </div>
    </div>
  );
};

// Magnetic Component
const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const magneticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = magneticRef.current;
    if (!element) return;

    const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.3);
      yTo(y * 0.3);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <div ref={magneticRef}>{children}</div>;
};

const services = [
  {
    title: "Generación de Leads B2B",
    description: "Segmentación de precisión para tomadores de decisiones en proyectos mineros globales.",
    icon: <Target className="w-10 h-10 text-[#ffb800]" />,
  },
  {
    title: "Branding Industrial",
    description: "Creando identidades de autoridad para las industrias más exigentes del mundo.",
    icon: <Factory className="w-10 h-10 text-[#ffb800]" />,
  },
  {
    title: "SEO Técnico",
    description: "Dominando los resultados de búsqueda para equipos y servicios mineros de alto valor.",
    icon: <Search className="w-10 h-10 text-[#ffb800]" />,
  },
  {
    title: "Inteligencia de Mercado",
    description: "Información impulsada por datos para la expansión en centros de extracción emergentes.",
    icon: <BarChart3 className="w-10 h-10 text-[#ffb800]" />,
  },
  {
    title: "Automatización Comercial",
    description: "Flujos automatizados para convertir interés técnico en reuniones calificadas de alto valor.",
    icon: <Zap className="w-10 h-10 text-[#ffb800]" />,
  },
  {
    title: "Expansión Internacional",
    description: "Estrategias multirregión para posicionarte del 1 al 6 en mercados mineros prioritarios.",
    icon: <Globe className="w-10 h-10 text-[#ffb800]" />,
  },
];

const stats = [
  { label: "Proyectos Mineros", value: "150+" },
  { label: "Leads Cualificados", value: "5k+" },
  { label: "ROI Promedio", value: "3.5x" },
  { label: "Presencia Global", value: "12" },
];

const projects = [
  {
    title: "Expansión de Oro Andino",
    category: "Entrada al Mercado",
    image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Branding de Litio Ártico",
    category: "Diseño de Identidad",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Extracción en Mar Profundo",
    category: "Generación de Leads",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "SEO de Cobre Global",
    category: "SEO Técnico",
    image: "https://images.unsplash.com/photo-1535615615570-3b839f4359be?auto=format&fit=crop&q=80&w=800",
  },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const whyUsRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const projectsSectionRef = useRef<HTMLDivElement>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);

  // Count Up Animation
  const countUp = (el: HTMLElement, target: number, duration: number = 2) => {
    let obj = { value: 0 };
    gsap.to(obj, {
      value: target,
      duration: duration,
      ease: "power3.out",
      onUpdate: () => {
        el.innerText = Math.floor(obj.value).toString() + (el.dataset.suffix || "");
      }
    });
  };

  // Split Text Helper
  const splitText = (el: HTMLElement) => {
    const text = el.innerText;
    el.innerHTML = text.split("").map(char => 
      `<span class="char">${char === " " ? "&nbsp;" : char}</span>`
    ).join("");
    return el.querySelectorAll(".char");
  };

  useLayoutEffect(() => {
    // Lenis Smooth Scroll
    const lenis = new Lenis();

    lenis.on('scroll', ScrollTrigger.update);

    const lenisRaf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(lenisRaf);
    gsap.ticker.lagSmoothing(0);

    // Scroll Progress
    gsap.to(scrollProgressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        scrub: 0.3,
        trigger: "body",
        start: "top top",
        end: "bottom bottom"
      }
    });

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // Custom Cursor Logic
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
      });
      gsap.to(followerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3
      });
    };
    window.addEventListener('mousemove', moveCursor);

    // GSAP Context for Animations
    const ctx = gsap.context(() => {
      // Hero Reveal
      const heroTl = gsap.timeline({ delay: 2.2 }); // Wait for preloader
      heroTl.from(".hero-line span", {
        y: 200,
        skewY: 10,
        duration: 1.5,
        stagger: 0.1,
        ease: "power4.out"
      })
      .from(".hero-meta", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power3.out"
      }, "-=1")
      .from(".hero-img-container", {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 2,
        ease: "expo.inOut"
      }, "-=1.5")
      .from(".hero-img", {
        scale: 1.5,
        duration: 2,
        ease: "expo.out"
      }, "-=2");

      // Parallax Hero Image
      gsap.to(".hero-img", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        y: 200,
        scale: 1.2
      });

      // Stats Stagger & Count Up
      gsap.utils.toArray<HTMLElement>('.stat-value').forEach((stat) => {
        const target = parseInt(stat.dataset.target || "0");
        ScrollTrigger.create({
          trigger: stat,
          start: "top 90%",
          onEnter: () => countUp(stat, target)
        });
      });

      gsap.from(".stat-card", {
        scrollTrigger: {
          trigger: ".stats-container",
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out"
      });

      // Services Cards
      gsap.from(".service-item", {
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 70%",
        },
        x: -100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out"
      });

      // Why Us Section
      gsap.from(".why-text", {
        scrollTrigger: {
          trigger: whyUsRef.current,
          start: "top 70%",
        },
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
      });

      // Horizontal Marquee
      gsap.to(".marquee-inner", {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1
      });

      // Horizontal Projects Scroll
      const projectsWidth = projectsContainerRef.current?.scrollWidth || 0;
      const windowWidth = window.innerWidth;
      
      gsap.to(projectsContainerRef.current, {
        x: -(projectsWidth - windowWidth + 100),
        ease: "none",
        scrollTrigger: {
          trigger: projectsSectionRef.current,
          start: "top top",
          end: () => `+=${projectsWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Reveal sections on scroll
      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((section) => {
        const heading = section.querySelector('.split-heading') as HTMLElement;
        if (heading) {
          const chars = splitText(heading);
          gsap.from(chars, {
            scrollTrigger: {
              trigger: heading,
              start: "top 85%",
            },
            y: 100,
            opacity: 0,
            rotateX: -90,
            stagger: 0.02,
            duration: 1,
            ease: "power4.out"
          });
        }

        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out"
        });
      });

    }, heroRef);

    // Preloader timeout
    const timer = setTimeout(() => setIsLoading(false), 2000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', moveCursor);
      ctx.revert();
      gsap.ticker.remove(lenisRaf);
      lenis.destroy();
      clearTimeout(timer);
    };
  }, []);

  const handleMouseEnter = () => {
    gsap.to(followerRef.current, { scale: 2.5, backgroundColor: "rgba(255, 184, 0, 0.1)", duration: 0.3 });
  };

  const handleMouseLeave = () => {
    gsap.to(followerRef.current, { scale: 1, backgroundColor: "transparent", duration: 0.3 });
  };

  return (
    <div className="relative min-h-screen font-sans selection:bg-[#ffb800] selection:text-black">
      <Preloader />
      
      {/* Scroll Progress Bar */}
      <div ref={scrollProgressRef} className="fixed top-0 left-0 w-full h-1 bg-[#ffb800] z-[110] origin-left scale-x-0" />

      {/* Noise & Cursor */}
      <div className="noise-bg" />
      <div className="fixed inset-0 z-[1] grid-overlay pointer-events-none" />
      <div className="fixed inset-0 z-[2] grain-overlay pointer-events-none" />
      
      {/* Industrial Frame */}
      <div className="fixed inset-10 z-[120] border border-white/5 pointer-events-none hidden lg:block">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a0a0a] px-4 text-[8px] font-mono text-white/20 tracking-[0.5em] uppercase">
          MineMark Control System v2.6
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-[#0a0a0a] px-4 text-[8px] font-mono text-white/20 tracking-[0.5em] uppercase">
          Sector: 7G-Extraction-Alpha
        </div>
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 rotate-90 bg-[#0a0a0a] px-4 text-[8px] font-mono text-white/20 tracking-[0.5em] uppercase">
          Status: Operational
        </div>
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 -rotate-90 bg-[#0a0a0a] px-4 text-[8px] font-mono text-white/20 tracking-[0.5em] uppercase">
          Depth: 1,240M
        </div>
      </div>

      <div ref={cursorRef} className="custom-cursor hidden md:block" />
      <div ref={followerRef} className="custom-cursor-follower hidden md:block" />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 ${scrolled ? 'bg-black/90 backdrop-blur-2xl py-4 border-b border-white/10' : 'bg-transparent py-10'}`}>
        <div className="max-w-[1800px] mx-auto px-10 flex justify-between items-center">
          <Magnetic>
            <div className="flex items-center gap-4 group cursor-pointer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <div className="bg-[#ffb800] p-3 rounded-full transform group-hover:rotate-[360deg] transition-transform duration-1000">
                <Pickaxe className="w-6 h-6 text-black" />
              </div>
              <span className="text-3xl font-display tracking-tighter uppercase italic leading-none">
                MINE<span className="text-[#ffb800]">MARK</span>
              </span>
            </div>
          </Magnetic>

          <div className="hidden lg:flex items-center gap-16">
            {[
              { label: 'Servicios', id: 'services' },
              { label: 'Nosotros', id: 'about' },
              { label: 'Casos', id: 'cases' },
              { label: 'Contacto', id: 'contact' }
            ].map((item) => (
              <div key={item.id}>
                <Magnetic>
                  <a 
                    href={`#${item.id}`} 
                    className="text-[12px] font-black uppercase tracking-[0.4em] text-white/50 hover:text-[#ffb800] transition-all"
                    onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                  >
                    {item.label}
                  </a>
                </Magnetic>
              </div>
            ))}
            <Magnetic>
              <button 
                className="bg-white text-black px-10 py-4 rounded-full text-[12px] font-black uppercase tracking-widest hover:bg-[#ffb800] transition-all"
                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
              >
                Empezar
              </button>
            </Magnetic>
          </div>

          <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[90] bg-[#0a0a0a] transition-all duration-700 flex flex-col items-center justify-center gap-10 ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        {[
          { label: 'Servicios', id: 'services' },
          { label: 'Nosotros', id: 'about' },
          { label: 'Casos', id: 'cases' },
          { label: 'Contacto', id: 'contact' }
        ].map((item) => (
          <a key={item.id} href={`#${item.id}`} className="text-6xl font-display uppercase italic tracking-tighter text-white hover:text-[#ffb800]" onClick={() => setIsMenuOpen(false)}>
            {item.label}
          </a>
        ))}
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 hero-img-container">
          <img 
            src="https://images.unsplash.com/photo-1578307336416-0c97e827c953?auto=format&fit=crop&q=80&w=2000" 
            alt="Mining Site" 
            className="hero-img w-full h-full object-cover opacity-30 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        </div>

        <div className="relative z-10 text-center px-6">
          <div className="hero-meta mb-10 flex flex-col items-center gap-4">
            <span className="text-[12px] font-black uppercase tracking-[0.6em] text-[#ffb800] bg-[#ffb800]/10 px-6 py-2 rounded-full border border-[#ffb800]/20">
              Especialistas en Marketing de Extracción
            </span>
            <div className="flex gap-4 text-[10px] font-mono text-white/20 uppercase tracking-widest">
              <span>LAT: 22.2725° S</span>
              <span>LNG: 15.2725° E</span>
              <span className="text-[#ffb800]/40">ALT: 1,240M</span>
            </div>
          </div>
          
          <h1 className="text-[12vw] lg:text-[14vw] font-display uppercase italic leading-[0.8] tracking-tighter text-white">
            <div className="hero-line overflow-hidden"><span>EXCAVANDO</span></div>
            <div className="hero-line overflow-hidden text-[#ffb800]"><span>MÁS PROFUNDO</span></div>
            <div className="hero-line overflow-hidden"><span>POR VALOR</span></div>
          </h1>

          <div className="hero-meta mt-16 max-w-2xl mx-auto">
            <p className="text-xl lg:text-2xl text-white/60 font-light leading-relaxed mb-12">
              Posicionamos a proveedores mineros y gigantes de la extracción a la vanguardia del panorama industrial global.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Magnetic>
                <button 
                  className="group bg-[#ffb800] text-black px-12 py-6 rounded-full font-black uppercase tracking-widest text-sm flex items-center gap-4 hover:bg-white transition-all"
                  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                >
                  Explorar Soluciones <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </Magnetic>
              <Magnetic>
                <button 
                  className="px-12 py-6 rounded-full font-black uppercase tracking-widest text-sm border border-white/20 hover:border-[#ffb800] transition-all"
                  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                >
                  Ver Casos de Estudio
                </button>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <div className="w-[1px] h-20 bg-gradient-to-b from-[#ffb800] to-transparent" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Deslizar</span>
        </div>
      </section>

      {/* Stats Section */}
      <section className="reveal-section stats-container py-40 bg-black border-y border-white/5 relative z-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1579975096649-e773152b04cb?auto=format&fit=crop&q=80&w=2000" 
            alt="Industrial Machinery" 
            className="w-full h-full object-cover opacity-10 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
        </div>
        <div className="max-w-[1800px] mx-auto px-10 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-20">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div 
                  className="stat-value text-8xl lg:text-[120px] font-display text-white/10 group-hover:text-[#ffb800] transition-colors duration-700 leading-none mb-4"
                  data-target={stat.value.replace(/[^0-9]/g, '')}
                  data-suffix={stat.value.replace(/[0-9]/g, '')}
                >
                  0{stat.value.replace(/[0-9]/g, '')}
                </div>
                <div className="text-[12px] font-black uppercase tracking-[0.4em] text-white/40 group-hover:text-white transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="reveal-section py-60 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ffb800 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>
        <div className="max-w-[1800px] mx-auto px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-40 items-start">
            <div className="sticky top-40">
              <div className="flex items-center gap-6 mb-10">
                <div className="w-20 h-[2px] bg-[#ffb800]" />
                <span className="text-[12px] font-black uppercase tracking-[0.6em] text-[#ffb800]">Capacidades</span>
              </div>
              <h2 className="split-heading text-8xl lg:text-[120px] font-display uppercase italic leading-[0.85] tracking-tighter mb-16">
                MOTOR DE <br /> <span className="text-white/20">MARKETING</span> <br /> DE PRECISIÓN
              </h2>
              <p className="text-2xl text-white/40 font-light max-w-md leading-relaxed">
                Nuestro enfoque se basa en la profundidad técnica y la intuición industrial. No solo comercializamos; diseñamos el crecimiento.
              </p>
            </div>

            <div className="space-y-20">
              {services.map((service, idx) => (
                <div 
                  key={idx} 
                  className="service-item group border-b border-white/10 pb-20"
                  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                >
                  <div className="flex justify-between items-start mb-10 relative">
                    <div className="absolute -top-4 -left-4 w-2 h-2 bg-[#ffb800]/20 rounded-full" />
                    <div className="absolute -top-4 -right-4 w-2 h-2 bg-[#ffb800]/20 rounded-full" />
                    <div className="p-6 bg-white/5 rounded-2xl group-hover:bg-[#ffb800] transition-all duration-500 border border-white/5 group-hover:border-[#ffb800]">
                      <div className="group-hover:text-black transition-colors">
                        {service.icon}
                      </div>
                    </div>
                    <span className="text-6xl font-display text-white/5 group-hover:text-[#ffb800]/20 transition-colors">
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <h4 className="text-5xl font-display uppercase italic mb-6 group-hover:text-[#ffb800] transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-xl text-white/40 leading-relaxed max-w-xl group-hover:text-white/80 transition-colors">
                    {service.description}
                  </p>
                  <button className="mt-10 flex items-center gap-4 text-[12px] font-black uppercase tracking-[0.4em] text-[#ffb800] group-hover:gap-8 transition-all">
                    Saber Más <ChevronRight />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Showcase - Horizontal Scroll */}
      <section id="cases" ref={projectsSectionRef} className="h-screen bg-black overflow-hidden flex flex-col justify-center">
        <div className="px-10 mb-20">
          <div className="flex items-center gap-6 mb-10">
            <div className="w-20 h-[2px] bg-[#ffb800]" />
            <span className="text-[12px] font-black uppercase tracking-[0.6em] text-[#ffb800]">Casos Seleccionados</span>
          </div>
          <h2 className="split-heading text-8xl lg:text-[120px] font-display uppercase italic leading-none tracking-tighter">
            IMPACTO <span className="text-white/20">GLOBAL</span>
          </h2>
        </div>
        
        <div ref={projectsContainerRef} className="flex gap-20 px-10">
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className="flex-shrink-0 w-[400px] lg:w-[600px] group cursor-pointer"
              onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl mb-10 group">
                <div className="absolute inset-0 z-10 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }} />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-700" />
                <div className="absolute bottom-10 left-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ffb800] bg-black/80 px-4 py-2 rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>
              <h4 className="text-4xl font-display uppercase italic group-hover:text-[#ffb800] transition-colors">
                {project.title}
              </h4>
            </div>
          ))}
          <div className="flex-shrink-0 w-[400px] flex items-center justify-center">
            <button className="group flex flex-col items-center gap-6" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <div className="w-40 h-40 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-[#ffb800] group-hover:border-[#ffb800] transition-all duration-700">
                <ArrowRight className="w-12 h-12 group-hover:text-black transition-colors" />
              </div>
              <span className="text-[12px] font-black uppercase tracking-[0.6em] text-white/40 group-hover:text-white transition-colors">Ver Todos los Casos</span>
            </button>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="about" ref={whyUsRef} className="reveal-section py-60 bg-[#ffb800] text-black relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 grayscale mix-blend-multiply">
          <img 
            src="https://images.unsplash.com/photo-1580048215322-3937375776f2?auto=format&fit=crop&q=80&w=2000" 
            alt="Mining Truck" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute top-0 right-0 p-20 opacity-10">
          <Pickaxe size={600} />
        </div>
        
        <div className="max-w-[1800px] mx-auto px-10 relative z-10">
          <div className="why-text max-w-5xl">
            <h3 className="split-heading text-8xl lg:text-[180px] font-display uppercase italic leading-[0.8] tracking-tighter mb-20">
              HABLAMOS <br /> <span className="opacity-30">INDUSTRIAL</span> <br /> CON FLUIDEZ
            </h3>
            
            <div className="grid md:grid-cols-2 gap-20">
              <div className="space-y-12">
                <div className="flex gap-10">
                  <div className="text-4xl font-display">01</div>
                  <div>
                    <h5 className="text-3xl font-black uppercase italic mb-4">Profundidad Técnica</h5>
                    <p className="text-xl font-medium opacity-70 leading-relaxed">
                      Entendemos la ingeniería, la cadena de suministro y el panorama regulatorio de la minería global.
                    </p>
                  </div>
                </div>
                <div className="flex gap-10">
                  <div className="text-4xl font-display">02</div>
                  <div>
                    <h5 className="text-3xl font-black uppercase italic mb-4">Red Global</h5>
                    <p className="text-xl font-medium opacity-70 leading-relaxed">
                      Acceso directo a los tomadores de decisiones en los principales centros mineros de Latam, África y Australia.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-black text-white p-12 rounded-3xl flex flex-col justify-between">
                <Zap className="text-[#ffb800] w-16 h-16 mb-20" />
                <div>
                  <h5 className="text-4xl font-display uppercase italic mb-6">¿Listo para Escalar?</h5>
                  <p className="text-lg opacity-60 mb-10">
                    Únete a las filas de los líderes del mercado que han redefinido su presencia con MineMark.
                  </p>
                  <button className="w-full bg-[#ffb800] text-black py-6 rounded-full font-black uppercase tracking-widest hover:bg-white transition-all">
                    Contáctanos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-20 bg-black overflow-hidden border-y border-[#ffb800]/20 relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #ffb800, #ffb800 20px, transparent 20px, transparent 40px)' }} />
        <div className="marquee-inner flex whitespace-nowrap relative z-10">
          {[1, 2].map(i => (
            <div key={i} className="flex items-center gap-20 px-10">
              <span className="text-9xl font-display uppercase italic text-white/10 hover:text-[#ffb800] transition-colors cursor-default">MINERÍA</span>
              <div className="w-20 h-20 bg-[#ffb800] rounded-full" />
              <span className="text-9xl font-display uppercase italic text-white/10 hover:text-[#ffb800] transition-colors cursor-default">MARKETING</span>
              <div className="w-20 h-20 border-2 border-white/20 rounded-full" />
              <span className="text-9xl font-display uppercase italic text-white/10 hover:text-[#ffb800] transition-colors cursor-default">ESTRATEGIA</span>
              <div className="w-20 h-20 bg-white rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <section id="contact" className="reveal-section py-60 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80&w=2000" 
            alt="Night Mining" 
            className="w-full h-full object-cover opacity-20 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        </div>
        <div className="max-w-[1800px] mx-auto px-10 text-center relative z-10">
          <h2 className="split-heading text-[12vw] font-display uppercase italic leading-none tracking-tighter mb-20">
            EMPIEZA A <span className="text-[#ffb800]">EXCAVAR</span>
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-px bg-white/10 border border-white/10 max-w-6xl mx-auto mb-40">
            {[
              { icon: <Mail />, label: "Correo", value: "hello@minemark.com" },
              { icon: <Phone />, label: "Teléfono", value: "+1 800 MINE MARK" },
              { icon: <MapPin />, label: "Oficina", value: "Sede Global / Remoto" }
            ].map((item, idx) => (
              <div key={idx} className="bg-[#0a0a0a]/80 backdrop-blur-md p-20 group hover:bg-[#ffb800] transition-all duration-700" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="text-[#ffb800] group-hover:text-black mb-10 flex justify-center group-hover:scale-125 transition-transform duration-500">{item.icon}</div>
                <div className="text-[12px] font-black uppercase tracking-[0.6em] text-white/30 group-hover:text-black/40 mb-4">{item.label}</div>
                <div className="text-2xl font-bold group-hover:text-black">{item.value}</div>
              </div>
            ))}
          </div>

          <Magnetic>
            <button 
              className="bg-[#ffb800] text-black px-20 py-10 rounded-full text-4xl font-display uppercase italic tracking-tighter hover:bg-white hover:scale-110 transition-all shadow-[0_0_100px_rgba(255,184,0,0.2)]"
              onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
            >
              Reservar Consulta
            </button>
          </Magnetic>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-black border-t border-white/5">
        <div className="max-w-[1800px] mx-auto px-10">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-40 mb-40">
            <div className="max-w-md">
              <div className="flex items-center gap-4 mb-10">
                <div className="bg-[#ffb800] p-3 rounded-full">
                  <Pickaxe className="w-8 h-8 text-black" />
                </div>
                <span className="text-4xl font-display tracking-tighter uppercase italic">MINE<span className="text-[#ffb800]">MARK</span></span>
              </div>
              <p className="text-2xl text-white/30 leading-relaxed mb-12">
                El referente global en excelencia de marketing industrial para el sector extractivo.
              </p>
              <div className="flex gap-10">
                {['LinkedIn', 'Twitter', 'Vimeo'].map(social => (
                  <a key={social} href="#" className="text-[12px] font-black uppercase tracking-[0.4em] text-white/20 hover:text-white transition-all">
                    {social}
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-40">
              <div>
                <h6 className="text-[12px] font-black uppercase tracking-[0.6em] text-white mb-12">Navegación</h6>
                <ul className="space-y-6">
                  {['Servicios', 'Nosotros', 'Casos', 'Contacto'].map(item => (
                    <li key={item}>
                      <a href="#" className="text-xl text-white/30 hover:text-[#ffb800] transition-all uppercase font-display italic tracking-tighter">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h6 className="text-[12px] font-black uppercase tracking-[0.6em] text-white mb-12">Legal</h6>
                <ul className="space-y-6">
                  {['Privacidad', 'Términos', 'Cookies'].map(item => (
                    <li key={item}>
                      <a href="#" className="text-xl text-white/30 hover:text-[#ffb800] transition-all uppercase font-display italic tracking-tighter">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-10 border-t border-white/5">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/10">
              © 2026 AGENCIA MINEMARK. TODOS LOS DERECHOS RESERVADOS.
            </p>
            <div className="flex items-center gap-6 text-white/10">
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Construido para la Industria</span>
              <div className="w-10 h-[1px] bg-white/10" />
              <span className="text-[10px] font-mono">22° 16' 21" S / 15° 16' 21" E</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
