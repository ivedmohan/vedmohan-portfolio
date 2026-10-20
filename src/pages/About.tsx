import { useEffect, useRef } from "react";
import { animate, motion, MotionConfig, useInView } from "framer-motion";
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

type Accent = { gradient: string; text: string; border: string };

const accents: Record<"violet" | "cyan" | "amber" | "emerald", Accent> = {
  violet: { gradient: "from-violet-500/30 via-fuchsia-500/10", text: "text-violet-300", border: "hover:border-violet-400/40" },
  cyan: { gradient: "from-cyan-400/30 via-sky-500/10", text: "text-cyan-300", border: "hover:border-cyan-400/40" },
  amber: { gradient: "from-amber-400/30 via-orange-500/10", text: "text-amber-300", border: "hover:border-amber-400/40" },
  emerald: { gradient: "from-emerald-400/30 via-teal-500/10", text: "text-emerald-300", border: "hover:border-emerald-400/40" },
};

const stats = [
  { value: 3000, prefix: "$", suffix: "+", label: "SmoothSend volume", accent: "text-cyan-300" },
  { value: 3815, prefix: "$", suffix: "+", label: "Prizes won", accent: "text-amber-300" },
  { value: 6, prefix: "", suffix: "+", label: "Hackathon wins", accent: "text-violet-300" },
  { value: 4, prefix: "", suffix: "+", label: "Products & client builds", accent: "text-emerald-300" },
];

const journey = [
  {
    year: "2026 — Now",
    title: "Product Developer",
    company: "EdTech Company",
    desc: "Building and improving software products for an education technology company across product thinking, frontend and practical engineering.",
    accent: accents.violet,
  },
  {
    year: "2025 — Now",
    title: "Founder & Lead Architect",
    company: "SmoothSend.xyz",
    desc: "Gasless transaction infrastructure for Aptos and Avalanche, with $3,000+ in volume processed.",
    accent: accents.cyan,
  },
  {
    year: "2023 — Now",
    title: "Hackathon Champion",
    company: "Global Web3 circuit",
    desc: "6+ wins and $3,815+ in prizes across Avalanche, Starknet, Aptos and Neo X, focused on cross-chain UX, agents and account abstraction.",
    accent: accents.amber,
  },
  {
    year: "2022 — Now",
    title: "Freelance Builder",
    company: "Independent / Open source",
    desc: "Full-stack products for clients and communities: an inventory & POS billing system, AI agents and Web3 apps.",
    accent: accents.emerald,
  },
];

const wins = [
  { title: "$1,500 AVAX", subtitle: "Avalanche India Pitch Day finalist", note: "Top 5 of 3500+ teams", Icon: Trophy, accent: accents.amber },
  { title: "$1,000 Bounty", subtitle: "StarkNet Hacker House Bangalore", note: "DefiZen AI agent", Icon: Award, accent: accents.violet },
  { title: "$700 AVAX", subtitle: "Team 1 Delhi Hackathon", note: "Cross-chain tooling", Icon: Star, accent: accents.cyan },
  { title: "$400 Bounty", subtitle: "Neo X Grind Hackathon", note: "Best deployment on Neo X", Icon: Zap, accent: accents.emerald },
];

const toolkit = [
  { label: "Move / Aptos", accent: accents.cyan },
  { label: "Solidity", accent: accents.violet },
  { label: "StarkNet", accent: accents.violet },
  { label: "Avalanche", accent: accents.amber },
  { label: "React", accent: accents.cyan },
  { label: "TypeScript", accent: accents.cyan },
  { label: "Next.js", accent: accents.emerald },
  { label: "Node.js", accent: accents.emerald },
  { label: "OpenAI / LangChain", accent: accents.amber },
  { label: "Framer Motion", accent: accents.violet },
];

const shipped = [
  {
    accent: accents.cyan,
    tag: "Startup — Mainnet",
    title: "SmoothSend.xyz",
    description: "Gasless transaction infrastructure for Aptos and Avalanche that has processed $3,000+ in volume.",
    href: "https://www.smoothsend.xyz/",
  },
  {
    accent: accents.violet,
    tag: "AI & DeFi",
    title: "DeFizen Agent",
    description: "Autonomous yield optimization agent on StarkNet. Won a $1,000 bounty with +19% profit performance.",
    href: "https://defi-zen.vercel.app/",
  },
  {
    accent: accents.amber,
    tag: "AI Developer Tooling",
    title: "Agent Wallet",
    description: "An npm package giving AI agents a practical wallet layer for Web3 applications and transactions.",
    href: "https://www.npmjs.com/package/@vedmohan/agent-wallet",
  },
  {
    accent: accents.emerald,
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

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${prefix}${Math.round(v).toLocaleString("en-US")}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, prefix, suffix]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  );
};

const orbs = [
  { className: "bg-violet-600/40 -top-24 -left-24 h-96 w-96", x: [0, 60, 0], y: [0, 40, 0], duration: 14 },
  { className: "bg-cyan-500/30 top-1/3 -right-32 h-[28rem] w-[28rem]", x: [0, -50, 0], y: [0, 60, 0], duration: 18 },
  { className: "bg-amber-500/20 bottom-0 left-1/3 h-72 w-72", x: [0, 40, 0], y: [0, -40, 0], duration: 16 },
];

