import { useRef, useCallback, useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Globe, ArrowRight, Instagram, Twitter, Mail, Github, Linkedin, Volume2, VolumeX } from "lucide-react";
import LoadingScreen from "@/components/LoadingScreen";
import GlassCursor from "@/components/GlassCursor";
import SiteNav from "@/components/SiteNav";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

// Constant for the main video
const HERO_VIDEO_URL = "/catbike.mp4";

// Critical components loaded immediately
import AboutSection from "@/components/AboutSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";

// Non-critical sections lazy-loaded for performance
const StatsSection = lazy(() => import("@/components/StatsSection"));
const TechStackSection = lazy(() => import("@/components/TechStackSection"));
const FeaturedProjectSection = lazy(() => import("@/components/FeaturedProjectSection"));
const ContentSection = lazy(() => import("@/components/ContentSection"));
const PhilosophySection = lazy(() => import("@/components/PhilosophySection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const HackathonWinsSection = lazy(() => import("@/components/HackathonWinsSection"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));

function animateOpacity(el: HTMLVideoElement, from: number, to: number, duration: number) {
  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min((now - start) / duration, 1);
    el.style.opacity = String(from + (to - from) * t);
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const Index = () => {
  useSmoothScroll();
  const { hash } = useLocation();
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef(null);
  
  // Use framer-motion's useInView to monitor Hero visibility
  const isHeroInView = useInView(heroRef, { amount: 0.1 });
  
  // Track tab visibility
  const [isTabVisible, setIsTabVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Performance Engine: Control video/audio based on visibility and scroll position
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (isHeroInView && isTabVisible) {
      v.play().catch(() => {
        // Fallback for autoplay blocks
        v.muted = true;
        setIsMuted(true);
      });
    } else {
      v.pause();
    }
  }, [isHeroInView, isTabVisible]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.3;
    }
  }, [loading]);

  // Arriving from another route with a hash (e.g. /#experience): wait for the lazy section, then scroll to it.
  useEffect(() => {
    if (loading || !hash) return;
    let frame = 0;
    let tries = 0;
    const scrollToHash = () => {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView();
      else if (tries++ < 120) frame = requestAnimationFrame(scrollToHash);
    };
    scrollToHash();
    return () => cancelAnimationFrame(frame);
  }, [loading, hash]);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
      if (!newMuted) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  const onCanPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isHeroInView && isTabVisible) {
      v.play().catch(() => {
         v.muted = true;
         setIsMuted(true);
      });
    }
    animateOpacity(v, 0, 1, 500);
  }, [isHeroInView, isTabVisible]);

  const onTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    if (v.duration - v.currentTime <= 0.55) {
      animateOpacity(v, parseFloat(v.style.opacity || "1"), 0, 500);
    }
  }, []);

  const onEnded = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.style.opacity = "0";
    setTimeout(() => {
      v.currentTime = 0;
      if (isHeroInView && isTabVisible) {
        v.play().catch(() => {});
      }
      animateOpacity(v, 0, 1, 500);
    }, 100);
  }, [isHeroInView, isTabVisible]);

  return (
    <div className="bg-background">
      <GlassCursor />
      
      {/* HERO */}
      <section ref={heroRef} className="min-h-screen relative flex flex-col overflow-hidden">
        <video
          ref={videoRef}
          src={HERO_VIDEO_URL}
          muted={isMuted}
          autoPlay
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-bottom transition-all duration-1000 opacity-35 blur-[1px] brightness-[0.55] contrast-[1.1]"
          style={{ opacity: 0 }}
          onCanPlay={onCanPlay}
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.65)_100%)] pointer-events-none z-[1]" />

        <AnimatePresence>
          {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        <SiteNav />

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
          <h1 className="text-5xl md:text-8xl lg:text-9xl text-foreground tracking-tight whitespace-normal md:whitespace-nowrap px-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Building <em className="italic">the Future</em>.
          </h1>
          <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium mt-6 mb-2 max-w-2xl">
            Founder • Builder • Freelancer • Product Developer • New Delhi
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center gap-6">
            <a href="mailto:vedmohan0@gmail.com" className="liquid-glass aave-glass rounded-full px-10 py-5 text-white text-lg font-medium hover:bg-white/10 transition-all border border-white/10 inline-flex items-center gap-3 group">
              Hire Me <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="https://drive.google.com/file/d/16kZBAqm2iPIwfo2YI6_GPTXooJkLrpxX/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white text-sm uppercase tracking-[0.2em] font-medium transition-all border-b border-transparent hover:border-white/20 pb-1 hidden">
              View CV / Resume
            </a>
          </div>
          <p className="text-foreground text-sm leading-relaxed px-4 mt-6 max-w-md font-light">
            Founder of SmoothSend, product developer, and freelance builder working across Web3, AI agents, and practical software products. I care about shipping useful products with clean, thoughtful experiences.
          </p>
        </div>

        {/* Social Icons & Audio Toggle */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 px-12 pb-12 w-full">
          <div className="flex gap-4">
            {[
              { Icon: Twitter, href: "https://x.com/zorothebuilder" },
              { Icon: Github, href: "https://github.com/ivedmohan" },
              { Icon: Linkedin, href: "https://linkedin.com/in/ivedmohan" }
            ].map(({ Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="liquid-glass aave-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all outline outline-1 outline-white/5">
                <Icon size={20} />
              </a>
            ))}
          </div>
          <button onClick={toggleMute} className="liquid-glass aave-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all outline outline-1 outline-white/5 flex items-center gap-3 group">
            <span className="text-[10px] uppercase tracking-widest font-medium opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all transform translate-x-0 md:translate-x-2 md:group-hover:translate-x-0">
              {isMuted ? "Unmute Ambient" : "Mute Experience"}
            </span>
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
      </section>

      <AboutSection />
      <CapabilitiesSection />
      
      {/* Lazy Loaded Sections */}
      <Suspense fallback={<div className="h-40 flex items-center justify-center"><div className="w-8 h-8 rounded-full border-t-2 border-white/20 animate-spin" /></div>}>
        <ExperienceSection />
        <StatsSection />
        <TechStackSection />
        <FeaturedProjectSection />
        <ContentSection />
        <PhilosophySection />
        <ProjectsSection />
        <HackathonWinsSection />
      </Suspense>

      {/* CONNECT SECTION */}
      <section id="connect" className="relative py-32 md:py-48 px-6 overflow-hidden bg-black">
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          muted autoPlay loop playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30 blur-[1px]"
        />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent z-[1]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-[1]" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <h2 className="text-5xl md:text-7xl text-white tracking-tight mb-8 font-serif italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Let's build <em className="italic transition-all hover:text-white/80">something cool</em>.
            </h2>
            <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto font-light">
              Open for collaborations, freelance projects, or just a chat about Web3 and AI.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a href="mailto:vedmohan0@gmail.com" className="liquid-glass aave-glass rounded-full px-8 py-4 text-white font-medium flex items-center gap-3 hover:bg-white/10 transition-all border border-white/5">
                <Mail size={20} /> vedmohan0@gmail.com
              </a>
              <div className="flex items-center gap-4">
                <a href="https://github.com/ivedmohan" target="_blank" rel="noopener noreferrer" className="liquid-glass rounded-full p-4 text-white hover:bg-white/10 transition-all border border-white/5"><Github size={20} /></a>
                <a href="https://linkedin.com/in/ivedmohan" target="_blank" rel="noopener noreferrer" className="liquid-glass rounded-full p-4 text-white hover:bg-white/10 transition-all border border-white/5"><Linkedin size={20} /></a>
                <a href="https://x.com/zorothebuilder" target="_blank" rel="noopener noreferrer" className="liquid-glass rounded-full p-4 text-white hover:bg-white/10 transition-all border border-white/5"><Twitter size={20} /></a>
              </div>
            </div>
            <footer className="mt-24 pt-8 border-t border-white/10 w-full flex flex-col md:flex-row items-center justify-between gap-4">
              <span className="text-white/20 text-xs uppercase tracking-widest">© 2026 Ved Mohan</span>
              <span className="text-white/20 text-xs uppercase tracking-widest">Founder • Builder • Product Developer</span>
            </footer>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
