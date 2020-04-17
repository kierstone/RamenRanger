class DiningChair extends eui.Component implements  eui.UIComponent {
	private image:eui.Image;

	public model:DiningChairModel;
	public gridX:number;	//中心单元格x
	public gridY:number;	//中心单元格y
	public direction:Direction; //方向

	public connectTable:DiningTable;	//为了方便索引做一个耦合

	//TODO现在椅子都只有一格子宽度，今后扩展了再说
	//public canSitGrid:Array<GridPosition>;	//可以坐的格子

	public constructor(
		model:DiningChairModel,
		gridX:number, gridY:number, direction:Direction = Direction.Down
	) {
		super();
		
		this.gridX = gridX;
		this.gridY = gridY;
		this.direction = direction;
		this.model = model;
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
		this.Redraw();
	}

	public Redraw(){
		let info = this.model.direction[this.direction];
		if (info){
			this.image.source = RES.getRes(info.source);
			this.width = info.gridWidth * GridWidth;
			this.height = info.gridHeight * GridHeight;
		}
	}

	public ChangeDirection(dir:Direction){
		if (dir == this.direction) return;
		this.direction = dir;
		this.Redraw();
	}
}