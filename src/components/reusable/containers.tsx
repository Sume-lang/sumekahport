"use client";
import { motion } from "framer-motion";
export const Container = ({ children, className, ...props }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`p-4 rounded-md ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
