<?php


class Weather
{

//지역날씨
function request_localWeather($local_url){
 $xml_l = simplexml_load_file($local_url);
 $weather_info = [];
 for ($i=0; $i < 15; $i++) {
   ${"result_".$i} = [];
   ${"result_".$i}['hour'] = $xml_l->channel -> item -> description -> body -> data[$i] -> hour;
   ${"result_".$i}['temp'] = $xml_l->channel -> item -> description -> body -> data[$i]-> temp;
   ${"result_".$i}['pop'] = $xml_l->channel -> item -> description -> body -> data[$i] -> pop;
   ${"result_".$i}['reh'] = $xml_l->channel -> item -> description -> body -> data[$i] -> reh;
   ${"result_".$i}['sky'] = $xml_l->channel -> item -> description -> body -> data[$i] -> wfKor;
   ${"result_".$i}['ws'] = $xml_l->channel -> item -> description -> body -> data[$i] -> ws;
   ${"result_".$i}['wdKor'] = $xml_l->channel -> item -> description -> body -> data[$i] -> wdKor;
   $weather_info[] = ${"result_".$i};
 }

 array_push($weather_info, $xml_l->channel -> item -> description -> header -> ts);
 return $weather_info;
}


//일주일
function request_oneWeek_Weather($url){

 $xml_g = simplexml_load_file($url);
 $weather_oneWeek_info = [];

 for ($i=1; $i < 8; $i++) {
   ${"result_".$i} = [];
   ${"result_".$i}['tmEf'] = $xml_g->channel -> item -> description -> body -> location -> data[$i] -> tmEf; //날짜 시간
   ${"result_".$i}['tmn'] = $xml_g->channel -> item -> description -> body -> location -> data[$i] -> tmn;
   ${"result_".$i}['tmx'] = $xml_g->channel -> item -> description -> body -> location -> data[$i]-> tmx;

   $weather_oneWeek_info[] = ${"result_".$i};
 }


// array_push($weather_oneWeek_info, $wf);
 return $weather_oneWeek_info;
}

function request_wf($url){
  $xml_wf = simplexml_load_file($url);
  $wf = $xml_wf->channel -> item -> description -> header -> wf -> __toString();
  return $wf;
}

}
?>
