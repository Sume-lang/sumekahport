// components/ScrollReveal.tsx
"use client";

import { useEffect, useRef, ReactNode } from "react";
import { motion } from "framer-motion";
interface ScrollRevealProps {
  children: ReactNode;
  threshold?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  threshold = 0.1,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      ref={ref}
      className={`opacity-0 transition-opacity duration-500 ${className}`}
    >
      {children}
    </motion.div>
  );
}
