import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Ved's gasless relayer cut our onboarding time in half. A deep technical understanding of protocol UX.",
    author: "Protocol Lead",
    company: "Stealth Startup",
    role: "Hackathon Judge"
  },
  {
    quote: "One of the most focused and fastest-shipping Web3 builders in the circuit. Highly recommended.",
    author: "Founder",
    company: "AI Labs",
    role: "Collaborator"
  },
  {
    quote: "Detailed technical tutorials that actually help builders ship. An authority on StarkNet & Aptos.",
    author: "Developer Advocate",
    company: "Top L2 Protocol",
    role: "Ecosystem Partner"
  }
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="testimonials" className="py-24 md:py-32 px-6 relative bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.02)_0%,_transparent_70%)]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="mb-16 md:mb-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase mb-4">Ecosystem Recognition</p>
          <h2 className="text-4xl md:text-5xl text-white tracking-tight font-serif italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Testimonials & Social Proof
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="liquid-glass rounded-3xl p-10 flex flex-col justify-between border border-white/5 relative group"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              <Quote className="absolute top-8 right-8 text-white/5 w-12 h-12" />
              
              <p className="text-white/80 text-lg md:text-xl font-light italic leading-relaxed mb-12 relative z-10">
                "{t.quote}"
              </p>
              
              <div className="relative z-10">
                <h4 className="text-white font-medium text-lg">{t.author}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-white/40 text-[10px] uppercase tracking-widest">{t.company}</span>
                  <div className="w-1 h-1 bg-white/20 rounded-full" />
                  <span className="text-white/40 text-[10px] uppercase tracking-widest">{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
