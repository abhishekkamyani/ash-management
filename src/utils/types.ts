export interface KPI {
  title: string;
  value: string | number;
  subtitle?: string;
  subtitleColor?: string;
  icon: string;
  iconColor?: string;
  clickable?: boolean;
  drillTitle?: string;
  tooltip?: string;
}

export interface CalculatorState {
  ashDailyProduction: number;
  type1Qty: number;
  type2Qty: number;
  type3Qty: number;
  type1Capacity: number;
  type2Capacity: number;
  type3Capacity: number;
  effectiveWorkingHours: number;
  speed: number;
  distanceRoundTrip: number;
  loadingTime: number;
  timeLag: number;
  unloadingTime: number;
  tripsType3: number;
  tripsType2: number;
  tripsType1: number;
}