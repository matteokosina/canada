import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import { motion} from "framer-motion";
import styles from './index.module.css';
import ImageText from "@/components/Texts/Text";
import WorldMap from "@/components/ui/world-map";
import {BackgroundGradientAnimation} from "@/components/ui/background-gradient-animation";

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
      <div className=" py-20 dark:bg-black bg-white w-full">
          <div className="max-w-9xl mx-auto text-center">
              <p className="font-bold text-6xl dark:text-white text-black">
                  Kanada, {" "}
                  <span className="text-neutral-400">
            {"Vancouver".split("").map((word, idx) => (
                <motion.span
                    key={idx}
                    className="inline-block"
                    initial={{x: -10, opacity: 0}}
                    animate={{x: 0, opacity: 1}}
                    transition={{duration: 0.5, delay: idx * 0.04}}
                >
                    {word}
                </motion.span>
            ))}
          </span>
              </p>
              <p className="text-sm md:text-xl text-neutral-500 max-w-3xl mx-auto py-4">
                  Chasing Growth, Embracing Adventure: My Vancouver Rotation Journey! 🚀
              </p>
          </div>
          <WorldMap
              dots={[
                  {
                      start: {
                          lat: 64.2008,
                          lng: -149.4937,
                      }, // Alaska (Fairbanks)
                      end: {
                          lat: 34.0522,
                          lng: -118.2437,
                      }, // Los Angeles
                  },
                  {
                      start: {lat: 64.2008, lng: -149.4937}, // Alaska (Fairbanks)
                      end: {lat: -15.7975, lng: -47.8919}, // Brazil (Brasília)
                  },
                  {
                      start: {lat: -15.7975, lng: -47.8919}, // Brazil (Brasília)
                      end: {lat: 38.7223, lng: -9.1393}, // Lisbon
                  },
                  {
                      start: {lat: 51.5074, lng: -0.1278}, // London
                      end: {lat: 28.6139, lng: 77.209}, // New Delhi
                  },
                  {
                      start: {lat: 28.6139, lng: 77.209}, // New Delhi
                      end: {lat: 43.1332, lng: 131.9113}, // Vladivostok
                  },
                  {
                      start: {lat: 28.6139, lng: 77.209}, // New Delhi
                      end: {lat: -1.2921, lng: 36.8219}, // Nairobi
                  },
              ]}
          />
      </div>
  );
}

export default function Home(): ReactNode {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={`${siteConfig.title}`}
            description="Rotation abroad in Vancouver, Canada">
            <HomepageHeader/>
            <main>
                <BackgroundGradientAnimation>
                    <div className="absolute z-40 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
                        <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
                            {timeUntil(new Date("2025-06-27")) }
                        </p>
                    </div>
                </BackgroundGradientAnimation>
                <ImageText
                    left={true}
                    title="Canada"
                    text="Canada, the second-largest country in the world, is known for its breathtaking natural landscapes and cultural diversity."
                    imageUrl="./img/canada-patch.png"
                />
                <ImageText
                    left={false}
                    title="Vancouver"
                    text="Vancouver is the largest city in British Columbia, it is a vibrant city known for its stunning landscapes and multicultural population."
                    imageUrl="./img/people-patch.png"
                />
            </main>
        </Layout>
    );
}

function timeUntil(targetDate: Date): string {
    const now = new Date();
    let current = new Date(now);

    let years = 0;
    let months = 0;
    let weeks = 0;
    let days = 0;

    // Calculate years
    while (new Date(current.getFullYear() + 1, current.getMonth(), current.getDate()) <= targetDate) {
        current.setFullYear(current.getFullYear() + 1);
        years++;
    }

    // Calculate months
    while (new Date(current.getFullYear(), current.getMonth() + 1, current.getDate()) <= targetDate) {
        current.setMonth(current.getMonth() + 1);
        months++;
    }

    // Calculate weeks
    while (new Date(current.getFullYear(), current.getMonth(), current.getDate() + 7) <= targetDate) {
        current.setDate(current.getDate() + 7);
        weeks++;
    }

    // Calculate days
    while (new Date(current.getFullYear(), current.getMonth(), current.getDate() + 1) <= targetDate) {
        current.setDate(current.getDate() + 1);
        days++;
    }

    return `${years > 0 ? years + " years, " : ""}${months > 0 ? months + " months, " : ""}${weeks > 0 ? weeks + " weeks, " : ""}${days} days`;
}