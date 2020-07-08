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
    /**
     * 创建的时候需要一个characterObj，当把角色的部件拿出来放到别的舞台，比如餐桌上，就需要设置offPos为了确保位置了
     * @param {CharacterObj} chaObj 生存的角色是谁的
     * @param {number} offPosX 当把角色的部件拿出来放到别的舞台，比如餐桌上，就需要设置offPos为了确保位置了
     * @param {number} offPosY 当把角色的部件拿出来放到别的舞台，比如餐桌上，就需要设置offPos为了确保位置了
     */
    function CharacterSprite(chaObj, offPosX, offPosY) {
        if (offPosX === void 0) { offPosX = 0; }
        if (offPosY === void 0) { offPosY = 0; }
        var _this = _super.call(this) || this;
        _this.currentFrame = 0; //当前动画帧
        _this.character = chaObj;
        _this.cInfo = _this.character.GetCharacterActionInfo();
        _this.ingredientPoint = new egret.Point(0, 0);
        _this.offPosX = offPosX;
        _this.offPosY = offPosY;
        return _this;
    }
    CharacterSprite.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    CharacterSprite.prototype.init = function () {
        this.CreateSpriteClipByInfo();
        this.ChangeAction(Direction.Down, CharacterAction.Stand);
        this.ResetSprites();
        this.SetImageFrame();
    };
    //创建每个部件
    CharacterSprite.prototype.CreateSpriteClipByInfo = function () {
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
    //设置图形到对应帧，以及改变他们的offset属性
    CharacterSprite.prototype.SetImageFrame = function (frameIndex) {
        if (frameIndex === void 0) { frameIndex = this.currentFrame; }
        this.currentFrame = frameIndex;
        var upperY = 0;
        if (!this.playingActionInfo)
            return;
        if (this.body) {
            this.body.x = this.offPosX;
            this.body.y = this.offPosY;
            this.body.ChangeToPreloadTexture(this.playingActionInfo[frameIndex].body);
            this.body.anchorOffsetX = Math.floor(this.body.width / 2);
            this.body.anchorOffsetY = this.body.height - this.cInfo.body_lower;
            this.body.scaleX = this.direction == Direction.Right ? -1 : 1;
            upperY = this.body.height - this.cInfo.body_upper - this.cInfo.body_lower;
        }
        if (this.head) {
            this.head.x = this.offPosX;
            this.head.y = this.offPosY;
            this.head.ChangeToPreloadTexture(this.playingActionInfo[frameIndex].head);
            this.head.anchorOffsetX = Math.floor(this.head.width / 2);
            this.head.anchorOffsetY = this.head.height + upperY - this.cInfo.head_lower;
            this.head.scaleX = this.direction == Direction.Right ? -1 : 1;
        }
        if (this.doingAction == CharacterAction.Eat && this.currentFrame < this.cInfo.eatIngredientPos.length && this.head) {
            this.hasIngredientPoint = true;
            this.ingredientPoint.x = -this.head.anchorOffsetX + this.cInfo.eatIngredientPos[this.currentFrame].x;
            this.ingredientPoint.y = -this.head.anchorOffsetY + this.cInfo.eatIngredientPos[this.currentFrame].y;
        }
        else {
            this.hasIngredientPoint = false;
        }
    };
    //返回是否达成一个loop了
    CharacterSprite.prototype.IncFrame = function () {
        this.currentFrame = (this.currentFrame + 1) % this.playingActionInfo.length;
        return this.currentFrame == 0;
    };
    /**
     * 更换动作和方向
     * @param {Direction} direction 转向的方向
     * @param {CharacterAction} action 角色动作
     * @param {boolean} forceChange 是否强制转换动作
     */
    CharacterSprite.prototype.ChangeAction = function (direction, action, forceChange) {
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
     * @param {Direction} direction 转向的方向
     * @param {CharacterAction} action 角色动作
     * @returns {number} 这个动作的帧数
     */
    CharacterSprite.prototype.GetActionFrameCount = function (direction, action) {
        var toAction = this.cInfo.GetFrameInfoArray(direction, action);
        if (toAction != null) {
            return toAction.length * RenderUpdateEveryLogicTick; //动作长度其实依赖于渲染
        }
        return 0;
    };
    //TODO 特殊处理眨眼和站立，我曹
    CharacterSprite.prototype.IsSameAction = function (a1, a2) {
        if ((a1 == CharacterAction.Stand && a2 == CharacterAction.StandTrick) ||
            (a1 == CharacterAction.StandTrick && a2 == CharacterAction.Stand))
            return true;
        return a1 == a2;
    };
    /**
     * 判断角色是否在做某个动作
     * @param {CharacterAction} action 要判断的动作
     * @returns {boolean} 是否是正在做的
     */
    CharacterSprite.prototype.IsDoingAction = function (action) {
        return action == this.doingAction;
    };
    /**
     * 把head\body等精灵加回到这里。
     */
    CharacterSprite.prototype.ResetSprites = function () {
        //注意加入顺序
        if (this.body)
            this.addChild(this.body);
        if (this.head)
            this.addChild(this.head);
        if (this.emote)
            this.addChild(this.emote);
    };
    CharacterSprite.prototype.IsCharacter = function (cha) {
        return this.character == cha;
    };
    CharacterSprite.prototype.Update = function () {
        this.SetImageFrame(); //绘制这一帧
        //推进一帧
        if (this.IncFrame() == true && this.IsSameAction(this.doingAction, CharacterAction.Stand) == true) {
            //特殊处理站立的下一个站立的动作
            this.ChangeAction(this.direction, (Math.random() < 0.2 ? CharacterAction.StandTrick : CharacterAction.Stand), true);
        }
    };
    return CharacterSprite;
}(SpriteGroup));
__reflect(CharacterSprite.prototype, "CharacterSprite");
//# sourceMappingURL=CharacterSprite.js.map