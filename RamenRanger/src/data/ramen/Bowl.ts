class BowlModel {
	public id:string;
	public name:string;
	public radius:number;
	public tasteRadius:number;
	public soupRadius:number;
	public cost:number;
	public buffs:Array<CharacterBuffTrigger>;

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
		this.radius = json["radius"] ? json["radius"] : 200;
		this.tasteRadius = json["taste"] ? json["taste"] : 50;
		this.soupRadius = json["soup"] ? json["soup"] : 170;
		this.cost = json["cost"] ? json["cost"] : 1;

		this.buffs = new Array<CharacterBuffTrigger>();
		if (json["buff"] && json["buff"].length && json["buff"].length > 0){
			for (let i = 0; i < json["buff"].length; i++){
				let bObj = json["buff"][i];
				this.buffs.push(
					new CharacterBuffTrigger(bObj["id"], bObj["stack"], bObj["turns"])
				)
			}
		}

		return true;
	}

	/**
	 * 获取图片资源名
	 * @returns {string} 资源名称
	 */
	public Image():string{
		return "bowl_" + this.id;
	}

	/**
	 * 获取icon的资源名
	 * @returns {string} icon的名称
	 */
	public Icon():string{
		return "icon_bowl_" + this.id;
	}
}

class BowlObj{
	public model:BowlModel;
}