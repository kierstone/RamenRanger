class SpriteGroup extends eui.Group {
	public constructor() {
		super();
	}

	protected childrenCreated():void
	{
		super.childrenCreated();
		//this.init();
	}

	/**
	 * 经过比较，我是否改到下面一层
	 * @returns {boolean} true代表我该去下一层
	 */
	public NeedToSendMeBack(compareGroup:SpriteGroup):boolean{
		if (!compareGroup) return false;
		return this.y < compareGroup.y;
	}

	public Update(){}
	public FixedUpdate():boolean{return false};
}