class PlayerInfo {
	public unlockedIngredients:Array<IngredientModel>;
	public unlockedBroth:Array<BrothModel>;

	public constructor() {
		this.unlockedIngredients = new Array<IngredientModel>();
		this.unlockedBroth = new Array<BrothModel>();
	}

	/**
	 * 获取学会了某个素材，如果返回null就是没学会
	 * @param {string} ingredientId 查询的ingredient的id
	 * @returns {IngredientModel} 返回要查询的素材model，如果Null代表没学会
	 */
	public getLearnedIngredient(ingredientId:string):IngredientModel{
		if (ingredientId == "" || !this.unlockedIngredients || this.unlockedIngredients.length <= 0) return null;
		for (let i = 0; i < this.unlockedIngredients.length; i++){
			if (this.unlockedIngredients[i].id == ingredientId){
				return this.unlockedIngredients[i];
			}
		}
		return null;
	}

	/**
	 * 获取学会了某个汤底，如果返回null就是没学会
	 * @param {string} brothId 查询的broth的id
	 * @returns {BrothModel} 返回要查询的汤底model，如果Null代表没学会
	 */
	public getLearnedBroth(brothId:string):BrothModel{
		if (brothId == "" || !this.unlockedBroth || this.unlockedBroth.length <= 0) return null;
		for (let i = 0; i < this.unlockedBroth.length; i++){
			if (this.unlockedBroth[i].id == brothId){
				return this.unlockedBroth[i];
			}
		}
		return null;
	}

	
}