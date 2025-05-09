import { useReducer, useEffect } from 'react';

const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete-todo',
  CLEAR_COMPLETED: 'clear-completed',
  LOAD_TODOS: 'load-todos'
};

const initialState = {
  todos: []
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOAD_TODOS:
      return { ...state, todos: action.payload };

    case ACTIONS.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };

    case ACTIONS.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };

    case ACTIONS.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };

    case ACTIONS.CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      };

    default:
      return state;
  }
}

export function useTodos() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Cargar desde localStorage al montar el componente
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('todos')) || [];
    dispatch({ type: ACTIONS.LOAD_TODOS, payload: stored });
  }, []);

  // Guardar en localStorage al cambiar el estado
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return { state, dispatch };
}

// ⚠️ ¡Estos son necesarios para que los tests puedan importarlos!
export { reducer, ACTIONS };
