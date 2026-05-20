
'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './ServiceCarousel.module.css';

const ServiceCarousel = ({ images }) => {
  return (
    <div className={styles.carouselContainer}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className={styles.mySwiper}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <div className={styles.imageWrapper}>
              <Image
                src={src}
                alt={`Proyecto ACEMA ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.carouselImg}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ServiceCarousel;
