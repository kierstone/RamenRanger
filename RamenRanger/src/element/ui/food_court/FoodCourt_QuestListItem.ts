class FoodCourt_QuestListItem extends eui.Component implements  eui.UIComponent {
	private Label_Desc:eui.Label;
	private Group_Broth:eui.Group;
	private Img_Icon:eui.Image;

	private requirement:any;
	private requirementType:RamenRequirmentType;

	public constructor(requirement:any, requirementType:RamenRequirmentType) {
		super();
		this.requirement = requirement;
		this.requirementType = requirementType;
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
		switch (this.requirementType){
			case RamenRequirmentType.Broth:{
				let bInfo:RequiredBroth = this.requirement as RequiredBroth;
				this.Group_Broth.visible = true;
				this.Img_Icon.source = "bowl_normal";
				this.FillBroth(GetBrothModelById(bInfo.brothId));
				this.Label_Desc.text = bInfo.desc;
			}break;
			case RamenRequirmentType.Mutual:{
				let mInfo:RequiredMutual = this.requirement as RequiredMutual;
				this.Img_Icon.source = mInfo.icon;
				this.Group_Broth.visible = false;
				this.Label_Desc.text = mInfo.desc;
			}break;
			case RamenRequirmentType.Subject:{
				let sInfo:RequiredSubject = this.requirement as RequiredSubject;
				this.Img_Icon.source = sInfo.icon;
				this.Group_Broth.visible = false;
				this.Label_Desc.text = sInfo.desc;
			}break;
		}
	}

	/**
	 * 因为汤比较特殊，所以得额外fill进来
	 * @param {BrothModel} broth 汤的model
	 * @param {number} centerX 要绘制的位置x，为空时为图标中心
	 * @param {number} centerY 要绘制的位置y，为空时为图标中心
	 * @param {number} radius 要绘制的汤的半径，为空时为图标的40%
	 */
	private FillBroth(broth:BrothModel, centerX:number = null, centerY:number = null, radius:number = null){
		if (!this.Img_Icon) return;
		if (centerX == null) centerX = 0 ;
		if (centerY == null) centerY = 0;
		if (radius == null) radius = this.Img_Icon.width * 0.4;
		let shp = broth.ImageShape(
			centerX,// + this.Img_Icon.x,
			centerY + this.Img_Icon.y,
			radius
		)
		this.Group_Broth.addChild(shp);

		let brothHL = new eui.Image(RES.getRes(ResName_Broth_Highlight));
		this.Group_Broth.addChild(brothHL);
		brothHL.width = brothHL.height = radius * 2;
		brothHL.anchorOffsetX = brothHL.width / 2;
		brothHL.anchorOffsetY = brothHL.height / 2;
		brothHL.x = shp.x;
		brothHL.y = shp.y;
	}
	
}