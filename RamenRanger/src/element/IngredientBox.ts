class IngredientBox extends eui.Component implements  eui.UIComponent {
	private listItems:Array<IngredientIconInBox>;

	public constructor(items:Array<IngredientIconInBox>) {
		super();
		this.listItems = items;
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
		let xs = [60, 228, 394, 560];
		let ys = [26, 188, 351];
		let looplen = Math.min(this.listItems.length, 12);
		for (let i = 0; i < looplen; i++){
			let iconItem = this.listItems[i];
			iconItem.x = xs[Math.floor(i % 4)];
			iconItem.y = ys[Math.floor(i / 4)];
			this.addChild(iconItem);
		}
		this.anchorOffsetY = this.height;
		this.anchorOffsetX = this.width / 2;
	}

	public SetSelect(id:string){
		for (let i = 0;  i < this.listItems.length; i++){
			this.listItems[i].SetSelected(this.listItems[i].id == id);
		}
	}
	
}