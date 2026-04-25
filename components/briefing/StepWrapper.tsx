import { ReactNode } from "react";

type StepWrapperProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function StepWrapper({ title, description, children }: StepWrapperProps) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl px-4 pb-32 pt-8">
      <header className="mb-8 space-y-3">
        <h1 className="text-3xl font-semibold text-[#F5F4F0]">{title}</h1>
        <p className="text-sm leading-relaxed text-[#F5F4F0]/75">{description}</p>
      </header>
      <section className="space-y-6">{children}</section>
    </main>
  );
}
