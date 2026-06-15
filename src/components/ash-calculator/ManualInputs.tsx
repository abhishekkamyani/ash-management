import React from 'react';
import type { CalculatorState } from '../../utils/types';

type Props = {
  inputs: CalculatorState;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ManualInputs({ inputs, onChange }: Props) {
  const TRIPS = [
    { label: 'Trips for Type1 Dumper', name: 'tripsType1' },
    { label: 'Trips for Type2 Dumper', name: 'tripsType2' },
    { label: 'Trips for Type3 Dumper', name: 'tripsType3' },
  ];

  return (
    <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
      <div className="mb-4">
        <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wide md:text-lg">3. Manual Inputs Strategy</h2>
        <p className="text-sm text-slate-400 mt-0.5">Input targeted overrides per vehicle asset block grouping.</p>
      </div>
      <div className="space-y-4 text-base">
        {TRIPS.map((t) => (
          <div key={t.name} className="flex justify-between items-center gap-4">
            <label className="font-semibold text-slate-700">{t.label}</label>
            <div className="relative flex items-center">
              <input
                type="number"
                name={t.name}
                value={inputs[t.name as keyof CalculatorState]}
                onChange={onChange}
                className="w-32 pr-14 pl-3 py-1.5 bg-white border border-slate-200 rounded-lg text-right font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 text-xs text-slate-400 font-bold select-none">trips</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
