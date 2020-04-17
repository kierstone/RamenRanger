var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var DiningTable = (function (_super) {
    __extends(DiningTable, _super);
    function DiningTable(tableModel, gridX, gridY, gridWidth, gridHeight) {
        if (gridWidth === void 0) { gridWidth = 1; }
        if (gridHeight === void 0) { gridHeight = 1; }
        var _this = _super.call(this) || this;
        _this.model = tableModel.Clone();
        _this.seat = new Array();
        _this.gridX = gridX;
        _this.gridY = gridY;
        _this.gridWidth = gridWidth;
        _this.gridHeight = gridHeight;
        return _this;
    }
    DiningTable.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    DiningTable.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    DiningTable.prototype.init = function () {
    };
    /**
     * 有些单元格允许有多个slot，比如1x1的桌子，4面都可以放椅子，所以应该对应4个slot
     * 但是最终被用到的只能是1个info，所以可以先通过这个函数看看这个单元格对应的info是否已经存在
     * @param {number} gridX 要查询的单元格x，位于桌上的单元格
     * @param {number} gridY 要查询的单元格y，位于桌上的单元格
     * @returns {DiningTableSeatInfo} 被使用的单元格，如果是null，代表还没椅子对应这个位置
     */
    DiningTable.prototype.GetSeatInfo = function (gridX, gridY) {
        for (var i = 0; i < this.seat.length; i++) {
            if (this.seat[i].seatSlot.tableX == gridX && this.seat[i].seatSlot.tableY == gridY) {
                return this.seat[i];
            }
        }
        return null;
    };
    /**
     * 有些单元格允许有多个slot，比如1x1的桌子，4面都可以放椅子，所以应该对应4个slot
     * 所以这里返回的是一个数组，是对应这个坐标所有的slot的数据，如果长度为0，代表没有slot
     * @param {number} gridX 要查询的单元格x，位于桌上的单元格
     * @param {number} gridY 要查询的单元格y，位于桌上的单元格
     * @returns {Array<DiningTableSeatInfo>} 被使用的单元格，如果是null，代表还没椅子对应这个位置
     */
    DiningTable.prototype.GetSeatSlot = function (gridX, gridY) {
        var res = new Array();
        for (var i = 0; i < this.model.seats.length; i++) {
            var si = this.model.seats[i];
            if (si.tableX == gridX && si.tableY == gridY) {
                res.push(this.model.seats[i]);
            }
        }
        return res;
    };
    /**
     * 尝试把一个椅子加入到自己的关联(seat)中去，当然要判断椅子能否被加入了
     * @param {DiningChair} chair 椅子对象
     * @param {boolean} autoChangeDir 是否要自动变化椅子的朝向
     * @returns {boolean} 最后有没有被加入关联
     */
    DiningTable.prototype.TryConnectChair = function (chair, autoChangeDir) {
        if (autoChangeDir === void 0) { autoChangeDir = true; }
        if (!chair)
            return false;
        for (var i = 0; i < this.gridWidth; i++) {
            for (var j = 0; j < this.gridHeight; j++) {
                var sInfo = this.GetSeatInfo(i, j);
                if (sInfo != null && sInfo.chair != null)
                    continue; //这格已经关联别的椅子了
                var sSlot = this.GetSeatSlot(i, j);
                if (sSlot.length <= 0)
                    continue; //这格根本就不能关联椅子
                //从可sSlot里分析出一个可以关联这个椅子的可能性，如果有就关联，没有就继续
                for (var m = 0; m < sSlot.length; m++) {
                    var tInfo = sSlot[m];
                    if (tInfo.seatOffsetX + this.gridX == chair.gridX &&
                        tInfo.seatOffsetY + this.gridY == chair.gridY &&
                        chair.model.direction[tInfo.seatDirection] != null) {
                        if (sInfo != null) {
                            sInfo.chair = chair;
                        }
                        else {
                            var nsInfo = new DiningTableSeatInfo(tInfo);
                            nsInfo.chair = chair;
                            this.seat.push(nsInfo);
                        }
                        if (autoChangeDir == true)
                            chair.ChangeDirection(tInfo.seatDirection);
                        chair.connectTable = this;
                        return true;
                    }
                }
            }
        }
        return false;
    };
    return DiningTable;
}(eui.Component));
__reflect(DiningTable.prototype, "DiningTable", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=DiningTable.js.map