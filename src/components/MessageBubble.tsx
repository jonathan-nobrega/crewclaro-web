"use client";
import { useState } from "react";
import type { Message } from "@crewclaro/api-types";

const FLAGS: Record<string, string> = { en: "🇺🇸", es: "🇪🇸", pt: "🇧🇷", pl: "🇵🇱" };

export function MessageBubble({ msg, readerLang }: { msg: Message; readerLang: string }) {
  const [showOriginal, setShowOriginal] = useState(false);
  const translated = msg.translations[readerLang];
  const isOwnLang = msg.original.lang === readerLang;
  const text = showOriginal || isOwnLang || !translated ? msg.original.text : translated;

  return (
    <div className="rounded-xl bg-white p-3 shadow-sm">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span className="font-medium text-slate-800">{msg.sender.name}</span>
        <span>{FLAGS[msg.original.lang]} → {FLAGS[readerLang]}</span>
        {msg.translationStatus === "pending" && <span className="italic">translating…</span>}
      </div>
      <p className="mt-1 text-sm">{text}</p>
      {!isOwnLang && translated && (
        <button className="mt-1 text-xs text-blue-600" onClick={() => setShowOriginal(!showOriginal)}>
          {showOriginal ? "Show translation" : "Show original"}
        </button>
      )}
    </div>
  );
}
