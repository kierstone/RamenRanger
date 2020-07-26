/**
 * 做拉面完成任务的需求
 */
class RamenRequirement{
    public requireSubject:Array<RequiredSubject>;
    public requireBroth:RequiredBroth;
    public requireMutual:Array<RequiredMutual>;
    public desc:string; //任务的描述

    constructor(desc:string, requireSubject:Array<RequiredSubject>, RequiredMutual:Array<RequiredMutual>, requireBroth:RequiredBroth = null){
        this.desc = desc
        this.requireSubject = requireSubject ? requireSubject : new Array<RequiredSubject>();
        this.requireMutual = RequiredMutual ? RequiredMutual : new Array<RequiredMutual>();
        this.requireBroth = requireBroth;
    }

    /**
     * 是否全部满足了条件了
     * @param {RamenModel} ramen 要检查的拉面
     * @returns {boolean} 是=全满足，否=没有
     */
    public AllMeet(ramen:RamenModel):boolean{
        this.CheckRamenFit(ramen);
        for (let i = 0; i < this.requireMutual.length; i++){
            if (this.requireMutual[i].meet == false) return false;
        }
        if (this.requireBroth && this.requireBroth.meet == false) return false;
        for (let i = 0; i < this.requireSubject.length; i++){
            if (this.requireSubject[i].meet == false) return false;
        }
    }

    /**
     * 检查一下拉面是否符合了，仅仅刷新一下meet状态
     * @param {RamenModel} ramen 要检查的拉面
     */
    public CheckRamenFit(ramen:RamenModel){
        for (let i = 0; i < this.requireMutual.length; i++){
            this.requireMutual[i].meet = false;
        }
        if (this.requireBroth) this.requireBroth.meet = false;
        for (let i = 0; i < this.requireSubject.length; i++){
            this.requireSubject[i].meet = false;
        }

        if (!ramen) return;

        if (this.requireBroth){
            this.requireBroth.meet = (ramen.broth && this.requireBroth.brothId == ramen.broth.model.id);
        }
        for (let i = 0; i < ramen.topping.length; i++){
            let ri:IngredientObj = ramen.topping[i];
            for (let j = 0; j < this.requireSubject.length; j++){
                if (this.requireSubject[j].meet == true) continue;
                if (this.requireSubject[j].subject.Fit(ri.model.subject) == true){
                    this.requireSubject[j].meet = true;
                    break;
                }
            }
        }
        if (this.requireMutual && this.requireMutual.length > 0){
            let im:Array<IngredientMutual> = ramen.GetMutuals(null);
            for (let i = 0; i < im.length; i++){
                let imKeys:Array<string> = im[i].effectKeys;
                for (let m = 0; m < imKeys.length; m++){
                    for (let n = 0; n < this.requireMutual.length; n++){
                        if (this.requireMutual[n].meet == true) continue;
                        if (this.requireMutual[n].effectKey == imKeys[m]){
                            this.requireMutual[n].meet = true;
                            break;
                        }
                    }
                }
            }
        }
    }

}


/**
 * 食材类型的需求
 */
class RequiredSubject{
    public subject:IngredientSubject;   //需求的类型
    public icon:string; //显示的图标的路径
    public desc:string; //显示的目标文字
    public meet:boolean;    //是否满足了
    constructor(subject:IngredientSubject, icon:string, desc:string){
        this.subject = subject;
        this.icon = icon;
        this.desc = desc;
        this.meet = false;
    }
}

/**
 * 汤底类型的要求
 */
class RequiredBroth{
    public brothId:string;  //汤底的id
    public desc:string;
    public meet:boolean;    //是否满足了
    constructor(brothId:string, desc:string){
        this.brothId = brothId;
        this.desc = desc;
        this.meet = false;
    }
}

/**
 * 组合的要求
 */
class RequiredMutual{
    public effectKey:string;    //需要的关键字
    public desc:string;         //描述文字
    public icon:string;       //图标资源
    public meet:boolean;    //是否满足了
    constructor(effectKey:string, icon:string, desc:string){
        this.effectKey = effectKey;
        this.icon = icon;
        this.desc = desc;
        this.meet = false;
    }
}

enum RamenRequirmentType{
    Subject = 0,
    Broth = 1,
    Mutual = 2
}