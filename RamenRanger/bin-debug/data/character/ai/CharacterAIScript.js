var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//AI脚本的每一条信息
var CharacterAIScript = (function () {
    function CharacterAIScript(doMove, moveToX, moveToY, changeDirection, directionTo, doAction, inTick) {
        this.doMove = false; //加个锁，doMove是false就不移动
        this.changeDirection = false; //是否要转换面向，在第0个tick就会转换
        this.doAction = CharacterAction.Stand; //在这个阶段用什么样的动作
        this.doMove = doMove;
        this.moveToX = moveToX;
        this.moveToY = moveToY;
        this.changeDirection = changeDirection;
        this.directionTo = directionTo;
        this.doAction = doAction;
        this.inTick = inTick;
    }
    CharacterAIScript.prototype.SetMoveTarget = function (moveToX, moveToY, inTick) {
        if (inTick === void 0) { inTick = 0; }
        this.moveToX = moveToX;
        this.moveToY = moveToY;
        this.doMove = true;
        this.inTick = inTick;
    };
    CharacterAIScript.prototype.Clone = function () {
        return new CharacterAIScript(this.doMove, this.moveToX, this.moveToY, this.changeDirection, this.directionTo, this.doAction, this.inTick);
    };
    return CharacterAIScript;
}());
__reflect(CharacterAIScript.prototype, "CharacterAIScript");
//# sourceMappingURL=CharacterAIScript.js.map