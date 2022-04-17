import Head from "next/head";
import styles from "../styles/Home.module.scss";

import { resetServerContext } from "react-beautiful-dnd-next";
import Board from "../components/Board";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { getRandomPixels } from "../utils";
import NavigationBar from "../components/NavigationBar";
import { useStore } from "../store";
import Header from "../components/Header";

export default function Home() {
  const [isBrowser, setIsBrowser] = useState(false);
  const [pixels, setPixels] = useState("");

  const { currentBoard } = useStore((state) => ({
    currentBoard: state.currentBoard
  }));

  useEffect(() => {
    setIsBrowser(typeof window);
    setPixels(getRandomPixels(3, 2));
  }, []);

  return (
    <main
      className={styles.main}
      style={{
        // "--background-image": `url("/images/${Math.round(
        //   Math.random() * 4 + 1
        // )}.jpg")`
        "--background-image": `url(https://source.unsplash.com/random/300x300/?skyline,sunset)`
        // "--background-image": isBrowser && `url(${pixels})`
      }}
    >
      <Head>
        <title>Shitty Boards | @andreuscafe</title>
        <meta name="description" content="Shitty boards app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <Header />
        <Board id={currentBoard} />
        <NavigationBar />
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  resetServerContext();
  return { props: { data: [] } };
}
