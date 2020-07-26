class DiningTableSprite extends SpriteGroup{
	private chair:Array<eui.Image>;
	private table:eui.Image;

	private dtObj:DiningTableObj;

	public eatingCha:Array<EatingCharacterSpr>;
	private gameType:EatGameType;

	//角色贴图索引
	public heads:Array<SpriteClip>;
	public bodies:Array<SpriteClip>;
	public emotes:Array<SpriteClip>;
	public ramens:Array<RamenSprite>;
	public eatIngs:Array<eui.Image>;

	//TODO桌子信息等

	public constructor(dt:DiningTableObj, gameType:EatGameType) {
		super();
		this.dtObj = dt;
		this.gameType = gameType;

		this.heads = new Array<SpriteClip>();
		this.bodies = new Array<SpriteClip>();
		this.emotes = new Array<SpriteClip>();
		this.ramens = new Array<RamenSprite>();
		this.eatIngs = new Array<eui.Image>();
	}

	protected childrenCreated():void
	{
		super.childrenCreated();
		this.init();
	}

	private init(){
		//TODO 椅子写死
		this.chair = new Array<eui.Image>(); //new eui.Image(RES.getRes("wooden_chair"));
		this.eatingCha = new Array<EatingCharacterSpr>();
		for (let i = 0; i < this.dtObj.model.seats.length; i++){
			let sInfo = this.dtObj.model.seats[i];
			let se = new eui.Image();
			se.texture = RES.getRes(sInfo.source);
			this.addChild(se);
			se.anchorOffsetX = se.width / 2;
			se.anchorOffsetY = se.height / 2;
			se.x = this.dtObj.x + this.dtObj.model.seats[i].x;
			se.y = this.dtObj.y + this.dtObj.model.seats[i].y - 10;	//TODO 写死椅子的位置
			this.chair.push(se);

			this.eatingCha.push(new EatingCharacterSpr(this, sInfo, this.gameType));
		}
		
		this.table = new eui.Image(); //RES.getRes("wooden_single_table")
		this.table.texture = RES.getRes(this.dtObj.model.tableSource);
		this.addChild(this.table);
		this.table.width = this.dtObj.model.tableWidth;
		this.table.anchorOffsetX = this.table.width / 2;
		this.table.anchorOffsetY = this.table.height;
		if (this.dtObj.model.useScale9 == true){
			let rc = new egret.Rectangle(this.dtObj.model.tableScale9.x, 0, this.dtObj.model.tableScale9.width, this.table.height);
			this.table.scale9Grid = rc;
		}
	}

	private ResetZOrder(){
		let idxPlues = this.eatingCha.length + 10;
		
		if (this.chair) {
			for (let i = 0; i < this.chair.length; i++)
			this.chair[i].zIndex = 0 + i;
		}
		if (this.bodies) {
			for (let i = 0; i < this.bodies.length; i++)
				if (this.bodies[i]) this.bodies[i].zIndex = idxPlues * 2 + i;
		}
		if (this.table) {
			this.table.zIndex = idxPlues * 3;
		}
		if (this.ramens) {
			for (let i = 0; i < this.ramens.length; i++){
				if (this.ramens[i]) this.ramens[i].zIndex = idxPlues * 4 + i;
			}
		}
		if (this.heads) {
			for (let i = 0; i < this.heads.length; i++){
				if (this.heads[i]) this.heads[i].zIndex = idxPlues * 5 + i;
			}
		}
		if (this.emotes) {
			for (let i = 0; i < this.emotes.length; i++){
				if (this.heads[i]) this.emotes[i].zIndex = idxPlues * 6 + i;
			}
		}
		if (this.eatIngs) {
			for (let i = 0; i < this.eatIngs.length; i++){
				if (this.eatIngs[i]) this.eatIngs[i].zIndex = idxPlues * 7 + i;
			}
		}
		this.sortChildren();
	}

	/**
	 * 开吃了
	 */
	public StartEat(){
		for (let i = 0; i < this.eatingCha.length; i++){
			if (this.eatingCha[i].eatGame)
				this.eatingCha[i].StartEat();
		}
	}

	/**
	 * 现在的角色从椅子上挪走
	 */
	public RemoveCharacter(seatIndex:number){
		this.eatingCha[seatIndex].RemoveCharacter();
	}

	/**
	 * 让角色做到凳子上，TODO，现在凳子数据写死
	 */
	public SetCharacterToSeat(seatIndex:number, cha:CharacterObj, gameType:EatGameType){
		if (!cha) return;

		this.RemoveCharacter(seatIndex);

		if (seatIndex < 0 || seatIndex >= this.eatingCha.length) return;
		this.eatingCha[seatIndex].SetCharacter(cha);

		this.ResetZOrder();
	}

	/**
	 * 删除拉面
	 */
	public RemoveRamen(seatIndex:number){
		if (seatIndex < 0 || seatIndex >= this.eatingCha.length || !this.eatingCha[seatIndex])return;
		this.eatingCha[seatIndex].RemoveRamen();
	}

	/**
	 * 上拉面
	 */
	public PlaceRamenToSeat(seatIndex:number, ramen:RamenObj){
		this.RemoveRamen(seatIndex);
		if (!ramen || seatIndex < 0 || seatIndex >= this.eatingCha.length)return;
		this.eatingCha[seatIndex].SetRamen(ramen);
		this.ResetZOrder();
	}

	/**
	 * 获得某个SeatInfo
	 */
	public GetSeatInfoByIndex(index:number):DiningSeatInfo{
		if (index < 0 || index >= this.dtObj.model.seats.length) return null;
		return this.dtObj.model.seats[index];
	}

	/**
	 * 给所有坐了人的位置，上一份指定的美食
	 */
	public PlaceDishToAllCharacter(dish:FoodCourtDishObj){
		for (let i = 0; i < this.eatingCha.length; i++){
			this.eatingCha[i].RemoveRamen();
			let rX:number = 0;
			let rY:number = 0;
			if (i < this.dtObj.model.seats.length){
				rX = this.dtObj.model.seats[i].ramenX;
				rY = this.dtObj.model.seats[i].ramenY;
			}
			if (this.eatingCha[i].hasCha == true){
				this.eatingCha[i].SetDish(dish);
			}
		}
	}

	/**
	 * 移除所有食物和人
	 */
	public RemoveAllEatings(){
		for (let i = 0; i < this.eatingCha.length; i++){
			this.eatingCha[i].RemoveMe();
		}
	}


	/**
	 * 是否所有角色都吃完了
	 */
	public AllFinished():boolean{
		for (let i = 0; i < this.eatingCha.length; i++){
			if (this.eatingCha[i].hasRamen && this.eatingCha[i].IsFinished() == false){
				return false;
			}
		}
		return true;
	}




	public Update(){
		for (let i = 0; i < this.eatingCha.length; i++){
			this.eatingCha[i].Update();
		}
		this.ResetZOrder();	//TODO 开销大的话，有必要换位置
	}
}

