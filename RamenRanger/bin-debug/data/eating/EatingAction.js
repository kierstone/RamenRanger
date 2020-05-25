var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 吃东西的FixedUpdate的数据
 */
var EatingAction = (function () {
    //其他的比如喷出爱心等需要了再加
    function EatingAction(tick, toAction) {
        this.tick = tick;
        this.changeToAction = toAction;
    }
    return EatingAction;
}());
__reflect(EatingAction.prototype, "EatingAction");
//# sourceMappingURL=EatingAction.js.map