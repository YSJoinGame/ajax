# ajax
Ajax相关内容

function getRequest() {
    var xmlHttp;
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP')
    };
    return xmlHttp;
};
function ajax(obj) {
    var url = obj.url,
        method = obj.method || 'GET',
        param = obj.param || '',
        callback = obj.callback || function () {},
        async = obj.async || true;
    var xmlHttp = getRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            if (xmlHttp.responseXML) {
                callback(xmlHttp.responseXML);
                return;
            }
            callback(JSON.parse(xmlHttp.responseText));
        }
    };
    xmlHttp.open(method, url, eval(async));
    if (method === 'POST') {
        xmlHttp.setRequestHeader('Content-type','application/x-www-form-urlencoded')
    }
    xmlHttp.send(param);
};ajax(obj);
