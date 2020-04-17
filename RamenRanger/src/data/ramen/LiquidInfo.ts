//如果是汤汁类的，它应该是液体，如果是液体，就应该有液体信息
class LiquidInfo {
	public r:number;
	public g:number;
	public b:number;
	public alpha:number;

	public constructor(a:number, r:number, g:number, b:number) {
		this.alpha = a;
		this.r = r;
		this.g = g;
		this.b = b;
	}

	/**
	 * 获得颜色的数值
	 * @returns {number} 返回RGB值
	 */
	public Color():number{
		return this.r * 65536 + this.g * 256 + this.b;
	}
}