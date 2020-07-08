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
var DiningTableSprite = (function (_super) {
    __extends(DiningTableSprite, _super);
    //TODO桌子信息等
    function DiningTableSprite(dt, gameType) {
        var _this = _super.call(this) || this;
        _this.dtObj = dt;
        _this.gameType = gameType;
        _this.heads = new Array();
        _this.bodies = new Array();
        _this.emotes = new Array();
        _this.ramens = new Array();
        _this.eatIngs = new Array();
        return _this;
    }
    DiningTableSprite.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    DiningTableSprite.prototype.init = function () {
        //TODO 椅子写死
        this.chair = new Array(); //new eui.Image(RES.getRes("wooden_chair"));
        this.eatingCha = new Array();
        for (var i = 0; i < this.dtObj.model.seats.length; i++) {
            var sInfo = this.dtObj.model.seats[i];
            var se = new eui.Image();
            se.texture = RES.getRes(sInfo.source);
            this.addChild(se);
            se.anchorOffsetX = se.width / 2;
            se.anchorOffsetY = se.height / 2;
            se.x = this.dtObj.x + this.dtObj.model.seats[i].x;
            se.y = this.dtObj.y + this.dtObj.model.seats[i].y - 10; //TODO 写死椅子的位置
            this.chair.push(se);
            this.eatingCha.push(new EatingCharacterSpr(this, sInfo, this.gameType));
        }
        this.table = new eui.Image(); //RES.getRes("wooden_single_table")
        this.table.texture = RES.getRes(this.dtObj.model.tableSource);
        this.addChild(this.table);
        this.table.width = this.dtObj.model.tableWidth;
        this.table.anchorOffsetX = this.table.width / 2;
        this.table.anchorOffsetY = this.table.height;
        if (this.dtObj.model.useScale9 == true) {
            var rc = new egret.Rectangle(this.dtObj.model.tableScale9.x, 0, this.dtObj.model.tableScale9.width, this.table.height);
            this.table.scale9Grid = rc;
        }
    };
    DiningTableSprite.prototype.ResetZOrder = function () {
        var idxPlues = this.eatingCha.length + 10;
        if (this.chair) {
            for (var i = 0; i < this.chair.length; i++)
                this.chair[i].zIndex = 0 + i;
        }
        if (this.bodies) {
            for (var i = 0; i < this.bodies.length; i++)
                if (this.bodies[i])
                    this.bodies[i].zIndex = idxPlues * 2 + i;
        }
        if (this.table) {
            this.table.zIndex = idxPlues * 3;
        }
        if (this.ramens) {
            for (var i = 0; i < this.ramens.length; i++) {
                if (this.ramens[i])
                    this.ramens[i].zIndex = idxPlues * 4 + i;
            }
        }
        if (this.heads) {
            for (var i = 0; i < this.heads.length; i++) {
                if (this.heads[i])
                    this.heads[i].zIndex = idxPlues * 5 + i;
            }
        }
        if (this.emotes) {
            for (var i = 0; i < this.emotes.length; i++) {
                if (this.heads[i])
                    this.emotes[i].zIndex = idxPlues * 6 + i;
            }
        }
        if (this.eatIngs) {
            for (var i = 0; i < this.eatIngs.length; i++) {
                if (this.eatIngs[i])
                    this.eatIngs[i].zIndex = idxPlues * 7 + i;
            }
        }
        this.sortChildren();
    };
    /**
     * 开吃了
     */
    DiningTableSprite.prototype.StartEat = function () {
        for (var i = 0; i < this.eatingCha.length; i++) {
            if (this.eatingCha[i].eatGame)
                this.eatingCha[i].StartEat();
        }
    };
    /**
     * 现在的角色从椅子上挪走
     */
    DiningTableSprite.prototype.RemoveCharacter = function (seatIndex) {
        this.eatingCha[seatIndex].RemoveCharacter();
    };
    /**
     * 让角色做到凳子上，TODO，现在凳子数据写死
     */
    DiningTableSprite.prototype.SetCharacterToSeat = function (seatIndex, cha, gameType) {
        if (!cha)
            return;
        this.RemoveCharacter(seatIndex);
        if (seatIndex < 0 || seatIndex >= this.eatingCha.length)
            return;
        var eCha = this.eatingCha[seatIndex];
        eCha.SetCharacter(cha);
        this.ResetZOrder();
    };
    /**
     * 删除拉面
     */
    DiningTableSprite.prototype.RemoveRamen = function (seatIndex) {
        if (seatIndex < 0 || seatIndex >= this.eatingCha.length || !this.eatingCha[seatIndex])
            return;
        this.eatingCha[seatIndex].RemoveRamen();
    };
    /**
     * 上拉面
     */
    DiningTableSprite.prototype.PlaceRamenToSeat = function (seatIndex, ramen) {
        this.RemoveRamen(seatIndex);
        if (!ramen || seatIndex < 0 || seatIndex >= this.eatingCha.length)
            return;
        this.eatingCha[seatIndex].SetRamen(ramen);
        this.ResetZOrder();
    };
    /**
     * 获得某个SeatInfo
     */
    DiningTableSprite.prototype.GetSeatInfoByIndex = function (index) {
        if (index < 0 || index >= this.dtObj.model.seats.length)
            return null;
        return this.dtObj.model.seats[index];
    };
    /**
     * 给所有坐了人的位置，上一份指定的美食
     */
    DiningTableSprite.prototype.PlaceDishToAllCharacter = function (dish) {
        for (var i = 0; i < this.eatingCha.length; i++) {
            this.eatingCha[i].RemoveRamen();
            var rX = 0;
            var rY = 0;
            if (i < this.dtObj.model.seats.length) {
                rX = this.dtObj.model.seats[i].ramenX;
                rY = this.dtObj.model.seats[i].ramenY;
            }
            if (this.eatingCha[i].hasCha == true) {
                this.eatingCha[i].SetDish(dish);
            }
        }
    };
    /**
     * 移除所有食物和人
     */
    DiningTableSprite.prototype.RemoveAllEatings = function () {
        for (var i = 0; i < this.eatingCha.length; i++) {
            this.eatingCha[i].RemoveMe();
        }
    };
    /**
     * 是否所有角色都吃完了
     */
    DiningTableSprite.prototype.AllFinished = function () {
        for (var i = 0; i < this.eatingCha.length; i++) {
            if (this.eatingCha[i].hasRamen && this.eatingCha[i].IsFinished() == false) {
                return false;
            }
        }
        return true;
    };
    DiningTableSprite.prototype.Update = function () {
        for (var i = 0; i < this.eatingCha.length; i++) {
            this.eatingCha[i].Update();
        }
    };
    return DiningTableSprite;
}(SpriteGroup));
__reflect(DiningTableSprite.prototype, "DiningTableSprite");
/**
 * 每一个正在吃东西的角色，自动生成一个RamenSpr和一个CharacterSpr供上层使用
 */
