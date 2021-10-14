/*
 * @Author: your name
 * @Date: 2021-10-14 10:44:19
 * @LastEditTime: 2021-10-14 11:23:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webofsecience\res.js
 */
// ����jQuery
var jquery = document.createElement('script');
jquery.src = 'https://cdn.bootcss.com/jquery/3.2.0/jquery.js';
document.getElementsByTagName('head')[0].appendChild(jquery);
jQuery.noConflict();

// ������Զ����»����������ҳ
var int_timer = setInterval(function(){
    var autoRun = 300;    // ÿ���Զ������ĸ߶�
    var nowHeight = $("body,html").scrollTop();    // ��ȡ�����������Ԫ�صĹ�������ǰ�߶�
    $("#body,html").animate({scrollTop:nowHeight + autoRun}, 200);  //�Զ�����
},500);

// չ��ժҪ
var espan = $(".show-more-wrapper.ng-star-inserted");
// alert(espan.length)
for (var i=0; i<50; i++){
    $(espan[i]).children("button").click();
}

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
                        console.log(query);
                        if(data.trans_result == null){resolve(query)}else{resolve(data.trans_result[0].dst);}
                    }
                });
            }
        })
    });  
};

// ����ÿ������
async function requestSomething(){
    // var appid = '20210914000943517';    // �ٶȵ�api�˺�
    // var key = 'zdhKVWmSlAPmXItiE4zh';      // ��Կ
    var contents = $(".refine-panel-container");  // Ŀ¼������
    contents.empty();  
    var titles = $('.title.title-link.font-size-18.ng-star-inserted');        // ��ȡ���е����ı���
    var numTitle = titles.length;        // ������Ŀ����
    // ����ÿ�����ĵı���
    for(var i=0; i<numTitle; i++){
        var nowTitle = titles[i];   // ��ǰ�ı���Ԫ��
        var query = nowTitle.innerHTML;    // ��ȡ��ǰ���ĵı���
        const trans_tit = await getTrans(query);   // ��ȡ������
        // ������������������ɣ���Ȼ��������a��ǩ����ʽ��������ת��Ŀ¼��������ת������ԭ�ĵ�����
        var index = i+1             // ���ı��   
        var transTitl = document.createElement('a') ;        // ����һ��a��ǩ������ʾ������������Ŀ
        transTitl.innerText = trans_tit;                     // �������ı������a��ǩ
        transTitl.setAttribute("id", "tit_id"+index);                // ����ǰa��ǩ���һ��ê��������Ŀ¼��ת������ժҪ    
        transTitl.href = "#c_tit"+index;                // ��ת��Ŀ¼
        titles[i].append(document.createElement('br'));
        titles[i].after(transTitl);    // ����ǰ��aԪ�ز���Ӣ�ı�������
        
        // ��Ŀ¼���򴴽�a��ǩ����������Ŀ¼
        contents.append(document.createElement('br'));
        var title_href = document.createElement('a') ;
        title_href.setAttribute("id", "c_tit"+index);                
        title_href.innerHTML = "��"+index+"��:"+query+"&#10"+trans_tit;
        title_href.href = "#tit_id"+index;      // ��Ŀ¼��ת������ժҪ
        contents.append(title_href);
        contents.append(document.createElement('br'));
        if(i==4){
            break;
        };
    };
};

requestSomething()