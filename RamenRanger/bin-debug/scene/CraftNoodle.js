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
        this.ramenCenterX = this.stage.stageWidth / 2;
        this.ramenCenterY = 500;
        this.Img_BKG.width = this.stage.stageWidth;
        this.Img_BKG.height = this.stage.stageHeight;
        this.Img_BottomBorder.y = this.stage.stageHeight;
        this.Group_IngBox.y = this.stage.stageHeight;
        //先写死就是这个饭碗的数据
        this.craftingRamen = new RamenModel();
        //this.craftingRamen.broth = new BrothObj(playerInfo.getLearnedBroth("broth0"));
        this.ChangeToState(CraftNoodleState.ChooseBowl);
        this.UpdateRamen();
        this.Group_UILayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.StagePointerDown, this);
        this.Group_UILayer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.StagePointerMove, this);
        this.Group_UILayer.addEventListener(egret.TouchEvent.TOUCH_END, this.StagePointerUp, this);
        this.Group_UILayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.StagePointerTap, this);
        //单个topping的工具组
        this.HSilider_Size.addEventListener(egret.Event.CHANGE, function () {
            if (_this.placingIngredient) {
                _this.placingIngredient.size = _this.HSilider_Size.value * 0.25 + 0.5;
                if (_this.placingIngImage) {
                    _this.placingIngredient.SetToImage(_this.placingIngImage, _this.ramenCenterX, _this.ramenCenterY);
                }
            }
        }, this);
        this.Button_Rotate.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            _this.orderRotateTopping = true;
        }, this);
        this.Button_Rotate.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            _this.orderRotateTopping = false;
        }, this);
        this.Button_Rotate.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () {
            _this.orderRotateTopping = false;
        }, this);
        this.Button_Rotate.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.orderRotateTopping == true) {
                if (_this.placingIngredient) {
                    _this.placingIngredient.rotation = (_this.placingIngredient.rotation + 182) % 360 - 180;
                    if (_this.placingIngImage) {
                        _this.placingIngredient.SetToImage(_this.placingIngImage, _this.ramenCenterX, _this.ramenCenterY);
                    }
                }
            }
        }, this);
        this.Button_Flip.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.placingIngredient) {
                _this.placingIngredient.xFlip = !_this.placingIngredient.xFlip;
                if (_this.placingIngImage) {
                    _this.placingIngredient.SetToImage(_this.placingIngImage, _this.ramenCenterX, _this.ramenCenterY);
                }
            }
        }, this);
        this.Button_Delete.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.uiState == CraftNoodleState.PlaceTopping)
                _this.ChangeToState(CraftNoodleState.SelectTopping);
        }, this);
        this.Button_OK.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.uiState == CraftNoodleState.PlaceTopping)
                _this.PlaceIngredientToRamen();
        }, this);
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
        //下一步按钮
        this.Button_NextStep.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnNextButtonClick, this);
        //上一部
        this.Button_Prev.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnPrevButtonClick, this);
        var t = new egret.Timer(50);
        t.addEventListener(egret.TimerEvent.TIMER, function () {
            _this.Update();
        }, this);
        t.start();
    };
    //下一步按钮
    CraftNoodle.prototype.OnNextButtonClick = function () {
        if (this.canControl == false)
            return;
        switch (this.uiState) {
            case CraftNoodleState.ChooseBowl:
                {
                    if (this.craftingRamen.bowl) {
                        this.ChangeToState(CraftNoodleState.PutTare);
                        this.UpdateRamen();
                    }
                }
                break;
            case CraftNoodleState.PutTare:
                {
                    this.ChangeToState(CraftNoodleState.SoupToBroth);
                    this.UpdateRamen();
                }
                break;
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
                    //TODO 现在先弄个ramenSpriteClip在200，200
                    this.parent.addChild(new TestScene(this.craftingRamen));
                    this.parent.removeChild(this);
                }
                break;
        }
    };
    //上一步按钮
    CraftNoodle.prototype.OnPrevButtonClick = function () {
        if (this.canControl == false)
            return;
        switch (this.uiState) {
            case CraftNoodleState.PutTare:
                {
                    this.ChangeToState(CraftNoodleState.ChooseBowl);
                    //this.UpdateRamen(true, false, false);	
                }
                break;
            case CraftNoodleState.SoupToBroth:
                {
                    this.ChangeToState(CraftNoodleState.PutTare);
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
        }
    };
    //计时器函数
    CraftNoodle.prototype.Update = function () {
        switch (this.uiState) {
            case CraftNoodleState.PlaceTopping:
                {
                    //按住旋转按钮就会一直转
                    if (this.orderRotateTopping == true) {
                        if (this.placingIngredient) {
                            this.placingIngredient.rotation = (this.placingIngredient.rotation + 182) % 360 - 180;
                            if (this.placingIngImage) {
                                this.placingIngredient.SetToImage(this.placingIngImage, this.ramenCenterX, this.ramenCenterY);
                            }
                        }
                    }
                }
                break;
        }
    };
    //手指Tap事件
    CraftNoodle.prototype.StagePointerTap = function (e) {
        switch (this.uiState) {
            case CraftNoodleState.PutTare: {
                var touchOne = this.craftingRamen.TouchedTare(e.stageX, e.stageY, this.ramenCenterX, this.ramenCenterY, true);
                if (touchOne) {
                    this.UpdateRamen();
                }
            }
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
        if (!this.placingIngredient)
            return;
        this.Button_OK.enabled = this.craftingRamen.CanPlaceTopping(this.placingIngredient);
    };
    //创造一个正在拖拽的图形
    CraftNoodle.prototype.CreatePlacingIngImg = function () {
        if (this.placingIngImage)
            this.RemovePlacingIngImage();
        this.placingIngImage = this.placingIngredient.GatherImage(this.Group_GameLayer, this.ramenCenterX, this.ramenCenterY);
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
        this.ChangeToState(CraftNoodleState.SelectTopping);
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
                .call(function () { _this._OnEnterState(toState); });
        }
        else if (this.uiState == CraftNoodleState.SelectTopping) {
            //选择Topping离开的话什么都不做
            egret.Tween.get(this.Group_IngBox)
                .to({ y: this.stage.stageHeight + 600 }, animLen, egret.Ease.quadOut)
                .call(function () { _this._OnEnterState(toState); });
            egret.Tween.get(this.Group_PlaceTool)
                .to({ y: this.stage.stageHeight + 600 }, animLen, egret.Ease.quadOut);
        }
        else {
            this.ingredientIndex = 0; //其他状态离开的时候都要清除ingredientIndex
            egret.Tween.get(this.Group_IngBox)
                .to({ y: this.stage.stageHeight + 600 }, animLen, egret.Ease.quadOut)
                .call(function () { _this._OnEnterState(toState); });
            egret.Tween.get(this.Group_PlaceTool)
                .to({ y: this.stage.stageHeight + 600 }, animLen, egret.Ease.quadOut);
        }
        this.uiState = toState;
        //根据状态设置图标
        this.Img_Step0.scaleX = this.Img_Step0.scaleY = (this.uiState == CraftNoodleState.ChooseBowl) ? 1.2 : 1;
        this.Img_Step1.scaleX = this.Img_Step1.scaleY = (this.uiState == CraftNoodleState.PutTare) ? 1.2 : 1;
        this.Img_Step2.scaleX = this.Img_Step2.scaleY = (this.uiState == CraftNoodleState.SoupToBroth) ? 1.2 : 1;
        this.Img_Step3.scaleX = this.Img_Step3.scaleY = (this.uiState == CraftNoodleState.Noodles) ? 1.2 : 1;
        this.Img_Step4.scaleX = this.Img_Step4.scaleY =
            (this.uiState == CraftNoodleState.SelectTopping || this.uiState == CraftNoodleState.PlaceTopping) ? 1.2 : 1;
    };
    CraftNoodle.prototype._OnEnterState = function (toState) {
        var _this = this;
        egret.Tween.get(this.Img_Step0)
            .to({
            scaleX: (this.uiState == CraftNoodleState.ChooseBowl) ? 1.2 : 1,
            scaleY: (this.uiState == CraftNoodleState.ChooseBowl) ? 1.2 : 1
        });
        egret.Tween.get(this.Img_Step1)
            .to({
            scaleX: (this.uiState == CraftNoodleState.PutTare) ? 1.2 : 1,
            scaleY: (this.uiState == CraftNoodleState.PutTare) ? 1.2 : 1
        });
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
        //同时进入新的状态
        switch (toState) {
            case CraftNoodleState.ChooseBowl:
                {
                    this.ResetBowlBox();
                    egret.Tween.get(this.Group_IngBox)
                        .to({ y: this.stage.stageHeight }, 200, egret.Ease.quadIn)
                        .call(function () {
                        _this.canControl = true;
                    }, this);
                }
                break;
            case CraftNoodleState.PutTare:
                {
                    this.ResetIngredientBox(IngredientUseType.UseType_Tare);
                    egret.Tween.get(this.Group_IngBox)
                        .to({ y: this.stage.stageHeight }, 200, egret.Ease.quadIn)
                        .call(function () {
                        _this.canControl = true;
                    }, this);
                }
                break;
            case CraftNoodleState.SoupToBroth:
                {
                    this.ResetBrothBox();
                    egret.Tween.get(this.Group_IngBox)
                        .to({ y: this.stage.stageHeight }, 200, egret.Ease.quadIn)
                        .call(function () {
                        _this.canControl = true;
                    }, this);
                }
                break;
            case CraftNoodleState.Noodles:
                {
                    this.ResetIngredientBox(IngredientUseType.UseType_Noodle);
                    egret.Tween.get(this.Group_IngBox)
                        .to({ y: this.stage.stageHeight }, 200, egret.Ease.quadIn)
                        .call(function () {
                        _this.canControl = true;
                    }, this);
                }
                break;
            case CraftNoodleState.SelectTopping:
                {
                    this.ResetIngredientBox(IngredientUseType.UseType_Topping);
                    egret.Tween.get(this.Group_IngBox)
                        .to({ y: this.stage.stageHeight }, 200, egret.Ease.quadIn)
                        .call(function () {
                        _this.canControl = true;
                    }, this);
                }
                break;
            case CraftNoodleState.PlaceTopping:
                {
                    this.draggingIng = false;
                    this.CreatePlacingIngImg();
                    this.HSilider_Size.value = Math.floor((this.placingIngredient.size - 0.5) / 0.25);
                    this.PlacingToolSynchronize();
                    egret.Tween.get(this.Group_PlaceTool)
                        .to({ y: this.stage.stageHeight - 500 }, 200, egret.Ease.quadOut)
                        .call(function () {
                        _this.uiState = CraftNoodleState.PlaceTopping;
                        _this.canControl = true;
                    }, this);
                }
                break;
        }
        if (this.uiState != CraftNoodleState.PlaceTopping)
            this.UpdateRamen();
    };
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
                pis.push(new IngredientIconInBox(pageI[i][j].id, pageI[i][j], pageI[i][j].Icon(), me, me.ClickOnIngredientIcon));
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
            pageI[cgI].push(broth);
        }
        //根据pageI制作所有的ingredientBox
        for (var i = 0; i < pageI.length; i++) {
            var pis = new Array();
            for (var j = 0; j < pageI[i].length; j++) {
                var iInB = new IngredientIconInBox(pageI[i][j].id, pageI[i][j], this.craftingRamen.bowl.model.img, me, me.ClickOnIngredientIcon, pageI[i][j]);
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
     */
    CraftNoodle.prototype.ResetIngredientBox = function (type) {
        this.ClearIngredientBoxes();
        var me = this;
        //先把所有的列出来了
        var pageI = [new Array()];
        var cgI = 0;
        for (var i = 0; i < playerInfo.unlockedIngredients.length; i++) {
            var ing = playerInfo.unlockedIngredients[i];
            if ((ing.canBeUsed & type) > 0) {
                if (pageI[cgI].length >= 12) {
                    //一页12个，超过了就Push新的一页
                    pageI.push(new Array());
                    cgI = pageI.length - 1;
                }
                pageI[cgI].push(ing);
            }
        }
        //根据pageI制作所有的ingredientBox
        for (var i = 0; i < pageI.length; i++) {
            var pis = new Array();
            for (var j = 0; j < pageI[i].length; j++) {
                var iInB = new IngredientIconInBox(pageI[i][j].id, pageI[i][j], pageI[i][j].icon, me, me.ClickOnIngredientIcon);
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
                    caller.craftingRamen.bowl = new BowlObj(ing);
                    caller.UpdateRamen();
                }
                break;
            case CraftNoodleState.PutTare:
                {
                    if (!caller.craftingRamen.bowl)
                        return;
                    if (caller.craftingRamen.tare.length < caller.craftingRamen.bowl.model.tareLimit) {
                        var im = ing;
                        var randomX = im.liquid == true ? 0 : (Math.random() * 200 - 100);
                        var randomY = im.liquid == true ? 0 : (Math.random() * 200 - 100);
                        if (im.liquid == true) {
                            caller.craftingRamen.tare.unshift(new IngredientObj(ing, randomX, randomY));
                        }
                        else {
                            caller.craftingRamen.tare.push(new IngredientObj(ing, randomX, randomY));
                        }
                        caller.UpdateRamen();
                    }
                }
                break;
            case CraftNoodleState.SoupToBroth:
                {
                    caller.craftingRamen.broth = new BrothObj(ing);
                    caller.UpdateRamen(true);
                    //TODO 选中还没
                    caller.canControl = true;
                }
                break;
            case CraftNoodleState.Noodles:
                {
                    caller.craftingRamen.noodles = new IngredientObj(ing, this.ramenCenterX, this.ramenCenterY);
                    caller.UpdateRamen();
                }
                break;
            case CraftNoodleState.SelectTopping:
                {
                    caller.placingIngredient = new IngredientObj(ing, 0, 400);
                    caller.ChangeToState(CraftNoodleState.PlaceTopping);
                }
                break;
        }
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
        var drawTare = false;
        var drawBroth = false;
        var drawBrothHL = false;
        var drawNoodle = false;
        var drawTopping = false;
        var bowlChanged = false;
        var brothChanged = false;
        var noodleChanged = false;
        switch (this.uiState) {
            case CraftNoodleState.ChooseBowl:
                {
                    bowlChanged = true;
                }
                break;
            case CraftNoodleState.PutTare:
                {
                    drawTare = true;
                }
                break;
            case CraftNoodleState.SoupToBroth:
                {
                    drawTare = true;
                    drawBroth = true;
                    drawBrothHL = true;
                    brothChanged = true;
                }
                break;
            case CraftNoodleState.Noodles:
                {
                    drawBroth = true;
                    drawBrothHL = !this.craftingRamen.noodles;
                    drawNoodle = true;
                    noodleChanged = true;
                }
                break;
            case CraftNoodleState.SelectTopping:
                {
                    drawBroth = true;
                    drawNoodle = true;
                    drawTopping = true;
                }
                break;
            case CraftNoodleState.PlaceTopping:
                {
                    drawBroth = true;
                    drawNoodle = true;
                    drawTopping = true;
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
        if (drawTare == true) {
            for (var i = 0; i < this.craftingRamen.tare.length; i++) {
                var tp = this.craftingRamen.tare[i];
                var img = tp.GatherImage(this.Group_GameLayer, this.ramenCenterX, this.ramenCenterY);
            }
        }
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
    };
    return CraftNoodle;
}(eui.Component));
__reflect(CraftNoodle.prototype, "CraftNoodle", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=CraftNoodle.js.map