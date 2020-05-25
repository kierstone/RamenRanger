/**
 * 首先我们把吃面的过程作为一个小游戏玩法，这样以后要扩展操作也简单
 * 只是吃面这个迷你游戏的每个回合要做些什么事情的数据结构
 */
class EatTurnAction {
	public eatIngredient:IngredientObj;	//要吃掉的东西的对象
	public satisfy:number;	//满意度-100到100
	public badTaste:BadTaste;	//不满意类型，大多时候应该都是None，不然就……

	public constructor(eatIngredient:IngredientObj, satisfy:number, badTaste:BadTaste = BadTaste.None) {
		this.eatIngredient = eatIngredient;
		this.satisfy = satisfy;
		this.badTaste = badTaste;
	}

	/**
	 * 根据这个回合的结果，算出需要做的动作序列
	 * @param {CharacterObj} cha 针对这个角色而算出的列表，因为要依赖动作长度
	 */
	public GatherActionList(cha:CharacterObj):Array<EatingAction>{
		let res = new Array<EatingAction>();

		//吃的动作
		res.push(new EatingAction(
			cha.GetActionFrameCount(cha.direction, CharacterAction.Eat), 
			CharacterAction.Eat
		));

		//咀嚼
		res.push(new EatingAction(
			cha.GetActionFrameCount(cha.direction, CharacterAction.Chew), 
			CharacterAction.Chew)
		);

		//如果恶心了，那么就做恶心的动作，否则就是根据高兴程度来
		let resAction = this.GetEatActionBySatisfy();
		res.push(new EatingAction(
			cha.GetActionFrameCount(cha.direction, resAction),
			resAction
		));

		return res;
	}

	//根据高兴程度获得吃这口面的结果
	private GetEatActionBySatisfy():CharacterAction{
		if (this.badTaste != BadTaste.None){
			//优先不爽的感觉
			switch (this.badTaste){
				case BadTaste.Disappointed:return CharacterAction.Sigh;
				case BadTaste.Hatred:return CharacterAction.Hate;
				case BadTaste.Hot:return CharacterAction.Spicy;
				case BadTaste.TooHeavy:return CharacterAction.Salty;
			}
			return CharacterAction.Chew;
		}else if (this.satisfy > 80){
			return CharacterAction.Smile;
		}else if (this.satisfy > 60){
			return CharacterAction.Nod
		}else if (this.satisfy < -90){
			return CharacterAction.Hate
		}else if (this.satisfy < -75){
			return CharacterAction.Sigh
		}else{
			return CharacterAction.Chew
		}
	}
}
