import React from "react";
import { motion } from "framer-motion";
import "./Header.css";

const Header = ({ isVisible }) => {
  const variants = {
    hidden: { y: "50%", opacity: 0, transition: { duration: 1 } },
    visible: { y: "-10%", opacity: 1, transition: { duration: 1 } },
    exit: { y: "-30%", opacity: 1, transition: { duration: 1 } },
  };

  return (
    <div className="header-container">
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "exit"}
        variants={variants}
        className="header-text"
      >
        <span className="glow-filter" data-text="Transformez vos pensées en sagesse">
          Transformez vos pensées en sagesse
        </span>
        Découvrez la puissance des mots, simplement.
        <br />

      </motion.div>
    </div>
  );
};

export default Header;
