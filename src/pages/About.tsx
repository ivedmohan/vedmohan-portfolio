import { useEffect, useRef, useState } from "react";
import { animate, motion, MotionConfig, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Award, Github, Linkedin, Mail, Star, Trophy, Twitter, Zap } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Placeholder copy drawn from the homepage — swap in the final Who I am / Shipped / Contact content.
const intro =
  "Founder of SmoothSend, product developer, and freelance builder working across Web3, AI agents, and practical software products. I care about shipping useful products with clean, thoughtful experiences.";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4";
const REEL_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4";

const stats = [
  { value: 3000, prefix: "$", suffix: "+", label: "SmoothSend volume" },
  { value: 3815, prefix: "$", suffix: "+", label: "Prizes won" },
  { value: 6, prefix: "", suffix: "+", label: "Hackathon wins" },
  { value: 4, prefix: "", suffix: "+", label: "Products & client builds" },
];

const journey = [
  {
    year: "2026 — Now",
    title: "Product Developer",
    company: "EdTech Company",
    desc: "Building and improving software products for an education technology company across product thinking, frontend and practical engineering.",
  },
  {
    year: "2025 — Now",
    title: "Founder & Lead Architect",
    company: "SmoothSend.xyz",
    desc: "Gasless transaction infrastructure for Aptos and Avalanche, with $3,000+ in volume processed.",
  },
  {
    year: "2023 — Now",
    title: "Hackathon Champion",
    company: "Global Web3 circuit",
    desc: "6+ wins and $3,815+ in prizes across Avalanche, Starknet, Aptos and Neo X, focused on cross-chain UX, agents and account abstraction.",
  },
  {
    year: "2022 — Now",
    title: "Freelance Builder",
    company: "Independent / Open source",
    desc: "Full-stack products for clients and communities: an inventory & POS billing system, AI agents and Web3 apps.",
  },
];

const wins = [
  { title: "$1,500 AVAX", subtitle: "Avalanche India Pitch Day finalist", note: "Top 5 of 3500+ teams", Icon: Trophy },
  { title: "$1,000 Bounty", subtitle: "StarkNet Hacker House Bangalore", note: "DefiZen AI agent", Icon: Award },
  { title: "$700 AVAX", subtitle: "Team 1 Delhi Hackathon", note: "Cross-chain tooling", Icon: Star },
  { title: "$400 Bounty", subtitle: "Neo X Grind Hackathon", note: "Best deployment on Neo X", Icon: Zap },
];

const toolkit = [
  { label: "Move / Aptos" },
  { label: "Solidity" },
  { label: "StarkNet" },
  { label: "Avalanche" },
  { label: "React" },
  { label: "TypeScript" },
  { label: "Next.js" },
  { label: "Node.js" },
  { label: "OpenAI / LangChain" },
  { label: "Framer Motion" },
];

const shipped = [
  {
    tag: "Startup — Mainnet",
    title: "SmoothSend.xyz",
    description: "Gasless transaction infrastructure for Aptos and Avalanche that has processed $3,000+ in volume.",
    href: "https://www.smoothsend.xyz/",
  },
  {
    tag: "AI & DeFi",
    title: "DeFizen Agent",
    description: "Autonomous yield optimization agent on StarkNet. Won a $1,000 bounty with +19% profit performance.",
    href: "https://defi-zen.vercel.app/",
  },
  {
    tag: "AI Developer Tooling",
    title: "Agent Wallet",
    description: "An npm package giving AI agents a practical wallet layer for Web3 applications and transactions.",
    href: "https://www.npmjs.com/package/@vedmohan/agent-wallet",
  },
  {
    tag: "Business Software",
    title: "Inventory & POS Billing",
    description: "Inventory management and point-of-sale billing for day-to-day stock tracking and sales.",
  },
];

const socials = [
  { label: "GitHub", Icon: Github, href: "https://github.com/ivedmohan" },
  { label: "LinkedIn", Icon: Linkedin, href: "https://linkedin.com/in/ivedmohan" },
  { label: "X", Icon: Twitter, href: "https://x.com/zorothebuilder" },
];

const serif = { fontFamily: "'Instrument Serif', serif" };

