import React from 'react';
import type { CalculatorState } from '../../utils/types';

type Props = {
  inputs: CalculatorState;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  capacityUtilization: number;
};

export default function Header({ inputs, onChange, capacityUtilization }: Props) {
  return (
    <header className="w-full pb-6 mb-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Ash Study Calculator</h1>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <div className="bg-white rounded-xl px-5 py-3 border border-slate-200 shadow-xs">
          <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Ash Daily Production</span>
          <div className="flex items-center gap-1.5 mt-1">
            <input
              type="number"
              name="ashDailyProduction"
              value={inputs.ashDailyProduction}
              onChange={onChange}
              className="w-24 bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-slate-900 font-extrabold text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-slate-500 font-semibold">tons</span>
          </div>
        </div>
        <div className="bg-white rounded-xl px-5 py-3 border border-slate-200 shadow-xs">
          <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Capacity Utilization</span>
          <span className={`text-2xl font-black block mt-1 ${capacityUtilization > 100 ? 'text-amber-600' : 'text-emerald-600'}`}>
            {capacityUtilization.toFixed(1)}%
          </span>
        </div>
      </div>
    </header>
  );
}
