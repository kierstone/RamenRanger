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
var FoodCourt_EatingState = (function (_super) {
    __extends(FoodCourt_EatingState, _super);
    function FoodCourt_EatingState(caller) {
        var _this = _super.call(this) || this;
        _this.caller = caller;
        return _this;
    }
    FoodCourt_EatingState.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    FoodCourt_EatingState.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    FoodCourt_EatingState.prototype.init = function () {
    };
    FoodCourt_EatingState.prototype.ShowIngredientExp = function (ingExp) {
        this.Group_IngExp.removeChildren();
        for (var i = 0; i < ingExp.length; i++) {
            this.Group_IngExp.addChild(ingExp[i]);
        }
    };
    FoodCourt_EatingState.prototype.AddIngredientExp = function (ingExp) {
        this.Group_IngExp.addChild(ingExp);
    };
    return FoodCourt_EatingState;
}(eui.Component));
__reflect(FoodCourt_EatingState.prototype, "FoodCourt_EatingState", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=FoodCourt_EatingState.js.map