import boolean from "src/resources/lin-ui/common/async-validator/validator/boolean";

export interface ICardDailyInfo {
  cardname?: string;
  cardnum?: string;
  card_count?: number;
  count?: number;
  logdt?: string;
}

export interface ICardLogStatistics {
  [propName: number]: Array<ICardDailyInfo>;
}

export interface ICardLogStatisticsOption {
  comp_id: number;
  dev_id: string;
  dept_id: string;
  year: number;
  month?: number;
}

export interface ICardLogStatisticsByDurationOption {
  comp_id: number;
  dept_id?: string;
  dev_id?: string;
  cardname?: string;
  stime: string;
  etime: string;
  isComputedForCard: boolean;
}
