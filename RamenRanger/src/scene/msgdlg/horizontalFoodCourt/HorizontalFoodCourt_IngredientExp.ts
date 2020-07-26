class HorizontalFoodCourt_IngredientExp extends eui.Component implements  eui.UIComponent {
	private Label_Exp:eui.Label;
	private Img_Icon:eui.Image;

	public ingredientInfo:FoodCourtIngredient;

	public constructor(ing:FoodCourtIngredient) {
		super();
		this.ingredientInfo = ing;
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
		this.Label_Exp.text = this.ingredientInfo.exp.toString();

		if (this.ingredientInfo.broth == true){
			let bm = GetBrothModelById(this.ingredientInfo.ingredientId);
			this.Img_Icon.visible = false;
			let ic = bm.IconShape(0, 0, 30);
			this.addChild(ic);
			ic.x = this.Img_Icon.x + 30;
			ic.y = this.Img_Icon.y + 30;
		}else{
			let im = GetIngredientModelById(this.ingredientInfo.ingredientId);
			this.Img_Icon.visible = true;
			this.Img_Icon.texture = RES.getRes(im.icon);
		}
	}

	public IconStageX():number{
		return Utils.GetEuiScreenPos(this.Img_Icon)["x"] + this.Img_Icon.width / 2;
	}
	public IconStageY():number{
		return Utils.GetEuiScreenPos(this.Img_Icon)["y"] + this.Img_Icon.height / 2;
	}

	/**
	 * 添加经验，应该有个tween才对
	 */
	public IncreaseExp(num:number){
		this.ingredientInfo.exp += num;
		this.Update();
	}

	public Update(){
		if (this.Label_Exp)
			this.Label_Exp.text = this.ingredientInfo.exp.toString();
	}

}