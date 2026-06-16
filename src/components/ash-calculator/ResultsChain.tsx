type Props = {
  totalFleetCapacity: number;
  duration: number;
  totalCycleTime: number;
  noOfTripsPerDayPerDumper: number;
  ashLiftingCapacity: number;
};

export default function ResultsChain({ totalFleetCapacity, duration, totalCycleTime, noOfTripsPerDayPerDumper, ashLiftingCapacity }: Props) {
  return (
    <div className="bg-white rounded-xl p-3 pt-1 border border-slate-200 shadow-sm">
      <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wide md:text-lg mb-4">Calculated Outputs Chain</h2>

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
          <span className="text-lg font-bold text-slate-900">{noOfTripsPerDayPerDumper.toFixed(0)} <span className="text-xs font-normal text-slate-400">Trips/d</span></span>
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
  );
}
