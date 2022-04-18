import styles from "./Header.module.scss";
import Button from "../Button";
import { useStore } from "../../store";

const Header = () => {
  const { currentBoard } = useStore((state) => ({
    currentBoard: state.getBoard(state.currentBoard)
  }));

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        {currentBoard ? currentBoard.title : "Seleccione un tablero"}
      </h1>
    </header>
  );
};

export default Header;
