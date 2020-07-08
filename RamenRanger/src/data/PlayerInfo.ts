class PlayerInfo {
	public unlockedIngredients:Array<LearntIngredient>;
	public unlockedBroth:Array<LearntBroth>;
	public unlockedBowl:Array<BowlModel>;

	public constructor() {
		this.unlockedIngredients = new Array<LearntIngredient>();
		this.unlockedBroth = new Array<LearntBroth>();
		this.unlockedBowl = new Array<BowlModel>();

		this.Load();
	}

	/**
	 * 读盘
	 * 先写死
	 */
	public Load(){
		for (let j = 0; j < GameData_Ingredients.length; j++){
			this.unlockedIngredients.push(new LearntIngredient(GameData_Ingredients[j]));
		}
        for (let i = 0; i < GameData_Broth.length; i++){
			this.unlockedBroth.push(new LearntBroth(GameData_Broth[i]));
        }
		for (let i = 0; i < GameData_Bowl.length; i++){
            this.unlockedBowl.push(GameData_Bowl[i]);
        }
	}

	/**
	 * 获取学会了某个素材，如果返回null就是没学会
	 * @param {string} ingredientId 查询的ingredient的id
	 * @returns {IngredientModel} 返回要查询的素材model，如果Null代表没学会
	 */
	public GetLearnedIngredientModel(ingredientId:string):IngredientModel{
		if (ingredientId == "" || !this.unlockedIngredients || this.unlockedIngredients.length <= 0) return null;
		for (let i = 0; i < this.unlockedIngredients.length; i++){
			if (this.unlockedIngredients[i].model.id == ingredientId){
				return this.unlockedIngredients[i].model;
			}
		}
		return null;
	}

	/**
	 * 获取学会了某个素材，如果返回null就是没学会
	 * @param {string} ingredientId 查询的ingredient的id
	 * @returns {LearntIngredient} 返回要查询的素材model，如果Null代表没学会
	 */
	public GetLearnedIngredient(ingredientId:string):LearntIngredient{
		if (ingredientId == "" || !this.unlockedIngredients || this.unlockedIngredients.length <= 0) return null;
		for (let i = 0; i < this.unlockedIngredients.length; i++){
			if (this.unlockedIngredients[i].model.id == ingredientId){
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
	public GetLearnedBrothModel(brothId:string):BrothModel{
		if (brothId == "" || !this.unlockedBroth || this.unlockedBroth.length <= 0) return null;
		for (let i = 0; i < this.unlockedBroth.length; i++){
			if (this.unlockedBroth[i].model.id == brothId){
				return this.unlockedBroth[i].model;
			}
		}
		return null;
	}

	/**
	 * 获取学会了某个汤底，如果返回null就是没学会
	 * @param {string} brothId 查询的broth的id
	 * @returns {LearntBroth} 返回要查询的汤底model，如果Null代表没学会
	 */
	public GetLearnedBroth(brothId:string):LearntBroth{
		if (brothId == "" || !this.unlockedBroth || this.unlockedBroth.length <= 0) return null;
		for (let i = 0; i < this.unlockedBroth.length; i++){
			if (this.unlockedBroth[i].model.id == brothId){
				return this.unlockedBroth[i];
			}
		}
		return null;
	}


	/**
	 * 获取学会了某个面碗，如果返回null就是没学会
	 * @param {string} bowlId 查询的bowl的id
	 * @returns {BowlModel} 返回要查询的面碗model，如果Null代表没学会
	 */
	public GetLearnedBowlModel(bowlId:string):BowlModel{
		if (bowlId == "" || !this.unlockedBowl || this.unlockedBowl.length <= 0) return null;
		for (let i = 0; i < this.unlockedBowl.length; i++){
			if (this.unlockedBowl[i].id == bowlId){
				return this.unlockedBowl[i];
			}
		}
		return null;
	}

	
	/**
	 * 点赞这碗面，对应的面使用的材料都将被点赞
	 * @param {RamenObj} ramen 被点赞的拉面
	 * @param {number} tickets 被点赞数
	 */
	public VoteRamen(ramen:RamenObj, tickets:number){
		for (let i = 0; i < ramen.model.topping.length; i++){
			let ing = this.GetLearnedIngredient(ramen.model.topping[i].model.id);
			if (ing != null){
				ing.vote += tickets;
			}
		}
		let broth = this.GetLearnedBroth(ramen.model.broth.model.id);
		if (broth){
			broth.vote += tickets;
		}
	}


}