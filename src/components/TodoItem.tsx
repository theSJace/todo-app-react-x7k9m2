import React, { useState } from 'react';
import { Todo } from '../types/todo';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(todo.id);
    }, 250);
  };

  const handleToggle = () => {
    onToggle(todo.id);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg border bg-card transition-all duration-250",
        todo.completed && "opacity-60",
        isDeleting && "translate-x-full opacity-0"
      )}
      role="listitem"
    >
      <Checkbox
        checked={todo.completed}
        onCheckedChange={handleToggle}
        id={`todo-${todo.id}`}
        className="shrink-0"
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className={cn(
          "flex-1 cursor-pointer select-none",
          todo.completed && "line-through text-muted-foreground"
        )}
      >
        {todo.text}
      </label>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        aria-label={`Delete todo: ${todo.text}`}
        className="shrink-0 opacity-0 group-hover:opacity-100 hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
