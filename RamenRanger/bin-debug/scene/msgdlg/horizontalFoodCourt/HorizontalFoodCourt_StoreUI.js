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
var HorizontalFoodCourt_StoreUI = (function (_super) {
    __extends(HorizontalFoodCourt_StoreUI, _super);
    function HorizontalFoodCourt_StoreUI(caller, store) {
        var _this = _super.call(this) || this;
        _this.ticked = 0;
        _this.dialogText = "即便吃不下，也可以点单，不然进店发现都不能点就软死机了，所以就饶你玩家这点饱食度好了。";
        _this.caller = caller;
        _this.store = store;
        return _this;
    }
    HorizontalFoodCourt_StoreUI.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    HorizontalFoodCourt_StoreUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    HorizontalFoodCourt_StoreUI.prototype.init = function () {
        var _this = this;
        this.Button_Cancel.visible = this.Button_Cancel.enabled = false;
        var bStartY = 220;
        var bDis = 210;
        var bStartX = this.Label_Dialog.x;
        this.Img_Back.height = bStartY + 480;
        for (var i = 0; i < this.store.onSale.length; i++) {
            var os = this.store.onSale[i];
            var favourGuys = this.caller.GetFavourGuyByDishType(os.model.type);
            var b = new HorizontalFoodCourt_DishButton(os, favourGuys, this.caller.hungry, this.caller.hungerMax, this.caller, this.caller.EatDish);
            b.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (_this.parent)
                    _this.parent.removeChild(_this);
            }, this);
            b.x = i * bDis + bStartX;
            b.y = bStartY;
            b.enabled = this.caller.CanEatThisDish(os);
            b.alpha = b.enabled == true ? 1 : 0.7;
            this.Group_Window.addChild(b);
        }
        this.Button_Cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.caller.CancelEat(_this.caller);
            if (_this.parent)
                _this.parent.removeChild(_this);
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.ticked <= _this.dialogText.length && _this.Label_Dialog.text.length < _this.dialogText.length) {
                _this.Label_Dialog.text = _this.dialogText;
            }
        }, this);
        var t = new egret.Timer(90);
        t.addEventListener(egret.TimerEvent.TIMER, function () {
            _this.Update();
        }, this);
        t.start();
    };
    HorizontalFoodCourt_StoreUI.prototype.Update = function () {
        this.ticked = (this.ticked + 1) % Number.MAX_VALUE;
        if (this.ticked <= this.dialogText.length && this.Label_Dialog.text.length < this.dialogText.length) {
            this.Label_Dialog.text = this.dialogText.substr(0, this.ticked);
        }
    };
    return HorizontalFoodCourt_StoreUI;
}(eui.Component));
__reflect(HorizontalFoodCourt_StoreUI.prototype, "HorizontalFoodCourt_StoreUI", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=HorizontalFoodCourt_StoreUI.js.map