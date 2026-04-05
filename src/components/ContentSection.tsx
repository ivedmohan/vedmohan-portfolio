import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Twitter, ArrowRight, BookOpen, Video, Trophy, Rocket } from "lucide-react";

const content = [
  {
    title: "2-Minute Gasless dApp Tutorial",
    platform: "Twitter / X",
    desc: "A high-impact guide on integrating gasless transactions into Aptos AI agents specifically using the SmoothSend SDK.",
    type: "Tutorial",
    icon: Video,
    link: "https://x.com/SmoothSend/status/2002266478960074925?s=20"
  },
  {
    title: "AgentCash Mainnet Launch",
    platform: "Twitter / X",
    desc: "Announcing the AgentCash mainnet launch and $100k in ecosystem credits for AI agents on Aptos.",
    type: "Milestone",
    icon: Rocket,
    link: "https://x.com/zorothebuilder/status/1884485542713175000"
  },
  {
    title: "Avalanche India Pitch Day Winner",
    platform: "Twitter / X",
    desc: "Secured 3rd place at the prestigious Avalanche India Pitch Day, demonstrating protocol viability to ecosystem leaders.",
    type: "Award",
    icon: Trophy,
    link: "https://x.com/SmoothSend/status/1879058721150493033"
  },
  {
    title: "Essential Hackathon Showcase",
    platform: "Twitter / X",
    desc: "Technical deep-dive into our protocol-level submission for the Essential hackathon circuit.",
    type: "Deep Dive",
    icon: BookOpen,
    link: "https://x.com/zorothebuilder/status/1880145241042713175"
  }
];

const ContentSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="content" className="py-24 md:py-32 px-6 relative bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_70%)]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={inView ? { opacity: 1, y: 0 } : {}}
           className="liquid-glass rounded-full px-4 py-1 text-[10px] font-medium text-white/40 uppercase tracking-[0.3em] inline-block mb-10 border border-white/5"
        >
          Selected Content
        </motion.div>
        
        <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-20">
          <motion.h2
            className="text-4xl md:text-6xl text-white tracking-tight leading-[1.1] font-serif italic max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            A builder who teaches then <em className="italic transition-all hover:text-white/80">shares the journey</em>.
          </motion.h2>
          <motion.a 
            href="https://x.com/zorothebuilder" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white text-xs uppercase tracking-widest pb-4 transition-all"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            View all content
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.map((item, i) => (
            <motion.a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass rounded-3xl p-8 flex flex-col justify-between border border-white/5 group hover:bg-white/5 transition-all duration-700 h-full"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <item.icon size={16} className="text-white/40 group-hover:text-white transition-colors" />
                  <span className="text-white/20 text-[10px] tracking-widest uppercase">{item.platform}</span>
                </div>
                <h4 className="text-white text-xl font-serif italic mb-4 leading-tight min-h-[3rem]" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  {item.title}
                </h4>
                <p className="text-white/40 text-[13px] leading-relaxed group-hover:text-white/60 transition-colors mb-8 font-light">
                  {item.desc}
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-6 border-t border-white/5 group-hover:border-white/20 transition-colors">
                <span className="text-white text-[10px] uppercase tracking-widest font-medium italic underline underline-offset-4 decoration-white/20">Read Thread</span>
                <ArrowRight size={14} className="text-white/40 group-hover:translate-x-1 group-hover:text-white transition-all" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
