/*
 * @Author: jhong.tao
 * @Date: 2021-10-11 19:56:14
 * @LastEditTime: 2021-10-14 10:38:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webofsecience\1.js
 * 
 * https://www.cnblogs.com/mmzuo-798/p/7821716.html
 */
// 翻译函数

// 引入jQuery
var jquery = document.createElement('script');
jquery.src = 'https://cdn.bootcss.com/jquery/3.2.0/jquery.js';
document.getElementsByTagName('head')[0].appendChild(jquery);
jQuery.noConflict();

// 展开摘要
var espan = $(".show-more-wrapper.ng-star-inserted");
// alert(espan.length)
for (var i=0; i<50; i++){
    $(espan[i]).children("button").click();
}

// axios引入
var axios = document.createElement('script');
axios.src = 'https://unpkg.com/axios/dist/axios.min.js';
document.getElementsByTagName('head')[0].appendChild(axios);

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
                        // resolve(data.trans_result[0].dst);
                        resolve(data.trans_result[0].dst);
                    }
                });
            }
        })
    });  
};


// 翻译每个标题
async function requestSomething(){
    // var appid = '20210914000943517';    // 百度的api账号
    // var key = 'zdhKVWmSlAPmXItiE4zh';      // 密钥
    var contents = $(".refine-panel-container");  // 目录父级快
    contents.empty();  
    var titles = $('.title.title-link.font-size-18.ng-star-inserted');        // 获取所有的论文标题
    var numTitle = titles.length;        // 论文题目总数
    // 处理每个论文的标题
    for(var i=0; i<numTitle; i++){
        var nowTitle = titles[i];   // 当前的标题元素
        var query = nowTitle.innerHTML;    // 获取当前论文的标题
        query = query.replace("/\"/g","");
        // var salt = (new Date).getTime();      // 产生一个由时间生成的随机值，百度api要用
        // var str1 = appid + query + salt +key; // 生成百度api md5加密要求字符串
        // const sign = await getMd5(str1);      // md5加密,当然如果md5.js在本地也可以通过ajax跨域的方式获取
        const trans_tit = await getTrans(query);   // 获取翻译结果
        // 这里做翻译后标题的生成，当然可以做成a标签的形式，用来跳转到目录，或者跳转到论文原文的连接
        var transTitl = document.createElement('a') ;        // 创建一个a标签用来显示翻译后的论文题目
        transTitl.innerText = trans_tit;                     // 将翻译后的标题放入a标签
        transTitl.setAttribute("id", "tit_id"+i);                // 给当前a标签添加一个锚，用来从目录跳转到论文摘要    
        transTitl.href = "#c_tit"+i;                // 跳转到目录
        // titles[i].append(document.createElement('br'));
        // titles[i].after(transTitl);    // 将当前的a元素插入英文标题下面
        
        // 在目录区域创建a标签，用来生成目录
        contents.append(document.createElement('br'));
        contents.append(titles[i]);
        var title_href = document.createElement('a') ;
        title_href.setAttribute("id", "c_tit"+i); 
        var index = i+1             // 论文编号                  
        title_href.innerText = "【"+index+"】:"+trans_tit;
        title_href.href = "#tit_id"+i;      // 从目录跳转到论文摘要
        contents.append(title_href);
        contents.append(document.createElement('br'));
        if(i==4){
            break;
        };
    };
};



// 翻译函数
function getTrans(query){
    var appid = '20210914000943517';    // 百度的api账号
    var key = 'zdhKVWmSlAPmXItiE4zh';      // 密钥
    var from = 'en';
    var to = 'zh';
    var salt = (new Date).getTime();      // 产生一个由时间生成的随机值，百度api要用
    var str1 = appid + query + salt +key; // 生成百度api md5加密要求字符串
//     const sign = await getMd5(str1);      // md5加密,当然如果md5.js在本地也可以通过ajax跨域的方式获取
    var url_md5 = "https://md5.justyy.workers.dev/?cached&s="+str1;
    $.get(url_md5,function(resp){
        var sign = resp;
            $.ajax({
//                 async:false,
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
//                     alert(data.length)
                    console.log(data.trans_result[0].dst);
                }
            });
    })
};


// 翻译函数Promise版本
function getTrans(query){
    var appid = '20210914000943517';    // 百度的api账号
    var key = 'zdhKVWmSlAPmXItiE4zh';      // 密钥
    var from = 'en';
    var to = 'zh';
    var salt = (new Date).getTime();      // 产生一个由时间生成的随机值，百度api要用
    var str1 = appid + query + salt +key; // 生成百度api md5加密要求字符串
    const sign = MD5(str1);      // md5加密,当然如果md5.js在本地也可以通过ajax跨域的方式获取
    return new Promise(function(resolve){
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
                // resolve(data.trans_result[0].dst);
                resolve(data.trans_result[0].dst);
            }
        });
    });  
};



