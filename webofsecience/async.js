/*
 * @Author: your name
 * @Date: 2021-10-13 15:13:43
 * @LastEditTime: 2021-10-13 16:03:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webofsecience\async.js
 */
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const {document} = (new JSDOM('<!doctype html><html><body></body></html>')).window;
global.document = document;
const window = document.defaultView;
const $ = require('jquery')(window);
//初始化jquery相关数据
module.exports = $;

// 翻译函数Promise版本
function getTrans(query){
    var appid = '20210914000943517';    // 百度的api账号
    var key = 'zdhKVWmSlAPmXItiE4zh';      // 密钥
    var from = 'en';
    var to = 'zh';
    var salt = (new Date).getTime();      // 产生一个由时间生成的随机值，百度api要用
    var str1 = appid + query + salt +key; // 生成百度api md5加密要求字符串
//     const sign = await getMd5(str1);      // md5加密,当然如果md5.js在本地也可以通过ajax跨域的方式获取
    return new Promise(function(resolve){
        var url_md5 = "https://md5.justyy.workers.dev/?cached&s="+str1;
        // md5加密
        $.ajax({
            async:false,
            url:url_md5,
            type:"get",
            success:function(resp){
                var sign = resp;
                // 获取翻译结果
                $.ajax({
                    async:false,
                    url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
                    type: 'get',
                    dataType: 'jsonp',
                    data: {
                        q: query,
                        appid: appid,
                        salt: salt,
                        from: from,
                        to: to,
                        sign: sign
                    },
                    success: function(data) {
                        resolve(data.trans_result[0].dst);
                    }
                });
            }
        })
    });  
};

async function test(){
    var list = ["i", "love", "you"];
    for (var i=0; i<list.length; i++){
        console.log(list[i]);
        const str = await getTrans(list[i]);
        console.log(str);
    }
}

test()

