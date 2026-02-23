import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Next.js + NestJS Todo App",
    description: "A fullstack todo application",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased min-h-screen bg-slate-50 text-slate-900 pb-20">
                <header className="bg-white shadow-sm border-b header-pattern">
                    <div className="max-w-3xl mx-auto p-6">
                        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            Task Master
                        </h1>
                    </div>
                </header>
                <main className="max-w-3xl mx-auto p-4 md:p-6 mt-6">
                    {children}
                </main>
            </body>
        </html>
    );
}
