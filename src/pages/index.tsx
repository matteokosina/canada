import type { ReactNode } from "react";
import { useState, useEffect, use } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import ImageText from "@/components/Texts/Text";
import WorldMap from "@/components/ui/world-map";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import RecentPost from "../components/RecentPost/RecentPost";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div className=" py-20 dark:bg-black bg-white w-full">
      <div className="max-w-9xl mx-auto text-center">
        <p className="font-bold text-6xl dark:text-white text-black">
          Kanada,{" "}
          <span className="text-neutral-400">
            {"Vancouver".split("").map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.1, delay: idx * 0.04 }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </p>
        <p className="text-sm md:text-xl text-neutral-500 max-w-3xl mx-auto py-4">
          Lernen 📚, arbeiten 👨🏽‍💻, erleben 🗺️ – 8000 km von zu Hause entfernt.
        </p>
      </div>
      <WorldMap
        dots={[
          {
            start: { lat: 49.006889, lng: 8.403653 }, // Karlsruhe
            end: { lat: 49.246292, lng: -123.116226 }, // Vancouver
          },
        ]}
      />
    </div>
  );
}

export default function Home(): ReactNode {
  const [localStatsData, setLocalStatsData] = useState<string>("");

  useEffect(() => {
    const fetchLocalStats = async () => {
      const stats = await localStats();
      setLocalStatsData(stats);
    };
    fetchLocalStats();
  }, []);
  return (
    <Layout
      title={`Auslandspraxis in Kanada`}
      description="Rotation Abroad in Vancouver, Canada"
    >
      <HomepageHeader />
      <main>
        <BackgroundGradientAnimation>
          <div className="absolute z-40 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
            <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
              {localStatsData}
            </p>
            <a
              href="https://open-meteo.com/"
              className="absolute bottom-4 right-4 text-xs text-neutral-400 pointer-events-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              Weather data by Open-Meteo.com
            </a>
          </div>
        </BackgroundGradientAnimation>
        <RecentPost />
        <ImageText
          left={true}
          title="Kanada"
          text="Kanada – das zweitgrößte Land der Erde – lockt mit einer unglaublichen Vielfalt an Landschaften und Erlebnissen. Von den majestätischen Rocky Mountains im Westen bis zu den malerischen Küsten im Osten bietet Kanada atemberaubende Naturerlebnisse.  Pulsierende Metropolen wie Toronto, Montreal und Vancouver bieten Kultur und kulinarische Genüsse.  Ob Wandern in Nationalparks, Skifahren in Weltklasse-Skigebieten,  das Beobachten von Walen oder das Erkunden charmanter Städte – Kanada hält für jeden Geschmack etwas bereit.  Die Freundlichkeit der Kanadier und die Weite des Landes machen eine Reise nach Kanada zu einem unvergesslichen Erlebnis."
          imageUrl="./img/canada-patch.png"
        />
        <ImageText
          left={false}
          title="Vancouver"
          text="Vancouver, die Perle an Kanadas Pazifikküste, lockt mit einer einzigartigen Mischung aus urbanem Leben und atemberaubender Natur. Eingebettet zwischen den Coast Mountains und dem Pazifischen Ozean bietet die Stadt eine spektakuläre Kulisse und ein mildes Klima.  Die rund 706.000 Einwohner Vancouvers (Stand: Volkszählung 2022)  spiegeln die kulturelle Vielfalt Kanadas wider –  Menschen aus aller Welt haben hier ein Zuhause gefunden, was sich in der pulsierenden Kunstszene, dem vielseitigen kulinarischen Angebot und der weltoffenen Atmosphäre widerspiegelt.  Die Bewohner Vancouvers, oft als entspannt und naturverbunden beschrieben, schätzen die vielen Möglichkeiten für Outdoor-Aktivitäten, die die Stadt bietet:  Wandern, Radfahren, Segeln, Skifahren – in und um Vancouver ist alles möglich.  Diese Mischung aus Naturverbundenheit und urbanem Lifestyle macht Vancouver zu einem besonders attraktiven Reiseziel. "
          imageUrl="./img/people-patch.png"
        />
        <ImageText
          left={true}
          title="Vancouvers Natur"
          text="Vancouver ist ein Paradies für Naturliebhaber. Die Stadt ist umgeben von einer atemberaubenden Landschaft, die von dichten Regenwäldern über schneebedeckte Berge bis hin zum Pazifischen Ozean reicht. Im Stanley Park, einer der größten Stadtparks Nordamerikas, kann man zwischen majestätischen Douglasien und Zedern wandern und dabei den Blick auf die Skyline der Stadt und das Meer genießen. Die Küstengewässer beheimaten eine reiche Tierwelt, darunter Orcas, Seehunde und Seelöwen. Mit etwas Glück kann man sogar Wale beobachten. Im Frühling und Sommer verwandeln blühende Kirschbäume die Stadt in ein farbenprächtiges Meer. Die nahegelegenen North Shore Mountains bieten im Winter ideale Bedingungen zum Skifahren und Snowboarden und im Sommer locken sie Wanderer und Mountainbiker."
          imageUrl="./img/bear-patch.png"
        />
      </main>
    </Layout>
  );
}

async function localStats(): Promise<string> {
  const time = new Date().toLocaleString("de-DE", {
    timeZone: "America/Vancouver",
    hour: "2-digit",
    minute: "2-digit",
  });
  let weather = await getWeatherData(49.2827, -123.1207); // Vancouver coordinates

  return `${time} Uhr, ${weather.temperature}, ${weather.condition} ${weather.emoji}`;
}

async function getWeatherData(
  lat: number,
  lng: number
): Promise<{
  temperature: string;
  condition: string;
  emoji: string;
}> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code`;
    const response = await fetch(url);
    const data = await response.json();

    const temperature = `${Math.round(data.current.temperature_2m)}${
      data.current_units.temperature_2m
    }`;

    // Map weather code to condition and emoji
    const weatherMapping: Record<number, { condition: string; emoji: string }> =
      {
        0: { condition: "Klar", emoji: "☀️" },
        1: { condition: "Überwiegend klar", emoji: "🌤️" },
        2: { condition: "Teilweise bewölkt", emoji: "⛅" },
        3: { condition: "Bewölkt", emoji: "☁️" },
        45: { condition: "Nebel", emoji: "🌫️" },
        48: { condition: "Reifnebel", emoji: "🌫️" },
        51: { condition: "Leichter Nieselregen", emoji: "🌦️" },
        53: { condition: "Mäßiger Nieselregen", emoji: "🌧️" },
        55: { condition: "Starker Nieselregen", emoji: "🌧️" },
        61: { condition: "Leichter Regen", emoji: "🌦️" },
        63: { condition: "Mäßiger Regen", emoji: "🌧️" },
        65: { condition: "Starker Regen", emoji: "🌧️" },
        71: { condition: "Leichter Schneefall", emoji: "🌨️" },
        73: { condition: "Mäßiger Schneefall", emoji: "❄️" },
        75: { condition: "Starker Schneefall", emoji: "❄️" },
        95: { condition: "Gewitter", emoji: "⛈️" },
        96: { condition: "Gewitter mit Hagel", emoji: "🌩️" },
        99: { condition: "Starkes Gewitter mit Hagel", emoji: "⛈️" },
      };

    const weatherInfo = weatherMapping[data.current.weather_code] || {
      condition: "",
      emoji: "",
    };

    return {
      temperature,
      condition: weatherInfo.condition,
      emoji: weatherInfo.emoji,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return {
      temperature: "",
      condition: "Daten nicht verfügbar",
      emoji: "",
    };
  }
}
