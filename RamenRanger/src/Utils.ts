class Utils {
	public static UIRoot;

    public static TickTime = 100;   //每个tick 100毫秒

	public static GetEuiScreenPos(item:any):Object{
        let res = {x:item.x, y:item.y}
        let p = item.parent;
        while (p && p != Utils.UIRoot){
            res["x"] += p.x - (p.anchorOffsetX ? p.anchorOffsetX : 0);
            res["y"] += p.y - (p.anchorOffsetY ? p.anchorOffsetY : 0);
            p = p.parent;
        }
        return res;
    }

    public static GetRandomIndexFromArray(arrLen:number, count:number):Array<number>{
        let res : Array<number> = new Array<number>();
        for (let i = 0; i < arrLen; i++){
            res.push(i);
        }
        while (res.length > count){
            let tIndex = Math.min(Math.floor(Math.random() * res.length), res.length - 1);
            res.splice(tIndex, 1);
        }

        return res;
    }

    
    public static RandomInt(minValue:number = 0, maxValue:number):number{
        let ranRange = maxValue - minValue + 1;
        return Math.min(Math.floor(Math.random() * ranRange) + minValue, maxValue);
    }

    public static GetUniqueId(key:string):string{
        let res = key;
        let rl = Utils.RandomInt(5,10);
        for (let i = 0; i < rl; i++){
            res += "_" + Utils.RandomInt(Number.MIN_VALUE, Number.MAX_VALUE);
        }
        return res;
    }

}