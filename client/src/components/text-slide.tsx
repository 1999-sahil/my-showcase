'use client';

import { motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';

const slides = [
  'Software Developer',
  'Frontend Developer',
  'Backend Developer',
  'Fullstack Developer',
  'Web/Mobile Apps',
];

const duration = 2; // total animation duration in seconds
const lineHeight = 25; // height in px of one line

export default function VerticalSlider() {
  const controls = useAnimationControls();

  useEffect(() => {
    let currentIndex = 0;

    const animateSlide = async () => {
      while (true) {
        await controls.start({
          y: currentIndex * -lineHeight,
          transition: {
            duration: duration,
            ease: [0.68, -0.55, 0.27, 1.55], // approximate elastic
          },
        });
        currentIndex = (currentIndex + 1) % slides.length;
      }
    };

    animateSlide();
  }, [controls]);

  return (
    <div className="">
      <div className="flex justify-center">
        <div className="h-[25px] w-[130px] lg:h-[25px] lg:w-[150px] overflow-hidden bg-white/80 dark:bg-neutral-900/50 border dark:border-neutral-800/50 shadow rounded-sm">
          <motion.ul
            className="list-none m-0 p-0 flex flex-col items-center justify-center"
            animate={controls}
            initial={{ y: lineHeight }}
          >
            {slides.map((text, index) => (
              <li
                key={index}
                className="text-xs lg:text-sm leading-[25px] font-poppins text-neutral-500 dark:text-neutral-200/50"
              >
                {text}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </div>
  );
}
