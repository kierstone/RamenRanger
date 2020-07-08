var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 把吃拉面的过程，当做是一个小游戏
 * 每一个回合计算当前的情况，并确定表演，同时表演时间决定到下一个回合的时间
 * 这样之后有玩法就可以插入到这里
 * 而吃拉面的相关属性也放在这里，并不放在角色里，角色是一个被读取用的数据源
 */
var EatingRamen = (function () {
    /**
     * @param {CharacterObj} cha 谁吃面
     * @param {RamenObj} ramen 吃的什么面
     * @param {FoodCourtDishObj} dishInfo 要吃的食物，可以是null，毕竟只有小吃街才有
     * @param {boolean} favour 是否喜欢，如果是美食街，应该有喜欢不喜欢，否则根据算出来的计算
     */
    function EatingRamen(cha, ramen, dishInfo, gameType) {
        //相关数据
        this.hungry = 100; //吃面的人的饥饿度，这个未来可以有算法，现在先100开始，到0就吃饱吃撑了
        this.heart = 0; //吃面开始到现在已经获得了多少爱心了
        this.finalAction = CharacterAction.Stand; //TODO 吃完以后要做的动作，先写死
        this.cha = cha;
        this.buddyInfo = cha.buddyInfo;
        this.ramen = ramen;
        this.gameType = gameType;
        this.learnedIngredientInfo = new Array();
        this.dishInfo = dishInfo;
        this.RunThisGame();
    }
    /**
     * 从头到尾模拟吃掉一碗面
     */
    EatingRamen.prototype.RunThisGame = function () {
        this.turnResult = new Array();
        this.toEatRamen = this.ramen.Clone(true);
        var turnId = 0;
        while (this.hungry > 0 && this.toEatRamen.HasFinished() == false) {
            //选择要吃啥
            var eatIng = this.ThisTurnEat(turnId);
            if (eatIng == null) {
                break; //TODO 没东西吃了，应该去后续状态
            }
            //根据吃的东西改变属性
            //根据吃的东西生成EatTurnAction和EatingAction
            var toEatIng = this.ramen.GetToppingByUniqueId(eatIng["ingredient"]);
            this.ThisTurnModify(turnId, toEatIng, eatIng["isNoodle"] == true, eatIng["noodleReduce"]);
            turnId += 1;
        }
    };
    /**
     * 从拉面里选出这回合吃啥，当然目前是测试的，今后要改规则
     * @returns {Object} {ingredient:string(IngredientObj.uniqueId), isNoodle:boolean, noodleReduce:number(吃了百分之多少)} 返回吃的东西以及是否是面条
     */
    EatingRamen.prototype.ThisTurnEat = function (turnId) {
        if (this.toEatRamen.HasFinished() == true)
            return null;
        var noodlePerTaste = Math.min((this.ramen.topping.length > 0 ? (1 / this.ramen.topping.length + 1) : 0.2), 0.2); //每一口吃掉多少
        if ((turnId % 2) == 1) {
            //奇数回合吃料优先，TODO 找出最想吃的
            var ingForEat = this.toEatRamen.GetRandomToppingForEat();
            if (this.toEatRamen.topping.length > 0 && ingForEat) {
                var sIndex = this.toEatRamen.topping.indexOf(ingForEat);
                return {
                    "ingredient": this.toEatRamen.topping.splice(sIndex, 1)[0].uniqueId,
                    "isNoodle": false,
                    "noodleReduce": 0
                };
            }
            else if (this.toEatRamen.noodlePercentage > 0) {
                this.toEatRamen.noodlePercentage -= noodlePerTaste; //TODO 先写死一口吃12%，应该来自于属性
                return {
                    "ingredient": this.toEatRamen.model.noodles.uniqueId,
                    "isNoodle": true,
                    "noodleReduce": noodlePerTaste
                };
            }
        }
        else {
            if (this.toEatRamen.noodlePercentage > 0) {
                this.toEatRamen.noodlePercentage -= noodlePerTaste; //TODO 先写死一口吃6%，应该来自于属性
                return {
                    "ingredient": this.toEatRamen.model.noodles.uniqueId,
                    "isNoodle": true,
                    "noodleReduce": noodlePerTaste
                };
            }
            else if (this.toEatRamen.topping.length > 0 && this.toEatRamen.GetRandomToppingForEat() != null) {
                var ingForEat = this.toEatRamen.GetRandomToppingForEat();
                var sIndex = this.toEatRamen.topping.indexOf(ingForEat);
                return {
                    "ingredient": this.toEatRamen.topping.splice(sIndex, 1)[0].uniqueId,
                    "isNoodle": false,
                    "noodleReduce": 0
                };
            }
        }
        return null;
    };
    //根据吃的东西改变属性，并且获得行为列表 TODO 都是临时写死的
    EatingRamen.prototype.ThisTurnModify = function (turnId, eatIng, isNoodle, noodleReducePercent) {
        this.hungry -= 1;
        switch (this.gameType) {
            case EatGameType.FoodCourt:
                {
                    this.turnResult.push(this.ThisTurnEatActionInFoodCourt(eatIng, isNoodle, noodleReducePercent));
                    this.ThisTurnIngGatherInFoodCourt(turnId, eatIng, isNoodle);
                }
                break;
            case EatGameType.EatNoodle:
                {
                    this.turnResult.push(this.ThisTurnInNormalEat(eatIng, isNoodle, noodleReducePercent));
                }
                break;
        }
    };
    //如果是在小吃街模式
    EatingRamen.prototype.ThisTurnEatActionInFoodCourt = function (eatIng, isNoodle, noodleReducePercent) {
        var satisify = this.buddyInfo.isPlayer == true ? 100 :
            ((this.dishInfo && this.buddyInfo.favourType == this.dishInfo.model.type) ?
                this.buddyInfo.favourLevel * 10 : 0);
        var badTaste = BadTaste.None;
        return new EatTurnAction(this.cha, eatIng, 0, isNoodle, noodleReducePercent, badTaste);
    };
    EatingRamen.prototype.ThisTurnIngGatherInFoodCourt = function (turnId, eatIng, isNoodle) {
        var favPlus = Utils.RandomInt(7, 14);
        var learnedChance = (this.dishInfo && this.buddyInfo.favourType == this.dishInfo.model.type) ?
            (this.buddyInfo.favourLevel * favPlus + 30) : 30; //基础习得率30%，喜欢吃就提高概率
        if (Utils.RandomInt(0, 100) + learnedChance < 100)
            return; //概率不够学会
        if (isNoodle == true) {
            //有可能学到汤底或者面条
            var mayLearn = new Array();
            //如果有可能学到汤
            var bro = this.dishInfo.BrothInReward();
            if (bro)
                mayLearn.push(bro);
            //如果有可能学到面条
            var nod = this.dishInfo.IngredientInReward(eatIng.model.id);
            if (nod)
                mayLearn.push(nod);
            //随机获得
            if (mayLearn.length <= 0)
                return;
            this.learnedIngredientInfo.push(new EatGameIngredientGatherInfo(turnId, mayLearn[Utils.GetRandomIndexFromArray(mayLearn.length, 1)[0]]));
        }
        else {
            var ingInfo = this.dishInfo.IngredientInReward(eatIng.model.id);
            if (ingInfo)
                this.learnedIngredientInfo.push(new EatGameIngredientGatherInfo(turnId, ingInfo));
        }
    };
    //正常吃面模式
    EatingRamen.prototype.ThisTurnInNormalEat = function (eatIng, isNoodle, noodleReducePercent) {
        var satisify = Math.round(Math.random() * 200 - 100);
        var badTaste = BadTaste.None;
        var ranRes = Math.random();
        if (ranRes >= 0.95) {
            badTaste = BadTaste.Hatred;
        }
        else if (ranRes >= 0.9) {
            badTaste = BadTaste.Disappointed;
        }
        else if (ranRes >= 0.85) {
            badTaste = BadTaste.Hot;
        }
        else if (ranRes >= 0.8) {
            badTaste = BadTaste.TooHeavy;
        }
        return new EatTurnAction(this.cha, eatIng, satisify, isNoodle, noodleReducePercent, badTaste);
    };
    return EatingRamen;
}());
__reflect(EatingRamen.prototype, "EatingRamen");
//吃东西玩法的类型
var EatGameType;
(function (EatGameType) {
    EatGameType[EatGameType["EatNoodle"] = 0] = "EatNoodle";
    EatGameType[EatGameType["FoodCourt"] = 1] = "FoodCourt";
})(EatGameType || (EatGameType = {}));
/**
 * 吃面玩法中，获得食材的提示
 */
var EatGameIngredientGatherInfo = (function () {
    function EatGameIngredientGatherInfo(atTurn, learnedIngredient) {
        this.atTurn = atTurn;
        this.learnedIngredient = learnedIngredient;
    }
    return EatGameIngredientGatherInfo;
}());
__reflect(EatGameIngredientGatherInfo.prototype, "EatGameIngredientGatherInfo");
//# sourceMappingURL=EatingRamen.js.map