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
    /**
     * 随机创建一碗“拉面”
     * @param {BowlModel} bowl 用的碗的model，这个必须有
     * @param {BrothModel} broth 用的汤底，可以是null
     * @param {Array<IngredientModel>} tare 着味，可以是null
     * @param {IngredientModel} noodles 用的面条，可以是null
     * @param {Array<IngredientModel>} toppings 盖浇，当然也可以是null
     */
    RamenModel.prototype.RandomRamen = function (bowl, broth, tare, noodles, toppings) {
        if (!bowl)
            return;
        this.bowl = new BowlObj(bowl);
        if (broth) {
            this.broth = new BrothObj(broth);
        }
        if (tare) {
            for (var i = 0; i < tare.length; i++) {
                this.tare.push(new IngredientObj(tare[i]));
            }
        }
        if (noodles) {
            this.noodles = new IngredientObj(noodles);
        }
        if (toppings) {
            for (var i = 0; i < toppings.length; i++) {
                var pos = this.bowl.RandomPosInBowl();
                this.topping.push(new IngredientObj(toppings[i], pos.x, pos.y, Math.random() * 360));
            }
            this.topping.sort(function (t1, t2) {
                if (t1.y < t2.y) {
                    return -1;
                }
                else if (t1.y > t2.y) {
                    return 1;
                }
                else {
                    return t1.x <= t2.x ? -1 : 1;
                }
            });
        }
    };
    return RamenModel;
}());
__reflect(RamenModel.prototype, "RamenModel");
var RamenObj = (function () {
    function RamenObj(model, toppings) {
        this.noodlePercentage = 1; //0-1 as 0%-100%
        this.brothPercentage = 1;
        this.topping = new Array();
        if (model)
            this.SetModel(model, toppings);
    }
    /**
     * 设置进去
     * @param {RamenModel} model 拉面的model
     * @param {Array<IngredientObj>} toppings 如果不存在，就是新建一个；否则就用输入的
     */
    RamenObj.prototype.SetModel = function (model, toppings) {
        if (!model)
            return;
        this.model = model;
        if (!toppings) {
            this.topping = new Array();
            for (var i = 0; i < this.model.topping.length; i++) {
                this.topping.push(this.model.topping[i].Clone(false));
            }
        }
        else {
            this.topping = toppings;
        }
        this.cantEatToppings = new Array();
        for (var i = 0; i < this.topping.length; i++) {
            if (this.topping[i].model.eat == false) {
                this.cantEatToppings.push(this.topping[i]);
            }
        }
        this.noodlePercentage = this.model.noodles ? 1 : 0;
        this.brothPercentage = this.model.broth ? 1 : 0;
    };
    /**
     * 克隆这碗拉面
     * @param {boolean} sameIngredientUid 是否所有的topping采用和这碗一样的uniqueId
     */
    RamenObj.prototype.Clone = function (sameIngredientUid) {
        if (sameIngredientUid == false) {
            return new RamenObj(this.model);
        }
        else {
            var ing = new Array();
            for (var i = 0; i < this.topping.length; i++) {
                ing.push(this.topping[i].Clone(true));
            }
            return new RamenObj(this.model, ing);
        }
    };
    /**
     * 根据uniqueId来获取某个topping
     * @param {string} uid 要查找的uid
     * @returns {IngredientObj} 返回topping，如果是null就是没找到
     */
    RamenObj.prototype.GetToppingByUniqueId = function (uid) {
        for (var i = 0; i < this.topping.length; i++) {
            if (this.topping[i].uniqueId == uid) {
                return this.topping[i];
            }
        }
        return null;
    };
    /**
     * 判断是否已经吃光了
     */
    RamenObj.prototype.HasFinished = function () {
        if (Math.floor(this.noodlePercentage * 10) > 1)
            return false; //浮点问题所以这么干
        for (var i = 0; i < this.topping.length; i++) {
            if (this.topping[i].model.eat == true) {
                return false; //还有要吃的东西
            }
        }
        return true;
    };
    /**
     * 随机可以吃的Topping
     */
    RamenObj.prototype.GetRandomToppingForEat = function () {
        var res = new Array();
        for (var i = 0; i < this.topping.length; i++) {
            if (this.cantEatToppings.indexOf(this.topping[i]) < 0) {
                res.push(this.topping[i]);
            }
        }
        if (res.length > 0) {
            var idx = Utils.GetRandomIndexFromArray(res.length, 1)[0];
            return res[idx];
        }
        return null;
    };
    return RamenObj;
}());
__reflect(RamenObj.prototype, "RamenObj");
//# sourceMappingURL=Ramen.js.map