import type { Task } from "@crewclaro/api-types";

export function TaskCard({ task, lang }: { task: Task; lang: string }) {
  return (
    <div className="rounded-lg border bg-white p-3">
      <p className="text-sm font-medium">{task.title[lang] ?? task.title.en}</p>
      <div className="mt-2 flex justify-between text-xs text-slate-500">
        <span>{task.assignee?.company ?? "Unassigned"}</span>
        <span>Due {task.dueDate}</span>
      </div>
      {task.photos.length > 0 && <span className="text-xs">📷 {task.photos.length}</span>}
    </div>
  );
}
