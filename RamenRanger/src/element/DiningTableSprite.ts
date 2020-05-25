class DiningTableSprite extends SpriteGroup{
	private ramen:RamenSprite;
	private _ramen:RamenObj;

	private chair:eui.Image;
	private table:eui.Image;

	private eatingIngImg:eui.Image;	//正在吃的那个东西

	private _cha:CharacterObj;
	private head:SpriteClip;
	private body:SpriteClip;
	private emote:SpriteClip;

	public eatGame:EatingRamen;	//正在进行的吃东西小游戏

	//TODO桌子信息等

	public constructor() {
		super();
	}

	protected childrenCreated():void
	{
		super.childrenCreated();
		this.init();
	}

	private init(){
		//TODO 椅子写死
		this.chair = new eui.Image(RES.getRes("wooden_chair"));
		this.addChild(this.chair);
		this.chair.anchorOffsetX = this.chair.width / 2;
		this.chair.anchorOffsetY = this.chair.height + 50;
		this.chair.visible = false;

		//TODO 桌子先写死
		this.table = new eui.Image(RES.getRes("wooden_single_table"));
		this.addChild(this.table);
		this.table.anchorOffsetX = this.table.width / 2;
		this.table.anchorOffsetY = this.table.height;
	}

	private ResetZOrder(){
		if (this.chair) this.chair.zIndex = 0;
		if (this.body) this.body.zIndex = 1;
		if (this.table) this.table.zIndex = 2;
		if (this.ramen) this.ramen.zIndex = 3;
		if (this.head) this.head.zIndex = 4;
		if (this.eatingIngImg) this.eatingIngImg.zIndex = 5;
		this.sortChildren();
	}

	/**
	 * 现在的角色从椅子上挪走
	 */
	public RemoveCharacter(){
		if (this.body){
			if (this.body.parent) this.body.parent.removeChild(this.body);
			this.body = null;
		}
		if (this.head){
			if (this.head.parent) this.head.parent.removeChild(this.head);
			this.head = null;
		}
		if (this.emote){
			if (this.emote.parent) this.emote.parent.removeChild(this.emote);
			this.emote = null;
		}
		this.chair.visible = false;
		if (this._cha){
			this._cha.isSitting = false;
		}
		this._cha = null;
		this.eatGame = null;
	}

	/**
	 * 让角色做到凳子上，TODO，现在凳子数据写死
	 */
	public SetCharacterToSeat(cha:CharacterObj){
		this.RemoveCharacter();
		this.chair.visible = true;

		if (!cha) return;

		this._cha = cha;
		this._cha.SetPosition(0, -50);
		
		if (this._cha.body){
			this.body = this._cha.body;
			this.addChild(this.body);
		}
		if (this._cha.head){
			this.head = this._cha.head;
			this.addChild(this.head);
		}
		if (this._cha.emote){
			this.emote = this._cha.emote;
			this.addChild(this.emote);
		}
		this._cha.isSitting = true;

		if (this._cha && this._ramen)
			this.eatGame = new EatingRamen(this._cha, this._ramen);

		this.ResetZOrder();
	}

	/**
	 * 删除拉面
	 */
	public RemoveRamen(){
		if (this.ramen){
			if (this.ramen.parent) this.ramen.parent.removeChild(this.ramen);
			this.ramen = null;
			this._ramen = null;
		}
	}

	/**
	 * 上拉面
	 */
	public PlaceRamen(ramen:RamenObj){
		this.RemoveRamen();
		if (!ramen)return;

		this._ramen = ramen;

		this.ramen = new RamenSprite(this._ramen);
		this.ramen.y = -30;	//TODO 写死
		this.addChild(this.ramen);

		if (this._cha && this._ramen)
			this.eatGame = new EatingRamen(this._cha, this._ramen);

		this.ResetZOrder();
	}

	/**
	 * 根据eatGame状态重绘一些图形
	 */
	private UpdateByEatGame(){
		this.ramen.UpdateRamen();
		
		if (this.eatingIngImg && this.eatingIngImg.parent){
			this.eatingIngImg.parent.removeChild(this.eatingIngImg);
		}
		this.eatingIngImg = this.eatGame.turnResult.eatIngredient.GatherSceneImage(
			this, 0, 0
		);
console.log("eating ing refresh", this.eatingIngImg.anchorOffsetY);
		this.eatingIngImg.visible = false;
		this.ResetZOrder();
	}






	public Update(){
		if (this._cha){
			this._cha.Update();

			if (this.eatingIngImg){
				if (this._cha.hasIngredientPoint == true){
					this.eatingIngImg.visible = true;
					let chaPos = this._cha.GetPos();
					this.eatingIngImg.x = this._cha.ingredientPoint.x + chaPos.x;
					this.eatingIngImg.y = this._cha.ingredientPoint.y + chaPos.y;
				}else{
					this.eatingIngImg.visible = false;
				}
			}
		}
	}

	public FixedUpdate():boolean{
		if (this._cha){
			if  (this._cha.FixedUpdate() == true){
				this._cha.Update();
			}
		}
		if (this.eatGame){
			if (this.eatGame.FixedUpdate() == true){
				this.UpdateByEatGame();
			}
		}
		return false;
	}
}