var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CharacterAI = (function () {
    function CharacterAI(master) {
        this.master = master;
        this.plan = new Array();
        this.totalTicked = 0;
        this.ticked = 0;
    }
    CharacterAI.prototype.AddScripts = function (scripts) {
        for (var i = 0; i < scripts.length; i++) {
            this.plan.push(scripts[i].Clone());
        }
    };
    CharacterAI.prototype.SetScripts = function (scripts) {
        if (scripts === void 0) { scripts = []; }
        this.plan = new Array();
        for (var i = 0; i < scripts.length; i++) {
            this.plan.push(scripts[i].Clone());
        }
    };
    //获得这一帧应该干啥
    CharacterAI.prototype.WhatToDo = function (tickInc) {
        if (tickInc === void 0) { tickInc = true; }
        if (!this.plan || this.plan.length <= 0 || !this.master)
            return new CharacterAIScript(false, 0, 0, false, Direction.Down, CharacterAction.Stand, 1);
        var thisPlan = this.plan[0];
        var cPos = this.master.GetPos();
        var toX = cPos["x"];
        var toY = cPos["y"];
        var moveDone = thisPlan.doMove == false;
        var needMove = thisPlan.doMove;
        if (thisPlan.doMove == true) {
            var ms = this.master.property.speed;
            var cX = cPos["x"];
            var cY = cPos["y"];
            var tX = thisPlan.moveToX;
            var tY = thisPlan.moveToY;
            var xDone = false;
            var yDone = false;
            //x,y等速移动，所以产生AI的时候应该注意……
            if (Math.abs(tX - cX) <= ms) {
                xDone = true;
                toX = tX;
            }
            else {
                toX = (tX < cX) ? (cX - ms) : (cX + ms);
            }
            if (Math.abs(tY - cY) <= ms) {
                yDone = true;
                toY = tY;
            }
            else {
                toY = (tY < cY) ? (cY - ms) : (cY + ms);
            }
            if (xDone == true && yDone == true) {
                moveDone = true;
            }
        }
        var needDir = this.ticked <= 0 && thisPlan.changeDirection == true;
        var toDir = needDir == true ? thisPlan.directionTo : this.master.direction;
        var doAction = thisPlan.doAction;
        if (tickInc == true) {
            this.ticked += 1;
            this.totalTicked += 1;
            if (this.ticked >= thisPlan.inTick && moveDone == true) {
                this.ticked = 0;
                this.plan.shift();
            }
        }
        return new CharacterAIScript(needMove, toX, toY, needDir, toDir, doAction, 1);
    };
    return CharacterAI;
}());
__reflect(CharacterAI.prototype, "CharacterAI");
//# sourceMappingURL=CharacterAI.js.map