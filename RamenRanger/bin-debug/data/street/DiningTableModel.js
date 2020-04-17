var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DiningTableModel = (function () {
    function DiningTableModel(widthInGrid, heightInGrid, source, seats) {
        this.widthInGrid = widthInGrid;
        this.heightInGrid = heightInGrid;
        this.source = source;
        this.seats = seats;
    }
    DiningTableModel.prototype.Clone = function () {
        return new DiningTableModel(this.widthInGrid, this.heightInGrid, this.source, this.seats);
    };
    return DiningTableModel;
}());
__reflect(DiningTableModel.prototype, "DiningTableModel");
//# sourceMappingURL=DiningTableModel.js.map