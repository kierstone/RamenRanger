var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 美食街小吃的盖浇信息
 */
var FoodCourtDishToppingInfo = (function () {
    function FoodCourtDishToppingInfo(ingredientId, x, y, size, rotate) {
        if (size === void 0) { size = 1; }
        if (rotate === void 0) { rotate = 0; }
        this.size = 1;
        this.rotate = 0;
        this.ingredientId = ingredientId;
        this.x = x;
        this.y = y;
        this.size = size;
        this.rotate = rotate;
    }
    return FoodCourtDishToppingInfo;
}());
__reflect(FoodCourtDishToppingInfo.prototype, "FoodCourtDishToppingInfo");
/**
 * 美食街的美食，读取自表格
 */
var FoodCourtDishModel = (function () {
    function FoodCourtDishModel(data) {
        if (data)
            this.FromJson(data);
    }
    /**
    * 从json的Object获取到数据
    * @param {Object} json 存盘的json文件
    * @returns {boolean} 是否成功，如果id有异常则不会成功
    */
    FoodCourtDishModel.prototype.FromJson = function (json) {
        if (!json || json["id"] == null || json["id"] == undefined) {
            return false;
        }
        this.id = json["id"];
        this.name = json["name"] ? json["name"] : "";
        this.bowlId = json["bowl"] ? json["bowl"] : "";
        this.brothId = json["broth"] ? json["broth"] : "";
        this.riceId = json["rice"] ? json["rice"] : "";
        this.type = json["type"] ? json["type"] : 0;
        this.feed = json["feed"] ? json["feed"] : 0;
        this.topping = new Array();
        if (json["topping"]) {
            for (var i = 0; i < json["topping"].length; i++) {
                var ti = json["topping"][i];
                if (ti["ingredient"] && ti["ingredient"] != "") {
                    this.topping.push(new FoodCourtDishToppingInfo(ti["ingredient"], ti["x"] ? ti["x"] : 0, ti["y"] ? ti["y"] : 0, ti["size"] ? ti["size"] : 1, ti["rotate"] ? ti["rotate"] : 0));
                }
            }
        }
        this.reward = new Array();
        if (json["reward"]) {
            for (var i = 0; i < json["reward"].length; i++) {
                var fci = json["reward"][i];
                if (fci["ingredient"] && fci["ingredient"] != "") {
                    this.reward.push(new FoodCourtIngredient(fci["ingredient"], fci["exp"] ? fci["exp"] : 0, fci["broth"] ? fci["broth"] : false));
                }
            }
        }
    };
    return FoodCourtDishModel;
}());
__reflect(FoodCourtDishModel.prototype, "FoodCourtDishModel");
var FoodCourtDishObj = (function () {
    function FoodCourtDishObj(model) {
        this.model = model;
        this.SetIngredients(this.model.topping, this.model.bowlId, this.model.brothId, this.model.riceId);
    }
    FoodCourtDishObj.prototype.SetIngredients = function (ingredientId, bowlId, brothModelId, riceIngredientId) {
        var broth = null;
        if (brothModelId) {
            broth = GetBrothModelById(brothModelId);
        }
        var rice = null;
        if (riceIngredientId) {
            rice = GetIngredientModelById(riceIngredientId);
        }
        var bowl = GameData_Bowl[0]; //TODO 写死了第0个碗
        if (bowlId) {
            var b = GetBowlModelById(bowlId);
            if (b)
                bowl = b;
        }
        var rm = new RamenModel();
        rm.bowl = new BowlObj(bowl);
        rm.broth = broth == null ? null : new BrothObj(broth);
        rm.noodles = rice == null ? null : new IngredientObj(rice);
        rm.topping = new Array();
        for (var i = 0; i < ingredientId.length; i++) {
            var ingM = GetIngredientModelById(ingredientId[i].ingredientId);
            if (ingM) {
                var ing = new IngredientObj(ingM, ingredientId[i].x, ingredientId[i].y, ingredientId[i].rotate);
                ing.size = ingredientId[i].size;
                rm.topping.push(ing);
            }
        }
        this.dish = new RamenObj(rm);
    };
    /**
     * 某个食材是否可能拿到经验
     * 着味会被当做ingredient使用，比如排骨年糕有酱料
     * @param {string} ingredientId 食材的model.id
     * @returns {FoodCourtIngredient} 如果不是Null就说明有可以习得的信息
     */
    FoodCourtDishObj.prototype.IngredientInReward = function (ingredientId) {
        for (var i = 0; i < this.model.reward.length; i++) {
            if (this.model.reward[i].ingredientId == ingredientId) {
                return this.model.reward[i].Clone();
            }
        }
        return null;
    };
    /**
     * 汤底是否可以被学习，如果在吃面，则可能有机会学习到汤底（着味会被当做ingredient使用）
     * @returns {FoodCourtIngredient} 如果不是Null就说明有可以习得的信息
     */
    FoodCourtDishObj.prototype.BrothInReward = function () {
        for (var i = 0; i < this.model.reward.length; i++) {
            if (this.model.reward[i].broth == true) {
                return this.model.reward[i].Clone();
            }
        }
        return null;
    };
    return FoodCourtDishObj;
}());
__reflect(FoodCourtDishObj.prototype, "FoodCourtDishObj");
var FoodCourtIngredient = (function () {
    function FoodCourtIngredient(ingredientId, exp, broth) {
        if (broth === void 0) { broth = false; }
        this.broth = false;
        this.ingredientId = ingredientId;
        this.exp = exp;
        this.broth = broth;
    }
    FoodCourtIngredient.prototype.Clone = function () {
        return new FoodCourtIngredient(this.ingredientId, this.exp, this.broth);
    };
    return FoodCourtIngredient;
}());
__reflect(FoodCourtIngredient.prototype, "FoodCourtIngredient");
var FoodCourtDishType;
(function (FoodCourtDishType) {
    FoodCourtDishType[FoodCourtDishType["Red"] = 0] = "Red";
    FoodCourtDishType[FoodCourtDishType["Blue"] = 1] = "Blue";
    FoodCourtDishType[FoodCourtDishType["Yellow"] = 2] = "Yellow";
    FoodCourtDishType[FoodCourtDishType["White"] = 3] = "White";
})(FoodCourtDishType || (FoodCourtDishType = {}));
var GetFoodCourtDishTypeColor = function (ft) {
    var c = [
        0xFF0000,
        0xFFFF00,
        0x00FFFF,
        0x0000FF
    ];
    return c[ft];
};
//# sourceMappingURL=FoodCourtDish.js.map