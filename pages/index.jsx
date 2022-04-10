import Head from "next/head";
import styles from "../styles/Home.module.scss";

import { resetServerContext } from "react-beautiful-dnd-next";
import Board from "../components/Board";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { getRandomPixels } from "../utils";

export default function Home() {
  const [isBrowser, setIsBrowser] = useState(false);
  const [pixels, setPixels] = useState("");

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
        <header className={styles.header}>
          {/* <h1 className={styles.title}>Shitty Boards</h1> */}
          <div className={styles.boardsMenu}>
            <Button
              onClick={() => isBrowser && setPixels(getRandomPixels(3, 2))}
            >
              Tablero 1
            </Button>
            <Button>Tablero 2</Button>
            <Button>Tablero 3</Button>
            <Button className={styles.addButton}>Añadir tablero</Button>
          </div>
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
