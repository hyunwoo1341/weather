var local;
var lineChart;
var d = new Date();
var ts;
var localDate  =  d.getDate();
var localeTime  =  d.toLocaleTimeString();

var today_hour = [];
var today_temp = []; //기온
var today_pop = []; //강수량
var today_reh = []; //습도
var today_sky = [];
var today_ws = [];
var today_wdKor = [];
var sum = 0;

var week_tmEf = []; //week 날짜
var week_tmn = []; //week 최소기온
var week_tmx = []; //week 최대기온
var week_wf;


var week_tmEf_split = [];


function click_local(click_local){

if (click_local === 'introduce') {
  $(".introduce_div").html("안녕하세요 기상청 rss 기상정보를 받아와 차트데이터로 보여주는 사이트 입니다.");
  $(".introduce_div").css('display','block');
  $("body").css('overflow-y','hidden');
  return false;
}
  /*초기화*/
$("body").css('overflow-y','visible');
$(".introduce_div").css('display','none');
local = click_local;
today_hour = [];
today_temp = [];
today_pop = [];
today_reh = [];
today_sky = [];
today_ws = [];
today_wdKor = [];
week_tmEf = [];
week_tmn = [];
week_tmx = [];
week_wf = "";

     $.ajax({
         type: 'post',
         dataType: 'json',
         url: './check_weather.php',
         data: {local:click_local},
         success: function (data) {
           console.log(data);

         for (var i = 0; i < 15; i++) {
           today_hour.push(data["weather_today"][i]["hour"][0]);
           today_temp.push(data["weather_today"][i]["temp"][0]);
         }
         today_reh.push(data["weather_today"][0]["reh"][0]);
         today_pop.push(data["weather_today"][0]["pop"][0]);
         today_sky.push(data["weather_today"][0]["sky"][0]);
         today_ws.push(data["weather_today"][0]["ws"][0]);
         today_wdKor.push(data["weather_today"][0]["wdKor"][0]);

         for (var i = 0; i < 7; i++) {
           week_tmEf.push(data["weather_week"][i]["tmEf"][0]);
           week_tmn.push(Number(data["weather_week"][i]["tmn"][0]));
           week_tmx.push(Number(data["weather_week"][i]["tmx"][0]));
         }


          for (var i = 0; i < week_tmn.length; i++) {
           week_tmEf_split.push(week_tmEf[i]);
          }

          week_wf = data["weather_wf"];
          $(".wf").html(week_wf);
         speedChart();
         Doughnut_pop();
         Doughnut_reh();
         week_chart();
         now_temp();
         now_sky();
         now_ws();
         now_wdkor();
         local_img(click_local);

         },
		 beforeSend:function(){
        $('body').css('display','none');
    },
    complete:function(){
        $('body').css('display','block');
    },
         error: function (request, status, error) {
             console.log('code: '+request.status+"\n"+'message: '+request.responseText+"\n"+'error: '+error);
         }
     });
}

function local_img(click_local){
  console.log(click_local);
  $(".local_img").attr('src','img/'+click_local+'.png');
}

//현재 기온
function now_temp(){
  $('.now_temp').html(today_temp[0] + "℃");
}

//현재 날씨
function now_sky(){
  if (today_sky[0] == "맑음") {
    $('.now_sky').html('<img src="img/icon_sunny.png" alt=""> <br><p>맑음</p>');
  }else if (today_sky[0] == '구름 조금') {
    $('.now_sky').html('<img src="img/icon_cloud.png" alt=""> <br><p>구름 조금</p>');
  }else if (today_sky[0] == '구름 많음') {
    $('.now_sky').html('<img src="img/icon_manyCloud.png" alt=""> <br><p>구름 많음</p>');
  }else if(today_sky[0] == '비'){
    $('.now_sky').html('<img src="img/icon_rain.png" alt=""> <br><p>비</p>');
  }else if(today_sky[0] == '눈/비'){
    $('.now_sky').html('<img src="img/icon_rain_snow.png" alt=""> <br><p>눈/비</p>');
  }else if (today_sky[0] == '흐림') {
    $('.now_sky').html('<img src="img/icon_blurCloud.png" alt=""> <br><p>흐림</p>');
  }else{
    $('.now_sky').html('<img src="img/icon_snow.png" alt=""> <br><p>눈</p>');
  }
}

function now_ws(){
  $('.today_ws').html(Number(today_ws[0]).toFixed(2) + 'm/s');
}
function now_wdkor(){
  $('.today_wdKor').html(today_wdKor[0]);
  console.log(today_wdKor[0]);
}



var gradient;
function speedChart(){

var speedCanvas = document.getElementById("canvas-1");
var context = speedCanvas.getContext('2d');
context.rect(0, 0, speedCanvas.width, speedCanvas.height);
gradient = context.createLinearGradient(0, 0, 0, 650);
//빨간색
gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)');
gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
gradient.addColorStop(1, 'rgba(255, 0, 0, 0.01)');

gradient2 = context.createLinearGradient(0, 0, 0, 650);
gradient2.addColorStop(0, 'rgba(170,212,255,1)');
// gradient2.addColorStop(0.7, 'rgba(255, 255, 153, 0.5)');
gradient2.addColorStop(1, 'rgba(255,255,153,0)');


Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;

