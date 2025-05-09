import { useEffect, useReducer } from "react";
import { TODO_FILTERS } from "../const.js";

// LocalStorage helpers I
const LOCAL_STORAGE_KEY = "todos";

const fetchTodos = () => {
  try {
    const todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    return Array.isArray(todos) ? todos : [];
  } catch {
    return [];
  }
};

const updateTodos = (todos) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  } catch (err) {
    console.error("Error saving to localStorage:", err);
  }
};

const initialState = {
  sync: false,
  todos: [],
  filterSelected: (() => {
    const params = new URLSearchParams(window.location.search);
    const filter = params.get("filter");
    return Object.values(TODO_FILTERS).includes(filter) ? filter : TODO_FILTERS.ALL;
  })(),
};

const reducer = (state, action) => {
  if (action.type === "INIT_TODOS") {
    const { todos } = action.payload;
    return {
      ...state,
      sync: false,
      todos,
    };
  }

  if (action.type === "CLEAR_COMPLETED") {
    return {
      ...state,
      sync: true,
      todos: state.todos.filter((todo) => !todo.completed),
    };
  }

  if (action.type === "COMPLETED") {
    const { id, completed } = action.payload;
    return {
      ...state,
      sync: true,
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed,
          };
        }
        return todo;
      }),
    };
  }

  if (action.type === "FILTER_CHANGE") {
    const { filter } = action.payload;
    return {
      ...state,
      sync: true,
      filterSelected: filter,
    };
  }

  if (action.type === "REMOVE") {
    const { id } = action.payload;
    return {
      ...state,
      sync: true,
      todos: state.todos.filter((todo) => todo.id !== id),
    };
  }

  if (action.type === "SAVE") {
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

  if (action.type === "UPDATE_TITLE") {
    const { id, title } = action.payload;
    return {
      ...state,
      sync: true,
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title,
          };
        }
        return todo;
      }),
    };
  }

  return state;
};

export const useTodos = () => {
  const [{ sync, todos, filterSelected }, dispatch] = useReducer(reducer, initialState);

  // Manejo de acciones (igual que antes)
  const handleCompleted = (id, completed) => {
    dispatch({ type: "COMPLETED", payload: { id, completed } });
  };

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE", payload: { id } });
  };

  const handleUpdateTitle = ({ id, title }) => {
    dispatch({ type: "UPDATE_TITLE", payload: { id, title } });
  };

  const handleSave = (title) => {
    dispatch({ type: "SAVE", payload: { title } });
  };

  const handleClearCompleted = () => {
    dispatch({ type: "CLEAR_COMPLETED" });
  };

  const handleFilterChange = (filter) => {
    dispatch({ type: "FILTER_CHANGE", payload: { filter } });
    const params = new URLSearchParams(window.location.search);
    params.set("filter", filter);
    window.history.pushState({}, "", `${window.location.pathname}?${params.toString()}`);
  };

  // Filtro
  const filteredTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed;
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed;
    return true;
  });

  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.length - completedCount;

  // Cargar desde localStorage al montar
  useEffect(() => {
    const todos = fetchTodos();
    dispatch({ type: "INIT_TODOS", payload: { todos } });
  }, []);

  // Guardar en localStorage cuando haya cambios
  useEffect(() => {
    if (sync) {
      updateTodos(todos);
    }
  }, [todos, sync]);

  return {
    activeCount,
    completedCount,
    filterSelected,
    handleClearCompleted,
    handleCompleted,
    handleFilterChange,
    handleRemove,
    handleSave,
    handleUpdateTitle,
    todos: filteredTodos,
  };
};
