class HorizontalFoodCourt_StoreUI extends eui.Component implements  eui.UIComponent {
	private Img_Back:eui.Image;
	private Button_Cancel:eui.Button;
	private Img_Port:eui.Image;
	private Label_Dialog:eui.Label;
	private Group_Window:eui.Group;

	private caller:HorizontalFoodCourt;
	private store:FoodCourtStoreObj;

	private ticked:number = 0;
	private dialogText:string = "即便吃不下，也可以点单，不然进店发现都不能点就软死机了，所以就饶你玩家这点饱食度好了。";

	public constructor(caller:HorizontalFoodCourt, store:FoodCourtStoreObj) {
		super();
		this.caller = caller;
		this.store = store;
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
		this.Button_Cancel.visible = this.Button_Cancel.enabled = false;

		let bStartY = 220;
		let bDis = 210;
		let bStartX = this.Label_Dialog.x;
		this.Img_Back.height = bStartY + 480;

		for (let i = 0; i < this.store.onSale.length;i++){
			let os = this.store.onSale[i]
			let favourGuys = this.caller.GetFavourGuyByDishType(os.model.type);
			let b = new HorizontalFoodCourt_DishButton(
				os, favourGuys, this.caller.hungry, this.caller.hungerMax, this.caller, this.caller.EatDish
			);
			b.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
				if (this.parent) this.parent.removeChild(this);
			},this);
			b.x = i * bDis + bStartX;
			b.y = bStartY;
			b.enabled = this.caller.CanEatThisDish(os);
			b.alpha = b.enabled == true ? 1 : 0.7;
			this.Group_Window.addChild(b);
		}
		this.Button_Cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			//this.caller.CancelEat(this.caller);
			if (this.parent) this.parent.removeChild(this);
		},this);

		this.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			if (this.ticked <= this.dialogText.length && this.Label_Dialog.text.length < this.dialogText.length){
				this.Label_Dialog.text = this.dialogText;
			}
		},this);

		let t = new egret.Timer(90);
		t.addEventListener(egret.TimerEvent.TIMER, ()=>{
			this.Update();
		}, this);
		t.start();
	}
	
	private Update(){
		this.ticked = (this.ticked + 1) % Number.MAX_VALUE;

		if (this.ticked <= this.dialogText.length && this.Label_Dialog.text.length < this.dialogText.length){
			this.Label_Dialog.text = this.dialogText.substr(0, this.ticked);
		}
	}

}