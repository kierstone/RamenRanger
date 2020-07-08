class IngredientIconInBox extends eui.Component implements  eui.UIComponent {
	private Img_Icon:eui.Image;
	private Label_Name:eui.Label;
	private Img_Select:eui.Image;
	
	public id:string;
	private icon:string;
	private selected: boolean = false;
	private ingredient:any
	private eveCaller:CraftNoodle;
	private eveFunc:(caller:CraftNoodle, ing:any)=>void;
	private bModel: BrothModel;

	public constructor(id:string, ingredient:any, icon:string, caller:CraftNoodle, func:(caller:CraftNoodle, ing:IngredientModel)=>void, broth:BrothModel = null) {
		super();
		this.id = id;
		this.ingredient = ingredient;
		this.eveCaller = caller;
		this.eveFunc = func;
		this.icon = icon;
		this.bModel = broth;
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
		this.Img_Icon.source = this.icon;
		this.Label_Name.text = this.ingredient.name;

		this.SetSelected(false);

		if (this.bModel){
			this.FillBroth(this.bModel);
		}

		this.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			if (this.eveCaller && this.eveFunc){
				this.eveFunc(this.eveCaller, this.ingredient);
			}
		},this);
	}

	public SetSelected(s:boolean){
		this.selected = s;
		if (this.Img_Select) this.Img_Select.visible = s;
	}

	/**
	 * 因为汤比较特殊，所以得额外fill进来
	 * @param {BrothModel} broth 汤的model
	 * @param {number} centerX 要绘制的位置x，为空时为图标中心
	 * @param {number} centerY 要绘制的位置y，为空时为图标中心
	 * @param {number} radius 要绘制的汤的半径，为空时为图标的40%
	 */
	private FillBroth(broth:BrothModel, centerX:number = null, centerY:number = null, radius:number = null){
		if (!this.Img_Icon) return;
		if (centerX == null) centerX = this.width /2 ;
		if (centerY == null) centerY = this.Img_Icon.height / 2;
		if (radius == null) radius = this.Img_Icon.width * 0.4;
		let shp = broth.ImageShape(
			centerX,// + this.Img_Icon.x,
			centerY + this.Img_Icon.y,
			radius
		)
		this.addChild(shp);

		let brothHL = new eui.Image(RES.getRes(ResName_Broth_Highlight));
		this.addChild(brothHL);
		brothHL.width = brothHL.height = radius * 2;
		brothHL.anchorOffsetX = brothHL.width / 2;
		brothHL.anchorOffsetY = brothHL.height / 2;
		brothHL.x = shp.x;
		brothHL.y = shp.y;

		if (this.Img_Select){
			this.Img_Select.zIndex = Number.MAX_VALUE;
			this.sortChildren();
		}
	}
	
}