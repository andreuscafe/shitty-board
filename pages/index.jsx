import Head from "next/head";
import styles from "../styles/Home.module.scss";

import { resetServerContext } from "react-beautiful-dnd-next";
import Board from "../components/Board";

export default function Home() {
  return (
    <main
      className={styles.main}
      style={{
        // "--background-image": `url("/images/${Math.round(
        //   Math.random() * 4 + 1
        // )}.jpg")`
        "--background-image": `url(https://source.unsplash.com/random/5x5)`
      }}
    >
      <Head>
        <title>Shitty Boards | @andreuscafe</title>
        <meta name="description" content="Shitty boards app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Shitty Boards</h1>
        </header>

        <Board />
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  resetServerContext();
  return { props: { data: [] } };
}
