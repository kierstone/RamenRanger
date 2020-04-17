//一个角色的动画信息文件
class CharacterActionInfo {
	public key:string;

	private stand:Array<Array<CharacterFrameInfo>>;
	private standtrick:Array<Array<CharacterFrameInfo>>;
	private walk:Array<Array<CharacterFrameInfo>>;

	public head_upper:number = 0;	//头往上有这么多像素约定空间
	public head_lower:number = 0;	//头往下有这么多像素空间
	public body_upper:number = 0;	//身体往上
	public body_lower:number = 0;

	public constructor() {

	}

	public GetFrameInfoArray(direction:Direction, action:CharacterAction):Array<CharacterFrameInfo>{
		switch (action){
			case CharacterAction.Stand: return this.stand[direction];
			case CharacterAction.StandTrick: return this.standtrick[direction];
			case CharacterAction.Walk: return this.walk[direction];
		}
		return null;
	}

	public FromJson(data:Object){
		this.key = data["key"]

		this.stand = new Array<Array<CharacterFrameInfo>>();
		this.standtrick = new Array<Array<CharacterFrameInfo>>();
		this.walk = new Array<Array<CharacterFrameInfo>>();

		let keys = ["stand", "stand_trick", "walk"];
		let arrs = [
			this.stand,
			this.standtrick,
			this.walk
		]

		if (data["empty_height"]){
			let eh = data["empty_height"];
			if (eh["head_upper"]) this.head_upper = eh["head_upper"];
			if (eh["head_lower"]) this.head_lower = eh["head_lower"];
			if (eh["body_upper"]) this.body_upper = eh["body_upper"];
			if (eh["body_lower"]) this.body_lower = eh["body_lower"];
		}

		for (let i = 0; i < keys.length; i++){
			let k:string = keys[i];
			if (data[k]){
				let subkeys = ["up","down","left","left"];	//多读一个left当做right
				for (let n = 0; n < subkeys.length; n++){
					let thisVal = new Array<CharacterFrameInfo>();
					let sk = subkeys[n];
					if (data[k][sk]){
						for (let z = 0; z < data[k][sk].length; z++){
							thisVal.push(
								new CharacterFrameInfo(data[k][sk][z]["head"], data[k][sk][z]["body"])
							);
						}
					}
					arrs[i].push(thisVal);
				}
			}

		}
	}
}
