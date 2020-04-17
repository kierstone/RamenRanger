//从json读取的ingredient数据
class IngredientModel {
	public static UseType_Taste = 1;
	public static UseType_Soup = 2;
	public static UseType_Noodle = 4;
	public static UseType_Ingredient = 8;

	public id:string;
	public name:string;

	public canBeTaste:boolean;
	public canBeSoup:boolean;
	public canBeNoodle:boolean;
	public canBeIngredient:boolean;

	public pungency:number;
	public sweet:number;
	public salty:number;
	public sourness:number;
	public spicy:number;

	public radius:number;
	public price:number;
	public buffs:Array<CharacterBuffTrigger>;
	public liquid:LiquidInfo;

	public ingredientClassId:string;

	public constructor() {
	}

	/**
	 * 从json的Object获取到数据
	 * @param {Object} json 存盘的json文件，参看“数据结构/食材的结构”文档。
	 * @param {string} classId 所在的素材组的id
	 * @returns {boolean} 是否成功，如果id有异常则不会成功
	 */
	public fromJson(json:Object, classId:string){
		if (!json || !json["id"]){
			return false;
		}

		this.id = json["id"];
		this.name = json["name"] ? json["name"] : json["id"];
		this.radius = json["radius"] ? json["radius"] : 0;	

		this.canBeTaste = json["taste"] ? json["taste"] : false;
		this.canBeSoup = json["soup"] ? json["soup"] : false;
		this.canBeNoodle = json["noodle"] ? json["noodle"] : false;
		this.canBeIngredient = json["ingredient"] ? json["ingredient"] : false;

		this.pungency = json["pungency"] ? json["pungency"] : 0;
		this.sweet = json["sweet"] ? json["sweet"] : 0;
		this.salty = json["salty"] ? json["salty"] : 0;
		this.sourness = json["sourness"] ? json["sourness"] : 0;
		this.spicy = json["spicy"] ? json["spicy"] : 0;

		this.price = json["price"] ? json["price"] : 0;

		this.ingredientClassId = classId;

		this.buffs = new Array<CharacterBuffTrigger>();
		if (json["buff"] && json["buff"].length && json["buff"].length > 0) {
			for (let i = 0; i < json["buff"].length; i++){
				let bObj = json["buff"][i];
				this.buffs.push(
					new CharacterBuffTrigger(bObj["id"],bObj["stack"],bObj["turns"])
				);
			}
		}

		this.liquid = null;
		if (json["liquid"]){
			if (json["liquid"]["color"]){
				let lcInfo = json["liquid"]["color"];
				this.liquid = new LiquidInfo(
					lcInfo["a"], lcInfo["r"], lcInfo["g"], lcInfo["b"]
				)
			}
			this.radius = 0;
		}

		return true;
	}

	/**
	 * 获取图片资源名
	 * @returns {string} 资源名称
	 */
	public Image():string{
		return "ingredient_" + this.id;
	}

	/**
	 * 获取icon的资源名
	 * @returns {string} icon的名称
	 */
	public Icon():string{
		return "icon_ingredient_" + this.id;
	}

	/**
	 * 返回这个材料是否是液体
	 * @returns {boolean} 是否是液体
	 */
	public IsLiquid():boolean{
		return this.liquid != null && this.radius <= 0;
	}
}

//实际使用的ingredient
class IngredientObj{
	public model:IngredientModel;

	//放在浇头上的位置，如果在汤里、面里、作为着味就不会有这个
	public x:number;
	public y:number;
	public rotation:number;

	constructor(model:IngredientModel, x:number = 0, y:number = 0, rotation:number = 0){
		this.model = model;
		this.x = x;
		this.y = y;
		this.rotation = rotation;
	}
} 