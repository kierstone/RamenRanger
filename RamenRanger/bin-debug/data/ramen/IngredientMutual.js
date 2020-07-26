var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var IngredientMutual = (function () {
    function IngredientMutual(data) {
        if (data)
            this.FromJson(data);
    }
    /**
     * 从json的Object获取到数据
     * @param {Object} json 存盘的json文件，参看“数据结构/食材的结构”文档。
     * @returns {boolean} 是否成功，如果id有异常则不会成功
     */
    IngredientMutual.prototype.FromJson = function (json) {
        if (!json) {
            return false;
        }
        this.ingText1 = json["ing_text1"] ? json["ing_text1"] : "";
        this.ingIcon1 = json["ing_icon1"] ? json["ing_icon1"] : "";
        var iType1 = json["ing_type1"] ? json["ing_type1"] : "";
        var iClass1 = json["ing_class1"] ? json["ing_class1"] : "";
        var iCatagory1 = json["ing_catagory1"] ? json["ing_catagory1"] : "";
        this.ingSubject1 = new IngredientSubject(iType1, iClass1, iCatagory1);
        this.ingText2 = json["ing_text2"] ? json["ing_text2"] : "";
        this.ingIcon2 = json["ing_icon2"] ? json["ing_icon2"] : "";
        var iType2 = json["ing_type2"] ? json["ing_type2"] : "";
        var iClass2 = json["ing_class2"] ? json["ing_class2"] : "";
        var iCatagory2 = json["ing_catagory2"] ? json["ing_catagory2"] : "";
        this.ingSubject2 = new IngredientSubject(iType2, iClass2, iCatagory2);
        this.isHarmful = json["harmful"] ? json["harmful"] : false;
        this.score = json["score"] ? json["score"] : 0;
        this.desc = json["desc"] ? json["desc"] : "";
        this.effectKeys = new Array();
        if (json["tag"]) {
            var jt = json["effect_keys"];
            for (var i = 0; i < jt.length; i++) {
                this.effectKeys.push(jt[i]);
            }
        }
        return true;
    };
    /**
     * 是否符合当前这条组合
     * @param {IngredientModel} ing1 食材1
     * @param {IngredientModel} ing2 食材2
     * @returns {boolean} 返回食材1和食材2是否符合这条组合
     */
    IngredientMutual.prototype.FitThisMutual = function (ing1, ing2) {
        //要么1根1符合的同时2根2符合，要么1根2符合的同时2根1符合
        return ((this.ingSubject1.Fit(ing1.subject) == true && this.ingSubject2.Fit(ing2.subject) == true) ||
            (this.ingSubject1.Fit(ing2.subject) == true && this.ingSubject2.Fit(ing1.subject) == true));
    };
    return IngredientMutual;
}());
__reflect(IngredientMutual.prototype, "IngredientMutual");
//# sourceMappingURL=IngredientMutual.js.map