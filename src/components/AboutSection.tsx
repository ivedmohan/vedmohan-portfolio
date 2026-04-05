import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const ref = useRef(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const tween = gsap.fromTo(
      el,
      { y: 80 },
      {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={ref}
      className="bg-background pt-32 md:pt-44 pb-10 md:pb-14 px-6 overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
      <div className="max-w-6xl mx-auto relative">
        <motion.p
          className="text-foreground/40 text-sm tracking-widest uppercase mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.p>
        <motion.h2
          ref={headingRef}
          id="about"
          className="text-4xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Final-year ECE student{" "}
          <em className="italic text-foreground/60" style={{ fontFamily: "'Instrument Serif', serif" }}>
            at MSIT
          </em>{" "}
          building in
          <br className="hidden md:block" />
          {" "}Web3 since{" "}
          <em className="italic text-foreground/60" style={{ fontFamily: "'Instrument Serif', serif" }}>
            early 2023.
          </em>
        </motion.h2>
      </div>
    </section>
  );
};

export default AboutSection;
