import { Droppable, Draggable } from "react-beautiful-dnd-next";
import { useStore } from "../../store";
import Item from "../Item";

import styles from "./Column.module.scss";

const Column = ({ column, index }) => {
  const { tasks, addEmptyTask } = useStore((state) => ({
    tasks: state.getColumnTasks(column.id),
    addEmptyTask: state.addEmptyTask
  }));

  const handleAddTask = () => {
    addEmptyTask(column.id);
  };

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className={styles.column}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <h2 className={styles.columnTitle} {...provided.dragHandleProps}>
            {column.title}
          </h2>
          <Droppable key={index} droppableId={column.id} type="task">
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
                <button
                  className={styles.addTaskButton}
                  aria-label="Añadir una tarea"
                  onClick={handleAddTask}
                >
                  Añadir una tarea
                </button>
              </ul>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
