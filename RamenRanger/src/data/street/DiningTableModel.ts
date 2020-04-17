class DiningTableModel {
	public widthInGrid:number;
	public heightInGrid:number;
	public source:string;

	public seats:Array<DiningTableSeatSlot>;

	public constructor(widthInGrid:number, heightInGrid:number, source:string, seats:Array<DiningTableSeatSlot>) {
		this.widthInGrid = widthInGrid;
		this.heightInGrid = heightInGrid;
		this.source = source;
		this.seats = seats;
	}

	public Clone():DiningTableModel{
		return new DiningTableModel(
			this.widthInGrid,
			this.heightInGrid,
			this.source,
			this.seats
		);
	}
}