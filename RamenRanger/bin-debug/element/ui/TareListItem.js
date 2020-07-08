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
var TareListItem = (function (_super) {
    __extends(TareListItem, _super);
    function TareListItem(tare) {
        var _this = _super.call(this) || this;
        _this.tare = tare;
        return _this;
    }
    TareListItem.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    TareListItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    TareListItem.prototype.init = function () {
        if (this.tare) {
            this.Img_Icon.source = RES.getRes(this.tare.icon);
            this.Label_Name.text = this.tare.name;
        }
    };
    return TareListItem;
}(eui.Component));
__reflect(TareListItem.prototype, "TareListItem", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=TareListItem.js.map