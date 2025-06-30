import React, { useEffect, useState } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import "./image-gallery.css";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ImageGalleryProps {
  images: { src: string; caption: string }[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <BrowserOnly>
      {() => {
        const [currentIndex, setCurrentIndex] = useState(0);
        const [isDarkMode, setIsDarkMode] = useState(
          localStorage.getItem("theme") === "dark"
        );

        useEffect(() => {
          const handleStorageChange = () => {
            const theme = localStorage.getItem("theme");
            setIsDarkMode(theme === "dark");
          };

          window.addEventListener("storage", handleStorageChange);

          return () => {
            window.removeEventListener("storage", handleStorageChange);
          };
        }, []);

        const handleNext = () => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        };

        const handlePrev = () => {
          setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
          );
        };

        return (
          <div style={{ textAlign: "center" }}>
            {images.length === 1 ? (
              <>
                <img
                  src={images[0].src}
                  alt={images[0].caption}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <div style={{ marginTop: "10px" }}>{images[0].caption}</div>
              </>
            ) : (
              <>
                <div style={{ position: "relative", display: "inline-block" }}>
                  <img
                    src={images[currentIndex].src}
                    alt={images[currentIndex].caption}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                  <button
                    onClick={handlePrev}
                    className="galleryButton"
                    id="left"
                  >
                    <ArrowLeft />
                  </button>
                  <button
                    onClick={handleNext}
                    className="galleryButton"
                    id="right"
                  >
                    <ArrowRight />
                  </button>
                </div>
                <div className={isDarkMode ? "dark" : "light"}>
                  {images[currentIndex].caption}
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {images.map((_, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor:
                          currentIndex === index ? "#c13636" : "#ccc",
                        margin: "0 5px",
                        cursor: "pointer",
                      }}
                    ></div>
                  ))}
                </div>
              </>
            )}
          </div>
        );
      }}
    </BrowserOnly>
  );
};

export default ImageGallery;
