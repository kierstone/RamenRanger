//一个角色的动画信息文件
class CharacterActionInfo {
	public key:string;

	// private stand:Array<Array<CharacterFrameInfo>>;
	// private standtrick:Array<Array<CharacterFrameInfo>>;
	// private walk:Array<Array<CharacterFrameInfo>>;

	private allActions:Array<Array<Array<CharacterFrameInfo>>>;	//[CharacterAction][Direction][FrameIndex]

	public head_upper:number = 0;	//头往上有这么多像素约定空间
	public head_lower:number = 0;	//头往下有这么多像素空间
	public body_upper:number = 0;	//身体往上
	public body_lower:number = 0;

	public toPreloadHeadImage:Array<string>;	//所有要预加载的图片
	public toPreloadBodyImage:Array<string>;	//所有要预加载的图片
	public toPreloadEmoteImage:Array<string>;	

	public eatIngredientPos:Array<egret.Point>;	//吃的动作食物的位置

	public constructor() {
		this.allActions = new Array<Array<Array<CharacterFrameInfo>>>();
	}

	/**
	 * 获得某个方向某个动作的每一帧信息
	 * @param {Direction} direction 方向
	 * @param {CharacterAction} action 动作
	 * @returns {Array<CharacterFrameInfo>} 每一帧的数据，如果是null，代表没有这一动画。
	 */
	public GetFrameInfoArray(direction:Direction, action:CharacterAction):Array<CharacterFrameInfo>{
		if (this.allActions && this.allActions[action]) return this.allActions[action][direction]; 
		return null;
	}

	/**
	 * 获得某个方向的某个动作需要的帧数
	 * @param {Direction} direction 转向的方向
	 * @param {CharacterAction} action 角色动作
	 * @returns {number} 这个动作的帧数
	 */
	public GetActionFrameCount(direction:Direction, action:CharacterAction):number{
		let toAction = this.GetFrameInfoArray(direction, action);
		if (toAction != null){
			return toAction.length ;
		}

		return 0;
	}

	/**
	 * 从Json数据生成
	 * @param {Object} data json文件中对应的一条数据
	 */
	public FromJson(data:Object){
		this.key = data["key"]

		this.toPreloadHeadImage = new Array<string>();
		this.toPreloadBodyImage = new Array<string>();
		this.toPreloadEmoteImage = new Array<string>();

		this.allActions = new Array<Array<Array<CharacterFrameInfo>>>();

		let keys = [
			"stand", "stand_trick", "walk", "ordering", "eat", "chew", "think", "discover",
			"nod", "clap", "spicy", "takephoto", "salty", "sigh", "smile", "hate"
		];
		/**
		 * Stand = 0,
			StandTrick = 1,
			Walk = 2,
			Order = 3,
			Eat = 4,
			Chew = 5,
			Think = 6,
			Discover = 7,
			Nod = 8,
			Clap = 9,
			Spicy = 10,
			TakePhoto = 11,
			Salty = 12,
			Sigh = 13,
			Smile = 14,
			Hate = 15
		 */


		if (data["empty_height"]){
			let eh = data["empty_height"];
			if (eh["head_upper"]) this.head_upper = eh["head_upper"];
			if (eh["head_lower"]) this.head_lower = eh["head_lower"];
			if (eh["body_upper"]) this.body_upper = eh["body_upper"];
			if (eh["body_lower"]) this.body_lower = eh["body_lower"];
		}

		this.eatIngredientPos = new Array<egret.Point>();
		if (data["ingredient_pos"]){
			let ipd = data["ingredient_pos"];
			for (let i = 0; i < ipd.length; i++){
				this.eatIngredientPos.push(new egret.Point(
					ipd[i]["x"] ? ipd[i]["x"] : 0,
					ipd[i]["y"] ? ipd[i]["y"] : 0
				));
			}
		}

		for (let i = 0; i < keys.length; i++){
			let k:string = keys[i];
			let thisArr:Array<Array<CharacterFrameInfo>> = new Array<Array<CharacterFrameInfo>>();
			if (data[k]){
				let aKey = data[k]["key"];
				let subkeys = ["up","down","left","left"];	//多读一个left当做right
				for (let n = 0; n < subkeys.length; n++){
					let thisVal = new Array<CharacterFrameInfo>();
					let sk = subkeys[n];
					if (data[k][sk]){
						let dKey:string = data[k][sk]["dir"];
						let aHead:Array<number> = data[k][sk]["head"] ? data[k][sk]["head"] : new Array<number>();
						let aBody:Array<number> = data[k][sk]["body"] ? data[k][sk]["body"] : new Array<number>();
						let aEmote:Array<number> = data[k][sk]["emote"] ? data[k][sk]["emote"] : new Array<number>();
						let lLen = Math.max(aHead.length, aBody.length, aEmote.length);
						for (let z = 0; z < lLen; z++){
							let hf:string = "";
							let bf:string = "";
							let ef:string = "";
							if (z < aHead.length) hf = this.key + "_" + aKey + "_" + dKey + "_head_" + aHead[z].toString();
							if (z < aBody.length) bf = this.key + "_" + aKey + "_" + dKey + "_body_" + aBody[z].toString();
							if (z < aEmote.length) ef = this.key + "_" + aKey + "_" + dKey + "_emote_" + aEmote[z].toString();

							thisVal.push(
								new CharacterFrameInfo(hf, bf, ef)
							);
							if (hf != "" && this.toPreloadHeadImage.indexOf(hf) < 0) this.toPreloadHeadImage.push(hf);
							if (bf != "" && this.toPreloadBodyImage.indexOf(bf) < 0) this.toPreloadBodyImage.push(bf);
							if (ef != "" && this.toPreloadEmoteImage.indexOf(ef) < 0) this.toPreloadBodyImage.push(ef);
						}
					}
					thisArr.push(thisVal);
				}
			}
			this.allActions.push(thisArr);
		}
	}
}
