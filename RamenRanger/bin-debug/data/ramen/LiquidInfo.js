var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//如果是汤汁类的，它应该是液体，如果是液体，就应该有液体信息
var LiquidInfo = (function () {
    function LiquidInfo(a, r, g, b) {
        this.alpha = a;
        this.r = r;
        this.g = g;
        this.b = b;
    }
    /**
     * 获得颜色的数值
     * @returns {number} 返回RGB值
     */
    LiquidInfo.prototype.Color = function () {
        return this.r * 65536 + this.g * 256 + this.b;
    };
    return LiquidInfo;
}());
__reflect(LiquidInfo.prototype, "LiquidInfo");
//# sourceMappingURL=LiquidInfo.js.map