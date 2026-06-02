'use client';

import { motion } from 'motion/react'; // Importamos motion
import styles from "./page.module.css";
import BlogCard from '@/components/blog/BlogCard/BlogCard';
import { blogPosts } from '@/data/blog-posts';

export default function Blog() {
  const featured = blogPosts.find((post) => post.variant === 'featured');
  const sideCards = blogPosts.filter((post) => post.variant === 'compact');
  const regularCards = blogPosts.filter((post) => post.variant === 'regular');

  // Mismo efecto base de entrada de las tarjetas
  const cardAnimation = (index) => ({
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.25,
      delay: index * 0.08, // Mismo retraso escalonado original
    },
    whileHover: {
      y: -8, // Mismo efecto hover original
    }
  });

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Título con una entrada suave */}
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Destacados
        </motion.h1>
        
        <div className={styles.topGrid}>
          {/* Tarjeta Destacada (Índice 0) */}
          {featured && (
            <motion.div {...cardAnimation(0)} className="w-full">
              <BlogCard {...featured} />
            </motion.div>
          )}

          <div className={styles.sideCards}>
            {/* Tarjetas Laterales (Índice continuo: 1, 2...) */}
            {sideCards.map((post, index) => (
              <motion.div 
                key={post.slug} 
                {...cardAnimation(index + 1)} 
                className="w-full"
              >
                <BlogCard {...post} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Grilla Regular (Sigue sumando al índice para no romper el orden visual) */}
        <div className={styles.cardsGrid}>
          {regularCards.map((post, index) => (
            <motion.div 
              key={post.slug} 
              {...cardAnimation(index + 1 + sideCards.length)} 
              className="w-full"
            >
              <BlogCard {...post} />
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}