/**
 * 美食街小吃的盖浇信息
 */
class FoodCourtDishToppingInfo{
	public ingredientId:string;
	public size:number = 1;
	public x:number;
	public y:number;
	public rotate:number = 0;

	constructor(ingredientId:string, x:number, y:number, size:number = 1, rotate:number = 0){
		this.ingredientId = ingredientId;
		this.x = x;
		this.y = y;
		this.size = size;
		this.rotate = rotate;
	}
}

/**
 * 美食街的美食，读取自表格
 */
class FoodCourtDishModel{
	public id:string;
	public name:string;

	public bowlId:string;
	public brothId:string;
	public riceId:string;
	public topping:Array<FoodCourtDishToppingInfo>;
	public type:FoodCourtDishType;

	public feed:number;
	public reward:Array<FoodCourtIngredient>;	//不重复的，可以习得食材的列表
	
	constructor(data?:string){
		if (data) this.FromJson(data);
	} 

	 /**
	 * 从json的Object获取到数据
	 * @param {Object} json 存盘的json文件
	 * @returns {boolean} 是否成功，如果id有异常则不会成功
	 */
    public FromJson(json:Object){
        if (!json || json["id"] == null || json["id"] == undefined){
			return false;
		}

        this.id = json["id"];
        this.name = json["name"] ? json["name"] : "";

        this.bowlId = json["bowl"] ? json["bowl"] : "";
		this.brothId = json["broth"] ? json["broth"] : "";
		this.riceId = json["rice"] ? json["rice"] : "";
		this.type = json["type"] ? json["type"] : 0;

		this.feed = json["feed"] ? json["feed"] : 0;

		this.topping = new Array<FoodCourtDishToppingInfo>();
		if (json["topping"]){
			for (let i = 0; i < json["topping"].length; i++){
				let ti = json["topping"][i];
				if (ti["ingredient"] && ti["ingredient"] != ""){
					this.topping.push(new FoodCourtDishToppingInfo(
						ti["ingredient"],
						ti["x"] ? ti["x"] : 0,
						ti["y"] ? ti["y"] : 0,
						ti["size"] ? ti["size"] : 1,
						ti["rotate"] ? ti["rotate"] : 0
					));
				}
			}
		}

        this.reward = new Array<FoodCourtIngredient>();
		if (json["reward"]){
			for (let i = 0; i < json["reward"].length; i++){
				let fci = json["reward"][i];
				if (fci["ingredient"] && fci["ingredient"] != ""){
					this.reward.push(new FoodCourtIngredient(
						fci["ingredient"], 
						fci["exp"]? fci["exp"] : 0,
						fci["broth"] ? fci["broth"] : false
					));
				}
			}
		}
    }
}

class FoodCourtDishObj {
	public dish:RamenObj;		//这碗吃的是啥
	public model:FoodCourtDishModel;	

	public constructor(model:FoodCourtDishModel) {
		this.model = model;

		this.SetIngredients(this.model.topping, this.model.bowlId, this.model.brothId, this.model.riceId);
	}

	private SetIngredients(ingredientId:Array<FoodCourtDishToppingInfo>, bowlId:string, brothModelId?:string, riceIngredientId?:string){
		let broth:BrothModel = null;
		if (brothModelId){
			broth = GetBrothModelById(brothModelId);
		}

		let rice:IngredientModel = null;
		if (riceIngredientId){
			rice = GetIngredientModelById(riceIngredientId);
		}

		let bowl:BowlModel = GameData_Bowl[0];	//TODO 写死了第0个碗
		if (bowlId){
			let b = GetBowlModelById(bowlId);
			if (b) bowl = b;
		}

		let rm = new RamenModel();
		rm.bowl = new BowlObj(bowl);
		rm.broth = broth == null? null : new BrothObj(broth);
		rm.noodles = rice == null? null : new IngredientObj(rice);
		rm.topping = new Array<IngredientObj>();
		for (let i = 0; i < ingredientId.length; i++){
			let ingM:IngredientModel = GetIngredientModelById(ingredientId[i].ingredientId);
			if (ingM){
				let ing = new IngredientObj(
					ingM, ingredientId[i].x, ingredientId[i].y, ingredientId[i].rotate
				);
				ing.size = ingredientId[i].size;
				rm.topping.push(ing);
			}
		}

		this.dish = new RamenObj(rm);
	}

	/**
	 * 某个食材是否可能拿到经验
	 * 着味会被当做ingredient使用，比如排骨年糕有酱料
	 * @param {string} ingredientId 食材的model.id
	 * @returns {FoodCourtIngredient} 如果不是Null就说明有可以习得的信息
	 */
	public IngredientInReward(ingredientId:string):FoodCourtIngredient{
		for (let i = 0; i < this.model.reward.length; i++){
			if (this.model.reward[i].ingredientId == ingredientId){
				return this.model.reward[i];
			}
		}
		return null;
	}

	/**
	 * 汤底是否可以被学习，如果在吃面，则可能有机会学习到汤底（着味会被当做ingredient使用）
	 * @returns {FoodCourtIngredient} 如果不是Null就说明有可以习得的信息
	 */
	public BrothInReward():FoodCourtIngredient{
		for (let i = 0; i < this.model.reward.length; i++){
			if (this.model.reward[i].broth == true){
				return this.model.reward[i];
			}
		}
		return null;
	}
}

class FoodCourtIngredient{
	public ingredientId:string; //是啥玩意
	public exp:number;	//给多少经验
	public broth:boolean = false;
	
	constructor(ingredientId:string, exp:number, broth:boolean = false){
		this.ingredientId = ingredientId;
		this.exp = exp;
		this.broth = broth;
	}
}

enum FoodCourtDishType {
	Red = 0,
	Blue = 1,
	Yellow = 2,
	White = 3
}

var GetFoodCourtDishTypeColor = function(ft:FoodCourtDishType){
	let c = [
		0xFF0000,
		0xFFFF00,
		0x00FFFF,
		0x0000FF
	]
	return c[ft];
}