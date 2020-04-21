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
//# sourceMappingURL=Enum.js.map