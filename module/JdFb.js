/**
 * facebook相关接口抽取
 * 
 */

let getFBTimeVal = 0;

module.exports = {
    // 引入JS SDK
    // 请尽可能优先调用
    load: function() {
        var js, fjs = document.getElementsByTagName('script')[0];
        js = document.createElement('script');
        js.id = 'facebook-jssdk';
        js.src = "https://connect.facebook.net/zh_CN/sdk.js#xfbml=1&version=v3.1";
        fjs.parentNode.insertBefore(js, fjs);
        getFBTimeVal = setInterval(this.checkFb, 1000);
    },

    // 定时检查判断是否已加载FB对象
    checkFb: function() {
        if (typeof(FB) != "undefined") {
            clearInterval(getFBTimeVal);
        }
    },

    // fb初始化，并获取fbtoken和fbid
    // 一般在window.onload之后调用，确保 FB 已被载入
    init: function (appId, succCallback, errCallback) {
        // 初始化
        FB.init({
            appId: appId,
            status: true, // check login status
            cookie: true, // enable cookies to allow the server to access the session
            xfbml: true, // parse XFBML
            version: 'v3.1'
        });

        // 获取登录状态
        FB.getLoginStatus(function(res) {
            console.log('%cgetLoginStatus', 'background: green;color: #fff', res);
            if (res.status === "connected") {
                succCallback(res.authResponse);
            } else {
                errCallback();
            }
        });
    },

    // 通过FB.login的方式调用登录框，可定义回调
    login: function (succCallback, errCallback) {
        FB.login(function(response) {
            console.log("%c FB.login callback ", "background: green; color: #fff", response);
            let authResponse = response.authResponse;
            if (authResponse) {
                succCallback(authResponse);
                FB.api('/me', function(response) {
                    console.log(response);
                });
            } else {
                errCallback();
            }
        });
    }

};