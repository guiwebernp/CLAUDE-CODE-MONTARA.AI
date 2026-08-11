import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, Sun, Megaphone, Handshake, Boxes, Settings2 } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface NavGroup {
  label: string;
  icon: LucideIcon;
  items: NavItem[];
}

export const NAV_TOPO: NavItem[] = [
  { label: "Visão Geral", href: "/visao-geral", icon: LayoutDashboard },
  { label: "Foco do Dia", href: "/foco-do-dia", icon: Sun },
];

export const NAV_PILARES: NavGroup[] = [
  {
    label: "Tráfego",
    icon: Megaphone,
    items: [{ label: "Campanhas", href: "/trafego/campanhas", icon: Megaphone }],
  },
  {
    label: "Comercial",
    icon: Handshake,
    items: [
      { label: "Prospecção", href: "/comercial/prospeccao", icon: Handshake },
      { label: "Propostas", href: "/comercial/propostas", icon: Handshake },
    ],
  },
  {
    label: "Operacional",
    icon: Boxes,
    items: [
      { label: "Clientes", href: "/operacional/clientes", icon: Boxes },
      { label: "Projetos", href: "/operacional/projetos", icon: Boxes },
      { label: "Tarefas", href: "/operacional/tarefas", icon: Boxes },
    ],
  },
];

export const NAV_RODAPE: NavItem[] = [{ label: "Configurações", href: "/configuracoes", icon: Settings2 }];
