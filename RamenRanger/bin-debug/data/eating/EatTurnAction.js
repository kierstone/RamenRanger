var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 首先我们把吃面的过程作为一个小游戏玩法，这样以后要扩展操作也简单
 * 只是吃面这个迷你游戏的每个回合要做些什么事情的数据结构
 */
var EatTurnAction = (function () {
    function EatTurnAction(eatIngredient, satisfy, badTaste) {
        if (badTaste === void 0) { badTaste = BadTaste.None; }
        this.eatIngredient = eatIngredient;
        this.satisfy = satisfy;
        this.badTaste = badTaste;
    }
    /**
     * 根据这个回合的结果，算出需要做的动作序列
     * @param {CharacterObj} cha 针对这个角色而算出的列表，因为要依赖动作长度
     */
    EatTurnAction.prototype.GatherActionList = function (cha) {
        var res = new Array();
        //吃的动作
        res.push(new EatingAction(cha.GetActionFrameCount(cha.direction, CharacterAction.Eat), CharacterAction.Eat));
        //咀嚼
        res.push(new EatingAction(cha.GetActionFrameCount(cha.direction, CharacterAction.Chew), CharacterAction.Chew));
        //如果恶心了，那么就做恶心的动作，否则就是根据高兴程度来
        var resAction = this.GetEatActionBySatisfy();
        res.push(new EatingAction(cha.GetActionFrameCount(cha.direction, resAction), resAction));
        return res;
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
//# sourceMappingURL=EatTurnAction.js.map