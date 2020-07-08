//吃饭区域宽高（单元格），和单元格宽高（像素）
var GameMapWidth = 10;  
var GameMapHeight = 7;
var GridWidth = 75;
var GridHeight = 75;
var StreetHeight = 3;

var BusAreaWidth = 600; //小汽车的宽度
var BusAreaHeight = 375;  //小车的高度
var BusLeftInGrid = 2;  //小车的单元格坐标x=2
var BusBottomInGrid = -1;  //小车的单元格坐标y，应该是地图区域往上1格

var RenderUpdateEveryLogicTick = 3; //每3个逻辑tick，渲染走1个tick

var Scene_NoodleBrothSize = 60; //场景里的拉面的宽度高度
var Scene_PosScale = 0.12;  //这是摆面界面的尺寸转化到面碗尺寸
var Scene_HorVerTimes = 2/3;    //宽高比

var ResName_Broth_Highlight = "broth_highlight"; //汤上面的油光

var PlayerBaseHunger = 50;  //玩家默认饱食度