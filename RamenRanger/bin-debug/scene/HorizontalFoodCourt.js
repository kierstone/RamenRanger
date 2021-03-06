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
var HorizontalFoodCourt = (function (_super) {
    __extends(HorizontalFoodCourt, _super);
    function HorizontalFoodCourt(team) {
        var _this = _super.call(this) || this;
        _this.dtPosY = 600; //餐桌位置
        _this.hungry = 0;
        _this.hungerMax = 0;
        _this.canControl = true;
        _this.eating = false; //角色们是否正在吃东西
        _this.groundY = 400; //街道的地面坐标
        _this.uiPosY = 450; //下方UI的y坐标
        _this.uiOrderPosY = 650; //点菜的菜单y坐标
        _this.teamChaDis = 80; //角色之间距离
        _this.buddies = team;
        return _this;
    }
    HorizontalFoodCourt.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    HorizontalFoodCourt.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    HorizontalFoodCourt.prototype.init = function () {
        var _this = this;
        this.canControl = false;
        this.NewGame();
        // this.Button_Go.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
        // },this);
        var t = new egret.Timer(Utils.TickTime);
        t.addEventListener(egret.TimerEvent.TIMER, function () {
            _this.Update();
        }, this);
        t.start();
    };
    //根据要求开店，现在店里的内容都写死
    HorizontalFoodCourt.prototype.NewGame = function () {
        //初始化逻辑数据
        this.store = new Array();
        this.lastLearnedIngId = new Array();
        this.stepIndex = -1;
        this.hungry = 0;
        this.hungerMax = PlayerBaseHunger;
        for (var i = 0; i < this.buddies.length; i++) {
            this.hungerMax += this.buddies[i].hunger;
        }
        this.hungry = this.hungerMax;
        this.SetHungerBar(this.hungerMax, this.hungerMax);
        //根据写死的规则产生重要信息
        for (var i = 0; i < 10; i++) {
            var sCount = Utils.RandomInt(2, 3);
            var idx = Utils.GetRandomIndexFromArray(GameData_FoodCourtDish.length, sCount);
            var foods = new Array();
            for (var n = 0; n < idx.length; n++) {
                foods.push(new FoodCourtDishObj(GameData_FoodCourtDish[idx[n]]));
            }
            var fcStore = new FoodCourtStoreObj(foods);
            this.store.push(fcStore);
        }
        //刷新美术
        this.InitRender();
        //游戏状态
        this.ChaEnterSceneAndStartGame();
    };
    //角色走进场地，然后开始游戏，当然这时候UI也出来了
    HorizontalFoodCourt.prototype.ChaEnterSceneAndStartGame = function () {
        var _this = this;
        this.Group_Street.x = 0;
        var inTime = Math.abs(this.mainCharacter.x - this.stage.stageWidth / 2) / 400 * 1000;
        var _loop_1 = function (i) {
            this_1.teamSpr[i].ChangeAction(Direction.Right, CharacterAction.Walk);
            egret.Tween.removeTweens(this_1.teamSpr[i]);
            egret.Tween.get(this_1.teamSpr[i])
                .to({ x: this_1.CharacterTeamPosX(i) }, inTime)
                .call(function () {
                _this.teamSpr[i].ChangeAction(Direction.Down, CharacterAction.Stand);
                if (i == 0) {
                    _this.canControl = true;
                }
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.teamSpr.length; i++) {
            _loop_1(i);
        }
        if (!this.uiNormalMenu) {
            this.uiNormalMenu = new FoodCourt_NormalMenu(this);
            this.addChild(this.uiNormalMenu);
            this.uiNormalMenu.width = this.stage.stageWidth;
            this.uiNormalMenu.height = this.stage.stageHeight - this.uiPosY;
            this.uiNormalMenu.y = this.stage.stageHeight;
            //TODO 进入的动画
            egret.Tween.removeTweens(this.uiNormalMenu);
            egret.Tween.get(this.uiNormalMenu)
                .to({ y: this.uiPosY }, 300, egret.Ease.quadOut)
                .call(function () {
                _this.uiNormalMenu.ShowIngredientExp(_this.ingredientExp);
            });
        }
    };
    //一个角色应该处于街道的X坐标
    HorizontalFoodCourt.prototype.CharacterTeamPosX = function (chaIndex) {
        return this.stage.stageWidth / 2 - chaIndex * this.teamChaDis;
    };
    /**
     * 根据食物类型，获得对应事物的喜好者们
     * @param {FoodCourtDishType} ft 食物类型
     * @returns {Array<FoodCourtBuddy>} 喜欢的人列表
     */
    HorizontalFoodCourt.prototype.GetFavourGuyByDishType = function (ft) {
        var res = new Array();
        for (var i = 0; i < this.buddies.length; i++) {
            if (this.buddies[i].favourType == ft) {
                res.push(this.buddies[i]);
            }
        }
        return res;
    };
    /**
     * 是否还能吃得下这个食物
     * @param {FoodCourtDishObj} dish 要吃的东西
     * @returns {boolean} 是否还能吃得下
     */
    HorizontalFoodCourt.prototype.CanEatThisDish = function (dish) {
        return this.hungry /*+ dish.model.feed*/ <= this.hungerMax;
    };
    HorizontalFoodCourt.prototype.InitRender = function () {
        if (this.mainCharacter && this.mainCharacter.parent) {
            this.mainCharacter.parent.removeChild(this.mainCharacter);
        }
        this.Group_Street.removeChildren();
        //相关数据
        var startAt = 700;
        var storeDis = 350;
        var storeY = this.groundY;
        //背景
        var bkg = new eui.Image(RES.getRes("bkg_shanghai"));
        this.Group_Street.addChild(bkg);
        bkg.width = startAt * 2 + storeDis * this.store.length;
        bkg.height = storeY + 50;
        bkg.fillMode = egret.BitmapFillMode.REPEAT;
        //小吃店地面floor, TODO 今后应该随着店铺变化的吧
        var flr = new eui.Image(RES.getRes("floor_shanghai"));
        this.Group_Street.addChild(flr);
        flr.y = bkg.height;
        flr.width = bkg.width;
        flr.height = this.uiOrderPosY - storeY - 50;
        flr.fillMode = egret.BitmapFillMode.REPEAT;
        //店铺
        this.storeX = new Array();
        for (var i = 0; i < this.store.length; i++) {
            var img = new eui.Image();
            img.texture = RES.getRes(this.store[i].source);
            this.Group_Street.addChild(img);
            img.anchorOffsetX = img.width / 2;
            img.anchorOffsetY = img.height;
            img.scaleX = img.scaleY = 1.5; //TODO 写死
            img.x = startAt + i * storeDis;
            img.y = storeY;
            this.storeX.push(img.x);
        }
        //主角
        var chaStartX = -80;
        var mc = new CharacterObj("schoolgirl", new FoodCourtBuddy(true));
        this.mainCharacter = new CharacterSprite(mc);
        this.mainCharacter.x = chaStartX;
        this.mainCharacter.y = this.groundY;
        this.addChild(this.mainCharacter);
        this.teamSpr = new Array();
        this.teamSpr.push(this.mainCharacter);
        for (var i = 0; i < this.buddies.length; i++) {
            var cha = new CharacterObj(this.buddies[i].body, this.buddies[i]);
            var chaSpr = new CharacterSprite(cha);
            chaSpr.x = chaStartX - (i + 1) * this.teamChaDis;
            chaSpr.y = this.groundY;
            this.addChild(chaSpr);
            this.teamSpr.push(chaSpr);
        }
        //餐桌
        var seats = new Array();
        var sPosX = [0, -80, 80, -160, 160, -240, 240];
        for (var i = 0; i < sPosX.length; i++) {
            seats.push(new DiningSeatInfo("wooden_chair", sPosX[i], -50, sPosX[i], -24));
        }
        this.dTable = new DiningTableSprite(new DiningTableObj(new DiningTableModel("wooden_single_table", seats, 580, new egret.Rectangle(30, 0, 10, 10))), EatGameType.FoodCourt);
        this.addChild(this.dTable);
        this.dTable.x = this.stage.stageWidth / 2;
        this.dTable.y = this.dtPosY;
        this.dTable.visible = false;
        this.dtStagePos = new egret.Point(this.dTable.x, this.dTable.y);
        //学习的东西列表
        this.Scroller_IngLearn.y = this.stage.stageHeight;
        //this.Group_Ing.removeChildren();
        this.ingredientExp = new Array();
        //TEST
        // let img = new eui.Image("ui_craft_selected");
        // img.x = 100;
        // img.y = 100;
        // this.addChild(img);
        // this.Group_Street.addChild(img);
        // this.Group_Test.addChild(img);
    };
    HorizontalFoodCourt.prototype.ButtonGoEvent = function () {
        var _this = this;
        if (this.canControl == false)
            return;
        if (this.hungry <= 0)
            return;
        this.canControl = false;
        this.MoveToStepIndex(this.stepIndex + 1);
        if (this.uiNormalMenu) {
            egret.Tween.removeTweens(this.uiNormalMenu);
            egret.Tween.get(this.uiNormalMenu)
                .to({ y: this.uiOrderPosY }, 150, egret.Ease.quadOut)
                .call(function () {
                _this.uiNormalMenu.ShowIngredientExp(_this.ingredientExp);
            });
        }
    };
    //角色移动到某个格子
    HorizontalFoodCourt.prototype.MoveToStepIndex = function (index) {
        var _this = this;
        this.canControl = false;
        this.stepIndex = Math.min(this.store.length - 1, Math.max(this.stepIndex, index));
        var tarX = this.storeX[this.stepIndex] - this.stage.stageWidth / 2;
        var moveLen = tarX + this.Group_Street.x;
        var inTime = moveLen / 400 * 1000; //每秒移动400pixel
        for (var i = 0; i < this.teamSpr.length; i++) {
            this.teamSpr[i].ChangeAction(Direction.Right, CharacterAction.Walk);
        }
        egret.Tween.removeTweens(this.Group_Street);
        egret.Tween.get(this.Group_Street).to({ x: this.Group_Street.x - moveLen }, inTime)
            .call(function () {
            for (var i = 0; i < _this.teamSpr.length; i++) {
                _this.teamSpr[i].ChangeAction(Direction.Down, CharacterAction.Stand);
            }
            //进入店铺的UI切换了
            _this.EnterTheStall(_this.store[_this.stepIndex]);
            //this.addChild(new HorizontalFoodCourt_StoreUI(this, this.store[this.stepIndex]));
        }, this);
        //this.Update();
    };
    //进入一家店铺，然后出现菜单
    HorizontalFoodCourt.prototype.EnterTheStall = function (store) {
        var _this = this;
        this.dTable.visible = true;
        var _loop_2 = function (i) {
            var seatInfo = this_2.dTable.GetSeatInfoByIndex(i);
            if (seatInfo == null) {
                return "break";
            }
            var seatX = seatInfo.x + this_2.dTable.x;
            var seatY = seatInfo.y + this_2.dTable.y;
            var hMoveTime = Math.abs(seatX - this_2.teamSpr[i].x) / 400 * 1000;
            var vMoveTime = Math.abs(seatY - this_2.teamSpr[i].y) / 400 * 1000;
            egret.Tween.removeTweens(this_2.teamSpr[i]);
            egret.Tween.get(this_2.teamSpr[i])
                .call(function () {
                _this.teamSpr[i].ChangeAction(seatX > _this.teamSpr[i].x ? Direction.Right : Direction.Left, CharacterAction.Walk);
            })
                .to({ x: seatX }, hMoveTime)
                .call(function () {
                _this.teamSpr[i].ChangeAction(Direction.Down, CharacterAction.Walk);
            })
                .to({ y: seatY }, vMoveTime)
                .call(function () {
                _this.teamSpr[i].visible = false;
                _this.dTable.SetCharacterToSeat(i, _this.teamSpr[i].character, EatGameType.FoodCourt); //TODO....第三个参数
                //TODO 走到以后出菜单
                if (i == _this.teamSpr.length - 1) {
                    if (_this.uiNormalMenu) {
                        egret.Tween.removeTweens(_this.uiNormalMenu);
                        egret.Tween.get(_this.uiNormalMenu)
                            .to({ y: _this.stage.stageHeight }, 300, egret.Ease.quadIn)
                            .call(function () {
                            _this.StoreMenuIn(store);
                        });
                    }
                    else {
                        _this.StoreMenuIn(store);
                    }
                }
            });
        };
        var this_2 = this;
        //this.Button_Go.visible = false;
        for (var i = 0; i < this.teamSpr.length; i++) {
            var state_1 = _loop_2(i);
            if (state_1 === "break")
                break;
        }
    };
    //吃完了，离开这家店
    HorizontalFoodCourt.prototype.LeaveTheStore = function () {
        var _this = this;
        //先清理桌子
        this.dTable.RemoveAllEatings();
        var _loop_3 = function (i) {
            this_3.teamSpr[i].visible = true;
            var teamX = this_3.CharacterTeamPosX(i);
            var teamY = this_3.groundY + this_3.Group_Street.y;
            var hMoveTime = Math.abs(teamX - this_3.teamSpr[i].x) / 400 * 1000;
            var vMoveTime = Math.abs(teamY - this_3.teamSpr[i].y) / 400 * 1000;
            egret.Tween.removeTweens(this_3.teamSpr[i]);
            egret.Tween.get(this_3.teamSpr[i])
                .call(function () {
                _this.teamSpr[i].ChangeAction(Direction.Up, CharacterAction.Walk);
            })
                .to({ y: teamY }, vMoveTime)
                .call(function () {
                _this.teamSpr[i].ChangeAction(teamX > _this.teamSpr[i].x ? Direction.Right : Direction.Left, CharacterAction.Walk);
            })
                .to({ x: teamX }, hMoveTime)
                .call(function () {
                _this.teamSpr[i].ChangeAction(Direction.Down, CharacterAction.Stand);
                //出现等待移动的状态，以及界面更替
                if (i == _this.teamSpr.length - 1) {
                    _this.dTable.visible = false;
                    //面板退出
                    egret.Tween.removeTweens(_this.uiEatingState);
                    egret.Tween.get(_this.uiEatingState)
                        .to({ y: _this.stage.stageHeight }, 300, egret.Ease.quadIn);
                    //面板进入
                    egret.Tween.removeTweens(_this.uiNormalMenu);
                    egret.Tween.get(_this.uiNormalMenu)
                        .to({ y: _this.uiPosY }, 300, egret.Ease.quadOut)
                        .call(function () {
                        _this.uiNormalMenu.ShowIngredientExp(_this.ingredientExp);
                        _this.BackToStreet();
                    });
                }
            });
        };
        var this_3 = this;
        //每个角色还原
        for (var i = 0; i < this.teamSpr.length; i++) {
            _loop_3(i);
        }
    };
    //进入正常的等待状态
    HorizontalFoodCourt.prototype.BackToStreet = function () {
        if (this.IsGameOver() == false) {
            //this.Button_Go.visible = true;
            this.canControl = true;
        }
        else {
            //TODO game over了，该退出这个玩法了
            this.canControl = false;
            this.addChild(new HorizontalFoodCourt_EndToChallenge(this, this.ingredientExp));
        }
    };
    //判断是否结束了
    HorizontalFoodCourt.prototype.IsGameOver = function () {
        return (this.hungry <= 0 ||
            this.stepIndex >= this.store.length);
    };
    //进入店铺，菜单出现
    HorizontalFoodCourt.prototype.StoreMenuIn = function (store) {
        var _this = this;
        if (!this.uiStoreMenu) {
            this.uiStoreMenu = new FoodCourt_StoreMenu(this, store);
        }
        this.addChild(this.uiStoreMenu);
        this.uiStoreMenu.y = this.stage.stageHeight;
        this.uiStoreMenu.height = this.stage.stageHeight - this.uiOrderPosY;
        egret.Tween.removeTweens(this.uiStoreMenu);
        egret.Tween.get(this.uiStoreMenu)
            .to({ y: this.uiOrderPosY }, 300, egret.Ease.quadOut)
            .call(function () {
            _this.canControl = true;
        });
    };
    //给ui调用的吃的事件
    HorizontalFoodCourt.prototype.EatDish = function (caller, dish) {
        caller.canControl = false;
        //Show Dialog就完了
        caller._StartEatDish(dish);
    };
    /**
     * 点菜的菜单退出屏幕，食材经验条进入屏幕，然后开始吃
     */
    HorizontalFoodCourt.prototype._StartEatDish = function (dish) {
        var _this = this;
        this.canControl = false;
        var toHun = Math.max(this.hungry - dish.model.feed, 0);
        this.HungerBarTweenTo(this.hungry, toHun);
        this.hungry = toHun;
        var tweenTime = 250;
        egret.Tween.removeTweens(this.uiStoreMenu);
        egret.Tween.get(this.uiStoreMenu)
            .to({ y: this.stage.stageHeight }, tweenTime, egret.Ease.quadIn)
            .call(function () {
            egret.Tween.removeTweens(_this.Scroller_IngLearn);
            egret.Tween.get(_this.Scroller_IngLearn)
                .to({ y: _this.stage.stageHeight - _this.Scroller_IngLearn.height }, 100, egret.Ease.quadOut)
                .call(function () {
                //真正开始吃了
                _this.dTable.StartEat();
                _this.eating = true;
                if (_this.uiStoreMenu.parent)
                    _this.uiStoreMenu.parent.removeChild(_this.uiStoreMenu);
                _this.uiStoreMenu = null;
            });
        });
        if (!this.uiEatingState) {
            this.uiEatingState = new FoodCourt_EatingState(this);
            this.addChild(this.uiEatingState);
            this.uiEatingState.y = this.stage.stageHeight;
            this.uiEatingState.width = this.stage.stageWidth;
            this.uiEatingState.height = this.stage.stageHeight - this.uiOrderPosY;
        }
        egret.Tween.removeTweens(this.uiEatingState);
        egret.Tween.get(this.uiEatingState)
            .to({ y: this.uiOrderPosY }, tweenTime, egret.Ease.quadOut)
            .call(function () {
            _this.uiEatingState.ShowIngredientExp(_this.ingredientExp);
        });
    };
    /**
     * 给其他ui用的，选中一个dish，显示反应
     * @param {HorizontalFoodCourt} caller 会调用的thisObj
     * @param {FoodCourtDishObj} dish 准备要吃啥
     */
    HorizontalFoodCourt.prototype.SelectDish = function (caller, dish) {
        caller.SetHungerBar(caller.hungry, Math.max(0, caller.hungry - dish.model.feed));
        if (caller.dTable) {
            caller.dTable.PlaceDishToAllCharacter(dish);
        }
        for (var i = 0; i < caller.dTable.eatingCha.length; i++) {
            var ec = caller.dTable.eatingCha[i];
            if (ec.hasCha == false || !ec.chaSpr)
                continue; //没有角色就下一个
            if (ec.CharacterFavourDish() == false) {
                ec.chaSpr.ChangeAction(Direction.Down, CharacterAction.Stand);
            }
            else {
                ec.chaSpr.ChangeAction(Direction.Down, CharacterAction.Clap);
            }
        }
    };
    //每一帧检查，看看是不是要添加经验了
    HorizontalFoodCourt.prototype.CheckForIngredientLearn = function () {
        for (var i = 0; i < this.dTable.eatingCha.length; i++) {
            var li = this.dTable.eatingCha[i].CurrentTurnGatherIngredient();
            if (li) {
                var fX = this.dTable.eatingCha[i].seatInfo.x + this.dtStagePos.x;
                var fY = this.dTable.eatingCha[i].seatInfo.y + this.dtStagePos.y;
                this.AddIngredientExp(li, fX, fY);
            }
        }
    };
    // 在界面上添加Ingredient的经验值
    HorizontalFoodCourt.prototype.AddIngredientExp = function (ing, fromX, fromY) {
        var _this = this;
        var iHint = this.TryAddNewIngHint(ing.ingredientId, ing.broth); //不管新老，先找到
        //创建一个图标飞过去
        var ic;
        if (ing.broth == true) {
            var bm = GetBrothModelById(ing.ingredientId);
            ic = bm.IconShape(0, 0, 30);
            this.addChild(ic);
            ic.x = fromX;
            ic.y = fromY;
        }
        else {
            var im = GetIngredientModelById(ing.ingredientId);
            ic = new eui.Image();
            ic.texture = RES.getRes(im.icon);
            this.addChild(ic);
            ic.width = ic.height = 60;
            ic.anchorOffsetX = ic.width / 2;
            ic.anchorOffsetY = ic.height / 2;
            ic.x = fromX;
            ic.y = fromY;
        }
        var tarX = iHint.IconStageX();
        var tarY = iHint.IconStageY();
        var dis = Math.sqrt(Math.pow(tarX - fromX, 2) + Math.pow(tarY - fromY, 2));
        var inTime = dis / 300 * 1000;
        egret.Tween.get(ic)
            .to({ x: tarX, y: tarY }, inTime, egret.Ease.quartIn)
            .call(function () {
            iHint.IncreaseExp(ing.exp);
            _this.removeChild(ic);
            ic = null;
        });
    };
    //找到IngHint中对应ingredientId的那个，如果是Null就是还没有
    HorizontalFoodCourt.prototype.GetIngHintByIngredientId = function (ingId, broth) {
        for (var i = 0; i < this.ingredientExp.length; i++) {
            if (this.ingredientExp[i].ingredientInfo.ingredientId == ingId && this.ingredientExp[i].ingredientInfo.broth == broth) {
                return this.ingredientExp[i];
            }
        }
        return null;
    };
    //添加一个新的ingredient的hint，并且设置经验值为0
    HorizontalFoodCourt.prototype.TryAddNewIngHint = function (ingId, broth) {
        var oldOne = this.GetIngHintByIngredientId(ingId, broth);
        if (oldOne)
            return oldOne; //已经有了
        var ingh = new HorizontalFoodCourt_IngredientExp(new FoodCourtIngredient(ingId, 0, broth));
        this.ingredientExp.push(ingh);
        this.uiEatingState.AddIngredientExp(ingh);
        return ingh;
    };
    //满腹条
    HorizontalFoodCourt.prototype.HungerBarLength = function (v) {
        return v * 1.5;
    };
    /**
     * 设置满腹度条子
     * @param {number} fromHunger 从多少开始
     * @param {number} toHunger 到达多少为止
     */
    HorizontalFoodCourt.prototype.SetHungerBar = function (fromHunger, toHunger) {
        fromHunger = Math.min(this.hungerMax, Math.max(0, fromHunger));
        toHunger = Math.min(this.hungerMax, Math.max(0, toHunger));
        var dis = Math.abs(fromHunger - toHunger);
        this.Rect_HungerBack.width = this.HungerBarLength(this.hungerMax) + 4; //外边框2
        this.Rect_HungerNow.width = this.HungerBarLength(fromHunger);
        this.Rect_HungerMinus.width = this.HungerBarLength(dis);
        this.Rect_HungerMinus.anchorOffsetX = (fromHunger >= toHunger ? this.Rect_HungerMinus.width : 0);
        this.Rect_HungerMinus.x =
            this.Rect_HungerNow.x + this.Rect_HungerNow.width; // - 
        //(fromHunger < toHunger ? -1 : 1) * this.Rect_HungerMinus.width;
    };
    /**
     * 满腹条变化，我可不负责设置Hungry值
     * @param {number} fromHunger 从多少开始
     * @param {number} toHunger 到达多少为止
     */
    HorizontalFoodCourt.prototype.HungerBarTweenTo = function (fromHunger, toHunger) {
        this.SetHungerBar(fromHunger, toHunger);
        var inTime = Math.abs(fromHunger - toHunger) / 100 * 1000;
        egret.Tween.removeTweens(this.Rect_HungerNow);
        egret.Tween.removeTweens(this.Rect_HungerMinus);
        if (inTime > 0) {
            egret.Tween.get(this.Rect_HungerNow).to({ width: this.HungerBarLength(toHunger) }, inTime);
            egret.Tween.get(this.Rect_HungerMinus).to({ width: 0 }, inTime);
        }
    };
    HorizontalFoodCourt.prototype.Update = function () {
        //所有角色
        for (var i = 0; i < this.teamSpr.length; i++) {
            this.teamSpr[i].Update();
        }
        // //学习的东西
        // for (let i = 0; i < this.ingredientExp.length; i++){
        // 	this.ingredientExp[i].Update();
        // }
        //桌子
        if (this.dTable) {
            this.dTable.Update();
        }
        if (this.eating == true) {
            if (this.dTable.AllFinished() == true) {
                this.eating = false;
                this.LeaveTheStore();
            }
            else {
                this.CheckForIngredientLearn();
            }
        }
        //饱食度条子
        if (this.Rect_HungerMinus) {
            if (this.Rect_HungerMinus.alpha > 0) {
                this.Rect_HungerMinus.alpha -= 0.05;
            }
            else {
                this.Rect_HungerMinus.alpha = 1;
            }
        }
    };
    return HorizontalFoodCourt;
}(eui.Component));
__reflect(HorizontalFoodCourt.prototype, "HorizontalFoodCourt", ["eui.UIComponent", "egret.DisplayObject"]);
var FoodCourtGameState;
(function (FoodCourtGameState) {
    FoodCourtGameState[FoodCourtGameState["SelectBuddy"] = 0] = "SelectBuddy";
    FoodCourtGameState[FoodCourtGameState["SelectHero"] = 1] = "SelectHero";
    FoodCourtGameState[FoodCourtGameState["Moving"] = 2] = "Moving";
    FoodCourtGameState[FoodCourtGameState["EnterStall"] = 3] = "EnterStall";
    FoodCourtGameState[FoodCourtGameState["SelectDish"] = 4] = "SelectDish";
    FoodCourtGameState[FoodCourtGameState["Eating"] = 5] = "Eating";
    FoodCourtGameState[FoodCourtGameState["BackToStreet"] = 6] = "BackToStreet";
})(FoodCourtGameState || (FoodCourtGameState = {}));
//# sourceMappingURL=HorizontalFoodCourt.js.map