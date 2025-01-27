import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';
import Hero from "@site/src/components/Heading/header-hero";

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

      </main>
    </Layout>
  );
}
