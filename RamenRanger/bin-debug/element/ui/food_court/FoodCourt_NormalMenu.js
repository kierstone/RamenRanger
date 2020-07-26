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
var FoodCourt_NormalMenu = (function (_super) {
    __extends(FoodCourt_NormalMenu, _super);
    function FoodCourt_NormalMenu(caller) {
        var _this = _super.call(this) || this;
        _this.caller = caller;
        return _this;
    }
    FoodCourt_NormalMenu.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    FoodCourt_NormalMenu.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    FoodCourt_NormalMenu.prototype.init = function () {
        var _this = this;
        this.Button_Go.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.caller.ButtonGoEvent();
        }, this);
    };
    FoodCourt_NormalMenu.prototype.ShowIngredientExp = function (ingExp) {
        this.Group_IngExp.removeChildren();
        for (var i = 0; i < ingExp.length; i++) {
            this.Group_IngExp.addChild(ingExp[i]);
        }
    };
    return FoodCourt_NormalMenu;
}(eui.Component));
__reflect(FoodCourt_NormalMenu.prototype, "FoodCourt_NormalMenu", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=FoodCourt_NormalMenu.js.map