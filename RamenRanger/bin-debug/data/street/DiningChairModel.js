var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DiningChairModel = (function () {
    function DiningChairModel(downInfo, upInfo, leftInfo, rightInfo) {
        if (upInfo === void 0) { upInfo = null; }
        if (leftInfo === void 0) { leftInfo = null; }
        if (rightInfo === void 0) { rightInfo = null; }
        this.direction = [
            null,
            null,
            null,
            null
        ];
        if (downInfo)
            this.direction[Direction.Down] = downInfo;
        if (upInfo)
            this.direction[Direction.Up] = upInfo;
        if (leftInfo)
            this.direction[Direction.Left] = leftInfo;
        if (leftInfo)
            this.direction[Direction.Right] = leftInfo;
    }
    DiningChairModel.prototype.SetChairDirectionInfo = function (dir, info) {
        this.direction[dir] = info;
    };
    return DiningChairModel;
}());
__reflect(DiningChairModel.prototype, "DiningChairModel");
var DiningChairDirectionInfo = (function () {
    function DiningChairDirectionInfo(source, gridWidth, gridHeight) {
        this.source = source;
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
    }
    return DiningChairDirectionInfo;
}());
__reflect(DiningChairDirectionInfo.prototype, "DiningChairDirectionInfo");
//# sourceMappingURL=DiningChairModel.js.map