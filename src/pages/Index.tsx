import { useRef, useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, ArrowRight, Instagram, Twitter, Mail, Github, Linkedin } from "lucide-react";
import AboutSection from "@/components/AboutSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import StatsSection from "@/components/StatsSection";
import TechStackSection from "@/components/TechStackSection";
import FeaturedProjectSection from "@/components/FeaturedProjectSection";
import PhilosophySection from "@/components/PhilosophySection";
import ProjectsSection from "@/components/ProjectsSection";
import HackathonWinsSection from "@/components/HackathonWinsSection";
import LoadingScreen from "@/components/LoadingScreen";
import GlassCursor from "@/components/GlassCursor";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const HERO_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4";

function animateOpacity(
  el: HTMLVideoElement,
  from: number,
  to: number,
  duration: number
) {
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
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onCanPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play();
    animateOpacity(v, 0, 1, 500);
  }, []);

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
      v.play();
      animateOpacity(v, 0, 1, 500);
    }, 100);
  }, []);

  return (
    <div className="bg-background">
      <GlassCursor />
      
      {/* HERO */}
      <section className="min-h-screen relative flex flex-col overflow-hidden">
        <video
          ref={videoRef}
          src={HERO_VIDEO_URL}
          muted
          autoPlay
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-bottom"
          style={{ opacity: 0 }}
          onCanPlay={onCanPlay}
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
        />

      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-6">
        <div className="liquid-glass rounded-full px-2 py-2 flex items-center justify-between gap-4 border border-white/5">
          <div className="flex items-center pl-2">
            <Globe size={20} className="text-white/60" />
            <span className="text-white font-medium text-sm ml-2 mr-4 whitespace-nowrap">Ved Mohan</span>
          </div>
          
          <div className="w-px h-4 bg-white/10 hidden sm:block" />

          <div className="hidden md:flex items-center gap-1">
            {[
              { name: "About", href: "#about" },
              { name: "Projects", href: "#projects" },
              { name: "Wins", href: "#wins" },
              { name: "Stack", href: "#stack" },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/60 hover:text-white hover:bg-white/5 px-4 py-2 rounded-full text-xs font-medium transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="w-px h-4 bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-2">
            <a 
              href="mailto:vedmohan0@gmail.com"
              className="liquid-glass rounded-full px-5 py-2 text-white text-xs font-medium hover:bg-white/10 transition-colors border border-white/10"
            >
              Hire Me
            </a>
          </div>
        </div>
      </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
          <h1
            className="text-5xl md:text-8xl lg:text-9xl text-foreground tracking-tight whitespace-normal md:whitespace-nowrap px-4"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Building then <em className="italic">the Future</em>.
          </h1>

          <div className="mt-12">
            <a 
              href="mailto:vedmohan0@gmail.com"
              className="liquid-glass rounded-full px-10 py-5 text-white text-lg font-medium hover:bg-white/10 transition-all border border-white/10 inline-flex items-center gap-3 group"
            >
              Hire Me 
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <p className="text-foreground text-sm leading-relaxed px-4 mt-6 max-w-md font-light">
            Builder & Full-Stack Developer shipping SmoothSend.xyz and autonomous AI agents. Obsessed with revenue dashboards and clean dev experiences.
          </p>

        </div>

        {/* Social Icons */}
        <div className="relative z-10 flex justify-center gap-4 pb-12">
          {[
            { Icon: Twitter, href: "https://x.com/zorothebuilder" },
            { Icon: Github, href: "https://github.com/ivedmohan" },
            { Icon: Linkedin, href: "https://linkedin.com/in/ivedmohan" }
          ].map(({ Icon, href }, i) => (
            <a 
              key={i} 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </section>

      <AboutSection />
      <CapabilitiesSection />
      <StatsSection />
      <TechStackSection />
      <FeaturedProjectSection />
      <PhilosophySection />
      <ProjectsSection />
      <HackathonWinsSection />

      {/* CONNECT SECTION */}
      <section id="connect" className="relative py-32 md:py-48 px-6 overflow-hidden bg-black">
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          muted autoPlay loop playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent z-[1]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-[1]" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-5xl md:text-7xl text-white tracking-tight mb-8 font-serif italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Let's build then <em className="italic transition-all hover:text-white/80">something cool</em>.
            </h2>
            <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto font-light">
              Open for collaborations, freelance projects, or just a chat about Web3 and AI.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a href="mailto:vedmohan0@gmail.com" className="liquid-glass rounded-full px-8 py-4 text-white font-medium flex items-center gap-3 hover:bg-white/10 transition-all border border-white/5">
                <Mail size={20} />
                vedmohan0@gmail.com
              </a>
              <div className="flex items-center gap-4">
                <a href="https://github.com/ivedmohan" target="_blank" rel="noopener noreferrer" className="liquid-glass rounded-full p-4 text-white hover:bg-white/10 transition-all border border-white/5">
                  <Github size={20} />
                </a>
                <a href="https://linkedin.com/in/ivedmohan" target="_blank" rel="noopener noreferrer" className="liquid-glass rounded-full p-4 text-white hover:bg-white/10 transition-all border border-white/5">
                  <Linkedin size={20} />
                </a>
                <a href="https://x.com/zorothebuilder" target="_blank" rel="noopener noreferrer" className="liquid-glass rounded-full p-4 text-white hover:bg-white/10 transition-all border border-white/5">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
            
            <footer className="mt-24 pt-8 border-t border-white/10 w-full flex flex-col md:flex-row items-center justify-between gap-4">
              <span className="text-white/20 text-xs uppercase tracking-widest">© 2026 Ved Mohan</span>
              <span className="text-white/20 text-xs uppercase tracking-widest">Digital Architect — Web3 x AI</span>
            </footer>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
