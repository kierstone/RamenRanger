class ChairObj {
	public image:SpriteClip;

	private position:egret.Point;
	public direction:Direction; //方向
	private img:string;

	private enteranceOffset:egret.Point
	public enterance:egret.Point; //进入座位的单元格

	public sittingCha:CharacterObj; //谁坐在这里，可能是没人

	//TODO现在椅子都只有一格子宽度，今后扩展了再说
	//public canSitGrid:Array<GridPosition>;	//可以坐的格子

	public constructor(
		img:string,
		x:number, y:number, direction:Direction = Direction.Down
	) {
		this.position = new egret.Point(x, y);
		this.enteranceOffset = new egret.Point(75, 0);//TODO 写死了坐进去的地方，但实际上应该读表
		this.direction = direction;
		this.img = img;
		this.sittingCha = null;
		this.Redraw();
	}

	/**
	 * 椅子需要被重绘的频率非常低
	 */
	public Redraw(){
		if (!this.image) this.image = new SpriteClip();
		this.image.texture = RES.getRes(this.img);
		this.image.anchorOffsetX = Math.round(this.image.width / 2);
		this.image.anchorOffsetY = this.image.height;
		this.SetPos(this.position.x, this.position.y);
		//TODO人坐进去以后的位移
	}

	public SetPos(x:number, y:number){
		if (!this.image){
			this.Redraw();
		}
		if (!this.position) {
			this.position = new egret.Point(x, y);
		}
		this.position.x = this.image.x = x;
		this.position.y = this.image.y = y;
		if (!this.enterance){
			this.enterance = new egret.Point(0,0);
		}
		this.enterance.x = this.position.x + this.enteranceOffset.x;
		this.enterance.y = this.position.y + this.enteranceOffset.y;
	}
}