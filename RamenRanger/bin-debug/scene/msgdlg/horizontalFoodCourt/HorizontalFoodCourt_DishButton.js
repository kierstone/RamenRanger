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
var HorizontalFoodCourt_DishButton = (function (_super) {
    __extends(HorizontalFoodCourt_DishButton, _super);
    function HorizontalFoodCourt_DishButton(dish, favourGuyCount, currentHunger, hungerMax, caller, eve) {
        var _this = _super.call(this) || this;
        _this.clicked = false;
        _this.dish = dish;
        _this.caller = caller;
        _this.eve = eve;
        _this.favourGuy = favourGuyCount;
        _this.currentHunger = currentHunger;
        _this.hungerMax = Math.max(1, hungerMax);
        return _this;
    }
    HorizontalFoodCourt_DishButton.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    HorizontalFoodCourt_DishButton.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    HorizontalFoodCourt_DishButton.prototype.init = function () {
        var _this = this;
        this.dishSpr = new RamenSprite(this.dish.dish);
        this.Group_Ramen.addChild(this.dishSpr);
        this.Label_Name.text = this.dish.model.name;
        for (var i = 0; i < this.dish.model.reward.length; i++) {
            var ingModel = GetIngredientModelById(this.dish.model.reward[i].ingredientId);
            if (ingModel) {
                var ing = new eui.Image(ingModel.img);
                ing.width = ing.height = 50;
                this.Group_Ingredient.addChild(ing);
            }
        }
        var sgc = 0;
        for (var i = 0; i < this.favourGuy.length; i++) {
            var port = new RandomBuddyPortSprite(this.favourGuy[i].portrait, 50, 50);
            if (port) {
                this.Group_Buddy.addChild(port);
                sgc += 1;
            }
            if (sgc >= 3)
                break;
        }
        this.Rect_ColorSign.fillColor = GetFoodCourtDishTypeColor(this.dish.model.type);
        this.SetSelect(false);
        this.Button_Eat.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.clicked == true)
                return;
            _this.clicked = true;
            if (_this.caller && _this.eve) {
                _this.eve(_this.caller, _this.dish);
            }
        }, this);
    };
    HorizontalFoodCourt_DishButton.prototype.SetSelect = function (s) {
        this.currentState = s == true ? "selected" : "normal";
    };
    return HorizontalFoodCourt_DishButton;
}(eui.Component));
__reflect(HorizontalFoodCourt_DishButton.prototype, "HorizontalFoodCourt_DishButton", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=HorizontalFoodCourt_DishButton.js.map