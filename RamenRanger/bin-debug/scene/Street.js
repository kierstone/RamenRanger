var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Street = (function (_super) {
    __extends(Street, _super);
    function Street(startTick, cityJson) {
        if (startTick === void 0) { startTick = 0; }
        if (cityJson === void 0) { cityJson = "city_shanghai_json"; }
        var _this = _super.call(this) || this;
        _this.toUpdateTicker = 0;
        _this.tick = 0;
        _this.chaRefTicker = 0;
        _this.zOrderBase = 10000; //在重新计算zOrder时，加上这个数字
        _this.cityJsonFileName = cityJson;
        _this.tick = startTick;
        return _this;
    }
    Street.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Street.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    Street.prototype.init = function () {
        var _this = this;
        //初始化数组
        this.sprites = new Array();
        this.characters = new Array();
        this.diningTables = new Array();
        this.diningChairs = new Array();
        this.trafficLights = new Array();
        //获得json配置
        var jsonF = RES.getRes(this.cityJsonFileName);
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
        var putTableHere = [
            { x: 1, y: 2 }, { x: 3, y: 2 }, { x: 5, y: 2 }, { x: 7, y: 2 },
            { x: 2, y: 5 }, { x: 4, y: 5 }, { x: 6, y: 5 }, { x: 8, y: 5 }
        ];
        for (var i = 0; i < putTableHere.length; i++) {
            var putInfo = putTableHere[i];
            var gX = putInfo["x"];
            var gY = putInfo["y"];
            var slot = i < 4 ?
                new DiningTableSeatSlot(0, 0, 38, 55, 0, -1, Direction.Down, 1, 0, Direction.Left) :
                new DiningTableSeatSlot(0, 0, 38, 55, 0, -1, Direction.Down, -1, 0, Direction.Right);
            this.PlaceTable(new DiningTableModel(1, 1, "wooden_single_table", [slot]), gX, gY);
            var lc = this.PlaceChair(new DiningChairModel(new DiningChairDirectionInfo("wooden_chair", 1, 1)), gX, gY - 1, Direction.Down);
            console.log("chair", i, lc);
        }
        //红绿灯
        this.PlaceTrafficLight(0, GameMapHeight + this.ground.roadHeightInGrid - 1);
        //测试角色
        this.PlaceDebugCharacter();
        //开启一个update和fixedUpdate的计时器
        var t = new egret.Timer(30);
        t.addEventListener(egret.TimerEvent.TIMER, function () {
            _this.FixedUpdate();
            if (_this.toUpdateTicker == 0)
                _this.Update();
            _this.RearrangeSpritesZOrder(); //ZOrder每个逻辑tick都会重新排列，所以FixedUpdate中可以不用
            _this.tick += 1;
            _this.toUpdateTicker = (_this.toUpdateTicker + 1) % 3;
        }, this);
        t.start();
    };
    //用于动画刷新的Update
    Street.prototype.Update = function () {
        //精灵层update
        for (var i = 0; i < this.sprites.length; i++) {
            var sg = this.sprites[i];
            if (sg.Update) {
                sg.Update();
            }
        }
        //红绿灯绘制
        for (var i = 0; i < this.trafficLights.length; i++) {
            var tl = this.trafficLights[i];
            tl.Draw();
        }
    };
    //用于逻辑刷新的Update
    Street.prototype.FixedUpdate = function () {
        //精灵层总体逻辑
        for (var i = 0; i < this.sprites.length; i++) {
            var sg = this.sprites[i];
            if (sg.FixedUpdate) {
                if (sg.FixedUpdate() === true) {
                    if (sg.Update)
                        sg.Update();
                }
                ;
            }
        }
        //红绿灯换色
        var trafficLightState = this.GetTrafficLightState();
        for (var i = 0; i < this.trafficLights.length; i++) {
            var tl = this.trafficLights[i];
            tl.LightOn(trafficLightState["light"]);
        }
        //刷角色
        if (this.chaRefTicker <= 0) {
            if (this.characters.length < 80) {
                this.RandomGatherNPC();
            }
            this.chaRefTicker = Math.floor(Math.random() * 8) + 22;
        }
        else {
            this.chaRefTicker--;
        }
    };
    //重新排序zOrder
    Street.prototype.RearrangeSpritesZOrder = function () {
        if (!this.sprites || this.sprites.length <= 0)
            return;
        this.sprites.sort(function (a, b) {
            //角色坐标要特殊处理，读取setToY
            var acY = (a.setToY != null && a.setToY != undefined) ? a.setToY : (a.y + a.height);
            var bcY = (b.setToY != null && b.setToY != undefined) ? b.setToY : (b.y + b.height);
            return (acY < bcY) ? -1 : 1;
        });
        for (var i = 0; i < this.sprites.length; i++) {
            var ts = this.sprites[i];
            ts.zIndex = i + this.zOrderBase;
        }
        this.gameLayer.sortChildren();
    };
    //根据json信息放置地面层元素和精灵层元素
    Street.prototype.PaintFixedTerrainByJson = function (json) {
        //初始化地图
        this.gridCanPass = new Array();
        for (var i = 0; i < GameMapWidth; i++) {
            var thisLine = new Array();
            for (var j = 0; j < GameMapHeight + this.ground.roadHeightInGrid; j++) {
                thisLine.push(true);
            }
            this.gridCanPass.push(thisLine);
        }
        //对应的数组初始化
        if (this.fixedImage) {
            for (var i = 0; i < this.fixedImage.length; i++) {
                if (this.fixedImage[i] && this.fixedImage[i].parent)
                    this.fixedImage[i].parent.removeChild(this.fixedImage[i]);
            }
        }
        this.fixedImage = new Array();
        //地面层
        var fg = json["fixed_grounds"];
        if (fg) {
            for (var i = 0; i < fg.length; i++) {
                var fi = fg[i];
                var gX = fi["x"];
                var gY = fi["y"];
                var img = new eui.Image();
                img.texture = RES.getRes(fi["img"]);
                img.width = Math.ceil(img.width + 1);
                img.height = Math.ceil(img.height + 1);
                img.fillMode = egret.BitmapFillMode.SCALE;
                var iPos = this.GetPixelPosByGridPos(gX, gY);
                img.x = iPos["x"];
                img.y = iPos["y"];
                if (!fi["canPass"]) {
                    this.gridCanPass[gX][gY] = false;
                }
                this.gameLayer.addChild(img);
                this.fixedImage.push(img);
            }
        }
        //精灵层
        var fs = json["fixed_sprites"];
        if (fs) {
            for (var i = 0; i < fs.length; i++) {
                var fi = fs[i];
                var gX = fi["x"];
                var gY = fi["y"];
                var img = new eui.Image();
                img.texture = RES.getRes(fi["img"]);
                img.width = Math.ceil(img.width + 1);
                img.height = Math.ceil(img.height + 1);
                img.fillMode = egret.BitmapFillMode.SCALE;
                var iPos = this.GetPixelPosByGridPos(gX, gY);
                img.x = iPos["x"];
                img.y = iPos["y"];
                if (!fi["canPass"]) {
                    this.gridCanPass[gX][gY] = false;
                }
                this.gameLayer.addChild(img);
                this.sprites.push(img);
                this.fixedImage.push(img);
            }
        }
        //广告牌
        var adb = json["advboard"];
        if (adb) {
            this.advBoardGridX = adb["x"];
            this.advBoardGridY = adb["y"];
            this.advBoardWidth = adb["width"] ? adb["width"] : 2;
        }
    };
    //把汽车和主角放上去
    Street.prototype.PlaceBusAndMainCharacter = function (busJsonFileName) {
        var bJsonF = RES.getRes(busJsonFileName);
        var bJson = bJsonF["data"];
        //初始化
        if (this.busImage) {
            for (var i = 0; i < this.busImage.length; i++) {
                if (this.busImage[i] && this.busImage[i].parent) {
                    this.busImage[i].parent.removeChild(this.busImage[i]);
                }
            }
        }
        this.busImage = new Array();
        if (this.mainCharacter && this.mainCharacter.parent) {
            this.mainCharacter.parent.removeChild(this.mainCharacter);
        }
        //读取数据
        if (bJson) {
            //共用参数
            var busPos = this.GetPixelPosByGridPos(BusLeftInGrid, BusBottomInGrid);
            var busSX = busPos["x"];
            var busSY = busPos["y"] - BusAreaHeight + GridHeight;
            //最先绘制body
            var bodyInfo = bJson["body"];
            if (bodyInfo) {
                var img = new eui.Image();
                img.texture = RES.getRes(bodyInfo["img"]);
                var offX = bodyInfo["offsetX"] ? bodyInfo["offsetX"] : 0;
                var offY = bodyInfo["offsetY"] ? bodyInfo["offsetY"] : 0;
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
            var mcX = (this.mainCharacterZoneRight - this.mainCharacterZoneLeft) / 2 + this.mainCharacterZoneLeft;
            this.mainCharacter = new CharacterObj(GetCharacterActionInfoByKey("schoolgirl"), mcX, this.mainCharacterZoneFloor);
            this.gameLayer.addChild(this.mainCharacter);
            //接下来绘制车顶
            var topInfo = bJson["top"];
            var topImg = void 0;
            var topAnchorX = 0;
            var topAnchorY = 0;
            if (topInfo) {
                topImg = new eui.Image();
                topImg.texture = RES.getRes(topInfo["img"]);
                //这个坐标是要最后修的
                this.gameLayer.addChild(topImg);
                this.busImage.push(topImg);
                topAnchorX = topInfo["offsetX"] ? topInfo["offsetX"] : 0;
                topAnchorY = topInfo["offsetY"] ? topInfo["offsetY"] : 0;
            }
            //最后是车喷漆
            var paintInfo = bJson["paint"];
            if (paintInfo) {
                var img = new eui.Image();
                img.texture = RES.getRes(paintInfo["img"]);
                var offX = paintInfo["offsetX"] ? paintInfo["offsetX"] : 0;
                var offY = paintInfo["offsetY"] ? paintInfo["offsetY"] : 0;
                img.x = busSX + offX;
                img.y = busSY + offY;
                this.gameLayer.addChild(img);
                this.busImage.push(img);
                //车顶装潢位置
                topImg.x = busSX + (paintInfo["topCenterX"] ? paintInfo["topCenterX"] : 0) - topAnchorX;
                topImg.y = busSY + (paintInfo["topCenterY"] ? paintInfo["topCenterY"] : 0) - topAnchorY;
                //其他装潢
                var oInfo = paintInfo["addon"];
                if (oInfo) {
                    for (var i = 0; i < oInfo.length; i++) {
                        var thisAddonInfo = oInfo[i];
                        var imgName = thisAddonInfo["img"];
                        var imgOffX = thisAddonInfo["offsetX"] ? thisAddonInfo["offsetX"] : 0;
                        var imgOffY = thisAddonInfo["offsetY"] ? thisAddonInfo["offsetY"] : 0;
                        var addonImg = new eui.Image();
                        addonImg.texture = RES.getRes(imgName);
                        addonImg.x = busSX + imgOffX;
                        addonImg.y = busSY + imgOffY;
                        this.gameLayer.addChild(addonImg);
                        this.busImage.push(addonImg);
                    }
                }
            }
        }
    };
    //放一张桌子，这里可不管能不能放的下，只管放上去的
    Street.prototype.PlaceTable = function (table, gridX, gridY) {
        var t = new DiningTable(table, gridX, gridY);
        var tPos = this.GetPixelPosByGridPos(gridX, gridY);
        t.x = tPos["x"];
        t.y = tPos["y"];
        this.gameLayer.addChild(t);
        this.sprites.push(t);
        this.diningTables.push(t);
        for (var i = 0; i < table.widthInGrid; i++) {
            for (var j = 0; j < table.heightInGrid; j++) {
                this.gridCanPass[gridX + i][gridY + j] = false;
            }
        }
        if (this.diningChairs && this.diningChairs.length > 0) {
            for (var i = 0; i < this.diningChairs.length; i++) {
                var c = this.diningChairs[i];
                if (c.connectTable == null) {
                    //不能连接上一个椅子就return，因为一个桌子可以连接多个椅子
                    t.TryConnectChair(c);
                }
            }
        }
    };
    //放一张椅子，也是只负责放下去，不负责判断能不能放，返回连接到那个桌子了
    Street.prototype.PlaceChair = function (chair, gridX, gridY, dir) {
        var c = new DiningChair(chair, gridX, gridY, dir);
        var cPos = this.GetPixelPosByGridPos(gridX, gridY);
        c.x = cPos["x"];
        c.y = cPos["y"];
        this.gameLayer.addChild(c);
        this.sprites.push(c);
        this.diningChairs.push(c);
        var res = null;
        for (var i = 0; i < this.diningTables.length; i++) {
            if (this.diningTables[i].TryConnectChair(c) == true) {
                res = this.diningTables[i]; //连接上了就结束了
                break;
            }
        }
        if (res) {
            var cInfo = chair.direction[c.direction];
            for (var i = 0; i < cInfo.gridWidth; i++) {
                for (var j = 0; j < cInfo.gridHeight; j++) {
                    this.gridCanPass[gridX + i][gridY + j] = false;
                }
            }
        }
        return res;
    };
    //放红绿灯
    Street.prototype.PlaceTrafficLight = function (gridX, gridY) {
        var tl = new TrafficLight();
        var tPos = this.GetPixelPosByGridPos(gridX, gridY);
        tl.x = tPos["x"];
        tl.y = tPos["y"] + tl.OffsetY();
        this.gameLayer.addChild(tl);
        this.sprites.push(tl);
        this.trafficLights.push(tl);
        tl.LightOn(this.GetTrafficLightState()["light"]);
        tl.Draw();
    };
    //放一个角色，这里的x,y都是像素级
    Street.prototype.PlaceCharacter = function (key, x, y) {
        if (key === void 0) { key = "schoolgirl"; }
        var cha = new CharacterObj(GetCharacterActionInfoByKey(key), x, y, new CharacterProperty());
        this.gameLayer.addChild(cha);
        this.sprites.push(cha);
        return cha;
    };
    //TODO 随机产生一个npc
    Street.prototype.RandomGatherNPC = function () {
        var sLocation = [
            { x: -3, y: Math.floor(Math.random() * this.ground.roadHeightInGrid - 2) + GameMapHeight + 3 },
            { x: GameMapWidth + 3, y: Math.floor(Math.random() * this.ground.roadHeightInGrid - 2) + GameMapHeight + 3 },
            { x: Math.floor(Math.random() * 3), y: GameMapHeight + this.ground.roadHeightInGrid + 5 }
        ];
        var slIndex = Math.floor(Math.random() * sLocation.length);
        var slRes = sLocation[slIndex];
        var slPos = this.GetPixelPosByGridPos(slRes["x"], slRes["y"], true);
        var startX = slPos["x"];
        var startY = slPos["y"] - Math.floor(Math.random() * GridHeight / 2);
        var chaKeyMay = ["schoolgirl"];
        var chaKey = chaKeyMay[Math.floor(Math.random() * chaKeyMay.length)];
        var cha = this.PlaceCharacter(chaKey, startX, startY);
        cha.property.speed = Math.floor(Math.random() * 3) + 4;
        var aiScr = [
            AIScripts.JustPassThroughFromRoad(cha, (GameMapWidth + 3) * GridWidth),
            AIScripts.JustPassThroughFromRoad(cha, -3 * GridWidth),
            AIScripts.JustPassThroughFromTrafficLight(this, cha)
        ];
        cha.ai.SetScripts(aiScr[slIndex]);
    };
    //测试用的角色
    Street.prototype.PlaceDebugCharacter = function () {
        var pos = this.GetPixelPosByGridPos(2, 0, true);
        var cha = this.PlaceCharacter("schoolgirl", pos["x"], pos["y"]);
        cha.property.speed = Math.floor(Math.random() * 3) + 4;
        cha.ai.SetScripts(AIScripts.DebugWalkForDirection(cha));
        for (var i = 0; i < 10; i++) {
            cha.ai.AddScripts(AIScripts.DebugWalkForDirection(cha));
        }
        var cha1 = this.PlaceCharacter("schoolgirl", pos["x"] + 150, pos["y"] + 75);
        cha1.property.speed = Math.floor(Math.random() * 3) + 4;
        cha1.ai.SetScripts(AIScripts.DebugStandTrickForDirection(cha));
        for (var i = 0; i < 10; i++) {
            cha1.ai.AddScripts(AIScripts.DebugStandTrickForDirection(cha));
        }
    };
    /**
     * 根据单元格坐标，获得在gameLayer上的坐标
     * @param {number} gridX 单元格坐标x
     * @param {number} gridY 单元格坐标y
     * @param {boolean} forCharacter 这个坐标是不是为角色准备的
     * @returns 返回坐标{x:number, y:number};
     */
    Street.prototype.GetPixelPosByGridPos = function (gridX, gridY, forCharacter) {
        if (forCharacter === void 0) { forCharacter = false; }
        var res = { x: -1, y: -1 };
        if (!this.ground)
            return res;
        res["x"] = gridX * GridWidth + (forCharacter == true ? GridWidth / 2 : 0);
        res["y"] = gridY * GridHeight + this.ground.groundTop + (forCharacter == true ? (GridHeight - 10) : 0);
        return res;
    };
    /**
     * 根据tick获得红绿灯的状态
     * @returns {Object} ["light":TrafficLightState, "toGreen":距离绿灯的tick数]
     */
    Street.prototype.GetTrafficLightState = function () {
        var greenTick = 150;
        var gShineTick = 30;
        var yellowTick = 30;
        var redTick = 150;
        var totalTick = greenTick + gShineTick + yellowTick + redTick;
        var cTick = this.tick % totalTick;
        var tls = TrafficLightState.Red;
        var toGreen = 0;
        if (cTick < greenTick) {
            tls = TrafficLightState.Green;
        }
        else if (cTick < greenTick + gShineTick) {
            tls = TrafficLightState.GreenShine;
            toGreen = totalTick - cTick;
        }
        else if (cTick < greenTick + gShineTick + yellowTick) {
            tls = TrafficLightState.Yellow;
            toGreen = totalTick - cTick;
        }
        else {
            toGreen = totalTick - cTick;
        }
        return {
            "light": tls,
            "toGreen": toGreen
        };
    };
    return Street;
}(eui.Component));
__reflect(Street.prototype, "Street", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Street.js.map