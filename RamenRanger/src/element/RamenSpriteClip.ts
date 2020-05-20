class RamenSpriteClip extends SpriteClip {
	private ramen:RamenObj;
	private imgs:Array<Object>; //{ingredient:ingredientObj, img:eui.Image}
	private _ramenCreated:boolean;

	public constructor(ramen:RamenObj) {
		super();
		this.logicLayer = SpriteClipLayer.Noodle;
		this.ramen = ramen;
		this._ramenCreated = false;
	}

	protected childrenCreated():void
	{
		super.childrenCreated();
		this.init();
	}

	private init(){
		this.source = RES.getRes(this.ramen.model.bowl.model.scene);
		this.anchorOffsetX = this.width / 2;
		this.anchorOffsetY = this.height;
	}

	//绘制拉面的内容
	public CreateRamen(){
		if (!this.parent || this._ramenCreated == true) return;

		let backGroup = new eui.Group();
		backGroup.x = this.ramen.model.bowl.model.sceneCenterX + this.x - this.anchorOffsetX;
		backGroup.y = this.ramen.model.bowl.model.sceneCenterY + this.y - this.anchorOffsetY;
		this.parent.addChild(backGroup);
		console.log("back", Utils.GetEuiScreenPos(backGroup));

		let broth = this.ramen.model.broth.model.SceneShape(0, 0, 30);	//美术设计拉面汤的宽度是60
		backGroup.addChild(broth);
		console.log("broth", Utils.GetEuiScreenPos(broth));

		this.ramen.model.noodles.GatherSceneImage(backGroup, 0, 0);
		
		this.imgs = new Array<Object>();
		for (let i = 0; i < this.ramen.model.topping.length; i++){
			let thisImg = this.ramen.model.topping[i].GatherSceneImage(backGroup, 0, 0)
			let thisObj = {
				"ingredient":this.ramen.model.topping[i],
				"img":thisImg
			}
			console.log("toppings["+i.toString()+"]", Utils.GetEuiScreenPos(thisImg));
		}
		
		backGroup.scaleY = Scene_HorVerTimes;
		this._ramenCreated = true;
	}
}