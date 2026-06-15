import React from 'react';
import type { CalculatorState } from '../../utils/types';

type Field = { label: string; name: keyof CalculatorState; unit: string };

type Props = {
  inputs: CalculatorState;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FIELDS: Field[] = [
  { label: 'Effective Working Hours', name: 'effectiveWorkingHours', unit: 'hrs' },
  { label: 'Speed', name: 'speed', unit: 'Km/h' },
  { label: 'Distance Round Trip', name: 'distanceRoundTrip', unit: 'Km' },
  { label: 'Loading Time', name: 'loadingTime', unit: 'min' },
  { label: 'Time Lag b/w Dumpers loading', name: 'timeLag', unit: 'min' },
  { label: 'Unloading Time', name: 'unloadingTime', unit: 'min' },
];

export default function CycleVariables({ inputs, onChange }: Props) {
  return (
    <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
      <div className="mb-4">
        <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wide md:text-lg">2. Cycle Variables</h2>
        <p className="text-sm text-slate-400 mt-0.5">Input tracking criteria detailing transportation intervals.</p>
      </div>
      <div className="space-y-4 text-base">
        {FIELDS.map((f) => (
          <div key={f.name} className="flex justify-between items-center gap-4">
            <label className="font-semibold text-slate-700">{f.label}</label>
            <div className="relative flex items-center">
              <input
                type="number"
                name={f.name}
                value={inputs[f.name]}
                onChange={onChange}
                className="w-32 pr-12 pl-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 text-xs text-slate-400 font-bold select-none">{f.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
