var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TrafficLight = (function () {
    function TrafficLight(x, y) {
        this.ticked = 0;
        this.init(x, y);
    }
    TrafficLight.prototype.init = function (x, y) {
        this.seat = new SpriteClip();
        this.seat.texture = RES.getRes("trafficlight");
        this.red = new SpriteClip();
        this.red.texture = RES.getRes("trafficlight_red");
        this.yellow = new SpriteClip();
        this.yellow.texture = RES.getRes("trafficlight_yellow");
        this.green = new SpriteClip();
        this.green.texture = RES.getRes("trafficlight_green");
        this.red.anchorOffsetX =
            this.green.anchorOffsetX =
                this.yellow.anchorOffsetX =
                    this.seat.anchorOffsetX = Math.floor(this.seat.width / 2);
        this.red.anchorOffsetY = this.seat.height + 3;
        this.green.anchorOffsetY = this.seat.height + 1;
        this.yellow.anchorOffsetY = this.seat.height + 2;
        this.seat.anchorOffsetY = this.seat.height;
        this.red.x =
            this.green.x =
                this.yellow.x =
                    this.seat.x = x;
        this.red.y = y + 3;
        this.green.y = y + 1;
        this.yellow.y = y + 2;
        this.seat.y = y;
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
    return TrafficLight;
}());
__reflect(TrafficLight.prototype, "TrafficLight");
//# sourceMappingURL=TrafficLight.js.map