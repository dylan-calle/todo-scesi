// import { Copyright } from './components/Copyright'
// import { Footer } from './components/Footer'
import { Header } from "./components/Header.jsx";
import { Todos } from "./components/Todos.jsx";
import { useTodos } from "./hooks/useTodos.jsx";

const App = () => {
  const {
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
  } = useTodos();

  return (
    <>
      <div className="todoapp">
        <Header saveTodo={handleSave} />
        <Todos
          removeTodo={handleRemove}
          setCompleted={handleCompleted}
          setTitle={handleUpdateTitle}
          todos={filteredTodos}
        />
        {/* <Footer
          handleFilterChange={handleFilterChange}
          completedCount={completedCount}
          activeCount={activeCount}
          filterSelected={filterSelected}
          onClearCompleted={handleClearCompleted}
        /> */}
      </div>
      {/* <Copyright /> */}
    </>
  );
};

export default App;
