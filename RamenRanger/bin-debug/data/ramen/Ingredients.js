var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//从json读取的ingredient数据
var IngredientModel = (function () {
    function IngredientModel() {
    }
    /**
     * 从json的Object获取到数据
     * @param {Object} json 存盘的json文件，参看“数据结构/食材的结构”文档。
     * @param {string} classId 所在的素材组的id
     * @returns {boolean} 是否成功，如果id有异常则不会成功
     */
    IngredientModel.prototype.fromJson = function (json, classId) {
        if (!json || !json["id"]) {
            return false;
        }
        this.id = json["id"];
        this.name = json["name"] ? json["name"] : json["id"];
        this.radius = json["radius"] ? json["radius"] : 0;
        this.canBeTaste = json["taste"] ? json["taste"] : false;
        this.canBeSoup = json["soup"] ? json["soup"] : false;
        this.canBeNoodle = json["noodle"] ? json["noodle"] : false;
        this.canBeIngredient = json["ingredient"] ? json["ingredient"] : false;
        this.pungency = json["pungency"] ? json["pungency"] : 0;
        this.sweet = json["sweet"] ? json["sweet"] : 0;
        this.salty = json["salty"] ? json["salty"] : 0;
        this.sourness = json["sourness"] ? json["sourness"] : 0;
        this.spicy = json["spicy"] ? json["spicy"] : 0;
        this.price = json["price"] ? json["price"] : 0;
        this.ingredientClassId = classId;
        this.buffs = new Array();
        if (json["buff"] && json["buff"].length && json["buff"].length > 0) {
            for (var i = 0; i < json["buff"].length; i++) {
                var bObj = json["buff"][i];
                this.buffs.push(new CharacterBuffTrigger(bObj["id"], bObj["stack"], bObj["turns"]));
            }
        }
        this.liquid = null;
        if (json["liquid"]) {
            if (json["liquid"]["color"]) {
                var lcInfo = json["liquid"]["color"];
                this.liquid = new LiquidInfo(lcInfo["a"], lcInfo["r"], lcInfo["g"], lcInfo["b"]);
            }
            this.radius = 0;
        }
        return true;
    };
    /**
     * 获取图片资源名
     * @returns {string} 资源名称
     */
    IngredientModel.prototype.Image = function () {
        return "ingredient_" + this.id;
    };
    /**
     * 获取icon的资源名
     * @returns {string} icon的名称
     */
    IngredientModel.prototype.Icon = function () {
        return "icon_ingredient_" + this.id;
    };
    /**
     * 返回这个材料是否是液体
     * @returns {boolean} 是否是液体
     */
    IngredientModel.prototype.IsLiquid = function () {
        return this.liquid != null && this.radius <= 0;
    };
    IngredientModel.UseType_Taste = 1;
    IngredientModel.UseType_Soup = 2;
    IngredientModel.UseType_Noodle = 4;
    IngredientModel.UseType_Ingredient = 8;
    return IngredientModel;
}());
__reflect(IngredientModel.prototype, "IngredientModel");
//实际使用的ingredient
var IngredientObj = (function () {
    function IngredientObj(model, x, y, rotation) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (rotation === void 0) { rotation = 0; }
        this.model = model;
        this.x = x;
        this.y = y;
        this.rotation = rotation;
    }
    return IngredientObj;
}());
__reflect(IngredientObj.prototype, "IngredientObj");
//# sourceMappingURL=Ingredients.js.map