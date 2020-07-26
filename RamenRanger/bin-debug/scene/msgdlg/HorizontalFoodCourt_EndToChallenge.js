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
var HorizontalFoodCourt_EndToChallenge = (function (_super) {
    __extends(HorizontalFoodCourt_EndToChallenge, _super);
    function HorizontalFoodCourt_EndToChallenge(caller, ingExp) {
        var _this = _super.call(this) || this;
        _this.caller = caller;
        _this.ingExp = ingExp;
        return _this;
    }
    HorizontalFoodCourt_EndToChallenge.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    HorizontalFoodCourt_EndToChallenge.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    HorizontalFoodCourt_EndToChallenge.prototype.init = function () {
        var _this = this;
        //TODO 拉面的需求，现在写死
        this.questRequire = new RamenRequirement("做一碗带上海味道的重庆小面吧", [
            new RequiredSubject(new IngredientSubject("bean_product", "tofu", "venetian_pouch"), "ingredient_venetian_pouch", "上海味道就要百叶包"),
            new RequiredSubject(new IngredientSubject("bean_product", "tofu", "venetian_pouch"), "ingredient_venetian_pouch", "既然是双档就再来个百叶包")
        ], [], new RequiredBroth("broth1", "麻辣汤底是重庆小面的核心"));
        //显示经验
        for (var i = 0; i < this.ingExp.length; i++) {
            this.Group_IngExp.addChild(this.ingExp[i]);
        }
        //显示任务需求
        if (this.questRequire.requireBroth) {
            var qr = new FoodCourt_QuestListItem(this.questRequire.requireBroth, RamenRequirmentType.Broth);
            this.Group_Quest.addChild(qr);
        }
        for (var i = 0; i < this.questRequire.requireSubject.length; i++) {
            var qr = new FoodCourt_QuestListItem(this.questRequire.requireSubject[i], RamenRequirmentType.Subject);
            this.Group_Quest.addChild(qr);
        }
        for (var i = 0; i < this.questRequire.requireMutual.length; i++) {
            var qr = new FoodCourt_QuestListItem(this.questRequire.requireMutual[i], RamenRequirmentType.Mutual);
            this.Group_Quest.addChild(qr);
        }
        //开始按钮
        this.Button_Start.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.caller && _this.caller.parent) {
                _this.caller.parent.removeChild(_this.caller);
            }
            Utils.UIRoot.addChild(new CraftNoodle());
            _this.parent.removeChild(_this);
        }, this);
    };
    return HorizontalFoodCourt_EndToChallenge;
}(eui.Component));
__reflect(HorizontalFoodCourt_EndToChallenge.prototype, "HorizontalFoodCourt_EndToChallenge", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=HorizontalFoodCourt_EndToChallenge.js.map