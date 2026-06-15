import React, { useState } from 'react';
import type { CalculatorState } from '../../utils/types';

const INITIAL_STATE: CalculatorState = {
  ashDailyProduction: 1400,
  type1Qty: 6,
  type2Qty: 3,
  type3Qty: 3,
  type1Capacity: 40,
  type2Capacity: 50,
  type3Capacity: 55,
  effectiveWorkingHours: 10,
  speed: 11,
  distanceRoundTrip: 11,
  loadingTime: 8,
  timeLag: 15,
  unloadingTime: 3,
  tripsType3: 5,
  tripsType2: 4,
  tripsType1: 0,
};

export default function AshCalculator() {
  const [inputs, setInputs] = useState<CalculatorState>(INITIAL_STATE);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  // --- STRICT FORMULA DERIVATIONS (SHEET 2 LOGIC) ---
  const type1Total = inputs.type1Qty * inputs.type1Capacity;
  const type2Total = inputs.type2Qty * inputs.type2Capacity;
  const type3Total = inputs.type3Qty * inputs.type3Capacity;
  const totalFleetCapacity = type1Total + type2Total + type3Total;

  const duration = inputs.speed > 0 ? inputs.distanceRoundTrip / inputs.speed : 0;
  const totalCycleTime = (duration * 60) + inputs.loadingTime + inputs.timeLag + inputs.unloadingTime;
  const noOfTripsPerDayPerDumper = totalCycleTime > 0 ? (inputs.effectiveWorkingHours * 60) / totalCycleTime : 0;
  const ashLiftingCapacity = noOfTripsPerDayPerDumper * totalFleetCapacity;
  const capacityUtilization = ashLiftingCapacity > 0 ? (inputs.ashDailyProduction / ashLiftingCapacity) * 100 : 0;

  // Trip-based calculations (J & K Columns)
  const type3Qty = inputs.type3Qty * inputs.tripsType3 * inputs.type3Capacity;
  const type3TotalDumpers = inputs.tripsType3 * inputs.type3Qty;
  
  const type2Qty = inputs.type2Qty * inputs.tripsType2 * inputs.type2Capacity;
  const type2TotalDumpers = inputs.tripsType2 * inputs.type2Qty;
  
  const type1Qty = inputs.type1Qty * inputs.tripsType1 * inputs.type1Capacity;
  const type1TotalDumpers = inputs.tripsType1 * inputs.type1Qty;

  const totalQtyLifted = type3Qty + type2Qty + type1Qty;
  const totalDumpersDeployed = type3TotalDumpers + type2TotalDumpers + type1TotalDumpers;

  return (
    <div className="w-full min-h-screen px-4 py-6 font-sans antialiased bg-slate-50 text-slate-800">
      
      {/* HEADER SECTION - EDGE TO EDGE ALIGNMENT */}
      <header className="w-full pb-6 mb-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Ash Study Calculator</h1>
          {/* <p className="text-slate-500 text-base mt-1">Operational simulation configured using structural parameters from Sheet 2.</p> */}
        </div>
        
        {/* TOP LEVEL METRIC OVERLAY */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="bg-white rounded-xl px-5 py-3 border border-slate-200 shadow-xs">
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Ash Daily Production</span>
            <div className="flex items-center gap-1.5 mt-1">
              <input 
                type="number"
                name="ashDailyProduction"
                value={inputs.ashDailyProduction}
                onChange={handleInputChange}
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

      {/* FULL WIDTH MAIN CONTENT GRID */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* DATA ENTRIES & INPUT MATRIX (8/12 PANEL WIDTH) */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* SECTION 1: INVENTORY FLEET STRUCTURE */}
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
                    { label: "Type1 Dumper", qtyKey: "type1Qty", capKey: "type1Capacity" },
                    { label: "Type2 Dumper", qtyKey: "type2Qty", capKey: "type2Capacity" },
                    { label: "Type3 Dumper", qtyKey: "type3Qty", capKey: "type3Capacity" },
                  ].map((row) => (
                    <tr key={row.qtyKey} className="hover:bg-slate-50/50">
                      <td className="p-3.5 font-semibold text-slate-700">{row.label}</td>
                      <td className="p-3.5 text-right">
                        <input 
                          type="number" name={row.qtyKey} value={inputs[row.qtyKey as keyof CalculatorState]} onChange={handleInputChange}
                          className="w-28 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-right font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="p-3.5 text-right">
                        <input 
                          type="number" name={row.capKey} value={inputs[row.capKey as keyof CalculatorState]} onChange={handleInputChange}
                          className="w-28 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-right font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 2: VARIABLE SEGMENT LOGISTICS TIMINGS */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="mb-4">
              <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wide md:text-lg">2. Cycle Variables</h2>
              <p className="text-sm text-slate-400 mt-0.5">Input tracking criteria detailing transportation intervals.</p>
            </div>
            <div className="space-y-4 text-base">
              {[
                { label: "Effective Working Hours", name: "effectiveWorkingHours", unit: "hrs" },
                { label: "Speed", name: "speed", unit: "Km/h" },
                { label: "Distance Round Trip", name: "distanceRoundTrip", unit: "Km" },
                { label: "Loading Time", name: "loadingTime", unit: "min" },
                { label: "Time Lag b/w Dumpers loading", name: "timeLag", unit: "min" },
                { label: "Unloading Time", name: "unloadingTime", unit: "min" },
              ].map((f) => (
                <div key={f.name} className="flex justify-between items-center gap-4">
                  <label className="font-semibold text-slate-700">{f.label}</label>
                  <div className="relative flex items-center">
                    <input
                      type="number" name={f.name} value={inputs[f.name as keyof CalculatorState]} onChange={handleInputChange}
                      className="w-32 pr-12 pl-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="absolute right-3 text-xs text-slate-400 font-bold select-none">{f.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: TRIP ALLOCATION TARGET PARAMETERS */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="mb-4">
              <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wide md:text-lg">3. Manual Inputs Strategy</h2>
              <p className="text-sm text-slate-400 mt-0.5">Input targeted overrides per vehicle asset block grouping.</p>
            </div>
            <div className="space-y-4 text-base">
              {[
                { label: "Trips for Type1 Dumper", name: "tripsType1" },
                { label: "Trips for Type2 Dumper", name: "tripsType2" },
                { label: "Trips for Type3 Dumper", name: "tripsType3" },
              ].map((t) => (
                <div key={t.name} className="flex justify-between items-center gap-4">
                  <label className="font-semibold text-slate-700">{t.label}</label>
                  <div className="relative flex items-center">
                    <input 
                      type="number" name={t.name} value={inputs[t.name as keyof CalculatorState]} onChange={handleInputChange}
                      className="w-32 pr-14 pl-3 py-1.5 bg-white border border-slate-200 rounded-lg text-right font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="absolute right-3 text-xs text-slate-400 font-bold select-none">trips</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* RESULTS WRAPPER DISPLAY MATRICES (4/12 WIDTH CONTAINER) */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* CALCULATED INTERMEDIATE CHAIN METRICS COMPONENT */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-4">Calculated Outputs Chain</h3>
            
            <div className="space-y-4 text-base">
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                <div>
                  <span className="block font-semibold text-slate-700">Total Fleet Capacity</span>
                  <span className="text-xs text-slate-400">Summed dumper performance limit</span>
                </div>
                <span className="text-lg font-bold text-slate-900">{totalFleetCapacity} <span className="text-xs font-normal text-slate-400">tons</span></span>
              </div>

              <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                <div>
                  <span className="block font-semibold text-slate-700">Duration</span>
                  <span className="text-xs text-slate-400">Calculated vehicle run span</span>
                </div>
                <span className="text-lg font-bold text-slate-900">{duration.toFixed(1)} <span className="text-xs font-normal text-slate-400">hr</span></span>
              </div>

              <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                <div>
                  <span className="block font-semibold text-slate-700">Total Cycle Time</span>
                  <span className="text-xs text-slate-400">Turnaround operational limits</span>
                </div>
                <span className="text-lg font-bold text-slate-900">{totalCycleTime.toFixed(0)} <span className="text-xs font-normal text-slate-400">min</span></span>
              </div>

              <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                <div>
                  <span className="block font-semibold text-slate-700">No. of Trips/day/dumper</span>
                  <span className="text-xs text-slate-400">Rotation constraints per vehicle</span>
                </div>
                <span className="text-lg font-bold text-slate-900">{noOfTripsPerDayPerDumper.toFixed(2)} <span className="text-xs font-normal text-slate-400">Trips/d</span></span>
              </div>

              <div className="mt-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                <span className="block text-xs font-extrabold text-blue-500 uppercase tracking-wide">Ash Lifting Capacity</span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-3xl font-black text-blue-600 tracking-tight">{ashLiftingCapacity.toFixed(0)}</span>
                  <span className="text-xs font-bold text-blue-400">tons / day</span>
                </div>
              </div>
            </div>
          </div>

          {/* TRIP BASED STEP ASSIGNMENT FORECAST OUTPUT TABLE */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Trip-based Production</h3>
            
            <div className="overflow-x-auto border border-slate-100 rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="p-2.5">Dump. Type</th>
                    <th className="p-2.5 text-right">Trips</th>
                    <th className="p-2.5 text-right">Qty</th>
                    <th className="p-2.5 text-right">Total Dumpers</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium text-slate-700 divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/30">
                    <td className="p-2.5 font-semibold">3</td>
                    <td className="p-2.5 text-right text-slate-500">{inputs.tripsType3}</td>
                    <td className="p-2.5 text-right font-bold text-slate-900">{type3Qty}</td>
                    <td className="p-2.5 text-right text-slate-500">{type3TotalDumpers}</td>
                  </tr>
                  <tr className="hover:bg-slate-50/30">
                    <td className="p-2.5 font-semibold">2</td>
                    <td className="p-2.5 text-right text-slate-500">{inputs.tripsType2}</td>
                    <td className="p-2.5 text-right font-bold text-slate-900">{type2Qty}</td>
                    <td className="p-2.5 text-right text-slate-500">{type2TotalDumpers}</td>
                  </tr>
                  <tr className="hover:bg-slate-50/30">
                    <td className="p-2.5 font-semibold">1</td>
                    <td className="p-2.5 text-right text-slate-500">{inputs.tripsType1}</td>
                    <td className="p-2.5 text-right font-bold text-slate-900">{type1Qty}</td>
                    <td className="p-2.5 text-right text-slate-500">{type1TotalDumpers}</td>
                  </tr>
                  <tr className="bg-blue-50/40 border-t border-blue-150 font-bold text-slate-900 text-base">
                    <td className="p-3">Total</td>
                    <td className="p-3 text-right text-slate-400">-</td>
                    <td className="p-3 text-right text-blue-600 font-extrabold">{totalQtyLifted}</td>
                    <td className="p-3 text-right text-slate-900">{totalDumpersDeployed}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
}