var EatingCharacterSpr = (function () {
    function EatingCharacterSpr(p, seat, eatGameType) {
        this.eatting = false;
        this.runningTurnIndex = 0;
        this.runningActionIndex = 0;
        this.runningTick = 0;
        this.hasCha = false;
        this.hasRamen = false;
        this.noodlePos = new egret.Point(0, 0);
        this.seatInfo = seat;
        this.eatGameType = eatGameType;
        this._p = p;
    }
    /**
     * 角色坐到这个座位上
     * @param {CharacterObj} cha 要坐上来的角色
     */
    EatingCharacterSpr.prototype.SetCharacter = function (cha) {
        if (!cha)
            return;
        this.cha = cha;
        this.hasCha = true;
        this.chaSpr = new CharacterSprite(this.cha, this.seatInfo.x, this.seatInfo.y);
        this._p.addChild(this.chaSpr);
        if (this.chaSpr.head) {
            this._p.addChild(this.chaSpr.head);
            this._p.heads.push(this.chaSpr.head);
        }
        if (this.chaSpr.body) {
            this._p.addChild(this.chaSpr.body);
            this._p.bodies.push(this.chaSpr.body);
        }
        if (this.chaSpr.emote) {
            this._p.addChild(this.chaSpr.emote);
            this._p.emotes.push(this.chaSpr.emote);
        }
        this.GatherEatingGame();
    };
    /**
     * 移除掉这个座位上的角色
     */
    EatingCharacterSpr.prototype.RemoveCharacter = function () {
        if (this.hasCha == false)
            return;
        this.hasCha = false;
        if (this.chaSpr.head) {
            var idx = this._p.heads.indexOf(this.chaSpr.head);
            if (idx >= 0)
                this._p.heads.splice(idx, 1);
            if (this.chaSpr.head.parent)
                this.chaSpr.head.parent.removeChild(this.chaSpr.head);
        }
        if (this.chaSpr.body) {
            var idx = this._p.bodies.indexOf(this.chaSpr.body);
            if (idx >= 0)
                this._p.heads.splice(idx, 1);
            if (this.chaSpr.body.parent)
                this.chaSpr.body.parent.removeChild(this.chaSpr.body);
        }
        if (this.chaSpr.emote) {
            var idx = this._p.emotes.indexOf(this.chaSpr.emote);
            if (idx >= 0)
                this._p.emotes.splice(idx, 1);
            if (this.chaSpr.emote.parent)
                this.chaSpr.emote.parent.removeChild(this.chaSpr.emote);
        }
        if (this.chaSpr.parent)
            this.chaSpr.parent.removeChild(this.chaSpr);
        this.chaSpr = null;
        this.cha = null;
        this.eatGame = null;
    };
    /**
     * 根据RamenObj来设置EatGame的食物对象
     */
    EatingCharacterSpr.prototype.SetRamen = function (ramen) {
        if (!ramen)
            return;
        this.hasRamen = true;
        var atTableX = this.seatInfo.ramenX;
        var atTableY = this.seatInfo.ramenY;
        this.ramenObj = ramen;
        this.ramenSpr = new RamenSprite(this.ramenObj);
        if (this.ramenSpr) {
            this._p.addChild(this.ramenSpr);
            this._p.ramens.push(this.ramenSpr);
            this.ramenSpr.x = atTableX;
            this.ramenSpr.y = atTableY;
        }
        this.GatherEatingGame();
    };
    /**
     * 根据FoodCourtDish来设置EatGame食物对象
     */
    EatingCharacterSpr.prototype.SetDish = function (dish) {
        if (!dish || !dish.dish)
            return;
        this.hasRamen = true;
        var atTableX = this.seatInfo.ramenX;
        var atTableY = this.seatInfo.ramenY;
        this.ramenObj = dish.dish;
        this.ramenSpr = new RamenSprite(this.ramenObj);
        if (this.ramenSpr) {
            this._p.addChild(this.ramenSpr);
            this._p.ramens.push(this.ramenSpr);
            this.ramenSpr.x = atTableX;
            this.ramenSpr.y = atTableY;
        }
        this.GatherEatingGame(dish);
    };
    EatingCharacterSpr.prototype.GatherEatingGame = function (dishObj) {
        if (dishObj === void 0) { dishObj = null; }
        if (this.cha && this.ramenObj) {
            this.eatGame = new EatingRamen(this.cha, this.ramenObj, dishObj, this.eatGameType);
        }
    };
    /**
     * 顾客和面条全部移除掉
     */
    EatingCharacterSpr.prototype.RemoveMe = function () {
        this.RemoveCharacter();
        this.RemoveRamen();
    };
    /**
     * 拿走面条
     */
    EatingCharacterSpr.prototype.RemoveRamen = function () {
        if (this.ramenSpr && this.ramenSpr.parent) {
            var idx = this._p.ramens.indexOf(this.ramenSpr);
            if (idx >= 0)
                this._p.ramens.splice(idx, 1);
            this.ramenSpr.parent.removeChild(this.ramenSpr);
            this.ramenSpr = null;
        }
        this.ramenObj = null;
        this.hasRamen = false;
    };
    /**
     * 是否已经吃光了
     */
    EatingCharacterSpr.prototype.IsFinished = function () {
        if (!this.eatGame || !this.eatGame.turnResult)
            return true;
        return this.runningTurnIndex >= this.eatGame.turnResult.length;
    };
    /**
     * 本回合将要学到的食材信息
     */
    EatingCharacterSpr.prototype.CurrentTurnGatherIngredient = function () {
        if (!this.eatGame || !this.eatGame.learnedIngredientInfo || this.eatGame.learnedIngredientInfo.length <= 0)
            return null;
        for (var i = 0; i < this.eatGame.learnedIngredientInfo.length; i++) {
            if (i == this.runningTurnIndex) {
                return this.eatGame.learnedIngredientInfo[i].learnedIngredient;
            }
        }
        return null;
    };
    EatingCharacterSpr.prototype.Update = function () {
        if (this.eatting == true) {
            if (this.chaSpr && this.ramenSpr) {
                var tTurn = this.eatGame.turnResult[this.runningTurnIndex]; //当前的回合
                var tAction = tTurn.actions[this.runningActionIndex]; //当前在做的动作
                if (this.runningTick <= 0) {
                    if (this.runningActionIndex <= 0) {
                        //进入新的回合的第一个动作的第一帧，弄一下吃掉的东西
                        //碗里面的变化
                        if (tTurn.isEatingNoodles == true) {
                            this.ramenObj.noodlePercentage -= tTurn.noodleReducePercentage; //吃面条
                        }
                        else {
                            var ingIdx = this.ramenObj.topping.indexOf(tTurn.eatIngredient);
                            if (ingIdx >= 0) {
                                this.ramenObj.topping.splice(ingIdx, 1);
                            }
                        }
                        this.ramenSpr.UpdateRamen();
                        //正在吃的东西变化
                        this.eatingNoodle = tTurn.isEatingNoodles;
                        if (this.eatingNoodle == true) {
                            //如果吃的是面条
                            if (!this.eatingIngImg) {
                                this.eatingIngImg = new eui.Image();
                                this._p.addChild(this.eatingIngImg);
                                this._p.eatIngs.push(this.eatingIngImg);
                            }
                            this.eatingIngImg.source = RES.getRes("eating_noodle");
                            this.eatingIngImg.anchorOffsetX = this.eatingIngImg.width / 2;
                            this.eatingIngImg.anchorOffsetY = this.eatingIngImg.height;
                            this.eatingIngImg.x = this.ramenSpr.x;
                            this.eatingIngImg.y = this.ramenSpr.BrothOffsetY() + this.ramenSpr.y;
                            this.eatingIngImg.scaleY = 0;
                            this.noodlePos.y = Number.MAX_VALUE; //重置面条的位置
                        }
                        else {
                            //如果吃的是Toppings
                            if (this.eatingIngImg) {
                                var idx = this._p.eatIngs.indexOf(this.eatingIngImg);
                                if (idx >= 0)
                                    this._p.eatIngs.splice(idx, 1);
                                if (this.eatingIngImg.parent) {
                                    this.eatingIngImg.parent.removeChild(this.eatingIngImg);
                                }
                            }
                            this.eatingIngImg = tTurn.eatIngredient.GatherSceneImage(this._p, this.ramenSpr.x + tTurn.eatIngredient.x, this.ramenSpr.BrothOffsetY() + tTurn.eatIngredient.y);
                            this.eatingIngImg.scaleX = tTurn.eatIngredient.size * (tTurn.eatIngredient.xFlip == false ? 1 : -1);
                            this.eatingIngImg.scaleY = tTurn.eatIngredient.size;
                        }
                        this.eatingIngImg.visible = false;
                    }
                    //每回合的每一个action都要做的，而不是只在第一个action做的
                    //角色的动作也变化了
                    this.chaSpr.ChangeAction(this.chaSpr.direction, tAction.changeToAction);
                }
                //帧内需要做的事情
                //吃的东西
                if (this.eatingIngImg) {
                    var ingVisible = this.eatingNoodle == true ?
                        (
                        //如果是面条，则看动作是否是吃、并且面条已经被绘制了
                        this.chaSpr.IsDoingAction(CharacterAction.Eat) &&
                            (this.eatingIngImg.visible == true || this.chaSpr.hasIngredientPoint == true)) :
                        (
                        //吃的是toppings的话看的是有没有数据点
                        this.chaSpr.hasIngredientPoint == true);
                    if (ingVisible == true) {
                        var cX = this.seatInfo.x;
                        var cY = this.seatInfo.y;
                        if (this.eatingNoodle == false) {
                            //Topping跟着手的位置走
                            this.eatingIngImg.x = this.chaSpr.ingredientPoint.x + cX;
                            this.eatingIngImg.y = this.chaSpr.ingredientPoint.y + cY;
                        }
                        else {
                            //Noodle就拉伸
                            var noodleFlip = true; //是否要旋转面条
                            if (this.chaSpr.hasIngredientPoint == true) {
                                this.noodlePos.x = this.chaSpr.ingredientPoint.x + cX; //x坐标绝对信任
                                var noodlePosY = this.chaSpr.ingredientPoint.y + cY;
                                if (noodlePosY < this.noodlePos.y) {
                                    this.noodlePos.y = noodlePosY; //y取小的保持高度
                                    noodleFlip = false; //还在拉伸，所以不要抽搐
                                }
                            }
                            this.eatingIngImg.x = this.noodlePos.x;
                            var noodleScaleY = (this.eatingIngImg.y - this.noodlePos.y) / this.eatingIngImg.height;
                            this.eatingIngImg.scaleY = this.eatingIngImg.height > 0 ? noodleScaleY : 0;
                            if (noodleFlip == true)
                                this.eatingIngImg.scaleX *= -1;
                        }
                    }
                    this.eatingIngImg.visible = ingVisible;
                }
                //帧数提高
                this.runningTick += 1;
                if (this.runningTick >= tAction.tick) {
                    this.runningTick = 0;
                    this.runningActionIndex += 1;
                    if (this.runningActionIndex >= tTurn.actions.length) {
                        this.runningActionIndex = 0;
                        this.runningTurnIndex += 1;
                        if (this.runningTurnIndex >= this.eatGame.turnResult.length) {
                            //该结束了这个人的吃的过程了
                            this.eatting = false;
                            this.chaSpr.ChangeAction(this.chaSpr.direction, CharacterAction.Stand //吃完以后站立动作
                            );
                        }
                    }
                }
            }
        }
        //只要有角色就要变化
        if (this.chaSpr) {
            this.chaSpr.Update(); //角色动作变化
        }
    };
    /**
     * 开始吃
     */
    EatingCharacterSpr.prototype.StartEat = function () {
        if (!this.eatGame)
            return;
        this.runningTick = 0;
        this.runningActionIndex = 0;
        this.runningTurnIndex = 0;
        this.eatting = true;
    };
    return EatingCharacterSpr;
}());
__reflect(EatingCharacterSpr.prototype, "EatingCharacterSpr");
//# sourceMappingURL=DiningTableSprite.js.map