import React, { useState, useEffect } from 'react';
import './imageGallery.css';
import BrowserOnly from '@docusaurus/BrowserOnly';

interface Props {
  galleryID: string;
  images: {
    url: string;
    width: number;
    height: number;
  }[];
}

function GalleryInternal({ galleryID, images }: Props) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const close = () => setCurrentIndex(null);

  const showNext = () => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const showPrev = () => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  return (
    <div>
      <div className="gallery" id={galleryID}>
        {images.map((image, idx) => (
          <img
            key={`${galleryID}-${idx}`}
            src={image.url}
            alt={`Image ${idx}`}
            className="thumbnail"
            onClick={() => setCurrentIndex(idx)}
            style={{ width: '150px', height: 'auto', cursor: 'pointer' }}
          />
        ))}
      </div>

      {currentIndex !== null && (
        <div className="lightbox-backdrop" onClick={close}>
          <button className="close-button" onClick={(e) => { e.stopPropagation(); close(); }}>×</button>
          <button className="lightbox-arrow left" onClick={(e) => { e.stopPropagation(); showPrev(); }}>‹</button>
          <img
            src={images[currentIndex].url}
            className="lightbox-image"
            alt="Full"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="lightbox-arrow right" onClick={(e) => { e.stopPropagation(); showNext(); }}>›</button>
        </div>
      )}
    </div>
  );
}

export default function ImageGallery(props: Props) {
  return (
    <BrowserOnly>{() => <GalleryInternal {...props} />}</BrowserOnly>
  );
}
