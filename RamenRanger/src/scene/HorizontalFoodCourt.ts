class HorizontalFoodCourt extends eui.Component implements  eui.UIComponent {
	private Label_Hungry:eui.Label;
	private Group_Street:eui.Group;
	private Button_Go:eui.Button;

	private Group_Test:eui.Group;

	private mainCharacter:CharacterSprite;
	private teamSpr:Array<CharacterSprite>;	//所有人的Sprite
	private store:Array<FoodCourtStoreObj>;
	private storeX:Array<number>;
	private buddies:Array<FoodCourtBuddy>;

	private uiNormalMenu:FoodCourt_NormalMenu;
	private uiStoreMenu:FoodCourt_StoreMenu;
	
	private Scroller_IngLearn:eui.Scroller;

	private Rect_HungerMinus:eui.Rect;
	private Rect_HungerBack:eui.Rect;
	private Rect_HungerNow:eui.Rect;

	private dTable:DiningTableSprite;	//餐桌，其实是可以开始就建立好的
	private dtPosY:number = 600;	//餐桌位置

	private lastLearnedIngId:Array<string>;	//上一轮学会的素材
	private stepIndex:number;

	private Group_Ing:eui.Group;
	private IngHint:Array<HorizontalFoodCourt_IngredientExp>;

	public hungry:number = 0;
	public hungerMax:number = 0;
	private ingredientExp:Array<FoodCourtIngredient>;
	
	public canControl:boolean = true;
	private eating:boolean = false;	//角色们是否正在吃东西

	private groundY = 400;	//街道的地面坐标
	private uiPosY = 450;	//下方UI的y坐标
	private uiOrderPosY = 650;	//点菜的菜单y坐标

	private teamChaDis = 80;	//角色之间距离

	public constructor(team:Array<FoodCourtBuddy>) {
		super();
		this.buddies = team;
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.init();
	}
	
	private init(){
		this.canControl = false;
		this.NewGame();

		this.Button_Go.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			if (this.canControl == false) return;
			if (this.hungry <= 0) return;
			this.MoveToStepIndex(this.stepIndex + 1);
		},this);


		let t = new egret.Timer(Utils.TickTime);
		t.addEventListener(egret.TimerEvent.TIMER, ()=>{
			this.Update();
		}, this);
		t.start();
	}
	private _ticked:number = 0;


	//根据要求开店，现在店里的内容都写死
	private NewGame(){
		//初始化逻辑数据
		this.store = new Array<FoodCourtStoreObj>();
		this.lastLearnedIngId = new Array<string>();
		this.stepIndex = -1;
		this.hungry = 0;
		this.ingredientExp = new Array<FoodCourtIngredient>();

		this.hungerMax = PlayerBaseHunger;
		for (let i = 0; i < this.buddies.length; i++){
			this.hungerMax += this.buddies[i].hunger;
		}
		this.hungry = this.hungerMax;

		this.SetHungerBar(this.hungerMax, this.hungerMax);
		
		//根据写死的规则产生重要信息
		for (let i = 0; i < 10; i++){
			let sCount = Utils.RandomInt(2, 3);
			let idx = Utils.GetRandomIndexFromArray(GameData_FoodCourtDish.length, sCount);
			let foods = new Array<FoodCourtDishObj>();
			for (let n = 0; n < idx.length; n++){
				foods.push(new FoodCourtDishObj(GameData_FoodCourtDish[idx[n]]));
			}
			let fcStore:FoodCourtStoreObj = new FoodCourtStoreObj(foods);
			this.store.push(fcStore);
		}

		//刷新美术
		this.InitRender();

		//游戏状态
		this.ChaEnterSceneAndStartGame();
	}

	//角色走进场地，然后开始游戏，当然这时候UI也出来了
	private ChaEnterSceneAndStartGame(){
		let inTime = Math.abs(this.mainCharacter.x - this.stage.stageWidth / 2) / 400 * 1000;
		for (let i = 0; i < this.teamSpr.length; i++){
			this.teamSpr[i].ChangeAction(Direction.Right, CharacterAction.Walk);
			egret.Tween.removeTweens(this.teamSpr[i]);
			egret.Tween.get(this.teamSpr[i])
				.to({x: this.CharacterTeamPosX(i)}, inTime)
				.call(()=>{
					this.teamSpr[i].ChangeAction(Direction.Down, CharacterAction.Stand);
					if (i == 0){
						this.canControl = true;
					}
				})
		}

		if (!this.uiNormalMenu){
			this.uiNormalMenu = new FoodCourt_NormalMenu();
			this.addChild(this.uiNormalMenu);
			this.uiNormalMenu.height = this.stage.stageHeight - this.uiPosY;
			//TODO 进入的动画
			this.uiNormalMenu.y = this.uiPosY;
		}
	}

	//一个角色应该处于街道的X坐标
	private CharacterTeamPosX(chaIndex:number){
		return this.stage.stageWidth / 2 - chaIndex * this.teamChaDis
	}
	

	/**
	 * 根据食物类型，获得对应事物的喜好者们
	 * @param {FoodCourtDishType} ft 食物类型
	 * @returns {Array<FoodCourtBuddy>} 喜欢的人列表
	 */
	public GetFavourGuyByDishType(ft:FoodCourtDishType){
		let res = new Array<FoodCourtBuddy>();
		for (let i = 0; i < this.buddies.length; i++){
			if (this.buddies[i].favourType == ft){
				res.push(this.buddies[i]);
			}
		}
		return res;
	}

	/**
	 * 是否还能吃得下这个食物
	 * @param {FoodCourtDishObj} dish 要吃的东西
	 * @returns {boolean} 是否还能吃得下
	 */
	public CanEatThisDish(dish:FoodCourtDishObj):boolean{
		return this.hungry /*+ dish.model.feed*/ <= this.hungerMax;
	}

	private InitRender(){
		if (this.mainCharacter && this.mainCharacter.parent){
			this.mainCharacter.parent.removeChild(this.mainCharacter);
		}
		this.Group_Street.removeChildren();

		//店铺
		this.storeX = new Array<number>();
		let startAt = 700;
		let storeDis = 350;
		let storeY = this.groundY;
		for (let i = 0; i < this.store.length; i++){
			let img = new eui.Image();
			img.texture = RES.getRes(this.store[i].source);
			this.Group_Street.addChild(img);
			img.anchorOffsetX = img.width / 2;
			img.anchorOffsetY = img.height;
			img.scaleX = img.scaleY = 1.5;	//TODO 写死

			img.x = startAt + i * storeDis;
			img.y = storeY;
			this.storeX.push(img.x);
		}

		//主角
		let chaStartX = -80
		let mc = new CharacterObj("schoolgirl", new FoodCourtBuddy(true));
		this.mainCharacter = new CharacterSprite(mc);
		this.mainCharacter.x = chaStartX;
		this.mainCharacter.y = this.groundY;
		this.addChild(this.mainCharacter);
		
		this.teamSpr = new Array<CharacterSprite>();
		this.teamSpr.push(this.mainCharacter);

		for (let i = 0; i < this.buddies.length; i++){
			let cha = new CharacterObj(this.buddies[i].body, this.buddies[i]);
			let chaSpr = new CharacterSprite(cha);
			chaSpr.x = chaStartX - (i + 1) * this.teamChaDis;
			chaSpr.y = this.groundY;
			this.addChild(chaSpr);
			this.teamSpr.push(chaSpr);
		}

		//餐桌
		let seats = new Array<DiningSeatInfo>();
		let sPosX = [0, -80, 80, -160, 160, -240, 240]
		for (let i = 0; i < sPosX.length; i++){
			seats.push(new DiningSeatInfo(
				"wooden_chair", sPosX[i], -50, sPosX[i], -24
			))
		}
		this.dTable = new DiningTableSprite(
			new DiningTableObj(
				new DiningTableModel(
					"wooden_single_table", seats, 580, new egret.Rectangle(30,0,10,10)
				)
			),
			EatGameType.FoodCourt
		)
		this.addChild(this.dTable);
		this.dTable.x = this.stage.stageWidth / 2;
		this.dTable.y = this.dtPosY;
		this.dTable.visible = false;
		
		
		//学习的东西列表
		this.Scroller_IngLearn.y = this.stage.stageHeight;
		this.Group_Ing.removeChildren();
		this.IngHint = new Array<HorizontalFoodCourt_IngredientExp>();
		
		//TEST
		// let img = new eui.Image("ui_craft_selected");
		// img.x = 100;
		// img.y = 100;
		// this.addChild(img);
		// this.Group_Street.addChild(img);
		// this.Group_Test.addChild(img);
	}

	//角色移动到某个格子
	private MoveToStepIndex(index:number){
		this.canControl = false;
		this.stepIndex = Math.min(this.store.length - 1, Math.max(this.stepIndex, index));
		let tarX = this.storeX[this.stepIndex] - this.stage.stageWidth / 2;
		let moveLen = tarX + this.Group_Street.x;
		let inTime = moveLen / 400 * 1000;	//每秒移动400pixel

		for (let i = 0; i < this.teamSpr.length; i++){
			this.teamSpr[i].ChangeAction(Direction.Right, CharacterAction.Walk);
		}

		egret.Tween.removeTweens(this.Group_Street);
		egret.Tween.get(this.Group_Street).to({x:this.Group_Street.x - moveLen}, inTime)
			.call(()=>{
				for (let i = 0; i < this.teamSpr.length; i++){
					this.teamSpr[i].ChangeAction(Direction.Down, CharacterAction.Stand);
				}
				//进入店铺的UI切换了
				this.EnterTheStall(this.store[this.stepIndex]);
				//this.addChild(new HorizontalFoodCourt_StoreUI(this, this.store[this.stepIndex]));
			},this);
		

		//this.Update();
	}

	//进入一家店铺，然后出现菜单
	private EnterTheStall(store:FoodCourtStoreObj){
		this.dTable.visible = true;
		this.Button_Go.visible = false;

		for (let i = 0; i < this.teamSpr.length; i++){
			let seatInfo = this.dTable.GetSeatInfoByIndex(i);
			if (seatInfo == null){
				break;
			}
			let seatX = seatInfo.x + this.dTable.x;
			let seatY = seatInfo.y + this.dTable.y;

			let hMoveTime = Math.abs(seatX - this.teamSpr[i].x) / 400 * 1000;
			let vMoveTime = Math.abs(seatY - this.teamSpr[i].y) / 400 * 1000;

			egret.Tween.removeTweens(this.teamSpr[i]);
			egret.Tween.get(this.teamSpr[i])
				.call(()=>{
					this.teamSpr[i].ChangeAction(
						seatX > this.teamSpr[i].x ? Direction.Right : Direction.Left, CharacterAction.Walk
					)
				})
				.to({x:seatX}, hMoveTime)
				.call(()=>{
					this.teamSpr[i].ChangeAction(
						Direction.Down, CharacterAction.Walk
					)
				})
				.to({y:seatY}, vMoveTime)
				.call(()=>{
					this.teamSpr[i].visible = false;
					this.dTable.SetCharacterToSeat(i, this.teamSpr[i].character, EatGameType.FoodCourt);	//TODO....第三个参数
					
					//TODO 走到以后出菜单
					if ( i == this.teamSpr.length - 1){
						if (this.uiNormalMenu){
							egret.Tween.removeTweens(this.uiNormalMenu);
							egret.Tween.get(this.uiNormalMenu)
								.to({y:this.stage.stageHeight}, 300, egret.Ease.quadIn)
								.call(()=>{
									this.StoreMenuIn(store);
								})
						}else{
							this.StoreMenuIn(store);
						}
					}
				})
		}
	}

	//吃完了，离开这家店
	private LeaveTheStore(){
		//先清理桌子
		this.dTable.RemoveAllEatings();

		//每个角色还原
		for (let i = 0; i < this.teamSpr.length; i++){
			this.teamSpr[i].visible = true;

			let teamX = this.CharacterTeamPosX(i);
			let teamY = this.groundY + this.Group_Street.y;

			let hMoveTime = Math.abs(teamX - this.teamSpr[i].x) / 400 * 1000;
			let vMoveTime = Math.abs(teamY - this.teamSpr[i].y) / 400 * 1000;

			egret.Tween.removeTweens(this.teamSpr[i]);
			egret.Tween.get(this.teamSpr[i])
				.call(()=>{
					this.teamSpr[i].ChangeAction(
						Direction.Up, CharacterAction.Walk
					)
				})
				.to({y:teamY}, vMoveTime)
				.call(()=>{
					this.teamSpr[i].ChangeAction(
						teamX > this.teamSpr[i].x ? Direction.Right : Direction.Left, CharacterAction.Walk
					)
				})
				.to({x:teamX}, hMoveTime)
				.call(()=>{
					this.teamSpr[i].ChangeAction(Direction.Down, CharacterAction.Stand);
					
					//TODO 出现等待移动的状态，以及界面更替
					if ( i == this.teamSpr.length - 1){
						this.dTable.visible = false;
						if (this.uiNormalMenu){
							egret.Tween.removeTweens(this.uiNormalMenu);
							egret.Tween.get(this.uiNormalMenu)
								.to({y:this.uiPosY}, 300, egret.Ease.quadOut)
								.call(()=>{
									this.BackToStreet();
								})
						}else{
							this.BackToStreet();
						}
					}
				})
		}
	}

	//进入正常的等待状态
	private BackToStreet(){
		if (this.IsGameOver() == false){
			this.Button_Go.visible = true;
			this.canControl = true;
		}else{
			//TODO game over了，该退出这个玩法了
		}
		
	}

	//判断是否结束了
	private IsGameOver(){
		return (
			this.hungry <= 0 ||
			this.stepIndex >= this.store.length
		)
	}

	//进入店铺，菜单出现
	private StoreMenuIn(store:FoodCourtStoreObj){
		if (!this.uiStoreMenu){
			this.uiStoreMenu = new FoodCourt_StoreMenu(this, store);
		}
		this.addChild(this.uiStoreMenu);
		this.uiStoreMenu.y = this.stage.stageHeight;
		this.uiStoreMenu.height = this.stage.stageHeight - this.uiOrderPosY;
		egret.Tween.removeTweens(this.uiStoreMenu);
		egret.Tween.get(this.uiStoreMenu)
			.to({y:this.uiOrderPosY}, 300, egret.Ease.quadOut)
			.call(()=>{
				this.canControl = true;
			})
	}

	//给ui调用的不吃了的事件
	public CancelEat(caller:HorizontalFoodCourt){
		caller.hungry -= 5;
		caller.hungry = Math.max(caller.hungry, 0);
		caller.canControl = true;
		//caller.Update();
	}

	//给ui调用的吃的事件
	public EatDish(caller:HorizontalFoodCourt, dish:FoodCourtDishObj){
		caller.canControl = false;
		//Show Dialog就完了
		caller._StartEatDish(dish);
	}


	/**
	 * 点菜的菜单退出屏幕，食材经验条进入屏幕，然后开始吃
	 */
	private _StartEatDish(dish:FoodCourtDishObj){
		this.canControl = false;
		let toHun = Math.max(this.hungry - dish.model.feed, 0);
		this.HungerBarTweenTo(this.hungry, toHun);
		this.hungry = toHun;

		egret.Tween.removeTweens(this.uiStoreMenu);
		egret.Tween.get(this.uiStoreMenu)
			.to({y:this.stage.stageHeight}, 200, egret.Ease.quadIn)
			.call(()=>{
				egret.Tween.removeTweens(this.Scroller_IngLearn)
				egret.Tween.get(this.Scroller_IngLearn)
					.to({y: this.stage.stageHeight - this.Scroller_IngLearn.height}, 100, egret.Ease.quadOut)
					.call(()=>{
						//真正开始吃了
						this.dTable.StartEat();
						this.eating = true;
						if (this.uiStoreMenu.parent) this.uiStoreMenu.parent.removeChild(this.uiStoreMenu);
						this.uiStoreMenu = null;
					})
			})
	}






	/**
	 * 给其他ui用的，选中一个dish，显示反应
	 * @param {HorizontalFoodCourt} caller 会调用的thisObj
	 * @param {FoodCourtDishObj} dish 准备要吃啥
	 */
	public SelectDish(caller:HorizontalFoodCourt, dish:FoodCourtDishObj){
		caller.SetHungerBar(caller.hungry, Math.max(0, caller.hungry - dish.model.feed));
		if (caller.dTable){
			caller.dTable.PlaceDishToAllCharacter(dish);
		}
		for (let i = 0; i < caller.teamSpr.length; i++){
			if (caller.teamSpr[i].character.buddyInfo && caller.teamSpr[i].character.buddyInfo.isPlayer == false){
				let favColor = caller.teamSpr[i].character.buddyInfo.favourType;
				if (favColor == dish.model.type){
					//喜欢的
					caller.teamSpr[i].ChangeAction(Direction.Down, CharacterAction.Clap);
				}else{
					//一般般
					caller.teamSpr[i].ChangeAction(Direction.Down, CharacterAction.Stand);
				}
			}else{
				//主角，所以没有buddyInfo
				caller.teamSpr[i].ChangeAction(Direction.Down, CharacterAction.Stand);
			}
		}
	}

	private AddIngredientExp(ing:FoodCourtIngredient, favourCount:number){
		for (let i = 0; i < this.ingredientExp.length; i++){
			if (this.ingredientExp[i].broth == ing.broth && this.ingredientExp[i].ingredientId == ing.ingredientId){
				//修改存在的
				this.ingredientExp[i].exp += Math.ceil(ing.exp * (1 + favourCount * 0.3));
				return;
			}
		}
		//添加新的
		let newIng = new FoodCourtIngredient(ing.ingredientId, ing.exp, ing.broth);
		this.ingredientExp.push(newIng);
		let iHint = new HorizontalFoodCourt_IngredientExp(newIng);
		this.IngHint.push(iHint);
		this.Group_Ing.addChild(iHint);

		//this.Update();
	}

	//满腹条
	private  HungerBarLength(v:number):number{
		return v * 1.5;
	}
	/**
	 * 设置满腹度条子
	 * @param {number} fromHunger 从多少开始
	 * @param {number} toHunger 到达多少为止
	 */
	public SetHungerBar(fromHunger:number, toHunger:number){
		fromHunger = Math.min(this.hungerMax, Math.max(0, fromHunger));
		toHunger = Math.min(this.hungerMax, Math.max(0, toHunger));
		let dis = Math.abs(fromHunger - toHunger);
		
		this.Rect_HungerBack.width = this.HungerBarLength(this.hungerMax) + 4; //外边框2
		this.Rect_HungerNow.width = this.HungerBarLength(fromHunger);
		this.Rect_HungerMinus.width = this.HungerBarLength(dis);
		this.Rect_HungerMinus.anchorOffsetX = (fromHunger >= toHunger ? this.Rect_HungerMinus.width : 0)
		this.Rect_HungerMinus.x = 
			this.Rect_HungerNow.x + this.Rect_HungerNow.width // - 
			//(fromHunger < toHunger ? -1 : 1) * this.Rect_HungerMinus.width;
	}
	/**
	 * 满腹条变化，我可不负责设置Hungry值
	 * @param {number} fromHunger 从多少开始
	 * @param {number} toHunger 到达多少为止
	 */
	public HungerBarTweenTo(fromHunger:number, toHunger:number){
		this.SetHungerBar(fromHunger, toHunger);
		let inTime = Math.abs(fromHunger - toHunger) / 100 * 1000;
		egret.Tween.removeTweens(this.Rect_HungerNow);
		egret.Tween.removeTweens(this.Rect_HungerMinus);
		if (inTime > 0){
			egret.Tween.get(this.Rect_HungerNow).to({width:this.HungerBarLength(toHunger)}, inTime);
			egret.Tween.get(this.Rect_HungerMinus).to({width:0}, inTime);
		}
	}


	public Update(){
		this.Label_Hungry.text = "满腹度：" + this.hungry.toString() + "/" + this.hungerMax.toString();
		//主角
		for (let i = 0; i < this.teamSpr.length; i++){
			this.teamSpr[i].Update();
		}
		//学习的东西
		for (let i = 0; i < this.IngHint.length; i++){
			this.IngHint[i].Update();
		}
		//桌子
		if (this.dTable){
			this.dTable.Update();
		}
		if (this.eating == true){
			if (this.dTable.AllFinished() == true){
				this.eating = false;
				this.LeaveTheStore();
			}
		}
		//饱食度条子
		if (this.Rect_HungerMinus){
			if (this.Rect_HungerMinus.alpha > 0){
				this.Rect_HungerMinus.alpha -= 0.05;
			}else{
				this.Rect_HungerMinus.alpha = 1;
			}
		}
	}
}

enum FoodCourtGameState{
	SelectBuddy = 0,
	SelectHero = 1,
	Moving = 2,
	EnterStall = 3,
	SelectDish = 4,
	Eating = 5,
	BackToStreet = 6
}