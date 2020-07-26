//虽然叫model，但并不来自表，这个model是玩家制作的时候调整出来的，生成RamenObj用的
class RamenModel {
	public name:string;

	public bowl:BowlObj;
	
	public broth:BrothObj;
	public noodles:IngredientObj
	public topping:Array<IngredientObj>;

	public reciptId:string;	//激活的recipt。

	public constructor() {
		//this.tare = new Array<IngredientObj>();
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

	/**
	 * 判断坐标点在哪个Tare上了
	 * @param {number} x 坐标点x
	 * @param {number} y 坐标点y
	 * @param {number} thisX 拉面的x坐标
	 * @param {number} thisY 拉面的y坐标
	 * @param {boolean} removeTouchOne 是否从tare里面移除掉这个
	 * @returns {IngredientObj} 点中的那个，null代表没有
	 */
	// public TouchedTare(x:number, y:number, thisX:number, thisY:number, removeTouchOne:boolean):IngredientObj{
	// 	if (!this.tare || this.tare.length <= 0) return null;
	// 	//越后面的在越上面，越容易被点到
	// 	for (let i = this.tare.length - 1; i >= 0; i--){
	// 		let tp = this.tare[i];
	// 		if (tp.TouchOnMe(x, y, thisX, thisY) == true){
	// 			if (removeTouchOne == true){
	// 				return this.tare.splice(i, 1)[0];
	// 			}else{
	// 				return tp;
	// 			}
	// 		}
	// 	}
	// 	return null;
	// }

	/**
	 * 随机创建一碗“拉面”
	 * @param {BowlModel} bowl 用的碗的model，这个必须有
	 * @param {BrothModel} broth 用的汤底，可以是null
	 * @param {IngredientModel} noodles 用的面条，可以是null
	 * @param {Array<IngredientModel>} toppings 盖浇，当然也可以是null
	 */
	public RandomRamen(bowl:BowlModel, broth:BrothModel, noodles:IngredientModel, toppings:Array<IngredientModel>){
		if (!bowl) return;
		this.bowl = new BowlObj(bowl);

		if (broth){
			this.broth = new BrothObj(broth);
		}

		if (noodles){
			this.noodles = new IngredientObj(noodles);
		}

		if (toppings){
			for (let i = 0; i < toppings.length; i++){
				let pos = this.bowl.RandomPosInBowl();
				this.topping.push(
					new IngredientObj(toppings[i], pos.x, pos.y, Math.random()*360)
				);
			}
			this.topping.sort((t1:IngredientObj, t2:IngredientObj)=>{
				if (t1.y < t2.y){
					return -1
				}else if (t1.y > t2.y){
					return 1;
				}else{
					return t1.x <= t2.x ? -1 : 1;
				}
			})
		}
	}

	/**
	 * 返回满足类型的食材的个数，包含汤底里的
	 * @param {IngredientSubject} ingSubject 需要找的类型
	 * @returns {number} 符合的个数
	 */
	public GetIngredientCountBySubject(ingSubject:IngredientSubject):number{
		let res = 0;
		
		if (this.broth && this.broth.tare){
			for (let i = 0; i < this.broth.tare.length; i++){
				if (this.broth.tare[i].model.subject.Fit(ingSubject) == true){
					res += 1;
				}
			}
		}

		for (let i = 0; i < this.topping.length; i++){
			if (this.topping[i].model.subject.Fit(ingSubject) == true){
				res += 1;
			}
		}

		return res;
	}

	/**
	 * 获得这碗拉面解锁的组合的索引
	 * @param {IngredientModel} withIng 可以是null，如果有这个食材的话，满足的组合有哪些。
	 * @returns {Array<IngredientMutual>} 符合的组合索引数组
	 */
	public GetMutuals(withIng:IngredientModel):Array<IngredientMutual>{
		let res = new Array<IngredientMutual>();
		if (!GameData_IngredientMutual) return res;
		
		let checkIng = new Array<IngredientModel>();
		if (this.broth && this.broth.tare){
			for (let i = 0; i < this.broth.tare.length; i++){
				checkIng.push(this.broth.tare[i].model);
			}
		}
		for (let i = 0; i < this.topping.length; i++){
			checkIng.push(this.topping[i].model);
		}
		if (withIng){
			checkIng.push(withIng);
		}

		for (let i = 0; i < checkIng.length - 1; i++){
			for (let j = i + 1; j < checkIng.length; j++){
				for (let n = 0; n < GameData_IngredientMutual.length; n++){
					if (res.indexOf(GameData_IngredientMutual[n]) < 0){
						if (GameData_IngredientMutual[n].FitThisMutual(checkIng[i], checkIng[j]) == true){
							res.push(GameData_IngredientMutual[n]);
						}
					}
				}
			}
		}

		return res;
	}
	
}


class RamenObj{
	public model:RamenModel;

