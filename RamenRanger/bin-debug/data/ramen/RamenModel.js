var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//虽然叫model，但并不来自表，这个model是玩家制作的时候调整出来的，生成RamenObj用的
var RamenModel = (function () {
    function RamenModel() {
        this.tare = new Array();
        this.topping = new Array();
        this.reciptId = "";
    }
    /**
     * 是否还能添加新的浇头
     * @returns {boolean} 是否还能
     */
    RamenModel.prototype.CanAddTopping = function () {
        return this.topping.length < this.bowl.model.cost;
    };
    /**
     * 是否可以在某个位置加入某个食材，这里的坐标是对应于碗的中心点的
     * @param {IngredientObj} topping 浇头
     * @returns {boolean} 是否可以放
     */
    RamenModel.prototype.CanPlaceTopping = function (topping) {
        //判断是否在范围，不在就不行了
        var br = this.bowl.model.radius - topping.model.radius;
        var x = topping.x;
        var y = topping.y;
        if (x * x + y * y > br * br)
            return false; //如果放到碗外面，那断然是不行的
        //没有在碗的外面，就判断重叠
        for (var i = 0; i < this.topping.length; i++) {
            var tc = this.topping[i];
            if (tc.model.radius <= 0)
                continue;
            if (Math.pow(tc.x - x, 2) + Math.pow(tc.y - y, 2) <= Math.pow(tc.model.radius + topping.model.radius, 2))
                return false;
        }
        //可以放（这里只负责位置）
        return true;
    };
    /**
     * 判断坐标点在哪个Topping上了
     * @param {number} x 坐标点x
     * @param {number} y 坐标点y
     * @param {number} thisX 拉面的x坐标
     * @param {number} thisY 拉面的y坐标
     * @param {boolean} removeTouchOne 是否从toppings里面移除掉这个
     * @returns {IngredientObj} 点中的那个，null代表没有
     */
    RamenModel.prototype.TouchedTopping = function (x, y, thisX, thisY, removeTouchOne) {
        if (!this.topping || this.topping.length <= 0)
            return null;
        //越后面的在越上面，越容易被点到
        for (var i = this.topping.length - 1; i >= 0; i--) {
            var tp = this.topping[i];
            if (tp.TouchOnMe(x, y, thisX, thisY) == true) {
                if (removeTouchOne == true) {
                    return this.topping.splice(i, 1)[0];
                }
                else {
                    return tp;
                }
            }
        }
        return null;
    };
    /**
     * 判断坐标点在哪个Tare上了
     * @param {number} x 坐标点x
     * @param {number} y 坐标点y
     * @param {number} thisX 拉面的x坐标
     * @param {number} thisY 拉面的y坐标
     * @param {boolean} removeTouchOne 是否从tare里面移除掉这个
     * @returns {IngredientObj} 点中的那个，null代表没有
     */
    RamenModel.prototype.TouchedTare = function (x, y, thisX, thisY, removeTouchOne) {
        if (!this.tare || this.tare.length <= 0)
            return null;
        //越后面的在越上面，越容易被点到
        for (var i = this.tare.length - 1; i >= 0; i--) {
            var tp = this.tare[i];
            if (tp.TouchOnMe(x, y, thisX, thisY) == true) {
                if (removeTouchOne == true) {
                    return this.tare.splice(i, 1)[0];
                }
                else {
                    return tp;
                }
            }
        }
        return null;
    };
    return RamenModel;
}());
__reflect(RamenModel.prototype, "RamenModel");
var RamenObj = (function () {
    function RamenObj(model) {
        this.noodlePercentage = 1; //0-1 as 0%-100%
        this.brothPercentage = 1;
        this.topping = new Array();
        if (model)
            this.SetModel(model);
    }
    RamenObj.prototype.SetModel = function (model) {
        if (!model)
            return;
        this.model = model;
        this.topping = new Array();
        for (var i = 0; i < this.model.topping.length; i++) {
            this.topping.push(this.model.topping[i].Clone());
        }
    };
    return RamenObj;
}());
__reflect(RamenObj.prototype, "RamenObj");
//# sourceMappingURL=RamenModel.js.map