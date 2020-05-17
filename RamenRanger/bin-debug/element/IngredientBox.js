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
var IngredientBox = (function (_super) {
    __extends(IngredientBox, _super);
    function IngredientBox(items) {
        var _this = _super.call(this) || this;
        _this.listItems = items;
        return _this;
    }
    IngredientBox.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    IngredientBox.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    IngredientBox.prototype.init = function () {
        var xs = [62, 230, 396, 562];
        var ys = [20, 182, 345];
        var looplen = Math.min(this.listItems.length, 12);
        for (var i = 0; i < looplen; i++) {
            var iconItem = this.listItems[i];
            iconItem.x = xs[Math.floor(i % 4)];
            iconItem.y = ys[Math.floor(i / 4)];
            this.addChild(iconItem);
        }
        this.anchorOffsetY = this.height;
        this.anchorOffsetX = this.width / 2;
    };
    IngredientBox.prototype.SetSelect = function (id) {
        for (var i = 0; i < this.listItems.length; i++) {
            this.listItems[i].SetSelected(this.listItems[i].id == id);
        }
    };
    return IngredientBox;
}(eui.Component));
__reflect(IngredientBox.prototype, "IngredientBox", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=IngredientBox.js.map