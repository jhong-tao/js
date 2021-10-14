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
//��ʼ��jquery�������
module.exports = $;

// ���뺯��Promise�汾
function getTrans(query){
    var appid = '20210914000943517';    // �ٶȵ�api�˺�
    var key = 'zdhKVWmSlAPmXItiE4zh';      // ��Կ
    var from = 'en';
    var to = 'zh';
    var salt = (new Date).getTime();      // ����һ����ʱ�����ɵ����ֵ���ٶ�apiҪ��
    var str1 = appid + query + salt +key; // ���ɰٶ�api md5����Ҫ���ַ���
//     const sign = await getMd5(str1);      // md5����,��Ȼ���md5.js�ڱ���Ҳ����ͨ��ajax����ķ�ʽ��ȡ
    return new Promise(function(resolve){
        var url_md5 = "https://md5.justyy.workers.dev/?cached&s="+str1;
        // md5����
        $.ajax({
            async:false,
            url:url_md5,
            type:"get",
            success:function(resp){
                var sign = resp;
                // ��ȡ������
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

