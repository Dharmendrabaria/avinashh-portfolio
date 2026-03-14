import React from 'react';
import { FiMessageSquare, FiStar } from 'react-icons/fi';
import { useFadeInOnScroll } from '../context/ThemeContext';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: 'Suresh Patel',
    role: 'Managing Director, Horizon Group',
    text: "Avinash has an exceptional eye for design. He taken our brand to a whole new level with his creative vision. Truly a talented designer in Gujarat.",
    rating: 5,
    avatar: '👨‍💼',
    color: '#06d6f7'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Founder, Urban Aesthetics',
    text: "Working with Avinash was an amazing experience. He delivered a clean, modern UI for our app that exceeded our expectations. Highly recommended!",
    rating: 5,
    avatar: '👩‍💼',
    color: '#8b5cf6'
  },
  {
    id: 3,
    name: 'Rajesh Shah',
    role: 'Tech Lead, Digital Solutions',
    text: "One of the best creative designers I've worked with. His work is pixel-perfect and always has a premium feel. His design thinking is top-notch.",
    rating: 5,
    avatar: '👨‍💻',
    color: '#06d6a0'
  }
];

const Testimonials = () => {
  const headerRef = useFadeInOnScroll();
  const gridRef = useFadeInOnScroll();

  return (
    <section id="testimonials" className="test-section">
      <div className="container">
        <div className="section-header reveal slide-up" ref={headerRef} style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div className="section-tag" style={{ borderColor: 'rgba(255,209,102,0.25)', color: 'var(--accent-gold)', background: 'rgba(255,209,102,0.1)', margin: '0 auto 22px' }}>
            <FiMessageSquare size={14} />
            <span>Client Kind Words</span>
          </div>
          <h2 className="section-title">What <span className="gradient-text" style={{background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-purple))', WebkitBackgroundClip: 'text'}}>They Say</span></h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Feedback from people I've had the pleasure of working with.
          </p>
        </div>

        <div className="test-grid">
          {testimonials.map((test, index) => (
            <TestimonialCard key={test.id} test={test} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ test, index }) => {
  const ref = useFadeInOnScroll();
  return (
    <div 
      className={`test-card glass-card reveal zoom-in delay-${(index % 4) + 1}`}
      ref={ref}
    >
      <div className="quote-mark" style={{ color: test.color }}>&ldquo;</div>
      <div className="stars">
        {[...Array(test.rating)].map((_, i) => (
          <FiStar key={i} size={16} fill="var(--accent-gold)" color="var(--accent-gold)" />
        ))}
      </div>
      <p className="test-text">{test.text}</p>
      
      <div className="test-author">
        <div className="author-avatar" style={{ border: `2px solid ${test.color}` }}>
          {test.avatar}
        </div>
        <div className="author-info">
          <h4 className="author-name">{test.name}</h4>
          <span className="author-role">{test.role}</span>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
