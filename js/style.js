

$(".nav-item").click(function(){
  $(".nav-item.nav-dropdown").css('background','#2f353a');
  $(this).css('background','#20a8d8');
})
$('.nav-item.seoul').bind("click");
$(".nav-item.seoul").trigger("click");


$(".current_now").html()


function showClock(){
        var currentDate = new Date();
        var divClock = $(".current_now");

        var msg = "현재 시간:"+currentDate.getHours()+"시"
        msg += currentDate.getMinutes()+"분";
        msg += currentDate.getSeconds()+"초";

        divClock.html(msg);
        setTimeout(showClock,1000);
    }
showClock();
