"use client";

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Card from '@/components/shared/Card/Card';
import styles from './FeatureCards.module.css';


const FeatureCards = ({ features = [], variant = 'slim' }) => {
  return (
    <AnimatePresence mode="wait">
      {features.map((f, i) => (
        <motion.div
          key={f.title}
          layout
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25, delay: i * 0.08 }}
          whileHover={{ y: -8 }}
          className={styles.featureCard}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Card title={f.title} image={f.image} variant={variant} href={f.href} titleClassName={styles.hoverTitle} />
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default FeatureCards;
