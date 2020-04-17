class CraftNoodle extends eui.Component implements  eui.UIComponent {

	private usingBowl:BowlModel;	//使用的碗

	private craftingRamen:RamenModel;	//正在做的拉面
	private stepId:number = 0;	//0=着味，1=配汤，2=选面，3=浇头

	private pickingCover:IngredientObj;	//正在选中放位置的素材，如果是null，代表啥也没选中。
	private pickingOffsetX:number = 0;
	private pickingOffsetY:number = 0;

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
	}
	
}