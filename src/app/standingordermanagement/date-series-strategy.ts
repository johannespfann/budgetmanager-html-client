
export interface DateSeriesStrategy {

    isValidStrategyPattern(standingOrderStragegy: string): boolean;

    produceDateSeries(from: Date, to: Date): Date[];

}
