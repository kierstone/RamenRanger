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
var PlacingToolBox = (function (_super) {
    __extends(PlacingToolBox, _super);
    function PlacingToolBox(p) {
        var _this = _super.call(this) || this;
        _this.sizebarLength = 422;
        _this.sizebarTrackLen = 422 - 26; //可以拉动的区域宽度
        _this.sizebarTrackX = 13; //拉动区域相对于总长度的位置
        _this.sizebarPos = 0;
        _this.sizebarMin = -10;
        _this.sizebarMax = 10;
        _this.pullerOffX = 0;
        _this.pulling = false;
        _this.rotating = false;
        _this.rotateDegree = 0;
        _this.rotatePower = 0;
        _this.p = p;
        return _this;
    }
    PlacingToolBox.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    PlacingToolBox.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    PlacingToolBox.prototype.init = function () {
        var _this = this;
        //先填充图形
        this.Button_OK.icon = "ui_icon_ok";
        this.Button_Flip.icon = "ui_craft_icon_flip";
        this.SizeBar_Fill.mask = this.SizeBar_Mask;
        this.InitSizebarArea();
        this.Button_Reset.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.ingredient) {
                _this.ingredient.size = 1;
                _this.ingredient.rotation = 0;
                _this.ingredient.xFlip = false;
                _this.IngredientSizeToSizeBarValue();
                if (_this.p) {
                    _this.p.RefreshPlacingIngredient();
                }
            }
        }, this);
        this.Button_Flip.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.ingredient) {
                _this.ingredient.xFlip = !_this.ingredient.xFlip;
                if (_this.p) {
                    _this.p.RefreshPlacingIngredient();
                }
            }
        }, this);
        this.Button_OK.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.ingredient && _this.p) {
                _this.StopRotateIngredient();
                _this.p.PlaceToppingDone(false);
            }
        }, this);
        this.Button_Delete.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.ingredient && _this.p) {
                _this.StopRotateIngredient();
                _this.p.PlaceToppingDone(true);
            }
        }, this);
        // if (!this.rotateTimer){
        // 	this.rotateTimer = new egret.Timer(50);
        // 	this.rotateTimer.addEventListener(egret.TimerEvent.TIMER, this.DoingRotate, this);
        // 	this.rotateTimer.start();
        // }
        this.Button_RotateLeft.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            _this.StartRotateIngredient(false);
        }, this);
        this.Button_RotateLeft.addEventListener(egret.TouchEvent.TOUCH_END, this.StopRotateIngredient, this);
        this.Button_RotateLeft.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.StopRotateIngredient, this);
        this.Button_RotateRight.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            _this.StartRotateIngredient(true);
        }, this);
        this.Button_RotateRight.addEventListener(egret.TouchEvent.TOUCH_END, this.StopRotateIngredient, this);
        this.Button_RotateRight.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.StopRotateIngredient, this);
    };
    //初始化滑动块区域
    PlacingToolBox.prototype.InitSizebarArea = function () {
        var _this = this;
        this.Group_SizeBar.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            var pullerStageX = Utils.GetEuiScreenPos(_this.SizeBarPuller)["x"];
            if (Math.abs(e.stageX - pullerStageX) < 26) {
                //抓住了sizebar
                _this.pulling = true;
                _this.pullerOffX = _this.SizeBarPuller.x - e.stageX;
            }
            else {
            }
        }, this);
        this.Group_SizeBar.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (e) {
            if (_this.pulling == true) {
                var shouldX = e.stageX + _this.pullerOffX;
                _this.SizeBarPuller.x = Math.min(_this.sizebarTrackX + _this.sizebarTrackLen, Math.max(_this.sizebarTrackX, shouldX));
                _this.SetSizeBarPos(_this.GetValueBySizeBar());
                _this.SizeBarValueToIngredientSize();
            }
        }, this);
        this.Group_SizeBar.addEventListener(egret.TouchEvent.TOUCH_END, this.OnGroupSizeBarTouchOver, this);
        this.Group_SizeBar.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.OnGroupSizeBarTouchOver, this);
    };
    //拉杆结束时候
    PlacingToolBox.prototype.OnGroupSizeBarTouchOver = function (e) {
        if (this.pulling == true) {
            var shouldX = e.stageX + this.pullerOffX;
            this.SizeBarPuller.x = Math.min(this.sizebarTrackX + this.sizebarTrackLen, Math.max(this.sizebarTrackX, shouldX));
            this.SetSizeBarPos(this.GetValueBySizeBar());
            this.SizeBarValueToIngredientSize();
        }
    };
    //尺寸拉杆设定为多少值
    PlacingToolBox.prototype.SetSizeBarPos = function (toValue) {
        this.sizebarPos = Math.min(this.sizebarMax, Math.max(this.sizebarMin, toValue));
        var mLen = this.sizebarTrackLen;
        var mLeft = this.sizebarTrackX;
        this.SizeBarPuller.x = (this.sizebarPos - this.sizebarMin) / (this.sizebarMax - this.sizebarMin) * mLen + mLeft;
    };
    //根据尺寸拉杆位置获得值
    PlacingToolBox.prototype.GetValueBySizeBar = function () {
        var lx = this.SizeBarPuller.x - this.sizebarTrackX;
        this.sizebarPos = Math.round((lx / this.sizebarTrackLen) * (this.sizebarMax - this.sizebarMin) + this.sizebarMin);
        return this.sizebarPos;
    };
    //食材尺寸到拉杆位置
    PlacingToolBox.prototype.IngredientSizeToSizeBarValue = function () {
        if (!this.ingredient)
            return;
        var v = Math.round((this.ingredient.size - 1) * 20);
        v = Math.min(this.sizebarMax, Math.max(this.sizebarMin, v));
        this.SetSizeBarPos(v);
    };
    PlacingToolBox.prototype.SizeBarValueToIngredientSize = function () {
        var v = this.sizebarPos / 20;
        if (this.ingredient) {
            this.ingredient.size = 1 + v;
        }
        if (this.p) {
            this.p.RefreshPlacingIngredient();
        }
    };
    //停止旋转食材
    PlacingToolBox.prototype.StopRotateIngredient = function () {
        this.rotatePower = 0;
        this.rotateDegree = 0;
        this.rotating = false;
        if (this.p && this.ingredient) {
            this.p.RefreshPlacingIngredient();
        }
    };
    //开始旋转食材
    PlacingToolBox.prototype.StartRotateIngredient = function (degreePlus) {
        this.rotating = true;
        var basePower = 5;
        this.rotateDegree = basePower * (degreePlus == true ? 1 : -1);
        this.rotatePower = basePower;
        this.DoingRotate();
    };
    //正在旋转中
    PlacingToolBox.prototype.DoingRotate = function () {
        if (this.ingredient && this.rotating == true) {
            this.ingredient.rotation = (this.ingredient.rotation + 180 + this.rotateDegree) % 360 - 180;
            if (this.rotatePower < 90) {
                this.rotatePower *= 1.08; //每次+8%
            }
            else {
                this.rotatePower = 90;
            }
            var isNeg = this.rotateDegree < 0;
            this.rotateDegree = (Math.floor(this.rotatePower)) * (isNeg == false ? 1 : -1);
            if (this.p) {
                this.p.RefreshPlacingIngredient();
            }
        }
    };
    PlacingToolBox.prototype.Update = function () {
        this.DoingRotate();
    };
    //设置为ingredient服务
    PlacingToolBox.prototype.SetIngredient = function (ingredient) {
        this.ingredient = ingredient;
        if (this.ingredient) {
            this.Button_Reset.icon =
                this.Button_RotateLeft.icon =
                    this.Button_RotateRight.icon = this.ingredient.model.icon;
        }
        this.IngredientSizeToSizeBarValue();
    };
    //设置ok是否可用
    PlacingToolBox.prototype.SetOKButtonEnabled = function (enable) {
        this.Button_OK.enabled = enable;
    };
    return PlacingToolBox;
}(eui.Component));
__reflect(PlacingToolBox.prototype, "PlacingToolBox", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=PlacingToolBox.js.map