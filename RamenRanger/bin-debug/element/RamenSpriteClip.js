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
var RamenSpriteClip = (function (_super) {
    __extends(RamenSpriteClip, _super);
    function RamenSpriteClip(ramen) {
        var _this = _super.call(this) || this;
        _this.logicLayer = SpriteClipLayer.Noodle;
        _this.ramen = ramen;
        _this._ramenCreated = false;
        return _this;
    }
    RamenSpriteClip.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    RamenSpriteClip.prototype.init = function () {
        this.source = RES.getRes(this.ramen.model.bowl.model.scene);
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height;
    };
    //绘制拉面的内容
    RamenSpriteClip.prototype.CreateRamen = function () {
        if (!this.parent || this._ramenCreated == true)
            return;
        var backGroup = new eui.Group();
        backGroup.x = this.ramen.model.bowl.model.sceneCenterX + this.x - this.anchorOffsetX;
        backGroup.y = this.ramen.model.bowl.model.sceneCenterY + this.y - this.anchorOffsetY;
        this.parent.addChild(backGroup);
        console.log("back", Utils.GetEuiScreenPos(backGroup));
        var broth = this.ramen.model.broth.model.SceneShape(0, 0, 30); //美术设计拉面汤的宽度是60
        backGroup.addChild(broth);
        console.log("broth", Utils.GetEuiScreenPos(broth));
        this.ramen.model.noodles.GatherSceneImage(backGroup, 0, 0);
        this.imgs = new Array();
        for (var i = 0; i < this.ramen.model.topping.length; i++) {
            var thisImg = this.ramen.model.topping[i].GatherSceneImage(backGroup, 0, 0);
            var thisObj = {
                "ingredient": this.ramen.model.topping[i],
                "img": thisImg
            };
            console.log("toppings[" + i.toString() + "]", Utils.GetEuiScreenPos(thisImg));
        }
        backGroup.scaleY = Scene_HorVerTimes;
        this._ramenCreated = true;
    };
    return RamenSpriteClip;
}(SpriteClip));
__reflect(RamenSpriteClip.prototype, "RamenSpriteClip");
//# sourceMappingURL=RamenSpriteClip.js.map