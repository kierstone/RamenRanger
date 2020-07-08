class PlacingToolBox extends eui.Component implements  eui.UIComponent {
	private Button_Reset:eui.Button;

	private Group_SizeBar:eui.Group;
	private SizeBar_Fill:eui.Image;
	private SizeBar_Mask:eui.Rect;
	private SizeBarPuller:eui.Image;
	private sizebarLength:number = 422;
	private sizebarTrackLen:number = 422 - 26;//可以拉动的区域宽度
	private sizebarTrackX:number = 13;	//拉动区域相对于总长度的位置

	private Button_RotateRight:eui.Button;
	private Button_RotateLeft:eui.Button;
	private Button_Flip:eui.Button;

	private Button_OK:eui.Button;
	private Button_Delete:eui.Button;

	private ingredient:IngredientObj;
	private p:CraftNoodle;
	private sizebarPos:number = 0;
	private sizebarMin:number = -10;
	private sizebarMax:number = 10;

	private pullerOffX:number = 0;
	private pulling:boolean = false;

	private rotating:boolean = false;
	private rotateDegree:number = 0;
	private rotatePower:number = 0;
	private rotateTimer:egret.Timer;

	public constructor(p:CraftNoodle) {
		super();
		this.p = p;
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
		//先填充图形
		this.Button_OK.icon = "ui_icon_ok";
		this.Button_Flip.icon = "ui_craft_icon_flip";
		this.SizeBar_Fill.mask = this.SizeBar_Mask;

		this.InitSizebarArea();

		this.Button_Reset.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			if (this.ingredient){
				this.ingredient.size = 1;
				this.ingredient.rotation = 0;
				this.ingredient.xFlip = false;
				this.IngredientSizeToSizeBarValue();
				if (this.p) {
					this.p.RefreshPlacingIngredient();
				}
			}
		},this);

		this.Button_Flip.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			if (this.ingredient){
				this.ingredient.xFlip = !this.ingredient.xFlip;
				if (this.p){
					this.p.RefreshPlacingIngredient();
				}
			}
		},this);

		this.Button_OK.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			if (this.ingredient && this.p) {
				this.StopRotateIngredient();
				this.p.PlaceToppingDone(false);
			}
		},this);
		this.Button_Delete.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			if (this.ingredient && this.p){
				this.StopRotateIngredient();
				this.p.PlaceToppingDone(true);
			} 
		},this);

		// if (!this.rotateTimer){
		// 	this.rotateTimer = new egret.Timer(50);
		// 	this.rotateTimer.addEventListener(egret.TimerEvent.TIMER, this.DoingRotate, this);
		// 	this.rotateTimer.start();
		// }

		this.Button_RotateLeft.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ()=>{
			this.StartRotateIngredient(false);
		},this);
		this.Button_RotateLeft.addEventListener(egret.TouchEvent.TOUCH_END, this.StopRotateIngredient, this);
		this.Button_RotateLeft.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.StopRotateIngredient, this);

		this.Button_RotateRight.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ()=>{
			this.StartRotateIngredient(true);
		},this);
		this.Button_RotateRight.addEventListener(egret.TouchEvent.TOUCH_END, this.StopRotateIngredient, this);
		this.Button_RotateRight.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.StopRotateIngredient, this);
	}

	//初始化滑动块区域
	private InitSizebarArea(){
		this.Group_SizeBar.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e:egret.TouchEvent)=>{
			let pullerStageX = Utils.GetEuiScreenPos(this.SizeBarPuller)["x"];
			if (Math.abs(e.stageX - pullerStageX) < 26){
				//抓住了sizebar
				this.pulling = true;
				this.pullerOffX = this.SizeBarPuller.x - e.stageX;
			}else{

			}
		},this);
		this.Group_SizeBar.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e:egret.TouchEvent)=>{
			if (this.pulling == true){
				let shouldX = e.stageX + this.pullerOffX;
				this.SizeBarPuller.x = Math.min(
					this.sizebarTrackX + this.sizebarTrackLen,
					Math.max(this.sizebarTrackX, shouldX)
				);
				this.SetSizeBarPos(this.GetValueBySizeBar());
				this.SizeBarValueToIngredientSize();
			}
		},this);
		this.Group_SizeBar.addEventListener(egret.TouchEvent.TOUCH_END, this.OnGroupSizeBarTouchOver, this);
		this.Group_SizeBar.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.OnGroupSizeBarTouchOver, this);
	}

	//拉杆结束时候
	private OnGroupSizeBarTouchOver(e:egret.TouchEvent){
		if (this.pulling == true){
			let shouldX = e.stageX + this.pullerOffX;
			this.SizeBarPuller.x = Math.min(
				this.sizebarTrackX + this.sizebarTrackLen,
				Math.max(this.sizebarTrackX, shouldX)
			);
			this.SetSizeBarPos(this.GetValueBySizeBar());
			this.SizeBarValueToIngredientSize();
		}
	}

	//尺寸拉杆设定为多少值
	private SetSizeBarPos(toValue:number){
		this.sizebarPos = Math.min(this.sizebarMax, Math.max(this.sizebarMin, toValue));
		let mLen = this.sizebarTrackLen;
		let mLeft = this.sizebarTrackX;
		this.SizeBarPuller.x = (this.sizebarPos - this.sizebarMin) / (this.sizebarMax - this.sizebarMin) * mLen + mLeft;
	}

	//根据尺寸拉杆位置获得值
	private GetValueBySizeBar(){
		let lx = this.SizeBarPuller.x - this.sizebarTrackX;
		this.sizebarPos = Math.round((lx / this.sizebarTrackLen) * (this.sizebarMax - this.sizebarMin) + this.sizebarMin);
		return this.sizebarPos;
	}

	//食材尺寸到拉杆位置
	private IngredientSizeToSizeBarValue(){
		if (!this.ingredient) return;
		let v = Math.round((this.ingredient.size - 1) * 20)
		v = Math.min(this.sizebarMax, Math.max(this.sizebarMin, v));
		this.SetSizeBarPos(v);
	}

	private SizeBarValueToIngredientSize(){
		let v = this.sizebarPos / 20;
		if (this.ingredient){
			this.ingredient.size = 1 + v;
		}
		if (this.p){
			this.p.RefreshPlacingIngredient();
		}
	}

	//停止旋转食材
	private StopRotateIngredient(){
		this.rotatePower = 0;
		this.rotateDegree = 0;
		this.rotating = false;
		if (this.p && this.ingredient){
			this.p.RefreshPlacingIngredient();
		}
	}

	//开始旋转食材
	private StartRotateIngredient(degreePlus:boolean){
		this.rotating = true;
		let basePower = 5;
		this.rotateDegree = basePower * (degreePlus == true ? 1: -1);
		this.rotatePower = basePower;
		this.DoingRotate();
	}

	//正在旋转中
	private DoingRotate(){
		if (this.ingredient && this.rotating == true){
			this.ingredient.rotation = (this.ingredient.rotation + 180 + this.rotateDegree) % 360 - 180;
			if (this.rotatePower < 90){
				this.rotatePower *= 1.08;	//每次+8%
			}else{
				this.rotatePower = 90;
			}
			
			let isNeg = this.rotateDegree < 0;
			this.rotateDegree = (Math.floor(this.rotatePower)) * (isNeg == false?1:-1);
			if (this.p){
				this.p.RefreshPlacingIngredient();
			}
		}
	}



	public Update(){
		this.DoingRotate();
	}
	
	//设置为ingredient服务
	public SetIngredient(ingredient:IngredientObj){
		this.ingredient = ingredient;
		if (this.ingredient){
			this.Button_Reset.icon = 
			this.Button_RotateLeft.icon = 
			this.Button_RotateRight.icon = this.ingredient.model.icon;
		}
		this.IngredientSizeToSizeBarValue();
	}

	//设置ok是否可用
	public SetOKButtonEnabled(enable:boolean){
		this.Button_OK.enabled = enable;
	}
}