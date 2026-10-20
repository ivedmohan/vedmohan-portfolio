import React, { useEffect, useRef, useState } from "react";

const GlassCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  // Checked after mount so the prerendered markup matches the first client render
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  useEffect(() => {
    setIsCoarsePointer(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const animate = () => {
      // Smooth interpolation for "trailing" effect
      const lerp = 0.15;
      cursorX += (mouseX - cursorX) * lerp;
      cursorY += (mouseY - cursorY) * lerp;

      if (cursor) {
        cursor.style.transform = `translate3d(${cursorX - 20}px, ${cursorY - 20}px, 0) scale(${isHovering ? 1.5 : 1})`;
      }

      // Live variables for "Reveal" effects (immediate, no lerp for responsiveness)
      document.documentElement.style.setProperty("--cursor-x", `${mouseX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${mouseY}px`);

      requestAnimationFrame(animate);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationId);
    };
  }, [isHovering, isVisible]);

  // Hide on touch devices
  if (isCoarsePointer) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-10 h-10 rounded-full z-[9999] pointer-events-none transition-opacity duration-300 liquid-glass aave-glass border border-white/10 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        willChange: "transform",
      }}
    />
  );
};

export default GlassCursor;
