class HorizontalFoodCourt_BuddyInfo extends eui.Component implements  eui.UIComponent {
	private Group_Port:eui.Group;
	private Label_Hunger:eui.Label;
	private portSpr:RandomBuddyPortSprite;
	private Img_SelectSign:eui.Image;
	
	private selected:boolean = false;
	private buddy:FoodCourtBuddy;

	private caller:any;

	/**
	 * @param {any} caller 谁呼叫的
	 * @param {FoodCourtBuddy} buddy 传过去this.buddy
	 * @param {boolean} selected 当前的选中状况，this.selected
	 * @returns {boolean} 返回要把this.selected变成啥样
	 */
	private func:(caller:any, buddy:FoodCourtBuddy, selected:boolean)=>boolean; 

	public constructor(buddy:FoodCourtBuddy, caller:any, func:(caller:any, buddy:FoodCourtBuddy, selected:boolean)=>boolean) {
		super();
		this.buddy = buddy;
		this.caller = caller;
		this.func = func;
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
		this.portSpr = new RandomBuddyPortSprite(this.buddy.portrait);
		this.Group_Port.addChild(this.portSpr);
		this.Label_Hunger.text = this.buddy.hunger.toString();
		this.SetSelected(false);

		this.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			if (this.caller && this.func){
				this.SetSelected(
					this.func(this.caller, this.buddy, this.selected)
				);
			}
		},this);
	}

	public SetSelected(s:boolean){
		this.selected = s;
		this.Img_SelectSign.visible = s;
	}
	
}