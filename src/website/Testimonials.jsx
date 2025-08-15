import React from 'react';
import '../styles/testimonials.css';
const testimonials = [
  {
    rating: '★★★★★',
    text:
      'Booked a consultation in minutes. This app saved me a hospital visit! Great interface and fast response. The doctor was professional ',
    name: 'Shweta Deshmukh',
    location: 'Pune, MH',
    avatar: 'https://i.pravatar.cc/100?img=32',
  },
  {
    rating: '★★★☆☆',
    text:
      'I didn’t have to wait in a queue or visit a clinic. The heart specialist was kind and explained everything clearly. Highly recommended.',
    name: 'Rohan Mudgare',
    location: 'Bengaluru, KA',
    avatar: 'https://i.pravatar.cc/100?img=12',
  },
];

export default function Testimonials() {
  const carouselId = 'testimonialCarousel';

  return (
    <section className="mt-4">
      <div className="services-section">
        <div className="services-title text-center">
          <h1>
            <span className="blue"></span>{' '}
            <span className="gradient-text">What Our Customer Say</span>
          </h1>
        </div>
      </div>

      <div
        id={carouselId}
        className="carousel slide"
        data-bs-ride="carousel"        // auto start
        data-bs-interval="4000"        // 4s per slide
        data-bs-pause="false"          // keep sliding even on hover
        data-bs-touch="true"           // swipe on touch devices
        aria-label="Customer testimonials"
      >
        {/* Indicators (dots) */}
        <div className="carousel-indicators">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              data-bs-target={`#${carouselId}`}
              data-bs-slide-to={i}
              className={i === 0 ? 'active' : ''}
              aria-current={i === 0 ? 'true' : undefined}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="carousel-inner text-center p-4 p-sm-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`carousel-item ${i === 0 ? 'active' : ''}`}
            >
              <div className="testimonial-card mx-auto" style={{ maxWidth: 800 }}>
                <div className="stars mb-3">{t.rating}</div>

                <p className="review-text">
                  {t.text}
                </p>

                <div className="d-flex align-items-center justify-content-center gap-3 mt-3">
                  <img src={t.avatar} alt={t.name} className="profile-img" />
                  <div className="text-start">
                    <div className="reviewer-name">{t.name}</div>
                    <div className="reviewer-location">{t.location}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target={`#${carouselId}`}
          data-bs-slide="prev"
          aria-label="Previous testimonial"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target={`#${carouselId}`}
          data-bs-slide="next"
          aria-label="Next testimonial"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
}
