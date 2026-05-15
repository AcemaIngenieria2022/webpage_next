import styles from "./page.module.css";
import BlogCard from '@/components/blog/BlogCard/BlogCard';
import { blogPosts } from '@/data/blog-posts';

export default function Blog() {
  const featured = blogPosts.find((post) => post.variant === 'featured');
  const sideCards = blogPosts.filter((post) => post.variant === 'compact');
  const regularCards = blogPosts.filter((post) => post.variant === 'regular');

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Destacados</h1>
        
        <div className={styles.topGrid}>
          {featured && <BlogCard key={featured.slug} {...featured} />}
          <div className={styles.sideCards}>
            {sideCards.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        </div>
        <div className={styles.cardsGrid}>
          {regularCards.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      </div>
    </main>
  );
}