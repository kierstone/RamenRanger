class HorizontalFoodCourt_EndToChallenge extends eui.Component implements  eui.UIComponent {
	private Group_IngExp:eui.Group;
	private Group_Quest:eui.Group;
	private Button_Start:eui.Button;

	private caller:HorizontalFoodCourt;
	private ingExp:Array<HorizontalFoodCourt_IngredientExp>;
	private questRequire:RamenRequirement;	//做拉面需要的条件

	public constructor(caller:HorizontalFoodCourt, ingExp:Array<HorizontalFoodCourt_IngredientExp>) {
		super();
		this.caller = caller;
		this.ingExp = ingExp;
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.init();
	}
	
	private init(){
		//TODO 拉面的需求，现在写死
		this.questRequire = new RamenRequirement(
			"做一碗带上海味道的重庆小面吧",
			[
				new RequiredSubject(new IngredientSubject("bean_product", "tofu", "venetian_pouch"), "ingredient_venetian_pouch","上海味道就要百叶包"),
				new RequiredSubject(new IngredientSubject("bean_product", "tofu", "venetian_pouch"), "ingredient_venetian_pouch","既然是双档就再来个百叶包")
			],
			[
				//new RequiredMutual("test", "ui_craft_tab", "[豆制品]和[白萝卜]组合有助消化")
			],
			new RequiredBroth("broth1", "麻辣汤底是重庆小面的核心")
		);

		//显示经验
		for (let i = 0; i < this.ingExp.length; i++){
			this.Group_IngExp.addChild(this.ingExp[i]);
		}

		//显示任务需求
		if (this.questRequire.requireBroth){
			let qr:FoodCourt_QuestListItem = new FoodCourt_QuestListItem(
				this.questRequire.requireBroth, RamenRequirmentType.Broth
			);
			this.Group_Quest.addChild(qr);
		}
		for (let i = 0; i < this.questRequire.requireSubject.length; i++){
			let qr:FoodCourt_QuestListItem = new FoodCourt_QuestListItem(
				this.questRequire.requireSubject[i], RamenRequirmentType.Subject
			);
			this.Group_Quest.addChild(qr);
		}
		for (let i = 0; i < this.questRequire.requireMutual.length; i++){
			let qr:FoodCourt_QuestListItem = new FoodCourt_QuestListItem(
				this.questRequire.requireMutual[i], RamenRequirmentType.Mutual
			);
			this.Group_Quest.addChild(qr);
		}

		//开始按钮
		this.Button_Start.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			if (this.caller && this.caller.parent){
				this.caller.parent.removeChild(this.caller);
			}
			
			Utils.UIRoot.addChild(new CraftNoodle());
			this.parent.removeChild(this);
		},this);
	}
}