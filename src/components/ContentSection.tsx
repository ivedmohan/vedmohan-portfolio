import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, BookOpen, Twitter } from "lucide-react";

declare global {
  interface Window {
    twttr?: {
      widgets?: {
        load: () => void;
      };
    };
  }
}

const posts = [
  {
    title: "Build Log 01",
    link: "https://x.com/ZoroTheBuilder/status/2067709003015356717?s=20",
    type: "post" as const,
  },
  {
    title: "Build Log 02",
    link: "https://x.com/ZoroTheBuilder/status/2050100405292392487?s=20",
    type: "post" as const,
  },
  {
    title: "Build Log 03",
    link: "https://x.com/ZoroTheBuilder/status/2023014145424294193?s=20",
    type: "post" as const,
  },
  {
    title: "Build Log 04",
    link: "https://x.com/ZoroTheBuilder/status/2029274889220477288?s=20",
    type: "post" as const,
  },
];

const ContentSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const renderEmbeds = () => window.twttr?.widgets?.load();
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://platform.twitter.com/widgets.js"]'
    );

    if (existingScript) {
      renderEmbeds();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    script.onload = renderEmbeds;
    document.body.appendChild(script);
  }, []);

  return (
    <section ref={ref} id="content" className="py-24 md:py-32 px-6 relative bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_70%)]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={inView ? { opacity: 1, y: 0 } : {}}
           className="liquid-glass rounded-full px-4 py-1 text-[10px] font-medium text-white/40 uppercase tracking-[0.3em] inline-block mb-10 border border-white/5"
        >
          Build Logs
        </motion.div>
        
        <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-20">
          <motion.h2
            className="text-4xl md:text-6xl text-white tracking-tight leading-[1.1] font-serif italic max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Building in public, one <em className="italic transition-all hover:text-white/80">project at a time</em>.
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.link}
              className="liquid-glass rounded-3xl p-5 md:p-6 border border-white/5 group hover:bg-white/[0.03] transition-all duration-700"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                {post.type === "article" ? <BookOpen size={16} className="text-white/50" /> : <Twitter size={16} className="text-white/50" />}
                  <h4 className="text-white text-lg font-serif italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    {post.title}
                  </h4>
                </div>
                <span className="text-white/20 text-[10px] tracking-widest uppercase">X / {post.type === "article" ? "Article" : "Post"}</span>
              </div>

              <div className="rounded-2xl bg-white/[0.03] px-3 py-2 min-h-[180px]">
                <blockquote className="twitter-tweet" data-theme="dark" data-dnt="true" data-cards="visible">
                  <a href={post.link}>View this post on X</a>
                </blockquote>
              </div>

              <div className="flex justify-end pt-4">
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white text-[10px] uppercase tracking-widest transition-colors inline-flex items-center gap-2"
                >
                  Open on X <ArrowRight size={14} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
