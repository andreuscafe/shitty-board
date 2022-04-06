import { Droppable } from "react-beautiful-dnd-next";
import { useStore } from "../../store";
import Item from "../Item";

import styles from "./Column.module.scss";

const Column = ({ column, index }) => {
  const tasks = useStore((state) => state.getColumnTasks(column.id));

  return (
    <div className={styles.column} key={index}>
      <h2 className={styles.columnTitle}>{column.title}</h2>
      <Droppable key={index} droppableId={column.id}>
        {(provided) => (
          <ul
            ref={provided.innerRef}
            className={styles.columnItemsList}
            {...provided.droppableProps}
          >
            {tasks.map((itemId, index) => (
              <Item key={index} index={index} id={itemId} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
