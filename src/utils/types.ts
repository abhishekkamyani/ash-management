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