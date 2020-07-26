//角色方向枚举
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
//角色动作枚举
var CharacterAction;
(function (CharacterAction) {
    CharacterAction[CharacterAction["Stand"] = 0] = "Stand";
    CharacterAction[CharacterAction["StandTrick"] = 1] = "StandTrick";
    CharacterAction[CharacterAction["Walk"] = 2] = "Walk";
    CharacterAction[CharacterAction["Order"] = 3] = "Order";
    CharacterAction[CharacterAction["Eat"] = 4] = "Eat";
    CharacterAction[CharacterAction["Chew"] = 5] = "Chew";
    CharacterAction[CharacterAction["Think"] = 6] = "Think";
    CharacterAction[CharacterAction["Discover"] = 7] = "Discover";
    CharacterAction[CharacterAction["Nod"] = 8] = "Nod";
    CharacterAction[CharacterAction["Clap"] = 9] = "Clap";
    CharacterAction[CharacterAction["Spicy"] = 10] = "Spicy";
    CharacterAction[CharacterAction["TakePhoto"] = 11] = "TakePhoto";
    CharacterAction[CharacterAction["Salty"] = 12] = "Salty";
    CharacterAction[CharacterAction["Sigh"] = 13] = "Sigh";
    CharacterAction[CharacterAction["Smile"] = 14] = "Smile";
    CharacterAction[CharacterAction["Hate"] = 15] = "Hate";
})(CharacterAction || (CharacterAction = {}));
//红绿灯状态
var TrafficLightState;
(function (TrafficLightState) {
    TrafficLightState[TrafficLightState["Red"] = 0] = "Red";
    TrafficLightState[TrafficLightState["Yellow"] = 1] = "Yellow";
    TrafficLightState[TrafficLightState["GreenShine"] = 2] = "GreenShine";
    TrafficLightState[TrafficLightState["Green"] = 3] = "Green";
})(TrafficLightState || (TrafficLightState = {}));
//贴图层次
var SpriteClipLayer;
(function (SpriteClipLayer) {
    SpriteClipLayer[SpriteClipLayer["Normal"] = 0] = "Normal";
    SpriteClipLayer[SpriteClipLayer["Noodle"] = 1] = "Noodle";
    SpriteClipLayer[SpriteClipLayer["EatingHead"] = 2] = "EatingHead";
})(SpriteClipLayer || (SpriteClipLayer = {}));
//拉面制作界面状态
var CraftNoodleState;
(function (CraftNoodleState) {
    CraftNoodleState[CraftNoodleState["ChooseBowl"] = 0] = "ChooseBowl";
    //PutTare = 1,
    CraftNoodleState[CraftNoodleState["SoupToBroth"] = 2] = "SoupToBroth";
    CraftNoodleState[CraftNoodleState["Noodles"] = 3] = "Noodles";
    CraftNoodleState[CraftNoodleState["SelectTopping"] = 4] = "SelectTopping";
    CraftNoodleState[CraftNoodleState["PlaceTopping"] = 5] = "PlaceTopping";
    CraftNoodleState[CraftNoodleState["ShowPhoto"] = 6] = "ShowPhoto";
})(CraftNoodleState || (CraftNoodleState = {}));
//拉面食材难吃的类别，每吃一回合都有一个这个，当然大多值是none
var BadTaste;
(function (BadTaste) {
    BadTaste[BadTaste["None"] = 0] = "None";
    BadTaste[BadTaste["Hot"] = 10] = "Hot";
    BadTaste[BadTaste["TooHeavy"] = 12] = "TooHeavy";
    BadTaste[BadTaste["Disappointed"] = 13] = "Disappointed";
    BadTaste[BadTaste["Hatred"] = 15] = "Hatred"; //对应动作Hate，是吃到忌口了
})(BadTaste || (BadTaste = {}));
//吃面迷你游戏的状态
var EatRamenGameState;
(function (EatRamenGameState) {
    EatRamenGameState[EatRamenGameState["Enter"] = 0] = "Enter";
    EatRamenGameState[EatRamenGameState["Order"] = 1] = "Order";
    EatRamenGameState[EatRamenGameState["Wait"] = 2] = "Wait";
    EatRamenGameState[EatRamenGameState["Eat"] = 3] = "Eat";
    EatRamenGameState[EatRamenGameState["ReadyToLeave"] = 4] = "ReadyToLeave";
    EatRamenGameState[EatRamenGameState["Leave"] = 5] = "Leave"; //离去
})(EatRamenGameState || (EatRamenGameState = {}));
//# sourceMappingURL=Enum.js.map