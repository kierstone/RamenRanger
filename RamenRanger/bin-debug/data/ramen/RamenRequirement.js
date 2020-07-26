var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 做拉面完成任务的需求
 */
var RamenRequirement = (function () {
    function RamenRequirement(desc, requireSubject, RequiredMutual, requireBroth) {
        if (requireBroth === void 0) { requireBroth = null; }
        this.desc = desc;
        this.requireSubject = requireSubject ? requireSubject : new Array();
        this.requireMutual = RequiredMutual ? RequiredMutual : new Array();
        this.requireBroth = requireBroth;
    }
    /**
     * 是否全部满足了条件了
     * @param {RamenModel} ramen 要检查的拉面
     * @returns {boolean} 是=全满足，否=没有
     */
    RamenRequirement.prototype.AllMeet = function (ramen) {
        this.CheckRamenFit(ramen);
        for (var i = 0; i < this.requireMutual.length; i++) {
            if (this.requireMutual[i].meet == false)
                return false;
        }
        if (this.requireBroth && this.requireBroth.meet == false)
            return false;
        for (var i = 0; i < this.requireSubject.length; i++) {
            if (this.requireSubject[i].meet == false)
                return false;
        }
    };
    /**
     * 检查一下拉面是否符合了，仅仅刷新一下meet状态
     * @param {RamenModel} ramen 要检查的拉面
     */
    RamenRequirement.prototype.CheckRamenFit = function (ramen) {
        for (var i = 0; i < this.requireMutual.length; i++) {
            this.requireMutual[i].meet = false;
        }
        if (this.requireBroth)
            this.requireBroth.meet = false;
        for (var i = 0; i < this.requireSubject.length; i++) {
            this.requireSubject[i].meet = false;
        }
        if (!ramen)
            return;
        if (this.requireBroth) {
            this.requireBroth.meet = (ramen.broth && this.requireBroth.brothId == ramen.broth.model.id);
        }
        for (var i = 0; i < ramen.topping.length; i++) {
            var ri = ramen.topping[i];
            for (var j = 0; j < this.requireSubject.length; j++) {
                if (this.requireSubject[j].meet == true)
                    continue;
                if (this.requireSubject[j].subject.Fit(ri.model.subject) == true) {
                    this.requireSubject[j].meet = true;
                    break;
                }
            }
        }
        if (this.requireMutual && this.requireMutual.length > 0) {
            var im = ramen.GetMutuals(null);
            for (var i = 0; i < im.length; i++) {
                var imKeys = im[i].effectKeys;
                for (var m = 0; m < imKeys.length; m++) {
                    for (var n = 0; n < this.requireMutual.length; n++) {
                        if (this.requireMutual[n].meet == true)
                            continue;
                        if (this.requireMutual[n].effectKey == imKeys[m]) {
                            this.requireMutual[n].meet = true;
                            break;
                        }
                    }
                }
            }
        }
    };
    return RamenRequirement;
}());
__reflect(RamenRequirement.prototype, "RamenRequirement");
/**
 * 食材类型的需求
 */
var RequiredSubject = (function () {
    function RequiredSubject(subject, icon, desc) {
        this.subject = subject;
        this.icon = icon;
        this.desc = desc;
        this.meet = false;
    }
    return RequiredSubject;
}());
__reflect(RequiredSubject.prototype, "RequiredSubject");
/**
 * 汤底类型的要求
 */
var RequiredBroth = (function () {
    function RequiredBroth(brothId, desc) {
        this.brothId = brothId;
        this.desc = desc;
        this.meet = false;
    }
    return RequiredBroth;
}());
__reflect(RequiredBroth.prototype, "RequiredBroth");
/**
 * 组合的要求
 */
var RequiredMutual = (function () {
    function RequiredMutual(effectKey, icon, desc) {
        this.effectKey = effectKey;
        this.icon = icon;
        this.desc = desc;
        this.meet = false;
    }
    return RequiredMutual;
}());
__reflect(RequiredMutual.prototype, "RequiredMutual");
var RamenRequirmentType;
(function (RamenRequirmentType) {
    RamenRequirmentType[RamenRequirmentType["Subject"] = 0] = "Subject";
    RamenRequirmentType[RamenRequirmentType["Broth"] = 1] = "Broth";
    RamenRequirmentType[RamenRequirmentType["Mutual"] = 2] = "Mutual";
})(RamenRequirmentType || (RamenRequirmentType = {}));
//# sourceMappingURL=RamenRequirement.js.map