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
var HorizontalFoodCourt_BuddyInfo = (function (_super) {
    __extends(HorizontalFoodCourt_BuddyInfo, _super);
    function HorizontalFoodCourt_BuddyInfo(buddy, caller, func) {
        var _this = _super.call(this) || this;
        _this.selected = false;
        _this.buddy = buddy;
        _this.caller = caller;
        _this.func = func;
        return _this;
    }
    HorizontalFoodCourt_BuddyInfo.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    HorizontalFoodCourt_BuddyInfo.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    HorizontalFoodCourt_BuddyInfo.prototype.init = function () {
        var _this = this;
        this.portSpr = new RandomBuddyPortSprite(this.buddy.portrait);
        this.Group_Port.addChild(this.portSpr);
        this.Label_Hunger.text = this.buddy.hunger.toString();
        this.SetSelected(false);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.caller && _this.func) {
                _this.SetSelected(_this.func(_this.caller, _this.buddy, _this.selected));
            }
        }, this);
    };
    HorizontalFoodCourt_BuddyInfo.prototype.SetSelected = function (s) {
        this.selected = s;
        this.Img_SelectSign.visible = s;
    };
    return HorizontalFoodCourt_BuddyInfo;
}(eui.Component));
__reflect(HorizontalFoodCourt_BuddyInfo.prototype, "HorizontalFoodCourt_BuddyInfo", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=HorizontalFoodCourt_BuddyInfo.js.map