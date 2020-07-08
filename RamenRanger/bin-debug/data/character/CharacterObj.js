var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CharacterObj = (function () {
    function CharacterObj(characterKey, buddyInfo) {
        this.characterKey = characterKey;
        this.buddyInfo = buddyInfo;
    }
    CharacterObj.prototype.GetCharacterActionInfo = function () {
        return GetCharacterActionInfoByKey(this.characterKey);
    };
    return CharacterObj;
}());
__reflect(CharacterObj.prototype, "CharacterObj");
//# sourceMappingURL=CharacterObj.js.map