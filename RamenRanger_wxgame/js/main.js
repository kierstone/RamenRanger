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
var SpriteGroup = (function (_super) {
    __extends(SpriteGroup, _super);
    function SpriteGroup() {
        return _super.call(this) || this;
    }
    SpriteGroup.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        //this.init();
    };
    /**
     * 经过比较，我是否改到下面一层
     */
    SpriteGroup.prototype.NeedToSendMeBack = function (compareGroup) {
        if (!compareGroup)
            return false;
        return this.y < compareGroup.y;
    };
    SpriteGroup.prototype.Update = function () { };
    SpriteGroup.prototype.FixedUpdate = function () { };
    ;
    return SpriteGroup;
}(eui.Group));
__reflect(SpriteGroup.prototype, "SpriteGroup");
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
            var login;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        egret.ImageLoader.crossOrigin = "anonymous"; //解决跨域问题
                        return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, platform.login()];
                    case 2:
                        login = _a.sent();
                        if (!login) return [3 /*break*/, 4];
                        return [4 /*yield*/, platform.getUserInfo(login)];
                    case 3:
                        //如果已经登陆了就这么办
                        GameUserInfo = _a.sent();
                        this.createGameScene();
                        return [3 /*break*/, 6];
                    case 4: 
                    //没有的话，就出现按钮
                    return [4 /*yield*/, platform.createLoginButton(function (thisObj, userInfo) {
                            GameUserInfo = userInfo;
                            thisObj.createGameScene();
                        }, this)];
                    case 5:
                        //没有的话，就出现按钮
                        _a.sent();
                        _a.label = 6;
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
                console.log("GameUserInfo", GameUserInfo);
                LoadGameData();
                Utils.UIRoot = this;
                playerInfo = new PlayerInfo();
                console.log(GameData_Ingredients, GameData_Bowl);
                this.addChild(new WelcomeScene());
                return [2 /*return*/];
            });
        });
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
var GameUserInfo; //游戏账号信息，来自各个平台的
var playerInfo;
var GameScene_FoodCourt;
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
                return [2 /*return*/, { nickName: "鲁大师", avatarUrl: "" }];
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
                return [2 /*return*/, { nickName: "鲁大师", avatarUrl: "icon_default" }];
            });
        });
    };
    DebugPlatform.prototype.shareGame = function (titleText, sX, sY, sWidth, sHeight, stageWidth, stageHeight, nextFuncCaller, nextFunc) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (nextFunc && nextFuncCaller) {
                    nextFunc(nextFuncCaller, true);
                }
                return [2 /*return*/];
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
    Utils.GetRandomIndexFromArray = function (arrLen, count) {
        var res = new Array();
        for (var i = 0; i < arrLen; i++) {
            res.push(i);
        }
        while (res.length > count) {
            var tIndex = Math.min(Math.floor(Math.random() * res.length), res.length - 1);
            res.splice(tIndex, 1);
        }
        return res;
    };
    Utils.RandomInt = function (minValue, maxValue) {
        if (minValue === void 0) { minValue = 0; }
        var ranRange = maxValue - minValue + 1;
        return Math.min(Math.floor(Math.random() * ranRange) + minValue, maxValue);
    };
    Utils.GetUniqueId = function (key) {
        var res = key;
        var rl = Utils.RandomInt(5, 10);
        for (var i = 0; i < rl; i++) {
            res += "_" + Utils.RandomInt(Number.MIN_VALUE, Number.MAX_VALUE);
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
    CraftNoodleState[CraftNoodleState["ShowPhoto"] = 6] = "ShowPhoto";
})(CraftNoodleState || (CraftNoodleState = {}));
//拉面食材难吃的类别，每吃一回合都有一个这个，当然大多值是none
var BadTaste;
(function (BadTaste) {
    BadTaste[BadTaste["None"] = 0] = "None";
    BadTaste[BadTaste["Hot"] = 10] = "Hot";
    BadTaste[BadTaste["TooHeavy"] = 12] = "TooHeavy";
    BadTaste[BadTaste["Disappointed"] = 13] = "Disappointed";
    BadTaste[BadTaste["Hatred"] = 15] = "Hatred"; //对应动作Hate，是吃到忌口了
})(BadTaste || (BadTaste = {}));
//吃面迷你游戏的状态
var EatRamenGameState;
(function (EatRamenGameState) {
    EatRamenGameState[EatRamenGameState["Enter"] = 0] = "Enter";
    EatRamenGameState[EatRamenGameState["Order"] = 1] = "Order";
    EatRamenGameState[EatRamenGameState["Wait"] = 2] = "Wait";
    EatRamenGameState[EatRamenGameState["Eat"] = 3] = "Eat";
    EatRamenGameState[EatRamenGameState["ReadyToLeave"] = 4] = "ReadyToLeave";
    EatRamenGameState[EatRamenGameState["Leave"] = 5] = "Leave"; //离去
})(EatRamenGameState || (EatRamenGameState = {}));
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
            this.unlockedIngredients.push(new LearntIngredient(GameData_Ingredients[j]));
        }
        for (var i = 0; i < GameData_Broth.length; i++) {
            this.unlockedBroth.push(new LearntBroth(GameData_Broth[i]));
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
    PlayerInfo.prototype.GetLearnedIngredientModel = function (ingredientId) {
        if (ingredientId == "" || !this.unlockedIngredients || this.unlockedIngredients.length <= 0)
            return null;
        for (var i = 0; i < this.unlockedIngredients.length; i++) {
            if (this.unlockedIngredients[i].model.id == ingredientId) {
                return this.unlockedIngredients[i].model;
            }
        }
        return null;
    };
    /**
     * 获取学会了某个素材，如果返回null就是没学会
     * @param {string} ingredientId 查询的ingredient的id
     * @returns {LearntIngredient} 返回要查询的素材model，如果Null代表没学会
     */
    PlayerInfo.prototype.GetLearnedIngredient = function (ingredientId) {
        if (ingredientId == "" || !this.unlockedIngredients || this.unlockedIngredients.length <= 0)
            return null;
        for (var i = 0; i < this.unlockedIngredients.length; i++) {
            if (this.unlockedIngredients[i].model.id == ingredientId) {
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
    PlayerInfo.prototype.GetLearnedBrothModel = function (brothId) {
        if (brothId == "" || !this.unlockedBroth || this.unlockedBroth.length <= 0)
            return null;
        for (var i = 0; i < this.unlockedBroth.length; i++) {
            if (this.unlockedBroth[i].model.id == brothId) {
                return this.unlockedBroth[i].model;
            }
        }
        return null;
    };
    /**
     * 获取学会了某个汤底，如果返回null就是没学会
     * @param {string} brothId 查询的broth的id
     * @returns {LearntBroth} 返回要查询的汤底model，如果Null代表没学会
     */
    PlayerInfo.prototype.GetLearnedBroth = function (brothId) {
        if (brothId == "" || !this.unlockedBroth || this.unlockedBroth.length <= 0)
            return null;
        for (var i = 0; i < this.unlockedBroth.length; i++) {
            if (this.unlockedBroth[i].model.id == brothId) {
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
    PlayerInfo.prototype.GetLearnedBowlModel = function (bowlId) {
        if (bowlId == "" || !this.unlockedBowl || this.unlockedBowl.length <= 0)
            return null;
        for (var i = 0; i < this.unlockedBowl.length; i++) {
            if (this.unlockedBowl[i].id == bowlId) {
                return this.unlockedBowl[i];
            }
        }
        return null;
    };
    /**
     * 点赞这碗面，对应的面使用的材料都将被点赞
     * @param {RamenObj} ramen 被点赞的拉面
     * @param {number} tickets 被点赞数
     */
    PlayerInfo.prototype.VoteRamen = function (ramen, tickets) {
        for (var i = 0; i < ramen.model.topping.length; i++) {
            var ing = this.GetLearnedIngredient(ramen.model.topping[i].model.id);
            if (ing != null) {
                ing.vote += tickets;
            }
        }
        var broth = this.GetLearnedBroth(ramen.model.broth.model.id);
        if (broth) {
            broth.vote += tickets;
        }
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
//旅行模式的小吃们
var GameData_FoodCourtDish;
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
var Scene_NoodleBrothSize = 60; //场景里的拉面的宽度高度
var Scene_PosScale = 0.12; //这是摆面界面的尺寸转化到面碗尺寸
var Scene_HorVerTimes = 2 / 3; //宽高比
var ResName_Broth_Highlight = "broth_highlight"; //汤上面的油光
var PlayerBaseHunger = 50; //玩家默认饱食度
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
        this.eatIngredientPos = new Array();
        if (data["ingredient_pos"]) {
            var ipd = data["ingredient_pos"];
            for (var i = 0; i < ipd.length; i++) {
                this.eatIngredientPos.push(new egret.Point(ipd[i]["x"] ? ipd[i]["x"] : 0, ipd[i]["y"] ? ipd[i]["y"] : 0));
            }
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
        this.isSitting = false; //如果sitting了，那么就不会执行ai了
        this.cInfo = characterActionInfo;
        this.CreateSpriteClipByInfo();
        this.SetPosition(x, y);
        this.ingredientPoint = new egret.Point(0, 0);
        this.hasIngredientPoint = false;
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
        // if (this.head){
        // 	this.head.x = 0;
        // 	this.head.y = 0;	
        // }
        // if (this.body){
        // 	this.body.x = 0;
        // 	this.body.y = 0;
        // }
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
        if (this.doingAction == CharacterAction.Eat && this.currentFrame < this.cInfo.eatIngredientPos.length && this.head) {
            this.hasIngredientPoint = true;
            this.ingredientPoint.x = -this.head.anchorOffsetX + this.cInfo.eatIngredientPos[this.currentFrame].x;
            this.ingredientPoint.y = -this.head.anchorOffsetY + this.cInfo.eatIngredientPos[this.currentFrame].y;
        }
        else {
            this.hasIngredientPoint = false;
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
        var requireInstantDraw = false;
        //没坐着就得执行ai
        // if (this.isSitting == false){
        // 	let todo:CharacterAIScript = this.ai.WhatToDo();
        // 	if (todo){
        // 		//处理移动
        // 		if (todo.doMove == true){
        // 			this.SetPosition(todo.moveToX, todo.moveToY);
        // 		}
        // 		//动作和方向改变，引起改变
        // 		let cD:boolean = todo.changeDirection;
        // 		let cA:boolean = this.IsSameAction(todo.doAction, this.doingAction) == false;
        // 		if (cD == true || cA == true){
        // 			this.ChangeAction(
        // 				cD == true ? todo.directionTo : this.direction,
        // 				cA == true ? todo.doAction : this.doingAction
        // 			);
        // 			requireInstantDraw = true;
        // 		}
        // 	}
        // }
        return requireInstantDraw;
    };
    /**
     * 判断角色是否在做某个动作
     * @param {CharacterAction} action 要判断的动作
     * @returns {boolean} 是否是正在做的
     */
    CharacterObj.prototype.IsDoingAction = function (action) {
        return action == this.doingAction;
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
    function CharacterProperty(buddy) {
        this.speed = 3; //每帧移动速度不同，年轻人肯定快一点
        this.buddyInfo = buddy;
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
var DiningTableModel = (function () {
    function DiningTableModel(tableSource, seats, tableWidth, tableScale9) {
        this.tableSource = tableSource;
        this.useScale9 = tableScale9 != null;
        this.tableScale9 = tableScale9;
        this.seats = seats;
        this.tableWidth = tableWidth;
    }
    return DiningTableModel;
}());
__reflect(DiningTableModel.prototype, "DiningTableModel");
var DiningTableObj = (function () {
    function DiningTableObj(model) {
        this.x = 0;
        this.y = 0;
        this.model = model;
    }
    return DiningTableObj;
}());
__reflect(DiningTableObj.prototype, "DiningTableObj");
var DiningSeatInfo = (function () {
    function DiningSeatInfo(source, x, y, ramenX, ramenY) {
        this.source = source;
        this.x = x;
        this.y = y;
        this.ramenX = ramenX;
        this.ramenY = ramenY;
    }
    return DiningSeatInfo;
}());
__reflect(DiningSeatInfo.prototype, "DiningSeatInfo");
/**
 * 把吃拉面的过程，当做是一个小游戏
 * 每一个回合计算当前的情况，并确定表演，同时表演时间决定到下一个回合的时间
 * 这样之后有玩法就可以插入到这里
 * 而吃拉面的相关属性也放在这里，并不放在角色里，角色是一个被读取用的数据源
 */
var EatingRamen = (function () {
    /**
     * @param {CharacterObj} cha 谁吃面
     * @param {RamenObj} ramen 吃的什么面
     * @param {boolean} favour 是否喜欢，如果是美食街，应该有喜欢不喜欢，否则根据算出来的计算
     */
    function EatingRamen(cha, ramen, favour) {
        if (favour === void 0) { favour = false; }
        //相关数据
        this.hungry = 100; //吃面的人的饥饿度，这个未来可以有算法，现在先100开始，到0就吃饱吃撑了
        this.heart = 0; //吃面开始到现在已经获得了多少爱心了
        this.runningTurnIndex = 0;
        this.runningActionIndex = 0;
        this.eatting = false;
        this.cha = cha;
        this.ramen = ramen;
        this.eatting = false;
        this.favour = favour;
        this.RunThisGame();
    }
    /**
     * 执行一个回合的逻辑思维，这个只有在回合开始一瞬间执行了
     * 当然是在EatRamenGameState.Eat才会运行
     */
    // private RunATurn(){
    // 	 //回合数先提高
    // 	 this.turnId += 1;
    // 	 //先看看你吃饱了就结束了
    // 	 if (this.hungry <= 0){
    // 		 this.gameState = EatRamenGameState.ReadyToLeave;
    // 		 this.cha.ChangeAction(this.cha.direction, CharacterAction.Stand);
    // 		 return; //TODO 没东西吃了，应该去后续状态
    // 	 }
    // 	 //选择要吃啥
    // 	 let eatIng = this.ThisTurnEat();
    // 	 if (eatIng == null){
    // 		 this.gameState = EatRamenGameState.ReadyToLeave;
    // 		 this.cha.ChangeAction(this.cha.direction, CharacterAction.Stand);
    // 		 return;	//TODO 没东西吃了，应该去后续状态
    // 	 }
    // 	 //根据吃的东西改变属性
    // 	 //根据吃的东西生成EatTurnAction和EatingAction
    // 	 this.ThisTurnModify(eatIng["ingredient"], eatIng["isNoodle"]);
    // }
    /**
     * 从头到尾模拟吃掉一碗面
     */
    EatingRamen.prototype.RunThisGame = function () {
        this.turnResult = new Array();
        this.toEatRamen = this.ramen.Clone(true);
        var turnId = 0;
        while (this.hungry > 0 && this.toEatRamen.HasFinished() == false) {
            //选择要吃啥
            var eatIng = this.ThisTurnEat(turnId++);
            if (eatIng == null) {
                break; //TODO 没东西吃了，应该去后续状态
            }
            //根据吃的东西改变属性
            //根据吃的东西生成EatTurnAction和EatingAction
            var toEatIng = this.ramen.GetToppingByUniqueId(eatIng["ingredient"]);
            this.ThisTurnModify(toEatIng, eatIng["isNoodle"], eatIng["noodleReduce"]);
        }
    };
    /**
     * 从拉面里选出这回合吃啥，当然目前是测试的，今后要改规则
     * @returns {Object} {ingredient:string(IngredientObj.uniqueId), isNoodle:boolean, noodleReduce:number(吃了百分之多少)} 返回吃的东西以及是否是面条
     */
    EatingRamen.prototype.ThisTurnEat = function (turnId) {
        if (this.toEatRamen.HasFinished() == true)
            return null;
        var noodlePerTaste = Math.min((this.ramen.topping.length > 0 ? (1 / this.ramen.topping.length + 1) : 0.2), 0.2); //每一口吃掉多少
        if ((turnId % 2) == 1) {
            //奇数回合吃料优先，TODO 找出最想吃的
            var ingForEat = this.toEatRamen.GetRandomToppingForEat();
            if (this.toEatRamen.topping.length > 0 && ingForEat) {
                var sIndex = this.toEatRamen.topping.indexOf(ingForEat);
                return {
                    "ingredient": this.toEatRamen.topping.splice(sIndex, 1)[0].uniqueId,
                    "isNoodle": false,
                    "noodleReduce": 0
                };
            }
            else if (this.toEatRamen.noodlePercentage > 0) {
                this.toEatRamen.noodlePercentage -= noodlePerTaste; //TODO 先写死一口吃12%，应该来自于属性
                return {
                    "ingredient": this.toEatRamen.model.noodles.uniqueId,
                    "isNoodle": true,
                    "noodleReduce": noodlePerTaste
                };
            }
        }
        else {
            if (this.toEatRamen.noodlePercentage > 0) {
                this.toEatRamen.noodlePercentage -= noodlePerTaste; //TODO 先写死一口吃6%，应该来自于属性
                return {
                    "ingredient": this.toEatRamen.model.noodles.uniqueId,
                    "isNoodle": true,
                    "noodleReduce": noodlePerTaste
                };
            }
            else if (this.toEatRamen.topping.length > 0 && this.toEatRamen.GetRandomToppingForEat() != null) {
                var ingForEat = this.toEatRamen.GetRandomToppingForEat();
                var sIndex = this.toEatRamen.topping.indexOf(ingForEat);
                return {
                    "ingredient": this.toEatRamen.topping.splice(sIndex, 1)[0].uniqueId,
                    "isNoodle": false,
                    "noodleReduce": 0
                };
            }
        }
        return null;
    };
    //根据吃的东西改变属性，并且获得行为列表 TODO 都是临时写死的
    EatingRamen.prototype.ThisTurnModify = function (eatIng, isNoodle, noodleReducePercent) {
        this.hungry -= 1;
        var satisify = Math.round(Math.random() * 200 - 100);
        var badTaste = BadTaste.None;
        var ranRes = Math.random();
        if (ranRes >= 0.95) {
            badTaste = BadTaste.Hatred;
        }
        else if (ranRes >= 0.9) {
            badTaste = BadTaste.Disappointed;
        }
        else if (ranRes >= 0.85) {
            badTaste = BadTaste.Hot;
        }
        else if (ranRes >= 0.8) {
            badTaste = BadTaste.TooHeavy;
        }
        var turnRes = new EatTurnAction(this.cha, eatIng, satisify, isNoodle, noodleReducePercent, badTaste);
        this.turnResult.push(turnRes);
        //this.__turnActions = this.__turnResult.GatherActionList(this.cha);
    };
    //返回是否立即重新绘制RamenSprite等内容
    EatingRamen.prototype.FixedUpdate = function () {
        var requireUpdate = false;
        if (this.eatting == true) {
            if (this.turnResult && this.runningTurnIndex < this.turnResult.length) {
                if (this.runningTurnIndex >= 0 &&
                    this.runningTurnIndex < this.turnResult.length &&
                    this.turnResult[this.runningTurnIndex].actions &&
                    this.runningActionIndex < this.turnResult[this.runningTurnIndex].actions.length) {
                    //老的回合做动作
                    var doingOne = this.turnResult[this.runningTurnIndex].actions[this.runningActionIndex];
                    if (doingOne.tick > 0) {
                        // this.cha.ChangeAction(this.cha.direction, doingOne.changeToAction);
                        doingOne.tick -= 1;
                    }
                    if (doingOne.tick <= 0) {
                        this.runningActionIndex += 1;
                        if (this.runningActionIndex < this.turnResult[this.runningTurnIndex].actions.length) {
                            this.cha.ChangeAction(this.cha.direction, this.turnResult[this.runningTurnIndex].actions[this.runningActionIndex].changeToAction);
                        }
                    }
                }
                else {
                    //新的动作改变拉面
                    this.runningTurnIndex += 1;
                    this.runningActionIndex = 0;
                    requireUpdate = true;
                    if (this.runningTurnIndex < this.turnResult.length) {
                        var tAct = this.turnResult[this.runningTurnIndex];
                        if (tAct.isEatingNoodles == true) {
                            //吃面条
                            this.ramen.noodlePercentage -= tAct.noodleReducePercentage;
                        }
                        else {
                            //吃盖浇
                            var ingIdx = this.ramen.topping.indexOf(tAct.eatIngredient);
                            if (ingIdx >= 0) {
                                this.ramen.topping.splice(ingIdx, 1);
                            }
                        }
                        var doingOne = this.turnResult[this.runningTurnIndex].actions[this.runningActionIndex];
                        this.cha.ChangeAction(this.cha.direction, doingOne.changeToAction);
                    }
                }
            }
            else {
                //吃完以后
                this.cha.ChangeAction(this.cha.direction, this.favour == false ? CharacterAction.Stand : CharacterAction.Smile);
            }
        }
        // switch(this.gameState){
        // 	case EatRamenGameState.Eat:{
        // 		if (this.__turnActions && this.__turnActions.length > 0){
        // 			let doingOne = this.__turnActions[0];
        // 			if (doingOne.tick > 0){
        // 				this.cha.ChangeAction(this.cha.direction, doingOne.changeToAction);
        // 				doingOne.tick -= 1;
        // 			}
        // 			if (doingOne.tick <= 0){
        // 				this.__turnActions.shift();
        // 			}
        // 		}else{
        // 			this.RunATurn();
        // 			requireUpdate = true;
        // 		}
        // 	}break;
        // }
        return requireUpdate;
    };
    /**
     * 获得当前运行中的turnResult
     */
    EatingRamen.prototype.CurrentTurnResult = function () {
        if (this.IsFinished() == true)
            return null;
        return this.turnResult[this.runningTurnIndex];
    };
    /**
     * 是否已经吃光了
     */
    EatingRamen.prototype.IsFinished = function () {
        if (!this.turnResult)
            return true;
        return this.runningTurnIndex >= this.turnResult.length;
    };
    /**
     * 临时的开吃
     */
    EatingRamen.prototype.StartEat = function () {
        this.eatting = false;
        if (this.ramen.HasFinished() == true)
            return;
        this.eatting = true;
        this.runningTurnIndex = -1; //为了第一口问题
        this.runningActionIndex = 0;
    };
    return EatingRamen;
}());
__reflect(EatingRamen.prototype, "EatingRamen");
/**
 * 首先我们把吃面的过程作为一个小游戏玩法，这样以后要扩展操作也简单
 * 只是吃面这个迷你游戏的每个回合要做些什么事情的数据结构
 */
var EatTurnAction = (function () {
    function EatTurnAction(cha, eatIngredient, satisfy, foodIsNoodle, noodleReducePercentage, badTaste) {
        this.eatIngredient = eatIngredient;
        this.satisfy = satisfy;
        this.badTaste = badTaste;
        this.isEatingNoodles = foodIsNoodle;
        this.noodleReducePercentage = noodleReducePercentage;
        this.cha = cha;
        this.GatherActionList(cha);
    }
    /**
     * 根据这个回合的结果，算出需要做的动作序列
     * @param {CharacterObj} cha 针对这个角色而算出的列表，因为要依赖动作长度
     */
    EatTurnAction.prototype.GatherActionList = function (cha) {
        this.actions = new Array();
        //吃的动作
        var eatTimes = this.isEatingNoodles == true ? 3 : 1; //如果是面条则吃3下
        for (var i = 0; i < eatTimes; i++) {
            this.actions.push(new EatingAction(cha.GetActionFrameCount(cha.direction, CharacterAction.Eat), CharacterAction.Eat));
        }
        //咀嚼2口
        for (var i = 0; i < 2; i++) {
            this.actions.push(new EatingAction(cha.GetActionFrameCount(cha.direction, CharacterAction.Chew), CharacterAction.Chew));
        }
        //如果恶心了，那么就做恶心的动作，否则就是根据高兴程度来
        var resAction = this.GetEatActionBySatisfy();
        this.actions.push(new EatingAction(cha.GetActionFrameCount(cha.direction, resAction), resAction));
        return this.actions;
    };
    //根据高兴程度获得吃这口面的结果
    EatTurnAction.prototype.GetEatActionBySatisfy = function () {
        if (this.badTaste != BadTaste.None) {
            //优先不爽的感觉
            switch (this.badTaste) {
                case BadTaste.Disappointed: return CharacterAction.Sigh;
                case BadTaste.Hatred: return CharacterAction.Hate;
                case BadTaste.Hot: return CharacterAction.Spicy;
                case BadTaste.TooHeavy: return CharacterAction.Salty;
            }
            return CharacterAction.Chew;
        }
        else if (this.satisfy > 80) {
            return CharacterAction.Smile;
        }
        else if (this.satisfy > 60) {
            return CharacterAction.Nod;
        }
        else if (this.satisfy < -90) {
            return CharacterAction.Hate;
        }
        else if (this.satisfy < -75) {
            return CharacterAction.Sigh;
        }
        else {
            return CharacterAction.Chew;
        }
    };
    return EatTurnAction;
}());
__reflect(EatTurnAction.prototype, "EatTurnAction");
/**
 * 吃东西的FixedUpdate的数据
 */
var EatingAction = (function () {
    //其他的比如喷出爱心等需要了再加
    function EatingAction(tick, toAction) {
        this.tick = tick;
        this.changeToAction = toAction;
    }
    return EatingAction;
}());
__reflect(EatingAction.prototype, "EatingAction");
var FoodCourtBuddy = (function () {
    function FoodCourtBuddy() {
        this.RandomOne();
    }
    FoodCourtBuddy.prototype.RandomOne = function () {
        this.portrait = new RandomPortrait(this.favourType);
        this.favourType = Utils.RandomInt(0, 3);
        this.favourLevel = Utils.RandomInt(3, 10);
        this.hunger = Utils.RandomInt(30, 45);
        this.body = "schoolgirl";
    };
    return FoodCourtBuddy;
}());
__reflect(FoodCourtBuddy.prototype, "FoodCourtBuddy");
/**
 * 美食街小吃的盖浇信息
 */
var FoodCourtDishToppingInfo = (function () {
    function FoodCourtDishToppingInfo(ingredientId, x, y, size, rotate) {
        if (size === void 0) { size = 1; }
        if (rotate === void 0) { rotate = 0; }
        this.size = 1;
        this.rotate = 0;
        this.ingredientId = ingredientId;
        this.x = x;
        this.y = y;
        this.size = size;
        this.rotate = rotate;
    }
    return FoodCourtDishToppingInfo;
}());
__reflect(FoodCourtDishToppingInfo.prototype, "FoodCourtDishToppingInfo");
/**
 * 美食街的美食，读取自表格
 */
var FoodCourtDishModel = (function () {
    function FoodCourtDishModel(data) {
        if (data)
            this.FromJson(data);
    }
    /**
    * 从json的Object获取到数据
    * @param {Object} json 存盘的json文件
    * @returns {boolean} 是否成功，如果id有异常则不会成功
    */
    FoodCourtDishModel.prototype.FromJson = function (json) {
        if (!json || json["id"] == null || json["id"] == undefined) {
            return false;
        }
        this.id = json["id"];
        this.name = json["name"] ? json["name"] : "";
        this.bowlId = json["bowl"] ? json["bowl"] : "";
        this.brothId = json["broth"] ? json["broth"] : "";
        this.riceId = json["rice"] ? json["rice"] : "";
        this.type = json["type"] ? json["type"] : 0;
        this.feed = json["feed"] ? json["feed"] : 0;
        this.topping = new Array();
        if (json["topping"]) {
            for (var i = 0; i < json["topping"].length; i++) {
                var ti = json["topping"][i];
                if (ti["ingredient"] && ti["ingredient"] != "") {
                    this.topping.push(new FoodCourtDishToppingInfo(ti["ingredient"], ti["x"] ? ti["x"] : 0, ti["y"] ? ti["y"] : 0, ti["size"] ? ti["size"] : 1, ti["rotate"] ? ti["rotate"] : 0));
                }
            }
        }
        this.reward = new Array();
        if (json["reward"]) {
            for (var i = 0; i < json["reward"].length; i++) {
                var fci = json["reward"][i];
                if (fci["ingredient"] && fci["ingredient"] != "") {
                    this.reward.push(new FoodCourtIngredient(fci["ingredient"], fci["exp"] ? fci["exp"] : 0, fci["broth"] ? fci["broth"] : false));
                }
            }
        }
    };
    return FoodCourtDishModel;
}());
__reflect(FoodCourtDishModel.prototype, "FoodCourtDishModel");
var FoodCourtDishObj = (function () {
    function FoodCourtDishObj(model) {
        this.model = model;
        this.SetIngredients(this.model.topping, this.model.bowlId, this.model.brothId, this.model.riceId);
    }
    FoodCourtDishObj.prototype.SetIngredients = function (ingredientId, bowlId, brothModelId, riceIngredientId) {
        var broth = null;
        if (brothModelId) {
            broth = GetBrothModelById(brothModelId);
        }
        var rice = null;
        if (riceIngredientId) {
            rice = GetIngredientModelById(riceIngredientId);
        }
        var bowl = GameData_Bowl[0]; //TODO 写死了第0个碗
        if (bowlId) {
            var b = GetBowlModelById(bowlId);
            if (b)
                bowl = b;
        }
        var rm = new RamenModel();
        rm.bowl = new BowlObj(bowl);
        rm.broth = broth == null ? null : new BrothObj(broth);
        rm.noodles = rice == null ? null : new IngredientObj(rice);
        rm.topping = new Array();
        for (var i = 0; i < ingredientId.length; i++) {
            var ingM = GetIngredientModelById(ingredientId[i].ingredientId);
            if (ingM) {
                var ing = new IngredientObj(ingM, ingredientId[i].x, ingredientId[i].y, ingredientId[i].rotate);
                ing.size = ingredientId[i].size;
                rm.topping.push(ing);
            }
        }
        this.dish = new RamenObj(rm);
    };
    return FoodCourtDishObj;
}());
__reflect(FoodCourtDishObj.prototype, "FoodCourtDishObj");
var FoodCourtIngredient = (function () {
    function FoodCourtIngredient(ingredientId, exp, broth) {
        if (broth === void 0) { broth = false; }
        this.broth = false;
        this.ingredientId = ingredientId;
        this.exp = exp;
        this.broth = broth;
    }
    return FoodCourtIngredient;
}());
__reflect(FoodCourtIngredient.prototype, "FoodCourtIngredient");
var FoodCourtDishType;
(function (FoodCourtDishType) {
    FoodCourtDishType[FoodCourtDishType["Red"] = 0] = "Red";
    FoodCourtDishType[FoodCourtDishType["Blue"] = 1] = "Blue";
    FoodCourtDishType[FoodCourtDishType["Yellow"] = 2] = "Yellow";
    FoodCourtDishType[FoodCourtDishType["White"] = 3] = "White";
})(FoodCourtDishType || (FoodCourtDishType = {}));
var GetFoodCourtDishTypeColor = function (ft) {
    var c = [
        0xFF0000,
        0xFFFF00,
        0x00FFFF,
        0x0000FF
    ];
    return c[ft];
};
var FoodCourtStoreObj = (function () {
    function FoodCourtStoreObj(sale) {
        this.onSale = sale;
        this.source = "stall_" + Utils.RandomInt(0, 3) + "_d";
    }
    return FoodCourtStoreObj;
}());
__reflect(FoodCourtStoreObj.prototype, "FoodCourtStoreObj");
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
        this.icon = json["icon"] ? json["icon"] : "";
        this.scene = json["scene"] ? json["scene"] : "";
        this.sceneCenterX = json["x"] ? json["x"] : 0;
        this.sceneCenterY = json["y"] ? json["y"] : 0;
        this.radius = json["radius"] ? json["radius"] : 200;
        this.cost = json["cost"] ? json["cost"] : 1;
        return true;
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
    BowlObj.prototype.RandomPosInBowl = function () {
        var ranRa = Math.random() * 360 / 180 * Math.PI;
        var ranLen = Math.random() * this.model.radius * 0.9;
        return new egret.Point(Math.cos(ranRa) * ranLen, Math.sin(ranRa) * ranLen);
    };
    return BowlObj;
}());
__reflect(BowlObj.prototype, "BowlObj");
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
        this.rare = json["rare"] ? json["rare"] : 0;
        this.cost = json["cost"] ? json["cost"] : 0;
        this.pungency = json["pungency"] ? json["pungency"] : 0;
        this.spicy = json["spicy"] ? json["spicy"] : 0;
        this.sweet = json["sweet"] ? json["sweet"] : 0;
        this.salty = json["salty"] ? json["salty"] : 0;
        this.sour = json["sour"] ? json["sour"] : 0;
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
    /**
     * 获取用于场景中面条的的shape
     * @param {number} centerX 中心x坐标
     * @param {number} centerY 中心y坐标
     * @param {number} radius 半径
     * @returns {egret.Shape} 用于icon的shape
     */
    BrothModel.prototype.SceneShape = function (centerX, centerY, radius) {
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
        var sizes = [0, 102, 216.75, 255];
        var alphas = new Array();
        var loopLen = Math.min(sizes.length, this.coverColor.length);
        for (var i = 0; i < loopLen; i++) {
            alphas.push(this.coverAlpha);
            //sizes.push((i+1) * 255 / this.coverColor.length);
        }
        shp.graphics.beginGradientFill(egret.GradientType.RADIAL, this.coverColor, alphas, sizes, brothMatrix);
        shp.graphics.drawCircle(0, 0, radius);
        shp.graphics.endFill();
        return shp;
    };
    /**
     * 获取用于场景中面条的的shape
     * @param {egret.Graphics} toGraphic 要打印到的graphic
     * @param {number} centerX 中心x坐标
     * @param {number} centerY 中心y坐标
     * @param {number} radius 半径
     */
    BrothModel.prototype.DrawToGraphic = function (toGraphic, centerX, centerY, radius) {
        if (!toGraphic)
            return;
        var brothMatrix = new egret.Matrix();
        brothMatrix.createGradientBox(radius * 2, radius * 2, 0, centerX - radius, centerY - radius);
        //底色
        toGraphic.lineStyle(1, this.backColor);
        toGraphic.beginFill(this.backColor, 1);
        toGraphic.drawCircle(centerX, centerY, radius);
        toGraphic.endFill();
        //烫的渐变cover
        var sizes = [0, 102, 216.75, 255];
        var alphas = new Array();
        var loopLen = Math.min(sizes.length, this.coverColor.length);
        for (var i = 0; i < loopLen; i++) {
            alphas.push(this.coverAlpha);
            //sizes.push((i+1) * 255 / this.coverColor.length);
        }
        toGraphic.beginGradientFill(egret.GradientType.RADIAL, this.coverColor, alphas, sizes, brothMatrix);
        toGraphic.drawCircle(0, 0, radius);
        toGraphic.endFill();
    };
    return BrothModel;
}());
__reflect(BrothModel.prototype, "BrothModel");
var LearntBroth = (function () {
    function LearntBroth(model) {
        this.vote = 0;
        this.model = model;
    }
    return LearntBroth;
}());
__reflect(LearntBroth.prototype, "LearntBroth");
var BrothObj = (function () {
    function BrothObj(model) {
        this.model = model;
    }
    return BrothObj;
}());
__reflect(BrothObj.prototype, "BrothObj");
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
        this.icon = json["icon"] ? json["icon"] : "";
        this.scene = json["scene"] ? json["scene"] : "";
        this.radius = json["radius"] ? json["radius"] : 0;
        this.canBeUsed = json["using"] ? json["using"] : 0;
        this.liquid = json["liquid"] ? json["liquid"] : false;
        this.eat = json["eat"] ? json["eat"] : false;
        this.rare = json["rare"] ? json["rare"] : 0;
        this.cost = json["cost"] ? json["cost"] : 0;
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
        this.uniqueId = Utils.GetUniqueId("IngredientObj");
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
        var res = new eui.Image(RES.getRes(this.model.img));
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
     * 根据当前情况创建一个新的eui.Image
     * @param {eui.Group} parent 要放到什么父亲
     * @param {number} centerX 面碗中心的x坐标
     * @param {number} centerY 面碗中心的y坐标
     * @returns {eui.Image} 创建出来的image
     */
    IngredientObj.prototype.GatherSceneImage = function (parent, centerX, centerY) {
        if (!parent)
            return null;
        var res = new eui.Image(RES.getRes(this.model.scene));
        parent.addChild(res);
        res.anchorOffsetX = res.width / 2;
        res.anchorOffsetY = res.height / 2;
        res.x = Math.round(this.x * Scene_PosScale + centerX);
        res.y = Math.round(this.y * Scene_PosScale + centerY);
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
     * @param {boolean} sameUid 克隆出来的是否连uniqueId都和这个是一样的
     * @returns {IngredientObj} 克隆体
     */
    IngredientObj.prototype.Clone = function (sameUid) {
        if (sameUid === void 0) { sameUid = false; }
        var res = new IngredientObj(this.model, this.x, this.y, this.rotation);
        if (sameUid == true)
            res.uniqueId = this.uniqueId;
        res.xFlip = this.xFlip;
        res.size = this.size;
        return res;
    };
    return IngredientObj;
}());
__reflect(IngredientObj.prototype, "IngredientObj");
/**
 * 玩家学会的素材配方
 */
var LearntIngredient = (function () {
    function LearntIngredient(model) {
        this.vote = 0; //被赞了多少次
        this.model = model;
    }
    return LearntIngredient;
}());
__reflect(LearntIngredient.prototype, "LearntIngredient");
//素材用途
var IngredientUseType;
(function (IngredientUseType) {
    IngredientUseType[IngredientUseType["UseType_None"] = 0] = "UseType_None";
    IngredientUseType[IngredientUseType["UseType_Tare"] = 1] = "UseType_Tare";
    IngredientUseType[IngredientUseType["UseType_Broth"] = 2] = "UseType_Broth";
    IngredientUseType[IngredientUseType["UseType_Noodle"] = 4] = "UseType_Noodle";
    IngredientUseType[IngredientUseType["UseType_Topping"] = 8] = "UseType_Topping";
})(IngredientUseType || (IngredientUseType = {}));
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
    /**
     * 判断坐标点在哪个Tare上了
     * @param {number} x 坐标点x
     * @param {number} y 坐标点y
     * @param {number} thisX 拉面的x坐标
     * @param {number} thisY 拉面的y坐标
     * @param {boolean} removeTouchOne 是否从tare里面移除掉这个
     * @returns {IngredientObj} 点中的那个，null代表没有
     */
    RamenModel.prototype.TouchedTare = function (x, y, thisX, thisY, removeTouchOne) {
        if (!this.tare || this.tare.length <= 0)
            return null;
        //越后面的在越上面，越容易被点到
        for (var i = this.tare.length - 1; i >= 0; i--) {
            var tp = this.tare[i];
            if (tp.TouchOnMe(x, y, thisX, thisY) == true) {
                if (removeTouchOne == true) {
                    return this.tare.splice(i, 1)[0];
                }
                else {
                    return tp;
                }
            }
        }
        return null;
    };
    /**
     * 随机创建一碗“拉面”
     * @param {BowlModel} bowl 用的碗的model，这个必须有
     * @param {BrothModel} broth 用的汤底，可以是null
     * @param {Array<IngredientModel>} tare 着味，可以是null
     * @param {IngredientModel} noodles 用的面条，可以是null
     * @param {Array<IngredientModel>} toppings 盖浇，当然也可以是null
     */
    RamenModel.prototype.RandomRamen = function (bowl, broth, tare, noodles, toppings) {
        if (!bowl)
            return;
        this.bowl = new BowlObj(bowl);
        if (broth) {
            this.broth = new BrothObj(broth);
        }
        if (tare) {
            for (var i = 0; i < tare.length; i++) {
                this.tare.push(new IngredientObj(tare[i]));
            }
        }
        if (noodles) {
            this.noodles = new IngredientObj(noodles);
        }
        if (toppings) {
            for (var i = 0; i < toppings.length; i++) {
                var pos = this.bowl.RandomPosInBowl();
                this.topping.push(new IngredientObj(toppings[i], pos.x, pos.y, Math.random() * 360));
            }
            this.topping.sort(function (t1, t2) {
                if (t1.y < t2.y) {
                    return -1;
                }
                else if (t1.y > t2.y) {
                    return 1;
                }
                else {
                    return t1.x <= t2.x ? -1 : 1;
                }
            });
        }
    };
    return RamenModel;
}());
__reflect(RamenModel.prototype, "RamenModel");
var RamenObj = (function () {
    function RamenObj(model, toppings) {
        this.noodlePercentage = 1; //0-1 as 0%-100%
        this.brothPercentage = 1;
        this.topping = new Array();
        if (model)
            this.SetModel(model, toppings);
    }
    /**
     * 设置进去
     * @param {RamenModel} model 拉面的model
     * @param {Array<IngredientObj>} toppings 如果不存在，就是新建一个；否则就用输入的
     */
    RamenObj.prototype.SetModel = function (model, toppings) {
        if (!model)
            return;
        this.model = model;
        if (!toppings) {
            this.topping = new Array();
            for (var i = 0; i < this.model.topping.length; i++) {
                this.topping.push(this.model.topping[i].Clone(false));
            }
        }
        else {
            this.topping = toppings;
        }
        this.cantEatToppings = new Array();
        for (var i = 0; i < this.topping.length; i++) {
            if (this.topping[i].model.eat == false) {
                this.cantEatToppings.push(this.topping[i]);
            }
        }
        this.noodlePercentage = this.model.noodles ? 1 : 0;
        this.brothPercentage = this.model.broth ? 1 : 0;
    };
    /**
     * 克隆这碗拉面
     * @param {boolean} sameIngredientUid 是否所有的topping采用和这碗一样的uniqueId
     */
    RamenObj.prototype.Clone = function (sameIngredientUid) {
        if (sameIngredientUid == false) {
            return new RamenObj(this.model);
        }
        else {
            var ing = new Array();
            for (var i = 0; i < this.topping.length; i++) {
                ing.push(this.topping[i].Clone(true));
            }
            return new RamenObj(this.model, ing);
        }
    };
    /**
     * 根据uniqueId来获取某个topping
     * @param {string} uid 要查找的uid
     * @returns {IngredientObj} 返回topping，如果是null就是没找到
     */
    RamenObj.prototype.GetToppingByUniqueId = function (uid) {
        for (var i = 0; i < this.topping.length; i++) {
            if (this.topping[i].uniqueId == uid) {
                return this.topping[i];
            }
        }
        return null;
    };
    /**
     * 判断是否已经吃光了
     */
    RamenObj.prototype.HasFinished = function () {
        if (Math.floor(this.noodlePercentage * 10) > 1)
            return false; //浮点问题所以这么干
        for (var i = 0; i < this.topping.length; i++) {
            if (this.topping[i].model.eat == true) {
                return false; //还有要吃的东西
            }
        }
        return true;
    };
    /**
     * 随机可以吃的Topping
     */
    RamenObj.prototype.GetRandomToppingForEat = function () {
        var res = new Array();
        for (var i = 0; i < this.topping.length; i++) {
            if (this.cantEatToppings.indexOf(this.topping[i]) < 0) {
                res.push(this.topping[i]);
            }
        }
        if (res.length > 0) {
            var idx = Utils.GetRandomIndexFromArray(res.length, 1)[0];
            return res[idx];
        }
        return null;
    };
    return RamenObj;
}());
__reflect(RamenObj.prototype, "RamenObj");
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
    function TrafficLight() {
        this.ticked = 0;
        this.init();
    }
    TrafficLight.prototype.init = function () {
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
        var x = 0;
        var y = 0;
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
var CharacterSprite = (function (_super) {
    __extends(CharacterSprite, _super);
    function CharacterSprite(chaObj) {
        var _this = _super.call(this) || this;
        _this.character = chaObj;
        return _this;
    }
    CharacterSprite.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    CharacterSprite.prototype.init = function () {
        this.head = this.character.head;
        this.body = this.character.body;
        this.emote = this.character.emote;
        //this._character.SetPosition(0, 0);
        //注意加入顺序
        if (this.body)
            this.addChild(this.body);
        if (this.head)
            this.addChild(this.head);
        if (this.emote)
            this.addChild(this.emote);
        var pos = this.character.GetPos();
        this.x = pos.x;
        this.y = pos.y;
    };
    CharacterSprite.prototype.IsCharacter = function (cha) {
        return this.character == cha;
    };
    CharacterSprite.prototype.Update = function () {
        this.character.Update();
    };
    CharacterSprite.prototype.FixedUpdate = function () {
        if (this.character.FixedUpdate() == true) {
            this.character.Update();
        }
        var pos = this.character.GetPos();
        this.x = pos.x;
        this.y = pos.y;
    };
    return CharacterSprite;
}(SpriteGroup));
__reflect(CharacterSprite.prototype, "CharacterSprite");
var DiningTableSprite = (function (_super) {
    __extends(DiningTableSprite, _super);
    //TODO桌子信息等
    function DiningTableSprite(dt) {
        var _this = _super.call(this) || this;
        _this.dtObj = dt;
        return _this;
    }
    DiningTableSprite.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    DiningTableSprite.prototype.init = function () {
        //TODO 椅子写死
        this.chair = new Array(); //new eui.Image(RES.getRes("wooden_chair"));
        this.eatingCha = new Array();
        for (var i = 0; i < this.dtObj.model.seats.length; i++) {
            var sInfo = this.dtObj.model.seats[i];
            var se = new eui.Image();
            se.texture = RES.getRes(sInfo.source);
            this.addChild(se);
            se.anchorOffsetX = se.width / 2;
            se.anchorOffsetY = se.height / 2;
            se.x = this.dtObj.x + this.dtObj.model.seats[i].x;
            se.y = this.dtObj.y + this.dtObj.model.seats[i].y - 10; //TODO 写死椅子的位置
            this.chair.push(se);
            this.eatingCha.push(new EatingCharacterInfo(this));
        }
        // this.addChild(this.chair);
        // this.chair.anchorOffsetX = this.chair.width / 2;
        // this.chair.anchorOffsetY = this.chair.height + 50;
        // this.chair.visible = false;
        this.table = new eui.Image(); //RES.getRes("wooden_single_table")
        this.table.texture = RES.getRes(this.dtObj.model.tableSource);
        this.addChild(this.table);
        this.table.width = this.dtObj.model.tableWidth;
        this.table.anchorOffsetX = this.table.width / 2;
        this.table.anchorOffsetY = this.table.height;
        if (this.dtObj.model.useScale9 == true) {
            var rc = new egret.Rectangle(this.dtObj.model.tableScale9.x, 0, this.dtObj.model.tableScale9.width, this.table.height);
            this.table.scale9Grid = rc;
        }
    };
    DiningTableSprite.prototype.ResetZOrder = function () {
        var idxPlues = this.eatingCha.length;
        var bodies = new Array();
        var heads = new Array();
        var emotes = new Array();
        var ramens = new Array();
        var eatings = new Array();
        for (var i = 0; i < this.eatingCha.length; i++) {
            if (this.eatingCha[i].cha) {
                if (this.eatingCha[i].cha.body)
                    bodies.push(this.eatingCha[i].cha.body);
                if (this.eatingCha[i].cha.head)
                    heads.push(this.eatingCha[i].cha.head);
                if (this.eatingCha[i].cha.emote)
                    emotes.push(this.eatingCha[i].cha.emote);
            }
            if (this.eatingCha[i].ramenSpr)
                ramens.push(this.eatingCha[i].ramenSpr);
            if (this.eatingCha[i].eatingIngImg)
                eatings.push(this.eatingCha[i].eatingIngImg);
        }
        if (this.chair) {
            for (var i = 0; i < this.chair.length; i++)
                this.chair[i].zIndex = 0 + i;
        }
        if (bodies) {
            for (var i = 0; i < bodies.length; i++)
                if (bodies[i])
                    bodies[i].zIndex = idxPlues * 2 + i;
        }
        if (this.table) {
            this.table.zIndex = idxPlues * 3;
        }
        if (ramens) {
            for (var i = 0; i < ramens.length; i++) {
                if (ramens[i])
                    ramens[i].zIndex = idxPlues * 4 + i;
            }
        }
        if (heads) {
            for (var i = 0; i < heads.length; i++) {
                if (heads[i])
                    heads[i].zIndex = idxPlues * 5 + i;
            }
        }
        if (eatings) {
            for (var i = 0; i < eatings.length; i++) {
                if (eatings[i])
                    eatings[i].zIndex = idxPlues * 6 + i;
            }
        }
        this.sortChildren();
    };
    /**
     * 开吃了
     */
    DiningTableSprite.prototype.StartEat = function () {
        for (var i = 0; i < this.eatingCha.length; i++) {
            this.eatingCha[i].eatGame.StartEat();
        }
    };
    /**
     * 现在的角色从椅子上挪走
     */
    DiningTableSprite.prototype.RemoveCharacter = function (cha) {
        for (var i = 0; i < this.eatingCha.length; i++) {
            if (this.eatingCha[i].cha == cha) {
                this.eatingCha[i].RemoveMe();
                return;
            }
        }
        // if (this.body){
        // 	if (this.body.parent) this.body.parent.removeChild(this.body);
        // 	this.body = null;
        // }
        // if (this.head){
        // 	if (this.head.parent) this.head.parent.removeChild(this.head);
        // 	this.head = null;
        // }
        // if (this.emote){
        // 	if (this.emote.parent) this.emote.parent.removeChild(this.emote);
        // 	this.emote = null;
        // }
        // this.chair.visible = false;
        // if (this._cha){
        // 	this._cha.isSitting = false;
        // }
        // this._cha = null;
        // this.eatGame = null;
    };
    /**
     * 让角色做到凳子上，TODO，现在凳子数据写死
     */
    DiningTableSprite.prototype.SetCharacterToSeat = function (seatIndex, cha, foodCourtFavour) {
        if (foodCourtFavour === void 0) { foodCourtFavour = false; }
        this.RemoveCharacter(cha);
        if (seatIndex < 0 || seatIndex >= this.eatingCha.length)
            return;
        var eCha = this.eatingCha[seatIndex];
        //this.chair.visible = true;
        if (!cha)
            return;
        var chaX = this.dtObj.model.seats[seatIndex].x;
        var chaY = this.dtObj.model.seats[seatIndex].y; //-50
        eCha.SetCharacter(cha, chaX, chaY, foodCourtFavour);
        // if (this._cha.body){
        // 	this.body = this._cha.body;
        // 	this.body.x = chaX;
        // 	this.body.y = chaY;
        // 	this.addChild(this.body);
        // }
        // if (this._cha.head){
        // 	this.head = this._cha.head;
        // 	this.head.x = chaX;
        // 	this.head.y = chaY;
        // 	this.addChild(this.head);
        // }
        // if (this._cha.emote){
        // 	this.emote = this._cha.emote;
        // 	this.emote.x = chaX;
        // 	this.emote.y = chaY;
        // 	this.addChild(this.emote);
        // }
        // this._cha.isSitting = true;
        // if (this._cha && this._ramen)
        // 	this.eatGame = new EatingRamen(this._cha, this._ramen);
        this.ResetZOrder();
    };
    /**
     * 删除拉面
     */
    DiningTableSprite.prototype.RemoveRamen = function (seatIndex) {
        // if (this.ramen){
        // 	if (this.ramen.parent) this.ramen.parent.removeChild(this.ramen);
        // 	this.ramen = null;
        // 	this._ramen = null;
        // }
        if (seatIndex < 0 || seatIndex >= this.eatingCha.length || !this.eatingCha[seatIndex])
            return;
        this.eatingCha[seatIndex].RemoveRamen();
    };
    /**
     * 上拉面
     */
    DiningTableSprite.prototype.PlaceRamenToSeat = function (seatIndex, ramen) {
        this.RemoveRamen(seatIndex);
        if (!ramen || seatIndex < 0 || seatIndex >= this.eatingCha.length)
            return;
        this.eatingCha[seatIndex].SetRamen(ramen, this.dtObj.model.seats[seatIndex].ramenX, this.dtObj.model.seats[seatIndex].ramenY);
        // this._ramen = ramen;
        // this.ramen = new RamenSprite(this._ramen);
        // this.ramen.y = -24;	//TODO 写死
        // this.addChild(this.ramen);
        // if (this._cha && this._ramen)
        // 	this.eatGame = new EatingRamen(this._cha, this._ramen);
        this.ResetZOrder();
    };
    /**
     * 根据eatGame状态重绘一些图形
     */
    DiningTableSprite.prototype.RefreshByEatGame = function () {
        // this.ramen.UpdateRamen();
        // if (this.eatingIngImg && this.eatingIngImg.parent){
        // 	this.eatingIngImg.parent.removeChild(this.eatingIngImg);
        // }
        // let turnRes = this.eatGame.CurrentTurnResult();
        // if (turnRes != null){
        // 	this.eatingNoodle = turnRes.isEatingNoodles;
        // 	if (this.eatingNoodle == true){
        // 		//如果吃的是面条
        // 		this.eatingIngImg = new eui.Image();
        // 		this.eatingIngImg.source = RES.getRes("eating_noodle");
        // 		this.addChild(this.eatingIngImg);
        // 		this.eatingIngImg.anchorOffsetX = this.eatingIngImg.width /2;
        // 		this.eatingIngImg.anchorOffsetY = this.eatingIngImg.height;
        // 		this.eatingIngImg.x = this.ramen.x;
        // 		this.eatingIngImg.y = this.ramen.BrothOffsetY() + this.ramen.y;
        // 		this.eatingIngImg.scaleY = 0;
        // 		this.noodlePos.y = Number.MAX_VALUE;	//重置面条的位置
        // 	}else{
        // 		//如果吃的是Toppings
        // 		this.eatingIngImg = turnRes.eatIngredient.GatherSceneImage(
        // 			this, 0, 0
        // 		);
        // 		this.eatingIngImg.scaleY = 1;
        // 	}
        // 	this.eatingIngImg.visible = false;
        // }
        this.ResetZOrder();
    };
    /**
     * 获得某个SeatInfo
     */
    DiningTableSprite.prototype.GetSeatInfoByIndex = function (index) {
        if (index < 0 || index >= this.dtObj.model.seats.length)
            return null;
        return this.dtObj.model.seats[index];
    };
    /**
     * 给所有坐了人的位置，上一份指定拉面
     */
    DiningTableSprite.prototype.PlaceRamenToAllCharacter = function (ramen) {
        for (var i = 0; i < this.eatingCha.length; i++) {
            this.eatingCha[i].RemoveRamen();
            var rX = 0;
            var rY = 0;
            if (i < this.dtObj.model.seats.length) {
                rX = this.dtObj.model.seats[i].ramenX;
                rY = this.dtObj.model.seats[i].ramenY;
            }
            if (this.eatingCha[i].cha) {
                this.eatingCha[i].SetRamen(ramen, rX, rY);
            }
        }
    };
    DiningTableSprite.prototype.Update = function () {
        for (var i = 0; i < this.eatingCha.length; i++) {
            this.eatingCha[i].Update();
        }
        // if (this._cha){
        // 	this._cha.Update();
        // 	if (this.eatingIngImg){
        // 		let ingVisible = 	//吃的东西本帧是否可见？
        // 			this.eatingNoodle == true ? //吃的是面条和不是面条还不同
        // 			(this._cha.IsDoingAction(CharacterAction.Eat) && (this.eatingIngImg.visible == true || this._cha.hasIngredientPoint == true)):	//如果是面条，则看动作是否是吃、并且面条已经被绘制了
        // 			(this._cha.hasIngredientPoint == true)  //否则看的是有没有数据点
        // 		if (ingVisible == true){
        // 			let chaPos = this._cha.GetPos();
        // 			if (this.eatingNoodle == false){
        // 				//Topping跟着手的位置走
        // 				this.eatingIngImg.x = this._cha.ingredientPoint.x + chaPos.x;
        // 				this.eatingIngImg.y = this._cha.ingredientPoint.y + chaPos.y;		
        // 			}else{
        // 				//Noodle就拉伸
        // 				let noodleFlip = true; //是否要旋转面条
        // 				if (this._cha.hasIngredientPoint == true){
        // 					this.noodlePos.x = this._cha.ingredientPoint.x + chaPos.x;	//x坐标绝对信任
        // 					let noodlePosY = this._cha.ingredientPoint.y + chaPos.y;
        // 					if (noodlePosY <  this.noodlePos.y){
        // 						this.noodlePos.y = noodlePosY; //y取小的保持高度
        // 						noodleFlip = false;	//还在拉伸，所以不要抽搐
        // 					}
        // 				}
        // 				this.eatingIngImg.x = this.noodlePos.x;
        // 				let noodleScaleY = (this.eatingIngImg.y - this.noodlePos.y)/this.eatingIngImg.height;
        // 				this.eatingIngImg.scaleY = this.eatingIngImg.height > 0 ? noodleScaleY : 0;
        // 				if (noodleFlip == true) this.eatingIngImg.scaleX *= -1;
        // 			}
        // 		}
        // 		this.eatingIngImg.visible = ingVisible;
        // 	}
        // }
    };
    DiningTableSprite.prototype.FixedUpdate = function () {
        for (var i = 0; i < this.eatingCha.length; i++) {
            this.eatingCha[i].FixedUpdate();
        }
        // if (this._cha){
        // 	if  (this._cha.FixedUpdate() == true){
        // 		this._cha.Update();
        // 	}
        // }
        // if (this.eatGame){
        // 	if (this.eatGame.FixedUpdate() == true){
        // 		this.RefreshByEatGame();
        // 	}
        // }
        this.ResetZOrder();
    };
    return DiningTableSprite;
}(SpriteGroup));
__reflect(DiningTableSprite.prototype, "DiningTableSprite");
var EatingCharacterInfo = (function () {
    function EatingCharacterInfo(p) {
        this.noodlePos = new egret.Point(0, 0);
        this._p = p;
    }
    EatingCharacterInfo.prototype.SetCharacter = function (cha, x, y, isFoodCourtFavour) {
        if (isFoodCourtFavour === void 0) { isFoodCourtFavour = false; }
        this.isFoodCourtFavour = isFoodCourtFavour;
        this.cha = cha;
        this.cha.SetPosition(x, y);
        // this.head = cha.head;
        // this.body = cha.body;
        // this.emote = cha.emote;
        if (cha.head) {
            this._p.addChild(cha.head);
            cha.head.x = x;
            cha.head.y = y;
        }
        if (cha.body) {
            this._p.addChild(cha.body);
            cha.body.x = x;
            cha.body.y = y;
        }
        if (cha.emote) {
            this._p.addChild(cha.emote);
            cha.emote.x = x;
            cha.emote.y = y;
        }
        cha.isSitting = true;
        this.GatherEatingGame();
    };
    EatingCharacterInfo.prototype.SetRamen = function (ramen, atTableX, atTableY) {
        this.ramenObj = ramen;
        this.ramenSpr = new RamenSprite(this.ramenObj);
        if (this.ramenSpr) {
            this._p.addChild(this.ramenSpr);
            this.ramenSpr.x = atTableX;
            this.ramenSpr.y = atTableY;
        }
        this.GatherEatingGame();
    };
    EatingCharacterInfo.prototype.SetEatingIngredient = function () {
        if (this.eatingIngImg)
            this._p.addChild(this.eatingIngImg);
    };
    EatingCharacterInfo.prototype.GatherEatingGame = function () {
        if (this.cha && this.ramenObj) {
            this.eatGame = new EatingRamen(this.cha, this.ramenObj, this.isFoodCourtFavour);
        }
    };
    EatingCharacterInfo.prototype.RemoveMe = function () {
        if (this.cha.head && this.cha.head.parent)
            this.cha.head.parent.removeChild(this.cha.head);
        if (this.cha.body && this.cha.body.parent)
            this.cha.body.parent.removeChild(this.cha.body);
        if (this.cha.emote && this.cha.emote.parent)
            this.cha.emote.parent.removeChild(this.cha.emote);
        if (this.ramenSpr && this.ramenSpr.parent)
            this.ramenSpr.parent.removeChild(this.ramenSpr);
        if (this.eatingIngImg && this.eatingIngImg.parent)
            this.eatingIngImg.parent.removeChild(this.eatingIngImg);
        this.eatGame = null;
    };
    EatingCharacterInfo.prototype.RemoveRamen = function () {
        if (this.ramenSpr && this.ramenSpr.parent) {
            this.ramenSpr.parent.removeChild(this.ramenSpr);
        }
        if (this.ramenObj)
            this.ramenObj = null;
    };
    EatingCharacterInfo.prototype.Update = function () {
        if (this.cha) {
            this.cha.Update();
            if (this.eatingIngImg) {
                var ingVisible = this.eatingNoodle == true ?
                    (this.cha.IsDoingAction(CharacterAction.Eat) && (this.eatingIngImg.visible == true || this.cha.hasIngredientPoint == true)) :
                    (this.cha.hasIngredientPoint == true); //否则看的是有没有数据点
                if (ingVisible == true) {
                    var chaPos = this.cha.GetPos();
                    if (this.eatingNoodle == false) {
                        //Topping跟着手的位置走
                        this.eatingIngImg.x = this.cha.ingredientPoint.x + chaPos.x;
                        this.eatingIngImg.y = this.cha.ingredientPoint.y + chaPos.y;
                    }
                    else {
                        //Noodle就拉伸
                        var noodleFlip = true; //是否要旋转面条
                        if (this.cha.hasIngredientPoint == true) {
                            this.noodlePos.x = this.cha.ingredientPoint.x + chaPos.x; //x坐标绝对信任
                            var noodlePosY = this.cha.ingredientPoint.y + chaPos.y;
                            if (noodlePosY < this.noodlePos.y) {
                                this.noodlePos.y = noodlePosY; //y取小的保持高度
                                noodleFlip = false; //还在拉伸，所以不要抽搐
                            }
                        }
                        this.eatingIngImg.x = this.noodlePos.x;
                        var noodleScaleY = (this.eatingIngImg.y - this.noodlePos.y) / this.eatingIngImg.height;
                        this.eatingIngImg.scaleY = this.eatingIngImg.height > 0 ? noodleScaleY : 0;
                        if (noodleFlip == true)
                            this.eatingIngImg.scaleX *= -1;
                    }
                }
                this.eatingIngImg.visible = ingVisible;
            }
        }
    };
    EatingCharacterInfo.prototype.FixedUpdate = function () {
        if (this.eatGame && this.eatGame.FixedUpdate() == true) {
            this.ramenSpr.UpdateRamen();
            if (this.eatingIngImg && this.eatingIngImg.parent) {
                this.eatingIngImg.parent.removeChild(this.eatingIngImg);
            }
            var turnRes = this.eatGame.CurrentTurnResult();
            if (turnRes != null) {
                this.eatingNoodle = turnRes.isEatingNoodles;
                if (this.eatingNoodle == true) {
                    //如果吃的是面条
                    this.eatingIngImg = new eui.Image();
                    this.eatingIngImg.source = RES.getRes("eating_noodle");
                    this._p.addChild(this.eatingIngImg);
                    this.eatingIngImg.anchorOffsetX = this.eatingIngImg.width / 2;
                    this.eatingIngImg.anchorOffsetY = this.eatingIngImg.height;
                    this.eatingIngImg.x = this.ramenSpr.x;
                    this.eatingIngImg.y = this.ramenSpr.BrothOffsetY() + this.ramenSpr.y;
                    this.eatingIngImg.scaleY = 0;
                    this.noodlePos.y = Number.MAX_VALUE; //重置面条的位置
                }
                else {
                    //如果吃的是Toppings
                    this.eatingIngImg = turnRes.eatIngredient.GatherSceneImage(this._p, 0, 0);
                    this.eatingIngImg.scaleY = 1;
                }
                this.eatingIngImg.visible = false;
            }
        }
        if (this.cha && this.cha.FixedUpdate() == true)
            this.cha.Update();
    };
    return EatingCharacterInfo;
}());
__reflect(EatingCharacterInfo.prototype, "EatingCharacterInfo");
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
        var xs = [60, 228, 394, 560];
        var ys = [26, 188, 351];
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
    function IngredientIconInBox(id, ingredient, icon, caller, func, broth) {
        if (broth === void 0) { broth = null; }
        var _this = _super.call(this) || this;
        _this.selected = false;
        _this.id = id;
        _this.ingredient = ingredient;
        _this.eveCaller = caller;
        _this.eveFunc = func;
        _this.icon = icon;
        _this.bModel = broth;
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
        if (this.bModel) {
            this.FillBroth(this.bModel);
        }
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.eveCaller && _this.eveFunc) {
                _this.eveFunc(_this.eveCaller, _this.ingredient);
            }
        }, this);
    };
    IngredientIconInBox.prototype.SetSelected = function (s) {
        this.selected = s;
        if (this.Img_Select)
            this.Img_Select.visible = s;
    };
    /**
     * 因为汤比较特殊，所以得额外fill进来
     * @param {BrothModel} broth 汤的model
     * @param {number} centerX 要绘制的位置x，为空时为图标中心
     * @param {number} centerY 要绘制的位置y，为空时为图标中心
     * @param {number} radius 要绘制的汤的半径，为空时为图标的40%
     */
    IngredientIconInBox.prototype.FillBroth = function (broth, centerX, centerY, radius) {
        if (centerX === void 0) { centerX = null; }
        if (centerY === void 0) { centerY = null; }
        if (radius === void 0) { radius = null; }
        if (!this.Img_Icon)
            return;
        if (centerX == null)
            centerX = this.width / 2;
        if (centerY == null)
            centerY = this.Img_Icon.height / 2;
        if (radius == null)
            radius = this.Img_Icon.width * 0.4;
        var shp = broth.ImageShape(centerX, // + this.Img_Icon.x,
        centerY + this.Img_Icon.y, radius);
        this.addChild(shp);
        var brothHL = new eui.Image(RES.getRes(ResName_Broth_Highlight));
        this.addChild(brothHL);
        brothHL.width = brothHL.height = radius * 2;
        brothHL.anchorOffsetX = brothHL.width / 2;
        brothHL.anchorOffsetY = brothHL.height / 2;
        brothHL.x = shp.x;
        brothHL.y = shp.y;
        if (this.Img_Select) {
            this.Img_Select.zIndex = Number.MAX_VALUE;
            this.sortChildren();
        }
    };
    return IngredientIconInBox;
}(eui.Component));
__reflect(IngredientIconInBox.prototype, "IngredientIconInBox", ["eui.UIComponent", "egret.DisplayObject"]);
var RamenSprite = (function (_super) {
    __extends(RamenSprite, _super);
    function RamenSprite(ramen) {
        var _this = _super.call(this) || this;
        _this.ramen = ramen;
        return _this;
    }
    RamenSprite.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    RamenSprite.prototype.init = function () {
        if (this.ramen)
            this.SetRamen(this.ramen);
    };
    RamenSprite.prototype.SetRamen = function (ramen) {
        if (!ramen)
            return;
        this.ramen = ramen;
        this.bowlImg = new eui.Image(RES.getRes(this.ramen.model.bowl.model.scene));
        this.addChild(this.bowlImg);
        this.bowlImg.anchorOffsetX = this.bowlImg.width / 2;
        this.bowlImg.anchorOffsetY = this.bowlImg.height;
        var backGroup = new eui.Group();
        backGroup.x = -this.bowlImg.anchorOffsetX + this.ramen.model.bowl.model.sceneCenterX;
        backGroup.y = -this.bowlImg.anchorOffsetY + this.ramen.model.bowl.model.sceneCenterY;
        this.addChild(backGroup);
        if (this.ramen.model.broth) {
            this.brothShape = this.ramen.model.broth.model.SceneShape(0, 0, 30); //美术设计拉面汤的宽度是60
            backGroup.addChild(this.brothShape);
        }
        if (this.ramen.model.noodles) {
            this.noodleImg = this.ramen.model.noodles.GatherSceneImage(backGroup, 0, 0);
            this.noodleImg.x = this.brothShape ? this.brothShape.x : 0;
            this.noodleImg.y = this.brothShape ? this.brothShape.y : 0;
        }
        this.ToppingImg = new Array();
        for (var i = 0; i < this.ramen.topping.length; i++) {
            var thisImg = this.ramen.topping[i].GatherSceneImage(backGroup, 0, 0);
            var thisObj = {
                "ingredient": this.ramen.topping[i],
                "img": thisImg
            };
            this.ToppingImg.push(thisObj);
        }
        backGroup.scaleY = Scene_HorVerTimes;
    };
    /**
     * 当拉面被吃了一口的时候，应该刷新一下
     *
     */
    RamenSprite.prototype.UpdateRamen = function () {
        //noodles
        var noodleScale = Math.max(0, Math.min(this.ramen.noodlePercentage, 1));
        if (this.noodleImg) {
            this.noodleImg.scaleX = this.noodleImg.scaleY = noodleScale;
        }
        //TODO broth
        //ingredients
        var index = 0;
        while (index < this.ToppingImg.length) {
            if (this.ramen.topping.indexOf(this.ToppingImg[index]["ingredient"]) >= 0) {
                if (this.ramen.cantEatToppings.indexOf(this.ToppingImg[index]["ingredient"]) >= 0) {
                    var ingImg = this.ToppingImg[index]["img"];
                    var ing = this.ramen.topping[this.ramen.topping.indexOf(this.ToppingImg[index]["ingredient"])];
                    if (ingImg) {
                        ingImg.scaleX = ingImg.scaleY = noodleScale * ing.size;
                    }
                }
                index += 1;
            }
            else {
                if (this.ToppingImg[index]["img"].parent)
                    this.ToppingImg[index]["img"].parent.removeChild(this.ToppingImg[index]["img"]);
                this.ToppingImg.splice(index, 1);
            }
        }
    };
    /**
     * 获得汤的y坐标对应于整个拉面坐标(作为原点)的坐标y
     * @returns {number} y坐标
     */
    RamenSprite.prototype.BrothOffsetY = function () {
        return -this.bowlImg.anchorOffsetY + this.ramen.model.bowl.model.sceneCenterY;
    };
    return RamenSprite;
}(SpriteGroup));
__reflect(RamenSprite.prototype, "RamenSprite");
var SpriteClip = (function (_super) {
    __extends(SpriteClip, _super);
    function SpriteClip() {
        var _this = _super.call(this) || this;
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
            console.warn("texture not found", key, this.preloadTextures);
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
var TrafficLightSprite = (function (_super) {
    __extends(TrafficLightSprite, _super);
    function TrafficLightSprite(trafficLight) {
        var _this = _super.call(this) || this;
        _this.trafficLight = trafficLight;
        return _this;
    }
    TrafficLightSprite.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    TrafficLightSprite.prototype.init = function () {
        if (this.trafficLight.seat)
            this.addChild(this.trafficLight.seat);
        if (this.trafficLight.green)
            this.addChild(this.trafficLight.green);
        if (this.trafficLight.yellow)
            this.addChild(this.trafficLight.yellow);
        if (this.trafficLight.red)
            this.addChild(this.trafficLight.red);
    };
    TrafficLightSprite.prototype.Update = function () {
        this.trafficLight.Draw();
    };
    TrafficLightSprite.prototype.FixedUpdate = function () {
    };
    return TrafficLightSprite;
}(SpriteGroup));
__reflect(TrafficLightSprite.prototype, "TrafficLightSprite");
var PlacingToolBox = (function (_super) {
    __extends(PlacingToolBox, _super);
    function PlacingToolBox(p) {
        var _this = _super.call(this) || this;
        _this.sizebarLength = 422;
        _this.sizebarTrackLen = 422 - 26; //可以拉动的区域宽度
        _this.sizebarTrackX = 13; //拉动区域相对于总长度的位置
        _this.sizebarPos = 0;
        _this.sizebarMin = -10;
        _this.sizebarMax = 10;
        _this.pullerOffX = 0;
        _this.pulling = false;
        _this.rotating = false;
        _this.rotateDegree = 0;
        _this.rotatePower = 0;
        _this.p = p;
        return _this;
    }
    PlacingToolBox.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    PlacingToolBox.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    PlacingToolBox.prototype.init = function () {
        var _this = this;
        //先填充图形
        this.Button_OK.icon = "ui_icon_ok";
        this.Button_Flip.icon = "ui_craft_icon_flip";
        this.SizeBar_Fill.mask = this.SizeBar_Mask;
        this.InitSizebarArea();
        this.Button_Reset.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.ingredient) {
                _this.ingredient.size = 1;
                _this.ingredient.rotation = 0;
                _this.ingredient.xFlip = false;
                _this.IngredientSizeToSizeBarValue();
                if (_this.p) {
                    _this.p.RefreshPlacingIngredient();
                }
            }
        }, this);
        this.Button_Flip.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.ingredient) {
                _this.ingredient.xFlip = !_this.ingredient.xFlip;
                if (_this.p) {
                    _this.p.RefreshPlacingIngredient();
                }
            }
        }, this);
        this.Button_OK.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.ingredient && _this.p) {
                _this.StopRotateIngredient();
                _this.p.PlaceToppingDone(false);
            }
        }, this);
        this.Button_Delete.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.ingredient && _this.p) {
                _this.StopRotateIngredient();
                _this.p.PlaceToppingDone(true);
            }
        }, this);
        // if (!this.rotateTimer){
        // 	this.rotateTimer = new egret.Timer(50);
        // 	this.rotateTimer.addEventListener(egret.TimerEvent.TIMER, this.DoingRotate, this);
        // 	this.rotateTimer.start();
        // }
        this.Button_RotateLeft.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            _this.StartRotateIngredient(false);
        }, this);
        this.Button_RotateLeft.addEventListener(egret.TouchEvent.TOUCH_END, this.StopRotateIngredient, this);
        this.Button_RotateLeft.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.StopRotateIngredient, this);
        this.Button_RotateRight.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            _this.StartRotateIngredient(true);
        }, this);
        this.Button_RotateRight.addEventListener(egret.TouchEvent.TOUCH_END, this.StopRotateIngredient, this);
        this.Button_RotateRight.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.StopRotateIngredient, this);
    };
    //初始化滑动块区域
    PlacingToolBox.prototype.InitSizebarArea = function () {
        var _this = this;
        this.Group_SizeBar.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            var pullerStageX = Utils.GetEuiScreenPos(_this.SizeBarPuller)["x"];
            if (Math.abs(e.stageX - pullerStageX) < 26) {
                //抓住了sizebar
                _this.pulling = true;
                _this.pullerOffX = _this.SizeBarPuller.x - e.stageX;
            }
            else {
            }
        }, this);
        this.Group_SizeBar.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (e) {
            if (_this.pulling == true) {
                var shouldX = e.stageX + _this.pullerOffX;
                _this.SizeBarPuller.x = Math.min(_this.sizebarTrackX + _this.sizebarTrackLen, Math.max(_this.sizebarTrackX, shouldX));
                _this.SetSizeBarPos(_this.GetValueBySizeBar());
                _this.SizeBarValueToIngredientSize();
            }
        }, this);
        this.Group_SizeBar.addEventListener(egret.TouchEvent.TOUCH_END, this.OnGroupSizeBarTouchOver, this);
        this.Group_SizeBar.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.OnGroupSizeBarTouchOver, this);
    };
    //拉杆结束时候
    PlacingToolBox.prototype.OnGroupSizeBarTouchOver = function (e) {
        if (this.pulling == true) {
            var shouldX = e.stageX + this.pullerOffX;
            this.SizeBarPuller.x = Math.min(this.sizebarTrackX + this.sizebarTrackLen, Math.max(this.sizebarTrackX, shouldX));
            this.SetSizeBarPos(this.GetValueBySizeBar());
            this.SizeBarValueToIngredientSize();
        }
    };
    //尺寸拉杆设定为多少值
    PlacingToolBox.prototype.SetSizeBarPos = function (toValue) {
        this.sizebarPos = Math.min(this.sizebarMax, Math.max(this.sizebarMin, toValue));
        var mLen = this.sizebarTrackLen;
        var mLeft = this.sizebarTrackX;
        this.SizeBarPuller.x = (this.sizebarPos - this.sizebarMin) / (this.sizebarMax - this.sizebarMin) * mLen + mLeft;
    };
    //根据尺寸拉杆位置获得值
    PlacingToolBox.prototype.GetValueBySizeBar = function () {
        var lx = this.SizeBarPuller.x - this.sizebarTrackX;
        this.sizebarPos = Math.round((lx / this.sizebarTrackLen) * (this.sizebarMax - this.sizebarMin) + this.sizebarMin);
        return this.sizebarPos;
    };
    //食材尺寸到拉杆位置
    PlacingToolBox.prototype.IngredientSizeToSizeBarValue = function () {
        if (!this.ingredient)
            return;
        var v = Math.round((this.ingredient.size - 1) * 20);
        v = Math.min(this.sizebarMax, Math.max(this.sizebarMin, v));
        this.SetSizeBarPos(v);
    };
    PlacingToolBox.prototype.SizeBarValueToIngredientSize = function () {
        var v = this.sizebarPos / 20;
        if (this.ingredient) {
            this.ingredient.size = 1 + v;
        }
        if (this.p) {
            this.p.RefreshPlacingIngredient();
        }
    };
    //停止旋转食材
    PlacingToolBox.prototype.StopRotateIngredient = function () {
        this.rotatePower = 0;
        this.rotateDegree = 0;
        this.rotating = false;
        if (this.p && this.ingredient) {
            this.p.RefreshPlacingIngredient();
        }
    };
    //开始旋转食材
    PlacingToolBox.prototype.StartRotateIngredient = function (degreePlus) {
        this.rotating = true;
        var basePower = 5;
        this.rotateDegree = basePower * (degreePlus == true ? 1 : -1);
        this.rotatePower = basePower;
        this.DoingRotate();
    };
    //正在旋转中
    PlacingToolBox.prototype.DoingRotate = function () {
        if (this.ingredient && this.rotating == true) {
            this.ingredient.rotation = (this.ingredient.rotation + 180 + this.rotateDegree) % 360 - 180;
            if (this.rotatePower < 90) {
                this.rotatePower *= 1.08; //每次+8%
            }
            else {
                this.rotatePower = 90;
            }
            var isNeg = this.rotateDegree < 0;
            this.rotateDegree = (Math.floor(this.rotatePower)) * (isNeg == false ? 1 : -1);
            if (this.p) {
                this.p.RefreshPlacingIngredient();
            }
        }
    };
    PlacingToolBox.prototype.Update = function () {
        this.DoingRotate();
    };
    //设置为ingredient服务
    PlacingToolBox.prototype.SetIngredient = function (ingredient) {
        this.ingredient = ingredient;
        if (this.ingredient) {
            this.Button_Reset.icon =
                this.Button_RotateLeft.icon =
                    this.Button_RotateRight.icon = this.ingredient.model.icon;
        }
        this.IngredientSizeToSizeBarValue();
    };
    //设置ok是否可用
    PlacingToolBox.prototype.SetOKButtonEnabled = function (enable) {
        this.Button_OK.enabled = enable;
    };
    return PlacingToolBox;
}(eui.Component));
__reflect(PlacingToolBox.prototype, "PlacingToolBox", ["eui.UIComponent", "egret.DisplayObject"]);
var RandomBuddyPortSprite = (function (_super) {
    __extends(RandomBuddyPortSprite, _super);
    function RandomBuddyPortSprite(buddyPort, width, height) {
        if (width === void 0) { width = 144; }
        if (height === void 0) { height = 144; }
        var _this = _super.call(this) || this;
        _this.port = buddyPort;
        _this._width = width;
        _this._height = height;
        return _this;
    }
    RandomBuddyPortSprite.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    RandomBuddyPortSprite.prototype.init = function () {
        this.parts = new Array();
        this.removeChildren();
        var ss = this.port.GetLayerSources();
        for (var i = 0; i < ss.length; i++) {
            var img = new eui.Image(ss[i]);
            this.addChild(img);
            img.width = this._width;
            img.height = this._height;
            this.parts.push(img);
        }
    };
    RandomBuddyPortSprite.prototype.SetSize = function (width, height) {
        for (var i = 0; i < this.parts.length; i++) {
            this.parts[i].width = width;
            this.parts[i].height = height;
        }
    };
    return RandomBuddyPortSprite;
}(SpriteGroup));
__reflect(RandomBuddyPortSprite.prototype, "RandomBuddyPortSprite");
var RandomPortrait = (function () {
    function RandomPortrait(favourType) {
        this._favType = favourType;
        this.Random(favourType);
    }
    RandomPortrait.prototype.Random = function (favourType) {
        //TODO 现在都是写死的
        this.eye = Utils.RandomInt(0, 9);
        this.brow = Utils.RandomInt(0, 9);
        this.mouth = Utils.RandomInt(0, 14);
        this.face = Utils.RandomInt(0, 3);
        this.foreHair = Utils.RandomInt(0, 9);
        this.backHair = Utils.RandomInt(0, 7);
        this.glasses = Utils.RandomInt(0, 5);
        this.cloth = Utils.RandomInt(0, 2);
        this.nose = Utils.RandomInt(0, 4);
    };
    /**
     * 获得每一层贴图的文件source
     * @returns {Array<string>} 每一层（从下到上）的资源名称字符串
     */
    RandomPortrait.prototype.GetLayerSources = function () {
        //TODO 现在都是写死的
        var res = [
            "female_back_hair_" + this.backHair.toString(),
            "female_neck",
            "female_cloth_" + this.cloth.toString(),
            "female_face_" + this.face.toString(),
            "female_eye_" + this.eye.toString(),
            "female_eyeball_" + this.eye.toString(),
            "female_brow_" + this.brow.toString(),
            "female_nose_" + this.nose.toString(),
            "female_mouth_" + this.mouth.toString(),
            "female_middle_hair_" + this.backHair.toString(),
            "female_glasses_" + this.glasses.toString(),
            "female_hair_" + this.foreHair.toString()
        ];
        return res;
    };
    return RandomPortrait;
}());
__reflect(RandomPortrait.prototype, "RandomPortrait");
var TareListItem = (function (_super) {
    __extends(TareListItem, _super);
    function TareListItem(tare) {
        var _this = _super.call(this) || this;
        _this.tare = tare;
        return _this;
    }
    TareListItem.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    TareListItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    TareListItem.prototype.init = function () {
        if (this.tare) {
            this.Img_Icon.source = RES.getRes(this.tare.icon);
            this.Label_Name.text = this.tare.name;
        }
    };
    return TareListItem;
}(eui.Component));
__reflect(TareListItem.prototype, "TareListItem", ["eui.UIComponent", "egret.DisplayObject"]);
var FoodCourt_NormalMenu = (function (_super) {
    __extends(FoodCourt_NormalMenu, _super);
    function FoodCourt_NormalMenu() {
        return _super.call(this) || this;
    }
    FoodCourt_NormalMenu.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    FoodCourt_NormalMenu.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return FoodCourt_NormalMenu;
}(eui.Component));
__reflect(FoodCourt_NormalMenu.prototype, "FoodCourt_NormalMenu", ["eui.UIComponent", "egret.DisplayObject"]);
var FoodCourt_SelectBuddyList = (function (_super) {
    __extends(FoodCourt_SelectBuddyList, _super);
    function FoodCourt_SelectBuddyList(caller, buddies, maxGuy, buddyBehaveFunc, doneButtonEve) {
        var _this = _super.call(this) || this;
        _this.buddies = buddies;
        _this.maxBuddy = maxGuy;
        _this.caller = caller;
        _this.buddyBehaveFunc = buddyBehaveFunc;
        _this.doneButtonEve = doneButtonEve;
        _this.buddyButtons = new Array();
        _this.selectedBuddy = new Array();
        return _this;
    }
    FoodCourt_SelectBuddyList.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    FoodCourt_SelectBuddyList.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    FoodCourt_SelectBuddyList.prototype.init = function () {
        var _this = this;
        for (var i = 0; i < this.buddies.length; i++) {
            var bb = new HorizontalFoodCourt_BuddyInfo(this.buddies[i], this, this.ClickOnBuddyButton);
            this.Group_Buddy.addChild(bb);
            this.buddyButtons.push(bb);
        }
        this.Button_Done.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.caller.canControl == false)
                return;
            if (_this.doneButtonEve) {
                _this.doneButtonEve(_this.caller, _this.selectedBuddy);
            }
        }, this);
        this.RefreshLabel();
    };
    FoodCourt_SelectBuddyList.prototype.ClickOnBuddyButton = function (thisObj, buddy, selected) {
        if (thisObj.caller.canControl == false)
            return selected;
        if (selected == false && thisObj.TeamFull() == true) {
            return false; //没选中就是要选中，但是如果已经满了就不鸟了，所以选中状态还是false
        }
        if (selected == false) {
            if (thisObj.buddyBehaveFunc) {
                thisObj.buddyBehaveFunc(thisObj.caller, buddy, true);
            }
            thisObj.selectedBuddy.push(buddy);
            thisObj.RefreshLabel();
            return true;
        }
        else {
            //TODO 移除出队伍
            if (thisObj.buddyBehaveFunc) {
                thisObj.buddyBehaveFunc(thisObj.caller, buddy, false);
            }
            var idx = thisObj.selectedBuddy.indexOf(buddy);
            if (idx >= 0)
                thisObj.selectedBuddy.splice(idx, 1);
            thisObj.RefreshLabel();
            return false;
        }
    };
    FoodCourt_SelectBuddyList.prototype.TeamFull = function () {
        return this.selectedBuddy.length >= this.maxBuddy;
    };
    FoodCourt_SelectBuddyList.prototype.RefreshLabel = function () {
        this.Label_BuddyCount.text =
            "选择一起去玩的朋友（" +
                this.selectedBuddy.length.toString() + "/" +
                this.maxBuddy.toString() + "）";
    };
    return FoodCourt_SelectBuddyList;
}(eui.Component));
__reflect(FoodCourt_SelectBuddyList.prototype, "FoodCourt_SelectBuddyList", ["eui.UIComponent", "egret.DisplayObject"]);
var FoodCourt_StoreMenu = (function (_super) {
    __extends(FoodCourt_StoreMenu, _super);
    function FoodCourt_StoreMenu(caller, store) {
        var _this = _super.call(this) || this;
        _this.caller = caller;
        _this.store = store;
        _this.dishButtons = new Array();
        return _this;
    }
    FoodCourt_StoreMenu.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    FoodCourt_StoreMenu.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    FoodCourt_StoreMenu.prototype.init = function () {
        var _this = this;
        var _loop_1 = function (i) {
            var os = this_1.store.onSale[i];
            var favourGuys = this_1.caller.GetFavourGuyByDishType(os.model.type);
            var b = new HorizontalFoodCourt_DishButton(os, favourGuys, this_1.caller.hungry, this_1.caller.hungerMax, this_1.caller, this_1.caller.EatDish);
            b.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.SetSelected(b);
                _this.caller.SelectDish(_this.caller, os);
            }, this_1);
            this_1.Group_DishMenu.addChild(b);
            this_1.dishButtons.push(b);
        };
        var this_1 = this;
        for (var i = 0; i < this.store.onSale.length; i++) {
            _loop_1(i);
        }
    };
    FoodCourt_StoreMenu.prototype.SetSelected = function (b) {
        for (var i = 0; i < this.dishButtons.length; i++) {
            this.dishButtons[i].SetSelect(this.dishButtons[i] == b);
        }
    };
    return FoodCourt_StoreMenu;
}(eui.Component));
__reflect(FoodCourt_StoreMenu.prototype, "FoodCourt_StoreMenu", ["eui.UIComponent", "egret.DisplayObject"]);
var CraftNoodle = (function (_super) {
    __extends(CraftNoodle, _super);
    function CraftNoodle() {
        var _this = _super.call(this) || this;
        _this.steamFrameIndex = 0;
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
        this.ramenCenterY = this.stage.stageHeight * 0.38;
        this.Rect_PhotoTaker.x = this.ramenCenterX;
        this.Rect_PhotoTaker.y = this.ramenCenterY;
        this.Img_Stick.y = this.ramenCenterY - 35;
        this.Button_TareList.y =
            this.Button_NextStep.y =
                this.Button_Handbook.y = this.stage.stageHeight - 550;
        this.Img_BKG.width = this.stage.stageWidth;
        this.Img_BKG.height = this.stage.stageHeight;
        this.Img_BottomBorder.y = this.stage.stageHeight;
        this.Group_IngBox.y = this.stage.stageHeight;
        //先写死就是这个饭碗的数据
        this.craftingRamen = new RamenModel();
        //this.craftingRamen.broth = new BrothObj(playerInfo.getLearnedBroth("broth0"));
        this.ChangeToState(CraftNoodleState.ChooseBowl);
        this.UpdateRamen();
        //照片界面内容初始化
        this.InitUserInfoToPhotoMask();
        //尺寸工具盒子初始化
        this.placingTool = new PlacingToolBox(this);
        this.Group_PlaceTool.addChild(this.placingTool);
        this.placingTool.anchorOffsetX = this.placingTool.width / 2;
        this.placingTool.x = this.Group_PlaceTool.width / 2;
        //Input 初始化
        this.Group_UILayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.StagePointerDown, this);
        this.Group_UILayer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.StagePointerMove, this);
        this.Group_UILayer.addEventListener(egret.TouchEvent.TOUCH_END, this.StagePointerUp, this);
        this.Group_UILayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.StagePointerTap, this);
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
        this.Button_TareList.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            ShowCraftNoodleTareList(_this, _this.craftingRamen.tare, _this.RemoveTareFromCraftingRamen);
        }, this);
        //下一步按钮
        this.Button_NextStep.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnNextButtonClick, this);
        //上一部
        this.Button_Prev.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnPrevButtonClick, this);
        var t = new egret.Timer(100);
        t.addEventListener(egret.TimerEvent.TIMER, function () {
            _this.Update();
        }, this);
        t.start();
    };
    //删除某个tare
    CraftNoodle.prototype.RemoveTareFromCraftingRamen = function (thisObj, tare) {
        if (!thisObj.craftingRamen || !thisObj.craftingRamen.tare)
            return;
        for (var i = 0; i < thisObj.craftingRamen.tare.length; i++) {
            if (tare == thisObj.craftingRamen.tare[i]) {
                thisObj.craftingRamen.tare.splice(i, 1);
                thisObj.UpdateRamen(false);
                thisObj.TareListButtonTextSynchronize();
                return;
            }
        }
    };
    //把用户信息写到photomask
    CraftNoodle.prototype.InitUserInfoToPhotoMask = function () {
        var _this = this;
        if (GameUserInfo) {
            this.Img_UserPortrait.source = GameUserInfo["avatarUrl"];
            this.Label_UserName.text = GameUserInfo["nickName"];
        }
        this.Button_ShareNoodle.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.TakePhotoAndShare();
        }, this);
        this.Button_CraftDone.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.ToTestScene(_this, false);
        }, this);
        this.Img_UserPortrait.mask = this.Mask_UserPortrait;
        this.Group_PhotoMask.x = this.ramenCenterX;
        this.Group_PhotoMask.y = this.ramenCenterY;
        this.Group_PhotoMask.visible =
            this.Group_PhotoButtons.visible =
                this.Group_PhotoHead.visible = false;
    };
    //把屏幕清空拍一张照片，然后分享
    CraftNoodle.prototype.TakePhotoAndShare = function () {
        var _this = this;
        console.log("Start Take Photo, gogogo");
        this.Button_ShareNoodle.enabled =
            this.Button_CraftDone.enabled = false;
        var cameraStartTime = 150;
        if (!this.CameraWhite) {
            this.CameraWhite = new eui.Rect(this.stage.stageWidth, this.stage.stageHeight, 0xFFFFFF);
            this.addChild(this.CameraWhite);
            this.CameraWhite.x = this.CameraWhite.y = 0;
            this.CameraWhite.alpha = 0;
            egret.Tween.get(this.CameraWhite).to({ alpha: 1 }, cameraStartTime, egret.Ease.cubicIn).call(function () {
                _this.CameraWhite.visible = false;
            });
        }
        egret.Tween.get(this.Group_UILayer)
            .to({ alpha: 0 }, cameraStartTime - 50, egret.Ease.quadIn)
            .wait(100)
            .call(function () {
            platform.shareGame("我就试试分享", _this.Rect_PhotoTaker.x - _this.Rect_PhotoTaker.anchorOffsetX, _this.Rect_PhotoTaker.y - _this.Rect_PhotoTaker.anchorOffsetY, _this.Rect_PhotoTaker.width, _this.Rect_PhotoTaker.height, _this.stage.stageWidth, _this.stage.stageHeight, _this, _this.RestoreUIAfterTakePhoto);
        });
    };
    //继续留在这里，并且把ui重新显示出来
    CraftNoodle.prototype.RestoreUIAfterTakePhoto = function (thisObj, shareSuccess) {
        var cameraOutTime = 1500;
        if (thisObj.CameraWhite) {
            thisObj.CameraWhite.visible = true;
            egret.Tween.get(thisObj.CameraWhite)
                .to({ alpha: 0 }, cameraOutTime, egret.Ease.quadOut)
                .call(function () {
                if (thisObj.CameraWhite) {
                    thisObj.CameraWhite.parent.removeChild(thisObj.CameraWhite);
                    thisObj.CameraWhite = null;
                }
            });
        }
        egret.Tween.get(thisObj.Group_UILayer)
            .to({ alpha: 1 }, cameraOutTime, egret.Ease.quadOut)
            .call(function () {
            thisObj.Button_ShareNoodle.enabled =
                thisObj.Button_CraftDone.enabled = true;
        });
    };
    //去下一个场景或者继续留在这里
    CraftNoodle.prototype.ToTestScene = function (thisObj, shareSuccess) {
        thisObj.parent.addChild(new TestScene(thisObj.craftingRamen));
        thisObj.parent.removeChild(thisObj);
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
            case CraftNoodleState.SelectTopping:
                {
                    this.UpdateRamen();
                    this.ChangeToState(CraftNoodleState.ShowPhoto);
                }
                break;
            case CraftNoodleState.ShowPhoto:
                {
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
            case CraftNoodleState.ShowPhoto:
                {
                    this.ChangeToState(CraftNoodleState.SelectTopping);
                }
                break;
        }
    };
    //计时器函数
    CraftNoodle.prototype.Update = function () {
        switch (this.uiState) {
            case CraftNoodleState.SelectTopping:
                {
                }
                break;
            case CraftNoodleState.PlaceTopping:
                {
                    if (this.placingTool) {
                        this.placingTool.Update();
                    }
                }
                break;
        }
        this.steamAnimUpdate();
    };
    //手指Tap事件
    CraftNoodle.prototype.StagePointerTap = function (e) {
        switch (this.uiState) {
            case CraftNoodleState.PutTare: {
                var touchOne = this.craftingRamen.TouchedTare(e.stageX, e.stageY, this.ramenCenterX, this.ramenCenterY, true);
                if (touchOne) {
                    this.UpdateRamen();
                }
            }
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
                    }
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
        if (!this.placingIngredient || !this.placingTool)
            return;
        this.placingTool.SetOKButtonEnabled(this.craftingRamen.CanPlaceTopping(this.placingIngredient));
    };
    //根据尺寸等改变拖动中的食材的图形
    CraftNoodle.prototype.RefreshPlacingIngredient = function () {
        if (this.placingIngredient) {
            //this.placingIngredient.size = this.HSilider_Size.value * 0.25 + 0.5;
            if (this.placingIngImage) {
                this.placingIngredient.SetToImage(this.placingIngImage, this.ramenCenterX, this.ramenCenterY);
            }
        }
    };
    //创造一个正在拖拽的图形
    CraftNoodle.prototype.CreatePlacingIngImg = function () {
        if (this.placingIngImage)
            this.RemovePlacingIngImage();
        this.placingIngImage = this.placingIngredient.GatherImage(this.Group_GameLayer, this.ramenCenterX, this.ramenCenterY);
        if (this.placingTool) {
            this.placingTool.SetIngredient(this.placingIngredient);
        }
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
    };
    /**
     * 放下食材或者丢掉食材，然后切换状态回到SelectTopping
     * @param {boolean} asDelete 是否当做删除，不当作删除就会放下
     */
    CraftNoodle.prototype.PlaceToppingDone = function (asDelete) {
        if (asDelete == false) {
            this.PlaceIngredientToRamen();
        }
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
                .call(function () { _this._OnEnterState(toState); }, this);
        }
        else if (this.uiState == CraftNoodleState.ShowPhoto) {
            //从拍照返回
            this.Group_PhotoHead.visible = false;
            egret.Tween.get(this.Group_PhotoMask)
                .to({ alpha: 0 }, animLen, egret.Ease.quadOut);
            egret.Tween.get(this.Group_PhotoButtons)
                .to({ y: this.stage.stageHeight + 600 }, animLen, egret.Ease.quadOut)
                .call(function () { _this._OnEnterState(toState); }, this);
        }
        else if (this.uiState == CraftNoodleState.SelectTopping && toState == CraftNoodleState.PlaceTopping) {
            //选择Topping离开，并前往PlaceTopping的话什么都不做
            egret.Tween.get(this.Group_IngBox)
                .to({ y: this.stage.stageHeight + 600 }, animLen, egret.Ease.quadOut)
                .call(function () { _this._OnEnterState(toState); }, this);
            egret.Tween.get(this.Group_PlaceTool)
                .to({ y: this.stage.stageHeight + 600 }, animLen, egret.Ease.quadOut);
        }
        else {
            this.ingredientIndex = 0; //其他状态离开的时候都要清除ingredientIndex
            egret.Tween.get(this.Group_IngBox)
                .to({ y: this.stage.stageHeight + 600 }, animLen, egret.Ease.quadOut)
                .call(function () { _this._OnEnterState(toState); }, this);
            egret.Tween.get(this.Group_PlaceTool)
                .to({ y: this.stage.stageHeight + 600 }, animLen, egret.Ease.quadOut);
        }
        //根据状态设置图标
        this.Img_Step0.scaleX = this.Img_Step0.scaleY = (this.uiState == CraftNoodleState.ChooseBowl) ? 1.2 : 1;
        this.Img_Step1.scaleX = this.Img_Step1.scaleY = (this.uiState == CraftNoodleState.PutTare) ? 1.2 : 1;
        this.Img_Step2.scaleX = this.Img_Step2.scaleY = (this.uiState == CraftNoodleState.SoupToBroth) ? 1.2 : 1;
        this.Img_Step3.scaleX = this.Img_Step3.scaleY = (this.uiState == CraftNoodleState.Noodles) ? 1.2 : 1;
        this.Img_Step4.scaleX = this.Img_Step4.scaleY =
            (this.uiState == CraftNoodleState.SelectTopping || this.uiState == CraftNoodleState.PlaceTopping) ? 1.2 : 1;
        this.Img_Step0.visible =
            this.Img_Step1.visible =
                this.Img_Step2.visible =
                    this.Img_Step3.visible =
                        this.Img_Step4.visible = toState != CraftNoodleState.ShowPhoto;
        this.Button_NextStep.enabled =
            this.Button_NextStep.visible = (toState == CraftNoodleState.ChooseBowl ||
                toState == CraftNoodleState.Noodles ||
                toState == CraftNoodleState.SoupToBroth ||
                toState == CraftNoodleState.PutTare ||
                toState == CraftNoodleState.SelectTopping);
        this.Button_Handbook.visible =
            this.Button_Handbook.enabled = (toState == CraftNoodleState.SelectTopping);
        this.Button_TareList.visible =
            this.Button_TareList.enabled = (toState == CraftNoodleState.PutTare);
        if (toState == CraftNoodleState.PutTare)
            this.TareListButtonTextSynchronize();
        this.Group_Hint.visible = (toState != CraftNoodleState.ShowPhoto);
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
        var animLen = 200;
        switch (toState) {
            case CraftNoodleState.ChooseBowl:
                {
                    this.ResetBowlBox();
                    egret.Tween.get(this.Group_IngBox)
                        .to({ y: this.stage.stageHeight }, animLen, egret.Ease.quadIn)
                        .call(function () {
                        _this.uiState = toState;
                        _this.canControl = true;
                        _this.GenerateHintText();
                    }, this);
                }
                break;
            case CraftNoodleState.PutTare:
                {
                    this.ResetIngredientBox(IngredientUseType.UseType_Tare);
                    egret.Tween.get(this.Group_IngBox)
                        .to({ y: this.stage.stageHeight }, animLen, egret.Ease.quadIn)
                        .call(function () {
                        _this.uiState = toState;
                        _this.canControl = true;
                        _this.GenerateHintText();
                    }, this);
                }
                break;
            case CraftNoodleState.SoupToBroth:
                {
                    this.ResetBrothBox();
                    egret.Tween.get(this.Group_IngBox)
                        .to({ y: this.stage.stageHeight }, animLen, egret.Ease.quadIn)
                        .call(function () {
                        _this.uiState = toState;
                        _this.canControl = true;
                        _this.GenerateHintText();
                    }, this);
                }
                break;
            case CraftNoodleState.Noodles:
                {
                    this.ResetIngredientBox(IngredientUseType.UseType_Noodle);
                    egret.Tween.get(this.Group_IngBox)
                        .to({ y: this.stage.stageHeight }, animLen, egret.Ease.quadIn)
                        .call(function () {
                        _this.uiState = toState;
                        _this.canControl = true;
                        _this.GenerateHintText();
                    }, this);
                }
                break;
            case CraftNoodleState.SelectTopping:
                {
                    this.ResetIngredientBox(IngredientUseType.UseType_Topping);
                    egret.Tween.get(this.Group_IngBox)
                        .to({ y: this.stage.stageHeight }, animLen, egret.Ease.quadIn)
                        .call(function () {
                        _this.uiState = toState;
                        _this.canControl = true;
                        _this.GenerateHintText();
                    }, this);
                }
                break;
            case CraftNoodleState.PlaceTopping:
                {
                    this.draggingIng = false;
                    this.CreatePlacingIngImg();
                    this.PlacingToolSynchronize();
                    egret.Tween.get(this.Group_PlaceTool)
                        .to({ y: this.stage.stageHeight - 520 }, animLen, egret.Ease.quadOut)
                        .call(function () {
                        _this.uiState = toState;
                        _this.canControl = true;
                        _this.GenerateHintText();
                    }, this);
                }
                break;
            case CraftNoodleState.ShowPhoto: {
                this.Group_PhotoHead.visible =
                    this.Group_PhotoMask.visible =
                        this.Group_PhotoButtons.visible = true;
                this.Group_PhotoMask.alpha = 0;
                egret.Tween.get(this.Group_PhotoMask)
                    .to({ alpha: 1 }, animLen, egret.Ease.quadOut);
                egret.Tween.get(this.Group_PhotoButtons)
                    .to({ y: this.Group_PhotoMask.y - this.Group_PhotoMask.anchorOffsetY + this.Group_PhotoMask.height + 80 }, animLen, egret.Ease.quadOut)
                    .call(function () {
                    _this.uiState = toState;
                    _this.canControl = true;
                }, this);
            }
        }
        //TODO 这里有未知bug，所以只能先这样凑个效果
        //bug:当进入placeTopping如果刷新，那么当前place的东西就会没了
        if (toState != CraftNoodleState.PlaceTopping) {
            this.UpdateRamen();
        }
        else {
        }
    };
    //设置Hint文字 TODO文字应该根据拉面生成，目前是写死的。
    CraftNoodle.prototype.GenerateHintText = function () {
        var t = "";
        switch (this.uiState) {
            case CraftNoodleState.ChooseBowl:
                {
                    t = "选个大大的碗吧，可以装多多的面条";
                }
                break;
            case CraftNoodleState.PutTare:
                {
                    t = "做个什么味道为主的面呢？";
                }
                break;
            case CraftNoodleState.SoupToBroth:
                {
                    t = "汤底可是面的灵魂啊！";
                }
                break;
            case CraftNoodleState.Noodles:
                {
                    t = this.craftingRamen.broth.model.name + "作为汤底，真令人期待";
                }
                break;
            case CraftNoodleState.SelectTopping:
                {
                    if (!this.craftingRamen.topping || this.craftingRamen.topping.length <= 0) {
                        t = "光面吃起来肯定没啥意思吧";
                    }
                    else {
                        t = "看起来好像好好吃的样子";
                    }
                }
                break;
            case CraftNoodleState.PlaceTopping:
                {
                    if (this.placingIngredient) {
                        var rdes = ["新鲜的", "好吃的", "诱人的"];
                        var rIndex = Math.min(Math.floor(Math.random() * rdes.length), rdes.length);
                        t = rdes[rIndex] + this.placingIngredient.model.name + "，好期待";
                    }
                    else {
                        t = "看起来好像好好吃的样子";
                    }
                }
                break;
        }
        this.Label_HintText.text = t;
    };
    //根据当前tare数量给tarebutton改写text
    CraftNoodle.prototype.TareListButtonTextSynchronize = function () {
        this.Button_TareList.label =
            "调料清单\n(" +
                this.craftingRamen.tare.length.toString() + "/" +
                this.craftingRamen.bowl.model.tareLimit.toString() + ")"; //TODO 调味料最多6个
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
            pageI[cgI].push(broth.model);
        }
        //根据pageI制作所有的ingredientBox
        for (var i = 0; i < pageI.length; i++) {
            var pis = new Array();
            for (var j = 0; j < pageI[i].length; j++) {
                var iInB = new IngredientIconInBox(pageI[i][j].id, pageI[i][j], this.craftingRamen.bowl.model.img, me, me.ClickOnIngredientIcon, pageI[i][j]);
                pis.push(iInB);
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
            if ((ing.model.canBeUsed & type) > 0) {
                if (pageI[cgI].length >= 12) {
                    //一页12个，超过了就Push新的一页
                    pageI.push(new Array());
                    cgI = pageI.length - 1;
                }
                pageI[cgI].push(ing.model);
            }
        }
        //根据pageI制作所有的ingredientBox
        for (var i = 0; i < pageI.length; i++) {
            var pis = new Array();
            for (var j = 0; j < pageI[i].length; j++) {
                var iInB = new IngredientIconInBox(pageI[i][j].id, pageI[i][j], pageI[i][j].icon, me, me.ClickOnIngredientIcon);
                pis.push(iInB);
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
                    var bm = ing;
                    caller.craftingRamen.bowl = new BowlObj(bm);
                    for (var i = 0; i < caller.ingredientPage.length; i++) {
                        caller.ingredientPage[i].SetSelect(bm.id);
                    }
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
                        if (im.liquid == true) {
                            caller.craftingRamen.tare.unshift(new IngredientObj(ing, randomX, randomY));
                        }
                        else {
                            caller.craftingRamen.tare.push(new IngredientObj(ing, randomX, randomY));
                        }
                        caller.UpdateRamen();
                        caller.TareListButtonTextSynchronize();
                    }
                }
                break;
            case CraftNoodleState.SoupToBroth:
                {
                    var bm = ing;
                    caller.craftingRamen.broth = new BrothObj(bm);
                    caller.UpdateRamen(true);
                    for (var i = 0; i < caller.ingredientPage.length; i++) {
                        caller.ingredientPage[i].SetSelect(bm.id);
                    }
                    caller.canControl = true;
                }
                break;
            case CraftNoodleState.Noodles:
                {
                    var nm = ing;
                    caller.craftingRamen.noodles = new IngredientObj(nm, caller.ramenCenterX, caller.ramenCenterY);
                    for (var i = 0; i < caller.ingredientPage.length; i++) {
                        caller.ingredientPage[i].SetSelect(nm.id);
                    }
                    caller.UpdateRamen();
                }
                break;
            case CraftNoodleState.SelectTopping:
                {
                    caller.placingIngredient = new IngredientObj(ing, 0, caller.craftingRamen.bowl.model.radius);
                    caller.ChangeToState(CraftNoodleState.PlaceTopping);
                }
                break;
        }
        caller.GenerateHintText();
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
        var drawSteam = false;
        var bowlChanged = false;
        var brothChanged = false;
        var noodleChanged = false;
        var steamYMod = 63; //蒸汽往上移动这么多
        var steamFrameCount = 8; //蒸汽8帧
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
                    drawSteam = true;
                }
                break;
            case CraftNoodleState.Noodles:
                {
                    drawBroth = true;
                    drawBrothHL = !this.craftingRamen.noodles;
                    drawNoodle = true;
                    noodleChanged = true;
                    drawSteam = true;
                }
                break;
            case CraftNoodleState.SelectTopping:
                {
                    drawBroth = true;
                    drawNoodle = true;
                    drawTopping = true;
                    drawSteam = true;
                }
                break;
            case CraftNoodleState.PlaceTopping:
                {
                    drawBroth = true;
                    drawNoodle = true;
                    drawTopping = true;
                    drawSteam = true;
                }
                break;
        }
        //面碗
        if (this.craftingRamen.bowl) {
            if (!this.bowlImage) {
                this.bowlImage = new eui.Image(RES.getRes(this.craftingRamen.bowl.model.img));
            }
            else if (bowlChanged == true) {
                this.bowlImage.source = RES.getRes(this.craftingRamen.bowl.model.img);
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
                    //broth highlight special
                    if (!_this.brothHighlight) {
                        _this.brothHighlight = new eui.Image(RES.getRes(ResName_Broth_Highlight));
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
                    //steam special
                    if (_this.steamImage == null) {
                        _this.steamImage = new SpriteClip();
                        var preloadKey = new Array();
                        for (var i = 0; i < steamFrameCount; i++) {
                            preloadKey.push("zhengqi_" + i.toString());
                        }
                        _this.steamImage.SetPreloadTextureByKeys(preloadKey);
                        _this.steamImage.ChangeToPreloadTexture("zhengqi_0");
                    }
                    _this.Group_GameLayer.addChild(_this.steamImage);
                    _this.steamImage.anchorOffsetX = _this.steamImage.width / 2;
                    _this.steamImage.anchorOffsetY = _this.steamImage.height / 2;
                    _this.steamImage.scaleX = 2;
                    _this.steamImage.scaleY = 2;
                    _this.steamImage.x = _this.ramenCenterX;
                    _this.steamImage.y = _this.ramenCenterY - steamYMod;
                    _this.steamImage.alpha = 0;
                    egret.Tween.removeTweens(_this.steamImage);
                    egret.Tween.get(_this.steamImage)
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
            this.noodleImage = this.craftingRamen.noodles.GatherImage(this.Group_GameLayer, this.ramenCenterX, this.ramenCenterY);
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
        //Steam
        if (drawSteam == true && this.craftingRamen.broth && doBrothAnim == false) {
            if (this.steamImage == null) {
                this.steamImage = new SpriteClip();
                var preloadKey = new Array();
                for (var i = 0; i < steamFrameCount; i++) {
                    preloadKey.push("zhengqi_" + i.toString());
                }
                this.steamImage.SetPreloadTextureByKeys(preloadKey);
                this.steamImage.ChangeToPreloadTexture("zhengqi_0");
            }
            this.Group_GameLayer.addChild(this.steamImage);
            this.steamImage.anchorOffsetX = this.steamImage.width / 2;
            this.steamImage.anchorOffsetY = this.steamImage.height / 2;
            this.steamImage.scaleX = 2;
            this.steamImage.scaleY = 2;
            this.steamImage.x = this.ramenCenterX;
            this.steamImage.y = this.ramenCenterY - steamYMod;
        }
        this.GenerateHintText();
    };
    CraftNoodle.prototype.steamAnimUpdate = function () {
        if (!this.steamImage)
            return;
        var steamFrameCount = 8;
        this.steamFrameIndex = (this.steamFrameIndex + 1) % steamFrameCount; //一共8帧
        this.steamImage.ChangeToPreloadTexture("zhengqi_" + this.steamFrameIndex.toString());
        this.steamImage.anchorOffsetX = this.steamImage.width / 2;
        this.steamImage.anchorOffsetY = this.steamImage.height / 2;
    };
    return CraftNoodle;
}(eui.Component));
__reflect(CraftNoodle.prototype, "CraftNoodle", ["eui.UIComponent", "egret.DisplayObject"]);
var HorizontalFoodCourt = (function (_super) {
    __extends(HorizontalFoodCourt, _super);
    function HorizontalFoodCourt(team) {
        var _this = _super.call(this) || this;
        _this.dtPosY = 600; //餐桌位置
        _this.hungry = 0;
        _this.hungerMax = 0;
        _this.canControl = true;
        _this.uiPosY = 450; //下方UI的y坐标
        _this.uiOrderPosY = 650; //点菜的菜单y坐标
        _this.teamChaDis = 80; //角色之间距离
        _this.buddies = team;
        return _this;
    }
    HorizontalFoodCourt.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    HorizontalFoodCourt.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    HorizontalFoodCourt.prototype.init = function () {
        var _this = this;
        this.canControl = false;
        this.NewGame();
        this.Button_Go.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.canControl == false)
                return;
            if (_this.hungry <= 0)
                return;
            _this.MoveToStepIndex(_this.stepIndex + 1);
        }, this);
        var t = new egret.Timer(90);
        t.addEventListener(egret.TimerEvent.TIMER, function () {
            _this.Update();
        }, this);
        t.start();
    };
    //根据要求开店，现在店里的内容都写死
    HorizontalFoodCourt.prototype.NewGame = function () {
        //初始化逻辑数据
        this.store = new Array();
        this.lastLearnedIngId = new Array();
        this.stepIndex = -1;
        this.hungry = 0;
        this.ingredientExp = new Array();
        this.hungerMax = PlayerBaseHunger;
        for (var i = 0; i < this.buddies.length; i++) {
            this.hungerMax += this.buddies[i].hunger;
        }
        this.hungry = this.hungerMax;
        this.SetHungerBar(this.hungerMax, this.hungerMax);
        //根据写死的规则产生重要信息
        for (var i = 0; i < 10; i++) {
            var sCount = Utils.RandomInt(2, 3);
            var idx = Utils.GetRandomIndexFromArray(GameData_FoodCourtDish.length, sCount);
            var foods = new Array();
            for (var n = 0; n < idx.length; n++) {
                foods.push(new FoodCourtDishObj(GameData_FoodCourtDish[idx[n]]));
            }
            var fcStore = new FoodCourtStoreObj(foods);
            this.store.push(fcStore);
        }
        //刷新美术
        this.InitRender();
        //游戏状态
        this.ChaEnterSceneAndStartGame();
    };
    //角色走进场地，然后开始游戏，当然这时候UI也出来了
    HorizontalFoodCourt.prototype.ChaEnterSceneAndStartGame = function () {
        var _this = this;
        var inTime = Math.abs(this.mainCharacter.x - this.stage.stageWidth / 2) / 400 * 1000;
        var _loop_2 = function (i) {
            this_2.teamSpr[i].character.ChangeAction(Direction.Right, CharacterAction.Walk);
            egret.Tween.removeTweens(this_2.teamSpr[i]);
            egret.Tween.get(this_2.teamSpr[i])
                .to({ x: this_2.stage.stageWidth / 2 - i * this_2.teamChaDis }, inTime)
                .call(function () {
                _this.teamSpr[i].character.ChangeAction(Direction.Down, CharacterAction.Stand);
                if (i == 0) {
                    _this.canControl = true;
                }
            });
        };
        var this_2 = this;
        for (var i = 0; i < this.teamSpr.length; i++) {
            _loop_2(i);
        }
        if (!this.uiNormalMenu) {
            this.uiNormalMenu = new FoodCourt_NormalMenu();
            this.addChild(this.uiNormalMenu);
            this.uiNormalMenu.height = this.stage.stageHeight - this.uiPosY;
            //TODO 进入的动画
            this.uiNormalMenu.y = this.uiPosY;
        }
    };
    /**
     * 根据食物类型，获得对应事物的喜好者们
     * @param {FoodCourtDishType} ft 食物类型
     * @returns {Array<FoodCourtBuddy>} 喜欢的人列表
     */
    HorizontalFoodCourt.prototype.GetFavourGuyByDishType = function (ft) {
        var res = new Array();
        for (var i = 0; i < this.buddies.length; i++) {
            if (this.buddies[i].favourType == ft) {
                res.push(this.buddies[i]);
            }
        }
        return res;
    };
    /**
     * 是否还能吃得下这个食物
     * @param {FoodCourtDishObj} dish 要吃的东西
     * @returns {boolean} 是否还能吃得下
     */
    HorizontalFoodCourt.prototype.CanEatThisDish = function (dish) {
        return this.hungry /*+ dish.model.feed*/ <= this.hungerMax;
    };
    HorizontalFoodCourt.prototype.InitRender = function () {
        if (this.mainCharacter && this.mainCharacter.parent) {
            this.mainCharacter.parent.removeChild(this.mainCharacter);
        }
        this.Group_Street.removeChildren();
        //店铺
        this.storeX = new Array();
        var startAt = 700;
        var storeDis = 350;
        var storeY = 400;
        for (var i = 0; i < this.store.length; i++) {
            var img = new eui.Image();
            img.texture = RES.getRes(this.store[i].source);
            this.Group_Street.addChild(img);
            img.anchorOffsetX = img.width / 2;
            img.anchorOffsetY = img.height;
            img.scaleX = img.scaleY = 1.5; //TODO 写死
            img.x = startAt + i * storeDis;
            img.y = storeY;
            this.storeX.push(img.x);
        }
        //主角
        var mc = new CharacterObj(GetCharacterActionInfoByKey("schoolgirl"), -100, this.Group_Street.y + storeY, new CharacterProperty());
        this.mainCharacter = new CharacterSprite(mc);
        this.addChild(this.mainCharacter);
        this.teamSpr = new Array();
        this.teamSpr.push(this.mainCharacter);
        for (var i = 0; i < this.buddies.length; i++) {
            var cha = new CharacterObj(GetCharacterActionInfoByKey(this.buddies[i].body), -(i + 1) * this.teamChaDis - 100, storeY, new CharacterProperty(this.buddies[i]));
            var chaSpr = new CharacterSprite(cha);
            this.addChild(chaSpr);
            this.teamSpr.push(chaSpr);
        }
        //餐桌
        var seats = new Array();
        var sPosX = [0, -80, 80, -160, 160, -240, 240];
        for (var i = 0; i < sPosX.length; i++) {
            seats.push(new DiningSeatInfo("wooden_chair", sPosX[i], -50, sPosX[i], -24));
        }
        this.dTable = new DiningTableSprite(new DiningTableObj(new DiningTableModel("wooden_single_table", seats, 580, new egret.Rectangle(30, 0, 10, 10))));
        this.addChild(this.dTable);
        this.dTable.x = this.stage.stageWidth / 2;
        this.dTable.y = this.dtPosY;
        this.dTable.visible = false;
        //学习的东西列表
        this.Group_Ing.removeChildren();
        this.IngHint = new Array();
    };
    HorizontalFoodCourt.prototype.MoveToStepIndex = function (index) {
        var _this = this;
        this.canControl = false;
        this.stepIndex = Math.min(this.store.length - 1, Math.max(this.stepIndex, index));
        var tarX = this.storeX[this.stepIndex] - this.stage.stageWidth / 2;
        var moveLen = tarX + this.Group_Street.x;
        var inTime = moveLen / 400 * 1000; //每秒移动400pixel
        for (var i = 0; i < this.teamSpr.length; i++) {
            this.teamSpr[i].character.ChangeAction(Direction.Right, CharacterAction.Walk);
        }
        egret.Tween.removeTweens(this.Group_Street);
        egret.Tween.get(this.Group_Street).to({ x: this.Group_Street.x - moveLen }, inTime)
            .call(function () {
            for (var i = 0; i < _this.teamSpr.length; i++) {
                _this.teamSpr[i].character.ChangeAction(Direction.Down, CharacterAction.Stand);
            }
            //进入店铺的UI切换了
            _this.EnterTheStall(_this.store[_this.stepIndex]);
            //this.addChild(new HorizontalFoodCourt_StoreUI(this, this.store[this.stepIndex]));
        }, this);
        //this.Update();
    };
    //进入一家店铺，然后出现菜单
    HorizontalFoodCourt.prototype.EnterTheStall = function (store) {
        var _this = this;
        this.dTable.visible = true;
        this.Button_Go.visible = false;
        var _loop_3 = function (i) {
            var seatInfo = this_3.dTable.GetSeatInfoByIndex(i);
            if (seatInfo == null) {
                return "break";
            }
            var seatX = seatInfo.x + this_3.dTable.x;
            var seatY = seatInfo.y + this_3.dTable.y;
            var hMoveTime = Math.abs(seatX - this_3.teamSpr[i].x) / 400 * 1000;
            var vMoveTime = Math.abs(seatY - this_3.teamSpr[i].y) / 400 * 1000;
            egret.Tween.removeTweens(this_3.teamSpr[i]);
            egret.Tween.get(this_3.teamSpr[i])
                .call(function () {
                _this.teamSpr[i].character.ChangeAction(seatX > _this.teamSpr[i].x ? Direction.Right : Direction.Left, CharacterAction.Walk);
            })
                .to({ x: seatX }, hMoveTime)
                .call(function () {
                _this.teamSpr[i].character.ChangeAction(Direction.Down, CharacterAction.Walk);
            })
                .to({ y: seatY }, vMoveTime)
                .call(function () {
                _this.teamSpr[i].visible = false;
                _this.dTable.SetCharacterToSeat(i, _this.teamSpr[i].character, false); //TODO....第三个参数
                //TODO 走到以后出菜单
                if (i == _this.teamSpr.length - 1) {
                    if (_this.uiNormalMenu) {
                        egret.Tween.removeTweens(_this.uiNormalMenu);
                        egret.Tween.get(_this.uiNormalMenu)
                            .to({ y: _this.stage.stageHeight }, 300, egret.Ease.quadIn)
                            .call(function () {
                            _this.StoreMenuIn(store);
                        });
                    }
                    else {
                        _this.StoreMenuIn(store);
                    }
                }
            });
        };
        var this_3 = this;
        for (var i = 0; i < this.teamSpr.length; i++) {
            var state_1 = _loop_3(i);
            if (state_1 === "break")
                break;
        }
    };
    //进入店铺，菜单出现
    HorizontalFoodCourt.prototype.StoreMenuIn = function (store) {
        var _this = this;
        if (!this.uiStoreMenu) {
            this.uiStoreMenu = new FoodCourt_StoreMenu(this, store);
        }
        this.addChild(this.uiStoreMenu);
        this.uiStoreMenu.y = this.stage.stageHeight;
        this.uiStoreMenu.height = this.stage.stageHeight - this.uiOrderPosY;
        egret.Tween.removeTweens(this.uiStoreMenu);
        egret.Tween.get(this.uiStoreMenu)
            .to({ y: this.uiOrderPosY }, 300, egret.Ease.quadOut)
            .call(function () {
            _this.canControl = true;
        });
    };
    //给ui调用的不吃了的事件
    HorizontalFoodCourt.prototype.CancelEat = function (caller) {
        caller.hungry -= 5;
        caller.hungry = Math.max(caller.hungry, 0);
        caller.canControl = true;
        caller.Update();
    };
    //给ui调用的吃的事件
    HorizontalFoodCourt.prototype.EatDish = function (caller, dish) {
        //Show Dialog就完了
        caller.hungry += dish.model.feed;
        var favourC = caller.GetFavourGuyByDishType(dish.model.type).length;
        for (var i = 0; i < dish.model.reward.length; i++) {
            caller.AddIngredientExp(dish.model.reward[i], favourC);
        }
        caller.canControl = true;
        caller.Update();
    };
    /**
     * 给其他ui用的，选中一个dish，显示反应
     * @param {HorizontalFoodCourt} caller 会调用的thisObj
     * @param {FoodCourtDishObj} dish 准备要吃啥
     */
    HorizontalFoodCourt.prototype.SelectDish = function (caller, dish) {
        caller.SetHungerBar(caller.hungry, Math.max(0, caller.hungry - dish.model.feed));
        if (caller.dTable) {
            caller.dTable.PlaceRamenToAllCharacter(dish.dish);
        }
        for (var i = 0; i < caller.teamSpr.length; i++) {
            if (caller.teamSpr[i].character.property.buddyInfo) {
                var favColor = caller.teamSpr[i].character.property.buddyInfo.favourType;
                if (favColor == dish.model.type) {
                    //喜欢的
                    caller.teamSpr[i].character.ChangeAction(Direction.Down, CharacterAction.Clap);
                }
                else {
                    //一般般
                    caller.teamSpr[i].character.ChangeAction(Direction.Down, CharacterAction.Stand);
                }
            }
            else {
                //主角，所以没有buddyInfo
                caller.teamSpr[i].character.ChangeAction(Direction.Down, CharacterAction.Stand);
            }
        }
    };
    HorizontalFoodCourt.prototype.AddIngredientExp = function (ing, favourCount) {
        for (var i = 0; i < this.ingredientExp.length; i++) {
            if (this.ingredientExp[i].broth == ing.broth && this.ingredientExp[i].ingredientId == ing.ingredientId) {
                //修改存在的
                this.ingredientExp[i].exp += Math.ceil(ing.exp * (1 + favourCount * 0.3));
                return;
            }
        }
        //添加新的
        var newIng = new FoodCourtIngredient(ing.ingredientId, ing.exp, ing.broth);
        this.ingredientExp.push(newIng);
        var iHint = new HorizontalFoodCourt_IngredientExp(newIng);
        this.IngHint.push(iHint);
        this.Group_Ing.addChild(iHint);
        this.Update();
    };
    //满腹条
    HorizontalFoodCourt.prototype.HungerBarLength = function (v) {
        return v * 1.5;
    };
    /**
     * 设置满腹度条子
     * @param {number} fromHunger 从多少开始
     * @param {number} toHunger 到达多少为止
     */
    HorizontalFoodCourt.prototype.SetHungerBar = function (fromHunger, toHunger) {
        fromHunger = Math.min(this.hungerMax, Math.max(0, fromHunger));
        toHunger = Math.min(this.hungerMax, Math.max(0, toHunger));
        var dis = Math.abs(fromHunger - toHunger);
        this.Rect_HungerBack.width = this.HungerBarLength(this.hungerMax) + 4; //外边框2
        this.Rect_HungerNow.width = this.HungerBarLength(fromHunger);
        this.Rect_HungerMinus.width = this.HungerBarLength(dis);
        this.Rect_HungerMinus.anchorOffsetX = (fromHunger >= toHunger ? this.Rect_HungerMinus.width : 0);
        this.Rect_HungerMinus.x =
            this.Rect_HungerNow.x + this.Rect_HungerNow.width; // - 
        //(fromHunger < toHunger ? -1 : 1) * this.Rect_HungerMinus.width;
    };
    /**
     * 满腹条变化，我可不负责设置Hungry值
     * @param {number} fromHunger 从多少开始
     * @param {number} toHunger 到达多少为止
     */
    HorizontalFoodCourt.prototype.HungerBarTweenTo = function (fromHunger, toHunger) {
        this.SetHungerBar(fromHunger, toHunger);
        var inTime = Math.abs(fromHunger - toHunger) / 100 * 1000;
        egret.Tween.removeTweens(this.Rect_HungerNow);
        egret.Tween.removeTweens(this.Rect_HungerMinus);
        if (inTime > 0) {
            egret.Tween.get(this.Rect_HungerNow).to({ width: this.HungerBarLength(toHunger) }, inTime);
            egret.Tween.get(this.Rect_HungerMinus).to({ width: 0 }, inTime);
        }
    };
    HorizontalFoodCourt.prototype.Update = function () {
        this.Label_Hungry.text = "满腹度：" + this.hungry.toString() + "/" + this.hungerMax.toString();
        //主角
        for (var i = 0; i < this.teamSpr.length; i++) {
            this.teamSpr[i].character.Update();
        }
        //学习的东西
        for (var i = 0; i < this.IngHint.length; i++) {
            this.IngHint[i].Update();
        }
        if (this.Rect_HungerMinus) {
            if (this.Rect_HungerMinus.alpha > 0) {
                this.Rect_HungerMinus.alpha -= 0.05;
            }
            else {
                this.Rect_HungerMinus.alpha = 1;
            }
        }
    };
    return HorizontalFoodCourt;
}(eui.Component));
__reflect(HorizontalFoodCourt.prototype, "HorizontalFoodCourt", ["eui.UIComponent", "egret.DisplayObject"]);
var FoodCourtGameState;
(function (FoodCourtGameState) {
    FoodCourtGameState[FoodCourtGameState["SelectBuddy"] = 0] = "SelectBuddy";
    FoodCourtGameState[FoodCourtGameState["SelectHero"] = 1] = "SelectHero";
    FoodCourtGameState[FoodCourtGameState["Moving"] = 2] = "Moving";
    FoodCourtGameState[FoodCourtGameState["EnterStall"] = 3] = "EnterStall";
    FoodCourtGameState[FoodCourtGameState["SelectDish"] = 4] = "SelectDish";
    FoodCourtGameState[FoodCourtGameState["Eating"] = 5] = "Eating";
    FoodCourtGameState[FoodCourtGameState["BackToStreet"] = 6] = "BackToStreet";
})(FoodCourtGameState || (FoodCourtGameState = {}));
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
        this.characterSprites = new Array();
        this.diningTableSprites = new Array();
        this.trafficLightSprites = new Array();
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
            // this.PlaceTable(
            // 	new DiningTableModel(1,1,"wooden_single_table", [slot]),gX, gY
            // )
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
        // for (let i = 0; i < this.characters.length; i++){
        // 	let cha = this.characters[i];
        // 	if (cha.Update){
        // 		cha.Update();
        // 	}
        // }
        //红绿灯绘制
        // for (let i = 0; i < this.trafficLights.length; i++){
        // 	let tl = this.trafficLights[i];
        // 	tl.Draw();
        // }
        //主角
        if (this.mainCharacter && this.mainCharacter.Update) {
            this.mainCharacter.Update();
        }
        //其他精灵
        for (var i = 0; i < this.sprites.length; i++) {
            this.sprites[i].Update();
        }
    };
    //用于逻辑刷新的Update
    Street.prototype.FixedUpdate = function () {
        //主角
        if (this.mainCharacterSprite) {
            this.mainCharacterSprite.FixedUpdate();
        }
        //红绿灯换色
        var trafficLightState = this.GetTrafficLightState();
        for (var i = 0; i < this.trafficLights.length; i++) {
            var tl = this.trafficLights[i];
            tl.LightOn(trafficLightState["light"]);
        }
        //所有精灵的
        for (var i = 0; i < this.sprites.length; i++) {
            this.sprites[i].FixedUpdate();
        }
        //检查是否删除角色角色的
        var idx = 0;
        while (idx < this.characters.length) {
            var cha = this.characters[idx];
            //TODO 一个角色AI执行完毕就删除
            if (cha.ai.plan.length <= 0) {
                this.RemoveCharacter(cha);
            }
            else {
                // if (cha.FixedUpdate){
                // 	if (cha.FixedUpdate() === true && cha.Update){
                // 		cha.Update();
                // 	};
                // }
                idx++;
            }
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
    //从sprites里找到对应的SpriteGroup
    Street.prototype.GetSprite = function (sprGroup, spliceFromSprites) {
        if (spliceFromSprites === void 0) { spliceFromSprites = true; }
        for (var i = 0; i < this.sprites.length; i++) {
            if (this.sprites[i] == sprGroup) {
                if (spliceFromSprites == true) {
                    return this.sprites.splice(i, 1)[0];
                }
                else {
                    return this.sprites[i];
                }
            }
        }
        return null;
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
            this.mainCharacterSprite = new CharacterSprite(this.mainCharacter);
            this.gameLayer.addChild(this.mainCharacterSprite);
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
    //删除某个角色
    Street.prototype.RemoveCharacter = function (cha) {
        if (cha) {
            for (var i = 0; i < this.characterSprites.length; i++) {
                if (this.characterSprites[i].IsCharacter(cha) == true) {
                    var sg = this.characterSprites[i];
                    var spr = this.GetSprite(sg);
                    if (spr && spr.parent) {
                        spr.parent.removeChild(spr);
                    }
                    this.characterSprites.splice(i, 1);
                    break;
                }
            }
            //角色列表删除
            for (var i = 0; i < this.characters.length; i++) {
                if (this.characters[i] == cha) {
                    this.characters.splice(i, 1);
                    break;
                }
            }
        }
    };
    //TODO 放一套桌子，这里可不管能不能放的下，只管放上去的
    Street.prototype.PlaceTable = function (table, gridX, gridY) {
        // let tPos = this.GetPixelPosByGridPos(gridX, gridY, true);
        // let t:DiningTableObj = new DiningTableObj(table, tPos["x"], tPos["y"]);
        // let tSpr:DiningTableSprite = new DiningTableSprite();
        // tSpr.x = tPos["x"];
        // tSpr.y = tPos["y"];
        // this.gameLayer.addChild(tSpr);
        // this.sprites.push(tSpr);	
        // this.diningTables.push(t);
        // this.diningTableSprites.push(tSpr);
        //TODO桌子椅子连接状态等
    };
    //放红绿灯
    Street.prototype.PlaceTrafficLight = function (gridX, gridY) {
        var tPos = this.GetPixelPosByGridPos(gridX, gridY);
        var tl = new TrafficLight();
        var tlSpr = new TrafficLightSprite(tl);
        this.gameLayer.addChild(tlSpr);
        this.sprites.push(tlSpr);
        this.trafficLightSprites.push(tlSpr);
        this.trafficLights.push(tl);
        tlSpr.x = tPos["x"] + GridWidth / 2;
        tlSpr.y = tPos["y"] + GridHeight / 2;
        tl.LightOn(this.GetTrafficLightState()["light"]);
        tl.Draw();
    };
    //放一个角色，这里的x,y都是像素级
    Street.prototype.PlaceCharacter = function (key, x, y) {
        if (key === void 0) { key = "schoolgirl"; }
        var cha = new CharacterObj(GetCharacterActionInfoByKey(key), x, y, new CharacterProperty());
        var chaSpr = new CharacterSprite(cha);
        this.gameLayer.addChild(chaSpr);
        this.sprites.push(chaSpr);
        this.characterSprites.push(chaSpr);
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
var TestScene = (function (_super) {
    __extends(TestScene, _super);
    function TestScene(ramen) {
        var _this = _super.call(this) || this;
        //From Street
        _this.toUpdateTicker = 0;
        _this.tick = 0;
        _this.chaRefTicker = 0;
        _this.zOrderBase = 10000; //在重新计算zOrder时，加上这个数字
        // private ramen:RamenSpriteClip;
        _this.timeScale = 1;
        _this.ramenObj = new RamenObj(ramen);
        return _this;
    }
    TestScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    TestScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.sprites = new Array();
        this.init();
    };
    TestScene.prototype.init = function () {
        //this.PlaceCharacter("schoolgirl", 150, 450);
        var _this = this;
        this.actor = new CharacterObj(GetCharacterActionInfoByKey("schoolgirl"), 0, 0, new CharacterProperty());
        this.PlaceTable(350, 500);
        for (var i = 0; i < 3; i++) {
            var _actor = new CharacterObj(GetCharacterActionInfoByKey("schoolgirl"), 0, 0, new CharacterProperty());
            var _ramen = this.ramenObj.Clone(false);
            this.diningTable.SetCharacterToSeat(i, _actor);
            this.diningTable.PlaceRamenToSeat(i, _ramen);
        }
        this.RearrangeSpritesZOrder();
        this.HSilder_Size.addEventListener(egret.Event.CHANGE, function () {
            var toSize = _this.HSilder_Size.value * 0.05 + 1;
            _this.ChangeShowSize(toSize);
            _this.Label_Size.text = toSize.toFixed(2).toString();
        }, this);
        this.Button_Start.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.diningTable) {
                _this.diningTable.StartEat();
            }
        }, this);
        //开启一个update和fixedUpdate的计时器
        var t = new egret.Timer(30 * this.timeScale);
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
    TestScene.prototype.ChangeShowSize = function (toScale) {
        if (toScale === void 0) { toScale = 1.0; }
        this.gameLayer.scaleX = this.gameLayer.scaleY = toScale;
        this.gameLayer.x = (this.stage.stageWidth - this.gameLayer.width * this.gameLayer.scaleX) / 2;
        this.gameLayer.y = (800 - this.gameLayer.height * this.gameLayer.scaleY) / 2;
    };
    //用于动画刷新的Update
    TestScene.prototype.Update = function () {
        //角色的
        //this.actor.Update();
        if (this.diningTable) {
            this.diningTable.Update();
        }
    };
    //用于逻辑刷新的Update
    TestScene.prototype.FixedUpdate = function () {
        //角色的
        //this.actor.FixedUpdate();
        if (this.diningTable) {
            this.diningTable.FixedUpdate();
        }
    };
    //重新排序zOrder
    TestScene.prototype.RearrangeSpritesZOrder = function () {
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
    //放一个角色，这里的x,y都是像素级
    TestScene.prototype.PlaceCharacter = function (key, x, y) {
        if (key === void 0) { key = "schoolgirl"; }
        this.actor = new CharacterObj(GetCharacterActionInfoByKey(key), x, y, new CharacterProperty());
        var aImg = new CharacterSprite(this.actor);
        aImg.x = x;
        aImg.y = y;
        this.gameLayer.addChild(aImg);
        this.sprites.push(aImg);
    };
    //放一张桌子，这里可不管能不能放的下，只管放上去的
    TestScene.prototype.PlaceTable = function (x, y) {
        this.diningTable = new DiningTableSprite(new DiningTableObj(new DiningTableModel("wooden_single_table", [
            new DiningSeatInfo("wooden_chair", 0, -50, 0, -24),
            new DiningSeatInfo("wooden_chair", -75, -50, -75, -24),
            new DiningSeatInfo("wooden_chair", 75, -50, 75, -24),
        ], 240, new egret.Rectangle(30, 0, 10, 10))));
        this.gameLayer.addChild(this.diningTable);
        this.diningTable.x = x;
        this.diningTable.y = y;
    };
    return TestScene;
}(eui.Component));
__reflect(TestScene.prototype, "TestScene", ["eui.UIComponent", "egret.DisplayObject"]);
var WelcomeScene = (function (_super) {
    __extends(WelcomeScene, _super);
    function WelcomeScene() {
        var _this = _super.call(this) || this;
        //随机地图需要的参数
        _this.gw = 8; //单元格这么大
        _this.gh = 8;
        _this.mapWidth = 0; //地图宽高多少单元格
        _this.mapHeight = 0;
        _this.roomCenters = new Array();
        return _this;
    }
    WelcomeScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    WelcomeScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    WelcomeScene.prototype.init = function () {
        var _this = this;
        this.Button_Ramen.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (!GameScene_CraftNoodle) {
                GameScene_CraftNoodle = new CraftNoodle();
            }
            Utils.UIRoot.addChild(GameScene_CraftNoodle);
            _this.parent.removeChild(_this);
        }, this);
        this.Button_Street.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            // if (!GameScene_FoodCourt){
            // 	GameScene_FoodCourt = new HorizontalFoodCourt();
            // }
            // Utils.UIRoot.addChild(GameScene_FoodCourt);
            Utils.UIRoot.addChild(new FoodCourtTeamBuild());
            _this.parent.removeChild(_this);
        }, this);
        this.Button_Test.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
        }, this);
    };
    //第一步，根据房间数，地图宽高，决定基本的地图信息
    WelcomeScene.prototype.Test_MapStep1 = function (roomCount, roomMaxWidth, roomMaxHeight) {
        if (roomMaxWidth === void 0) { roomMaxWidth = 20; }
        if (roomMaxHeight === void 0) { roomMaxHeight = 20; }
        var hRooms = Math.ceil(Math.sqrt(roomCount)); //横向多少个房间
        var vRooms = Math.ceil(roomCount / hRooms); //纵向多少个房间
        var restRooms = hRooms * vRooms - roomCount; //荣誉数量，也就代表每一行可以少生成多少个房间
    };
    return WelcomeScene;
}(eui.Component));
__reflect(WelcomeScene.prototype, "WelcomeScene", ["eui.UIComponent", "egret.DisplayObject"]);
var CraftNoodle_TareList = (function (_super) {
    __extends(CraftNoodle_TareList, _super);
    function CraftNoodle_TareList(caller, tares, removeFunc) {
        var _this = _super.call(this) || this;
        _this.tareList = [null, null, null, null, null, null];
        if (tares) {
            for (var i = 0; i < 6; i++) {
                if (i < tares.length)
                    _this.tareList[i] = tares[i];
            }
        }
        _this.caller = caller;
        _this.removeFunc = removeFunc;
        return _this;
    }
    CraftNoodle_TareList.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CraftNoodle_TareList.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    CraftNoodle_TareList.prototype.init = function () {
        var _this = this;
        this.CreateSlots();
        this.Button_Remove0.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.RemoveButtonEvent(0);
        }, this);
        this.Button_Remove1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.RemoveButtonEvent(1);
        }, this);
        this.Button_Remove2.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.RemoveButtonEvent(2);
        }, this);
        this.Button_Remove3.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.RemoveButtonEvent(3);
        }, this);
        this.Button_Remove4.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.RemoveButtonEvent(4);
        }, this);
        this.Button_Remove5.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.RemoveButtonEvent(5);
        }, this);
        this.Button_Close.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            CloseCraftNoodleTareList();
        }, this);
        this.Group_Dialog.scaleX = 0;
        egret.Tween.removeTweens(this.Group_Dialog);
        egret.Tween.get(this.Group_Dialog).to({ scaleX: 1 }, 300, egret.Ease.quadIn);
    };
    CraftNoodle_TareList.prototype.RemoveButtonEvent = function (buttonIndex) {
        if (this.caller && this.removeFunc && this.tareList[buttonIndex]) {
            this.removeFunc(this.caller, this.tareList[buttonIndex]);
            this.RemoveTareInSlot(buttonIndex);
        }
    };
    CraftNoodle_TareList.prototype.ResetSlots = function () {
        if (this.listItems) {
            for (var i = 0; i < this.listItems.length; i++) {
                if (this.listItems[i] && this.listItems[i].parent) {
                    this.listItems[i].parent.removeChild(this.listItems[i]);
                }
            }
        }
        this.listItems = [null, null, null, null, null, null];
    };
    CraftNoodle_TareList.prototype.CreateSlots = function () {
        this.ResetSlots();
        var posX = [32, 220, 408, 32, 220, 408];
        var posY = [48, 48, 48, 236, 236, 236];
        var btns = [
            this.Button_Remove0, this.Button_Remove1, this.Button_Remove2,
            this.Button_Remove3, this.Button_Remove4, this.Button_Remove5,
        ];
        for (var i = 0; i < this.tareList.length; i++) {
            btns[i].visible = btns[i].enabled = (this.tareList[i] != null && this.tareList[i] != undefined);
            if (this.tareList[i]) {
                var li = new TareListItem(this.tareList[i].model);
                this.Group_ItemLayer.addChild(li);
                li.x = posX[i];
                li.y = posY[i];
                this.listItems[i] = li;
            }
        }
    };
    //TODO 暂时只支持删除个把以后
    CraftNoodle_TareList.prototype.RefreshSlots = function () {
        var btns = [
            this.Button_Remove0, this.Button_Remove1, this.Button_Remove2,
            this.Button_Remove3, this.Button_Remove4, this.Button_Remove5,
        ];
        for (var i = 0; i < this.listItems.length; i++) {
            if (this.listItems[i] && !this.tareList[i] && this.listItems[i].parent) {
                this.listItems[i].parent.removeChild(this.listItems[i]);
                this.listItems[i] = null;
                btns[i].visible = btns[i].enabled = false;
            }
        }
    };
    //删除某个位置的tare
    CraftNoodle_TareList.prototype.RemoveTareInSlot = function (index) {
        if (this.tareList[index])
            this.tareList[index] = null;
        this.RefreshSlots();
    };
    return CraftNoodle_TareList;
}(eui.Component));
__reflect(CraftNoodle_TareList.prototype, "CraftNoodle_TareList", ["eui.UIComponent", "egret.DisplayObject"]);
var _CraftNoodle_TareList;
var ShowCraftNoodleTareList = function (c, tareList, removeFUnc) {
    if (_CraftNoodle_TareList)
        return;
    _CraftNoodle_TareList = new CraftNoodle_TareList(c, tareList, removeFUnc);
    c.addChild(_CraftNoodle_TareList);
};
var CloseCraftNoodleTareList = function () {
    if (_CraftNoodle_TareList && _CraftNoodle_TareList.parent) {
        _CraftNoodle_TareList.parent.removeChild(_CraftNoodle_TareList);
        _CraftNoodle_TareList = null;
    }
};
var FoodCourtTeamBuild = (function (_super) {
    __extends(FoodCourtTeamBuild, _super);
    function FoodCourtTeamBuild() {
        var _this = _super.call(this) || this;
        _this.canControl = false;
        _this.floorY = 400;
        _this.carHeight = 20;
        _this.uiPosY = 480; //下方UI的y坐标
        _this.team = new Array();
        return _this;
    }
    FoodCourtTeamBuild.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    FoodCourtTeamBuild.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    FoodCourtTeamBuild.prototype.init = function () {
        var _this = this;
        this.InitBKG();
        //TODO buddy随机产生先
        this.buddyForSelect = new Array();
        for (var i = 0; i < 22; i++) {
            var buddy = new FoodCourtBuddy();
            this.buddyForSelect.push(buddy);
        }
        this.EnterSelectBuddyState();
        var t = new egret.Timer(90);
        t.addEventListener(egret.TimerEvent.TIMER, function () {
            _this.Update();
        }, this);
        t.start();
    };
    FoodCourtTeamBuild.prototype.InitBKG = function () {
        var storeY = this.floorY;
        this.car = new eui.Image();
        this.car.texture = RES.getRes("bus_default_paint");
        this.addChild(this.car);
        this.car.anchorOffsetX = this.car.width / 2;
        this.car.anchorOffsetY = this.car.height;
        this.car.scaleX = -1; //TODO 就先转转
        this.car.x = this.stage.stageWidth / 2;
        this.car.y = storeY;
        this.carDoorX = this.stage.stageWidth / 2 - 80;
        this.Rect_Hunger.width = 0;
        //主角
        this.mc = new CharacterObj(GetCharacterActionInfoByKey("schoolgirl"), this.stage.stageWidth / 2, this.Group_Street.y + storeY, new CharacterProperty());
        this.mainCharacter = new CharacterSprite(this.mc);
        this.addChild(this.mainCharacter);
        //饱食度条子
        this.HungerBarTweens();
    };
    FoodCourtTeamBuild.prototype.EnterSelectBuddyState = function () {
        var _this = this;
        if (!this.ui_selectBuddyList) {
            this.ui_selectBuddyList = new FoodCourt_SelectBuddyList(this, this.buddyForSelect, 5, this.BuddySelectBehaveFunc, this.BuddySelectDoneEve);
        }
        this.addChild(this.ui_selectBuddyList);
        this.ui_selectBuddyList.y = this.stage.stageHeight;
        this.ui_selectBuddyList.height = this.stage.stageHeight - this.uiPosY;
        egret.Tween.removeTweens(this.ui_selectBuddyList);
        egret.Tween.get(this.ui_selectBuddyList)
            .to({ y: this.uiPosY }, 300, egret.Ease.quadIn)
            .call(function () {
            _this.canControl = true;
        });
    };
    /**
     * 选中或者反选小弟之后的表演
     * @param {FoodCourtTeamBuild} thisObj 这个对象
     * @param {Array<FoodCourtBuddy>} buddy 选中或者反选的小弟
     * @param {boolean} addToTeam 是否添加到队伍，否的话就是从队伍移除
     */
    FoodCourtTeamBuild.prototype.BuddySelectBehaveFunc = function (thisObj, buddy, addToTeam) {
        //TODO 小弟选中和被移除的表现
        thisObj.canControl = false;
        if (addToTeam == true) {
            thisObj.CreateChaAndMoveToCar(buddy);
        }
        else {
            thisObj.CreateChaAndMoveOutside(buddy);
        }
    };
    FoodCourtTeamBuild.prototype.CreateChaAndMoveToCar = function (buddy) {
        var _this = this;
        this.team.push(buddy);
        var chaStartX = -100;
        var carHeight = this.carHeight;
        var inTime = (this.carDoorX - chaStartX) / 400 * 1000; //每秒移动400像素
        this.npc = new CharacterObj(GetCharacterActionInfoByKey(buddy.body), chaStartX, this.Group_Street.y + this.floorY, new CharacterProperty(buddy));
        var chaSpr = new CharacterSprite(this.npc);
        this.addChild(chaSpr);
        egret.Tween.get(chaSpr)
            .call(function () {
            _this.npc.ChangeAction(Direction.Right, CharacterAction.Walk);
        })
            .to({ x: this.carDoorX }, inTime)
            .call(function () {
            _this.npc.ChangeAction(Direction.Up, CharacterAction.Walk);
        })
            .to({ y: this.floorY - carHeight }, 250)
            .call(function () {
            _this.HungerBarTweens();
            _this.removeChild(chaSpr);
            _this.npc = null;
            _this.canControl = true;
        });
    };
    FoodCourtTeamBuild.prototype.CreateChaAndMoveOutside = function (buddy) {
        var _this = this;
        var bI = this.team.indexOf(buddy);
        if (bI >= 0) {
            this.team.splice(bI, 1);
        }
        var chaStartX = -100;
        var carHeight = this.carHeight;
        var inTime = (this.carDoorX - chaStartX) / 400 * 1000; //每秒移动400像素
        this.npc = new CharacterObj(GetCharacterActionInfoByKey(buddy.body), this.carDoorX, this.Group_Street.y + this.floorY - carHeight, new CharacterProperty(buddy));
        var chaSpr = new CharacterSprite(this.npc);
        this.addChild(chaSpr);
        egret.Tween.get(chaSpr)
            .call(function () {
            _this.npc.ChangeAction(Direction.Down, CharacterAction.Walk);
        })
            .to({ y: this.floorY }, 250)
            .call(function () {
            _this.npc.ChangeAction(Direction.Left, CharacterAction.Walk);
        })
            .to({ x: chaStartX }, inTime)
            .call(function () {
            _this.HungerBarTweens();
            _this.removeChild(chaSpr);
            _this.npc = null;
            _this.canControl = true;
        });
    };
    FoodCourtTeamBuild.prototype.CurrentHunger = function () {
        var res = PlayerBaseHunger;
        for (var i = 0; i < this.team.length; i++) {
            res += this.team[i].hunger;
        }
        return res;
    };
    FoodCourtTeamBuild.prototype.HungerBarTweens = function () {
        var tv = this.CurrentHunger();
        var tW = tv * 1.5;
        var inTime = Math.abs(tW - this.Rect_Hunger.width) / 100 * 1000;
        egret.Tween.removeTweens(this.Rect_Hunger);
        egret.Tween.get(this.Rect_Hunger)
            .to({ width: tW }, inTime, egret.Ease.quadIn);
    };
    /**
     * 点击确定之后的事件
     * @param {FoodCourtTeamBuild} thisObj 这个对象
     * @param {Array<FoodCourtBuddy>} team 所有选中的小弟
     */
    FoodCourtTeamBuild.prototype.BuddySelectDoneEve = function (thisObj, team) {
        thisObj.team = team;
        thisObj.LeaveBuddySelectEnterHeroSelect();
    };
    FoodCourtTeamBuild.prototype.LeaveBuddySelectEnterHeroSelect = function () {
        var _this = this;
        this.canControl = false;
        egret.Tween.removeTweens(this.ui_selectBuddyList);
        egret.Tween.get(this.ui_selectBuddyList)
            .to({ y: this.stage.stageHeight }, 300, egret.Ease.quadOut)
            .call(function () {
            _this.StartTravel();
        });
    };
    //开始探索模式
    FoodCourtTeamBuild.prototype.StartTravel = function () {
        var _this = this;
        this.canControl = false;
        this.Group_HungerBar.visible = false;
        var mInTime = Math.abs(this.mainCharacter.x - this.carDoorX) / 300 * 1000;
        egret.Tween.removeTweens(this.mainCharacter);
        egret.Tween.get(this.mainCharacter)
            .call(function () {
            _this.mc.ChangeAction(_this.carDoorX > _this.mainCharacter.x ? Direction.Right : Direction.Left, CharacterAction.Walk);
        })
            .to({ x: this.carDoorX }, mInTime)
            .call(function () {
            _this.mc.ChangeAction(Direction.Up, CharacterAction.Walk);
        })
            .to({ y: this.floorY - this.carHeight }, 150)
            .call(function () {
            _this.mainCharacter.parent.removeChild(_this.mainCharacter);
            var carTargetX = 1500;
            var inTime = (carTargetX - _this.car.x) / 500 * 1000;
            egret.Tween.removeTweens(_this.car);
            egret.Tween.get(_this.car)
                .to({ x: 1500 }, inTime, egret.Ease.quadIn)
                .call(function () {
                //离开场景，进入履行了
                if (!GameScene_FoodCourt) {
                    GameScene_FoodCourt = new HorizontalFoodCourt(_this.team);
                }
                Utils.UIRoot.addChild(GameScene_FoodCourt);
                _this.parent.removeChild(_this);
            });
        });
    };
    FoodCourtTeamBuild.prototype.Update = function () {
        if (this.npc) {
            this.npc.Update();
        }
        if (this.mc) {
            this.mc.Update();
        }
    };
    return FoodCourtTeamBuild;
}(eui.Component));
__reflect(FoodCourtTeamBuild.prototype, "FoodCourtTeamBuild", ["eui.UIComponent", "egret.DisplayObject"]);
var HorizontalFoodCourt_BuddyInfo = (function (_super) {
    __extends(HorizontalFoodCourt_BuddyInfo, _super);
    function HorizontalFoodCourt_BuddyInfo(buddy, caller, func) {
        var _this = _super.call(this) || this;
        _this.selected = false;
        _this.buddy = buddy;
        _this.caller = caller;
        _this.func = func;
        return _this;
    }
    HorizontalFoodCourt_BuddyInfo.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    HorizontalFoodCourt_BuddyInfo.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    HorizontalFoodCourt_BuddyInfo.prototype.init = function () {
        var _this = this;
        this.portSpr = new RandomBuddyPortSprite(this.buddy.portrait);
        this.Group_Port.addChild(this.portSpr);
        this.Label_Hunger.text = this.buddy.hunger.toString();
        this.SetSelected(false);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.caller && _this.func) {
                _this.SetSelected(_this.func(_this.caller, _this.buddy, _this.selected));
            }
        }, this);
    };
    HorizontalFoodCourt_BuddyInfo.prototype.SetSelected = function (s) {
        this.selected = s;
        this.Img_SelectSign.visible = s;
    };
    return HorizontalFoodCourt_BuddyInfo;
}(eui.Component));
__reflect(HorizontalFoodCourt_BuddyInfo.prototype, "HorizontalFoodCourt_BuddyInfo", ["eui.UIComponent", "egret.DisplayObject"]);
var HorizontalFoodCourt_DishButton = (function (_super) {
    __extends(HorizontalFoodCourt_DishButton, _super);
    function HorizontalFoodCourt_DishButton(dish, favourGuyCount, currentHunger, hungerMax, caller, eve) {
        var _this = _super.call(this) || this;
        _this.clicked = false;
        _this.dish = dish;
        _this.caller = caller;
        _this.eve = eve;
        _this.favourGuy = favourGuyCount;
        _this.currentHunger = currentHunger;
        _this.hungerMax = Math.max(1, hungerMax);
        return _this;
    }
    HorizontalFoodCourt_DishButton.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    HorizontalFoodCourt_DishButton.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    HorizontalFoodCourt_DishButton.prototype.init = function () {
        var _this = this;
        this.dishSpr = new RamenSprite(this.dish.dish);
        this.Group_Ramen.addChild(this.dishSpr);
        this.Label_Name.text = this.dish.model.name;
        for (var i = 0; i < this.dish.model.reward.length; i++) {
            var ingModel = GetIngredientModelById(this.dish.model.reward[i].ingredientId);
            if (ingModel) {
                var ing = new eui.Image(ingModel.img);
                ing.width = ing.height = 50;
                this.Group_Ingredient.addChild(ing);
            }
        }
        var sgc = 0;
        for (var i = 0; i < this.favourGuy.length; i++) {
            var port = new RandomBuddyPortSprite(this.favourGuy[i].portrait, 50, 50);
            if (port) {
                this.Group_Buddy.addChild(port);
                sgc += 1;
            }
            if (sgc >= 3)
                break;
        }
        this.Rect_ColorSign.fillColor = GetFoodCourtDishTypeColor(this.dish.model.type);
        this.SetSelect(false);
        this.Button_Eat.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.clicked == true)
                return;
            _this.clicked = true;
            if (_this.caller && _this.eve) {
                _this.eve(_this.caller, _this.dish);
            }
        }, this);
    };
    HorizontalFoodCourt_DishButton.prototype.SetSelect = function (s) {
        this.currentState = s == true ? "selected" : "normal";
    };
    return HorizontalFoodCourt_DishButton;
}(eui.Component));
__reflect(HorizontalFoodCourt_DishButton.prototype, "HorizontalFoodCourt_DishButton", ["eui.UIComponent", "egret.DisplayObject"]);
var HorizontalFoodCourt_IngredientExp = (function (_super) {
    __extends(HorizontalFoodCourt_IngredientExp, _super);
    function HorizontalFoodCourt_IngredientExp(ing) {
        var _this = _super.call(this) || this;
        _this.ing = ing;
        return _this;
    }
    HorizontalFoodCourt_IngredientExp.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    HorizontalFoodCourt_IngredientExp.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    HorizontalFoodCourt_IngredientExp.prototype.init = function () {
        this.Label_Exp.text = this.ing.exp.toString();
        if (this.ing.broth == true) {
            var bm = GetBrothModelById(this.ing.ingredientId);
            this.Img_Icon.visible = false;
            var ic = bm.IconShape(0, 0, 30);
            this.addChild(ic);
            ic.x = this.Img_Icon.x + 30;
            ic.y = this.Img_Icon.y + 30;
        }
        else {
            var im = GetIngredientModelById(this.ing.ingredientId);
            this.Img_Icon.visible = true;
            this.Img_Icon.source = im.icon;
        }
    };
    HorizontalFoodCourt_IngredientExp.prototype.Update = function () {
        if (this.Label_Exp)
            this.Label_Exp.text = this.ing.exp.toString();
    };
    return HorizontalFoodCourt_IngredientExp;
}(eui.Component));
__reflect(HorizontalFoodCourt_IngredientExp.prototype, "HorizontalFoodCourt_IngredientExp", ["eui.UIComponent", "egret.DisplayObject"]);
var HorizontalFoodCourt_StoreUI = (function (_super) {
    __extends(HorizontalFoodCourt_StoreUI, _super);
    function HorizontalFoodCourt_StoreUI(caller, store) {
        var _this = _super.call(this) || this;
        _this.ticked = 0;
        _this.dialogText = "即便吃不下，也可以点单，不然进店发现都不能点就软死机了，所以就饶你玩家这点饱食度好了。";
        _this.caller = caller;
        _this.store = store;
        return _this;
    }
    HorizontalFoodCourt_StoreUI.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    HorizontalFoodCourt_StoreUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    HorizontalFoodCourt_StoreUI.prototype.init = function () {
        var _this = this;
        this.Button_Cancel.visible = this.Button_Cancel.enabled = false;
        var bStartY = 220;
        var bDis = 210;
        var bStartX = this.Label_Dialog.x;
        this.Img_Back.height = bStartY + 480;
        for (var i = 0; i < this.store.onSale.length; i++) {
            var os = this.store.onSale[i];
            var favourGuys = this.caller.GetFavourGuyByDishType(os.model.type);
            var b = new HorizontalFoodCourt_DishButton(os, favourGuys, this.caller.hungry, this.caller.hungerMax, this.caller, this.caller.EatDish);
            b.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (_this.parent)
                    _this.parent.removeChild(_this);
            }, this);
            b.x = i * bDis + bStartX;
            b.y = bStartY;
            b.enabled = this.caller.CanEatThisDish(os);
            b.alpha = b.enabled == true ? 1 : 0.7;
            this.Group_Window.addChild(b);
        }
        this.Button_Cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.caller.CancelEat(_this.caller);
            if (_this.parent)
                _this.parent.removeChild(_this);
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.ticked <= _this.dialogText.length && _this.Label_Dialog.text.length < _this.dialogText.length) {
                _this.Label_Dialog.text = _this.dialogText;
            }
        }, this);
        var t = new egret.Timer(90);
        t.addEventListener(egret.TimerEvent.TIMER, function () {
            _this.Update();
        }, this);
        t.start();
    };
    HorizontalFoodCourt_StoreUI.prototype.Update = function () {
        this.ticked = (this.ticked + 1) % Number.MAX_VALUE;
        if (this.ticked <= this.dialogText.length && this.Label_Dialog.text.length < this.dialogText.length) {
            this.Label_Dialog.text = this.dialogText.substr(0, this.ticked);
        }
    };
    return HorizontalFoodCourt_StoreUI;
}(eui.Component));
__reflect(HorizontalFoodCourt_StoreUI.prototype, "HorizontalFoodCourt_StoreUI", ["eui.UIComponent", "egret.DisplayObject"]);

;window.Main = Main;