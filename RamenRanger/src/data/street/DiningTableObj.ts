class DiningTableObj {
	public Image:SpriteClip;

	private position:egret.Point;

	private seat:Array<DiningTableSeatInfo>;
	private model:DiningTableModel;

	public constructor(
		tableModel:DiningTableModel, x:number, y:number
	) {
		this.model = tableModel.Clone();
		this.seat = new Array<DiningTableSeatInfo>();
		this.position = new egret.Point(x, y);
		this.Redraw();
	}
	
	private Redraw(){
		if (!this.Image) this.Image = new SpriteClip();
		this.Image.texture = RES.getRes(this.model.source);
		this.Image.anchorOffsetX = Math.round(this.Image.width / 2);
		this.Image.anchorOffsetY = this.Image.height;
		this.Image.x = this.position.x;
		this.Image.y = this.position.y;
	}

	/**
	 * 有些单元格允许有多个slot，比如1x1的桌子，4面都可以放椅子，所以应该对应4个slot
	 * 但是最终被用到的只能是1个info，所以可以先通过这个函数看看这个单元格对应的info是否已经存在
	 * @param {number} gridX 要查询的单元格x，位于桌上的单元格
	 * @param {number} gridY 要查询的单元格y，位于桌上的单元格
	 * @returns {DiningTableSeatInfo} 被使用的单元格，如果是null，代表还没椅子对应这个位置
	 */
	public GetSeatInfo(gridX:number, gridY:number):DiningTableSeatInfo{
		for (let i = 0; i < this.seat.length; i++){
			if (
				this.seat[i].seatSlot.tableX == gridX && this.seat[i].seatSlot.tableY == gridY){
				return this.seat[i];
			}
		}
		return null;
	}

	/**
	 * 有些单元格允许有多个slot，比如1x1的桌子，4面都可以放椅子，所以应该对应4个slot
	 * 所以这里返回的是一个数组，是对应这个坐标所有的slot的数据，如果长度为0，代表没有slot
	 * @param {number} gridX 要查询的单元格x，位于桌上的单元格
	 * @param {number} gridY 要查询的单元格y，位于桌上的单元格
	 * @returns {Array<DiningTableSeatInfo>} 被使用的单元格，如果是null，代表还没椅子对应这个位置
	 */
	public GetSeatSlot(gridX:number, gridY:number):Array<DiningTableSeatSlot>{
		let res:Array<DiningTableSeatSlot> = new Array<DiningTableSeatSlot>();

		for (let i  = 0; i < this.model.seats.length; i++){
			let si = this.model.seats[i];
			if (si.tableX == gridX && si.tableY == gridY){
				res.push(this.model.seats[i]);
			}
		}

		return res;
	}

}