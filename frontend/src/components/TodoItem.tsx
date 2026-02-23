"use client";

import { useState } from "react";
import { Check, Trash2, Clock } from "lucide-react";
import { Todo } from "@/lib/api";

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number, completed: boolean) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const handleToggle = async () => {
        setIsUpdating(true);
        try {
            await onToggle(todo.id, !todo.completed);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await onDelete(todo.id);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className={`group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 mb-3 bg-white rounded-xl border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md ${todo.completed ? 'opacity-75 bg-slate-50' : ''} ${isDeleting ? 'scale-95 opacity-0' : ''}`}>

            <div className="flex items-start gap-4 mb-3 sm:mb-0 w-full sm:w-auto">
                <button
                    onClick={handleToggle}
                    disabled={isUpdating}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors mt-1 ${todo.completed
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'border-slate-300 hover:border-indigo-400 text-transparent'
                        } ${isUpdating ? 'animate-pulse opacity-50' : ''}`}
                    aria-label={todo.completed ? "Mark pending" : "Mark completed"}
                >
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </button>

                <div className="flex flex-col w-full">
                    <h3 className={`font-medium text-lg transition-all ${todo.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                        {todo.title}
                    </h3>
                    {todo.description && (
                        <p className={`text-sm mt-1 mb-2 leading-relaxed ${todo.completed ? 'text-slate-400 line-through' : 'text-slate-600'}`}>
                            {todo.description}
                        </p>
                    )}
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1 font-medium">
                        <Clock className="w-3 h-3" />
                        <time dateTime={todo.createdAt} suppressHydrationWarning>
                            {new Date(todo.createdAt).toLocaleString('en-US')}
                        </time>
                    </div>
                </div>
            </div>

            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="self-end sm:self-auto p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                aria-label="Delete todo"
            >
                <Trash2 className="w-5 h-5" />
            </button>

        </div>
    );
}
