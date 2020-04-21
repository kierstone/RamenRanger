class ChairModel {
	public name:string;
	public direction:Array<ChairDirImageInfo>;	//4个方向的资源，左边右边应该是一样的，Null代表没有这个方向

	public constructor(
		downInfo:ChairDirImageInfo, 
		upInfo:ChairDirImageInfo = null,
		leftInfo:ChairDirImageInfo = null,
		rightInfo:ChairDirImageInfo = null
	) {
		this.direction = [
			null,
			null,
			null,
			null
		]
		if (downInfo) this.direction[Direction.Down] = downInfo;
		if (upInfo) this.direction[Direction.Up] = upInfo;
		if (leftInfo) this.direction[Direction.Left] = leftInfo;
		if (leftInfo) this.direction[Direction.Right] = leftInfo;
	}

	public GetCurrentInfoByDirection(dir:Direction):ChairDirImageInfo{
		return this.direction[dir];
	}
}

class ChairDirImageInfo{
	public source:string;
	public gridWidth:number;
	public gridHeight:number;

	public constructor(source:string, gridWidth:number, gridHeight:number) {
		this.source = source;
		this.gridWidth = gridWidth;
		this.gridHeight = gridHeight;
	}
}