import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Placeholder copy drawn from the homepage — swap in the final Who I am / Shipped / Contact content.
const intro =
  "Founder of SmoothSend, product developer, and freelance builder working across Web3, AI agents, and practical software products. I care about shipping useful products with clean, thoughtful experiences.";

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

const About = () => (
  <div className="bg-background min-h-screen">
    <SiteNav />

    <main className="relative px-6 pt-40 md:pt-48 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative space-y-28 md:space-y-40">
        {/* WHO I AM */}
        <motion.section id="who-i-am" {...fadeUp}>
          <SectionHeading as="h1" eyebrow="About" title="Who I am" />
          <p className="text-3xl md:text-5xl text-foreground leading-[1.15] tracking-tight max-w-4xl">
            Founder, builder, and product developer{" "}
            <em className="italic text-foreground/60" style={serif}>
              based in New Delhi
            </em>
            .
          </p>
          <p className="text-foreground/60 text-lg leading-relaxed font-light mt-8 max-w-2xl">{intro}</p>
        </motion.section>

        <Separator className="bg-white/10" />

        {/* WHAT I'VE SHIPPED */}
        <motion.section id="shipped" {...fadeUp}>
          <SectionHeading eyebrow="Work" title="What I've shipped" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shipped.map((item) => (
              <Card
                key={item.title}
                className="liquid-glass rounded-3xl border border-white/5 bg-transparent transition-colors duration-500 hover:border-white/20 group"
              >
                <CardHeader className="p-8">
                  <Badge variant="outline" className="w-fit mb-6 border-white/10 text-white/40 text-[10px] font-normal uppercase tracking-widest">
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
                  <CardContent className="px-8 pb-8">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white/40 hover:text-white text-xs uppercase tracking-[0.2em] transition-colors"
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
);

export default About;
