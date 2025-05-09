import { reducer, ACTIONS } from '../useTodos'; 

describe('Reducer tests', () => {
  let initialState;

  beforeEach(() => {
    // Inicializamos el estado antes de cada prueba para asegurar que cada test sea independiente
    initialState = { todos: [] };
  });

  it('should return the initial state when an unknown action is passed', () => {
    // Probamos que el reducer devuelva el estado inicial cuando se le pase una acción desconocida
    const action = { type: 'UNKNOWN_ACTION' };
    const state = reducer(initialState, action);
    expect(state).toEqual(initialState); // El estado debe ser igual al estado inicial
  });

  it('should add a new todo', () => {
    // Probamos que el reducer agregue un nuevo todo cuando se pase una acción ADD_TODO
    const newTodo = { id: 1, text: 'Test Todo', completed: false };
    const action = { type: ACTIONS.ADD_TODO, payload: newTodo };
    const state = reducer(initialState, action);

    expect(state.todos).toHaveLength(1); // El array de todos debe tener 1 elemento
    expect(state.todos[0]).toEqual(newTodo); // El nuevo todo debe coincidir con el que agregamos
  });

  it('should toggle a todo completion', () => {
    // Probamos que el reducer cambie el estado de "completed" de un todo
    const initialTodos = [
      { id: 1, text: 'Test Todo', completed: false },
    ];
    initialState = { todos: initialTodos };
    
    const action = { type: ACTIONS.TOGGLE_TODO, payload: 1 }; // Cambiar el todo con id 1
    const state = reducer(initialState, action);

    expect(state.todos[0].completed).toBe(true); // El todo debe estar marcado como completado
  });

  it('should delete a todo', () => {
    // Probamos que el reducer elimine un todo correctamente
    const initialTodos = [
      { id: 1, text: 'Test Todo', completed: false },
      { id: 2, text: 'Second Todo', completed: true },
    ];
    initialState = { todos: initialTodos };
    
    const action = { type: ACTIONS.DELETE_TODO, payload: 1 }; // Eliminar el todo con id 1
    const state = reducer(initialState, action);

    expect(state.todos).toHaveLength(1); // El array de todos debe tener solo 1 elemento
    expect(state.todos[0].id).toBe(2); // El todo con id 1 debe haber sido eliminado
  });

  it('should clear completed todos', () => {
    // Probamos que el reducer elimine todos los todos que estén marcados como completados
    const initialTodos = [
      { id: 1, text: 'Test Todo', completed: false },
      { id: 2, text: 'Completed Todo', completed: true },
    ];
    initialState = { todos: initialTodos };

    const action = { type: ACTIONS.CLEAR_COMPLETED }; // Acción para eliminar todos los completados
    const state = reducer(initialState, action);

    expect(state.todos).toHaveLength(1); // Debe quedar solo 1 todo
    expect(state.todos[0].completed).toBe(false); // El todo restante debe estar incompleto
  });

  it('should load todos into state', () => {
    // Probamos que el reducer cargue los todos desde el localStorage (simulado)
    const todosFromStorage = [
      { id: 1, text: 'Test Todo', completed: false },
      { id: 2, text: 'Second Todo', completed: true },
    ];
    const action = { type: ACTIONS.LOAD_TODOS, payload: todosFromStorage }; // Cargar los todos
    const state = reducer(initialState, action);

    expect(state.todos).toEqual(todosFromStorage); // El estado debe coincidir con los todos cargados
  });
});
