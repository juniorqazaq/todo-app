"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";

interface TodoFormProps {
    onAdd: (title: string, description: string) => Promise<void>;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title.trim()) return;

        setIsSubmitting(true);
        try {
            await onAdd(title.trim(), description.trim());
            setTitle("");
            setDescription("");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8 transition-all hover:shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-slate-800 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-indigo-500" />
                Add New Task
            </h2>
            <div className="flex flex-col gap-4">
                <div>
                    <label htmlFor="title" className="sr-only">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="What needs to be done?"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-slate-700 font-medium placeholder:text-slate-400"
                        disabled={isSubmitting}
                        required
                        autoFocus
                    />
                </div>
                <div>
                    <label htmlFor="description" className="sr-only">Description (optional)</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add details (optional)..."
                        rows={2}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-slate-600 text-sm resize-none placeholder:text-slate-400"
                        disabled={isSubmitting}
                    />
                </div>
                <button
                    type="submit"
                    disabled={!title.trim() || isSubmitting}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                    {isSubmitting ? "Adding..." : "Add Task"}
                </button>
            </div>
        </form>
    );
}
