
//食材
var GameData_Ingredients:Array<IngredientClass>;

//面碗
var GameData_Bowl:Array<BowlModel>;

//角色动画
var GameData_CharacterAction:Array<CharacterActionInfo>;




//读取数据
var LoadGameData = function(){
    let catalog = RES.getRes("catalog_json");
    console.log("Start load table");

    //食材
    console.log("Start Load >> Ingredient")
    GameData_Ingredients = new Array<IngredientClass>();
    if (catalog["ingredient"] && catalog["ingredient"].length > 0){
        let iJsons:Array<string> = catalog["ingredient"];
        for (let i = 0; i < iJsons.length; i++){
            let loadingIJ = RES.getRes(iJsons[i] + "_json");
            let fData = loadingIJ["data"];
            for (let n = 0; n < fData.length; n++){
                let ic:IngredientClass = new IngredientClass();
                ic.fromJson(fData[n]);
                GameData_Ingredients.push(ic);
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


    //角色动画
    let actionJson = RES.getRes("character_animinfo_json");
    GameData_CharacterAction = new Array<CharacterActionInfo>();
    for (let i = 0; i < actionJson["data"].length; i++){
        let ca:CharacterActionInfo = new CharacterActionInfo();
        ca.FromJson(actionJson["data"][i]);
        GameData_CharacterAction.push(ca);
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