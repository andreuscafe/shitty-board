import styles from "./NavigationBar.module.scss";
import Button from "../Button";
import { useStore } from "../../store";

const NavigationBar = () => {
  const { boards, setCurrentBoard } = useStore((state) => ({
    boards: state.getBoards(),
    setCurrentBoard: state.setCurrentBoard
  }));

  return (
    <nav className={styles.navigationBar}>
      {/* <h1 className={styles.title}>Shitty Boards</h1> */}
      <div className={styles.boardsMenu}>
        {boards.map((board, index) => (
          <Button
            key={board.id}
            className={styles.boardButton}
            onClick={() => {
              console.log(board.id);
              setCurrentBoard(board.id);
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
