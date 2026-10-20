import { Link, useLocation } from "react-router-dom";
import { Download } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const sectionLinks = [
  { name: "Experience", hash: "#experience" },
  { name: "Projects", hash: "#projects" },
  { name: "Content", hash: "#content" },
];

const linkClass = "text-white/60 hover:text-white hover:bg-white/5 px-4 py-2 rounded-full text-xs font-medium transition-all";

const SiteNav = () => {
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-6">
      <div className="liquid-glass aave-glass aave-nav rounded-full px-2 py-2 flex items-center justify-between gap-4 border border-white/5">
        <div className="flex items-center pl-2">
          <Link to="/" className="text-white font-medium text-sm mr-4 whitespace-nowrap">Ved Mohan</Link>
        </div>
        <div className="w-px h-4 bg-white/10 hidden sm:block" />
        <div className="hidden md:flex items-center gap-1">
          <NavLink to="/about" className={linkClass} activeClassName="text-white bg-white/5">
            About
          </NavLink>
          {/* Homepage sections are in-page anchors; from other routes they route back to "/" and Index scrolls to the hash. */}
          {sectionLinks.map((link) =>
            onHome ? (
              <a key={link.name} href={link.hash} className={linkClass}>
                {link.name}
              </a>
            ) : (
              <Link key={link.name} to={{ pathname: "/", hash: link.hash }} className={linkClass}>
                {link.name}
              </Link>
            ),
          )}
        </div>
        <div className="w-px h-4 bg-white/10 hidden sm:block" />
        <div className="flex items-center gap-2">
          <a
            href="https://drive.google.com/file/d/16kZBAqm2iPIwfo2YI6_GPTXooJkLrpxX/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="group liquid-glass aave-glass rounded-full px-5 py-2 text-white text-xs font-medium hover:bg-white/10 transition-colors border border-white/10 flex items-center gap-2 hidden"
          >
            <Download size={14} className="text-white/40 group-hover:text-white transition-colors" />
            CV
          </a>
          <a href="mailto:vedmohan0@gmail.com" className="liquid-glass aave-glass rounded-full px-6 py-2 text-white text-xs font-medium hover:bg-white/10 transition-colors border border-white/10 bg-white/5">
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
};

export default SiteNav;
