import React, { Component, useEffect, useState } from 'react';

import BrowserOnly from '@docusaurus/BrowserOnly';
import ImageGallery from './Medium';

export default function App() {
      return (
        <BrowserOnly>
          {
            ()=>{
                const Layout = require('@theme/Layout').default;
                const { mediaList } = require('./_generated_');
                const NoImages = require('./NoImages').default;

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
          
            return (
                <Layout title="Galerie" description="Bilder von Kanada">
                  <h1 className={isDarkMode ? "dark" : "light"}>Bilder von Kanada</h1>
                  {(mediaList.length > 0) ? 
                  <ImageGallery
                    galleryID="image-gallery"
                    media={mediaList}
                  />: <NoImages />}
                </Layout>
              );
            }
          }
        </BrowserOnly>);
  }
