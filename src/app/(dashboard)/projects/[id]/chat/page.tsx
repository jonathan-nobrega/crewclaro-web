"use client";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { getSocket } from "@/lib/realtime";
import { MessageBubble } from "@/components/MessageBubble";

export default function ProjectChatPage({ params }: { params: { id: string } }) {
  const lang = "en"; // TODO: read from user profile
  const qc = useQueryClient();
  const [draft, setDraft] = useState("");
  const { data } = useQuery({
    queryKey: ["messages", params.id, lang],
    queryFn: () => api.listMessages(params.id, lang),
  });

  useEffect(() => {
    const s = getSocket(params.id);
    const refresh = () => qc.invalidateQueries({ queryKey: ["messages", params.id] });
    s.on("message.created", refresh);
    s.on("message.translated", refresh);
    return () => { s.off("message.created", refresh); s.off("message.translated", refresh); };
  }, [params.id, qc]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-2 overflow-y-auto p-4">
        {data?.data.map((m) => <MessageBubble key={m.id} msg={m} readerLang={lang} />)}
      </div>
      <form
        className="flex gap-2 border-t p-3"
        onSubmit={async (e) => { e.preventDefault(); await api.sendMessage(params.id, draft); setDraft(""); }}
      >
        <input className="flex-1 rounded border px-3" value={draft} onChange={(e) => setDraft(e.target.value)}
               placeholder="Write in any language…" />
        <button className="rounded bg-[#1b2b4b] px-4 text-white">Send</button>
      </form>
    </div>
  );
}
