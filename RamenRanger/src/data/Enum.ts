
//角色方向枚举
enum Direction{
	Up = 0,
	Down = 1,
	Left = 2,
	Right = 3
}

//角色动作枚举
enum CharacterAction{
	Stand = 0,
	StandTrick = 1,
	Walk = 2,
	Order = 3,
	Eat = 4,
	Chew = 5,
	Think = 6,
	Discover = 7,
	Nod = 8,
	Clap = 9,
	Spicy = 10,
	TakePhoto = 11,
	Salty = 12,
	Sigh = 13,
	Smile = 14,
	Hate = 15
}

//红绿灯状态
enum TrafficLightState{
	Red = 0,
	Yellow = 1,
	GreenShine = 2,
	Green = 3
}

//贴图层次
enum SpriteClipLayer{
	Normal = 0,	//普通层
	Noodle = 1,	//面条位于普通层上
	EatingHead = 2,	//吃面的时候脑袋位于面条层上
}

//拉面制作界面状态
enum CraftNoodleState{
	ChooseBowl = 0,
	PutTare = 1,
	TareList = 2,
	SoupToBroth = 3,
	Noodles = 4,
	SelectTopping = 5,
	PlaceTopping = 6
}