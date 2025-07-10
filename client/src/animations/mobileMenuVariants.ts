import type { Easing, Variants } from "motion/react";

export const mobileVars: Variants = {
  initial: {
    y: "30vh",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1] as Easing,
    },
  },
  open: {
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.37, 0, 0.63, 1] as Easing,
    },
  },
};