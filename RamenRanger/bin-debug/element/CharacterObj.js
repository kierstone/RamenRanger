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
var CharacterObj = (function (_super) {
    __extends(CharacterObj, _super);
    function CharacterObj(characterActionInfo, x, y, property) {
        var _this = _super.call(this) || this;
        _this.currentFrame = 0;
        _this.posOffX = 0; //图形偏移
        _this.posOffY = 0;
        _this.setToX = 0; //设置到的逻辑世界的坐标
        _this.setToY = 0;
        _this.cInfo = characterActionInfo;
        _this.setToX = x;
        _this.setToY = y;
        //this.playingActionInfo = this.cInfo.GetFrameInfoArray(CharacterDirection.Down, CharacterAction.Stand);
        _this.ChangeAction(Direction.Down, CharacterAction.Stand);
        _this.property = property;
        _this.ai = new CharacterAI(_this);
        return _this;
    }
    CharacterObj.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CharacterObj.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    CharacterObj.prototype.init = function () {
        this.Draw();
    };
    //更换动作和方向
    CharacterObj.prototype.ChangeAction = function (direction, action, forceChange) {
        if (forceChange === void 0) { forceChange = false; }
        if (direction == this.direction && action == this.doingAction && forceChange == false) {
            return;
        }
        var toAction = this.cInfo.GetFrameInfoArray(direction, action);
        if (toAction != null) {
            this.doingAction = action;
            this.direction = direction;
            this.playingActionInfo = toAction;
            this.currentFrame = 0;
            this.scaleX = direction == Direction.Right ? -1 : 1;
            this.SetPos(this.setToX, this.setToY);
        }
    };
    //返回是否达成一个loop了
    CharacterObj.prototype.Draw = function (incFrame) {
        if (incFrame === void 0) { incFrame = true; }
        this.head.texture = RES.getRes(this.cInfo.key + "_" + this.playingActionInfo[this.currentFrame].head);
        this.body.texture = RES.getRes(this.cInfo.key + "_" + this.playingActionInfo[this.currentFrame].body);
        this.head.x = (this.width - this.head.width) / 2;
        this.head.y = 0;
        this.body.x = (this.width - this.body.width) / 2;
        this.body.y = this.head.height - this.cInfo.head_lower - this.cInfo.body_upper;
        this.posOffX = this.width / 2;
        this.posOffY = this.body.y + this.body.height - this.cInfo.body_lower;
        this.SetPos(this.setToX, this.setToY);
        if (incFrame == true) {
            this.currentFrame = (this.currentFrame + 1) % this.playingActionInfo.length;
            return this.currentFrame == 0;
        }
        else {
            return false;
        }
    };
    /**
     * 通过这个来设置x,y，这样才能对准位置
     */
    CharacterObj.prototype.SetPos = function (x, y) {
        this.setToX = x;
        this.setToY = y;
        this.x = x - this.posOffX + (this.direction == Direction.Right ? this.width : 0);
        this.y = y - this.posOffY;
    };
    /**
     * 获得逻辑坐标{x:0,y:0}
     */
    CharacterObj.prototype.GetPos = function () {
        return {
            x: this.setToX,
            y: this.setToY
        };
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
                this.SetPos(todo.moveToX, todo.moveToY);
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
}(eui.Component));
__reflect(CharacterObj.prototype, "CharacterObj", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=CharacterObj.js.map