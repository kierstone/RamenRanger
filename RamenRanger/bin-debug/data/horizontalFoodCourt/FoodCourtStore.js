var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FoodCourtStoreObj = (function () {
    function FoodCourtStoreObj(sale) {
        this.onSale = sale;
        this.source = "stall_" + Utils.RandomInt(0, 3) + "_d";
    }
    return FoodCourtStoreObj;
}());
__reflect(FoodCourtStoreObj.prototype, "FoodCourtStoreObj");
//# sourceMappingURL=FoodCourtStore.js.map