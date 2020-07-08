var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FoodCourtBuddy = (function () {
    function FoodCourtBuddy(isPlayer) {
        if (isPlayer === void 0) { isPlayer = false; }
        this.isPlayer = false;
        this.isPlayer = isPlayer;
        this.RandomOne();
    }
    FoodCourtBuddy.prototype.RandomOne = function () {
        this.portrait = new RandomPortrait(this.favourType);
        this.favourType = Utils.RandomInt(0, 3);
        this.favourLevel = Utils.RandomInt(3, 10);
        this.hunger = Utils.RandomInt(30, 45);
        this.body = "schoolgirl";
    };
    return FoodCourtBuddy;
}());
__reflect(FoodCourtBuddy.prototype, "FoodCourtBuddy");
//# sourceMappingURL=FoodCourtBuddy.js.map