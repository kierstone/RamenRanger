var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//当前的某个桌子栏位的状态
var DiningTableSeatInfo = (function () {
    function DiningTableSeatInfo(seatSlot) {
        this.seatSlot = seatSlot;
    }
    return DiningTableSeatInfo;
}());
__reflect(DiningTableSeatInfo.prototype, "DiningTableSeatInfo");
//# sourceMappingURL=DiningTableSeatInfo.js.map