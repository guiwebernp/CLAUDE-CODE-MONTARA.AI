import type { ReactNode } from "react";

interface PageContainerProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}

export function PageContainer({ title, subtitle, action, children }: PageContainerProps) {
  return (
    <div className="flex flex-col gap-6 px-8 py-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-paper-0">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-paper-500">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
