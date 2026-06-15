import type { CalculatorState } from '../../utils/types';

type Props = {
  inputs: CalculatorState;
  type1Qty: number;
  type2Qty: number;
  type3Qty: number;
  type1TotalDumpers: number;
  type2TotalDumpers: number;
  type3TotalDumpers: number;
  totalQtyLifted: number;
  totalDumpersDeployed: number;
};

export default function TripTable({ inputs, type1Qty, type2Qty, type3Qty, type1TotalDumpers, type2TotalDumpers, type3TotalDumpers, totalQtyLifted, totalDumpersDeployed }: Props) {
  return (
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
  );
}
