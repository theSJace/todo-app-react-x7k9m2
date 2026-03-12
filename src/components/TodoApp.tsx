import React, { useState, useEffect } from 'react';
import { FilterType } from '../types/todo';
import { useTodos } from '../hooks/useTodos';
import { TodoInput } from './TodoInput';
import { TodoFilter } from './TodoFilter';
import { TodoList } from './TodoList';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Moon, Sun, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const TodoApp: React.FC = () => {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted, stats, filterTodos } = useTodos();
  const [filter, setFilter] = useState<FilterType>('all');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Initialize theme from system preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const filteredTodos = filterTodos(filter);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-md mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Tasks</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Main Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Stay organized, one task at a time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <TodoInput onAdd={addTodo} />
            <TodoFilter
              currentFilter={filter}
              onFilterChange={setFilter}
              stats={stats}
            />
            <TodoList
              todos={filteredTodos}
              stats={stats}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onClearCompleted={clearCompleted}
            />
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground">
          Press Enter to add a task
        </p>
      </div>
    </div>
  );
};
