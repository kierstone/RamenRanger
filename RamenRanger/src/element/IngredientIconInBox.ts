class IngredientIconInBox extends eui.Component implements  eui.UIComponent {
	private Img_Icon:eui.Image;
	private Label_Name:eui.Label;
	private Img_Select:eui.Image;
	
	public id:string;
	private icon:string;
	private selected: boolean = false;
	private ingredient:any
	private eveCaller:CraftNoodle;
	private eveFunc:(caller:CraftNoodle, ing:any)=>void;

	public constructor(id:string, ingredient:any, icon:string, caller:CraftNoodle, func:(caller:CraftNoodle, ing:IngredientModel)=>void) {
		super();
		this.ingredient = ingredient;
		this.eveCaller = caller;
		this.eveFunc = func;
		this.icon = icon;
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
		this.Img_Icon.source = this.icon;
		this.Label_Name.text = this.ingredient.name;

		this.SetSelected(false);

		this.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			if (this.eveCaller && this.eveFunc){
				this.eveFunc(this.eveCaller, this.ingredient);
			}
		},this);
	}

	public SetSelected(s:boolean){
		this.selected = s;
		this.Img_Select.visible = s;
	}
	
}