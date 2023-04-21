import styles from "./TodoItem.module.scss";
export default function TodoItem({ todo, deleteTodo, updateTodo }) {
  async function modifyTodo(newTodo) {
    try {
      const response = await fetch("https://todoback-p4kn.onrender.com/modifyTodo", {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const newTodo = await response.json();
        console.log({ newTodo });
        updateTodo(newTodo);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteTodo(deletedTodo) {
    try {
      const response = await fetch("https://todoback-p4kn.onrender.com/deleteTodo", {
        method: "POST",
        body: JSON.stringify(deletedTodo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        deleteTodo(deletedTodo);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <li className={styles["d-flex justify-content-center align-items-center p10 mb10"]}>
      <span className={styles["flex-fill mr10"]}>
        {todo.content} {todo.done && "✔️"}
      </span>
      <div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            modifyTodo({ ...todo, done: !todo.done });
          }}
          className={styles["btn btn-primary mr10"]}
        >
          {todo.done ? "Réalisé" : "A faire"}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            modifyTodo({ ...todo, edit: !todo.edit });
          }}
          className={styles["btn btn-primary mr10"]}
        >
          Modifier
        </button>
        <button
          onClick={() => handleDeleteTodo(todo)}
          className={styles["btn btn-primary-reverse mr10"]}
        >
          Supprimer
        </button>
      </div>
    </li>
  );
}
