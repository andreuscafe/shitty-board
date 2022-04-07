import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

import {
  resetServerContext,
  DragDropContext,
  Droppable
} from "react-beautiful-dnd-next";
import { useEffect, useState } from "react";
import Column from "../components/Column";
import { useStore } from "../store";

export default function Home() {
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

  useEffect(() => {
    setIsBrowser(typeof window);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Shitty Boards | @andreuscafe</title>
        <meta name="description" content="Shitty boards app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {isBrowser && (
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
                >
                  {columns.map((column, index) => (
                    <Column column={column} key={index} index={index} />
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </main>

      {/* <footer className={styles.footer}></footer> */}
    </div>
  );
}

export async function getServerSideProps(context) {
  resetServerContext();
  return { props: { data: [] } };
}
