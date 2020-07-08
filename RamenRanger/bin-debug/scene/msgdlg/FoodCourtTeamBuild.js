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
var FoodCourtTeamBuild = (function (_super) {
    __extends(FoodCourtTeamBuild, _super);
    function FoodCourtTeamBuild() {
        var _this = _super.call(this) || this;
        _this.canControl = false;
        _this.floorY = 400;
        _this.carHeight = 20;
        _this.uiPosY = 480; //下方UI的y坐标
        _this.team = new Array();
        return _this;
    }
    FoodCourtTeamBuild.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    FoodCourtTeamBuild.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    FoodCourtTeamBuild.prototype.init = function () {
        var _this = this;
        this.InitBKG();
        //TODO buddy随机产生先
        this.buddyForSelect = new Array();
        for (var i = 0; i < 22; i++) {
            var buddy = new FoodCourtBuddy();
            this.buddyForSelect.push(buddy);
        }
        this.EnterSelectBuddyState();
        var t = new egret.Timer(90);
        t.addEventListener(egret.TimerEvent.TIMER, function () {
            _this.Update();
        }, this);
        t.start();
    };
    FoodCourtTeamBuild.prototype.InitBKG = function () {
        var storeY = this.floorY;
        this.car = new eui.Image();
        this.car.texture = RES.getRes("bus_default_paint");
        this.addChild(this.car);
        this.car.anchorOffsetX = this.car.width / 2;
        this.car.anchorOffsetY = this.car.height;
        this.car.scaleX = -1; //TODO 就先转转
        this.car.x = this.stage.stageWidth / 2;
        this.car.y = storeY;
        this.carDoorX = this.stage.stageWidth / 2 - 80;
        this.Rect_Hunger.width = 0;
        //主角
        this.mc = new CharacterObj("schoolgirl", new FoodCourtBuddy(true));
        this.mainCharacter = new CharacterSprite(this.mc);
        this.mainCharacter.x = this.stage.stageWidth / 2;
        this.mainCharacter.y = this.floorY;
        this.addChild(this.mainCharacter);
        //饱食度条子
        this.HungerBarTweens();
    };
    FoodCourtTeamBuild.prototype.EnterSelectBuddyState = function () {
        var _this = this;
        if (!this.ui_selectBuddyList) {
            this.ui_selectBuddyList = new FoodCourt_SelectBuddyList(this, this.buddyForSelect, 5, this.BuddySelectBehaveFunc, this.BuddySelectDoneEve);
        }
        this.addChild(this.ui_selectBuddyList);
        this.ui_selectBuddyList.y = this.stage.stageHeight;
        this.ui_selectBuddyList.height = this.stage.stageHeight - this.uiPosY;
        egret.Tween.removeTweens(this.ui_selectBuddyList);
        egret.Tween.get(this.ui_selectBuddyList)
            .to({ y: this.uiPosY }, 300, egret.Ease.quadIn)
            .call(function () {
            _this.canControl = true;
        });
    };
    /**
     * 选中或者反选小弟之后的表演
     * @param {FoodCourtTeamBuild} thisObj 这个对象
     * @param {Array<FoodCourtBuddy>} buddy 选中或者反选的小弟
     * @param {boolean} addToTeam 是否添加到队伍，否的话就是从队伍移除
     */
    FoodCourtTeamBuild.prototype.BuddySelectBehaveFunc = function (thisObj, buddy, addToTeam) {
        //TODO 小弟选中和被移除的表现
        thisObj.canControl = false;
        if (addToTeam == true) {
            thisObj.CreateChaAndMoveToCar(buddy);
        }
        else {
            thisObj.CreateChaAndMoveOutside(buddy);
        }
    };
    FoodCourtTeamBuild.prototype.CreateChaAndMoveToCar = function (buddy) {
        var _this = this;
        this.team.push(buddy);
        var chaStartX = -100;
        var carHeight = this.carHeight;
        var inTime = (this.carDoorX - chaStartX) / 400 * 1000; //每秒移动400像素
        this.npc = new CharacterObj(buddy.body, buddy);
        this.npcSpr = new CharacterSprite(this.npc);
        this.npcSpr.x = chaStartX;
        this.npcSpr.y = this.floorY;
        this.addChild(this.npcSpr);
        egret.Tween.get(this.npcSpr)
            .call(function () {
            _this.npcSpr.ChangeAction(Direction.Right, CharacterAction.Walk);
        })
            .to({ x: this.carDoorX }, inTime)
            .call(function () {
            _this.npcSpr.ChangeAction(Direction.Up, CharacterAction.Walk);
        })
            .to({ y: this.floorY - carHeight }, 250)
            .call(function () {
            _this.HungerBarTweens();
            _this.removeChild(_this.npcSpr);
            _this.npc = null;
            _this.npcSpr = null;
            _this.canControl = true;
        });
    };
    FoodCourtTeamBuild.prototype.CreateChaAndMoveOutside = function (buddy) {
        var _this = this;
        var bI = this.team.indexOf(buddy);
        if (bI >= 0) {
            this.team.splice(bI, 1);
        }
        var chaStartX = -100;
        var carHeight = this.carHeight;
        var inTime = (this.carDoorX - chaStartX) / 400 * 1000; //每秒移动400像素
        this.npc = new CharacterObj(buddy.body, buddy);
        this.npcSpr = new CharacterSprite(this.npc);
        this.npcSpr.x = this.carDoorX;
        this.npcSpr.y = this.floorY - this.carHeight;
        this.addChild(this.npcSpr);
        egret.Tween.get(this.npcSpr)
            .call(function () {
            _this.npcSpr.ChangeAction(Direction.Down, CharacterAction.Walk);
        })
            .to({ y: this.floorY }, 250)
            .call(function () {
            _this.npcSpr.ChangeAction(Direction.Left, CharacterAction.Walk);
        })
            .to({ x: chaStartX }, inTime)
            .call(function () {
            _this.HungerBarTweens();
            _this.removeChild(_this.npcSpr);
            _this.npcSpr = null;
            _this.npc = null;
            _this.canControl = true;
        });
    };
    FoodCourtTeamBuild.prototype.CurrentHunger = function () {
        var res = PlayerBaseHunger;
        for (var i = 0; i < this.team.length; i++) {
            res += this.team[i].hunger;
        }
        return res;
    };
    FoodCourtTeamBuild.prototype.HungerBarTweens = function () {
        var tv = this.CurrentHunger();
        var tW = tv * 1.5;
        var inTime = Math.abs(tW - this.Rect_Hunger.width) / 100 * 1000;
        egret.Tween.removeTweens(this.Rect_Hunger);
        egret.Tween.get(this.Rect_Hunger)
            .to({ width: tW }, inTime, egret.Ease.quadIn);
    };
    /**
     * 点击确定之后的事件
     * @param {FoodCourtTeamBuild} thisObj 这个对象
     * @param {Array<FoodCourtBuddy>} team 所有选中的小弟
     */
    FoodCourtTeamBuild.prototype.BuddySelectDoneEve = function (thisObj, team) {
        thisObj.team = team;
        thisObj.LeaveBuddySelectEnterHeroSelect();
    };
    FoodCourtTeamBuild.prototype.LeaveBuddySelectEnterHeroSelect = function () {
        var _this = this;
        this.canControl = false;
        egret.Tween.removeTweens(this.ui_selectBuddyList);
        egret.Tween.get(this.ui_selectBuddyList)
            .to({ y: this.stage.stageHeight }, 300, egret.Ease.quadOut)
            .call(function () {
            _this.StartTravel();
        });
    };
    //开始探索模式
    FoodCourtTeamBuild.prototype.StartTravel = function () {
        var _this = this;
        this.canControl = false;
        this.Group_HungerBar.visible = false;
        var mInTime = Math.abs(this.mainCharacter.x - this.carDoorX) / 300 * 1000;
        egret.Tween.removeTweens(this.mainCharacter);
        egret.Tween.get(this.mainCharacter)
            .call(function () {
            _this.mainCharacter.ChangeAction(_this.carDoorX > _this.mainCharacter.x ? Direction.Right : Direction.Left, CharacterAction.Walk);
        })
            .to({ x: this.carDoorX }, mInTime)
            .call(function () {
            _this.mainCharacter.ChangeAction(Direction.Up, CharacterAction.Walk);
        })
            .to({ y: this.floorY - this.carHeight }, 150)
            .call(function () {
            _this.mainCharacter.parent.removeChild(_this.mainCharacter);
            var carTargetX = 1500;
            var inTime = (carTargetX - _this.car.x) / 500 * 1000;
            egret.Tween.removeTweens(_this.car);
            egret.Tween.get(_this.car)
                .to({ x: 1500 }, inTime, egret.Ease.quadIn)
                .call(function () {
                //离开场景，进入履行了
                if (!GameScene_FoodCourt) {
                    GameScene_FoodCourt = new HorizontalFoodCourt(_this.team);
                }
                Utils.UIRoot.addChild(GameScene_FoodCourt);
                _this.parent.removeChild(_this);
            });
        });
    };
    FoodCourtTeamBuild.prototype.Update = function () {
        if (this.npcSpr) {
            this.npcSpr.Update();
        }
        if (this.mainCharacter) {
            this.mainCharacter.Update();
        }
    };
    return FoodCourtTeamBuild;
}(eui.Component));
__reflect(FoodCourtTeamBuild.prototype, "FoodCourtTeamBuild", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=FoodCourtTeamBuild.js.map