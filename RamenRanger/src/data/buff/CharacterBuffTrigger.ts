//添加角色buff到角色身上需要的信息
class CharacterBuffTrigger {
	public buffId:string;	//buff的id
	public stack:number;	//buff的层数
	public turns:number;	//buff的回合数

	public constructor(buffId:string, stack:number, turns:number) {
		this.buffId = buffId;
		this.stack = stack;
		this.turns = turns;
	}
}