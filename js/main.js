var menu = $("div.menu");
window.onscroll=function () { // 页面发生scroll事件时触发
    if(window.pageYOffset<=234){
        $('.nav .backimg').css('opacity',(100-0.4*window.pageYOffset)+"%");
        menu.css('top',(-0.2*window.pageYOffset)+'px');
        menu.css('padding-top',0.1*window.pageYOffset+'px');
    }
    if(window.pageYOffset<=210){
        menu.css('border-bottom-right-radius','30px');
        menu.css('border-bottom-left-radius','30px');
        menu.css('height','70px');
        menu.css('position','relative');
    }else{
        menu.css('border-radius','0px');
        menu.css('height','60px');
        menu.css('position','fixed');
        menu.css('top','-20px');
    }
};
function author(){
    $('.about').css('visibility','visible');
    $('.about').css('background-color','rgba(51, 51, 51, 0.514)');
    $('.about .content').css('height','380px');
};
$('.about').mousedown(function () {
    $('.about .content').css('height','0');
    $('.about').css('visibility','hidden');
    $('.about').css('background-color','transparent');
});
//$.ajaxSettings.async = false;
var p = new Promise(function(resolve) {
    $.get('index.json',function(response, status, xhr){
        resolve(response)
    });// 调用resolve，代表Promise将返回成功的结果
  });
p.then(function(data){
    var anum=0
    var tnum=0
    var nnum=0
    var nd=new Date
    var alist=[]
    var nlist=[]
    var yy=nd.getFullYear()
    var mm=nd.getMonth()
    var dd=nd.getDate()
    for (var key in data){
        tnum++
        let a=[]
        //console.log(data[key]);
        for (var skey in data[key]){
            var d=new Date(data[key][skey].mtime)
            data[key][skey]['type']=key
            data[key][skey]['title']=skey
            if(d.getDate()==dd&&d.getMonth()==mm&&d.getFullYear()==yy){
                nlist[nnum]=data[key][skey]
                nnum++
            }
            a.push(data[key][skey])
            anum++
        }
        alist.push(a)
    }
    $('#anum').html(anum);
    $('#tnum').html(tnum);
    $('#nnum').html(nnum);
    createblist(nlist,$('.newblock'))
    for(var i in alist){
        createblist(alist[i],$('.allblock'))
    }
    mktpblock(alist)
})
function initscreen(){
    $('.show').css('height','0')
    $('.statistic').css('height','0')
    $('.newblock').css('height','0')
    $('.allblock').css('height','0')
    $('.typeblock').css('height','0')
    $('.typechild').css('height','0')
    $('.show').css('opacity','0')
    $('.statistic').css('opacity','0')
    $('.newblock').css('opacity','0')
    $('.allblock').css('opacity','0')
    $('.typeblock').css('opacity','0')
    $('.typechild').css('opacity','0')
}
function createblist(list,tar){
    for(var i=0;i<list.length;i++){
        mkblock(list[i],tar)
    }
}
function mkblock(node,tar){
    $.get(node.route, function(response){
        var d=new Date(node.mtime)
        var blk=$("<div></div>").addClass('block');
        var tt=$("<div></div>").addClass('title');
        tt.text(node.title)
        var info=$("<div></div>").addClass('info');
        var s1=$("<span></span>").text('分类：');
        var s2=$("<span></span>").addClass('type');
        s2.text(node.type)
        var s3=$("<span></span>").text('最后修改时间：');
        var s4=$("<span></span>").addClass('time');
        s4.text(d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate())
        info.append(s1,s2,s3,s4)
        var cvr=$("<div></div>").addClass('cover');
        if(node.cover!=null){
            cvr.css('background-image','url('+node.cover.replace(/\\/g,'\/')+')')
        }else{
            cvr.css('background-image','url(./img/example.jpg)')
        }
        var i=$("<p></p>").addClass('intro');
        i.text(response.slice(0,40)+'……')
        var bt=$("<div></div>").addClass('read');
        bt.text('阅读全文');
        bt.mousedown((() => {
            $.get(node.route, function(response){
                initscreen()
                $('.show').css('height','fit-content')
                $('.show').css('opacity','1')
                $('.show .content').html(marked.parse(response));
                var img=document.querySelectorAll('.show .content img');
                if(img.length!=0){
                    var index=node.route.lastIndexOf('\\');
                    var indexi=img[0].src.lastIndexOf('/');
                    for(var i=0;i<img.length;i++){
                        img[i].src= node.route.slice(0,index+1)+img[i].src.slice(indexi+1)
                    }  
                }
                hljs.initHighlighting.called = false;
                hljs.initHighlighting();
                window.scrollTo({
                    top:210
                })
            });
        }))
        blk.append(tt,info,cvr,i,bt)
        tar.append(blk)
    });
}
function mktpblock(list){
    for(let li=0;li<list.length;li++){
        if(list[li].length>0){
            var blk=$("<div></div>").addClass('block');
            var tt=$("<div></div>").addClass('title');
            tt.text(list[li][0].type)
            var bt=$("<div></div>").addClass('read');
            bt.text('进入分类');
            bt.mousedown((() => {
                $('.typechild').empty()
                createblist(list[li],$('.typechild'))
                changeTC()
            }))
            blk.append(tt,bt)
            $('.typeblock').append(blk)
        }
    }
}
function changeN(){
    initscreen()
    $('.newblock').css('height','fit-content')
    $('.newblock').css('opacity','1')
    scrollToTop()
}
function changeA(){
    initscreen()
    $('.allblock').css('height','fit-content')
    $('.allblock').css('opacity','1')
    scrollToTop()
}
function changeT(){
    initscreen()
    $('.typeblock').css('height','fit-content')
    $('.typeblock').css('opacity','1')
    scrollToTop()
}
function changeTC(){
    initscreen()
    $('.typechild').css('height','fit-content')
    $('.typechild').css('opacity','1')
    scrollToTop()
}
function rocket(){
    scrollToTop()
}
const scrollToTop = () => {
    let sTop = document.documentElement.scrollTop || document.body.scrollTop
    if (sTop > 0) {
        window.scrollTo(0, sTop - sTop / 24)
        window.requestAnimationFrame(scrollToTop)
    }
}
