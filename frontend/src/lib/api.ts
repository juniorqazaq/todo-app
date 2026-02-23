export interface Todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function fetchTodos(): Promise<Todo[]> {
    try {
        const res = await fetch(`${API_URL}/todos`, {
            cache: 'no-store',
        });
        if (!res.ok) throw new Error('Failed to fetch todos');
        return res.json();
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        console.error("Error fetching todos:", errorMessage);
        return [];
    }
}

export async function createTodo(title: string, description: string = ''): Promise<Todo> {
    const res = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
    });
    if (!res.ok) throw new Error('Failed to create todo');
    return res.json();
}

export async function toggleTodo(id: number, completed: boolean): Promise<Todo> {
    const res = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
    });
    if (!res.ok) throw new Error('Failed to update todo');
    return res.json();
}

export async function deleteTodo(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete todo');
}
