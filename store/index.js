import create from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      // State
      tasks: {},
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
        }
      },
      columnOrder: ["column-1", "column-2", "column-3", "column-4"],

      // Actions
      getColumns() {
        return this.columnOrder.map((columnId) => this.columns[columnId]);
      },
      getAllTasks() {
        return this.columnOrder.reduce((acc, columnId) => {
          return [...acc, ...this.columns[columnId].items];
        }, []);
      },
      getTask(id) {
        return this.tasks[id];
      },
      getColumnTasks(columnId) {
        return this.columns[columnId].items;
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
      setColumn(column) {
        set((state) => ({
          columns: {
            ...state.columns,
            [column.id]: column
          }
        }));
      },
      setTask(task) {
        set((state) => ({
          tasks: {
            ...state.tasks,
            [task.id]: task
          }
        }));
      },
      setColumnOrder(columnOrder) {
        set((state) => ({
          columnOrder
        }));
      },
      setNewTask(newTask) {
        set((state) => ({
          newTask
        }));
      }
    }),
    {
      name: "store",
      getStorage: () => localStorage
    }
  )
);
