class TrafficLight extends eui.Component implements  eui.UIComponent {
	private seat:eui.Image;
	private red:eui.Image;
	private green:eui.Image;
	private yellow:eui.Image;

	private ticked:number = 0;
	private state : TrafficLightState;

	public constructor() {
		super();
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
		this.red.x =
		this.yellow.x =
		this.green.x = 
		this.seat.x = (this.width - this.seat.width) / 2;
		this.red.y =
		this.yellow.y =
		this.green.y = 
		this.seat.y = (this.height - this.seat.height) / 2;
	}

	public LightOn(state:TrafficLightState){
		if (state == this.state) return;
		this.state = state;
		this.ticked == 0;
	}

	public Draw(incFrame:boolean = true){
		let darkAlpha = 0.3;
		this.red.alpha = this.state == TrafficLightState.Red ? 1 : darkAlpha;
		this.yellow.alpha = this.state == TrafficLightState.Yellow ? 1 : darkAlpha;
		let cTick = Math.floor(this.ticked / 2);
		this.green.alpha = 
			(this.state == TrafficLightState.Green || 
			(this.state == TrafficLightState.GreenShine && (cTick % 2 == 0))) ? 
			1 : darkAlpha;

		if (incFrame == true) this.ticked += 1; 
	}

	/**
	 * 当根据单元格确定了红绿灯的位置以后，y坐标是要有一个偏移的，读这个
	 */
	public OffsetY():number{
		return -2.5 * GridHeight;// - this.seat.height;
	}
}