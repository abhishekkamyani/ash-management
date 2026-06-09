import type { KPI } from "../../utils/types";

export const KPICard = ({
  kpi,
  onKPIClick,
  loading,
}: {
  kpi: KPI;
  onKPIClick?: (title: string) => void;
  loading?: boolean;
}) => {
  // Return shimmer skeleton while data is loading
  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-800 backdrop-blur-sm px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col justify-center min-h-[52px]">
        <div className="flex items-center justify-between mb-1.5">
          <div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-4 w-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>
        <div className="flex items-end justify-between">
          <div className="h-5 w-12 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-2.5 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  // Return the actual KPI Card when data is ready
  return (
    <div
      onClick={() => kpi.clickable && onKPIClick?.(kpi.drillTitle || kpi.title)}
      title={kpi.tooltip}
      className={`bg-white dark:bg-slate-800 backdrop-blur-sm px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col justify-center ${
        kpi.clickable
          ? "cursor-pointer hover:shadow-lg transition-shadow"
          : "cursor-default"
      }`}
    >
      <div>
        <div className="flex items-center justify-between">
          <p className="text-xs lg:text-sm text-slate-600 dark:text-slate-300">
            {kpi.title}
          </p>
          <i
            className={`lg:text-lg md:text-md text-sm text-gray-900 dark:text-gray-300 ${kpi.icon}`}
          />
        </div>
        <div className="flex items-end justify-between">
          <p className="xl:text-xl lg:text-lg md:text-md text-sm font-semibold text-slate-800 dark:text-white leading-none">
            {kpi.value}
          </p>
          {kpi.subtitle && (
            <p
              className={`text-[12px] leading-none ${"text-slate-800 dark:text-slate-300"}`}
            >
              {kpi.subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
