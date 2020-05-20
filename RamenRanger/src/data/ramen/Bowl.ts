class BowlModel {
	public id:string;
	public img:string;
	public icon:string;
	public scene:string;
	public sceneCenterX:number;
	public sceneCenterY:number;
	public name:string;
	public radius:number;
	public cost:number;

	public tareLimit = 6;	//TODO 最多6个tare，回头改成读数据

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
		this.img = json["img"] ? json["img"] : json["id"];
		this.icon = json["icon"] ? json["icon"] : "";
		this.scene = json["scene"] ? json["scene"] : "";
		this.sceneCenterX = json["x"] ? json["x"] : 0;
		this.sceneCenterY = json["y"] ? json["y"] : 0;
		this.radius = json["radius"] ? json["radius"] : 200;
		this.cost = json["cost"] ? json["cost"] : 1;

		return true;
	}

	/**
	 * 获取icon的资源名
	 * @returns {string} icon的名称
	 */
	public Icon():string{
		return this.img;
	}
}

class BowlObj{
	public model:BowlModel;
	constructor(model:BowlModel){
		this.model = model;
	}
}