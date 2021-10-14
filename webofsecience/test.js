/*
 * @Author: jhong.tao
 * @Date: 2021-10-11 14:45:05
 * @LastEditTime: 2021-10-13 16:47:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webofsecience\test.js
 */


// ����jQuery
var jquery = document.createElement('script');
jquery.src = 'https://cdn.bootcss.com/jquery/3.2.0/jquery.js';
document.getElementsByTagName('head')[0].appendChild(jquery);
jQuery.noConflict();

// չ��ժҪ
var espan = $(".show-more-wrapper.ng-star-inserted");
// alert(espan.length)
for (var i=0; i<50; i++){
    $(espan[i]).children("button").click();
}

// axios����
var axios = document.createElement('script');
axios.src = 'https://unpkg.com/axios/dist/axios.min.js';
document.getElementsByTagName('head')[0].appendChild(axios);

// md5 ���ܺ���
function getMd5(str){
    var  def = $.Deferred();
    url = "https://md5.justyy.workers.dev/?cached&s="+str;
    $.get(url,function(data){
        def.resolve(data);
    })
    return def.promise();
}

// ���뺯��
function getTrans(query, sign, appid, salt){
    var from = 'en';
    var to = 'zh';
    return new Promise(function(resolve, reject){
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
        },
        error: err => {
            reject(err);
          }
        });
    });  
};

// ����ÿ������
async function requestSomething(){
    var appid = '20210914000943517';    // �ٶȵ�api�˺�
    var key = 'zdhKVWmSlAPmXItiE4zh';      // ��Կ
    var contents = $(".refine-panel-container");  // Ŀ¼������
    contents.empty();  
    var titles = $('.title.title-link.font-size-18.ng-star-inserted');        // ��ȡ���е����ı���
    var numTitle = titles.length;        // ������Ŀ����
    // ����ÿ�����ĵı���
    for(var i=0; i<numTitle; i++){
        var nowTitle = titles[i];   // ��ǰ�ı���Ԫ��
        var query = nowTitle.innerHTML;    // ��ȡ��ǰ���ĵı���
        var salt = (new Date).getTime();      // ����һ����ʱ�����ɵ����ֵ���ٶ�apiҪ��
        var str1 = appid + query + salt +key; // ���ɰٶ�api md5����Ҫ���ַ���
        const sign = await getMd5(str1);      // md5����,��Ȼ���md5.js�ڱ���Ҳ����ͨ��ajax����ķ�ʽ��ȡ
        const trans_tit = await getTrans(query, sign, appid, salt);   // ��ȡ������
        var num = i;  // ����������ţ����㿪ʼ
        // ������������������ɣ���Ȼ��������a��ǩ����ʽ��������ת��Ŀ¼��������ת������ԭ�ĵ�����
        var transTitl = document.createElement('a') ;        // ����һ��a��ǩ������ʾ������������Ŀ
        transTitl.innerText = trans_tit;                     // �������ı������a��ǩ
        transTitl.setAttribute("id", "tit_id"+i);                // ����ǰa��ǩ���һ��ê��������Ŀ¼��ת������ժҪ    
        transTitl.href = "#c_tit"+i;                // ��ת��Ŀ¼
        titles[i].append(document.createElement('br'));
        titles[i].after(transTitl);    // ����ǰ��aԪ�ز���Ӣ�ı�������
        
        // ��Ŀ¼���򴴽�a��ǩ����������Ŀ¼
        contents.append(document.createElement('br'));
        contents.append(titles[i]);
        var title_href = document.createElement('a') ;
        title_href.setAttribute("id", "c_tit"+i); 
        var index = i+1             // ���ı��                  
        title_href.innerText = "��"+index+"��:"+trans_tit;
        title_href.href = "#tit_id"+i;      // ��Ŀ¼��ת������ժҪ
        contents.append(title_href);
        contents.append(document.createElement('br'));
        if(i==4){
            break;
        };
    };
};
