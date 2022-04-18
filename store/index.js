import create from "zustand";
import { persist } from "zustand/middleware";

export const [useStore, api] = create(
  persist(
    (set) => ({
      // State
      tasks: {
        // 'task-1': {
        //   id: 'task-1',
        //   content: "",
        //   tags: [],
        //   timeCount: 0
        // }
      },
      columns: {
        "column-1": {
          id: "column-1",
          title: "Por hacer",
          items: []
        },
        "column-2": {
          id: "column-2",
          title: "En progreso",
          items: []
        },
        "column-3": {
          id: "column-3",
          title: "Hecho",
          items: []
        },
        "column-4": {
          id: "column-4",
          title: "Archivado",
          items: []
        },
        "column-5": {
          id: "column-5",
          title: "Prueba",
          items: []
        },
        "column-6": {
          id: "column-6",
          title: "De",
          items: []
        },
        "column-7": {
          id: "column-7",
          title: "Columnas",
          items: []
        },
        "column-8": {
          id: "column-8",
          title: "Archivado",
          items: []
        }
      },
      boards: {
        "board-1": {
          id: "board-1",
          title: "Hola",
          columns: ["column-1", "column-2", "column-3", "column-4"],
          columnsOrder: ["column-1", "column-2", "column-3", "column-4"]
        },
        "board-2": {
          id: "board-2",
          title: "Mundo",
          columns: ["column-5", "column-6", "column-7", "column-8"],
          columnsOrder: ["column-5", "column-6", "column-7", "column-8"]
        }
      },
      currentBoard: "board-1",
      boardsOrder: ["board-1", "board-2"],

      // Actions
      setCurrentBoard: (id) => {
        const state = api.getState();

        set((state) => ({
          currentBoard: state.boardsOrder.includes(id) ? id : ""
        }));
      },
      getBoards: () => {
        const state = api.getState();

        return state.boardsOrder.map((boardId) => state.boards[boardId]);
      },
      getBoard: (id) => {
        const state = api.getState();

        return state.boards[id];
      },
      getBoardColumns(boardId) {
        const state = api.getState();

        return state.boards[boardId].columnsOrder.map(
          (columnId) => state.columns[columnId]
        );
      },
      getTask(id) {
        const state = api.getState();
        return state.tasks[id];
      },
      getColumnTasks(columnId) {
        const state = api.getState();
        return state.columns[columnId].items;
      },
      getColumnsOrder(boardId) {
        const state = api.getState();

        return state.boards[boardId].columnsOrder;
      },
      setColumnsOrder(columnsOrder, boardId) {
        set((state) => ({
          boards: {
            ...state.boards,
            [boardId]: {
              ...state.boards[boardId],
              columnsOrder
            }
          }
        }));
      },
      setColumn(column) {
        set((state) => ({
          columns: {
            ...state.columns,
            [column.id]: column
          }
        }));
      },
      addEmptyTask(columnId) {
        set((state) => {
          const taskId = `task-${Math.round(Math.random() * 10000000000)}`;

          console.log(taskId);

          return {
            tasks: {
              ...state.tasks,
              [taskId]: {
                id: taskId,
                content: "",
                tags: []
              }
            },
            columns: {
              ...state.columns,
              [columnId]: {
                ...state.columns[columnId],
                items: [...state.columns[columnId].items, taskId]
              }
            }
          };
        });
      },
      setTask(task) {
        set((state) => ({
          tasks: {
            ...state.tasks,
            [task.id]: task
          }
        }));
      },
      setNewTask(newTask) {
        set((state) => ({
          newTask
        }));
      },
      removeTask(taskId, columnId) {
        set((state) => ({
          tasks: {
            ...state.tasks,
            [taskId]: undefined
          },
          columns: {
            ...state.columns,
            [columnId]: {
              ...state.columns[columnId],
              items: state.columns[columnId].items.filter(
                (item) => item !== taskId
              )
            }
          }
        }));
      }
    }),
    {
      name: "store",
      getStorage: () => localStorage
    }
  )
);