/**
 * 每一个正在吃东西的角色，自动生成一个RamenSpr和一个CharacterSpr供上层使用
 */
class EatingCharacterSpr{
	//这是要暴露给上层去绘制的东西
	public eatingIngImg:eui.Image;	//正在吃的那个东西
	public ramenSpr:RamenSprite;	//被创建的
	public chaSpr:CharacterSprite;	//被创建的

	public eatingNoodle:boolean;	//正在吃的东西是不是面条；
	public noodlePos:egret.Point;	//面条的位置记录

	private eatting:boolean = false;
	private runningTurnIndex:number = 0;
	private runningActionIndex:number = 0;
	private runningTick:number = 0;

	public hasCha:boolean = false;
	public hasRamen:boolean = false;
	private cha:CharacterObj;
	private ramenObj:RamenObj;	

	public eatGame:EatingRamen;

	public seatInfo:DiningSeatInfo;
	private eatGameType:EatGameType;
	private _p:DiningTableSprite;
	private dishInfo:FoodCourtDishObj;

	public constructor(p:DiningTableSprite, seat:DiningSeatInfo, eatGameType:EatGameType){
		this.noodlePos = new egret.Point(0,0);
		this.seatInfo = seat;
		this.eatGameType = eatGameType;
		this._p = p;
	}

