class BrothModel {
	public id:string;
	public name:string;

	private backColor:number;
	private coverColor:Array<number>;
	private coverAlpha:number;

	public rare:number;
	public cost:number;

	public pungency:number;
	public spicy:number;
	public sweet:number;
	public salty:number;
	public sour:number;

	public constructor() {
	}

	/**
	 * 从json的Object获取到数据
	 * @param {Object} json 存盘的json文件，参看“数据结构/面碗”文档。
	 * @returns {boolean} 是否成功，如果id有异常则不会成功
	 */
	public fromJson(json:Object){
		if (!json || !json["id"]){
			return false;
		}

		this.id = json["id"];
		this.name = json["name"] ? json["name"] : json["id"];
		this.backColor = json["backColor"] ? json["backColor"] : 0x000000;
		this.coverAlpha = json["coverAlpha"] ? json["coverAlpha"] : 0.18;

		this.rare = json["rare"] ? json["rare"] : 0;
		this.cost = json["cost"] ? json["cost"] : 0;

		this.pungency = json["pungency"] ? json["pungency"] : 0;
		this.spicy = json["spicy"] ? json["spicy"] : 0;
		this.sweet = json["sweet"] ? json["sweet"] : 0;
		this.salty = json["salty"] ? json["salty"] : 0;
		this.sour = json["sour"] ? json["sour"] : 0;

		this.coverColor = new Array<number>();
		if (json["coverColor"]){
			let cc = json["coverColor"];
			for (let i = 0; i < cc.length; i++){
				this.coverColor.push(cc[i]);
			}
		}

		return true;
	}

	/**
	 * 获取用于制作面条时候的图形
	 * @param {number} centerX 中心x坐标
	 * @param {number} centerY 中心y坐标
	 * @param {number} radius 半径
	 * @returns {egret.Shape} 用于制作面条时候的图形
	 */
	public ImageShape(centerX:number, centerY:number, radius:number):egret.Shape{
		return this.GatherShape(centerX, centerY, radius);
	}

	/**
	 * 获取用于icon的shape
	 * @param {number} centerX 中心x坐标
	 * @param {number} centerY 中心y坐标
	 * @param {number} radius 半径
	 * @returns {egret.Shape} 用于icon的shape
	 */
	public IconShape(centerX:number, centerY:number, radius:number):egret.Shape{
		return this.GatherShape(centerX, centerY, radius);
	}

	/**
	 * 获取用于场景中面条的的shape
	 * @param {number} centerX 中心x坐标
	 * @param {number} centerY 中心y坐标
	 * @param {number} radius 半径
	 * @returns {egret.Shape} 用于icon的shape
	 */
	public SceneShape(centerX:number, centerY:number, radius:number):egret.Shape{
		return this.GatherShape(centerX, centerY, radius);
	}

	private GatherShape(centerX:number, centerY:number, radius:number):egret.Shape{
		let brothMatrix = new egret.Matrix();
		brothMatrix.createGradientBox(radius * 2, radius * 2, 0, centerX - radius, centerY - radius)
		var shp:egret.Shape = new egret.Shape();
		shp.x = centerX;
		shp.y = centerY;
		//底色
		shp.graphics.lineStyle( 1, this.backColor );
        shp.graphics.beginFill( this.backColor, 1);
		shp.graphics.drawCircle( 0, 0, radius );
        shp.graphics.endFill();
		//烫的渐变cover
		let sizes = [0, 102, 216.75, 255];
		let alphas = new Array<number>();
		let loopLen = Math.min(sizes.length, this.coverColor.length)
		for (let i = 0; i < loopLen; i++){
			alphas.push(this.coverAlpha);
			//sizes.push((i+1) * 255 / this.coverColor.length);
		}
		shp.graphics.beginGradientFill(
			egret.GradientType.RADIAL,
			this.coverColor,
			alphas,
			sizes,
			brothMatrix
		);
        shp.graphics.drawCircle( 0, 0, radius );
        shp.graphics.endFill();

		return shp;
	}

	/**
	 * 获取用于场景中面条的的shape
	 * @param {egret.Graphics} toGraphic 要打印到的graphic
	 * @param {number} centerX 中心x坐标
	 * @param {number} centerY 中心y坐标
	 * @param {number} radius 半径
	 */
	public DrawToGraphic(toGraphic:egret.Graphics,centerX:number, centerY:number, radius:number){
		if (!toGraphic) return;
		let brothMatrix = new egret.Matrix();
		brothMatrix.createGradientBox(radius * 2, radius * 2, 0, centerX - radius, centerY - radius)
		
		//底色
		toGraphic.lineStyle( 1, this.backColor );
        toGraphic.beginFill( this.backColor, 1);
		toGraphic.drawCircle( centerX, centerY, radius );
        toGraphic.endFill();
		//烫的渐变cover
		let sizes = [0, 102, 216.75, 255];
		let alphas = new Array<number>();
		let loopLen = Math.min(sizes.length, this.coverColor.length)
		for (let i = 0; i < loopLen; i++){
			alphas.push(this.coverAlpha);
			//sizes.push((i+1) * 255 / this.coverColor.length);
		}
		toGraphic.beginGradientFill(
			egret.GradientType.RADIAL,
			this.coverColor,
			alphas,
			sizes,
			brothMatrix
		);
        toGraphic.drawCircle( 0, 0, radius );
        toGraphic.endFill();
	}
}

class LearntBroth{
	public model:BrothModel;
	public vote:number = 0;

	constructor(model:BrothModel){
		this.model = model;
	}
}

class BrothObj{
	public model:BrothModel;
	public tare:Array<IngredientObj>; //TODO 汤底里面选的料，这个暂时先空着，以后有了汤的玩法是要的

	constructor(model:BrothModel){
		this.model = model;
		this.tare = new Array<IngredientObj>();
	}
}