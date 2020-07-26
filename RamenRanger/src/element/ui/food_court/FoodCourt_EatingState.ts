class FoodCourt_EatingState extends eui.Component implements  eui.UIComponent {

	private Group_IngExp:eui.Group;

	private caller:HorizontalFoodCourt;

	public constructor(caller:HorizontalFoodCourt) {
		super();
		this.caller = caller;
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

	}
	
	public ShowIngredientExp(ingExp:Array<HorizontalFoodCourt_IngredientExp>){
		this.Group_IngExp.removeChildren();

		for (let i = 0; i < ingExp.length; i++){
			this.Group_IngExp.addChild(ingExp[i]);
		}
	}

	public AddIngredientExp(ingExp:HorizontalFoodCourt_IngredientExp){
		this.Group_IngExp.addChild(ingExp);
	}
}