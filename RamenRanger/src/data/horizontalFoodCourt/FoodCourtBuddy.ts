class FoodCourtBuddy{
    public portrait:RandomPortrait; //随机头像
    public body:string; //角色在地图上的造型

    public favourType:FoodCourtDishType;
    public favourLevel:number;
    public hunger:number;

    public isPlayer:boolean = false;

    constructor(isPlayer:boolean = false){
        this.isPlayer = isPlayer;
        this.RandomOne();
    }

    public RandomOne(){
        this.portrait = new RandomPortrait(this.favourType);
        this.favourType = Utils.RandomInt(0, 3);
        this.favourLevel = Utils.RandomInt(3, 10);
        this.hunger = Utils.RandomInt(30, 45);
        this.body = "schoolgirl";
    }
}

