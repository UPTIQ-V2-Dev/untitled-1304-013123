import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { TodoFilter } from '../../types/todo';
import { cn } from '../../lib/utils';

interface TodoFiltersProps {
  activeFilter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
  stats: {
    total: number;
    active: number;
    completed: number;
  };
}

export const TodoFilters = ({ activeFilter, onFilterChange, stats }: TodoFiltersProps) => {
  const filters: { value: TodoFilter; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: stats.total },
    { value: 'active', label: 'Active', count: stats.active },
    { value: 'completed', label: 'Completed', count: stats.completed },
  ];

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={activeFilter === filter.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            "flex items-center gap-2",
            activeFilter === filter.value && "bg-primary text-primary-foreground"
          )}
        >
          {filter.label}
          <Badge 
            variant={activeFilter === filter.value ? 'secondary' : 'default'}
            className="text-xs"
          >
            {filter.count}
          </Badge>
        </Button>
      ))}
    </div>
  );
};