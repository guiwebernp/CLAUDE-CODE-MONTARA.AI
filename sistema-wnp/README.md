# Sistema WNP

Sistema operacional interno da WNP — prospecção, clientes, projetos, tráfego pago e IA num só
lugar, organizado pelos 3 pilares do negócio (Tráfego / Comercial / Operacional). Uso próprio,
não é entrega de cliente.

Contexto completo do projeto (prompt original, decisões de arquitetura, estado das fases):
ver [`MASTER_CONTEXT.md`](./MASTER_CONTEXT.md).

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · mock data (Supabase entra numa fase futura)

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em [http://localhost:3000](http://localhost:3000) e já redireciona para `/visao-geral`.

## Status

**Fase A + B entregues:** shell de navegação completo (3 pilares + transversais), design
tokens da marca WNP, mock data relacionado, dashboard de Visão Geral funcional. Os demais
módulos (Prospecção, Dossiê, Propostas, Clientes, Projetos, Tarefas, Campanhas, Central de IA)
têm rota criada mas ainda são placeholders — roadmap completo em `MASTER_CONTEXT.md`.
