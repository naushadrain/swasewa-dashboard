import React, { useEffect, useState } from 'react';
import '../styles/services.css';

const items = [
    {
        icon: 'bi-camera-video pt-3',
        title: 'Video Doctor Consultations',
        text:
            'Connect instantly with qualified doctors through secure video calls. Get expert advice, prescriptions, and follow-ups from home—anytime.',
    },
    {
        icon: 'bi-hospital pt-3',
        title: 'Home Nursing Care',
        text:
            'Trained and certified nurses available at your doorstep for wound care, injections, post-surgery support, and chronic care management.',
    },
    {
        icon: 'bi-clipboard2-check pt-3',
        title: 'Home Lab Tests',
        text:
            'Book diagnostic tests and get samples collected at home. Quick reports, accurate results, and lab-certified technicians at your convenience.',
    },
    {
        icon: 'bi-truck pt-3',
        title: 'Medicine Delivery',
        text:
            'Order prescribed medicines online and get them delivered to your home quickly and safely, with pharmacist support if needed.',
    },
    {
        icon: 'bi-people pt-3',
        title: 'Elderly Home Care',
        text:
            'Compassionate support for senior citizens, including daily health monitoring, mobility assistance, and emotional companionship from our care team.',
    },
    {
        icon: 'bi-activity pt-3',
        title: 'Health Monitoring',
        text:
            'Track vital signs like blood pressure, glucose, oxygen, and heart rate with connected devices—monitored live by our healthcare team.',
    },
];

export default function Services() {
    const [expanded, setExpanded] = useState({});

    // Reveal-on-scroll animation
    useEffect(() => {
        const nodes = document.querySelectorAll('.reveal');
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('is-visible');
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.15 }
        );
        nodes.forEach((n) => io.observe(n));
        return () => io.disconnect();
    }, []);

    return (
        <section id="services" className="services-wrap">
            <div className="services-section text-center mb-3">
                <div className="services-title">
                    <h1>
                        <span className="blue"></span>{' '}
                        <span className="gradient-text">Our Services</span>
                    </h1>
                </div>
            </div>

            <div className="container mt-2">
                <div className="row g-4">
                    {items.map((s, i) => {
                        const isOpen = !!expanded[i];
                        return (
                            <div className="col-12 col-sm-6 col-lg-4" key={i}>
                                <article className="service-card h-100 d-flex flex-column reveal">
                                    <div className="service-icon-wrap">
                                        <i className={`bi ${s.icon} service-icon`} aria-hidden="true" />
                                    </div>

                                    <h4 className="mt-3 mb-2">{s.title}</h4>

                                    <p
                                        className={`service-text mb-3 flex-grow-1 ${isOpen ? 'expanded' : 'clamped'
                                            }`}
                                    >
                                        {s.text}
                                    </p>

                                    {/* Read more button (mobile only) */}
                                    <button
                                        type="button"
                                        className="btn btn-success btn-readmore mt-auto align-self-start"
                                        aria-expanded={isOpen}
                                        onClick={() => setExpanded((prev) => ({ ...prev, [i]: !prev[i] }))}
                                    >
                                        {isOpen ? 'Read less' : 'Read more'}
                                    </button>

                                </article>

                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
