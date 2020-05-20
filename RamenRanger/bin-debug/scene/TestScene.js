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
        _this.zOrderBase = 10000; //在重新计算zOrder时，加上这个数字
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
        this.PlaceTable(new DiningTableModel(1, 1, "wooden_single_table", []), 350, 500);
        this.PlaceChair("wooden_chair", 350, 448, Direction.Down);
        this.PlaceCharacter("schoolgirl", 350, 450);
        this.PlaceRamen(350, 470);
        this.RearrangeSpritesZOrder();
    };
    //拉面
    TestScene.prototype.PlaceRamen = function (x, y) {
        this.ramen = new RamenSpriteClip(this.ramenObj);
        this.addChild(this.ramen);
        this.ramen.x = x;
        this.ramen.y = y;
        this.ramen.CreateRamen();
        this.sprites.push(this.ramen);
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
        var cha = new CharacterObj(GetCharacterActionInfoByKey(key), x, y, new CharacterProperty());
        cha.head.logicLayer = SpriteClipLayer.EatingHead; //这个是Street少的，就是要切换到吃面层
        this.gameLayer.addChild(cha.body);
        this.gameLayer.addChild(cha.head);
        this.sprites.push(cha.body);
        this.sprites.push(cha.head);
        return cha;
    };
    //放一张桌子，这里可不管能不能放的下，只管放上去的
    TestScene.prototype.PlaceTable = function (table, x, y) {
        var t = new DiningTableObj(table, x, y);
        this.gameLayer.addChild(t.Image);
        this.sprites.push(t.Image);
        //TODO桌子椅子连接状态等
    };
    //放一张椅子，也是只负责放下去，不负责判断能不能放
    TestScene.prototype.PlaceChair = function (chairSource, x, y, dir) {
        var c = new ChairObj(chairSource, x, y, dir);
        this.gameLayer.addChild(c.image);
        this.sprites.push(c.image);
    };
    return TestScene;
}(eui.Component));
__reflect(TestScene.prototype, "TestScene", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=TestScene.js.map