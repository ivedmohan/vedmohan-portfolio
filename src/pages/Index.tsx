import { useRef, useCallback } from "react";
import { Globe, ArrowRight, Instagram, Twitter } from "lucide-react";
import AboutSection from "@/components/AboutSection";
import FeaturedVideoSection from "@/components/FeaturedVideoSection";
import PhilosophySection from "@/components/PhilosophySection";
import ServicesSection from "@/components/ServicesSection";
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

        {/* Navbar */}
        <nav className="relative z-20 px-6 py-6">
          <div className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <Globe size={24} className="text-foreground" />
              <span className="text-foreground font-semibold text-lg ml-2">Asme</span>
              <div className="hidden md:flex items-center gap-8 ml-8">
                {["Features", "Pricing", "About"].map((t) => (
                  <a key={t} href="#" className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors">
                    {t}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-foreground text-sm font-medium">Sign Up</a>
              <button className="liquid-glass rounded-full px-6 py-2 text-foreground text-sm font-medium">
                Login
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[20%]">
          <h1
            className="text-7xl md:text-8xl lg:text-9xl text-foreground tracking-tight whitespace-nowrap"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Know it then <em className="italic">all</em>.
          </h1>

          <div className="max-w-xl w-full mt-8">
            <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent text-foreground placeholder:text-foreground/40 outline-none text-sm"
              />
              <button className="bg-foreground rounded-full p-3 text-background flex-shrink-0">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          <p className="text-foreground text-sm leading-relaxed px-4 mt-6 max-w-md">
            Stay updated with the latest news and insights. Subscribe to our newsletter today and never miss out on exciting updates.
          </p>

          <button className="liquid-glass rounded-full px-8 py-3 text-foreground text-sm font-medium hover:bg-foreground/5 transition-colors mt-6">
            Manifesto
          </button>
        </div>

        {/* Social Icons */}
        <div className="relative z-10 flex justify-center gap-4 pb-12">
          {[Instagram, Twitter, Globe].map((Icon, i) => (
            <button key={i} className="liquid-glass rounded-full p-4 text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-all">
              <Icon size={20} />
            </button>
          ))}
        </div>
      </section>

      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection />
      <ServicesSection />
    </div>
  );
};

export default Index;
