//从json读取的ingredient数据
class IngredientModel {

	public id:string;
	public name:string;
	public img:string;
	public icon:string;
	public scene:string;
	public radius:number;

	public subject:IngredientSubject;
	// public ingType:string;	//是哪个大类
	// public ingClass:string;	//是哪个中类
	// public ingCatagory:string;	//是哪个小类

	public tasty:number;	//入味度
	public affect:number;	//着味度

	public canBeUsed:number;
	public liquid:boolean;
	public tags:Array<string>;

	public eat:boolean;	//吃面过程中是否吃这个

	public pungency:number;
	public sweet:number;
	public salty:number;
	public sour:number;
	public spicy:number;

	

	public constructor(data?:Object) {
		if (data) this.FromJson(data);
	}

	/**
	 * 从json的Object获取到数据
	 * @param {Object} json 存盘的json文件，参看“数据结构/食材的结构”文档。
	 * @returns {boolean} 是否成功，如果id有异常则不会成功
	 */
	public FromJson(json:Object){
		if (!json || !json["id"]){
			return false;
		}

		this.id = json["id"];
		this.name = json["name"] ? json["name"] : json["id"];
		this.img = json["img"] ? json["img"] : "";
		this.icon = json["icon"] ? json["icon"] : "";
		this.scene = json["scene"] ? json["scene"] : "";
		this.radius = json["radius"] ? json["radius"] : 0;	

		this.canBeUsed = json["using"] ? json["using"] : 0;
		this.liquid = json["liquid"] ? json["liquid"] : false;

		this.eat = json["eat"] ? json["eat"] : false;
		this.tasty = json["tasty"] ? json["tasty"] : 0;
		this.affect = json["affect"] ? json["affect"] : 0;

		let iType = json["type"] ? json["type"] : "";
		let iClass = json["class"] ? json["class"] : "";
		let iCatagory = json["catagory"] ? json["catagory"] : "";
		this.subject = new IngredientSubject(iType, iClass, iCatagory);

		this.pungency = json["pungency"] ? json["pungency"] : 0;
		this.sweet = json["sweet"] ? json["sweet"] : 0;
		this.salty = json["salty"] ? json["salty"] : 0;
		this.sour = json["sour"] ? json["sour"] : 0;
		this.spicy = json["spicy"] ? json["spicy"] : 0;

		this.tags = new Array<string>();
		if (json["tag"]){
			let jt:Array<string> = json["tag"];
			for (let i = 0; i < jt.length; i++){
				this.tags.push(jt[i]);
			}
		}
		

		return true;
	}

	/**
	 * 材料能否做着味
	 * @returns {boolean} 是否可以做着味
	 */
	public CanBeTare():boolean{
		return (this.canBeUsed & IngredientUseType.UseType_Tare) > 0;
	}

	/**
	 * 材料能否做汤底
	 * @returns {boolean} 是否可以做汤底
	 */
	public CanBeBroth():boolean{
		return (this.canBeUsed & IngredientUseType.UseType_Broth) > 0;
	}

	/**
	 * 材料能否做面条
	 * @returns {boolean} 是否可以做面条
	 */
	public CanBeNoodle():boolean{
		return (this.canBeUsed & IngredientUseType.UseType_Noodle) > 0;
	}

	/**
	 * 材料能否做盖浇
	 * @returns {boolean} 是否可以做盖浇
	 */
	public CanBeTopping():boolean{
		return (this.canBeUsed & IngredientUseType.UseType_Topping) > 0;
	}
}

//实际使用的ingredient
class IngredientObj{
	public uniqueId:string;
	public model:IngredientModel;

	//放在浇头上的位置，如果在汤里、面里、作为着味就不会有这个
	public x:number;
	public y:number;
	public rotation:number;
	public xFlip:boolean;	//是否水平翻转
	public size:number = 1;	//From 0.5 to 2，放大倍数

	constructor(model:IngredientModel, x:number = 0, y:number = 0, rotation:number = 0){
		this.uniqueId = Utils.GetUniqueId("IngredientObj");
		this.model = model;
		this.x = x;
		this.y = y;
		this.rotation = rotation;
		this.xFlip = false;
		this.size = 1;
	}

	/**
	 * 根据当前情况创建一个新的eui.Image
	 * @param {eui.Group} parent 要放到什么父亲
	 * @param {number} centerX 面碗中心的x坐标
	 * @param {number} centerY 面碗中心的y坐标
	 * @returns {eui.Image} 创建出来的image
	 */
	public GatherImage(parent:eui.Group, centerX:number, centerY:number):eui.Image{
		if (!parent) return null;
		let res = new eui.Image(RES.getRes(this.model.img));
		parent.addChild(res);
		res.anchorOffsetX = res.width / 2;
		res.anchorOffsetY = res.height / 2;
		res.x = this.x + centerX;
		res.y = this.y + centerY;
		res.rotation = this.rotation;
		res.scaleX = (this.xFlip == true ? -1:1) * this.size;
		res.scaleY = this.size;
		return res;
	}

