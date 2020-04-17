//桌子上的位置信息
class DiningTableSeatSlot {
	//这是桌子的什么位置
	public tableX:number;
	public tableY:number;

	//拉面的下方中央点应该位于整个桌子的坐标（像素）
	public ramenOffsetX:number;
	public ramenOffsetY:number;

	//座位信息
	public seatOffsetX:number;
	public seatOffsetY:number;
	public seatDirection:Direction; //决定坐在上面的角色的角度

	//服务生信息：服务员站在什么位置上菜，当然客人也是在这里跳进座位的
	public maidOffsetX:number;
	public maidOffsetY:number;
	public maidDirection:Direction;

	public constructor(
		tableX:number, tableY:number,
		ramenX:number, ramenY:number,
		seatOffsetX:number, seatOffsetY:number, seatDirection:Direction,
		maidOffsetX:number, maidOffsetY:number, maidDirection:Direction
	) {
		this.tableX = tableX;
		this.tableY = tableY;

		this.ramenOffsetX = ramenX;
		this.ramenOffsetY = ramenY;

		this.seatOffsetX = seatOffsetX;
		this.seatOffsetY = seatOffsetY;
		this.seatDirection = seatDirection;

		this.maidOffsetX = maidOffsetX;
		this.maidOffsetY = maidOffsetY;
		this.maidDirection = maidDirection;
	}

	public Clone():DiningTableSeatSlot{
		let res = new DiningTableSeatSlot(
			this.tableX,
			this.tableY,
			this.ramenOffsetX,
			this.ramenOffsetY,
			this.seatOffsetX,
			this.seatOffsetY,
			this.seatDirection,
			this.maidOffsetX,
			this.maidOffsetY,
			this.maidDirection
		);

		return res;
	}
}