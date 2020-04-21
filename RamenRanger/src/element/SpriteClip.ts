class SpriteClip extends eui.Image{
	private preloadTextures:Object ; //{"key":string, "texture":egret.Texture}

	//private logicOffsetX:number = 0;	//和x坐标的逻辑偏差
	//private logicOffsetY:number = 0;
	private logicLayer:SpriteClipLayer = SpriteClipLayer.Normal;

	public constructor() {
		super();
		this.preloadTextures = {};
	}

	protected childrenCreated():void
	{
		super.childrenCreated();
		//this.init();
	}


	/**
	 * 预加载这些textures
	 * @param {Object} texture {"key":string, "texture":egret.Texture}
	 */
	public SetPreloadTexturesFromObject(textures:Object){
		this.preloadTextures = textures;
	}

	/**
	 * 根据string预加载这些texture
	 * @param {Array<string>} keys 文件名称，最终将成为preloadTextures[Key]
	 */
	public SetPreloadTextureByKeys(keys:Array<string>){
		this.preloadTextures = {};
		for (let i = 0; i < keys.length; i++){
			this.preloadTextures[keys[i]] = RES.getRes(keys[i]);
		}
	}

	/**
	 * 设置当前图形为preload的某一个
	 * @returns {boolean} 是否成功
	 */
	public ChangeToPreloadTexture(key:string):boolean{
		if (key == "" || !this.preloadTextures || !this.preloadTextures[key]){
			return false;
		}
		this.texture = this.preloadTextures[key];
	}

	/**
	 * 经过比较，我是否改到下面一层
	 * @returns {boolean} true代表我该去下一层
	 */
	public NeedToSendMeBack(compareSpritClip:SpriteClip):boolean{
		if (!compareSpritClip) return false;
		// let myTop = this.anchorOffsetY < 0 ? (this.y + this.anchorOffsetY) : this.y;
		// let myBottom = this.anchorOffsetY > 0 ? (this.y + this.anchorOffsetY) : this.y;
		// let itTop = compareSpritClip.anchorOffsetY < 0 ? (compareSpritClip.y + compareSpritClip.anchorOffsetY) : compareSpritClip.y;
		// let itBottom = compareSpritClip.anchorOffsetY > 0 ? (compareSpritClip.y + compareSpritClip.anchorOffsetY) : compareSpritClip.y;
		// if (itTop > myBottom || itBottom < myTop){
		// 	return false;	//两者碰不到不存在层级问题
		// }
		if (this.logicLayer == compareSpritClip.logicLayer){
			return this.y < compareSpritClip.y;
		}else{
			return this.logicLayer < compareSpritClip.logicLayer;
		}
	}
}