'use client';
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export interface SliderInOutProps {
  children: React.ReactNode;
  className?: string;
}

export default function SliderInOut({ children, className }: SliderInOutProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const position = ref.current.getBoundingClientRect();
        setIsInView(position.top <= window.innerHeight && position.bottom >= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      <motion.div
        animate={isInView ? "visible" : "hidden"}
        initial="hidden"
        variants={{
          visible: { opacity: 1, scale: 1 },
          hidden: { opacity: 0, scale: 0 },
        }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
