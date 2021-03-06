class TestScene extends eui.Component implements  eui.UIComponent {
	private HSilder_Size:eui.HSlider;
	private Label_Size:eui.Label;
	private Button_Start:eui.Button;
	private Button_Back:eui.Button;

	//From Street
	private toUpdateTicker:number = 0;
	private tick:number = 0;
	private chaRefTicker:number = 0;
	private gameLayer:eui.Group;
	private sprites:Array<SpriteGroup>;	//所有sprite层图片
	private actor:CharacterObj;
	private zOrderBase = 10000;	//在重新计算zOrder时，加上这个数字



	private ramenObj:RamenObj;
	private diningTable:DiningTableSprite;
	// private ramen:RamenSpriteClip;

	private timeScale = 1;

	public constructor(ramen:RamenModel) {
		super();
		this.ramenObj = new RamenObj(ramen);
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.sprites = new Array<SpriteGroup>();
		this.init();
	}

	private init(){
		
		//this.PlaceCharacter("schoolgirl", 150, 450);

		this.actor = new CharacterObj("schoolgirl", new FoodCourtBuddy());
		this.PlaceTable(350, 500);
		for (let i = 0; i < 3; i++){
			let _actor = new CharacterObj("schoolgirl", new FoodCourtBuddy());
			let _ramen = this.ramenObj.Clone(false);
			this.diningTable.SetCharacterToSeat(i, _actor, EatGameType.EatNoodle);
			this.diningTable.PlaceRamenToSeat(i, _ramen);
		}
		

		this.RearrangeSpritesZOrder();

		this.HSilder_Size.addEventListener(egret.Event.CHANGE, ()=>{
			let toSize = this.HSilder_Size.value * 0.05 + 1;
			this.ChangeShowSize(toSize);
			this.Label_Size.text = toSize.toFixed(2).toString();
		},this);

		this.Button_Start.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			if (this.diningTable){
				this.diningTable.StartEat();
			}
		},this);

		this.Button_Back.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			Utils.UIRoot.addChild(new FoodCourtTeamBuild());
			this.parent.removeChild(this);
		},this);

		//开启一个update和fixedUpdate的计时器
		let t = new egret.Timer(Utils.TickTime * this.timeScale);
		t.addEventListener(egret.TimerEvent.TIMER, ()=>{
			this.Update();
			this.RearrangeSpritesZOrder();	//ZOrder每个逻辑tick都会重新排列，所以FixedUpdate中可以不用
			
			this.tick += 1;
			this.toUpdateTicker = (this.toUpdateTicker + 1) % 3;
		}, this);
		t.start();
	}

	private ChangeShowSize(toScale:number = 1.0){
		this.gameLayer.scaleX = this.gameLayer.scaleY = toScale;
		this.gameLayer.x = (this.stage.stageWidth - this.gameLayer.width * this.gameLayer.scaleX) / 2;
		this.gameLayer.y = (800 - this.gameLayer.height * this.gameLayer.scaleY) / 2;
	}

	//用于动画刷新的Update
	private Update(){
		//角色的
		//this.actor.Update();
		
		if (this.diningTable){
			this.diningTable.Update();
		}
	}
	
	//重新排序zOrder
	private RearrangeSpritesZOrder(){
		if (!this.sprites || this.sprites.length <= 0) return;
		this.sprites.sort((a:SpriteGroup, b:SpriteGroup)=>{
			let needBack = a.NeedToSendMeBack(b);
			return (needBack == true)?-1:1;
		});
		for (let i = 0; i < this.sprites.length; i++){
			let ts:eui.UIComponent = this.sprites[i];
			ts.zIndex = i + this.zOrderBase;
		}

		this.gameLayer.sortChildren();
	}

	//放一个角色，这里的x,y都是像素级
	private PlaceCharacter(key:string = "schoolgirl",x:number, y:number){
		this.actor = new CharacterObj("schoolgirl", new FoodCourtBuddy());
		let aImg = new CharacterSprite(this.actor);
		aImg.x = x;
		aImg.y = y;
		this.gameLayer.addChild(aImg);
		this.sprites.push(aImg);
	}

	//放一张桌子，这里可不管能不能放的下，只管放上去的
	private PlaceTable( x:number, y:number){
		this.diningTable = new DiningTableSprite(new DiningTableObj(
			new DiningTableModel(
				"wooden_single_table", [
					new DiningSeatInfo("wooden_chair", 0, -50, 0, -24),
					new DiningSeatInfo("wooden_chair", -75, -50, -75, -24),
					new DiningSeatInfo("wooden_chair", 75, -50, 75, -24),
				],
				240, new egret.Rectangle(30, 0, 10, 10)
			),
		), EatGameType.EatNoodle);
		this.gameLayer.addChild(this.diningTable);
		this.diningTable.x = x;
		this.diningTable.y = y;
	}

}