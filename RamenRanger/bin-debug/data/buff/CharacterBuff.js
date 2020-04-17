var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//吃饭的npc身上的buff，而不是玩家店铺的buff，是buffObj
var CharacterBuff = (function () {
    function CharacterBuff() {
    }
    return CharacterBuff;
}());
__reflect(CharacterBuff.prototype, "CharacterBuff");
//# sourceMappingURL=CharacterBuff.js.map