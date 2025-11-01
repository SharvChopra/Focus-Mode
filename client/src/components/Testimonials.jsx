import React from "react";
// 1. Import motion from framer-motion
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "./Testimonials.css";

function Testimonials() {
  // 2. Define animation variants for the text
  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="testimonials-section">
      {/* 3. Apply the animation to the heading */}
      <motion.h2
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
      >
        Loved by Productive People
      </motion.h2>

      {/* 4. Apply the animation to the subtitle */}
      <motion.p
        className="subtitle"
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
      >
        See how Focus Mode helps people reclaim their time
      </motion.p>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        className="testimonials-grid"
      >
        <SwiperSlide>
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>
              "Focus Mode was a game-changer for my exam prep. I could schedule
              study blocks and not worry about mindlessly scrolling.It's simply the best."
            </p>
            <div className="author-info">
              <div>
                <p className="author-name">Alex R.</p>
                <p className="author-title">University Student</p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>
              "As a remote developer, it's easy to get distracted. This tool
              helps me protect my 'deep work' time that I block out on my
              calendar. It's simple and it just works."
            </p>
            <div className="author-info">
              <div>
                <p className="author-name">Priya S.</p>
                <p className="author-title">Software Engineer</p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>
              "Juggling multiple clients means every minute counts. Focus Mode
              is my secret weapon for hitting deadlines without the stress of
              digital clutter. Highly recommend!"
            </p>
            <div className="author-info">
              <div>
                <p className="author-name">Sarah K.</p>
                <p className="author-title">Freelance Content Writer</p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>
              "My planning sessions are finally distraction-free. Integrating
              with my calendar means I don't even have to think about it. It is essential part of my workflow."
            </p>
            <div className="author-info">
              <div>
                <p className="author-name">David L.</p>
                <p className="author-title">Project Manager</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

export default Testimonials;
