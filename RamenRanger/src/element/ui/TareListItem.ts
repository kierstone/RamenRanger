class TareListItem extends eui.Component implements  eui.UIComponent {
	private Img_Icon:eui.Image;
	private Label_Name:eui.Label;

	private tare:IngredientModel;

	public constructor(tare:IngredientModel) {
		super();
		this.tare = tare;
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
		if (this.tare){
			this.Img_Icon.source = RES.getRes(this.tare.icon);
			this.Label_Name.text = this.tare.name;
		}
		
	}

}