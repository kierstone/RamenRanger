var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ChairObj = (function () {
    //TODO现在椅子都只有一格子宽度，今后扩展了再说
    //public canSitGrid:Array<GridPosition>;	//可以坐的格子
    function ChairObj(img, x, y, direction) {
        if (direction === void 0) { direction = Direction.Down; }
        this.position = new egret.Point(x, y);
        this.enteranceOffset = new egret.Point(75, 0); //TODO 写死了坐进去的地方，但实际上应该读表
        this.direction = direction;
        this.img = img;
        this.sittingCha = null;
        this.Redraw();
    }
    /**
     * 椅子需要被重绘的频率非常低
     */
    ChairObj.prototype.Redraw = function () {
        if (!this.image)
            this.image = new SpriteClip();
        this.image.texture = RES.getRes(this.img);
        this.image.anchorOffsetX = Math.round(this.image.width / 2);
        this.image.anchorOffsetY = this.image.height;
        this.SetPos(this.position.x, this.position.y);
        //TODO人坐进去以后的位移
    };
    ChairObj.prototype.SetPos = function (x, y) {
        if (!this.image) {
            this.Redraw();
        }
        if (!this.position) {
            this.position = new egret.Point(x, y);
        }
        this.position.x = this.image.x = x;
        this.position.y = this.image.y = y;
        if (!this.enterance) {
            this.enterance = new egret.Point(0, 0);
        }
        this.enterance.x = this.position.x + this.enteranceOffset.x;
        this.enterance.y = this.position.y + this.enteranceOffset.y;
    };
    return ChairObj;
}());
__reflect(ChairObj.prototype, "ChairObj");
//# sourceMappingURL=ChairObj.js.map