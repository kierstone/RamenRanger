var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerInfo = (function () {
    function PlayerInfo() {
        this.unlockedIngredients = new Object;
    }
    /**
     * 获取学会了某个素材，如果返回null就是没学会
     * @param {string} ingredientId 查询的ingredient的id
     * @param {string} ingredientClassId 所属的分类的id，可以是空的或者""代表不关心所属分类
     * @returns {IngredientModel} 返回要查询的素材model，如果Null代表没学会
     */
    PlayerInfo.prototype.getLearnedIngredient = function (ingredientId, ingredientClassId) {
        if (ingredientClassId === void 0) { ingredientClassId = ""; }
        if (ingredientId == "")
            return null;
        if (!ingredientId || ingredientClassId == "") {
            for (var _i = 0, _a = Object.keys(this.unlockedIngredients); _i < _a.length; _i++) {
                var key = _a[_i];
                if (this.unlockedIngredients[key] && this.unlockedIngredients[key].length > 0) {
                    for (var i = 0; i < this.unlockedIngredients[key].length; i++) {
                        if (this.unlockedIngredients[key][i]["id"] && this.unlockedIngredients[key][i]["id"] == ingredientId) {
                            return this.unlockedIngredients[key][i];
                        }
                    }
                }
            }
        }
        else {
            var key = ingredientClassId;
            if (!this.unlockedIngredients[key] || this.unlockedIngredients[key].length <= 0)
                return null;
            for (var i = 0; i < this.unlockedIngredients[key].length; i++) {
                if (this.unlockedIngredients[key][i]["id"] && this.unlockedIngredients[key][i]["id"] == ingredientId) {
                    return this.unlockedIngredients[key][i];
                }
            }
        }
        return null;
    };
    /**
     * 学习一个素材
     * @param {IngredientModel} ingredient 要学的素材
     */
    PlayerInfo.prototype.learnIngredient = function (ingredient) {
        if (this.getLearnedIngredient(ingredient.id, ingredient.ingredientClassId) != null)
            return;
        if (!this.unlockedIngredients[ingredient.ingredientClassId])
            this.unlockedIngredients[ingredient.ingredientClassId] = new Array();
        this.unlockedIngredients[ingredient.ingredientClassId].push(ingredient);
    };
    return PlayerInfo;
}());
__reflect(PlayerInfo.prototype, "PlayerInfo");
//# sourceMappingURL=PlayerInfo.js.map