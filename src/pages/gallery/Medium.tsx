import React, { useState, useEffect } from "react";
import "./Medium.css";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface Props {
  galleryID: string;
  media: {
    type: "image" | "video";
    url: string;
    thumbnail_url: string;
    width?: number;
    height?: number;
  }[];
}

function MediumRender({ galleryID, media }: Props) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const close = () => setCurrentIndex(null);

  const showNext = () => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex + 1) % media.length);
  };

  const showPrev = () => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex - 1 + media.length) % media.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  return (
    <div>
      <div className="gallery" id={galleryID}>
        {media.map((medium, idx) =>
          medium.type === "video" ? (
            <video
              key={`${galleryID}-${idx}`}
              src={medium.url}
              className="thumbnail"
              onClick={() => setCurrentIndex(idx)}
              style={{ width: "150px", height: "auto", cursor: "pointer" }}
            />
          ) : (
            <LazyLoadImage
              key={`${galleryID}-${idx}`}
              src={medium.thumbnail_url || medium.url}
              className="thumbnail"
              onClick={() => setCurrentIndex(idx)}
              alt={`${galleryID}-${idx}`}
              style={{ width: "150px", height: "auto", cursor: "pointer" }}
            />
          )
        )}
      </div>

      {currentIndex !== null && media.length > 0 && (
        <div className="lightbox-backdrop" onClick={close}>
          <button
            className="close-button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
          >
            ×
          </button>
          <button
            className="lightbox-arrow left"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
          >
            ‹
          </button>
          {media[currentIndex]?.type == "video" ? (
            <video
              className="lightbox"
              src={media[currentIndex].url}
              controls
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img
              src={media[currentIndex].url}
              className="lightbox"
              alt="Full"
              onClick={(e) => e.stopPropagation()}
            />
          )}
          <button
            className="lightbox-arrow right"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

export default function Medium(props: Props) {
  return <BrowserOnly>{() => <MediumRender {...props} />}</BrowserOnly>;
}
