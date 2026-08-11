import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { AiLauncherButton } from "./AiLauncherButton";
import { getSugestoesIA } from "@/lib/ai/sugestoes";

export async function AppShell({ children }: { children: ReactNode }) {
  const sugestoes = await getSugestoesIA();

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <Topbar />
        <main className="flex-1">{children}</main>
      </div>
      <AiLauncherButton sugestoes={sugestoes} />
    </div>
  );
}
