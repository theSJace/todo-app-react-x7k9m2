import React from 'react';
import { Todo, TodoStats } from '../types/todo';
import { TodoItem } from './TodoItem';
import styles from './TodoList.module.css';

interface TodoListProps {
  todos: Todo[];
  stats: TodoStats;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onClearCompleted: () => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  stats,
  onToggle,
  onDelete,
  onClearCompleted,
}) => {
  const hasCompleted = stats.completed > 0;

  if (todos.length === 0) {
    return (
      <div className={styles.emptyState} role="status" aria-live="polite">
        <svg
          className={styles.emptyIcon}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
        </svg>
        <p className={styles.emptyTitle}>No todos yet</p>
        <p className={styles.emptyText}>
          Add a task above to get started on your journey to productivity.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className={styles.todoList}
        role="list"
        id="todo-list"
        aria-label="Todo items"
      >
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>
      <div className={styles.footer}>
        <span className={styles.itemsLeft}>
          {stats.active} {stats.active === 1 ? 'item' : 'items'} left
        </span>
        {hasCompleted && (
          <button
            className={styles.clearButton}
            onClick={onClearCompleted}
            aria-label="Clear all completed todos"
          >
            Clear completed
          </button>
        )}
      </div>
    </>
  );
};
