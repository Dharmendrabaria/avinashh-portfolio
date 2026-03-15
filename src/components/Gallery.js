import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { FiImage, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useFadeInOnScroll } from '../context/ThemeContext';
import './Gallery.css';

const galleryItems = [
  { id: 1, type: 'UI Screen', src: '/gallery_ui_1773393608907.png' },
  { id: 2, type: 'Poster', src: '/gallery_poster_1773393573761.png' },
  { id: 3, type: 'Logo', src: '/gallery_logo_1773393590025.png' },
  { id: 4, type: 'App Concept', src: '/project_uiux_1773393498134.png' },
  { id: 5, type: 'Web Design', src: '/project_web_1773393536073.png' },
  { id: 6, type: 'Brand Identity', src: '/project_brand_1773393520201.png' },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const headerRef = useFadeInOnScroll();
  const gridRef = useFadeInOnScroll();

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(galleryItems[index]);
  };

  const closeLightbox = () => setSelectedImage(null);

  const prevImage = (e) => {
    e.stopPropagation();
    const nextIdx = currentIndex === 0 ? galleryItems.length - 1 : currentIndex - 1;
    setCurrentIndex(nextIdx);
    setSelectedImage(galleryItems[nextIdx]);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    const nextIdx = currentIndex === galleryItems.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIdx);
    setSelectedImage(galleryItems[nextIdx]);
  };

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <div className="section-header reveal slide-up" ref={headerRef} style={{ marginBottom: '60px' }}>
          <div className="section-tag" style={{ borderColor: 'rgba(247,37,133,0.25)', color: 'var(--accent-pink)', background: 'rgba(247,37,133,0.1)' }}>
            <FiImage size={14} />
            <span>Creative Shots</span>
          </div>
          <h2 className="section-title">
            Visual <span className="gradient-text" style={{background: 'linear-gradient(135deg, var(--accent-pink), var(--accent-purple))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Gallery</span>
          </h2>
          <p className="section-subtitle">
            A masonry collection of UI screens, posters, logos, and daily design explorations.
          </p>
        </div>
        <div className="gallery-masonry">
          {galleryItems.map((item, index) => (
            <GalleryItem key={item.id} item={item} index={index} onClick={() => openLightbox(index)} />
          ))}
        </div>
      </div>

      {selectedImage && typeof document !== 'undefined' && createPortal(
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            <FiX size={32} />
          </button>
          
          <button className="lightbox-nav prev" onClick={prevImage}>
            <FiChevronLeft size={40} />
          </button>
          
          <img 
            src={selectedImage.src} 
            alt={selectedImage.type} 
            className="lightbox-image" 
            decoding="async"
            onClick={(e) => e.stopPropagation()} 
          />
          <div className="lightbox-caption">{selectedImage.type}</div>

          <button className="lightbox-nav next" onClick={nextImage}>
            <FiChevronRight size={40} />
          </button>
        </div>,
        document.body
      )}
    </section>
  );
};

const GalleryItem = ({ item, index, onClick }) => {
  const ref = useFadeInOnScroll();
  return (
    <div 
      className={`gallery-item glass-card reveal zoom-in delay-${(index % 6) + 1}`}
      onClick={onClick}
      ref={ref}
    >
      <img src={item.src} alt={item.type} loading="lazy" decoding="async" />
      <div className="gallery-overlay">
        <span>{item.type}</span>
      </div>
    </div>
  );
};

export default Gallery;