const About = () => (
  <MotionConfig reducedMotion="user">
  <div className="bg-background min-h-screen">
    <SiteNav />

    <main className="relative px-6 pt-40 md:pt-48 pb-24 overflow-hidden">
      <video
        src={HERO_VIDEO}
        muted
        autoPlay
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[900px] w-full object-cover opacity-25 pointer-events-none motion-reduce:hidden"
      />
      <div className="absolute inset-x-0 top-0 h-[900px] bg-gradient-to-b from-transparent via-black/40 to-background pointer-events-none" />
      {orbs.map((orb) => (
        <motion.div
          key={orb.className}
          aria-hidden="true"
          className={`absolute rounded-full blur-3xl pointer-events-none ${orb.className}`}
          animate={{ x: orb.x, y: orb.y }}
          transition={{ duration: orb.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="max-w-6xl mx-auto relative space-y-28 md:space-y-40">
        {/* WHO I AM */}
        <motion.section id="who-i-am" {...fadeUp}>
          <SectionHeading as="h1" eyebrow="About" title="Who I am" />
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
            <div>
              <p className="text-3xl md:text-5xl text-foreground leading-[1.15] tracking-tight max-w-4xl">
                Founder, builder, and product developer{" "}
                <em
                  className="italic bg-gradient-to-r from-violet-400 via-cyan-300 to-amber-300 bg-clip-text text-transparent"
                  style={serif}
                >
                  based in New Delhi
                </em>
                .
              </p>
              <p className="text-foreground/60 text-lg leading-relaxed font-light mt-8 max-w-2xl">{intro}</p>
              <p className="text-foreground/60 text-lg leading-relaxed font-light mt-4 max-w-2xl">
                Most days I'm somewhere between a smart-contract editor and a design file: shipping gasless
                transaction rails for developers, teaching AI agents to hold wallets, and winning the occasional
                hackathon along the way.
              </p>
              <div className="flex flex-wrap gap-2 mt-8">
                {["Web3", "AI agents", "Product", "Frontend", "Open source"].map((chip, i) => (
                  <Badge
                    key={chip}
                    variant="outline"
                    className={`border-white/10 bg-white/5 text-[11px] font-normal tracking-widest uppercase ${
                      [accents.violet, accents.cyan, accents.amber, accents.emerald, accents.violet][i].text
                    }`}
                  >
                    {chip}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-violet-500/30 via-cyan-400/20 to-amber-400/30 blur-2xl" aria-hidden="true" />
              <motion.div
                className="relative rounded-[2rem] overflow-hidden border border-white/10 aspect-[4/3]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src="/og-image.png"
                  alt="Ved Mohan — founder, builder and product developer"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-violet-500/10" />
                <span className="absolute bottom-4 left-5 text-[10px] uppercase tracking-[0.3em] text-white/70">
                  Ved Mohan · New Delhi
                </span>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* BY THE NUMBERS */}
        <motion.section aria-label="By the numbers" {...fadeUp}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <div className={`text-5xl md:text-7xl italic ${stat.accent}`} style={serif}>
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
                className={`liquid-glass rounded-3xl border border-white/5 bg-transparent transition-colors duration-500 group ${item.accent.border}`}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${item.accent.gradient} to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  aria-hidden="true"
                />
                <CardHeader className="p-8 relative">
                  <Badge variant="outline" className={`w-fit mb-6 border-white/10 text-[10px] font-normal uppercase tracking-widest ${item.accent.text}`}>
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
            <video
              src={REEL_VIDEO}
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 via-transparent to-cyan-500/20 mix-blend-screen" />
            <div className="relative p-8 md:p-12 max-w-2xl">
              <p className="text-[10px] tracking-[0.3em] uppercase text-cyan-300 mb-3">Philosophy</p>
              <p className="text-3xl md:text-5xl italic text-white leading-tight" style={serif}>
                Make the hard parts invisible, so people only feel the product.
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
              className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-violet-400 via-cyan-300 to-amber-300 md:hidden"
              aria-hidden="true"
            />
            {journey.map((item, i) => (
              <motion.div
                key={item.title}
                className={`liquid-glass rounded-3xl p-8 border border-white/5 transition-colors duration-500 group ${item.accent.border}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.12 }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.accent.gradient} to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none`}
                  aria-hidden="true"
                />
                <div className="relative">
                  <span className={`text-[10px] uppercase tracking-[0.3em] ${item.accent.text}`}>{item.year}</span>
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
            {wins.map(({ title, subtitle, note, Icon, accent }) => (
              <motion.div
                key={title}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`liquid-glass rounded-3xl p-6 border border-white/5 transition-colors duration-500 ${accent.border}`}
              >
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${accent.gradient} to-transparent ${accent.text}`}>
                  <Icon size={20} />
                </div>
                <h3 className="text-2xl italic text-white mt-5" style={serif}>
                  {title}
                </h3>
                <p className="text-white/60 text-sm font-light mt-2">{subtitle}</p>
                <p className={`text-[10px] uppercase tracking-[0.25em] mt-4 ${accent.text}`}>{note}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <Separator className="bg-white/10" />

        {/* TOOLKIT */}
        <motion.section id="toolkit" {...fadeUp}>
          <SectionHeading eyebrow="Toolkit" title="What I build with" />
          <div className="flex flex-wrap gap-3">
            {toolkit.map(({ label, accent }, i) => (
              <motion.span
                key={label}
                className={`liquid-glass rounded-full px-5 py-2.5 text-sm border border-white/10 ${accent.text}`}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3 + (i % 4) * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
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
