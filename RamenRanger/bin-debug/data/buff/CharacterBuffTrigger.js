var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//添加角色buff到角色身上需要的信息
var CharacterBuffTrigger = (function () {
    function CharacterBuffTrigger(buffId, stack, turns) {
        this.buffId = buffId;
        this.stack = stack;
        this.turns = turns;
    }
    return CharacterBuffTrigger;
}());
__reflect(CharacterBuffTrigger.prototype, "CharacterBuffTrigger");
//# sourceMappingURL=CharacterBuffTrigger.js.map