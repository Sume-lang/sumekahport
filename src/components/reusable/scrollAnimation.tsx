"use client";
import React from "react";
import { motion } from "framer-motion";
export const ScrollAnimation = ({
  children,
  threshold = 0.1,
  className = "",
}: {
  children: React.ReactNode;
  threshold?: number;
  className?: string;
}) => {
  const ref = React.createRef<HTMLDivElement>();

  const variants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={variants}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
