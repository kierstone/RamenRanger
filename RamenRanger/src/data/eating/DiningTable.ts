class DiningTableModel {
	public tableSource:string;
	public useScale9:boolean;
	public tableScale9:egret.Rectangle;
	public tableWidth:number;

	public seats:Array<DiningSeatInfo>;

	public constructor(tableSource:string, seats:Array<DiningSeatInfo>, tableWidth:number,tableScale9?:egret.Rectangle) {
		this.tableSource = tableSource;
		this.useScale9 = tableScale9 != null;
		this.tableScale9 = tableScale9;
		this.seats = seats;
		this.tableWidth = tableWidth;
	}
}

class DiningTableObj{
	public model:DiningTableModel;
	public x:number = 0;
	public y:number = 0;

	constructor(model:DiningTableModel){
		this.model = model;
	}
}

class DiningSeatInfo{
	public x:number;	//座位坐标偏移
	public y:number;
	public ramenX:number;	//拉面坐标偏移
	public ramenY:number;
	public source:string;

	constructor(source:string, x:number, y:number, ramenX:number, ramenY:number){
		this.source = source;
		this.x = x;
		this.y = y;
		this.ramenX = ramenX;
		this.ramenY = ramenY;
	}
}