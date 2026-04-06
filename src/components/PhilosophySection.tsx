import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4";

const PhilosophySection = () => {
  const ref = useRef(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const tweens: gsap.core.Tween[] = [];

    if (videoWrapRef.current) {
      tweens.push(
        gsap.fromTo(
          videoWrapRef.current,
          { y: 60 },
          {
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: videoWrapRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        )
      );
    }

    if (textWrapRef.current) {
      tweens.push(
        gsap.fromTo(
          textWrapRef.current,
          { y: 40 },
          {
            y: -20,
            ease: "none",
            scrollTrigger: {
              trigger: textWrapRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        )
      );
    }

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  return (
    <section ref={ref} className="bg-background py-28 md:py-40 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          id="philosophy"
          className="text-5xl md:text-7xl lg:text-8xl text-foreground tracking-tight mb-16 md:mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Web3{" "}
          <em className="italic text-foreground/40" style={{ fontFamily: "'Instrument Serif', serif" }}>
            x
          </em>{" "}
          AI
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            ref={videoWrapRef}
            className="rounded-3xl overflow-hidden aspect-[4/3]"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <video
              src={VIDEO_URL}
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            ref={textWrapRef}
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="mb-8">
              <p className="text-foreground/40 text-xs tracking-widest uppercase mb-4">
                Architecture & Agentic State
              </p>
              <p className="text-foreground/70 text-base md:text-lg leading-relaxed font-light">
                I build at the edge where autonomous agents meet trustless state. From gasless relayer infrastructure to AI-driven yield strategies, my goal is to remove the friction between complex protocols and the people who use them.
              </p>
            </div>

            <div className="w-full h-px bg-foreground/10" />

            <div className="mt-8">
              <p className="text-foreground/40 text-xs tracking-widest uppercase mb-4">
                Programmable Agency
              </p>
              <p className="text-foreground/70 text-base md:text-lg leading-relaxed font-light">
                For me, Web3 isn't just about decentralization—it's about building programmable agency. I'm focused on creating the primitive layers that allow AI and blockchain to interact seamlessly, ensuring the future of finance is both open and automated.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