	//碗里的状况
	public topping:Array<IngredientObj>;
	public noodlePercentage:number = 1;	//0-1 as 0%-100%
	public brothPercentage:number = 1;

	public cantEatToppings:Array<IngredientObj>;	//不能吃的食材

	constructor(model?:RamenModel, toppings?:Array<IngredientObj>){
		this.topping = new Array<IngredientObj>();
		if (model) this.SetModel(model, toppings);
	}

	/**
	 * 设置进去
	 * @param {RamenModel} model 拉面的model
	 * @param {Array<IngredientObj>} toppings 如果不存在，就是新建一个；否则就用输入的
	 */
	public SetModel(model:RamenModel, toppings?:Array<IngredientObj>){
		if (!model) return;
		this.model = model;
		
		if (!toppings){
			this.topping = new Array<IngredientObj>();
			for (let i = 0; i < this.model.topping.length; i++){
				this.topping.push(this.model.topping[i].Clone(false));
			}
		}else{
			this.topping = toppings;
		}
		
		this.cantEatToppings = new Array<IngredientObj>();
		for (let i = 0; i < this.topping.length; i++){
			if (this.topping[i].model.eat == false){
				this.cantEatToppings.push(this.topping[i]);
			}
		}

		this.noodlePercentage = this.model.noodles ? 1 : 0;
		this.brothPercentage = this.model.broth ? 1: 0;
	}

	/**
	 * 克隆这碗拉面
	 * @param {boolean} sameIngredientUid 是否所有的topping采用和这碗一样的uniqueId
	 */
	public Clone(sameIngredientUid:boolean):RamenObj{
		if (sameIngredientUid == false){
			return new RamenObj(this.model);
		}else{
			let ing = new Array<IngredientObj>();
			for (let i = 0; i < this.topping.length; i++){
				ing.push(this.topping[i].Clone(true));
			}
			return new RamenObj(this.model, ing);
		}
	}

	/**
	 * 根据uniqueId来获取某个topping
	 * @param {string} uid 要查找的uid
	 * @returns {IngredientObj} 返回topping，如果是null就是没找到
	 */
	public GetToppingByUniqueId(uid:string):IngredientObj{
		for (let i = 0; i < this.topping.length; i++){
			if (this.topping[i].uniqueId == uid){
				return this.topping[i];
			}
		}
		return null;
	}

	/**
	 * 判断是否已经吃光了
	 */
	public HasFinished():boolean{
		if (Math.floor(this.noodlePercentage * 10) > 1) return false;	//浮点问题所以这么干
		for (let i = 0; i < this.topping.length; i++){
			if (this.topping[i].model.eat == true){
				return false;	//还有要吃的东西
			}
		}
		return true;
	}

	/**
	 * 随机可以吃的Topping
	 */
	public GetRandomToppingForEat():IngredientObj{
		let res = new Array<IngredientObj>();
		for (let i = 0; i < this.topping.length; i++){
			if (this.cantEatToppings.indexOf(this.topping[i]) < 0){
				res.push(this.topping[i]);
			}
		}
		if (res.length > 0){
			let idx = Utils.GetRandomIndexFromArray(res.length, 1)[0];
			return res[idx];
		}

		return null;
	}

}