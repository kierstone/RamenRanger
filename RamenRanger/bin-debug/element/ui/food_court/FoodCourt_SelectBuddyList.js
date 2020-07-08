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
var FoodCourt_SelectBuddyList = (function (_super) {
    __extends(FoodCourt_SelectBuddyList, _super);
    function FoodCourt_SelectBuddyList(caller, buddies, maxGuy, buddyBehaveFunc, doneButtonEve) {
        var _this = _super.call(this) || this;
        _this.buddies = buddies;
        _this.maxBuddy = maxGuy;
        _this.caller = caller;
        _this.buddyBehaveFunc = buddyBehaveFunc;
        _this.doneButtonEve = doneButtonEve;
        _this.buddyButtons = new Array();
        _this.selectedBuddy = new Array();
        return _this;
    }
    FoodCourt_SelectBuddyList.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    FoodCourt_SelectBuddyList.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    FoodCourt_SelectBuddyList.prototype.init = function () {
        var _this = this;
        for (var i = 0; i < this.buddies.length; i++) {
            var bb = new HorizontalFoodCourt_BuddyInfo(this.buddies[i], this, this.ClickOnBuddyButton);
            this.Group_Buddy.addChild(bb);
            this.buddyButtons.push(bb);
        }
        this.Button_Done.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.caller.canControl == false)
                return;
            if (_this.doneButtonEve) {
                _this.doneButtonEve(_this.caller, _this.selectedBuddy);
            }
        }, this);
        this.RefreshLabel();
    };
    FoodCourt_SelectBuddyList.prototype.ClickOnBuddyButton = function (thisObj, buddy, selected) {
        if (thisObj.caller.canControl == false)
            return selected;
        if (selected == false && thisObj.TeamFull() == true) {
            return false; //没选中就是要选中，但是如果已经满了就不鸟了，所以选中状态还是false
        }
        if (selected == false) {
            if (thisObj.buddyBehaveFunc) {
                thisObj.buddyBehaveFunc(thisObj.caller, buddy, true);
            }
            thisObj.selectedBuddy.push(buddy);
            thisObj.RefreshLabel();
            return true;
        }
        else {
            //TODO 移除出队伍
            if (thisObj.buddyBehaveFunc) {
                thisObj.buddyBehaveFunc(thisObj.caller, buddy, false);
            }
            var idx = thisObj.selectedBuddy.indexOf(buddy);
            if (idx >= 0)
                thisObj.selectedBuddy.splice(idx, 1);
            thisObj.RefreshLabel();
            return false;
        }
    };
    FoodCourt_SelectBuddyList.prototype.TeamFull = function () {
        return this.selectedBuddy.length >= this.maxBuddy;
    };
    FoodCourt_SelectBuddyList.prototype.RefreshLabel = function () {
        this.Label_BuddyCount.text =
            "选择一起去玩的朋友（" +
                this.selectedBuddy.length.toString() + "/" +
                this.maxBuddy.toString() + "）";
    };
    return FoodCourt_SelectBuddyList;
}(eui.Component));
__reflect(FoodCourt_SelectBuddyList.prototype, "FoodCourt_SelectBuddyList", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=FoodCourt_SelectBuddyList.js.map