import styles from "./Board.module.scss";

import {
  resetServerContext,
  DragDropContext,
  Droppable
} from "react-beautiful-dnd-next";
import { useEffect, useRef, useState } from "react";
import Column from "../Column";
import { useStore } from "../../store";

export default function Board() {
  const { columns, setColumn, columnOrder, setColumnOrder } = useStore(
    (state) => ({
      columns: state.getColumns(),
      setColumn: state.setColumn,
      columnOrder: state.columnOrder,
      setColumnOrder: state.setColumnOrder
    })
  );

  const dragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      return setColumnOrder(newColumnOrder);
    }

    const start = columns.find((column) => column.id === source.droppableId);
    const finish = columns.find(
      (column) => column.id === destination.droppableId
    );

    if (start === finish) {
      // Move task inside the same column
      const newItems = Array.from(start.items);

      newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        items: newItems
      };

      setColumn(newColumn);
    } else {
      // Moving from one list to another
      const startItems = Array.from(start.items);
      startItems.splice(source.index, 1);

      const newStart = {
        ...start,
        items: startItems
      };

      const finishItems = Array.from(finish.items);
      finishItems.splice(destination.index, 0, draggableId);

      const newFinish = {
        ...finish,
        items: finishItems
      };

      setColumn(newStart);
      setColumn(newFinish);
    }
  };

  const [isBrowser, setIsBrowser] = useState(false);
  const [isDragStarted, setIsDragStarted] = useState(false);
  const boardWrapperRef = useRef(null);

  useEffect(() => {
    setIsBrowser(typeof window);
  }, []);

  const handleDragStart = (e) => {
    if (
      e.target.dataset.dragBoard &&
      boardWrapperRef.current.scrollWidth > boardWrapperRef.current.clientWidth
    ) {
      setIsDragStarted(true);
    }
  };

  const handleDragMove = (e) => {
    if (isDragStarted) {
      boardWrapperRef.current.scrollLeft += -e.movementX;
    }
  };

  return (
    <>
      {isBrowser && (
        <div
          className={styles.boardWrapper}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={() => {
            if (isDragStarted) setIsDragStarted(false);
          }}
          ref={boardWrapperRef}
          data-drag-board
        >
          <DragDropContext onDragEnd={dragEnd}>
            <Droppable
              droppableId="all-columns"
              direction="horizontal"
              type="column"
            >
              {(provided) => (
                <div
                  className={styles.columnsWrapper}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  data-drag-board
                >
                  {columns.map((column, index) => (
                    <Column column={column} key={index} index={index} />
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}
    </>
  );
}

// export async function getServerSideProps(context) {
//   resetServerContext();
//   return { props: { data: [] } };
// }
