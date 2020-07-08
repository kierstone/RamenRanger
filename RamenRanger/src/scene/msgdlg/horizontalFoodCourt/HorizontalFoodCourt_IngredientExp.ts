class HorizontalFoodCourt_IngredientExp extends eui.Component implements  eui.UIComponent {
	private Label_Exp:eui.Label;
	private Img_Icon:eui.Image;

	private ing:FoodCourtIngredient;

	public constructor(ing:FoodCourtIngredient) {
		super();
		this.ing = ing;
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
		this.Label_Exp.text = this.ing.exp.toString();

		if (this.ing.broth == true){
			let bm = GetBrothModelById(this.ing.ingredientId);
			this.Img_Icon.visible = false;
			let ic = bm.IconShape(0, 0, 30);
			this.addChild(ic);
			ic.x = this.Img_Icon.x + 30;
			ic.y = this.Img_Icon.y + 30;
			
		}else{
			let im = GetIngredientModelById(this.ing.ingredientId);
			this.Img_Icon.visible = true;
			this.Img_Icon.source = im.icon;
		}
	}

	public Update(){
		if (this.Label_Exp)
			this.Label_Exp.text = this.ing.exp.toString();
	}

}