import { ReactNode } from "react";

interface FormAuthTitleProps {
  title: string;
  children?: ReactNode;
}

export function FormAuthTitle({ title, children }: FormAuthTitleProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <h1 className="text-center text-3xl font-bold text-white">{title}</h1>

      {children}
    </div>
  );
}
