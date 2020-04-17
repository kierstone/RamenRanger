class DiningTable extends eui.Component implements  eui.UIComponent {
	private Image:eui.Image;

	public gridX:number;	//单元格坐标
	public gridY:number;
	public gridWidth:number;	//单元格宽度
	public gridHeight:number;	//单元格高度

	private seat:Array<DiningTableSeatInfo>;
	private model:DiningTableModel;

	public constructor(
		tableModel:DiningTableModel, gridX:number, gridY:number,
		gridWidth:number = 1, gridHeight : number = 1
	) {
		super();
		this.model = tableModel.Clone();
		this.seat = new Array<DiningTableSeatInfo>();
		this.gridX = gridX;
		this.gridY = gridY;
		this.gridWidth = gridWidth;
		this.gridHeight = gridHeight;
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

	/**
	 * 尝试把一个椅子加入到自己的关联(seat)中去，当然要判断椅子能否被加入了
	 * @param {DiningChair} chair 椅子对象
	 * @param {boolean} autoChangeDir 是否要自动变化椅子的朝向
	 * @returns {boolean} 最后有没有被加入关联
	 */
	public TryConnectChair(chair:DiningChair, autoChangeDir:boolean = true):boolean{
		if (!chair) return false;
		for (let i = 0; i < this.gridWidth; i++){
			for (let j = 0; j < this.gridHeight; j++){
				let sInfo:DiningTableSeatInfo = this.GetSeatInfo(i, j);
				if (sInfo != null && sInfo.chair != null) continue;	//这格已经关联别的椅子了

				let sSlot:Array<DiningTableSeatSlot> = this.GetSeatSlot(i, j);
				if (sSlot.length <= 0) continue;	//这格根本就不能关联椅子

				//从可sSlot里分析出一个可以关联这个椅子的可能性，如果有就关联，没有就继续
				for (let m = 0; m < sSlot.length; m++){
					let tInfo:DiningTableSeatSlot = sSlot[m];
					if (
						tInfo.seatOffsetX + this.gridX == chair.gridX && 
						tInfo.seatOffsetY + this.gridY == chair.gridY &&
						chair.model.direction[tInfo.seatDirection] != null
					){
						if( sInfo != null){
							sInfo.chair = chair;
						}else{
							let nsInfo = new DiningTableSeatInfo(tInfo);
							nsInfo.chair = chair;
							this.seat.push(nsInfo);
						}
						if (autoChangeDir == true) chair.ChangeDirection(tInfo.seatDirection);
						chair.connectTable = this;
						return true;
					}
				}
			}
		}
		return false;
	}
}