import { reducer, ACTIONS } from '../useTodos'; // Asegúrate de la ruta correcta al archivo donde está el reducer

describe('Reducer tests', () => {
  let initialState;

  beforeEach(() => {
    // Inicializar el estado antes de cada test
    initialState = { todos: [] };
  });

  it('should return the initial state when an unknown action is passed', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state = reducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  it('should add a new todo', () => {
    const newTodo = { id: 1, text: 'Test Todo', completed: false };
    const action = { type: ACTIONS.ADD_TODO, payload: newTodo };
    const state = reducer(initialState, action);

    expect(state.todos).toHaveLength(1);
    expect(state.todos[0]).toEqual(newTodo);
  });

  it('should toggle a todo completion', () => {
    const initialTodos = [
      { id: 1, text: 'Test Todo', completed: false },
    ];
    initialState = { todos: initialTodos };
    
    const action = { type: ACTIONS.TOGGLE_TODO, payload: 1 };
    const state = reducer(initialState, action);

    expect(state.todos[0].completed).toBe(true); // El todo debe estar marcado como completado
  });

  it('should delete a todo', () => {
    const initialTodos = [
      { id: 1, text: 'Test Todo', completed: false },
      { id: 2, text: 'Second Todo', completed: true },
    ];
    initialState = { todos: initialTodos };
    
    const action = { type: ACTIONS.DELETE_TODO, payload: 1 };
    const state = reducer(initialState, action);

    expect(state.todos).toHaveLength(1);
    expect(state.todos[0].id).toBe(2); // El todo con id 1 debe haber sido eliminado
  });

  it('should clear completed todos', () => {
    const initialTodos = [
      { id: 1, text: 'Test Todo', completed: false },
      { id: 2, text: 'Completed Todo', completed: true },
    ];
    initialState = { todos: initialTodos };

    const action = { type: ACTIONS.CLEAR_COMPLETED };
    const state = reducer(initialState, action);

    expect(state.todos).toHaveLength(1);
    expect(state.todos[0].completed).toBe(false); // El todo completado debe ser eliminado
  });

  it('should load todos into state', () => {
    const todosFromStorage = [
      { id: 1, text: 'Test Todo', completed: false },
      { id: 2, text: 'Second Todo', completed: true },
    ];
    const action = { type: ACTIONS.LOAD_TODOS, payload: todosFromStorage };
    const state = reducer(initialState, action);

    expect(state.todos).toEqual(todosFromStorage); // Los todos deben coincidir con los cargados
  });
});
