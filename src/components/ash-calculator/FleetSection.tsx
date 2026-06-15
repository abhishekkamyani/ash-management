import React from 'react';
import type { CalculatorState } from '../../utils/types';

type Props = {
  inputs: CalculatorState;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FleetSection({ inputs, onChange }: Props) {
  return (
    <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs md:col-span-2">
      <div className="mb-4">
        <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wide md:text-lg">1. Dumper Fleet Capacities</h2>
        <p className="text-sm text-slate-400 mt-0.5">Define equipment sizing matrix parameters and operational units.</p>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-xl">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-xs uppercase tracking-wider">
              <th className="p-3.5">Dumper Type</th>
              <th className="p-3.5 text-right w-36">Qty (#)</th>
              <th className="p-3.5 text-right w-36">Capacity (Tons)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-base font-medium">
            {[
              { label: 'Type1 Dumper', qtyKey: 'type1Qty', capKey: 'type1Capacity' },
              { label: 'Type2 Dumper', qtyKey: 'type2Qty', capKey: 'type2Capacity' },
              { label: 'Type3 Dumper', qtyKey: 'type3Qty', capKey: 'type3Capacity' },
            ].map((row) => (
              <tr key={row.qtyKey} className="hover:bg-slate-50/50">
                <td className="p-3.5 font-semibold text-slate-700">{row.label}</td>
                <td className="p-3.5 text-right">
                  <input
                    type="number"
                    name={row.qtyKey}
                    value={inputs[row.qtyKey as keyof CalculatorState]}
                    onChange={onChange}
                    className="w-28 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-right font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="p-3.5 text-right">
                  <input
                    type="number"
                    name={row.capKey}
                    value={inputs[row.capKey as keyof CalculatorState]}
                    onChange={onChange}
                    className="w-28 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-right font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
