
export interface DateSeriesStrategy {

    getStrategyName(): string;

    isValidStrategyPattern(standingOrderStragegy: string): boolean;

    produceDateSeries(from: Date, to: Date): Date[];

}
