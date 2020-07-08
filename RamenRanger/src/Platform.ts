/** 
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
 * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
 */


declare interface Platform {
    
    getUserInfo(login): Promise<any>;
    createLoginButton(nextFunc, thisObj): Promise<any>;

    login(): Promise<any>

    /**
     * 分享游戏
     * @param {string} titleText 分享标题
     * @param {number} sX 截屏区域左上角x
     * @param {number} sY 截屏区域左上角y
     * @param {number} sWidth 截屏区域宽度
     * @param {number} sHeight 截屏区域高度
     * @param {number} stageWidth 当前的stage.stageWidth;
     * @param {number} stageHeight 当前的stage.stageHeight;
     * @param {any} nextFuncCaller 完成的话执行的函数的宿主，没有就不会执行
     * @param {any} nextFunc (nextFuncCaller:any, shareSuccessful:boolean)，完成执行的函数
     */
    shareGame(titleText,sX,sY,sWidth,sHeight,stageWidth,stageHeight,nextFuncCaller, nextFunc):Promise<any>;
}


class DebugPlatform implements Platform {

    async createLoginButton(nextFunc, thisObj) {
        if (nextFunc) nextFunc(thisObj);
        return { nickName: "鲁大师", avatarUrl:"" };
    }
    async login() {
        return {
            code: "003BIecV1grOg01LT2aV1QDYbV1BIecw",
            errMsg: "login:ok"
        }
    }
    async getUserInfo(login){
        return { nickName: "鲁大师", avatarUrl:"icon_default"  };
    }
    async shareGame(titleText,sX,sY,sWidth,sHeight,stageWidth,stageHeight,nextFuncCaller, nextFunc){
        if (nextFunc && nextFuncCaller){
            nextFunc(nextFuncCaller, true);
        }
        return;
    }
}


if (!window.platform) {
    window.platform = new DebugPlatform();
}
console.log(window.platform, window.platform.getUserInfo);


declare let platform: Platform;

declare interface Window {

    platform: Platform
}





