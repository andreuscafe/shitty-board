import styles from "./Item.module.scss";
import { Draggable } from "react-beautiful-dnd-next";
import { useStore } from "../../store";
import { useState } from "react";

const Item = ({ index, id }) => {
  const { task, setTask } = useStore((state) => ({
    task: state.getTask(id),
    setTask: state.setTask
  }));

  const onContentChange = (e) => {
    setTask({
      ...task,
      content: e.target.value
    });
  };

  return (
    <Draggable key={task.id} index={index} draggableId={task.id}>
      {(provided) => (
        <li
          className={styles.boardItem}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <pre className={styles.itemContent}>
            <div className={styles.itemContentSpace}>{`${task.content} `}</div>
            <textarea
              className={styles.itemText}
              defaultValue={task.content}
              onChange={onContentChange}
            ></textarea>
          </pre>
          <div className={styles.tagsWrapper}>
            <div className={styles.tag}>tag</div>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default Item;