	/**
	 * 当前座位上的角色是否喜欢座位上的美食
	 * 注意：如果端上来的是拉面而不是美食，则不会喜欢
	 */
	public CharacterFavourDish():boolean{
		if (!this.cha || !this.dishInfo) return false;
		return this.cha.buddyInfo.isPlayer == true ? false : (
			this.cha.buddyInfo.favourType == this.dishInfo.model.type
		)
	}

	/**
	 * 角色坐到这个座位上
	 * @param {CharacterObj} cha 要坐上来的角色
	 */
	public SetCharacter(cha:CharacterObj){
		if (!cha) return;
		this.cha = cha;
		this.hasCha = true;
		this.chaSpr = new CharacterSprite(this.cha, this.seatInfo.x, this.seatInfo.y);
		this._p.addChild(this.chaSpr);
		if (this.chaSpr.head) {
			this._p.addChild(this.chaSpr.head);
			this._p.heads.push(this.chaSpr.head);
		}
		if (this.chaSpr.body) {
			this._p.addChild(this.chaSpr.body);
			this._p.bodies.push(this.chaSpr.body);
		}
		if (this.chaSpr.emote) {
			this._p.addChild(this.chaSpr.emote);
			this._p.emotes.push(this.chaSpr.emote);
		}
		
		this.GatherEatingGame();
	}

	/**
	 * 移除掉这个座位上的角色
	 */
	public RemoveCharacter(){
		if (this.hasCha == false) return;
		this.hasCha = false;
		if (this.chaSpr.head){
			let idx = this._p.heads.indexOf(this.chaSpr.head);
			if (idx >= 0) this._p.heads.splice(idx, 1);
			if (this.chaSpr.head.parent) this.chaSpr.head.parent.removeChild(this.chaSpr.head); 
		}
		
		if (this.chaSpr.body){
			let idx = this._p.bodies.indexOf(this.chaSpr.body);
			if (idx >= 0) this._p.bodies.splice(idx, 1);
			if (this.chaSpr.body.parent) this.chaSpr.body.parent.removeChild(this.chaSpr.body);
		} 

		if (this.chaSpr.emote){
			let idx = this._p.emotes.indexOf(this.chaSpr.emote);
			if (idx >= 0) this._p.emotes.splice(idx, 1);
			if (this.chaSpr.emote.parent) this.chaSpr.emote.parent.removeChild(this.chaSpr.emote); 
		} 

		if (this.chaSpr.parent) this.chaSpr.parent.removeChild(this.chaSpr);
		this.chaSpr = null;
		this.cha = null;
		this.eatGame = null;
	}

	/**
	 * 根据RamenObj来设置EatGame的食物对象
	 */
	public SetRamen(ramen:RamenObj){
		if (!ramen) return;
		this.hasRamen = true;
		let atTableX:number = this.seatInfo.ramenX;
		let atTableY:number = this.seatInfo.ramenY;
		this.ramenObj = ramen.Clone(false);
		this.ramenSpr = new RamenSprite(this.ramenObj);
		if (this.ramenSpr) {
			this._p.addChild(this.ramenSpr);
			this._p.ramens.push(this.ramenSpr);
			this.ramenSpr.x = atTableX;
			this.ramenSpr.y = atTableY;
		}
		
		this.GatherEatingGame();
	}