const SectionHeading = ({ eyebrow, title, as: Heading = "h2" }: { eyebrow: string; title: string; as?: "h1" | "h2" }) => (
  <div className="mb-12">
    <p className="text-foreground/40 text-[10px] tracking-[0.3em] uppercase mb-4">{eyebrow}</p>
    <Heading className="text-4xl md:text-6xl text-foreground tracking-tight italic" style={serif}>
      {title}
    </Heading>
  </div>
);

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

const Counter = ({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setDisplay(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
};

const PrefersMotionVideo = ({ className, ...props }: React.VideoHTMLAttributes<HTMLVideoElement>) => {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;
  return <video muted autoPlay loop playsInline aria-hidden="true" className={className} {...props} />;
};

const About = () => (
  <MotionConfig reducedMotion="user">
  <div className="bg-background min-h-screen">
    <SiteNav />

    <main className="relative px-6 pt-40 md:pt-48 pb-24 overflow-hidden">
      <PrefersMotionVideo
        src={HERO_VIDEO}
        preload="metadata"
        className="absolute inset-x-0 top-0 h-[900px] w-full object-cover grayscale opacity-25 pointer-events-none"
      />
      <div className="absolute inset-x-0 top-0 h-[900px] bg-gradient-to-b from-transparent via-black/40 to-background pointer-events-none" />

      <div className="max-w-6xl mx-auto relative space-y-28 md:space-y-40">
        {/* WHO I AM */}
        <motion.section id="who-i-am" {...fadeUp}>
          <SectionHeading as="h1" eyebrow="About" title="Who I am" />
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
            <div>
              <p className="text-3xl md:text-5xl text-foreground leading-[1.15] tracking-tight max-w-4xl">
                Founder, builder, and product developer{" "}
                <em className="italic text-foreground/60" style={serif}>
                  based in New Delhi
                </em>
                .
              </p>
              <p className="text-foreground/60 text-lg leading-relaxed font-light mt-8 max-w-2xl">{intro}</p>
              <div className="flex flex-wrap gap-2 mt-8">
                {["Web3", "AI agents", "Product", "Frontend", "Open source"].map((chip) => (
                  <Badge
                    key={chip}
                    variant="outline"
                    className="border-white/10 bg-white/5 text-[11px] font-normal tracking-widest uppercase text-foreground/60"
                  >
                    {chip}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-white/10 blur-2xl" aria-hidden="true" />
              <motion.div
                className="relative rounded-[2rem] overflow-hidden border border-white/10 aspect-[1200/630]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src="/og-image.png"
                  alt="Ved Mohan, Founder, Builder, Product Developer"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* BY THE NUMBERS */}
        <motion.section aria-label="By the numbers" {...fadeUp}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <div className="text-5xl md:text-7xl italic text-foreground" style={serif}>
                  <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-[10px] md:text-xs text-white/40 uppercase tracking-[0.25em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.section>

        <Separator className="bg-white/10" />

        {/* WHAT I'VE SHIPPED */}
        <motion.section id="shipped" {...fadeUp}>
          <SectionHeading eyebrow="Work" title="What I've shipped" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shipped.map((item) => (
              <Card
                key={item.title}
                className={`liquid-glass rounded-3xl border border-white/5 bg-transparent transition-colors duration-500 group hover:border-white/20`}
              >
                <div
                  className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/[0.06] to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  aria-hidden="true"
                />
                <CardHeader className="p-8 relative">
                  <Badge variant="outline" className="w-fit mb-6 border-white/10 text-[10px] font-normal uppercase tracking-widest text-foreground/60">
                    {item.tag}
                  </Badge>
                  <CardTitle className="text-3xl font-normal italic" style={serif}>
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-white/60 text-sm leading-relaxed font-light pt-2">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                {item.href && (
                  <CardContent className="px-8 pb-8 relative">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white/50 hover:text-white text-xs uppercase tracking-[0.2em] transition-colors"
                    >
                      Visit <ArrowUpRight size={14} />
                    </a>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </motion.section>

        <Separator className="bg-white/10" />

        {/* REEL */}
        <motion.section id="reel" aria-label="Showreel" {...fadeUp}>
          <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 min-h-[320px] md:min-h-[460px] flex items-end">
            <PrefersMotionVideo
              src={REEL_VIDEO}
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="relative p-8 md:p-12 max-w-2xl">
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/60 mb-3">What I care about</p>
              <p className="text-3xl md:text-5xl italic text-white leading-tight" style={serif}>
                Shipping useful products with clean, thoughtful experiences.
              </p>
            </div>
          </div>
        </motion.section>

        <Separator className="bg-white/10" />

        {/* JOURNEY */}
        <motion.section id="journey" {...fadeUp}>
          <SectionHeading eyebrow="Journey" title="How I got here" />
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:pl-0 pl-6">
            <div
              className="absolute left-0 top-2 bottom-2 w-px bg-white/20 md:hidden"
              aria-hidden="true"
            />
            {journey.map((item, i) => (
              <motion.div
                key={item.title}
                className={`liquid-glass rounded-3xl p-8 border border-white/5 transition-colors duration-500 group hover:border-white/20`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.12 }}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none"
                  aria-hidden="true"
                />
                <div className="relative">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">{item.year}</span>
                  <h3 className="text-3xl italic text-white mt-4" style={serif}>
                    {item.title}
                  </h3>
                  <p className="text-white/40 text-xs uppercase tracking-widest mt-1">{item.company}</p>
                  <p className="text-white/60 text-sm leading-relaxed font-light mt-4">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <Separator className="bg-white/10" />

        {/* WINS */}
        <motion.section id="wins" {...fadeUp}>
          <SectionHeading eyebrow="Recognition" title="Hackathon wins" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wins.map(({ title, subtitle, note, Icon }) => (
              <motion.div
                key={title}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`liquid-glass rounded-3xl p-6 border border-white/5 transition-colors duration-500 hover:border-white/20`}
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white">
                  <Icon size={20} />
                </div>
                <h3 className="text-2xl italic text-white mt-5" style={serif}>
                  {title}
                </h3>
                <p className="text-white/60 text-sm font-light mt-2">{subtitle}</p>
                <p className="text-[10px] uppercase tracking-[0.25em] mt-4 text-white/60">{note}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <Separator className="bg-white/10" />

        {/* TOOLKIT */}
        <motion.section id="toolkit" {...fadeUp}>
          <SectionHeading eyebrow="Toolkit" title="What I build with" />
          <div className="flex flex-wrap gap-3">
            {toolkit.map(({ label }) => (
              <motion.span
                key={label}
                className="liquid-glass rounded-full px-5 py-2.5 text-sm border border-white/10 text-white/80"
                whileHover={{ y: -4 }}
              >
                {label}
              </motion.span>
            ))}
          </div>
        </motion.section>

        <Separator className="bg-white/10" />

        {/* HOW TO REACH ME */}
        <motion.section id="contact" {...fadeUp}>
          <SectionHeading eyebrow="Contact" title="How to reach me" />
          <p className="text-foreground/60 text-lg leading-relaxed font-light mb-10 max-w-2xl">
            Open for collaborations, freelance projects, or just a chat about Web3 and AI.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button
              asChild
              variant="outline"
              className="liquid-glass aave-glass rounded-full h-auto px-8 py-4 text-base text-white bg-white/5 border-white/10 hover:bg-white/10 hover:text-white"
            >
              <a href="mailto:vedmohan0@gmail.com">
                <Mail size={20} /> vedmohan0@gmail.com
              </a>
            </Button>
            {socials.map(({ label, Icon, href }) => (
              <Button
                key={label}
                asChild
                variant="outline"
                size="icon"
                className="liquid-glass rounded-full h-14 w-14 text-white bg-transparent border-white/5 hover:bg-white/10 hover:text-white"
              >
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon size={20} />
                </a>
              </Button>
            ))}
          </div>
        </motion.section>
      </div>
    </main>

    <footer className="px-6 pb-12">
      <div className="max-w-6xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-white/20 text-xs uppercase tracking-widest">© 2026 Ved Mohan</span>
        <span className="text-white/20 text-xs uppercase tracking-widest">Founder • Builder • Product Developer</span>
      </div>
    </footer>
  </div>
  </MotionConfig>
);

export default About;
