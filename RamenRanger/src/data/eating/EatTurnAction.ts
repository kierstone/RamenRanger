/**
 * 首先我们把吃面的过程作为一个小游戏玩法，这样以后要扩展操作也简单
 * 只是吃面这个迷你游戏的每个回合要做些什么事情的数据结构
 */
class EatTurnAction {
	public eatIngredient:IngredientObj;	//要吃掉的东西的对象
	public satisfy:number;	//满意度-100到100
	public noodleReducePercentage:number; //吃面吃掉多少百分比
	public badTaste:BadTaste;	//不满意类型，大多时候应该都是None，不然就……
	public isEatingNoodles:boolean;	//这口吃的是不是面条
	public actions:Array<EatingAction>;	//这回合的动作列表
	public cha :CharacterObj;	//吃面的人
	private cInfo:CharacterActionInfo;

	public constructor(cha:CharacterObj, eatIngredient:IngredientObj, satisfy:number, foodIsNoodle:boolean, noodleReducePercentage:number, badTaste:BadTaste) {
		this.eatIngredient = eatIngredient;
		this.satisfy = satisfy;
		this.badTaste = badTaste;
		this.isEatingNoodles = foodIsNoodle;
		this.noodleReducePercentage = noodleReducePercentage;
		this.cha = cha;
		this.cInfo = cha.GetCharacterActionInfo();
		this.GatherActionList();
	}

	/**
	 * 根据这个回合的结果，算出需要做的动作序列
	 */
	private GatherActionList():Array<EatingAction>{
		this.actions = new Array<EatingAction>();

		//吃的动作
		let eatTimes = this.isEatingNoodles == true ? 3 : 1; //如果是面条则吃3下
		for (let i = 0; i < eatTimes; i++){
			this.actions.push(new EatingAction(
				this.cInfo.GetActionFrameCount(Direction.Down, CharacterAction.Eat), 
				CharacterAction.Eat
			));
		}

		//咀嚼2口
		for (let i = 0; i < 2; i++){
			this.actions.push(new EatingAction(
				this.cInfo.GetActionFrameCount(Direction.Down, CharacterAction.Chew), 
				CharacterAction.Chew)
			);
		}

		//如果恶心了，那么就做恶心的动作，否则就是根据高兴程度来
		let resAction = this.GetEatActionBySatisfy();
		this.actions.push(new EatingAction(
			this.cInfo.GetActionFrameCount(Direction.Down, resAction),
			resAction
		));

		return this.actions;
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


/**
 * 吃东西的FixedUpdate的数据
 */
class EatingAction {
	public tick:number; //要有多少个tick
	public changeToAction:CharacterAction;	//变换为什么动作
	//其他的比如喷出爱心等需要了再加

	public constructor(tick:number, toAction:CharacterAction) {
		this.tick = tick;
		this.changeToAction = toAction;
	}
}