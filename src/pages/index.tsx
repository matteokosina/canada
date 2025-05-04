import type { ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import ImageText from "@/components/Texts/Text";
import WorldMap from "@/components/ui/world-map";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

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
                                transition={{ duration: 0.5, delay: idx * 0.04 }}
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
                            {timeUntil(new Date("2025-06-27"))}
                        </p>
                    </div>
                </BackgroundGradientAnimation>
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

function timeUntil(targetDate: Date): string {
    const now = new Date();
    let current = new Date(now);

    let years = 0;
    let months = 0;
    let weeks = 0;
    let days = 0;


    // Calculate years
    while (
        new Date(
            current.getFullYear() + 1,
            current.getMonth(),
            current.getDate()
        ) <= targetDate
    ) {
        current.setFullYear(current.getFullYear() + 1);
        years++;
    }

    // Calculate months
    while (
        new Date(
            current.getFullYear(),
            current.getMonth() + 1,
            current.getDate()
        ) <= targetDate
    ) {
        current.setMonth(current.getMonth() + 1);
        months++;
    }

    // Calculate weeks
    while (
        new Date(
            current.getFullYear(),
            current.getMonth(),
            current.getDate() + 7
        ) <= targetDate
    ) {
        current.setDate(current.getDate() + 7);
        weeks++;
    }

    // Calculate days
    while (
        new Date(
            current.getFullYear(),
            current.getMonth(),
            current.getDate() + 1
        ) <= targetDate
    ) {
        current.setDate(current.getDate() + 1);
        days++;
    }

    return `${years > 0 ? years == 1 ? years + " Jahr, " : years + " Jahre, " : ""}
    ${months > 0 ? months == 1 ? months + " Monat, " : months + " Monate, " : ""}
    ${weeks > 0 ? weeks == 1 ? weeks + " Woche, " : weeks + " Wochen, " : ""}
    ${days == 1 ? days + " Tag" : days + " Tage"}`;
}