	/**
	 * 根据FoodCourtDish来设置EatGame食物对象
	 */
	public SetDish(dish:FoodCourtDishObj){
		if (!dish || !dish.dish) return;
		this.dishInfo = dish;
		this.hasRamen = true;
		let atTableX:number = this.seatInfo.ramenX;
		let atTableY:number = this.seatInfo.ramenY;
		this.ramenObj = dish.dish.Clone(false);
		this.ramenSpr = new RamenSprite(this.ramenObj);
		if (this.ramenSpr) {
			this._p.addChild(this.ramenSpr);
			this._p.ramens.push(this.ramenSpr);
			this.ramenSpr.x = atTableX;
			this.ramenSpr.y = atTableY;
		}
		
		this.GatherEatingGame(dish);
	}

	private GatherEatingGame(dishObj:FoodCourtDishObj = null){
		if (this.cha && this.ramenObj){
			this.eatGame = new EatingRamen(this.cha, this.ramenObj, dishObj ,this.eatGameType);
		}
	}

	/**
	 * 顾客和面条全部移除掉
	 */
	public RemoveMe(){
		this.RemoveCharacter();
		this.RemoveRamen();
	}

	/**
	 * 拿走面条
	 */
	public RemoveRamen(){
		if (this.ramenSpr && this.ramenSpr.parent){
			let idx = this._p.ramens.indexOf(this.ramenSpr);
			if (idx >= 0) this._p.ramens.splice(idx, 1);
			this.ramenSpr.parent.removeChild(this.ramenSpr);
			this.ramenSpr = null;
		}
		this.dishInfo = null;	//dishInfo会被一起清空
		this.ramenObj = null;
		this.hasRamen = false;
	}

	/**
	 * 是否已经吃光了
	 */
	public IsFinished():boolean{
		if (!this.eatGame || !this.eatGame.turnResult) return true;
		return this.runningTurnIndex >= this.eatGame.turnResult.length;
	}

	/**
	 * 本回合将要学到的食材信息
	 */
	public CurrentTurnGatherIngredient():FoodCourtIngredient{
		if (
			!this.eatGame || 
			!this.eatGame.learnedIngredientInfo || 
			this.eatGame.learnedIngredientInfo.length <= 0 ||
			this.runningActionIndex > 0 ||
			this.runningTick > 0
		) return null;

		for (let i = 0; i < this.eatGame.learnedIngredientInfo.length; i++){
			if (i == this.runningTurnIndex){
				return this.eatGame.learnedIngredientInfo[i].learnedIngredient;
			}
		}

		return null;
	}



