import styles from "./Item.module.scss";
import { Draggable } from "react-beautiful-dnd-next";
import { useStore } from "../../store";
import { useState } from "react";
import Button from "../Button";

const Item = ({ index, id, columnId }) => {
  const { task, setTask, removeTask } = useStore((state) => ({
    task: state.getTask(id),
    setTask: state.setTask,
    removeTask: state.removeTask
  }));

  const [contextMenuOpen, setContextMenuOpen] = useState(false);

  const onContentChange = (e) => {
    setTask({
      ...task,
      content: e.target.value
    });
  };

  const handleDelete = () => {
    console.log("deleting task" + task.id + " from column " + columnId);
    setContextMenuOpen(false);
    removeTask(task.id, columnId);
  };

  return (
    <Draggable key={task.id} index={index} draggableId={task.id}>
      {(provided) => (
        <li
          className={styles.boardItem}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onContextMenu={(e) => {
            e.preventDefault();
            setContextMenuOpen(!contextMenuOpen);
          }}
          // onFocus={() => setContextMenuOpen(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setContextMenuOpen(false);
            }
          }}
        >
          <pre className={styles.itemContent}>
            <div className={styles.itemContentSpace}>{`${task.content} `}</div>
            <textarea
              className={styles.itemText}
              defaultValue={task.content}
              onChange={onContentChange}
              placeholder="¿Qué hay que hacer?"
            ></textarea>
          </pre>

          {contextMenuOpen && (
            <div className={styles.contextMenuWrapper}>
              <Button
                onFocus={() => setContextMenuOpen(true)}
                onClick={handleDelete}
              >
                Eliminar
              </Button>
            </div>
          )}

          {/* <div className={styles.tagsWrapper}>
            <div className={styles.tag}>tag</div>
          </div> */}
        </li>
      )}
    </Draggable>
  );
};

export default Item;
