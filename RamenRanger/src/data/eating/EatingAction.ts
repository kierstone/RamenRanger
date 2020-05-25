/**
 * 吃东西的FixedUpdate的数据
 */
class EatingAction {
	public tick:number; //要有多少个tick
	public changeToAction:CharacterAction;	//变换为什么动作
	//其他的比如喷出爱心等需要了再加

	public constructor(tick:number, toAction:CharacterAction) {
		this.tick = tick;
		this.changeToAction = toAction;
	}
}