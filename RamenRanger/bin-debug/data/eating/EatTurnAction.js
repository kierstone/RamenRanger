var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 首先我们把吃面的过程作为一个小游戏玩法，这样以后要扩展操作也简单
 * 只是吃面这个迷你游戏的每个回合要做些什么事情的数据结构
 */
var EatTurnAction = (function () {
    function EatTurnAction(cha, eatIngredient, satisfy, foodIsNoodle, noodleReducePercentage, badTaste) {
        this.eatIngredient = eatIngredient;
        this.satisfy = satisfy;
        this.badTaste = badTaste;
        this.isEatingNoodles = foodIsNoodle;
        this.noodleReducePercentage = noodleReducePercentage;
        this.cha = cha;
        this.cInfo = cha.GetCharacterActionInfo();
        this.GatherActionList();
    }
    /**
     * 根据这个回合的结果，算出需要做的动作序列
     */
    EatTurnAction.prototype.GatherActionList = function () {
        this.actions = new Array();
        //吃的动作
        var eatTimes = this.isEatingNoodles == true ? 3 : 1; //如果是面条则吃3下
        for (var i = 0; i < eatTimes; i++) {
            this.actions.push(new EatingAction(this.cInfo.GetActionFrameCount(Direction.Down, CharacterAction.Eat), CharacterAction.Eat));
        }
        //咀嚼2口
        for (var i = 0; i < 2; i++) {
            this.actions.push(new EatingAction(this.cInfo.GetActionFrameCount(Direction.Down, CharacterAction.Chew), CharacterAction.Chew));
        }
        //如果恶心了，那么就做恶心的动作，否则就是根据高兴程度来
        var resAction = this.GetEatActionBySatisfy();
        this.actions.push(new EatingAction(this.cInfo.GetActionFrameCount(Direction.Down, resAction), resAction));
        return this.actions;
    };
    //根据高兴程度获得吃这口面的结果
    EatTurnAction.prototype.GetEatActionBySatisfy = function () {
        if (this.badTaste != BadTaste.None) {
            //优先不爽的感觉
            switch (this.badTaste) {
                case BadTaste.Disappointed: return CharacterAction.Sigh;
                case BadTaste.Hatred: return CharacterAction.Hate;
                case BadTaste.Hot: return CharacterAction.Spicy;
                case BadTaste.TooHeavy: return CharacterAction.Salty;
            }
            return CharacterAction.Chew;
        }
        else if (this.satisfy > 80) {
            return CharacterAction.Smile;
        }
        else if (this.satisfy > 60) {
            return CharacterAction.Nod;
        }
        else if (this.satisfy < -90) {
            return CharacterAction.Hate;
        }
        else if (this.satisfy < -75) {
            return CharacterAction.Sigh;
        }
        else {
            return CharacterAction.Chew;
        }
    };
    return EatTurnAction;
}());
__reflect(EatTurnAction.prototype, "EatTurnAction");
/**
 * 吃东西的FixedUpdate的数据
 */
var EatingAction = (function () {
    //其他的比如喷出爱心等需要了再加
    function EatingAction(tick, toAction) {
        this.tick = tick;
        this.changeToAction = toAction;
    }
    return EatingAction;
}());
__reflect(EatingAction.prototype, "EatingAction");
//# sourceMappingURL=EatTurnAction.js.map