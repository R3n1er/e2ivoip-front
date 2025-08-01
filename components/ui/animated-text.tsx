"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface AnimatedTextProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  stagger?: number
}

export function AnimatedText({ 
  children, 
  className = "", 
  delay = 0, 
  duration = 0.5,
  stagger = 0.1 
}: AnimatedTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration, 
        delay,
        staggerChildren: stagger,
        delayChildren: delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
}

export function SplitText({ text, className = "", delay = 0, stagger = 0.05 }: SplitTextProps) {
  const words = text.split(" ")
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: delay + (index * stagger) 
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

interface TypewriterTextProps {
  text: string
  className?: string
  speed?: number
  delay?: number
}

export function TypewriterText({ text, className = "", speed = 0.05, delay = 0 }: TypewriterTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className={className}
    >
      <motion.span
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ 
          duration: text.length * speed, 
          delay: delay + 0.5,
          ease: "easeInOut"
        }}
        className="inline-block overflow-hidden whitespace-nowrap"
      >
        {text}
      </motion.span>
    </motion.div>
  )
} 