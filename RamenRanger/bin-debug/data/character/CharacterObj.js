var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CharacterObj = (function () {
    function CharacterObj(characterActionInfo, x, y, property) {
        this.currentFrame = 0;
        this.cInfo = characterActionInfo;
        this.CreateSpriteClipByInfo();
        this.SetPosition(x, y);
        //this.playingActionInfo = this.cInfo.GetFrameInfoArray(CharacterDirection.Down, CharacterAction.Stand);
        this.ChangeAction(Direction.Down, CharacterAction.Stand);
        this.property = property;
        this.ai = new CharacterAI(this);
    }
    CharacterObj.prototype.CreateSpriteClipByInfo = function () {
        this.body = new SpriteClip();
        this.head = new SpriteClip();
        //TODO 回头可以优化这个，从一个pool里面拿
        var bodyObj = {};
        for (var i = 0; i < this.cInfo.toPreloadBodyImage.length; i++) {
            var k = this.cInfo.toPreloadBodyImage[i];
            bodyObj[k] = RES.getRes(k);
        }
        this.body.SetPreloadTexturesFromObject(bodyObj);
        var headObj = {};
        for (var i = 0; i < this.cInfo.toPreloadHeadImage.length; i++) {
            var k = this.cInfo.toPreloadHeadImage[i];
            headObj[k] = RES.getRes(k);
        }
        this.head.SetPreloadTexturesFromObject(headObj);
    };
    /**
     * 设置逻辑坐标
     */
    CharacterObj.prototype.SetPosition = function (x, y) {
        if (!this.position)
            this.position = new egret.Point(x, y);
        this.position.x = x;
        this.position.y = y;
        if (this.head) {
            this.head.x = x;
            this.head.y = y;
        }
        if (this.body) {
            this.body.x = x;
            this.body.y = y;
        }
    };
    //设置图形到对应帧，以及改变他们的offset属性
    CharacterObj.prototype.SetImageFrame = function (frameIndex) {
        if (frameIndex === void 0) { frameIndex = this.currentFrame; }
        this.currentFrame = frameIndex;
        var upperY = 0;
        if (!this.playingActionInfo || !this.position)
            return;
        if (this.body) {
            this.body.ChangeToPreloadTexture(this.playingActionInfo[frameIndex].body);
            this.body.anchorOffsetX = Math.floor(this.body.width / 2);
            this.body.anchorOffsetY = this.body.height - this.cInfo.body_lower;
            this.body.scaleX = this.direction == Direction.Right ? -1 : 1;
            upperY = this.body.height - this.cInfo.body_upper - this.cInfo.body_lower;
        }
        if (this.head) {
            this.head.ChangeToPreloadTexture(this.playingActionInfo[frameIndex].head);
            this.head.anchorOffsetX = Math.floor(this.head.width / 2);
            this.head.anchorOffsetY = this.head.height + upperY - this.cInfo.head_lower;
            this.head.scaleX = this.direction == Direction.Right ? -1 : 1;
        }
        this.SetPosition(this.position.x, this.position.y);
    };
    /**
     * 更换动作和方向
     */
    CharacterObj.prototype.ChangeAction = function (direction, action, forceChange) {
        if (forceChange === void 0) { forceChange = false; }
        var dontChange = (direction == this.direction && action == this.doingAction && forceChange == false);
        var toAction = this.cInfo.GetFrameInfoArray(direction, action);
        if (toAction != null) {
            this.doingAction = action;
            this.direction = direction;
            this.playingActionInfo = toAction;
            if (dontChange == false)
                this.currentFrame = 0;
            this.SetImageFrame();
        }
    };
    /**
     * 获得某个方向的某个动作需要的帧数
     */
    CharacterObj.prototype.GetActionFrameCount = function (direction, action) {
        var toAction = this.cInfo.GetFrameInfoArray(direction, action);
        if (toAction != null) {
            return toAction.length * RenderUpdateEveryLogicTick; //动作长度其实依赖于渲染
        }
        return 0;
    };
    //返回是否达成一个loop了
    CharacterObj.prototype.Draw = function (incFrame) {
        if (incFrame === void 0) { incFrame = true; }
        this.SetImageFrame();
        if (incFrame == true) {
            this.currentFrame = (this.currentFrame + 1) % this.playingActionInfo.length;
            return this.currentFrame == 0;
        }
        else {
            return false;
        }
    };
    /**
     * 获得逻辑坐标{x:0,y:0}
     */
    CharacterObj.prototype.GetPos = function () {
        return this.position;
    };
    //TODO 特殊处理眨眼和站立，我曹
    CharacterObj.prototype.IsSameAction = function (a1, a2) {
        if ((a1 == CharacterAction.Stand && a2 == CharacterAction.StandTrick) ||
            (a1 == CharacterAction.StandTrick && a2 == CharacterAction.Stand))
            return true;
        return a1 == a2;
    };
    /**
     * 逻辑update。返回是否需要立即渲染一下
     */
    CharacterObj.prototype.FixedUpdate = function () {
        var todo = this.ai.WhatToDo();
        var requireInstantDraw = false;
        if (todo) {
            //处理移动
            if (todo.doMove == true) {
                this.SetPosition(todo.moveToX, todo.moveToY);
            }
            //动作和方向改变，引起改变
            var cD = todo.changeDirection;
            var cA = this.IsSameAction(todo.doAction, this.doingAction) == false;
            if (cD == true || cA == true) {
                this.ChangeAction(cD == true ? todo.directionTo : this.direction, cA == true ? todo.doAction : this.doingAction);
                requireInstantDraw = true;
            }
        }
        return requireInstantDraw;
    };
    /**
     * 渲染update
     */
    CharacterObj.prototype.Update = function () {
        //特殊处理站立的下一个动作
        if (this.Draw() == true && this.IsSameAction(this.doingAction, CharacterAction.Stand) == true) {
            this.ChangeAction(this.direction, (Math.random() < 0.2 ? CharacterAction.StandTrick : CharacterAction.Stand), true);
        }
    };
    return CharacterObj;
}());
__reflect(CharacterObj.prototype, "CharacterObj");
//# sourceMappingURL=CharacterObj.js.map