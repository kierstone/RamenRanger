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
var FoodCourt_QuestListItem = (function (_super) {
    __extends(FoodCourt_QuestListItem, _super);
    function FoodCourt_QuestListItem(requirement, requirementType) {
        var _this = _super.call(this) || this;
        _this.requirement = requirement;
        _this.requirementType = requirementType;
        return _this;
    }
    FoodCourt_QuestListItem.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    FoodCourt_QuestListItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    FoodCourt_QuestListItem.prototype.init = function () {
        switch (this.requirementType) {
            case RamenRequirmentType.Broth:
                {
                    var bInfo = this.requirement;
                    this.Group_Broth.visible = true;
                    this.Img_Icon.source = "bowl_normal";
                    this.FillBroth(GetBrothModelById(bInfo.brothId));
                    this.Label_Desc.text = bInfo.desc;
                }
                break;
            case RamenRequirmentType.Mutual:
                {
                    var mInfo = this.requirement;
                    this.Img_Icon.source = mInfo.icon;
                    this.Group_Broth.visible = false;
                    this.Label_Desc.text = mInfo.desc;
                }
                break;
            case RamenRequirmentType.Subject:
                {
                    var sInfo = this.requirement;
                    this.Img_Icon.source = sInfo.icon;
                    this.Group_Broth.visible = false;
                    this.Label_Desc.text = sInfo.desc;
                }
                break;
        }
    };
    /**
     * 因为汤比较特殊，所以得额外fill进来
     * @param {BrothModel} broth 汤的model
     * @param {number} centerX 要绘制的位置x，为空时为图标中心
     * @param {number} centerY 要绘制的位置y，为空时为图标中心
     * @param {number} radius 要绘制的汤的半径，为空时为图标的40%
     */
    FoodCourt_QuestListItem.prototype.FillBroth = function (broth, centerX, centerY, radius) {
        if (centerX === void 0) { centerX = null; }
        if (centerY === void 0) { centerY = null; }
        if (radius === void 0) { radius = null; }
        if (!this.Img_Icon)
            return;
        if (centerX == null)
            centerX = 0;
        if (centerY == null)
            centerY = 0;
        if (radius == null)
            radius = this.Img_Icon.width * 0.4;
        var shp = broth.ImageShape(centerX, // + this.Img_Icon.x,
        centerY + this.Img_Icon.y, radius);
        this.Group_Broth.addChild(shp);
        var brothHL = new eui.Image(RES.getRes(ResName_Broth_Highlight));
        this.Group_Broth.addChild(brothHL);
        brothHL.width = brothHL.height = radius * 2;
        brothHL.anchorOffsetX = brothHL.width / 2;
        brothHL.anchorOffsetY = brothHL.height / 2;
        brothHL.x = shp.x;
        brothHL.y = shp.y;
    };
    return FoodCourt_QuestListItem;
}(eui.Component));
__reflect(FoodCourt_QuestListItem.prototype, "FoodCourt_QuestListItem", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=FoodCourt_QuestListItem.js.map