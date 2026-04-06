import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4",
    tag: "Startup — Mainnet",
    title: "SmoothSend.xyz",
    description: "Gasless transfer SDK powering 6k+ monthly transactions with 2 B2B clients in active deployment. Pay fees in any token.",
    href: "https://www.smoothsend.xyz/",
    span: "md:col-span-8",
  },
  {
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4",
    tag: "AI & DeFi",
    title: "DefiZen Agent",
    description: "Autonomous yield optimization agent on StarkNet. Won $1,000 bounty with +19% profit performance.",
    href: "https://defi-zen.vercel.app/",
    span: "md:col-span-4",
  },
  {
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4",
    tag: "Real Estate — Luxury",
    title: "Sorrel Buildcon",
    description: "Premium residential development in Greater Noida. Crafting luxury 2/3/4 BHK apartments with smart living integration.",
    href: "https://www.sorrelbuildcon.com/",
    span: "md:col-span-4",
  },
  {
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4",
    tag: "Web3 Betting",
    title: "HackBet",
    description: "Decentralized betting platform with zk proofs for provable fairness and outcome privacy.",
    href: "https://hackbet.vercel.app/",
    span: "md:col-span-4",
  },
  {
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4",
    tag: "Gaming & zk",
    title: "ChainMate",
    description: "P2P Chess wagering with zkTLS verification and cross-chain settlement. Built for ETH Online 2025.",
    href: "https://chainmatee.vercel.app/",
    span: "md:col-span-4",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
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
          id="projects"
          className="flex items-center justify-between mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl text-foreground tracking-tight">Recent Projects</h2>
          <span className="text-foreground/40 text-sm hidden md:block">Featured Work</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {cards.map((card, i) => (
            <motion.a
              key={card.title}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`liquid-glass rounded-3xl overflow-hidden group block cursor-pointer border border-white/5 relative ${card.span}`}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1 + 0.2 }}
            >
              <div className="aspect-[4/5] md:aspect-video relative overflow-hidden h-full min-h-[400px] md:min-h-[300px]">
                <video
                  src={card.video}
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Halftone overlay from Lumina */}
                <div
                  className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                    backgroundSize: "4px 4px",
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-60" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 transform transition-transform duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/40 text-xs tracking-widest uppercase">
                      {card.tag}
                    </span>
                    <div className="liquid-glass rounded-full p-2 border border-white/10">
                      <ArrowUpRight size={16} className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-white text-2xl md:text-3xl mb-3 tracking-tight font-medium" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    {card.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed max-w-sm line-clamp-2 md:line-clamp-none">
                    {card.description}
                  </p>
                </div>

                {/* Hover Reveal from Lumina */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-4">
                  <span className="liquid-glass rounded-full px-6 py-3 text-xs md:text-sm text-white border border-white/20 whitespace-nowrap">
                    Explore Project — <em className="italic" style={{ fontFamily: "'Instrument Serif', serif" }}>{card.title}</em>
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
