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
var TrafficLight = (function (_super) {
    __extends(TrafficLight, _super);
    function TrafficLight() {
        var _this = _super.call(this) || this;
        _this.ticked = 0;
        return _this;
    }
    TrafficLight.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    TrafficLight.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    TrafficLight.prototype.init = function () {
        this.red.x =
            this.yellow.x =
                this.green.x =
                    this.seat.x = (this.width - this.seat.width) / 2;
        this.red.y =
            this.yellow.y =
                this.green.y =
                    this.seat.y = (this.height - this.seat.height) / 2;
    };
    TrafficLight.prototype.LightOn = function (state) {
        if (state == this.state)
            return;
        this.state = state;
        this.ticked == 0;
    };
    TrafficLight.prototype.Draw = function (incFrame) {
        if (incFrame === void 0) { incFrame = true; }
        var darkAlpha = 0.3;
        this.red.alpha = this.state == TrafficLightState.Red ? 1 : darkAlpha;
        this.yellow.alpha = this.state == TrafficLightState.Yellow ? 1 : darkAlpha;
        var cTick = Math.floor(this.ticked / 2);
        this.green.alpha =
            (this.state == TrafficLightState.Green ||
                (this.state == TrafficLightState.GreenShine && (cTick % 2 == 0))) ?
                1 : darkAlpha;
        if (incFrame == true)
            this.ticked += 1;
    };
    /**
     * 当根据单元格确定了红绿灯的位置以后，y坐标是要有一个偏移的，读这个
     */
    TrafficLight.prototype.OffsetY = function () {
        return -2.5 * GridHeight; // - this.seat.height;
    };
    return TrafficLight;
}(eui.Component));
__reflect(TrafficLight.prototype, "TrafficLight", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=TrafficLight.js.map