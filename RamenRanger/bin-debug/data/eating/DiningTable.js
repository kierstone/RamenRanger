var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DiningTableModel = (function () {
    function DiningTableModel(tableSource, seats, tableWidth, tableScale9) {
        this.tableSource = tableSource;
        this.useScale9 = tableScale9 != null;
        this.tableScale9 = tableScale9;
        this.seats = seats;
        this.tableWidth = tableWidth;
    }
    return DiningTableModel;
}());
__reflect(DiningTableModel.prototype, "DiningTableModel");
var DiningTableObj = (function () {
    function DiningTableObj(model) {
        this.x = 0;
        this.y = 0;
        this.model = model;
    }
    return DiningTableObj;
}());
__reflect(DiningTableObj.prototype, "DiningTableObj");
var DiningSeatInfo = (function () {
    function DiningSeatInfo(source, x, y, ramenX, ramenY) {
        this.source = source;
        this.x = x;
        this.y = y;
        this.ramenX = ramenX;
        this.ramenY = ramenY;
    }
    return DiningSeatInfo;
}());
__reflect(DiningSeatInfo.prototype, "DiningSeatInfo");
//# sourceMappingURL=DiningTable.js.map