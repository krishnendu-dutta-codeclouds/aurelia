"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let rafId: number;
    let mouseX = -100;
    let mouseY = -100;
    let curX = -100;
    let curY = -100;

    // Show cursor on first move
    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        cursor.style.opacity = "1";
        dot.style.opacity = "1";
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      cursor.style.opacity = "0";
      dot.style.opacity = "0";
    };

    const onMouseDown = () => {
      cursor.style.width = "15px";
      cursor.style.height = "15px";
    };

    const onMouseUp = () => {
      cursor.style.width = "24px";
      cursor.style.height = "24px";
    };

    // Use event delegation — listen on document, check target
    const onLinkEnter = () => {
      cursor.style.width = "45px";
      cursor.style.height = "45px";
      cursor.style.backgroundColor = "rgba(143, 151, 121, 0.15)";
      cursor.style.borderColor = "#8F9779";
      dot.style.backgroundColor = "#8F9779";
      dot.style.transform = "translate(-50%, -50%) scale(1.5)";
    };

    const onLinkLeave = () => {
      cursor.style.width = "24px";
      cursor.style.height = "24px";
      cursor.style.backgroundColor = "transparent";
      cursor.style.borderColor = "rgba(17,17,17,0.3)";
      dot.style.backgroundColor = "#111111";
      dot.style.transform = "translate(-50%, -50%) scale(1)";
    };

    // RAF loop — smooth trailing cursor
    const loop = () => {
      // Lerp cursor ring behind mouse
      curX += (mouseX - curX) * 0.12;
      curY += (mouseY - curY) * 0.12;

      cursor.style.left = `${curX}px`;
      cursor.style.top = `${curY}px`;

      // Dot snaps directly
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    // Use event delegation on document for link/button hover
    const handleDocMouseOver = (e: MouseEvent) => {
      const el = (e.target as Element).closest("a, button, [role='button']");
      if (el) onLinkEnter();
    };
    const handleDocMouseOut = (e: MouseEvent) => {
      const el = (e.target as Element).closest("a, button, [role='button']");
      if (el) onLinkLeave();
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseover", handleDocMouseOver);
    document.addEventListener("mouseout", handleDocMouseOut);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", handleDocMouseOver);
      document.removeEventListener("mouseout", handleDocMouseOut);
    };
  }, []);

  return (
    <>
      {/* Outer ring — lagging cursor */}
      <div
        ref={cursorRef}
        className="custom-cursor hidden md:block"
        style={{
          opacity: 0,
          transition: "width 0.25s ease, height 0.25s ease, background-color 0.25s ease, border-color 0.25s ease, opacity 0.3s ease",
        }}
      />
      {/* Inner dot — snaps to mouse */}
      <div
        ref={dotRef}
        className="custom-cursor-dot hidden md:block"
        style={{
          opacity: 0,
          transition: "transform 0.2s ease, background-color 0.2s ease, opacity 0.3s ease",
        }}
      />
    </>
  );
}
