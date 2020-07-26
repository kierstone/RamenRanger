//食材
var GameData_Ingredients;
//面碗
var GameData_Bowl;
//汤底
var GameData_Broth;
//角色动画
var GameData_CharacterAction;
//旅行模式的小吃们
var GameData_FoodCourtDish;
//食材的组合
var GameData_IngredientMutual;
//读取数据
var LoadGameData = function () {
    var catalog = RES.getRes("catalog_json");
    console.log("Start load table");
    //食材
    console.log("Start Load >> Ingredient");
    GameData_Ingredients = new Array();
    if (catalog["ingredient"] && catalog["ingredient"].length > 0) {
        var iJsons = catalog["ingredient"];
        for (var i = 0; i < iJsons.length; i++) {
            var loadingIJ = RES.getRes(iJsons[i] + "_json");
            var fData = loadingIJ["data"];
            for (var n = 0; n < fData.length; n++) {
                var ing = new IngredientModel(fData[n]);
                GameData_Ingredients.push(ing);
            }
        }
        console.log("Ingredient >> Loaded");
    }
    else {
        console.log("Ingredient >> No Data");
    }
    //面碗
    console.log("Start Load >> Bowl");
    GameData_Bowl = new Array();
    if (catalog["bowl"] && catalog["bowl"].length > 0) {
        var iJsons = catalog["bowl"];
        for (var i = 0; i < iJsons.length; i++) {
            var loadingIJ = RES.getRes(iJsons[i] + "_json");
            var fData = loadingIJ["data"];
            for (var n = 0; n < fData.length; n++) {
                var bowl = new BowlModel();
                bowl.fromJson(fData[n]);
                GameData_Bowl.push(bowl);
            }
        }
        console.log("Bowl >> Loaded");
    }
    else {
        console.log("Bowl >> No Data");
    }
    //汤底
    console.log("Start Load >> Broth");
    GameData_Broth = new Array();
    if (catalog["broth"] && catalog["broth"].length > 0) {
        var iJsons = catalog["broth"];
        for (var i = 0; i < iJsons.length; i++) {
            var loadingIJ = RES.getRes(iJsons[i] + "_json");
            var fData = loadingIJ["data"];
            for (var n = 0; n < fData.length; n++) {
                var broth = new BrothModel();
                broth.fromJson(fData[n]);
                GameData_Broth.push(broth);
            }
        }
        console.log("Broth >> Loaded");
    }
    else {
        console.log("Broth >> No Data");
    }
    //角色动画
    var actionJson = RES.getRes("character_animinfo_json");
    GameData_CharacterAction = new Array();
    for (var i = 0; i < actionJson["data"].length; i++) {
        var ca = new CharacterActionInfo();
        ca.FromJson(actionJson["data"][i]);
        GameData_CharacterAction.push(ca);
    }
    //旅行模式的定食
    GameData_FoodCourtDish = new Array();
    var jsFile = RES.getRes("food_court_dish_json");
    if (jsFile && jsFile["data"]) {
        for (var i = 0; i < jsFile["data"].length; i++) {
            GameData_FoodCourtDish.push(new FoodCourtDishModel(jsFile["data"][i]));
        }
    }
    //食材组合
    GameData_IngredientMutual = new Array();
    var ingMutualFile = RES.getRes("ingredient_mutual_json");
    if (ingMutualFile && ingMutualFile["data"]) {
        for (var i = 0; i < ingMutualFile["data"].length; i++) {
            GameData_IngredientMutual.push(new IngredientMutual(ingMutualFile["data"][i]));
        }
    }
};
//根据key获得对应造型的动画信息
var GetCharacterActionInfoByKey = function (key) {
    if (!GameData_CharacterAction)
        return null;
    for (var i = 0; i < GameData_CharacterAction.length; i++) {
        if (GameData_CharacterAction[i].key == key) {
            return GameData_CharacterAction[i];
        }
    }
    return null;
};
var GetIngredientModelById = function (id) {
    if (!GameData_Ingredients)
        return null;
    for (var i = 0; i < GameData_Ingredients.length; i++) {
        if (GameData_Ingredients[i].id == id) {
            return GameData_Ingredients[i];
        }
    }
    return null;
};
var GetBrothModelById = function (id) {
    if (!GameData_Broth)
        return null;
    for (var i = 0; i < GameData_Broth.length; i++) {
        if (GameData_Broth[i].id == id) {
            return GameData_Broth[i];
        }
    }
    return null;
};
var GetBowlModelById = function (id) {
    if (!GameData_Bowl)
        return null;
    for (var i = 0; i < GameData_Bowl.length; i++) {
        if (GameData_Bowl[i].id == id) {
            return GameData_Bowl[i];
        }
    }
    return null;
};
var GetFoodCourtDishModelById = function (id) {
    if (!GameData_FoodCourtDish)
        return null;
    for (var i = 0; i < GameData_FoodCourtDish.length; i++) {
        if (GameData_FoodCourtDish[i].id == id) {
            return GameData_FoodCourtDish[i];
        }
    }
    return null;
};
//# sourceMappingURL=TableData.js.map