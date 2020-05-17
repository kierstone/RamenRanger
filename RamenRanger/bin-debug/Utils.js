var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Utils = (function () {
    function Utils() {
    }
    Utils.GetEuiScreenPos = function (item) {
        var res = { x: item.x, y: item.y };
        var p = item.parent;
        while (p && p != Utils.UIRoot) {
            res["x"] += p.x - (p.anchorOffsetX ? p.anchorOffsetX : 0);
            res["y"] += p.y - (p.anchorOffsetY ? p.anchorOffsetY : 0);
            p = p.parent;
        }
        return res;
    };
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
//# sourceMappingURL=Utils.js.map