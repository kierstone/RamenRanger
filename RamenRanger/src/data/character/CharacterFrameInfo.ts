//角色动画一帧的信息，目前来看，只要头跟身体的文件名
class CharacterFrameInfo {
	public head:string;
	public body:string;
	public emote:string;

	public constructor(head:string, body:string, emote:string) {
		this.head = head;
		this.body = body;
		this.emote = emote;
	}
}