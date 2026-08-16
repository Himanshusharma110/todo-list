import { useMemo, useState } from 'react';

const initialTodos = [
  { id: 1, text: 'Plan the week', completed: true },
  { id: 2, text: 'Review project goals', completed: false },
  { id: 3, text: 'Finish the todo app', completed: false },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState('');

  const remainingCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos],
  );

  const addTodo = () => {
    const trimmed = newTodo.trim();
    if (!trimmed) return;

    setTodos((current) => [
      ...current,
      { id: Date.now(), text: trimmed, completed: false },
    ]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  return (
    <div className="app-shell">
      <div className="todo-card">
        <header className="todo-header">
          <div>
            <p className="eyebrow">Task board</p>
            <h1>Todo List</h1>
          </div>
          <span className="badge">{remainingCount} left</span>
        </header>

        <div className="input-row">
          <input
            type="text"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') addTodo();
            }}
            placeholder="Add a new task"
            aria-label="Add a new task"
          />
          <button onClick={addTodo}>Add</button>
        </div>

        <ul className="todo-list">
          {todos.length === 0 ? (
            <li className="empty-state">No tasks yet. Add one above.</li>
          ) : (
            todos.map((todo) => (
              <li key={todo.id} className={todo.completed ? 'done' : ''}>
                <label className="check-row">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span>{todo.text}</span>
                </label>
                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                  aria-label={`Delete ${todo.text}`}
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
