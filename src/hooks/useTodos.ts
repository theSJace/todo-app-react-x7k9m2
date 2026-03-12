import { useCallback, useMemo } from 'react';
import { Todo, FilterType, TodoStats } from '../types/todo';
import { useLocalStorage } from './useLocalStorage';

const STORAGE_KEY = 'todos-react-app';

export function useTodos() {
  const [todos, setTodos] = useLocalStorage<Todo[]>(STORAGE_KEY, []);

  const addTodo = useCallback((text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: trimmedText,
      completed: false,
      createdAt: Date.now(),
    };

    setTodos((prev) => [newTodo, ...prev]);
  }, [setTodos]);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, [setTodos]);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, [setTodos]);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, [setTodos]);

  const editTodo = useCallback((id: string, newText: string) => {
    const trimmedText = newText.trim();
    if (!trimmedText) return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: trimmedText } : todo
      )
    );
  }, [setTodos]);

  const stats: TodoStats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    return {
      total,
      active: total - completed,
      completed,
    };
  }, [todos]);

  const filterTodos = useCallback((filter: FilterType): Todo[] => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos]);

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    editTodo,
    stats,
    filterTodos,
  };
}
