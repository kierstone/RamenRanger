class Street extends eui.Component implements  eui.UIComponent {
	private gameLayer:eui.Group;

	private toUpdateTicker:number = 0;
	private tick:number = 0;
	private chaRefTicker:number = 0;

	private zOrderBase = 10000;	//在重新计算zOrder时，加上这个数字

	private mainCharacterZoneLeft:number;	//玩家角色移动最左侧x
	private mainCharacterZoneRight:number;	//玩家角色移动最右侧x
	private mainCharacterZoneFloor:number;	//玩家角色的地板位置y坐标

	private ground:StreetGround;
	private sprites:Array<any>;	//所有sprite层图片

	private advBoardGridX:number;
	private advBoardGridY:number;
	private advBoardWidth:number;

	private characters:Array<CharacterObj>;	//所有角色
	private trafficLights:Array<TrafficLight>;	//红绿灯
	private diningTables:Array<DiningTable>;	//餐桌
	private diningChairs:Array<DiningChair>;		//椅子
	private fixedImage:Array<eui.Image>;		//一些固定的场景图片等资源
	private busImage:Array<eui.Image>;		//小车相关的图形
	private mainCharacter:CharacterObj;		//主角

	private cityJsonFileName:string;
	
	private gridCanPass:Array<Array<boolean>>;	//地图单元格可过性，并不强硬，只是AI不一定会走进去

	public constructor(startTick:number = 0, cityJson:string = "city_shanghai_json") {
		super();
		this.cityJsonFileName = cityJson;
		this.tick = startTick;
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
		//初始化数组
		this.sprites = new Array<any>();
		this.characters = new Array<CharacterObj>();
		this.diningTables = new Array<DiningTable>();
		this.diningChairs = new Array<DiningChair>();
		this.trafficLights = new Array<TrafficLight>();

		//获得json配置
		let jsonF = RES.getRes(this.cityJsonFileName);

		//先加载ground，顺便的，把一些读取json的麻烦丢给ground
		this.ground = new StreetGround(jsonF);
		this.ground.x = 0;
		this.ground.y = 0;
		this.gameLayer.addChild(this.ground);

		this.PaintFixedTerrainByJson(jsonF);

		//小车可以先添加
		this.PlaceBusAndMainCharacter("bus_default_json");

		//开始添加精灵层的固定原件，比如桌子、花坛、椅子等
		//TODO 桌子椅子应该来自文件，而不是写死的
		let putTableHere = [
			{x:1, y:2},{x:3, y:2},{x:5, y:2},{x:7, y:2},
			{x:2, y:5},{x:4, y:5},{x:6, y:5},{x:8, y:5}
		]
		for (let i = 0; i < putTableHere.length; i++){
			let putInfo = putTableHere[i];
			let gX = putInfo["x"];
			let gY = putInfo["y"];
			let slot = i < 4 ? 
				new DiningTableSeatSlot(
					0,0,38,55,0,-1,Direction.Down,1,0,Direction.Left
				):
				new DiningTableSeatSlot(
					0,0,38,55,0,-1,Direction.Down,-1,0,Direction.Right
				)
			this.PlaceTable(
				new DiningTableModel(1,1,"wooden_single_table", [slot]),gX, gY
			)
			let lc = this.PlaceChair(
				new DiningChairModel(
					new DiningChairDirectionInfo("wooden_chair", 1, 1)
				), gX, gY - 1, Direction.Down
			)
			console.log("chair", i ,lc);
		}

		//红绿灯
		this.PlaceTrafficLight(0, GameMapHeight + this.ground.roadHeightInGrid - 1);

		//测试角色
		this.PlaceDebugCharacter();




		//开启一个update和fixedUpdate的计时器
		let t = new egret.Timer(30);
		t.addEventListener(egret.TimerEvent.TIMER, ()=>{
			this.FixedUpdate();
			if (this.toUpdateTicker == 0) this.Update();
			
			this.RearrangeSpritesZOrder();	//ZOrder每个逻辑tick都会重新排列，所以FixedUpdate中可以不用
			
			this.tick += 1;
			this.toUpdateTicker = (this.toUpdateTicker + 1) % 3;
		}, this);
		t.start();
	}

	//用于动画刷新的Update
	private Update(){
		//精灵层update
		for (let i = 0; i < this.sprites.length; i++){
			let sg = this.sprites[i];
			if (sg.Update){
				sg.Update();
			}
		}
		//红绿灯绘制
		for (let i = 0; i < this.trafficLights.length; i++){
			let tl = this.trafficLights[i];
			tl.Draw();
		}
	}

	//用于逻辑刷新的Update
	private FixedUpdate(){
		//精灵层总体逻辑
		for (let i = 0; i < this.sprites.length; i++){
			let sg = this.sprites[i];
			if (sg.FixedUpdate){
				if (sg.FixedUpdate() === true){
					if (sg.Update) sg.Update();
				};
			}
		}
		//红绿灯换色
		let trafficLightState:Object = this.GetTrafficLightState();
		for (let i = 0; i < this.trafficLights.length; i++){
			let tl:TrafficLight = this.trafficLights[i];
			tl.LightOn(trafficLightState["light"]);
		}
		//刷角色
		if  (this.chaRefTicker <= 0){
			if (this.characters.length < 80){
				this.RandomGatherNPC();
			}
			this.chaRefTicker = Math.floor(Math.random() * 8) + 22;
		}else{
			this.chaRefTicker --;
		}
	}
	
	//重新排序zOrder
	private RearrangeSpritesZOrder(){
		if (!this.sprites || this.sprites.length <= 0) return;
		this.sprites.sort((a:any, b:any)=>{
			//角色坐标要特殊处理，读取setToY
			let acY = (a.setToY!=null && a.setToY!=undefined) ? a.setToY : (a.y + a.height);
			let bcY = (b.setToY!=null && b.setToY!=undefined) ? b.setToY : (b.y + b.height);
			return (acY < bcY)?-1:1;
		});
		for (let i = 0; i < this.sprites.length; i++){
			let ts:eui.UIComponent = this.sprites[i];
			ts.zIndex = i + this.zOrderBase;
		}

		this.gameLayer.sortChildren();
	}


	//根据json信息放置地面层元素和精灵层元素
	private PaintFixedTerrainByJson(json:any){
		//初始化地图
		this.gridCanPass = new Array<Array<boolean>>();
		for (let i = 0; i < GameMapWidth; i++){
			let thisLine = new Array<boolean>();
			for (let j = 0; j < GameMapHeight + this.ground.roadHeightInGrid; j++){
				thisLine.push(true);
			}
			this.gridCanPass.push(thisLine);
		}

		//对应的数组初始化
		if (this.fixedImage){
			for (let i = 0; i < this.fixedImage.length; i++){
				if (this.fixedImage[i] && this.fixedImage[i].parent) 
					this.fixedImage[i].parent.removeChild(this.fixedImage[i]);
			}
		}
		this.fixedImage = new Array<eui.Image>();

		//地面层
		let fg = json["fixed_grounds"]
		if (fg){
			for (let i = 0; i < fg.length; i++){
				let fi:Object = fg[i];
				let gX:number = fi["x"];
				let gY:number = fi["y"];
				let img:eui.Image = new eui.Image();
				img.texture = RES.getRes(fi["img"]);
				img.width = Math.ceil(img.width + 1);
				img.height = Math.ceil(img.height + 1);
				img.fillMode = egret.BitmapFillMode.SCALE;
				let iPos = this.GetPixelPosByGridPos(gX, gY);
				img.x = iPos["x"];
				img.y = iPos["y"];

				if (!fi["canPass"]){
					this.gridCanPass[gX][gY] = false;
				}
				
				this.gameLayer.addChild(img);
				this.fixedImage.push(img);
			}
		}

		//精灵层
		let fs = json["fixed_sprites"]
		if (fs){
			for (let i = 0; i < fs.length; i++){
				let fi:Object = fs[i];
				let gX:number = fi["x"];
				let gY:number = fi["y"];
				let img:eui.Image = new eui.Image();
				img.texture = RES.getRes(fi["img"]);
				img.width = Math.ceil(img.width + 1);
				img.height = Math.ceil(img.height + 1);
				img.fillMode = egret.BitmapFillMode.SCALE;
				let iPos = this.GetPixelPosByGridPos(gX, gY);
				img.x = iPos["x"];
				img.y = iPos["y"];

				if (!fi["canPass"]){
					this.gridCanPass[gX][gY] = false;
				}
				
				this.gameLayer.addChild(img);
				this.sprites.push(img);
				this.fixedImage.push(img);
			}
		}

		//广告牌
		let adb = json["advboard"]
		if (adb){
			this.advBoardGridX = adb["x"];
			this.advBoardGridY = adb["y"];
			this.advBoardWidth = adb["width"] ? adb["width"] : 2;
		}
	}

	//把汽车和主角放上去
	private PlaceBusAndMainCharacter(busJsonFileName:string){
		let bJsonF = RES.getRes(busJsonFileName);
		let bJson = bJsonF["data"];

		//初始化
		if (this.busImage){
			for (let i = 0; i < this.busImage.length; i++){
				if (this.busImage[i] && this.busImage[i].parent){
					this.busImage[i].parent.removeChild(this.busImage[i]);
				}
			}
		}
		this.busImage = new Array<eui.Image>();
		if (this.mainCharacter && this.mainCharacter.parent){
			this.mainCharacter.parent.removeChild(this.mainCharacter);
		}

		//读取数据
		if (bJson){
			//共用参数
			let busPos = this.GetPixelPosByGridPos(BusLeftInGrid, BusBottomInGrid);
			let busSX = busPos["x"]
			let busSY = busPos["y"] - BusAreaHeight + GridHeight;

			//最先绘制body
			let bodyInfo = bJson["body"];
			if (bodyInfo){
				let img:eui.Image = new eui.Image();
				img.texture = RES.getRes(bodyInfo["img"]);
				let offX = bodyInfo["offsetX"] ? bodyInfo["offsetX"] : 0;
				let offY = bodyInfo["offsetY"] ? bodyInfo["offsetY"] : 0;
				img.x = busSX + offX;
				img.y = busSY + offY;

				this.gameLayer.addChild(img);
				this.busImage.push(img);

				this.mainCharacterZoneFloor = busSY + (bodyInfo["characterAreaOffsetY"] ? bodyInfo["characterAreaOffsetY"] : 0);
				this.mainCharacterZoneLeft = busSX + (bodyInfo["characterAreaOffsetX"] ? bodyInfo["characterAreaOffsetX"] : 0);
				this.mainCharacterZoneRight = 
					this.mainCharacterZoneLeft + (bodyInfo["characterAreaWidth"] ? bodyInfo["characterAreaWidth"] : 0);
			}

			//然后绘制主角(TODO 写死了现在，今后要传递)
			let mcX = (this.mainCharacterZoneRight - this.mainCharacterZoneLeft) / 2 + this.mainCharacterZoneLeft;
			this.mainCharacter = new CharacterObj(
				GetCharacterActionInfoByKey("schoolgirl"), mcX, this.mainCharacterZoneFloor
			);
			this.gameLayer.addChild(this.mainCharacter);

			//接下来绘制车顶
			let topInfo = bJson["top"];
			let topImg:eui.Image;
			let topAnchorX = 0;
			let topAnchorY = 0;
			if (topInfo){
				topImg = new eui.Image();
				topImg.texture = RES.getRes(topInfo["img"]);
				//这个坐标是要最后修的
				this.gameLayer.addChild(topImg);
				this.busImage.push(topImg);

				topAnchorX = topInfo["offsetX"] ? topInfo["offsetX"] : 0;
				topAnchorY = topInfo["offsetY"] ? topInfo["offsetY"] : 0;
			}

			//最后是车喷漆
			let paintInfo = bJson["paint"]
			if (paintInfo){
				let img:eui.Image = new eui.Image();
				img.texture = RES.getRes(paintInfo["img"]);
				let offX = paintInfo["offsetX"] ? paintInfo["offsetX"] : 0;
				let offY = paintInfo["offsetY"] ? paintInfo["offsetY"] : 0;
				img.x = busSX + offX;
				img.y = busSY + offY;

				this.gameLayer.addChild(img);
				this.busImage.push(img);

				//车顶装潢位置
				topImg.x = busSX + (paintInfo["topCenterX"] ? paintInfo["topCenterX"] : 0) - topAnchorX;
				topImg.y = busSY + (paintInfo["topCenterY"] ? paintInfo["topCenterY"] : 0) - topAnchorY;

				//其他装潢
				let oInfo = paintInfo["addon"]
				if (oInfo){
					for (let i = 0; i < oInfo.length; i++){
						let thisAddonInfo = oInfo[i];
						let imgName = thisAddonInfo["img"];
						let imgOffX = thisAddonInfo["offsetX"] ? thisAddonInfo["offsetX"] : 0;
						let imgOffY = thisAddonInfo["offsetY"] ? thisAddonInfo["offsetY"] : 0;
						let addonImg = new eui.Image();
						addonImg.texture = RES.getRes(imgName);
						addonImg.x = busSX + imgOffX;
						addonImg.y = busSY + imgOffY;
						this.gameLayer.addChild(addonImg);
						this.busImage.push(addonImg);
					}
				}
			}
		}
	}



	//放一张桌子，这里可不管能不能放的下，只管放上去的
	private PlaceTable(table:DiningTableModel, gridX:number, gridY:number){
		let t:DiningTable = new DiningTable(table, gridX, gridY);
		let tPos = this.GetPixelPosByGridPos(gridX, gridY);
		t.x = tPos["x"];
		t.y = tPos["y"];
		this.gameLayer.addChild(t);
		this.sprites.push(t);
		this.diningTables.push(t);

		for (let i = 0; i < table.widthInGrid; i++){
			for (let j = 0; j < table.heightInGrid; j++){
				this.gridCanPass[gridX + i][gridY + j] = false;
			}
		}

		if (this.diningChairs && this.diningChairs.length > 0){
			for (let i = 0; i < this.diningChairs.length; i++){
				let c = this.diningChairs[i];
				if (c.connectTable == null){
					//不能连接上一个椅子就return，因为一个桌子可以连接多个椅子
					t.TryConnectChair(c);	
				}
			}
		}
	}

	//放一张椅子，也是只负责放下去，不负责判断能不能放，返回连接到那个桌子了
	private PlaceChair(chair:DiningChairModel, gridX:number, gridY:number, dir:Direction):DiningTable{
		let c = new DiningChair(chair, gridX, gridY, dir);
		let cPos = this.GetPixelPosByGridPos(gridX, gridY);
		c.x = cPos["x"];
		c.y = cPos["y"];
		this.gameLayer.addChild(c);
		this.sprites.push(c);
		this.diningChairs.push(c);

		let res = null;
		for (let i = 0; i < this.diningTables.length; i++){
			if (this.diningTables[i].TryConnectChair(c) == true){
				res = this.diningTables[i];	//连接上了就结束了
				break;
			}
		}
		if (res){
			let cInfo = chair.direction[c.direction];
			for (let i = 0; i < cInfo.gridWidth; i++){
				for (let j = 0; j < cInfo.gridHeight; j++){
					this.gridCanPass[gridX + i][gridY + j] = false;
				}
			}
		}
		return res;
	}

	//放红绿灯
	private PlaceTrafficLight(gridX:number, gridY:number){
		let tl:TrafficLight = new TrafficLight();
		let tPos = this.GetPixelPosByGridPos(gridX, gridY);
		tl.x = tPos["x"];
		tl.y = tPos["y"] + tl.OffsetY();
		this.gameLayer.addChild(tl);
		this.sprites.push(tl);
		this.trafficLights.push(tl);
		tl.LightOn(this.GetTrafficLightState()["light"]);
		tl.Draw();
	}

	//放一个角色，这里的x,y都是像素级
	private PlaceCharacter(key:string = "schoolgirl",x:number, y:number):CharacterObj{
		let cha = new CharacterObj(
			GetCharacterActionInfoByKey(key), 
			x, y,
			new CharacterProperty()
		)
		this.gameLayer.addChild(cha);
		this.sprites.push(cha);
		return cha;
	}

	//TODO 随机产生一个npc
	private RandomGatherNPC(){
		let sLocation = [
			{x:-3, y:Math.floor(Math.random()*this.ground.roadHeightInGrid - 2) + GameMapHeight + 3},
			{x:GameMapWidth + 3, y:Math.floor(Math.random()*this.ground.roadHeightInGrid - 2) + GameMapHeight + 3},
			{x:Math.floor(Math.random() * 3), y: GameMapHeight + this.ground.roadHeightInGrid + 5}
		]
		let slIndex = Math.floor(Math.random()*sLocation.length);
		let slRes = sLocation[slIndex];

		let slPos = this.GetPixelPosByGridPos(slRes["x"], slRes["y"], true);
		let startX = slPos["x"]
		let startY = slPos["y"] - Math.floor(Math.random()*GridHeight / 2);

		let chaKeyMay = ["schoolgirl"];
		let chaKey = chaKeyMay[Math.floor(Math.random() * chaKeyMay.length)];

		let cha = this.PlaceCharacter(chaKey, startX, startY);
		cha.property.speed = Math.floor(Math.random()*3) + 4;

		let aiScr = [
			AIScripts.JustPassThroughFromRoad(cha, (GameMapWidth + 3) * GridWidth),
			AIScripts.JustPassThroughFromRoad(cha, -3 * GridWidth),
			AIScripts.JustPassThroughFromTrafficLight(this, cha)
		]
		cha.ai.SetScripts(aiScr[slIndex]);
	}

	//测试用的角色
	private PlaceDebugCharacter(){
		let pos = this.GetPixelPosByGridPos(2,0,true);
		let cha = this.PlaceCharacter("schoolgirl", pos["x"], pos["y"]);
		cha.property.speed = Math.floor(Math.random()*3) + 4;
		cha.ai.SetScripts(AIScripts.DebugWalkForDirection(cha));
		for (let i = 0; i < 10; i++){
			cha.ai.AddScripts(AIScripts.DebugWalkForDirection(cha));
		}

		let cha1 = this.PlaceCharacter("schoolgirl", pos["x"] + 150, pos["y"] + 75);
		cha1.property.speed = Math.floor(Math.random()*3) + 4;
		cha1.ai.SetScripts(AIScripts.DebugStandTrickForDirection(cha));
		for (let i = 0; i < 10; i++){
			cha1.ai.AddScripts(AIScripts.DebugStandTrickForDirection(cha));
		}
	}




	/**
	 * 根据单元格坐标，获得在gameLayer上的坐标
	 * @param {number} gridX 单元格坐标x
	 * @param {number} gridY 单元格坐标y
	 * @param {boolean} forCharacter 这个坐标是不是为角色准备的
	 * @returns 返回坐标{x:number, y:number};
	 */
	public GetPixelPosByGridPos(gridX:number, gridY:number, forCharacter:boolean = false):Object{
		let res = {x:-1, y:-1}
		if (!this.ground) return res;
		res["x"] = gridX * GridWidth + (forCharacter == true ? GridWidth/2 : 0);
		res["y"] = gridY * GridHeight + this.ground.groundTop + (forCharacter == true ? (GridHeight - 10): 0);
		return res;
	}

	/**
	 * 根据tick获得红绿灯的状态
	 * @returns {Object} ["light":TrafficLightState, "toGreen":距离绿灯的tick数]
	 */
	public GetTrafficLightState():Object{
		let greenTick = 150;
		let gShineTick = 30;
		let yellowTick = 30;
		let redTick = 150;
		let totalTick = greenTick + gShineTick + yellowTick + redTick;
		let cTick = this.tick % totalTick;
		let tls:TrafficLightState = TrafficLightState.Red;
		let toGreen = 0;
		if (cTick < greenTick){
			tls = TrafficLightState.Green
		}
		else if (cTick < greenTick + gShineTick){
			tls = TrafficLightState.GreenShine
			toGreen = totalTick - cTick;
		} 
		else if (cTick < greenTick + gShineTick + yellowTick){
			tls = TrafficLightState.Yellow
			toGreen = totalTick - cTick;
		}else{
			toGreen = totalTick - cTick;
		}
		
		return {
			"light":tls,
			"toGreen":toGreen
		}
	}
}