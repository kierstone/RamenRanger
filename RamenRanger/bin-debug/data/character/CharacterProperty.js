var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CharacterProperty = (function () {
    function CharacterProperty() {
        this.speed = 3; //每帧移动速度不同，年轻人肯定快一点
    }
    return CharacterProperty;
}());
__reflect(CharacterProperty.prototype, "CharacterProperty");
//# sourceMappingURL=CharacterProperty.js.map