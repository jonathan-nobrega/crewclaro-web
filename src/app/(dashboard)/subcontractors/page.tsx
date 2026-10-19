"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export default function SubcontractorsPage() {
  const { data } = useQuery({ queryKey: ["subs"], queryFn: api.listSubcontractors });

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-slate-500">
          <th>Company</th><th>Trade</th><th>Language</th><th>Projects</th><th>Insurance</th><th>License expires</th>
        </tr>
      </thead>
      <tbody>
        {data?.data.map((s) => (
          <tr key={s.id} className="border-t">
            <td>{s.company}</td>
            <td>{s.trade}</td>
            <td>{s.preferredLang}</td>
            <td>{s.projectIds.length}</td>
            <td>{s.compliance.insuranceOnFile ? "✅" : "⚠️ missing"}</td>
            <td>{s.compliance.licenseExpiresAt ?? "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
