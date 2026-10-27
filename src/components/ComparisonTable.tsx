import React from 'react';
import { Check, X } from 'lucide-react';
import Reveal from './Reveal';

const rows = [
  { topic: 'Abertura de empresa', conte: 'Grátis, sempre', others: 'Às vezes grátis' },
  { topic: 'Nota fiscal', conte: 'Você pede no WhatsApp, a gente emite', others: 'Você emite sozinho na plataforma' },
  { topic: 'Guia de imposto', conte: 'Chega pronta no seu WhatsApp', others: 'Você busca no sistema' },
  { topic: 'Dúvidas', conte: 'Contadora dedicada que conhece sua PJ', others: 'Chat e fila, cada vez com alguém diferente' },
  { topic: 'Tempo de resposta', conte: 'Rápido, na mesma conversa', others: 'Pode levar dias' },
];

const ComparisonTable: React.FC = () => (
  <Reveal className="mx-auto mt-24 max-w-4xl md:mt-32">
    <h3 className="text-center font-display text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-ink text-balance">
      Conte vs contabilidade online de plataforma
    </h3>
    <div className="mt-8 overflow-hidden rounded-[24px] border border-paper-line bg-white">
      <table className="w-full border-collapse text-left text-[15px]">
        <thead>
          <tr className="border-b border-paper-line">
            <th scope="col" className="hidden p-4 md:table-cell md:w-[30%]">
              <span className="sr-only">Item</span>
            </th>
            <th scope="col" className="bg-brand/10 p-4 font-display text-base font-semibold text-ink">Conte</th>
            <th scope="col" className="p-4 font-display text-base font-semibold text-ink-faint">Plataforma</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <React.Fragment key={row.topic}>
              <tr className="md:hidden">
                <th scope="colgroup" colSpan={2} className="px-4 pt-4 text-xs font-semibold uppercase tracking-wider text-ink-faint">
                  {row.topic}
                </th>
              </tr>
              <tr className={i < rows.length - 1 ? 'border-b border-paper-line' : ''}>
                <th scope="row" className="hidden p-4 font-semibold text-ink md:table-cell">
                  {row.topic}
                </th>
                <td className="bg-brand/10 p-4 align-top text-ink">
                  <span className="flex items-start gap-2">
                    <Check size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-brand-dark" />
                    {row.conte}
                  </span>
                </td>
                <td className="p-4 align-top text-ink-muted">
                  <span className="flex items-start gap-2">
                    <X size={16} strokeWidth={2.5} className="mt-0.5 shrink-0 text-ink-faint" />
                    {row.others}
                  </span>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  </Reveal>
);

export default ComparisonTable;
