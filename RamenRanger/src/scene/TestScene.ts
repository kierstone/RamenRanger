class TestScene extends eui.Component implements  eui.UIComponent {

	//From Street
	private gameLayer:eui.Group;
	private sprites:Array<SpriteClip>;	//所有sprite层图片
	private zOrderBase = 10000;	//在重新计算zOrder时，加上这个数字



	private ramenObj:RamenObj;
	private ramen:RamenSpriteClip;

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
		this.sprites = new Array<SpriteClip>();
		this.init();
	}

	private init(){
		this.PlaceTable(new DiningTableModel(1,1,"wooden_single_table", []), 350, 500);
		this.PlaceChair("wooden_chair", 350, 448, Direction.Down);
		this.PlaceCharacter("schoolgirl", 350, 450);
		this.PlaceRamen(350, 470);

		this.RearrangeSpritesZOrder();
	}

	//拉面
	private PlaceRamen(x:number, y:number){
		this.ramen = new RamenSpriteClip(this.ramenObj);
		this.addChild(this.ramen);
		this.ramen.x = x;
		this.ramen.y = y;
		this.ramen.CreateRamen();
		this.sprites.push(this.ramen);
	}
	
	//重新排序zOrder
	private RearrangeSpritesZOrder(){
		if (!this.sprites || this.sprites.length <= 0) return;
		this.sprites.sort((a:SpriteClip, b:SpriteClip)=>{
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
	private PlaceCharacter(key:string = "schoolgirl",x:number, y:number):CharacterObj{
		let cha = new CharacterObj(
			GetCharacterActionInfoByKey(key), 
			x, y,
			new CharacterProperty()
		)
		cha.head.logicLayer = SpriteClipLayer.EatingHead;	//这个是Street少的，就是要切换到吃面层
		this.gameLayer.addChild(cha.body);
		this.gameLayer.addChild(cha.head);
		this.sprites.push(cha.body);
		this.sprites.push(cha.head);
		return cha;
	}

	//放一张桌子，这里可不管能不能放的下，只管放上去的
	private PlaceTable(table:DiningTableModel, x:number, y:number){
		let t:DiningTableObj = new DiningTableObj(table, x, y);
		this.gameLayer.addChild(t.Image);
		this.sprites.push(t.Image);	

		//TODO桌子椅子连接状态等
	}

	//放一张椅子，也是只负责放下去，不负责判断能不能放
	private PlaceChair(chairSource:string, x:number, y:number, dir:Direction){
		let c = new ChairObj(chairSource, x, y, dir);
		this.gameLayer.addChild(c.image);
		this.sprites.push(c.image);
	}
}