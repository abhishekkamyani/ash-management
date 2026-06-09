import { useState } from "react";
import FleetTable from "./components/FleetTable";
import type { FleetRow } from "./components/FleetTable";
import { KPICard } from "../../components/common/KPICard";

export default function FleetConfigPage() {
  const [fleetRows, setFleetRows] = useState<FleetRow[]>([
    { id: "init-1", dumperType: "CAT 777E", count: 3, unitCapacity: 90 },
    { id: "init-2", dumperType: "Komatsu HD785", count: 2, unitCapacity: 85 },
    { id: "init-3", dumperType: "BelAZ 7555", count: 1, unitCapacity: 55 },
  ]);

  const kpis: any[] = [
    {
      title: "Effective Working Hrs",
      value: <>10.0 <span className="text-gray-400 dark:text-gray-500 text-sm font-normal">hrs</span></>,
      icon: "ri-time-line",
      iconColor: "text-primary",
      clickable: false,
    },
    {
      title: "Speed",
      value: <>11.0 <span className="text-gray-400 dark:text-gray-500 text-sm font-normal">km/h</span></>,
      icon: "ri-speed-line",
      iconColor: "text-success",
      clickable: false,
    },
    {
      title: "Distance",
      value: <>11.0 <span className="text-gray-400 dark:text-gray-500 text-sm font-normal">km</span></>,
      icon: "ri-map-pin-line",
      iconColor: "text-primary",
      clickable: false,
    },
    {
      title: "Duration",
      value: <>1.0 <span className="text-gray-400 dark:text-gray-500 text-sm font-normal">hr</span></>,
      icon: "ri-hourglass-line",
      iconColor: "text-warning",
      clickable: false,
    },
    {
      title: "Loading Time",
      value: <>8.0 <span className="text-gray-400 dark:text-gray-500 text-sm font-normal">min</span></>,
      icon: "ri-loader-2-line",
      iconColor: "text-warning",
      clickable: false,
    },
    {
      title: "Time Lag",
      value: <>15.0 <span className="text-gray-400 dark:text-gray-500 text-sm font-normal">min</span></>,
      icon: "ri-time-zone-line",
      iconColor: "text-primary",
      clickable: false,
    },
    {
      title: "Unloading Time",
      value: <>3.0 <span className="text-gray-400 dark:text-gray-500 text-sm font-normal">min</span></>,
      icon: "ri-download-cloud-line",
      iconColor: "text-success",
      clickable: false,
    },
    {
      title: "Daily Target",
      value: <>1400 <span className="text-gray-400 dark:text-gray-500 text-sm font-normal">tpd</span></>,
      icon: "ri-flag-line",
      iconColor: "text-success",
      clickable: false,
    },
  ];

  return (
    // Changed: Added w-full and removed pb-6 to handle spacing internally
    <div className="flex h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 overflow-hidden">
      <div className="flex-1 flex flex-col p-4 lg:p-6 overflow-hidden">
        
        {/* KPIs Grid - Stays at top */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-4">
          {kpis.map((kpi, i) => (
            <div key={i} className="rounded-lg">
              <KPICard kpi={kpi} loading={false} />
            </div>
          ))}
        </div>

        {/* Dumper Fleet Setup Card Container */}
        {/* Changed: added flex-1 and flex flex-col to fill remaining height */}
        <div className="flex-1 flex flex-col bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="flex-1 overflow-hidden p-4">
            <FleetTable rows={fleetRows} onChange={setFleetRows} />
          </div>
        </div>
        
      </div>
    </div>
  );
}