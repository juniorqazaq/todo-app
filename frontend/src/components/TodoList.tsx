"use client";

import { useState } from "react";
import { Todo, createTodo, toggleTodo, deleteTodo } from "@/lib/api";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { CheckCircle2, ListTodo, Circle } from "lucide-react";

interface TodoListProps {
    initialTodos: Todo[];
}

type FilterType = "all" | "active" | "completed";

export default function TodoList({ initialTodos }: TodoListProps) {
    const [todos, setTodos] = useState<Todo[]>(initialTodos);
    const [filter, setFilter] = useState<FilterType>("all");

    const handleAdd = async (title: string, description: string) => {
        const newTodo = await createTodo(title, description);
        setTodos([newTodo, ...todos]);
    };

    const handleToggle = async (id: number, completed: boolean) => {
        const previousTodos = [...todos];
        setTodos(todos.map(t => t.id === id ? { ...t, completed } : t));

        try {
            await toggleTodo(id, completed);
        } catch (error) {
            console.error("Failed to toggle todo", error);
            setTodos(previousTodos);
        }
    };

    const handleDelete = async (id: number) => {
        const previousTodos = [...todos];
        setTodos(todos.filter(t => t.id !== id));

        try {
            await deleteTodo(id);
        } catch (error) {
            console.error("Failed to delete todo", error);
            setTodos(previousTodos);
        }
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });

    const activeCount = todos.filter(t => !t.completed).length;

    return (
        <div className="w-full">
            <TodoForm onAdd={handleAdd} />

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                        <ListTodo className="w-5 h-5 text-indigo-500" />
                        Your Tasks
                        <span className="ml-2 bg-indigo-100 text-indigo-700 py-0.5 px-2.5 rounded-full text-xs font-bold">
                            {activeCount} active
                        </span>
                    </h2>

                    <div className="flex bg-slate-100 p-1 rounded-lg w-full sm:w-auto">
                        <button
                            onClick={() => setFilter("all")}
                            className={`flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-1.5 ${filter === "all" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"}`}
                        >
                            <ListTodo className="w-4 h-4" /> All
                        </button>
                        <button
                            onClick={() => setFilter("active")}
                            className={`flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-1.5 ${filter === "active" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"}`}
                        >
                            <Circle className="w-4 h-4" /> Active
                        </button>
                        <button
                            onClick={() => setFilter("completed")}
                            className={`flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-1.5 ${filter === "completed" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"}`}
                        >
                            <CheckCircle2 className="w-4 h-4" /> Done
                        </button>
                    </div>
                </div>

                <div className="p-4 sm:p-6 bg-slate-50 min-h-[300px]">
                    {filteredTodos.length > 0 ? (
                        <div className="space-y-1">
                            {filteredTodos.map((todo) => (
                                <TodoItem
                                    key={todo.id}
                                    todo={todo}
                                    onToggle={handleToggle}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                            <div className="w-16 h-16 bg-indigo-50 text-indigo-300 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <p className="text-slate-500 font-medium text-lg">No tasks found</p>
                            <p className="text-slate-400 text-sm mt-1">
                                {filter === "all"
                                    ? "You have no tasks yet. Add one above!"
                                    : filter === "active"
                                        ? "You have no active tasks."
                                        : "You haven't completed any tasks yet."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
