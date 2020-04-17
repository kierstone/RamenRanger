var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GridPosition = (function () {
    function GridPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    return GridPosition;
}());
__reflect(GridPosition.prototype, "GridPosition");
//# sourceMappingURL=GridPosition.js.map