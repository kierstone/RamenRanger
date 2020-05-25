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

	//相关数据
	public hungry:number = 100;	//吃面的人的饥饿度，这个未来可以有算法，现在先100开始，到0就吃饱吃撑了
	public desire:Array<Object>; //特别想吃的味道，{"tag":味道的tag, "turn":还剩下几个回合兴趣}
	public heart:number = 0;	//吃面开始到现在已经获得了多少爱心了

	//运行时
	public turnResult:EatTurnAction;
	private turnActions:Array<EatingAction>;
	private turnId:number = 0;
	private gameState:EatRamenGameState = EatRamenGameState.Enter;

	public constructor(cha:CharacterObj, ramen:RamenObj) {
		this.cha = cha;
		this.ramen = ramen;
	}

	/**
	 * 执行一个回合的逻辑思维，这个只有在回合开始一瞬间执行了
	 * 当然是在EatRamenGameState.Eat才会运行
	 */
	private RunATurn(){
		 //回合数先提高
		 this.turnId += 1;

		 //先看看你吃饱了就结束了
		 if (this.hungry <= 0){
			 this.gameState = EatRamenGameState.ReadyToLeave;
			 this.cha.ChangeAction(this.cha.direction, CharacterAction.Stand);
			 return; //TODO 没东西吃了，应该去后续状态
		 }

		 //选择要吃啥
		 let eatIng = this.ThisTurnEat();
		 if (eatIng == null){
			 this.gameState = EatRamenGameState.ReadyToLeave;
			 this.cha.ChangeAction(this.cha.direction, CharacterAction.Stand);
			 return;	//TODO 没东西吃了，应该去后续状态
		 }

		 //根据吃的东西改变属性
		 //根据吃的东西生成EatTurnAction和EatingAction
		 this.ThisTurnModify(eatIng);
	}

	//从拉面里选出这回合吃啥，当然目前是测试的，今后要改规则
	private ThisTurnEat():IngredientObj{
		if ((this.turnId % 2) == 0){
			//偶数回合吃料优先，TODO 找出最想吃的
			if (this.ramen.topping.length > 0){
				let sIndex = Math.floor(Math.random() * this.ramen.topping.length);
				return this.ramen.topping.splice(sIndex, 1)[0];
			}else if (this.ramen.noodlePercentage > 0){
				this.ramen.noodlePercentage -= 0.06; //TODO 先写死一口吃6%，应该来自于属性
				return this.ramen.model.noodles;
			}
		}else{
			if (this.ramen.noodlePercentage > 0){
				this.ramen.noodlePercentage -= 0.06; //TODO 先写死一口吃6%，应该来自于属性
				return this.ramen.model.noodles;
			}else if (this.ramen.topping.length > 0){
				let sIndex = Math.floor(Math.random() * this.ramen.topping.length);
				return this.ramen.topping.splice(sIndex, 1)[0];
			}
		}
		return null;
	}

	//根据吃的东西改变属性，并且获得行为列表 TODO 都是临时写死的
	private ThisTurnModify(eatIng:IngredientObj){
		this.hungry -= 1;

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

		if (!this.turnResult){
			this.turnResult = new EatTurnAction(
				eatIng, satisify, badTaste
			)
		}else{
			this.turnResult.badTaste = badTaste;
			this.turnResult.eatIngredient = eatIng;
			this.turnResult.satisfy = satisify;
		}

		this.turnActions = this.turnResult.GatherActionList(this.cha);
	}

	//返回是否立即重新绘制RamenSprite等内容
	public FixedUpdate():boolean{
		let requireUpdate = false;
		switch(this.gameState){
			case EatRamenGameState.Eat:{
				if (this.turnActions && this.turnActions.length > 0){
					let doingOne = this.turnActions[0];
					if (doingOne.tick > 0){
						this.cha.ChangeAction(this.cha.direction, doingOne.changeToAction);
						doingOne.tick -= 1;
					}
					if (doingOne.tick <= 0){
						this.turnActions.shift();
					}
				}else{
					this.RunATurn();
					requireUpdate = true;
				}
			}break;
		}

		return requireUpdate;
	}


	/**
	 * 临时的开吃
	 */
	public StartEat(){
		this.gameState = EatRamenGameState.Eat;
	}
}