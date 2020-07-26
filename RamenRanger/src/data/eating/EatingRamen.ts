/**
 * 把吃拉面的过程，当做是一个小游戏
 * 每一个回合计算当前的情况，并确定表演，同时表演时间决定到下一个回合的时间
 * 这样之后有玩法就可以插入到这里
 * 而吃拉面的相关属性也放在这里，并不放在角色里，角色是一个被读取用的数据源
 */
class EatingRamen {
	//基础元素
	public cha:CharacterObj;	//吃拉面的人
	public ramen:RamenObj;	//被吃的拉面

	private buddyInfo:FoodCourtBuddy;
	private dishInfo:FoodCourtDishObj;

	//这是要输出的内容
	public turnResult:Array<EatTurnAction>;  //每个回合发生的事情
	public learnedIngredientInfo:Array<EatGameIngredientGatherInfo>;	//这是吃面过程中获得食材的时间点

	//相关数据
	public hungry:number = 100;	//吃面的人的饥饿度，这个未来可以有算法，现在先100开始，到0就吃饱吃撑了
	public desire:Array<Object>; //特别想吃的味道，{"tag":味道的tag, "turn":还剩下几个回合兴趣}
	public heart:number = 0;	//吃面开始到现在已经获得了多少爱心了

	private toEatRamen:RamenObj;	//运行时临时的拉面，因为不能把传进来的拉面给吃了

	private gameType:EatGameType;

	private finalAction:CharacterAction = CharacterAction.Stand;	//TODO 吃完以后要做的动作，先写死

	/**
	 * @param {CharacterObj} cha 谁吃面
	 * @param {RamenObj} ramen 吃的什么面
	 * @param {FoodCourtDishObj} dishInfo 要吃的食物，可以是null，毕竟只有小吃街才有
	 * @param {boolean} favour 是否喜欢，如果是美食街，应该有喜欢不喜欢，否则根据算出来的计算
	 */
	public constructor(cha:CharacterObj, ramen:RamenObj, dishInfo:FoodCourtDishObj, gameType:EatGameType) {
		this.cha = cha;
		this.buddyInfo = cha.buddyInfo;
		this.ramen = ramen;
		this.gameType = gameType;
		this.learnedIngredientInfo = new Array<EatGameIngredientGatherInfo>();
		this.dishInfo = dishInfo;

		this.RunThisGame();
	}

	/**
	 * 从头到尾模拟吃掉一碗面
	 */
	private RunThisGame(){
		this.turnResult = new Array<EatTurnAction>();
		this.toEatRamen = this.ramen.Clone(true);

		let turnId = 0;
		while (this.hungry > 0 && this.toEatRamen.HasFinished() == false){
			//选择要吃啥
			let eatIng = this.ThisTurnEat(turnId);
			if (eatIng == null){
				break;	//TODO 没东西吃了，应该去后续状态
			}

			//根据吃的东西改变属性
		 	//根据吃的东西生成EatTurnAction和EatingAction
			let toEatIng = this.ramen.GetToppingByUniqueId(eatIng["ingredient"]);
			this.ThisTurnModify(turnId, toEatIng, eatIng["isNoodle"] == true, eatIng["noodleReduce"]);

			turnId += 1;
		}
	}

	/**
	 * 从拉面里选出这回合吃啥，当然目前是测试的，今后要改规则
	 * @returns {Object} {ingredient:string(IngredientObj.uniqueId), isNoodle:boolean, noodleReduce:number(吃了百分之多少)} 返回吃的东西以及是否是面条
	 */
	private ThisTurnEat(turnId:number):Object{
		if (this.toEatRamen.HasFinished() == true) return null;

		let noodlePerTaste = Math.min((this.ramen.topping.length > 0 ? (1 / this.ramen.topping.length + 1): 0.2),0.2);	//每一口吃掉多少

		if ((turnId % 2) == 1){
			//奇数回合吃料优先，TODO 找出最想吃的
			let ingForEat = this.toEatRamen.GetRandomToppingForEat();
			if (this.toEatRamen.topping.length > 0 && ingForEat){
				let sIndex = this.toEatRamen.topping.indexOf(ingForEat);
				return {
					"ingredient":this.toEatRamen.topping.splice(sIndex, 1)[0].uniqueId,
					"isNoodle":false,
					"noodleReduce":0
				};
			}else if (this.toEatRamen.noodlePercentage > 0){
				this.toEatRamen.noodlePercentage -= noodlePerTaste; //TODO 先写死一口吃12%，应该来自于属性
				return {
					"ingredient":this.toEatRamen.model.noodles.uniqueId,
					"isNoodle":true,
					"noodleReduce":noodlePerTaste
				}
			}
		}else{
			if (this.toEatRamen.noodlePercentage > 0){
				this.toEatRamen.noodlePercentage -= noodlePerTaste; //TODO 先写死一口吃6%，应该来自于属性
				return {
					"ingredient":this.toEatRamen.model.noodles.uniqueId,
					"isNoodle":true,
					"noodleReduce":noodlePerTaste
				}
			}else if (this.toEatRamen.topping.length > 0 && this.toEatRamen.GetRandomToppingForEat() != null){
				let ingForEat = this.toEatRamen.GetRandomToppingForEat();
				let sIndex = this.toEatRamen.topping.indexOf(ingForEat);
				return {
					"ingredient":this.toEatRamen.topping.splice(sIndex, 1)[0].uniqueId,
					"isNoodle":false,
					"noodleReduce":0
				};
			}
		}
		return null;
	}