	public Update(){
		if (this.eatting == true) {
			if (this.chaSpr && this.ramenSpr) {

				let tTurn = this.eatGame.turnResult[this.runningTurnIndex];	//当前的回合
				let tAction = tTurn.actions[this.runningActionIndex];	//当前在做的动作

				if (this.runningTick <= 0){
					
					if (this.runningActionIndex <= 0){
						//进入新的回合的第一个动作的第一帧，弄一下吃掉的东西
						//正在吃的东西变化
						this.eatingNoodle = tTurn.isEatingNoodles;
						if (this.eatingNoodle == true){
							//如果吃的是面条
							if (!this.eatingIngImg){
								this.eatingIngImg = new eui.Image();
								this._p.addChild(this.eatingIngImg);
								this._p.eatIngs.push(this.eatingIngImg);
							}
							this.eatingIngImg.source = RES.getRes("eating_noodle");
							this.eatingIngImg.anchorOffsetX = this.eatingIngImg.width /2;
							this.eatingIngImg.anchorOffsetY = this.eatingIngImg.height;
							this.eatingIngImg.x = this.ramenSpr.x;
							this.eatingIngImg.y = this.ramenSpr.BrothOffsetY() + this.ramenSpr.y;
							this.eatingIngImg.scaleY = 0;
							this.noodlePos.y = Number.MAX_VALUE;	//重置面条的位置
						}else{
							//如果吃的是Toppings
							if (this.eatingIngImg){
								let idx = this._p.eatIngs.indexOf(this.eatingIngImg);
								if (idx >= 0) this._p.eatIngs.splice(idx, 1);
								if (this.eatingIngImg.parent){
									this.eatingIngImg.parent.removeChild(this.eatingIngImg);
								}
							}	
							this.eatingIngImg = tTurn.eatIngredient.GatherSceneImage(
								this._p, 
								this.ramenSpr.x + tTurn.eatIngredient.x, 
								this.ramenSpr.BrothOffsetY() + tTurn.eatIngredient.y
							);
							this._p.eatIngs.push(this.eatingIngImg);
						}
						this.eatingIngImg.visible = false;

						//碗里面的变化
						if (tTurn.isEatingNoodles == true){
							this.ramenObj.noodlePercentage -= tTurn.noodleReducePercentage;	//吃面条
						}else{
							let ingIdx = this.ramenObj.topping.indexOf(tTurn.eatIngredient);
							if (ingIdx >= 0){
								this.ramenObj.topping.splice(ingIdx, 1);
							}
						}
						this.ramenSpr.UpdateRamen();
					}
					//每回合的每一个action都要做的，而不是只在第一个action做的
					//角色的动作也变化了
					this.chaSpr.ChangeAction(this.chaSpr.direction, tAction.changeToAction);
				}

				//帧内需要做的事情
				
				//吃的东西
				if (this.eatingIngImg){
					let ingVisible = 	//吃的东西本帧是否可见？
						this.eatingNoodle == true ? //吃的是面条和不是面条还不同
							(
								//如果是面条，则看动作是否是吃、并且面条已经被绘制了
								this.chaSpr.IsDoingAction(CharacterAction.Eat) && 
								(this.eatingIngImg.visible == true || this.chaSpr.hasIngredientPoint == true)
							):	
							(
								//吃的是toppings的话看的是有没有数据点
								this.chaSpr.hasIngredientPoint == true
							);

					if (ingVisible == true){
						let cX = this.seatInfo.x;
						let cY = this.seatInfo.y;
						if (this.eatingNoodle == false){
							//Topping跟着手的位置走
							this.eatingIngImg.x = this.chaSpr.ingredientPoint.x + cX;
							this.eatingIngImg.y = this.chaSpr.ingredientPoint.y + cY;		
						}else{
							//Noodle就拉伸
							let noodleFlip = true; //是否要旋转面条
							if (this.chaSpr.hasIngredientPoint == true){
								this.noodlePos.x = this.chaSpr.ingredientPoint.x + cX;	//x坐标绝对信任
								let noodlePosY = this.chaSpr.ingredientPoint.y + cY;
								if (noodlePosY <  this.noodlePos.y){
									this.noodlePos.y = noodlePosY; //y取小的保持高度
									noodleFlip = false;	//还在拉伸，所以不要抽搐
								}
							}
							this.eatingIngImg.x = this.noodlePos.x;
							let noodleScaleY = (this.eatingIngImg.y - this.noodlePos.y)/this.eatingIngImg.height;
							this.eatingIngImg.scaleY = this.eatingIngImg.height > 0 ? noodleScaleY : 0;
							if (noodleFlip == true) this.eatingIngImg.scaleX *= -1;
						}
					}

					this.eatingIngImg.visible = ingVisible;
				}

				//帧数提高
				this.runningTick += 1;
				if (this.runningTick >= tAction.tick){		//TODO 如果动作少一帧，这里变成>就行了
					this.runningTick = 0;
					this.runningActionIndex += 1;
					if (this.runningActionIndex >= tTurn.actions.length){
						this.runningActionIndex = 0;
						this.runningTurnIndex += 1;
						if (this.runningTurnIndex >= this.eatGame.turnResult.length){
							//该结束了这个人的吃的过程了
							this.eatting = false;
							this.chaSpr.ChangeAction(
								this.chaSpr.direction, CharacterAction.Stand	//吃完以后站立动作
							);
						}
					}
				}
			}
		}

		//只要有角色就要变化
		if (this.chaSpr){
			this.chaSpr.Update();	//角色动作变化
		}
		
	}

	/**
	 * 开始吃
	 */
	public StartEat(){
		if (!this.eatGame) return;
		this.runningTick = 0;
		this.runningActionIndex = 0;
		this.runningTurnIndex = 0;
		this.eatting = true;
	}
}