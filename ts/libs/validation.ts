export class Validation{

    public static isNumber(value : any) : boolean {
        if(isNaN(value)) return false
        return true;
    }
}