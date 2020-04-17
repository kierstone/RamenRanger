//AI脚本的每一条信息
class CharacterAIScript {
	public doMove:boolean = false;	//加个锁，doMove是false就不移动
	public moveToX:number;	//移动到场地上的坐标(像素级别)
	public moveToY:number;	

	public changeDirection:boolean = false;	//是否要转换面向，在第0个tick就会转换
	public directionTo:Direction;	//转换为哪个面向

	public doAction:CharacterAction = CharacterAction.Stand;	//在这个阶段用什么样的动作

	public inTick:number;		//在多少帧内完成，如果是-1代表依赖于动作完成一次

	public constructor(
		doMove:boolean, moveToX:number, moveToY:number,
		changeDirection:boolean, directionTo:Direction,
		doAction:CharacterAction,
		inTick:number
	) {
		this.doMove = doMove;
		this.moveToX = moveToX;
		this.moveToY = moveToY;
		this.changeDirection = changeDirection;
		this.directionTo = directionTo;
		this.doAction = doAction;
		this.inTick = inTick;
	}

	public SetMoveTarget(moveToX:number, moveToY:number, inTick:number = 0){
		this.moveToX = moveToX;
		this.moveToY = moveToY;
		this.doMove = true;
		this.inTick = inTick;
	}

	public Clone():CharacterAIScript{
		return new CharacterAIScript(
			this.doMove, this.moveToX, this.moveToY,
			this.changeDirection, this.directionTo,
			this.doAction, this.inTick
		)
	}
}