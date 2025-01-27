import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';
import Hero from "@site/src/components/Heading/header-hero";
import ImageText from "@site/src/components/Texts/Text";
import Message from "@site/src/components/Message/Message";

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Hero/>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Follow me on my semester abroad ...">
      <HomepageHeader />
      <main>
          <ImageText
              left={true}
              title="Canada"
              text="Canada, the second-largest country in the world, is known for its breathtaking natural landscapes and cultural diversity."
              imageUrl="./img/canada-patch.png"
          />
          <ImageText
              left={false}
              title="Vancouver"
              text="Vancouver, the largest city in British Columbia, is a vibrant city known for its stunning landscapes and multicultural population."
              imageUrl="./img/people-patch.png"
          />

      </main>
    </Layout>
  );
}
