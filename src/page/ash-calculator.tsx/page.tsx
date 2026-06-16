import React, { useState } from 'react';
import type { CalculatorState } from '../../utils/types';
// import Header from '../../../components/ash-calculator/Header';
import FleetSection from '../../components/ash-calculator/FleetSection';
import CycleVariables from '../../components/ash-calculator/CycleVariables';
import ManualInputs from '../../components/ash-calculator/ManualInputs';
import ResultsChain from '../../components/ash-calculator/ResultsChain';
import TripTable from '../../components/ash-calculator/TripTable';
import Header from '../../components/ash-calculator/Header';

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
    <div className="w-full min-h-screen px-4 pt-2 font-sans antialiased bg-slate-50 text-slate-800">
      <Header inputs={inputs} onChange={handleInputChange} capacityUtilization={capacityUtilization} />

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-2 items-start">
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-2">
          <FleetSection inputs={inputs} onChange={handleInputChange} />
          <CycleVariables inputs={inputs} onChange={handleInputChange} />
          <ManualInputs inputs={inputs} onChange={handleInputChange} />
        </div>

        <aside className="lg:col-span-4 space-y-3 h-full flex flex-col">
          <ResultsChain
            totalFleetCapacity={totalFleetCapacity}
            duration={duration}
            totalCycleTime={totalCycleTime}
            noOfTripsPerDayPerDumper={noOfTripsPerDayPerDumper}
            ashLiftingCapacity={ashLiftingCapacity}
          />

          <TripTable
            inputs={inputs}
            type1TotalDumpers={type1TotalDumpers}
            type2TotalDumpers={type2TotalDumpers}
            type3TotalDumpers={type3TotalDumpers}
            type1Qty={type1Qty}
            type2Qty={type2Qty}
            type3Qty={type3Qty}
            totalQtyLifted={totalQtyLifted}
            totalDumpersDeployed={totalDumpersDeployed}
          />
        </aside>
      </div>
    </div>
  );
}