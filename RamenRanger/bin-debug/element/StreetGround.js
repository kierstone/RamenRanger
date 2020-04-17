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
var StreetGround = (function (_super) {
    __extends(StreetGround, _super);
    function StreetGround(jsonFile) {
        var _this = _super.call(this) || this;
        _this.jsonFile = "";
        _this.jsonFile = jsonFile;
        return _this;
    }
    StreetGround.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    StreetGround.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    StreetGround.prototype.init = function () {
        this.LoadFromJson();
    };
    StreetGround.prototype.LoadFromJson = function () {
        var streetInfo = this.jsonFile;
        if (streetInfo == null) {
            console.error("No json found:", this.jsonFile);
            return;
        }
        var cY = 0;
        if (streetInfo["background"]) {
            var tf = streetInfo["background"]["img"];
            this.bkg.texture = RES.getRes(tf);
            this.bkg.x = 0;
            this.bkg.y = 0;
            cY += this.bkg.height;
            this.groundTop = cY;
        }
        if (streetInfo["restrant"]) {
            var fillT = streetInfo["restrant"]["fill"];
            var mW = GameMapWidth * GridWidth;
            var mH = GameMapHeight * GridHeight;
            this.ground.texture = RES.getRes(fillT);
            this.ground.x = 0;
            this.ground.y = cY;
            this.ground.width = mW;
            this.ground.height = mH;
            this.ground.fillMode = egret.BitmapFillMode.REPEAT;
            cY += mH;
            this.roadTop = cY;
        }
        if (streetInfo["road"]) {
            var fillT = streetInfo["road"]["fill"];
            var mW = GameMapWidth * GridWidth;
            this.roadHeightInGrid = streetInfo["road"]["height"];
            var mH = this.roadHeightInGrid * GridHeight;
            this.road.texture = RES.getRes(fillT);
            this.road.x = 0;
            this.road.y = cY;
            this.road.width = mW;
            this.road.height = mH;
            this.road.fillMode = egret.BitmapFillMode.REPEAT;
            cY += mH;
            this.streetTop = cY;
        }
        if (streetInfo["street"]) {
            var sideT = streetInfo["street"]["side"];
            var fillT = streetInfo["street"]["fill"];
            var mW = GameMapWidth * GridWidth;
            var sideH = 1 * GridHeight;
            var fillH = Math.max(this.stage.stageHeight - cY, (StreetHeight - 1) * GridHeight);
            this.streetside.texture = RES.getRes(sideT);
            this.streetside.x = 0;
            this.streetside.y = cY;
            this.streetside.width = mW;
            this.streetside.height = sideH;
            this.streetside.fillMode = egret.BitmapFillMode.REPEAT;
            cY += sideH;
            this.street.texture = RES.getRes(fillT);
            this.street.x = 0;
            this.street.y = cY;
            this.street.width = mW;
            this.street.height = fillH;
            this.street.fillMode = egret.BitmapFillMode.REPEAT;
            cY += sideH;
        }
    };
    return StreetGround;
}(eui.Component));
__reflect(StreetGround.prototype, "StreetGround", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=StreetGround.js.map