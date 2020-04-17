//吃饭的npc身上的buff，而不是玩家店铺的buff，是buffObj
class CharacterBuff {
	public uniqueId:string;
	public turns:number;	//有效吃面数
	public stack:number;	//层数
	public model:CharacterBuffModel; //Model

	public constructor() {
	}
}