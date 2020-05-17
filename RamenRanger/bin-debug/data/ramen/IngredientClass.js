var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var IngredientClass = (function () {
    function IngredientClass() {
    }
    /**
     * 从json的Object获取到数据
     * @param {Object} json 存盘的json文件，参看“数据结构/面碗”文档。
     * @returns {boolean} 是否成功，如果id有异常则不会成功
     */
    IngredientClass.prototype.fromJson = function (json) {
        if (!json || !json["id"]) {
            return false;
        }
        this.id = json["id"];
        this.name = json["name"] ? json["name"] : json["id"];
        this.icon = "icon_Ingredient_" + (json["icon"] ? json["icon"] : "");
        this.items = new Array();
        if (json["children"] && json["children"].length && json["children"].length > 0) {
            for (var i = 0; i < json["children"].length; i++) {
                var bObj = json["children"][i];
                var im = new IngredientModel();
                this.items.push(im);
            }
        }
        return true;
    };
    return IngredientClass;
}());
__reflect(IngredientClass.prototype, "IngredientClass");
//# sourceMappingURL=IngredientClass.js.map