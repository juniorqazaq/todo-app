import { fetchTodos } from "@/lib/api";
import TodoList from "@/components/TodoList";

export const dynamic = 'force-dynamic';

export default async function Home() {
    const initialTodos = await fetchTodos();

    return (
        <div className="flex flex-col items-center justify-center">
            <TodoList initialTodos={initialTodos} />
        </div>
    );
}
