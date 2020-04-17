//虽然叫model，但并不来自表，这个model是玩家制作的时候调整出来的，生成RamenObj用的
class RamenModel {
	public name:string;

	public bowl:BowlObj;
	
	public broth:Array<IngredientObj>;
	public tare:Array<IngredientObj>;
	public noodles:Array<IngredientObj>;
	public topping:Array<IngredientObj>;

	public reciptId:string;	//激活的recipt。

	public constructor() {
		this.broth = new Array<IngredientObj>();
		this.tare = new Array<IngredientObj>();
		this.noodles = new Array<IngredientObj>();
		this.topping = new Array<IngredientObj>();
		this.reciptId = "";
	}

	/**
	 * 这碗面的标价（当然就是灵感值，逻辑上还是钱）
	 * @returns {number} 返回价格数，也就是灵感值
	 */
	public Price():number{
		let res:number = 0;
		for (let i = 0; i < this.broth.length; i++){
			res += this.broth[i].model.price;
		}
		for (let i = 0; i < this.tare.length; i++){
			res += this.tare[i].model.price;
		}
		for (let i = 0; i < this.noodles.length; i++){
			res += this.noodles[i].model.price;
		}
		for (let i = 0; i < this.topping.length; i++){
			res += this.topping[i].model.price;
		}
		return res;
	}

	/**
	 * 是否还能添加新的浇头
	 * @returns {boolean} 是否还能
	 */
	public CanAddCover():boolean{
		return this.topping.length < this.bowl.model.cost;
	}

	/**
	 * 是否可以在某个位置加入某个食材，这里的坐标是对应于碗的中心点的
	 * @param {IngredientModel} coverIngredient 浇头的model
	 * @param {number} x 准备放的x坐标，这个坐标对应的是coverIngredient的中心，相对于碗的中心（0，0）的偏移
	 * @param {number} y 准备放的y坐标，这个坐标对应的是coverIngredient的中心，相对于碗的中心（0，0）的偏移
	 * @returns {boolean} 是否可以放
	 */
	public CanPlaceCover(coverIngredient:IngredientModel, x:number, y:number){
		//判断是否在范围，不在就不行了
		let br = this.bowl.model.radius - coverIngredient.radius;
		if (x * x + y * y > br * br) return false;	//如果放到碗外面，那断然是不行的
		//没有在碗的外面，就判断重叠
		for (let i = 0; i < this.topping.length; i++){
			let tc:IngredientObj = this.topping[i];
			if (tc.model.IsLiquid() == true || tc.model.radius <= 0) continue;
			if (Math.pow(tc.x - x, 2) + Math.pow(tc.y - y, 2) <= Math.pow(tc.model.radius + coverIngredient.radius, 2)) return false;
		}
		//可以放（这里只负责位置）
		return true;
	}
}