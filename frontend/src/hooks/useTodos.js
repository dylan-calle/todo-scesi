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
      // Cargar los todos desde el localStorage
      return { ...state, todos: action.payload };

    case ACTIONS.ADD_TODO:
      // Agregar un nuevo todo al estado
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };

    case ACTIONS.TOGGLE_TODO:
      // Cambiar el estado de "completado" de un todo
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };

    case ACTIONS.DELETE_TODO:
      // Eliminar un todo del estado por su id
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };

    case ACTIONS.CLEAR_COMPLETED:
      // Eliminar todos los todos que estén marcados como completados
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      };

    default:
      // Devuelve el estado tal cual si la acción no es conocida
      return state;
  }
}

export function useTodos() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Cargar los todos desde el localStorage al montar el componente
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('todos')) || [];
      dispatch({ type: ACTIONS.LOAD_TODOS, payload: stored });
    } catch (error) {
      console.error("Error loading todos from localStorage", error);
      // Si ocurre un error al cargar, no hacemos nada, solo dejamos el estado vacío.
    }
  }, []); // Este useEffect solo se ejecutará una vez cuando el componente se monte

  // Guardar los todos en localStorage cada vez que el estado cambie
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]); // Este useEffect se ejecuta cada vez que `state.todos` cambia

  return { state, dispatch };
}

// ⚠️ ¡Estos son necesarios para que los tests puedan importarlos!
export { reducer, ACTIONS };
