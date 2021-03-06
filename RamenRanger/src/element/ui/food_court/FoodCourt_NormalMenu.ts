class FoodCourt_NormalMenu extends eui.Component implements  eui.UIComponent {
	private Button_Go:eui.Button;
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
		this.Button_Go.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			this.caller.ButtonGoEvent();
		},this);
	}
	
	public ShowIngredientExp(ingExp:Array<HorizontalFoodCourt_IngredientExp>){
		this.Group_IngExp.removeChildren();

		for (let i = 0; i < ingExp.length; i++){
			this.Group_IngExp.addChild(ingExp[i]);
		}
	}
}