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
var SpriteGroup = (function (_super) {
    __extends(SpriteGroup, _super);
    function SpriteGroup() {
        return _super.call(this) || this;
    }
    SpriteGroup.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        //this.init();
    };
    /**
     * 经过比较，我是否改到下面一层
     */
    SpriteGroup.prototype.NeedToSendMeBack = function (compareGroup) {
        if (!compareGroup)
            return false;
        return this.y < compareGroup.y;
    };
    SpriteGroup.prototype.Update = function () { };
    return SpriteGroup;
}(eui.Group));
__reflect(SpriteGroup.prototype, "SpriteGroup");
//# sourceMappingURL=SpriteGroup.js.map