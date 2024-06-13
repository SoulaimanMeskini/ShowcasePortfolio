import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { to: "/", label: "About Me" },
  { to: "/projects", label: "Projects" },
  { to: "/lookbook", label: "Lookbook" }
];

const Headerbubble = () => {
  const [MenuOpen, SetMenuOpen] = useState(false);
  const navigate = useNavigate();

  const containerVariants = {
    closed: { width: 55, height: 55, borderRadius: 50, transition: { duration: 0.1, ease: "easeInOut" } },
    open: { width: 300, height: 55, borderRadius: 50, transition: { duration: 0.1, ease: "easeInOut" } }
  };

  const navVariants = {
    hidden: { opacity: 0, transition: { duration: 0.1, ease: "easeInOut" } },
    visible: { opacity: 1, transition: { duration: 0.1, ease: "easeInOut", delay: 0.1 } }
  };

  const NavItem = ({ to, label }) => (
    <motion.li
      className="mx-2 cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1, delay: 0.1 }}
    >
      <NavLink
        to={to}
        className={({ isActive }) =>
          `nav-link text-[#dadada] relative ${isActive ? "is-active" : ""}`
        }
        onClick={(e) => {
          e.stopPropagation();
          if (MenuOpen) {
            navigate(to);
          }
        }}
        style={{ fontSize: '1.1rem' }} 
      >
        {label}
      </NavLink>
    </motion.li>
  );

  return (
    <div className="relative flex items-center select-none">
      <motion.div
        variants={containerVariants}
        initial="closed"
        animate={MenuOpen ? "open" : "closed"}
        className={`h-[50px] w-[50px] flex justify-center items-center bg-[#1d1d1d] border border-[#1d1d1d] ${
          MenuOpen ? 'cursor-default' : 'cursor-pointer'
        } transition-all duration-200 ease-in-out transform relative`}
        id="MenuChanger"
        onClick={() => SetMenuOpen(!MenuOpen)}
        whileHover={!MenuOpen ? { scale: 1.1 } : {}}
      >
        {!MenuOpen && (
          <motion.div
            className="absolute right-[-20px] top-[-25px] cursor-pointer"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            whileHover={{ opacity: 0 }}
          >
            <svg width="100" height="100" viewBox="0 0 100 100">
              <path id="textPath" fill="none" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
              <text fontSize="15" fill="#1d1d1d">
                <textPath href="#textPath" startOffset="50%" textAnchor="middle">
                  MENU
                </textPath>
              </text>
            </svg>
          </motion.div>
        )}
        <style>{`
          .nav-link:before {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: 0;
            left: 50%;
            background-color: #6f02c6;
            transition: width 0.3s ease-in-out, left 0.3s ease-in-out;
          }
          .nav-link:hover:before,
          .nav-link.is-active:before {
            width: 100%;
            left: 0;
          }
        `}</style>
        <AnimatePresence>
          {MenuOpen && (
            <motion.nav
              key="nav"
              variants={navVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <ul className="m-0 p-0 flex flex-row items-center justify-center cursor-default rounded whitespace-nowrap list-none">
                {navItems.map((item, index) => (
                  <NavItem key={index} {...item} />
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Headerbubble;
