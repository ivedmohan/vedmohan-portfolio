import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4",
    tag: "Strategy",
    title: "Research & Insight",
    description: "We dig deep into data, culture, and human behavior to surface the insights that drive meaningful, lasting change.",
  },
  {
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4",
    tag: "Craft",
    title: "Design & Execution",
    description: "From concept to launch, we obsess over every detail to deliver experiences that feel effortless and look extraordinary.",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const tweens: gsap.core.Tween[] = [];

    cardsRef.current.forEach((el, i) => {
      if (!el) return;
      tweens.push(
        gsap.fromTo(
          el,
          { y: 40 + i * 20 },
          {
            y: -20 - i * 10,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        )
      );
    });

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  return (
    <section ref={ref} className="bg-background py-28 md:py-40 px-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)]" />
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          className="flex items-center justify-between mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl text-foreground tracking-tight">What we do</h2>
          <span className="text-foreground/40 text-sm hidden md:block">Our services</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.tag}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="liquid-glass rounded-3xl overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 + 0.2 }}
            >
              <div className="aspect-video relative overflow-hidden">
                <video
                  src={card.video}
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-foreground/40 text-xs tracking-widest uppercase">
                    {card.tag}
                  </span>
                  <div className="liquid-glass rounded-full p-2">
                    <ArrowUpRight size={16} className="text-foreground" />
                  </div>
                </div>
                <h3 className="text-foreground text-xl md:text-2xl mb-3 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-foreground/50 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
