var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//桌子上的位置信息
var DiningTableSeatSlot = (function () {
    function DiningTableSeatSlot(tableX, tableY, ramenX, ramenY, seatOffsetX, seatOffsetY, seatDirection, maidOffsetX, maidOffsetY, maidDirection) {
        this.tableX = tableX;
        this.tableY = tableY;
        this.ramenOffsetX = ramenX;
        this.ramenOffsetY = ramenY;
        this.seatOffsetX = seatOffsetX;
        this.seatOffsetY = seatOffsetY;
        this.seatDirection = seatDirection;
        this.maidOffsetX = maidOffsetX;
        this.maidOffsetY = maidOffsetY;
        this.maidDirection = maidDirection;
    }
    DiningTableSeatSlot.prototype.Clone = function () {
        var res = new DiningTableSeatSlot(this.tableX, this.tableY, this.ramenOffsetX, this.ramenOffsetY, this.seatOffsetX, this.seatOffsetY, this.seatDirection, this.maidOffsetX, this.maidOffsetY, this.maidDirection);
        return res;
    };
    return DiningTableSeatSlot;
}());
__reflect(DiningTableSeatSlot.prototype, "DiningTableSeatSlot");
//# sourceMappingURL=DiningTableSeatSlot.js.map