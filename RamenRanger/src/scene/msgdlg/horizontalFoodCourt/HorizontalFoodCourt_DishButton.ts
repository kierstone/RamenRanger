class HorizontalFoodCourt_DishButton extends eui.Component implements  eui.UIComponent {
	private Label_Name:eui.Label;
	private Group_Ramen:eui.Group;
	private dishSpr:RamenSprite;
	private Rect_ColorSign:eui.Rect;
	private Button_Eat:eui.Button;
	private Group_Buddy:eui.Group;
	private Group_Ingredient:eui.Group;

	private dish:FoodCourtDishObj;
	private caller:HorizontalFoodCourt;
	private eve:(caller:HorizontalFoodCourt, dish:FoodCourtDishObj)=>void;

	private favourGuy:Array<FoodCourtBuddy>;
	private currentHunger:number;
	private hungerMax:number;

	private clicked:boolean = false;

	public constructor(
		dish:FoodCourtDishObj, favourGuyCount:Array<FoodCourtBuddy>, currentHunger:number, hungerMax:number,
		caller:HorizontalFoodCourt, eve:(caller:HorizontalFoodCourt, dish:FoodCourtDishObj)=>void
	) {
		super();
		this.dish = dish;
		this.caller = caller;
		this.eve = eve;
		this.favourGuy = favourGuyCount;
		this.currentHunger = currentHunger;
		this.hungerMax = Math.max(1, hungerMax);
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
		this.dishSpr = new RamenSprite(this.dish.dish);
		this.Group_Ramen.addChild(this.dishSpr);
		this.Label_Name.text = this.dish.model.name;
		
		for (let i = 0; i < this.dish.model.reward.length; i++){
			let ingModel = GetIngredientModelById(this.dish.model.reward[i].ingredientId);
			if (ingModel){
				let ing = new eui.Image(ingModel.img);
				ing.width = ing.height = 50;
				this.Group_Ingredient.addChild(ing);
			}
		}

		let sgc = 0;
		for (let i = 0; i < this.favourGuy.length; i++){
			let port = new RandomBuddyPortSprite(this.favourGuy[i].portrait, 50, 50);
			if (port){
				this.Group_Buddy.addChild(port);
				sgc += 1;
			}

			if (sgc >= 3) break;
		}

		this.Rect_ColorSign.fillColor = GetFoodCourtDishTypeColor(this.dish.model.type);
		this.SetSelect(false);

		this.Button_Eat.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			if (this.clicked == true) return;
			this.clicked = true;
			if (this.caller && this.eve){
				this.eve(this.caller, this.dish);
			}
		},this);
	}

	public SetSelect(s:boolean){
		this.currentState = s == true ? "selected":"normal";
	}
	
	
}