import styles from "./NavigationBar.module.scss";
import Button from "../Button";
import { useStore } from "../../store";
import { useRouter } from "next/router";

const NavigationBar = () => {
  const { push } = useRouter();

  const { boards, setCurrentBoard } = useStore((state) => ({
    boards: state.getBoards(),
    setCurrentBoard: state.setCurrentBoard
  }));

  return (
    <nav className={styles.navigationBar}>
      <div className={styles.boardsMenu}>
        {boards.map((board, index) => (
          <Button
            key={board.id}
            className={styles.boardButton}
            onClick={() => {
              push(`/${board.id}`);
            }}
          >
            {board.title}
          </Button>
        ))}
        <Button className={styles.addButton}>Añadir tablero</Button>
      </div>
    </nav>
  );
};

export default NavigationBar;
