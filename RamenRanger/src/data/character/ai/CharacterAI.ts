class CharacterAI {
	public plan:Array<CharacterAIScript>;
	private totalTicked:number;	//这个用于总的计时
	private ticked:number;		//这个则是在当前动作的计时
	private master:CharacterObj;	//宿主

	public constructor(master:CharacterObj) {
		this.master = master;
		this.plan = new Array<CharacterAIScript>();
		this.totalTicked = 0;
		this.ticked = 0;
	}

	public AddScripts(scripts:Array<CharacterAIScript>){
		for(let i = 0; i < scripts.length; i++){
			this.plan.push(scripts[i].Clone());
		}
	}

	public SetScripts(scripts:Array<CharacterAIScript> = []){
		this.plan = new Array<CharacterAIScript>();
		for (let i = 0; i < scripts.length; i++){
			this.plan.push(scripts[i].Clone());
		}
	}

	//获得这一帧应该干啥
	public WhatToDo(tickInc:boolean = true):CharacterAIScript{
		if (!this.plan || this.plan.length <= 0 || !this.master) 
			return new CharacterAIScript(
				false, 0, 0, false, Direction.Down, CharacterAction.Stand, 1
			);

		let thisPlan:CharacterAIScript = this.plan[0];
		
		let cPos = this.master.GetPos();
		let toX:number = cPos["x"];
		let toY:number = cPos["y"];
		let moveDone = thisPlan.doMove == false;
		let needMove = thisPlan.doMove;
		if (thisPlan.doMove == true){
			let ms = this.master.property.speed;
			let cX = cPos["x"];
			let cY = cPos["y"];
			let tX = thisPlan.moveToX;
			let tY = thisPlan.moveToY;
			let xDone = false;
			let yDone = false;
			//x,y等速移动，所以产生AI的时候应该注意……
			if (Math.abs(tX - cX) <= ms){
				xDone = true;
				toX = tX;
			}else{
				toX = (tX < cX) ? (cX - ms) : (cX + ms);
			}
			if (Math.abs(tY - cY) <= ms){
				yDone = true;
				toY = tY;
			}else{
				toY = (tY < cY) ? (cY - ms) : (cY + ms);
			}
			if (xDone == true && yDone == true){
				moveDone = true;
			}
		}

		let needDir = this.ticked <= 0 && thisPlan.changeDirection == true
		let toDir:Direction = 
			 needDir == true ? thisPlan.directionTo : this.master.direction;

		let doAction:CharacterAction = thisPlan.doAction;

		if (tickInc == true){
			this.ticked += 1;
			this.totalTicked += 1;

			if (this.ticked >= thisPlan.inTick && moveDone == true){
				this.ticked = 0;
				this.plan.shift();
			}
		}

		return new CharacterAIScript(
			needMove, toX, toY, needDir, toDir, doAction, 1
		);
	}
}
