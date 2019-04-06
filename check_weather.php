<?php
include 'model.php';
//넘겨오는 값이 서울이면 서울의

// 하루 시간별 기온변화 - 전국 - 동네예보
// 하루 강수확률 - 전국 - 동네예보
// 일주일 온도변화 - 전국 - 육상
// 현재시간 온도 - 동네
// 현재시간 날씨 - 동네

//를 데이터로 반환한다.
$weather = new Weather();
$local;
$url;
$url_week;

function local_url() {
  if (isset($_POST['local']) && $_POST['local'] == 'seoul') {
    $GLOBALS['url'] = "http://www.weather.go.kr/wid/queryDFSRSS.jsp?zone=1159068000";
    $GLOBALS['url_week'] = "http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=109";
  }
  if (isset($_POST['local']) && $_POST['local'] == 'gangwon-do') {
    $GLOBALS['url'] = "http://www.weather.go.kr/wid/queryDFSRSS.jsp?zone=4215061500";
    $GLOBALS['url_week'] = "http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=105";
  }
  if (isset($_POST['local']) && $_POST['local'] == 'chung-cheong-bukdo') {
    $GLOBALS['url'] = "http://www.weather.go.kr/wid/queryDFSRSS.jsp?zone=4376031000";
    $GLOBALS['url_week'] = "http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=131";
  }
  if (isset($_POST['local']) && $_POST['local'] == 'chungcheongnam-do') {
    $GLOBALS['url'] = "http://www.weather.go.kr/wid/queryDFSRSS.jsp?zone=4425051000";
    $GLOBALS['url_week'] = "http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=133";
  }
  if (isset($_POST['local']) && $_POST['local'] == 'jeollabuk-do') {
    $GLOBALS['url'] = "http://www.weather.go.kr/wid/queryDFSRSS.jsp?zone=4579031000";
    $GLOBALS['url_week'] = "http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=146";
  }
  if (isset($_POST['local']) && $_POST['local'] == 'jeollanam-do') {
    $GLOBALS['url'] = "http://www.weather.go.kr/wid/queryDFSRSS.jsp?zone=4681025000";
    $GLOBALS['url_week'] = "http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=156";

  }
  if (isset($_POST['local']) && $_POST['local'] == 'gyeongsangbuk-do') {
    $GLOBALS['url'] = "http://www.weather.go.kr/wid/queryDFSRSS.jsp?zone=4729053000";
    $GLOBALS['url_week'] = "http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=143";

  }
  if (isset($_POST['local']) && $_POST['local'] == 'gyeongsangnam-do') {
    $GLOBALS['url'] = "http://www.weather.go.kr/wid/queryDFSRSS.jsp?zone=4831034000";
    $GLOBALS['url_week'] = "http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=159";

  }
  if (isset($_POST['local']) && $_POST['local'] == 'jeju') {
    $GLOBALS['url'] = "http://www.weather.go.kr/wid/queryDFSRSS.jsp?zone=5013025300";
    $GLOBALS['url_week'] = "http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=184";

  }
}
local_url();

// $weather_result = [];
$weather_result = array(
    'weather_today'=>$weather -> request_localWeather($url),
    'weather_week'=>$weather -> request_oneWeek_Weather($url_week),
    'weather_wf' =>$weather -> request_wf($url_week)
);

print_r(json_encode($weather_result));

?>
