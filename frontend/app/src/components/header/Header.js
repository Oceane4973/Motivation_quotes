import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import "./Header.css";

const Header = ({ isVisible }) => {
  if (typeof isVisible !== "boolean") {
    console.error("Invalid prop: 'isVisible' must be a boolean");
    return (
      <div className="header-container error">
        <p>Une erreur est survenue dans l'affichage de l'en-tête.</p>
      </div>
    );
  }

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
        <span
          className="glow-filter"
          data-text="Transformez vos pensées en sagesse"
        >
          Transformez vos pensées en sagesse
        </span>
        Découvrez la puissance des mots, simplement.
        <br />
      </motion.div>
    </div>
  );
};

Header.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};

export default Header;
