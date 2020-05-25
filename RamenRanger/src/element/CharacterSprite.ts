class CharacterSprite extends SpriteGroup{
	private head:SpriteClip;
	private body:SpriteClip;
	private emote:SpriteClip;

	private _character:CharacterObj;
	public constructor(chaObj:CharacterObj) {
		super();
		this._character = chaObj;
	}

	protected childrenCreated():void
	{
		super.childrenCreated();
		this.init();
	}

	private init(){
		this.head = this._character.head;
		this.body = this._character.body;
		this.emote = this._character.emote;

		this._character.SetPosition(0, 0);
		
		//注意加入顺序
		if (this.body) this.addChild(this.body);
		if (this.head) this.addChild(this.head);
		if (this.emote) this.addChild(this.emote);
	}

	public Update(){
		this._character.Update();
	}

	public FixedUpdate():boolean{
		return this._character.FixedUpdate();
	}
}