/*
 * @Author: jhong.tao
 * @Date: 2021-10-12 20:04:16
 * @LastEditTime: 2021-10-12 20:17:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webofsecience\4.js
 */
function ajax(url, data, type, callback) {
    var p = new Promise(function (resolve, reject) {
        $.ajax({
            url: url,
            type: type,
            dataType: "json",
            data: data == null ? '' : JSON.stringify(data),
            async: true,
            contentType: "application/json",
            success: function (resp) {
                callback(resp);
                resolve();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.responseText);
                reject();
            }
        });
    });
    return p;
}

ajax('/prefix/entity1/action1',null, function(resp){
    //do something on response
    someData.attr1 = resp.attr1;
}).then(
    ajax('/prefix/entity2/action2', someData, function(resp){
         //do something on response
    }
).then(
    initVue() ;
).then(
    //do  something else
)

var appid = '20210914000943517';    // 百度的api账号
var key = 'zdhKVWmSlAPmXItiE4zh';      // 密钥
var from = 'en';
var to = 'zh';
var salt = (new Date).getTime();      // 产生一个由时间生成的随机值，百度api要用
var str1 = appid + query + salt +key; // 生成百度api md5加密要求字符串
var query = "love";

var url_md5 = "https://md5.justyy.workers.dev/?cached&s="+str1;
ajax(url_md5, null, function(resp){
    var sign = resp;
    var data = {
        "q": query,
        "appid": appid,
        "salt": salt,
        "from": from,
        "to": to,
        "sign": sign
    };
}).then(
    ajax("https://fanyi-api.baidu.com/api/trans/vip/translate",data, function(resp){
        alert(resp);
    })
)