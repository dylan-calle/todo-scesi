import { CreateTodo } from "./CreateTodo.jsx";

export const Header = ({ saveTodo }) => {
  return (
    <header className="header">
      <h1>
        todo
        <img
          style={{ width: "60px", height: "auto", borderRadius: 10 }}
          src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
          alt="TypeScript logo"
        />
      </h1>

      <CreateTodo saveTodo={saveTodo} />
    </header>
  );
};
