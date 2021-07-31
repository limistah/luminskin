import React from "react";
import styles from "./Layout.module.css";
import Head from "next/head";
import Footer from "../Footer";
import Header from "../Header";

interface Props {
  children: React.ReactElement;
  title: string;
  description: string;
}

function Layout({ children, title, description }: Props) {
  return (
    <div className={styles.layout}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Header />

      {children}
      <Footer />
    </div>
  );
}

export default Layout;
