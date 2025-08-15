import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import '../styles/faq.css';

const faqs = [
  {
    q: 'How do I consult a doctor through the app?',
    a: 'Download the app, choose a specialty, select a doctor, and book your consultation. You can talk via video, audio, or chat.',
  },
  {
    q: 'Are the doctors verified and qualified?',
    a: 'Yes, all doctors are verified and hold valid medical licenses.',
  },
  {
    q: 'Can I get a prescription after the consultation?',
    a: 'Yes, doctors can issue prescriptions digitally after the consultation.',
  },
  {
    q: 'Can I consult for my family members using my account?',
    a: 'Yes, you can use your account to book consultations for your family members.',
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="faq-wrap">
      <div className="services-section mt-4 text-center">
        <div className="services-title">
          <h1>
            <span className="blue"></span>{' '}
            <span className="gradient-text">Frequently Asked Questions</span>
          </h1>
        </div>
      </div>

      <div className="container mt-4">
        <div className="faq-container mx-auto">
          <Accordion defaultActiveKey="0" alwaysOpen={false}>
            {faqs.map((item, i) => (
              <Accordion.Item eventKey={String(i)} className="faq-item" key={i}>
                <Accordion.Header>
                  <span className="faq-icon" aria-hidden="true" />
                  {item.q}
                </Accordion.Header>
                <Accordion.Body>
                  {item.a}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
