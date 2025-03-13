// components/TodoDropdown.tsx
"use client";

import { useState } from 'react';
import { CheckSquare, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export function TodoDropdown() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'System Updated', completed: true },
    { id: 2, text: 'Do something more', completed: false },
    { id: 3, text: 'Find an idea', completed: true },
    { id: 4, text: 'Project review', completed: true },
  ]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <CheckSquare className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-purple-600 text-[10px] font-medium text-white flex items-center justify-center">
            {todos.length}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[300px]">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <h2 className="font-semibold">Todo</h2>
          <Button variant="ghost" size="sm" className="text-xs">
            View All
          </Button>
        </div>
        <div className="max-h-[400px] overflow-auto">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between px-4 py-2 hover:bg-accent"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => {
                    setTodos(todos.map(t => 
                      t.id === todo.id ? { ...t, completed: !t.completed } : t
                    ));
                  }}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className={cn(
                  "text-sm",
                  todo.completed && "line-through text-muted-foreground"
                )}>
                  {todo.text}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}