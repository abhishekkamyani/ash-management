import { useCallback } from 'react';

export interface FleetRow {
  id: string;
  dumperType: string;
  count: number;
  unitCapacity: number;
}

interface FleetTableProps {
  rows: FleetRow[];
  onChange: (rows: FleetRow[]) => void;
}

export default function FleetTable({ rows, onChange }: FleetTableProps) {
  // Generates a unique ID for new entries
  const generateId = () => `row-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  // Logic to append a new row to the state
  const addRow = useCallback(() => {
    const newRow: FleetRow = {
      id: generateId(),
      dumperType: '',
      count: 1,
      unitCapacity: 10,
    };
    onChange([...rows, newRow]);
  }, [rows, onChange]);

  // Logic to remove a row by ID
  const deleteRow = useCallback((id: string) => {
    onChange(rows.filter((r) => r.id !== id));
  }, [rows, onChange]);

  // Logic to update specific fields with numeric validation
  const updateRow = useCallback(
    (id: string, field: keyof FleetRow, value: string | number) => {
      onChange(
        rows.map((r) => {
          if (r.id !== id) return r;
          if (field === 'count' || field === 'unitCapacity') {
            const num = Number(value);
            return { ...r, [field]: Number.isNaN(num) || num < 0 ? 0 : num };
          }
          return { ...r, [field]: value };
        })
      );
    },
    [rows, onChange]
  );

  // Calculates the sum of (count * capacity) for all rows
  const grandTotal = rows.reduce((sum, r) => sum + r.count * r.unitCapacity, 0);

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Table Header Section: Fixed at the top */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 flex-shrink-0">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
            Dumper Fleet Setup
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Define dumper types, quantities, and per-unit capacity to compute total tons per rotation
          </p>
        </div>
        <button
          onClick={addRow}
          className="whitespace-nowrap px-4 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 cursor-pointer text-sm font-medium shadow-sm"
        >
          <i className="ri-add-line text-lg"></i>
          <span>Add Dumper</span>
        </button>
      </div>

      {/* Main Table Area: Flex-1 and overflow-auto allows this section to grow and scroll */}
      <div className="flex-1 min-h-0 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="h-full overflow-auto">
          <table className="w-full border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-900/50 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Dumper Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Count
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Unit Capacity (Tons)
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Total Tons
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider w-16">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-20 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                        <i className="ri-truck-line text-2xl text-slate-400 dark:text-slate-500"></i>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        No dumpers configured yet. Click "Add Dumper" to begin.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                rows.map((row) => {
                  const totalTons = row.count * row.unitCapacity;
                  return (
                    <tr
                      key={row.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={row.dumperType}
                          onChange={(e) => updateRow(row.id, 'dumperType', e.target.value)}
                          placeholder="e.g. CAT 777E"
                          className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min={0}
                          value={row.count}
                          onChange={(e) => updateRow(row.id, 'count', e.target.value)}
                          className="w-24 px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min={0}
                            step="0.1"
                            value={row.unitCapacity}
                            onChange={(e) => updateRow(row.id, 'unitCapacity', e.target.value)}
                            className="w-28 px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                          <span className="text-sm text-slate-500 dark:text-slate-400">tons</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-bold bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 border border-teal-100 dark:border-teal-900/40">
                          {totalTons.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => deleteRow(row.id)}
                          className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors cursor-pointer"
                          title="Remove dumper"
                        >
                          <i className="ri-delete-bin-line text-base"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Footer: Fixed at the bottom */}
      <div className="flex justify-end flex-shrink-0">
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl px-5 py-3 flex items-center gap-8 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <i className="ri-truck-line text-xl"></i>
            </div>
            <div>
              <p className="text-[10px] text-teal-100 font-bold uppercase tracking-widest">Grand Total Capacity</p>
              <p className="text-2xl font-bold leading-tight">
                {grandTotal.toLocaleString(undefined, { maximumFractionDigits: 1 })} <span className="text-sm font-normal text-teal-100">tons</span>
              </p>
            </div>
          </div>
          <div className="h-10 w-px bg-white/20"></div>
          <div className="text-right">
            <p className="text-[10px] text-teal-100 font-bold uppercase tracking-widest">Fleet Size</p>
            <p className="text-lg font-semibold leading-tight">{rows.length} type{rows.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>
    </div>
  );
}