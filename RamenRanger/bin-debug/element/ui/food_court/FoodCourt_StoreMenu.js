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
var FoodCourt_StoreMenu = (function (_super) {
    __extends(FoodCourt_StoreMenu, _super);
    function FoodCourt_StoreMenu(caller, store) {
        var _this = _super.call(this) || this;
        _this.caller = caller;
        _this.store = store;
        _this.dishButtons = new Array();
        return _this;
    }
    FoodCourt_StoreMenu.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    FoodCourt_StoreMenu.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    FoodCourt_StoreMenu.prototype.init = function () {
        var _this = this;
        var _loop_1 = function (i) {
            var os = this_1.store.onSale[i];
            var favourGuys = this_1.caller.GetFavourGuyByDishType(os.model.type);
            var b = new HorizontalFoodCourt_DishButton(os, favourGuys, this_1.caller.hungry, this_1.caller.hungerMax, this_1.caller, this_1.caller.EatDish);
            b.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.SetSelected(b);
                _this.caller.SelectDish(_this.caller, os);
            }, this_1);
            this_1.Group_DishMenu.addChild(b);
            this_1.dishButtons.push(b);
        };
        var this_1 = this;
        for (var i = 0; i < this.store.onSale.length; i++) {
            _loop_1(i);
        }
    };
    FoodCourt_StoreMenu.prototype.SetSelected = function (b) {
        for (var i = 0; i < this.dishButtons.length; i++) {
            this.dishButtons[i].SetSelect(this.dishButtons[i] == b);
        }
    };
    return FoodCourt_StoreMenu;
}(eui.Component));
__reflect(FoodCourt_StoreMenu.prototype, "FoodCourt_StoreMenu", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=FoodCourt_StoreMenu.js.map