import React from 'react';
import { FiLayers, FiFeather, FiSmartphone, FiMonitor, FiArrowRight } from 'react-icons/fi';
import { useFadeInOnScroll } from '../context/ThemeContext';
import './Services.css';

const services = [
  {
    icon: <FiLayers size={32} />,
    title: 'UI/UX Design',
    desc: 'Creating intuitive, user-centered interfaces for web and mobile applications with a focus on seamless user journeys.',
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.2), transparent)',
    color: '#8b5cf6'
  },
  {
    icon: <FiFeather size={32} />,
    title: 'Brand Identity',
    desc: 'Developing comprehensive branding packages including logos, typography, color palettes, and brand guidelines.',
    gradient: 'linear-gradient(135deg, rgba(6,214,247,0.2), transparent)',
    color: '#06d6f7'
  },
  {
    icon: <FiSmartphone size={32} />,
    title: 'Mobile App Design',
    desc: 'Designing engaging iOS and Android application interfaces that feel native, modern, and highly responsive.',
    gradient: 'linear-gradient(135deg, rgba(247,37,133,0.2), transparent)',
    color: '#f72585'
  },
  {
    icon: <FiMonitor size={32} />,
    title: 'Web Design',
    desc: 'Crafting pixel-perfect, responsive websites that look beautiful on any screen size and device.',
    gradient: 'linear-gradient(135deg, rgba(255,209,102,0.2), transparent)',
    color: '#ffd166'
  }
];

const Services = () => {
  const headerRef = useFadeInOnScroll();

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-header reveal slide-up is-visible" ref={headerRef} style={{ textAlign: 'center', marginBottom: '60px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="section-tag" style={{ borderColor: 'rgba(6,214,247,0.25)', color: 'var(--accent-cyan)', background: 'rgba(6,214,247,0.1)', margin: '0 auto 22px' }}>
            <FiLayers size={14} />
            <span>Specializations</span>
          </div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Design <span className="gradient-text" style={{background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))', WebkitBackgroundClip: 'text'}}>Solutions</span></h2>
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            I offer a wide range of design services to help businesses and individuals create impactful digital experiences.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index }) => {
  const ref = useFadeInOnScroll();
  const spotlightRef = React.useRef(null);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    requestAnimationFrame(() => {
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    });
  };

  return (
    <div 
      className={`service-card reveal slide-up delay-${index + 1}`} 
      ref={ref}
      onMouseMove={handleMouseMove}
      style={{ background: service.gradient }}
    >
      <div 
        ref={spotlightRef}
        className="service-spotlight" 
        style={{ 
          background: `radial-gradient(circle at center, ${service.color}40 0%, transparent 60%)`,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          pointerEvents: 'none',
          marginLeft: '-150px',
          marginTop: '-150px',
          willChange: 'transform'
        }}
      />
      <div className="service-content">
        <div className="service-icon" style={{ color: service.color }}>
          {service.icon}
        </div>
        <h3 className="service-title">{service.title}</h3>
        <p className="service-desc">{service.desc}</p>
        <div className="service-arrow" style={{ color: service.color }}>
          <FiArrowRight size={24} />
        </div>
      </div>
    </div>
  );
};

export default Services;
