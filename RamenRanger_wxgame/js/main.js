var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var BrothModel = (function () {
    function BrothModel() {
    }
    /**
     * 从json的Object获取到数据
     * @param {Object} json 存盘的json文件，参看“数据结构/面碗”文档。
     * @returns {boolean} 是否成功，如果id有异常则不会成功
     */
    BrothModel.prototype.fromJson = function (json) {
        if (!json || !json["id"]) {
            return false;
        }
        this.id = json["id"];
        this.name = json["name"] ? json["name"] : json["id"];
        this.backColor = json["backColor"] ? json["backColor"] : 0x000000;
        this.coverAlpha = json["coverAlpha"] ? json["coverAlpha"] : 0.18;
        this.coverColor = new Array();
        if (json["coverColor"]) {
            var cc = json["coverColor"];
            for (var i = 0; i < cc.length; i++) {
                this.coverColor.push(cc[i]);
            }
        }
        return true;
    };
    /**
     * 获取用于制作面条时候的图形
     * @param {number} centerX 中心x坐标
     * @param {number} centerY 中心y坐标
     * @param {number} radius 半径
     * @returns {egret.Shape} 用于制作面条时候的图形
     */
    BrothModel.prototype.ImageShape = function (centerX, centerY, radius) {
        return this.GatherShape(centerX, centerY, radius);
    };
    /**
     * 获取用于icon的shape
     * @param {number} centerX 中心x坐标
     * @param {number} centerY 中心y坐标
     * @param {number} radius 半径
     * @returns {egret.Shape} 用于icon的shape
     */
    BrothModel.prototype.IconShape = function (centerX, centerY, radius) {
        return this.GatherShape(centerX, centerY, radius);
    };
    BrothModel.prototype.GatherShape = function (centerX, centerY, radius) {
        var brothMatrix = new egret.Matrix();
        brothMatrix.createGradientBox(radius * 2, radius * 2, 0, centerX - radius, centerY - radius);
        var shp = new egret.Shape();
        shp.x = centerX;
        shp.y = centerY;
        //底色
        shp.graphics.lineStyle(1, this.backColor);
        shp.graphics.beginFill(this.backColor, 1);
        shp.graphics.drawCircle(0, 0, radius);
        shp.graphics.endFill();
        //烫的渐变cover
        var alphas = new Array();
        var sizes = new Array();
        for (var i = 0; i < this.coverColor.length; i++) {
            alphas.push(this.coverAlpha);
            sizes.push((i + 1) * 255 / this.coverColor.length);
        }
        shp.graphics.beginGradientFill(egret.GradientType.RADIAL, this.coverColor, alphas, sizes, brothMatrix);
        shp.graphics.drawCircle(0, 0, radius);
        shp.graphics.endFill();
        return shp;
    };
    return BrothModel;
}());
__reflect(BrothModel.prototype, "BrothModel");
var BrothObj = (function () {
    function BrothObj(model) {
        this.model = model;
    }
    return BrothObj;
}());
__reflect(BrothObj.prototype, "BrothObj");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            //egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            //egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var login, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        egret.ImageLoader.crossOrigin = "anonymous"; //解决跨域问题
                        return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, platform.login()];
                    case 2:
                        login = _b.sent();
                        if (!login) return [3 /*break*/, 4];
                        //如果已经登陆了就这么办
                        _a = this;
                        return [4 /*yield*/, platform.getUserInfo(login)];
                    case 3:
                        //如果已经登陆了就这么办
                        _a.GameUserInfo = _b.sent();
                        this.createGameScene();
                        return [3 /*break*/, 6];
                    case 4: 
                    //没有的话，就出现按钮
                    return [4 /*yield*/, platform.createLoginButton(function (thisObj, userInfo) {
                            _this.GameUserInfo = userInfo;
                            thisObj.createGameScene();
                        }, this)];
                    case 5:
                        //没有的话，就出现按钮
                        _b.sent();
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                LoadGameData();
                Utils.UIRoot = this;
                playerInfo = new PlayerInfo();
                console.log(GameData_Ingredients, GameData_Bowl);
                // if (!GameScene_Street){
                //     GameScene_Street = new Street();
                // }
                // this.addChild(GameScene_Street);
                if (!GameScene_CraftNoodle) {
                    GameScene_CraftNoodle = new CraftNoodle();
                }
                this.addChild(GameScene_CraftNoodle);
                return [2 /*return*/];
            });
        });
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
var playerInfo;
var GameScene_Street;
var GameScene_CraftNoodle;
/**
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
 * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
 */
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.createLoginButton = function (nextFunc, thisObj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (nextFunc)
                    nextFunc(thisObj);
                return [2 /*return*/, { nickName: "施展", avatarUrl: "" }];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        code: "003BIecV1grOg01LT2aV1QDYbV1BIecw",
                        errMsg: "login:ok"
                    }];
            });
        });
    };
    DebugPlatform.prototype.getUserInfo = function (login) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: "施展" }];
            });
        });
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new DebugPlatform();
}
console.log(window.platform, window.platform.getUserInfo);
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        var _this = this;
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else if (typeof generateEUI2 !== 'undefined') {
            RES.getResByUrl("resource/gameEui.json", function (data, url) {
                window["JSONParseClass"]["setData"](data);
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateEUI2);
                }, _this);
            }, this, RES.ResourceItem.TYPE_JSON);
        }
        else if (typeof generateJSON !== 'undefined') {
            if (url.indexOf(".exml") > -1) {
                var dataPath = url.split("/");
                dataPath.pop();
                var dirPath = dataPath.join("/") + "_EUI.json";
                if (!generateJSON.paths[url]) {
                    RES.getResByUrl(dirPath, function (data) {
                        window["JSONParseClass"]["setData"](data);
                        egret.callLater(function () {
                            onSuccess.call(thisObject, generateJSON.paths[url]);
                        }, _this);
                    }, this, RES.ResourceItem.TYPE_JSON);
                }
                else {
                    egret.callLater(function () {
                        onSuccess.call(thisObject, generateJSON.paths[url]);
                    }, this);
                }
            }
            else {
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateJSON);
                }, this);
            }
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
var Utils = (function () {
    function Utils() {
    }
    Utils.GetEuiScreenPos = function (item) {
        var res = { x: item.x, y: item.y };
        var p = item.parent;
        while (p && p != Utils.UIRoot) {
            res["x"] += p.x - (p.anchorOffsetX ? p.anchorOffsetX : 0);
            res["y"] += p.y - (p.anchorOffsetY ? p.anchorOffsetY : 0);
            p = p.parent;
        }
        return res;
    };
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
//角色方向枚举
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
//角色动作枚举
var CharacterAction;
(function (CharacterAction) {
    CharacterAction[CharacterAction["Stand"] = 0] = "Stand";
    CharacterAction[CharacterAction["StandTrick"] = 1] = "StandTrick";
    CharacterAction[CharacterAction["Walk"] = 2] = "Walk";
    CharacterAction[CharacterAction["Order"] = 3] = "Order";
    CharacterAction[CharacterAction["Eat"] = 4] = "Eat";
    CharacterAction[CharacterAction["Chew"] = 5] = "Chew";
    CharacterAction[CharacterAction["Think"] = 6] = "Think";
    CharacterAction[CharacterAction["Discover"] = 7] = "Discover";
    CharacterAction[CharacterAction["Nod"] = 8] = "Nod";
    CharacterAction[CharacterAction["Clap"] = 9] = "Clap";
    CharacterAction[CharacterAction["Spicy"] = 10] = "Spicy";
    CharacterAction[CharacterAction["TakePhoto"] = 11] = "TakePhoto";
    CharacterAction[CharacterAction["Salty"] = 12] = "Salty";
    CharacterAction[CharacterAction["Sigh"] = 13] = "Sigh";
    CharacterAction[CharacterAction["Smile"] = 14] = "Smile";
    CharacterAction[CharacterAction["Hate"] = 15] = "Hate";
})(CharacterAction || (CharacterAction = {}));
//红绿灯状态
var TrafficLightState;
(function (TrafficLightState) {
    TrafficLightState[TrafficLightState["Red"] = 0] = "Red";
    TrafficLightState[TrafficLightState["Yellow"] = 1] = "Yellow";
    TrafficLightState[TrafficLightState["GreenShine"] = 2] = "GreenShine";
    TrafficLightState[TrafficLightState["Green"] = 3] = "Green";
})(TrafficLightState || (TrafficLightState = {}));
//贴图层次
var SpriteClipLayer;
(function (SpriteClipLayer) {
    SpriteClipLayer[SpriteClipLayer["Normal"] = 0] = "Normal";
    SpriteClipLayer[SpriteClipLayer["Noodle"] = 1] = "Noodle";
    SpriteClipLayer[SpriteClipLayer["EatingHead"] = 2] = "EatingHead";
})(SpriteClipLayer || (SpriteClipLayer = {}));
//拉面制作界面状态
var CraftNoodleState;
(function (CraftNoodleState) {
    CraftNoodleState[CraftNoodleState["ChooseBowl"] = 0] = "ChooseBowl";
    CraftNoodleState[CraftNoodleState["PutTare"] = 1] = "PutTare";
    CraftNoodleState[CraftNoodleState["SoupToBroth"] = 2] = "SoupToBroth";
    CraftNoodleState[CraftNoodleState["Noodles"] = 3] = "Noodles";
    CraftNoodleState[CraftNoodleState["SelectTopping"] = 4] = "SelectTopping";
    CraftNoodleState[CraftNoodleState["PlaceTopping"] = 5] = "PlaceTopping";
})(CraftNoodleState || (CraftNoodleState = {}));
var PlayerInfo = (function () {
    function PlayerInfo() {
        this.unlockedIngredients = new Array();
        this.unlockedBroth = new Array();
        this.unlockedBowl = new Array();
        this.Load();
    }
    /**
     * 读盘
     * 先写死
     */
    PlayerInfo.prototype.Load = function () {
        for (var j = 0; j < GameData_Ingredients.length; j++) {
            this.unlockedIngredients.push(GameData_Ingredients[j]);
        }
        for (var i = 0; i < GameData_Broth.length; i++) {
            this.unlockedBroth.push(GameData_Broth[i]);
        }
        for (var i = 0; i < GameData_Bowl.length; i++) {
            this.unlockedBowl.push(GameData_Bowl[i]);
        }
    };
    /**
     * 获取学会了某个素材，如果返回null就是没学会
     * @param {string} ingredientId 查询的ingredient的id
     * @returns {IngredientModel} 返回要查询的素材model，如果Null代表没学会
     */
    PlayerInfo.prototype.getLearnedIngredient = function (ingredientId) {
        if (ingredientId == "" || !this.unlockedIngredients || this.unlockedIngredients.length <= 0)
            return null;
        for (var i = 0; i < this.unlockedIngredients.length; i++) {
            if (this.unlockedIngredients[i].id == ingredientId) {
                return this.unlockedIngredients[i];
            }
        }
        return null;
    };
    /**
     * 获取学会了某个汤底，如果返回null就是没学会
     * @param {string} brothId 查询的broth的id
     * @returns {BrothModel} 返回要查询的汤底model，如果Null代表没学会
     */
    PlayerInfo.prototype.getLearnedBroth = function (brothId) {
        if (brothId == "" || !this.unlockedBroth || this.unlockedBroth.length <= 0)
            return null;
        for (var i = 0; i < this.unlockedBroth.length; i++) {
            if (this.unlockedBroth[i].id == brothId) {
                return this.unlockedBroth[i];
            }
        }
        return null;
    };
    /**
     * 获取学会了某个面碗，如果返回null就是没学会
     * @param {string} bowlId 查询的bowl的id
     * @returns {BowlModel} 返回要查询的面碗model，如果Null代表没学会
     */
    PlayerInfo.prototype.getLearnedBowl = function (bowlId) {
        if (bowlId == "" || !this.unlockedBowl || this.unlockedBowl.length <= 0)
            return null;
        for (var i = 0; i < this.unlockedBowl.length; i++) {
            if (this.unlockedBowl[i].id == bowlId) {
                return this.unlockedBowl[i];
            }
        }
        return null;
    };
    return PlayerInfo;
}());
__reflect(PlayerInfo.prototype, "PlayerInfo");
//食材
var GameData_Ingredients;
//面碗
var GameData_Bowl;
//汤底
var GameData_Broth;
//角色动画
var GameData_CharacterAction;
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
//吃饭区域宽高（单元格），和单元格宽高（像素）
var GameMapWidth = 10;
var GameMapHeight = 7;
var GridWidth = 75;
var GridHeight = 75;
var StreetHeight = 3;
var BusAreaWidth = 600; //小汽车的宽度
var BusAreaHeight = 375; //小车的高度
var BusLeftInGrid = 2; //小车的单元格坐标x=2
var BusBottomInGrid = -1; //小车的单元格坐标y，应该是地图区域往上1格
var RenderUpdateEveryLogicTick = 3; //每3个逻辑tick，渲染走1个tick
//吃饭的npc身上的buff，而不是玩家店铺的buff，是buffObj
var CharacterBuff = (function () {
    function CharacterBuff() {
    }
    return CharacterBuff;
}());
__reflect(CharacterBuff.prototype, "CharacterBuff");
//食客的buff的model
var CharacterBuffModel = (function () {
    function CharacterBuffModel() {
    }
    return CharacterBuffModel;
}());
__reflect(CharacterBuffModel.prototype, "CharacterBuffModel");
//添加角色buff到角色身上需要的信息
var CharacterBuffTrigger = (function () {
    function CharacterBuffTrigger(buffId, stack, turns) {
        this.buffId = buffId;
        this.stack = stack;
        this.turns = turns;
    }
    return CharacterBuffTrigger;
}());
__reflect(CharacterBuffTrigger.prototype, "CharacterBuffTrigger");
//一个角色的动画信息文件
var CharacterActionInfo = (function () {
    function CharacterActionInfo() {
        this.head_upper = 0; //头往上有这么多像素约定空间
        this.head_lower = 0; //头往下有这么多像素空间
        this.body_upper = 0; //身体往上
        this.body_lower = 0;
        this.allActions = new Array();
    }
    CharacterActionInfo.prototype.GetFrameInfoArray = function (direction, action) {
        if (this.allActions && this.allActions[action])
            return this.allActions[action][direction];
        return null;
    };
    CharacterActionInfo.prototype.FromJson = function (data) {
        this.key = data["key"];
        this.toPreloadHeadImage = new Array();
        this.toPreloadBodyImage = new Array();
        this.toPreloadEmoteImage = new Array();
        this.allActions = new Array();
        var keys = [
            "stand", "stand_trick", "walk", "ordering", "eat", "chew", "think", "discover",
            "nod", "clap", "spicy", "takephoto", "salty", "sigh", "smile", "hate"
        ];
        /**
         * Stand = 0,
            StandTrick = 1,
            Walk = 2,
            Order = 3,
            Eat = 4,
            Chew = 5,
            Think = 6,
            Discover = 7,
            Nod = 8,
            Clap = 9,
            Spicy = 10,
            TakePhoto = 11,
            Salty = 12,
            Sigh = 13,
            Smile = 14,
            Hate = 15
         */
        if (data["empty_height"]) {
            var eh = data["empty_height"];
            if (eh["head_upper"])
                this.head_upper = eh["head_upper"];
            if (eh["head_lower"])
                this.head_lower = eh["head_lower"];
            if (eh["body_upper"])
                this.body_upper = eh["body_upper"];
            if (eh["body_lower"])
                this.body_lower = eh["body_lower"];
        }
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            var thisArr = new Array();
            if (data[k]) {
                var aKey = data[k]["key"];
                var subkeys = ["up", "down", "left", "left"]; //多读一个left当做right
                for (var n = 0; n < subkeys.length; n++) {
                    var thisVal = new Array();
                    var sk = subkeys[n];
                    if (data[k][sk]) {
                        var dKey = data[k][sk]["dir"];
                        var aHead = data[k][sk]["head"] ? data[k][sk]["head"] : new Array();
                        var aBody = data[k][sk]["body"] ? data[k][sk]["body"] : new Array();
                        var aEmote = data[k][sk]["emote"] ? data[k][sk]["emote"] : new Array();
                        var lLen = Math.max(aHead.length, aBody.length, aEmote.length);
                        for (var z = 0; z < lLen; z++) {
                            var hf = "";
                            var bf = "";
                            var ef = "";
                            if (z < aHead.length)
                                hf = this.key + "_" + aKey + "_" + dKey + "_head_" + aHead[z].toString();
                            if (z < aBody.length)
                                bf = this.key + "_" + aKey + "_" + dKey + "_body_" + aBody[z].toString();
                            if (z < aEmote.length)
                                ef = this.key + "_" + aKey + "_" + dKey + "_emote_" + aEmote[z].toString();
                            thisVal.push(new CharacterFrameInfo(hf, bf, ef));
                            if (hf != "" && this.toPreloadHeadImage.indexOf(hf) < 0)
                                this.toPreloadHeadImage.push(hf);
                            if (bf != "" && this.toPreloadBodyImage.indexOf(bf) < 0)
                                this.toPreloadBodyImage.push(bf);
                            if (ef != "" && this.toPreloadEmoteImage.indexOf(ef) < 0)
                                this.toPreloadBodyImage.push(ef);
                        }
                    }
                    thisArr.push(thisVal);
                }
            }
            this.allActions.push(thisArr);
        }
    };
    return CharacterActionInfo;
}());
__reflect(CharacterActionInfo.prototype, "CharacterActionInfo");
//角色动画一帧的信息，目前来看，只要头跟身体的文件名
var CharacterFrameInfo = (function () {
    function CharacterFrameInfo(head, body, emote) {
        this.head = head;
        this.body = body;
        this.emote = emote;
    }
    return CharacterFrameInfo;
}());
__reflect(CharacterFrameInfo.prototype, "CharacterFrameInfo");
var CharacterObj = (function () {
    function CharacterObj(characterActionInfo, x, y, property) {
        this.currentFrame = 0;
        this.cInfo = characterActionInfo;
        this.CreateSpriteClipByInfo();
        this.SetPosition(x, y);
        //this.playingActionInfo = this.cInfo.GetFrameInfoArray(CharacterDirection.Down, CharacterAction.Stand);
        this.ChangeAction(Direction.Down, CharacterAction.Stand);
        this.property = property;
        this.ai = new CharacterAI(this);
    }
    CharacterObj.prototype.CreateSpriteClipByInfo = function () {
        this.body = new SpriteClip();
        this.head = new SpriteClip();
        //TODO 回头可以优化这个，从一个pool里面拿
        var bodyObj = {};
        for (var i = 0; i < this.cInfo.toPreloadBodyImage.length; i++) {
            var k = this.cInfo.toPreloadBodyImage[i];
            bodyObj[k] = RES.getRes(k);
        }
        this.body.SetPreloadTexturesFromObject(bodyObj);
        var headObj = {};
        for (var i = 0; i < this.cInfo.toPreloadHeadImage.length; i++) {
            var k = this.cInfo.toPreloadHeadImage[i];
            headObj[k] = RES.getRes(k);
        }
        this.head.SetPreloadTexturesFromObject(headObj);
    };
    /**
     * 设置逻辑坐标
     */
    CharacterObj.prototype.SetPosition = function (x, y) {
        if (!this.position)
            this.position = new egret.Point(x, y);
        this.position.x = x;
        this.position.y = y;
        if (this.head) {
            this.head.x = x;
            this.head.y = y;
        }
        if (this.body) {
            this.body.x = x;
            this.body.y = y;
        }
    };
    //设置图形到对应帧，以及改变他们的offset属性
    CharacterObj.prototype.SetImageFrame = function (frameIndex) {
        if (frameIndex === void 0) { frameIndex = this.currentFrame; }
        this.currentFrame = frameIndex;
        var upperY = 0;
        if (!this.playingActionInfo || !this.position)
            return;
        if (this.body) {
            this.body.ChangeToPreloadTexture(this.playingActionInfo[frameIndex].body);
            this.body.anchorOffsetX = Math.floor(this.body.width / 2);
            this.body.anchorOffsetY = this.body.height - this.cInfo.body_lower;
            this.body.scaleX = this.direction == Direction.Right ? -1 : 1;
            upperY = this.body.height - this.cInfo.body_upper - this.cInfo.body_lower;
        }
        if (this.head) {
            this.head.ChangeToPreloadTexture(this.playingActionInfo[frameIndex].head);
            this.head.anchorOffsetX = Math.floor(this.head.width / 2);
            this.head.anchorOffsetY = this.head.height + upperY - this.cInfo.head_lower;
            this.head.scaleX = this.direction == Direction.Right ? -1 : 1;
        }
        this.SetPosition(this.position.x, this.position.y);
    };
    /**
     * 更换动作和方向
     */
    CharacterObj.prototype.ChangeAction = function (direction, action, forceChange) {
        if (forceChange === void 0) { forceChange = false; }
        var dontChange = (direction == this.direction && action == this.doingAction && forceChange == false);
        var toAction = this.cInfo.GetFrameInfoArray(direction, action);
        if (toAction != null) {
            this.doingAction = action;
            this.direction = direction;
            this.playingActionInfo = toAction;
            if (dontChange == false)
                this.currentFrame = 0;
            this.SetImageFrame();
        }
    };
    /**
     * 获得某个方向的某个动作需要的帧数
     */
    CharacterObj.prototype.GetActionFrameCount = function (direction, action) {
        var toAction = this.cInfo.GetFrameInfoArray(direction, action);
        if (toAction != null) {
            return toAction.length * RenderUpdateEveryLogicTick; //动作长度其实依赖于渲染
        }
        return 0;
    };
    //返回是否达成一个loop了
    CharacterObj.prototype.Draw = function (incFrame) {
        if (incFrame === void 0) { incFrame = true; }
        this.SetImageFrame();
        if (incFrame == true) {
            this.currentFrame = (this.currentFrame + 1) % this.playingActionInfo.length;
            return this.currentFrame == 0;
        }
        else {
            return false;
        }
    };
    /**
     * 获得逻辑坐标{x:0,y:0}
     */
    CharacterObj.prototype.GetPos = function () {
        return this.position;
    };
    //TODO 特殊处理眨眼和站立，我曹
    CharacterObj.prototype.IsSameAction = function (a1, a2) {
        if ((a1 == CharacterAction.Stand && a2 == CharacterAction.StandTrick) ||
            (a1 == CharacterAction.StandTrick && a2 == CharacterAction.Stand))
            return true;
        return a1 == a2;
    };
    /**
     * 逻辑update。返回是否需要立即渲染一下
     */
    CharacterObj.prototype.FixedUpdate = function () {
        var todo = this.ai.WhatToDo();
        var requireInstantDraw = false;
        if (todo) {
            //处理移动
            if (todo.doMove == true) {
                this.SetPosition(todo.moveToX, todo.moveToY);
            }
            //动作和方向改变，引起改变
            var cD = todo.changeDirection;
            var cA = this.IsSameAction(todo.doAction, this.doingAction) == false;
            if (cD == true || cA == true) {
                this.ChangeAction(cD == true ? todo.directionTo : this.direction, cA == true ? todo.doAction : this.doingAction);
                requireInstantDraw = true;
            }
        }
        return requireInstantDraw;
    };
    /**
     * 渲染update
     */
    CharacterObj.prototype.Update = function () {
        //特殊处理站立的下一个动作
        if (this.Draw() == true && this.IsSameAction(this.doingAction, CharacterAction.Stand) == true) {
            this.ChangeAction(this.direction, (Math.random() < 0.2 ? CharacterAction.StandTrick : CharacterAction.Stand), true);
        }
    };
    return CharacterObj;
}());
__reflect(CharacterObj.prototype, "CharacterObj");
var CharacterProperty = (function () {
    function CharacterProperty() {
        this.speed = 3; //每帧移动速度不同，年轻人肯定快一点
    }
    return CharacterProperty;
}());
__reflect(CharacterProperty.prototype, "CharacterProperty");
//所有的AI脚本函数放在这里
var AIScripts;
(function (AIScripts) {
    //测试用的， 4方向走路
    AIScripts.DebugWalkForDirection = function (cha) {
        var res = new Array();
        var chaPos = cha.GetPos();
        var sX = chaPos.x;
        var sY = chaPos.y;
        var rX = sX + 6 * GridWidth;
        var rY = sY + 3 * GridWidth;
        res.push(new CharacterAIScript(true, rX, sY, true, Direction.Right, CharacterAction.Walk, 1));
        res.push(new CharacterAIScript(true, rX, rY, true, Direction.Down, CharacterAction.Walk, 1));
        res.push(new CharacterAIScript(true, sX, rY, true, Direction.Left, CharacterAction.Walk, 1));
        res.push(new CharacterAIScript(true, sX, sY, true, Direction.Up, CharacterAction.Walk, 1));
        return res;
    };
    AIScripts.DebugDoAllAction = function (cha) {
        var res = new Array();
        //先转头
        res.push(new CharacterAIScript(false, 0, 0, true, Direction.Down, CharacterAction.Stand, cha.GetActionFrameCount(Direction.Down, CharacterAction.Stand)));
        for (var i = 3; i < 16; i++) {
            res.push(new CharacterAIScript(false, 0, 0, false, Direction.Down, i, cha.GetActionFrameCount(Direction.Down, i)));
        }
        return res;
    };
    AIScripts.DebugStandTrickForDirection = function (cha) {
        var res = new Array();
        res.push(new CharacterAIScript(false, 0, 0, true, Direction.Right, CharacterAction.StandTrick, 160));
        res.push(new CharacterAIScript(false, 0, 0, true, Direction.Up, CharacterAction.StandTrick, 160));
        res.push(new CharacterAIScript(false, 0, 0, true, Direction.Left, CharacterAction.StandTrick, 160));
        res.push(new CharacterAIScript(false, 0, 0, true, Direction.Down, CharacterAction.StandTrick, 160));
        res.push(new CharacterAIScript(false, 0, 0, true, Direction.Right, CharacterAction.Stand, 160));
        res.push(new CharacterAIScript(false, 0, 0, true, Direction.Up, CharacterAction.Stand, 160));
        res.push(new CharacterAIScript(false, 0, 0, true, Direction.Left, CharacterAction.Stand, 160));
        res.push(new CharacterAIScript(false, 0, 0, true, Direction.Down, CharacterAction.Stand, 160));
        return res;
    };
    //仅仅只是从左向右或者右向左路过一下
    AIScripts.JustPassThroughFromRoad = function (cha, x) {
        var res = new Array();
        var chaPos = cha.GetPos();
        res.push(new CharacterAIScript(true, x, chaPos.y, true, (x <= chaPos.x ? Direction.Left : Direction.Right), CharacterAction.Walk, 1));
        return res;
    };
    AIScripts.JustPassThroughFromTrafficLight = function (street, cha) {
        var res = new Array();
        var toGreen = street.GetTrafficLightState()["toGreen"] + Math.round(Math.random() * 10);
        var cornerX = Math.floor(Math.random() * 2) + 1;
        var cornerY = Math.floor(Math.random() * 3) + GameMapHeight + 2;
        var cPos = street.GetPixelPosByGridPos(cornerX, cornerY, true);
        var cX = cPos["x"] + Math.floor(Math.random() * GridWidth - GridWidth / 2);
        var cY = cPos["y"] - Math.floor(Math.random() * GridHeight / 2);
        var chaPos = cha.GetPos();
        res.push(new CharacterAIScript(false, chaPos.x, chaPos.y, true, cha.direction, CharacterAction.Stand, toGreen));
        res.push(new CharacterAIScript(true, cX, cY, true, Direction.Up, CharacterAction.Walk, 1));
        res.push(new CharacterAIScript(true, (GameMapWidth + 3) * GridWidth, cY, true, Direction.Right, CharacterAction.Walk, 1));
        return res;
    };
})(AIScripts || (AIScripts = {}));
var CharacterAI = (function () {
    function CharacterAI(master) {
        this.master = master;
        this.plan = new Array();
        this.totalTicked = 0;
        this.ticked = 0;
    }
    CharacterAI.prototype.AddScripts = function (scripts) {
        for (var i = 0; i < scripts.length; i++) {
            this.plan.push(scripts[i].Clone());
        }
    };
    CharacterAI.prototype.SetScripts = function (scripts) {
        if (scripts === void 0) { scripts = []; }
        this.plan = new Array();
        for (var i = 0; i < scripts.length; i++) {
            this.plan.push(scripts[i].Clone());
        }
    };
    //获得这一帧应该干啥
    CharacterAI.prototype.WhatToDo = function (tickInc) {
        if (tickInc === void 0) { tickInc = true; }
        if (!this.plan || this.plan.length <= 0 || !this.master)
            return new CharacterAIScript(false, 0, 0, false, Direction.Down, CharacterAction.Stand, 1);
        var thisPlan = this.plan[0];
        var cPos = this.master.GetPos();
        var toX = cPos["x"];
        var toY = cPos["y"];
        var moveDone = thisPlan.doMove == false;
        var needMove = thisPlan.doMove;
        if (thisPlan.doMove == true) {
            var ms = this.master.property.speed;
            var cX = cPos["x"];
            var cY = cPos["y"];
            var tX = thisPlan.moveToX;
            var tY = thisPlan.moveToY;
            var xDone = false;
            var yDone = false;
            //x,y等速移动，所以产生AI的时候应该注意……
            if (Math.abs(tX - cX) <= ms) {
                xDone = true;
                toX = tX;
            }
            else {
                toX = (tX < cX) ? (cX - ms) : (cX + ms);
            }
            if (Math.abs(tY - cY) <= ms) {
                yDone = true;
                toY = tY;
            }
            else {
                toY = (tY < cY) ? (cY - ms) : (cY + ms);
            }
            if (xDone == true && yDone == true) {
                moveDone = true;
            }
        }
        var needDir = this.ticked <= 0 && thisPlan.changeDirection == true;
        var toDir = needDir == true ? thisPlan.directionTo : this.master.direction;
        var doAction = thisPlan.doAction;
        if (tickInc == true) {
            this.ticked += 1;
            this.totalTicked += 1;
            if (this.ticked >= thisPlan.inTick && moveDone == true) {
                this.ticked = 0;
                this.plan.shift();
            }
        }
        return new CharacterAIScript(needMove, toX, toY, needDir, toDir, doAction, 1);
    };
    return CharacterAI;
}());
__reflect(CharacterAI.prototype, "CharacterAI");
//AI脚本的每一条信息
var CharacterAIScript = (function () {
    function CharacterAIScript(doMove, moveToX, moveToY, changeDirection, directionTo, doAction, inTick) {
        this.doMove = false; //加个锁，doMove是false就不移动
        this.changeDirection = false; //是否要转换面向，在第0个tick就会转换
        this.doAction = CharacterAction.Stand; //在这个阶段用什么样的动作
        this.doMove = doMove;
        this.moveToX = moveToX;
        this.moveToY = moveToY;
        this.changeDirection = changeDirection;
        this.directionTo = directionTo;
        this.doAction = doAction;
        this.inTick = inTick;
    }
    CharacterAIScript.prototype.SetMoveTarget = function (moveToX, moveToY, inTick) {
        if (inTick === void 0) { inTick = 0; }
        this.moveToX = moveToX;
        this.moveToY = moveToY;
        this.doMove = true;
        this.inTick = inTick;
    };
    CharacterAIScript.prototype.Clone = function () {
        return new CharacterAIScript(this.doMove, this.moveToX, this.moveToY, this.changeDirection, this.directionTo, this.doAction, this.inTick);
    };
    return CharacterAIScript;
}());
__reflect(CharacterAIScript.prototype, "CharacterAIScript");
var BowlModel = (function () {
    function BowlModel() {
        this.tareLimit = 6; //TODO 最多6个tare，回头改成读数据
    }
    /**
     * 从json的Object获取到数据
     * @param {Object} json 存盘的json文件，参看“数据结构/面碗”文档。
     * @returns {boolean} 是否成功，如果id有异常则不会成功
     */
    BowlModel.prototype.fromJson = function (json) {
        if (!json || !json["id"]) {
            return false;
        }
        this.id = json["id"];
        this.name = json["name"] ? json["name"] : json["id"];
        this.img = json["img"] ? json["img"] : json["id"];
        this.radius = json["radius"] ? json["radius"] : 200;
        this.cost = json["cost"] ? json["cost"] : 1;
        return true;
    };
    /**
     * 获取图片资源名
     * @returns {string} 资源名称
     */
    BowlModel.prototype.Image = function () {
        return this.img;
    };
    /**
     * 获取icon的资源名
     * @returns {string} icon的名称
     */
    BowlModel.prototype.Icon = function () {
        return this.img;
    };
    return BowlModel;
}());
__reflect(BowlModel.prototype, "BowlModel");
var BowlObj = (function () {
    function BowlObj(model) {
        this.model = model;
    }
    return BowlObj;
}());
__reflect(BowlObj.prototype, "BowlObj");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
var IngredientClass = (function () {
    function IngredientClass() {
    }
    /**
     * 从json的Object获取到数据
     * @param {Object} json 存盘的json文件，参看“数据结构/面碗”文档。
     * @returns {boolean} 是否成功，如果id有异常则不会成功
     */
    IngredientClass.prototype.fromJson = function (json) {
        if (!json || !json["id"]) {
            return false;
        }
        this.id = json["id"];
        this.name = json["name"] ? json["name"] : json["id"];
        this.icon = "icon_Ingredient_" + (json["icon"] ? json["icon"] : "");
        this.items = new Array();
        if (json["children"] && json["children"].length && json["children"].length > 0) {
            for (var i = 0; i < json["children"].length; i++) {
                var bObj = json["children"][i];
                var im = new IngredientModel();
                this.items.push(im);
            }
        }
        return true;
    };
    return IngredientClass;
}());
__reflect(IngredientClass.prototype, "IngredientClass");
//从json读取的ingredient数据
var IngredientModel = (function () {
    function IngredientModel(data) {
        if (data)
            this.FromJson(data);
    }
    /**
     * 从json的Object获取到数据
     * @param {Object} json 存盘的json文件，参看“数据结构/食材的结构”文档。
     * @returns {boolean} 是否成功，如果id有异常则不会成功
     */
    IngredientModel.prototype.FromJson = function (json) {
        if (!json || !json["id"]) {
            return false;
        }
        this.id = json["id"];
        this.name = json["name"] ? json["name"] : json["id"];
        this.img = json["img"] ? json["img"] : "";
        this.radius = json["radius"] ? json["radius"] : 0;
        this.canBeUsed = json["using"] ? json["using"] : 0;
        this.liquid = json["liquid"] ? json["liquid"] : false;
        this.pungency = json["pungency"] ? json["pungency"] : 0;
        this.sweet = json["sweet"] ? json["sweet"] : 0;
        this.salty = json["salty"] ? json["salty"] : 0;
        this.sour = json["sour"] ? json["sour"] : 0;
        this.spicy = json["spicy"] ? json["spicy"] : 0;
        this.tags = new Array();
        if (json["tag"]) {
            var jt = json["tag"];
            for (var i = 0; i < jt.length; i++) {
                this.tags.push(jt[i]);
            }
        }
        return true;
    };
    /**
     * 获取图片资源名
     * @returns {string} 资源名称
     */
    IngredientModel.prototype.Image = function () {
        return "ingredient_" + this.img;
    };
    /**
     * 获取icon的资源名
     * @returns {string} icon的名称
     */
    IngredientModel.prototype.Icon = function () {
        return "ingredient_" + this.img;
    };
    /**
     * 材料能否做着味
     * @returns {boolean} 是否可以做着味
     */
    IngredientModel.prototype.CanBeTare = function () {
        return (this.canBeUsed & IngredientUseType.UseType_Tare) > 0;
    };
    /**
     * 材料能否做汤底
     * @returns {boolean} 是否可以做汤底
     */
    IngredientModel.prototype.CanBeBroth = function () {
        return (this.canBeUsed & IngredientUseType.UseType_Broth) > 0;
    };
    /**
     * 材料能否做面条
     * @returns {boolean} 是否可以做面条
     */
    IngredientModel.prototype.CanBeNoodle = function () {
        return (this.canBeUsed & IngredientUseType.UseType_Noodle) > 0;
    };
    /**
     * 材料能否做盖浇
     * @returns {boolean} 是否可以做盖浇
     */
    IngredientModel.prototype.CanBeTopping = function () {
        return (this.canBeUsed & IngredientUseType.UseType_Topping) > 0;
    };
    return IngredientModel;
}());
__reflect(IngredientModel.prototype, "IngredientModel");
//实际使用的ingredient
var IngredientObj = (function () {
    function IngredientObj(model, x, y, rotation) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (rotation === void 0) { rotation = 0; }
        this.size = 1; //From 0.5 to 2，放大倍数
        this.model = model;
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.xFlip = false;
        this.size = 1;
    }
    /**
     * 根据当前情况创建一个新的eui.Image
     * @param {eui.Group} parent 要放到什么父亲
     * @param {number} centerX 面碗中心的x坐标
     * @param {number} centerY 面碗中心的y坐标
     * @returns {eui.Image} 创建出来的image
     */
    IngredientObj.prototype.GatherImage = function (parent, centerX, centerY) {
        if (!parent)
            return null;
        var res = new eui.Image(RES.getRes(this.model.Image()));
        parent.addChild(res);
        res.anchorOffsetX = res.width / 2;
        res.anchorOffsetY = res.height / 2;
        res.x = this.x + centerX;
        res.y = this.y + centerY;
        res.rotation = this.rotation;
        res.scaleX = (this.xFlip == true ? -1 : 1) * this.size;
        res.scaleY = this.size;
        return res;
    };
    /**
     * 将属性设置到eui.Image
     * @param {eui.Image} img 要设置的图形
     * @param {number} centerX 面碗中心的x坐标
     * @param {number} centerY 面碗中心的y坐标
     */
    IngredientObj.prototype.SetToImage = function (img, centerX, centerY) {
        if (!img)
            return;
        img.x = this.x + centerX;
        img.y = this.y + centerY;
        img.rotation = this.rotation;
        img.scaleX = (this.xFlip == true ? -1 : 1) * this.size;
        img.scaleY = this.size;
    };
    /**
     * 某个点是否算碰到我了（点击用）
     * @param {number} x 坐标点x
     * @param {number} y 坐标点y
     * @param {number} centerX 面碗中心的x坐标
     * @param {number} centerY 面碗中心的y坐标
     * @returns {boolean} 算不算点到
     */
    IngredientObj.prototype.TouchOnMe = function (x, y, centerX, centerY) {
        var clickRadius = this.ClickRadius();
        var rX = x - centerX;
        var rY = y - centerY;
        return (Math.pow(rX - this.x, 2) + Math.pow(rY - this.y, 2)) <= Math.pow(clickRadius * this.size, 2);
    };
    /**
     * 点选半径，为了以后可以维护，要考虑是否需要变成一个单独属性
     * @returns {number} 点选半径
     */
    IngredientObj.prototype.ClickRadius = function () {
        return this.model.radius * 5;
    };
    /**
     * 克隆一个自己
     * @returns {IngredientObj} 克隆体
     */
    IngredientObj.prototype.Clone = function () {
        var res = new IngredientObj(this.model, this.x, this.y, this.rotation);
        res.xFlip = this.xFlip;
        res.size = this.size;
        return res;
    };
    return IngredientObj;
}());
__reflect(IngredientObj.prototype, "IngredientObj");
//素材用途
var IngredientUseType;
(function (IngredientUseType) {
    IngredientUseType[IngredientUseType["UseType_None"] = 0] = "UseType_None";
    IngredientUseType[IngredientUseType["UseType_Tare"] = 1] = "UseType_Tare";
    IngredientUseType[IngredientUseType["UseType_Broth"] = 2] = "UseType_Broth";
    IngredientUseType[IngredientUseType["UseType_Noodle"] = 4] = "UseType_Noodle";
    IngredientUseType[IngredientUseType["UseType_Topping"] = 8] = "UseType_Topping";
})(IngredientUseType || (IngredientUseType = {}));
//如果是汤汁类的，它应该是液体，如果是液体，就应该有液体信息
var LiquidInfo = (function () {
    function LiquidInfo(a, r, g, b) {
        this.alpha = a;
        this.r = r;
        this.g = g;
        this.b = b;
    }
    /**
     * 获得颜色的数值
     * @returns {number} 返回RGB值
     */
    LiquidInfo.prototype.Color = function () {
        return this.r * 65536 + this.g * 256 + this.b;
    };
    return LiquidInfo;
}());
__reflect(LiquidInfo.prototype, "LiquidInfo");
var PlacedIngredient = (function () {
    function PlacedIngredient() {
    }
    return PlacedIngredient;
}());
__reflect(PlacedIngredient.prototype, "PlacedIngredient");
//虽然叫model，但并不来自表，这个model是玩家制作的时候调整出来的，生成RamenObj用的
var RamenModel = (function () {
    function RamenModel() {
        this.tare = new Array();
        this.topping = new Array();
        this.reciptId = "";
    }
    /**
     * 是否还能添加新的浇头
     * @returns {boolean} 是否还能
     */
    RamenModel.prototype.CanAddTopping = function () {
        return this.topping.length < this.bowl.model.cost;
    };
    /**
     * 是否可以在某个位置加入某个食材，这里的坐标是对应于碗的中心点的
     * @param {IngredientObj} topping 浇头
     * @returns {boolean} 是否可以放
     */
    RamenModel.prototype.CanPlaceTopping = function (topping) {
        //判断是否在范围，不在就不行了
        var br = this.bowl.model.radius - topping.model.radius;
        var x = topping.x;
        var y = topping.y;
        if (x * x + y * y > br * br)
            return false; //如果放到碗外面，那断然是不行的
        //没有在碗的外面，就判断重叠
        for (var i = 0; i < this.topping.length; i++) {
            var tc = this.topping[i];
            if (tc.model.radius <= 0)
                continue;
            if (Math.pow(tc.x - x, 2) + Math.pow(tc.y - y, 2) <= Math.pow(tc.model.radius + topping.model.radius, 2))
                return false;
        }
        //可以放（这里只负责位置）
        return true;
    };
    /**
     * 判断坐标点在哪个Topping上了
     * @param {number} x 坐标点x
     * @param {number} y 坐标点y
     * @param {number} thisX 拉面的x坐标
     * @param {number} thisY 拉面的y坐标
     * @param {boolean} removeTouchOne 是否从toppings里面移除掉这个
     * @returns {IngredientObj} 点中的那个，null代表没有
     */
    RamenModel.prototype.TouchedTopping = function (x, y, thisX, thisY, removeTouchOne) {
        if (!this.topping || this.topping.length <= 0)
            return null;
        //越后面的在越上面，越容易被点到
        for (var i = this.topping.length - 1; i >= 0; i--) {
            var tp = this.topping[i];
            if (tp.TouchOnMe(x, y, thisX, thisY) == true) {
                if (removeTouchOne == true) {
                    return this.topping.splice(i, 1)[0];
                }
                else {
                    return tp;
                }
            }
        }
        return null;
    };
    return RamenModel;
}());
__reflect(RamenModel.prototype, "RamenModel");
var ChairModel = (function () {
    function ChairModel(downInfo, upInfo, leftInfo, rightInfo) {
        if (upInfo === void 0) { upInfo = null; }
        if (leftInfo === void 0) { leftInfo = null; }
        if (rightInfo === void 0) { rightInfo = null; }
        this.direction = [
            null,
            null,
            null,
            null
        ];
        if (downInfo)
            this.direction[Direction.Down] = downInfo;
        if (upInfo)
            this.direction[Direction.Up] = upInfo;
        if (leftInfo)
            this.direction[Direction.Left] = leftInfo;
        if (leftInfo)
            this.direction[Direction.Right] = leftInfo;
    }
    ChairModel.prototype.GetCurrentInfoByDirection = function (dir) {
        return this.direction[dir];
    };
    return ChairModel;
}());
__reflect(ChairModel.prototype, "ChairModel");
var ChairDirImageInfo = (function () {
    function ChairDirImageInfo(source, gridWidth, gridHeight) {
        this.source = source;
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
    }
    return ChairDirImageInfo;
}());
__reflect(ChairDirImageInfo.prototype, "ChairDirImageInfo");
var ChairObj = (function () {
    //TODO现在椅子都只有一格子宽度，今后扩展了再说
    //public canSitGrid:Array<GridPosition>;	//可以坐的格子
    function ChairObj(img, x, y, direction) {
        if (direction === void 0) { direction = Direction.Down; }
        this.position = new egret.Point(x, y);
        this.enteranceOffset = new egret.Point(75, 0); //TODO 写死了坐进去的地方，但实际上应该读表
        this.direction = direction;
        this.img = img;
        this.sittingCha = null;
        this.Redraw();
    }
    /**
     * 椅子需要被重绘的频率非常低
     */
    ChairObj.prototype.Redraw = function () {
        if (!this.image)
            this.image = new SpriteClip();
        this.image.texture = RES.getRes(this.img);
        this.image.anchorOffsetX = Math.round(this.image.width / 2);
        this.image.anchorOffsetY = this.image.height;
        this.SetPos(this.position.x, this.position.y);
        //TODO人坐进去以后的位移
    };
    ChairObj.prototype.SetPos = function (x, y) {
        if (!this.image) {
            this.Redraw();
        }
        if (!this.position) {
            this.position = new egret.Point(x, y);
        }
        this.position.x = this.image.x = x;
        this.position.y = this.image.y = y;
        if (!this.enterance) {
            this.enterance = new egret.Point(0, 0);
        }
        this.enterance.x = this.position.x + this.enteranceOffset.x;
        this.enterance.y = this.position.y + this.enteranceOffset.y;
    };
    return ChairObj;
}());
__reflect(ChairObj.prototype, "ChairObj");
var DiningTableModel = (function () {
    function DiningTableModel(widthInGrid, heightInGrid, source, seats) {
        this.widthInGrid = widthInGrid;
        this.heightInGrid = heightInGrid;
        this.source = source;
        this.seats = seats;
    }
    DiningTableModel.prototype.Clone = function () {
        return new DiningTableModel(this.widthInGrid, this.heightInGrid, this.source, this.seats);
    };
    return DiningTableModel;
}());
__reflect(DiningTableModel.prototype, "DiningTableModel");
var DiningTableObj = (function () {
    function DiningTableObj(tableModel, x, y) {
        this.model = tableModel.Clone();
        this.seat = new Array();
        this.position = new egret.Point(x, y);
        this.Redraw();
    }
    DiningTableObj.prototype.Redraw = function () {
        if (!this.Image)
            this.Image = new SpriteClip();
        this.Image.texture = RES.getRes(this.model.source);
        this.Image.anchorOffsetX = Math.round(this.Image.width / 2);
        this.Image.anchorOffsetY = this.Image.height;
        this.Image.x = this.position.x;
        this.Image.y = this.position.y;
    };
    /**
     * 有些单元格允许有多个slot，比如1x1的桌子，4面都可以放椅子，所以应该对应4个slot
     * 但是最终被用到的只能是1个info，所以可以先通过这个函数看看这个单元格对应的info是否已经存在
     * @param {number} gridX 要查询的单元格x，位于桌上的单元格
     * @param {number} gridY 要查询的单元格y，位于桌上的单元格
     * @returns {DiningTableSeatInfo} 被使用的单元格，如果是null，代表还没椅子对应这个位置
     */
    DiningTableObj.prototype.GetSeatInfo = function (gridX, gridY) {
        for (var i = 0; i < this.seat.length; i++) {
            if (this.seat[i].seatSlot.tableX == gridX && this.seat[i].seatSlot.tableY == gridY) {
                return this.seat[i];
            }
        }
        return null;
    };
    /**
     * 有些单元格允许有多个slot，比如1x1的桌子，4面都可以放椅子，所以应该对应4个slot
     * 所以这里返回的是一个数组，是对应这个坐标所有的slot的数据，如果长度为0，代表没有slot
     * @param {number} gridX 要查询的单元格x，位于桌上的单元格
     * @param {number} gridY 要查询的单元格y，位于桌上的单元格
     * @returns {Array<DiningTableSeatInfo>} 被使用的单元格，如果是null，代表还没椅子对应这个位置
     */
    DiningTableObj.prototype.GetSeatSlot = function (gridX, gridY) {
        var res = new Array();
        for (var i = 0; i < this.model.seats.length; i++) {
            var si = this.model.seats[i];
            if (si.tableX == gridX && si.tableY == gridY) {
                res.push(this.model.seats[i]);
            }
        }
        return res;
    };
    return DiningTableObj;
}());
__reflect(DiningTableObj.prototype, "DiningTableObj");
//当前的某个桌子栏位的状态
var DiningTableSeatInfo = (function () {
    function DiningTableSeatInfo(seatSlot) {
        this.seatSlot = seatSlot;
    }
    return DiningTableSeatInfo;
}());
__reflect(DiningTableSeatInfo.prototype, "DiningTableSeatInfo");
//桌子上的位置信息
var DiningTableSeatSlot = (function () {
    function DiningTableSeatSlot(tableX, tableY, ramenX, ramenY, seatOffsetX, seatOffsetY, seatDirection, maidOffsetX, maidOffsetY, maidDirection) {
        this.tableX = tableX;
        this.tableY = tableY;
        this.ramenOffsetX = ramenX;
        this.ramenOffsetY = ramenY;
        this.seatOffsetX = seatOffsetX;
        this.seatOffsetY = seatOffsetY;
        this.seatDirection = seatDirection;
        this.maidOffsetX = maidOffsetX;
        this.maidOffsetY = maidOffsetY;
        this.maidDirection = maidDirection;
    }
    DiningTableSeatSlot.prototype.Clone = function () {
        var res = new DiningTableSeatSlot(this.tableX, this.tableY, this.ramenOffsetX, this.ramenOffsetY, this.seatOffsetX, this.seatOffsetY, this.seatDirection, this.maidOffsetX, this.maidOffsetY, this.maidDirection);
        return res;
    };
    return DiningTableSeatSlot;
}());
__reflect(DiningTableSeatSlot.prototype, "DiningTableSeatSlot");
var TrafficLight = (function () {
    function TrafficLight(x, y) {
        this.ticked = 0;
        this.init(x, y);
    }
    TrafficLight.prototype.init = function (x, y) {
        this.seat = new SpriteClip();
        this.seat.texture = RES.getRes("trafficlight");
        this.red = new SpriteClip();
        this.red.texture = RES.getRes("trafficlight_red");
        this.yellow = new SpriteClip();
        this.yellow.texture = RES.getRes("trafficlight_yellow");
        this.green = new SpriteClip();
        this.green.texture = RES.getRes("trafficlight_green");
        this.red.anchorOffsetX =
            this.green.anchorOffsetX =
                this.yellow.anchorOffsetX =
                    this.seat.anchorOffsetX = Math.floor(this.seat.width / 2);
        this.red.anchorOffsetY = this.seat.height + 3;
        this.green.anchorOffsetY = this.seat.height + 1;
        this.yellow.anchorOffsetY = this.seat.height + 2;
        this.seat.anchorOffsetY = this.seat.height;
        this.red.x =
            this.green.x =
                this.yellow.x =
                    this.seat.x = x;
        this.red.y = y + 3;
        this.green.y = y + 1;
        this.yellow.y = y + 2;
        this.seat.y = y;
    };
    TrafficLight.prototype.LightOn = function (state) {
        if (state == this.state)
            return;
        this.state = state;
        this.ticked == 0;
    };
    TrafficLight.prototype.Draw = function (incFrame) {
        if (incFrame === void 0) { incFrame = true; }
        var darkAlpha = 0.3;
        this.red.alpha = this.state == TrafficLightState.Red ? 1 : darkAlpha;
        this.yellow.alpha = this.state == TrafficLightState.Yellow ? 1 : darkAlpha;
        var cTick = Math.floor(this.ticked / 2);
        this.green.alpha =
            (this.state == TrafficLightState.Green ||
                (this.state == TrafficLightState.GreenShine && (cTick % 2 == 0))) ?
                1 : darkAlpha;
        if (incFrame == true)
            this.ticked += 1;
    };
    return TrafficLight;
}());
__reflect(TrafficLight.prototype, "TrafficLight");
var GridPosition = (function () {
    function GridPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    return GridPosition;
}());
__reflect(GridPosition.prototype, "GridPosition");
var IngredientBox = (function (_super) {
    __extends(IngredientBox, _super);
    function IngredientBox(items) {
        var _this = _super.call(this) || this;
        _this.listItems = items;
        return _this;
    }
    IngredientBox.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    IngredientBox.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    IngredientBox.prototype.init = function () {
        var xs = [62, 230, 396, 562];
        var ys = [20, 182, 345];
        var looplen = Math.min(this.listItems.length, 12);
        for (var i = 0; i < looplen; i++) {
            var iconItem = this.listItems[i];
            iconItem.x = xs[Math.floor(i % 4)];
            iconItem.y = ys[Math.floor(i / 4)];
            this.addChild(iconItem);
        }
        this.anchorOffsetY = this.height;
        this.anchorOffsetX = this.width / 2;
    };
    IngredientBox.prototype.SetSelect = function (id) {
        for (var i = 0; i < this.listItems.length; i++) {
            this.listItems[i].SetSelected(this.listItems[i].id == id);
        }
    };
    return IngredientBox;
}(eui.Component));
__reflect(IngredientBox.prototype, "IngredientBox", ["eui.UIComponent", "egret.DisplayObject"]);
var IngredientIconInBox = (function (_super) {
    __extends(IngredientIconInBox, _super);
    function IngredientIconInBox(id, ingredient, icon, caller, func) {
        var _this = _super.call(this) || this;
        _this.selected = false;
        _this.ingredient = ingredient;
        _this.eveCaller = caller;
        _this.eveFunc = func;
        _this.icon = icon;
        return _this;
    }
    IngredientIconInBox.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    IngredientIconInBox.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    IngredientIconInBox.prototype.init = function () {
        var _this = this;
        this.Img_Icon.source = this.icon;
        this.Label_Name.text = this.ingredient.name;
        this.SetSelected(false);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.eveCaller && _this.eveFunc) {
                _this.eveFunc(_this.eveCaller, _this.ingredient);
            }
        }, this);
    };
    IngredientIconInBox.prototype.SetSelected = function (s) {
        this.selected = s;
        this.Img_Select.visible = s;
    };
    return IngredientIconInBox;
}(eui.Component));
__reflect(IngredientIconInBox.prototype, "IngredientIconInBox", ["eui.UIComponent", "egret.DisplayObject"]);
var RamenObj = (function (_super) {
    __extends(RamenObj, _super);
    function RamenObj() {
        return _super.call(this) || this;
    }
    RamenObj.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    RamenObj.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return RamenObj;
}(eui.Component));
__reflect(RamenObj.prototype, "RamenObj", ["eui.UIComponent", "egret.DisplayObject"]);
var SpriteClip = (function (_super) {
    __extends(SpriteClip, _super);
    function SpriteClip() {
        var _this = _super.call(this) || this;
        //private logicOffsetX:number = 0;	//和x坐标的逻辑偏差
        //private logicOffsetY:number = 0;
        _this.logicLayer = SpriteClipLayer.Normal;
        _this.preloadTextures = {};
        return _this;
    }
    SpriteClip.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        //this.init();
    };
    /**
     * 预加载这些textures
     * @param {Object} texture {"key":string, "texture":egret.Texture}
     */
    SpriteClip.prototype.SetPreloadTexturesFromObject = function (textures) {
        this.preloadTextures = textures;
    };
    /**
     * 根据string预加载这些texture
     * @param {Array<string>} keys 文件名称，最终将成为preloadTextures[Key]
     */
    SpriteClip.prototype.SetPreloadTextureByKeys = function (keys) {
        this.preloadTextures = {};
        for (var i = 0; i < keys.length; i++) {
            this.preloadTextures[keys[i]] = RES.getRes(keys[i]);
        }
    };
    /**
     * 设置当前图形为preload的某一个
     * @returns {boolean} 是否成功
     */
    SpriteClip.prototype.ChangeToPreloadTexture = function (key) {
        if (key == "" || !this.preloadTextures || !this.preloadTextures[key]) {
            return false;
        }
        this.texture = this.preloadTextures[key];
    };
    /**
     * 经过比较，我是否改到下面一层
     * @returns {boolean} true代表我该去下一层
     */
    SpriteClip.prototype.NeedToSendMeBack = function (compareSpritClip) {
        if (!compareSpritClip)
            return false;
        // let myTop = this.anchorOffsetY < 0 ? (this.y + this.anchorOffsetY) : this.y;
        // let myBottom = this.anchorOffsetY > 0 ? (this.y + this.anchorOffsetY) : this.y;
        // let itTop = compareSpritClip.anchorOffsetY < 0 ? (compareSpritClip.y + compareSpritClip.anchorOffsetY) : compareSpritClip.y;
        // let itBottom = compareSpritClip.anchorOffsetY > 0 ? (compareSpritClip.y + compareSpritClip.anchorOffsetY) : compareSpritClip.y;
        // if (itTop > myBottom || itBottom < myTop){
        // 	return false;	//两者碰不到不存在层级问题
        // }
        if (this.logicLayer == compareSpritClip.logicLayer) {
            return this.y < compareSpritClip.y;
        }
        else {
            return this.logicLayer < compareSpritClip.logicLayer;
        }
    };
    return SpriteClip;
}(eui.Image));
__reflect(SpriteClip.prototype, "SpriteClip");
var StreetGround = (function (_super) {
    __extends(StreetGround, _super);
    function StreetGround(jsonFile) {
        var _this = _super.call(this) || this;
        _this.jsonFile = "";
        _this.jsonFile = jsonFile;
        return _this;
    }
    StreetGround.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    StreetGround.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    StreetGround.prototype.init = function () {
        this.LoadFromJson();
    };
    StreetGround.prototype.LoadFromJson = function () {
        var streetInfo = this.jsonFile;
        if (streetInfo == null) {
            console.error("No json found:", this.jsonFile);
            return;
        }
        var cY = 0;
        if (streetInfo["background"]) {
            var tf = streetInfo["background"]["img"];
            this.bkg.texture = RES.getRes(tf);
            this.bkg.x = 0;
            this.bkg.y = 0;
            cY += this.bkg.height;
            this.groundTop = cY;
        }
        if (streetInfo["restrant"]) {
            var fillT = streetInfo["restrant"]["fill"];
            var mW = GameMapWidth * GridWidth;
            var mH = GameMapHeight * GridHeight;
            this.ground.texture = RES.getRes(fillT);
            this.ground.x = 0;
            this.ground.y = cY;
            this.ground.width = mW;
            this.ground.height = mH;
            this.ground.fillMode = egret.BitmapFillMode.REPEAT;
            cY += mH;
            this.roadTop = cY;
        }
        if (streetInfo["road"]) {
            var fillT = streetInfo["road"]["fill"];
            var mW = GameMapWidth * GridWidth;
            this.roadHeightInGrid = streetInfo["road"]["height"];
            var mH = this.roadHeightInGrid * GridHeight;
            this.road.texture = RES.getRes(fillT);
            this.road.x = 0;
            this.road.y = cY;
            this.road.width = mW;
            this.road.height = mH;
            this.road.fillMode = egret.BitmapFillMode.REPEAT;
            cY += mH;
            this.streetTop = cY;
        }
        if (streetInfo["street"]) {
            var sideT = streetInfo["street"]["side"];
            var fillT = streetInfo["street"]["fill"];
            var mW = GameMapWidth * GridWidth;
            var sideH = 1 * GridHeight;
            var fillH = Math.max(this.stage.stageHeight - cY, (StreetHeight - 1) * GridHeight);
            this.streetside.texture = RES.getRes(sideT);
            this.streetside.x = 0;
            this.streetside.y = cY;
            this.streetside.width = mW;
            this.streetside.height = sideH;
            this.streetside.fillMode = egret.BitmapFillMode.REPEAT;
            cY += sideH;
            this.street.texture = RES.getRes(fillT);
            this.street.x = 0;
            this.street.y = cY;
            this.street.width = mW;
            this.street.height = fillH;
            this.street.fillMode = egret.BitmapFillMode.REPEAT;
            cY += sideH;
        }
    };
    return StreetGround;
}(eui.Component));
__reflect(StreetGround.prototype, "StreetGround", ["eui.UIComponent", "egret.DisplayObject"]);
var CraftNoodle = (function (_super) {
    __extends(CraftNoodle, _super);
    function CraftNoodle() {
        var _this = _super.call(this) || this;
        _this.canControl = false;
        _this.stepId = 0; //0=着味，1=配汤，2=选面，3=浇头
        _this.pickingOffsetX = 0;
        _this.pickingOffsetY = 0;
        _this.draggingIng = false;
        _this.ingredientIndex = 0;
        _this.orderRotateTopping = false;
        return _this;
    }
    CraftNoodle.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CraftNoodle.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    CraftNoodle.prototype.init = function () {
        var _this = this;
        this.ramenCenterX = this.stage.stageWidth / 2;
        this.ramenCenterY = 500;
        this.Img_BKG.width = this.stage.stageWidth;
        this.Img_BKG.height = this.stage.stageHeight;
        this.Img_BottomBorder.y = this.stage.stageHeight;
        this.Group_IngBox.y = this.stage.stageHeight;
        //先写死就是这个饭碗的数据
        this.craftingRamen = new RamenModel();
        //this.craftingRamen.broth = new BrothObj(playerInfo.getLearnedBroth("broth0"));
        this.ChangeToState(CraftNoodleState.ChooseBowl);
        this.UpdateRamen();
        this.Group_UILayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.StagePointerDown, this);
        this.Group_UILayer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.StagePointerMove, this);
        this.Group_UILayer.addEventListener(egret.TouchEvent.TOUCH_END, this.StagePointerUp, this);
        this.Group_UILayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.StagePointerTap, this);
        //单个topping的工具组
        this.HSilider_Size.addEventListener(egret.Event.CHANGE, function () {
            if (_this.placingIngredient) {
                _this.placingIngredient.size = _this.HSilider_Size.value * 0.25 + 0.5;
                if (_this.placingIngImage) {
                    _this.placingIngredient.SetToImage(_this.placingIngImage, _this.ramenCenterX, _this.ramenCenterY);
                }
            }
        }, this);
        this.Button_Rotate.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            _this.orderRotateTopping = true;
        }, this);
        this.Button_Rotate.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            _this.orderRotateTopping = false;
        }, this);
        this.Button_Rotate.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () {
            _this.orderRotateTopping = false;
        }, this);
        this.Button_Rotate.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.orderRotateTopping == true) {
                if (_this.placingIngredient) {
                    _this.placingIngredient.rotation = (_this.placingIngredient.rotation + 182) % 360 - 180;
                    if (_this.placingIngImage) {
                        _this.placingIngredient.SetToImage(_this.placingIngImage, _this.ramenCenterX, _this.ramenCenterY);
                    }
                }
            }
        }, this);
        this.Button_Flip.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.placingIngredient) {
                _this.placingIngredient.xFlip = !_this.placingIngredient.xFlip;
                if (_this.placingIngImage) {
                    _this.placingIngredient.SetToImage(_this.placingIngImage, _this.ramenCenterX, _this.ramenCenterY);
                }
            }
        }, this);
        this.Button_Delete.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.uiState == CraftNoodleState.PlaceTopping)
                _this.ChangeToState(CraftNoodleState.SelectTopping);
        }, this);
        this.Button_OK.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.uiState == CraftNoodleState.PlaceTopping)
                _this.PlaceIngredientToRamen();
        }, this);
        //翻页按钮
        this.Button_NextPage.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.canControl == false)
                return;
            _this.ChangeIngredientBoxPage((_this.ingredientIndex <= _this.ingredientPage.length - 1) ?
                (_this.ingredientIndex + 1) : (_this.ingredientPage.length - 1));
        }, this);
        this.Button_PrevPage.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.canControl == false)
                return;
            _this.ChangeIngredientBoxPage(_this.ingredientIndex > 0 ?
                (_this.ingredientIndex - 1) : 0);
        }, this);
        //下一步按钮
        this.Button_NextStep.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnNextButtonClick, this);
        //上一部
        this.Button_Prev.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnPrevButtonClick, this);
        var t = new egret.Timer(50);
        t.addEventListener(egret.TimerEvent.TIMER, function () {
            _this.Update();
        }, this);
        t.start();
    };
    //下一步按钮
    CraftNoodle.prototype.OnNextButtonClick = function () {
        if (this.canControl == false)
            return;
        switch (this.uiState) {
            case CraftNoodleState.ChooseBowl:
                {
                    if (this.craftingRamen.bowl) {
                        this.ChangeToState(CraftNoodleState.PutTare);
                        this.UpdateRamen();
                    }
                }
                break;
            case CraftNoodleState.PutTare:
                {
                    this.ChangeToState(CraftNoodleState.SoupToBroth);
                    this.UpdateRamen();
                }
                break;
            case CraftNoodleState.SoupToBroth:
                {
                    if (this.craftingRamen.broth) {
                        this.ChangeToState(CraftNoodleState.Noodles);
                        this.UpdateRamen();
                        //this.UpdateRamen(false, false, true);
                    }
                }
                break;
            case CraftNoodleState.Noodles:
                {
                    if (this.craftingRamen.noodles) {
                        this.ChangeToState(CraftNoodleState.SelectTopping);
                        this.UpdateRamen();
                    }
                }
                break;
        }
    };
    //上一步按钮
    CraftNoodle.prototype.OnPrevButtonClick = function () {
        if (this.canControl == false)
            return;
        switch (this.uiState) {
            case CraftNoodleState.PutTare:
                {
                    this.ChangeToState(CraftNoodleState.ChooseBowl);
                    //this.UpdateRamen(true, false, false);	
                }
                break;
            case CraftNoodleState.SoupToBroth:
                {
                    this.ChangeToState(CraftNoodleState.PutTare);
                    //this.UpdateRamen(false, true, false);
                }
                break;
            case CraftNoodleState.Noodles:
                {
                    this.ChangeToState(CraftNoodleState.SoupToBroth);
                    //this.UpdateRamen(false, false, true);
                }
                break;
            case CraftNoodleState.SelectTopping:
                {
                    this.ChangeToState(CraftNoodleState.Noodles);
                    //this.UpdateRamen(false, false, false);	
                }
                break;
        }
    };
    //计时器函数
    CraftNoodle.prototype.Update = function () {
        switch (this.uiState) {
            case CraftNoodleState.PlaceTopping:
                {
                    //按住旋转按钮就会一直转
                    if (this.orderRotateTopping == true) {
                        if (this.placingIngredient) {
                            this.placingIngredient.rotation = (this.placingIngredient.rotation + 182) % 360 - 180;
                            if (this.placingIngImage) {
                                this.placingIngredient.SetToImage(this.placingIngImage, this.ramenCenterX, this.ramenCenterY);
                            }
                        }
                    }
                }
                break;
        }
    };
    //手指Tap事件
    CraftNoodle.prototype.StagePointerTap = function (e) {
        switch (this.uiState) {
            case CraftNoodleState.SelectTopping:
                {
                    var touchOne = this.craftingRamen.TouchedTopping(e.stageX, e.stageY, this.ramenCenterX, this.ramenCenterY, true);
                    if (touchOne) {
                        this.UpdateRamen();
                        this.placingIngredient = touchOne;
                        this.ChangeToState(CraftNoodleState.PlaceTopping);
                    }
                }
                break;
            case CraftNoodleState.PlaceTopping:
                {
                }
                break;
        }
    };
    //手指按下事件
    CraftNoodle.prototype.StagePointerDown = function (e) {
        switch (this.uiState) {
            case CraftNoodleState.SelectTopping:
                {
                }
                break;
            case CraftNoodleState.PlaceTopping:
                {
                    if (this.placingIngImage && this.placingIngredient && this.placingIngredient.TouchOnMe(e.stageX, e.stageY, this.ramenCenterX, this.ramenCenterY) == true) {
                        this.draggingIng = true;
                        this.pickingOffsetX = this.placingIngredient.x - e.stageX;
                        this.pickingOffsetY = this.placingIngredient.y - e.stageY;
                        console.log("draggingIng", this.draggingIng = true);
                    }
                    console.log("down", e.stageX, e.stageY);
                }
                break;
        }
    };
    //手指拖动
    CraftNoodle.prototype.StagePointerMove = function (e) {
        switch (this.uiState) {
            case CraftNoodleState.SelectTopping:
                {
                }
                break;
            case CraftNoodleState.PlaceTopping:
                {
                    if (this.draggingIng == true) {
                        this.placingIngredient.x = this.pickingOffsetX + e.stageX;
                        this.placingIngredient.y = this.pickingOffsetY + e.stageY;
                        this.placingIngredient.SetToImage(this.placingIngImage, this.ramenCenterX, this.ramenCenterY);
                        this.PlacingToolSynchronize();
                    }
                    console.log("draggin", e.stageX, e.stageY);
                }
                break;
        }
    };
    //手指挪开
    CraftNoodle.prototype.StagePointerUp = function (e) {
        switch (this.uiState) {
            case CraftNoodleState.SelectTopping:
                {
                }
                break;
            case CraftNoodleState.PlaceTopping:
                {
                    this.draggingIng = false;
                    this.PlacingToolSynchronize();
                }
                break;
        }
    };
    //按钮根据PlacingIngredient变化
    CraftNoodle.prototype.PlacingToolSynchronize = function () {
        if (!this.placingIngredient)
            return;
        this.Button_OK.enabled = this.craftingRamen.CanPlaceTopping(this.placingIngredient);
    };
    //创造一个正在拖拽的图形
    CraftNoodle.prototype.CreatePlacingIngImg = function () {
        if (this.placingIngImage)
            this.RemovePlacingIngImage();
        this.placingIngImage = this.placingIngredient.GatherImage(this.Group_GameLayer, this.ramenCenterX, this.ramenCenterY);
    };
    //删除正在拖曳的图形和逻辑
    CraftNoodle.prototype.RemovePlacingIngImage = function () {
        if (this.placingIngImage) {
            if (this.placingIngImage.parent)
                this.placingIngImage.parent.removeChild(this.placingIngImage);
            this.placingIngImage = null;
        }
    };
    //把正在拖曳的变成正式的素材
    CraftNoodle.prototype.PlaceIngredientToRamen = function () {
        if (!this.placingIngredient || !this.craftingRamen)
            return;
        this.craftingRamen.topping.push(this.placingIngredient.Clone());
        this.UpdateRamen();
        this.ChangeToState(CraftNoodleState.SelectTopping);
    };
    /**
     * 切换状态
     * @param {CraftNoodleState} toState 要切换到的状态
     */
    CraftNoodle.prototype.ChangeToState = function (toState) {
        var _this = this;
        this.canControl = false;
        egret.Tween.removeAllTweens();
        var animLen = 200; //inMS
        //初始化一些值
        if (this.uiState == CraftNoodleState.PlaceTopping) {
            //如果是从摆放toppings退出
            this.draggingIng = false;
            this.RemovePlacingIngImage();
            this.placingIngredient = null;
            //退出所有界面元素
            egret.Tween.get(this.Group_IngBox)
                .to({ y: this.stage.stageHeight + 600 }, animLen, egret.Ease.quadOut);
            egret.Tween.get(this.Group_PlaceTool)
                .to({ y: this.stage.stageHeight + 600 }, animLen, egret.Ease.quadOut)
                .call(function () { _this._OnEnterState(toState); });
        }
        else if (this.uiState == CraftNoodleState.SelectTopping) {
            //选择Topping离开的话什么都不做
            egret.Tween.get(this.Group_IngBox)
                .to({ y: this.stage.stageHeight + 600 }, animLen, egret.Ease.quadOut)
                .call(function () { _this._OnEnterState(toState); });
            egret.Tween.get(this.Group_PlaceTool)
                .to({ y: this.stage.stageHeight + 600 }, animLen, egret.Ease.quadOut);
        }
        else {
            this.ingredientIndex = 0; //其他状态离开的时候都要清除ingredientIndex
            egret.Tween.get(this.Group_IngBox)
                .to({ y: this.stage.stageHeight + 600 }, animLen, egret.Ease.quadOut)
                .call(function () { _this._OnEnterState(toState); });
            egret.Tween.get(this.Group_PlaceTool)
                .to({ y: this.stage.stageHeight + 600 }, animLen, egret.Ease.quadOut);
        }
        this.uiState = toState;
        //根据状态设置图标
        this.Img_Step0.scaleX = this.Img_Step0.scaleY = (this.uiState == CraftNoodleState.ChooseBowl) ? 1.2 : 1;
        this.Img_Step1.scaleX = this.Img_Step1.scaleY = (this.uiState == CraftNoodleState.PutTare) ? 1.2 : 1;
        this.Img_Step2.scaleX = this.Img_Step2.scaleY = (this.uiState == CraftNoodleState.SoupToBroth) ? 1.2 : 1;
        this.Img_Step3.scaleX = this.Img_Step3.scaleY = (this.uiState == CraftNoodleState.Noodles) ? 1.2 : 1;
        this.Img_Step4.scaleX = this.Img_Step4.scaleY =
            (this.uiState == CraftNoodleState.SelectTopping || this.uiState == CraftNoodleState.PlaceTopping) ? 1.2 : 1;
    };
    CraftNoodle.prototype._OnEnterState = function (toState) {
        var _this = this;
        egret.Tween.get(this.Img_Step0)
            .to({
            scaleX: (this.uiState == CraftNoodleState.ChooseBowl) ? 1.2 : 1,
            scaleY: (this.uiState == CraftNoodleState.ChooseBowl) ? 1.2 : 1
        });
        egret.Tween.get(this.Img_Step1)
            .to({
            scaleX: (this.uiState == CraftNoodleState.PutTare) ? 1.2 : 1,
            scaleY: (this.uiState == CraftNoodleState.PutTare) ? 1.2 : 1
        });
        egret.Tween.get(this.Img_Step2)
            .to({
            scaleX: (this.uiState == CraftNoodleState.SoupToBroth) ? 1.2 : 1,
            scaleY: (this.uiState == CraftNoodleState.SoupToBroth) ? 1.2 : 1
        });
        egret.Tween.get(this.Img_Step3)
            .to({
            scaleX: (this.uiState == CraftNoodleState.Noodles) ? 1.2 : 1,
            scaleY: (this.uiState == CraftNoodleState.Noodles) ? 1.2 : 1
        });
        egret.Tween.get(this.Img_Step4)
            .to({
            scaleX: (this.uiState == CraftNoodleState.SelectTopping || this.uiState == CraftNoodleState.PlaceTopping) ? 1.2 : 1,
            scaleY: (this.uiState == CraftNoodleState.SelectTopping || this.uiState == CraftNoodleState.PlaceTopping) ? 1.2 : 1
        });
        //同时进入新的状态
        switch (toState) {
            case CraftNoodleState.ChooseBowl:
                {
                    this.ResetBowlBox();
                    egret.Tween.get(this.Group_IngBox)
                        .to({ y: this.stage.stageHeight }, 200, egret.Ease.quadIn)
                        .call(function () {
                        _this.canControl = true;
                    }, this);
                }
                break;
            case CraftNoodleState.PutTare:
                {
                    this.ResetIngredientBox(IngredientUseType.UseType_Tare);
                    egret.Tween.get(this.Group_IngBox)
                        .to({ y: this.stage.stageHeight }, 200, egret.Ease.quadIn)
                        .call(function () {
                        _this.canControl = true;
                    }, this);
                }
                break;
            case CraftNoodleState.SoupToBroth:
                {
                    this.ResetBrothBox();
                    egret.Tween.get(this.Group_IngBox)
                        .to({ y: this.stage.stageHeight }, 200, egret.Ease.quadIn)
                        .call(function () {
                        _this.canControl = true;
                    }, this);
                }
                break;
            case CraftNoodleState.Noodles:
                {
                    this.ResetIngredientBox(IngredientUseType.UseType_Noodle);
                    egret.Tween.get(this.Group_IngBox)
                        .to({ y: this.stage.stageHeight }, 200, egret.Ease.quadIn)
                        .call(function () {
                        _this.canControl = true;
                    }, this);
                }
                break;
            case CraftNoodleState.SelectTopping:
                {
                    this.ResetIngredientBox(IngredientUseType.UseType_Topping);
                    egret.Tween.get(this.Group_IngBox)
                        .to({ y: this.stage.stageHeight }, 200, egret.Ease.quadIn)
                        .call(function () {
                        _this.canControl = true;
                    }, this);
                }
                break;
            case CraftNoodleState.PlaceTopping:
                {
                    this.draggingIng = false;
                    this.CreatePlacingIngImg();
                    this.HSilider_Size.value = Math.floor((this.placingIngredient.size - 0.5) / 0.25);
                    this.PlacingToolSynchronize();
                    egret.Tween.get(this.Group_PlaceTool)
                        .to({ y: this.stage.stageHeight - 500 }, 200, egret.Ease.quadOut)
                        .call(function () {
                        _this.uiState = CraftNoodleState.PlaceTopping;
                        _this.canControl = true;
                    }, this);
                }
                break;
        }
        if (this.uiState != CraftNoodleState.PlaceTopping)
            this.UpdateRamen();
    };
    CraftNoodle.prototype.ClearIngredientBoxes = function () {
        if (this.ingredientPage && this.ingredientPage.length > 0) {
            for (var i = 0; i < this.ingredientPage.length; i++) {
                if (this.ingredientPage[i] && this.ingredientPage[i].parent) {
                    this.ingredientPage[i].parent.removeChild(this.ingredientPage[i]);
                }
            }
        }
        this.ingredientPage = new Array();
    };
    /**
     * 设置面碗盒子
     */
    CraftNoodle.prototype.ResetBowlBox = function () {
        this.ClearIngredientBoxes();
        var me = this;
        //先把所有的列出来了
        var selectedIndex = -1;
        var pageI = [new Array()];
        var cgI = 0;
        for (var i = 0; i < playerInfo.unlockedBowl.length; i++) {
            var bowl = playerInfo.unlockedBowl[i];
            if (pageI[cgI].length >= 12) {
                //一页12个，超过了就Push新的一页
                pageI.push(new Array());
                cgI = pageI.length - 1;
            }
            pageI[cgI].push(bowl);
        }
        //根据pageI制作所有的ingredientBox
        for (var i = 0; i < pageI.length; i++) {
            var pis = new Array();
            for (var j = 0; j < pageI[i].length; j++) {
                pis.push(new IngredientIconInBox(pageI[i][j].id, pageI[i][j], pageI[i][j].Icon(), me, me.ClickOnIngredientIcon));
            }
            var ip = new IngredientBox(pis);
            this.ingredientPage.push(ip);
        }
        this.ChangeIngredientBoxPage(Math.min(this.ingredientIndex, pageI.length - 1));
    };
    /**
     * 设置汤底盒子
     */
    CraftNoodle.prototype.ResetBrothBox = function () {
        this.ClearIngredientBoxes();
        var me = this;
        //先把所有的列出来了
        var selectedIndex = -1;
        var pageI = [new Array()];
        var cgI = 0;
        for (var i = 0; i < playerInfo.unlockedBroth.length; i++) {
            var broth = playerInfo.unlockedBroth[i];
            if (pageI[cgI].length >= 12) {
                //一页12个，超过了就Push新的一页
                pageI.push(new Array());
                cgI = pageI.length - 1;
            }
            pageI[cgI].push(broth);
        }
        //根据pageI制作所有的ingredientBox
        for (var i = 0; i < pageI.length; i++) {
            var pis = new Array();
            for (var j = 0; j < pageI[i].length; j++) {
                pis.push(new IngredientIconInBox(pageI[i][j].id, pageI[i][j], "icon_default", me, me.ClickOnIngredientIcon));
            }
            var ip = new IngredientBox(pis);
            this.ingredientPage.push(ip);
        }
        this.ChangeIngredientBoxPage(Math.min(this.ingredientIndex, pageI.length - 1));
    };
    /**
     * 设置Ingredient盒子
     * @param {IngredientUseType} type 要设置盒子的材料是什么类型的
     */
    CraftNoodle.prototype.ResetIngredientBox = function (type) {
        this.ClearIngredientBoxes();
        var me = this;
        //先把所有的列出来了
        var pageI = [new Array()];
        var cgI = 0;
        for (var i = 0; i < playerInfo.unlockedIngredients.length; i++) {
            var ing = playerInfo.unlockedIngredients[i];
            if ((ing.canBeUsed & type) > 0) {
                if (pageI[cgI].length >= 12) {
                    //一页12个，超过了就Push新的一页
                    pageI.push(new Array());
                    cgI = pageI.length - 1;
                }
                pageI[cgI].push(ing);
            }
        }
        //根据pageI制作所有的ingredientBox
        for (var i = 0; i < pageI.length; i++) {
            var pis = new Array();
            for (var j = 0; j < pageI[i].length; j++) {
                pis.push(new IngredientIconInBox(pageI[i][j].id, pageI[i][j], pageI[i][j].Icon(), me, me.ClickOnIngredientIcon));
            }
            var ip = new IngredientBox(pis);
            this.ingredientPage.push(ip);
        }
        this.ChangeIngredientBoxPage(this.ingredientIndex);
    };
    //切换到ingredientBox的index
    CraftNoodle.prototype.ChangeIngredientBoxPage = function (toIndex) {
        var _this = this;
        if (toIndex < 0 || toIndex >= this.ingredientPage.length)
            return;
        var centerX = this.stage.stageWidth / 2;
        if (toIndex == this.ingredientIndex) {
            //就是当前页，判断没有parent，就添加到舞台
            if (!this.ingredientPage[toIndex].parent) {
                this.Group_Box.addChild(this.ingredientPage[toIndex]);
            }
            this.ingredientPage[toIndex].x = centerX;
            this.ingredientPage[toIndex].y = this.Group_Box.height - 30;
            this.Button_PrevPage.visible = this.Button_PrevPage.enabled = toIndex > 0;
            this.Button_NextPage.visible =
                this.Button_NextPage.enabled = toIndex < this.ingredientPage.length - 1;
        }
        else {
            //不是当前页，就翻页动画
            var leftX = centerX - this.stage.stageWidth;
            var rightX = centerX + this.stage.stageWidth;
            var fromRight = toIndex > this.ingredientIndex;
            this.Group_Box.addChild(this.ingredientPage[toIndex]);
            this.ingredientPage[toIndex].x = fromRight == true ? rightX : leftX;
            this.ingredientPage[toIndex].y = this.Group_Box.height - 30;
            this.canControl = false;
            var cII = this.ingredientIndex;
            var cip_1 = this.ingredientPage[cII];
            this.Button_PrevPage.visible = this.Button_PrevPage.enabled = false;
            this.Button_NextPage.visible = this.Button_NextPage.enabled = false;
            egret.Tween.get(this.ingredientPage[cII])
                .to({ x: (fromRight == true ? leftX : rightX) }, 200, egret.Ease.quadIn)
                .call(function () {
                if (cip_1 && cip_1.parent)
                    cip_1.parent.removeChild(cip_1);
            });
            egret.Tween.get(this.ingredientPage[toIndex])
                .to({ x: centerX }, 200, egret.Ease.quadIn)
                .call(function () {
                _this.ingredientIndex = toIndex;
                _this.canControl = true;
                _this.Button_PrevPage.visible =
                    _this.Button_PrevPage.enabled = toIndex > 0;
                _this.Button_NextPage.visible =
                    _this.Button_NextPage.enabled = toIndex < _this.ingredientPage.length - 1;
            });
        }
    };
    /**
     * 调料盒子里的东西点击以后的效果函数
     * @param {CraftNoodle} caller 约定的this
     * @param {IngredientModel} ing 素材
     */
    CraftNoodle.prototype.ClickOnIngredientIcon = function (caller, ing) {
        if (caller.canControl == false)
            return;
        switch (caller.uiState) {
            case CraftNoodleState.ChooseBowl:
                {
                    caller.craftingRamen.bowl = new BowlObj(ing);
                    caller.UpdateRamen();
                }
                break;
            case CraftNoodleState.PutTare:
                {
                    if (!caller.craftingRamen.bowl)
                        return;
                    if (caller.craftingRamen.tare.length < caller.craftingRamen.bowl.model.tareLimit) {
                        var im = ing;
                        var randomX = im.liquid == true ? 0 : (Math.random() * 200 - 100);
                        var randomY = im.liquid == true ? 0 : (Math.random() * 200 - 100);
                        caller.craftingRamen.tare.push(new IngredientObj(ing, randomX, randomY));
                        caller.UpdateRamen();
                    }
                }
                break;
            case CraftNoodleState.SoupToBroth:
                {
                    caller.craftingRamen.broth = new BrothObj(ing);
                    caller.UpdateRamen(true);
                    //TODO 选中还没
                    caller.canControl = true;
                }
                break;
            case CraftNoodleState.Noodles:
                {
                    caller.craftingRamen.noodles = new IngredientObj(ing, this.ramenCenterX, this.ramenCenterY);
                    caller.UpdateRamen();
                }
                break;
            case CraftNoodleState.SelectTopping:
                {
                    caller.placingIngredient = new IngredientObj(ing, 0, 400);
                    caller.ChangeToState(CraftNoodleState.PlaceTopping);
                }
                break;
        }
    };
    /**
     * 重新根据数据绘制一下拉面，正在拖曳的肯定不鸟他
     * @param {boolean} doBrothAnim 是否要播放汤底冲开的画面
     */
    CraftNoodle.prototype.UpdateRamen = function (doBrothAnim) {
        var _this = this;
        if (doBrothAnim === void 0) { doBrothAnim = false; }
        //先全部去掉
        this.Group_GameLayer.removeChildren();
        //根据状态确定要画什么
        var drawTare = false;
        var drawBroth = false;
        var drawBrothHL = false;
        var drawNoodle = false;
        var drawTopping = false;
        var bowlChanged = false;
        var brothChanged = false;
        var noodleChanged = false;
        switch (this.uiState) {
            case CraftNoodleState.ChooseBowl:
                {
                    bowlChanged = true;
                }
                break;
            case CraftNoodleState.PutTare:
                {
                    drawTare = true;
                }
                break;
            case CraftNoodleState.SoupToBroth:
                {
                    drawTare = true;
                    drawBroth = true;
                    drawBrothHL = true;
                    brothChanged = true;
                }
                break;
            case CraftNoodleState.Noodles:
                {
                    drawBroth = true;
                    drawBrothHL = !this.craftingRamen.noodles;
                    drawNoodle = true;
                    noodleChanged = true;
                }
                break;
            case CraftNoodleState.SelectTopping:
                {
                    drawBroth = true;
                    drawNoodle = true;
                    drawTopping = true;
                }
                break;
            case CraftNoodleState.PlaceTopping:
                {
                    drawBroth = true;
                    drawNoodle = true;
                    drawTopping = true;
                }
                break;
        }
        //面碗
        if (this.craftingRamen.bowl) {
            if (!this.bowlImage) {
                this.bowlImage = new eui.Image(RES.getRes(this.craftingRamen.bowl.model.Image()));
            }
            else if (bowlChanged == true) {
                this.bowlImage.source = RES.getRes(this.craftingRamen.bowl.model.Image());
            }
            this.Group_GameLayer.addChild(this.bowlImage);
            this.bowlImage.anchorOffsetX = this.bowlImage.width / 2;
            this.bowlImage.anchorOffsetY = this.bowlImage.height / 2;
            this.bowlImage.x = this.ramenCenterX;
            this.bowlImage.y = this.ramenCenterY;
        }
        //着味
        if (drawTare == true) {
            for (var i = 0; i < this.craftingRamen.tare.length; i++) {
                var tp = this.craftingRamen.tare[i];
                var img = tp.GatherImage(this.Group_GameLayer, this.ramenCenterX, this.ramenCenterY);
            }
        }
        //汤底
        var brothAnimInTime = 350; //in ms
        if (this.craftingRamen.broth && drawBroth == true) {
            if (!this.brothImage || brothChanged == true) {
                this.brothImage = this.craftingRamen.broth.model.ImageShape(this.ramenCenterX, this.ramenCenterY, this.craftingRamen.bowl.model.radius);
            }
            this.Group_GameLayer.addChild(this.brothImage);
            //如果是刷新，则需要
            if (doBrothAnim == true) {
                this.brothImage.scaleX = this.brothImage.scaleY = 0;
                egret.Tween.removeTweens(this.brothImage);
                egret.Tween.get(this.brothImage)
                    .to({ scaleX: 1, scaleY: 1 }, brothAnimInTime, egret.Ease.quadOut)
                    .call(function () {
                    if (!_this.brothHighlight) {
                        _this.brothHighlight = new eui.Image(RES.getRes("broth_highlight"));
                    }
                    _this.Group_GameLayer.addChild(_this.brothHighlight);
                    _this.brothHighlight.anchorOffsetX = _this.brothHighlight.width / 2;
                    _this.brothHighlight.anchorOffsetY = _this.brothHighlight.height / 2;
                    _this.brothHighlight.x = _this.ramenCenterX;
                    _this.brothHighlight.y = _this.ramenCenterY;
                    _this.brothHighlight.alpha = 0;
                    egret.Tween.removeTweens(_this.brothHighlight);
                    egret.Tween.get(_this.brothHighlight)
                        .to({ alpha: 1 }, brothAnimInTime, egret.Ease.quadOut);
                });
            }
        }
        //汤上面的油光
        if (drawBrothHL == true && this.craftingRamen.broth && doBrothAnim == false) {
            if (!this.brothHighlight) {
                this.brothHighlight = new eui.Image(RES.getRes("broth_highlight"));
            }
            this.Group_GameLayer.addChild(this.brothHighlight);
            this.brothHighlight.anchorOffsetX = this.brothHighlight.width / 2;
            this.brothHighlight.anchorOffsetY = this.brothHighlight.height / 2;
            this.brothHighlight.x = this.ramenCenterX;
            this.brothHighlight.y = this.ramenCenterY;
            // if (brothChanged == true){
            // 	this.brothHighlight.scaleX = this.brothHighlight.scaleY = 0;
            // 	this.brothHighlight.alpha = 0;
            // 	egret.Tween.removeTweens(this.brothHighlight);
            // 	egret.Tween.get(this.brothHighlight)
            // 		.to({scaleX:1, scaleY:1, alpha:1}, brothAnimInTime, egret.Ease.quadOut);
            // }
        }
        //return;
        //面条
        if (this.craftingRamen.noodles && drawNoodle == true) {
            if (!this.noodleImage) {
                this.noodleImage = new eui.Image(RES.getRes(this.craftingRamen.noodles.model.Image()));
            }
            else if (noodleChanged == true) {
                this.noodleImage.source = RES.getRes(this.craftingRamen.noodles.model.Image());
            }
            this.Group_GameLayer.addChild(this.noodleImage);
            this.noodleImage.anchorOffsetX = this.noodleImage.width / 2;
            this.noodleImage.anchorOffsetY = this.noodleImage.height / 2;
            this.noodleImage.x = this.ramenCenterX;
            this.noodleImage.y = this.ramenCenterY;
        }
        var me = this;
        //Toppings
        if (drawTopping == true) {
            for (var i = 0; i < this.craftingRamen.topping.length; i++) {
                var tp = this.craftingRamen.topping[i];
                var img = tp.GatherImage(this.Group_GameLayer, this.ramenCenterX, this.ramenCenterY);
            }
        }
    };
    return CraftNoodle;
}(eui.Component));
__reflect(CraftNoodle.prototype, "CraftNoodle", ["eui.UIComponent", "egret.DisplayObject"]);
var Street = (function (_super) {
    __extends(Street, _super);
    function Street(startTick, cityJson) {
        if (startTick === void 0) { startTick = 0; }
        if (cityJson === void 0) { cityJson = "city_shanghai_json"; }
        var _this = _super.call(this) || this;
        _this.toUpdateTicker = 0;
        _this.tick = 0;
        _this.chaRefTicker = 0;
        _this.zOrderBase = 10000; //在重新计算zOrder时，加上这个数字
        _this.cityJsonFileName = cityJson;
        _this.tick = startTick;
        return _this;
    }
    Street.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Street.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    Street.prototype.init = function () {
        var _this = this;
        //初始化数组
        this.sprites = new Array();
        this.characters = new Array();
        this.diningTables = new Array();
        this.diningChairs = new Array();
        this.trafficLights = new Array();
        //获得json配置
        var jsonF = RES.getRes(this.cityJsonFileName);
        //先加载ground，顺便的，把一些读取json的麻烦丢给ground
        this.ground = new StreetGround(jsonF);
        this.ground.x = 0;
        this.ground.y = 0;
        this.gameLayer.addChild(this.ground);
        console.log("GroundTop", this.ground.groundTop);
        this.PaintFixedTerrainByJson(jsonF);
        //小车可以先添加
        this.PlaceBusAndMainCharacter("bus_default_json");
        //开始添加精灵层的固定原件，比如桌子、花坛、椅子等
        //TODO 桌子椅子应该来自文件，而不是写死的
        var putTableHere = [
            { x: 1, y: 2 }, { x: 3, y: 2 }, { x: 5, y: 2 }, { x: 7, y: 2 },
            { x: 2, y: 5 }, { x: 4, y: 5 }, { x: 6, y: 5 }, { x: 8, y: 5 }
        ];
        for (var i = 0; i < putTableHere.length; i++) {
            var putInfo = putTableHere[i];
            var gX = putInfo["x"];
            var gY = putInfo["y"];
            var slot = i < 4 ?
                new DiningTableSeatSlot(0, 0, 38, 55, 0, -1, Direction.Down, 1, 0, Direction.Left) :
                new DiningTableSeatSlot(0, 0, 38, 55, 0, -1, Direction.Down, -1, 0, Direction.Right);
            this.PlaceTable(new DiningTableModel(1, 1, "wooden_single_table", [slot]), gX, gY);
            this.PlaceChair("wooden_chair", gX, gY - 1, Direction.Down);
        }
        //红绿灯
        this.PlaceTrafficLight(0, GameMapHeight + this.ground.roadHeightInGrid - 1);
        //测试角色
        this.PlaceDebugCharacter();
        //测试clip
        // let clip:SpriteClip = new SpriteClip();
        // clip.texture = RES.getRes("wooden_chair");
        // clip.x = 100;
        // clip.y = 800;
        // this.gameLayer.addChild(clip);
        // this.sprites.push(clip);
        //开启一个update和fixedUpdate的计时器
        var t = new egret.Timer(30);
        t.addEventListener(egret.TimerEvent.TIMER, function () {
            _this.FixedUpdate();
            if (_this.toUpdateTicker == 0)
                _this.Update();
            _this.RearrangeSpritesZOrder(); //ZOrder每个逻辑tick都会重新排列，所以FixedUpdate中可以不用
            _this.tick += 1;
            _this.toUpdateTicker = (_this.toUpdateTicker + 1) % 3;
        }, this);
        t.start();
    };
    //用于动画刷新的Update
    Street.prototype.Update = function () {
        //角色的
        for (var i = 0; i < this.characters.length; i++) {
            var cha = this.characters[i];
            if (cha.Update) {
                cha.Update();
            }
        }
        if (this.mainCharacter && this.mainCharacter.Update) {
            this.mainCharacter.Update();
        }
        //红绿灯绘制
        for (var i = 0; i < this.trafficLights.length; i++) {
            var tl = this.trafficLights[i];
            tl.Draw();
        }
    };
    //用于逻辑刷新的Update
    Street.prototype.FixedUpdate = function () {
        //角色的
        var idx = 0;
        while (idx < this.characters.length) {
            var cha = this.characters[idx];
            //TODO 一个角色AI执行完毕就删除
            if (cha.ai.plan.length <= 0) {
                this.RemoveCharacter(cha);
            }
            else {
                if (cha.FixedUpdate) {
                    if (cha.FixedUpdate() === true && cha.Update) {
                        cha.Update();
                    }
                    ;
                }
                idx++;
            }
        }
        //主角
        if (this.mainCharacter && this.mainCharacter.FixedUpdate) {
            if (this.mainCharacter.FixedUpdate() == true && this.mainCharacter.Update) {
                this.mainCharacter.Update();
            }
        }
        //红绿灯换色
        var trafficLightState = this.GetTrafficLightState();
        for (var i = 0; i < this.trafficLights.length; i++) {
            var tl = this.trafficLights[i];
            tl.LightOn(trafficLightState["light"]);
        }
        //刷角色
        if (this.chaRefTicker <= 0) {
            if (this.characters.length < 80) {
                this.RandomGatherNPC();
            }
            this.chaRefTicker = Math.floor(Math.random() * 8) + 22;
        }
        else {
            this.chaRefTicker--;
        }
    };
    //重新排序zOrder
    Street.prototype.RearrangeSpritesZOrder = function () {
        if (!this.sprites || this.sprites.length <= 0)
            return;
        this.sprites.sort(function (a, b) {
            var needBack = a.NeedToSendMeBack(b);
            return (needBack == true) ? -1 : 1;
        });
        for (var i = 0; i < this.sprites.length; i++) {
            var ts = this.sprites[i];
            ts.zIndex = i + this.zOrderBase;
        }
        this.gameLayer.sortChildren();
    };
    //删除某个角色
    Street.prototype.RemoveCharacter = function (cha) {
        if (cha) {
            //gameLayer删除
            if (cha.head && cha.head.parent)
                cha.head.parent.removeChild(cha.head);
            if (cha.body && cha.body.parent)
                cha.body.parent.removeChild(cha.body);
            if (cha.emote && cha.emote.parent)
                cha.body.parent.removeChild(cha.emote);
            //sprites删除
            var i = 0;
            while (i < this.sprites.length) {
                if ((cha.head && this.sprites[i] == cha.head) ||
                    (cha.body && this.sprites[i] == cha.body) ||
                    (cha.emote && this.sprites[i] == cha.emote)) {
                    this.sprites.splice(i, 1);
                }
                else {
                    i += 1;
                }
            }
            //角色列表删除
            for (var i_1 = 0; i_1 < this.characters.length; i_1++) {
                if (this.characters[i_1] == cha) {
                    this.characters.splice(i_1, 1);
                    break;
                }
            }
        }
    };
    //根据json信息放置地面层元素和精灵层元素
    Street.prototype.PaintFixedTerrainByJson = function (json) {
        //初始化地图
        this.gridCanPass = new Array();
        for (var i = 0; i < GameMapWidth; i++) {
            var thisLine = new Array();
            for (var j = 0; j < GameMapHeight + this.ground.roadHeightInGrid; j++) {
                thisLine.push(true);
            }
            this.gridCanPass.push(thisLine);
        }
        //对应的数组初始化
        if (this.fixedImage) {
            for (var i = 0; i < this.fixedImage.length; i++) {
                if (this.fixedImage[i] && this.fixedImage[i].parent)
                    this.fixedImage[i].parent.removeChild(this.fixedImage[i]);
            }
        }
        this.fixedImage = new Array();
        //地面层
        var fg = json["fixed_grounds"];
        if (fg) {
            for (var i = 0; i < fg.length; i++) {
                var fi = fg[i];
                var gX = fi["x"];
                var gY = fi["y"];
                var img = new eui.Image();
                img.texture = RES.getRes(fi["img"]);
                img.width = Math.ceil(img.width + 1);
                img.height = Math.ceil(img.height + 1);
                img.fillMode = egret.BitmapFillMode.SCALE;
                var iPos = this.GetPixelPosByGridPos(gX, gY);
                img.x = iPos["x"];
                img.y = iPos["y"];
                if (!fi["canPass"]) {
                    this.gridCanPass[gX][gY] = false;
                }
                this.gameLayer.addChild(img);
                this.fixedImage.push(img);
            }
        }
        //精灵层
        var fs = json["fixed_sprites"];
        if (fs) {
            for (var i = 0; i < fs.length; i++) {
                var fi = fs[i];
                var gX = fi["x"];
                var gY = fi["y"];
                var img = new eui.Image();
                img.texture = RES.getRes(fi["img"]);
                img.width = Math.ceil(img.width + 1);
                img.height = Math.ceil(img.height + 1);
                img.fillMode = egret.BitmapFillMode.SCALE;
                var iPos = this.GetPixelPosByGridPos(gX, gY);
                img.x = iPos["x"];
                img.y = iPos["y"];
                if (!fi["canPass"]) {
                    this.gridCanPass[gX][gY] = false;
                }
                this.gameLayer.addChild(img);
                //this.sprites.push(img);		//TODO SpriteClip
                this.fixedImage.push(img);
            }
        }
        //广告牌
        var adb = json["advboard"];
        if (adb) {
            this.advBoardGridX = adb["x"];
            this.advBoardGridY = adb["y"];
            this.advBoardWidth = adb["width"] ? adb["width"] : 2;
        }
    };
    //把汽车和主角放上去
    Street.prototype.PlaceBusAndMainCharacter = function (busJsonFileName) {
        var bJsonF = RES.getRes(busJsonFileName);
        var bJson = bJsonF["data"];
        //初始化
        if (this.busImage) {
            for (var i = 0; i < this.busImage.length; i++) {
                if (this.busImage[i] && this.busImage[i].parent) {
                    this.busImage[i].parent.removeChild(this.busImage[i]);
                }
            }
        }
        this.busImage = new Array();
        if (this.mainCharacter) {
            if (this.mainCharacter.head && this.mainCharacter.head.parent)
                this.mainCharacter.head.parent.removeChild(this.mainCharacter.head);
            if (this.mainCharacter.body && this.mainCharacter.body.parent)
                this.mainCharacter.body.parent.removeChild(this.mainCharacter.body);
        }
        //读取数据
        if (bJson) {
            //共用参数
            var busPos = this.GetPixelPosByGridPos(BusLeftInGrid, BusBottomInGrid);
            var busSX = busPos["x"];
            var busSY = busPos["y"] - BusAreaHeight + GridHeight;
            //最先绘制body
            var bodyInfo = bJson["body"];
            if (bodyInfo) {
                var img = new eui.Image();
                img.texture = RES.getRes(bodyInfo["img"]);
                var offX = bodyInfo["offsetX"] ? bodyInfo["offsetX"] : 0;
                var offY = bodyInfo["offsetY"] ? bodyInfo["offsetY"] : 0;
                img.x = busSX + offX;
                img.y = busSY + offY;
                this.gameLayer.addChild(img);
                this.busImage.push(img);
                this.mainCharacterZoneFloor = busSY + (bodyInfo["characterAreaOffsetY"] ? bodyInfo["characterAreaOffsetY"] : 0);
                this.mainCharacterZoneLeft = busSX + (bodyInfo["characterAreaOffsetX"] ? bodyInfo["characterAreaOffsetX"] : 0);
                this.mainCharacterZoneRight =
                    this.mainCharacterZoneLeft + (bodyInfo["characterAreaWidth"] ? bodyInfo["characterAreaWidth"] : 0);
            }
            //然后绘制主角(TODO 写死了现在，今后要传递)
            var mcX = (this.mainCharacterZoneRight - this.mainCharacterZoneLeft) / 2 + this.mainCharacterZoneLeft;
            this.mainCharacter = new CharacterObj(GetCharacterActionInfoByKey("schoolgirl"), mcX, this.mainCharacterZoneFloor);
            this.gameLayer.addChild(this.mainCharacter.head);
            this.gameLayer.addChild(this.mainCharacter.body);
            //接下来绘制车顶
            var topInfo = bJson["top"];
            var topImg = void 0;
            var topAnchorX = 0;
            var topAnchorY = 0;
            if (topInfo) {
                topImg = new eui.Image();
                topImg.texture = RES.getRes(topInfo["img"]);
                //这个坐标是要最后修的
                this.gameLayer.addChild(topImg);
                this.busImage.push(topImg);
                topAnchorX = topInfo["offsetX"] ? topInfo["offsetX"] : 0;
                topAnchorY = topInfo["offsetY"] ? topInfo["offsetY"] : 0;
            }
            //最后是车喷漆
            var paintInfo = bJson["paint"];
            if (paintInfo) {
                var img = new eui.Image();
                img.texture = RES.getRes(paintInfo["img"]);
                var offX = paintInfo["offsetX"] ? paintInfo["offsetX"] : 0;
                var offY = paintInfo["offsetY"] ? paintInfo["offsetY"] : 0;
                img.x = busSX + offX;
                img.y = busSY + offY;
                this.gameLayer.addChild(img);
                this.busImage.push(img);
                //车顶装潢位置
                topImg.x = busSX + (paintInfo["topCenterX"] ? paintInfo["topCenterX"] : 0) - topAnchorX;
                topImg.y = busSY + (paintInfo["topCenterY"] ? paintInfo["topCenterY"] : 0) - topAnchorY;
                //其他装潢
                var oInfo = paintInfo["addon"];
                if (oInfo) {
                    for (var i = 0; i < oInfo.length; i++) {
                        var thisAddonInfo = oInfo[i];
                        var imgName = thisAddonInfo["img"];
                        var imgOffX = thisAddonInfo["offsetX"] ? thisAddonInfo["offsetX"] : 0;
                        var imgOffY = thisAddonInfo["offsetY"] ? thisAddonInfo["offsetY"] : 0;
                        var addonImg = new eui.Image();
                        addonImg.texture = RES.getRes(imgName);
                        addonImg.x = busSX + imgOffX;
                        addonImg.y = busSY + imgOffY;
                        this.gameLayer.addChild(addonImg);
                        this.busImage.push(addonImg);
                    }
                }
            }
        }
    };
    //放一张桌子，这里可不管能不能放的下，只管放上去的
    Street.prototype.PlaceTable = function (table, gridX, gridY) {
        var tPos = this.GetPixelPosByGridPos(gridX, gridY, true);
        var t = new DiningTableObj(table, tPos["x"], tPos["y"]);
        this.gameLayer.addChild(t.Image);
        this.sprites.push(t.Image);
        this.diningTables.push(t);
        //TODO桌子椅子连接状态等
    };
    //放一张椅子，也是只负责放下去，不负责判断能不能放
    Street.prototype.PlaceChair = function (chairSource, gridX, gridY, dir) {
        var cPos = this.GetPixelPosByGridPos(gridX, gridY, true);
        var c = new ChairObj(chairSource, cPos["x"], cPos["y"], dir);
        this.gameLayer.addChild(c.image);
        this.sprites.push(c.image);
        this.diningChairs.push(c);
    };
    //放红绿灯
    Street.prototype.PlaceTrafficLight = function (gridX, gridY) {
        var tPos = this.GetPixelPosByGridPos(gridX, gridY);
        var tl = new TrafficLight(tPos["x"] + GridWidth / 2, tPos["y"] + GridHeight / 2);
        this.gameLayer.addChild(tl.seat);
        this.gameLayer.addChild(tl.red);
        this.gameLayer.addChild(tl.green);
        this.gameLayer.addChild(tl.yellow);
        this.sprites.push(tl.seat);
        this.sprites.push(tl.green);
        this.sprites.push(tl.yellow);
        this.sprites.push(tl.red);
        this.trafficLights.push(tl);
        tl.LightOn(this.GetTrafficLightState()["light"]);
        tl.Draw();
    };
    //放一个角色，这里的x,y都是像素级
    Street.prototype.PlaceCharacter = function (key, x, y) {
        if (key === void 0) { key = "schoolgirl"; }
        var cha = new CharacterObj(GetCharacterActionInfoByKey(key), x, y, new CharacterProperty());
        this.gameLayer.addChild(cha.body);
        this.gameLayer.addChild(cha.head);
        this.sprites.push(cha.body);
        this.sprites.push(cha.head);
        this.characters.push(cha);
        return cha;
    };
    //TODO 随机产生一个npc
    Street.prototype.RandomGatherNPC = function () {
        var sLocation = [
            { x: -3, y: Math.floor(Math.random() * this.ground.roadHeightInGrid - 2) + GameMapHeight + 3 },
            { x: GameMapWidth + 3, y: Math.floor(Math.random() * this.ground.roadHeightInGrid - 2) + GameMapHeight + 3 },
            { x: Math.floor(Math.random() * 3), y: GameMapHeight + this.ground.roadHeightInGrid + 5 }
        ];
        var slIndex = Math.floor(Math.random() * sLocation.length);
        var slRes = sLocation[slIndex];
        var slPos = this.GetPixelPosByGridPos(slRes["x"], slRes["y"], true);
        var startX = slPos["x"];
        var startY = slPos["y"] - Math.floor(Math.random() * GridHeight / 2);
        var chaKeyMay = ["schoolgirl"];
        var chaKey = chaKeyMay[Math.floor(Math.random() * chaKeyMay.length)];
        var cha = this.PlaceCharacter(chaKey, startX, startY);
        cha.property.speed = Math.floor(Math.random() * 3) + 4;
        var aiScr = [
            AIScripts.JustPassThroughFromRoad(cha, (GameMapWidth + 3) * GridWidth),
            AIScripts.JustPassThroughFromRoad(cha, -3 * GridWidth),
            AIScripts.JustPassThroughFromTrafficLight(this, cha)
        ];
        cha.ai.SetScripts(aiScr[slIndex]);
    };
    //测试用的角色
    Street.prototype.PlaceDebugCharacter = function () {
        var pos = this.GetPixelPosByGridPos(2, 0, true);
        var cha = this.PlaceCharacter("schoolgirl", pos["x"], pos["y"]);
        cha.property.speed = Math.floor(Math.random() * 3) + 4;
        cha.ai.SetScripts(AIScripts.DebugWalkForDirection(cha));
        for (var i = 0; i < 10; i++) {
            cha.ai.AddScripts(AIScripts.DebugWalkForDirection(cha));
        }
        var cha1 = this.PlaceCharacter("schoolgirl", pos["x"] + 150, pos["y"] + 75);
        cha1.property.speed = Math.floor(Math.random() * 3) + 4;
        cha1.ai.SetScripts(AIScripts.DebugDoAllAction(cha));
        for (var i = 0; i < 10; i++) {
            cha1.ai.AddScripts(AIScripts.DebugDoAllAction(cha));
        }
    };
    /**
     * 根据单元格坐标，获得在gameLayer上的坐标
     * @param {number} gridX 单元格坐标x
     * @param {number} gridY 单元格坐标y
     * @param {boolean} forCharacter 这个坐标是不是为角色准备的
     * @returns 返回坐标{x:number, y:number};
     */
    Street.prototype.GetPixelPosByGridPos = function (gridX, gridY, forCharacter) {
        if (forCharacter === void 0) { forCharacter = false; }
        var res = { x: -1, y: -1 };
        if (!this.ground)
            return res;
        res["x"] = Math.round(gridX * GridWidth + (forCharacter == true ? GridWidth / 2 : 0));
        res["y"] = Math.round(gridY * GridHeight + this.ground.groundTop + (forCharacter == true ? (GridHeight - 10) : 0));
        return res;
    };
    /**
     * 根据tick获得红绿灯的状态
     * @returns {Object} ["light":TrafficLightState, "toGreen":距离绿灯的tick数]
     */
    Street.prototype.GetTrafficLightState = function () {
        var greenTick = 150;
        var gShineTick = 30;
        var yellowTick = 30;
        var redTick = 150;
        var totalTick = greenTick + gShineTick + yellowTick + redTick;
        var cTick = this.tick % totalTick;
        var tls = TrafficLightState.Red;
        var toGreen = 0;
        if (cTick < greenTick) {
            tls = TrafficLightState.Green;
        }
        else if (cTick < greenTick + gShineTick) {
            tls = TrafficLightState.GreenShine;
            toGreen = totalTick - cTick;
        }
        else if (cTick < greenTick + gShineTick + yellowTick) {
            tls = TrafficLightState.Yellow;
            toGreen = totalTick - cTick;
        }
        else {
            toGreen = totalTick - cTick;
        }
        return {
            "light": tls,
            "toGreen": toGreen
        };
    };
    return Street;
}(eui.Component));
__reflect(Street.prototype, "Street", ["eui.UIComponent", "egret.DisplayObject"]);

;window.Main = Main;