	//根据吃的东西改变属性，并且获得行为列表 TODO 都是临时写死的
	private ThisTurnModify(turnId:number, eatIng:IngredientObj, isNoodle:boolean, noodleReducePercent:number){
		this.hungry -= 1;

		switch(this.gameType){
			case EatGameType.FoodCourt:{
				this.turnResult.push(this.ThisTurnEatActionInFoodCourt(eatIng, isNoodle, noodleReducePercent));
				this.ThisTurnIngGatherInFoodCourt(turnId, eatIng, isNoodle);
			}break;
			case EatGameType.EatNoodle:{
				this.turnResult.push(this.ThisTurnInNormalEat(eatIng, isNoodle, noodleReducePercent));
			}break;
		}
		
	}
	//如果是在小吃街模式
	private ThisTurnEatActionInFoodCourt(eatIng:IngredientObj, isNoodle:boolean, noodleReducePercent:number):EatTurnAction{
		let satisify = this.buddyInfo.isPlayer == true ? 100 :
			(
				(this.dishInfo && this.buddyInfo.favourType == this.dishInfo.model.type) ? 
					this.buddyInfo.favourLevel * 10 : 0
			)
		let badTaste = BadTaste.None;

		return new EatTurnAction(
			this.cha, eatIng, 0, isNoodle, noodleReducePercent, badTaste
		);
	}
	private ThisTurnIngGatherInFoodCourt(turnId:number, eatIng:IngredientObj, isNoodle:boolean){
		let favPlus = Utils.RandomInt(5, 10);
		let learnedChance = (this.dishInfo && this.buddyInfo.favourType == this.dishInfo.model.type) ?
			(this.buddyInfo.favourLevel * favPlus + 50) : 50;	//基础习得率50%，喜欢吃就提高概率
		//if (Utils.RandomInt(0, 100) + learnedChance < 100) return; //概率不够学会	//TODO 必定学会
		if (isNoodle == true){
			//有可能学到汤底或者面条
			let mayLearn = new Array<FoodCourtIngredient>();
			//如果有可能学到汤
			let bro = this.dishInfo.BrothInReward();
			if (bro) mayLearn.push(bro);
			//如果有可能学到面条
			let nod = this.dishInfo.IngredientInReward(eatIng.model.id);
			if (nod) mayLearn.push(nod);
			//随机获得
			if (mayLearn.length <= 0) return;

			let ingInfo = mayLearn[Utils.GetRandomIndexFromArray(mayLearn.length, 1)[0]] ;
			ingInfo.exp = 
				(this.dishInfo && this.buddyInfo.favourType == this.dishInfo.model.type) ?
				(this.buddyInfo.favourLevel + 5) : 3
			this.learnedIngredientInfo.push(new EatGameIngredientGatherInfo(turnId,  ingInfo));
		}else{
			let ingInfo = this.dishInfo.IngredientInReward(eatIng.model.id);
			if (ingInfo){
				ingInfo.exp = 
					(this.dishInfo && this.buddyInfo.favourType == this.dishInfo.model.type) ?
					(this.buddyInfo.favourLevel + 5) : 3
				this.learnedIngredientInfo.push(new EatGameIngredientGatherInfo(turnId, ingInfo));
			}
			
		}

	}
	//正常吃面模式
	private ThisTurnInNormalEat(eatIng:IngredientObj, isNoodle:boolean, noodleReducePercent:number):EatTurnAction{
		let satisify = Math.round(Math.random() * 200 - 100);
		let badTaste = BadTaste.None;
		let ranRes = Math.random();
		if (ranRes >= 0.95){
			badTaste = BadTaste.Hatred;
		}else if (ranRes >= 0.9){
			badTaste = BadTaste.Disappointed;
		}else if (ranRes >= 0.85){
			badTaste = BadTaste.Hot;
		}else if (ranRes >= 0.8){
			badTaste = BadTaste.TooHeavy;
		}

		return new EatTurnAction(
			this.cha, eatIng, satisify, isNoodle, noodleReducePercent, badTaste
		);
	}
	
	

	

}

//吃东西玩法的类型
enum EatGameType{
	EatNoodle = 0,	//正常的吃面
	FoodCourt = 1,	//小吃街吃东西
}

/**
 * 吃面玩法中，获得食材的提示
 */
class EatGameIngredientGatherInfo{
	public atTurn:number;	//在第几回合
	public learnedIngredient:FoodCourtIngredient;	//学会的FoodCourtIngredient

	constructor(atTurn:number, learnedIngredient:FoodCourtIngredient){
		this.atTurn = atTurn;
		this.learnedIngredient = learnedIngredient;
	}
}