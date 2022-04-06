import styles from "./Item.module.scss";
import { Draggable } from "react-beautiful-dnd-next";
import { useStore } from "../../store";

const Item = ({ index, id }) => {
  const task = useStore((state) => state.getTask(id));

  return (
    <Draggable key={task.id} index={index} draggableId={task.id}>
      {(provided) => (
        <li
          className={styles.boardItem}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={styles.itemContent}>{task.content}</div>
          <div className={styles.tagsWrapper}>
            <div className={styles.tag}>tag</div>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default Item;
