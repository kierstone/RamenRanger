class IngredientMutual {
	public ingText1:string;
	public ingIcon1:string;
	public ingSubject1:IngredientSubject;
	// public ingType1:string;
	// public ingClass1:string;
	// public ingCatagory1:string;
	public ingText2:string;
	public ingIcon2:string;
	public ingSubject2:IngredientSubject;
	// public ingType2:string;
	// public ingClass2:string;
	// public ingCatagory2:string; 
	public score:string;
	public isHarmful:boolean;
	public desc:string;
	public effectKeys:Array<string>;

	public constructor(data?:Object) {
		if(data) this.FromJson(data);
	}

	/**
	 * 从json的Object获取到数据
	 * @param {Object} json 存盘的json文件，参看“数据结构/食材的结构”文档。
	 * @returns {boolean} 是否成功，如果id有异常则不会成功
	 */
	public FromJson(json:Object){
		if (!json){
			return false;
		}
		
		this.ingText1 = json["ing_text1"] ? json["ing_text1"] : "";
		this.ingIcon1 = json["ing_icon1"] ? json["ing_icon1"] : "";
		let iType1 = json["ing_type1"] ? json["ing_type1"] : "";
		let iClass1 = json["ing_class1"] ? json["ing_class1"] : "";
		let iCatagory1 = json["ing_catagory1"] ? json["ing_catagory1"] : "";
		this.ingSubject1 = new IngredientSubject(iType1, iClass1, iCatagory1);	
		
		this.ingText2 = json["ing_text2"] ? json["ing_text2"] : "";
		this.ingIcon2 = json["ing_icon2"] ? json["ing_icon2"] : "";
		let iType2 = json["ing_type2"] ? json["ing_type2"] : "";
		let iClass2 = json["ing_class2"] ? json["ing_class2"] : "";
		let iCatagory2 = json["ing_catagory2"] ? json["ing_catagory2"] : "";	
		this.ingSubject2 = new IngredientSubject(iType2, iClass2, iCatagory2);	

		this.isHarmful = json["harmful"] ? json["harmful"] : false;
		this.score = json["score"] ? json["score"] : 0;
		this.desc = json["desc"] ? json["desc"] : "";

		this.effectKeys = new Array<string>();
		if (json["tag"]){
			let jt:Array<string> = json["effect_keys"];
			for (let i = 0; i < jt.length; i++){
				this.effectKeys.push(jt[i]);
			}
		}

		return true;
	}

	/**
	 * 是否符合当前这条组合
	 * @param {IngredientModel} ing1 食材1
	 * @param {IngredientModel} ing2 食材2
	 * @returns {boolean} 返回食材1和食材2是否符合这条组合
	 */
	public FitThisMutual(ing1:IngredientModel, ing2:IngredientModel):boolean{
		//要么1根1符合的同时2根2符合，要么1根2符合的同时2根1符合
		return (
			(this.ingSubject1.Fit(ing1.subject) == true && this.ingSubject2.Fit(ing2.subject) == true) ||
			(this.ingSubject1.Fit(ing2.subject) == true && this.ingSubject2.Fit(ing1.subject) == true)
		);
	}
}