$(function(){
    /*$(".yScrollListTitle h1").click(function  () {
        var index=$(this).index(".yScrollListTitle h1");
        $(this).addClass("yth1click").siblings().removeClass("yth1click");
        $($(".yScrollListInList")[index]).show().siblings().hide();
    });*/

    $(".y1 ul").css({width:$(".y1 ul li").length*200+"px"});
    $(".y2 ul").css({width:$(".y2 ul li").length*200+"px"});
    var numwidth=1200;
    $(".yScrollListInList .ybtnl").click(function(){
        var obj=$(this).parent(".yScrollListInList").find("ul");
        if (!(obj.is(":animated"))) {
            var lefts=parseInt(obj.css("left").slice(0,-2));
            if(lefts<30){
                obj.animate({left:lefts+numwidth},1000);
            }
        }
    })
    $(".yScrollListInList .ybtnr").click(function(){
        var obj=$(this).parent(".yScrollListInList").find("ul");
        var objcds=-(30+(Math.ceil(obj.find("li").length/5)-2)*numwidth);
        if (!(obj.is(":animated"))) {
            var lefts=parseInt(obj.css("left").slice(0,-2));
            if(lefts>objcds){
                obj.animate({left:lefts-numwidth},1000);
            }
        }
    })
});