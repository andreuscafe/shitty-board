import Head from "next/head";
import styles from "../styles/Home.module.scss";

import { resetServerContext } from "react-beautiful-dnd-next";
import { useEffect } from "react";
import NavigationBar from "../components/NavigationBar";
import { useStore } from "../store";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const Board = dynamic(() => import("../components/Board"), { ssr: false });
const Header = dynamic(() => import("../components/Header"), { ssr: false });

export default function Home() {
  const { query } = useRouter();

  const { currentBoard, setCurrentBoard } = useStore((state) => ({
    currentBoard: state.currentBoard,
    setCurrentBoard: state.setCurrentBoard
  }));

  useEffect(() => {
    setCurrentBoard(query.board);
  }, [query.board, setCurrentBoard]);

  return (
    <main
      className={styles.main}
      style={{
        "--background-image": `url("/images/3.jpg")`
      }}
    >
      <Head>
        <title>Shitty Boards | @andreuscafe</title>
        <meta name="description" content="Shitty boards app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <Header />
        {currentBoard && <Board id={currentBoard} />}
        <NavigationBar />
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  resetServerContext();
  return { props: { data: [] } };
}
