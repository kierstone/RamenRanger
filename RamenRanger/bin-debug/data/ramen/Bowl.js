var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BowlModel = (function () {
    function BowlModel() {
    }
    /**
     * 从json的Object获取到数据
     * @param {Object} json 存盘的json文件，参看“数据结构/面碗”文档。
     * @returns {boolean} 是否成功，如果id有异常则不会成功
     */
    BowlModel.prototype.fromJson = function (json) {
        if (!json || !json["id"]) {
            return false;
        }
        this.id = json["id"];
        this.name = json["name"] ? json["name"] : json["id"];
        this.img = json["img"] ? json["img"] : json["id"];
        this.radius = json["radius"] ? json["radius"] : 200;
        this.cost = json["cost"] ? json["cost"] : 1;
        return true;
    };
    /**
     * 获取图片资源名
     * @returns {string} 资源名称
     */
    BowlModel.prototype.Image = function () {
        return this.img;
    };
    /**
     * 获取icon的资源名
     * @returns {string} icon的名称
     */
    BowlModel.prototype.Icon = function () {
        return this.img;
    };
    return BowlModel;
}());
__reflect(BowlModel.prototype, "BowlModel");
var BowlObj = (function () {
    function BowlObj(model) {
        this.model = model;
    }
    return BowlObj;
}());
__reflect(BowlObj.prototype, "BowlObj");
//# sourceMappingURL=Bowl.js.map