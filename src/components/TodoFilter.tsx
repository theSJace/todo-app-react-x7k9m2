import React from 'react';
import { FilterType, TodoStats } from '../types/todo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  stats: TodoStats;
}

interface FilterOption {
  value: FilterType;
  label: string;
  count: (stats: TodoStats) => number;
}

const filterOptions: FilterOption[] = [
  { value: 'all', label: 'All', count: (s) => s.total },
  { value: 'active', label: 'Active', count: (s) => s.active },
  { value: 'completed', label: 'Completed', count: (s) => s.completed },
];

export const TodoFilter: React.FC<TodoFilterProps> = ({
  currentFilter,
  onFilterChange,
  stats,
}) => {
  return (
    <div className="flex gap-1 p-1 bg-muted rounded-lg" role="tablist" aria-label="Filter todos">
      {filterOptions.map((option) => (
        <Button
          key={option.value}
          variant={currentFilter === option.value ? "secondary" : "ghost"}
          size="sm"
          onClick={() => onFilterChange(option.value)}
          role="tab"
          aria-selected={currentFilter === option.value}
          aria-controls="todo-list"
          className={cn(
            "flex-1 gap-2",
            currentFilter === option.value && "bg-background shadow-sm"
          )}
        >
          {option.label}
          <span className="text-xs text-muted-foreground">
            {option.count(stats)}
          </span>
        </Button>
      ))}
    </div>
  );
};
