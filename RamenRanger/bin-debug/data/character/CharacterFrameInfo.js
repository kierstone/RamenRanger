var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//角色动画一帧的信息，目前来看，只要头跟身体的文件名
var CharacterFrameInfo = (function () {
    function CharacterFrameInfo(head, body) {
        this.head = head;
        this.body = body;
    }
    return CharacterFrameInfo;
}());
__reflect(CharacterFrameInfo.prototype, "CharacterFrameInfo");
//# sourceMappingURL=CharacterFrameInfo.js.map