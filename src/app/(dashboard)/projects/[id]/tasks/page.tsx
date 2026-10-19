"use client";
import { useQuery } from "@tanstack/react-query";
import type { TaskStatus } from "@crewclaro/api-types";
import { api } from "@/lib/api-client";
import { TaskCard } from "@/components/TaskCard";

const COLUMNS: { status: TaskStatus; label: string }[] = [
  { status: "todo", label: "To Do" },
  { status: "in_progress", label: "In Progress" },
  { status: "blocked", label: "Blocked" },
  { status: "done", label: "Done" },
];

export default function TasksBoardPage({ params }: { params: { id: string } }) {
  const { data } = useQuery({ queryKey: ["tasks", params.id], queryFn: () => api.listTasks(params.id) });
  const tasks = data?.data ?? [];
  const trades = [...new Set(tasks.map((t) => t.trade))];

  return (
    <div className="space-y-6 p-4">
      {trades.map((trade) => (
        <section key={trade}>
          <h2 className="mb-2 text-sm font-semibold uppercase text-slate-600">{trade}</h2>
          <div className="grid grid-cols-4 gap-3">
            {COLUMNS.map((col) => (
              <div key={col.status} className="rounded-lg bg-slate-100 p-2">
                <p className="mb-2 text-xs font-medium">{col.label}</p>
                <div className="space-y-2">
                  {tasks.filter((t) => t.trade === trade && t.status === col.status)
                        .map((t) => <TaskCard key={t.id} task={t} lang="en" />)}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
