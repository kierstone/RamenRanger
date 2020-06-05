/**
 * 请在白鹭引擎的Main.ts中调用 platform.login() 方法调用至此处。
 */

class WxgamePlatform {

    name = 'wxgame'

    login() {
        return new Promise((resolve, reject) => {
            wx.login({
                success: (login) => {
                    wx.getSetting({
                        success (res) {
                            if (res.authSetting['scope.userInfo'] === true) {
                                console.log('用户已经授权', login);
                                resolve(login);
                            } else if (res.authSetting['scope.userInfo'] === false) {
                                console.log('用户已拒绝授权，需要引导用户到设置页面打开授权开关');
                                resolve(null);
                            } else {
                                console.log('未询问过用户授权，创建登录按钮');
                                resolve(null);
                            }
                        }
                    });
                }
            })
        })
    }

    getUserInfo(login) {
        return new Promise((resolve, reject) => {
            if (login){
                wx.getUserInfo({
                    withCredentials: true,
                    success: function (res) {
                        var userInfo = res.userInfo
                        var nickName = userInfo.nickName
                        var avatarUrl = userInfo.avatarUrl
                        var gender = userInfo.gender //性别 0：未知、1：男、2：女
                        var province = userInfo.province
                        var city = userInfo.city
                        var country = userInfo.country
                        resolve(userInfo);
                    }
                })
            }else{
                resolve(null);
            }
        })
    }

    shareGame(titleText,sX,sY,sWidth,sHeight,stageWidth,nextFuncCaller, nextFunc){
        let sysInfo = wx.getSystemInfoSync();
        let scales = stageWidth / sysInfo.screenWidth;
        return new Promise((resolve, reject)=>{
            wx.shareAppMessage({
                title:titleText,
                imageUrl:canvas.toTempFilePathSync({
                    x: sX * scales,
                    y: sY * scales,
                    width: sWidth * scales,
                    height: sHeight * scales,
                    destWidth: 500,
                    destHeight: 400
                }),
                success:(res)=>{
                    console.log("转发成功",res);
                    resolve(res);
                },
                fail:(err)=>{
                    console.log("转发失败",err);
                    reject(err);
                }
            })
            if (nextFuncCaller && nextFunc){
                nextFunc(nextFuncCaller, true);
            }
        })
    }

    createLoginButton(nextFunc, thisObj) {
        return new Promise((resolve,reject)=>{
            let width = wx.getSystemInfoSync().windowWidth;
            let height = wx.getSystemInfoSync().windowHeight;
            let left = Math.floor((width - 200) / 2);
            let top = Math.floor(height - 120);
            var btn = wx.createUserInfoButton({
                type: 'image',
                image: './resource/assets/egret_icon.png',
                style: {
                left: 0,
                top: 0,
                width: width,
                height: height
                }
            })
            btn.onTap((res) => {
                resolve(res);
                let userInfo = res.userInfo;
                wx.login({
                    success: (login) => {
                        let code = login.code;
                        let user = {
                            code: code,
                            encryptedData: res.encryptedData,
                            iv: res.iv,
                            nickName: userInfo.nickName,
                            avatarUrl: userInfo.avatarUrl,
                            gender: userInfo.gender, //性别 0：未知、1：男、2：女
                            province: userInfo.province,
                            city: userInfo.city,
                            country: userInfo.country,
                        };
                        if (nextFunc && thisObj) nextFunc(thisObj, user);
                    }
                });
                
                btn.destroy();
            })
        })
    }

    openDataContext = new WxgameOpenDataContext();
}

class WxgameOpenDataContext {

    createDisplayObject(type, width, height) {
        const bitmapdata = new egret.BitmapData(sharedCanvas);
        bitmapdata.$deleteSource = false;
        const texture = new egret.Texture();
        texture._setBitmapData(bitmapdata);
        const bitmap = new egret.Bitmap(texture);
        bitmap.width = width;
        bitmap.height = height;

        if (egret.Capabilities.renderMode == "webgl") {
            const renderContext = egret.wxgame.WebGLRenderContext.getInstance();
            const context = renderContext.context;
            ////需要用到最新的微信版本
            ////调用其接口WebGLRenderingContext.wxBindCanvasTexture(number texture, Canvas canvas)
            ////如果没有该接口，会进行如下处理，保证画面渲染正确，但会占用内存。
            if (!context.wxBindCanvasTexture) {
                egret.startTick((timeStarmp) => {
                    egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
                    bitmapdata.webGLTexture = null;
                    return false;
                }, this);
            }
        }
        return bitmap;
    }

    postMessage(data) {
        const openDataContext = wx.getOpenDataContext();
        openDataContext.postMessage(data);
    }
}


window.platform = new WxgamePlatform();