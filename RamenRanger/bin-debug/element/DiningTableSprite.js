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
var DiningTableSprite = (function (_super) {
    __extends(DiningTableSprite, _super);
    //TODO桌子信息等
    function DiningTableSprite() {
        var _this = _super.call(this) || this;
        _this.noodlePos = new egret.Point(0, 0);
        return _this;
    }
    DiningTableSprite.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    DiningTableSprite.prototype.init = function () {
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
    };
    DiningTableSprite.prototype.ResetZOrder = function () {
        if (this.chair)
            this.chair.zIndex = 0;
        if (this.body)
            this.body.zIndex = 1;
        if (this.table)
            this.table.zIndex = 2;
        if (this.ramen)
            this.ramen.zIndex = 3;
        if (this.head)
            this.head.zIndex = 4;
        if (this.eatingIngImg)
            this.eatingIngImg.zIndex = 5;
        this.sortChildren();
    };
    /**
     * 现在的角色从椅子上挪走
     */
    DiningTableSprite.prototype.RemoveCharacter = function () {
        if (this.body) {
            if (this.body.parent)
                this.body.parent.removeChild(this.body);
            this.body = null;
        }
        if (this.head) {
            if (this.head.parent)
                this.head.parent.removeChild(this.head);
            this.head = null;
        }
        if (this.emote) {
            if (this.emote.parent)
                this.emote.parent.removeChild(this.emote);
            this.emote = null;
        }
        this.chair.visible = false;
        if (this._cha) {
            this._cha.isSitting = false;
        }
        this._cha = null;
        this.eatGame = null;
    };
    /**
     * 让角色做到凳子上，TODO，现在凳子数据写死
     */
    DiningTableSprite.prototype.SetCharacterToSeat = function (cha) {
        this.RemoveCharacter();
        this.chair.visible = true;
        if (!cha)
            return;
        this._cha = cha;
        this._cha.SetPosition(0, -50);
        if (this._cha.body) {
            this.body = this._cha.body;
            this.addChild(this.body);
        }
        if (this._cha.head) {
            this.head = this._cha.head;
            this.addChild(this.head);
        }
        if (this._cha.emote) {
            this.emote = this._cha.emote;
            this.addChild(this.emote);
        }
        this._cha.isSitting = true;
        if (this._cha && this._ramen)
            this.eatGame = new EatingRamen(this._cha, this._ramen);
        this.ResetZOrder();
    };
    /**
     * 删除拉面
     */
    DiningTableSprite.prototype.RemoveRamen = function () {
        if (this.ramen) {
            if (this.ramen.parent)
                this.ramen.parent.removeChild(this.ramen);
            this.ramen = null;
            this._ramen = null;
        }
    };
    /**
     * 上拉面
     */
    DiningTableSprite.prototype.PlaceRamen = function (ramen) {
        this.RemoveRamen();
        if (!ramen)
            return;
        this._ramen = ramen;
        this.ramen = new RamenSprite(this._ramen);
        this.ramen.y = -24; //TODO 写死
        this.addChild(this.ramen);
        if (this._cha && this._ramen)
            this.eatGame = new EatingRamen(this._cha, this._ramen);
        this.ResetZOrder();
    };
    /**
     * 根据eatGame状态重绘一些图形
     */
    DiningTableSprite.prototype.RefreshByEatGame = function () {
        this.ramen.UpdateRamen();
        if (this.eatingIngImg && this.eatingIngImg.parent) {
            this.eatingIngImg.parent.removeChild(this.eatingIngImg);
        }
        this.eatingNoodle = this.eatGame.turnResult.isEatingNoodles;
        if (this.eatingNoodle == true) {
            //如果吃的是面条
            this.eatingIngImg = new eui.Image();
            this.eatingIngImg.source = RES.getRes("eating_noodle");
            this.addChild(this.eatingIngImg);
            this.eatingIngImg.anchorOffsetX = this.eatingIngImg.width / 2;
            this.eatingIngImg.anchorOffsetY = this.eatingIngImg.height;
            this.eatingIngImg.x = this.ramen.x;
            this.eatingIngImg.y = this.ramen.BrothOffsetY() + this.ramen.y;
            this.eatingIngImg.scaleY = 0;
            this.noodlePos.y = Number.MAX_VALUE; //重置面条的位置
        }
        else {
            //如果吃的是Toppings
            this.eatingIngImg = this.eatGame.turnResult.eatIngredient.GatherSceneImage(this, 0, 0);
            this.eatingIngImg.scaleY = 1;
        }
        this.eatingIngImg.visible = false;
        this.ResetZOrder();
    };
    DiningTableSprite.prototype.Update = function () {
        if (this._cha) {
            this._cha.Update();
            if (this.eatingIngImg) {
                var ingVisible = this.eatingNoodle == true ?
                    (this._cha.IsDoingAction(CharacterAction.Eat) && (this.eatingIngImg.visible == true || this._cha.hasIngredientPoint == true)) :
                    (this._cha.hasIngredientPoint == true); //否则看的是有没有数据点
                if (ingVisible == true) {
                    var chaPos = this._cha.GetPos();
                    if (this.eatingNoodle == false) {
                        //Topping跟着手的位置走
                        this.eatingIngImg.x = this._cha.ingredientPoint.x + chaPos.x;
                        this.eatingIngImg.y = this._cha.ingredientPoint.y + chaPos.y;
                    }
                    else {
                        //Noodle就拉伸
                        var noodleFlip = true; //是否要旋转面条
                        if (this._cha.hasIngredientPoint == true) {
                            this.noodlePos.x = this._cha.ingredientPoint.x + chaPos.x; //x坐标绝对信任
                            var noodlePosY = this._cha.ingredientPoint.y + chaPos.y;
                            if (noodlePosY < this.noodlePos.y) {
                                this.noodlePos.y = noodlePosY; //y取小的保持高度
                                noodleFlip = false; //还在拉伸，所以不要抽搐
                            }
                        }
                        this.eatingIngImg.x = this.noodlePos.x;
                        var noodleScaleY = (this.eatingIngImg.y - this.noodlePos.y) / this.eatingIngImg.height;
                        this.eatingIngImg.scaleY = this.eatingIngImg.height > 0 ? noodleScaleY : 0;
                        if (noodleFlip == true)
                            this.eatingIngImg.scaleX *= -1;
                    }
                }
                this.eatingIngImg.visible = ingVisible;
            }
        }
    };
    DiningTableSprite.prototype.FixedUpdate = function () {
        if (this._cha) {
            if (this._cha.FixedUpdate() == true) {
                this._cha.Update();
            }
        }
        if (this.eatGame) {
            if (this.eatGame.FixedUpdate() == true) {
                this.RefreshByEatGame();
            }
        }
        return false;
    };
    return DiningTableSprite;
}(SpriteGroup));
__reflect(DiningTableSprite.prototype, "DiningTableSprite");
//# sourceMappingURL=DiningTableSprite.js.map