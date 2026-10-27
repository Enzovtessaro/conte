import React from 'react';

interface ToolPanelProps {
  inputs: React.ReactNode;
  highlight: React.ReactNode;
  comparison: React.ReactNode;
  details?: React.ReactNode;
  cta: React.ReactNode;
}

// One continuous card that reads top to bottom: fill in, see the answer, dig in if you want, act.
const ToolPanel: React.FC<ToolPanelProps> = ({ inputs, highlight, comparison, details, cta }) => (
  <div className="overflow-hidden rounded-[32px] border border-paper-line bg-white shadow-float">
    <div className="p-6 md:p-8">{inputs}</div>
    <div aria-live="polite" className="border-t border-paper-line bg-brand/[0.06] p-6 md:p-8">
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
        <div>{highlight}</div>
        <div>{comparison}</div>
      </div>
      {details && <div className="mt-6">{details}</div>}
    </div>
    <div className="flex flex-col items-start gap-4 border-t border-paper-line p-6 sm:flex-row sm:items-center sm:justify-between md:px-8">
      {cta}
    </div>
  </div>
);

export const Details: React.FC<{ summary: string; children: React.ReactNode }> = ({ summary, children }) => (
  <details className="group rounded-2xl border border-paper-line bg-white">
    <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-[15px] font-medium text-ink [&::-webkit-details-marker]:hidden">
      {summary}
      <span aria-hidden className="text-lg leading-none text-ink-muted transition-transform group-open:rotate-45">+</span>
    </summary>
    <div className="border-t border-paper-line px-5 py-4">{children}</div>
  </details>
);

export default ToolPanel;
