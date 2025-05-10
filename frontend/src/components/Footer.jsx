export const Footer = ({ activeCount, completedCount, filterSelected, handleFilterChange, onClearCompleted }) => {
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{activeCount}</strong> tareas pendientes
        </span>
  
        <ul className="filters">
          <li>
            <button onClick={() => handleFilterChange("all")} className={filterSelected === "all" ? "selected" : ""}>
              Todas
            </button>
          </li>
          <li>
            <button onClick={() => handleFilterChange("active")} className={filterSelected === "active" ? "selected" : ""}>
              Activas
            </button>
          </li>
          <li>
            <button onClick={() => handleFilterChange("completed")} className={filterSelected === "completed" ? "selected" : ""}>
              Completadas
            </button>
          </li>
        </ul>
  
        {completedCount > 0 && (
          <button className="clear-completed" onClick={onClearCompleted}>
            Borrar completadas
          </button>
        )}
      </footer>
    );
  };