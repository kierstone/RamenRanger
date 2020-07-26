class FoodCourtTeamBuild extends eui.Component implements  eui.UIComponent {
	private Group_Street:eui.Group;
	private Rect_Hunger:eui.Rect;
	private Group_HungerBar:eui.Group;

	public canControl:boolean = false;

	private ui_selectBuddyList:FoodCourt_SelectBuddyList;
	private buddyForSelect:Array<FoodCourtBuddy>;

	private team:Array<FoodCourtBuddy>;

	private mc:CharacterObj;
	private mainCharacter:CharacterSprite;
	private car:eui.Image;
	private carDoorX:number;
	private floorY:number = 430;
	private carHeight:number = 40;
	private npc:CharacterObj;
	private npcSpr:CharacterSprite;
	
	private uiPosY = 430;	//下方UI的y坐标

	public constructor() {
		super();
		this.team = new Array<FoodCourtBuddy>();
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
		this.InitBKG();
		//TODO buddy随机产生先
		this.buddyForSelect = new Array<FoodCourtBuddy>();
		for (let i = 0; i < 22; i++){
			let buddy = new FoodCourtBuddy()
			this.buddyForSelect.push(buddy);
		}

		this.EnterSelectBuddyState();

		let t = new egret.Timer(90);
		t.addEventListener(egret.TimerEvent.TIMER, ()=>{
			this.Update();
		}, this);
		t.start();
	}

	private InitBKG(){
		let storeY = this.floorY;

		//背景
		let bkg = new eui.Image();
		this.addChild(bkg);
		bkg.texture = RES.getRes("bkg_shanghai");
		bkg.fillMode = egret.BitmapFillMode.REPEAT;
		// bkg.width = this.stage.stageWidth;
		// bkg.height = storeY;

		//小汽车
		this.car = new eui.Image();
		this.car.texture = RES.getRes("bus_default_paint");
		this.addChild(this.car);
		this.car.anchorOffsetX = this.car.width / 2;
		this.car.anchorOffsetY = this.car.height;
		this.car.scaleX = -1;	//TODO 就先转转
		this.car.x = this.stage.stageWidth / 2;
		this.car.y = storeY + 30;

		this.carDoorX = this.stage.stageWidth / 2 - 80;

		this.Rect_Hunger.width = 0;

		//主角
		this.mc = new CharacterObj("schoolgirl", new FoodCourtBuddy(true));
		this.mainCharacter = new CharacterSprite(this.mc);
		this.mainCharacter.x = this.stage.stageWidth / 2;
		this.mainCharacter.y = this.floorY;
		this.addChild(this.mainCharacter);

		//饱食度条子
		this.HungerBarTweens();
	}

	private EnterSelectBuddyState(){
		if (!this.ui_selectBuddyList){
			this.ui_selectBuddyList = new FoodCourt_SelectBuddyList(
				this, this.buddyForSelect, 5, this.BuddySelectBehaveFunc, this.BuddySelectDoneEve
			);
		}
		this.addChild(this.ui_selectBuddyList);
		this.ui_selectBuddyList.y = this.stage.stageHeight;
		this.ui_selectBuddyList.height = this.stage.stageHeight - this.uiPosY;
		egret.Tween.removeTweens(this.ui_selectBuddyList);
		egret.Tween.get(this.ui_selectBuddyList)
			.to({y:this.uiPosY}, 300, egret.Ease.quadIn)
			.call(()=>{
				this.canControl = true;
			})
	}

	/**
	 * 选中或者反选小弟之后的表演
	 * @param {FoodCourtTeamBuild} thisObj 这个对象
	 * @param {Array<FoodCourtBuddy>} buddy 选中或者反选的小弟
	 * @param {boolean} addToTeam 是否添加到队伍，否的话就是从队伍移除
	 */
	private BuddySelectBehaveFunc(thisObj:FoodCourtTeamBuild, buddy:FoodCourtBuddy, addToTeam:boolean){
		//TODO 小弟选中和被移除的表现
		thisObj.canControl = false;
		if (addToTeam == true){
			thisObj.CreateChaAndMoveToCar(buddy);
		}else{
			thisObj.CreateChaAndMoveOutside(buddy);
		}
	}
	private CreateChaAndMoveToCar(buddy:FoodCourtBuddy){
		this.team.push(buddy);
		let chaStartX = -100;
		let carHeight = this.carHeight;
		let inTime = (this.carDoorX - chaStartX) / 400 * 1000;	//每秒移动400像素
		this.npc = new CharacterObj(buddy.body, buddy);
		this.npcSpr = new CharacterSprite(this.npc);
		this.npcSpr.x = chaStartX;
		this.npcSpr.y = this.floorY;
		this.addChild(this.npcSpr);
		egret.Tween.get(this.npcSpr)
			.call(()=>{
				this.npcSpr.ChangeAction(Direction.Right, CharacterAction.Walk);
			})
			.to({x:this.carDoorX}, inTime)
			.call(()=>{
				this.npcSpr.ChangeAction(Direction.Up, CharacterAction.Walk)
			})
			.to({y:this.floorY - carHeight}, 250)
			.call(()=>{
				this.HungerBarTweens();
				this.removeChild(this.npcSpr);
				this.npc = null;
				this.npcSpr = null;
				this.canControl = true;
			})
	}
	private CreateChaAndMoveOutside(buddy:FoodCourtBuddy){
		let bI = this.team.indexOf(buddy);
		if (bI >= 0){
			this.team.splice(bI, 1);
		}
		let chaStartX = -100;
		let carHeight = this.carHeight;
		let inTime = (this.carDoorX - chaStartX) / 400 * 1000;	//每秒移动400像素
		this.npc = new CharacterObj(buddy.body,buddy);
		this.npcSpr = new CharacterSprite(this.npc);
		this.npcSpr.x = this.carDoorX;
		this.npcSpr.y = this.floorY - this.carHeight;
		this.addChild(this.npcSpr);
		egret.Tween.get(this.npcSpr)
			.call(()=>{
				this.npcSpr.ChangeAction(Direction.Down, CharacterAction.Walk);
			})
			.to({y:this.floorY}, 250)
			.call(()=>{
				this.npcSpr.ChangeAction(Direction.Left, CharacterAction.Walk)
			})
			.to({x:chaStartX}, inTime)
			.call(()=>{
				this.HungerBarTweens();
				this.removeChild(this.npcSpr);
				this.npcSpr = null;
				this.npc = null;
				this.canControl = true;
			})
	}

	private CurrentHunger():number{
		let res = PlayerBaseHunger;
		for (let i = 0; i < this.team.length; i++){
			res += this.team[i].hunger;
		}
		return res;
	}
	private HungerBarTweens(){
		let tv = this.CurrentHunger();
		let tW = tv * 1.5;
		let inTime = Math.abs(tW - this.Rect_Hunger.width) / 100 * 1000;
		egret.Tween.removeTweens(this.Rect_Hunger);
		egret.Tween.get(this.Rect_Hunger)
			.to({width: tW}, inTime, egret.Ease.quadIn)
	}


	/**
	 * 点击确定之后的事件
	 * @param {FoodCourtTeamBuild} thisObj 这个对象
	 * @param {Array<FoodCourtBuddy>} team 所有选中的小弟
	 */
	private BuddySelectDoneEve(thisObj:FoodCourtTeamBuild, team:Array<FoodCourtBuddy>){
		thisObj.team = team;
		thisObj.LeaveBuddySelectEnterHeroSelect();
	}

	private LeaveBuddySelectEnterHeroSelect(){
		this.canControl = false;
		egret.Tween.removeTweens(this.ui_selectBuddyList)
		egret.Tween.get(this.ui_selectBuddyList)
			.to({y:this.stage.stageHeight}, 300, egret.Ease.quadOut)
			.call(()=>{
				this.StartTravel();
			});
	}


	//开始探索模式
	private StartTravel(){
		this.canControl = false;

		this.Group_HungerBar.visible = false;
		
		let mInTime = Math.abs(this.mainCharacter.x - this.carDoorX) / 300 * 1000;
		egret.Tween.removeTweens(this.mainCharacter);
		egret.Tween.get(this.mainCharacter)
			.call(()=>{
				this.mainCharacter.ChangeAction(
					this.carDoorX > this.mainCharacter.x ? Direction.Right : Direction.Left, CharacterAction.Walk
				);
			})
			.to({x:this.carDoorX}, mInTime)
			.call(()=>{
				this.mainCharacter.ChangeAction(
					Direction.Up, CharacterAction.Walk
				);
			})
			.to({y:this.floorY - this.carHeight}, 150)
			.call(()=>{
				this.mainCharacter.parent.removeChild(this.mainCharacter);

				let carTargetX = 1500;
				let inTime = (carTargetX - this.car.x) / 500 * 1000;
				egret.Tween.removeTweens(this.car);
				egret.Tween.get(this.car)
					.to({x:1500},inTime, egret.Ease.quadIn)
					.call(()=>{
						//离开场景，进入履行了
						Utils.UIRoot.addChild(new HorizontalFoodCourt(this.team));
						this.parent.removeChild(this);
					})
			})
		
	}



	private Update(){
		if (this.npcSpr){
			this.npcSpr.Update();
		}
		if (this.mainCharacter){
			this.mainCharacter.Update();
		}
	}
}