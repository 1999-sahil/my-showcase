import { mobileVars } from "@/animations/mobileMenuVariants";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

interface MobileNavigationProps {
    href: string;
    title: string;
};

function MobileNavigation({ title, href }: MobileNavigationProps) {
  return (
    <motion.div variants={mobileVars} className="">
      <Link to={href}>
        <h2 className="text-3xl font-inter font-medium">{title}</h2>
      </Link>
    </motion.div>
  );
}

export default MobileNavigation;
