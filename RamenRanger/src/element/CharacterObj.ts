class CharacterObj extends eui.Component implements  eui.UIComponent {
	private head : eui.Image;
	private body : eui.Image;

	// public static Pixel_CharacterHeadTop:number = 0;
	// public static Pixel_CharacterHeadBottom:number = 0;
	// public static Pixel_CharacterBodyTop:number = 10;
	// public static Pixel_CharacterBodyBottom:number = 0;

	private playingActionInfo:Array<CharacterFrameInfo>;
	private doingAction:CharacterAction;
	private currentFrame:number = 0;
	
	private cInfo:CharacterActionInfo;
	private posOffX:number = 0;  //图形偏移
	private posOffY:number = 0;
	public setToX:number = 0;	//设置到的逻辑世界的坐标
	public setToY:number = 0;

	public property : CharacterProperty;
	
	public direction:Direction;

	public ai:CharacterAI;

	public constructor(characterActionInfo:CharacterActionInfo, x:number, y:number, property?:CharacterProperty) {
		super();
		this.cInfo = characterActionInfo;
		this.setToX = x;
		this.setToY = y;

		//this.playingActionInfo = this.cInfo.GetFrameInfoArray(CharacterDirection.Down, CharacterAction.Stand);
		this.ChangeAction(Direction.Down, CharacterAction.Stand);

		this.property = property;

		this.ai = new CharacterAI(this);
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.init();
	}
	
	private init(){
		this.Draw();
	}

	//更换动作和方向
	public ChangeAction(direction:Direction, action:CharacterAction, forceChange:boolean = false){
		if (direction == this.direction && action == this.doingAction && forceChange == false){
			return;
		}

		let toAction = this.cInfo.GetFrameInfoArray(direction, action);

		if (toAction != null){
			this.doingAction = action;
			this.direction = direction;
			this.playingActionInfo = toAction;
			this.currentFrame = 0;

			this.scaleX = direction == Direction.Right?-1:1;
			this.SetPos(this.setToX, this.setToY);
		}
	}

	//返回是否达成一个loop了
	public Draw(incFrame:boolean = true):boolean{
		this.head.texture = RES.getRes(this.cInfo.key + "_" + this.playingActionInfo[this.currentFrame].head);
		this.body.texture = RES.getRes(this.cInfo.key + "_"  + this.playingActionInfo[this.currentFrame].body);

		this.head.x = (this.width - this.head.width)/2;
		this.head.y = 0;
		this.body.x = (this.width - this.body.width)/2; 
		this.body.y = this.head.height - this.cInfo.head_lower - this.cInfo.body_upper;
		this.posOffX = this.width / 2;
		this.posOffY = this.body.y + this.body.height - this.cInfo.body_lower;

		this.SetPos(this.setToX, this.setToY);

		if (incFrame == true) {
			this.currentFrame = (this.currentFrame + 1) % this.playingActionInfo.length;
			return this.currentFrame == 0;
		}else{
			return false;
		}
	}

	/**
	 * 通过这个来设置x,y，这样才能对准位置
	 */
	public SetPos(x:number, y:number){
		this.setToX = x;
		this.setToY = y;
		this.x = x - this.posOffX + (this.direction == Direction.Right?this.width:0)
		this.y = y - this.posOffY
	}

	/**
	 * 获得逻辑坐标{x:0,y:0}
	 */
	public GetPos():Object{
		return {
			x:this.setToX,
			y:this.setToY
		}
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
		let todo:CharacterAIScript = this.ai.WhatToDo();

		let requireInstantDraw = false;
		if (todo){
			//处理移动
			if (todo.doMove == true){
				this.SetPos(todo.moveToX, todo.moveToY);
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
		

		return requireInstantDraw;
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