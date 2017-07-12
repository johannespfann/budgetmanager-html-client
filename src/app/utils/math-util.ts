export class MathUtil{
    
    /**
     * Convert a number to a postitiv one. If the number 
     * is 0 or a positiv number,
     * the number will returned.
     * @param value 
     */
    public static convertToPositiv(value: number): number{
        if(value > 0 || value == 0){
            return value;
        }
        return value * -1;
    }
    
    /**
     * Convert a number to a negativ one. If the number 
     * is 0 or a negativ number,
     * the number will returned.
     * @param value 
     */
    public static convertToNegativ(value: number): number{
        if(value < 0 || value == 0){
            value = value
        }
        return value * -1;
    }

    public static generateRandom(): number {
        return Math.random();
    }

}

