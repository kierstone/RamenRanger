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
var TestScene = (function (_super) {
    __extends(TestScene, _super);
    function TestScene(ramen) {
        var _this = _super.call(this) || this;
        //From Street
        _this.toUpdateTicker = 0;
        _this.tick = 0;
        _this.chaRefTicker = 0;
        _this.zOrderBase = 10000; //在重新计算zOrder时，加上这个数字
        // private ramen:RamenSpriteClip;
        _this.timeScale = 1;
        _this.ramenObj = new RamenObj(ramen);
        return _this;
    }
    TestScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    TestScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.sprites = new Array();
        this.init();
    };
    TestScene.prototype.init = function () {
        //this.PlaceCharacter("schoolgirl", 150, 450);
        var _this = this;
        this.actor = new CharacterObj("schoolgirl", new FoodCourtBuddy());
        this.PlaceTable(350, 500);
        for (var i = 0; i < 3; i++) {
            var _actor = new CharacterObj("schoolgirl", new FoodCourtBuddy());
            var _ramen = this.ramenObj.Clone(false);
            this.diningTable.SetCharacterToSeat(i, _actor, EatGameType.EatNoodle);
            this.diningTable.PlaceRamenToSeat(i, _ramen);
        }
        this.RearrangeSpritesZOrder();
        this.HSilder_Size.addEventListener(egret.Event.CHANGE, function () {
            var toSize = _this.HSilder_Size.value * 0.05 + 1;
            _this.ChangeShowSize(toSize);
            _this.Label_Size.text = toSize.toFixed(2).toString();
        }, this);
        this.Button_Start.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.diningTable) {
                _this.diningTable.StartEat();
            }
        }, this);
        //开启一个update和fixedUpdate的计时器
        var t = new egret.Timer(Utils.TickTime * this.timeScale);
        t.addEventListener(egret.TimerEvent.TIMER, function () {
            _this.Update();
            _this.RearrangeSpritesZOrder(); //ZOrder每个逻辑tick都会重新排列，所以FixedUpdate中可以不用
            _this.tick += 1;
            _this.toUpdateTicker = (_this.toUpdateTicker + 1) % 3;
        }, this);
        t.start();
    };
    TestScene.prototype.ChangeShowSize = function (toScale) {
        if (toScale === void 0) { toScale = 1.0; }
        this.gameLayer.scaleX = this.gameLayer.scaleY = toScale;
        this.gameLayer.x = (this.stage.stageWidth - this.gameLayer.width * this.gameLayer.scaleX) / 2;
        this.gameLayer.y = (800 - this.gameLayer.height * this.gameLayer.scaleY) / 2;
    };
    //用于动画刷新的Update
    TestScene.prototype.Update = function () {
        //角色的
        //this.actor.Update();
        if (this.diningTable) {
            this.diningTable.Update();
        }
    };
    //重新排序zOrder
    TestScene.prototype.RearrangeSpritesZOrder = function () {
        if (!this.sprites || this.sprites.length <= 0)
            return;
        this.sprites.sort(function (a, b) {
            var needBack = a.NeedToSendMeBack(b);
            return (needBack == true) ? -1 : 1;
        });
        for (var i = 0; i < this.sprites.length; i++) {
            var ts = this.sprites[i];
            ts.zIndex = i + this.zOrderBase;
        }
        this.gameLayer.sortChildren();
    };
    //放一个角色，这里的x,y都是像素级
    TestScene.prototype.PlaceCharacter = function (key, x, y) {
        if (key === void 0) { key = "schoolgirl"; }
        this.actor = new CharacterObj("schoolgirl", new FoodCourtBuddy());
        var aImg = new CharacterSprite(this.actor);
        aImg.x = x;
        aImg.y = y;
        this.gameLayer.addChild(aImg);
        this.sprites.push(aImg);
    };
    //放一张桌子，这里可不管能不能放的下，只管放上去的
    TestScene.prototype.PlaceTable = function (x, y) {
        this.diningTable = new DiningTableSprite(new DiningTableObj(new DiningTableModel("wooden_single_table", [
            new DiningSeatInfo("wooden_chair", 0, -50, 0, -24),
            new DiningSeatInfo("wooden_chair", -75, -50, -75, -24),
            new DiningSeatInfo("wooden_chair", 75, -50, 75, -24),
        ], 240, new egret.Rectangle(30, 0, 10, 10))), EatGameType.EatNoodle);
        this.gameLayer.addChild(this.diningTable);
        this.diningTable.x = x;
        this.diningTable.y = y;
    };
    return TestScene;
}(eui.Component));
__reflect(TestScene.prototype, "TestScene", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=TestScene.js.map