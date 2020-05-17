//虽然叫model，但并不来自表，这个model是玩家制作的时候调整出来的，生成RamenObj用的
class RamenModel {
	public name:string;

	public bowl:BowlObj;
	
	public broth:BrothObj;
	public tare:Array<IngredientObj>;
	public noodles:IngredientObj
	public topping:Array<IngredientObj>;

	public reciptId:string;	//激活的recipt。

	public constructor() {
		this.tare = new Array<IngredientObj>();
		this.topping = new Array<IngredientObj>();
		this.reciptId = "";
	}

	
	/**
	 * 是否还能添加新的浇头
	 * @returns {boolean} 是否还能
	 */
	public CanAddTopping():boolean{
		return this.topping.length < this.bowl.model.cost;
	}

	/**
	 * 是否可以在某个位置加入某个食材，这里的坐标是对应于碗的中心点的
	 * @param {IngredientObj} topping 浇头
	 * @returns {boolean} 是否可以放
	 */
	public CanPlaceTopping(topping:IngredientObj){
		//判断是否在范围，不在就不行了
		let br = this.bowl.model.radius - topping.model.radius;
		let x = topping.x;
		let y = topping.y;
		if (x * x + y * y > br * br) return false;	//如果放到碗外面，那断然是不行的
		//没有在碗的外面，就判断重叠
		for (let i = 0; i < this.topping.length; i++){
			let tc:IngredientObj = this.topping[i];
			if (tc.model.radius <= 0) continue;
			if (Math.pow(tc.x - x, 2) + Math.pow(tc.y - y, 2) <= Math.pow(tc.model.radius + topping.model.radius, 2)) return false;
		}
		//可以放（这里只负责位置）
		return true;
	}

	/**
	 * 判断坐标点在哪个Topping上了
	 * @param {number} x 坐标点x
	 * @param {number} y 坐标点y
	 * @param {number} thisX 拉面的x坐标
	 * @param {number} thisY 拉面的y坐标
	 * @param {boolean} removeTouchOne 是否从toppings里面移除掉这个
	 * @returns {IngredientObj} 点中的那个，null代表没有
	 */
	public TouchedTopping(x:number, y:number, thisX:number, thisY:number, removeTouchOne:boolean):IngredientObj{
		if (!this.topping || this.topping.length <= 0) return null;
		//越后面的在越上面，越容易被点到
		for (let i = this.topping.length - 1; i >= 0; i--){
			let tp = this.topping[i];
			if (tp.TouchOnMe(x, y, thisX, thisY) == true){
				if (removeTouchOne == true){
					return this.topping.splice(i, 1)[0];
				}else{
					return tp;
				}
			}
		}
		return null;
	}

}