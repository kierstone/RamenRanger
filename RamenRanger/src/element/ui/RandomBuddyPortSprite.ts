class RandomBuddyPortSprite extends SpriteGroup{
	private parts:Array<eui.Image>;

	private port : RandomPortrait

	private _width:number;
	private _height:number;

	public constructor(buddyPort:RandomPortrait, width:number = 144, height:number = 144) {
		super();
		this.port = buddyPort;
		this._width = width;
		this._height = height;
	}

	protected childrenCreated():void
	{
		super.childrenCreated();
		this.init();
	}

	private init(){
		this.parts = new Array<eui.Image>();
		this.removeChildren();
		let ss = this.port.GetLayerSources();
		for (let i = 0; i < ss.length; i++){
			let img = new eui.Image(ss[i]);
			this.addChild(img);
			img.width = this._width;
			img.height = this._height;
			this.parts.push(img);
		}
	}

	private SetSize(width:number, height:number){
		for (let i = 0; i < this.parts.length; i++){
			this.parts[i].width = width;
			this.parts[i].height = height;
		}
	}
}

class RandomPortrait{
    public eye:number;
    public brow:number;
    public mouth:number;
    public face:number;
    public foreHair:number;
    public backHair:number;
    public glasses:number;
    public cloth:number;
    public nose:number;

	private _favType:FoodCourtDishType

    constructor(favourType:FoodCourtDishType){
		this._favType = favourType;
        this.Random(favourType);
    }

    public Random(favourType:FoodCourtDishType){
        //TODO 现在都是写死的
        this.eye = Utils.RandomInt(0, 9);
        this.brow = Utils.RandomInt(0, 9);
        this.mouth = Utils.RandomInt(0, 14);
        this.face = Utils.RandomInt(0, 3);
        this.foreHair = Utils.RandomInt(0, 9);
        this.backHair = Utils.RandomInt(0, 7);
        this.glasses = Utils.RandomInt(0, 5);
        this.cloth = Utils.RandomInt(0, 2);
        this.nose = Utils.RandomInt(0, 4);
    }

	/**
	 * 获得每一层贴图的文件source
	 * @returns {Array<string>} 每一层（从下到上）的资源名称字符串
	 */
	public GetLayerSources():Array<string>{
		//TODO 现在都是写死的
		let res = [
			"female_back_hair_" + this.backHair.toString(),
			"female_neck",
			"female_cloth_" + this.cloth.toString(),
			"female_face_" + this.face.toString(),
			"female_eye_" + this.eye.toString(),
			"female_eyeball_" + this.eye.toString(),
			"female_brow_" + this.brow.toString(),
			"female_nose_" + this.nose.toString(),
			"female_mouth_" + this.mouth.toString(),
			"female_middle_hair_" + this.backHair.toString(),
			"female_glasses_" + this.glasses.toString(),
			"female_hair_" + this.foreHair.toString()
		];

		return res;
	}
}