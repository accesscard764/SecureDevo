import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Hero from './sections/Hero';
import About from './sections/About';
import Certifications from './sections/Certifications';
import Projects from './sections/Projects';
import SecuritySimulation from './sections/SecuritySimulation';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './Footer';
import SecuritySolutions from './sections/SecuritySolutions';
import SecurityWorkflow from './workflow/SecurityWorkflow';

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5, ease: "easeInOut" }
};

export const Router: React.FC = () => {
  const path = window.location.pathname;

  return (
    <AnimatePresence mode="wait">
      {path === '/workflow' ? (
        <motion.div
          key="workflow"
          {...pageTransition}
          className="fixed inset-0 z-50"
        >
          <SecurityWorkflow />
        </motion.div>
      ) : (
        <motion.main
          key="main"
          className="w-full"
          {...pageTransition}
        >
          <Hero />
          <About />
          <Certifications />
          <Projects />
          <SecuritySolutions />
          <SecuritySimulation />
          <Testimonials />
          <Contact />
          <Footer />
        </motion.main>
      )}
    </AnimatePresence>
  );
};