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
var RandomBuddyPortSprite = (function (_super) {
    __extends(RandomBuddyPortSprite, _super);
    function RandomBuddyPortSprite(buddyPort, width, height) {
        if (width === void 0) { width = 144; }
        if (height === void 0) { height = 144; }
        var _this = _super.call(this) || this;
        _this.port = buddyPort;
        _this._width = width;
        _this._height = height;
        return _this;
    }
    RandomBuddyPortSprite.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    RandomBuddyPortSprite.prototype.init = function () {
        this.parts = new Array();
        this.removeChildren();
        var ss = this.port.GetLayerSources();
        for (var i = 0; i < ss.length; i++) {
            var img = new eui.Image(ss[i]);
            this.addChild(img);
            img.width = this._width;
            img.height = this._height;
            this.parts.push(img);
        }
    };
    RandomBuddyPortSprite.prototype.SetSize = function (width, height) {
        for (var i = 0; i < this.parts.length; i++) {
            this.parts[i].width = width;
            this.parts[i].height = height;
        }
    };
    return RandomBuddyPortSprite;
}(SpriteGroup));
__reflect(RandomBuddyPortSprite.prototype, "RandomBuddyPortSprite");
var RandomPortrait = (function () {
    function RandomPortrait(favourType) {
        this._favType = favourType;
        this.Random(favourType);
    }
    RandomPortrait.prototype.Random = function (favourType) {
        //TODO 现在都是写死的
        this.eye = Utils.RandomInt(0, 9);
        this.brow = Utils.RandomInt(0, 9);
        this.mouth = Utils.RandomInt(0, 14);
        this.face = Utils.RandomInt(0, 3);
        this.foreHair = Utils.RandomInt(0, 9);
        this.backHair = Utils.RandomInt(0, 7);
        this.glasses = Utils.RandomInt(0, 5);
        this.cloth = Utils.RandomInt(0, 2);
        this.nose = Utils.RandomInt(0, 4);
    };
    /**
     * 获得每一层贴图的文件source
     * @returns {Array<string>} 每一层（从下到上）的资源名称字符串
     */
    RandomPortrait.prototype.GetLayerSources = function () {
        //TODO 现在都是写死的
        var res = [
            "female_back_hair_" + this.backHair.toString(),
            "female_neck",
            "female_cloth_" + this.cloth.toString(),
            "female_face_" + this.face.toString(),
            "female_eye_" + this.eye.toString(),
            "female_eyeball_" + this.eye.toString(),
            "female_brow_" + this.brow.toString(),
            "female_nose_" + this.nose.toString(),
            "female_mouth_" + this.mouth.toString(),
            "female_middle_hair_" + this.backHair.toString(),
            "female_glasses_" + this.glasses.toString(),
            "female_hair_" + this.foreHair.toString()
        ];
        return res;
    };
    return RandomPortrait;
}());
__reflect(RandomPortrait.prototype, "RandomPortrait");
//# sourceMappingURL=RandomBuddyPortSprite.js.map