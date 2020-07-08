class CraftNoodle extends eui.Component implements  eui.UIComponent {
	private Group_GameLayer:eui.Group;
	private Group_UILayer:eui.Group;

	private Group_IngredientBox:eui.Group;
	private Group_Box:eui.Group;

	private Group_PhotoHead:eui.Group;
	private Group_PhotoMask:eui.Group;
	private Label_UserName:eui.Label;
	private Img_UserPortrait:eui.Image;
	private Mask_UserPortrait:eui.Rect;
	private Button_ShareNoodle:eui.Button;
	private Button_CraftDone:eui.Button;
	private Group_PhotoButtons:eui.Button;
	private Rect_PhotoTaker:eui.Rect;

	private Group_Hint:eui.Group;
	private Label_HintText:eui.Label;

	private Button_TareList:eui.Button;
	private Button_Handbook:eui.Button;

	private Group_PlaceTool:eui.Group;
	
	private Button_NextStep:eui.Button;
	private Button_Prev:eui.Button;

	private Img_BottomBorder:eui.Image;
	private Img_BKG:eui.Image;
	private Img_Stick:eui.Image;

	private Group_IngBox:eui.Group;
	private Group_Button:eui.Group;
	private Button_PrevPage:eui.Button;
	private Button_NextPage:eui.Button;
	private test_button:eui.Button;

	private Img_Step0:eui.Image;
	private Img_Step1:eui.Image;
	private Img_Step2:eui.Image;
	private Img_Step3:eui.Image;
	private Img_Step4:eui.Image;

	private placingTool:PlacingToolBox;

	private CameraWhite:eui.Rect;

	private bowlImage:eui.Image;
	private brothImage:egret.Shape;
	private brothHighlight:eui.Image;
	private noodleImage:eui.Image;
	private steamImage:SpriteClip;
	private steamFrameIndex:number = 0;

	private uiState:CraftNoodleState;
	private canControl:boolean = false;

	//private usingBowl:BowlModel;	//使用的碗

	private craftingRamen:RamenModel;	//正在做的拉面
	private stepId:number = 0;	//0=着味，1=配汤，2=选面，3=浇头

	private placingIngredient:IngredientObj;	//正在选中放位置的素材，如果是null，代表啥也没选中。
	private placingIngImage:eui.Image;
	private pickingOffsetX:number = 0;
	private pickingOffsetY:number = 0;
	private draggingIng:boolean = false;

	private ramenCenterX:number;
	private ramenCenterY:number;

	private ingredientPage:Array<IngredientBox>;
	private ingredientIndex = 0;

	private orderRotateTopping:boolean = false;

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.init()
	}

	private init(){
		this.ramenCenterX = this.stage.stageWidth / 2;
		this.ramenCenterY = this.stage.stageHeight * 0.38;

		this.Rect_PhotoTaker.x = this.ramenCenterX;
		this.Rect_PhotoTaker.y = this.ramenCenterY;

		this.Img_Stick.y = this.ramenCenterY - 35;
		this.Button_TareList.y = 
		this.Button_NextStep.y = 
		this.Button_Handbook.y = this.stage.stageHeight - 550;

		this.Img_BKG.width = this.stage.stageWidth;
		this.Img_BKG.height = this.stage.stageHeight;
		this.Img_BottomBorder.y = this.stage.stageHeight;
		this.Group_IngBox.y = this.stage.stageHeight;


		//先写死就是这个饭碗的数据
		this.craftingRamen = new RamenModel();
		//this.craftingRamen.broth = new BrothObj(playerInfo.getLearnedBroth("broth0"));
		 
		
		this.ChangeToState(CraftNoodleState.ChooseBowl);

		this.UpdateRamen();

		//照片界面内容初始化
		this.InitUserInfoToPhotoMask();
		
		//尺寸工具盒子初始化
		this.placingTool = new PlacingToolBox(this);
		this.Group_PlaceTool.addChild(this.placingTool);
		this.placingTool.anchorOffsetX = this.placingTool.width / 2;
		this.placingTool.x = this.Group_PlaceTool.width / 2;

		//Input 初始化
		this.Group_UILayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.StagePointerDown, this);
		this.Group_UILayer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.StagePointerMove, this);
		this.Group_UILayer.addEventListener(egret.TouchEvent.TOUCH_END, this.StagePointerUp, this);
		this.Group_UILayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.StagePointerTap, this);

		//翻页按钮
		this.Button_NextPage.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			if (this.canControl == false) return;
			this.ChangeIngredientBoxPage(
				(this.ingredientIndex <= this.ingredientPage.length - 1) ? 
				(this.ingredientIndex + 1) : (this.ingredientPage.length - 1)
			);
		},this);
		this.Button_PrevPage.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			if (this.canControl == false) return;
			this.ChangeIngredientBoxPage(
				this.ingredientIndex > 0 ? 
				(this.ingredientIndex - 1) : 0
			);
		},this);

		this.Button_TareList.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			ShowCraftNoodleTareList(this, this.craftingRamen.tare, this.RemoveTareFromCraftingRamen)
		},this);

		//下一步按钮
		this.Button_NextStep.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnNextButtonClick, this);
		//上一部
		this.Button_Prev.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnPrevButtonClick, this);

		let t = new egret.Timer(100);
		t.addEventListener(egret.TimerEvent.TIMER, ()=>{
			this.Update();
		},this);
		t.start();
	}

	


	//删除某个tare
	private RemoveTareFromCraftingRamen(thisObj:CraftNoodle, tare:IngredientObj){
		if (! thisObj.craftingRamen || !thisObj.craftingRamen.tare) return;
		for (let i = 0; i < thisObj.craftingRamen.tare.length; i++){
			if (tare == thisObj.craftingRamen.tare[i]){
				thisObj.craftingRamen.tare.splice(i, 1);
				thisObj.UpdateRamen(false);
				thisObj.TareListButtonTextSynchronize();
				return;
			}
		}
	}





	//把用户信息写到photomask
	private InitUserInfoToPhotoMask(){
		if (GameUserInfo){
			this.Img_UserPortrait.source = GameUserInfo["avatarUrl"];
			this.Label_UserName.text = GameUserInfo["nickName"];
		}
		this.Button_ShareNoodle.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			this.TakePhotoAndShare();
		},this);
		this.Button_CraftDone.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			this.ToTestScene(this, false);
		},this);
		this.Img_UserPortrait.mask = this.Mask_UserPortrait;
		this.Group_PhotoMask.x = this.ramenCenterX;
		this.Group_PhotoMask.y = this.ramenCenterY;
		this.Group_PhotoMask.visible = 
		this.Group_PhotoButtons.visible = 
		this.Group_PhotoHead.visible = false;
	}

	//把屏幕清空拍一张照片，然后分享
	private TakePhotoAndShare(){
		console.log("Start Take Photo, gogogo");
		this.Button_ShareNoodle.enabled = 
		this.Button_CraftDone.enabled = false;

		let cameraStartTime = 150

		if (!this.CameraWhite){
			this.CameraWhite = new eui.Rect(this.stage.stageWidth, this.stage.stageHeight, 0xFFFFFF);
			this.addChild(this.CameraWhite);
			this.CameraWhite.x = this.CameraWhite.y = 0;
			this.CameraWhite.alpha = 0;
			egret.Tween.get(this.CameraWhite).to({alpha:1}, cameraStartTime, egret.Ease.cubicIn).call(()=>{
				this.CameraWhite.visible = false;
			})
		}

		egret.Tween.get(this.Group_UILayer)
			.to({alpha:0}, cameraStartTime - 50, egret.Ease.quadIn)
			.wait(100)
			.call(()=>{
				platform.shareGame(
					"我就试试分享", 
					this.Rect_PhotoTaker.x - this.Rect_PhotoTaker.anchorOffsetX,
					this.Rect_PhotoTaker.y - this.Rect_PhotoTaker.anchorOffsetY,
					this.Rect_PhotoTaker.width, this.Rect_PhotoTaker.height, 
					this.stage.stageWidth, this.stage.stageHeight, this, this.RestoreUIAfterTakePhoto
				);
			})
		
	}
	
	//继续留在这里，并且把ui重新显示出来
	private RestoreUIAfterTakePhoto(thisObj:CraftNoodle, shareSuccess:boolean){
		let cameraOutTime  = 1500;
		if (thisObj.CameraWhite){
			thisObj.CameraWhite.visible = true;
			egret.Tween.get(thisObj.CameraWhite)
				.to({alpha:0}, cameraOutTime, egret.Ease.quadOut)
				.call(()=>{
					if (thisObj.CameraWhite){
						thisObj.CameraWhite.parent.removeChild(thisObj.CameraWhite);
						thisObj.CameraWhite = null;
					}
				})
		}

		egret.Tween.get(thisObj.Group_UILayer)
			.to({alpha:1}, cameraOutTime, egret.Ease.quadOut)
			.call(()=>{
				thisObj.Button_ShareNoodle.enabled = 
				thisObj.Button_CraftDone.enabled = true;
			})
	}
	//去下一个场景或者继续留在这里
	private ToTestScene(thisObj:CraftNoodle, shareSuccess:boolean){
		thisObj.parent.addChild(new TestScene(thisObj.craftingRamen));
		thisObj.parent.removeChild(thisObj);
	}




	//下一步按钮
	private OnNextButtonClick(){
		if (this.canControl == false) return;

		switch(this.uiState){
			case CraftNoodleState.ChooseBowl:{
				if (this.craftingRamen.bowl){
					this.ChangeToState(CraftNoodleState.PutTare);	
					this.UpdateRamen();
				}
			}break;
			case CraftNoodleState.PutTare:{
				this.ChangeToState(CraftNoodleState.SoupToBroth);	
				this.UpdateRamen();
			}break;
			case CraftNoodleState.SoupToBroth:{
				if (this.craftingRamen.broth){
					this.ChangeToState(CraftNoodleState.Noodles);	
					this.UpdateRamen();
					//this.UpdateRamen(false, false, true);
				}
			}break;
			case CraftNoodleState.Noodles:{
				if (this.craftingRamen.noodles){
					this.ChangeToState(CraftNoodleState.SelectTopping);	
					this.UpdateRamen();
				}
			}break;
			case CraftNoodleState.SelectTopping:{
				this.UpdateRamen();
				this.ChangeToState(CraftNoodleState.ShowPhoto);
			}break;
			case CraftNoodleState.ShowPhoto:{

			}break;
		}
		
	}

	//上一步按钮
	private OnPrevButtonClick(){
		if (this.canControl == false) return;

		switch(this.uiState){
			case CraftNoodleState.PutTare:{
				this.ChangeToState(CraftNoodleState.ChooseBowl);
				//this.UpdateRamen(true, false, false);	
			}break;
			case CraftNoodleState.SoupToBroth:{
				this.ChangeToState(CraftNoodleState.PutTare);
				//this.UpdateRamen(false, true, false);
			}break;
			case CraftNoodleState.Noodles:{
				this.ChangeToState(CraftNoodleState.SoupToBroth);	
				//this.UpdateRamen(false, false, true);
			}break;
			case CraftNoodleState.SelectTopping:{
				this.ChangeToState(CraftNoodleState.Noodles);
				//this.UpdateRamen(false, false, false);	
			}break;
			case CraftNoodleState.ShowPhoto:{
				this.ChangeToState(CraftNoodleState.SelectTopping);
			}break;
		}
		
	}


	//计时器函数
	private Update(){
		switch(this.uiState){
			case CraftNoodleState.SelectTopping:{
				
			}break;
			case CraftNoodleState.PlaceTopping:{
				if (this.placingTool){
					this.placingTool.Update();
				}
			}break;
		}
		this.steamAnimUpdate();
	}

	//手指Tap事件
	private StagePointerTap(e:egret.TouchEvent){
		switch(this.uiState){
			case CraftNoodleState.PutTare:{
				let touchOne = this.craftingRamen.TouchedTare(
					e.stageX, e.stageY, this.ramenCenterX, this.ramenCenterY, true
				);
				if (touchOne){
					this.UpdateRamen();
				}
			}
			case CraftNoodleState.SelectTopping:{
				let touchOne = this.craftingRamen.TouchedTopping(
					e.stageX, e.stageY, this.ramenCenterX, this.ramenCenterY, true
				);
				if (touchOne){
					this.UpdateRamen();
					this.placingIngredient = touchOne;
					this.ChangeToState(CraftNoodleState.PlaceTopping);
				}
			}break;
			case CraftNoodleState.PlaceTopping:{
				
			}break;
		}
	}

	//手指按下事件
	private StagePointerDown(e:egret.TouchEvent){
		switch(this.uiState){
			case CraftNoodleState.SelectTopping:{

			}break;
			case CraftNoodleState.PlaceTopping:{
				if (this.placingIngImage && this.placingIngredient && this.placingIngredient.TouchOnMe(
					e.stageX, e.stageY, this.ramenCenterX, this.ramenCenterY
				) == true){
					this.draggingIng = true;
					this.pickingOffsetX = this.placingIngredient.x - e.stageX;
					this.pickingOffsetY = this.placingIngredient.y - e.stageY;
				}
			}break;
		}
	}

	//手指拖动
	private StagePointerMove(e:egret.TouchEvent){
		switch(this.uiState){
			case CraftNoodleState.SelectTopping:{

			}break;
			case CraftNoodleState.PlaceTopping:{
				if (this.draggingIng == true){
					this.placingIngredient.x = this.pickingOffsetX + e.stageX;
					this.placingIngredient.y = this.pickingOffsetY + e.stageY;
					this.placingIngredient.SetToImage(
						this.placingIngImage, this.ramenCenterX, this.ramenCenterY
					);
					this.PlacingToolSynchronize();
				}
			}break;
		}
	}

	//手指挪开
	private StagePointerUp(e:egret.TouchEvent){
		switch(this.uiState){
			case CraftNoodleState.SelectTopping:{
				
			}break;
			case CraftNoodleState.PlaceTopping:{
				this.draggingIng = false;
				this.PlacingToolSynchronize();
			}break;
		}
	}

	//按钮根据PlacingIngredient变化
	private PlacingToolSynchronize(){
		if (!this.placingIngredient || !this.placingTool) return;

		this.placingTool.SetOKButtonEnabled(this.craftingRamen.CanPlaceTopping(this.placingIngredient));
	}
	//根据尺寸等改变拖动中的食材的图形
	public RefreshPlacingIngredient(){
		if (this.placingIngredient){
			//this.placingIngredient.size = this.HSilider_Size.value * 0.25 + 0.5;
			if (this.placingIngImage){
				this.placingIngredient.SetToImage(
					this.placingIngImage, this.ramenCenterX, this.ramenCenterY
				);
			}
		}
	}
	//创造一个正在拖拽的图形
	private CreatePlacingIngImg(){
		if (this.placingIngImage) this.RemovePlacingIngImage();
		this.placingIngImage = this.placingIngredient.GatherImage(
			this.Group_GameLayer, this.ramenCenterX, this.ramenCenterY
		);
		if (this.placingTool){
			this.placingTool.SetIngredient(this.placingIngredient);
		}
	}
	//删除正在拖曳的图形和逻辑
	private RemovePlacingIngImage(){
		if (this.placingIngImage){
			if (this.placingIngImage.parent) this.placingIngImage.parent.removeChild(this.placingIngImage);
			this.placingIngImage = null;
		}
	}

	//把正在拖曳的变成正式的素材
	private PlaceIngredientToRamen(){
		if (!this.placingIngredient || !this.craftingRamen) return;
		this.craftingRamen.topping.push(this.placingIngredient.Clone());
		this.UpdateRamen();
	}

	/**
	 * 放下食材或者丢掉食材，然后切换状态回到SelectTopping
	 * @param {boolean} asDelete 是否当做删除，不当作删除就会放下
	 */
	public PlaceToppingDone(asDelete:boolean){
		if (asDelete == false){
			this.PlaceIngredientToRamen();
		}
		this.ChangeToState(CraftNoodleState.SelectTopping);
	}
	

	
	/**
	 * 切换状态
	 * @param {CraftNoodleState} toState 要切换到的状态
	 */
	private ChangeToState(toState:CraftNoodleState){
		this.canControl = false;
		egret.Tween.removeAllTweens();

		let animLen = 200 //inMS

		//初始化一些值
		if (this.uiState == CraftNoodleState.PlaceTopping){
			//如果是从摆放toppings退出
			this.draggingIng = false;
			this.RemovePlacingIngImage();
			this.placingIngredient = null;
			//退出所有界面元素
			egret.Tween.get(this.Group_IngBox)
				.to({y:this.stage.stageHeight + 600}, animLen, egret.Ease.quadOut);
			egret.Tween.get(this.Group_PlaceTool)
				.to({y:this.stage.stageHeight + 600}, animLen, egret.Ease.quadOut)
				.call(()=>{this._OnEnterState(toState);}, this);
		}else if (this.uiState == CraftNoodleState.ShowPhoto){
			//从拍照返回
			this.Group_PhotoHead.visible = false;
			egret.Tween.get(this.Group_PhotoMask)
				.to({alpha:0}, animLen, egret.Ease.quadOut);
			egret.Tween.get(this.Group_PhotoButtons)
				.to({y:this.stage.stageHeight + 600}, animLen, egret.Ease.quadOut)
				.call(()=>{this._OnEnterState(toState);}, this);
		}else if (this.uiState == CraftNoodleState.SelectTopping && toState == CraftNoodleState.PlaceTopping){
			//选择Topping离开，并前往PlaceTopping的话什么都不做
			egret.Tween.get(this.Group_IngBox)
				.to({y:this.stage.stageHeight + 600}, animLen, egret.Ease.quadOut)
				.call(()=>{this._OnEnterState(toState);}, this);
			egret.Tween.get(this.Group_PlaceTool)
				.to({y:this.stage.stageHeight + 600}, animLen, egret.Ease.quadOut);
		}else{
			this.ingredientIndex = 0; //其他状态离开的时候都要清除ingredientIndex
			egret.Tween.get(this.Group_IngBox)
				.to({y:this.stage.stageHeight + 600}, animLen, egret.Ease.quadOut)
				.call(()=>{this._OnEnterState(toState);}, this);
			egret.Tween.get(this.Group_PlaceTool)
				.to({y:this.stage.stageHeight + 600}, animLen, egret.Ease.quadOut);
		}


		//根据状态设置图标
		this.Img_Step0.scaleX = this.Img_Step0.scaleY = (this.uiState == CraftNoodleState.ChooseBowl) ? 1.2:1;
		this.Img_Step1.scaleX = this.Img_Step1.scaleY = (this.uiState == CraftNoodleState.PutTare) ? 1.2:1;
		this.Img_Step2.scaleX = this.Img_Step2.scaleY = (this.uiState == CraftNoodleState.SoupToBroth) ? 1.2:1;
		this.Img_Step3.scaleX = this.Img_Step3.scaleY = (this.uiState == CraftNoodleState.Noodles) ? 1.2:1;
		this.Img_Step4.scaleX = this.Img_Step4.scaleY = 
			(this.uiState == CraftNoodleState.SelectTopping || this.uiState == CraftNoodleState.PlaceTopping) ? 1.2:1;

		this.Img_Step0.visible =
		this.Img_Step1.visible = 
		this.Img_Step2.visible = 
		this.Img_Step3.visible = 
		this.Img_Step4.visible = toState != CraftNoodleState.ShowPhoto;

		this.Button_NextStep.enabled = 
		this.Button_NextStep.visible = (
			toState == CraftNoodleState.ChooseBowl ||
			toState == CraftNoodleState.Noodles ||
			toState == CraftNoodleState.SoupToBroth ||
			toState == CraftNoodleState.PutTare ||
			toState == CraftNoodleState.SelectTopping
		);

		this.Button_Handbook.visible = 
		this.Button_Handbook.enabled = (toState == CraftNoodleState.SelectTopping);

		this.Button_TareList.visible = 
		this.Button_TareList.enabled = (toState == CraftNoodleState.PutTare);
		if (toState == CraftNoodleState.PutTare) this.TareListButtonTextSynchronize();

		this.Group_Hint.visible = (toState != CraftNoodleState.ShowPhoto);

		
	}
	private _OnEnterState(toState:CraftNoodleState){
		egret.Tween.get(this.Img_Step0)
			.to({
				scaleX:(this.uiState == CraftNoodleState.ChooseBowl) ? 1.2:1,
				scaleY:(this.uiState == CraftNoodleState.ChooseBowl) ? 1.2:1
			})
		egret.Tween.get(this.Img_Step1)
			.to({
				scaleX:(this.uiState == CraftNoodleState.PutTare) ? 1.2:1,
				scaleY:(this.uiState == CraftNoodleState.PutTare) ? 1.2:1
			})
		egret.Tween.get(this.Img_Step2)
			.to({
				scaleX:(this.uiState == CraftNoodleState.SoupToBroth) ? 1.2:1,
				scaleY:(this.uiState == CraftNoodleState.SoupToBroth) ? 1.2:1
			})
		egret.Tween.get(this.Img_Step3)
			.to({
				scaleX:(this.uiState == CraftNoodleState.Noodles) ? 1.2:1,
				scaleY:(this.uiState == CraftNoodleState.Noodles) ? 1.2:1
			})
		egret.Tween.get(this.Img_Step4)
			.to({
				scaleX:(this.uiState == CraftNoodleState.SelectTopping || this.uiState == CraftNoodleState.PlaceTopping) ? 1.2:1,
				scaleY:(this.uiState == CraftNoodleState.SelectTopping || this.uiState == CraftNoodleState.PlaceTopping) ? 1.2:1
			})

		//同时进入新的状态
		let animLen = 200;
		switch (toState){
			case CraftNoodleState.ChooseBowl:{
				this.ResetBowlBox();
				egret.Tween.get(this.Group_IngBox)
					.to({y:this.stage.stageHeight}, animLen, egret.Ease.quadIn)
					.call(()=>{
						this.uiState = toState;
						this.canControl = true;
						this.GenerateHintText();
					},this);
			}break;
			case CraftNoodleState.PutTare:{
				this.ResetIngredientBox(IngredientUseType.UseType_Tare);
				egret.Tween.get(this.Group_IngBox)
					.to({y:this.stage.stageHeight}, animLen, egret.Ease.quadIn)
					.call(()=>{
						this.uiState = toState;
						this.canControl = true;
						this.GenerateHintText();
					},this);
			}break;
			case CraftNoodleState.SoupToBroth:{
				this.ResetBrothBox();
				egret.Tween.get(this.Group_IngBox)
					.to({y:this.stage.stageHeight}, animLen, egret.Ease.quadIn)
					.call(()=>{
						this.uiState = toState;
						this.canControl = true;
						this.GenerateHintText();
					},this);
			}break;
			case CraftNoodleState.Noodles:{
				this.ResetIngredientBox(IngredientUseType.UseType_Noodle);
				egret.Tween.get(this.Group_IngBox)
					.to({y:this.stage.stageHeight}, animLen, egret.Ease.quadIn)
					.call(()=>{
						this.uiState = toState;
						this.canControl = true;
						this.GenerateHintText();
					},this);
			}break;
			case CraftNoodleState.SelectTopping:{
				this.ResetIngredientBox(IngredientUseType.UseType_Topping);
				egret.Tween.get(this.Group_IngBox)
					.to({y:this.stage.stageHeight}, animLen, egret.Ease.quadIn)
					.call(()=>{
						this.uiState = toState;
						this.canControl = true;
						this.GenerateHintText();
					},this);
			}break;
			case CraftNoodleState.PlaceTopping:{
				this.draggingIng = false;
				this.CreatePlacingIngImg();
				this.PlacingToolSynchronize();
				egret.Tween.get(this.Group_PlaceTool)
					.to({y:this.stage.stageHeight - 520}, animLen, egret.Ease.quadOut)
					.call(()=>{
						this.uiState = toState;
						this.canControl = true;
						this.GenerateHintText();
					},this);
			}break;
			case CraftNoodleState.ShowPhoto:{
				this.Group_PhotoHead.visible =
				this.Group_PhotoMask.visible = 
				this.Group_PhotoButtons.visible = true;
				this.Group_PhotoMask.alpha = 0;
				egret.Tween.get(this.Group_PhotoMask)
					.to({alpha:1}, animLen, egret.Ease.quadOut);
				egret.Tween.get(this.Group_PhotoButtons)
					.to({y: this.Group_PhotoMask.y - this.Group_PhotoMask.anchorOffsetY + this.Group_PhotoMask.height + 80}, animLen, egret.Ease.quadOut)
					.call(()=>{
						this.uiState = toState;
						this.canControl = true;
					},this);
			}
		}

		//TODO 这里有未知bug，所以只能先这样凑个效果
		//bug:当进入placeTopping如果刷新，那么当前place的东西就会没了
		if (toState != CraftNoodleState.PlaceTopping){
			this.UpdateRamen();
		}else{
			
		}
	}

	//设置Hint文字 TODO文字应该根据拉面生成，目前是写死的。
	private GenerateHintText(){
		let t = "";
		switch (this.uiState){
			case CraftNoodleState.ChooseBowl:{
				t = "选个大大的碗吧，可以装多多的面条";
			}break;
			case CraftNoodleState.PutTare:{
				t = "做个什么味道为主的面呢？"
			}break;
			case CraftNoodleState.SoupToBroth:{
				t = "汤底可是面的灵魂啊！"
			}break;
			case CraftNoodleState.Noodles:{
				t = this.craftingRamen.broth.model.name + "作为汤底，真令人期待"
			}break;
			case CraftNoodleState.SelectTopping:{
				if (!this.craftingRamen.topping || this.craftingRamen.topping.length <= 0){
					t = "光面吃起来肯定没啥意思吧"
				}else{
					t = "看起来好像好好吃的样子"
				}
			}break;
			case CraftNoodleState.PlaceTopping:{
				if (this.placingIngredient){
					let rdes = ["新鲜的", "好吃的", "诱人的"]
					let rIndex = Math.min(Math.floor(Math.random() * rdes.length), rdes.length);
					t = rdes[rIndex] + this.placingIngredient.model.name + "，好期待";
				}else{
					t = "看起来好像好好吃的样子"
				}
				
			}break;
			
		}
		this.Label_HintText.text = t;
	}

	//根据当前tare数量给tarebutton改写text
	private TareListButtonTextSynchronize(){
		this.Button_TareList.label = 
			"调料清单\n(" + 
			this.craftingRamen.tare.length.toString() + "/" + 
			this.craftingRamen.bowl.model.tareLimit.toString() + ")"; //TODO 调味料最多6个
	}

	private ClearIngredientBoxes(){
		if (this.ingredientPage && this.ingredientPage.length > 0){
			for (let i = 0; i < this.ingredientPage.length; i++){
				if (this.ingredientPage[i] && this.ingredientPage[i].parent){
					this.ingredientPage[i].parent.removeChild(this.ingredientPage[i]);
				}
			}
		}
		this.ingredientPage = new Array<IngredientBox>();
	}

	/**
	 * 设置面碗盒子
	 */
	private ResetBowlBox(){
		this.ClearIngredientBoxes();

		let me = this;

		//先把所有的列出来了
		let selectedIndex = -1;
		let pageI:Array<Array<BowlModel>> = [new Array<BowlModel>()];
		let cgI:number = 0;
		for (let i = 0; i < playerInfo.unlockedBowl.length; i++){
			let bowl = playerInfo.unlockedBowl[i];
			if (pageI[cgI].length >= 12){
				//一页12个，超过了就Push新的一页
				pageI.push(new Array<BowlModel>());
				cgI = pageI.length - 1;
			}
			pageI[cgI].push(bowl);
		}
		
		//根据pageI制作所有的ingredientBox
		for (let i = 0; i < pageI.length; i++){
			let pis = new Array<IngredientIconInBox>();
			for (let j = 0; j < pageI[i].length; j++){
				pis.push(new IngredientIconInBox(
					pageI[i][j].id, pageI[i][j], pageI[i][j].Icon(), me, me.ClickOnIngredientIcon
				))
			}
			let ip = new IngredientBox(pis);
			this.ingredientPage.push(ip);
		}
		this.ChangeIngredientBoxPage(Math.min(this.ingredientIndex, pageI.length - 1));
	}

	/**
	 * 设置汤底盒子
	 */
	private ResetBrothBox(){
		this.ClearIngredientBoxes();

		let me = this;

		//先把所有的列出来了
		let selectedIndex = -1;
		let pageI:Array<Array<BrothModel>> = [new Array<BrothModel>()];
		let cgI:number = 0;
		for (let i = 0; i < playerInfo.unlockedBroth.length; i++){
			let broth = playerInfo.unlockedBroth[i];
			if (pageI[cgI].length >= 12){
				//一页12个，超过了就Push新的一页
				pageI.push(new Array<BrothModel>());
				cgI = pageI.length - 1;
			}
			pageI[cgI].push(broth.model);
		}
		
		//根据pageI制作所有的ingredientBox
		for (let i = 0; i < pageI.length; i++){
			let pis = new Array<IngredientIconInBox>();
			for (let j = 0; j < pageI[i].length; j++){
				let iInB = new IngredientIconInBox(
					pageI[i][j].id, pageI[i][j],
					this.craftingRamen.bowl.model.img, me, me.ClickOnIngredientIcon,
					pageI[i][j]
				)
				pis.push(iInB);
			}
			let ip = new IngredientBox(pis);
			this.ingredientPage.push(ip);
		}
		this.ChangeIngredientBoxPage(Math.min(this.ingredientIndex, pageI.length - 1));
	}

	/**
	 * 设置Ingredient盒子
	 * @param {IngredientUseType} type 要设置盒子的材料是什么类型的
	 */
	private ResetIngredientBox(type:IngredientUseType){
		this.ClearIngredientBoxes();

		let me = this;

		//先把所有的列出来了
		let pageI:Array<Array<IngredientModel>> = [new Array<IngredientModel>()];
		let cgI:number = 0;
		for (let i = 0; i < playerInfo.unlockedIngredients.length; i++){
			let ing = playerInfo.unlockedIngredients[i];
			if ((ing.model.canBeUsed & type) > 0 ){
				if (pageI[cgI].length >= 12){
					//一页12个，超过了就Push新的一页
					pageI.push(new Array<IngredientModel>());
					cgI = pageI.length - 1;
				}
				pageI[cgI].push(ing.model);
			}
		}
		
		//根据pageI制作所有的ingredientBox
		for (let i = 0; i < pageI.length; i++){
			let pis = new Array<IngredientIconInBox>();
			for (let j = 0; j < pageI[i].length; j++){
				let iInB = new IngredientIconInBox(
					pageI[i][j].id, pageI[i][j], pageI[i][j].icon, me, me.ClickOnIngredientIcon
				);
				pis.push(iInB);
			}
			let ip = new IngredientBox(pis);
			this.ingredientPage.push(ip);
		}
		this.ChangeIngredientBoxPage(this.ingredientIndex);
	}

	//切换到ingredientBox的index
	private ChangeIngredientBoxPage(toIndex:number){
		if (toIndex < 0 || toIndex >= this.ingredientPage.length) return;
		let centerX = this.stage.stageWidth / 2;
		if (toIndex == this.ingredientIndex){
			//就是当前页，判断没有parent，就添加到舞台
			if (!this.ingredientPage[toIndex].parent){
				this.Group_Box.addChild(this.ingredientPage[toIndex]);
			}
			this.ingredientPage[toIndex].x = centerX;
			this.ingredientPage[toIndex].y = this.Group_Box.height - 30;
			this.Button_PrevPage.visible = this.Button_PrevPage.enabled = toIndex > 0;
			this.Button_NextPage.visible = 
				this.Button_NextPage.enabled = toIndex < this.ingredientPage.length - 1;
		}else{
			//不是当前页，就翻页动画
			let leftX = centerX - this.stage.stageWidth;
			let rightX = centerX + this.stage.stageWidth;
			let fromRight = toIndex > this.ingredientIndex;
			this.Group_Box.addChild(this.ingredientPage[toIndex])
			this.ingredientPage[toIndex].x = fromRight == true ? rightX:leftX;
			this.ingredientPage[toIndex].y = this.Group_Box.height - 30;

			this.canControl = false;
			let cII = this.ingredientIndex
			let cip = this.ingredientPage[cII]
			this.Button_PrevPage.visible = this.Button_PrevPage.enabled = false;
			this.Button_NextPage.visible = this.Button_NextPage.enabled = false;
			egret.Tween.get(this.ingredientPage[cII])
				.to({x:(fromRight == true ? leftX:rightX)}, 200, egret.Ease.quadIn)
				.call(()=>{
					if (cip && cip.parent) cip.parent.removeChild(cip);
				});
			egret.Tween.get(this.ingredientPage[toIndex])
				.to({x:centerX}, 200, egret.Ease.quadIn)
				.call(()=>{
					this.ingredientIndex = toIndex;
					this.canControl = true;
					this.Button_PrevPage.visible = 
					this.Button_PrevPage.enabled = toIndex > 0;
					this.Button_NextPage.visible = 
					this.Button_NextPage.enabled = toIndex < this.ingredientPage.length - 1;
				})
		}
		
	}

	/**
	 * 调料盒子里的东西点击以后的效果函数
	 * @param {CraftNoodle} caller 约定的this
	 * @param {IngredientModel} ing 素材
	 */
	public ClickOnIngredientIcon(caller:CraftNoodle, ing:any){
		if (caller.canControl == false) return;
		switch (caller.uiState){
			case CraftNoodleState.ChooseBowl:{
				let bm = (ing as BowlModel)
				caller.craftingRamen.bowl = new BowlObj(bm);
				for (let i = 0; i < caller.ingredientPage.length; i++){
					caller.ingredientPage[i].SetSelect(bm.id);
				}
				caller.UpdateRamen();
			}break;
			case CraftNoodleState.PutTare:{
				if (!caller.craftingRamen.bowl) return;
				if (caller.craftingRamen.tare.length < caller.craftingRamen.bowl.model.tareLimit){
					let im = (ing as IngredientModel);
					let randomX = im.liquid == true ? 0 :(Math.random() * 200 - 100);
					let randomY = im.liquid == true ? 0 :(Math.random() * 200 - 100);
					if (im.liquid == true){
						caller.craftingRamen.tare.unshift(
							new IngredientObj(ing, randomX, randomY)
						);
					}else{
						caller.craftingRamen.tare.push(
							new IngredientObj(ing, randomX, randomY)
						);
					}
					caller.UpdateRamen();
					caller.TareListButtonTextSynchronize();
				}
			}break;
			case CraftNoodleState.SoupToBroth:{
				let bm = ing as BrothModel;
				caller.craftingRamen.broth = new BrothObj(bm);
				caller.UpdateRamen(true);
				for (let i = 0; i < caller.ingredientPage.length; i++){
					caller.ingredientPage[i].SetSelect(bm.id);
				}
				caller.canControl = true;
			}break;
			case CraftNoodleState.Noodles:{
				let nm = (ing as IngredientModel);
				caller.craftingRamen.noodles = new IngredientObj(
					nm,caller.ramenCenterX, caller.ramenCenterY
				);
				for (let i = 0; i < caller.ingredientPage.length; i++){
					caller.ingredientPage[i].SetSelect(nm.id);
				}
				caller.UpdateRamen();
			}break;
			case CraftNoodleState.SelectTopping:{
				caller.placingIngredient = new IngredientObj(ing, 0, caller.craftingRamen.bowl.model.radius);
				caller.ChangeToState(CraftNoodleState.PlaceTopping);
			}break;
		}
		caller.GenerateHintText();
	}
	

	/**
	 * 重新根据数据绘制一下拉面，正在拖曳的肯定不鸟他
	 * @param {boolean} doBrothAnim 是否要播放汤底冲开的画面
	 */
	private UpdateRamen(doBrothAnim:boolean = false){
		//先全部去掉
		this.Group_GameLayer.removeChildren();

		//根据状态确定要画什么
		let drawTare = false;
		let drawBroth = false;
		let drawBrothHL = false;
		let drawNoodle = false;
		let drawTopping = false;
		let drawSteam = false;

		let bowlChanged = false;
		let brothChanged = false;
		let noodleChanged = false;

		let steamYMod = 63;	//蒸汽往上移动这么多
		let steamFrameCount = 8;	//蒸汽8帧

		switch (this.uiState){
			case CraftNoodleState.ChooseBowl:{
				bowlChanged = true;
			}break;
			case CraftNoodleState.PutTare:{
				drawTare = true;
			}break;
			case CraftNoodleState.SoupToBroth:{
				drawTare = true;
				drawBroth = true;
				drawBrothHL = true;
				brothChanged = true;
				drawSteam = true;
			}break;
			case CraftNoodleState.Noodles:{
				drawBroth = true;
				drawBrothHL = !this.craftingRamen.noodles ;
				drawNoodle = true;
				noodleChanged = true;
				drawSteam = true;
			}break;
			case CraftNoodleState.SelectTopping:{
				drawBroth = true;
				drawNoodle = true;
				drawTopping = true;
				drawSteam = true;
			}break;
			case CraftNoodleState.PlaceTopping:{
				drawBroth = true;
				drawNoodle = true;
				drawTopping = true;
				drawSteam = true;
			}break;
		}

		//面碗
		if (this.craftingRamen.bowl){
			if (!this.bowlImage){
				this.bowlImage = new eui.Image(RES.getRes(this.craftingRamen.bowl.model.img));
			}else if (bowlChanged == true){
				this.bowlImage.source = RES.getRes(this.craftingRamen.bowl.model.img);
			}
			this.Group_GameLayer.addChild(this.bowlImage);
			this.bowlImage.anchorOffsetX = this.bowlImage.width / 2;
			this.bowlImage.anchorOffsetY = this.bowlImage.height / 2;
			this.bowlImage.x = this.ramenCenterX;
			this.bowlImage.y = this.ramenCenterY;
		}

		//着味
		if (drawTare == true){
			for (let i = 0; i < this.craftingRamen.tare.length; i++){
				let tp = this.craftingRamen.tare[i];
				let img = tp.GatherImage(this.Group_GameLayer, this.ramenCenterX, this.ramenCenterY);
			}
		}

		//汤底
		let brothAnimInTime = 350;	//in ms
		if (this.craftingRamen.broth && drawBroth == true){
			if (!this.brothImage || brothChanged == true){
				this.brothImage = this.craftingRamen.broth.model.ImageShape(
					this.ramenCenterX, this.ramenCenterY, this.craftingRamen.bowl.model.radius
				);
			}
			this.Group_GameLayer.addChild(this.brothImage);
			
			//如果是刷新，则需要
			if (doBrothAnim == true){
				this.brothImage.scaleX = this.brothImage.scaleY = 0;
				egret.Tween.removeTweens(this.brothImage);
				egret.Tween.get(this.brothImage)
					.to({scaleX:1, scaleY:1}, brothAnimInTime, egret.Ease.quadOut)
					.call(()=>{
						//broth highlight special
						if (!this.brothHighlight){
							this.brothHighlight = new eui.Image(RES.getRes(ResName_Broth_Highlight));
						}
						this.Group_GameLayer.addChild(this.brothHighlight);
						this.brothHighlight.anchorOffsetX = this.brothHighlight.width / 2;
						this.brothHighlight.anchorOffsetY = this.brothHighlight.height / 2;
						this.brothHighlight.x = this.ramenCenterX;
						this.brothHighlight.y = this.ramenCenterY;
						this.brothHighlight.alpha = 0;
						egret.Tween.removeTweens(this.brothHighlight);
						egret.Tween.get(this.brothHighlight)
							.to({alpha:1}, brothAnimInTime, egret.Ease.quadOut)

						//steam special
						if (this.steamImage == null){
							this.steamImage = new SpriteClip();
							let preloadKey = new Array<string>();
							for (let i = 0; i < steamFrameCount; i++){
								preloadKey.push("zhengqi_" + i.toString());
							}
							this.steamImage.SetPreloadTextureByKeys(preloadKey);
							this.steamImage.ChangeToPreloadTexture("zhengqi_0");
						}
						this.Group_GameLayer.addChild(this.steamImage);
						this.steamImage.anchorOffsetX = this.steamImage.width / 2;
						this.steamImage.anchorOffsetY = this.steamImage.height / 2;
						this.steamImage.scaleX = 2;
						this.steamImage.scaleY = 2;
						this.steamImage.x = this.ramenCenterX;
						this.steamImage.y = this.ramenCenterY - steamYMod;
						this.steamImage.alpha = 0;
						egret.Tween.removeTweens(this.steamImage);
						egret.Tween.get(this.steamImage)
							.to({alpha:1}, brothAnimInTime, egret.Ease.quadOut);

					});
			}
		}

		//汤上面的油光
		if (drawBrothHL == true && this.craftingRamen.broth && doBrothAnim == false){
			if (!this.brothHighlight){
				this.brothHighlight = new eui.Image(RES.getRes("broth_highlight"));
			}
			this.Group_GameLayer.addChild(this.brothHighlight);
			this.brothHighlight.anchorOffsetX = this.brothHighlight.width / 2;
			this.brothHighlight.anchorOffsetY = this.brothHighlight.height / 2;
			this.brothHighlight.x = this.ramenCenterX;
			this.brothHighlight.y = this.ramenCenterY;
			// if (brothChanged == true){
			// 	this.brothHighlight.scaleX = this.brothHighlight.scaleY = 0;
			// 	this.brothHighlight.alpha = 0;
			// 	egret.Tween.removeTweens(this.brothHighlight);
			// 	egret.Tween.get(this.brothHighlight)
			// 		.to({scaleX:1, scaleY:1, alpha:1}, brothAnimInTime, egret.Ease.quadOut);
			// }
		}
		

		//return;
		
		//面条
		if (this.craftingRamen.noodles && drawNoodle == true){
			this.noodleImage = this.craftingRamen.noodles.GatherImage(
				this.Group_GameLayer, this.ramenCenterX, this.ramenCenterY
			)
			this.Group_GameLayer.addChild(this.noodleImage);
			this.noodleImage.anchorOffsetX = this.noodleImage.width / 2;
			this.noodleImage.anchorOffsetY = this.noodleImage.height / 2;
			this.noodleImage.x = this.ramenCenterX;
			this.noodleImage.y = this.ramenCenterY;
		}

		let me = this;

		//Toppings
		if (drawTopping == true){
			for (let i = 0; i < this.craftingRamen.topping.length; i++){
				let tp = this.craftingRamen.topping[i];
				let img = tp.GatherImage(this.Group_GameLayer, this.ramenCenterX, this.ramenCenterY);
			}
		}
		
		//Steam
		if (drawSteam == true && this.craftingRamen.broth && doBrothAnim == false){
			if (this.steamImage == null){
				this.steamImage = new SpriteClip();
				let preloadKey = new Array<string>();
				for (let i = 0; i < steamFrameCount; i++){
					preloadKey.push("zhengqi_" + i.toString());
				}
				this.steamImage.SetPreloadTextureByKeys(preloadKey);
				this.steamImage.ChangeToPreloadTexture("zhengqi_0");
			}
			this.Group_GameLayer.addChild(this.steamImage);
			this.steamImage.anchorOffsetX = this.steamImage.width / 2;
			this.steamImage.anchorOffsetY = this.steamImage.height / 2;
			this.steamImage.scaleX = 2;
			this.steamImage.scaleY = 2;
			this.steamImage.x = this.ramenCenterX;
			this.steamImage.y = this.ramenCenterY - steamYMod;
		}

		this.GenerateHintText();
		
	}

	private steamAnimUpdate(){
		if (!this.steamImage) return;
		let steamFrameCount = 8;	
		this.steamFrameIndex = (this.steamFrameIndex + 1) % steamFrameCount;	//一共8帧
		this.steamImage.ChangeToPreloadTexture("zhengqi_"+this.steamFrameIndex.toString());
		this.steamImage.anchorOffsetX = this.steamImage.width / 2;
		this.steamImage.anchorOffsetY = this.steamImage.height / 2;
	}
}