	/**
	 * 根据当前情况创建一个新的eui.Image
	 * @param {eui.Group} parent 要放到什么父亲
	 * @param {number} centerX 面碗中心的x坐标
	 * @param {number} centerY 面碗中心的y坐标
	 * @returns {eui.Image} 创建出来的image
	 */
	public GatherSceneImage(parent:eui.Group, centerX:number, centerY:number):eui.Image{
		if (!parent) return null;
		let res = new eui.Image(RES.getRes(this.model.scene));
		parent.addChild(res);
		res.anchorOffsetX = res.width / 2;
		res.anchorOffsetY = res.height / 2;
		res.x = Math.round(this.x * Scene_PosScale + centerX);
		res.y = Math.round(this.y * Scene_PosScale + centerY);
		res.rotation = this.rotation;
		res.scaleX = (this.xFlip == true ? -1:1) * this.size;
		res.scaleY = this.size;
		return res;
	}

	/**
	 * 将属性设置到eui.Image
	 * @param {eui.Image} img 要设置的图形
	 * @param {number} centerX 面碗中心的x坐标
	 * @param {number} centerY 面碗中心的y坐标
	 */
	public SetToImage(img:eui.Image, centerX:number, centerY:number){
		if (!img) return;
		img.x = this.x + centerX;
		img.y = this.y + centerY;
		img.rotation = this.rotation;
		img.scaleX = (this.xFlip == true ? -1:1) * this.size;
		img.scaleY = this.size;
	}

	/**
	 * 某个点是否算碰到我了（点击用）
	 * @param {number} x 坐标点x
	 * @param {number} y 坐标点y
	 * @param {number} centerX 面碗中心的x坐标
	 * @param {number} centerY 面碗中心的y坐标
	 * @returns {boolean} 算不算点到 
	 */
	public TouchOnMe(x:number, y:number, centerX:number, centerY:number):boolean{
		let clickRadius = this.ClickRadius();
		let rX = x - centerX;
		let rY = y - centerY;

		return (Math.pow(rX - this.x, 2) + Math.pow(rY - this.y, 2)) <= Math.pow(clickRadius * this.size , 2);
	}

	/**
	 * 点选半径，为了以后可以维护，要考虑是否需要变成一个单独属性
	 * @returns {number} 点选半径
	 */
	public ClickRadius():number{
		return this.model.radius * 5;
	}

	/**
	 * 克隆一个自己
	 * @param {boolean} sameUid 克隆出来的是否连uniqueId都和这个是一样的
	 * @returns {IngredientObj} 克隆体
	 */
	public Clone(sameUid:boolean = false){
		let res = new IngredientObj(this.model, this.x, this.y, this.rotation);
		if (sameUid == true) res.uniqueId = this.uniqueId;
		res.xFlip = this.xFlip;
		res.size = this.size;
		return res;
	}
} 

/**
 * 玩家学会的素材配方
 */
class LearntIngredient{
	public model:IngredientModel;
	public vote:number = 0;	//被赞了多少次

	constructor(model:IngredientModel){
		this.model = model;
	}
}

/**
 * 一个食材所属的大类、细类、品类
 */
class IngredientSubject{
	public ingCatagory:string;	//品类
	public ingClass:string;		//细类
	public ingType:string;		//大类

	constructor(ingType:string, ingClass:string = "", ingCatagory:string = ""){
		this.ingType = ingType;
		this.ingClass = ingClass;
		this.ingCatagory = ingCatagory;
	}

	/**
	 * 判断是否和传进来的类型是同类的东西
	 * @param {IngredientSubject} ingSubject 要判断的是否与自己一样的类型
	 * @returns {boolean} 是否一样
	 */
	public Fit(ingSubject:IngredientSubject):boolean{
		//如果大类不确定，或者大类不相同，就肯定不是同类
		if (this.ingType == "" || ingSubject.ingType == "" || this.ingType != ingSubject.ingType) return false;

		//到这里，如果细类一样，才有可能比下去，哪怕两者的品类都是空（无要求），所以延伸到品类了，那么细类也必须填写
		if (this.ingClass == ingSubject.ingClass){
			//如果品类都一样，哪怕都是空的，也代表都是一样的货色，或者其中有一个品类要求是空的
			return (this.ingCatagory == "" || ingSubject.ingCatagory == "" || this.ingCatagory == ingSubject.ingCatagory);
		}

		return false;	//都对不上，只有false了
	}
}


//素材用途
enum IngredientUseType{
	UseType_None = 0,
	UseType_Tare = 1,
	UseType_Broth = 2,
	UseType_Noodle = 4,
	UseType_Topping = 8
}