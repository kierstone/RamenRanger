var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ChairModel = (function () {
    function ChairModel(downInfo, upInfo, leftInfo, rightInfo) {
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
    ChairModel.prototype.GetCurrentInfoByDirection = function (dir) {
        return this.direction[dir];
    };
    return ChairModel;
}());
__reflect(ChairModel.prototype, "ChairModel");
var ChairDirImageInfo = (function () {
    function ChairDirImageInfo(source, gridWidth, gridHeight) {
        this.source = source;
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
    }
    return ChairDirImageInfo;
}());
__reflect(ChairDirImageInfo.prototype, "ChairDirImageInfo");
//# sourceMappingURL=ChairModel.js.map