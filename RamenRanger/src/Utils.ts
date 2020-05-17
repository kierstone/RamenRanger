class Utils {
	public static UIRoot;

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

}