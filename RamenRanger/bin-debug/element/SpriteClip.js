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
var SpriteClip = (function (_super) {
    __extends(SpriteClip, _super);
    function SpriteClip() {
        var _this = _super.call(this) || this;
        _this.logicLayer = SpriteClipLayer.Normal;
        _this.preloadTextures = {};
        return _this;
    }
    SpriteClip.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        //this.init();
    };
    /**
     * 预加载这些textures
     * @param {Object} texture {"key":string, "texture":egret.Texture}
     */
    SpriteClip.prototype.SetPreloadTexturesFromObject = function (textures) {
        this.preloadTextures = textures;
    };
    /**
     * 根据string预加载这些texture
     * @param {Array<string>} keys 文件名称，最终将成为preloadTextures[Key]
     */
    SpriteClip.prototype.SetPreloadTextureByKeys = function (keys) {
        this.preloadTextures = {};
        for (var i = 0; i < keys.length; i++) {
            this.preloadTextures[keys[i]] = RES.getRes(keys[i]);
        }
    };
    /**
     * 设置当前图形为preload的某一个
     * @returns {boolean} 是否成功
     */
    SpriteClip.prototype.ChangeToPreloadTexture = function (key) {
        if (key == "" || !this.preloadTextures || !this.preloadTextures[key]) {
            return false;
        }
        this.texture = this.preloadTextures[key];
    };
    /**
     * 经过比较，我是否改到下面一层
     * @returns {boolean} true代表我该去下一层
     */
    SpriteClip.prototype.NeedToSendMeBack = function (compareSpritClip) {
        if (!compareSpritClip)
            return false;
        if (this.logicLayer == compareSpritClip.logicLayer) {
            return this.y < compareSpritClip.y;
        }
        else {
            return this.logicLayer < compareSpritClip.logicLayer;
        }
    };
    return SpriteClip;
}(eui.Image));
__reflect(SpriteClip.prototype, "SpriteClip");
//# sourceMappingURL=SpriteClip.js.map