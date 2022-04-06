import create from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      // State
      tasks: {
        "task-1": {
          id: "task-1",
          content: "Hacer mi laburo real",
          tags: []
        },
        "task-2": {
          id: "task-2",
          content: "Dejarme de joder con estas apps",
          tags: []
        },
        "task-3": {
          id: "task-3",
          content: "Hacer más apps",
          tags: []
        },
        "task-4": {
          id: "task-4",
          content: "Dejar el frontend y poner un puesto de panchuques",
          tags: []
        },
        "task-5": {
          id: "task-5",
          content: "Salir a vivir la vida",
          tags: []
        },
        "task-6": {
          id: "task-6",
          content: "Subir a platino en el LoL",
          tags: []
        }
      },
      columns: {
        "column-1": {
          id: "column-1",
          title: "Por hacer",
          items: ["task-1", "task-2", "task-3"]
        },
        "column-2": {
          id: "column-2",
          title: "En progreso",
          items: ["task-4"]
        },
        "column-3": {
          id: "column-3",
          title: "Hecho",
          items: []
        },
        "column-4": {
          id: "column-4",
          title: "Archivado",
          items: ["task-5", "task-6"]
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
      addTask(task) {
        const taskId = `task-${this.tasks.length + 1}`;
        this.tasks[taskId] = {
          ...task,
          id: taskId
        };
        this.columns[task.columnId].items.push(taskId);
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
      }
    }),
    {
      name: "store",
      getStorage: () => localStorage
    }
  )
);
