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
var IngredientIconInBox = (function (_super) {
    __extends(IngredientIconInBox, _super);
    function IngredientIconInBox(id, ingredient, icon, caller, func) {
        var _this = _super.call(this) || this;
        _this.selected = false;
        _this.ingredient = ingredient;
        _this.eveCaller = caller;
        _this.eveFunc = func;
        _this.icon = icon;
        return _this;
    }
    IngredientIconInBox.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    IngredientIconInBox.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    IngredientIconInBox.prototype.init = function () {
        var _this = this;
        this.Img_Icon.source = this.icon;
        this.Label_Name.text = this.ingredient.name;
        this.SetSelected(false);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.eveCaller && _this.eveFunc) {
                _this.eveFunc(_this.eveCaller, _this.ingredient);
            }
        }, this);
    };
    IngredientIconInBox.prototype.SetSelected = function (s) {
        this.selected = s;
        this.Img_Select.visible = s;
    };
    return IngredientIconInBox;
}(eui.Component));
__reflect(IngredientIconInBox.prototype, "IngredientIconInBox", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=IngredientIconInBox.js.map