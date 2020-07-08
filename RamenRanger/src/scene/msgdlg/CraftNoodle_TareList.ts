class CraftNoodle_TareList extends eui.Component implements  eui.UIComponent {
	private Group_Dialog:eui.Group;
	private Button_Close:eui.Button;
	private Group_ItemLayer:eui.Group;
	private Button_Remove0:eui.Button;
	private Button_Remove1:eui.Button;
	private Button_Remove2:eui.Button;
	private Button_Remove3:eui.Button;
	private Button_Remove4:eui.Button;
	private Button_Remove5:eui.Button;

	private listItems:Array<TareListItem>;
	private tareList:Array<IngredientObj> = [null, null, null, null, null, null];
	private caller:CraftNoodle;
	private removeFunc:(caller:CraftNoodle, ingredient:IngredientObj)=>void;	//每个删除按钮执行的函数，传递的是对应按钮的ingredient
	
	public constructor(caller:CraftNoodle, tares:Array<IngredientObj>, removeFunc:(caller:CraftNoodle, ingredient:IngredientObj)=>void) {
		super();
		if (tares){
			for (let i = 0; i < 6; i++){
				if (i < tares.length) this.tareList[i] = tares[i];
			}
		}
		this.caller = caller;
		this.removeFunc = removeFunc
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
		this.CreateSlots();

		this.Button_Remove0.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			this.RemoveButtonEvent(0);
		},this);
		this.Button_Remove1.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			this.RemoveButtonEvent(1);
		},this);
		this.Button_Remove2.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			this.RemoveButtonEvent(2);
		},this);
		this.Button_Remove3.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			this.RemoveButtonEvent(3);
		},this);
		this.Button_Remove4.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			this.RemoveButtonEvent(4);
		},this);
		this.Button_Remove5.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			this.RemoveButtonEvent(5);
		},this);

		this.Button_Close.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			CloseCraftNoodleTareList();
		},this);

		this.Group_Dialog.scaleX = 0;
		egret.Tween.removeTweens(this.Group_Dialog);
		egret.Tween.get(this.Group_Dialog).to({scaleX:1}, 300, egret.Ease.quadIn);
	}

	private RemoveButtonEvent(buttonIndex:number){
		if (this.caller && this.removeFunc && this.tareList[buttonIndex]){
			this.removeFunc(this.caller, this.tareList[buttonIndex]);
			this.RemoveTareInSlot(buttonIndex);
		}
	}

	private ResetSlots(){
		if (this.listItems){
			for (let i = 0; i< this.listItems.length; i++){
				if (this.listItems[i] && this.listItems[i].parent){
					this.listItems[i].parent.removeChild(this.listItems[i]);
				}
			}
		}
		this.listItems = [null, null, null, null, null, null]
	}

	private CreateSlots(){
		this.ResetSlots();
		let posX = [32, 220, 408, 32, 220, 408];
		let posY = [48, 48, 48, 236, 236, 236];
		let btns = [
			this.Button_Remove0,this.Button_Remove1,this.Button_Remove2,
			this.Button_Remove3,this.Button_Remove4,this.Button_Remove5,
		]
		for (let i = 0; i < this.tareList.length; i++){
			btns[i].visible = btns[i].enabled = (this.tareList[i] != null && this.tareList[i] != undefined);
			if (this.tareList[i]){
				let li:TareListItem = new TareListItem(this.tareList[i].model);
				this.Group_ItemLayer.addChild(li);
				li.x = posX[i];
				li.y = posY[i];
				this.listItems[i] = li;
			}
		}
	}

	//TODO 暂时只支持删除个把以后
	private RefreshSlots(){
		let btns = [
			this.Button_Remove0,this.Button_Remove1,this.Button_Remove2,
			this.Button_Remove3,this.Button_Remove4,this.Button_Remove5,
		]
		for (let i = 0; i < this.listItems.length; i++){
			if (this.listItems[i] && !this.tareList[i] && this.listItems[i].parent){
				this.listItems[i].parent.removeChild(this.listItems[i]);
				this.listItems[i] = null;
				btns[i].visible = btns[i].enabled = false;
			}
		}
	}

	//删除某个位置的tare
	private RemoveTareInSlot(index:number){
		if (this.tareList[index]) this.tareList[index] = null;
		this.RefreshSlots();
	}
}

var _CraftNoodle_TareList:CraftNoodle_TareList;
var ShowCraftNoodleTareList = function(c:CraftNoodle, tareList:Array<IngredientObj>, removeFUnc:(pn:CraftNoodle, tare:IngredientObj)=>void){
	if (_CraftNoodle_TareList) return;
	_CraftNoodle_TareList = new CraftNoodle_TareList(c, tareList, removeFUnc);
	c.addChild(_CraftNoodle_TareList);
}
var CloseCraftNoodleTareList = function(){
	if (_CraftNoodle_TareList && _CraftNoodle_TareList.parent){
		_CraftNoodle_TareList.parent.removeChild(_CraftNoodle_TareList);
		_CraftNoodle_TareList = null;
	}
}
