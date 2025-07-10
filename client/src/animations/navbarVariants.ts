import type { Easing, Variants } from "motion/react";

export const menuVars: Variants = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.3,
        ease: [0.12, 0, 0.39, 0] as Easing,
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.5,
        duration: 0.3,
        ease: [0.12, 0, 0.39, 1] as Easing,
      },
    },
  };