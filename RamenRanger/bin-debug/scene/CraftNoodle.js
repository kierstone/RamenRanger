var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var CraftNoodle = (function (_super) {
    __extends(CraftNoodle, _super);
    function CraftNoodle() {
        var _this = _super.call(this) || this;
        _this.showingQuestList = false;
        _this.steamFrameIndex = 0;
        _this.canControl = false;
        _this.stepId = 0; //0=着味，1=配汤，2=选面，3=浇头
        _this.pickingOffsetX = 0;
        _this.pickingOffsetY = 0;
        _this.draggingIng = false;
        _this.ingredientIndex = 0;
        _this.orderRotateTopping = false;
        return _this;
    }
    CraftNoodle.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CraftNoodle.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    CraftNoodle.prototype.init = function () {
        var _this = this;
        this.NewGame();
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
        this.Button_NextPage.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.canControl == false)
                return;
            _this.ChangeIngredientBoxPage((_this.ingredientIndex <= _this.ingredientPage.length - 1) ?
                (_this.ingredientIndex + 1) : (_this.ingredientPage.length - 1));
        }, this);
        this.Button_PrevPage.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.canControl == false)
                return;
            _this.ChangeIngredientBoxPage(_this.ingredientIndex > 0 ?
                (_this.ingredientIndex - 1) : 0);
        }, this);
        //手册按钮
        this.Button_Handbook.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.canControl == false)
                return;
            _this.ShowQuestList();
        }, this);
        this.Button_CloseQuestList.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.canControl == false)
                return;
            _this.ShowHandBookButton();
        }, this);
        // this.Button_TareList.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
        // 	ShowCraftNoodleTareList(this, this.craftingRamen.tare, this.RemoveTareFromCraftingRamen)
        // },this);
        //下一步按钮
        this.Button_NextStep.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnNextButtonClick, this);
        //上一部
        this.Button_Prev.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnPrevButtonClick, this);
        var t = new egret.Timer(100);
        t.addEventListener(egret.TimerEvent.TIMER, function () {
            _this.Update();
        }, this);
        t.start();
    };
    CraftNoodle.prototype.NewGame = function () {
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
        //TODO 拉面的需求，现在写死
        this.questRequire = new RamenRequirement("做一碗带上海味道的重庆小面吧", [
            new RequiredSubject(new IngredientSubject("bean_product", "tofu", "venetian_pouch"), "ingredient_venetian_pouch", "上海味道就要百叶包"),
            new RequiredSubject(new IngredientSubject("bean_product", "tofu", "venetian_pouch"), "ingredient_venetian_pouch", "既然是双档就再来个百叶包")
        ], [], new RequiredBroth("broth1", "麻辣汤底是重庆小面的核心"));
        //先写死就是这个饭碗的数据
        this.craftingRamen = new RamenModel();
        //this.craftingRamen.broth = new BrothObj(playerInfo.getLearnedBroth("broth0"));
        this.ChangeToState(CraftNoodleState.ChooseBowl);
        this.UpdateRamen();
        //初始化需求列表
        this.InitQuestListItems();
        //照片界面内容初始化
        this.InitUserInfoToPhotoMask();
    };
    //显示条件列表
    CraftNoodle.prototype.ShowQuestList = function () {
        var _this = this;
        this.Group_QuestList.y = this.Button_Handbook.y;
        if (this.showingQuestList == true) {
            //已经显示了
            this.Button_Handbook.visible = false;
            this.Group_QuestList.scaleX =
                this.Group_QuestList.scaleY = 1;
            this.Group_QuestList.visible = true;
        }
        else {
            this.showingQuestList = true;
            egret.Tween.removeTweens(this.Button_Handbook);
            egret.Tween.removeTweens(this.Group_QuestList);
            this.canControl = false;
            egret.Tween.get(this.Button_Handbook)
                .to({ scaleX: 0, scaleY: 0 }, 100, egret.Ease.quadIn)
                .call(function () {
                _this.Button_Handbook.visible = false;
                _this.Group_QuestList.scaleX =
                    _this.Group_QuestList.scaleY = 0;
                _this.Group_QuestList.visible = true;
                egret.Tween.get(_this.Group_QuestList)
                    .to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.quadOut)
                    .call(function () {
                    _this._ShowQuestListItems();
                    _this.canControl = true;
                });
            });
        }
    };
    CraftNoodle.prototype._ShowQuestListItems = function () {
        this.Group_QuestItemList.visible = true;
        this.questRequire.CheckRamenFit(this.craftingRamen);
        for (var i = 0; i < this.questListItems.length; i++) {
            this.questListItems[i].RefreshDoneState();
        }
    };
    //初始化任务需求列表
    CraftNoodle.prototype.InitQuestListItems = function () {
        this.Group_QuestItemList.visible = false;
        this.Group_QuestItemList.removeChildren();
        this.questListItems = new Array();
        if (this.questRequire == null)
            return;
        if (this.questRequire.requireBroth) {
            var qr = new RamenQuest_RequirementListItem(this.questRequire.requireBroth, RamenRequirmentType.Broth);
            this.Group_QuestItemList.addChild(qr);
            this.questListItems.push(qr);
        }
        for (var i = 0; i < this.questRequire.requireSubject.length; i++) {
            var qr = new RamenQuest_RequirementListItem(this.questRequire.requireSubject[i], RamenRequirmentType.Subject);
            this.Group_QuestItemList.addChild(qr);
            this.questListItems.push(qr);
        }
        for (var i = 0; i < this.questRequire.requireMutual.length; i++) {
            var qr = new RamenQuest_RequirementListItem(this.questRequire.requireMutual[i], RamenRequirmentType.Mutual);
            this.Group_QuestItemList.addChild(qr);
            this.questListItems.push(qr);
        }
    };
    //显示手册按钮
    CraftNoodle.prototype.ShowHandBookButton = function () {
        var _this = this;
        if (this.showingQuestList == false) {
            this.Button_Handbook.visible = true;
            this.Button_Handbook.scaleX =
                this.Button_Handbook.scaleY = 1;
            this.Group_QuestList.visible =
                this.Group_QuestItemList.visible = false;
        }
        else {
            this.showingQuestList = false;
            egret.Tween.removeTweens(this.Button_Handbook);
            egret.Tween.removeTweens(this.Group_QuestList);
            this.canControl = false;
            egret.Tween.get(this.Group_QuestList)
                .to({ scaleX: 0, scaleY: 0 }, 200, egret.Ease.quadIn)
                .call(function () {
                _this.Button_Handbook.scaleX =
                    _this.Button_Handbook.scaleY = 0;
                _this.Button_Handbook.visible = true;
                egret.Tween.get(_this.Button_Handbook)
                    .to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.quadOut)
                    .call(function () {
                    _this.Group_QuestList.visible =
                        _this.Group_QuestItemList.visible = false;
                    _this.canControl = true;
                });
            });
        }
    };
    //根据当前showingQuestList情况自动判断应该显示什么
    CraftNoodle.prototype.ShowQuestUIItems = function (forceHide) {
        if (forceHide == true) {
            this.Button_Handbook.visible =
                this.Group_QuestList.visible = false;
            return;
        }
        this.Button_Handbook.visible = !this.showingQuestList;
        this.Button_Handbook.scaleX =
            this.Button_Handbook.scaleY = this.showingQuestList == true ? 0 : 1;
        this.Group_QuestList.visible =
            this.Group_QuestItemList.visible = this.showingQuestList;
        this.Group_QuestList.scaleX =
            this.Group_QuestList.scaleY = this.showingQuestList == true ? 1 : 0;
        if (this.showingQuestList == true)
            this._ShowQuestListItems();
    };
    //删除某个tare
    // private RemoveTareFromCraftingRamen(thisObj:CraftNoodle, tare:IngredientObj){
    // 	if (! thisObj.craftingRamen || !thisObj.craftingRamen.tare) return;
    // 	for (let i = 0; i < thisObj.craftingRamen.tare.length; i++){
    // 		if (tare == thisObj.craftingRamen.tare[i]){
    // 			thisObj.craftingRamen.tare.splice(i, 1);
    // 			thisObj.UpdateRamen(false);
    // 			thisObj.TareListButtonTextSynchronize();
    // 			return;
    // 		}
    // 	}
    // }
    //把用户信息写到photomask
    CraftNoodle.prototype.InitUserInfoToPhotoMask = function () {
        var _this = this;
        if (GameUserInfo) {
            this.Img_UserPortrait.source = GameUserInfo["avatarUrl"];
            this.Label_UserName.text = GameUserInfo["nickName"];
        }
        this.Button_ShareNoodle.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.TakePhotoAndShare();
        }, this);
        this.Button_CraftDone.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.ToTestScene(_this, false);
        }, this);
        this.Img_UserPortrait.mask = this.Mask_UserPortrait;
        this.Group_PhotoMask.x = this.ramenCenterX;
        this.Group_PhotoMask.y = this.ramenCenterY;
        this.Group_PhotoMask.visible =
            this.Group_PhotoButtons.visible =
                this.Group_PhotoHead.visible = false;
    };
    //把屏幕清空拍一张照片，然后分享
    CraftNoodle.prototype.TakePhotoAndShare = function () {
        var _this = this;
        console.log("Start Take Photo, gogogo");
        this.Button_ShareNoodle.enabled =
            this.Button_CraftDone.enabled = false;
        var cameraStartTime = 150;
        if (!this.CameraWhite) {
            this.CameraWhite = new eui.Rect(this.stage.stageWidth, this.stage.stageHeight, 0xFFFFFF);
            this.addChild(this.CameraWhite);
            this.CameraWhite.x = this.CameraWhite.y = 0;
            this.CameraWhite.alpha = 0;
            egret.Tween.get(this.CameraWhite).to({ alpha: 1 }, cameraStartTime, egret.Ease.cubicIn).call(function () {
                _this.CameraWhite.visible = false;
            });
        }
        egret.Tween.get(this.Group_UILayer)
            .to({ alpha: 0 }, cameraStartTime - 50, egret.Ease.quadIn)
            .wait(100)
            .call(function () {
            platform.shareGame("我就试试分享", _this.Rect_PhotoTaker.x - _this.Rect_PhotoTaker.anchorOffsetX, _this.Rect_PhotoTaker.y - _this.Rect_PhotoTaker.anchorOffsetY, _this.Rect_PhotoTaker.width, _this.Rect_PhotoTaker.height, _this.stage.stageWidth, _this.stage.stageHeight, _this, _this.RestoreUIAfterTakePhoto);
        });
    };
    //继续留在这里，并且把ui重新显示出来
    CraftNoodle.prototype.RestoreUIAfterTakePhoto = function (thisObj, shareSuccess) {
        var cameraOutTime = 1500;
        if (thisObj.CameraWhite) {
            thisObj.CameraWhite.visible = true;
            egret.Tween.get(thisObj.CameraWhite)
                .to({ alpha: 0 }, cameraOutTime, egret.Ease.quadOut)
                .call(function () {
                if (thisObj.CameraWhite) {
                    thisObj.CameraWhite.parent.removeChild(thisObj.CameraWhite);
                    thisObj.CameraWhite = null;
                }
            });
        }
        egret.Tween.get(thisObj.Group_UILayer)
            .to({ alpha: 1 }, cameraOutTime, egret.Ease.quadOut)
            .call(function () {
            thisObj.Button_ShareNoodle.enabled =
                thisObj.Button_CraftDone.enabled = true;
        });
    };
    //去下一个场景或者继续留在这里
    CraftNoodle.prototype.ToTestScene = function (thisObj, shareSuccess) {
        thisObj.parent.addChild(new TestScene(thisObj.craftingRamen));
        thisObj.parent.removeChild(thisObj);
    };
    //下一步按钮
    CraftNoodle.prototype.OnNextButtonClick = function () {
        if (this.canControl == false)
            return;
        switch (this.uiState) {
            case CraftNoodleState.ChooseBowl:
                {
                    if (this.craftingRamen.bowl) {
                        this.ChangeToState(CraftNoodleState.SoupToBroth);
                        this.UpdateRamen();
                    }
                }
                break;
            // case CraftNoodleState.PutTare:{
            // 	this.ChangeToState(CraftNoodleState.SoupToBroth);	
            // 	this.UpdateRamen();
            // }break;
            case CraftNoodleState.SoupToBroth:
                {
                    if (this.craftingRamen.broth) {
                        this.ChangeToState(CraftNoodleState.Noodles);
                        this.UpdateRamen();
                        //this.UpdateRamen(false, false, true);
                    }
                }
                break;
            case CraftNoodleState.Noodles:
                {
                    if (this.craftingRamen.noodles) {
                        this.ChangeToState(CraftNoodleState.SelectTopping);
                        this.UpdateRamen();
                    }
                }
                break;
            case CraftNoodleState.SelectTopping:
                {
                    this.UpdateRamen();
                    this.ChangeToState(CraftNoodleState.ShowPhoto);
                }
                break;
            case CraftNoodleState.ShowPhoto:
                {
                }
                break;
        }
    };
    //上一步按钮
    CraftNoodle.prototype.OnPrevButtonClick = function () {
        if (this.canControl == false)
            return;
        switch (this.uiState) {
            // case CraftNoodleState.PutTare:{
            // 	this.ChangeToState(CraftNoodleState.ChooseBowl);
            // 	//this.UpdateRamen(true, false, false);	
            // }break;
            case CraftNoodleState.SoupToBroth:
                {
                    this.ChangeToState(CraftNoodleState.ChooseBowl);
                    //this.UpdateRamen(false, true, false);
                }
                break;
            case CraftNoodleState.Noodles:
                {
                    this.ChangeToState(CraftNoodleState.SoupToBroth);
                    //this.UpdateRamen(false, false, true);
                }
                break;
            case CraftNoodleState.SelectTopping:
                {
                    this.ChangeToState(CraftNoodleState.Noodles);
                    //this.UpdateRamen(false, false, false);	
                }
                break;
            case CraftNoodleState.ShowPhoto:
                {
                    this.ChangeToState(CraftNoodleState.SelectTopping);
                }
                break;
        }
    };
    //计时器函数
    CraftNoodle.prototype.Update = function () {
        switch (this.uiState) {
            case CraftNoodleState.SelectTopping:
                {
                }
                break;
            case CraftNoodleState.PlaceTopping:
                {
                    if (this.placingTool) {
                        this.placingTool.Update();
                    }
                }
                break;
        }
        this.steamAnimUpdate();
    };
    //手指Tap事件
    CraftNoodle.prototype.StagePointerTap = function (e) {
        switch (this.uiState) {
            // case CraftNoodleState.PutTare:{
            // 	let touchOne = this.craftingRamen.TouchedTare(
            // 		e.stageX, e.stageY, this.ramenCenterX, this.ramenCenterY, true
            // 	);
            // 	if (touchOne){
            // 		this.UpdateRamen();
            // 	}
            // }break;
            case CraftNoodleState.SelectTopping:
                {
                    var touchOne = this.craftingRamen.TouchedTopping(e.stageX, e.stageY, this.ramenCenterX, this.ramenCenterY, true);
                    if (touchOne) {
                        this.UpdateRamen();
                        this.placingIngredient = touchOne;
                        this.ChangeToState(CraftNoodleState.PlaceTopping);
                    }
                }
                break;
            case CraftNoodleState.PlaceTopping:
                {
                }
                break;
        }
    };
    //手指按下事件
    CraftNoodle.prototype.StagePointerDown = function (e) {
        switch (this.uiState) {
            case CraftNoodleState.SelectTopping:
                {
                }
                break;
            case CraftNoodleState.PlaceTopping:
                {
                    if (this.placingIngImage && this.placingIngredient && this.placingIngredient.TouchOnMe(e.stageX, e.stageY, this.ramenCenterX, this.ramenCenterY) == true) {
                        this.draggingIng = true;
                        this.pickingOffsetX = this.placingIngredient.x - e.stageX;
                        this.pickingOffsetY = this.placingIngredient.y - e.stageY;
                    }
                }
                break;
        }
    };
    //手指拖动
    CraftNoodle.prototype.StagePointerMove = function (e) {
        switch (this.uiState) {
            case CraftNoodleState.SelectTopping:
                {
                }
                break;
            case CraftNoodleState.PlaceTopping:
                {
                    if (this.draggingIng == true) {
                        this.placingIngredient.x = this.pickingOffsetX + e.stageX;
                        this.placingIngredient.y = this.pickingOffsetY + e.stageY;
                        this.placingIngredient.SetToImage(this.placingIngImage, this.ramenCenterX, this.ramenCenterY);
                        this.PlacingToolSynchronize();
                    }
                }
                break;
        }
    };
    //手指挪开
    CraftNoodle.prototype.StagePointerUp = function (e) {
        switch (this.uiState) {
            case CraftNoodleState.SelectTopping:
                {
                }
                break;
            case CraftNoodleState.PlaceTopping:
                {
                    this.draggingIng = false;
                    this.PlacingToolSynchronize();
                }
                break;
        }
    };
    //按钮根据PlacingIngredient变化
    CraftNoodle.prototype.PlacingToolSynchronize = function () {
        if (!this.placingIngredient || !this.placingTool)
            return;
        this.placingTool.SetOKButtonEnabled(this.craftingRamen.CanPlaceTopping(this.placingIngredient));
    };
    //根据尺寸等改变拖动中的食材的图形
    CraftNoodle.prototype.RefreshPlacingIngredient = function () {
        if (this.placingIngredient) {
            //this.placingIngredient.size = this.HSilider_Size.value * 0.25 + 0.5;
            if (this.placingIngImage) {
                this.placingIngredient.SetToImage(this.placingIngImage, this.ramenCenterX, this.ramenCenterY);
            }
        }
    };
    //创造一个正在拖拽的图形
    CraftNoodle.prototype.CreatePlacingIngImg = function () {
        if (this.placingIngImage)
            this.RemovePlacingIngImage();
        this.placingIngImage = this.placingIngredient.GatherImage(this.Group_GameLayer, this.ramenCenterX, this.ramenCenterY);
        if (this.placingTool) {
            this.placingTool.SetIngredient(this.placingIngredient);
        }
    };
    //删除正在拖曳的图形和逻辑
    CraftNoodle.prototype.RemovePlacingIngImage = function () {
        if (this.placingIngImage) {
            if (this.placingIngImage.parent)
                this.placingIngImage.parent.removeChild(this.placingIngImage);
            this.placingIngImage = null;
        }
    };
    //把正在拖曳的变成正式的素材
    CraftNoodle.prototype.PlaceIngredientToRamen = function () {
        if (!this.placingIngredient || !this.craftingRamen)
            return;
        this.craftingRamen.topping.push(this.placingIngredient.Clone());
        this.UpdateRamen();
    };
    /**
     * 放下食材或者丢掉食材，然后切换状态回到SelectTopping
     * @param {boolean} asDelete 是否当做删除，不当作删除就会放下
     */
    CraftNoodle.prototype.PlaceToppingDone = function (asDelete) {
        if (asDelete == false) {
            this.PlaceIngredientToRamen();
        }
        this.ChangeToState(CraftNoodleState.SelectTopping);
        this._ShowQuestListItems();
    };
    /**
     * 切换状态
     * @param {CraftNoodleState} toState 要切换到的状态
     */
    CraftNoodle.prototype.ChangeToState = function (toState) {
        var _this = this;
        this.canControl = false;
        egret.Tween.removeAllTweens();
        var animLen = 200; //inMS
        //初始化一些值
        if (this.uiState == CraftNoodleState.PlaceTopping) {
            //如果是从摆放toppings退出
            this.draggingIng = false;
            this.RemovePlacingIngImage();
            this.placingIngredient = null;
            //退出所有界面元素
            egret.Tween.get(this.Group_IngBox)
                .to({ y: this.stage.stageHeight + 600 }, animLen, egret.Ease.quadOut);
            egret.Tween.get(this.Group_PlaceTool)
                .to({ y: this.stage.stageHeight + 600 }, animLen, egret.Ease.quadOut)
                .call(function () { _this._OnEnterState(toState); }, this);
        }
        else if (this.uiState == CraftNoodleState.ShowPhoto) {
            //从拍照返回
            this.Group_PhotoHead.visible = false;
            egret.Tween.get(this.Group_PhotoMask)
                .to({ alpha: 0 }, animLen, egret.Ease.quadOut);
            egret.Tween.get(this.Group_PhotoButtons)
                .to({ y: this.stage.stageHeight + 600 }, animLen, egret.Ease.quadOut)
                .call(function () { _this._OnEnterState(toState); }, this);
        }
        else if (this.uiState == CraftNoodleState.SelectTopping && toState == CraftNoodleState.PlaceTopping) {
            //选择Topping离开，并前往PlaceTopping的话什么都不做
            egret.Tween.get(this.Group_IngBox)
                .to({ y: this.stage.stageHeight + 600 }, animLen, egret.Ease.quadOut)
                .call(function () { _this._OnEnterState(toState); }, this);
            egret.Tween.get(this.Group_PlaceTool)
                .to({ y: this.stage.stageHeight + 600 }, animLen, egret.Ease.quadOut);
        }
        else {
            this.ingredientIndex = 0; //其他状态离开的时候都要清除ingredientIndex
            egret.Tween.get(this.Group_IngBox)
                .to({ y: this.stage.stageHeight + 600 }, animLen, egret.Ease.quadOut)
                .call(function () { _this._OnEnterState(toState); }, this);
            egret.Tween.get(this.Group_PlaceTool)
                .to({ y: this.stage.stageHeight + 600 }, animLen, egret.Ease.quadOut);
        }
        //根据状态设置图标
        this.Img_Step0.scaleX = this.Img_Step0.scaleY = (this.uiState == CraftNoodleState.ChooseBowl) ? 1.2 : 1;
        this.Img_Step1.scaleX = this.Img_Step1.scaleY = 1; //TODO remove this fucker sooner or later //(this.uiState == CraftNoodleState.PutTare) ? 1.2:1;
        this.Img_Step2.scaleX = this.Img_Step2.scaleY = (this.uiState == CraftNoodleState.SoupToBroth) ? 1.2 : 1;
        this.Img_Step3.scaleX = this.Img_Step3.scaleY = (this.uiState == CraftNoodleState.Noodles) ? 1.2 : 1;
        this.Img_Step4.scaleX = this.Img_Step4.scaleY =
            (this.uiState == CraftNoodleState.SelectTopping || this.uiState == CraftNoodleState.PlaceTopping) ? 1.2 : 1;
        this.Img_Step0.visible =
            this.Img_Step1.visible =
                this.Img_Step2.visible =
                    this.Img_Step3.visible =
                        this.Img_Step4.visible = toState != CraftNoodleState.ShowPhoto;
        this.Button_NextStep.enabled =
            this.Button_NextStep.visible = (toState == CraftNoodleState.ChooseBowl ||
                toState == CraftNoodleState.Noodles ||
                toState == CraftNoodleState.SoupToBroth ||
                toState == CraftNoodleState.SelectTopping);
        // this.Button_Handbook.visible = 
        // this.Button_Handbook.enabled = (toState == CraftNoodleState.SelectTopping);
        this.Button_TareList.visible =
            this.Button_TareList.enabled = false; //TODO remove this fucker sooner or later
        //if (toState == CraftNoodleState.PutTare) this.TareListButtonTextSynchronize();
        this.Group_Hint.visible = (toState != CraftNoodleState.ShowPhoto);
    };
    CraftNoodle.prototype._OnEnterState = function (toState) {
        var _this = this;
        //同时进入新的状态
        var animLen = 200;
        switch (toState) {
            case CraftNoodleState.ChooseBowl:
                {
                    this.ResetBowlBox();
                    egret.Tween.get(this.Group_IngBox)
                        .to({ y: this.stage.stageHeight }, animLen, egret.Ease.quadIn)
                        .call(function () {
                        //this.uiState = toState;
                        _this.canControl = true;
                        _this.GenerateHintText();
                    }, this);
                }
                break;
            // case CraftNoodleState.PutTare:{
            // 	this.ResetIngredientBox(IngredientUseType.UseType_Tare);
            // 	egret.Tween.get(this.Group_IngBox)
            // 		.to({y:this.stage.stageHeight}, animLen, egret.Ease.quadIn)
            // 		.call(()=>{
            // 			this.uiState = toState;
            // 			this.canControl = true;
            // 			this.GenerateHintText();
            // 		},this);
            // }break;
            case CraftNoodleState.SoupToBroth:
                {
                    this.ResetBrothBox();
                    egret.Tween.get(this.Group_IngBox)
                        .to({ y: this.stage.stageHeight }, animLen, egret.Ease.quadIn)
                        .call(function () {
                        //this.uiState = toState;
                        _this.canControl = true;
                        _this.GenerateHintText();
                    }, this);
                }
                break;
            case CraftNoodleState.Noodles:
                {
                    this.ResetIngredientBox(IngredientUseType.UseType_Noodle, this.craftingRamen.noodles);
                    egret.Tween.get(this.Group_IngBox)
                        .to({ y: this.stage.stageHeight }, animLen, egret.Ease.quadIn)
                        .call(function () {
                        //this.uiState = toState;
                        _this.canControl = true;
                        _this.GenerateHintText();
                    }, this);
                }
                break;
            case CraftNoodleState.SelectTopping:
                {
                    this.ResetIngredientBox(IngredientUseType.UseType_Topping, null);
                    egret.Tween.get(this.Group_IngBox)
                        .to({ y: this.stage.stageHeight }, animLen, egret.Ease.quadIn)
                        .call(function () {
                        //this.uiState = toState;
                        _this.canControl = true;
                        _this.GenerateHintText();
                    }, this);
                }
                break;
            case CraftNoodleState.PlaceTopping:
                {
                    this.draggingIng = false;
                    this.CreatePlacingIngImg();
                    this.PlacingToolSynchronize();
                    egret.Tween.get(this.Group_PlaceTool)
                        .to({ y: this.stage.stageHeight - 520 }, animLen, egret.Ease.quadOut)
                        .call(function () {
                        //this.uiState = toState;
                        _this.canControl = true;
                        _this.GenerateHintText();
                    }, this);
                }
                break;
            case CraftNoodleState.ShowPhoto: {
                this.Group_PhotoHead.visible =
                    this.Group_PhotoMask.visible =
                        this.Group_PhotoButtons.visible = true;
                this.Group_PhotoMask.alpha = 0;
                egret.Tween.get(this.Group_PhotoMask)
                    .to({ alpha: 1 }, animLen, egret.Ease.quadOut);
                egret.Tween.get(this.Group_PhotoButtons)
                    .to({ y: this.Group_PhotoMask.y - this.Group_PhotoMask.anchorOffsetY + this.Group_PhotoMask.height + 80 }, animLen, egret.Ease.quadOut)
                    .call(function () {
                    //this.uiState = toState;
                    _this.canControl = true;
                }, this);
            }
        }
        //改变状态
        this.uiState = toState;
        //TODO 这里有未知bug，所以只能先这样凑个效果
        //bug:当进入placeTopping如果刷新，那么当前place的东西就会没了
        if (toState != CraftNoodleState.PlaceTopping) {
            this.UpdateRamen();
        }
        else {
        }
        //小手册与任务
        this.ShowQuestUIItems(toState == CraftNoodleState.ShowPhoto);
        //上方小按钮表现
        egret.Tween.get(this.Img_Step0)
            .to({
            scaleX: (this.uiState == CraftNoodleState.ChooseBowl) ? 1.2 : 1,
            scaleY: (this.uiState == CraftNoodleState.ChooseBowl) ? 1.2 : 1
        });
        // egret.Tween.get(this.Img_Step1)
        // 	.to({
        // 		scaleX:1,//(this.uiState == CraftNoodleState.PutTare) ? 1.2:1,
        // 		scaleY:1//(this.uiState == CraftNoodleState.PutTare) ? 1.2:1
        // 	})
        egret.Tween.get(this.Img_Step2)
            .to({
            scaleX: (this.uiState == CraftNoodleState.SoupToBroth) ? 1.2 : 1,
            scaleY: (this.uiState == CraftNoodleState.SoupToBroth) ? 1.2 : 1
        });
        egret.Tween.get(this.Img_Step3)
            .to({
            scaleX: (this.uiState == CraftNoodleState.Noodles) ? 1.2 : 1,
            scaleY: (this.uiState == CraftNoodleState.Noodles) ? 1.2 : 1
        });
        egret.Tween.get(this.Img_Step4)
            .to({
            scaleX: (this.uiState == CraftNoodleState.SelectTopping || this.uiState == CraftNoodleState.PlaceTopping) ? 1.2 : 1,
            scaleY: (this.uiState == CraftNoodleState.SelectTopping || this.uiState == CraftNoodleState.PlaceTopping) ? 1.2 : 1
        });
    };
    //设置Hint文字 TODO文字应该根据拉面生成，目前是写死的。
    CraftNoodle.prototype.GenerateHintText = function () {
        var t = "";
        switch (this.uiState) {
            case CraftNoodleState.ChooseBowl:
                {
                    t = "选个大大的碗吧，可以装多多的面条";
                }
                break;
            // case CraftNoodleState.PutTare:{
            // 	t = "做个什么味道为主的面呢？"
            // }break;
            case CraftNoodleState.SoupToBroth:
                {
                    t = "汤底可是面的灵魂啊！";
                }
                break;
            case CraftNoodleState.Noodles:
                {
                    t = this.craftingRamen.broth.model.name + "作为汤底，真令人期待";
                }
                break;
            case CraftNoodleState.SelectTopping:
                {
                    if (!this.craftingRamen.topping || this.craftingRamen.topping.length <= 0) {
                        t = "光面吃起来肯定没啥意思吧";
                    }
                    else {
                        t = "看起来好像好好吃的样子";
                    }
                }
                break;
            case CraftNoodleState.PlaceTopping:
                {
                    if (this.placingIngredient) {
                        var rdes = ["新鲜的", "好吃的", "诱人的"];
                        var rIndex = Math.min(Math.floor(Math.random() * rdes.length), rdes.length);
                        t = rdes[rIndex] + this.placingIngredient.model.name + "，好期待";
                    }
                    else {
                        t = "看起来好像好好吃的样子";
                    }
                }
                break;
        }
        this.Label_HintText.text = t;
    };
    //根据当前tare数量给tarebutton改写text
    // private TareListButtonTextSynchronize(){
    // 	this.Button_TareList.label = 
    // 		"调料清单\n(" + 
    // 		this.craftingRamen.tare.length.toString() + "/" + 
    // 		this.craftingRamen.bowl.model.tareLimit.toString() + ")"; //TODO 调味料最多6个
    // }
    CraftNoodle.prototype.ClearIngredientBoxes = function () {
        if (this.ingredientPage && this.ingredientPage.length > 0) {
            for (var i = 0; i < this.ingredientPage.length; i++) {
                if (this.ingredientPage[i] && this.ingredientPage[i].parent) {
                    this.ingredientPage[i].parent.removeChild(this.ingredientPage[i]);
                }
            }
        }
        this.ingredientPage = new Array();
    };
    /**
     * 设置面碗盒子
     */
    CraftNoodle.prototype.ResetBowlBox = function () {
        this.ClearIngredientBoxes();
        var me = this;
        //先把所有的列出来了
        var selectedIndex = -1;
        var pageI = [new Array()];
        var cgI = 0;
        for (var i = 0; i < playerInfo.unlockedBowl.length; i++) {
            var bowl = playerInfo.unlockedBowl[i];
            if (pageI[cgI].length >= 12) {
                //一页12个，超过了就Push新的一页
                pageI.push(new Array());
                cgI = pageI.length - 1;
            }
            pageI[cgI].push(bowl);
        }
        //根据pageI制作所有的ingredientBox
        for (var i = 0; i < pageI.length; i++) {
            var pis = new Array();
            for (var j = 0; j < pageI[i].length; j++) {
                var sel = this.craftingRamen.bowl && this.craftingRamen.bowl.model.id == pageI[i][j].id;
                pis.push(new IngredientIconInBox(pageI[i][j].id, pageI[i][j], pageI[i][j].Icon(), sel, me, me.ClickOnIngredientIcon));
            }
            var ip = new IngredientBox(pis);
            this.ingredientPage.push(ip);
        }
        this.ChangeIngredientBoxPage(Math.min(this.ingredientIndex, pageI.length - 1));
    };
    /**
     * 设置汤底盒子
     */
    CraftNoodle.prototype.ResetBrothBox = function () {
        this.ClearIngredientBoxes();
        var me = this;
        //先把所有的列出来了
        var selectedIndex = -1;
        var pageI = [new Array()];
        var cgI = 0;
        for (var i = 0; i < playerInfo.unlockedBroth.length; i++) {
            var broth = playerInfo.unlockedBroth[i];
            if (pageI[cgI].length >= 12) {
                //一页12个，超过了就Push新的一页
                pageI.push(new Array());
                cgI = pageI.length - 1;
            }
            pageI[cgI].push(broth.model);
        }
        //根据pageI制作所有的ingredientBox
        for (var i = 0; i < pageI.length; i++) {
            var pis = new Array();
            for (var j = 0; j < pageI[i].length; j++) {
                var sel = this.craftingRamen.broth && this.craftingRamen.broth.model.id == pageI[i][j].id;
                var iInB = new IngredientIconInBox(pageI[i][j].id, pageI[i][j], this.craftingRamen.bowl.model.img, sel, me, me.ClickOnIngredientIcon, pageI[i][j]);
                pis.push(iInB);
            }
            var ip = new IngredientBox(pis);
            this.ingredientPage.push(ip);
        }
        this.ChangeIngredientBoxPage(Math.min(this.ingredientIndex, pageI.length - 1));
    };
    /**
     * 设置Ingredient盒子
     * @param {IngredientUseType} type 要设置盒子的材料是什么类型的
     * @param {IngredientObj} selectedOne 在返回的时候，因为已经有选中的，所以要显示一下钩子，可以是null，就不显示了
     */
    CraftNoodle.prototype.ResetIngredientBox = function (type, selectedOne) {
        this.ClearIngredientBoxes();
        var me = this;
        //先把所有的列出来了
        var pageI = [new Array()];
        var cgI = 0;
        for (var i = 0; i < playerInfo.unlockedIngredients.length; i++) {
            var ing = playerInfo.unlockedIngredients[i];
            if ((ing.model.canBeUsed & type) > 0) {
                if (pageI[cgI].length >= 12) {
                    //一页12个，超过了就Push新的一页
                    pageI.push(new Array());
                    cgI = pageI.length - 1;
                }
                pageI[cgI].push(ing.model);
            }
        }
        //根据pageI制作所有的ingredientBox
        for (var i = 0; i < pageI.length; i++) {
            var pis = new Array();
            for (var j = 0; j < pageI[i].length; j++) {
                var sel = selectedOne && selectedOne.model && pageI[i][j].id == selectedOne.model.id;
                var iInB = new IngredientIconInBox(pageI[i][j].id, pageI[i][j], pageI[i][j].icon, sel, me, me.ClickOnIngredientIcon);
                pis.push(iInB);
            }
            var ip = new IngredientBox(pis);
            this.ingredientPage.push(ip);
        }
        this.ChangeIngredientBoxPage(this.ingredientIndex);
    };
    //切换到ingredientBox的index
    CraftNoodle.prototype.ChangeIngredientBoxPage = function (toIndex) {
        var _this = this;
        if (toIndex < 0 || toIndex >= this.ingredientPage.length)
            return;
        var centerX = this.stage.stageWidth / 2;
        if (toIndex == this.ingredientIndex) {
            //就是当前页，判断没有parent，就添加到舞台
            if (!this.ingredientPage[toIndex].parent) {
                this.Group_Box.addChild(this.ingredientPage[toIndex]);
            }
            this.ingredientPage[toIndex].x = centerX;
            this.ingredientPage[toIndex].y = this.Group_Box.height - 30;
            this.Button_PrevPage.visible = this.Button_PrevPage.enabled = toIndex > 0;
            this.Button_NextPage.visible =
                this.Button_NextPage.enabled = toIndex < this.ingredientPage.length - 1;
        }
        else {
            //不是当前页，就翻页动画
            var leftX = centerX - this.stage.stageWidth;
            var rightX = centerX + this.stage.stageWidth;
            var fromRight = toIndex > this.ingredientIndex;
            this.Group_Box.addChild(this.ingredientPage[toIndex]);
            this.ingredientPage[toIndex].x = fromRight == true ? rightX : leftX;
            this.ingredientPage[toIndex].y = this.Group_Box.height - 30;
            this.canControl = false;
            var cII = this.ingredientIndex;
            var cip_1 = this.ingredientPage[cII];
            this.Button_PrevPage.visible = this.Button_PrevPage.enabled = false;
            this.Button_NextPage.visible = this.Button_NextPage.enabled = false;
            egret.Tween.get(this.ingredientPage[cII])
                .to({ x: (fromRight == true ? leftX : rightX) }, 200, egret.Ease.quadIn)
                .call(function () {
                if (cip_1 && cip_1.parent)
                    cip_1.parent.removeChild(cip_1);
            });
            egret.Tween.get(this.ingredientPage[toIndex])
                .to({ x: centerX }, 200, egret.Ease.quadIn)
                .call(function () {
                _this.ingredientIndex = toIndex;
                _this.canControl = true;
                _this.Button_PrevPage.visible =
                    _this.Button_PrevPage.enabled = toIndex > 0;
                _this.Button_NextPage.visible =
                    _this.Button_NextPage.enabled = toIndex < _this.ingredientPage.length - 1;
            });
        }
    };
    /**
     * 调料盒子里的东西点击以后的效果函数
     * @param {CraftNoodle} caller 约定的this
     * @param {IngredientModel} ing 素材
     */
    CraftNoodle.prototype.ClickOnIngredientIcon = function (caller, ing) {
        if (caller.canControl == false)
            return;
        switch (caller.uiState) {
            case CraftNoodleState.ChooseBowl:
                {
                    var bm = ing;
                    caller.craftingRamen.bowl = new BowlObj(bm);
                    for (var i = 0; i < caller.ingredientPage.length; i++) {
                        caller.ingredientPage[i].SetSelect(bm.id);
                    }
                    caller.UpdateRamen();
                }
                break;
            // case CraftNoodleState.PutTare:{
            // 	if (!caller.craftingRamen.bowl) return;
            // 	if (caller.craftingRamen.tare.length < caller.craftingRamen.bowl.model.tareLimit){
            // 		let im = (ing as IngredientModel);
            // 		let randomX = im.liquid == true ? 0 :(Math.random() * 200 - 100);
            // 		let randomY = im.liquid == true ? 0 :(Math.random() * 200 - 100);
            // 		if (im.liquid == true){
            // 			caller.craftingRamen.tare.unshift(
            // 				new IngredientObj(ing, randomX, randomY)
            // 			);
            // 		}else{
            // 			caller.craftingRamen.tare.push(
            // 				new IngredientObj(ing, randomX, randomY)
            // 			);
            // 		}
            // 		caller.UpdateRamen();
            // 		caller.TareListButtonTextSynchronize();
            // 	}
            // }break;
            case CraftNoodleState.SoupToBroth:
                {
                    var bm = ing;
                    caller.craftingRamen.broth = new BrothObj(bm);
                    caller.UpdateRamen(true);
                    for (var i = 0; i < caller.ingredientPage.length; i++) {
                        caller.ingredientPage[i].SetSelect(bm.id);
                    }
                    caller.canControl = true;
                }
                break;
            case CraftNoodleState.Noodles:
                {
                    var nm = ing;
                    caller.craftingRamen.noodles = new IngredientObj(nm, caller.ramenCenterX, caller.ramenCenterY);
                    for (var i = 0; i < caller.ingredientPage.length; i++) {
                        caller.ingredientPage[i].SetSelect(nm.id);
                    }
                    caller.UpdateRamen();
                }
                break;
            case CraftNoodleState.SelectTopping:
                {
                    caller.placingIngredient = new IngredientObj(ing, 0, caller.craftingRamen.bowl.model.radius);
                    caller.ChangeToState(CraftNoodleState.PlaceTopping);
                }
                break;
        }
        caller.GenerateHintText();
    };
    /**
     * 重新根据数据绘制一下拉面，正在拖曳的肯定不鸟他
     * @param {boolean} doBrothAnim 是否要播放汤底冲开的画面
     */
    CraftNoodle.prototype.UpdateRamen = function (doBrothAnim) {
        var _this = this;
        if (doBrothAnim === void 0) { doBrothAnim = false; }
        //先全部去掉
        this.Group_GameLayer.removeChildren();
        //根据状态确定要画什么
        //let drawTare = false;
        var drawBroth = false;
        var drawBrothHL = false;
        var drawNoodle = false;
        var drawTopping = false;
        var drawSteam = false;
        var bowlChanged = false;
        var brothChanged = false;
        var noodleChanged = false;
        var steamYMod = 63; //蒸汽往上移动这么多
        var steamFrameCount = 8; //蒸汽8帧
        switch (this.uiState) {
            case CraftNoodleState.ChooseBowl:
                {
                    bowlChanged = true;
                }
                break;
            // case CraftNoodleState.PutTare:{
            // 	drawTare = true;
            // }break;
            case CraftNoodleState.SoupToBroth:
                {
                    //drawTare = true;
                    drawBroth = true;
                    drawBrothHL = true;
                    brothChanged = true;
                    drawSteam = true;
                }
                break;
            case CraftNoodleState.Noodles:
                {
                    drawBroth = true;
                    drawBrothHL = !this.craftingRamen.noodles;
                    drawNoodle = true;
                    noodleChanged = true;
                    drawSteam = true;
                }
                break;
            case CraftNoodleState.SelectTopping:
                {
                    drawBroth = true;
                    drawNoodle = true;
                    drawTopping = true;
                    drawSteam = true;
                }
                break;
            case CraftNoodleState.PlaceTopping:
                {
                    drawBroth = true;
                    drawNoodle = true;
                    drawTopping = true;
                    drawSteam = true;
                }
                break;
            case CraftNoodleState.ShowPhoto:
                {
                    drawBroth = true;
                    drawNoodle = true;
                    drawTopping = true;
                    drawSteam = true;
                }
                break;
        }
        //面碗
        if (this.craftingRamen.bowl) {
            if (!this.bowlImage) {
                this.bowlImage = new eui.Image(RES.getRes(this.craftingRamen.bowl.model.img));
            }
            else if (bowlChanged == true) {
                this.bowlImage.source = RES.getRes(this.craftingRamen.bowl.model.img);
            }
            this.Group_GameLayer.addChild(this.bowlImage);
            this.bowlImage.anchorOffsetX = this.bowlImage.width / 2;
            this.bowlImage.anchorOffsetY = this.bowlImage.height / 2;
            this.bowlImage.x = this.ramenCenterX;
            this.bowlImage.y = this.ramenCenterY;
        }
        //着味
        // if (drawTare == true){
        // 	for (let i = 0; i < this.craftingRamen.tare.length; i++){
        // 		let tp = this.craftingRamen.tare[i];
        // 		let img = tp.GatherImage(this.Group_GameLayer, this.ramenCenterX, this.ramenCenterY);
        // 	}
        // }
        //汤底
        var brothAnimInTime = 350; //in ms
        if (this.craftingRamen.broth && drawBroth == true) {
            if (!this.brothImage || brothChanged == true) {
                this.brothImage = this.craftingRamen.broth.model.ImageShape(this.ramenCenterX, this.ramenCenterY, this.craftingRamen.bowl.model.radius);
            }
            this.Group_GameLayer.addChild(this.brothImage);
            //如果是刷新，则需要
            if (doBrothAnim == true) {
                this.brothImage.scaleX = this.brothImage.scaleY = 0;
                egret.Tween.removeTweens(this.brothImage);
                egret.Tween.get(this.brothImage)
                    .to({ scaleX: 1, scaleY: 1 }, brothAnimInTime, egret.Ease.quadOut)
                    .call(function () {
                    //broth highlight special
                    if (!_this.brothHighlight) {
                        _this.brothHighlight = new eui.Image(RES.getRes(ResName_Broth_Highlight));
                    }
                    _this.Group_GameLayer.addChild(_this.brothHighlight);
                    _this.brothHighlight.anchorOffsetX = _this.brothHighlight.width / 2;
                    _this.brothHighlight.anchorOffsetY = _this.brothHighlight.height / 2;
                    _this.brothHighlight.x = _this.ramenCenterX;
                    _this.brothHighlight.y = _this.ramenCenterY;
                    _this.brothHighlight.alpha = 0;
                    egret.Tween.removeTweens(_this.brothHighlight);
                    egret.Tween.get(_this.brothHighlight)
                        .to({ alpha: 1 }, brothAnimInTime, egret.Ease.quadOut);
                    //steam special
                    if (_this.steamImage == null) {
                        _this.steamImage = new SpriteClip();
                        var preloadKey = new Array();
                        for (var i = 0; i < steamFrameCount; i++) {
                            preloadKey.push("zhengqi_" + i.toString());
                        }
                        _this.steamImage.SetPreloadTextureByKeys(preloadKey);
                        _this.steamImage.ChangeToPreloadTexture("zhengqi_0");
                    }
                    _this.Group_GameLayer.addChild(_this.steamImage);
                    _this.steamImage.anchorOffsetX = _this.steamImage.width / 2;
                    _this.steamImage.anchorOffsetY = _this.steamImage.height / 2;
                    _this.steamImage.scaleX = 2;
                    _this.steamImage.scaleY = 2;
                    _this.steamImage.x = _this.ramenCenterX;
                    _this.steamImage.y = _this.ramenCenterY - steamYMod;
                    _this.steamImage.alpha = 0;
                    egret.Tween.removeTweens(_this.steamImage);
                    egret.Tween.get(_this.steamImage)
                        .to({ alpha: 1 }, brothAnimInTime, egret.Ease.quadOut);
                });
            }
        }
        //汤上面的油光
        if (drawBrothHL == true && this.craftingRamen.broth && doBrothAnim == false) {
            if (!this.brothHighlight) {
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
        if (this.craftingRamen.noodles && drawNoodle == true) {
            this.noodleImage = this.craftingRamen.noodles.GatherImage(this.Group_GameLayer, this.ramenCenterX, this.ramenCenterY);
            this.Group_GameLayer.addChild(this.noodleImage);
            this.noodleImage.anchorOffsetX = this.noodleImage.width / 2;
            this.noodleImage.anchorOffsetY = this.noodleImage.height / 2;
            this.noodleImage.x = this.ramenCenterX;
            this.noodleImage.y = this.ramenCenterY;
        }
        var me = this;
        //Toppings
        if (drawTopping == true) {
            for (var i = 0; i < this.craftingRamen.topping.length; i++) {
                var tp = this.craftingRamen.topping[i];
                var img = tp.GatherImage(this.Group_GameLayer, this.ramenCenterX, this.ramenCenterY);
            }
        }
        //Steam
        if (drawSteam == true && this.craftingRamen.broth && doBrothAnim == false) {
            if (this.steamImage == null) {
                this.steamImage = new SpriteClip();
                var preloadKey = new Array();
                for (var i = 0; i < steamFrameCount; i++) {
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
    };
    CraftNoodle.prototype.steamAnimUpdate = function () {
        if (!this.steamImage)
            return;
        var steamFrameCount = 8;
        this.steamFrameIndex = (this.steamFrameIndex + 1) % steamFrameCount; //一共8帧
        this.steamImage.ChangeToPreloadTexture("zhengqi_" + this.steamFrameIndex.toString());
        this.steamImage.anchorOffsetX = this.steamImage.width / 2;
        this.steamImage.anchorOffsetY = this.steamImage.height / 2;
    };
    return CraftNoodle;
}(eui.Component));
__reflect(CraftNoodle.prototype, "CraftNoodle", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=CraftNoodle.js.map