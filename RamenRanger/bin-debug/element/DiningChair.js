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
var DiningChair = (function (_super) {
    __extends(DiningChair, _super);
    //TODO现在椅子都只有一格子宽度，今后扩展了再说
    //public canSitGrid:Array<GridPosition>;	//可以坐的格子
    function DiningChair(model, gridX, gridY, direction) {
        if (direction === void 0) { direction = Direction.Down; }
        var _this = _super.call(this) || this;
        _this.gridX = gridX;
        _this.gridY = gridY;
        _this.direction = direction;
        _this.model = model;
        return _this;
    }
    DiningChair.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    DiningChair.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    DiningChair.prototype.init = function () {
        this.Redraw();
    };
    DiningChair.prototype.Redraw = function () {
        var info = this.model.direction[this.direction];
        if (info) {
            this.image.source = RES.getRes(info.source);
            this.width = info.gridWidth * GridWidth;
            this.height = info.gridHeight * GridHeight;
        }
    };
    DiningChair.prototype.ChangeDirection = function (dir) {
        if (dir == this.direction)
            return;
        this.direction = dir;
        this.Redraw();
    };
    return DiningChair;
}(eui.Component));
__reflect(DiningChair.prototype, "DiningChair", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=DiningChair.js.map