var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//从json读取的ingredient数据
var IngredientModel = (function () {
    function IngredientModel(data) {
        if (data)
            this.FromJson(data);
    }
    /**
     * 从json的Object获取到数据
     * @param {Object} json 存盘的json文件，参看“数据结构/食材的结构”文档。
     * @returns {boolean} 是否成功，如果id有异常则不会成功
     */
    IngredientModel.prototype.FromJson = function (json) {
        if (!json || !json["id"]) {
            return false;
        }
        this.id = json["id"];
        this.name = json["name"] ? json["name"] : json["id"];
        this.img = json["img"] ? json["img"] : "";
        this.icon = json["icon"] ? json["icon"] : "";
        this.scene = json["scene"] ? json["scene"] : "";
        this.radius = json["radius"] ? json["radius"] : 0;
        this.canBeUsed = json["using"] ? json["using"] : 0;
        this.liquid = json["liquid"] ? json["liquid"] : false;
        this.eat = json["eat"] ? json["eat"] : false;
        this.rare = json["rare"] ? json["rare"] : 0;
        this.cost = json["cost"] ? json["cost"] : 0;
        this.pungency = json["pungency"] ? json["pungency"] : 0;
        this.sweet = json["sweet"] ? json["sweet"] : 0;
        this.salty = json["salty"] ? json["salty"] : 0;
        this.sour = json["sour"] ? json["sour"] : 0;
        this.spicy = json["spicy"] ? json["spicy"] : 0;
        this.tags = new Array();
        if (json["tag"]) {
            var jt = json["tag"];
            for (var i = 0; i < jt.length; i++) {
                this.tags.push(jt[i]);
            }
        }
        return true;
    };
    /**
     * 材料能否做着味
     * @returns {boolean} 是否可以做着味
     */
    IngredientModel.prototype.CanBeTare = function () {
        return (this.canBeUsed & IngredientUseType.UseType_Tare) > 0;
    };
    /**
     * 材料能否做汤底
     * @returns {boolean} 是否可以做汤底
     */
    IngredientModel.prototype.CanBeBroth = function () {
        return (this.canBeUsed & IngredientUseType.UseType_Broth) > 0;
    };
    /**
     * 材料能否做面条
     * @returns {boolean} 是否可以做面条
     */
    IngredientModel.prototype.CanBeNoodle = function () {
        return (this.canBeUsed & IngredientUseType.UseType_Noodle) > 0;
    };
    /**
     * 材料能否做盖浇
     * @returns {boolean} 是否可以做盖浇
     */
    IngredientModel.prototype.CanBeTopping = function () {
        return (this.canBeUsed & IngredientUseType.UseType_Topping) > 0;
    };
    return IngredientModel;
}());
__reflect(IngredientModel.prototype, "IngredientModel");
//实际使用的ingredient
var IngredientObj = (function () {
    function IngredientObj(model, x, y, rotation) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (rotation === void 0) { rotation = 0; }
        this.size = 1; //From 0.5 to 2，放大倍数
        this.uniqueId = Utils.GetUniqueId("IngredientObj");
        this.model = model;
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.xFlip = false;
        this.size = 1;
    }
    /**
     * 根据当前情况创建一个新的eui.Image
     * @param {eui.Group} parent 要放到什么父亲
     * @param {number} centerX 面碗中心的x坐标
     * @param {number} centerY 面碗中心的y坐标
     * @returns {eui.Image} 创建出来的image
     */
    IngredientObj.prototype.GatherImage = function (parent, centerX, centerY) {
        if (!parent)
            return null;
        var res = new eui.Image(RES.getRes(this.model.img));
        parent.addChild(res);
        res.anchorOffsetX = res.width / 2;
        res.anchorOffsetY = res.height / 2;
        res.x = this.x + centerX;
        res.y = this.y + centerY;
        res.rotation = this.rotation;
        res.scaleX = (this.xFlip == true ? -1 : 1) * this.size;
        res.scaleY = this.size;
        return res;
    };
    /**
     * 根据当前情况创建一个新的eui.Image
     * @param {eui.Group} parent 要放到什么父亲
     * @param {number} centerX 面碗中心的x坐标
     * @param {number} centerY 面碗中心的y坐标
     * @returns {eui.Image} 创建出来的image
     */
    IngredientObj.prototype.GatherSceneImage = function (parent, centerX, centerY) {
        if (!parent)
            return null;
        var res = new eui.Image(RES.getRes(this.model.scene));
        parent.addChild(res);
        res.anchorOffsetX = res.width / 2;
        res.anchorOffsetY = res.height / 2;
        res.x = Math.round(this.x * Scene_PosScale + centerX);
        res.y = Math.round(this.y * Scene_PosScale + centerY);
        res.rotation = this.rotation;
        res.scaleX = (this.xFlip == true ? -1 : 1) * this.size;
        res.scaleY = this.size;
        return res;
    };
    /**
     * 将属性设置到eui.Image
     * @param {eui.Image} img 要设置的图形
     * @param {number} centerX 面碗中心的x坐标
     * @param {number} centerY 面碗中心的y坐标
     */
    IngredientObj.prototype.SetToImage = function (img, centerX, centerY) {
        if (!img)
            return;
        img.x = this.x + centerX;
        img.y = this.y + centerY;
        img.rotation = this.rotation;
        img.scaleX = (this.xFlip == true ? -1 : 1) * this.size;
        img.scaleY = this.size;
    };
    /**
     * 某个点是否算碰到我了（点击用）
     * @param {number} x 坐标点x
     * @param {number} y 坐标点y
     * @param {number} centerX 面碗中心的x坐标
     * @param {number} centerY 面碗中心的y坐标
     * @returns {boolean} 算不算点到
     */
    IngredientObj.prototype.TouchOnMe = function (x, y, centerX, centerY) {
        var clickRadius = this.ClickRadius();
        var rX = x - centerX;
        var rY = y - centerY;
        return (Math.pow(rX - this.x, 2) + Math.pow(rY - this.y, 2)) <= Math.pow(clickRadius * this.size, 2);
    };
    /**
     * 点选半径，为了以后可以维护，要考虑是否需要变成一个单独属性
     * @returns {number} 点选半径
     */
    IngredientObj.prototype.ClickRadius = function () {
        return this.model.radius * 5;
    };
    /**
     * 克隆一个自己
     * @param {boolean} sameUid 克隆出来的是否连uniqueId都和这个是一样的
     * @returns {IngredientObj} 克隆体
     */
    IngredientObj.prototype.Clone = function (sameUid) {
        if (sameUid === void 0) { sameUid = false; }
        var res = new IngredientObj(this.model, this.x, this.y, this.rotation);
        if (sameUid == true)
            res.uniqueId = this.uniqueId;
        res.xFlip = this.xFlip;
        res.size = this.size;
        return res;
    };
    return IngredientObj;
}());
__reflect(IngredientObj.prototype, "IngredientObj");
/**
 * 玩家学会的素材配方
 */
var LearntIngredient = (function () {
    function LearntIngredient(model) {
        this.vote = 0; //被赞了多少次
        this.model = model;
    }
    return LearntIngredient;
}());
__reflect(LearntIngredient.prototype, "LearntIngredient");
//素材用途
var IngredientUseType;
(function (IngredientUseType) {
    IngredientUseType[IngredientUseType["UseType_None"] = 0] = "UseType_None";
    IngredientUseType[IngredientUseType["UseType_Tare"] = 1] = "UseType_Tare";
    IngredientUseType[IngredientUseType["UseType_Broth"] = 2] = "UseType_Broth";
    IngredientUseType[IngredientUseType["UseType_Noodle"] = 4] = "UseType_Noodle";
    IngredientUseType[IngredientUseType["UseType_Topping"] = 8] = "UseType_Topping";
})(IngredientUseType || (IngredientUseType = {}));
//# sourceMappingURL=Ingredients.js.map