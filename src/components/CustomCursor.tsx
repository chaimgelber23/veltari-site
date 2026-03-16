"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [cursorState, setCursorState] = useState<"default" | "pointer" | "view">("default");
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 300, damping: 28, mass: 0.5 };
  const ringSpringConfig = { stiffness: 180, damping: 24, mass: 0.8 };

  const dotX = useSpring(mouseX, springConfig);
  const dotY = useSpring(mouseY, springConfig);
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  useEffect(() => {
    // Detect touch device
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Observe hover targets
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest("[data-cursor]") as HTMLElement | null;
      if (el) {
        setCursorState(el.dataset.cursor as "pointer" | "view");
      } else if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']")
      ) {
        setCursorState("pointer");
      } else {
        setCursorState("default");
      }
    };

    document.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, [mouseX, mouseY, visible]);

  if (isTouchDevice) return null;

  const ringSize =
    cursorState === "view" ? 80 : cursorState === "pointer" ? 56 : 40;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="custom-cursor-dot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#6366f1",
          pointerEvents: "none",
          zIndex: 9999,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      />
      {/* Ring */}
      <motion.div
        className="custom-cursor-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: ringSize,
          height: ringSize,
          borderRadius: "50%",
          border: cursorState === "view" ? "none" : "1.5px solid rgba(99, 102, 241, 0.5)",
          backgroundColor:
            cursorState === "view" ? "rgba(99, 102, 241, 0.9)" : "transparent",
          pointerEvents: "none",
          zIndex: 9998,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        animate={{
          width: ringSize,
          height: ringSize,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {cursorState === "view" && (
          <span
            style={{
              color: "white",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            View
          </span>
        )}
      </motion.div>
    </>
  );
}
