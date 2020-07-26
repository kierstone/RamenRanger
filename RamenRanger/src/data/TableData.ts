
//食材
var GameData_Ingredients:Array<IngredientModel>;

//面碗
var GameData_Bowl:Array<BowlModel>;

//汤底
var GameData_Broth:Array<BrothModel>;

//角色动画
var GameData_CharacterAction:Array<CharacterActionInfo>;

//旅行模式的小吃们
var GameData_FoodCourtDish:Array<FoodCourtDishModel>;

//食材的组合
var GameData_IngredientMutual:Array<IngredientMutual>;


//读取数据
var LoadGameData = function(){
    let catalog = RES.getRes("catalog_json");
    console.log("Start load table");

    //食材
    console.log("Start Load >> Ingredient")
    GameData_Ingredients = new Array<IngredientModel>();
    if (catalog["ingredient"] && catalog["ingredient"].length > 0){
        let iJsons:Array<string> = catalog["ingredient"];
        for (let i = 0; i < iJsons.length; i++){
            let loadingIJ = RES.getRes(iJsons[i] + "_json");
            let fData = loadingIJ["data"];
            for (let n = 0; n < fData.length; n++){
                let ing:IngredientModel = new IngredientModel(fData[n]);
                GameData_Ingredients.push(ing);
            }
        }
        console.log("Ingredient >> Loaded");
    }else{
        console.log("Ingredient >> No Data");
    }

    //面碗
    console.log("Start Load >> Bowl")
    GameData_Bowl = new Array<BowlModel>();
    if (catalog["bowl"] && catalog["bowl"].length > 0){
        let iJsons:Array<string> = catalog["bowl"];
        for (let i = 0; i < iJsons.length; i++){
            let loadingIJ = RES.getRes(iJsons[i] + "_json");
            let fData = loadingIJ["data"];
            for (let n = 0; n < fData.length; n++){
                let bowl:BowlModel = new BowlModel();
                bowl.fromJson(fData[n]);
                GameData_Bowl.push(bowl);
            }
        }
        console.log("Bowl >> Loaded");
    }else{
        console.log("Bowl >> No Data");
    }

    //汤底
    console.log("Start Load >> Broth")
    GameData_Broth = new Array<BrothModel>();
    if (catalog["broth"] && catalog["broth"].length > 0){
        let iJsons:Array<string> = catalog["broth"];
        for (let i = 0; i < iJsons.length; i++){
            let loadingIJ = RES.getRes(iJsons[i] + "_json");
            let fData = loadingIJ["data"];
            for (let n = 0; n < fData.length; n++){
                let broth:BrothModel = new BrothModel();
                broth.fromJson(fData[n]);
                GameData_Broth.push(broth);
            }
        }
        console.log("Broth >> Loaded");
    }else{
        console.log("Broth >> No Data");
    }


    //角色动画
    let actionJson = RES.getRes("character_animinfo_json");
    GameData_CharacterAction = new Array<CharacterActionInfo>();
    for (let i = 0; i < actionJson["data"].length; i++){
        let ca:CharacterActionInfo = new CharacterActionInfo();
        ca.FromJson(actionJson["data"][i]);
        GameData_CharacterAction.push(ca);
    }

    //旅行模式的定食
    GameData_FoodCourtDish = new Array<FoodCourtDishModel>();
    let jsFile = RES.getRes("food_court_dish_json");
    if (jsFile && jsFile["data"]){
        for (let i = 0; i < jsFile["data"].length; i++){
            GameData_FoodCourtDish.push(new FoodCourtDishModel(
                jsFile["data"][i]
            ))
        }
    }

    //食材组合
    GameData_IngredientMutual = new Array<IngredientMutual>();
    let ingMutualFile = RES.getRes("ingredient_mutual_json");
    if (ingMutualFile && ingMutualFile["data"]){
        for (let i = 0; i < ingMutualFile["data"].length; i++){
            GameData_IngredientMutual.push(new IngredientMutual(
                ingMutualFile["data"][i]
            ))
        }
    }


}

//根据key获得对应造型的动画信息
var GetCharacterActionInfoByKey = function(key:string):CharacterActionInfo{
    if (!GameData_CharacterAction) return null;
    for (let i = 0; i < GameData_CharacterAction.length; i++){
        if (GameData_CharacterAction[i].key == key){
            return GameData_CharacterAction[i];
        }
    }
    return null;
}

var GetIngredientModelById = function(id:string):IngredientModel{
    if (!GameData_Ingredients) return null;
    for (let i = 0; i < GameData_Ingredients.length; i++){
        if (GameData_Ingredients[i].id == id){
            return GameData_Ingredients[i];
        }
    }
    return null;
}

var GetBrothModelById = function(id:string):BrothModel{
    if (!GameData_Broth) return null;
    for (let i = 0; i < GameData_Broth.length; i++){
        if (GameData_Broth[i].id == id){
            return GameData_Broth[i];
        }
    }
    return null;
}

var GetBowlModelById = function(id:string):BowlModel{
    if (!GameData_Bowl) return null;
    for (let i = 0; i < GameData_Bowl.length; i++){
        if (GameData_Bowl[i].id == id){
            return GameData_Bowl[i];
        }
    }
    return null;
}

var GetFoodCourtDishModelById = function(id:string):FoodCourtDishModel{
    if (!GameData_FoodCourtDish) return null;
    for (let i = 0; i < GameData_FoodCourtDish.length; i++){
        if (GameData_FoodCourtDish[i].id == id){
            return GameData_FoodCourtDish[i];
        }
    }
    return null;
}

