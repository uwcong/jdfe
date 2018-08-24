/**
 * 工具方法
 * @author Cc
 * 
 */


module.exports= {
    // 获取location search参数，返回一个search对象
    getLocationSearchObj: function (qstring) {
        let splitUrl = qstring.split("?");
        let strUrl = (splitUrl.length > 1) ? decodeURIComponent(splitUrl[1]).split("&") : [];
        let str = "";
        let obj = {};
        for (let i = 0, l = strUrl.length; i < l; i++) {
            str = strUrl[i].split("=");
            obj[str[0]] = str[1];
        }
        return Array.prototype.sort.call(obj);
    },
	
	sdkTryCatch: function(fnName, params){
		
//		let params = oData || '';
		try {
            if (sharesdk && sharesdk[fnName]) params ? sharesdk[fnName](params) : sharesdk[fnName]();
        } catch (e) {
            console.log(e);
        }
        
        try {
            if (window.myAndroid && window.myAndroid[fnName]) params ? window.myAndroid[fnName](params) : window.myAndroid[fnName]();
        } catch (e) {
            console.log(e);
        }
        
        try {
        	//android的参数需要json字符串
            if (window.AndroidGameActivitySdk && window.AndroidGameActivitySdk[fnName]) params ? window.AndroidGameActivitySdk[fnName](JSON.stringify(params)) : window.AndroidGameActivitySdk[fnName]();
        } catch (e) {
            console.log(e);
        }
        
        try {
            if (window.webkit.messageHandlers && window.webkit.messageHandlers[fnName]) params ? window.webkit.messageHandlers[fnName].postMessage(params) : window.webkit.messageHandlers[fnName].postMessage('');
        } catch (e) {
            console.log(e);
        }
	},
	
    // 判断环境
    isiOS: function () {
        return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    },
    isAndriod: function () {
        return /android/.test(navigator.userAgent.toLowerCase());
    },
    isWeChat: function () {
        return /micromessenger/.test(navigator.userAgent.toLowerCase());
    },
    isPc: function () {
        let userAgentInfo = navigator.userAgent.toLowerCase();
        let agents = ["android", "iphone", "ipad", "ipod", "symbianos", "windows phone"];
        let flag = true;
        for (let i = 0; i < agents.length; i++) {
            if (userAgentInfo.indexOf(agents[i]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    },

    // 邮箱格式验证
    isEmail: function (str) {
        return /^([a-zA-Z0-9\._-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]+)+)$/.test(str);
    },

    // 手机格式验证: 不少于7位数字
    isPhoneValid: function (str) {
        return /^[0-9]{7,}$/.test(str);
    },

    // 密码格式验证: 7-20位数字或者字母
    isPasswordValid: function (str) {
        return /^[a-zA-Z0-9]{7,20}$/.test(str);
    },

    // 时间戳转换格式
    date: function (s, fmt) {
        if (typeof s == "string") {
            s = Number(s);
        }
        fmt = fmt || "yyyy-MM-dd hh:mm:ss";
        let date = new Date(s);
        if (typeof s == "object") {
            date = s;
        }
        let o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
        return fmt;
    },

    // 设置cookie
    setCookie: function (name, value, days) {
        days = days || 0;
        let expires = "";
        if (days != 0) { //设置cookie过期时间  
            let date = new Date();
            let ms = days * 24 * 60 * 60 * 1000;
            date.setTime(date.getTime() + ms);
            expires = "; expires=" + date.toGMTString();
        }
        if (days == Infinity) { // 设置最大过期时间
            expires = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    },

    // 获取cookie
    getCookie: function (name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';'); //把cookie分割成组  
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]; //取得字符串  
            while (c.charAt(0) == ' ') { //判断一下字符串有没有前导空格  
                c = c.substring(1, c.length); //有的话，从第二位开始取  
            }
            if (c.indexOf(nameEQ) == 0) { //如果含有我们要的name  
                return c.substring(nameEQ.length, c.length);
            }
        }
        return false;
    },

    // 清除cookies
    clearCookie: function (name) {
        this.setCookie(name, "", -1);
    },

    // 获取特定localstorage
    getLocalStorage: function (key, callback) {
        let data = window.localStorage.getItem(key);
        if (data) {
            callback(data);
        } else {
            data = null;
        }
    },

    // 去掉结尾空格
    removeLastBlank: function (value) {
        return value.replace(/(\s*$)/g, "");
    },


    // 动态添加事件到onload
    addOnLoad: function (fn) {
        if (window.addEventListener) { // W3C standard 
            window.addEventListener('load', fn, false); // NB **not** 'onload'
        } else if (window.attachEvent) { // Microsoft
            window.attachEvent('onload', fn);
        }
    },


    
    // 更新localstorage里的form表单信息，用于提交时检查使用
    updateFormLS: function (oParams) {
        let bValid = oParams.bValid,
            symbol = oParams.symbol,
            target = oParams.target,
            id = oParams.id,
            cls = oParams.class,
            order = oParams.order,
            msg = oParams.msg;

        let localData = JSON.parse(localStorage.getItem(symbol)),
            errorList = localData.error.length ? localData.error : [],
            bUpdate = false; // 判断是否更新错误信息

        errorList.every((item, index, arr) => {
            if (item.class === $(target).attr('class')) {
                bUpdate = true; // 已有错误信息，则更新
                bValid ? arr.splice(index, 1) : item.msg = msg;
                return false; // 终止循环
            }
            return true; // 继续循环
        });
        // 未有错误信息且验证有错，则添加
        if (!bUpdate && !bValid) {
            let errorItem = {
                id,
                class: cls,
                order,
                msg
            };
            UtilFn.updateFormLSError(errorList, errorItem);
        }

        localData.error = errorList;
        localData.inputBlur = bValid ? "false" : "true";
        localStorage.setItem(symbol, JSON.stringify(localData));
        console.log(localStorage.getItem(symbol));
    },
    // 更新localstorage里的form表单错误信息
    updateFormLSError: function (errorList, errorItem) {
        if (errorList.length) {
            errorList.every((item, index, arr) => {
                if (Number(errorItem.order) < Number(item.order)) {
                    arr.splice(index, 0, errorItem);
                    return false;
                } else if (index + 1 === arr.length) {
                    arr.push(errorItem);
                }
                return true;
            });
        } else {
            errorList.push(errorItem);
        }
    }

};