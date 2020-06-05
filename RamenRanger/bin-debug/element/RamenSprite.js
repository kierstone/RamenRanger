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
var RamenSprite = (function (_super) {
    __extends(RamenSprite, _super);
    function RamenSprite(ramen) {
        var _this = _super.call(this) || this;
        _this.ramen = ramen;
        return _this;
    }
    RamenSprite.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    RamenSprite.prototype.init = function () {
        if (this.ramen)
            this.SetRamen(this.ramen);
    };
    RamenSprite.prototype.SetRamen = function (ramen) {
        if (!ramen)
            return;
        this.ramen = ramen;
        this.bowlImg = new eui.Image(RES.getRes(this.ramen.model.bowl.model.scene));
        this.addChild(this.bowlImg);
        this.bowlImg.anchorOffsetX = this.bowlImg.width / 2;
        this.bowlImg.anchorOffsetY = this.bowlImg.height;
        var backGroup = new eui.Group();
        backGroup.x = -this.bowlImg.anchorOffsetX + this.ramen.model.bowl.model.sceneCenterX;
        backGroup.y = -this.bowlImg.anchorOffsetY + this.ramen.model.bowl.model.sceneCenterY;
        this.addChild(backGroup);
        this.brothShape = this.ramen.model.broth.model.SceneShape(0, 0, 30); //美术设计拉面汤的宽度是60
        backGroup.addChild(this.brothShape);
        this.noodleImg = this.ramen.model.noodles.GatherSceneImage(backGroup, 0, 0);
        this.ToppingImg = new Array();
        for (var i = 0; i < this.ramen.topping.length; i++) {
            var thisImg = this.ramen.topping[i].GatherSceneImage(backGroup, 0, 0);
            var thisObj = {
                "ingredient": this.ramen.topping[i],
                "img": thisImg
            };
            this.ToppingImg.push(thisObj);
        }
        backGroup.scaleY = Scene_HorVerTimes;
    };
    /**
     * 当拉面被吃了一口的时候，应该刷新一下
     *
     */
    RamenSprite.prototype.UpdateRamen = function () {
        //noodles
        var noodleScale = Math.max(0, Math.min(this.ramen.noodlePercentage, 1));
        this.noodleImg.scaleX = this.noodleImg.scaleY = noodleScale;
        //TODO broth
        //ingredients
        var index = 0;
        while (index < this.ToppingImg.length) {
            if (this.ramen.topping.indexOf(this.ToppingImg[index]["ingredient"]) >= 0) {
                index += 1;
            }
            else {
                if (this.ToppingImg[index]["img"].parent)
                    this.ToppingImg[index]["img"].parent.removeChild(this.ToppingImg[index]["img"]);
                this.ToppingImg.splice(index, 1);
            }
        }
    };
    /**
     * 获得汤的y坐标对应于整个拉面坐标(作为原点)的坐标y
     * @returns {number} y坐标
     */
    RamenSprite.prototype.BrothOffsetY = function () {
        return -this.bowlImg.anchorOffsetY + this.ramen.model.bowl.model.sceneCenterY;
    };
    return RamenSprite;
}(SpriteGroup));
__reflect(RamenSprite.prototype, "RamenSprite");
//# sourceMappingURL=RamenSprite.js.map