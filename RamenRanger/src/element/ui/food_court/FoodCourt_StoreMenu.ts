class FoodCourt_StoreMenu extends eui.Component implements  eui.UIComponent {
	private Group_DishMenu:eui.Group;
	private caller:HorizontalFoodCourt;
	private store:FoodCourtStoreObj;

	private dishButtons:Array<HorizontalFoodCourt_DishButton>;

	public constructor(caller:HorizontalFoodCourt, store:FoodCourtStoreObj) {
		super();
		this.caller = caller;
		this.store = store;
		this.dishButtons = new Array<HorizontalFoodCourt_DishButton>();
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
		for (let i = 0; i < this.store.onSale.length;i++){
			let os = this.store.onSale[i]
			let favourGuys = this.caller.GetFavourGuyByDishType(os.model.type);
			let b = new HorizontalFoodCourt_DishButton(
				os, favourGuys, this.caller.hungry, this.caller.hungerMax, this.caller, this.caller.EatDish
			);
			b.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
				this.SetSelected(b);
				this.caller.SelectDish(this.caller, os);
			},this);
			this.Group_DishMenu.addChild(b);
			this.dishButtons.push(b);
		}
	}

	private SetSelected(b:HorizontalFoodCourt_DishButton){
		for (let i = 0; i < this.dishButtons.length; i++){
			this.dishButtons[i].SetSelect (this.dishButtons[i] == b)
		}
	}
}