var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BowlModel = (function () {
    function BowlModel() {
        this.tareLimit = 6; //TODO 最多6个tare，回头改成读数据
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
        this.icon = json["icon"] ? json["icon"] : "";
        this.scene = json["scene"] ? json["scene"] : "";
        this.sceneCenterX = json["x"] ? json["x"] : 0;
        this.sceneCenterY = json["y"] ? json["y"] : 0;
        this.radius = json["radius"] ? json["radius"] : 200;
        this.cost = json["cost"] ? json["cost"] : 1;
        return true;
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
    BowlObj.prototype.RandomPosInBowl = function () {
        var ranRa = Math.random() * 360 / 180 * Math.PI;
        var ranLen = Math.random() * this.model.radius * 0.9;
        return new egret.Point(Math.cos(ranRa) * ranLen, Math.sin(ranRa) * ranLen);
    };
    return BowlObj;
}());
__reflect(BowlObj.prototype, "BowlObj");
//# sourceMappingURL=Bowl.js.map