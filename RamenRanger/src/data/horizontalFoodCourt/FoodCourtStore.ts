class FoodCourtStoreObj{
    public source:string;
    public onSale:Array<FoodCourtDishObj>;
    
    constructor(sale:Array<FoodCourtDishObj>){
        this.onSale = sale;
        this.source = "stall_" + Utils.RandomInt(0, 3) + "_d";
    }
}