//当前的某个桌子栏位的状态
class DiningTableSeatInfo {
	public seatSlot:DiningTableSeatSlot;	//这是哪个栏位
	public ramen:RamenObj;					//现在放了什么面条
	public chair:DiningChair;				//现在放着什么椅子
	public character:CharacterObj;		    //椅子坐着谁

	public constructor(seatSlot:DiningTableSeatSlot) {
		this.seatSlot = seatSlot;
	}
}

