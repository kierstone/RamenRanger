class CharacterObj {
	public body:SpriteClip;
	public head:SpriteClip;
	public emote:SpriteClip;

	//当前帧是否有食材对应贴图位置
	public hasIngredientPoint:boolean;
	public ingredientPoint:egret.Point;

	private playingActionInfo:Array<CharacterFrameInfo>;
	private doingAction:CharacterAction;
	private currentFrame:number = 0;
	
	private cInfo:CharacterActionInfo;
	private position:egret.Point;

	public property : CharacterProperty;
	
	public direction:Direction;

	public ai:CharacterAI;
	public isSitting:boolean = false;	//如果sitting了，那么就不会执行ai了

	public constructor(characterActionInfo:CharacterActionInfo, x:number, y:number, property?:CharacterProperty) {
		this.cInfo = characterActionInfo;
		this.CreateSpriteClipByInfo();
		this.SetPosition(x, y);
		this.ingredientPoint = new egret.Point(0,0);
		this.hasIngredientPoint = false;

		//this.playingActionInfo = this.cInfo.GetFrameInfoArray(CharacterDirection.Down, CharacterAction.Stand);
		this.ChangeAction(Direction.Down, CharacterAction.Stand);

		this.property = property;

		this.ai = new CharacterAI(this);
	}

	private CreateSpriteClipByInfo(){
		this.body = new SpriteClip();
		this.head = new SpriteClip();

		//TODO 回头可以优化这个，从一个pool里面拿
		let bodyObj = {}
		for (let i = 0; i < this.cInfo.toPreloadBodyImage.length; i++){
			let k = this.cInfo.toPreloadBodyImage[i];
			bodyObj[k] = RES.getRes(k);
		}
		this.body.SetPreloadTexturesFromObject(bodyObj);

		let headObj = {}
		for (let i = 0; i < this.cInfo.toPreloadHeadImage.length; i++){
			let k = this.cInfo.toPreloadHeadImage[i];
			headObj[k] = RES.getRes(k);
		}
		this.head.SetPreloadTexturesFromObject(headObj);
	}

	/**
	 * 设置逻辑坐标
	 */
	public SetPosition(x:number, y:number){
		if (!this.position) this.position = new egret.Point(x, y);
		this.position.x = x;
		this.position.y = y;
		
		if (this.head){
			this.head.x = x;
			this.head.y = y;	
		}
		if (this.body){
			this.body.x = x;
			this.body.y = y;
		}
	}

	//设置图形到对应帧，以及改变他们的offset属性
	private SetImageFrame(frameIndex:number = this.currentFrame){
		this.currentFrame = frameIndex;
		let upperY : number = 0;
		if (!this.playingActionInfo || !this.position) return;
		if (this.body){
			this.body.ChangeToPreloadTexture(this.playingActionInfo[frameIndex].body);
			this.body.anchorOffsetX = Math.floor(this.body.width / 2)
			this.body.anchorOffsetY = this.body.height - this.cInfo.body_lower;
			this.body.scaleX = this.direction == Direction.Right ? -1 : 1;
			upperY = this.body.height - this.cInfo.body_upper - this.cInfo.body_lower;
		}
		if (this.head){
			this.head.ChangeToPreloadTexture(this.playingActionInfo[frameIndex].head);
			this.head.anchorOffsetX = Math.floor(this.head.width / 2);
			this.head.anchorOffsetY = this.head.height + upperY - this.cInfo.head_lower;
			this.head.scaleX = this.direction == Direction.Right ? -1 : 1;
		}
		if (this.doingAction == CharacterAction.Eat && this.currentFrame < this.cInfo.eatIngredientPos.length && this.head){
			this.hasIngredientPoint = true;
			this.ingredientPoint.x = -this.head.anchorOffsetX + this.cInfo.eatIngredientPos[this.currentFrame].x;
			this.ingredientPoint.y = -this.head.anchorOffsetY + this.cInfo.eatIngredientPos[this.currentFrame].y;

		}else{
			this.hasIngredientPoint = false;
		}
		this.SetPosition(this.position.x, this.position.y);
	}

	/**
	 * 更换动作和方向
	 */
	public ChangeAction(direction:Direction, action:CharacterAction, forceChange:boolean = false){
		let dontChange = (direction == this.direction && action == this.doingAction && forceChange == false)

		let toAction = this.cInfo.GetFrameInfoArray(direction, action);

		if (toAction != null){
			this.doingAction = action;
			this.direction = direction;
			this.playingActionInfo = toAction;
			if (dontChange == false) this.currentFrame = 0;

			this.SetImageFrame();
		}
	}

	/**
	 * 获得某个方向的某个动作需要的帧数
	 */
	public GetActionFrameCount(direction:Direction, action:CharacterAction):number{
		let toAction = this.cInfo.GetFrameInfoArray(direction, action);
		if (toAction != null){
			return toAction.length * RenderUpdateEveryLogicTick;	//动作长度其实依赖于渲染
		}

		return 0;
	}



	//返回是否达成一个loop了
	public Draw(incFrame:boolean = true):boolean{
		this.SetImageFrame();

		if (incFrame == true) {
			this.currentFrame = (this.currentFrame + 1) % this.playingActionInfo.length;
			return this.currentFrame == 0;
		}else{
			return false;
		}
	}
	/**
	 * 获得逻辑坐标{x:0,y:0}
	 */
	public GetPos():egret.Point{
		return this.position;
	}

	//TODO 特殊处理眨眼和站立，我曹
	private IsSameAction(a1:CharacterAction, a2:CharacterAction):boolean{
		if (
			(a1 == CharacterAction.Stand && a2 == CharacterAction.StandTrick) ||
			(a1 == CharacterAction.StandTrick && a2 == CharacterAction.Stand)
		) return true;

		return a1 == a2;
	}


	/**
	 * 逻辑update。返回是否需要立即渲染一下
	 */
	public FixedUpdate():boolean{
		let requireInstantDraw = false;

		//没坐着就得执行ai
		if (this.isSitting == false){
			let todo:CharacterAIScript = this.ai.WhatToDo();
			if (todo){
				//处理移动
				if (todo.doMove == true){
					this.SetPosition(todo.moveToX, todo.moveToY);
				}

				//动作和方向改变，引起改变
				let cD:boolean = todo.changeDirection;
				let cA:boolean = this.IsSameAction(todo.doAction, this.doingAction) == false;
				if (cD == true || cA == true){
					this.ChangeAction(
						cD == true ? todo.directionTo : this.direction,
						cA == true ? todo.doAction : this.doingAction
					);
					requireInstantDraw = true;
				}
			}
		}

		return requireInstantDraw;
	}

	/**
	 * 判断角色是否在做某个动作
	 * @param {CharacterAction} action 要判断的动作
	 * @returns {boolean} 是否是正在做的
	 */
	public IsDoingAction(action:CharacterAction):boolean{
		return action == this.doingAction;
	}


	
	/**
	 * 渲染update
	 */
	public Update(){
		//特殊处理站立的下一个动作
		if (this.Draw() == true && this.IsSameAction(this.doingAction, CharacterAction.Stand) == true){
			this.ChangeAction(
				this.direction, 
				(Math.random()<0.2 ? CharacterAction.StandTrick : CharacterAction.Stand),
				true
			);
		}
	}
}