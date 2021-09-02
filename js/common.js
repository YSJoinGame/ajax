/*
    @功能：提供公共方法
*/
/*
    @方法： $（某个元素）   _（某些元素集合）
    @描述： 根据参数获取元素或元素集合
    @参数：参数css css表达式  eg:(span[name = spa])
           参数el  表示元素对象  eg:document.getElementById('')
    @返回 ：元素  和  元素集合
*/
function $(css, el) {
    el = el || document;
    return el.querySelector(css);
};

function _(css, el) {
    el = el || document;
    return el.querySelectorAll(css);
};
/*
    @方法： each
    @描述：对数组循环 并 执行自定义函数
    @参数： arr  数组（包含类数组）
            callback  回调函数
    @返回： 无
    @示例： each([1,2,3],function(el,index){console.log(el,index)})
            el 表示元素   index  表示下标
*/
function each(arr, callback) {
    for (var i = 0; i < arr.length; i++) {
        callback(arr[i], i)
    }
};
/*
    @方法：makeListToArray
    @描述：将集合转换成数组
    @参数： list  表示一个集合
    @返回： 包含转换元素的数组
*/
function makeListToArray(list) {
    var arr = [];
    for (var i = 0; i < list.length; i++) {
        arr.push(list[i])
    }
    return arr;
};
/*
    @方法: extend
    @描述:将多个对象参数复制到一个对象中
    @参数：第一个参数是目标参数，其他所有参数都复制到目标对象参数中
    @示例： extend( obj , obj_a , obj_b )
            extend({ } ,{ name : 'aa'},{ age : 12})
*/
function extend(obj) {
    //arguments 表示元素集合
    var arr = makeListToArray(arguments);
    var obj = arr.shift();
    var element;
    for (var i = 0; i < arr.length; i++) {
        element = arr[i];
        for (var index in element) {
            obj[index] = element[index];
        }
    };
    return obj;
};

/*
    @函数  getRequest()
    @描述  创建 XMLHttpRequest
    @返回值  返回 XMLHttpRequest 对象
*/
function getRequest() {
    var xmlHttp;
    if (window.XMLHttpRequest) {
        //IE7 以上及 chrome Firefox
        xmlHttp = new XMLHttpRequest();
    } else {
        //IE 低版本
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP')
    };
    return xmlHttp;
};
//参数 url 代表文件路径  callback 代表不相同的人所获取 xmlHttp.responseText  的方法
function ajax(obj) {
    var url = obj.url,
        method = obj.method || 'GET',
        param = obj.param || '',
        callback = obj.callback || function () {},
        //async 必须是字符串
        async = obj.async || true;
    var xmlHttp = getRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            //JSON.stringify 将json转成字符串
            //JSON.parse 将字符串转成json
            if (xmlHttp.responseXML) {
                callback(xmlHttp.responseXML);
                return;
            }
            callback(JSON.parse(xmlHttp.responseText));
        }
    }
    xmlHttp.open(method, url, eval(async));
    if (method === 'POST') {
        xmlHttp.setRequestHeader('Content-type','application/x-www-form-urlencoded')
    }
    xmlHttp.send(param);
}


/*
    @描述：cookie
*/
var cookie = {};
//获取cookie  根据键来获取值
cookie.get = function (key) {
    var keys = document.cookie;
    var arr = keys.split(';');
    var obj = {};
    var element;
    for (var i = 0; i < arr.length; i++) {
        element = arr[i].split('=');
        obj[element[0]] = element[1]
    };
    return obj[key] ? obj[key] : obj[" " + key];
};
/*
    @描述：设置cookie
    @函数：cookie.set
    @参数： 键 值 时间
*/
cookie.set = function (key, value, day) {
    var date = new Date();
    day = day || 1;
    var expires;
    //设置毫秒日期
    date.setTime(date.getTime() + day * (24 * 60 * 60 * 1000));
    //格林尼治时间
    expires = 'expires=' + date.toGMTString();
    document.cookie = key + '=' + value + ';' + expires + ';path=/';
};
/*
    @描述 删除cookie
    @函数 cookie。remove
    @参数  key 键
*/
cookie.removed = function (key) {
    cookie.set(key, cookie.get(key), -1)
}

/*
    @描述 ： 加载页面
    @函数 ： load
    @参数 ： obj里面包括
            obj.el  元素对象
            obj.url  代表地址
    @示例 ： load({
        el:$('#id'),
        url: 'url'
    })

*/
function load(obj) {
    var el = obj.el;
    var url = obj.url;
    var xmlHttp = getRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            el.innerHTML = xmlHttp.responseText;
        }
    };
    xmlHttp.open('GET', url, true);
    xmlHttp.send();
}