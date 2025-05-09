import { useEffect, useReducer } from "react";
import {
  todoReducer,
  initialState,
  fetchTodos,
  updateTodos,
} from "./todoReducer.js";
import { TODO_FILTERS } from "../const.js";

export const useTodos = () => {
  const [{ sync, todos, filterSelected }, dispatch] = useReducer(
    todoReducer,
    initialState
  );

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
    window.history.pushState({}, "", `${window.location.pathname}?${params}`);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed;
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed;
    return true;
  });

  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.length - completedCount;

  useEffect(() => {
    const todos = fetchTodos();
    dispatch({ type: "INIT_TODOS", payload: { todos } });
  }, []);

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
