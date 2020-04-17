class IngredientClass {
	public id:string;
	public name:string;
	public icon:string;
	public items:Array<IngredientModel>;

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
		this.icon = "icon_Ingredient_"+ (json["icon"] ? json["icon"] : "");

		this.items = new Array<IngredientModel>();
		if (json["children"] && json["children"].length && json["children"].length > 0){
			for (let i = 0; i < json["children"].length; i++){
				let bObj = json["children"][i];
				let im:IngredientModel = new IngredientModel();
				im.fromJson(bObj, this.id);
				this.items.push(im);
			}
		}

		return true;
	}

	
}