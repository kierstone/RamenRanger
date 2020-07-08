class FoodCourt_SelectBuddyList extends eui.Component implements  eui.UIComponent {
	private Label_BuddyCount:eui.Label;
	private Group_Buddy:eui.Group;
	private Button_Done:eui.Button;

	private buddyButtons:Array<HorizontalFoodCourt_BuddyInfo>;
	private selectedBuddy:Array<FoodCourtBuddy>;	//选中的
	private buddies:Array<FoodCourtBuddy>;
	private maxBuddy:number;

	private caller:FoodCourtTeamBuild;
	private buddyBehaveFunc:(caller:FoodCourtTeamBuild,buddy:FoodCourtBuddy, isAddToTeam:boolean)=>void;
	private doneButtonEve:(caller:FoodCourtTeamBuild,team:Array<FoodCourtBuddy>)=>void;

	public constructor(
		caller:FoodCourtTeamBuild, buddies:Array<FoodCourtBuddy>, maxGuy:number,
		buddyBehaveFunc:(caller:FoodCourtTeamBuild,buddy:FoodCourtBuddy, isAddToTeam:boolean)=>void,
		doneButtonEve:(caller:FoodCourtTeamBuild,team:Array<FoodCourtBuddy>)=>void
	) {
		super();
		this.buddies = buddies;
		this.maxBuddy = maxGuy;
		this.caller = caller;
		this.buddyBehaveFunc = buddyBehaveFunc;
		this.doneButtonEve = doneButtonEve;

		this.buddyButtons = new Array<HorizontalFoodCourt_BuddyInfo>();
		this.selectedBuddy = new Array<FoodCourtBuddy>();
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
		for (let i = 0; i < this.buddies.length; i++){
			let bb = new HorizontalFoodCourt_BuddyInfo(
				this.buddies[i], this, this.ClickOnBuddyButton
			)
			this.Group_Buddy.addChild(bb);
			this.buddyButtons.push(bb);
		}

		this.Button_Done.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			if (this.caller.canControl == false) return;
			if (this.doneButtonEve){
				this.doneButtonEve(this.caller, this.selectedBuddy);
			}
		},this);

		this.RefreshLabel();
	}

	private ClickOnBuddyButton(thisObj:FoodCourt_SelectBuddyList, buddy:FoodCourtBuddy, selected:boolean):boolean{
		if (thisObj.caller.canControl == false) return selected;
		if (selected == false && thisObj.TeamFull() == true) {
			return false;	//没选中就是要选中，但是如果已经满了就不鸟了，所以选中状态还是false
		}
		if (selected == false){
			if (thisObj.buddyBehaveFunc){
				thisObj.buddyBehaveFunc(thisObj.caller, buddy, true);
			}

			thisObj.selectedBuddy.push(buddy);
			thisObj.RefreshLabel();
			return true;
		}else{
			//TODO 移除出队伍
			if (thisObj.buddyBehaveFunc){
				thisObj.buddyBehaveFunc(thisObj.caller, buddy, false);
			}

			let idx = thisObj.selectedBuddy.indexOf(buddy);
			if (idx >= 0) thisObj.selectedBuddy.splice(idx, 1);
			thisObj.RefreshLabel();
			return false;
		}
	}

	private TeamFull():boolean{
		return this.selectedBuddy.length >= this.maxBuddy;
	}
	
	private RefreshLabel(){
		this.Label_BuddyCount.text = 
			"选择一起去玩的朋友（" + 
			this.selectedBuddy.length.toString() + "/" + 
			this.maxBuddy.toString() + "）"
	}
}