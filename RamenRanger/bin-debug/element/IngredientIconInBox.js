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
    function IngredientIconInBox(id, ingredient, icon, defaultSelected, caller, func, broth) {
        if (broth === void 0) { broth = null; }
        var _this = _super.call(this) || this;
        _this.selected = false;
        _this.id = id;
        _this.ingredient = ingredient;
        _this.eveCaller = caller;
        _this.eveFunc = func;
        _this.icon = icon;
        _this.bModel = broth;
        _this.selected = defaultSelected;
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
        if (this.bModel) {
            this.FillBroth(this.bModel);
        }
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.eveCaller && _this.eveFunc) {
                _this.eveFunc(_this.eveCaller, _this.ingredient);
            }
        }, this);
    };
    IngredientIconInBox.prototype.SetSelected = function (s) {
        this.selected = s;
        if (this.Img_Select)
            this.Img_Select.visible = s;
    };
    /**
     * 因为汤比较特殊，所以得额外fill进来
     * @param {BrothModel} broth 汤的model
     * @param {number} centerX 要绘制的位置x，为空时为图标中心
     * @param {number} centerY 要绘制的位置y，为空时为图标中心
     * @param {number} radius 要绘制的汤的半径，为空时为图标的40%
     */
    IngredientIconInBox.prototype.FillBroth = function (broth, centerX, centerY, radius) {
        if (centerX === void 0) { centerX = null; }
        if (centerY === void 0) { centerY = null; }
        if (radius === void 0) { radius = null; }
        if (!this.Img_Icon)
            return;
        if (centerX == null)
            centerX = this.width / 2;
        if (centerY == null)
            centerY = this.Img_Icon.height / 2;
        if (radius == null)
            radius = this.Img_Icon.width * 0.4;
        var shp = broth.ImageShape(centerX, // + this.Img_Icon.x,
        centerY + this.Img_Icon.y, radius);
        this.addChild(shp);
        var brothHL = new eui.Image(RES.getRes(ResName_Broth_Highlight));
        this.addChild(brothHL);
        brothHL.width = brothHL.height = radius * 2;
        brothHL.anchorOffsetX = brothHL.width / 2;
        brothHL.anchorOffsetY = brothHL.height / 2;
        brothHL.x = shp.x;
        brothHL.y = shp.y;
        if (this.Img_Select) {
            this.Img_Select.zIndex = Number.MAX_VALUE;
            this.sortChildren();
        }
    };
    return IngredientIconInBox;
}(eui.Component));
__reflect(IngredientIconInBox.prototype, "IngredientIconInBox", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=IngredientIconInBox.js.map