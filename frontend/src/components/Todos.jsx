import { useState } from "react";
import { Todo } from "./Todo.jsx";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const Todos = ({ todos, setCompleted, setTitle, removeTodo }) => {
  const [isEditing, setIsEditing] = useState("");
  const [parent] = useAutoAnimate();

  return (
    <ul className="todo-list" ref={parent}>
      {todos?.map((todo) => (
        <li
          key={todo.id}
          onDoubleClick={() => setIsEditing(todo.id)}
          className={`
            ${todo.completed ? "completed" : ""}
            ${isEditing === todo.id ? "editing" : ""}
          `}
        >
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            setCompleted={setCompleted}
            setTitle={setTitle}
            removeTodo={removeTodo}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </li>
      ))}
    </ul>
  );
};