var speedData = {
  labels: [today_hour[0] + "시",today_hour[1]+ "시",today_hour[2]+ "시",today_hour[3]+ "시",today_hour[4]+ "시",today_hour[5]+ "시",today_hour[6]+ "시",today_hour[7]+ "시",today_hour[8]+ "시",today_hour[9]+ "시",today_hour[10]+ "시",today_hour[11]+ "시",today_hour[12]+ "시",today_hour[13]+ "시",today_hour[14]+ "시" ],
  datasets: [{
    label : local + " 시간별 온도 ",
    data: [today_temp[0],today_temp[1],today_temp[2],today_temp[3],today_temp[4],today_temp[5],today_temp[6],today_temp[7],today_temp[8],today_temp[9],today_temp[10],today_temp[11],today_temp[12],today_temp[13],today_temp[14] ],
    backgroundColor: gradient2,
    pointBackgroundColor: 'white',
			borderWidth: 1,
			borderColor: 'rgb(68,152,238)',
  }]
};

var chartOptions = {
  legend: {
    display: true,
    position: 'top',
    labels: {
      boxWidth: 80,
      fontColor: 'black'
    }
  },
  tooltips : {
    enabled : false
  },
  scales: {
    xAxes: [{
      gridLines: {
        display: false,
        color: "black"
      },
      scaleLabel: {
        display: true,
        labelString: "시간",
        fontColor: "black"
      }
    }],
    yAxes: [{
      stacked: true,
      gridLines: {
        color: "black",
        borderDash: [2, 5],
      },
      scaleLabel: {
        display: true,
        labelString: "온도(℃)",
        fontColor: "red"
      }
    }]
  }
};

lineChart = new Chart(speedCanvas, {
  type: 'line',
  data: speedData,
  options: chartOptions
});

}



function Doughnut_pop(){
//   var ctx = document.getElementById("canvas-3").getContext('2d');
//   var myDoughnutChart = new Chart(ctx, {
//     type: 'doughnut',
//     data: {
// 				datasets: [{
// 					data: [
// 						 today_pop,
//             100 - today_pop
// 					],
// 					backgroundColor: [
// 						gradient
// 					],
//           borderWidth:5,
// 					label: 'Dataset 1'
// 				}],
// 			},
// options: {
//
//   percentageInnerCutout: 10,
//     animation: {
//       animateScale: true,
//       animateRotate: true
//     }
//   }
// });
$("p.pop_percent").html(Math.max.apply(null, today_pop)+ '<span style="font-size:23px">%</span>');
}

function Doughnut_reh(){
//   var ctx = document.getElementById("canvas-2").getContext('2d');
//   var myDoughnutChart = new Chart(ctx, {
//     type: 'doughnut',
//     data: {
// 				datasets: [{
// 					data: [
//     				today_reh[0],
//             100 - today_reh[0]
// 					],
// 					backgroundColor: [
//             gradient
//
// 					],
//           borderWidth:2,
// 					label: 'Dataset 1'
// 				}],
// 			},
// options: {
//   responsive:true,
// percentageInnerCutout: 10,
//     animation: {
//       animateScale: true,
//       animateRotate: true
//     }
//   }
// });
$("p.reh_percent").html(today_reh[0] + '<span style="font-size:23px">%</span>');
}


function week_chart(){
  google.charts.load('current', {'packages':['bar']});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
          console.log(week_tmn[0]);
          var data = google.visualization.arrayToDataTable([
            ['날짜', '최저기온', '최고기온' ,{ role: 'style' }],
            [week_tmEf_split[0], week_tmn[0], week_tmx[0] , 'fill-color: #BC5679; fill-opacity: 0.2'], //일 , 최저기온 , 최고기온
            [week_tmEf_split[1], week_tmn[1], week_tmx[1] , 'fill-color: #BC5679; fill-opacity: 0.2'],
            [week_tmEf_split[2], week_tmn[2], week_tmx[2] , 'fill-color: #BC5679; fill-opacity: 0.2'],
            [week_tmEf_split[3], week_tmn[3], week_tmx[3] , 'fill-color: #BC5679; fill-opacity: 0.2'],
            [week_tmEf_split[4], week_tmn[4], week_tmx[4] , 'fill-color: #BC5679; fill-opacity: 0.2'],
            [week_tmEf_split[5], week_tmn[5], week_tmx[5] , 'fill-color: #BC5679; fill-opacity: 0.2'],
            [week_tmEf_split[6], week_tmn[6], week_tmx[6] , 'fill-color: #BC5679; fill-opacity: 0.2']
          ]);

          var options = {
            chart: {
              title: '날짜별 최저기온 최고기온',
              subtitle: '일주일',
            },
            bars: 'vertical',
            backgroundColor : '#fff',
            vAxis: {format: 'decimal'},
            height: 400,
            colors: [	'rgb(75, 192, 192)','rgb(54, 162, 235)',],

          };

          var chart = new google.charts.Bar(document.getElementById('chart_div'));
          chart.draw(data, google.charts.Bar.convertOptions(options));

        }
}
