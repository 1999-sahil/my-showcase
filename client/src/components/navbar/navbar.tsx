import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

import { navlinks } from "@/constant/navbar";
import Logo from "../logo";
import { ModeToggle } from "../mode-toggle";
import { containerVars } from "@/animations/containerVariants";
import { menuVars } from "@/animations/navbarVariants";
import MobileNavigation from "./mobile-navigation";
import { AlignRight, X } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="flex items-center justify-between px-5 py-3 w-full max-w-5xl mx-auto">
        <Logo />
        <div className="hidden md:flex items-center justify-between border p-2 rounded-xl min-w-2xl bg-white dark:bg-neutral-900">
          <div className="flex items-center space-x-8 pl-2">
            {navlinks.map((link) => (
              <Link
                to={link.href}
                key={link.title}
                className="text-neutral-700 hover:text-black dark:text-neutral-200 dark:hover:text-white"
              >
                <h2 className="text-sm font-medium font-inter">{link.title}</h2>
              </Link>
            ))}
          </div>
          <button className="bg-[#111] text-white dark:bg-white dark:text-black font-medium rounded-md text-xs px-4 py-1 font-inter">
            Admin
          </button>
        </div>

        <div className="hidden md:flex">
          <ModeToggle />
        </div>

        {/** Mobile CTA */}
        <div className="cursor-pointer md:hidden" onClick={toggleMenu}>
          <AlignRight />
        </div>
      </nav>

      {/** Mobile Navigation */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed top-0 left-0 w-full h-screen origin-top bg-white dark:bg-black text-black dark:text-white p-5"
          >
            <div className="flex flex-col h-full">
              {/** top */}
              <div className="flex justify-between items-center">
                <Logo />
                <p className="cursor-pointer" onClick={toggleMenu}>
                  <X />
                </p>
              </div>

              {/** links */}
              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col h-full pt-10 gap-5"
              >
                {navlinks.map((link) => {
                  return (
                    <div className="overflow-hidden">
                      <MobileNavigation
                        key={link.title}
                        title={link.title}
                        href={link.href}
                      />
                    </div>
                  );
                })}
                <div className="w-full flex flex-col gap-5 mt-5 items-center justify-center">
                  <div className="flex items-center justify-between w-full rounded-lg px-4 py-2 bg-neutral-200/50 dark:bg-neutral-900/50">
                    <h2 className="text-sm font-inter text-zinc-800 dark:text-neutral-500">Appearance</h2>
                    <ModeToggle />
                  </div>
                  <div className="flex items-center gap-4 text-[#333] dark:text-neutral-400">
                    <FaGithub className="size-5 hover:text-black dark:hover:text-white" />
                    <FaLinkedin className="size-5 hover:text-black dark:hover:text-white" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
