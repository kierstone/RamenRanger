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
var WelcomeScene = (function (_super) {
    __extends(WelcomeScene, _super);
    function WelcomeScene() {
        var _this = _super.call(this) || this;
        //随机地图需要的参数
        _this.gw = 8; //单元格这么大
        _this.gh = 8;
        _this.mapWidth = 0; //地图宽高多少单元格
        _this.mapHeight = 0;
        _this.roomCenters = new Array();
        return _this;
    }
    WelcomeScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    WelcomeScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    WelcomeScene.prototype.init = function () {
        var _this = this;
        this.Button_Ramen.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            Utils.UIRoot.addChild(new CraftNoodle());
            _this.parent.removeChild(_this);
        }, this);
        this.Button_Street.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            // if (!GameScene_FoodCourt){
            // 	GameScene_FoodCourt = new HorizontalFoodCourt();
            // }
            // Utils.UIRoot.addChild(GameScene_FoodCourt);
            Utils.UIRoot.addChild(new FoodCourtTeamBuild());
            _this.parent.removeChild(_this);
        }, this);
        this.Button_Test.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
        }, this);
    };
    //第一步，根据房间数，地图宽高，决定基本的地图信息
    WelcomeScene.prototype.Test_MapStep1 = function (roomCount, roomMaxWidth, roomMaxHeight) {
        if (roomMaxWidth === void 0) { roomMaxWidth = 20; }
        if (roomMaxHeight === void 0) { roomMaxHeight = 20; }
        var hRooms = Math.ceil(Math.sqrt(roomCount)); //横向多少个房间
        var vRooms = Math.ceil(roomCount / hRooms); //纵向多少个房间
        var restRooms = hRooms * vRooms - roomCount; //荣誉数量，也就代表每一行可以少生成多少个房间
    };
    return WelcomeScene;
}(eui.Component));
__reflect(WelcomeScene.prototype, "WelcomeScene", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=WelcomeScene.js.map