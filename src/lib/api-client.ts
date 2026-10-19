import type { Message, Task, TaskStatus, Subcontractor, Paginated } from "@crewclaro/api-types";

const API = process.env.NEXT_PUBLIC_API_URL!;

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    credentials: "include",
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

export const api = {
  listMessages: (projectId: string, lang: string, cursor?: string) =>
    req<Paginated<Message>>(`/projects/${projectId}/messages?lang=${lang}${cursor ? `&cursor=${cursor}` : ""}`),

  sendMessage: (projectId: string, body: string, attachments: string[] = []) =>
    req<Message>(`/projects/${projectId}/messages`, {
      method: "POST",
      body: JSON.stringify({ body, attachments }),
    }),

  listTasks: (projectId: string, filters: { trade?: string; status?: TaskStatus } = {}) => {
    const qs = new URLSearchParams(filters as Record<string, string>).toString();
    return req<Paginated<Task>>(`/projects/${projectId}/tasks?${qs}`);
  },

  updateTask: (taskId: string, patch: Partial<Pick<Task, "status" | "dueDate">> & { assigneeId?: string }) =>
    req<Task>(`/tasks/${taskId}`, { method: "PATCH", body: JSON.stringify(patch) }),

  listSubcontractors: () => req<Paginated<Subcontractor>>(`/subcontractors`),

  inviteSubcontractor: (input: { company: string; contact: string; trade: string; lang: string }) =>
    req<Subcontractor>(`/subcontractors/invite`, { method: "POST", body: JSON.stringify(input) }),
};
