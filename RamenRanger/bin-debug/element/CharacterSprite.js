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
var CharacterSprite = (function (_super) {
    __extends(CharacterSprite, _super);
    function CharacterSprite(chaObj) {
        var _this = _super.call(this) || this;
        _this._character = chaObj;
        return _this;
    }
    CharacterSprite.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    CharacterSprite.prototype.init = function () {
        this.head = this._character.head;
        this.body = this._character.body;
        this.emote = this._character.emote;
        this._character.SetPosition(0, 0);
        //注意加入顺序
        if (this.body)
            this.addChild(this.body);
        if (this.head)
            this.addChild(this.head);
        if (this.emote)
            this.addChild(this.emote);
    };
    CharacterSprite.prototype.Update = function () {
        this._character.Update();
    };
    CharacterSprite.prototype.FixedUpdate = function () {
        return this._character.FixedUpdate();
    };
    return CharacterSprite;
}(SpriteGroup));
__reflect(CharacterSprite.prototype, "CharacterSprite");
//# sourceMappingURL=CharacterSprite.js.map