class StreetGround extends eui.Component implements  eui.UIComponent {
	private bkg:eui.Image;		//背景
	private ground:eui.Image;	//吃饭的地方的地面
	private road:eui.Image;		//走路的地方
	private streetside:eui.Image;
	private street:eui.Image;	//街道

	public groundTop:number;	//第几个像素是地面的顶端
	private roadTop:number;		//第几个像素是走路的地方的顶端
	public streetTop:number;	//第几个像素是街道的顶端
	public roadHeightInGrid:number;	//地面有几个单元格

	private jsonFile:string = "";

	public constructor(jsonFile:any) {
		super();
		this.jsonFile = jsonFile;
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
		this.LoadFromJson();
	}

	private LoadFromJson(){
		let streetInfo = this.jsonFile;
		if (streetInfo == null){
			console.error("No json found:", this.jsonFile);
			return;
		}

		let cY = 0;
		
		if (streetInfo["background"]){
			let tf = streetInfo["background"]["img"];
			this.bkg.texture = RES.getRes(tf);
			this.bkg.x = 0;
			this.bkg.y = 0;
			cY += this.bkg.height;
			this.groundTop = cY;
		}

		if (streetInfo["restrant"]){
			let fillT:string = streetInfo["restrant"]["fill"];
			let mW = GameMapWidth * GridWidth;
			let mH = GameMapHeight * GridHeight;
			this.ground.texture = RES.getRes(fillT);
			this.ground.x = 0;
			this.ground.y = cY;
			this.ground.width = mW;
			this.ground.height = mH;
			this.ground.fillMode = egret.BitmapFillMode.REPEAT;
			cY += mH;
			this.roadTop = cY;
		}

		if (streetInfo["road"]){
			let fillT:string = streetInfo["road"]["fill"];
			let mW = GameMapWidth * GridWidth;
			this.roadHeightInGrid = streetInfo["road"]["height"];
			let mH = this.roadHeightInGrid * GridHeight;
			this.road.texture = RES.getRes(fillT);
			this.road.x = 0;
			this.road.y = cY;
			this.road.width = mW;
			this.road.height = mH;
			this.road.fillMode = egret.BitmapFillMode.REPEAT;
			cY += mH;
			this.streetTop = cY;
		}

		if (streetInfo["street"]){
			let sideT:string = streetInfo["street"]["side"];
			let fillT:string = streetInfo["street"]["fill"];
			let mW = GameMapWidth * GridWidth;
			let sideH = 1 * GridHeight;
			let fillH = Math.max(this.stage.stageHeight - cY, (StreetHeight - 1) * GridHeight);

			this.streetside.texture = RES.getRes(sideT);
			this.streetside.x = 0;
			this.streetside.y = cY;
			this.streetside.width = mW;
			this.streetside.height = sideH;
			this.streetside.fillMode = egret.BitmapFillMode.REPEAT;
			cY += sideH;

			this.street.texture = RES.getRes(fillT);
			this.street.x = 0;
			this.street.y = cY;
			this.street.width = mW;
			this.street.height = fillH;
			this.street.fillMode = egret.BitmapFillMode.REPEAT;
			cY += sideH;
		}
	}
}