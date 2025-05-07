import React, { Component, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import SimpleGallery from './_Images';
import { imageList } from './_generated_';
import NoImages from './NoImages';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function App() {
      return (
        <BrowserOnly>
          {
            ()=>{
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
              console.log('imageList', imageList);
          
            return (
                <Layout title="Galerie" description="Bilder von Kanada">
                  <h1 className={isDarkMode ? "dark" : "light"}>Bilder von Kanada</h1>
                  {(imageList.length > 0) ? 
                  <SimpleGallery
                    galleryID="my-test-gallery"
                    images={imageList}
                  />: <NoImages />}
                </Layout>
              );
            }
          }
        </BrowserOnly>);
  }
