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
var CraftNoodle_TareList = (function (_super) {
    __extends(CraftNoodle_TareList, _super);
    function CraftNoodle_TareList(caller, tares, removeFunc) {
        var _this = _super.call(this) || this;
        _this.tareList = [null, null, null, null, null, null];
        if (tares) {
            for (var i = 0; i < 6; i++) {
                if (i < tares.length)
                    _this.tareList[i] = tares[i];
            }
        }
        _this.caller = caller;
        _this.removeFunc = removeFunc;
        return _this;
    }
    CraftNoodle_TareList.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CraftNoodle_TareList.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    CraftNoodle_TareList.prototype.init = function () {
        var _this = this;
        this.CreateSlots();
        this.Button_Remove0.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.RemoveButtonEvent(0);
        }, this);
        this.Button_Remove1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.RemoveButtonEvent(1);
        }, this);
        this.Button_Remove2.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.RemoveButtonEvent(2);
        }, this);
        this.Button_Remove3.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.RemoveButtonEvent(3);
        }, this);
        this.Button_Remove4.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.RemoveButtonEvent(4);
        }, this);
        this.Button_Remove5.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.RemoveButtonEvent(5);
        }, this);
        this.Button_Close.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            CloseCraftNoodleTareList();
        }, this);
        this.Group_Dialog.scaleX = 0;
        egret.Tween.removeTweens(this.Group_Dialog);
        egret.Tween.get(this.Group_Dialog).to({ scaleX: 1 }, 300, egret.Ease.quadIn);
    };
    CraftNoodle_TareList.prototype.RemoveButtonEvent = function (buttonIndex) {
        if (this.caller && this.removeFunc && this.tareList[buttonIndex]) {
            this.removeFunc(this.caller, this.tareList[buttonIndex]);
            this.RemoveTareInSlot(buttonIndex);
        }
    };
    CraftNoodle_TareList.prototype.ResetSlots = function () {
        if (this.listItems) {
            for (var i = 0; i < this.listItems.length; i++) {
                if (this.listItems[i] && this.listItems[i].parent) {
                    this.listItems[i].parent.removeChild(this.listItems[i]);
                }
            }
        }
        this.listItems = [null, null, null, null, null, null];
    };
    CraftNoodle_TareList.prototype.CreateSlots = function () {
        this.ResetSlots();
        var posX = [32, 220, 408, 32, 220, 408];
        var posY = [48, 48, 48, 236, 236, 236];
        var btns = [
            this.Button_Remove0, this.Button_Remove1, this.Button_Remove2,
            this.Button_Remove3, this.Button_Remove4, this.Button_Remove5,
        ];
        for (var i = 0; i < this.tareList.length; i++) {
            btns[i].visible = btns[i].enabled = (this.tareList[i] != null && this.tareList[i] != undefined);
            if (this.tareList[i]) {
                var li = new TareListItem(this.tareList[i].model);
                this.Group_ItemLayer.addChild(li);
                li.x = posX[i];
                li.y = posY[i];
                this.listItems[i] = li;
            }
        }
    };
    //TODO 暂时只支持删除个把以后
    CraftNoodle_TareList.prototype.RefreshSlots = function () {
        var btns = [
            this.Button_Remove0, this.Button_Remove1, this.Button_Remove2,
            this.Button_Remove3, this.Button_Remove4, this.Button_Remove5,
        ];
        for (var i = 0; i < this.listItems.length; i++) {
            if (this.listItems[i] && !this.tareList[i] && this.listItems[i].parent) {
                this.listItems[i].parent.removeChild(this.listItems[i]);
                this.listItems[i] = null;
                btns[i].visible = btns[i].enabled = false;
            }
        }
    };
    //删除某个位置的tare
    CraftNoodle_TareList.prototype.RemoveTareInSlot = function (index) {
        if (this.tareList[index])
            this.tareList[index] = null;
        this.RefreshSlots();
    };
    return CraftNoodle_TareList;
}(eui.Component));
__reflect(CraftNoodle_TareList.prototype, "CraftNoodle_TareList", ["eui.UIComponent", "egret.DisplayObject"]);
var _CraftNoodle_TareList;
var ShowCraftNoodleTareList = function (c, tareList, removeFUnc) {
    if (_CraftNoodle_TareList)
        return;
    _CraftNoodle_TareList = new CraftNoodle_TareList(c, tareList, removeFUnc);
    c.addChild(_CraftNoodle_TareList);
};
var CloseCraftNoodleTareList = function () {
    if (_CraftNoodle_TareList && _CraftNoodle_TareList.parent) {
        _CraftNoodle_TareList.parent.removeChild(_CraftNoodle_TareList);
        _CraftNoodle_TareList = null;
    }
};
//# sourceMappingURL=CraftNoodle_TareList.js.map