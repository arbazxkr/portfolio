import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const isTouchDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

const AICursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isText, setIsText] = useState(false);

  // Mouse position with spring animation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Hide on mobile devices
  useEffect(() => {
    if (isTouchDevice()) {
      setVisible(false);
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    // Add event listeners
    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Handle hoverable elements
    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      setHovered(true);
      
      // Check if hovering over text
      if (target.tagName === 'P' || target.tagName === 'H1' || target.tagName === 'H2' || 
          target.tagName === 'H3' || target.tagName === 'SPAN' || target.tagName === 'DIV') {
        setIsText(true);
      }
    };
    
    const handleMouseLeave = () => {
      setHovered(false);
      setIsText(false);
    };

    const hoverableElements = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, .hoverable, p, h1, h2, h3, span, div"
    );

    hoverableElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      
      hoverableElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [mouseX, mouseY]);

  if (!visible) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-80"
          animate={{
            scale: hovered ? (isText ? 2 : 1.5) : 1,
            opacity: hovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Inner core */}
        <motion.div
          className="absolute inset-1 rounded-full bg-white"
          animate={{
            scale: clicked ? 0.8 : 1,
          }}
          transition={{ duration: 0.1 }}
        />
        
        {/* Holographic pulse effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-cyan-400"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Text selection indicator */}
        {isText && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-yellow-400"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0.6 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>

      {/* Click ripple effect */}
      {clicked && (
        <motion.div
          className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-40"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="w-full h-full rounded-full border-2 border-cyan-400" />
        </motion.div>
      )}

      {/* Radar ping effect on hover */}
      {hovered && (
        <motion.div
          className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-45"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ scale: 0.5, opacity: 0.8 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="w-full h-full rounded-full border border-green-400" />
        </motion.div>
      )}

      {/* Text highlight effect */}
      {isText && (
        <motion.div
          className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-45"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-full h-full rounded-full bg-yellow-400" />
        </motion.div>
      )}
    </>
  );
};

export default AICursor; 