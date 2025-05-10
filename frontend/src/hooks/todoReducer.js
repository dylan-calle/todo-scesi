import { TODO_FILTERS } from "../const.js";

const LOCAL_STORAGE_KEY = "todos";

// Estado inicial
export const initialState = {
  sync: false,
  todos: [],
  filterSelected: (() => {
    const params = new URLSearchParams(window.location.search);
    const filter = params.get("filter");
    return Object.values(TODO_FILTERS).includes(filter) ? filter : TODO_FILTERS.ALL;
  })(),
};

// Reducer
export const todoReducer = (state, action) => {
  switch (action.type) {
    case "INIT_TODOS": {
      const { todos } = action.payload;
      return { ...state, sync: false, todos };
    }
    case "CLEAR_COMPLETED": {
      return {
        ...state,
        sync: true,
        todos: state.todos.filter((todo) => !todo.completed),
      };
    }
    case "COMPLETED": {
      const { id, completed } = action.payload;
      return {
        ...state,
        sync: true,
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed } : todo
        ),
      };
    }
    case "FILTER_CHANGE": {
      const { filter } = action.payload;
      return {
        ...state,
        sync: false, // No guardar esto en localStorage
        filterSelected: filter,
      };
    }
    case "REMOVE": {
      const { id } = action.payload;
      return {
        ...state,
        sync: true,
        todos: state.todos.filter((todo) => todo.id !== id),
      };
    }
    case "SAVE": {
      const { title } = action.payload;
      const newTodo = {
        id: crypto.randomUUID(),
        title,
        completed: false,
      };
      return {
        ...state,
        sync: true,
        todos: [...state.todos, newTodo],
      };
    }
    case "UPDATE_TITLE": {
      const { id, title } = action.payload;
      return {
        ...state,
        sync: true,
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, title } : todo
        ),
      };
    }
    default:
      return state;
  }
};

// Helpers de LocalStorage
export const fetchTodos = () => {
  try {
    const todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    return Array.isArray(todos) ? todos : [];
  } catch {
    return [];
  }
};

export const updateTodos = (todos) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  } catch (err) {
    console.error("Error saving to localStorage:", err);
  }
};