// 翻译每个标题
async function requestSomething(){
    // var appid = '20210914000943517';    // 百度的api账号
    // var key = 'zdhKVWmSlAPmXItiE4zh';      // 密钥
    var contents = $(".refine-panel-container");  // 目录父级快
    contents.empty();  
    var titles = $('.title.title-link.font-size-18.ng-star-inserted');        // 获取所有的论文标题
    var numTitle = titles.length;        // 论文题目总数
    // 处理每个论文的标题
    for(var i=0; i<numTitle; i++){
        var nowTitle = titles[i];   // 当前的标题元素
        var query = nowTitle.innerHTML;    // 获取当前论文的标题
        // var salt = (new Date).getTime();      // 产生一个由时间生成的随机值，百度api要用
        // var str1 = appid + query + salt +key; // 生成百度api md5加密要求字符串
        // const sign = await getMd5(str1);      // md5加密,当然如果md5.js在本地也可以通过ajax跨域的方式获取
        
        var trans_tit = getTrans(query);   // 获取翻译结果
        // 这里做翻译后标题的生成，当然可以做成a标签的形式，用来跳转到目录，或者跳转到论文原文的连接
        trans_tit.then(function(res){
            var i = 0
            console.log(res.trans_result[0].dst);
            trans = res.trans_result[0].dst;
            var transTitl = document.createElement('a') ;        // 创建一个a标签用来显示翻译后的论文题目
            transTitl.innerText = trans;                     // 将翻译后的标题放入a标签
            transTitl.setAttribute("id", "tit_id"+i);                // 给当前a标签添加一个锚，用来从目录跳转到论文摘要    
            transTitl.href = "#c_tit"+i;                // 跳转到目录
//             titles[i].append(document.createElement('br'));
//             titles[i].after(transTitl);    // 将当前的a元素插入英文标题下面

            // 在目录区域创建a标签，用来生成目录
            contents.append(document.createElement('br'));
            contents.append(titles[i]);
            var title_href = document.createElement('a') ;
            title_href.setAttribute("id", "c_tit"+i); 
            var index = i+1             // 论文编号                  
            title_href.innerText = "【"+index+"】:"+trans;
            title_href.href = "#tit_id"+i;      // 从目录跳转到论文摘要
            contents.append(title_href);
            contents.append(document.createElement('br'));
            i++;
            });
        if(i==4){
            break;
        };
    };
};



// 翻译每个标题
async function requestSomething(){
    // var appid = '20210914000943517';    // 百度的api账号
    // var key = 'zdhKVWmSlAPmXItiE4zh';      // 密钥
    var contents = $(".refine-panel-container");  // 目录父级快
    contents.empty();  
    var titles = $('.title.title-link.font-size-18.ng-star-inserted');        // 获取所有的论文标题
    var numTitle = titles.length;        // 论文题目总数
    // 处理每个论文的标题
    for(var i=0; i<numTitle; i++){
        var nowTitle = titles[i];   // 当前的标题元素
        var query = nowTitle.innerHTML;    // 获取当前论文的标题
        // var salt = (new Date).getTime();      // 产生一个由时间生成的随机值，百度api要用
        // var str1 = appid + query + salt +key; // 生成百度api md5加密要求字符串
        // const sign = await getMd5(str1);      // md5加密,当然如果md5.js在本地也可以通过ajax跨域的方式获取
        var trans_tit = getTrans(query);   // 获取翻译结果
        // 这里做翻译后标题的生成，当然可以做成a标签的形式，用来跳转到目录，或者跳转到论文原文的连接
        trans_tit.then(function(res){
            console.log(i)
            console.log(res.trans_result[0].dst);
            var trans = res.trans_result[0].dst;
            if(typeof(trans) == "undefined"){
                trans = "";
            };
            var transTitl = document.createElement('a') ;        // 创建一个a标签用来显示翻译后的论文题目
            transTitl.innerText = trans;                     // 将翻译后的标题放入a标签
            transTitl.setAttribute("id", "tit_id"+i);                // 给当前a标签添加一个锚，用来从目录跳转到论文摘要
            transTitl.href = "#c_tit"+i;                // 跳转到目录
//             titles[i].append(document.createElement('br'));
//             titles[i].after(transTitl);    // 将当前的a元素插入英文标题下面

            // 在目录区域创建a标签，用来生成目录
            contents.append(document.createElement('br'));
//             contents.append(titles[i]);
            var title_href = document.createElement('a') ;
            title_href.setAttribute("id", "c_tit"+i); 
            var index = i+1             // 论文编号
            title_href.innerText = "【"+index+"】:"+trans;
            title_href.href = "#tit_id"+i;      // 从目录跳转到论文摘要
            contents.append(title_href);
            contents.append(document.createElement('br'));
            });
        if(i==4){
            break;
        };
    };
};