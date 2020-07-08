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
    Utils.GetRandomIndexFromArray = function (arrLen, count) {
        var res = new Array();
        for (var i = 0; i < arrLen; i++) {
            res.push(i);
        }
        while (res.length > count) {
            var tIndex = Math.min(Math.floor(Math.random() * res.length), res.length - 1);
            res.splice(tIndex, 1);
        }
        return res;
    };
    Utils.RandomInt = function (minValue, maxValue) {
        if (minValue === void 0) { minValue = 0; }
        var ranRange = maxValue - minValue + 1;
        return Math.min(Math.floor(Math.random() * ranRange) + minValue, maxValue);
    };
    Utils.GetUniqueId = function (key) {
        var res = key;
        var rl = Utils.RandomInt(5, 10);
        for (var i = 0; i < rl; i++) {
            res += "_" + Utils.RandomInt(Number.MIN_VALUE, Number.MAX_VALUE);
        }
        return res;
    };
    Utils.TickTime = 100; //每个tick 100毫秒
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
//# sourceMappingURL=Utils.js.map