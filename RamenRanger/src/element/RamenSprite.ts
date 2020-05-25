class RamenSprite extends SpriteGroup{
	private ramen:RamenObj;
	private bowlImg:eui.Image;
	private brothShape:egret.Shape;
	private noodleImg:eui.Image;
	private ToppingImg:Array<Object>; //{ingredient:ingredientObj, img:eui.Image}

	public constructor(ramen?:RamenObj) {
		super();
		this.ramen = ramen;
	}

	protected childrenCreated():void
	{
		super.childrenCreated();
		this.init();
	}

	private init(){
		if (this.ramen) this.SetRamen(this.ramen);	
	}

	public SetRamen(ramen:RamenObj){
		if (!ramen) return;
		this.ramen = ramen;

		this.bowlImg = new eui.Image(RES.getRes(this.ramen.model.bowl.model.scene));
		this.addChild(this.bowlImg);
		this.bowlImg.anchorOffsetX = this.bowlImg.width / 2;
		this.bowlImg.anchorOffsetY = this.bowlImg.height;

		let backGroup = new eui.Group();
		backGroup.x = -this.bowlImg.anchorOffsetX + this.ramen.model.bowl.model.sceneCenterX;
		backGroup.y = -this.bowlImg.anchorOffsetY + this.ramen.model.bowl.model.sceneCenterY;
		this.addChild(backGroup);

		this.brothShape = this.ramen.model.broth.model.SceneShape(0, 0, 30);	//美术设计拉面汤的宽度是60
		backGroup.addChild(this.brothShape);

		this.noodleImg = this.ramen.model.noodles.GatherSceneImage(backGroup, 0, 0);
		
		this.ToppingImg = new Array<Object>();
		for (let i = 0; i < this.ramen.topping.length; i++){
			let thisImg = this.ramen.topping[i].GatherSceneImage(backGroup, 0, 0)
			let thisObj = {
				"ingredient":this.ramen.topping[i],
				"img":thisImg
			}
			this.ToppingImg.push(thisObj);
		}
		
		backGroup.scaleY = Scene_HorVerTimes;
	}

	/**
	 * 当拉面被吃了一口的时候，应该刷新一下
	 * 
	 */
	public UpdateRamen(){
		//noodles
		let noodleScale = Math.max(0, Math.min(this.ramen.noodlePercentage, 1));
		this.noodleImg.scaleX = this.noodleImg.scaleY = noodleScale;

		//TODO broth
		
		//ingredients
		let index = 0;
		while (index < this.ToppingImg.length){
			if (this.ramen.topping.indexOf(this.ToppingImg[index]["ingredient"]) >= 0){
				index += 1;
			}else{
				if (this.ToppingImg[index]["img"].parent) this.ToppingImg[index]["img"].parent.removeChild(this.ToppingImg[index]["img"]);
				this.ToppingImg.splice(index, 1);
			}
		}
	}

	
}