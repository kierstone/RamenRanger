class WelcomeScene extends eui.Component implements  eui.UIComponent {
	private Button_Ramen :eui.Button;
	private Button_Street: eui.Button;
	private Button_Test:eui.Button;

	public constructor() {
		super();
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
		this.Button_Ramen.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			if (!GameScene_CraftNoodle){
			    GameScene_CraftNoodle = new CraftNoodle();
			}
			Utils.UIRoot.addChild(GameScene_CraftNoodle);
			this.parent.removeChild(this);
		},this);
		this.Button_Street.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			// if (!GameScene_FoodCourt){
			// 	GameScene_FoodCourt = new HorizontalFoodCourt();
			// }
			// Utils.UIRoot.addChild(GameScene_FoodCourt);
			Utils.UIRoot.addChild(new FoodCourtTeamBuild());
			this.parent.removeChild(this);
		},this);

		this.Button_Test.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{

		},this);
	}



	//随机地图需要的参数
	private gw = 8;	//单元格这么大
	private gh = 8;

	private mapWidth = 0;	//地图宽高多少单元格
	private mapHeight = 0;

	private roomCenters:Array<egret.Point> = new Array<egret.Point>();

	//第一步，根据房间数，地图宽高，决定基本的地图信息
	private Test_MapStep1(roomCount:number, roomMaxWidth:number = 20, roomMaxHeight:number = 20){
		let hRooms = Math.ceil(Math.sqrt(roomCount));	//横向多少个房间
		let vRooms = Math.ceil(roomCount / hRooms);		//纵向多少个房间
		let restRooms = hRooms * vRooms - roomCount;	//荣誉数量，也就代表每一行可以少生成多少个房间
	}
}