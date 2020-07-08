
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
	SoupToBroth = 2,
	Noodles = 3,
	SelectTopping = 4,
	PlaceTopping = 5,
	ShowPhoto = 6
}

//拉面食材难吃的类别，每吃一回合都有一个这个，当然大多值是none
enum BadTaste{
	None = 0,
	Hot = 10, //对应动作Spicy，太辛太辣
	TooHeavy = 12,	//对应Salty，太甜太咸
	Disappointed = 13, //对应sigh，是没找到想吃的内容
	Hatred = 15  //对应动作Hate，是吃到忌口了
}

//吃面迷你游戏的状态
enum EatRamenGameState{
	Enter = 0,	//坐进位置
	Order = 1,	//点单
	Wait = 2,	//等上菜
	Eat = 3,	//吃
	ReadyToLeave = 4,	//准备离去，比如想出了意见什么的
	Leave = 5	//离去
}