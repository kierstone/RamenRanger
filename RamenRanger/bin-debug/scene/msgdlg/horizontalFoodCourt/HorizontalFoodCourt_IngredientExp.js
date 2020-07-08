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
var HorizontalFoodCourt_IngredientExp = (function (_super) {
    __extends(HorizontalFoodCourt_IngredientExp, _super);
    function HorizontalFoodCourt_IngredientExp(ing) {
        var _this = _super.call(this) || this;
        _this.ing = ing;
        return _this;
    }
    HorizontalFoodCourt_IngredientExp.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    HorizontalFoodCourt_IngredientExp.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    HorizontalFoodCourt_IngredientExp.prototype.init = function () {
        this.Label_Exp.text = this.ing.exp.toString();
        if (this.ing.broth == true) {
            var bm = GetBrothModelById(this.ing.ingredientId);
            this.Img_Icon.visible = false;
            var ic = bm.IconShape(0, 0, 30);
            this.addChild(ic);
            ic.x = this.Img_Icon.x + 30;
            ic.y = this.Img_Icon.y + 30;
        }
        else {
            var im = GetIngredientModelById(this.ing.ingredientId);
            this.Img_Icon.visible = true;
            this.Img_Icon.source = im.icon;
        }
    };
    HorizontalFoodCourt_IngredientExp.prototype.Update = function () {
        if (this.Label_Exp)
            this.Label_Exp.text = this.ing.exp.toString();
    };
    return HorizontalFoodCourt_IngredientExp;
}(eui.Component));
__reflect(HorizontalFoodCourt_IngredientExp.prototype, "HorizontalFoodCourt_IngredientExp", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=HorizontalFoodCourt_IngredientExp.js.map