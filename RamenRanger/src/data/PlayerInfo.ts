class PlayerInfo {
	public unlockedIngredients:Object; //<IngredientClassId, Array<IngredientModel>>

	public constructor() {
		this.unlockedIngredients = new Object;
	}

	/**
	 * 获取学会了某个素材，如果返回null就是没学会
	 * @param {string} ingredientId 查询的ingredient的id
	 * @param {string} ingredientClassId 所属的分类的id，可以是空的或者""代表不关心所属分类
	 * @returns {IngredientModel} 返回要查询的素材model，如果Null代表没学会
	 */
	public getLearnedIngredient(ingredientId:string, ingredientClassId:string = ""):IngredientModel{
		if (ingredientId == "") return null;
		if (!ingredientId || ingredientClassId == ""){
			for (let key of Object.keys(this.unlockedIngredients)){
				if (this.unlockedIngredients[key] && this.unlockedIngredients[key].length > 0){
					for(let i = 0; i < this.unlockedIngredients[key].length; i++){
						if (this.unlockedIngredients[key][i]["id"] && this.unlockedIngredients[key][i]["id"] == ingredientId){
							return this.unlockedIngredients[key][i]
						}
					}
				}
			}
		}else{
			let key = ingredientClassId;
			if (!this.unlockedIngredients[key] || this.unlockedIngredients[key].length <= 0) return null;
			for(let i = 0; i < this.unlockedIngredients[key].length; i++){
				if (this.unlockedIngredients[key][i]["id"] && this.unlockedIngredients[key][i]["id"] == ingredientId){
					return this.unlockedIngredients[key][i]
				}
			}
		}
		
		return null;
	}

	/**
	 * 学习一个素材
	 * @param {IngredientModel} ingredient 要学的素材
	 */
	public learnIngredient(ingredient:IngredientModel){
		if (this.getLearnedIngredient(ingredient.id, ingredient.ingredientClassId) != null) return;
		if (!this.unlockedIngredients[ingredient.ingredientClassId])
			this.unlockedIngredients[ingredient.ingredientClassId] = new Array<IngredientModel>();
		this.unlockedIngredients[ingredient.ingredientClassId].push(ingredient);
	}
}